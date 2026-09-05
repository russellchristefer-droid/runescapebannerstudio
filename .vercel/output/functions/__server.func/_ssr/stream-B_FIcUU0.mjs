import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as BackLink } from "./router-FfLcEMxQ.mjs";
import { t as StreamDesk } from "./stream-desk-mBS9Cqpd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stream-B_FIcUU0.js
var import_jsx_runtime = require_jsx_runtime();
function StreamPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "border-b border-line px-5 py-5 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackLink, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "page-h1 mt-1",
					children: "Stream"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-sm text-muted",
					children: "Go-live notes. This desk does not log in or encode your stream."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mx-auto mt-2 block h-px w-24 bg-[#c6a45a]/80",
					"aria-hidden": "true"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			id: "content",
			className: "mx-auto max-w-3xl px-5 py-6 md:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StreamDesk, {})
		})]
	});
}
//#endregion
export { StreamPage as component };
