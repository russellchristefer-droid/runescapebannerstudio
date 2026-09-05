import { hiscoresQuery } from "./rsText";
import { HISCORE_URLS } from "./hiscores";
import { fetchText } from "./net";
import { isAllowedHttpsUrl } from "./proxy-allowlist";

const UA = "RuneScapeBannerStudio/1.0 (hiscores lookup; fan utility)";

export async function fetchHiscoreLite(edition: string, player: string) {
  if (process.env.HISCORES_ENABLED === "false") {
    return { error: "missing", status: 503 as const };
  }
  const clean = hiscoresQuery(player);
  if (!clean) return { error: "name", status: 400 as const };
  const url =
    edition === "RS3" ? HISCORE_URLS.rs3Lite(clean) : HISCORE_URLS.osrsLite(clean);
  if (!isAllowedHttpsUrl(url)) return { error: "missing", status: 502 as const };
  try {
    const res = await fetchText(url, {
      headers: { Accept: "text/plain", "User-Agent": UA },
      redirect: "follow",
    });
    if (!res.ok) return { error: "missing", status: 404 as const };
    const text = await res.text();
    if (!looksLikeLite(text)) return { error: "missing", status: 404 as const };
    return { text, status: 200 as const };
  } catch {
    return { error: "missing", status: 502 as const };
  }
}

export function looksLikeLite(text: string) {
  const line = text.trim().split(/\n/)[0] ?? "";
  return /^-?\d+,-?\d+,-?\d+/.test(line);
}
