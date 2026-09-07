/** Cheap per-process cap. Not a CDN. Stops a single tab from melting Hiscores. */

const hits = new Map<string, number[]>();

export function clientKey(event: { node?: { req?: { headers?: unknown; socket?: { remoteAddress?: string } } } }) {
  const raw = event.node?.req?.headers;
  const headers = raw && typeof raw === "object" && "get" in raw
    ? (raw as Headers)
    : null;
  const xf = headers
    ? headers.get("x-forwarded-for")
    : String((raw as Record<string, string | string[] | undefined> | undefined)?.["x-forwarded-for"] ?? "");
  const ip = (xf.split(",")[0] || event.node?.req?.socket?.remoteAddress || "local").trim();
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
  return new Response("slow down", {
    status: 429,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "retry-after": "30",
      "cache-control": "no-store",
    },
  });
}
