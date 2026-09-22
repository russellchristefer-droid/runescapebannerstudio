import assert from "node:assert/strict";
import { test } from "node:test";
import {
  hiscoresQuery,
  sanitizeClan,
  sanitizeDiscord,
  sanitizeDisplayName,
  sanitizeHandle,
  typeClan,
  typeDisplayName,
  typeHandle,
  typeTagline,
  typeWorld,
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
  assert.equal(sanitizeClan("javascript:alert(1)"), "alert(1)");
});

test("clan live keeps space and numbers", () => {
  assert.equal(typeClan("Exiled Island 99"), "Exiled Island 99");
});

test("clan live keeps the space you just typed", () => {
  assert.equal(typeClan("Exiled "), "Exiled ");
  assert.equal(sanitizeClan("Exiled "), "Exiled");
});

test("handle live keeps a space", () => {
  assert.equal(typeHandle("Christefer 1"), "Christefer 1");
});

test("handle live keeps underscore and numbers", () => {
  assert.equal(typeHandle("Christefer_1"), "Christefer_1");
});

test("tagline live keeps punctuation", () => {
  assert.equal(typeTagline("Maxed, 99s!"), "Maxed, 99s!");
});

test("world live keeps digits", () => {
  assert.equal(typeWorld("420"), "420");
});

test("hiscores query has no @", () => {
  assert.equal(hiscoresQuery("Rs@Player").includes("@"), false);
});
