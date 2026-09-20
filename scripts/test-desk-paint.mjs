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
await page.waitForTimeout(400);

const nameBox = page.getByLabel(/Display name/i);
await nameBox.click({ force: true });
await nameBox.fill("Christefer");

await page.locator('button[aria-label="Place Attack"]').click({ force: true });
await page.waitForTimeout(300);

const size1920 = page.getByRole("button", { name: /^1920×1080$/ });
if (await size1920.count()) await size1920.click({ force: true });
await page.waitForTimeout(200);

const fit = page.getByRole("button", { name: /^Fit plate$/i });
if (await fit.count()) await fit.click({ force: true });
await page.waitForTimeout(700);

await page.locator("#plate").scrollIntoViewIfNeeded();
await page.waitForTimeout(200);

const stats = await page.evaluate(() => {
  const canvas = document.getElementById("overlay");
  if (!(canvas instanceof HTMLCanvasElement)) return { error: "no canvas" };
  const ctx = canvas.getContext("2d");
  if (!ctx) return { error: "no ctx", w: canvas.width, h: canvas.height };
  const { width, height } = canvas;
  const data = ctx.getImageData(0, 0, width, height).data;
  let painted = 0;
  let yellow = 0;
  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3];
    if (a > 12) painted++;
    if (a > 12 && data[i] > 180 && data[i + 1] > 180 && data[i + 2] < 80) yellow++;
  }
  const still = document.getElementById("still");
  const plate = document.getElementById("plate");
  const pr = plate?.getBoundingClientRect();
  return {
    w: width,
    h: height,
    painted,
    yellow,
    stillOk: still instanceof HTMLImageElement && still.naturalWidth > 0,
    plateBox: pr ? { w: Math.round(pr.width), h: Math.round(pr.height) } : null,
  };
});

await page.screenshot({ path: "/tmp/desk-1920.png" });

const save = page.getByRole("button", { name: /Save for clips/i });
let saved = false;
if (await save.count()) {
  await save.click({ force: true });
  await page.waitForTimeout(400);
  saved = await page.evaluate(() => /Saved for clips/i.test(document.body.innerText));
}

console.log(JSON.stringify({ stats, saved, errors }, null, 2));

if (errors.length) process.exit(1);
if (!stats.painted || stats.painted < 80) {
  console.error("overlay is empty");
  process.exit(1);
}
if (stats.w !== 1920 || stats.h !== 1080) {
  console.error("crop not 1920x1080", stats.w, stats.h);
  process.exit(1);
}

await browser.close();
console.log("desk 1920 paint ok");
