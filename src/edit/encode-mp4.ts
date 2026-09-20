import { Muxer, ArrayBufferTarget } from "mp4-muxer";
import { clipVideoBitrate, qualityForSize } from "./quality";

export { clipVideoBitrate } from "./quality";

type EncodeOpts = {
  canvas: HTMLCanvasElement;
  paint: () => void;
  video: HTMLVideoElement;
  inT: number;
  outT: number;
  w: number;
  h: number;
  audioTracks: MediaStreamTrack[];
  onPct: (n: number) => void;
};

export function canEncodeMp4() {
  return typeof VideoEncoder !== "undefined" && typeof VideoFrame !== "undefined";
}

function codecLadder() {
  return ["avc1.640028", "avc1.4D0028", "avc1.42E01E", "avc1.42001E"];
}

async function pickVideoConfig(width: number, height: number, fps: number): Promise<VideoEncoderConfig | null> {
  const bitrate = clipVideoBitrate(width, height);
  for (const hw of ["prefer-hardware", "no-preference", "prefer-software"] as const) {
    for (const codec of codecLadder()) {
      const cfg: VideoEncoderConfig = {
        codec,
        width,
        height,
        bitrate,
        framerate: fps,
        bitrateMode: "constant",
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

function seekTo(video: HTMLVideoElement, t: number) {
  const target = Math.max(0, t);
  return new Promise<void>((resolve) => {
    if (Math.abs((video.currentTime || 0) - target) < 0.02 && video.readyState >= 2) {
      resolve();
      return;
    }
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      video.removeEventListener("seeked", finish);
      resolve();
    };
    video.addEventListener("seeked", finish);
    try {
      video.currentTime = target;
    } catch {
      finish();
    }
    window.setTimeout(finish, 120);
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
  const q = qualityForSize(width, height);
  const fps = q.fps;
  await seekTo(video, inT);
  video.pause();

  const videoCfg = await pickVideoConfig(width, height, fps);
  if (!videoCfg) return null;

  const audioCfg = await pickAacConfig(q.audioBps);
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
    avc: { format: "avc" },
  });

  const durationUs = Math.round(1_000_000 / fps);
  const span = Math.max(1 / fps, outT - inT);
  let frames = 0;
  let lastTs = -1;
  let encodeChain = Promise.resolve();

  const pushFrame = (key = false) => {
    const forceKey = key;
    encodeChain = encodeChain.then(async () => {
      if (videoError || encoder.state !== "configured") return;
      const ts = frames * durationUs;
      if (ts <= lastTs) return;
      lastTs = ts;
      await waitQueue(encoder);
      if (encoder.state !== "configured") return;
      paint();
      const flush = opts.canvas.getContext("2d");
      try {
        flush?.getImageData(0, 0, 1, 1);
      } catch {
        /* ignore */
      }
      const frame = new VideoFrame(opts.canvas, { timestamp: ts, duration: durationUs, alpha: "discard" });
      try {
        encoder.encode(frame, { keyFrame: forceKey || frames === 0 || frames % (fps * 2) === 0 });
        frames += 1;
      } finally {
        frame.close();
      }
      opts.onPct(Math.min(95, Math.max(0, (frames / Math.max(1, Math.round(span * fps))) * 95)));
    });
  };

  await seekTo(video, inT);
  video.playbackRate = 1;
  await video.play().catch(() => undefined);

  await new Promise<void>((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      video.pause();
      resolve();
    };
    const tick = () => {
      if (settled) return;
      const media = video.currentTime;
      if (media + 0.5 / fps >= outT || video.ended) {
        pushFrame(true);
        finish();
        return;
      }
      const expected = inT + frames / fps;
      if (media >= expected - 0.25 / fps) pushFrame();
      window.requestAnimationFrame(tick);
    };
    window.requestAnimationFrame(tick);
    window.setTimeout(finish, Math.min(45 * 60 * 1000, span * 4000 + 8000));
  });

  opts.onPct(97);
  await encodeChain.catch(() => undefined);
  await Promise.race([encoder.flush().catch(() => undefined), sleep(5000)]);
  try {
    encoder.close();
  } catch {
    /* already closed */
  }

  if (frames < 2) return null;

  opts.onPct(98);
  if (wantAudio && audioCfg) {
    const audioSpan = Math.max(span, frames / fps);
    await Promise.race([audioFromVideo(video, inT, inT + audioSpan, muxer, audioCfg), sleep(8000)]);
  }
  opts.onPct(99);
  muxer.finalize();
  opts.onPct(100);
  const buffer = target.buffer;
  if (!buffer || buffer.byteLength < 64) return null;
  return { blob: new Blob([buffer], { type: "video/mp4" }), mime: "video/mp4" };
}
