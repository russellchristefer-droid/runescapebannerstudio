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

const desk = readFileSync(join(root, "desk/alt1/app.js"), "utf8");
for (const needle of ["toBlob", "captureHold", "getElementById(\"plate\")"]) {
  if (!desk.includes(needle)) fail.push(`desk app.js ${needle}`);
}

const clips = readFileSync(join(root, "clips/alt1/app.js"), "utf8");
for (const needle of ["MediaRecorder", "markIn", "getElementById(\"vid\")", "1920", "1280", "1200", "data-dl"]) {
  if (!clips.includes(needle)) fail.push(`clips app.js ${needle}`);
}

const deskHtml = readFileSync(join(root, "desk/alt1/index.html"), "utf8");
if (!deskHtml.includes("src=\"./app.js\"")) fail.push("desk html script");
const clipsHtml = readFileSync(join(root, "clips/alt1/index.html"), "utf8");
if (!clipsHtml.includes("src=\"./app.js\"")) fail.push("clips html script");
if (!clipsHtml.includes("data-dl=")) fail.push("clips html downloads");

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
