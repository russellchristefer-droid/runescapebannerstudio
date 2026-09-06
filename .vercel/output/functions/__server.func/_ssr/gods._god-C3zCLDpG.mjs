import { i as __toESM } from "../_runtime.mjs";
import { B as notFound, V as require_react, b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as GODS, r as LOCATIONS } from "./locations-DGhympWJ.mjs";
import { t as UseOnBanner } from "./use-on-banner-CNPfvmiC.mjs";
import { c as godFromSlug, d as townPath, l as godInk, n as GOD_BRIEFS, o as VisitPlaces, r as GOD_HOME, s as bossPath, t as AppLink, u as godPath } from "./place-chip-CCVXVkdy.mjs";
import { t as PlaceRail } from "./place-rail-DFA15Tod.mjs";
import { t as townNote } from "./town-notes-gbQvMCvJ.mjs";
import { S as BackLink, i as Route$4, x as noteFor } from "./router-D8oIjQ4W.mjs";
import { t as OfficialPulse } from "./official-pulse-yZGuzRl4.mjs";
import { t as useEggGestures } from "./use-egg-gestures-C3ULa-RT.mjs";
import { n as godStillLine, t as godStill } from "./god-stills-BXJGgtQa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gods._god-C3zCLDpG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function GodPage() {
	const { god: slug } = Route$4.useParams();
	const god = godFromSlug(slug);
	if (!god) throw notFound();
	const brief = GOD_BRIEFS[god];
	const towns = LOCATIONS.filter((loc) => loc.god === god && loc.kind === "town" && townNote(loc.id));
	const fights = LOCATIONS.filter((loc) => loc.god === god && loc.kind === "boss" && noteFor(loc.id));
	const osrsStill = godStill(god, "OSRS");
	const rs3Still = godStill(god, "RS3");
	const osrsHome = GOD_HOME[slug]?.osrs;
	const rs3Home = GOD_HOME[slug]?.rs3;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "border-b border-line px-5 py-5 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackLink, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "page-h1 site-title mt-1",
					children: brief.god
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-parchment",
					children: brief.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceRail, { section: "gods" })
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto flex max-w-3xl flex-col gap-6 px-5 py-6 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfficialPulse, {
					note: "Official wiki for this god. Official news wins.",
					links: [{
						label: `${brief.god} · Old School wiki`,
						href: brief.wikiOsrs
					}, {
						label: `${brief.god} · RuneScape wiki`,
						href: brief.wikiRs3
					}]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: [godStill(god, "OSRS") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GodFigure, {
						src: godStill(god, "OSRS"),
						alt: `${brief.god} in Old School RuneScape`,
						caption: godStillLine(god, "OSRS")
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Still needed — Old School RuneScape."
					}), godStill(god, "RS3") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GodFigure, {
						src: godStill(god, "RS3"),
						alt: `${brief.god} in RuneScape`,
						caption: godStillLine(god, "RS3")
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Still needed — RuneScape."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: brief.summary
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-2 text-sm tracking-[0.16em] text-parchment",
						children: "TWO CANONS"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-fg",
							children: "Old School RuneScape. "
						}), brief.osrs]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-fg",
							children: "RuneScape. "
						}), brief.rs3]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: brief.wikiOsrs,
								className: "text-parchment",
								target: "_blank",
								rel: "noopener noreferrer",
								children: "Read the live page · Old School"
							}),
							" · ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: brief.wikiRs3,
								className: "text-parchment",
								target: "_blank",
								rel: "noopener noreferrer",
								children: "Read the live page · RuneScape"
							})
						]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-2 text-sm tracking-[0.16em] text-parchment",
					children: "SIGNS"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "list-disc space-y-2 pl-5 text-sm text-muted",
					children: brief.notes.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, line))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-2 text-sm tracking-[0.16em] text-parchment",
					children: "FIGHT THAT BELONGS HERE"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "list-disc space-y-2 pl-5 text-sm text-muted",
					children: brief.play.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, line))
				})] }),
				god === "Zaros" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "px-1 py-2 text-sm text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
						className: "cursor-pointer text-xs tracking-[0.14em] text-faint",
						children: "Senntisten ledger"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3",
						children: [
							"RuneScape methods only. No GP/hour on this desk.",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/senntisten",
								className: "text-parchment",
								children: "Open the Senntisten ledger"
							}),
							"."
						]
					})]
				}) : null,
				god === "Guthix" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-faint",
					children: [
						"There is a balance sheet.",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/guthix-ledger",
							className: "text-muted",
							children: "Guthix ledger"
						})
					]
				}) : null,
				osrsHome || rs3Home ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex flex-wrap gap-3 text-sm",
					children: [osrsHome && osrsStill ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UseOnBanner, {
						src: osrsStill,
						edition: "OSRS",
						placeId: osrsHome,
						label: "Use on banner · Old School"
					}) : null, rs3Home && rs3Still ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UseOnBanner, {
						src: rs3Still,
						edition: "RS3",
						placeId: rs3Home,
						label: "Use on banner · RuneScape"
					}) : null]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-3 text-sm font-medium text-muted",
						children: "Places to visit"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VisitPlaces, { items: [
						...GODS.map((item) => ({
							href: godPath(item),
							label: item,
							current: item === god,
							color: godInk(item)
						})),
						...towns.map((loc) => ({
							href: townPath(loc.id),
							label: `${loc.name}${loc.edition === "OSRS" ? " · OSRS" : ""}`
						})),
						...fights.slice(0, 6).map((loc) => ({
							href: bossPath(loc.id),
							label: loc.name
						}))
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 grid gap-2 sm:grid-cols-2",
						children: towns.map((loc) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppLink, {
							href: townPath(loc.id),
							className: "min-h-11 px-1 py-2 text-sm [touch-action:manipulation]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-medium",
								children: loc.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-faint",
								children: [
									loc.edition,
									" · ",
									loc.region.replace(/\s·\sOSRS$/, "")
								]
							})]
						}, loc.id))
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-faint",
					children: [
						"Fan desk notes. Live page: the official wiki for this game.",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: brief.wikiOsrs,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "text-parchment",
							children: "Old School"
						}),
						" · ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: brief.wikiRs3,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "text-parchment",
							children: "RuneScape"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "text-sm text-parchment",
					children: "Back to banners"
				})
			]
		})]
	});
}
function GodFigure({ src, alt, caption }) {
	const ref = (0, import_react.useRef)(null);
	useEggGestures(ref, () => "The stone remembers a name.");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
		ref,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src,
			alt,
			className: "aspect-video w-full rounded-md border border-line bg-surface object-cover"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
			className: "mt-1 text-center text-[11px] text-faint",
			children: caption
		})]
	});
}
//#endregion
export { GodPage as component };
