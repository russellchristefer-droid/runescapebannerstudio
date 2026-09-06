import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as townRegionHead, r as LOCATIONS, s as townHasStill, u as townStillLine } from "./locations-DGhympWJ.mjs";
import { n as usePlaceFilter, t as PlaceRail } from "./place-rail-DFA15Tod.mjs";
import { t as townNote } from "./town-notes-gbQvMCvJ.mjs";
import { S as BackLink } from "./router-D8oIjQ4W.mjs";
import { n as PlaceGrid, t as PlaceCard } from "./place-card-DH562JSd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/towns.index-BDxtBH62.js
var import_jsx_runtime = require_jsx_runtime();
var REGION_ORDER = [
	"Misthalin",
	"Asgarnia",
	"Kandarin",
	"Morytania",
	"Kharidian",
	"Tirannwn",
	"Fremennik",
	"Great Kourend",
	"Varlamore",
	"Southern Sea",
	"Lost City",
	"Lumbridge Swamp",
	"Wilderness",
	"Forinthry",
	"God Wars",
	"The Heart",
	"Underworld",
	"The Arc",
	"Anachronia",
	"Fossil Island",
	"Otherworld",
	"PvM hub",
	"Abyss",
	"Varrock"
];
function listedTowns(edition, god) {
	return LOCATIONS.filter((loc) => loc.kind === "town" && loc.edition === edition && (!god || loc.god === god) && townNote(loc.id) && townHasStill(loc));
}
function byRegion(towns) {
	const groups = /* @__PURE__ */ new Map();
	for (const loc of towns) {
		const head = townRegionHead(loc.region);
		const list = groups.get(head) ?? [];
		list.push(loc);
		groups.set(head, list);
	}
	return [...groups.keys()].sort((a, b) => {
		const ia = REGION_ORDER.indexOf(a);
		const ib = REGION_ORDER.indexOf(b);
		if (ia === -1 && ib === -1) return a.localeCompare(b);
		if (ia === -1) return 1;
		if (ib === -1) return -1;
		return ia - ib;
	}).map((key) => [key, groups.get(key)]);
}
function TownIndex() {
	const { edition, setEdition, god, setGod } = usePlaceFilter("OSRS");
	const groups = byRegion(listedTowns(edition, god));
	const game = edition === "OSRS" ? "Old School RuneScape" : "RuneScape";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "border-b border-line px-5 py-5 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackLink, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "page-h1 site-title mt-1",
					children: "Towns"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-center text-sm text-muted",
					children: "Two grammars. Same name is not the same street. Pick a client first."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mx-auto mt-2 block h-px w-24 bg-[#c6a45a]/80",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceRail, {
						section: "towns",
						edition,
						god,
						onEdition: setEdition,
						onGod: setGod
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "mx-auto flex max-w-5xl flex-col gap-8 px-5 py-6 md:px-8",
			children: groups.length ? groups.map(([region, rows]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-2 text-[11px] tracking-[0.14em] text-faint",
				children: region
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceGrid, { children: rows.map((loc) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceCard, {
				to: "/towns/$id",
				params: { id: loc.id },
				src: loc.viewA,
				name: loc.name,
				kind: "Town",
				game,
				caption: townStillLine(loc.id)
			}, loc.id)) })] }, region)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-center text-sm text-muted",
				children: "Nothing on that filter."
			})
		})]
	});
}
//#endregion
export { TownIndex as component };
