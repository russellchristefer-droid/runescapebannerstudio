import type { God } from "./locations";
import { GOD_SLUGS } from "./gods";

export function godStill(god: God, edition: "OSRS" | "RS3"): string | undefined {
  const slug = GOD_SLUGS[god];
  const folder = edition === "OSRS" ? "osrs" : "rs3";
  const path = `/stills/${folder}/god-${slug}.jpg?v=5`;
  return GOD_STILL_OK[`${folder}:${slug}`] ? path : undefined;
}

export function godStillLine(god: God, edition: "OSRS" | "RS3"): string {
  return GOD_LINE[god]?.[edition] ?? (edition === "OSRS" ? "Old School still. He does not walk unless the page says so." : "RuneScape still. Confirm the hour on the wiki.");
}

const GOD_LINE: Record<God, { OSRS: string; RS3: string }> = {
  Saradomin: {
    OSRS: "White stone and the four-point star. No landfall here.",
    RS3: "The justicar after the edicts. Landfall already happened.",
  },
  Zamorak: {
    OSRS: "Horned skull. Chaos rune. You already know the house.",
    RS3: "He walks this client. Confirm the hour on the wiki.",
  },
  Guthix: {
    OSRS: "The altar still works. He does not walk.",
    RS3: "The tear is the still. Do not title Guthix lives.",
  },
  Armadyl: {
    OSRS: "Winged symbol. Kree'arra holds the chamber.",
    RS3: "Empyrean after the edicts. Confirm the citadel on the wiki.",
  },
  Bandos: {
    OSRS: "Big High War God. Graardor is still the door.",
    RS3: "Dead in The Bird and the Beast. Leave that funeral home.",
  },
  Seren: {
    OSRS: "Song of the Elves is the constitution. No hour-clan here.",
    RS3: "Voice of Seren turns. Confirm the pair on Today.",
  },
  Zaros: {
    OSRS: "The empty monument. He does not walk this client.",
    RS3: "Returned. Senntisten is the stone.",
  },
  Sliske: {
    OSRS: "Mahjarrat. Not a church. No Sliske raid here.",
    RS3: "Antagonist. The staff and the games. Not a prayer book.",
  },
  Tumeken: {
    OSRS: "Desert crown. The empire is the still.",
    RS3: "Spent or fragmented. Menaphos still names him.",
  },
  Elidinis: {
    OSRS: "River and the plague city. Sophanem is the still.",
    RS3: "Beside Icthlarin. Confirm the live page.",
  },
  Marimbo: {
    OSRS: "You already know the greegree. Not a God Wars four.",
    RS3: "Ape Atoll still. Same island, later stones.",
  },
};

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
