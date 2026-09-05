//#region node_modules/.nitro/vite/services/ssr/assets/studio-save-1SaG6gyq.js
var CTRL = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u200b-\u200f]/g;
function clip(raw, max) {
	if (typeof raw !== "string") return "";
	return raw.normalize("NFC").replace(CTRL, "").slice(0, max);
}
function cleanEmail(raw) {
	const email = clip(raw, 80).trim().replace(/\s+/g, "");
	if (!email || /[\r\n,]/.test(email)) return "";
	const at = email.indexOf("@");
	if (at < 1) return "";
	const domain = email.slice(at + 1);
	if (!domain.includes(".") || domain.endsWith(".")) return "";
	return email;
}
function cleanLevel(raw) {
	const n = String(raw ?? "").replace(/[^\d]/g, "").slice(0, 3);
	if (!n) return "";
	const v = Math.min(120, Number(n));
	return Number.isFinite(v) ? String(v) : "";
}
var KEY = "rsbs.desk.v1";
var LEGACY = "rs-banner-studio";
var SKILL_ID = /^[a-z0-9-]{2,40}$/;
function num(raw, min, max) {
	const n = Number(raw);
	if (!Number.isFinite(n)) return void 0;
	return Math.min(max, Math.max(min, n));
}
function loadStudioSave() {
	try {
		const raw = window.localStorage.getItem(KEY) || window.localStorage.getItem(LEGACY);
		if (!raw) return {};
		const data = JSON.parse(raw);
		if (!data || typeof data !== "object") return {};
		const stale = data.v !== 1;
		const picks = stale ? void 0 : Array.isArray(data.skillPicks) ? data.skillPicks.slice(0, 48).map((row) => ({
			id: SKILL_ID.test(String(row?.id ?? "")) ? String(row.id) : "",
			game: row?.game === "RS3" || row?.game === "OSRS" ? row.game : void 0,
			level: cleanLevel(row?.level),
			x: num(row?.x, 0, 4e3),
			y: num(row?.y, 0, 4e3),
			size: num(row?.size, 16, 96),
			scale: num(row?.scale, .5, 2.5)
		})).filter((row) => row.id) : void 0;
		const textScale = !stale && data.textScale && typeof data.textScale === "object" ? Object.fromEntries(Object.entries(data.textScale).slice(0, 12).map(([key, value]) => [clip(key, 24), num(value, .75, 2)]).filter((row) => Boolean(row[0] && row[1]))) : void 0;
		return {
			v: 1,
			streamer: clip(data.streamer, 24),
			clan: clip(data.clan, 24),
			handle: clip(data.handle, 24),
			tagline: clip(data.tagline, 48),
			world: clip(data.world, 3).replace(/[^\d]/g, ""),
			discord: clip(data.discord, 28),
			grind: clip(data.grind, 36),
			postEmail: cleanEmail(data.postEmail ?? ""),
			edition: data.edition === "OSRS" || data.edition === "RS3" ? data.edition : void 0,
			sizeId: clip(data.sizeId, 24),
			fontId: clip(data.fontId, 16),
			textColor: /^#[0-9a-fA-F]{6}$/.test(data.textColor ?? "") ? data.textColor : void 0,
			skillPack: data.skillPack === "OSRS" || data.skillPack === "RS3" ? data.skillPack : void 0,
			skillSize: num(data.skillSize, 16, 96),
			skillPicks: picks,
			textScale,
			locationId: clip(data.locationId, 32),
			view: data.view === "a" || data.view === "b" ? data.view : data.skybox === "nightstone" || data.skybox === "dark" ? "b" : data.skybox === "aura" || data.skybox === "light" ? "a" : void 0,
			skybox: void 0
		};
	} catch {
		return {};
	}
}
function writeStudioSave(next) {
	try {
		const payload = JSON.stringify({
			...next,
			v: 1
		});
		if (payload.length > 2e5) return;
		window.localStorage.setItem(KEY, payload);
	} catch {}
}
//#endregion
export { writeStudioSave as n, loadStudioSave as t };
