import { i as __toESM } from "../_runtime.mjs";
import { V as require_react, b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as BackLink } from "./router-D8oIjQ4W.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/youtubers-Cribsj1E.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function tubeUrl(handle) {
	const raw = handle.trim().replace(/^https?:\/\/(www\.)?youtube\.com\//i, "");
	if (!raw) return "";
	if (raw.startsWith("c/") || raw.startsWith("channel/") || raw.startsWith("user/")) return `https://www.youtube.com/${raw.replace(/^\/+/, "")}`;
	return `https://www.youtube.com/@${raw.replace(/^@/, "")}`;
}
var YOUTUBERS = [
	{
		id: "osrs-off",
		name: "Old School RuneScape",
		game: "osrs",
		youtube: "channel/UC0j1MpbiTFHYrUjOTwifW_w",
		era: "official",
		official: true
	},
	{
		id: "rs-off",
		name: "RuneScape",
		game: "rs3",
		youtube: "RuneScape",
		era: "official",
		official: true
	},
	{
		id: "afriend",
		name: "A Friend",
		game: "both",
		youtube: "AFriend",
		era: "foundation"
	},
	{
		id: "sparcmac",
		name: "Sparc Mac",
		game: "osrs",
		youtube: "SparcMac",
		era: "foundation"
	},
	{
		id: "slayermusiq1",
		name: "Slayermusiq1",
		game: "osrs",
		youtube: "slayermusiq1",
		era: "foundation"
	},
	{
		id: "torvesta",
		name: "Torvesta",
		game: "osrs",
		youtube: "torvestars",
		era: "foundation"
	},
	{
		id: "nightmarerh",
		name: "NightmareRH",
		game: "osrs",
		youtube: "NightmareRH",
		era: "foundation"
	},
	{
		id: "thecompletor",
		name: "The Completor",
		game: "osrs",
		youtube: "TheCompletor",
		era: "foundation"
	},
	{
		id: "mrnosleep",
		name: "Mr No Sleep",
		game: "osrs",
		youtube: "MrNoSleep",
		era: "foundation"
	},
	{
		id: "chrisarchie",
		name: "Chris Archie",
		game: "osrs",
		youtube: "ChrisArchieRS",
		era: "foundation"
	},
	{
		id: "runeshark",
		name: "RuneShark",
		game: "osrs",
		youtube: "RuneSharkVideos",
		era: "foundation"
	},
	{
		id: "odablock",
		name: "Odablock",
		game: "osrs",
		youtube: "Odablock",
		era: "current"
	},
	{
		id: "faux",
		name: "Faux",
		game: "osrs",
		youtube: "Faux",
		era: "current"
	},
	{
		id: "j1mmy",
		name: "J1mmy",
		game: "osrs",
		youtube: "J1mmy",
		era: "current"
	},
	{
		id: "soup",
		name: "Soup",
		game: "osrs",
		youtube: "SoupRS",
		era: "current"
	},
	{
		id: "theoatrix",
		name: "Theoatrix",
		game: "osrs",
		youtube: "TheoatrixOSRS",
		era: "current"
	},
	{
		id: "skillspecs",
		name: "Skill Specs",
		game: "osrs",
		youtube: "skillspecs",
		era: "current"
	},
	{
		id: "cengineer",
		name: "C Engineer",
		game: "osrs",
		youtube: "CEngineer",
		era: "current"
	},
	{
		id: "gnomonkey",
		name: "Gnomonkey",
		game: "osrs",
		youtube: "Gnomonkey",
		era: "current"
	},
	{
		id: "alkan",
		name: "Alkan",
		game: "osrs",
		youtube: "AlkanRS",
		era: "current"
	},
	{
		id: "solomission",
		name: "SoloMission",
		game: "osrs",
		youtube: "SoloMission",
		era: "current"
	},
	{
		id: "flippingosrs",
		name: "FlippingOldschool",
		game: "osrs",
		youtube: "FlippingOldschool",
		era: "current"
	},
	{
		id: "verf",
		name: "Verf",
		game: "osrs",
		youtube: "Verf",
		era: "current"
	},
	{
		id: "coxie",
		name: "Coxie",
		game: "osrs",
		youtube: "Coxie",
		era: "current"
	},
	{
		id: "sicknerd",
		name: "Sick_Nerd",
		game: "osrs",
		youtube: "SickNerd",
		era: "current"
	},
	{
		id: "purpp",
		name: "Purpp",
		game: "osrs",
		youtube: "Purpp",
		era: "current"
	},
	{
		id: "thersguy",
		name: "TheRSGuy",
		game: "rs3",
		youtube: "TheRSGuy",
		era: "current"
	},
	{
		id: "evscape",
		name: "EvScape",
		game: "rs3",
		youtube: "EvScape",
		era: "current"
	},
	{
		id: "ramenrs",
		name: "Ramen RS",
		game: "rs3",
		youtube: "RamenRS",
		era: "current"
	},
	{
		id: "protoxx",
		name: "Protoxx",
		game: "rs3",
		youtube: "Protoxx",
		era: "current"
	},
	{
		id: "maikeru",
		name: "Maikeru",
		game: "rs3",
		youtube: "Maikeru",
		era: "current"
	},
	{
		id: "ashshley",
		name: "AshShley",
		game: "rs3",
		youtube: "AshShley",
		era: "current"
	},
	{
		id: "chevalric",
		name: "ChevalricRS",
		game: "rs3",
		youtube: "ChevalricRS",
		era: "current"
	},
	{
		id: "chillzrs",
		name: "ChillzRS",
		game: "rs3",
		youtube: "ChillzRS",
		era: "current"
	},
	{
		id: "basetank",
		name: "Base Tank",
		game: "rs3",
		youtube: "BaseTank",
		era: "current"
	},
	{
		id: "carguyrs",
		name: "CarguyRS",
		game: "rs3",
		youtube: "CarguyRS",
		era: "current"
	},
	{
		id: "mukluk",
		name: "Mukluk",
		game: "rs3",
		youtube: "Mukluk",
		era: "current"
	},
	{
		id: "willmissit",
		name: "WillMissIt",
		game: "rs3",
		youtube: "rswillmissit",
		era: "current"
	}
];
function eraCaption(row) {
	if (row.era === "official") return "Official";
	if (row.era === "foundation") return "Older / foundation";
	return "Current";
}
function Row({ row }) {
	const href = tubeUrl(row.youtube);
	if (!href) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "flex flex-col gap-1 px-1 py-2 sm:flex-row sm:items-center sm:justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-sm",
			children: [row.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-2 text-[10px] text-faint",
				children: eraCaption(row)
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href,
			target: "_blank",
			rel: "noopener noreferrer",
			"aria-label": `${row.name} on YouTube`,
			className: "text-sm text-parchment",
			children: "YouTube"
		})]
	});
}
function Block({ title, rows }) {
	if (!rows.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
		className: "mb-2 text-xs font-semibold text-muted",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "flex flex-col gap-2",
		children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { row }, row.id))
	})] });
}
function GameDesk({ heading, official, current, older }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-semibold text-parchment",
				children: heading
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
				title: "Official",
				rows: official
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
				title: "Still making videos",
				rows: current
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
				title: "Older / archive",
				rows: older
			})
		]
	});
}
function YoutubersPage() {
	const [q, setQ] = (0, import_react.useState)("");
	const needle = q.trim().toLowerCase();
	const rows = (0, import_react.useMemo)(() => needle ? YOUTUBERS.filter((row) => row.name.toLowerCase().includes(needle) || row.youtube.toLowerCase().includes(needle)) : YOUTUBERS, [needle]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "border-b border-line px-5 py-5 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackLink, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "page-h1 mt-1",
					children: "Youtubers"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-center text-sm text-muted",
					children: "Hall of known channels. Not complete. Not Jagex."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mx-auto mt-2 block h-px w-24 bg-[#c6a45a]/80",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mx-auto mt-3 block max-w-sm text-[10px] text-muted",
					children: ["Search", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: q,
						onChange: (e) => setQ(e.target.value),
						className: "mt-1 h-10 w-full rounded-md border border-line bg-raised px-3 text-base text-fg"
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			id: "content",
			className: "mx-auto flex max-w-3xl flex-col gap-10 px-5 py-6 md:px-8",
			children: [
				needle && !rows.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "No names match."
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "flex flex-col gap-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold text-parchment",
						children: "Official"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
						title: "Official",
						rows: rows.filter((row) => row.era === "official")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "flex flex-col gap-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold text-parchment",
						children: "Foundation"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
						title: "Older / foundation",
						rows: rows.filter((row) => row.era === "foundation" && row.game !== "both").sort((a, b) => a.name.localeCompare(b.name))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameDesk, {
					heading: "Old School RuneScape",
					official: [],
					current: rows.filter((row) => row.game === "osrs" && row.era === "current").sort((a, b) => a.name.localeCompare(b.name)),
					older: []
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameDesk, {
					heading: "RuneScape",
					official: [],
					current: rows.filter((row) => row.game === "rs3" && row.era === "current").sort((a, b) => a.name.localeCompare(b.name)),
					older: []
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
					title: "Both games",
					rows: rows.filter((row) => row.game === "both")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-parchment",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							children: "Desk"
						}),
						" · ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/streamers",
							children: "Streamers"
						})
					]
				})
			]
		})]
	});
}
//#endregion
export { YoutubersPage as component };
