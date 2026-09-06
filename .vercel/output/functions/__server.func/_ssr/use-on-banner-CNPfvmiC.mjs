import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useStill } from "./use-still-Badoyd3N.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-on-banner-CNPfvmiC.js
var import_jsx_runtime = require_jsx_runtime();
function UseOnBanner({ src, edition, placeId, label = "Use on banner" }) {
	const still = useStill(src);
	if (!src || !placeId) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href: still.deskHref(edition, placeId),
		className: "min-h-11 text-sm text-parchment [touch-action:manipulation]",
		onClick: () => still.putOnDesk({
			locationId: placeId,
			edition
		}),
		children: label
	});
}
//#endregion
export { UseOnBanner as t };
