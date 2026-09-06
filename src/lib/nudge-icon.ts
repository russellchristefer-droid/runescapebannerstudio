export function nudgeIcon<T extends { x?: number; y?: number; scale?: number; size?: number }>(
  icon: T,
  dir: "up" | "down" | "left" | "right",
  step: number,
  canvas: { w: number; h: number },
  mark: number,
): T {
  const scale = icon.scale ?? 1;
  const s = Math.max(28, mark * scale);
  const move = step * scale;
  let x = icon.x ?? 0;
  let y = icon.y ?? 0;
  if (dir === "left") x = Math.max(0, x - move);
  if (dir === "right") x = Math.min(canvas.w - s, x + move);
  if (dir === "up") y = Math.max(0, y - move);
  if (dir === "down") y = Math.min(canvas.h - s, y + move);
  return { ...icon, x, y, scale };
}
