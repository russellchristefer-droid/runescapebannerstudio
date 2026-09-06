import { i as __toESM } from "../_runtime.mjs";
import { V as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DOcWkmUi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Studio = (0, import_react.lazy)(() => import("./studio-BzZRroBs.mjs").then((mod) => ({ default: mod.Studio })));
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "min-h-dvh bg-bg px-5 py-8 text-center text-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] tracking-[0.2em] text-faint uppercase",
					children: "Independent studio · not a Jagex product"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "site-title page-h1 mt-2",
					children: "RuneScape Banner Studio"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted",
					children: "Opening the desk…"
				})
			]
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Studio, {})
	});
}
//#endregion
export { Home as component };
