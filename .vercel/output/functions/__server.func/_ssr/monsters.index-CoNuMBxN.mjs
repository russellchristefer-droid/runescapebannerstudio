import { i as __toESM } from "../_runtime.mjs";
import { V as require_react, b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as BackLink, i as MONSTERS, l as monsterStillSrc } from "./router-FfLcEMxQ.mjs";
import { n as PlaceGrid, t as PlaceCard } from "./place-card-D1_UFsKa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/monsters.index-CoNuMBxN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BestiaryPage() {
	const [slayerOnly, setSlayerOnly] = (0, import_react.useState)(false);
	const [q, setQ] = (0, import_react.useState)("");
	const needle = q.trim().toLowerCase();
	const rows = MONSTERS.filter((row) => row.kind === "monster").filter((row) => slayerOnly ? row.slayer : true).filter((row) => !needle || row.name.toLowerCase().includes(needle) || row.slug.includes(needle.replace(/\s+/g, "-")));
	const osrs = rows.filter((row) => row.edition === "OSRS");
	const rs3 = rows.filter((row) => row.edition === "RS3");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "border-b border-line px-5 py-5 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackLink, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "page-h1 site-title mt-1",
					children: "Bestiary"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-center text-sm text-muted",
					children: "A fan ledger of creatures. Not Jagex. Bosses are elsewhere."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-center text-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/bosses",
						className: "text-parchment",
						children: "Bosses have their own page."
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mx-auto mt-2 block h-px w-24 bg-[#c6a45a]/80",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "search",
						value: q,
						onChange: (event) => setQ(event.target.value),
						placeholder: "Search by name",
						"aria-label": "Search bestiary",
						className: "min-h-11 w-48 rounded-md border border-line bg-surface px-3 text-sm text-parchment"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-pressed": slayerOnly,
						className: `min-h-11 rounded-md border px-3 text-xs ${slayerOnly ? "border-parchment bg-surface text-parchment" : "border-line text-muted"}`,
						onClick: () => setSlayerOnly((on) => !on),
						children: "Slayer"
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-5xl px-5 py-6 md:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameBlock, {
				title: "Old School RuneScape",
				rows: osrs
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameBlock, {
				title: "RuneScape 3",
				rows: rs3
			})]
		})]
	});
}
function GameBlock({ title, rows }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mb-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "section-h2 mb-3 text-center",
			children: title
		}), rows.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceGrid, { children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceCard, {
			to: "/monsters/$id",
			params: { id: row.id },
			src: monsterStillSrc(row),
			name: row.name,
			kind: row.slayer ? "Slayer" : "Monster",
			game: title,
			caption: `${row.name} in ${title}`
		}, row.id)) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-center text-sm text-muted",
			children: "Nothing here yet. Clear Slayer if it is on."
		})]
	});
}
//#endregion
export { BestiaryPage as component };
