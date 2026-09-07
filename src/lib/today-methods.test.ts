import assert from "node:assert/strict";
import { test } from "node:test";
import { hourMethods } from "./today-methods.ts";

test("every UTC hour has both canons", () => {
  for (let h = 0; h < 24; h++) {
    const row = hourMethods(h);
    assert.ok(row.osrs.length > 20, `osrs hour ${h}`);
    assert.ok(row.rs3.length > 20, `rs3 hour ${h}`);
  }
  assert.equal(hourMethods(24).osrs, hourMethods(0).osrs);
  assert.equal(hourMethods(-1).rs3, hourMethods(23).rs3);
});
