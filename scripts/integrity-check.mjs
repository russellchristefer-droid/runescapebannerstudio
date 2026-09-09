#!/usr/bin/env node
/**
 * Defensive integrity only. Not Kali. Not an exploit kit.
 */
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const fail = [];

const trackedEnv = spawnSync("git", ["ls-files"], { encoding: "utf8" });
if ((trackedEnv.stdout || "").split("\n").some((line) => /(^|\/)\.env(\.|$)/.test(line))) {
  fail.push(".env is tracked");
}

const secrets = spawnSync(
  "git",
  ["grep", "-nE", "sk_live|BEGIN PRIVATE|AKIA[0-9A-Z]{16}", "--", ":!scripts/integrity-check.mjs"],
  { encoding: "utf8" },
);
if (secrets.status === 0 && secrets.stdout.trim()) fail.push("secret-shaped string in git");

const bots = spawnSync(
  "git",
  [
    "grep",
    "-nE",
    "MenuEntry|invokeMenu|sendClick|java\\.awt\\.Robot|pyautogui|win32api|PacketBuffer",
    "--",
    "overlays",
    "sidecars",
    ":!scripts/integrity-check.mjs",
  ],
  { encoding: "utf8" },
);
if (bots.status === 0 && bots.stdout.trim()) fail.push("client-click or packet API in sidecar");

const vite = readFileSync(new URL("../vite.config.ts", import.meta.url), "utf8");
if (!/sourcemap:\s*false/.test(vite)) fail.push("prod sourcemap");

const vercel = readFileSync(new URL("../vercel.json", import.meta.url), "utf8");
for (const header of [
  "X-Content-Type-Options",
  "Referrer-Policy",
  "frame-ancestors",
  "Permissions-Policy",
]) {
  if (!vercel.includes(header)) fail.push(`missing ${header}`);
}

if (fail.length) {
  console.error(fail.join("\n"));
  process.exit(1);
}
console.log("integrity-check ok");
