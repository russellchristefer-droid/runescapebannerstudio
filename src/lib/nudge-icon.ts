export function nudgeIcon<T extends { x?: number; y?: number; scale?: number; size?: number }>(
  icon: T,
  dir: "up" | "down" | "left" | "right",
  step: number,
  canvas: { w: number; h: number },
  mark: number,
): T {
  const s = mark * (icon.scale ?? 1);
  let x = icon.x ?? 0;
  let y = icon.y ?? 0;
  if (dir === "left") x = Math.max(0, x - step);
  if (dir === "right") x = Math.min(canvas.w - s, x + step);
  if (dir === "up") y = Math.max(0, y - step);
  if (dir === "down") y = Math.min(canvas.h - s, y + step);
  return { ...icon, x, y };
}