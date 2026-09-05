import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/still-photo-DC0nvt0B.js
var import_jsx_runtime = require_jsx_runtime();
function StillPhoto({ src, alt, priority = false, className = "aspect-video w-full bg-surface object-cover" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src,
		srcSet: `${src} 400w, ${src} 800w, ${src} 1200w`,
		sizes: "(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw",
		alt,
		width: 800,
		height: 320,
		loading: priority ? "eager" : "lazy",
		decoding: "async",
		fetchPriority: priority ? "high" : "low",
		className,
		onError: (event) => {
			const img = event.currentTarget;
			if (!(img.dataset.retry === "1") && src) {
				img.dataset.retry = "1";
				img.src = src;
				return;
			}
			img.onerror = null;
			img.removeAttribute("srcset");
			img.alt = `${alt}. Still needed.`;
			img.src = "data:image/svg+xml," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="320"><rect fill="#1a1610" width="100%" height="100%"/></svg>`);
		}
	});
}
//#endregion
export { StillPhoto as t };
