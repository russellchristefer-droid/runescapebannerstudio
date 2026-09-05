import { noteFor } from "@/lib/boss-notes";
import type { Location } from "@/lib/locations";
import { townNote } from "@/lib/town-notes";

export type PlaceLore = {
  game: "osrs" | "rs3";
  slug: string;
  kind: "town" | "boss";
  brief: string;
  sourceName: string;
  sourceUrl: string;
};

function wikiPath(title: string) {
  return encodeURI(title.replace(/ /g, "_"));
}

export function loreLead(brief: string) {
  const part = brief.split(/(?<=\.)\s+/)[0] ?? brief;
  return part.length > 180 ? `${part.slice(0, 177)}…` : part;
}

export function placeLore(loc: Location): PlaceLore | null {
  const game = loc.edition === "OSRS" ? "osrs" : "rs3";
  const host = game === "osrs" ? "https://oldschool.runescape.wiki/w/" : "https://runescape.wiki/w/";
  if (loc.kind === "town") {
    const note = townNote(loc.id);
    if (!note?.lore?.length) return null;
    return {
      game,
      slug: loc.id,
      kind: "town",
      brief: note.lore.join(" "),
      sourceName: note.title,
      sourceUrl: `${host}${wikiPath(note.title)}`,
    };
  }
  const note = noteFor(loc.id);
  if (!note) return null;
  const brief = [note.style, note.start[0], note.route[0]].filter(Boolean).join(" ");
  if (!brief) return null;
  return {
    game,
    slug: loc.id,
    kind: "boss",
    brief,
    sourceName: note.title,
    sourceUrl: `${host}${wikiPath(note.title)}`,
  };
}
