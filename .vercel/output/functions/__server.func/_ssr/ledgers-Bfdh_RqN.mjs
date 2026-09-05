import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ledgers-Bfdh_RqN.js
var import_jsx_runtime = require_jsx_runtime();
function LedgerSheet({ title, deck, game, wiki, f2p, members, foot }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "border-b border-line px-5 py-5 md:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "text-parchment",
							children: "Banner Studio"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "page-h1 mt-1",
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-2xl text-center text-sm text-muted",
						children: deck
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mx-auto mt-2 block h-px w-24 bg-[#c6a45a]/80",
						"aria-hidden": "true"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto grid max-w-4xl gap-8 px-5 py-6 md:grid-cols-2 md:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Column, {
					heading: "Free-to-play",
					rows: f2p
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Column, {
					heading: "Members",
					rows: members
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mx-auto max-w-4xl px-5 pb-8 text-sm text-muted md:px-8",
				children: [
					foot,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: wiki,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "text-parchment",
						children: [game, " money making guide"]
					})
				]
			})
		]
	});
}
function Column({ heading, rows }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "mb-3 text-sm tracking-[0.16em] text-parchment",
		children: heading
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "flex flex-col gap-3",
		children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "px-1 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: row.href,
				target: "_blank",
				rel: "noopener noreferrer",
				className: "text-sm text-parchment",
				children: row.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: row.what
			})]
		}, row.name))
	})] });
}
var RS3_LEDGER = {
	game: "RuneScape 3",
	wiki: "https://runescape.wiki/w/Money_making_guide",
	f2p: [
		{
			name: "Killing cows",
			what: "Hides and raw beef in Lumbridge.",
			href: "https://runescape.wiki/w/Money_making_guide/Killing_cows"
		},
		{
			name: "Killing chickens",
			what: "Feathers and raw chicken.",
			href: "https://runescape.wiki/w/Money_making_guide/Killing_chickens"
		},
		{
			name: "Mining iron ore",
			what: "F2P iron rocks.",
			href: "https://runescape.wiki/w/Money_making_guide/Mining_iron_ore"
		},
		{
			name: "Smelting iron bars",
			what: "Furnace the ore.",
			href: "https://runescape.wiki/w/Money_making_guide/Smelting_iron_bars"
		},
		{
			name: "Tanning hides",
			what: "Cowhide to leather.",
			href: "https://runescape.wiki/w/Money_making_guide/Tanning_hides"
		},
		{
			name: "Crafting air runes",
			what: "Air altar, F2P rune.",
			href: "https://runescape.wiki/w/Money_making_guide/Crafting_air_runes"
		}
	],
	members: [
		{
			name: "Screening soil",
			what: "Sift Soil on archaeology material.",
			href: "https://runescape.wiki/w/Money_making_guide/Screening_soil_using_Sift_Soil"
		},
		{
			name: "Harvesting incandescent energy",
			what: "Divination wisp colony.",
			href: "https://runescape.wiki/w/Money_making_guide/Harvesting_incandescent_energy"
		},
		{
			name: "Mining animica",
			what: "Prifddinas / Seren stone family.",
			href: "https://runescape.wiki/w/Money_making_guide/Mining_animica"
		},
		{
			name: "Lesser necroplasm rituals",
			what: "Necromancy ritual site.",
			href: "https://runescape.wiki/w/Money_making_guide/Performing_lesser_necroplasm_rituals"
		},
		{
			name: "Catching whirligigs",
			what: "Hunter on Anachronia.",
			href: "https://runescape.wiki/w/Money_making_guide/Catching_whirligigs"
		},
		{
			name: "Smithing cannonballs",
			what: "Furnace processing.",
			href: "https://runescape.wiki/w/Money_making_guide/Smithing_cannonballs"
		},
		{
			name: "Tanning royal dragonhide",
			what: "Make Leather / tannery.",
			href: "https://runescape.wiki/w/Money_making_guide/Tanning_hides"
		},
		{
			name: "Archaeology caches",
			what: "Material caches, low click.",
			href: "https://runescape.wiki/w/Money_making_guide"
		}
	]
};
var OSRS_LEDGER = {
	game: "Old School RuneScape",
	wiki: "https://oldschool.runescape.wiki/w/Money_making_guide",
	f2p: [
		{
			name: "Killing cows",
			what: "Lumbridge hides.",
			href: "https://oldschool.runescape.wiki/w/Money_making_guide/Killing_cows"
		},
		{
			name: "Mining iron ore (free-to-play)",
			what: "F2P iron rocks.",
			href: "https://oldschool.runescape.wiki/w/Money_making_guide/Mining_iron_ore_(free-to-play)"
		},
		{
			name: "Mining coal (free-to-play)",
			what: "F2P coal.",
			href: "https://oldschool.runescape.wiki/w/Money_making_guide/Mining_coal_(free-to-play)"
		},
		{
			name: "Cooking raw chicken",
			what: "Range or fire.",
			href: "https://oldschool.runescape.wiki/w/Money_making_guide/Cooking_raw_chicken"
		},
		{
			name: "Fishing",
			what: "Shrimp and beyond.",
			href: "https://oldschool.runescape.wiki/w/Money_making_guide"
		},
		{
			name: "Collecting cowhides",
			what: "Same field as the cows.",
			href: "https://oldschool.runescape.wiki/w/Money_making_guide/Killing_cows"
		}
	],
	members: [
		{
			name: "Mining amethyst",
			what: "High Mining, low click.",
			href: "https://oldschool.runescape.wiki/w/Money_making_guide/Mining_amethyst"
		},
		{
			name: "Cutting redwood logs",
			what: "Woodcutting Guild.",
			href: "https://oldschool.runescape.wiki/w/Money_making_guide/Cutting_redwood_logs"
		},
		{
			name: "Smithing cannonballs",
			what: "Steel bars at a furnace.",
			href: "https://oldschool.runescape.wiki/w/Money_making_guide/Smithing_cannonballs"
		},
		{
			name: "Fishing karambwans",
			what: "Karamja raw karambwan.",
			href: "https://oldschool.runescape.wiki/w/Money_making_guide/Fishing_raw_karambwan"
		},
		{
			name: "Crafting blood runes",
			what: "True blood altar.",
			href: "https://oldschool.runescape.wiki/w/Money_making_guide/Crafting_blood_runes"
		},
		{
			name: "Motherlode Mine",
			what: "Pay-dirt, bank when full.",
			href: "https://oldschool.runescape.wiki/w/Motherlode_Mine"
		},
		{
			name: "Making sacred oil",
			what: "Processing.",
			href: "https://oldschool.runescape.wiki/w/Money_making_guide/Making_sacred_oil"
		},
		{
			name: "Grinding unicorn horns",
			what: "Pestle and mortar.",
			href: "https://oldschool.runescape.wiki/w/Money_making_guide/Grinding_unicorn_horns"
		}
	]
};
//#endregion
export { OSRS_LEDGER as n, RS3_LEDGER as r, LedgerSheet as t };
