import { fetchYoutubeBoard } from "../../src/lib/youtube.server";
import { apiHeaders } from "../../src/lib/headers";
import { clientKey, limited, tooMany } from "./_limit";

export default async function handler(event: { node?: { req?: { headers?: unknown } } }) {
  try {
    if (tooMany(`yt:${clientKey(event)}`, 30)) return limited();
    const board = await fetchYoutubeBoard();
    return new Response(JSON.stringify(board), {
      status: 200,
      headers: apiHeaders({ "content-type": "application/json; charset=utf-8" }),
    });
  } catch {
    return new Response(JSON.stringify({ ok: false, rows: [] }), {
      status: 200,
      headers: apiHeaders({ "content-type": "application/json; charset=utf-8" }),
    });
  }
}
