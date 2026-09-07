#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const fail = [];

function readCfg(rel) {
  return JSON.parse(readFileSync(join(root, rel), "utf8"));
}

for (const [rel, name, page] of [
  ["desk/alt1/appconfig.json", "Still compositor", "overlays/desk/alt1/index.html"],
  ["clips/alt1/appconfig.json", "Clip bench", "overlays/clips/alt1/index.html"],
]) {
  const cfg = readCfg(rel);
  if (cfg.appName !== name) fail.push(`${rel} appName`);
  if (!String(cfg.appUrl).includes(page)) fail.push(`${rel} appUrl`);
  if (!String(cfg.configUrl).startsWith("https://raw.githubusercontent.com/")) fail.push(`${rel} host`);
}

const desk = readFileSync(join(root, "desk/alt1/index.html"), "utf8");
for (const id of ["plate", "file", "save", "name", "twitch", "yt"]) {
  if (!desk.includes(`id="${id}"`)) fail.push(`desk #${id}`);
}
if (!desk.includes("toBlob")) fail.push("desk save");

const clips = readFileSync(join(root, "clips/alt1/index.html"), "utf8");
for (const id of ["vid", "file", "save", "play", "pause", "markIn", "markOut"]) {
  if (!clips.includes(`id="${id}"`)) fail.push(`clips #${id}`);
}
if (!clips.includes("MediaRecorder")) fail.push("clips record");

const props = readFileSync(join(root, "runelite/runelite-plugin.properties"), "utf8");
if (!props.includes("com.bannerstudio.BannerStudioPlugin")) fail.push("desk plugin id");
if (!props.includes("com.bannerstudio.ClipBenchPlugin")) fail.push("clips plugin id");

const clipPlugin = readFileSync(join(root, "runelite/src/main/java/com/bannerstudio/ClipBenchPlugin.java"), "utf8");
for (const needle of ["@PluginDescriptor", "@Provides", ".panel(panel)"]) {
  if (!clipPlugin.includes(needle)) fail.push(`clip plugin ${needle}`);
}

if (fail.length) {
  console.error(fail.join("\n"));
  process.exit(1);
}
console.log("overlays check ok");
