import { readFileSync } from "node:fs";
//#region src/data/channels.ts
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
//#endregion
//#region src/lib/live.server.ts
var cache = /* @__PURE__ */ new Map();
var TTL = 45e3;
var BOARD_TTL = 6e4;
var boardMemo = null;
var appToken = null;
function cleanLogin(raw) {
	const login = String(raw ?? "").trim().toLowerCase().replace(/^@/, "");
	if (!/^[a-z0-9_]{3,25}$/.test(login)) return "";
	return login;
}
function liveDisabled() {
	const flag = String(process.env.TWITCH_LIVE ?? process.env.VITE_TWITCH_LIVE ?? "").toLowerCase();
	return flag === "false" || flag === "0";
}
function gameForHandle(handle) {
	return CHANNELS.find((item) => cleanLogin(item.twitch ?? "") === handle)?.game ?? null;
}
function categoryGame(name) {
	if (name === "Old School RuneScape") return "osrs";
	if (name === "RuneScape") return "rs3";
	return null;
}
function listedLogins() {
	try {
		const raw = readFileSync(new URL("../../public/streamers.json", import.meta.url), "utf8");
		const fromFile = JSON.parse(raw).map((row) => cleanLogin(row.twitch ?? "")).filter(Boolean);
		if (fromFile.length) return fromFile;
	} catch {}
	return CHANNELS.map((row) => cleanLogin(row.twitch ?? "")).filter(Boolean);
}
async function helixToken() {
	const preset = process.env.TWITCH_APP_TOKEN ?? "";
	if (preset) return preset;
	const id = process.env.TWITCH_CLIENT_ID ?? "";
	const secret = process.env.TWITCH_CLIENT_SECRET ?? "";
	if (!id || !secret) return "";
	if (appToken && Date.now() - appToken.at < 3e6) return appToken.value;
	const res = await fetch("https://id.twitch.tv/oauth2/token", {
		method: "POST",
		headers: { "content-type": "application/x-www-form-urlencoded" },
		body: new URLSearchParams({
			client_id: id,
			client_secret: secret,
			grant_type: "client_credentials"
		}),
		signal: AbortSignal.timeout(2e3)
	});
	if (!res.ok) return "";
	const data = await res.json();
	if (!data.access_token) return "";
	appToken = {
		value: data.access_token,
		at: Date.now()
	};
	return data.access_token;
}
async function fetchTwitchUptime(loginRaw) {
	const login = cleanLogin(loginRaw);
	if (!login) return null;
	const hit = cache.get(login);
	if (hit && Date.now() - hit.at < TTL) return hit.up;
	try {
		const res = await fetch(`https://decapi.me/twitch/uptime/${encodeURIComponent(login)}?offline_msg=offline`, {
			headers: { Accept: "text/plain" },
			signal: AbortSignal.timeout(6e3)
		});
		const text = (await res.text()).trim();
		const up = !res.ok || !text || /offline|not found|error|unavailable|is not/i.test(text) ? null : text.slice(0, 80);
		cache.set(login, {
			at: Date.now(),
			up
		});
		return up;
	} catch {
		cache.set(login, {
			at: Date.now(),
			up: null
		});
		return null;
	}
}
async function fetchTwitchLive(logins) {
	try {
		const unique = [...new Set((logins ?? []).map(cleanLogin).filter(Boolean))].slice(0, 16);
		const live = {};
		const chunk = 4;
		for (let i = 0; i < unique.length; i += chunk) {
			const slice = unique.slice(i, i + chunk);
			const rows = await Promise.all(slice.map((login) => fetchTwitchUptime(login)));
			slice.forEach((login, idx) => {
				const up = rows[idx];
				if (up) live[login] = up;
			});
		}
		return live;
	} catch {
		return {};
	}
}
async function helixByLogins(clientId, token, logins) {
	const rows = [];
	for (let i = 0; i < logins.length; i += 20) {
		const slice = logins.slice(i, i + 20);
		const url = new URL("https://api.twitch.tv/helix/streams");
		for (const login of slice) url.searchParams.append("user_login", login);
		const res = await fetch(url, {
			headers: {
				"Client-Id": clientId,
				Authorization: `Bearer ${token}`
			},
			signal: AbortSignal.timeout(4e3)
		});
		if (!res.ok) throw new Error("streams");
		const body = await res.json();
		for (const stream of body.data ?? []) {
			const handle = cleanLogin(stream.user_login ?? "");
			if (!handle) continue;
			const gameName = String(stream.game_name ?? "");
			const cat = categoryGame(gameName);
			const expected = gameForHandle(handle);
			if (expected && cat && expected !== cat) continue;
			if (!cat) continue;
			rows.push({
				handle,
				displayName: String(stream.user_name ?? handle).slice(0, 32),
				game: cat,
				live: true,
				viewers: Number(stream.viewer_count) || 0,
				title: String(stream.title ?? "").slice(0, 80),
				gameName
			});
		}
	}
	return rows;
}
async function fetchTwitchLiveBoard(logins) {
	if (liveDisabled()) return {
		off: true,
		ok: false,
		rows: []
	};
	if (boardMemo && Date.now() - boardMemo.at < BOARD_TTL) return boardMemo.payload;
	const id = process.env.TWITCH_CLIENT_ID ?? "";
	const token = await helixToken().catch(() => "");
	if (!id || !token) return {
		off: true,
		ok: false,
		rows: []
	};
	try {
		const asked = [...new Set((logins ?? []).map(cleanLogin).filter(Boolean))];
		const payload = {
			ok: true,
			rows: await helixByLogins(id, token, (asked.length ? asked : listedLogins()).slice(0, 80))
		};
		boardMemo = {
			at: Date.now(),
			payload
		};
		return payload;
	} catch {
		return {
			ok: false,
			rows: []
		};
	}
}
//#endregion
export { fetchTwitchLiveBoard as n, CHANNELS as r, fetchTwitchLive as t };
