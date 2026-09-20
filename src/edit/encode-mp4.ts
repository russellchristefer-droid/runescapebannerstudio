import { Muxer, ArrayBufferTarget } from "mp4-muxer";
import { clipVideoBitrate } from "./quality";
import { captureSmooth } from "./captureSmooth";
import { seekTo } from "./seekSafe";

export { clipVideoBitrate } from "./quality";

type EncodeOpts = {
  canvas: HTMLCanvasElement;
  paint: () => void;
  video: HTMLVideoElement;
  inT: number;
  outT: number;
  w: number;
  h: number;
  bitrate?: number;
  audioBitrate?: number;
  audioTracks: MediaStreamTrack[];
  onPct: (n: number) => void;
};

export function canEncodeMp4() {
  return typeof VideoEncoder !== "undefined" && typeof VideoFrame !== "undefined";
}

function codecLadder() {
  return ["avc1.640028", "avc1.4D0028", "avc1.42E01E", "avc1.42001E"];
}

async function pickVideoConfig(
  width: number,
  height: number,
  fps: number,
  bitrate: number,
): Promise<VideoEncoderConfig | null> {
  for (const hw of ["prefer-hardware", "no-preference", "prefer-software"] as const) {
    for (const codec of codecLadder()) {
      const cfg: VideoEncoderConfig = {
        codec,
        width,
        height,
        bitrate,
        framerate: fps,
        bitrateMode: "variable",
        avc: { format: "avc" },
        hardwareAcceleration: hw,
        latencyMode: "quality",
      };
      const ok = await VideoEncoder.isConfigSupported(cfg).catch(() => null);
      if (ok?.supported) return { ...cfg, ...(ok.config ?? {}) };
    }
  }
  return null;
}

async function pickAacConfig(bitrate = 192_000): Promise<AudioEncoderConfig | null> {
  if (typeof AudioEncoder === "undefined") return null;
  for (const sampleRate of [48000, 44100]) {
    const trial: AudioEncoderConfig = {
      codec: "mp4a.40.2",
      numberOfChannels: 2,
      sampleRate,
      bitrate,
    };
    const ok = await AudioEncoder.isConfigSupported(trial).catch(() => null);
    if (ok?.supported) return { ...trial, ...(ok.config ?? {}) };
  }
  return null;
}

async function writeSilentAac(muxer: Muxer<ArrayBufferTarget>, durationSec: number, cfg: AudioEncoderConfig) {
  const encoder = new AudioEncoder({
    output: (chunk, meta) => muxer.addAudioChunk(chunk, meta),
    error: () => {
      /* video-only still downloads */
    },
  });
  encoder.configure(cfg);
  const sampleRate = cfg.sampleRate;
  const channels = cfg.numberOfChannels;
  const hop = 1024;
  const total = Math.max(hop, Math.round(Math.max(0.5, durationSec) * sampleRate));
  let frame = 0;
  while (frame < total) {
    const n = Math.min(hop, total - frame);
    const audio = new AudioData({
      format: "f32",
      sampleRate,
      numberOfFrames: n,
      numberOfChannels: channels,
      timestamp: Math.round((frame / sampleRate) * 1_000_000),
      data: new Float32Array(n * channels),
    });
    encoder.encode(audio);
    audio.close();
    frame += n;
  }
  await Promise.race([encoder.flush().catch(() => undefined), sleep(4000)]);
  try {
    encoder.close();
  } catch {
    /* already closed */
  }
}

async function encodePcmAac(
  muxer: Muxer<ArrayBufferTarget>,
  buffer: AudioBuffer,
  inT: number,
  outT: number,
  cfg: AudioEncoderConfig,
) {
  const encoder = new AudioEncoder({
    output: (chunk, meta) => muxer.addAudioChunk(chunk, meta),
    error: () => {
      /* silent fallback */
    },
  });
  encoder.configure(cfg);
  const sampleRate = cfg.sampleRate;
  const channels = 2;
  const hop = 1024;
  const start = Math.max(0, Math.floor(inT * buffer.sampleRate));
  const end = Math.min(buffer.length, Math.ceil(outT * buffer.sampleRate));
  const srcLen = Math.max(1, end - start);
  const ratio = sampleRate / buffer.sampleRate;
  const total = Math.max(hop, Math.round(srcLen * ratio));
  const ch0 = buffer.getChannelData(0);
  const ch1 = buffer.numberOfChannels > 1 ? buffer.getChannelData(1) : ch0;
  let frame = 0;
  while (frame < total) {
    const n = Math.min(hop, total - frame);
    const data = new Float32Array(n * channels);
    for (let i = 0; i < n; i++) {
      const src = start + Math.min(srcLen - 1, Math.floor((frame + i) / ratio));
      data[i * 2] = ch0[src] || 0;
      data[i * 2 + 1] = ch1[src] || 0;
    }
    const audio = new AudioData({
      format: "f32",
      sampleRate,
      numberOfFrames: n,
      numberOfChannels: channels,
      timestamp: Math.round((frame / sampleRate) * 1_000_000),
      data,
    });
    encoder.encode(audio);
    audio.close();
    frame += n;
  }
  await Promise.race([encoder.flush().catch(() => undefined), sleep(4000)]);
  try {
    encoder.close();
  } catch {
    /* already closed */
  }
}

async function audioFromVideo(video: HTMLVideoElement, inT: number, outT: number, muxer: Muxer<ArrayBufferTarget>, cfg: AudioEncoderConfig) {
  const src = video.currentSrc || video.src;
  if (!src) {
    await writeSilentAac(muxer, outT - inT, cfg);
    return;
  }
  try {
    const raw = await fetch(src).then((r) => r.arrayBuffer());
    const ctx = new AudioContext({ sampleRate: cfg.sampleRate });
    const decoded = await ctx.decodeAudioData(raw.slice(0));
    await ctx.close().catch(() => undefined);
    await encodePcmAac(muxer, decoded, inT, outT, cfg);
  } catch {
    await writeSilentAac(muxer, outT - inT, cfg);
  }
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms));
}

function withTimeout<T>(p: Promise<T>, ms: number, label: string) {
  return Promise.race([
    p,
    new Promise<T>((_, rej) => {
      window.setTimeout(() => rej(new Error(label)), ms);
    }),
  ]);
}

function waitQueue(encoder: VideoEncoder, max = 8) {
  if (encoder.encodeQueueSize < max) return Promise.resolve();
  return new Promise<void>((resolve) => {
    const onDeq = () => {
      if (encoder.encodeQueueSize < max) {
        encoder.removeEventListener("dequeue", onDeq);
        resolve();
      }
    };
    encoder.addEventListener("dequeue", onDeq);
    window.setTimeout(() => {
      encoder.removeEventListener("dequeue", onDeq);
      resolve();
    }, 250);
  });
}

export async function encodeClipMp4(opts: EncodeOpts): Promise<{ blob: Blob; mime: string } | null> {
  if (!canEncodeMp4()) return null;
  const width = opts.w & ~1;
  const height = opts.h & ~1;
  if (width < 16 || height < 16) return null;

  const { video, inT, outT, paint } = opts;
  video.pause();
  video.playbackRate = 1;
  const fps = 30;
  const bitrate = opts.bitrate || clipVideoBitrate(width, height);
  await seekTo(video, inT);
  video.pause();

  const videoCfg = await pickVideoConfig(width, height, fps, bitrate);
  if (!videoCfg) return null;

  const audioCfg = await pickAacConfig(opts.audioBitrate || 128_000);
  const wantAudio = Boolean(audioCfg);

  const target = new ArrayBufferTarget();
  const muxer = new Muxer({
    target,
    video: { codec: "avc", width, height, frameRate: fps },
    audio: audioCfg
      ? { codec: "aac", numberOfChannels: audioCfg.numberOfChannels, sampleRate: audioCfg.sampleRate }
      : undefined,
    fastStart: "in-memory",
    firstTimestampBehavior: "offset",
  });

  let videoError: Error | null = null;
  const encoder = new VideoEncoder({
    output: (chunk, meta) => muxer.addVideoChunk(chunk, meta),
    error: (err) => {
      videoError = err;
    },
  });
  encoder.configure({
    ...videoCfg,
    width,
    height,
    framerate: fps,
    latencyMode: "quality",
    avc: { format: "avc" },
  });

  const durationUs = Math.round(1_000_000 / fps);
  const span = Math.max(1 / fps, outT - inT);
  let frames = 0;
  let lastTs = -1;

  await seekTo(video, inT);
  video.playbackRate = 1;

  await captureSmooth(video, inT, outT, fps, async (_v, meta) => {
    if (videoError || encoder.state !== "configured") return;
    const ts = Math.round(meta.mediaTime * 1e6);
    if (ts === lastTs) return;
    lastTs = ts;
    await waitQueue(encoder);
    if (encoder.state !== "configured") return;
    paint();
    const frame = new VideoFrame(opts.canvas, { timestamp: ts, duration: durationUs, alpha: "discard" });
    try {
      encoder.encode(frame, { keyFrame: frames === 0 || frames % (fps * 2) === 0 });
      frames += 1;
    } finally {
      frame.close();
    }
    opts.onPct(Math.min(99, Math.floor(((meta.mediaTime - inT) / Math.max(0.001, span)) * 100)));
  });
  video.pause();
  video.muted = true;
  video.volume = 0;
  try {
    await withTimeout(encoder.flush(), 8000, "flush-timeout");
  } catch {
    /* finish the file anyway */
  }
  try {
    encoder.close();
  } catch {
    /* already closed */
  }

  if (frames < 2) return null;

  if (wantAudio && audioCfg) {
    const audioSpan = Math.max(span, frames / fps);
    await Promise.race([audioFromVideo(video, inT, inT + audioSpan, muxer, audioCfg), sleep(8000)]);
  }
  muxer.finalize();
  opts.onPct(100);
  const buffer = target.buffer;
  if (!buffer || buffer.byteLength < 1024) return null;
  return { blob: new Blob([buffer], { type: "video/mp4" }), mime: "video/mp4" };
}
