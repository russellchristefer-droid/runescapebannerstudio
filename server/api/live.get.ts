import { fetchTwitchLive } from "../../src/lib/live.server";
import { apiHeaders } from "../../src/lib/headers";
import { clientKey, limited, tooMany } from "./_limit";

export default async function handler(event: {
  node?: { req: { url?: string } };
  path?: string;
}) {
  try {
    if (tooMany(`live:${clientKey(event)}`, 30)) return limited();
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
      headers: apiHeaders({ "content-type": "application/json; charset=utf-8" }),
    });
  } catch {
    return new Response("{}", {
      status: 200,
      headers: apiHeaders({ "content-type": "application/json; charset=utf-8" }),
    });
  }
}
