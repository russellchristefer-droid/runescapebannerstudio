import assert from "node:assert/strict";
import test from "node:test";
import { SeekError } from "./seekSafe.ts";

test("SeekError is named so the bench can print it", () => {
  const err = new SeekError("Seek timed out.");
  assert.equal(err.name, "SeekError");
  assert.equal(err.message, "Seek timed out.");
});
