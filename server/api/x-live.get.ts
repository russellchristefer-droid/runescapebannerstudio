import { fetchXLiveBoard } from "../../src/lib/x-live.server";
import { apiHeaders } from "../../src/lib/headers";
import { clientKey, limited, tooMany } from "./_limit";

export default async function handler(event: { node?: { req?: { headers?: unknown } } }) {
  try {
    if (tooMany(`x:${clientKey(event)}`, 30)) return limited();
    const board = await fetchXLiveBoard();
    return new Response(JSON.stringify(board), {
      status: 200,
      headers: apiHeaders({ "content-type": "application/json; charset=utf-8", "cache-control": "no-store" }),
    });
  } catch {
    return new Response(JSON.stringify({ ok: false, rows: [] }), {
      status: 200,
      headers: apiHeaders({ "content-type": "application/json; charset=utf-8" }),
    });
  }
}
