export type XGame = "osrs" | "rs3" | "dw";

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

/** Official accounts plus public player handles we could confirm. Fan list. Not a rank. */
export const X_HALL: XVoice[] = [
  { id: "official-osrs", name: "Old School RuneScape", handle: "OldSchoolRS", game: "osrs", official: true },
  { id: "official-rs", name: "RuneScape", handle: "RuneScape", game: "rs3", official: true },
  { id: "official-dw", name: "RuneScape: Dragonwilds", handle: "RSDragonwilds", game: "dw", official: true },
  { id: "official-dw-jp", name: "RuneScape: Dragonwilds JP", handle: "RSDragonwildsJP", game: "dw", official: true },
  { id: "jagex", name: "Jagex", handle: "Jagex", game: "osrs", official: true },
  { id: "jagex-support", name: "Jagex Support", handle: "JagexSupport", game: "osrs", official: true },
  { id: "runefest", name: "RuneFest", handle: "RuneFest", game: "osrs", official: true },
  { id: "b0aty", name: "B0aty", handle: "B0aty", game: "osrs" },
  { id: "odablock", name: "Odablock", handle: "Odablock", game: "osrs" },
  { id: "torvesta", name: "Torvesta", handle: "Torvesta", game: "osrs" },
  { id: "settled", name: "Settled", handle: "SettledRS", game: "osrs" },
  { id: "cengineer", name: "C Engineer", handle: "C_EngineerRS", game: "osrs" },
  { id: "j1mmy", name: "J1mmy", handle: "J1mmyRS", game: "osrs" },
  { id: "sparcmac", name: "Sparc Mac", handle: "SparcmacLive", game: "osrs" },
  { id: "skillspecs", name: "Skill Specs", handle: "skill_specs", game: "osrs" },
  { id: "woox", name: "Woox", handle: "WooxSolo", game: "osrs" },
  { id: "ditter", name: "DitterBitter", handle: "DitterBitter", game: "osrs" },
  { id: "afriend", name: "A Friend", handle: "afriendrs", game: "osrs" },
  { id: "gnomonkey", name: "Gnomonkey", handle: "GnomonkeyRS", game: "osrs" },
  { id: "coxie", name: "Coxie", handle: "Coxie_rs", game: "osrs" },
  { id: "solomission", name: "SoloMission", handle: "SoloMission_OSR", game: "osrs" },
  { id: "mrmammal", name: "Mr Mammal", handle: "Mr_Mammal", game: "osrs" },
  { id: "muts", name: "Muts", handle: "MutsOSRS", game: "osrs" },
  { id: "wildmudkip", name: "WildMudkip", handle: "WildMudkip", game: "osrs" },
  { id: "thersguy", name: "TheRSGuy", handle: "TheRSguyy", game: "rs3" },
  { id: "willmissit", name: "RSWillMissIt", handle: "rswillmissit", game: "rs3" },
  { id: "protoxx", name: "Protoxx", handle: "ProtoxxYT", game: "rs3" },
  { id: "evscape", name: "EvScape", handle: "EVScapeOfficial", game: "rs3" },
  { id: "itrolledu", name: "iTrolledU", handle: "RSiTrolledU", game: "rs3" },
  { id: "wazzy", name: "Wazzy", handle: "WazzyRS", game: "rs3" },
  { id: "molgoatkirby", name: "molgoatkirby", handle: "MolGoatKirby", game: "rs3" },
];
