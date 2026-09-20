import { slugPart } from "@/lib/filename";
import { sanitizeDisplayName } from "@/lib/rsText";
import { pickRecorderMime } from "./quality";

export {
  clampRange,
  clipSnapFps,
  frameStep,
  nextMarkerTime,
  normalizeGainPct,
  orderInOut,
  prevMarkerTime,
  snapTime,
  timecode,
  clampPlateLay,
  scalePlateLay,
  plateHandleHit,
  resizePlateLay,
  bannerFitLay,
  bannerStretchLay,
  type PlateLay,
  type PlateHandle,
} from "./clip-math";

export type ClipAspect = "16x9-1080" | "16x9-720" | "9x16" | "1x1" | "banner";

export const CLIP_ASPECTS: Record<ClipAspect, { w: number; h: number; label: string }> = {
  "16x9-1080": { w: 1920, h: 1080, label: "1080p 16:9" },
  "16x9-720": { w: 1280, h: 720, label: "720p 16:9" },
  "9x16": { w: 1080, h: 1920, label: "9:16" },
  "1x1": { w: 1080, h: 1080, label: "1:1" },
  banner: { w: 1200, h: 480, label: "Banner" },
};

/** Chip `data-crop` labels. Pixels are CLIP_ASPECTS / FORMAT. */
export const FORMAT = {
  "16:9-1080": { w: 1920, h: 1080 },
  "16:9-720": { w: 1280, h: 720 },
  "9:16": { w: 1080, h: 1920 },
  "1:1": { w: 1080, h: 1080 },
  banner: { w: 1200, h: 480 },
} as const;

export const CROP_ATTR: Record<ClipAspect, keyof typeof FORMAT> = {
  "16x9-1080": "16:9-1080",
  "16x9-720": "16:9-720",
  "9x16": "9:16",
  "1x1": "1:1",
  banner: "banner",
};

export const CLIP_MAX_BYTES = 2 * 1024 * 1024 * 1024;
export const CLIP_WARN_SECONDS = 600;
export const EDIT_PREFS = "rsbs.edit.v1";

export const CLIP_MARKS: { id: string; name: string; games: Array<"OSRS" | "RS3">; src: string }[] = [
  { id: "none", name: "None", games: ["OSRS", "RS3"], src: "" },
  { id: "iron", name: "Ironman", games: ["OSRS", "RS3"], src: "/marks/osrs-ironman.png" },
  { id: "fire", name: "Fire cape", games: ["OSRS"], src: "/marks/osrs-fire-cape.png" },
  { id: "infernal", name: "Infernal", games: ["OSRS"], src: "/marks/osrs-infernal-cape.png" },
  { id: "tob", name: "ToB", games: ["OSRS"], src: "/marks/osrs-protect-melee.png" },
  { id: "toa", name: "ToA", games: ["OSRS"], src: "/marks/osrs-protect-magic.png" },
  { id: "telos", name: "Telos", games: ["RS3"], src: "/marks/rs3-max.png" },
];

export const CLIP_CAPTIONS = [
  "None",
  "First kc",
  "Wipe",
  "Inferno attempt",
  "99",
  "Learner",
  "Enrage",
  "Custom",
] as const;


export function clipMime() {
  return pickRecorderMime();
}

export function clipExt(mime?: string) {
  return /webm/i.test(mime || "") ? "webm" : "mp4";
}

export function clipFileName(edition: "OSRS" | "RS3", name: string, w: number, h: number, mime = "video/mp4") {
  void edition;
  const who = slugPart(sanitizeDisplayName(name) || "christefer-1", 24);
  return `${who}-${w}x${h}.${clipExt(mime)}`;
}

export function snapToPoints(t: number, points: number[], windowSec: number) {
  let best = t;
  let dist = windowSec;
  for (const p of points) {
    const d = Math.abs(p - t);
    if (d <= dist) {
      dist = d;
      best = p;
    }
  }
  return best;
}

export function coverRect(srcW: number, srcH: number, dstW: number, dstH: number) {
  const srcRatio = srcW / Math.max(1, srcH);
  const dstRatio = dstW / dstH;
  let sx = 0;
  let sy = 0;
  let sw = srcW;
  let sh = srcH;
  if (srcRatio > dstRatio) {
    sw = srcH * dstRatio;
    sx = (srcW - sw) / 2;
  } else {
    sh = srcW / dstRatio;
    sy = (srcH - sh) / 2;
  }
  return { sx, sy, sw, sh };
}

export type StillShape = "native" | "16x9" | "9x16" | "1x1";

export function stillShapeRatio(shape: StillShape, imgW: number, imgH: number) {
  if (shape === "16x9") return 16 / 9;
  if (shape === "9x16") return 9 / 16;
  if (shape === "1x1") return 1;
  return imgW / Math.max(1, imgH);
}

/** Centre a still in the frame. Native keeps the photo's own ratio — no forced banner strip. fill=1 uses the whole plate. */
export function fitStillLayout(
  frameW: number,
  frameH: number,
  imgW: number,
  imgH: number,
  shape: StillShape = "native",
  fill = 1,
): { x: number; y: number; w: number; h: number } {
  const ratio = stillShapeRatio(shape, imgW, imgH);
  const maxW = Math.max(8, frameW * fill);
  const maxH = Math.max(8, frameH * fill);
  let w = maxW;
  let h = w / Math.max(0.05, ratio);
  if (h > maxH) {
    h = maxH;
    w = h * ratio;
  }
  return {
    x: (frameW - w) / 2 / Math.max(1, frameW),
    y: (frameH - h) / 2 / Math.max(1, frameH),
    w: w / Math.max(1, frameW),
    h: h / Math.max(1, frameH),
  };
}

export function loadEditPrefs(): { aspect?: ClipAspect; overlay?: "off" | "top" | "lower" } {
  try {
    return JSON.parse(localStorage.getItem(EDIT_PREFS) || "{}") as {
      aspect?: ClipAspect;
      overlay?: "off" | "top" | "lower";
    };
  } catch {
    return {};
  }
}

export function saveEditPrefs(aspect: ClipAspect, overlay: "off" | "top" | "lower") {
  try {
    localStorage.setItem(EDIT_PREFS, JSON.stringify({ aspect, overlay }));
  } catch {
    /* private mode */
  }
}

export function peakDb(peak: number) {
  if (!Number.isFinite(peak) || peak <= 0.001) return "-∞";
  return `${Math.max(-60, 20 * Math.log10(peak)).toFixed(1)}`;
}

export function formatBytes(n: number) {
  if (!Number.isFinite(n) || n <= 0) return "";
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

export function releaseVideo(video: HTMLVideoElement | null, url: string | null) {
  if (video) {
    video.pause();
    video.removeAttribute("src");
    video.load();
  }
  if (url) URL.revokeObjectURL(url);
}
