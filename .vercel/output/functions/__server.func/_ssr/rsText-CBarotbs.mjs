//#region node_modules/.nitro/vite/services/ssr/assets/rsText-CBarotbs.js
var ZERO_WIDTH = /[\u200B-\u200D\uFEFF\u00AD]/g;
var DISPLAY_KEEP = /[^A-Za-z0-9 _-]/g;
var CLAN_KEEP = /[^A-Za-z0-9 _'-]/g;
var TAG_KEEP = /[^A-Za-z0-9 .,!?'+:\-]/g;
var HANDLE_KEEP = /[^A-Za-z0-9_@/-]/g;
function nfc(raw) {
	return (raw ?? "").normalize("NFC").replace(ZERO_WIDTH, "");
}
function squeeze(s) {
	return s.replace(/ {2,}/g, " ").replace(/[-_]{2,}/g, (m) => m[0]);
}
function typeDisplayName(raw) {
	return squeeze(nfc(raw).replace(DISPLAY_KEEP, "")).slice(0, 12);
}
function sanitizeDisplayName(raw) {
	let s = squeeze(nfc(raw).replace(DISPLAY_KEEP, "")).slice(0, 12);
	s = s.replace(/^[\s_-]+|[\s_-]+$/g, "");
	return s;
}
function looksLikeStaffName(raw) {
	return /^mod(\s|_|-)/i.test(sanitizeDisplayName(raw));
}
var sanitizeDisplayNameLive = typeDisplayName;
function sanitizeClan(raw) {
	return squeeze(nfc(raw).replace(CLAN_KEEP, "")).trim().slice(0, 24);
}
function sanitizeLine(raw, max) {
	return squeeze(nfc(raw).replace(TAG_KEEP, "")).trim().slice(0, max);
}
function sanitizeTagline(raw) {
	return sanitizeLine(raw, 48);
}
function sanitizeGrind(raw) {
	return sanitizeTagline(raw).slice(0, 36);
}
function sanitizeHandle(raw) {
	let s = nfc(raw).trim();
	if (/^\s*javascript:/i.test(s) || /^\s*data:/i.test(s)) return "";
	try {
		if (/^https?:\/\//i.test(s)) {
			const u = new URL(s);
			const host = u.hostname.replace(/^www\./, "");
			if (host === "twitch.tv") s = "@" + u.pathname.split("/").filter(Boolean)[0];
			else if (host.includes("youtube.com") || host === "youtu.be") {
				const p = u.pathname.split("/").filter(Boolean);
				s = p[0] === "c" || p[0] === "@" ? "@" + (p[1] || p[0].replace(/^@/, "")) : "@" + p[p.length - 1];
			} else return "";
		}
	} catch {
		return "";
	}
	s = s.replace(HANDLE_KEEP, "").slice(0, 32);
	if ((s.match(/@/g) || []).length > 1) s = "@" + s.replace(/@/g, "");
	return s;
}
function sanitizeDiscord(raw) {
	const s = nfc(raw).trim();
	const m = s.match(/(?:https?:\/\/)?(?:www\.)?(?:discord\.gg|discord\.com\/invite)\/([A-Za-z0-9-]+)/i) || s.match(/^([A-Za-z0-9-]{2,32})$/);
	if (!m) return "";
	const code = (m[1] || "").slice(0, 32);
	return code ? `discord.gg/${code}` : "";
}
function sanitizeWorld(raw) {
	const n = parseInt(String(raw).replace(/\D/g, ""), 10);
	if (!Number.isFinite(n) || n < 1 || n > 999) return "";
	return String(n);
}
function worldLabel(world) {
	return world ? `World ${world}` : "";
}
function hiscoresQuery(name) {
	return sanitizeDisplayName(name).replace(/_/g, " ").trim();
}
//#endregion
export { sanitizeDisplayName as a, sanitizeHandle as c, worldLabel as d, sanitizeDiscord as i, sanitizeTagline as l, looksLikeStaffName as n, sanitizeDisplayNameLive as o, sanitizeClan as r, sanitizeGrind as s, hiscoresQuery as t, sanitizeWorld as u };
