import { LOCATIONS, migrateBannerSizeId, type BannerSizeId, type Edition, type LocationId } from "@/lib/locations";
import { MARKS } from "@/lib/marks";

export function aliasMark(raw: string, edition: Edition) {
  const id = raw.toLowerCase().replace(/[^a-z0-9-]/g, "");
  if (!id) return "";
  if (MARKS.some((row) => row.id === id && row.editions.includes(edition))) return id;
  const short: Record<string, string> = {
    iron: edition === "OSRS" ? "mark-osrs-im" : "mark-rs3-im",
    fire: "mark-osrs-fire",
    infernal: "mark-osrs-infernal",
    max: edition === "OSRS" ? "mark-osrs-max" : "mark-rs3-max",
  };
  const mapped = short[id] ?? "";
  if (mapped && MARKS.some((row) => row.id === mapped && row.editions.includes(edition))) return mapped;
  const loose = MARKS.find((row) => row.editions.includes(edition) && (row.id.endsWith(`-${id}`) || row.name.toLowerCase().replace(/\s+/g, "") === id));
  return loose?.id ?? "";
}

const STILL_PATH = /^\/(?!\/)[A-Za-z0-9_./-]+\.(png|jpe?g|webp)$/i;

export function cleanStillPath(raw: string | undefined) {
  if (!raw) return undefined;
  const path = raw.split("?")[0];
  return STILL_PATH.test(path) ? path : undefined;
}

export function readDeskQuery() {
  if (typeof window === "undefined") return {};
  const q = new URLSearchParams(window.location.search);
  const game = q.get("game")?.toLowerCase();
  const edition: Edition | undefined = game === "osrs" ? "OSRS" : game === "rs3" ? "RS3" : undefined;
  const sizeRaw = q.get("size");
  const sizeId = sizeRaw ? migrateBannerSizeId(sizeRaw) : undefined;
  const placeRaw = (q.get("place") ?? "").toLowerCase().replace(/[^a-z0-9-]/g, "");
  let locationId: LocationId | undefined;
  if (placeRaw) {
    const pool = edition ? LOCATIONS.filter((row) => row.edition === edition) : LOCATIONS;
    const hit =
      pool.find((row) => row.id === placeRaw) ||
      pool.find((row) => row.id.replace(/^(osrs|rs3)/, "") === placeRaw) ||
      pool.find((row) => row.name.toLowerCase().replace(/\s+/g, "-") === placeRaw);
    locationId = hit?.id;
  }
  const pack = edition ?? "OSRS";
  const marks = (q.get("marks") ?? "")
    .split(",")
    .map((part) => aliasMark(part, pack))
    .filter(Boolean)
    .slice(0, 12);
  const still = cleanStillPath(q.get("still") ?? undefined);
  return { edition, sizeId, locationId, marks, still };
}

export function deskSharePath(edition: Edition, placeId: string, size: BannerSizeId, markIds: string[] = []) {
  const slug = placeId.replace(/^(osrs|rs3)/, "") || placeId;
  const game = edition === "OSRS" ? "osrs" : "rs3";
  const marks = markIds
    .map((id) => id.replace(/^mark-(osrs|rs3)-/, ""))
    .filter(Boolean)
    .slice(0, 12)
    .join(",");
  const q = `/?game=${game}&place=${encodeURIComponent(slug)}&size=${size}`;
  return marks ? `${q}&marks=${encodeURIComponent(marks)}` : q;
}

export function deskOpenPath(
  edition: Edition,
  placeId: string,
  extra?: { still?: string; marks?: string[] },
) {
  const game = edition === "OSRS" ? "osrs" : "rs3";
  const slug = placeId.replace(/^(osrs|rs3)/, "") || placeId;
  const q = new URLSearchParams();
  q.set("game", game);
  q.set("place", slug);
  const still = cleanStillPath(extra?.still);
  if (still) q.set("still", still);
  const marks = (extra?.marks ?? []).filter(Boolean).slice(0, 12).join(",");
  if (marks) q.set("marks", marks);
  return `/?${q.toString()}#desk`;
}
