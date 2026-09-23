import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { SECURITY_HEADERS, applySecurityHeaders, apiHeaders } from "./headers.ts";

describe("security headers", () => {
  it("always sends nosniff, no frames, and no plugins", () => {
    assert.equal(SECURITY_HEADERS["X-Content-Type-Options"], "nosniff");
    assert.match(SECURITY_HEADERS["Content-Security-Policy"], /frame-ancestors 'none'/);
    assert.match(SECURITY_HEADERS["Content-Security-Policy"], /object-src 'none'/);
    assert.match(SECURITY_HEADERS["Content-Security-Policy"], /base-uri 'self'/);
    assert.equal(SECURITY_HEADERS["X-Frame-Options"], "DENY");
    assert.match(SECURITY_HEADERS["Permissions-Policy"], /camera=\(\)/);
    assert.match(SECURITY_HEADERS["Permissions-Policy"], /microphone=\(\)/);
    assert.match(SECURITY_HEADERS["Permissions-Policy"], /geolocation=\(\)/);
    assert.equal(SECURITY_HEADERS["Referrer-Policy"], "strict-origin-when-cross-origin");
  });

  it("keeps share stills fetchable for cards and locks the rest", () => {
    const share = new Map<string, string>();
    applySecurityHeaders(share, "/og.jpg");
    assert.equal(share.get("Cross-Origin-Resource-Policy"), "cross-origin");
    const desk = new Map<string, string>();
    applySecurityHeaders(desk, "/");
    assert.equal(desk.get("Cross-Origin-Resource-Policy"), "same-origin");
  });

  it("only sends HSTS on HTTPS", () => {
    const http = new Map<string, string>();
    applySecurityHeaders(http, "/", false);
    assert.equal(http.get("Strict-Transport-Security"), undefined);
    const tls = new Map<string, string>();
    applySecurityHeaders(tls, "/", true);
    assert.equal(tls.get("Strict-Transport-Security"), "max-age=15552000");
  });

  it("marks API as no-store unless the caller shares a public board", () => {
    const headers = apiHeaders({ "content-type": "application/json; charset=utf-8" });
    assert.equal(headers.get("cache-control"), "no-store");
    assert.equal(headers.get("x-content-type-options"), "nosniff");
  });

  it("lets a live board share a short public cache", () => {
    const headers = apiHeaders({
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=15, s-maxage=20, stale-while-revalidate=20",
    });
    assert.match(headers.get("cache-control") ?? "", /public/);
    assert.equal(headers.get("x-content-type-options"), "nosniff");
  });

  it("does not let Legal stills sit for a week", () => {
    const page = new Map<string, string>();
    applySecurityHeaders(page, "/legal");
    assert.equal(page.get("Cache-Control"), "no-store");
    const still = new Map<string, string>();
    applySecurityHeaders(still, "/legal/truth-social-2025-06-05.png");
    assert.equal(still.get("Cache-Control"), "no-store");
  });

  it("keeps town stills warm and hashed assets immutable", () => {
    const town = new Map<string, string>();
    applySecurityHeaders(town, "/Falador.jpg");
    assert.equal(
      town.get("Cache-Control"),
      "public, max-age=604800, stale-while-revalidate=86400",
    );
    const hashed = new Map<string, string>();
    applySecurityHeaders(hashed, "/assets/styles-BKXo7-YO.css");
    assert.equal(hashed.get("Cache-Control"), "public, max-age=31536000, immutable");
  });
});
