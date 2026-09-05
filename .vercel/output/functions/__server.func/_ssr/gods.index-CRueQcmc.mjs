import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as GODS } from "./locations-CLZLnwld.mjs";
import { t as OfficialPulse } from "./official-pulse-Bm5wbKDQ.mjs";
import { s as BackLink } from "./router-DXmYNu76.mjs";
import { n as PlaceGrid, t as PlaceCard } from "./place-card-WbDiWHO2.mjs";
import { n as GOD_SLUGS, t as GOD_BRIEFS } from "./gods-9ecR_EMd.mjs";
import { t as godStill } from "./god-stills-DvS0SucB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gods.index-CRueQcmc.js
var import_jsx_runtime = require_jsx_runtime();
function stillFor(god, edition) {
	return godStill(god, edition);
}
function GodsIndex() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "border-b border-line px-5 py-5 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackLink, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "page-h1 site-title mt-1",
					children: "Gods"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-center text-sm text-muted",
					children: "Two sealed canons. Old School RuneScape first, then RuneScape 3. Not a Jagex page."
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
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceGrid, { children: GODS.map((god) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceCard, {
					to: "/gods/$god",
					params: { god: GOD_SLUGS[god] },
					src: stillFor(god, "OSRS"),
					name: GOD_BRIEFS[god].god,
					kind: "God",
					game: "Old School RuneScape"
				}, `osrs-${god}`)) })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 text-sm tracking-[0.16em] text-parchment",
					children: "RuneScape 3"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceGrid, { children: GODS.map((god) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceCard, {
					to: "/gods/$god",
					params: { god: GOD_SLUGS[god] },
					src: stillFor(god, "RS3"),
					name: GOD_BRIEFS[god].god,
					kind: "God",
					game: "RuneScape 3"
				}, `rs3-${god}`)) })] })
			]
		})]
	});
}
//#endregion
export { GodsIndex as component };
