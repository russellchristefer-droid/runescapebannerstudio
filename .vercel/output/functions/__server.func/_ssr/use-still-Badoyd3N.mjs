import { n as putStillOnDesk } from "./store-pWHXaoAo.mjs";
import { n as deskOpenPath } from "./desk-link-CEJ4hcj1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-still-Badoyd3N.js
/** One still path for the card face and Use on banner. */
function useStill(src) {
	function putOnDesk(extra) {
		if (!src) return;
		putStillOnDesk({
			stillSrc: src,
			locationId: extra?.locationId,
			edition: extra?.edition
		});
	}
	function deskHref(edition, placeId) {
		if (!src) return "/#desk";
		return deskOpenPath(edition, placeId, { still: src });
	}
	return {
		src,
		putOnDesk,
		deskHref
	};
}
//#endregion
export { useStill as t };
