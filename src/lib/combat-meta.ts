import type { BossNote } from "./boss-notes";
import { hourLabel } from "./cadence";

export function bossWiki(note: BossNote) {
  const host =
    note.edition === "OSRS"
      ? "https://oldschool.runescape.wiki/w/"
      : "https://runescape.wiki/w/";
  const page = note.title.replace(/ /g, "_");
  return {
    page: host + page,
    strategies: `${host}${page}/Strategies`,
    pvme: "https://pvme.io/",
  };
}

export function combatStamp(now = Date.now()) {
  return `Meta check · ${hourLabel(now)} · open the wiki before you pull`;
}
