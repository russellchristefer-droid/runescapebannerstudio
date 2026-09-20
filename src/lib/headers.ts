/** One stamp. Used by Vite, Nitro, Vercel, and /api. */

export const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "DENY",
  "Content-Security-Policy":
    "frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'",
  "Permissions-Policy":
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "X-Permitted-Cross-Domain-Policies": "none",
  "X-DNS-Prefetch-Control": "off",
};

const SHARE = /^\/(og\.jpg|x-banner\.jpg|favicon\.svg|__grok\/)/;

function put(
  headers: { set?(name: string, value: string): unknown; setHeader?(name: string, value: string): unknown },
  name: string,
  value: string,
) {
  if (typeof headers.set === "function") headers.set(name, value);
  else headers.setHeader?.(name, value);
}

export function applySecurityHeaders(
  headers: { set?(name: string, value: string): unknown; setHeader?(name: string, value: string): unknown },
  path = "",
  https = false,
) {
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    put(headers, key, value);
  }
  put(headers, "Cross-Origin-Resource-Policy", SHARE.test(path) ? "cross-origin" : "same-origin");
  if (https) {
    put(headers, "Strict-Transport-Security", "max-age=15552000");
  }
  if (path.startsWith("/assets/")) {
    put(headers, "Cache-Control", "public, max-age=31536000, immutable");
  } else if (path.startsWith("/api/")) {
    put(headers, "Cache-Control", "no-store");
    put(headers, "X-Robots-Tag", "noindex");
  } else if (
    path.endsWith(".html") ||
    path === "/" ||
    path === "" ||
    path === "/legal" ||
    path.startsWith("/legal/")
  ) {
    put(headers, "Cache-Control", "no-store");
  } else if (/\.(?:jpe?g|png|webp|avif|gif|svg|ico)$/i.test(path)) {
    put(headers, "Cache-Control", "public, max-age=604800, stale-while-revalidate=86400");
  }
}

export function stampResponse(response: Response, path = "", https = false) {
  const headers = new Headers(response.headers);
  applySecurityHeaders(headers, path, https);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export const LIVE_CACHE = "public, max-age=15, s-maxage=20, stale-while-revalidate=20";
export const HISCORE_CACHE = "public, max-age=30, s-maxage=30";

export function apiHeaders(extra: Record<string, string> = {}) {
  const headers = new Headers();
  applySecurityHeaders(headers, "/api/");
  for (const [name, value] of Object.entries(extra)) {
    headers.set(name, value);
  }
  return headers;
}
