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

  it("marks API as no-store", () => {
    const headers = apiHeaders({ "content-type": "application/json; charset=utf-8" });
    assert.equal(headers.get("cache-control"), "no-store");
    assert.equal(headers.get("x-content-type-options"), "nosniff");
  });
});
