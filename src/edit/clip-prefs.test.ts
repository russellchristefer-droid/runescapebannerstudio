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
} from "./clip-math.ts";

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
