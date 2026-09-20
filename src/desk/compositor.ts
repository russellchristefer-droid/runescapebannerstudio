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

/** Pack stamps into the plate. Tight strip under the name — never fills the still. */
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
  const short = exportH <= 520;
  const cols = short
    ? n >= 24
      ? 8
      : n >= 18
        ? 7
        : n >= 12
          ? 6
          : Math.min(6, Math.max(4, n))
    : n >= 24
      ? 8
      : n >= 16
        ? 7
        : Math.min(7, Math.max(4, n));
  const rows = Math.max(1, Math.ceil(n / cols));
  const namePad = m.top + m.name + 10;
  const availW = Math.max(64, exportW - inset.left - inset.right);
  const availH = Math.max(40, exportH - namePad - inset.bottom);
  const factor = Math.min(1, Math.max(0.45, packScale));
  const cap = short ? 40 : exportH >= 1000 ? 52 : 44;
  const levelW = Math.max(26, Math.round(m.level * 1.7));
  let cell = Math.max(16, Math.min(cap, Math.floor(m.icon * factor)));
  let gap = Math.max(4, Math.round(cell * 0.16));
  const fits = (c: number, g: number) => {
    const stride = c + levelW + g;
    return cols * stride - g <= availW && rows * (c + g) - g <= availH;
  };
  while (!fits(cell, gap) && cell > 16) {
    cell -= 1;
    gap = Math.max(4, Math.round(cell * 0.16));
  }
  const stride = cell + levelW + gap;
  const gridW = cols * stride - gap;
  const originX = Math.round(inset.left + Math.max(0, (availW - gridW) / 2));
  const originY = namePad;
  const maxX = exportW - inset.right - cell - levelW;
  const maxY = exportH - inset.bottom - cell;
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
      x: Math.max(inset.left, Math.min(maxX, x)),
      y: Math.max(namePad, Math.min(maxY, y)),
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
