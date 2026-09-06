import { i as __toESM } from "../_runtime.mjs";
import { V as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as GODS } from "./locations-DGhympWJ.mjs";
import { a as PlaceChip, l as godInk, u as godPath } from "./place-chip-CCVXVkdy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/place-rail-DFA15Tod.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SECTIONS = [
	{
		id: "towns",
		href: "/towns",
		label: "Towns"
	},
	{
		id: "gods",
		href: "/gods",
		label: "Gods"
	},
	{
		id: "bosses",
		href: "/bosses",
		label: "Bosses"
	},
	{
		id: "pvp",
		href: "/pvp",
		label: "PvP"
	}
];
function PlaceRail({ section, edition, god, onEdition, onGod, onSection }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		"aria-label": "Places",
		className: "flex flex-col items-center gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap justify-center gap-2",
				children: SECTIONS.map((row) => {
					if (onSection && (row.id === "towns" || row.id === "bosses")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-pressed": section === row.id,
						onClick: () => onSection(row.id),
						className: `inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border px-3 text-xs [touch-action:manipulation] ${section === row.id ? "border-parchment bg-raised text-parchment" : "border-line text-muted"}`,
						children: row.label
					}, row.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceChip, {
						href: row.href,
						current: section === row.id,
						children: row.label
					}, row.id);
				})
			}),
			onEdition ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap justify-center gap-2",
				children: [["OSRS", "OSRS"], ["RS3", "RS3"]].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-pressed": edition === id,
					onClick: () => onEdition(id),
					className: `inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border px-3 text-xs [touch-action:manipulation] ${edition === id ? "border-parchment bg-raised text-parchment" : "border-line text-muted"}`,
					children: label
				}, id))
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap justify-center gap-1",
				children: GODS.map((name) => {
					const on = god === name;
					if (onGod) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-pressed": on,
						onClick: () => onGod(on ? null : name),
						className: `inline-flex min-h-11 items-center justify-center rounded-md border px-3 text-xs [touch-action:manipulation] ${on ? "border-parchment bg-raised" : "border-line"}`,
						style: { color: godInk(name) },
						children: name
					}, name);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceChip, {
						href: godPath(name),
						current: on,
						style: { color: godInk(name) },
						children: name
					}, name);
				})
			})
		]
	});
}
function usePlaceFilter(start = "OSRS") {
	const [edition, setEdition] = (0, import_react.useState)(start);
	const [god, setGod] = (0, import_react.useState)(null);
	return {
		edition,
		setEdition,
		god,
		setGod
	};
}
//#endregion
export { usePlaceFilter as n, PlaceRail as t };
