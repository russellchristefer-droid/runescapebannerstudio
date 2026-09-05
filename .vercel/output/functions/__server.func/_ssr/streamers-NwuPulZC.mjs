import { i as __toESM } from "../_runtime.mjs";
import { V as require_react, b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as BackLink } from "./router-DXmYNu76.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/streamers-NwuPulZC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function twitchUrl(h) {
	const handle = h.replace(/^@/, "").trim();
	return handle ? `https://www.twitch.tv/${handle}` : "";
}
function xUrl(h) {
	const handle = h.replace(/^@/, "").trim();
	return handle ? `https://x.com/${handle}` : "";
}
function kickUrl(h) {
	const handle = h.replace(/^@/, "").trim();
	return handle ? `https://kick.com/${handle}` : "";
}
function tiktokUrl(h) {
	const handle = h.replace(/^@/, "").trim();
	return handle ? `https://www.tiktok.com/@${handle}` : "";
}
function instagramUrl(h) {
	const handle = h.replace(/^@/, "").trim();
	return handle ? `https://www.instagram.com/${handle}` : "";
}
function facebookUrl(h) {
	const slug = h.replace(/^@/, "").trim().replace(/^https?:\/\/(www\.)?facebook\.com\//i, "");
	return slug ? `https://www.facebook.com/${slug}` : "";
}
function discordUrl(h) {
	const raw = h.trim();
	const m = raw.match(/(?:https?:\/\/)?(?:www\.)?(?:discord\.gg|discord\.com\/invite)\/([A-Za-z0-9-]+)/i) || raw.match(/^([A-Za-z0-9-]{2,32})$/);
	return m ? `https://discord.gg/${m[1]}` : "";
}
var CHANNELS = [
	{
		id: "official-osrs",
		name: "Old School RuneScape",
		game: "osrs",
		twitch: "oldschoolrs",
		x: "OldSchoolRS",
		instagram: "oldschool.runescape",
		official: true,
		era: "official"
	},
	{
		id: "official-rs",
		name: "RuneScape",
		game: "rs3",
		twitch: "runescape",
		x: "RuneScape",
		facebook: "RuneScape",
		official: true,
		era: "official"
	},
	{
		id: "sparcmac",
		name: "Sparc Mac",
		game: "osrs",
		twitch: "sparcmac",
		era: "foundation"
	},
	{
		id: "woox",
		name: "Woox",
		game: "osrs",
		twitch: "wooxsolo",
		era: "foundation"
	},
	{
		id: "framed",
		name: "Framed",
		game: "osrs",
		twitch: "framed",
		era: "foundation"
	},
	{
		id: "b0aty",
		name: "B0aty",
		game: "osrs",
		twitch: "b0aty",
		era: "current"
	},
	{
		id: "faux",
		name: "Faux",
		game: "osrs",
		twitch: "faux",
		era: "current"
	},
	{
		id: "sick_nerd",
		name: "Sick_Nerd",
		game: "osrs",
		twitch: "sick_nerd",
		era: "current"
	},
	{
		id: "mr_mammal",
		name: "Mr Mammal",
		game: "osrs",
		twitch: "mr_mammal",
		era: "current"
	},
	{
		id: "purpp",
		name: "Purpp",
		game: "osrs",
		twitch: "purpp",
		era: "current"
	},
	{
		id: "dino_xx",
		name: "Dino_xx",
		game: "osrs",
		twitch: "dino_xx",
		era: "current"
	},
	{
		id: "sardaco",
		name: "Sardaco",
		game: "osrs",
		twitch: "sardaco",
		era: "current"
	},
	{
		id: "widega",
		name: "Widega_",
		game: "osrs",
		twitch: "widega_",
		era: "current"
	},
	{
		id: "mmorpg",
		name: "Mmorpg",
		game: "osrs",
		twitch: "mmorpg",
		era: "current"
	},
	{
		id: "gnomonkey",
		name: "Gnomonkey",
		game: "osrs",
		twitch: "gnomonkey",
		era: "current"
	},
	{
		id: "westham",
		name: "Westham",
		game: "osrs",
		twitch: "westham",
		era: "current"
	},
	{
		id: "alfie",
		name: "Alfie",
		game: "osrs",
		twitch: "alfie",
		era: "current"
	},
	{
		id: "skillspecs",
		name: "Skill Specs",
		game: "osrs",
		twitch: "skillspecs",
		era: "current"
	},
	{
		id: "tastylife",
		name: "TastyLife",
		game: "osrs",
		twitch: "tastylife",
		era: "current"
	},
	{
		id: "roidie",
		name: "Roidie",
		game: "osrs",
		twitch: "roidie",
		era: "current"
	},
	{
		id: "coxie",
		name: "Coxie",
		game: "osrs",
		twitch: "coxie",
		era: "current"
	},
	{
		id: "muts",
		name: "Muts",
		game: "osrs",
		twitch: "muts",
		era: "current"
	},
	{
		id: "soup",
		name: "Soup",
		game: "osrs",
		twitch: "soup",
		era: "current"
	},
	{
		id: "odablock",
		name: "Odablock",
		game: "osrs",
		twitch: "odablock",
		era: "current"
	},
	{
		id: "settled",
		name: "Settled",
		game: "osrs",
		twitch: "settled",
		era: "current"
	},
	{
		id: "cengineer",
		name: "C Engineer",
		game: "osrs",
		twitch: "cengineer",
		era: "current"
	},
	{
		id: "christefer",
		name: "Christefer_1",
		game: "osrs",
		twitch: "christefer_1",
		era: "current"
	},
	{
		id: "alkan",
		name: "Alkan",
		game: "osrs",
		twitch: "alkan",
		era: "current"
	},
	{
		id: "solomission",
		name: "SoloMission",
		game: "osrs",
		twitch: "solomission",
		era: "current"
	},
	{
		id: "rice",
		name: "Rice Cup",
		game: "osrs",
		twitch: "ricecup",
		era: "current"
	},
	{
		id: "ditter",
		name: "DitterBitter",
		game: "osrs",
		twitch: "ditterbitter",
		era: "current"
	},
	{
		id: "verzide",
		name: "Verzide",
		game: "osrs",
		twitch: "verzide",
		era: "current"
	},
	{
		id: "kempq",
		name: "KempQ",
		game: "osrs",
		twitch: "kempq",
		era: "current"
	},
	{
		id: "gunschilli",
		name: "Gunschilli",
		game: "osrs",
		twitch: "gunschilli",
		era: "current"
	},
	{
		id: "unit",
		name: "Unit",
		game: "osrs",
		twitch: "unitthetv",
		era: "current"
	},
	{
		id: "bruzz",
		name: "Bruzz",
		game: "osrs",
		twitch: "bruzz",
		era: "current"
	},
	{
		id: "jepk",
		name: "Jepk",
		game: "osrs",
		twitch: "jepk",
		era: "current"
	},
	{
		id: "manked",
		name: "Manked",
		game: "osrs",
		twitch: "manked",
		era: "current"
	},
	{
		id: "tpapaslice",
		name: "TpapaSLICE",
		game: "osrs",
		twitch: "tpapaslice",
		era: "current"
	},
	{
		id: "jillyfish",
		name: "jillyfish",
		game: "osrs",
		twitch: "jillyfish",
		era: "current"
	},
	{
		id: "palumor",
		name: "Palumor",
		game: "osrs",
		twitch: "palumor",
		era: "current"
	},
	{
		id: "thersguy",
		name: "TheRSGuy",
		game: "rs3",
		twitch: "thersguy",
		x: "TheRSguyy",
		era: "current"
	},
	{
		id: "evscape",
		name: "EvScape",
		game: "rs3",
		twitch: "evscape",
		era: "current"
	},
	{
		id: "itrolledu",
		name: "iTrolledU",
		game: "rs3",
		twitch: "itrolledu",
		era: "current"
	},
	{
		id: "maikeru",
		name: "Maikeru",
		game: "rs3",
		twitch: "maikeru",
		era: "current"
	},
	{
		id: "molgoatkirby",
		name: "molgoatkirby",
		game: "rs3",
		twitch: "molgoatkirby",
		era: "current"
	},
	{
		id: "wazzy",
		name: "Wazzy",
		game: "rs3",
		twitch: "wazzy",
		era: "current"
	},
	{
		id: "sr_bigboaby",
		name: "SR_BigBoaby",
		game: "rs3",
		twitch: "sr_bigboaby",
		era: "current"
	},
	{
		id: "willmissit",
		name: "WillMissIt",
		game: "rs3",
		twitch: "rswillmissit",
		era: "current"
	},
	{
		id: "couchy",
		name: "couchy",
		game: "rs3",
		twitch: "couchy",
		era: "current"
	},
	{
		id: "rageface",
		name: "Rageface",
		game: "rs3",
		twitch: "rageface",
		era: "current"
	},
	{
		id: "heirloom",
		name: "Heirloom",
		game: "rs3",
		twitch: "heirloom",
		era: "current"
	},
	{
		id: "grodoto",
		name: "Grodoto",
		game: "rs3",
		twitch: "grodoto",
		era: "current"
	},
	{
		id: "spongers",
		name: "SpongeRS",
		game: "rs3",
		twitch: "spongers",
		era: "current"
	},
	{
		id: "imnooblet",
		name: "ImNooblet",
		game: "rs3",
		twitch: "imnooblet",
		era: "current"
	},
	{
		id: "mukluk",
		name: "Mukluk",
		game: "rs3",
		twitch: "mukluk",
		era: "current"
	},
	{
		id: "puprs",
		name: "PupRs",
		game: "rs3",
		twitch: "puprs",
		era: "current"
	},
	{
		id: "hexis",
		name: "Hexis",
		game: "rs3",
		twitch: "hexis",
		era: "current"
	},
	{
		id: "acidia",
		name: "Acidia",
		game: "rs3",
		twitch: "acidia",
		era: "current"
	}
];
function hrefs(row) {
	const out = [];
	const add = (label, href) => {
		if (href) out.push([label, href]);
	};
	if (row.twitch) add("Twitch", twitchUrl(row.twitch));
	if (row.x) add("X", xUrl(row.x));
	if (row.kick) add("Kick", kickUrl(row.kick));
	if (row.tiktok) add("TikTok", tiktokUrl(row.tiktok));
	if (row.instagram) add("Instagram", instagramUrl(row.instagram));
	if (row.facebook) add("Facebook", facebookUrl(row.facebook));
	if (row.discord) add("Discord", discordUrl(row.discord));
	return out;
}
function gameLabel(game) {
	return game === "osrs" ? "Old School RuneScape" : "RuneScape";
}
function Row({ row, live, showGame }) {
	const badge = row.twitch ? live[row.twitch.toLowerCase()] ?? null : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "flex flex-col gap-1 px-1 py-2 sm:flex-row sm:items-center sm:justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-sm",
			children: [
				row.name,
				row.official ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-2 text-[10px] text-faint",
					children: "Official"
				}) : null,
				showGame ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-2 text-[10px] text-faint",
					children: gameLabel(row.game)
				}) : null,
				badge === "live" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-2 rounded-sm border border-parchment px-1.5 py-0.5 text-[10px] text-parchment",
					children: "Live"
				}) : null,
				badge === "offline" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-2 text-[10px] text-faint",
					children: "Offline"
				}) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex flex-wrap gap-3 text-sm text-parchment",
			children: [hrefs(row).map(([label, href]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href,
				target: "_blank",
				rel: "noopener noreferrer",
				"aria-label": `${row.name} on ${label}`,
				children: label
			}, label)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "text-faint",
				onClick: () => void navigator.clipboard.writeText(row.name.replace(/[^A-Za-z0-9 _-]/g, "").slice(0, 12)),
				children: "Copy name"
			})]
		})]
	});
}
function StreamersPage() {
	const [livePeople, setLivePeople] = (0, import_react.useState)([]);
	const [probe, setProbe] = (0, import_react.useState)("down");
	const [q, setQ] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		let ctrl;
		const poll = () => {
			if (document.visibilityState !== "visible") return;
			ctrl?.abort();
			ctrl = new AbortController();
			const mine = ctrl;
			const timer = window.setTimeout(() => mine.abort(), 3e3);
			fetch("/api/twitch-live", {
				cache: "no-store",
				signal: mine.signal
			}).then((res) => res.ok ? res.json() : null).then((data) => {
				if (!data) {
					setProbe("down");
					setLivePeople([]);
					return;
				}
				if (data.off) {
					setProbe("off");
					setLivePeople([]);
					return;
				}
				if (data.ok === false) {
					setProbe("down");
					setLivePeople([]);
					return;
				}
				const list = Array.isArray(data) ? data : Array.isArray(data.rows) ? data.rows : [];
				const next = [];
				const seen = /* @__PURE__ */ new Set();
				for (const row of list) {
					if (!row || typeof row !== "object") continue;
					const handle = String(row.handle ?? "").toLowerCase().replace(/^@/, "");
					if (!handle || row.live !== true) continue;
					const game = row.game === "rs3" ? "rs3" : "osrs";
					const known = CHANNELS.find((item) => item.twitch?.toLowerCase() === handle);
					if (known) {
						if (seen.has(known.id)) continue;
						seen.add(known.id);
						next.push({
							...known,
							game
						});
						continue;
					}
					const id = `live-${handle}`;
					if (seen.has(id)) continue;
					seen.add(id);
					next.push({
						id,
						name: String(row.displayName || handle),
						game,
						twitch: handle
					});
				}
				setLivePeople(next);
				setProbe("ok");
			}).catch(() => {
				setProbe("down");
				setLivePeople([]);
			}).finally(() => window.clearTimeout(timer));
		};
		poll();
		const id = window.setInterval(poll, 12e4);
		document.addEventListener("visibilitychange", poll);
		return () => {
			window.clearInterval(id);
			document.removeEventListener("visibilitychange", poll);
			ctrl?.abort();
		};
	}, []);
	const needle = q.trim().toLowerCase();
	const match = (row) => !needle || row.name.toLowerCase().includes(needle) || (row.twitch ?? "").toLowerCase().includes(needle);
	const official = CHANNELS.filter((row) => row.official && hrefs(row).length && match(row));
	const foundation = CHANNELS.filter((row) => row.era === "foundation" && hrefs(row).length && match(row)).sort((a, b) => a.name.localeCompare(b.name));
	const liveHandles = new Set(livePeople.map((row) => row.twitch?.toLowerCase()).filter(Boolean));
	const officialLive = {};
	for (const row of official) if (row.twitch && liveHandles.has(row.twitch.toLowerCase())) officialLive[row.twitch.toLowerCase()] = "live";
	const liveNow = livePeople.filter((row) => !row.official && match(row)).sort((a, b) => a.name.localeCompare(b.name));
	const liveBadges = {};
	for (const row of liveNow) if (row.twitch) liveBadges[row.twitch.toLowerCase()] = "live";
	const osrsRest = CHANNELS.filter((row) => row.game === "osrs" && !row.official && row.era !== "foundation" && hrefs(row).length && match(row) && !(row.twitch && liveHandles.has(row.twitch.toLowerCase()))).sort((a, b) => a.name.localeCompare(b.name));
	const rsRest = CHANNELS.filter((row) => row.game === "rs3" && !row.official && row.era !== "foundation" && hrefs(row).length && match(row) && !(row.twitch && liveHandles.has(row.twitch.toLowerCase()))).sort((a, b) => a.name.localeCompare(b.name));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "border-b border-line px-5 py-5 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackLink, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "page-h1 mt-1",
					children: "Streamers"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-center text-sm text-muted",
					children: "Independent directory. We hope the links work."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-center text-[11px] text-faint",
					children: probe === "off" || probe === "down" ? "Live check is off." : "Live badges when the check works. A missing badge is not a verdict. Open the channel to be sure."
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
			className: "mx-auto flex max-w-3xl flex-col gap-8 px-5 py-6 md:px-8",
			children: [
				needle && !official.length && !foundation.length && !liveNow.length && !osrsRest.length && !rsRest.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Nothing here yet. Try another name."
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 text-sm font-semibold text-parchment",
					children: "Official"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col gap-2",
					children: official.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						row,
						live: officialLive,
						showGame: true
					}, row.id))
				})] }),
				foundation.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 text-sm font-semibold text-parchment",
					children: "Foundation"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col gap-2",
					children: foundation.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						row,
						live: {},
						showGame: true
					}, row.id))
				})] }) : null,
				liveNow.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 text-sm font-semibold text-parchment",
					children: "Live now"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col gap-2",
					children: liveNow.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						row,
						live: liveBadges,
						showGame: true
					}, row.id))
				})] }) : probe === "ok" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "No listed Twitch channel is live."
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 text-sm font-semibold text-parchment",
					children: "Old School RuneScape"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col gap-2",
					children: osrsRest.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						row,
						live: {}
					}, row.id))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 text-sm font-semibold text-parchment",
					children: "RuneScape"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col gap-2",
					children: rsRest.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						row,
						live: {}
					}, row.id))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-parchment",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							children: "Desk"
						}),
						" · ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/youtubers",
							children: "Youtubers"
						})
					]
				})
			]
		})]
	});
}
//#endregion
export { StreamersPage as component };
