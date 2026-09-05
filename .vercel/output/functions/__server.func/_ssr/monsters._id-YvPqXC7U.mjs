import { B as notFound, b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as deskOpenPath } from "./desk-link-DTlBHlDW.mjs";
import { n as writeStudioSave } from "./studio-save-1SaG6gyq.mjs";
import { _ as BackLink, a as monsterById, c as monsterSlayerLink, d as monsterWatchLine, f as sisterMonster, l as monsterStillSrc, o as monsterHuntLine, r as Route$2, s as monsterKillLine, u as monsterTaskLine } from "./router-FfLcEMxQ.mjs";
import { t as StillPhoto } from "./still-photo-DC0nvt0B.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/monsters._id-YvPqXC7U.js
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
					children: "The creature is in the room. You are the variable."
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
						row.placeId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [" · ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: deskOpenPath(row.edition, row.placeId),
							className: "text-parchment",
							onClick: () => writeStudioSave({
								locationId: row.placeId,
								edition: row.edition,
								skillPicks: []
							}),
							children: "Use on banner"
						})] }) : null
					]
				})
			]
		})]
	});
}
//#endregion
export { MonsterPage as component };
