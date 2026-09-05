var ZERO_WIDTH = /[\u200B-\u200D\uFEFF\u00AD]/g;
var DISPLAY_KEEP = /[^A-Za-z0-9 _-]/g;
function nfc(raw) {
	return (raw ?? "").normalize("NFC").replace(ZERO_WIDTH, "");
}
function squeeze(s) {
	return s.replace(/ {2,}/g, " ").replace(/[-_]{2,}/g, (m) => m[0]);
}
function sanitizeDisplayName(raw) {
	let s = squeeze(nfc(raw).replace(DISPLAY_KEEP, "")).slice(0, 12);
	s = s.replace(/^[\s_-]+|[\s_-]+$/g, "");
	return s;
}
function hiscoresQuery(name) {
	return sanitizeDisplayName(name).replace(/_/g, " ").trim();
}
//#endregion
//#region src/lib/hiscores.ts
var OSRS_BASE = [
	"Overall",
	"Attack",
	"Defence",
	"Strength",
	"Hitpoints",
	"Ranged",
	"Prayer",
	"Magic",
	"Cooking",
	"Woodcutting",
	"Fletching",
	"Fishing",
	"Firemaking",
	"Crafting",
	"Smithing",
	"Mining",
	"Herblore",
	"Agility",
	"Thieving",
	"Slayer",
	"Farming",
	"Runecraft",
	"Hunter",
	"Construction"
];
[...OSRS_BASE];
[...OSRS_BASE.slice(0, 4), ...OSRS_BASE.slice(5)];
var HISCORE_URLS = {
	osrsLite: (name) => `https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=${encodeURIComponent(name)}`,
	rs3Lite: (name) => `https://secure.runescape.com/m=hiscore/index_lite.ws?player=${encodeURIComponent(name)}`,
	osrsPage: (name) => `https://secure.runescape.com/m=hiscore_oldschool/hiscorepersonal?user1=${encodeURIComponent(name)}`,
	rs3Page: (name) => `https://secure.runescape.com/m=hiscore/hiscorepersonal?user1=${encodeURIComponent(name)}`,
	osrsWom: (name) => `https://wiseoldman.net/players/${encodeURIComponent(name)}`
};
//#endregion
//#region src/lib/net.ts
async function fetchText(url, init = {}, ms = 8e3) {
	const ctrl = new AbortController();
	const timer = setTimeout(() => ctrl.abort(), ms);
	try {
		return await fetch(url, {
			...init,
			signal: ctrl.signal
		});
	} finally {
		clearTimeout(timer);
	}
}
//#endregion
//#region src/lib/proxy-allowlist.ts
var ALLOWED = /* @__PURE__ */ new Set([
	"secure.runescape.com",
	"services.runescape.com",
	"api.wiseoldman.net",
	"oldschool.runescape.wiki",
	"runescape.wiki"
]);
function isAllowedHttpsUrl(raw) {
	try {
		const url = new URL(raw);
		if (url.protocol !== "https:") return false;
		if (url.username || url.password) return false;
		const host = url.hostname.toLowerCase();
		if (/^\d/.test(host) || host === "localhost" || host.endsWith(".local")) return false;
		return ALLOWED.has(host);
	} catch {
		return false;
	}
}
//#endregion
//#region src/lib/hiscores.server.ts
var UA = "RuneScapeBannerStudio/1.0 (hiscores lookup; fan utility)";
async function fetchHiscoreLite(edition, player) {
	if (process.env.HISCORES_ENABLED === "false") return {
		error: "missing",
		status: 503
	};
	const clean = hiscoresQuery(player);
	if (!clean) return {
		error: "name",
		status: 400
	};
	const url = edition === "RS3" ? HISCORE_URLS.rs3Lite(clean) : HISCORE_URLS.osrsLite(clean);
	if (!isAllowedHttpsUrl(url)) return {
		error: "missing",
		status: 502
	};
	try {
		const res = await fetchText(url, {
			headers: {
				Accept: "text/plain",
				"User-Agent": UA
			},
			redirect: "follow"
		});
		if (!res.ok) return {
			error: "missing",
			status: 404
		};
		const text = await res.text();
		if (!looksLikeLite(text)) return {
			error: "missing",
			status: 404
		};
		return {
			text,
			status: 200
		};
	} catch {
		return {
			error: "missing",
			status: 502
		};
	}
}
function looksLikeLite(text) {
	const line = text.trim().split(/\n/)[0] ?? "";
	return /^-?\d+,-?\d+,-?\d+/.test(line);
}
//#endregion
//#region server/api/hiscores.get.ts
async function handler(event) {
	try {
		const raw = event.node?.req.url ?? event.path ?? "";
		const url = new URL(raw, "http://local");
		const result = await fetchHiscoreLite(url.searchParams.get("edition") ?? "OSRS", url.searchParams.get("player") ?? "");
		if (result.error || !result.text) return new Response(result.error ?? "missing", {
			status: result.status || 404,
			headers: { "content-type": "text/plain; charset=utf-8" }
		});
		return new Response(result.text, {
			status: 200,
			headers: {
				"content-type": "text/plain; charset=utf-8",
				"cache-control": "no-store"
			}
		});
	} catch {
		return new Response("missing", { status: 502 });
	}
}
//#endregion
export { handler as default };
