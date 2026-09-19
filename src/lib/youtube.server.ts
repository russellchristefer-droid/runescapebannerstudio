import { YOUTUBERS } from "@/data/youtubers";
import { CHANNELS } from "@/data/channels";

export type TubeBoardRow = {
  id: string;
  handle: string;
  live: boolean;
  displayName?: string;
  game?: "osrs" | "rs3" | "dw";
  viewers?: number;
  title?: string;
  latest?: string;
};

export type TubeBoard = { off?: boolean; ok: boolean; rows: TubeBoardRow[] };

const BOARD_TTL = 45_000;
const LIVE_PARAMS = "EgJAAQ==";
const SKIP =
  /\b(rsps|private server|ikov|elorin|soulsplit|alora|dreamscape|pkscape)\b/i;
const GAME_WORD =
  /\b(osrs|old school|oldschool|runescape|rs3|gielinor|dragonwilds|ashenfall|jagex|tob|toa|inferno|nex|cox|olm|raids?|slayer|nightmare|vorkath|zulrah|sailing|hcim|ironman|pvm|wildy|wilderness|right-?click examine|rce)\b/i;
/** Hall names we knock on by name so a live title that does not say "OSRS" still counts. */
const ID_ALIAS: Record<string, string> = {
  sick_nerd: "sicknerd",
  mr_mammal: "mrmammal",
  dino_xx: "dino",
  rice: "ricecup",
  fliposrs: "flippingosrs",
  sr_bigboaby: "srbigboaby",
  "official-osrs": "osrs-off",
  "official-rs": "rs-off",
  omid: "runescapeomid",
  heyjase: "heyjase",
};
const EXTRA_WATCH = [
  "kingcondor",
  "theoatrix",
  "sirpugger",
  "slayermusiq1",
  "nightmarerh",
  "thecompletor",
  "soup",
  "verf",
  "25buttholes",
  "edimmuz",
  "autumnlive",
];
const idCache = new Map<string, string>();
let boardMemo: { at: number; payload: TubeBoard } | null = null;

function apiKey() {
  return (
    process.env.YOUTUBE_API_KEY ??
    process.env.YOUTUBE_DATA_API_KEY ??
    process.env.VITE_YOUTUBE_API_KEY ??
    ""
  ).trim();
}

function liveDisabled() {
  const flag = String(process.env.YOUTUBE_LIVE ?? process.env.VITE_YOUTUBE_LIVE ?? "").toLowerCase();
  return flag === "false" || flag === "0";
}

function cleanHandle(raw: string) {
  let value = String(raw ?? "").trim();
  try {
    value = decodeURIComponent(value);
  } catch {
    /* keep raw */
  }
  return value
    .replace(/^https?:\/\/(www\.)?youtube\.com\//i, "")
    .replace(/^\/+/, "")
    .replace(/^@/, "")
    .replace(/^channel\//i, "")
    .toLowerCase();
}

function fold(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function nameKey(value: string) {
  return fold(String(value ?? "").replace(/\b(the|live|osrs|rs3|runescape|hd|tv|yt|official|gaming)\b/gi, " "));
}

function hallFor(handle: string, display?: string) {
  const key = cleanHandle(handle);
  const folded = fold(key);
  const byHandle = YOUTUBERS.find((row) => {
    const yt = cleanHandle(row.youtube);
    return yt === key || fold(yt) === folded || row.id === key || fold(row.id) === folded;
  });
  if (byHandle) return byHandle;
  const name = String(display ?? "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
  if (!name) return undefined;
  const exact = YOUTUBERS.find((row) => row.name.toLowerCase() === name);
  if (exact) return exact;
  const nk = nameKey(name);
  if (nk.length < 5) return undefined;
  return YOUTUBERS.find((row) => nameKey(row.name) === nk);
}

function asGame(row: ReturnType<typeof hallFor>, fallback: "osrs" | "rs3" | "dw"): "osrs" | "rs3" | "dw" {
  if (!row) return fallback;
  if (row.game === "rs3") return "rs3";
  if (row.game === "dw") return "dw";
  return fallback === "dw" ? "dw" : row.game === "both" ? fallback : "osrs";
}

function rsTitle(title: string, known: boolean) {
  if (known) return true;
  return GAME_WORD.test(title);
}

function parseWatching(raw: unknown) {
  const text =
    typeof raw === "string"
      ? raw
      : raw && typeof raw === "object" && "simpleText" in raw
        ? String((raw as { simpleText?: string }).simpleText ?? "")
        : raw && typeof raw === "object" && "runs" in raw
          ? ((raw as { runs?: { text?: string }[] }).runs ?? []).map((run) => run.text ?? "").join("")
          : "";
  const n = Number(String(text).replace(/[^\d]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function runsText(node: { runs?: { text?: string }[]; simpleText?: string } | undefined) {
  if (!node) return "";
  if (node.simpleText) return node.simpleText;
  return (node.runs ?? []).map((run) => run.text ?? "").join("");
}

type VideoRenderer = {
  videoId?: string;
  title?: { runs?: { text?: string }[] };
  ownerText?: {
    runs?: {
      text?: string;
      navigationEndpoint?: { browseEndpoint?: { canonicalBaseUrl?: string } };
    }[];
  };
  viewCountText?: { simpleText?: string; runs?: { text?: string }[] };
  shortViewCountText?: { simpleText?: string; runs?: { text?: string }[] };
  badges?: unknown;
};

function walkVideos(node: unknown, out: VideoRenderer[]) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    for (const item of node) walkVideos(item, out);
    return;
  }
  const rec = node as Record<string, unknown>;
  if (rec.videoRenderer && typeof rec.videoRenderer === "object") {
    out.push(rec.videoRenderer as VideoRenderer);
  }
  for (const value of Object.values(rec)) walkVideos(value, out);
}

function watchIds() {
  const ids = new Set<string>([...EXTRA_WATCH, ...CHANNELS.map((row) => row.id)]);
  for (const [from, to] of Object.entries(ID_ALIAS)) {
    if (ids.has(from)) ids.add(to);
    if (ids.has(to)) ids.add(from);
  }
  for (const tube of YOUTUBERS) {
    if (channelForTube(tube)?.twitch) ids.add(tube.id);
  }
  return ids;
}

function channelForTube(row: (typeof YOUTUBERS)[number]) {
  const yt = cleanHandle(row.youtube);
  const nk = nameKey(row.name);
  return CHANNELS.find((item) => {
    if (item.id === row.id) return true;
    if (ID_ALIAS[item.id] === row.id) return true;
    if (ID_ALIAS[row.id] === item.id) return true;
    if (item.youtube && cleanHandle(item.youtube) === yt) return true;
    return nk.length >= 4 && nameKey(item.name) === nk;
  });
}

function watchQueries() {
  const ids = watchIds();
  const prefer = new Set(EXTRA_WATCH);
  const dual = new Set(
    YOUTUBERS.filter((row) => Boolean(channelForTube(row)?.twitch)).map((row) => row.id),
  );
  const rows = YOUTUBERS.filter((row) => ids.has(row.id) && !row.youtube.startsWith("channel/")).sort(
    (a, b) =>
      Number(prefer.has(b.id) || dual.has(b.id)) - Number(prefer.has(a.id) || dual.has(a.id)) ||
      a.name.localeCompare(b.name),
  );
  const out: { q: string; game: "osrs" | "rs3" | "dw" }[] = [];
  const seen = new Set<string>();
  for (const row of rows) {
    const name = row.name.trim();
    if (!name || seen.has(name.toLowerCase())) continue;
    seen.add(name.toLowerCase());
    const game: "osrs" | "rs3" | "dw" = row.game === "rs3" ? "rs3" : row.game === "dw" ? "dw" : "osrs";
    out.push({ q: name, game });
    if (out.length >= 40) break;
  }
  return out;
}

async function innertubeLive(query: string, game: "osrs" | "rs3" | "dw") {
  const res = await fetch("https://www.youtube.com/youtubei/v1/search?prettyPrint=false", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "user-agent": "Mozilla/5.0",
      "accept-language": "en",
    },
    body: JSON.stringify({
      context: { client: { clientName: "WEB", clientVersion: "2.20260901.00.00", hl: "en", gl: "US" } },
      query,
      params: LIVE_PARAMS,
    }),
    signal: AbortSignal.timeout(8_000),
  });
  if (!res.ok) return [];
  const body = (await res.json()) as unknown;
  const videos: VideoRenderer[] = [];
  walkVideos(body, videos);
  const rows: TubeBoardRow[] = [];
  const seen = new Set<string>();
  for (const video of videos) {
    const title = runsText(video.title).slice(0, 80);
    const ownerRun = video.ownerText?.runs?.[0];
    const display = String(ownerRun?.text ?? "").slice(0, 32);
    const href = String(ownerRun?.navigationEndpoint?.browseEndpoint?.canonicalBaseUrl ?? "");
    const handle = cleanHandle(href || display);
    if (!handle || seen.has(handle)) continue;
    const blob = `${title} ${display} ${handle}`;
    if (SKIP.test(blob)) continue;
    const known = hallFor(handle, display);
    if (!rsTitle(title, Boolean(known))) continue;
    seen.add(handle);
    const viewers = parseWatching(video.viewCountText) || parseWatching(video.shortViewCountText);
    rows.push({
      id: known?.id ?? `live-${handle}`,
      handle: known ? cleanHandle(known.youtube) : handle,
      displayName: known?.name ?? (display || handle),
      game: asGame(known, game),
      live: true,
      viewers,
      title,
    });
  }
  return rows;
}

function channelRef(raw: string) {
  const value = raw.trim();
  const id = value.match(/channel\/(UC[\w-]{20,})/i)?.[1];
  if (id) return { kind: "id" as const, value: id };
  const handle = value.replace(/^@/, "").replace(/^https?:\/\/(www\.)?youtube\.com\/@?/i, "");
  return { kind: "handle" as const, value: handle };
}

async function youtubeJson(url: URL) {
  const res = await fetch(url, { signal: AbortSignal.timeout(4_000) });
  if (!res.ok) return null;
  return (await res.json()) as {
    items?: { id?: string | { videoId?: string }; snippet?: { title?: string; liveBroadcastContent?: string } }[];
  };
}

async function resolveChannelId(key: string, raw: string) {
  const ref = channelRef(raw);
  if (ref.kind === "id") return ref.value;
  const hit = idCache.get(ref.value.toLowerCase());
  if (hit) return hit;
  const url = new URL("https://www.googleapis.com/youtube/v3/channels");
  url.searchParams.set("part", "id");
  url.searchParams.set("forHandle", ref.value);
  url.searchParams.set("key", key);
  const body = await youtubeJson(url);
  const id = typeof body?.items?.[0]?.id === "string" ? body.items[0].id : "";
  if (id) idCache.set(ref.value.toLowerCase(), id);
  return id;
}

async function channelPulse(key: string, channelId: string) {
  const liveUrl = new URL("https://www.googleapis.com/youtube/v3/search");
  liveUrl.searchParams.set("part", "snippet");
  liveUrl.searchParams.set("channelId", channelId);
  liveUrl.searchParams.set("eventType", "live");
  liveUrl.searchParams.set("type", "video");
  liveUrl.searchParams.set("maxResults", "1");
  liveUrl.searchParams.set("key", key);
  const liveBody = await youtubeJson(liveUrl);
  const liveItem = liveBody?.items?.[0];
  if (liveItem?.snippet?.title) {
    return { live: true, title: String(liveItem.snippet.title).slice(0, 80) };
  }
  const latestUrl = new URL("https://www.googleapis.com/youtube/v3/search");
  latestUrl.searchParams.set("part", "snippet");
  latestUrl.searchParams.set("channelId", channelId);
  latestUrl.searchParams.set("order", "date");
  latestUrl.searchParams.set("type", "video");
  latestUrl.searchParams.set("maxResults", "1");
  latestUrl.searchParams.set("key", key);
  const latestBody = await youtubeJson(latestUrl);
  const latest = latestBody?.items?.[0]?.snippet?.title;
  return { live: false, latest: latest ? String(latest).slice(0, 80) : undefined };
}

function mergeLive(parts: TubeBoardRow[][]) {
  const map = new Map<string, TubeBoardRow>();
  for (const rows of parts) {
    for (const row of rows) {
      if (!row.live || !row.handle) continue;
      const prev = map.get(row.handle);
      if (!prev || (row.viewers ?? 0) >= (prev.viewers ?? 0)) map.set(row.handle, row);
    }
  }
  return [...map.values()];
}

export async function fetchYoutubeBoard(): Promise<TubeBoard> {
  if (liveDisabled()) return { off: true, ok: false, rows: [] };
  if (boardMemo && Date.now() - boardMemo.at < BOARD_TTL) return boardMemo.payload;

  try {
    const directory = await Promise.all([
      innertubeLive("Old School RuneScape", "osrs").catch(() => []),
      innertubeLive("RuneScape 3", "rs3").catch(() => []),
      innertubeLive("RuneScape Dragonwilds", "dw").catch(() => []),
      ...watchQueries().map((item) => innertubeLive(item.q, item.game).catch(() => [])),
    ]);
    const rows = mergeLive(directory);

    const key = apiKey();
    if (key) {
      const pool = YOUTUBERS.filter((row) => row.era === "official").slice(0, 6);
      for (const row of pool) {
        try {
          const channelId = await resolveChannelId(key, row.youtube);
          if (!channelId) continue;
          const pulse = await channelPulse(key, channelId);
          if (!pulse.live) continue;
          if (pulse.title && !GAME_WORD.test(pulse.title) && row.era !== "official") continue;
          const handle = cleanHandle(row.youtube);
          rows.push({
            id: row.id,
            handle,
            displayName: row.name,
            game: row.id === "dw-off" || row.game === "dw" ? "dw" : row.game === "rs3" ? "rs3" : "osrs",
            live: true,
            title: pulse.title,
          });
        } catch {
          /* fail-soft */
        }
      }
    }

    const merged = mergeLive([rows]);
    const payload: TubeBoard = { ok: true, rows: merged };
    boardMemo = { at: Date.now(), payload };
    return payload;
  } catch {
    return { ok: false, rows: [] };
  }
}
