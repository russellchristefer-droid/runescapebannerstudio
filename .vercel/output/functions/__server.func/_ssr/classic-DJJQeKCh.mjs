import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as BackLink } from "./router-D8oIjQ4W.mjs";
import { t as OfficialPulse } from "./official-pulse-yZGuzRl4.mjs";
import { t as HERO_STILLS } from "./still-pool-DmUeBE-J.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/classic-DJJQeKCh.js
var import_jsx_runtime = require_jsx_runtime();
function ClassicPage() {
	const classic = HERO_STILLS.filter((card) => card.era === "rsc" && card.src.startsWith("/stills/rsc/"));
	const places = classic.filter((card) => card.kind === "place");
	const play = classic.filter((card) => card.kind === "play");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "border-b border-line px-5 py-5 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackLink, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "page-h1 mt-1",
					children: "Classic"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-sm text-muted",
					children: "Memory lives here. The worlds do not."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mx-auto mt-2 block h-px w-24 bg-[#c6a45a]/80",
					"aria-hidden": "true"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			id: "content",
			className: "mx-auto max-w-5xl px-5 py-6 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfficialPulse, {
					note: "Official Classic worlds are closed. This page is memory.",
					links: [{
						label: "RuneScape Classic wiki",
						href: "https://runescapeclassic.wiki/"
					}, {
						label: "History of RuneScape Classic",
						href: "https://runescape.wiki/w/RuneScape_Classic"
					}]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 text-sm font-semibold text-parchment",
					children: "Places"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClassicGrid, { cards: places }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 mt-8 text-sm font-semibold text-parchment",
					children: "Play shots"
				}),
				play.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClassicGrid, { cards: play }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "No honest Classic play still is hosted yet."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-2 mt-8 text-sm font-semibold text-parchment",
					children: "Note"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-2xl text-sm text-muted",
					children: "RuneScape opened in January 2001 as a tiled Java world. Combat was slow. The map felt hand-sized, then suddenly not. In 2004 the later engine took the main name; Classic stayed as the older grammar. Jagex closed official Classic worlds in 2018. That is public record. This page is memory: hosted stills, not a world you can log into. It is not a private server and it will not pretend otherwise."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm text-parchment",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "https://classic.runescape.wiki/",
							target: "_blank",
							rel: "noopener noreferrer",
							children: "RuneScape Classic wiki"
						}),
						" · ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/history",
							children: "History"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm text-parchment",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							children: "Banner desk"
						}),
						" · ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/egg",
							className: "text-faint",
							children: "There is a box here"
						})
					]
				})
			]
		})]
	});
}
function ClassicGrid({ cards }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "grid list-none gap-4 p-0 sm:grid-cols-2",
		children: cards.map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "overflow-hidden rounded-md border border-line bg-raised",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: card.src,
					alt: `${card.name}, ${card.kind}, RuneScape Classic`,
					width: 1200,
					height: 480,
					loading: "lazy",
					decoding: "async",
					className: "aspect-video w-full bg-surface object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "site-title px-2 pt-1.5 text-center text-sm",
					children: card.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "px-2 text-center text-[10px] text-faint",
					children: [
						card.name,
						" · ",
						card.kind,
						" · RuneScape Classic"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "px-3 pb-3 text-center text-[11px] text-faint",
					children: [
						"Gallery only.",
						card.filePage ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [" ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: card.filePage,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "text-parchment",
							children: "File page"
						})] }) : null,
						card.waybackUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [" ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: card.waybackUrl,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "text-parchment",
							children: "Wayback"
						})] }) : null
					]
				})
			]
		}, card.src + card.name))
	});
}
//#endregion
export { ClassicPage as component };
