import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/official-pulse-yZGuzRl4.js
var import_jsx_runtime = require_jsx_runtime();
var PATCH_LINKS = [{
	title: "Old School RuneScape",
	links: [{
		label: "Official Old School news",
		href: "https://secure.runescape.com/m=news/archive?oldschool=1"
	}, {
		label: "OSRS Wiki updates",
		href: "https://oldschool.runescape.wiki/w/Update"
	}]
}, {
	title: "RuneScape",
	links: [{
		label: "Official RuneScape news",
		href: "https://secure.runescape.com/m=news/list?cat=1&page=1"
	}, {
		label: "RuneScape Wiki updates",
		href: "https://runescape.wiki/w/Update"
	}]
}];
function OfficialPulse({ note = "This desk does not write the patch. Official news wins.", links }) {
	const custom = links?.filter((row) => row.href);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
		className: "page-band py-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
				className: "cursor-pointer text-sm text-muted",
				children: "Official notes"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 mt-2 text-[10px] text-faint",
				children: note
			}),
			custom?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-1 flex flex-col gap-1 text-xs",
				children: custom.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: link.href,
					target: "_blank",
					rel: "noopener noreferrer",
					className: "text-parchment",
					children: link.label
				}) }, link.href))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: PATCH_LINKS.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-parchment",
					children: col.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-1 flex flex-col gap-1 text-xs",
					children: col.links.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: link.href,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "text-fg",
						children: link.label
					}) }, link.href))
				})] }, col.title))
			})
		]
	});
}
//#endregion
export { OfficialPulse as t };
