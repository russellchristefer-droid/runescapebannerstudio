import assert from "node:assert/strict";
import { test } from "node:test";
import {
  hiscoresQuery,
  sanitizeClan,
  sanitizeDiscord,
  sanitizeDisplayName,
  sanitizeHandle,
  typeDisplayName,
} from "./rsText.ts";

test("Rs@Player", () => {
  assert.equal(typeDisplayName("Rs@Player"), "RsPlayer");
});

test("trim Zezima", () => {
  assert.equal(sanitizeDisplayName("  Zezima  "), "Zezima");
});

test("13th letter dropped", () => {
  assert.equal(typeDisplayName("abcdefghijklm").length, 12);
});

test("twitch url", () => {
  assert.equal(sanitizeHandle("https://twitch.tv/foo"), "@foo");
});

test("discord invite", () => {
  assert.equal(sanitizeDiscord("https://discord.com/invite/abc"), "discord.gg/abc");
});

test("javascript clan stripped", () => {
  assert.equal(sanitizeClan("javascript:alert(1)"), "javascriptalert1");
});

test("hiscores query has no @", () => {
  assert.equal(hiscoresQuery("Rs@Player").includes("@"), false);
});
