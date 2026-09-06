import { layoutName, packBounds, paintRSYellow, plateMetrics } from "@/lib/draw-banner";

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

export function layoutPack<T extends Stamp>(
  stamps: T[],
  exportW: number,
  exportH: number,
  packScale = 1,
): T[] {
  if (!stamps.length) return stamps;
  const cell = Math.max(12, Math.round(cellFor(exportW, exportH) * packScale));
  const levelW = Math.round(levelFor(exportW, exportH) * 2.1 * packScale);
  const gap = Math.max(GAP, Math.round(cell * 0.2));
  const stride = cell + levelW + gap;
  const cols = Math.max(1, Math.floor((exportW - PAD * 2 + gap) / stride));
  const rows = Math.max(1, Math.ceil(stamps.length / cols));
  const gridW = cols * stride - gap;
  const gridH = rows * (cell + gap) - gap;
  let originX = Math.round((exportW - gridW) / 2);
  let originY = Math.round(Math.max(PAD + 28, (exportH - gridH) / 2));
  if (originY + gridH > exportH - PAD) {
    const fit = Math.max(0.4, (exportH - PAD * 2) / Math.max(1, gridH));
    return layoutPack(stamps, exportW, exportH, packScale * fit);
  }
  return stamps.map((s, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const lastCount = stamps.length % cols || cols;
    const onLast = row === rows - 1 && lastCount < cols;
    const shift = onLast ? Math.round(((cols - lastCount) * stride) / 2) : 0;
    return {
      ...s,
      size: cell,
      scale: 1,
      x: originX + shift + col * stride,
      y: originY + row * (cell + gap),
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
