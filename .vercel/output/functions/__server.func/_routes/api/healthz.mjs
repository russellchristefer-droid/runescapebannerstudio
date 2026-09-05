//#region server/api/healthz.get.ts
async function handler() {
	return new Response(JSON.stringify({
		ok: true,
		time: (/* @__PURE__ */ new Date()).toISOString()
	}), {
		status: 200,
		headers: {
			"content-type": "application/json; charset=utf-8",
			"cache-control": "no-store",
			"x-robots-tag": "noindex"
		}
	});
}
//#endregion
export { handler as default };
