export const PERIOD_MS = 5 * 60 * 1000;

export function stillIndex(length: number, now = Date.now()) {
  if (length <= 0) return 0;
  return Math.floor(now / PERIOD_MS) % length;
}

export function msUntilNext(now = Date.now()) {
  return PERIOD_MS - (now % PERIOD_MS);
}

export function formatRemain(ms: number) {
  const total = Math.max(0, Math.ceil(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
