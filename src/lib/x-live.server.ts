import { X_HALL, type XGame, type XVoice } from "@/data/x-hall";

export type XBoardRow = {
  id: string;
  handle: string;
  live: boolean;
  displayName?: string;
  game?: XGame;
  viewers?: number;
  title?: string;
};

export type XBoard = { off?: boolean; ok: boolean; rows: XBoardRow[] };

const BOARD_TTL = 20_000;
const SKIP = /\b(rsps|private server|ikov|elorin|soulsplit|alora)\b/i;
const RS_LIVE =
  /\b(osrs|old school|oldschool|runescape|rs3|gielinor|dragonwilds|ashenfall)\b/i;
let boardMemo: { at: number; payload: XBoard } | null = null;

function bearer() {
  return (
    process.env.X_BEARER_TOKEN ??
    process.env.TWITTER_BEARER_TOKEN ??
    process.env.X_BEARER ??
    process.env.VITE_X_BEARER ??
    ""
  ).trim();
}

function liveDisabled() {
  const flag = String(process.env.X_LIVE ?? process.env.VITE_X_LIVE ?? "").toLowerCase();
  return flag === "false" || flag === "0";
}

function cleanHandle(raw: string) {
  return String(raw ?? "")
    .trim()
    .replace(/^@/, "")
    .toLowerCase();
}

function hallFor(handle: string): XVoice | undefined {
  const key = cleanHandle(handle);
  return X_HALL.find((row) => cleanHandle(row.handle) === key || row.id === key);
}

function guessGame(title: string): XGame | null {
  const t = title.toLowerCase();
  if (!RS_LIVE.test(t)) return null;
  if (/\bdragonwilds\b|\bashenfall\b/.test(t)) return "dw";
  if (/\b(osrs|old school|oldschool)\b/.test(t)) return "osrs";
  return "rs3";
}

type SpaceUser = { id?: string; username?: string; name?: string };
type SpaceNode = {
  title?: string;
  participant_count?: number;
  state?: string;
  host_ids?: string[];
};

async function searchSpaces(query: string, token: string) {
  const url = new URL("https://api.twitter.com/2/spaces/search");
  url.searchParams.set("query", query);
  url.searchParams.set("state", "live");
  url.searchParams.set("expansions", "host_ids");
  url.searchParams.set("space.fields", "title,participant_count,state,host_ids");
  url.searchParams.set("user.fields", "username,name");
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    signal: AbortSignal.timeout(12000),
  });
  if (res.status === 401 || res.status === 403) return { auth: false as const, spaces: [] as SpaceNode[], users: [] as SpaceUser[] };
  if (!res.ok) return { auth: true as const, spaces: [] as SpaceNode[], users: [] as SpaceUser[] };
  const json = (await res.json()) as {
    data?: SpaceNode[];
    includes?: { users?: SpaceUser[] };
  };
  return { auth: true as const, spaces: json.data ?? [], users: json.includes?.users ?? [] };
}

export async function fetchXLiveBoard(): Promise<XBoard> {
  if (liveDisabled()) return { off: true, ok: false, rows: [] };
  const token = bearer();
  if (!token) return { off: true, ok: false, rows: [] };
  if (boardMemo && Date.now() - boardMemo.at < BOARD_TTL) return boardMemo.payload;
  const queries = ["Old School RuneScape", "OSRS", "RuneScape", "Dragonwilds"];
  const rows: XBoardRow[] = [];
  const seen = new Set<string>();
  let authed = true;
  try {
    for (const query of queries) {
      const pack = await searchSpaces(query, token);
      if (!pack.auth) {
        authed = false;
        break;
      }
      const byId = new Map(pack.users.map((user) => [user.id ?? "", user]));
      for (const space of pack.spaces) {
        if (space.state && space.state !== "live") continue;
        const title = String(space.title ?? "").trim();
        if (!title || SKIP.test(title)) continue;
        const game = guessGame(title);
        if (!game) continue;
        const host = byId.get(space.host_ids?.[0] ?? "");
        const handle = cleanHandle(host?.username ?? "");
        if (!handle || seen.has(handle)) continue;
        seen.add(handle);
        const known = hallFor(handle);
        const watch = Number(space.participant_count);
        rows.push({
          id: known?.id ?? `live-${handle}`,
          handle,
          live: true,
          displayName: known?.name ?? host?.name ?? handle,
          game,
          viewers: Number.isFinite(watch) && watch > 0 ? watch : undefined,
          title: title.slice(0, 80) || undefined,
        });
      }
    }
  } catch {
    const payload: XBoard = { ok: false, rows: [] };
    boardMemo = { at: Date.now(), payload };
    return payload;
  }
  if (!authed) {
    const payload: XBoard = { off: true, ok: false, rows: [] };
    boardMemo = { at: Date.now(), payload };
    return payload;
  }
  const payload: XBoard = { ok: true, rows };
  boardMemo = { at: Date.now(), payload };
  return payload;
}
