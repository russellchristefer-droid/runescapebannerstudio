import { fetchTwitchLive } from "../../src/lib/live.server";

export default async function handler(event: {
  node?: { req: { url?: string } };
  path?: string;
}) {
  try {
    const raw = event.node?.req.url ?? event.path ?? "";
    const url = new URL(raw, "http://local");
    const logins = (url.searchParams.get("logins") ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 16);
    const live = await fetchTwitchLive(logins);
    return new Response(JSON.stringify(live), {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store",
      },
    });
  } catch {
    return new Response("{}", {
      status: 200,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }
}
