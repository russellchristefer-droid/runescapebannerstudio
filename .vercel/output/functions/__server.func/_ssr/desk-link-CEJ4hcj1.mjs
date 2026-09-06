import { a as migrateBannerSizeId, r as LOCATIONS } from "./locations-DGhympWJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/desk-link-CEJ4hcj1.js
var MARKS = [
	{
		id: "mark-osrs-im",
		name: "Ironman",
		editions: ["OSRS"],
		src: "/marks/osrs-ironman.png",
		group: "account"
	},
	{
		id: "mark-osrs-hcim",
		name: "Hardcore ironman",
		editions: ["OSRS"],
		src: "/marks/osrs-hcim.png",
		group: "account"
	},
	{
		id: "mark-osrs-uim",
		name: "Ultimate ironman",
		editions: ["OSRS"],
		src: "/marks/osrs-uim.png",
		group: "account"
	},
	{
		id: "mark-osrs-gim",
		name: "Group ironman",
		editions: ["OSRS"],
		src: "/marks/osrs-gim.png",
		group: "account"
	},
	{
		id: "mark-osrs-fire",
		name: "Fire cape",
		editions: ["OSRS"],
		src: "/marks/osrs-fire-cape.png",
		group: "cape"
	},
	{
		id: "mark-osrs-infernal",
		name: "Infernal cape",
		editions: ["OSRS"],
		src: "/marks/osrs-infernal-cape.png",
		group: "cape"
	},
	{
		id: "mark-osrs-quest",
		name: "Quest cape",
		editions: ["OSRS"],
		src: "/marks/osrs-quest-cape.png",
		group: "cape"
	},
	{
		id: "mark-osrs-diary",
		name: "Diary cape",
		editions: ["OSRS"],
		src: "/marks/osrs-achieve-cape.png",
		group: "cape"
	},
	{
		id: "mark-osrs-max",
		name: "Max cape",
		editions: ["OSRS"],
		src: "/marks/osrs-max-cape.png",
		group: "cape"
	},
	{
		id: "mark-osrs-melee",
		name: "Protect Melee",
		editions: ["OSRS"],
		src: "/marks/osrs-protect-melee.png",
		group: "overhead"
	},
	{
		id: "mark-osrs-range",
		name: "Protect Missiles",
		editions: ["OSRS"],
		src: "/marks/osrs-protect-missiles.png",
		group: "overhead"
	},
	{
		id: "mark-osrs-mage",
		name: "Protect Magic",
		editions: ["OSRS"],
		src: "/marks/osrs-protect-magic.png",
		group: "overhead"
	},
	{
		id: "mark-osrs-smite",
		name: "Smite",
		editions: ["OSRS"],
		src: "/marks/osrs-smite.png",
		group: "overhead"
	},
	{
		id: "mark-osrs-prayer",
		name: "Prayer",
		editions: ["OSRS"],
		src: "/skills/osrs-Prayer.png",
		group: "overhead"
	},
	{
		id: "mark-osrs-combat",
		name: "Combat",
		editions: ["OSRS"],
		src: "/skills/osrs-Combat.png",
		group: "combat"
	},
	{
		id: "mark-osrs-veng",
		name: "Vengeance",
		editions: ["OSRS"],
		src: "/marks/osrs-vengeance.png",
		group: "combat"
	},
	{
		id: "mark-osrs-slayer",
		name: "Slayer",
		editions: ["OSRS"],
		src: "/skills/osrs-Slayer.png",
		group: "combat"
	},
	{
		id: "mark-osrs-dt2",
		name: "DT2",
		editions: ["OSRS"],
		src: "/marks/osrs-dt2.svg",
		group: "raid"
	},
	{
		id: "mark-rs3-im",
		name: "Ironman",
		editions: ["RS3"],
		src: "/marks/rs3-ironman.svg",
		group: "account"
	},
	{
		id: "mark-rs3-hcim",
		name: "Hardcore ironman",
		editions: ["RS3"],
		src: "/marks/rs3-hcim.svg",
		group: "account"
	},
	{
		id: "mark-rs3-uim",
		name: "Ultimate ironman",
		editions: ["RS3"],
		src: "/marks/rs3-uim.svg",
		group: "account"
	},
	{
		id: "mark-rs3-max",
		name: "Max cape",
		editions: ["RS3"],
		src: "/marks/rs3-max.png",
		group: "cape"
	},
	{
		id: "mark-rs3-prayer",
		name: "Prayer",
		editions: ["RS3"],
		src: "/skills/rs3-Prayer.png",
		group: "combat"
	},
	{
		id: "mark-rs3-slayer",
		name: "Slayer",
		editions: ["RS3"],
		src: "/skills/rs3-Slayer.png",
		group: "combat"
	},
	{
		id: "mark-rs3-summoning",
		name: "Summoning",
		editions: ["RS3"],
		src: "/skills/rs3-Summoning.png",
		group: "combat"
	}
];
function aliasMark(raw, edition) {
	const id = raw.toLowerCase().replace(/[^a-z0-9-]/g, "");
	if (!id) return "";
	if (MARKS.some((row) => row.id === id && row.editions.includes(edition))) return id;
	const mapped = {
		iron: edition === "OSRS" ? "mark-osrs-im" : "mark-rs3-im",
		fire: "mark-osrs-fire",
		infernal: "mark-osrs-infernal",
		max: edition === "OSRS" ? "mark-osrs-max" : "mark-rs3-max"
	}[id] ?? "";
	if (mapped && MARKS.some((row) => row.id === mapped && row.editions.includes(edition))) return mapped;
	return MARKS.find((row) => row.editions.includes(edition) && (row.id.endsWith(`-${id}`) || row.name.toLowerCase().replace(/\s+/g, "") === id))?.id ?? "";
}
var STILL_PATH = /^\/(?!\/)[A-Za-z0-9_./-]+\.(png|jpe?g|webp)$/i;
function cleanStillPath(raw) {
	if (!raw) return void 0;
	const path = raw.split("?")[0];
	return STILL_PATH.test(path) ? path : void 0;
}
function readDeskQuery() {
	if (typeof window === "undefined") return {};
	const q = new URLSearchParams(window.location.search);
	const game = q.get("game")?.toLowerCase();
	const edition = game === "osrs" ? "OSRS" : game === "rs3" ? "RS3" : void 0;
	const sizeRaw = q.get("size");
	const sizeId = sizeRaw ? migrateBannerSizeId(sizeRaw) : void 0;
	const placeRaw = (q.get("place") ?? "").toLowerCase().replace(/[^a-z0-9-]/g, "");
	let locationId;
	if (placeRaw) {
		const pool = edition ? LOCATIONS.filter((row) => row.edition === edition) : LOCATIONS;
		locationId = (pool.find((row) => row.id === placeRaw) || pool.find((row) => row.id.replace(/^(osrs|rs3)/, "") === placeRaw) || pool.find((row) => row.name.toLowerCase().replace(/\s+/g, "-") === placeRaw))?.id;
	}
	const pack = edition ?? "OSRS";
	const marks = (q.get("marks") ?? "").split(",").map((part) => aliasMark(part, pack)).filter(Boolean).slice(0, 12);
	const still = cleanStillPath(q.get("still") ?? void 0);
	return {
		edition,
		sizeId,
		locationId,
		marks,
		still
	};
}
function deskOpenPath(edition, placeId, extra) {
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
//#endregion
export { deskOpenPath as n, readDeskQuery as r, MARKS as t };
