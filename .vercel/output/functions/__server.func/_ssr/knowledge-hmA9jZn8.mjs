import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as OfficialPulse } from "./official-pulse-Bm5wbKDQ.mjs";
import { s as BackLink } from "./router-DXmYNu76.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/knowledge-hmA9jZn8.js
var import_jsx_runtime = require_jsx_runtime();
var KNOWLEDGE_SITES = [
	{
		name: "Old School RuneScape Wiki",
		href: "https://oldschool.runescape.wiki/",
		edition: "OSRS",
		use: "First stop. Drop tables, quests, tiles, and the live money-making list."
	},
	{
		name: "RuneScape Wiki",
		href: "https://runescape.wiki/",
		edition: "RS3",
		use: "Same job for RuneScape 3. Rotations, relics, and patch notes live here first."
	},
	{
		name: "Official Old School",
		href: "https://oldschool.runescape.com/",
		edition: "OSRS",
		use: "News, polls, and the client the game expects."
	},
	{
		name: "Official RuneScape",
		href: "https://www.runescape.com/",
		edition: "RS3",
		use: "Launcher, membership, and Sixth Age news."
	},
	{
		name: "RuneLite",
		href: "https://runelite.net/",
		edition: "OSRS",
		use: "The client almost every Old School PvM and skilling stream uses."
	},
	{
		name: "Wise Old Man",
		href: "https://wiseoldman.net/",
		edition: "OSRS",
		use: "Clan hiscores, competitions, and name tracking."
	},
	{
		name: "TempleOSRS",
		href: "https://templeosrs.com/",
		edition: "OSRS",
		use: "Collection log and hiscores a lot of raid clans still check."
	},
	{
		name: "PvM Encyclopedia",
		href: "https://pvme.io/",
		edition: "Both",
		use: "Discord + site. The rotation sheets high-level PvM teams actually open."
	},
	{
		name: "OSRS Wiki calculators",
		href: "https://oldschool.runescape.wiki/w/Calculator",
		edition: "OSRS",
		use: "Skill, combat, and money calculators on the official wiki."
	},
	{
		name: "RuneApps",
		href: "https://runeapps.org/",
		edition: "RS3",
		use: "Alt1 and the overlays RS3 PvM still runs."
	},
	{
		name: "r/2007scape",
		href: "https://www.reddit.com/r/2007scape/",
		edition: "OSRS",
		use: "Patch talk and method arguments. Not a wiki. Still where the crowd is."
	},
	{
		name: "r/runescape",
		href: "https://www.reddit.com/r/runescape/",
		edition: "RS3",
		use: "Same for RuneScape 3."
	}
];
function KnowledgePage() {
	const osrs = KNOWLEDGE_SITES.filter((site) => site.edition !== "RS3");
	const rs3 = KNOWLEDGE_SITES.filter((site) => site.edition !== "OSRS");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "border-b border-line px-5 py-5 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackLink, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "page-h1 mt-1",
					children: "Tools desks use"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-sm text-muted",
					children: "Official clients and wikis first. Trackers and raid sheets after."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto flex max-w-3xl flex-col gap-8 px-5 py-6 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfficialPulse, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 text-sm tracking-[0.16em] text-parchment",
					children: "Old School RuneScape"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { sites: osrs })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 text-sm tracking-[0.16em] text-parchment",
					children: "RuneScape 3"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { sites: rs3 })] })
			]
		})]
	});
}
function List({ sites }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "flex flex-col gap-2",
		children: sites.map((site) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
			href: site.href,
			target: "_blank",
			rel: "noreferrer",
			className: "block rounded-md border border-line bg-raised px-3 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block text-sm font-medium text-parchment",
				children: site.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs text-muted",
				children: site.use
			})]
		}) }, site.href))
	});
}
//#endregion
export { KnowledgePage as component };
