import { n as noteFor } from "./boss-notes-BtB8wfDO.mjs";
import { t as townNote } from "./town-notes-BW8dq-nk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/place-lore-CQ9DWccC.js
function wikiPath(title) {
	return encodeURI(title.replace(/ /g, "_"));
}
function loreLead(brief) {
	const part = brief.split(/(?<=\.)\s+/)[0] ?? brief;
	return part.length > 180 ? `${part.slice(0, 177)}…` : part;
}
function placeLore(loc) {
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
			sourceUrl: `${host}${wikiPath(note.title)}`
		};
	}
	const note = noteFor(loc.id);
	if (!note) return null;
	const brief = [
		note.style,
		note.start[0],
		note.route[0]
	].filter(Boolean).join(" ");
	if (!brief) return null;
	return {
		game,
		slug: loc.id,
		kind: "boss",
		brief,
		sourceName: note.title,
		sourceUrl: `${host}${wikiPath(note.title)}`
	};
}
//#endregion
export { placeLore as n, loreLead as t };
