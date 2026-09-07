import { cropInset, layoutName, packBounds, paintRSYellow, plateMetrics } from "@/lib/draw-banner";

export type Stamp = {
  id: string;
  x?: number;
  y?: number;
  size?: number;
  scale?: number;
};

export const PAD = 36;
export const GAP = 8;

export function cellFor(w: number, h = 480) {
  return plateMetrics(w, h).icon;
}

export function levelFor(w: number, h = 480) {
  return plateMetrics(w, h).level;
}

/** Scale factor against a pack that already fits the plate. 1 = fill. */
export function layoutPack<T extends Stamp>(
  stamps: T[],
  exportW: number,
  exportH: number,
  packScale = 1,
): T[] {
  if (!stamps.length) return stamps;
  const m = plateMetrics(exportW, exportH);
  const inset = cropInset(exportW, exportH);
  const n = stamps.length;
  const cols = n >= 24 ? 9 : n >= 16 ? 8 : Math.min(8, Math.max(4, n));
  const rows = Math.max(1, Math.ceil(n / cols));
  const namePad = Math.max(inset.top, m.top + m.name + 8);
  const availW = Math.max(80, exportW - inset.left - inset.right);
  const availH = Math.max(48, exportH - namePad - inset.bottom);
  const levelRatio = (m.level * 2.1) / Math.max(1, m.icon);
  const gapRatio = 0.22;
  const unitX = 1 + levelRatio + gapRatio;
  const maxIconW = availW / (cols * unitX - gapRatio);
  const maxIconH = availH / (rows * (1 + gapRatio) - gapRatio);
  const fitIcon = Math.max(14, Math.floor(Math.min(maxIconW, maxIconH)));
  const factor = Math.min(1, Math.max(0.45, packScale));
  const cell = Math.max(14, Math.floor(fitIcon * factor));
  const levelW = Math.max(12, Math.round(cell * levelRatio));
  const gap = Math.max(4, Math.round(cell * gapRatio));
  const stride = cell + levelW + gap;
  const gridW = cols * stride - gap;
  const gridH = rows * (cell + gap) - gap;
  const originX = Math.round(inset.left + Math.max(0, (availW - gridW) / 2));
  const originY = Math.round(namePad + Math.max(0, (availH - gridH) / 2));
  return stamps.map((s, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const lastCount = n % cols || cols;
    const onLast = row === rows - 1 && lastCount < cols;
    const shift = onLast ? Math.round(((cols - lastCount) * stride) / 2) : 0;
    const x = originX + shift + col * stride;
    const y = originY + row * (cell + gap);
    return {
      ...s,
      size: cell,
      scale: 1,
      x: Math.max(0, Math.min(exportW - cell, x)),
      y: Math.max(0, Math.min(exportH - cell, y)),
    };
  });
}

export function nudgePack<T extends Stamp>(stamps: T[], dx: number, dy: number, w: number, h: number): T[] {
  return stamps.map((s) => {
    if (s.x == null || s.y == null) return s;
    const cell = Math.max(12, (s.size ?? cellFor(w, h)) * (s.scale ?? 1));
    return {
      ...s,
      x: Math.max(0, Math.min(w - cell, s.x + dx)),
      y: Math.max(0, Math.min(h - cell, s.y + dy)),
    };
  });
}

export { packBounds, layoutName, paintRSYellow, plateMetrics };
