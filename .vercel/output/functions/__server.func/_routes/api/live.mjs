import { t as fetchTwitchLive } from "../../_chunks/live.server.mjs";
//#region server/api/live.get.ts
async function handler(event) {
	try {
		const raw = event.node?.req.url ?? event.path ?? "";
		const logins = (new URL(raw, "http://local").searchParams.get("logins") ?? "").split(",").map((s) => s.trim()).filter(Boolean).slice(0, 16);
		const live = await fetchTwitchLive(logins);
		return new Response(JSON.stringify(live), {
			status: 200,
			headers: {
				"content-type": "application/json; charset=utf-8",
				"cache-control": "no-store"
			}
		});
	} catch {
		return new Response("{}", {
			status: 200,
			headers: { "content-type": "application/json; charset=utf-8" }
		});
	}
}
//#endregion
export { handler as default };
