import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/official-sites-CbG3wdq_.js
var import_jsx_runtime = require_jsx_runtime();
var OFFICIAL_SITES = [
	["Old School RuneScape", "https://oldschool.runescape.com/"],
	["RuneScape", "https://www.runescape.com/"],
	["Old School wiki", "https://oldschool.runescape.wiki/"],
	["RuneScape wiki", "https://runescape.wiki/"],
	["Fan Content Policy", "https://legal.jagex.com/docs/policies/fan-content-policy"],
	["Jagex Support", "https://support.runescape.com/"]
];
function OfficialSites() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-2 text-sm font-semibold text-parchment",
			children: "Official sites"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-2 text-[11px] text-faint",
			children: "Official · not this desk."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "flex flex-wrap gap-x-3 gap-y-1 text-sm text-parchment",
			children: OFFICIAL_SITES.map(([name, href]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href,
				target: "_blank",
				rel: "noopener noreferrer",
				children: name
			}, href))
		})
	] });
}
//#endregion
export { OfficialSites as t };
