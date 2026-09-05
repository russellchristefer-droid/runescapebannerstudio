import { CHANNELS } from "../../src/data/channels";
import { fetchTwitchLiveBoard } from "../../src/lib/live.server";

export default async function handler(event: {
  node?: { req: { url?: string } };
  path?: string;
}) {
  try {
    const raw = event.node?.req.url ?? event.path ?? "";
    const url = new URL(raw, "http://local");
    const asked = (url.searchParams.get("logins") ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const logins = asked.length
      ? asked
      : CHANNELS.map((row) => row.twitch ?? "").filter(Boolean);
    const board = await fetchTwitchLiveBoard(logins);
    return new Response(JSON.stringify(board), {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "public, max-age=120",
        "x-robots-tag": "noindex",
      },
    });
  } catch {
    return new Response(JSON.stringify({ ok: false, rows: [] }), {
      status: 200,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }
}
