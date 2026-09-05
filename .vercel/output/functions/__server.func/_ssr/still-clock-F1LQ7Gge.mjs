//#region node_modules/.nitro/vite/services/ssr/assets/still-clock-F1LQ7Gge.js
var PERIOD_MS = 3e5;
function stillIndex(length, now = Date.now()) {
	if (length <= 0) return 0;
	return Math.floor(now / PERIOD_MS) % length;
}
function msUntilNext(now = Date.now()) {
	return PERIOD_MS - now % PERIOD_MS;
}
function formatRemain(ms) {
	const total = Math.max(0, Math.ceil(ms / 1e3));
	const m = Math.floor(total / 60);
	const s = total % 60;
	return `${m}:${String(s).padStart(2, "0")}`;
}
//#endregion
export { stillIndex as i, formatRemain as n, msUntilNext as r, PERIOD_MS as t };
