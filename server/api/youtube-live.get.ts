import { fetchYoutubeBoard } from "../../src/lib/youtube.server";

export default async function handler() {
  try {
    const board = await fetchYoutubeBoard();
    return new Response(JSON.stringify(board), {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "public, max-age=180",
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
