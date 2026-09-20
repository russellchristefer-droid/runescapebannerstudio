export const QUALITY = {
  tiktok: { w: 1080, h: 1920, fps: 30, videoBps: 6_500_000, audioBps: 128_000 },
  yt16: { w: 1920, h: 1080, fps: 30, videoBps: 6_500_000, audioBps: 128_000 },
  yt720: { w: 1280, h: 720, fps: 30, videoBps: 6_500_000, audioBps: 128_000 },
  square: { w: 1080, h: 1080, fps: 30, videoBps: 6_500_000, audioBps: 128_000 },
  banner: { w: 1200, h: 480, fps: 30, videoBps: 6_500_000, audioBps: 128_000 },
} as const;

export const FORMAT = {
  "16:9-1080": { w: 1920, h: 1080 },
  "16:9-720": { w: 1280, h: 720 },
  "9:16": { w: 1080, h: 1920 },
  "1:1": { w: 1080, h: 1080 },
  banner: { w: 1200, h: 480 },
} as const;

export const LADDER = {
  small: { video: 4_000_000, audio: 96_000 },
  balanced: { video: 6_500_000, audio: 128_000 },
  high: { video: 10_000_000, audio: 160_000 },
} as const;

export type Pack = keyof typeof LADDER;
export type QualityKey = keyof typeof QUALITY;
export type QualityPreset = {
  w: number;
  h: number;
  fps: number;
  videoBps: number;
  audioBps: number;
  bitrateMode?: "variable" | "constant";
};

function even(n: number) {
  return Math.max(16, n & ~1);
}

export function qualityKeyForAspect(aspect: string): QualityKey {
  if (aspect === "9x16") return "tiktok";
  if (aspect === "16x9-1080") return "yt16";
  if (aspect === "16x9-720") return "yt720";
  if (aspect === "1x1") return "square";
  return "banner";
}

export function qualityForAspect(aspect: string): QualityPreset {
  return QUALITY[qualityKeyForAspect(aspect)];
}

export function qualityForSize(w: number, h: number): QualityPreset {
  if (w === 1080 && h === 1920) return QUALITY.tiktok;
  if (w === 1920 && h === 1080) return QUALITY.yt16;
  if (w === 1280 && h === 720) return QUALITY.yt720;
  if (w === 1080 && h === 1080) return QUALITY.square;
  if (w === 1200 && h === 480) return QUALITY.banner;
  if (h > w) return QUALITY.tiktok;
  const pixels = w * h;
  if (pixels >= 1920 * 1080) return QUALITY.yt16;
  if (pixels >= 1080 * 1080) return QUALITY.square;
  if (pixels >= 1280 * 720) return QUALITY.yt720;
  return QUALITY.banner;
}

/** Chip canvas, never upscale a smaller source. Keeps the crop ratio. */
export function exportBox(chipW: number, chipH: number, srcW: number, srcH: number) {
  const cw = even(chipW);
  const ch = even(chipH);
  const sw = Math.max(16, srcW || cw);
  const sh = Math.max(16, srcH || ch);
  if (sw >= cw || sh >= ch) return { w: cw, h: ch };
  const s = Math.min(sw / cw, sh / ch);
  return { w: even(Math.max(16, Math.round(cw * s))), h: even(Math.max(16, Math.round(ch * s))) };
}

export function applyPack(q: { w: number; h: number; fps?: number }, pack: Pack = "balanced"): QualityPreset {
  const bits = LADDER[pack];
  return {
    w: even(q.w),
    h: even(q.h),
    fps: 30,
    videoBps: bits.video,
    audioBps: bits.audio,
    bitrateMode: "variable",
  };
}

export function clipVideoBitrate(width: number, height: number, pack: Pack = "balanced") {
  void width;
  void height;
  return LADDER[pack].video;
}

export function pickRecorderMime() {
  if (typeof MediaRecorder === "undefined") return "";
  const list = [
    "video/mp4;codecs=avc1.640028,mp4a.40.2",
    "video/mp4;codecs=avc1.4D0028,mp4a.40.2",
    "video/mp4;codecs=avc1.42E01E,mp4a.40.2",
    "video/mp4;codecs=h264,mp4a.40.2",
    "video/mp4;codecs=avc1.42E01E",
    "video/mp4",
    "video/webm;codecs=vp9,opus",
    "video/webm;codecs=vp8,opus",
    "video/webm",
  ];
  return list.find((m) => MediaRecorder.isTypeSupported(m)) ?? "";
}

/** Cover-scale the clip onto the export plate. Real size, high-quality resample. */
export function drawHi(ctx: CanvasRenderingContext2D, video: HTMLVideoElement, w: number, h: number) {
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.fillStyle = "#0b0a08";
  ctx.fillRect(0, 0, w, h);
  const vw = video.videoWidth || w;
  const vh = video.videoHeight || h;
  const s = Math.max(w / Math.max(1, vw), h / Math.max(1, vh));
  ctx.drawImage(video, (w - vw * s) / 2, (h - vh * s) / 2, vw * s, vh * s);
}

/** Same cover as the desk. Preview CSS must not change w/h. */
export const drawCover = drawHi;
