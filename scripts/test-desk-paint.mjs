import { chromium } from "playwright";

const url = process.env.DESK_URL || "http://127.0.0.1:8080/";
const browser = await chromium.launch({ args: ["--no-sandbox"] });
const page = await browser.newPage({ viewport: { width: 1400, height: 1100 } });
page.setDefaultTimeout(20000);
const errors = [];
page.on("pageerror", (err) => errors.push(String(err)));

await page.goto(url, { waitUntil: "domcontentloaded" });
await page.waitForSelector("#overlay");
await page.locator("#desk").scrollIntoViewIfNeeded();

const sizeOf = () =>
  page.evaluate(() => {
    const c = document.getElementById("overlay");
    const p = document.getElementById("plate");
    if (!(c instanceof HTMLCanvasElement) || !p) return null;
    const r = p.getBoundingClientRect();
    return { w: c.width, h: c.height, aspect: r.width / Math.max(1, r.height) };
  });

await page.getByRole("button", { name: /^1920×1080$/ }).first().click({ force: true });
await page.waitForTimeout(250);
const offline = await sizeOf();

await page.getByRole("button", { name: /^Twitch crop$/ }).click({ force: true });
await page.waitForTimeout(350);
const twitch = await sizeOf();
await page.screenshot({ path: "/workspace/screenshots/twitch-crop.png" });

await page.getByRole("button", { name: /^YouTube crop$/ }).click({ force: true });
await page.waitForTimeout(350);
const youtube = await sizeOf();

await page.getByRole("button", { name: /^Discard crop$/ }).click({ force: true });
await page.waitForTimeout(250);
const discarded = await sizeOf();

await page.getByRole("button", { name: /^1200×480$/ }).first().click({ force: true });
await page.waitForTimeout(250);
const chip = await sizeOf();

const report = { offline, twitch, youtube, discarded, chip, errors };
console.log(JSON.stringify(report, null, 2));

if (errors.length) process.exit(1);
if (!twitch || twitch.w !== 1200 || twitch.h !== 480) {
  console.error("Twitch crop did not set 1200×480");
  process.exit(1);
}
if (twitch.aspect < 2.2 || twitch.aspect > 2.8) {
  console.error("Twitch plate aspect is not 2.5", twitch.aspect);
  process.exit(1);
}
if (!youtube || youtube.w !== 1280 || youtube.h !== 720) {
  console.error("YouTube crop did not set 1280×720");
  process.exit(1);
}
if (!chip || chip.w !== 1200 || chip.h !== 480) {
  console.error("1200×480 chip did not set the plate");
  process.exit(1);
}

await browser.close();
console.log("crops ok");
