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
  } else if (path.endsWith(".html") || path === "/" || path === "") {
    put(headers, "Cache-Control", "no-store");
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

export function apiHeaders(extra: Record<string, string> = {}) {
  const headers = new Headers(extra);
  applySecurityHeaders(headers, "/api/");
  return headers;
}
