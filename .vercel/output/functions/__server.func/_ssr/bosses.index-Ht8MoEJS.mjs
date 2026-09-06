import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as LOCATIONS } from "./locations-DGhympWJ.mjs";
import { n as usePlaceFilter, t as PlaceRail } from "./place-rail-DFA15Tod.mjs";
import { S as BackLink, v as BOSS_NOTES } from "./router-D8oIjQ4W.mjs";
import { n as PlaceGrid, t as PlaceCard } from "./place-card-DH562JSd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bosses.index-Ht8MoEJS.js
var import_jsx_runtime = require_jsx_runtime();
function BossIndex() {
	const { edition, setEdition, god, setGod } = usePlaceFilter("OSRS");
	const game = edition === "OSRS" ? "Old School RuneScape" : "RuneScape";
	const rows = Object.values(BOSS_NOTES).filter((note) => {
		if (note.edition !== edition) return false;
		const loc = LOCATIONS.find((item) => item.id === note.id);
		if (!loc) return false;
		if (god && loc.god !== god) return false;
		return true;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "border-b border-line px-5 py-5 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackLink, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "page-h1 mt-1",
					children: "Bosses"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-center text-sm text-muted",
					children: "Working sheets. Combat, slayer, unlock, instance, death. OSRS tiers, bag, supplies, spec, skip, bank. Sanity only where the fight uses it. RS3 camp, ultimates, familiar. Team seats only on group fights. Three links."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mx-auto mt-2 block h-px w-24 bg-[#c6a45a]/80",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceRail, {
						section: "bosses",
						edition,
						god,
						onEdition: setEdition,
						onGod: setGod
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "mx-auto flex max-w-5xl flex-col gap-8 px-5 py-6 md:px-8",
			children: rows.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceGrid, { children: rows.map((note) => {
				const loc = LOCATIONS.find((item) => item.id === note.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceCard, {
					to: "/bosses/$id",
					params: { id: note.id },
					src: loc?.viewA,
					name: note.title,
					kind: "Boss",
					game
				}, note.id);
			}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-center text-sm text-muted",
				children: "Nothing on that filter."
			})
		})]
	});
}
//#endregion
export { BossIndex as component };
