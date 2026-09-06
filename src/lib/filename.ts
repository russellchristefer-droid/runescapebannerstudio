import { sanitizeDisplayName } from "./rsText.ts";

const BAD = /[/\\:*?"<>|\u0000-\u001f]/g;

export function slugPart(raw: string, max = 12) {
  return String(raw ?? "")
    .replace(BAD, "")
    .replace(/[^A-Za-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, max)
    .toLowerCase() || "desk";
}

export function bannerFileName(opts: {
  edition: "OSRS" | "RS3";
  name: string;
  place: string;
  lighting: "a" | "b" | "dark" | "light";
  width: number;
  height: number;
}) {
  const game = opts.edition === "OSRS" ? "osrs" : "rs3";
  return `banner-${game}-${slugPart(sanitizeDisplayName(opts.name))}-${slugPart(opts.place, 24)}-${opts.lighting}-${opts.width}x${opts.height}.jpg`;
}
