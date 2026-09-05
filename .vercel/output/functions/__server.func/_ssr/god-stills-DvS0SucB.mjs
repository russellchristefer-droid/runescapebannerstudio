import { n as GOD_SLUGS } from "./gods-9ecR_EMd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/god-stills-DvS0SucB.js
function godStill(god, edition) {
	const slug = GOD_SLUGS[god];
	const folder = edition === "OSRS" ? "osrs" : "rs3";
	const path = `/stills/${folder}/god-${slug}.jpg?v=4`;
	return GOD_STILL_OK[`${folder}:${slug}`] ? path : void 0;
}
/** Hosted copies of correct-client place stills (not the other game). */
var GOD_STILL_OK = {
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
	"rs3:marimbo": true
};
//#endregion
export { godStill as t };
