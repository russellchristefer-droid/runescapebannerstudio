import { Muxer, ArrayBufferTarget } from "mp4-muxer";

export type MuxQ = { w: number; h: number; fps: number; bitrate: number };

function even(n: number) {
  return Math.max(16, n & ~1);
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
  return new Promise<void>((resolve, reject) => {
    if (Math.abs((video.currentTime || 0) - target) < 0.012 && video.readyState >= 2) {
      resolve();
      return;
    }
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      video.removeEventListener("seeked", finish);
      video.removeEventListener("error", fail);
      resolve();
    };
    const fail = () => {
      if (done) return;
      done = true;
      video.removeEventListener("seeked", finish);
      video.removeEventListener("error", fail);
      reject(new Error("seek"));
    };
    video.addEventListener("seeked", finish);
    video.addEventListener("error", fail);
    try {
      video.currentTime = target;
    } catch {
      fail();
      return;
    }
    window.setTimeout(finish, 160);
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

const CODEC_CFG = [
  { codec: "avc1.640028", mux: "avc" as const },
  { codec: "avc1.4D401F", mux: "avc" as const },
  { codec: "avc1.4D0028", mux: "avc" as const },
  { codec: "avc1.42E01E", mux: "avc" as const },
];

export async function pickAvc(q: MuxQ) {
  if (typeof VideoEncoder === "undefined") return null;
  const width = even(q.w);
  const height = even(q.h);
  for (const c of CODEC_CFG) {
    try {
      const ok = await VideoEncoder.isConfigSupported({
        codec: c.codec,
        width,
        height,
        bitrate: q.bitrate,
        framerate: q.fps,
        avc: { format: "avc" },
        latencyMode: "quality",
      });
      if (ok.supported) return c;
    } catch {
      /* next */
    }
  }
  return null;
}

/**
 * WebCodecs H.264 + mp4-muxer. Raw EncodedVideoChunk blobs do not play in VLC.
 * Short clips seek frame-by-frame. Longer spans play once and mux the same way.
 */
export async function exportMp4(opts: {
  canvas: HTMLCanvasElement;
  video: HTMLVideoElement;
  inT: number;
  outT: number;
  q: MuxQ;
  draw: () => void;
  onPct?: (n: number) => void;
}): Promise<Blob> {
  const { canvas, video, inT, outT, q, draw } = opts;
  if (typeof VideoEncoder === "undefined" || typeof VideoFrame === "undefined") {
    throw new Error("no-webcodecs");
  }
  const width = even(q.w);
  const height = even(q.h);
  canvas.width = width;
  canvas.height = height;
  const picked = await pickAvc({ ...q, w: width, h: height });
  if (!picked) throw new Error("no-avc");

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
    video: { codec: picked.mux, width, height, frameRate: q.fps },
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
    codec: picked.codec,
    width,
    height,
    bitrate: q.bitrate,
    framerate: q.fps,
    latencyMode: "quality",
    avc: { format: "avc" },
  });

  const fps = Math.max(1, q.fps);
  const durationUs = Math.round(1_000_000 / fps);
  const span = Math.max(1 / fps, outT - inT);
  let n = 0;
  video.pause();

  const push = async (key = false) => {
    if (videoError || encoder.state !== "configured") return;
    await waitQueue(encoder);
    if (encoder.state !== "configured") return;
    draw();
    const frame = new VideoFrame(canvas, {
      timestamp: n * durationUs,
      duration: durationUs,
      alpha: "discard",
    });
    try {
      encoder.encode(frame, { keyFrame: key || n === 0 || n % (fps * 2) === 0 });
      n += 1;
      opts.onPct?.(Math.min(95, Math.max(0, (n / Math.max(1, Math.round(span * fps))) * 95)));
    } finally {
      frame.close();
    }
  };

  if (span <= 90) {
    let t = inT;
    const dt = 1 / fps;
    while (t < outT - 0.001) {
      await seekTo(video, t).catch(() => undefined);
      await push(n % (fps * 2) === 0);
      t += dt;
    }
  } else {
    await seekTo(video, inT).catch(() => undefined);
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
          void push(true).then(finish);
          return;
        }
        const expected = inT + n / fps;
        if (media >= expected - 0.25 / fps) void push();
        window.requestAnimationFrame(tick);
      };
      window.requestAnimationFrame(tick);
      window.setTimeout(finish, Math.min(45 * 60 * 1000, span * 4000 + 8000));
    });
  }

  if (videoError) throw videoError;
  opts.onPct?.(97);
  await Promise.race([encoder.flush().catch(() => undefined), sleep(5000)]);
  try {
    encoder.close();
  } catch {
    /* already closed */
  }
  if (n < 2) throw new Error("no-frames");
  opts.onPct?.(98);
  if (audioCfg) {
    await muxAacFromVideo(video, inT, inT + Math.max(span, n / fps), muxer, audioCfg);
  }
  opts.onPct?.(99);
  muxer.finalize();
  opts.onPct?.(100);
  const buffer = target.buffer;
  if (!buffer || buffer.byteLength < 64) throw new Error("empty-mp4");
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
