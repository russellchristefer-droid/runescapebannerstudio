export type Game = "osrs" | "rs3" | "dw";

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
  { id: "official-osrs", name: "Old School RuneScape", game: "osrs", twitch: "oldschoolrs", x: "OldSchoolRS", instagram: "oldschool.runescape", youtube: "channel/UC0j1MpbiTFHYrUjOTwifW_w", official: true, era: "official" },
  { id: "official-rs", name: "RuneScape", game: "rs3", twitch: "runescape", x: "RuneScape", facebook: "RuneScape", youtube: "RuneScape", official: true, era: "official" },
  { id: "sparcmac", name: "Sparc Mac", game: "osrs", twitch: "sparcmac", x: "SparcmacLive", youtube: "SparcMac", era: "foundation" },
  { id: "woox", name: "Woox", game: "osrs", twitch: "wooxsolo", x: "WooxSolo", youtube: "Woox", era: "foundation" },
  { id: "framed", name: "Framed", game: "osrs", twitch: "framed", youtube: "FramedYT", era: "foundation" },
  { id: "b0aty", name: "B0aty", game: "osrs", twitch: "b0aty", x: "B0aty", youtube: "B0aty", era: "current" },
  { id: "kingcondor", name: "King Condor", game: "osrs", twitch: "kingcondor", x: "KingCondor69", kick: "kingcondor", youtube: "KingCondor", era: "current" },
  { id: "autumnlive", name: "AutumnLive", game: "osrs", twitch: "autumneev", youtube: "AutumnEevLive", era: "current" },
  { id: "faux", name: "Faux", game: "osrs", twitch: "faux", youtube: "Faux", era: "current" },
  { id: "sick_nerd", name: "Sick_Nerd", game: "osrs", twitch: "sick_nerd", youtube: "SickNerd", era: "current" },
  { id: "mr_mammal", name: "Mr Mammal", game: "osrs", twitch: "mr_mammal", youtube: "MrMammal", x: "Mr_Mammal", era: "current" },
  { id: "purpp", name: "Purpp", game: "osrs", twitch: "purpp", youtube: "Purpp", era: "current" },
  { id: "dino_xx", name: "Dino_xx", game: "osrs", twitch: "dino_xx", youtube: "Dino_xx", era: "current" },
  { id: "sardaco", name: "Sardaco", game: "osrs", twitch: "sardaco", era: "current" },
  { id: "widega", name: "Widega_", game: "osrs", twitch: "widega_", era: "current" },
  { id: "mmorpg", name: "Mmorpg", game: "osrs", twitch: "mmorpg", youtube: "Mmorpg", era: "current" },
  { id: "gnomonkey", name: "Gnomonkey", game: "osrs", twitch: "gnomonkey", x: "GnomonkeyRS", youtube: "Gnomonkey", era: "current" },
  { id: "westham", name: "Westham", game: "osrs", twitch: "westham", youtube: "Westham", era: "current" },
  { id: "alfie", name: "Alfie", game: "osrs", twitch: "alfie", youtube: "Alfie", era: "current" },
  { id: "skillspecs", name: "Skill Specs", game: "osrs", twitch: "skillspecs", x: "skill_specs", youtube: "skillspecs", era: "current" },
  { id: "tastylife", name: "TastyLife", game: "osrs", twitch: "tastylife", youtube: "TastyLife", era: "current" },
  { id: "roidie", name: "Roidie", game: "osrs", twitch: "roidie", youtube: "Roidie", era: "current" },
  { id: "coxie", name: "Coxie", game: "osrs", twitch: "coxie", x: "Coxie_rs", youtube: "Coxie", era: "current" },
  { id: "muts", name: "Muts", game: "osrs", twitch: "muts", youtube: "Muts", x: "MutsOSRS", era: "current" },
  { id: "soup", name: "Soup", game: "osrs", twitch: "soup", youtube: "SoupRS", era: "current" },
  { id: "odablock", name: "Odablock", game: "osrs", twitch: "odablock", x: "Odablock", youtube: "Odablock", era: "current" },
  { id: "settled", name: "Settled", game: "osrs", twitch: "settled", x: "SettledRS", youtube: "Settled", era: "current" },
  { id: "cengineer", name: "C Engineer", game: "osrs", twitch: "cengineer", x: "C_EngineerRS", youtube: "CEngineer", era: "current" },
  { id: "christefer", name: "Christefer_1", game: "osrs", twitch: "christefer_1", era: "current" },
  { id: "alkan", name: "Alkan", game: "osrs", twitch: "alkan", youtube: "AlkanRS", era: "current" },
  { id: "solomission", name: "SoloMission", game: "osrs", twitch: "solomission", youtube: "SoloMission", x: "SoloMission_OSR", era: "current" },
  { id: "rice", name: "Rice Cup", game: "osrs", twitch: "ricecup", youtube: "RiceCup", era: "current" },
  { id: "ditter", name: "DitterBitter", game: "osrs", twitch: "ditterbitter", x: "DitterBitter", youtube: "DitterBitter", era: "current" },
  { id: "verzide", name: "Verzide", game: "osrs", twitch: "verzide", youtube: "Verzide", era: "current" },
  { id: "kempq", name: "KempQ", game: "osrs", twitch: "kempq", youtube: "KempQ", era: "current" },
  { id: "gunschilli", name: "Gunschilli", game: "osrs", twitch: "gunschilli", youtube: "Gunschilli", era: "current" },
  { id: "unit", name: "Unit", game: "osrs", twitch: "unitthetv", youtube: "UnitTheTV", era: "current" },
  { id: "bruzz", name: "Bruzz", game: "osrs", twitch: "bruzz", youtube: "Bruzz", era: "current" },
  { id: "jepk", name: "Jepk", game: "osrs", twitch: "jepk", youtube: "Jepk", era: "current" },
  { id: "manked", name: "Manked", game: "osrs", twitch: "manked", youtube: "Manked", era: "current" },
  { id: "tpapaslice", name: "TpapaSLICE", game: "osrs", twitch: "tpapaslice", era: "current" },
  { id: "jillyfish", name: "jillyfish", game: "osrs", twitch: "jillyfish", youtube: "jillyfish", era: "current" },
  { id: "palumor", name: "Palumor", game: "osrs", twitch: "palumor", youtube: "Palumor", era: "current" },
  { id: "thersguy", name: "TheRSGuy", game: "rs3", twitch: "thersguy", x: "TheRSguyy", youtube: "TheRSGuy", era: "current" },
  { id: "evscape", name: "EvScape", game: "rs3", twitch: "evscape", x: "EVScapeOfficial", youtube: "EvScape", era: "current" },
  { id: "itrolledu", name: "iTrolledU", game: "rs3", twitch: "itrolledu", x: "RSiTrolledU", youtube: "iTrolledU", era: "current" },
  { id: "maikeru", name: "Maikeru", game: "rs3", twitch: "maikeru", youtube: "Maikeru", era: "current" },
  { id: "molgoatkirby", name: "molgoatkirby", game: "rs3", twitch: "molgoatkirby", youtube: "molgoatkirby", x: "MolGoatKirby", era: "current" },
  { id: "wazzy", name: "Wazzy", game: "rs3", twitch: "wazzy", youtube: "WazzyRS", x: "WazzyRS", era: "current" },
  { id: "sr_bigboaby", name: "SR_BigBoaby", game: "rs3", twitch: "sr_bigboaby", youtube: "SRBigBoaby", era: "current" },
  { id: "willmissit", name: "RSWillMissIt", game: "rs3", twitch: "rswillmissit", x: "rswillmissit", youtube: "rswillmissit", era: "current" },
  { id: "edimmuz", name: "Edimmuz", game: "rs3", twitch: "edimmuz", x: "edimmuz", youtube: "Edimmuz", era: "current" },
  { id: "couchy", name: "couchy", game: "rs3", twitch: "couchy", youtube: "Couchy", era: "current" },
  { id: "rageface", name: "Rageface", game: "rs3", twitch: "rageface", youtube: "Rageface", era: "current" },
  { id: "heirloom", name: "Heirloom", game: "rs3", twitch: "heirloom", youtube: "Heirloom", era: "current" },
  { id: "grodoto", name: "Grodoto", game: "rs3", twitch: "grodoto", youtube: "Grodoto", era: "current" },
  { id: "spongers", name: "SpongeRS", game: "rs3", twitch: "spongers", youtube: "SpongeRS", era: "current" },
  { id: "imnooblet", name: "ImNooblet", game: "rs3", twitch: "imnooblet", youtube: "ImNooblet", era: "current" },
  { id: "mukluk", name: "Mukluk", game: "rs3", twitch: "mukluk", youtube: "Mukluk", era: "current" },
  { id: "puprs", name: "PupRs", game: "rs3", twitch: "puprs", youtube: "PupRs", era: "current" },
  { id: "hexis", name: "Hexis", game: "rs3", twitch: "hexis", youtube: "HexisRS", era: "current" },
  { id: "acidia", name: "Acidia", game: "rs3", twitch: "acidia", youtube: "Acidia", era: "current" },
  { id: "torvesta", name: "Torvesta", game: "osrs", twitch: "torvesta", x: "Torvesta", youtube: "torvestars", era: "current" },
  { id: "afriend", name: "A Friend", game: "osrs", twitch: "afriend", x: "afriendrs", youtube: "AFriend", era: "current" },
  { id: "j1mmy", name: "J1mmy", game: "osrs", twitch: "j1mmy", x: "J1mmyRS", youtube: "J1mmy", era: "current" },
  { id: "rendi", name: "Rendi", game: "osrs", twitch: "rendimento", youtube: "RendiMento", era: "current" },
  { id: "oziris", name: "Oziris", game: "osrs", twitch: "oziris", youtube: "Oziris", era: "current" },
  { id: "hofie", name: "Hofie", game: "osrs", twitch: "hofie", youtube: "Hofie", era: "current" },
  { id: "verf", name: "Verf", game: "osrs", twitch: "verf", kick: "verf", youtube: "Verf", era: "current" },
  { id: "rhys", name: "Rhys", game: "osrs", twitch: "rhys", youtube: "Rhys", era: "current" },
  { id: "wildmudkip", name: "WildMudkip", game: "osrs", twitch: "wildmudkip", youtube: "WildMudkip", x: "WildMudkip", era: "current" },
  { id: "fliposrs", name: "FlippingOldschool", game: "osrs", twitch: "flippingoldschool", youtube: "FlippingOldschool", era: "current" },
  { id: "zulu", name: "Zulu", game: "osrs", twitch: "zulu", youtube: "ZuluOSRS", era: "current" },
  { id: "heati", name: "Heati", game: "osrs", twitch: "heati", youtube: "Heati", era: "current" },
  { id: "skiddler", name: "Skiddler", game: "osrs", twitch: "skiddler", youtube: "Skiddler", era: "current" },
  { id: "tidlenz", name: "Tidlenz", game: "osrs", twitch: "tidlenz", youtube: "Tidlenz", era: "current" },
  { id: "raikesy", name: "Raikesy", game: "osrs", twitch: "raikesy", youtube: "Raikesy", era: "foundation" },
  { id: "dillerz", name: "Dillerz", game: "osrs", twitch: "dillerz", youtube: "Dillerz", era: "current" },
  { id: "25buttholes", name: "25 Buttholes", game: "osrs", twitch: "25buttholes", youtube: "c/25buttholes", era: "current" },
  { id: "triumphant", name: "Triumphant", game: "osrs", twitch: "triumphant", youtube: "Triumphant", era: "current" },
  { id: "eltk", name: "eltk", game: "osrs", twitch: "eltk", era: "current" },
  { id: "harryosrs", name: "harry_osrs", game: "osrs", twitch: "harry_osrs", era: "current" },
  { id: "mrnosleep", name: "MrNoSleep", game: "osrs", twitch: "mrnosleep", youtube: "MrNoSleep", era: "current" },
  { id: "lmgd1", name: "Lmgd1", game: "osrs", twitch: "lmgd1", era: "current" },
  { id: "brettdog", name: "Brettdog_", game: "osrs", twitch: "brettdog_", era: "current" },
  { id: "jcwrs", name: "JcwRS", game: "osrs", twitch: "jcwrs", youtube: "JcwRS", era: "current" },
  { id: "soyduro", name: "Soy_Duro", game: "osrs", twitch: "soy_duro", era: "current" },
  { id: "gingerbeardie", name: "GingerBeardie", game: "osrs", twitch: "gingerbeardie", youtube: "GingerBeardie", era: "current" },
  { id: "scottvc", name: "Scottvc", game: "osrs", twitch: "scottvc", youtube: "Scottvc", era: "current" },
  { id: "sixtyonem", name: "61M", game: "osrs", twitch: "61m", era: "current" },
  { id: "protoxx", name: "Protoxx", game: "rs3", twitch: "protoxx", x: "ProtoxxYT", youtube: "Protoxx", era: "current" },
  { id: "evillucario", name: "Evil Lucario", game: "rs3", twitch: "evillucario", youtube: "EvilLucario", era: "current" },
  { id: "ramenrs", name: "Ramen RS", game: "rs3", twitch: "ramenrs", youtube: "RamenRS", era: "current" },
  { id: "emma", name: "Emma", game: "osrs", twitch: "emma", era: "current" },
  { id: "mogtime", name: "MogTime", game: "osrs", twitch: "mogtime", youtube: "MogTime", era: "current" },
  { id: "purespam", name: "PureSpam", game: "osrs", twitch: "purespam", youtube: "PureSpam", era: "current" },
  { id: "heyjase", name: "Hey Jase", game: "osrs", twitch: "hey_jase", youtube: "HeyJase", era: "current" },
  { id: "ronplaysgames", name: "Ron Plays Games", game: "osrs", twitch: "ron_plays_games", youtube: "RonPlaysGames", era: "current" },
  { id: "mintmadcow", name: "MintMadCow", game: "osrs", twitch: "mintmadcow", youtube: "MintMadCow", era: "current" },
  { id: "tyla", name: "Tyla", game: "osrs", twitch: "tyla", era: "current" },
  { id: "mikars", name: "MikaRS", game: "osrs", twitch: "mikars", era: "current" },
  { id: "rigondeaux", name: "Rigondeaux", game: "osrs", twitch: "rigondeaux", era: "current" },
  { id: "dollblush", name: "dollblush", game: "osrs", twitch: "dollblush", era: "current" },
  { id: "zizaran", name: "Zizaran", game: "osrs", twitch: "zizaran", x: "Zizaran", era: "current" },
  { id: "nooblet", name: "Nooblet", game: "osrs", twitch: "nooblet", era: "current" },
  { id: "omid", name: "Omid", game: "rs3", twitch: "omid", youtube: "RunescapeOmid", era: "current" },
  { id: "rsgf", name: "rsgf", game: "rs3", twitch: "rsgf", era: "current" },
  { id: "moistbean", name: "MoistBean", game: "rs3", twitch: "moistbean", era: "current" },
  { id: "arislash", name: "AriSlash", game: "rs3", twitch: "arislash", era: "current" },
  { id: "mazhar", name: "Mazhar", game: "rs3", twitch: "mazhar", youtube: "Mazhar", era: "current" },
  { id: "hanarisu", name: "Hanarisu", game: "rs3", twitch: "hanarisu", era: "current" },
  { id: "dragonseancers", name: "DragonseanceRS", game: "rs3", twitch: "dragonseancers", era: "current" },
  { id: "kashstack", name: "KashStack", game: "rs3", twitch: "kashstack", era: "current" },
  { id: "doubleshinetv", name: "Doubleshine", game: "rs3", twitch: "doubleshinetv", era: "current" },
  { id: "weeklykiwi", name: "weeklykiwi", game: "rs3", twitch: "weeklykiwi", era: "current" },
];

