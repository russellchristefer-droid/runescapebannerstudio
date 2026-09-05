import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/egg-BFGYoB2m.js
var import_jsx_runtime = require_jsx_runtime();
var LIST = [
	"Triple-click a still — Nothing interesting happens.",
	"Examine a still (right-click or long-press).",
	"/lumb and /varrock go to that town.",
	"Off-field: cabbage, www, abyssal, guthix, karamja.",
	"Midnight UTC — shops restock.",
	"Pete ×7 — mail that is not mail.",
	"Konami on /still — 2001 if the stills are hosted.",
	"/guthix-ledger — a balance sheet.",
	"Bob’s quote turns with the five-minute clock."
];
function EggPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col items-center justify-center bg-bg px-5 text-center text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-lg text-parchment",
				style: { fontFamily: "Fondamento, serif" },
				children: "There is a box here."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-sm text-sm text-muted",
				children: "Property of the desk officer. Not a hiscores rank."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-6 max-w-md list-none space-y-1.5 p-0 text-left text-[11px] text-muted",
				children: LIST.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, line))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-6 text-sm text-parchment",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: "Banner Studio"
					}),
					" · ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/history",
						children: "History"
					}),
					" · ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/classic",
						children: "Classic"
					})
				]
			})
		]
	});
}
//#endregion
export { EggPage as component };
