export function clipSnapFps(raw: number) {
  if (raw >= 50) return 60;
  if (raw >= 40) return 48;
  if (raw >= 28) return 30;
  if (raw >= 22) return 24;
  return 30;
}

export function nextMarkerTime(now: number, markers: number[]) {
  const next = markers.find((m) => m > now + 0.02);
  return next ?? markers[0] ?? now;
}

export function prevMarkerTime(now: number, markers: number[]) {
  const before = markers.filter((m) => m < now - 0.02);
  return before.length ? before[before.length - 1] : markers[markers.length - 1] ?? now;
}

export function normalizeGainPct(peak: number, current: number) {
  if (!(peak > 0.04)) return current;
  return Math.min(200, Math.max(10, Math.round(current * (0.89 / peak))));
}

export function clampRange(t: number, min: number, max: number) {
  return Math.max(min, Math.min(max, t));
}

export function frameStep(fps: number) {
  return fps > 1 ? 1 / fps : 1 / 30;
}

export function snapTime(t: number, fps: number) {
  const step = frameStep(fps);
  return Math.round(Math.max(0, t) / step) * step;
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

export type PlateLay = { x: number; y: number; w: number; h: number };
export type PlateHandle = "move" | "nw" | "ne" | "sw" | "se" | "n" | "e" | "s" | "w";

/** Keep the photo's ratio when a scale would otherwise hit the plate edge. */
export function clampPlateLay(lay: PlateLay, lockAspect = true): PlateLay {
  const aspect = lay.h / Math.max(0.0001, lay.w);
  let w = lay.w;
  let h = lay.h;
  if (lockAspect) {
    if (w > 1) {
      w = 1;
      h = w * aspect;
    }
    if (h > 1) {
      h = 1;
      w = h / aspect;
    }
    if (w < 0.06) {
      w = 0.06;
      h = w * aspect;
    }
    if (h < 0.04) {
      h = 0.04;
      w = h / aspect;
    }
    const fit = Math.min(1 / Math.max(0.0001, w), 1 / Math.max(0.0001, h), 1);
    w *= fit;
    h *= fit;
  } else {
    w = Math.min(1, Math.max(0.06, w));
    h = Math.min(1, Math.max(0.04, h));
  }
  return {
    w,
    h,
    x: Math.min(1 - w, Math.max(0, lay.x)),
    y: Math.min(1 - h, Math.max(0, lay.y)),
  };
}

export function scalePlateLay(lay: PlateLay, factor: number): PlateLay {
  const cx = lay.x + lay.w / 2;
  const cy = lay.y + lay.h / 2;
  const nw = lay.w * factor;
  const nh = lay.h * factor;
  return clampPlateLay({ w: nw, h: nh, x: cx - nw / 2, y: cy - nh / 2 });
}

export function plateHandleHit(
  lay: PlateLay,
  px: number,
  py: number,
  cw: number,
  ch: number,
  pad = 22,
): PlateHandle | null {
  const x = lay.x * cw;
  const y = lay.y * ch;
  const w = lay.w * cw;
  const h = lay.h * ch;
  const corners: Array<[PlateHandle, number, number]> = [
    ["nw", x, y],
    ["ne", x + w, y],
    ["sw", x, y + h],
    ["se", x + w, y + h],
  ];
  for (const [id, cx, cy] of corners) {
    if (Math.abs(px - cx) <= pad && Math.abs(py - cy) <= pad) return id;
  }
  const edges: Array<[PlateHandle, number, number]> = [
    ["n", x + w / 2, y],
    ["s", x + w / 2, y + h],
    ["w", x, y + h / 2],
    ["e", x + w, y + h / 2],
  ];
  for (const [id, cx, cy] of edges) {
    if (Math.abs(px - cx) <= pad && Math.abs(py - cy) <= pad) return id;
  }
  if (px >= x && px <= x + w && py >= y && py <= y + h) return "move";
  return null;
}

export function resizePlateLay(lay: PlateLay, handle: PlateHandle, nx: number, ny: number): PlateLay {
  if (handle === "move") return clampPlateLay({ ...lay, x: nx, y: ny }, false);
  const aspect = lay.h / Math.max(0.0001, lay.w);
  let x = lay.x;
  let y = lay.y;
  let w = lay.w;
  let h = lay.h;
  const right = lay.x + lay.w;
  const bottom = lay.y + lay.h;
  const midX = lay.x + lay.w / 2;
  const midY = lay.y + lay.h / 2;
  if (handle === "se") {
    w = Math.max(0.06, nx - lay.x);
    h = w * aspect;
  } else if (handle === "sw") {
    w = Math.max(0.06, right - nx);
    h = w * aspect;
    x = right - w;
  } else if (handle === "ne") {
    w = Math.max(0.06, nx - lay.x);
    h = w * aspect;
    y = bottom - h;
  } else if (handle === "nw") {
    w = Math.max(0.06, right - nx);
    h = w * aspect;
    x = right - w;
    y = bottom - h;
  } else if (handle === "e") {
    w = Math.max(0.06, nx - lay.x);
    h = w * aspect;
    y = midY - h / 2;
  } else if (handle === "w") {
    w = Math.max(0.06, right - nx);
    h = w * aspect;
    x = right - w;
    y = midY - h / 2;
  } else if (handle === "s") {
    h = Math.max(0.04, ny - lay.y);
    w = h / aspect;
    x = midX - w / 2;
  } else {
    h = Math.max(0.04, bottom - ny);
    w = h / aspect;
    y = bottom - h;
    x = midX - w / 2;
  }
  return clampPlateLay({ x, y, w, h });
}

/** Desk banner strip for this crop. Same-ratio plates fill. Others dock a strip. */
export function bannerFitLay(
  frameW: number,
  frameH: number,
  imgW: number,
  imgH: number,
  pos: "top" | "lower",
): PlateLay {
  const aspect = Math.max(0.25, imgW / Math.max(1, imgH));
  const frameAspect = frameW / Math.max(1, frameH);
  if (Math.abs(frameAspect - aspect) / aspect < 0.12) {
    return { x: 0, y: 0, w: 1, h: 1 };
  }
  const portrait = frameH > frameW;
  const square = Math.abs(frameW - frameH) / Math.max(1, frameW) < 0.04;
  const maxFrac = portrait ? 0.28 : square ? 0.34 : frameH <= 480 ? 0.5 : 0.3;
  const maxH = Math.round(frameH * maxFrac);
  let w = frameW;
  let h = Math.round(frameW / aspect);
  if (h > maxH) {
    h = maxH;
    w = Math.round(h * aspect);
  }
  if (w >= frameW * 0.9) {
    w = frameW;
    h = Math.min(maxH, Math.round(frameW / aspect));
  }
  return {
    x: (frameW - w) / 2 / Math.max(1, frameW),
    y: (pos === "top" ? 0 : Math.max(0, frameH - h)) / Math.max(1, frameH),
    w: Math.max(1, w) / Math.max(1, frameW),
    h: Math.max(1, h) / Math.max(1, frameH),
  };
}
