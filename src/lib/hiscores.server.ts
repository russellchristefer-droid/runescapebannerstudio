import { hiscoresQuery } from "./rsText";
import { HISCORE_URLS } from "./hiscores";
import { fetchText } from "./net";
import { isAllowedHttpsUrl } from "./proxy-allowlist";
import { makeTtlCache, singleFlight } from "./flight";

const UA = "RuneScapeBannerStudio/1.0 (hiscores lookup; fan utility)";
type HiscoreLite = { text?: string; error?: string; status: number };
const memo = makeTtlCache<HiscoreLite>(200, 45_000);

export async function fetchHiscoreLite(edition: string, player: string): Promise<HiscoreLite> {
  if (process.env.HISCORES_ENABLED === "false") {
    return { error: "missing", status: 503 };
  }
  const clean = hiscoresQuery(player);
  if (!clean) return { error: "name", status: 400 };
  const game = edition === "RS3" ? "RS3" : "OSRS";
  const key = `${game}:${clean.toLowerCase()}`;
  const hit = memo.get(key);
  if (hit) return hit;
  return singleFlight(`hiscores:${key}`, async () => {
    const again = memo.get(key);
    if (again) return again;
    const url = game === "RS3" ? HISCORE_URLS.rs3Lite(clean) : HISCORE_URLS.osrsLite(clean);
    if (!isAllowedHttpsUrl(url)) return { error: "missing", status: 502 };
    try {
      const res = await fetchText(url, {
        headers: { Accept: "text/plain", "User-Agent": UA },
        redirect: "follow",
      });
      if (!res.ok) {
        const miss = { error: "missing", status: 404 };
        memo.set(key, miss);
        return miss;
      }
      const text = await res.text();
      if (!looksLikeLite(text)) {
        const miss = { error: "missing", status: 404 };
        memo.set(key, miss);
        return miss;
      }
      const ok = { text, status: 200 };
      memo.set(key, ok);
      return ok;
    } catch {
      return { error: "missing", status: 502 };
    }
  });
}

export function looksLikeLite(text: string) {
  const line = text.trim().split(/\n/)[0] ?? "";
  return /^-?\d+,-?\d+,-?\d+/.test(line);
}
