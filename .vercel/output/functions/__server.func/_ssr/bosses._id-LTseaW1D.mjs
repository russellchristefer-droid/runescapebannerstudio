import { B as notFound, b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as LOCATIONS } from "./locations-CLZLnwld.mjs";
import { n as writeStudioSave } from "./studio-save-BZUmR0QZ.mjs";
import { t as OfficialPulse } from "./official-pulse-Bm5wbKDQ.mjs";
import { n as noteFor } from "./boss-notes-BtB8wfDO.mjs";
import { a as placeLore, n as deskOpenPath } from "./desk-link-XZ3O19hH.mjs";
import { i as Route$4, s as BackLink } from "./router-DXmYNu76.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bosses._id-LTseaW1D.js
var import_jsx_runtime = require_jsx_runtime();
function BossNotePage() {
	const { id } = Route$4.useParams();
	const note = noteFor(id);
	const loc = LOCATIONS.find((item) => item.id === id);
	if (!note || !loc) throw notFound();
	const game = note.edition === "OSRS" ? "Old School RuneScape" : "RuneScape 3";
	const team = /raid|duo|trio|5-man|team/i.test(note.role);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "border-b border-line px-5 py-5 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackLink, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "page-h1 mt-1",
					children: note.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-center text-sm text-muted",
					children: [
						game,
						" · ",
						note.role
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-2 mx-auto block h-px w-24 bg-[#c6a45a]/80",
					"aria-hidden": "true"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto flex max-w-3xl flex-col gap-5 px-5 py-6 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfficialPulse, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: loc.viewA,
					alt: `${note.title} arena, ${game}`,
					className: "aspect-[21/9] w-full rounded-md border border-line object-cover bg-surface"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: "Where. "
					}), loc.name]
				}),
				placeLore(loc) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-2 text-sm font-semibold text-parchment",
						children: "Lore"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: placeLore(loc).brief
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: placeLore(loc).sourceUrl,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "text-parchment",
							children: "Read the live page"
						})
					})
				] }) : null,
				note.start[0] ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: "Gate. "
					}), note.start[0]]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-2 text-sm tracking-[0.16em] text-parchment",
						children: "THE FIGHT"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-sm text-muted",
						children: note.style
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-3 text-sm text-muted",
						children: note.pray
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "list-disc space-y-2 pl-5 text-sm text-muted",
						children: note.route.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: line }, line))
					})
				] }),
				note.kit[0] ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: "What to bring. "
					}), note.kit[0]]
				}) : null,
				team ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: "Roles. "
						}),
						note.role,
						". ",
						note.pray
					]
				}) : null,
				note.method[0] ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: "Step up. "
					}), note.method[0]]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Do not say on stream: unpublished drop rates, “this week’s patch loot,” or a fossil rotation as if it were live."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SisterBoss, {
					name: loc.name,
					edition: loc.edition,
					id: loc.id
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: deskOpenPath(loc.edition, loc.id),
					className: "text-sm text-parchment",
					onClick: () => writeStudioSave({
						locationId: loc.id,
						edition: loc.edition,
						skillPicks: []
					}),
					children: "Use this town on a banner"
				})
			]
		})]
	});
}
function SisterBoss({ name, edition, id }) {
	const sister = LOCATIONS.find((item) => item.kind === "boss" && item.name === name && item.edition !== edition && item.id !== id);
	if (!sister) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/bosses/$id",
			params: { id: sister.id },
			className: "text-parchment",
			children: edition === "OSRS" ? "Same name in RuneScape 3" : "Same name in Old School RuneScape"
		})
	});
}
//#endregion
export { BossNotePage as component };
