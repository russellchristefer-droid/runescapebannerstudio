import { slugPart } from "./filename";
import { sanitizeDisplayName } from "./rsText";

export type ClipAspect = "16x9-1080" | "16x9-720" | "9x16" | "1x1" | "banner";

export const CLIP_ASPECTS: Record<ClipAspect, { w: number; h: number; label: string }> = {
  "16x9-1080": { w: 1920, h: 1080, label: "1080p 16:9" },
  "16x9-720": { w: 1280, h: 720, label: "720p 16:9" },
  "9x16": { w: 1080, h: 1920, label: "9:16" },
  "1x1": { w: 1080, h: 1080, label: "1:1" },
  banner: { w: 1200, h: 480, label: "Banner" },
};

export const CLIP_MAX_BYTES = 500 * 1024 * 1024;
export const CLIP_WARN_SECONDS = 180;
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
  if (typeof MediaRecorder === "undefined") return "";
  const types = [
    "video/webm;codecs=vp9,opus",
    "video/webm;codecs=vp8,opus",
    "video/webm",
    "video/mp4;codecs=avc1.42E01E,mp4a.40.2",
    "video/mp4",
  ];
  return types.find((type) => MediaRecorder.isTypeSupported(type)) ?? "";
}

export function clipExt(mime: string) {
  return mime.includes("mp4") ? "mp4" : "webm";
}

export function clipFileName(edition: "OSRS" | "RS3", name: string, w: number, h: number, mime = "video/webm") {
  const game = edition === "OSRS" ? "osrs" : "rs3";
  return `clip-${slugPart(sanitizeDisplayName(name) || "clip")}-${w}x${h}.${clipExt(mime)}`;
}

export function frameStep(fps: number) {
  return fps > 1 ? 1 / fps : 1 / 30;
}

export function snapTime(t: number, fps: number) {
  const step = frameStep(fps);
  return Math.round(Math.max(0, t) / step) * step;
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

export function orderInOut(a: number, b: number) {
  return a <= b ? [a, b] : [b, a];
}

export function timecode(seconds: number) {
  const safe = Math.max(0, seconds);
  const m = Math.floor(safe / 60);
  const s = safe % 60;
  return `${String(m).padStart(2, "0")}:${s.toFixed(2).padStart(5, "0")}`;
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
