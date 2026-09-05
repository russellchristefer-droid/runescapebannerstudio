import { fetchHiscoreLite } from "../../src/lib/hiscores.server";

export default async function handler(event: {
  node?: { req: { url?: string } };
  path?: string;
}) {
  try {
    const raw = event.node?.req.url ?? event.path ?? "";
    const url = new URL(raw, "http://local");
    const edition = url.searchParams.get("edition") ?? "OSRS";
    const player = url.searchParams.get("player") ?? "";
    const result = await fetchHiscoreLite(edition, player);
    if (result.error || !result.text) {
      return new Response(result.error ?? "missing", {
        status: result.status || 404,
        headers: { "content-type": "text/plain; charset=utf-8" },
      });
    }
    return new Response(result.text, {
      status: 200,
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "no-store",
      },
    });
  } catch {
    return new Response("missing", { status: 502 });
  }
}
