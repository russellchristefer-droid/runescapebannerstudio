import { Muxer, ArrayBufferTarget } from "mp4-muxer";

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

/** YouTube / TikTok / X / Kick recommended source rates for H.264 MP4. */
export function clipVideoBitrate(width: number, height: number) {
  const pixels = width * height;
  if (pixels >= 1920 * 1080) return 12_000_000;
  if (pixels >= 1080 * 1080) return 8_000_000;
  if (pixels >= 1280 * 720) return 7_500_000;
  return 5_000_000;
}

function codecLadder() {
  return ["avc1.640028", "avc1.4D0028", "avc1.42E01E", "avc1.42001E"];
}

async function pickVideoConfig(width: number, height: number, fps: number): Promise<VideoEncoderConfig | null> {
  const bitrate = clipVideoBitrate(width, height);
  for (const codec of codecLadder()) {
    const cfg: VideoEncoderConfig = {
      codec,
      width,
      height,
      bitrate,
      framerate: fps,
      bitrateMode: "constant",
      avc: { format: "avc" },
      hardwareAcceleration: "no-preference",
      latencyMode: "realtime",
    };
    const ok = await VideoEncoder.isConfigSupported(cfg).catch(() => null);
    if (ok?.supported) return { ...cfg, ...(ok.config ?? {}) };
  }
  return null;
}

async function pickAacConfig(): Promise<AudioEncoderConfig | null> {
  if (typeof AudioEncoder === "undefined") return null;
  for (const sampleRate of [48000, 44100]) {
    const trial: AudioEncoderConfig = {
      codec: "mp4a.40.2",
      numberOfChannels: 2,
      sampleRate,
      bitrate: 128_000,
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
  await encoder.flush().catch(() => undefined);
  encoder.close();
}

function waitQueue(encoder: VideoEncoder, max = 2) {
  if (encoder.encodeQueueSize < max) return Promise.resolve();
  return new Promise<void>((resolve) => {
    const onDeq = () => {
      if (encoder.encodeQueueSize < max) {
        encoder.removeEventListener("dequeue", onDeq);
        resolve();
      }
    };
    encoder.addEventListener("dequeue", onDeq);
  });
}

function seekTo(video: HTMLVideoElement, t: number) {
  const target = Math.max(0, t);
  return new Promise<void>((resolve) => {
    if (Math.abs((video.currentTime || 0) - target) < 0.003 && video.readyState >= 2) {
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
    window.setTimeout(finish, 280);
  });
}

function waitPresented(video: HTMLVideoElement) {
  return new Promise<void>((resolve) => {
    if (typeof video.requestVideoFrameCallback === "function") {
      const id = video.requestVideoFrameCallback(() => resolve());
      window.setTimeout(() => {
        video.cancelVideoFrameCallback(id);
        resolve();
      }, 100);
      return;
    }
    window.requestAnimationFrame(() => resolve());
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
  await seekTo(video, inT);
  video.pause();

  const videoCfg = await pickVideoConfig(width, height, fps);
  if (!videoCfg) return null;

  const audioCfg = await pickAacConfig();
  const liveAudio = opts.audioTracks.some((t) => t.readyState === "live");

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

  const step = 1 / fps;
  const durationUs = Math.round(1_000_000 / fps);
  const span = Math.max(step, outT - inT);
  let frames = 0;
  let lastTs = -1;

  for (let t = inT, i = 0; t < outT - step / 4; t += step, i += 1) {
    if (videoError) {
      encoder.close();
      return null;
    }
    const media = Math.min(t, outT - step);
    await seekTo(video, media);
    await waitPresented(video);
    paint();
    const ts = Math.max(0, Math.round((media - inT) * 1_000_000));
    if (ts <= lastTs) continue;
    lastTs = ts;
    await waitQueue(encoder);
    if (encoder.state !== "configured") break;
    const frame = new VideoFrame(opts.canvas, { timestamp: ts, duration: durationUs, alpha: "discard" });
    try {
      encoder.encode(frame, { keyFrame: i === 0 || i % (fps * 2) === 0 });
      frames += 1;
    } finally {
      frame.close();
    }
    opts.onPct(Math.min(99, Math.max(0, ((media - inT) / span) * 100)));
  }

  if (frames < 2) {
    encoder.close();
    return null;
  }

  await encoder.flush().catch(() => undefined);
  encoder.close();

  if (audioCfg) {
    if (liveAudio) {
      const audioEncoder = new AudioEncoder({
        output: (chunk, meta) => muxer.addAudioChunk(chunk, meta),
        error: () => {
          /* silent AAC below if this fails */
        },
      });
      audioEncoder.configure(audioCfg);
      const Processor = (window as unknown as {
        MediaStreamTrackProcessor?: new (init: { track: MediaStreamTrack }) => {
          readable: ReadableStream<AudioData>;
        };
      }).MediaStreamTrackProcessor;
      const track = opts.audioTracks[0];
      let audioReader: ReadableStreamDefaultReader<AudioData> | null = null;
      let gotAudio = false;
      if (Processor && track) {
        const processor = new Processor({ track });
        audioReader = processor.readable.getReader();
        void (async () => {
          try {
            for (;;) {
              const { done, value } = await audioReader.read();
              if (done) break;
              if (audioEncoder.state === "configured") {
                audioEncoder.encode(value);
                gotAudio = true;
              }
              value.close();
            }
          } catch {
            /* track ended */
          }
        })();
      }
      await seekTo(video, inT);
      video.playbackRate = 1;
      await video.play().catch(() => undefined);
      await new Promise<void>((resolve) => {
        const watch = () => {
          if (video.currentTime >= outT - 0.02 || video.ended) {
            video.pause();
            resolve();
            return;
          }
          window.requestAnimationFrame(watch);
        };
        watch();
        window.setTimeout(() => {
          video.pause();
          resolve();
        }, Math.min(180000, span * 1000 + 1500));
      });
      if (audioReader) await audioReader.cancel().catch(() => undefined);
      await audioEncoder.flush().catch(() => undefined);
      audioEncoder.close();
      if (!gotAudio) await writeSilentAac(muxer, span, audioCfg);
    } else {
      await writeSilentAac(muxer, span, audioCfg);
    }
  }

  muxer.finalize();
  opts.onPct(100);
  const buffer = target.buffer;
  if (!buffer || buffer.byteLength < 64) return null;
  return { blob: new Blob([buffer], { type: "video/mp4" }), mime: "video/mp4" };
}
