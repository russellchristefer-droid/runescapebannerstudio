#!/usr/bin/env node
/**
 * Node sidecar for the clip bench.
 * Calls sidecars/clip_bench.py so the WebM matches the Python bench.
 */
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const py = join(dirname(fileURLToPath(import.meta.url)), "..", "clip_bench.py");
const run = spawnSync("python3", [py, ...process.argv.slice(2)], { stdio: "inherit" });
process.exit(run.status === null ? 1 : run.status);
