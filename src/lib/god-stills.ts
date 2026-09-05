import type { God } from "./locations";
import { GOD_SLUGS } from "./gods";

export function godStill(god: God, edition: "OSRS" | "RS3"): string | undefined {
  const slug = GOD_SLUGS[god];
  const folder = edition === "OSRS" ? "osrs" : "rs3";
  const path = `/stills/${folder}/god-${slug}.jpg?v=4`;
  return GOD_STILL_OK[`${folder}:${slug}`] ? path : undefined;
}

/** Hosted copies of correct-client place stills (not the other game). */
export const GOD_STILL_OK: Record<string, true> = {
  "osrs:saradomin": true,
  "osrs:zamorak": true,
  "osrs:guthix": true,
  "osrs:armadyl": true,
  "osrs:bandos": true,
  "osrs:seren": true,
  "osrs:zaros": true,
  "osrs:sliske": true,
  "osrs:tumeken": true,
  "osrs:elidinis": true,
  "osrs:marimbo": true,
  "rs3:saradomin": true,
  "rs3:zamorak": true,
  "rs3:guthix": true,
  "rs3:armadyl": true,
  "rs3:bandos": true,
  "rs3:seren": true,
  "rs3:zaros": true,
  "rs3:sliske": true,
  "rs3:tumeken": true,
  "rs3:elidinis": true,
  "rs3:marimbo": true,
};
