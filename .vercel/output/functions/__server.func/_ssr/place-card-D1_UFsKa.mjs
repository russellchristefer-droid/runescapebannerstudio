import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as StillPhoto } from "./still-photo-DC0nvt0B.mjs";
import { a as godInk } from "./gods-9ecR_EMd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/place-card-D1_UFsKa.js
var import_jsx_runtime = require_jsx_runtime();
function PlaceCard({ to, params, src, name, kind, game, god, caption }) {
	const label = kind === "Town" && god ? god : kind;
	const alt = caption ?? `${name} in ${game}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
		className: "[contain-intrinsic-size:auto_220px] [content-visibility:auto]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to,
			params,
			className: "block overflow-hidden rounded-md border border-line bg-raised hover:border-[#F5C400]",
			children: [
				src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StillPhoto, {
					src,
					alt,
					className: "aspect-video w-full bg-surface object-cover [content-visibility:auto]"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex aspect-video items-center justify-center bg-surface text-[10px] text-faint",
					children: "Still needed."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "site-title block truncate px-2 pt-1.5 text-center text-sm no-underline",
					children: name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "px-2 pb-2 text-center text-[10px] text-faint",
					children: [
						kind === "Town" && god ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: { color: godInk(god) },
							children: god
						}) : label,
						" ",
						"· ",
						game
					]
				})
			]
		})
	});
}
function PlaceGrid({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "grid grid-cols-2 gap-2 sm:grid-cols-3",
		children
	});
}
//#endregion
export { PlaceGrid as n, PlaceCard as t };
