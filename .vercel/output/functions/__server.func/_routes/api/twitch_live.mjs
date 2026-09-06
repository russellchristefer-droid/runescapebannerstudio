import { n as fetchTwitchLiveBoard, r as CHANNELS } from "../../_chunks/live.server.mjs";
//#region server/api/twitch-live.get.ts
async function handler(event) {
	try {
		const raw = event.node?.req.url ?? event.path ?? "";
		const asked = (new URL(raw, "http://local").searchParams.get("logins") ?? "").split(",").map((s) => s.trim()).filter(Boolean);
		const logins = asked.length ? asked : CHANNELS.map((row) => row.twitch ?? "").filter(Boolean);
		const board = await fetchTwitchLiveBoard(logins);
		return new Response(JSON.stringify(board), {
			status: 200,
			headers: {
				"content-type": "application/json; charset=utf-8",
				"cache-control": "public, max-age=120",
				"x-robots-tag": "noindex"
			}
		});
	} catch {
		return new Response(JSON.stringify({
			ok: false,
			rows: []
		}), {
			status: 200,
			headers: { "content-type": "application/json; charset=utf-8" }
		});
	}
}
//#endregion
export { handler as default };
