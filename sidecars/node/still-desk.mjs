#!/usr/bin/env node
/**
 * Node sidecar for the still compositor.
 * Calls sidecars/still_desk.py so the JPEG matches the Python bench.
 */
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const py = join(dirname(fileURLToPath(import.meta.url)), "..", "still_desk.py");
const run = spawnSync("python3", [py, ...process.argv.slice(2)], { stdio: "inherit" });
process.exit(run.status === null ? 1 : run.status);
