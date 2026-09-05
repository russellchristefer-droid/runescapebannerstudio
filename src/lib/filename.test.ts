import assert from "node:assert/strict";
import { test } from "node:test";
import { bannerFileName, slugPart } from "./filename.ts";
import { isAllowedHttpsUrl } from "./proxy-allowlist.ts";
import { nextMidnightUtc } from "./clock.ts";

test("slug strips path chars", () => {
  assert.equal(slugPart("A/B\\C:*"), "abc");
});

test("banner filename", () => {
  const name = bannerFileName({
    edition: "OSRS",
    name: "Example",
    place: "osrslumbridge",
    lighting: "light",
    width: 1200,
    height: 480,
  });
  assert.equal(name, "banner-osrs-example-osrslumbridge-light-1200x480.jpg");
});

test("allowlist rejects loopback", () => {
  assert.equal(isAllowedHttpsUrl("http://127.0.0.1/x"), false);
  assert.equal(isAllowedHttpsUrl("https://secure.runescape.com/m=hiscore_oldschool/index_lite"), true);
});

test("midnight target is next UTC day", () => {
  const now = new Date("2026-09-04T23:59:57.000Z");
  const next = nextMidnightUtc(now);
  assert.equal(new Date(next).toISOString(), "2026-09-05T00:00:00.000Z");
});
