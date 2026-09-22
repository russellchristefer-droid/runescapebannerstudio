import assert from "node:assert/strict";
import test from "node:test";
import {
  STREET_SLOT_MS,
  streetBanned,
  streetLine,
  streetTalk,
  streetWordCount,
} from "./streetTalk.ts";

test("Lumbridge OSRS is not Lumbridge RS3", () => {
  const osrs = streetLine("osrslumbridge", "osrs", 0);
  const rs3 = streetLine("lumbridge", "rs3", 0);
  assert.notEqual(`${osrs.speaker}${osrs.line}`, `${rs3.speaker}${rs3.line}`);
  assert.match(osrs.line, /Bank|cake|Goblins|Wheel|Lum|Bridge/i);
  assert.match(rs3.line, /crater|Rebuild|Chapel|scar|Bell|Castle/i);
});

test("pools are six lines, sixteen words, no desk preach", () => {
  for (const game of ["osrs", "rs3"] as const) {
    for (const id of ["osrslumbridge", "lumbridge", "osrscani", "canifis", "osrsprif", "prifddinas", "osrsape", "apeatoll"]) {
      const pool = streetTalk(id, game);
      if (!pool.length) continue;
      assert.ok(pool.length >= 6, id);
      for (const bit of pool) {
        assert.equal(streetBanned(bit), false, `${id} ${bit.speaker} ${bit.line}`);
        assert.ok(streetWordCount(bit) <= 16, `${id} ${bit.line}`);
      }
    }
  }
});

test("five-minute slot flips the line", () => {
  const a = streetLine("osrslumbridge", "osrs", 0);
  const b = streetLine("osrslumbridge", "osrs", STREET_SLOT_MS);
  assert.notEqual(`${a.speaker}${a.line}`, `${b.speaker}${b.line}`);
});

test("unknown town gets the local fallback", () => {
  const bit = streetLine("no-such-ditch", "osrs", 0);
  assert.equal(bit.speaker, "Local");
  assert.equal(bit.line, "Market’s open. Keep your bag closed.");
});
