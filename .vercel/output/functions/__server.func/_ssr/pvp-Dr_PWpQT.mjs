import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as PlaceRail } from "./place-rail-DFA15Tod.mjs";
import { S as BackLink } from "./router-D8oIjQ4W.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pvp-Dr_PWpQT.js
var import_jsx_runtime = require_jsx_runtime();
var PVP_SOURCES = [{
	rank: 1,
	label: "OSRS wiki · Wilderness / PvP",
	href: "https://oldschool.runescape.wiki/w/Player_killing"
}, {
	rank: 2,
	label: "Official rules",
	href: "https://www.runescape.com/game-guide/rules"
}];
var PVP_TREE = [
	{
		q: "Can I freeze this tick?",
		no: "No → tank or leave. Splash is not a freeze. After a thaw: 5 ticks of immunity. Do not spec there."
	},
	{
		q: "Is the spec a kill?",
		no: "No → keep the bar. Energy is on the account. A weapon swap does not refill it."
	},
	{
		q: "Multi, and you are alone?",
		no: "Yes → you are the loot. Leave."
	},
	{
		q: "Will you laugh off this risk?",
		no: "No → Protect Item, smaller bag. Unskulled keeps 3, or 4 with the prayer. Skulled keeps 0, or 1 with the prayer."
	},
	{
		q: "They ate?",
		no: "Yes → your next click is not a spec into immunity. Food, then brew, then karambwan. One decision."
	}
];
var PVP_METHODS = [
	{
		name: "Freeze then spec",
		what: "Ice or a bind first so they cannot step. The spec goes in during the freeze, not after they can walk. If they are immune, you wait or you leave.",
		wipe: "Spec after the thaw. Immunity is 5 ticks. That click is a gift."
	},
	{
		name: "Eat on the incoming",
		what: "You eat for the hit about to land, not the one that already did. Food, then brew if you brought it, then karambwan. One decision.",
		wipe: "Empty tank. The next hit donates the bag."
	},
	{
		name: "Risk number",
		what: "Pick a gold amount you will not tilt over. Gear is built under that number. Protect Item is for the one piece you refuse to lose. Unskulled keeps 3, or 4 with the prayer. Skulled keeps 0, or 1 with the prayer.",
		wipe: "Over-risk. A set you will tilt over is already a death."
	},
	{
		name: "Solo vs multi",
		what: "In multi you are a loot pile unless you brought a pile. If you did not, you do not walk in. Single is a duel. Multi is a name called out loud.",
		wipe: "Solo into multi. You are the loot."
	},
	{
		name: "Do not chase",
		what: "A freeze that is about to break is not a chase. The person running into multi is not a kill; they are bait. Depth is the leash. South is the exit.",
		wipe: "Chase into a broken freeze or into multi. That is their method, not yours."
	}
];
var PVP_WILDY = {
	title: "Wildy roam",
	grid: "Body: blessed hide or barrows tank. Weapon: ice staff / sceptre. Spec: one click you can drop. Neck: jewellery on the body. Food: shark + karambwan + blighted restore.",
	opener: "Protect Item on. Freeze. Then spec. Tele Block if they still have a tele. Smite on the roast that would drop Protect Item.",
	wipe: "Spec into the thaw. Jewellery under the food. Skull to tag the player who already tagged you."
};
var PVP_WORLD = {
	title: "PvP world",
	grid: "Same slots as wildy. Banks and marked tiles are safe. Bracket outside the Wilderness acts like depth 15; inside, depth adds 15. PJ is 16 ticks, not the wildy 20. High-risk: Protect Item is off.",
	opener: "Same freeze rule. Do not treat a PvP-world edge like the ditch.",
	wipe: "Using the 20-tick wildy PJ here. Chasing through a bank line."
};
var PVP_LMS = {
	title: "Last Man Standing",
	grid: "Supplied. Safe death. Ferox lobby. Not the wildy grid.",
	opener: "Use the island loadout. Learn freeze and eat here.",
	wipe: "Importing a wildy risk set."
};
var PVP_BH = {
	title: "Bounty Hunter",
	grid: "Daimon's Crater. Own worlds. Coin deposit. Assigned target. Not the wildy grid.",
	opener: "Pay a deposit you can lose. Fight the assigned name.",
	wipe: "Walking the wildy bag into the crater."
};
var PVP_RISK = {
	budget: "Hide or mystic you can replace from a task. Staff. Sharks. Glory on the neck.",
	mid: "Barrows tank or blessed hide. One mid spec. Brew, restore, karambwan.",
	max: "One expensive spec click. Tank shell cheap next to that click. Prices move. Wiki wins."
};
function PvpPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "border-b border-line px-5 py-5 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackLink, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "page-h1 mt-1",
					children: "PvP"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-center text-sm text-parchment",
					children: "Old School. Risk is the tax. What each method is."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1 text-center text-[12px] text-muted",
					children: PVP_SOURCES.map((src) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: src.href,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "text-parchment",
						children: [
							src.rank,
							". ",
							src.label
						]
					}, src.href))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mx-auto mt-2 block h-px w-24 bg-[#c6a45a]/80",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceRail, {
						section: "pvp",
						edition: "OSRS"
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto flex max-w-3xl flex-col gap-7 px-5 py-6 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 text-sm tracking-[0.16em] text-parchment",
					children: "In the fight"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "space-y-3",
					children: PVP_TREE.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "grid grid-cols-[2rem_1fr] gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "pt-0.5 text-sm text-parchment",
							children: [i + 1, "."]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-fg",
							children: row.q
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: row.no
						})] })]
					}, row.q))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 text-sm tracking-[0.16em] text-parchment",
					children: "Methods"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-5",
					children: PVP_METHODS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-fg",
							children: m.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: m.what
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-[12px] text-faint",
							children: ["Wipe: ", m.wipe]
						})
					] }, m.name))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeCard, { sheet: PVP_WILDY }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeCard, { sheet: PVP_WORLD }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeCard, {
						sheet: PVP_LMS,
						compact: true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeCard, {
						sheet: PVP_BH,
						compact: true
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "-mt-3 text-[11px] text-faint",
					children: "LMS and BH are different bags. Do not gear them with the wildy grid."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-2 text-sm tracking-[0.16em] text-parchment",
					children: "Wildy risk"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "divide-y divide-line/40 rounded-md border border-line",
					children: [
						["Budget", PVP_RISK.budget],
						["Mid", PVP_RISK.mid],
						["Max", PVP_RISK.max]
					].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[6.5rem_1fr] gap-3 px-3 py-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-parchment",
							children: k
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "text-muted",
							children: v
						})]
					}, k))
				})] })
			]
		})]
	});
}
function ModeCard({ sheet, compact }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: compact ? "rounded-md border border-line bg-raised px-3 py-3" : "",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-2 text-sm tracking-[0.16em] text-parchment",
			children: sheet.title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
			className: "space-y-2 text-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					k: "Grid",
					v: sheet.grid
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					k: "Opener",
					v: sheet.opener
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					k: "Wipe",
					v: sheet.wipe
				})
			]
		})]
	});
}
function Row({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-[5.5rem_1fr] gap-3 md:grid-cols-[6.5rem_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-parchment",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "text-muted",
			children: v
		})]
	});
}
//#endregion
export { PvpPage as component };
