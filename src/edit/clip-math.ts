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
