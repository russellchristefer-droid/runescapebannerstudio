export type Game = "osrs" | "rs3";

export type Channel = {
  id: string;
  name: string;
  game: Game;
  twitch?: string;
  youtube?: string;
  x?: string;
  kick?: string;
  tiktok?: string;
  instagram?: string;
  facebook?: string;
  discord?: string;
  official?: boolean;
  era?: "official" | "foundation" | "current";
};

export function twitchUrl(h: string) {
  const handle = h.replace(/^@/, "").trim();
  return handle ? `https://www.twitch.tv/${handle}` : "";
}
export function youtubeUrl(h: string) {
  const raw = h.trim().replace(/^https?:\/\/(www\.)?youtube\.com\//i, "");
  if (!raw) return "";
  if (raw.startsWith("c/") || raw.startsWith("channel/") || raw.startsWith("user/")) {
    return `https://www.youtube.com/${raw.replace(/^\/+/, "")}`;
  }
  return `https://www.youtube.com/@${raw.replace(/^@/, "")}`;
}
export function xUrl(h: string) {
  const handle = h.replace(/^@/, "").trim();
  return handle ? `https://x.com/${handle}` : "";
}
export function kickUrl(h: string) {
  const handle = h.replace(/^@/, "").trim();
  return handle ? `https://kick.com/${handle}` : "";
}
export function tiktokUrl(h: string) {
  const handle = h.replace(/^@/, "").trim();
  return handle ? `https://www.tiktok.com/@${handle}` : "";
}
export function instagramUrl(h: string) {
  const handle = h.replace(/^@/, "").trim();
  return handle ? `https://www.instagram.com/${handle}` : "";
}
export function facebookUrl(h: string) {
  const slug = h.replace(/^@/, "").trim().replace(/^https?:\/\/(www\.)?facebook\.com\//i, "");
  return slug ? `https://www.facebook.com/${slug}` : "";
}
export function discordUrl(h: string) {
  const raw = h.trim();
  const m =
    raw.match(/(?:https?:\/\/)?(?:www\.)?(?:discord\.gg|discord\.com\/invite)\/([A-Za-z0-9-]+)/i) ||
    raw.match(/^([A-Za-z0-9-]{2,32})$/);
  return m ? `https://discord.gg/${m[1]}` : "";
}

export const CHANNELS: Channel[] = [
  { id: "official-osrs", name: "Old School RuneScape", game: "osrs", twitch: "oldschoolrs", x: "OldSchoolRS", instagram: "oldschool.runescape", official: true, era: "official" },
  { id: "official-rs", name: "RuneScape", game: "rs3", twitch: "runescape", x: "RuneScape", facebook: "RuneScape", official: true, era: "official" },
  { id: "sparcmac", name: "Sparc Mac", game: "osrs", twitch: "sparcmac", era: "foundation" },
  { id: "woox", name: "Woox", game: "osrs", twitch: "wooxsolo", era: "foundation" },
  { id: "framed", name: "Framed", game: "osrs", twitch: "framed", era: "foundation" },
  { id: "b0aty", name: "B0aty", game: "osrs", twitch: "b0aty", era: "current" },
  { id: "faux", name: "Faux", game: "osrs", twitch: "faux", era: "current" },
  { id: "sick_nerd", name: "Sick_Nerd", game: "osrs", twitch: "sick_nerd", era: "current" },
  { id: "mr_mammal", name: "Mr Mammal", game: "osrs", twitch: "mr_mammal", era: "current" },
  { id: "purpp", name: "Purpp", game: "osrs", twitch: "purpp", era: "current" },
  { id: "dino_xx", name: "Dino_xx", game: "osrs", twitch: "dino_xx", era: "current" },
  { id: "sardaco", name: "Sardaco", game: "osrs", twitch: "sardaco", era: "current" },
  { id: "widega", name: "Widega_", game: "osrs", twitch: "widega_", era: "current" },
  { id: "mmorpg", name: "Mmorpg", game: "osrs", twitch: "mmorpg", era: "current" },
  { id: "gnomonkey", name: "Gnomonkey", game: "osrs", twitch: "gnomonkey", era: "current" },
  { id: "westham", name: "Westham", game: "osrs", twitch: "westham", era: "current" },
  { id: "alfie", name: "Alfie", game: "osrs", twitch: "alfie", era: "current" },
  { id: "skillspecs", name: "Skill Specs", game: "osrs", twitch: "skillspecs", era: "current" },
  { id: "tastylife", name: "TastyLife", game: "osrs", twitch: "tastylife", era: "current" },
  { id: "roidie", name: "Roidie", game: "osrs", twitch: "roidie", era: "current" },
  { id: "coxie", name: "Coxie", game: "osrs", twitch: "coxie", era: "current" },
  { id: "muts", name: "Muts", game: "osrs", twitch: "muts", era: "current" },
  { id: "soup", name: "Soup", game: "osrs", twitch: "soup", era: "current" },
  { id: "odablock", name: "Odablock", game: "osrs", twitch: "odablock", era: "current" },
  { id: "settled", name: "Settled", game: "osrs", twitch: "settled", era: "current" },
  { id: "cengineer", name: "C Engineer", game: "osrs", twitch: "cengineer", era: "current" },
  { id: "christefer", name: "Christefer_1", game: "osrs", twitch: "christefer_1", era: "current" },
  { id: "alkan", name: "Alkan", game: "osrs", twitch: "alkan", era: "current" },
  { id: "solomission", name: "SoloMission", game: "osrs", twitch: "solomission", era: "current" },
  { id: "rice", name: "Rice Cup", game: "osrs", twitch: "ricecup", era: "current" },
  { id: "ditter", name: "DitterBitter", game: "osrs", twitch: "ditterbitter", era: "current" },
  { id: "verzide", name: "Verzide", game: "osrs", twitch: "verzide", era: "current" },
  { id: "kempq", name: "KempQ", game: "osrs", twitch: "kempq", era: "current" },
  { id: "gunschilli", name: "Gunschilli", game: "osrs", twitch: "gunschilli", era: "current" },
  { id: "unit", name: "Unit", game: "osrs", twitch: "unitthetv", era: "current" },
  { id: "bruzz", name: "Bruzz", game: "osrs", twitch: "bruzz", era: "current" },
  { id: "jepk", name: "Jepk", game: "osrs", twitch: "jepk", era: "current" },
  { id: "manked", name: "Manked", game: "osrs", twitch: "manked", era: "current" },
  { id: "tpapaslice", name: "TpapaSLICE", game: "osrs", twitch: "tpapaslice", era: "current" },
  { id: "jillyfish", name: "jillyfish", game: "osrs", twitch: "jillyfish", era: "current" },
  { id: "palumor", name: "Palumor", game: "osrs", twitch: "palumor", era: "current" },
  { id: "thersguy", name: "TheRSGuy", game: "rs3", twitch: "thersguy", x: "TheRSguyy", era: "current" },
  { id: "evscape", name: "EvScape", game: "rs3", twitch: "evscape", era: "current" },
  { id: "itrolledu", name: "iTrolledU", game: "rs3", twitch: "itrolledu", era: "current" },
  { id: "maikeru", name: "Maikeru", game: "rs3", twitch: "maikeru", era: "current" },
  { id: "molgoatkirby", name: "molgoatkirby", game: "rs3", twitch: "molgoatkirby", era: "current" },
  { id: "wazzy", name: "Wazzy", game: "rs3", twitch: "wazzy", era: "current" },
  { id: "sr_bigboaby", name: "SR_BigBoaby", game: "rs3", twitch: "sr_bigboaby", era: "current" },
  { id: "willmissit", name: "WillMissIt", game: "rs3", twitch: "rswillmissit", era: "current" },
  { id: "couchy", name: "couchy", game: "rs3", twitch: "couchy", era: "current" },
  { id: "rageface", name: "Rageface", game: "rs3", twitch: "rageface", era: "current" },
  { id: "heirloom", name: "Heirloom", game: "rs3", twitch: "heirloom", era: "current" },
  { id: "grodoto", name: "Grodoto", game: "rs3", twitch: "grodoto", era: "current" },
  { id: "spongers", name: "SpongeRS", game: "rs3", twitch: "spongers", era: "current" },
  { id: "imnooblet", name: "ImNooblet", game: "rs3", twitch: "imnooblet", era: "current" },
  { id: "mukluk", name: "Mukluk", game: "rs3", twitch: "mukluk", era: "current" },
  { id: "puprs", name: "PupRs", game: "rs3", twitch: "puprs", era: "current" },
  { id: "hexis", name: "Hexis", game: "rs3", twitch: "hexis", era: "current" },
  { id: "acidia", name: "Acidia", game: "rs3", twitch: "acidia", era: "current" },
];

