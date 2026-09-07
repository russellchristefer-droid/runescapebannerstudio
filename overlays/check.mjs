#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const fail = [];

const cfg = JSON.parse(readFileSync(join(root, "alt1/appconfig.json"), "utf8"));
for (const key of ["appName", "appUrl", "configUrl", "iconUrl"]) {
  if (!cfg[key]) fail.push(`alt1 missing ${key}`);
}
if (!String(cfg.appUrl).includes("/overlays/alt1/index.html")) fail.push("alt1 appUrl");
if (!String(cfg.configUrl).startsWith("https://raw.githubusercontent.com/")) fail.push("alt1 configUrl host");

const html = readFileSync(join(root, "alt1/index.html"), "utf8");
for (const id of ["plate", "file", "save", "name", "twitch", "yt", "capture"]) {
  if (!html.includes(`id="${id}"`)) fail.push(`alt1 html #${id}`);
}
if (!html.includes("toBlob")) fail.push("alt1 save");
if (!html.includes("window.alt1")) fail.push("alt1 detect");

const plugin = readFileSync(join(root, "runelite/src/main/java/com/bannerstudio/BannerStudioPlugin.java"), "utf8");
for (const needle of ["@PluginDescriptor", "@Provides", "startUp", "shutDown", ".panel(panel)", "addNavigation"]) {
  if (!plugin.includes(needle)) fail.push(`runelite plugin ${needle}`);
}
const panel = readFileSync(join(root, "runelite/src/main/java/com/bannerstudio/BannerStudioPanel.java"), "utf8");
for (const needle of ["Open desk", "Pick overlay JPEG", "PluginPanel", "LinkBrowser.browse"]) {
  if (!panel.includes(needle)) fail.push(`runelite panel ${needle}`);
}
const props = readFileSync(join(root, "runelite/runelite-plugin.properties"), "utf8");
if (!props.includes("plugins=com.bannerstudio.BannerStudioPlugin")) fail.push("plugin properties");

if (fail.length) {
  console.error(fail.join("\n"));
  process.exit(1);
}
console.log("overlays check ok");
