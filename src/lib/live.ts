export function twitchLogin(url?: string) {
  if (!url) return "";
  const match = String(url).match(/twitch\.tv\/([A-Za-z0-9_]+)/i);
  const login = (match?.[1] ?? "").toLowerCase();
  return /^[a-z0-9_]{3,25}$/.test(login) ? login : "";
}

export function twitchHref(url?: string) {
  const login = twitchLogin(url);
  return login ? `https://www.twitch.tv/${login}` : "";
}

export function liveWatchList(urls: (string | undefined)[], now = Date.now()) {
  const all = [
    ...new Set(urls.map((url) => twitchLogin(url)).filter(Boolean)),
  ];
  if (!all.length) return [];
  const pin = [
    "oldschoolrs",
    "runescape",
    "faux",
    "b0aty",
    "thersguy",
    "wazzy",
    "puprs",
  ];
  const rest = all.filter((login) => !pin.includes(login));
  const start = rest.length ? Math.floor(now / 60_000) % rest.length : 0;
  const rotated = [...rest.slice(start), ...rest.slice(0, start)];
  return [...pin.filter((login) => all.includes(login)), ...rotated].slice(0, 16);
}

async function readLiveJson(res: Response) {
  const type = res.headers.get("content-type") ?? "";
  if (!res.ok || !type.includes("json")) return null;
  const data = (await res.json()) as unknown;
  if (!data || typeof data !== "object" || Array.isArray(data)) return null;
  const live: Record<string, string> = {};
  for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
    const login = twitchLogin(`https://www.twitch.tv/${key}`) || key.toLowerCase();
    if (/^[a-z0-9_]{3,25}$/.test(login) && typeof value === "string" && value) {
      live[login] = value.slice(0, 80);
    }
  }
  return live;
}

export async function twitchUptime(login: string) {
  try {
    const res = await fetch(
      `https://decapi.me/twitch/uptime/${encodeURIComponent(login)}?offline_msg=offline`,
      { signal: AbortSignal.timeout(6_000) },
    );
    if (!res.ok) return null;
    const text = (await res.text()).trim();
    if (!text || /offline|not found|error|unavailable|is not/i.test(text)) {
      return null;
    }
    return text.slice(0, 80);
  } catch {
    return null;
  }
}

export async function checkTwitchLive(logins: string[]) {
  try {
    const unique = liveWatchList(
      (logins ?? []).map((item) =>
        String(item).includes("twitch.tv")
          ? String(item)
          : `https://www.twitch.tv/${item}`,
      ),
    );
    if (!unique.length) return {};
    try {
      const res = await fetch(
        `/api/live?logins=${encodeURIComponent(unique.join(","))}`,
        { cache: "no-store", signal: AbortSignal.timeout(10_000) },
      );
      const parsed = await readLiveJson(res);
      if (parsed) return parsed;
    } catch {
      /* fall through */
    }
    const live: Record<string, string> = {};
    const chunk = 4;
    for (let i = 0; i < unique.length; i += chunk) {
      const slice = unique.slice(i, i + chunk);
      const rows = await Promise.all(
        slice.map(async (login) => [login, await twitchUptime(login)] as const),
      );
      for (const [login, up] of rows) {
        if (up) live[login] = up;
      }
    }
    return live;
  } catch {
    return {};
  }
}
