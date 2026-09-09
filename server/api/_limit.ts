import { applySecurityHeaders } from "../../src/lib/headers";

const hits = new Map<string, number[]>();

export function clientKey(event: unknown) {
  const node = event && typeof event === "object" && "node" in event ? (event as { node?: { req?: unknown } }).node : undefined;
  const req = node?.req as { headers?: unknown; socket?: { remoteAddress?: string } } | undefined;
  const raw = req?.headers;
  let xf = "";
  if (raw && typeof raw === "object" && "get" in raw && typeof (raw as Headers).get === "function") {
    xf = (raw as Headers).get("x-forwarded-for") ?? "";
  } else if (raw && typeof raw === "object") {
    const bag = raw as Record<string, string | string[] | undefined>;
    const v = bag["x-forwarded-for"] ?? bag["X-Forwarded-For"];
    xf = Array.isArray(v) ? v[0] ?? "" : v ?? "";
  }
  const ip = (xf.split(",")[0] || req?.socket?.remoteAddress || "local").trim();
  return ip.slice(0, 64);
}

export function tooMany(key: string, max = 40, windowMs = 60_000) {
  const now = Date.now();
  const next = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  next.push(now);
  hits.set(key, next);
  if (hits.size > 4000) {
    const first = hits.keys().next().value;
    if (first) hits.delete(first);
  }
  return next.length > max;
}

export function limited() {
  const headers = new Headers({
    "content-type": "text/plain; charset=utf-8",
    "retry-after": "30",
    "cache-control": "no-store",
  });
  applySecurityHeaders(headers, "/api/");
  return new Response("slow down", {
    status: 429,
    headers,
  });
}
