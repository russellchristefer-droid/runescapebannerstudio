import { clip, cleanEmail, cleanLevel } from "./safe";

const KEY = "rsbs.desk.v1";
const LEGACY = "rs-banner-studio";
const SKILL_ID = /^[a-z0-9-]{2,40}$/;

export type StudioSave = {
  v?: 1;
  streamer?: string;
  clan?: string;
  handle?: string;
  tagline?: string;
  world?: string;
  discord?: string;
  grind?: string;
  postEmail?: string;
  edition?: "RS3" | "OSRS";
  sizeId?: string;
  fontId?: string;
  textColor?: string;
  skillPack?: "OSRS" | "RS3";
  skillSize?: number;
  skillPicks?: { id: string; game?: "OSRS" | "RS3"; level: string; x?: number; y?: number; size?: number; scale?: number; group?: string }[];
  textScale?: Record<string, number>;
  locationId?: string;
  stillSrc?: string;
  view?: "a" | "b";
  skybox?: "nightstone" | "aura" | "a" | "b" | "dark" | "light";
};

function num(raw: unknown, min: number, max: number) {
  const n = Number(raw);
  if (!Number.isFinite(n)) return undefined;
  return Math.min(max, Math.max(min, n));
}

export function loadStudioSave(): StudioSave {
  try {
    const raw = window.localStorage.getItem(KEY) || window.localStorage.getItem(LEGACY);
    if (!raw) return {};
    const data = JSON.parse(raw) as StudioSave;
    if (!data || typeof data !== "object") return {};
    const stale = data.v !== 1;
    const picks = stale
      ? undefined
      : Array.isArray(data.skillPicks)
      ? data.skillPicks
          .slice(0, 48)
          .map((row) => ({
            id: SKILL_ID.test(String(row?.id ?? "")) ? String(row.id) : "",
            game: row?.game === "RS3" || row?.game === "OSRS" ? row.game : undefined,
            level: cleanLevel(row?.level),
            x: num(row?.x, 0, 4000),
            y: num(row?.y, 0, 4000),
            size: num(row?.size, 16, 96),
            scale: num(row?.scale, 0.5, 2.5),
          }))
          .filter((row) => row.id)
      : undefined;
    const textScale =
      !stale && data.textScale && typeof data.textScale === "object"
        ? Object.fromEntries(
            Object.entries(data.textScale)
              .slice(0, 12)
              .map(([key, value]) => [clip(key, 24), num(value, 0.75, 2)] as const)
              .filter((row): row is [string, number] => Boolean(row[0] && row[1])),
          )
        : undefined;
    return {
      v: 1,
      streamer: clip(data.streamer, 24),
      clan: clip(data.clan, 24),
      handle: clip(data.handle, 24),
      tagline: clip(data.tagline, 48),
      world: clip(data.world, 3).replace(/[^\d]/g, ""),
      discord: clip(data.discord, 28),
      grind: clip(data.grind, 36),
      postEmail: cleanEmail(data.postEmail ?? ""),
      edition: data.edition === "OSRS" || data.edition === "RS3" ? data.edition : undefined,
      sizeId: clip(data.sizeId, 24),
      fontId: clip(data.fontId, 16),
      textColor: /^#[0-9a-fA-F]{6}$/.test(data.textColor ?? "") ? data.textColor : undefined,
      skillPack: data.skillPack === "OSRS" || data.skillPack === "RS3" ? data.skillPack : undefined,
      skillSize: num(data.skillSize, 16, 96),
      skillPicks: picks,
      textScale,
      locationId: clip(data.locationId, 32),
      stillSrc: /^\/(?!\/)[A-Za-z0-9_./-]+\.(png|jpe?g|webp)(\?.*)?$/i.test(data.stillSrc ?? "")
        ? clip(data.stillSrc, 180)
        : undefined,
      view:
        data.view === "a" || data.view === "b"
          ? data.view
          : data.skybox === "nightstone" || data.skybox === "dark"
            ? "b"
            : data.skybox === "aura" || data.skybox === "light"
              ? "a"
              : undefined,
      skybox: undefined,
    };
  } catch {
    return {};
  }
}

export function writeStudioSave(next: StudioSave) {
  try {
    const payload = JSON.stringify({ ...next, v: 1 as const });
    if (payload.length > 200_000) return;
    window.localStorage.setItem(KEY, payload);
  } catch {
    /* private mode */
  }
}
