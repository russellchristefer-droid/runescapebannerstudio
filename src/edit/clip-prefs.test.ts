import assert from "node:assert/strict";
import test from "node:test";
import {
  clipSnapFps,
  clampRange,
  nextMarkerTime,
  normalizeGainPct,
  orderInOut,
  prevMarkerTime,
  snapTime,
  timecode,
  plateHandleHit,
  resizePlateLay,
  scalePlateLay,
  bannerFitLay,
  clampPlateLay,
} from "./clip-math.ts";
import { QUALITY, qualityForAspect, qualityForSize, clipVideoBitrate } from "./quality.ts";
import { slugPart } from "../lib/filename.ts";
import { markContainRect, MARK_SIDE } from "../lib/marks.ts";

test("timecode pads minutes and hundredths", () => {
  assert.equal(timecode(0), "00:00.00");
  assert.equal(timecode(61.5), "01:01.50");
});

test("orderInOut keeps the earlier mark first", () => {
  assert.deepEqual(orderInOut(4, 1), [1, 4]);
  assert.deepEqual(orderInOut(2, 2), [2, 2]);
});

test("snapTime lands on a frame", () => {
  const step = 1 / 30;
  const snapped = snapTime(0.049, 30);
  assert.ok(Math.abs(snapped / step - Math.round(snapped / step)) < 1e-9);
  assert.equal(snapTime(1, 30), 1);
});

test("marker walk wraps the list", () => {
  const marks = [1, 4, 9];
  assert.equal(nextMarkerTime(4, marks), 9);
  assert.equal(nextMarkerTime(9, marks), 1);
  assert.equal(prevMarkerTime(4, marks), 1);
  assert.equal(prevMarkerTime(1, marks), 9);
});

test("normalize pulls a hot peak down", () => {
  assert.equal(normalizeGainPct(0.04, 100), 100);
  assert.equal(normalizeGainPct(1, 100), 89);
  assert.equal(clampRange(12, 0, 10), 10);
});

test("fps snap matches broadcast steps", () => {
  assert.equal(clipSnapFps(59.94), 60);
  assert.equal(clipSnapFps(29.97), 30);
  assert.equal(clipSnapFps(24.0), 24);
});

test("TikTok 9:16 is 1080×1920 at 12 Mbps 30 fps", () => {
  const q = qualityForAspect("9x16");
  assert.equal(q.w, 1080);
  assert.equal(q.h, 1920);
  assert.equal(q.fps, 30);
  assert.equal(q.videoBps, 12_000_000);
  assert.equal(qualityForSize(1080, 1920), QUALITY.tiktok);
  assert.equal(clipVideoBitrate(1080, 1920), 12_000_000);
  assert.equal(clipVideoBitrate(1080, 1080), 10_000_000);
  assert.equal(clipVideoBitrate(1280, 720), 8_000_000);
});

test("clip file name is christefer-1 plus size", () => {
  assert.equal(`${slugPart("Christefer_1", 24)}-1080x1920.mp4`, "christefer-1-1080x1920.mp4");
  assert.equal(`${slugPart("christefer-1", 24)}-1080x1920.webm`, "christefer-1-1080x1920.webm");
});

test("desk banner refits each clip crop", () => {
  const phone = bannerFitLay(1080, 1920, 1200, 480, "lower");
  const twitch = bannerFitLay(1200, 480, 1200, 480, "lower");
  assert.ok(phone.h < 0.35);
  assert.ok(phone.y + phone.h > 0.97);
  assert.ok(twitch.w > 0.95);
});

test("scale up against the plate edge keeps the still's ratio", () => {
  const lay = { x: 0.05, y: 0.4, w: 0.9, h: 0.28 };
  const next = scalePlateLay(lay, 1.4);
  assert.ok(next.w <= 1 + 1e-9);
  assert.ok(Math.abs(next.w / next.h - lay.w / lay.h) < 0.04);
  assert.equal(plateHandleHit(lay, 0.05 * 1000, 0.4 * 1000, 1000, 1000, 24), "nw");
  const se = resizePlateLay(lay, "se", 0.5, 0.9);
  assert.ok(se.w < lay.w);
});

test("uploaded mark is contained in a 96px square", () => {
  const wide = markContainRect(1920, 480, MARK_SIDE);
  assert.equal(wide.side, 96);
  assert.equal(wide.w, 96);
  assert.ok(wide.h < 96);
});

test("clampPlateLay does not stretch a landscape still", () => {
  const next = clampPlateLay({ x: -0.2, y: 0.1, w: 1.4, h: 0.4 });
  assert.ok(next.w <= 1);
  assert.ok(Math.abs(next.w / next.h - 1.4 / 0.4) < 0.04);
});
