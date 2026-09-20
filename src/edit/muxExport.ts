import { Muxer, ArrayBufferTarget } from "mp4-muxer";
import { pickEncoder } from "./hwEncode";
import { captureSmooth } from "./captureSmooth";
import { seekTo } from "./seekSafe";

export type MuxQ = { w: number; h: number; fps: number; bitrate: number };

function even(n: number) {
  return Math.max(16, n & ~1);
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

async function muxAacFromVideo(
  video: HTMLVideoElement,
  inT: number,
  outT: number,
  muxer: Muxer<ArrayBufferTarget>,
  cfg: AudioEncoderConfig,
) {
  const src = video.currentSrc || video.src;
  if (!src || typeof AudioEncoder === "undefined") return;
  try {
    const raw = await fetch(src).then((r) => r.arrayBuffer());
    const ctx = new AudioContext({ sampleRate: cfg.sampleRate });
    const decoded = await ctx.decodeAudioData(raw.slice(0));
    await ctx.close().catch(() => undefined);
    const encoder = new AudioEncoder({
      output: (chunk, meta) => muxer.addAudioChunk(chunk, meta),
      error: () => {
        /* video-only still downloads */
      },
    });
    encoder.configure(cfg);
    const sampleRate = cfg.sampleRate;
    const hop = 1024;
    const start = Math.max(0, Math.floor(inT * decoded.sampleRate));
    const end = Math.min(decoded.length, Math.ceil(outT * decoded.sampleRate));
    const srcLen = Math.max(1, end - start);
    const ratio = sampleRate / decoded.sampleRate;
    const total = Math.max(hop, Math.round(srcLen * ratio));
    const ch0 = decoded.getChannelData(0);
    const ch1 = decoded.numberOfChannels > 1 ? decoded.getChannelData(1) : ch0;
    let frame = 0;
    while (frame < total) {
      const n = Math.min(hop, total - frame);
      const data = new Float32Array(n * 2);
      for (let i = 0; i < n; i++) {
        const srcI = start + Math.min(srcLen - 1, Math.floor((frame + i) / ratio));
        data[i * 2] = ch0[srcI] || 0;
        data[i * 2 + 1] = ch1[srcI] || 0;
      }
      const audio = new AudioData({
        format: "f32",
        sampleRate,
        numberOfFrames: n,
        numberOfChannels: 2,
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
  } catch {
    /* video-only still plays */
  }
}

/**
 * Play In→Out once. requestVideoFrameCallback + mediaTime. No per-frame seek.
 */
export async function exportMp4(opts: {
  canvas: HTMLCanvasElement;
  video: HTMLVideoElement;
  inT: number;
  outT: number;
  q: MuxQ;
  draw: () => void;
  onPct?: (n: number) => void;
  onLine?: (msg: string) => void;
}): Promise<Blob> {
  const { canvas, video, inT, outT, q, draw } = opts;
  if (typeof VideoEncoder === "undefined" || typeof VideoFrame === "undefined") {
    throw new Error("no-webcodecs");
  }
  const width = even(q.w);
  const height = even(q.h);
  canvas.width = width;
  canvas.height = height;
  const hw = await pickEncoder({ w: width, h: height, fps: q.fps, bitrate: q.bitrate });
  if (!hw) throw new Error("no-avc");

  let audioCfg: AudioEncoderConfig | null = null;
  if (typeof AudioEncoder !== "undefined") {
    for (const sampleRate of [48000, 44100]) {
      const trial: AudioEncoderConfig = {
        codec: "mp4a.40.2",
        numberOfChannels: 2,
        sampleRate,
        bitrate: 192_000,
      };
      const ok = await AudioEncoder.isConfigSupported(trial).catch(() => null);
      if (ok?.supported) {
        audioCfg = { ...trial, ...(ok.config ?? {}) };
        break;
      }
    }
  }

  const target = new ArrayBufferTarget();
  const muxer = new Muxer({
    target,
    video: { codec: "avc", width, height, frameRate: q.fps },
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
    ...hw,
    codec: hw.codec,
    width,
    height,
    bitrate: q.bitrate,
    framerate: q.fps || 30,
    bitrateMode: "variable",
    latencyMode: "quality",
    avc: { format: "avc" },
  });

  const fps = Math.max(1, q.fps);
  const durationUs = Math.round(1_000_000 / fps);
  const span = Math.max(1 / fps, outT - inT);
  let n = 0;
  let lastPts = -1;
  video.pause();
  video.playbackRate = 1;
  video.muted = true;
  video.volume = 0;
  opts.onLine?.("Preparing encoder…");
  await seekTo(video, inT);

  await captureSmooth(video, inT, outT, fps, async (_v, meta) => {
    if (videoError || encoder.state !== "configured") return;
    const pts = meta.mediaTime;
    if (pts === lastPts) return;
    lastPts = pts;
    await waitQueue(encoder);
    if (encoder.state !== "configured") return;
    draw();
    const frame = new VideoFrame(canvas, {
      timestamp: Math.round(pts * 1e6),
      duration: durationUs,
      alpha: "discard",
    });
    try {
      encoder.encode(frame, { keyFrame: n === 0 || n % (fps * 2) === 0 });
      n += 1;
      const pct = Math.min(99, Math.floor(((pts - inT) / Math.max(0.001, span)) * 100));
      opts.onPct?.(pct);
      opts.onLine?.(`Encoding ${pct}%`);
    } finally {
      frame.close();
    }
  });

  if (videoError) throw videoError;
  video.pause();
  video.muted = true;
  video.volume = 0;
  opts.onLine?.("Flushing encoder…");
  try {
    await withTimeout(encoder.flush(), 8000, "flush-timeout");
  } catch {
    opts.onLine?.("Flush timed out — finishing file.");
  }
  try {
    encoder.close();
  } catch {
    /* already closed */
  }
  if (n < 2) throw new Error("no-frames");
  opts.onLine?.("Muxing MP4…");
  if (audioCfg) {
    await Promise.race([
      muxAacFromVideo(video, inT, inT + Math.max(span, n / fps), muxer, audioCfg),
      sleep(8000),
    ]);
  }
  muxer.finalize();
  opts.onLine?.("Saving…");
  opts.onPct?.(100);
  const buffer = target.buffer;
  if (!buffer || buffer.byteLength < 1024) throw new Error("empty-mp4");
  return new Blob([buffer], { type: "video/mp4" });
}

export async function saveMp4OrRecorder(
  args: Parameters<typeof exportMp4>[0] & {
    fallback: () => Promise<void>;
    name: string;
  },
) {
  try {
    const blob = await exportMp4(args);
    const href = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = href;
    a.download = args.name.endsWith(".mp4") ? args.name : `${args.name}.mp4`;
    a.rel = "noopener";
    a.click();
    URL.revokeObjectURL(href);
  } catch {
    await args.fallback();
  }
}
