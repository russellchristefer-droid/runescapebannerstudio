import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as GODS } from "./locations-DGhympWJ.mjs";
import { i as GOD_SLUGS, n as GOD_BRIEFS } from "./place-chip-CCVXVkdy.mjs";
import { n as usePlaceFilter, t as PlaceRail } from "./place-rail-DFA15Tod.mjs";
import { S as BackLink } from "./router-D8oIjQ4W.mjs";
import { n as PlaceGrid, t as PlaceCard } from "./place-card-DH562JSd.mjs";
import { n as godStillLine, t as godStill } from "./god-stills-BXJGgtQa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gods.index-BQBK6yCA.js
var import_jsx_runtime = require_jsx_runtime();
function GodsIndex() {
	const { edition, setEdition, god, setGod } = usePlaceFilter("OSRS");
	const rows = GODS.filter((name) => !god || name === god);
	const game = edition === "OSRS" ? "Old School RuneScape" : "RuneScape";
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
					children: "Two sealed canons. Prayer book and God Wars on one client. Landfall and edicts on the other. Wiki keeps the hour."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mx-auto mt-2 block h-px w-24 bg-[#c6a45a]/80",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceRail, {
						section: "gods",
						edition,
						god,
						onEdition: setEdition,
						onGod: setGod
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "mx-auto flex max-w-5xl flex-col gap-8 px-5 py-6 md:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceGrid, { children: rows.map((name) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceCard, {
				to: "/gods/$god",
				params: { god: GOD_SLUGS[name] },
				src: godStill(name, edition),
				name: GOD_BRIEFS[name].god,
				kind: "God",
				game,
				caption: godStillLine(name, edition)
			}, `${edition}-${name}`)) })
		})]
	});
}
//#endregion
export { GodsIndex as component };
