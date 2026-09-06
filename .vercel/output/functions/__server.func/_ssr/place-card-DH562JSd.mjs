import { i as __toESM } from "../_runtime.mjs";
import { V as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useStill } from "./use-still-Badoyd3N.mjs";
import { t as AppLink } from "./place-chip-CCVXVkdy.mjs";
import { t as StillPhoto } from "./still-photo-BOT2Km3b.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/place-card-DH562JSd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function hrefFor(to, params) {
	if (to === "/gods/$god") return `/gods/${params.god ?? ""}`;
	if (to === "/towns/$id") return `/towns/${params.id ?? ""}`;
	if (to === "/bosses/$id") return `/bosses/${params.id ?? ""}`;
	return `/monsters/${params.id ?? ""}`;
}
function editionOf(game) {
	return game.startsWith("Old School") ? "OSRS" : "RS3";
}
function PlaceCard({ to, params, src, name, kind, game, caption }) {
	const alt = `${name} in ${game}`;
	const href = hrefFor(to, params);
	const still = useStill(src);
	const [gone, setGone] = (0, import_react.useState)(false);
	if (!src || gone) return null;
	const placeId = "id" in params ? params.id : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
		className: "[contain-intrinsic-size:auto_220px] [content-visibility:auto]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "overflow-hidden rounded-md border border-line bg-raised hover:border-[#F5C400]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "block w-full text-left [touch-action:manipulation]",
					onClick: () => still.putOnDesk({
						locationId: placeId,
						edition: editionOf(game)
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StillPhoto, {
						src,
						alt,
						className: "aspect-video w-full bg-surface object-cover [content-visibility:auto]",
						onError: () => setGone(true)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLink, {
					href,
					className: "site-title block truncate px-2 pt-1.5 text-center text-sm no-underline",
					children: name
				}),
				caption ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-2 pb-2 text-center text-[10px] text-muted",
					children: caption
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "px-2 pb-2 text-center text-[10px] text-faint",
					children: [
						kind,
						" · ",
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
