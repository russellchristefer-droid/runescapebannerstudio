import { readFileSync } from "node:fs";
import { CHANNELS } from "@/data/channels";

const cache = new Map<string, { at: number; up: string | null }>();
const TTL = 45_000;
const BOARD_TTL = 60_000;
let boardMemo: { at: number; payload: TwitchBoard } | null = null;
let appToken: { value: string; at: number } | null = null;

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

function officialHandle(handle: string) {
  const row = CHANNELS.find((item) => cleanLogin(item.twitch ?? "") === handle);
  return Boolean(row?.official);
}

function categoryGame(name: string): "osrs" | "rs3" | null {
  if (name === "Old School RuneScape") return "osrs";
  if (name === "RuneScape") return "rs3";
  return null;
}

function listedLogins() {
  try {
    const raw = readFileSync(new URL("../../public/streamers.json", import.meta.url), "utf8");
    const rows = JSON.parse(raw) as { twitch?: string }[];
    const fromFile = rows.map((row) => cleanLogin(row.twitch ?? "")).filter(Boolean);
    if (fromFile.length) return fromFile;
  } catch {
    /* fall through */
  }
  return CHANNELS.map((row) => cleanLogin(row.twitch ?? "")).filter(Boolean);
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
    const unique = [...new Set((logins ?? []).map(cleanLogin).filter(Boolean))].slice(0, 16);
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

async function helixByLogins(clientId: string, token: string, logins: string[]) {
  const rows: TwitchBoardRow[] = [];
  for (let i = 0; i < logins.length; i += 20) {
    const slice = logins.slice(i, i + 20);
    const url = new URL("https://api.twitch.tv/helix/streams");
    for (const login of slice) url.searchParams.append("user_login", login);
    const res = await fetch(url, {
      headers: { "Client-ID": clientId, Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(4_000),
    });
    if (res.status === 401 || res.status === 403) {
      const err = new Error("auth");
      err.name = "TwitchAuth";
      throw err;
    }
    if (!res.ok) throw new Error("streams");
    const body = (await res.json()) as {
      data?: {
        user_login?: string;
        user_name?: string;
        viewer_count?: number;
        title?: string;
        game_name?: string;
      }[];
    };
    for (const stream of body.data ?? []) {
      const handle = cleanLogin(stream.user_login ?? "");
      if (!handle) continue;
      const gameName = String(stream.game_name ?? "");
      const cat = categoryGame(gameName);
      rows.push({
        handle,
        displayName: String(stream.user_name ?? handle).slice(0, 32),
        game: cat ?? gameForHandle(handle) ?? "osrs",
        live: true,
        viewers: Number(stream.viewer_count) || 0,
        title: String(stream.title ?? "").slice(0, 80),
        gameName,
      });
    }
  }
  return rows;
}

async function decapiBoard(logins: string[]): Promise<TwitchBoardRow[]> {
  const unique = [...new Set(logins.map(cleanLogin).filter(Boolean))].slice(0, 40);
  const rows: TwitchBoardRow[] = [];
  const chunk = 5;
  for (let i = 0; i < unique.length; i += chunk) {
    const slice = unique.slice(i, i + chunk);
    const ups = await Promise.all(slice.map((login) => fetchTwitchUptime(login)));
    slice.forEach((handle, idx) => {
      if (!ups[idx]) return;
      rows.push({
        handle,
        live: true,
        displayName: handle,
        game: gameForHandle(handle) ?? "osrs",
      });
    });
  }
  return rows;
}

export async function fetchTwitchLiveBoard(logins: string[]): Promise<TwitchBoard> {
  if (liveDisabled()) return { off: true, ok: false, rows: [] };
  if (boardMemo && Date.now() - boardMemo.at < BOARD_TTL) return boardMemo.payload;

  const asked = [...new Set((logins ?? []).map(cleanLogin).filter(Boolean))];
  const pool = asked.length ? asked : listedLogins();
  const id = process.env.TWITCH_CLIENT_ID ?? "";
  const token = await helixToken().catch(() => "");
  if (id && token) {
    try {
      const rows = await helixByLogins(id, token, pool.slice(0, 100));
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
