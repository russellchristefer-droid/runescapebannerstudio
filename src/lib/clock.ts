export function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function formatRemain(ms: number) {
  const safe = Math.max(0, ms);
  const h = Math.floor(safe / 3_600_000);
  const m = Math.floor((safe % 3_600_000) / 60_000);
  const s = Math.floor((safe % 60_000) / 1000);
  if (h >= 1) return `${h}h ${pad(m)}m`;
  return `${m}m ${pad(s)}s`;
}

export function untilUtcHour(now: Date) {
  const next = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours() + 1,
    0,
    0,
  );
  return formatRemain(next - now.getTime());
}

export function untilUtcMidnight(now: Date) {
  const next = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + 1,
    0,
    0,
    0,
  );
  return formatRemain(next - now.getTime());
}

export function nextMidnightUtc(now: Date) {
  return Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + 1,
    0,
    0,
    0,
  );
}
