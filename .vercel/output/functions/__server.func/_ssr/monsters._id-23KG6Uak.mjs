import { B as notFound, b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as UseOnBanner } from "./use-on-banner-CNPfvmiC.mjs";
import { S as BackLink, _ as sisterMonster, d as monsterKillLine, f as monsterSlayerLink, g as monsterWatchLine, h as monsterTaskLine, l as monsterById, m as monsterStillSrc, p as monsterStillLine, r as Route$2, u as monsterHuntLine } from "./router-D8oIjQ4W.mjs";
import { t as StillPhoto } from "./still-photo-BOT2Km3b.mjs";
import { t as OfficialPulse } from "./official-pulse-yZGuzRl4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/monsters._id-23KG6Uak.js
var import_jsx_runtime = require_jsx_runtime();
function MonsterPage() {
	const { id } = Route$2.useParams();
	const row = monsterById(id);
	if (!row) throw notFound();
	const game = row.edition === "OSRS" ? "Old School RuneScape" : "RuneScape";
	const src = monsterStillSrc(row);
	const sister = sisterMonster(row);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "border-b border-line px-5 py-5 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackLink, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "eyebrow text-center text-[10px] uppercase tracking-[0.18em] text-muted",
					children: [
						"Bestiary · ",
						row.slayer ? "Slayer" : "Monster",
						" · ",
						game
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "page-h1 site-title mt-1",
					children: row.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mx-auto mt-2 block h-px w-24 bg-[#c6a45a]/80",
					"aria-hidden": "true"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-3xl px-5 py-6 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfficialPulse, {
					note: "Official wiki for this creature. Official news wins.",
					links: [{
						label: `${row.name} · ${game} wiki`,
						href: row.wiki
					}]
				}),
				src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StillPhoto, {
					src,
					alt: `${row.name} in ${game}`,
					className: "aspect-[21/9] w-full border border-[#c6a45a] bg-surface object-cover"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "border border-[#c6a45a] bg-surface px-3 py-10 text-center text-sm text-muted",
					children: "Even the beast declined to appear."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-center font-[Fondamento] text-lg text-parchment",
					children: "You already know the room. The creature is the constant. You are the variable."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-center text-[11px] text-muted",
					children: monsterStillLine(row)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-center text-[11px] text-muted",
					children: [
						row.slayer ? "Slayer" : "Monster",
						" · ",
						game
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid gap-6 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "section-h2",
							children: "Where"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: row.where
						}),
						row.gate ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: row.gate
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: monsterTaskLine(row)
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "section-h2",
						children: "Hunt"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: monsterHuntLine(row)
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "section-h2",
						children: "Watch"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: monsterWatchLine(row)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "section-h2",
						children: "Kill"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: monsterKillLine(row)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 text-sm text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: row.wiki,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "text-parchment",
							children: "Live wiki"
						}),
						row.slayer && monsterSlayerLink(row) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [" · ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: monsterSlayerLink(row),
							target: "_blank",
							rel: "noopener noreferrer",
							className: "text-parchment",
							children: "Slayer task"
						})] }) : null,
						sister ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [" · ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/monsters/$id",
							params: { id: sister.id },
							className: "text-parchment",
							children: "Same name in the other game"
						})] }) : null,
						row.placeId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [" · ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UseOnBanner, {
							src,
							edition: row.edition,
							placeId: row.placeId
						})] }) : null
					]
				})
			]
		})]
	});
}
//#endregion
export { MonsterPage as component };
