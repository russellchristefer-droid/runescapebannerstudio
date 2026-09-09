import { readFileSync } from "node:fs";
import { CHANNELS } from "@/data/channels";

const cache = new Map<string, { at: number; up: string | null }>();
const sticky = new Map<string, { at: number; row: TwitchBoardRow }>();
const TTL = 45_000;
const BOARD_TTL = 15_000;
const STICKY_TTL = 90_000;
let boardMemo: { at: number; payload: TwitchBoard } | null = null;
let appToken: { value: string; at: number } | null = null;
let gameIds: { at: number; osrs: string; rs3: string } | null = null;
let decapiCursor = 0;

export type TwitchBoardRow = {
  handle: string;
  live: boolean | "unknown";
  displayName?: string;
  game?: "osrs" | "rs3";
  viewers?: number;
  title?: string;
  gameName?: string;
};
export type TwitchBoard = { off?: boolean; ok: boolean; rows: TwitchBoardRow[] };

function cleanLogin(raw: string) {
  const login = String(raw ?? "")
    .trim()
    .toLowerCase()
    .replace(/^@/, "");
  if (!/^[a-z0-9_]{3,25}$/.test(login)) return "";
  return login;
}

function liveDisabled() {
  const flag = String(process.env.TWITCH_LIVE ?? process.env.VITE_TWITCH_LIVE ?? "").toLowerCase();
  return flag === "false" || flag === "0";
}

function gameForHandle(handle: string): "osrs" | "rs3" | null {
  const row = CHANNELS.find((item) => cleanLogin(item.twitch ?? "") === handle);
  return row?.game ?? null;
}

function categoryGame(name: string): "osrs" | "rs3" | null {
  if (name === "Old School RuneScape") return "osrs";
  if (name === "RuneScape") return "rs3";
  return null;
}

function listedLogins() {
  const fromHall = CHANNELS.map((row) => cleanLogin(row.twitch ?? "")).filter(Boolean);
  let fromFile: string[] = [];
  try {
    const raw = readFileSync(new URL("../../public/streamers.json", import.meta.url), "utf8");
    const rows = JSON.parse(raw) as { twitch?: string }[];
    fromFile = rows.map((row) => cleanLogin(row.twitch ?? "")).filter(Boolean);
  } catch {
    /* hall is enough */
  }
  return [...new Set([...fromHall, ...fromFile])];
}

function mergeLive(parts: TwitchBoardRow[][]) {
  const map = new Map<string, TwitchBoardRow>();
  for (const rows of parts) {
    for (const row of rows) {
      if (row.live !== true || !row.handle) continue;
      const prev = map.get(row.handle);
      if (!prev || (row.viewers ?? 0) >= (prev.viewers ?? 0)) map.set(row.handle, row);
    }
  }
  return [...map.values()];
}

async function helixToken() {
  const preset = process.env.TWITCH_APP_TOKEN ?? "";
  if (preset) return preset;
  const id = process.env.TWITCH_CLIENT_ID ?? "";
  const secret = process.env.TWITCH_CLIENT_SECRET ?? "";
  if (!id || !secret) return "";
  if (appToken && Date.now() - appToken.at < 50 * 60 * 1000) return appToken.value;
  const res = await fetch("https://id.twitch.tv/oauth2/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: id,
      client_secret: secret,
      grant_type: "client_credentials",
    }),
    signal: AbortSignal.timeout(2_000),
  });
  if (!res.ok) return "";
  const data = (await res.json()) as { access_token?: string };
  if (!data.access_token) return "";
  appToken = { value: data.access_token, at: Date.now() };
  return data.access_token;
}

function parseHelixStreams(
  data: {
    user_login?: string;
    user_name?: string;
    viewer_count?: number;
    title?: string;
    game_name?: string;
  }[],
  fallbackGame?: "osrs" | "rs3",
) {
  const rows: TwitchBoardRow[] = [];
  for (const stream of data) {
    const handle = cleanLogin(stream.user_login ?? "");
    if (!handle) continue;
    const gameName = String(stream.game_name ?? "");
    const cat = categoryGame(gameName);
    rows.push({
      handle,
      displayName: String(stream.user_name ?? handle).slice(0, 32),
      game: cat ?? gameForHandle(handle) ?? fallbackGame ?? "osrs",
      live: true,
      viewers: Number(stream.viewer_count) || 0,
      title: String(stream.title ?? "").slice(0, 80),
      gameName,
    });
  }
  return rows;
}

async function helixByLogins(clientId: string, token: string, logins: string[]) {
  const rows: TwitchBoardRow[] = [];
  for (let i = 0; i < logins.length; i += 100) {
    const slice = logins.slice(i, i + 100);
    const url = new URL("https://api.twitch.tv/helix/streams");
    for (const login of slice) url.searchParams.append("user_login", login);
    url.searchParams.set("type", "live");
    const res = await fetch(url, {
      headers: { "Client-ID": clientId, Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(8_000),
    });
    if (res.status === 401 || res.status === 403) {
      const err = new Error("auth");
      err.name = "TwitchAuth";
      throw err;
    }
    if (!res.ok) throw new Error("streams");
    const body = (await res.json()) as { data?: Parameters<typeof parseHelixStreams>[0] };
    rows.push(...parseHelixStreams(body.data ?? []));
  }
  return rows;
}

async function helixGameIds(clientId: string, token: string) {
  if (gameIds && Date.now() - gameIds.at < 12 * 60 * 60 * 1000) return gameIds;
  const url = new URL("https://api.twitch.tv/helix/games");
  url.searchParams.append("name", "Old School RuneScape");
  url.searchParams.append("name", "RuneScape");
  const res = await fetch(url, {
    headers: { "Client-ID": clientId, Authorization: `Bearer ${token}` },
    signal: AbortSignal.timeout(4_000),
  });
  if (!res.ok) return gameIds;
  const body = (await res.json()) as { data?: { id?: string; name?: string }[] };
  let osrs = gameIds?.osrs ?? "";
  let rs3 = gameIds?.rs3 ?? "";
  for (const game of body.data ?? []) {
    if (game.name === "Old School RuneScape" && game.id) osrs = game.id;
    if (game.name === "RuneScape" && game.id) rs3 = game.id;
  }
  if (!osrs && !rs3) return gameIds;
  gameIds = { at: Date.now(), osrs, rs3 };
  return gameIds;
}

async function helixCategory(clientId: string, token: string, gameId: string, game: "osrs" | "rs3") {
  if (!gameId) return [];
  const url = new URL("https://api.twitch.tv/helix/streams");
  url.searchParams.set("game_id", gameId);
  url.searchParams.set("first", "100");
  url.searchParams.set("type", "live");
  const res = await fetch(url, {
    headers: { "Client-ID": clientId, Authorization: `Bearer ${token}` },
    signal: AbortSignal.timeout(8_000),
  });
  if (res.status === 401 || res.status === 403) {
    const err = new Error("auth");
    err.name = "TwitchAuth";
    throw err;
  }
  if (!res.ok) return [];
  const body = (await res.json()) as { data?: Parameters<typeof parseHelixStreams>[0] };
  return parseHelixStreams(body.data ?? [], game);
}

export async function fetchTwitchUptime(loginRaw: string) {
  const login = cleanLogin(loginRaw);
  if (!login) return null;
  const hit = cache.get(login);
  if (hit && Date.now() - hit.at < TTL) return hit.up;
  try {
    const res = await fetch(
      `https://decapi.me/twitch/uptime/${encodeURIComponent(login)}?offline_msg=offline`,
      { headers: { Accept: "text/plain" }, signal: AbortSignal.timeout(6_000) },
    );
    const text = (await res.text()).trim();
    const up =
      !res.ok || !text || /offline|not found|error|unavailable|is not/i.test(text)
        ? null
        : text.slice(0, 80);
    cache.set(login, { at: Date.now(), up });
    return up;
  } catch {
    cache.set(login, { at: Date.now(), up: null });
    return null;
  }
}

export async function fetchTwitchLive(logins: string[]) {
  try {
    const unique = [...new Set((logins ?? []).map(cleanLogin).filter(Boolean))];
    const live: Record<string, string> = {};
    const chunk = 4;
    for (let i = 0; i < unique.length; i += chunk) {
      const slice = unique.slice(i, i + chunk);
      const rows = await Promise.all(slice.map((login) => fetchTwitchUptime(login)));
      slice.forEach((login, idx) => {
        const up = rows[idx];
        if (up) live[login] = up;
      });
    }
    return live;
  } catch {
    return {};
  }
}

async function decapiBoard(logins: string[]): Promise<TwitchBoardRow[]> {
  const unique = [...new Set(logins.map(cleanLogin).filter(Boolean))];
  if (!unique.length) return [];
  const pass = 15;
  const start = decapiCursor % unique.length;
  decapiCursor = start + pass;
  const slice = [...unique.slice(start, start + pass), ...unique.slice(0, Math.max(0, start + pass - unique.length))].slice(0, pass);
  const chunk = 5;
  for (let i = 0; i < slice.length; i += chunk) {
    const batch = slice.slice(i, i + chunk);
    const ups = await Promise.all(batch.map((login) => fetchTwitchUptime(login)));
    batch.forEach((handle, idx) => {
      if (!ups[idx]) {
        sticky.delete(handle);
        return;
      }
      sticky.set(handle, {
        at: Date.now(),
        row: {
          handle,
          live: true,
          displayName: handle,
          game: gameForHandle(handle) ?? "osrs",
        },
      });
    });
  }
  const now = Date.now();
  const rows: TwitchBoardRow[] = [];
  for (const [handle, hit] of sticky) {
    if (now - hit.at > STICKY_TTL) {
      sticky.delete(handle);
      continue;
    }
    rows.push(hit.row);
  }
  return rows;
}

export async function fetchTwitchLiveBoard(logins: string[]): Promise<TwitchBoard> {
  if (liveDisabled()) return { off: true, ok: false, rows: [] };
  if (boardMemo && Date.now() - boardMemo.at < BOARD_TTL) return boardMemo.payload;

  const asked = [...new Set((logins ?? []).map(cleanLogin).filter(Boolean))];
  const pool = [...new Set([...(asked.length ? asked : []), ...listedLogins()])];
  const id = process.env.TWITCH_CLIENT_ID ?? "";
  const token = await helixToken().catch(() => "");
  if (id && token) {
    try {
      const ids = await helixGameIds(id, token);
      const [byLogin, osrsLive, rs3Live] = await Promise.all([
        helixByLogins(id, token, pool),
        ids?.osrs ? helixCategory(id, token, ids.osrs, "osrs") : Promise.resolve([]),
        ids?.rs3 ? helixCategory(id, token, ids.rs3, "rs3") : Promise.resolve([]),
      ]);
      const rows = mergeLive([byLogin, osrsLive, rs3Live]);
      const payload: TwitchBoard = { ok: true, rows };
      boardMemo = { at: Date.now(), payload };
      return payload;
    } catch (err) {
      if (err instanceof Error && err.name === "TwitchAuth") {
        /* fall through to public uptime */
      } else {
        return { ok: false, rows: [] };
      }
    }
  }

  try {
    const rows = await decapiBoard(pool);
    const payload: TwitchBoard = { ok: true, rows };
    boardMemo = { at: Date.now(), payload };
    return payload;
  } catch {
    return { ok: false, rows: [] };
  }
}
