export const QUALITY = {
  tiktok: { w: 1080, h: 1920, fps: 30, videoBps: 12_000_000, audioBps: 192_000 },
  yt16: { w: 1920, h: 1080, fps: 30, videoBps: 12_000_000, audioBps: 192_000 },
  yt720: { w: 1280, h: 720, fps: 30, videoBps: 8_000_000, audioBps: 160_000 },
  square: { w: 1080, h: 1080, fps: 30, videoBps: 10_000_000, audioBps: 192_000 },
  banner: { w: 1200, h: 480, fps: 30, videoBps: 6_000_000, audioBps: 128_000 },
} as const;

export type QualityKey = keyof typeof QUALITY;
export type QualityPreset = (typeof QUALITY)[QualityKey];

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

export function clipVideoBitrate(width: number, height: number) {
  return qualityForSize(width, height).videoBps;
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
