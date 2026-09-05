import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as BackLink } from "./router-FfLcEMxQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/jmods-CGHB0Xgn.js
var import_jsx_runtime = require_jsx_runtime();
var JAGEX_X_OFFICIAL = [
	{
		name: "Old School RuneScape",
		handle: "OldSchoolRS",
		role: "Official Old School account"
	},
	{
		name: "RuneScape",
		handle: "RuneScape",
		role: "Official RuneScape 3 account"
	},
	{
		name: "Jagex",
		handle: "Jagex",
		role: "Company account"
	}
];
var JAGEX_X_MODS = [
	{
		name: "Mod Ash",
		handle: "JagexAsh",
		role: "Old School product / content"
	},
	{
		name: "Mod Ayiza",
		handle: "JagexAyiza",
		role: "Old School community"
	},
	{
		name: "Mod Light",
		handle: "JagexLight",
		role: "Old School community"
	},
	{
		name: "Mod Blossom",
		handle: "JagexBlossom",
		role: "Old School community"
	},
	{
		name: "Mod Ed",
		handle: "JagexEd",
		role: "Old School narrative"
	},
	{
		name: "Mod Arcane",
		handle: "JagexArcane",
		role: "Old School systems"
	},
	{
		name: "Mod Sova",
		handle: "JagexSova",
		role: "Old School content"
	},
	{
		name: "Mod Boko",
		handle: "JagexBoko",
		role: "Old School engineering"
	},
	{
		name: "Mod Curse",
		handle: "JagexCurse",
		role: "Old School QA"
	},
	{
		name: "Mod Nox",
		handle: "JagexNox",
		role: "Old School QA"
	},
	{
		name: "Mod Bruno",
		handle: "JagexBruno",
		role: "Old School QA"
	},
	{
		name: "Mod Archie",
		handle: "JagexArchie",
		role: "Influencer and events"
	},
	{
		name: "Mod Ryan",
		handle: "JagexRyan",
		role: "RuneScape 3 creative"
	}
];
function JmodsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "border-b border-line px-5 py-5 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackLink, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "page-h1 mt-1",
					children: "Jagex X accounts"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 max-w-2xl text-sm text-muted",
					children: [
						"This page is a directory, not Jagex. Public handles only. Staff leave and titles change. Prefer",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "https://www.jagex.com/",
							className: "text-parchment",
							target: "_blank",
							rel: "noreferrer",
							children: "jagex.com"
						}),
						",",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "https://www.runescape.com/",
							className: "text-parchment",
							target: "_blank",
							rel: "noreferrer",
							children: "runescape.com"
						}),
						", and",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "https://oldschool.runescape.com/",
							className: "text-parchment",
							target: "_blank",
							rel: "noreferrer",
							children: "oldschool.runescape.com"
						}),
						"."
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto flex max-w-3xl flex-col gap-8 px-5 py-6 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 text-sm tracking-[0.16em] text-parchment",
					children: "OFFICIAL"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { rows: JAGEX_X_OFFICIAL })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 text-sm tracking-[0.16em] text-parchment",
					children: "J-MOD HANDLES"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { rows: JAGEX_X_MODS })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-faint",
					children: [
						"Old School also keeps a live list from",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "https://x.com/OldSchoolRS",
							className: "text-parchment",
							target: "_blank",
							rel: "noreferrer",
							children: "@OldSchoolRS"
						}),
						". Views on personal J-Mod posts are their own."
					]
				})
			]
		})]
	});
}
function List({ rows }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "flex flex-col gap-2",
		children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
			href: `https://x.com/${row.handle}`,
			target: "_blank",
			rel: "noreferrer",
			className: "flex items-center justify-between rounded-md border border-line bg-raised px-3 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block text-sm font-medium",
				children: row.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs text-muted",
				children: row.role
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-sm text-parchment",
				children: ["@", row.handle]
			})]
		}) }, row.handle))
	});
}
//#endregion
export { JmodsPage as component };
