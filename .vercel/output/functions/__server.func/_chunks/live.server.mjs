//#region src/lib/live.server.ts
var cache = /* @__PURE__ */ new Map();
var TTL = 45e3;
var BOARD_TTL = 12e4;
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
function categoryGame(name) {
	if (name === "Old School RuneScape") return "osrs";
	if (name === "RuneScape") return "rs3";
	return null;
}
async function helixToken() {
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
async function helixGames(clientId, token) {
	const url = new URL("https://api.twitch.tv/helix/games");
	url.searchParams.append("name", "Old School RuneScape");
	url.searchParams.append("name", "RuneScape");
	const res = await fetch(url, {
		headers: {
			"Client-Id": clientId,
			Authorization: `Bearer ${token}`
		},
		signal: AbortSignal.timeout(3e3)
	});
	if (!res.ok) throw new Error("games");
	const body = await res.json();
	const ids = [];
	for (const row of body.data ?? []) {
		const game = categoryGame(row.name ?? "");
		if (game && row.id) ids.push({
			id: row.id,
			game
		});
	}
	return ids;
}
async function helixStreamsForGame(clientId, token, gameId, cap) {
	const out = [];
	let cursor = "";
	while (out.length < cap) {
		const url = new URL("https://api.twitch.tv/helix/streams");
		url.searchParams.set("game_id", gameId);
		url.searchParams.set("first", String(Math.min(100, cap - out.length)));
		if (cursor) url.searchParams.set("after", cursor);
		const res = await fetch(url, {
			headers: {
				"Client-Id": clientId,
				Authorization: `Bearer ${token}`
			},
			signal: AbortSignal.timeout(3e3)
		});
		if (!res.ok) throw new Error("streams");
		const body = await res.json();
		const batch = body.data ?? [];
		if (!batch.length) break;
		for (const stream of batch) {
			const handle = cleanLogin(stream.user_login ?? "");
			if (!handle) continue;
			out.push({
				handle,
				displayName: String(stream.user_name ?? handle).slice(0, 32)
			});
			if (out.length >= cap) break;
		}
		cursor = body.pagination?.cursor ?? "";
		if (!cursor) break;
	}
	return out;
}
async function fetchTwitchLiveBoard(_logins) {
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
		const games = await helixGames(id, token);
		const rows = [];
		const seen = /* @__PURE__ */ new Set();
		for (const game of games) {
			const streams = await helixStreamsForGame(id, token, game.id, 40);
			for (const stream of streams) {
				if (seen.has(stream.handle)) continue;
				seen.add(stream.handle);
				rows.push({
					handle: stream.handle,
					displayName: stream.displayName,
					game: game.game,
					live: true
				});
			}
		}
		const payload = {
			ok: true,
			rows
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
export { fetchTwitchLiveBoard as n, fetchTwitchLive as t };
