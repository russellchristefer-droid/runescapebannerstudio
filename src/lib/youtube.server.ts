import { YOUTUBERS } from "@/data/youtubers";

export type TubeBoardRow = {
  id: string;
  live: boolean;
  title?: string;
  latest?: string;
};

export type TubeBoard = { off?: boolean; ok: boolean; rows: TubeBoardRow[] };

const BOARD_TTL = 5 * 60_000;
let boardMemo: { at: number; payload: TubeBoard } | null = null;
const idCache = new Map<string, string>();

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

export async function fetchYoutubeBoard(): Promise<TubeBoard> {
  if (liveDisabled()) return { off: true, ok: false, rows: [] };
  const key = apiKey();
  if (!key) return { off: true, ok: false, rows: [] };
  if (boardMemo && Date.now() - boardMemo.at < BOARD_TTL) return boardMemo.payload;

  const pool = [
    ...YOUTUBERS.filter((row) => row.era === "official"),
    ...YOUTUBERS.filter((row) => row.era === "foundation"),
    ...YOUTUBERS.filter((row) => row.era === "current"),
  ].slice(0, 10);

  const rows: TubeBoardRow[] = [];
  for (const row of pool) {
    try {
      const channelId = await resolveChannelId(key, row.youtube);
      if (!channelId) continue;
      const pulse = await channelPulse(key, channelId);
      rows.push({ id: row.id, ...pulse });
    } catch {
      /* fail-soft */
    }
  }

  const payload: TubeBoard = { ok: true, rows };
  boardMemo = { at: Date.now(), payload };
  return payload;
}
