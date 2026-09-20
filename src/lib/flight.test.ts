import assert from "node:assert/strict";
import { test } from "node:test";
import { capMap, makeTtlCache, singleFlight } from "./flight.ts";

test("singleFlight runs the work once for overlapping callers", async () => {
  let runs = 0;
  const work = () =>
    singleFlight("board", async () => {
      runs += 1;
      await new Promise((r) => setTimeout(r, 20));
      return "ok";
    });
  const [a, b, c] = await Promise.all([work(), work(), work()]);
  assert.equal(runs, 1);
  assert.deepEqual([a, b, c], ["ok", "ok", "ok"]);
});

test("singleFlight lets the next wave run after the first settles", async () => {
  let runs = 0;
  const work = () =>
    singleFlight("again", async () => {
      runs += 1;
      return runs;
    });
  assert.equal(await work(), 1);
  assert.equal(await work(), 2);
});

test("ttl cache isolates keys and drops the oldest past the cap", () => {
  const bag = makeTtlCache<string>(2, 60_000);
  bag.set("osrs:zezima", "a");
  bag.set("rs3:zezima", "b");
  bag.set("osrs:christefer", "c");
  assert.equal(bag.get("osrs:zezima"), undefined);
  assert.equal(bag.get("rs3:zezima"), "b");
  assert.equal(bag.get("osrs:christefer"), "c");
});

test("capMap keeps the newest keys", () => {
  const bag = new Map<string, number>([
    ["a", 1],
    ["b", 2],
    ["c", 3],
  ]);
  capMap(bag, 2);
  assert.equal(bag.has("a"), false);
  assert.equal(bag.get("c"), 3);
});
