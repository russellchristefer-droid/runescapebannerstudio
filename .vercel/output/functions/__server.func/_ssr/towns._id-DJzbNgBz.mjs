import { i as __toESM } from "../_runtime.mjs";
import { B as notFound, V as require_react, b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as LOCATIONS } from "./locations-CLZLnwld.mjs";
import { n as deskOpenPath } from "./desk-link-DTlBHlDW.mjs";
import { t as townNote } from "./town-notes-BW8dq-nk.mjs";
import { n as placeLore } from "./place-lore-CQ9DWccC.mjs";
import { n as writeStudioSave } from "./studio-save-1SaG6gyq.mjs";
import { T as useVisibleNow, _ as BackLink, n as Route } from "./router-FfLcEMxQ.mjs";
import { a as godInk, n as GOD_SLUGS } from "./gods-9ecR_EMd.mjs";
import { i as stillIndex, n as formatRemain, r as msUntilNext } from "./still-clock-F1LQ7Gge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/towns._id-DJzbNgBz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Dated official or wiki notes only. Add a row when Jagex or the wiki names the street. */
var TOWN_NOTICES = [];
function noticeFor(slug, game) {
	return TOWN_NOTICES.find((row) => row.slug === slug && row.game === game);
}
function c(role, src) {
	return src ? {
		role,
		src
	} : { role };
}
var OSRS$1 = {
	osrslumbridge: [c("Duke's clerk", "/stills/osrs/citizens/lumbridge-1.png"), c("Town guard", "/stills/osrs/citizens/lumbridge-2.png")],
	osrsfalador: [c("White Knight", "/stills/osrs/citizens/falador-1.png")],
	osrsvarrock: [c("Stallholder", "/stills/osrs/citizens/varrock-1.png"), c("Guard", "/stills/osrs/citizens/varrock-2.png")],
	osrsedge: [
		c("Guard", "/stills/osrs/citizens/edgeville-1.png"),
		c("Monk", "/stills/osrs/citizens/edgeville-2.png"),
		c("Adventurer at the ditch", "/stills/osrs/citizens/edgeville-3.png")
	],
	osrsdraynor: [c("Market guard", "/stills/osrs/citizens/draynor-1.png")],
	osrsalkharid: [c("Palace guard", "/stills/osrs/citizens/al-kharid-1.png")],
	osrscatherby: [c("Fisher", "/stills/osrs/citizens/catherby-1.png")],
	osrsardougne: [c("Knight of Ardougne", "/stills/osrs/citizens/ardougne-1.png")],
	osrsyanille: [c("Wizard", "/stills/osrs/citizens/yanille-1.png")],
	osrsprif: [c("Elven door-warden", "/stills/osrs/citizens/prifddinas-1.png")]
};
var RS3$1 = {
	lumbridge: [c("Duke's clerk", "/stills/rs3/citizens/lumbridge-1.png"), c("Town guard", "/stills/rs3/citizens/lumbridge-2.png")],
	falador: [c("White Knight", "/stills/rs3/citizens/falador-1.png")],
	varrock: [c("Stallholder", "/stills/rs3/citizens/varrock-1.png"), c("Guard", "/stills/rs3/citizens/varrock-2.png")],
	edgeville: [c("Guard", "/stills/rs3/citizens/edgeville-1.png"), c("Monk", "/stills/rs3/citizens/edgeville-2.png")],
	draynor: [c("Market guard", "/stills/rs3/citizens/draynor-1.png")],
	alkharid: [c("Palace guard", "/stills/rs3/citizens/alkharid-1.png")],
	prifddinas: [c("Elven door-warden", "/stills/rs3/citizens/prifddinas-1.png")]
};
var DEFAULT_OSRS = [c("Guard", "/stills/osrs/citizens/_default-0.png"), c("Stallholder", "/stills/osrs/citizens/_default-1.png")];
var DEFAULT_RS3 = [c("Guard", "/stills/rs3/citizens/_default-0.png"), c("Clerk", "/stills/rs3/citizens/_default-1.png")];
function citizenPool(id, game) {
	const named = game === "osrs" ? OSRS$1[id] : RS3$1[id];
	const fallback = game === "osrs" ? DEFAULT_OSRS : DEFAULT_RS3;
	return named?.length ? named : fallback;
}
function citizenFor(id, game, now = Date.now()) {
	const pool = citizenPool(id, game);
	return pool[Math.floor(now / 3e5) % pool.length];
}
/** Fan flavour only. Not live worlds. No player names. */
var OSRS = {
	osrslumbridge: [
		"Duke’s clerk: the courtyard still wakes strangers. The meadow is grass. Mind the goblins on the east road.",
		"Bridge guard: river first, castle second. If you came looking for a crater you are in the wrong grammar.",
		"Miller: the wheel turns. Tutorial is a rumour the water has not forgotten."
	],
	osrsfalador: [
		"White Knight on the square: walls hold. Kinshra are a weather, not a schedule I print.",
		"Rising Sun keep: knights drill, the park rests, the party room is still a room.",
		"Park warden: virtue in limestone. Slapstick lives in the same postcode. That is the town."
	],
	osrsvarrock: [
		"Palace clerk: Roald’s name is on the writ. The slums keep their own hours.",
		"Exchange runner: price is a public sentence. The square still argues.",
		"Gertrude’s neighbour: the sill has a cat. Palaces inflate. The slums persist."
	],
	osrsprif: [
		"Elven door-warden: the city grew back from a seed. Song of the Elves is the constitution here.",
		"Crystal-stall: eight towers, one voice. No hour-clan on this card.",
		"Singer on the stair: the song is public. I do not sell a clan name."
	],
	osrsedge: [
		"A guard: keep walking. Monastery west, ditch north.",
		"Monk: we keep the hill. The wilderness is a weather, not a sermon I finish.",
		"Adventurer at the ditch: the line is the point. Cross it knowing the grammar."
	],
	osrsdraynor: [
		"Market guard: willows, bank, and a village that remembers worse nights.",
		"Willow cutter: the trees are the work. Draynor keeps its voice down.",
		"Bank clerk: I do not discuss the manor after dark."
	]
};
var RS3 = {
	lumbridge: [
		"Courtyard watch: strangers still appear. The crater is part of the walk now.",
		"Church sexton: the bell and the rim of the wound share a town.",
		"Bridge guard: rebuild is polite. The meadow remembers otherwise."
	],
	falador: [
		"White Knight: the square still performs order. The walls have taken hits this client recorded.",
		"Rising Sun keep: same postcode for piety and farce.",
		"Park warden: I sweep limestone. I do not print Kinshra hours."
	],
	varrock: [
		"Palace clerk: the crown speaks. The Exchange answers in numbers.",
		"South-east stall: unrest is weather. I do not sell it.",
		"Square runner: price is public. Gossip is not my stock."
	],
	prifddinas: [
		"Tower door: the hour will turn. This desk will not name the clan.",
		"Crystal-stall: Voice of Seren is a pulse. I sell thread, not a forecast.",
		"Clerk: no clan pair on this card. The clock is enough."
	],
	edgeville: [
		"Guard: the ditch is still a dare in this client. The village keeps its voice down.",
		"Monk: the hill holds. I do not price the wilderness.",
		"Adventurer: the line is the point. Cross it knowing the grammar."
	]
};
var FALLBACK_OSRS = [
	"A guard: keep walking. The street is the 2007-era plan.",
	"A stallholder: I sell what the client shows. The wiki keeps the hour.",
	"A clerk: no later crater lives on this card."
];
var FALLBACK_RS3 = [
	"A clerk: later-age weather only where the live page says so.",
	"A stallholder: I do not invent raids. Official news wins.",
	"A guard: this street is this client. Do not paste the other grammar."
];
function padLines(lines, fallback) {
	const out = [...lines];
	let i = 0;
	while (out.length < 3) {
		out.push(fallback[i % fallback.length]);
		i += 1;
	}
	return out;
}
function streetTalk(id, game) {
	const raw = game === "osrs" ? OSRS[id] ?? FALLBACK_OSRS : RS3[id] ?? FALLBACK_RS3;
	return padLines(raw.length ? raw : FALLBACK_OSRS, game === "osrs" ? FALLBACK_OSRS : FALLBACK_RS3);
}
function TownNotePage() {
	const { id } = Route.useParams();
	const note = townNote(id);
	const loc = LOCATIONS.find((item) => item.id === id) ?? LOCATIONS.find((item) => item.name === note?.title);
	if (!note) throw notFound();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "border-b border-line px-5 py-5 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackLink, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "page-h1 site-title mt-1",
					children: note.title
				}),
				loc ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-center text-sm text-muted",
					children: [
						loc.region.replace(/\s·\sOSRS$/, ""),
						" ·",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/gods/$god",
							params: { god: GOD_SLUGS[loc.god] },
							className: "no-underline",
							style: { color: godInk(loc.god) },
							children: loc.god
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: note.region
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-2 block h-px w-24 bg-[#c6a45a]/80",
					"aria-hidden": "true"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto flex max-w-3xl flex-col gap-5 px-5 py-6 md:px-8",
			children: [
				loc ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TownCycle, {
					loc,
					title: note.title
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold text-parchment",
					children: "Lore"
				}),
				note.lore.map((para) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: para
				}, para)),
				note.history?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold text-parchment",
					children: "History"
				}), note.history.map((para) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: para
				}, para))] }) : null,
				loc ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StreetAndHour, {
					loc,
					wiki: placeLore(loc)?.sourceUrl
				}) : null,
				loc && placeLore(loc) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: placeLore(loc).sourceUrl,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "text-parchment",
						children: "Read the live page"
					})
				}) : null,
				loc ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SisterPlace, {
					id: loc.id,
					name: loc.name,
					edition: loc.edition
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-faint",
					children: "Fan desk notes. Live page: the official wiki for this game."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: loc ? deskOpenPath(loc.edition, loc.id) : "/#desk",
					className: "text-sm text-parchment",
					onClick: () => {
						if (!loc) return;
						writeStudioSave({
							locationId: loc.id,
							edition: loc.edition,
							skillPicks: []
						});
					},
					children: "Use this town on a banner"
				})
			]
		})]
	});
}
function TownCycle({ loc, title }) {
	const pool = loc.stills?.length ? loc.stills : [loc.viewA];
	const now = useVisibleNow();
	(0, import_react.useEffect)(() => {
		const img = new Image();
		img.src = pool[(stillIndex(pool.length, now) + 1) % pool.length] ?? "";
	}, [now, pool]);
	const i = stillIndex(pool.length, now);
	const src = pool[i] ?? loc.viewA;
	pool[(i + 1) % pool.length];
	const game = loc.edition === "OSRS" ? "Old School RuneScape" : "RuneScape 3";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src,
		alt: `${title}, View ${i + 1} of ${pool.length}, ${game}`,
		className: "aspect-[21/9] w-full rounded-md border border-line object-cover"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
		className: "mt-1 text-xs text-faint",
		children: [
			"View ",
			i + 1,
			" of ",
			pool.length,
			" · ",
			"Next still in ",
			formatRemain(msUntilNext(now))
		]
	})] });
}
function SisterPlace({ id, name, edition }) {
	const sister = edition === "OSRS" ? LOCATIONS.find((item) => item.edition === "RS3" && item.name === name) : LOCATIONS.find((item) => item.edition === "OSRS" && item.name === name);
	if (!sister) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/towns/$id",
			params: { id: sister.id },
			className: "text-parchment",
			children: edition === "OSRS" ? "Same name in RuneScape 3" : "Same name in Old School RuneScape"
		})
	});
}
function StreetAndHour({ loc, wiki }) {
	const now = useVisibleNow(6e4);
	const game = loc.edition === "OSRS" ? "osrs" : "rs3";
	const lines = streetTalk(loc.id, game);
	const line = lines[stillIndex(lines.length, now)] ?? lines[0];
	const notice = noticeFor(loc.id, game);
	const citizen = citizenFor(loc.id, game, now);
	const gameLabel = game === "osrs" ? "Old School RuneScape" : "RuneScape 3";
	const alt = `${citizen.role} of ${loc.name}, ${gameLabel}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-sm font-semibold text-parchment",
			children: "From the street"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
			className: "citizen-cite flex flex-wrap items-center gap-3",
			children: [
				citizen.src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: citizen.src,
					alt,
					width: 72,
					height: 72,
					className: "h-[72px] w-[72px] shrink-0 object-contain object-bottom",
					onError: (e) => {
						e.currentTarget.remove();
					}
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
					className: "min-w-[12rem] flex-1 text-sm leading-snug text-parchment/80",
					style: { fontFamily: "Fondamento, serif" },
					children: [
						"“",
						line,
						"”"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
					className: "w-full text-[11px] text-muted",
					children: [
						citizen.role,
						" · ",
						gameLabel
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-faint",
			children: "Fan flavour."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-sm font-semibold text-parchment",
			children: "This hour"
		}),
		notice ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm text-muted",
			children: [
				notice.line,
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: notice.url,
					target: "_blank",
					rel: "noopener noreferrer",
					className: "text-parchment",
					children: notice.kind === "news" ? "Official news" : "Wiki"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-faint",
					children: [" · ", notice.date]
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm text-muted",
			children: ["No official notice for this street. The wiki keeps the hour.", wiki ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [" ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: wiki,
				target: "_blank",
				rel: "noopener noreferrer",
				className: "text-parchment",
				children: "Wiki"
			})] }) : null]
		})
	] });
}
//#endregion
export { TownNotePage as component };
