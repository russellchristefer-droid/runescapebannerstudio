import { encodeClipMp4, canEncodeMp4 } from "./encode-mp4";

export type WebCodecsQ = { w: number; h: number; fps: number; bitrate: number };

export function canWebCodecs() {
  return typeof VideoEncoder !== "undefined" && typeof VideoFrame !== "undefined";
}

const CODEC_CANDIDATES = ["avc1.640028", "avc1.4D0028", "avc1.42E01E", "avc1.42001E"] as const;

/** AVC only — VP8/VP9 would not go through the MP4 muxer. */
export async function pickCodec(q: WebCodecsQ) {
  if (!canWebCodecs()) return "";
  for (const codec of CODEC_CANDIDATES) {
    try {
      const ok = await VideoEncoder.isConfigSupported({
        codec,
        width: q.w & ~1,
        height: q.h & ~1,
        bitrate: q.bitrate,
        framerate: q.fps,
        avc: { format: "avc" },
        latencyMode: "quality",
      });
      if (ok.supported) return codec;
    } catch {
      /* next */
    }
  }
  return "";
}

/**
 * WebCodecs encoder + mp4-muxer. Raw EncodedVideoChunk dumps do not play in VLC.
 * Throws `no-webcodecs` / `no-codec` so Save can fall back to MediaRecorder.
 */
export async function encodeClip(opts: {
  canvas: HTMLCanvasElement;
  video: HTMLVideoElement;
  inT: number;
  outT: number;
  q: WebCodecsQ;
  draw: () => void;
  onPct?: (n: number) => void;
  audioTracks?: MediaStreamTrack[];
}): Promise<Blob> {
  const { canvas, video, inT, outT, q, draw } = opts;
  if (!canWebCodecs() || !canEncodeMp4()) throw new Error("no-webcodecs");
  canvas.width = q.w;
  canvas.height = q.h;
  const codec = await pickCodec(q);
  if (!codec) throw new Error("no-codec");
  const out = await encodeClipMp4({
    canvas,
    paint: draw,
    video,
    inT,
    outT,
    w: q.w,
    h: q.h,
    audioTracks: opts.audioTracks ?? [],
    onPct: opts.onPct ?? (() => {}),
  });
  if (!out?.blob || out.blob.size < 64) throw new Error("no-webcodecs");
  return out.blob;
}
