import { CHANNELS, type Game } from "./channels";

export type XGame = Game;

export type XVoice = {
  id: string;
  name: string;
  handle: string;
  game: XGame;
  official?: boolean;
};

export function xProfile(handle: string) {
  const clean = handle.replace(/^@/, "").trim();
  return clean ? `https://x.com/${clean}` : "";
}

export function xGameLabel(game: XGame) {
  if (game === "rs3") return "RuneScape";
  if (game === "dw") return "Dragonwilds";
  return "Old School";
}

const OFFICIAL_EXTRA: XVoice[] = [
  { id: "official-dw", name: "RuneScape: Dragonwilds", handle: "RSDragonwilds", game: "dw", official: true },
  { id: "official-dw-jp", name: "RuneScape: Dragonwilds JP", handle: "RSDragonwildsJP", game: "dw", official: true },
  { id: "jagex", name: "Jagex", handle: "Jagex", game: "osrs", official: true },
  { id: "jagex-support", name: "Jagex Support", handle: "JagexSupport", game: "osrs", official: true },
  { id: "runefest", name: "RuneFest", handle: "RuneFest", game: "osrs", official: true },
];

function fromChannel(row: (typeof CHANNELS)[number]): XVoice | null {
  const handle = row.x?.replace(/^@/, "").trim();
  if (!handle) return null;
  return {
    id: row.id,
    name: row.name,
    handle,
    game: row.game,
    official: row.official,
  };
}

/** Official accounts plus every hall row that already has a public X handle. Fan list. Not a rank. */
export const X_HALL: XVoice[] = (() => {
  const seen = new Set<string>();
  const out: XVoice[] = [];
  const push = (row: XVoice) => {
    const key = row.handle.toLowerCase();
    if (!key || seen.has(key)) return;
    seen.add(key);
    out.push(row);
  };
  for (const row of CHANNELS) {
    if (!row.official) continue;
    const voice = fromChannel(row);
    if (voice) push(voice);
  }
  for (const row of OFFICIAL_EXTRA) push(row);
  for (const row of CHANNELS) {
    if (row.official) continue;
    const voice = fromChannel(row);
    if (voice) push(voice);
  }
  return out;
})();
