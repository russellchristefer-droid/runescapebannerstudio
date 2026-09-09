export type TubeGame = "osrs" | "rs3" | "both";
export type TubeEra = "official" | "foundation" | "current";

export type Youtuber = {
  id: string;
  name: string;
  game: TubeGame;
  youtube: string;
  era: TubeEra;
  official?: boolean;
};

export function tubeUrl(handle: string) {
  const raw = handle.trim().replace(/^https?:\/\/(www\.)?youtube\.com\//i, "");
  if (!raw) return "";
  if (raw.startsWith("c/") || raw.startsWith("channel/") || raw.startsWith("user/")) {
    return `https://www.youtube.com/${raw.replace(/^\/+/, "")}`;
  }
  return `https://www.youtube.com/@${raw.replace(/^@/, "")}`;
}

export const YOUTUBERS: Youtuber[] = [
  { id: "osrs-off", name: "Old School RuneScape", game: "osrs", youtube: "channel/UC0j1MpbiTFHYrUjOTwifW_w", era: "official", official: true },
  { id: "rs-off", name: "RuneScape", game: "rs3", youtube: "RuneScape", era: "official", official: true },
  { id: "dw-off", name: "RuneScape: Dragonwilds", game: "both", youtube: "RSDragonwilds", era: "official", official: true },
  { id: "afriend", name: "A Friend", game: "both", youtube: "AFriend", era: "foundation" },
  { id: "sparcmac", name: "Sparc Mac", game: "osrs", youtube: "SparcMac", era: "foundation" },
  { id: "slayermusiq1", name: "Slayermusiq1", game: "osrs", youtube: "slayermusiq1", era: "foundation" },
  { id: "torvesta", name: "Torvesta", game: "osrs", youtube: "torvestars", era: "foundation" },
  { id: "nightmarerh", name: "NightmareRH", game: "osrs", youtube: "NightmareRH", era: "foundation" },
  { id: "thecompletor", name: "The Completor", game: "osrs", youtube: "TheCompletor", era: "foundation" },
  { id: "mrnosleep", name: "Mr No Sleep", game: "osrs", youtube: "MrNoSleep", era: "foundation" },
  { id: "chrisarchie", name: "Chris Archie", game: "osrs", youtube: "ChrisArchieRS", era: "foundation" },
  { id: "runeshark", name: "RuneShark", game: "osrs", youtube: "RuneSharkVideos", era: "foundation" },
  { id: "odablock", name: "Odablock", game: "osrs", youtube: "Odablock", era: "current" },
  { id: "faux", name: "Faux", game: "osrs", youtube: "Faux", era: "current" },
  { id: "j1mmy", name: "J1mmy", game: "osrs", youtube: "J1mmy", era: "current" },
  { id: "soup", name: "Soup", game: "osrs", youtube: "SoupRS", era: "current" },
  { id: "theoatrix", name: "Theoatrix", game: "osrs", youtube: "TheoatrixOSRS", era: "current" },
  { id: "skillspecs", name: "Skill Specs", game: "osrs", youtube: "skillspecs", era: "current" },
  { id: "cengineer", name: "C Engineer", game: "osrs", youtube: "CEngineer", era: "current" },
  { id: "gnomonkey", name: "Gnomonkey", game: "osrs", youtube: "Gnomonkey", era: "current" },
  { id: "alkan", name: "Alkan", game: "osrs", youtube: "AlkanRS", era: "current" },
  { id: "solomission", name: "SoloMission", game: "osrs", youtube: "SoloMission", era: "current" },
  { id: "flippingosrs", name: "FlippingOldschool", game: "osrs", youtube: "FlippingOldschool", era: "current" },
  { id: "verf", name: "Verf", game: "osrs", youtube: "Verf", era: "current" },
  { id: "coxie", name: "Coxie", game: "osrs", youtube: "Coxie", era: "current" },
  { id: "sicknerd", name: "Sick_Nerd", game: "osrs", youtube: "SickNerd", era: "current" },
  { id: "purpp", name: "Purpp", game: "osrs", youtube: "Purpp", era: "current" },
  { id: "thersguy", name: "TheRSGuy", game: "rs3", youtube: "TheRSGuy", era: "current" },
  { id: "evscape", name: "EvScape", game: "rs3", youtube: "EvScape", era: "current" },
  { id: "ramenrs", name: "Ramen RS", game: "rs3", youtube: "RamenRS", era: "current" },
  { id: "protoxx", name: "Protoxx", game: "rs3", youtube: "Protoxx", era: "current" },
  { id: "maikeru", name: "Maikeru", game: "rs3", youtube: "Maikeru", era: "current" },
  { id: "ashshley", name: "AshShley", game: "rs3", youtube: "AshShley", era: "current" },
  { id: "chevalric", name: "ChevalricRS", game: "rs3", youtube: "ChevalricRS", era: "current" },
  { id: "chillzrs", name: "ChillzRS", game: "rs3", youtube: "ChillzRS", era: "current" },
  { id: "basetank", name: "Base Tank", game: "rs3", youtube: "BaseTank", era: "current" },
  { id: "carguyrs", name: "CarguyRS", game: "rs3", youtube: "CarguyRS", era: "current" },
  { id: "mukluk", name: "Mukluk", game: "rs3", youtube: "Mukluk", era: "current" },
  { id: "willmissit", name: "WillMissIt", game: "rs3", youtube: "rswillmissit", era: "current" },
  { id: "b0aty", name: "B0aty", game: "osrs", youtube: "B0aty", era: "current" },
  { id: "settled", name: "Settled", game: "osrs", youtube: "Settled", era: "current" },
  { id: "framed", name: "Framed", game: "osrs", youtube: "FramedYT", era: "foundation" },
  { id: "woox", name: "Woox", game: "osrs", youtube: "Woox", era: "foundation" },
  { id: "mrmammal", name: "Mr Mammal", game: "osrs", youtube: "MrMammal", era: "current" },
  { id: "25buttholes", name: "25 Buttholes", game: "osrs", youtube: "c/25buttholes", era: "current" },
  { id: "rendi", name: "Rendi", game: "osrs", youtube: "RendiMento", era: "current" },
  { id: "ditter", name: "DitterBitter", game: "osrs", youtube: "DitterBitter", era: "current" },
  { id: "ricecup", name: "Rice Cup", game: "osrs", youtube: "RiceCup", era: "current" },
  { id: "mmorpg", name: "Mmorpg", game: "osrs", youtube: "Mmorpg", era: "current" },
  { id: "hofie", name: "Hofie", game: "osrs", youtube: "Hofie", era: "current" },
  { id: "oziris", name: "Oziris", game: "osrs", youtube: "Oziris", era: "current" },
  { id: "wildmudkip", name: "WildMudkip", game: "osrs", youtube: "WildMudkip", era: "current" },
  { id: "zulu", name: "Zulu", game: "osrs", youtube: "ZuluOSRS", era: "current" },
  { id: "kempq", name: "KempQ", game: "osrs", youtube: "KempQ", era: "current" },
  { id: "unit", name: "Unit", game: "osrs", youtube: "UnitTheTV", era: "current" },
  { id: "bruzz", name: "Bruzz", game: "osrs", youtube: "Bruzz", era: "current" },
  { id: "heati", name: "Heati", game: "osrs", youtube: "Heati", era: "current" },
  { id: "skiddler", name: "Skiddler", game: "osrs", youtube: "Skiddler", era: "current" },
  { id: "tidlenz", name: "Tidlenz", game: "osrs", youtube: "Tidlenz", era: "current" },
  { id: "dillerz", name: "Dillerz", game: "osrs", youtube: "Dillerz", era: "current" },
  { id: "raikesy", name: "Raikesy", game: "osrs", youtube: "Raikesy", era: "foundation" },
  { id: "palumor", name: "Palumor", game: "osrs", youtube: "Palumor", era: "current" },
  { id: "westham", name: "Westham", game: "osrs", youtube: "Westham", era: "current" },
  { id: "muts", name: "Muts", game: "osrs", youtube: "Muts", era: "current" },
  { id: "hexis", name: "Hexis", game: "rs3", youtube: "HexisRS", era: "current" },
  { id: "evillucario", name: "Evil Lucario", game: "rs3", youtube: "EvilLucario", era: "current" },
  { id: "wazzy", name: "Wazzy", game: "rs3", youtube: "WazzyRS", era: "current" },
  { id: "puprs", name: "PupRs", game: "rs3", youtube: "PupRs", era: "current" },
  { id: "itrolledu", name: "iTrolledU", game: "rs3", youtube: "iTrolledU", era: "current" },
  { id: "molgoatkirby", name: "molgoatkirby", game: "rs3", youtube: "molgoatkirby", era: "current" },
  { id: "spongers", name: "SpongeRS", game: "rs3", youtube: "SpongeRS", era: "current" },
];
