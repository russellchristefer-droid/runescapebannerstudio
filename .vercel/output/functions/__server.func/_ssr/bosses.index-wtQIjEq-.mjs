import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as OfficialPulse } from "./official-pulse-pfkSV5ch.mjs";
import { r as LOCATIONS } from "./locations-CLZLnwld.mjs";
import { t as BOSS_NOTES } from "./boss-notes-BtB8wfDO.mjs";
import { _ as BackLink } from "./router-FfLcEMxQ.mjs";
import { n as PlaceGrid, t as PlaceCard } from "./place-card-D1_UFsKa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bosses.index-wtQIjEq-.js
var import_jsx_runtime = require_jsx_runtime();
function BossIndex() {
	const osrs = Object.values(BOSS_NOTES).filter((n) => n.edition === "OSRS" && LOCATIONS.some((l) => l.id === n.id));
	const rs3 = Object.values(BOSS_NOTES).filter((n) => n.edition === "RS3" && LOCATIONS.some((l) => l.id === n.id));
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
					children: "Arenas and raids · pick a game first."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mx-auto mt-2 block h-px w-24 bg-[#c6a45a]/80",
					"aria-hidden": "true"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto flex max-w-5xl flex-col gap-8 px-5 py-6 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfficialPulse, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 text-sm tracking-[0.16em] text-parchment",
					children: "Old School RuneScape"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceGrid, { children: osrs.map((note) => {
					const loc = LOCATIONS.find((item) => item.id === note.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceCard, {
						to: "/bosses/$id",
						params: { id: note.id },
						src: loc?.viewA,
						name: note.title,
						kind: "Boss",
						game: "Old School RuneScape"
					}, note.id);
				}) })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 text-sm tracking-[0.16em] text-parchment",
					children: "RuneScape 3"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceGrid, { children: rs3.map((note) => {
					const loc = LOCATIONS.find((item) => item.id === note.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceCard, {
						to: "/bosses/$id",
						params: { id: note.id },
						src: loc?.viewA,
						name: note.title,
						kind: "Boss",
						game: "RuneScape 3"
					}, note.id);
				}) })] })
			]
		})]
	});
}
//#endregion
export { BossIndex as component };
