export type JagexLink = {
  name: string;
  href: string;
  label: string;
  note: string;
};

export const JAGEX_SOCIAL: JagexLink[] = [
  { name: "Old School Twitch", href: "https://www.twitch.tv/oldschoolrs", label: "Twitch", note: "Official Old School live" },
  { name: "RuneScape Twitch", href: "https://www.twitch.tv/runescape", label: "Twitch", note: "Official RuneScape live" },
  { name: "Old School YouTube", href: "https://www.youtube.com/@OldSchoolRuneScape", label: "YouTube", note: "Official Old School channel" },
  { name: "RuneScape YouTube", href: "https://www.youtube.com/@RuneScape", label: "YouTube", note: "Official RuneScape channel" },
  { name: "Old School Discord", href: "https://discord.com/invite/osrs", label: "Discord", note: "Official Old School server" },
  { name: "RuneScape Discord", href: "https://discord.com/invite/rs", label: "Discord", note: "Official RuneScape server" },
  { name: "Old School Instagram", href: "https://www.instagram.com/oldschool.runescape/", label: "Instagram", note: "Official Old School" },
  { name: "RuneScape Instagram", href: "https://www.instagram.com/runescape/", label: "Instagram", note: "Official RuneScape" },
  { name: "Old School Facebook", href: "https://www.facebook.com/OfficialOldSchoolRuneScape", label: "Facebook", note: "Official Old School" },
  { name: "RuneScape Facebook", href: "https://www.facebook.com/RuneScape", label: "Facebook", note: "Official RuneScape" },
  { name: "r/2007scape", href: "https://www.reddit.com/r/2007scape/", label: "Reddit", note: "Player board. Jagex posts here." },
  { name: "r/runescape", href: "https://www.reddit.com/r/runescape/", label: "Reddit", note: "Player board. Jagex posts here." },
  { name: "Support", href: "https://support.runescape.com/hc/en-gb", label: "Support", note: "Account help. Not a J-Mod mention." },
];

  name: string;
  handle: string;
  role: string;
};

export const JAGEX_X_OFFICIAL: JagexX[] = [
  { name: "Old School RuneScape", handle: "OldSchoolRS", role: "Official Old School account" },
  { name: "RuneScape", handle: "RuneScape", role: "Official RuneScape account" },
  { name: "Jagex", handle: "Jagex", role: "Company account" },
  { name: "Jagex Support", handle: "JagexSupport", role: "Points at the support site. Not a ban appeal inbox." },
  { name: "RuneFest", handle: "RuneFest", role: "Official event account" },
  { name: "RuneScape: Dragonwilds", handle: "RSDragonwilds", role: "Official Dragonwilds account" },
  { name: "Jagex Careers", handle: "JagexCareers", role: "Jobs. Not account recovery." },
];

export const JAGEX_X_MODS: JagexX[] = [
  { name: "Mod Ash", handle: "JagexAsh", role: "Old School senior product" },
  { name: "Mod Kieren", handle: "JagexKieren", role: "Old School creative director" },
  { name: "Mod Ayiza", handle: "JagexAyiza", role: "Old School community" },
  { name: "Mod Light", handle: "JagexLight", role: "Old School community" },
  { name: "Mod Blossom", handle: "JagexBlossom", role: "Old School community" },
  { name: "Mod Ed", handle: "JagexEd", role: "Old School narrative" },
  { name: "Mod Arcane", handle: "JagexArcane", role: "Old School systems" },
  { name: "Mod Sova", handle: "JagexSova", role: "Old School content" },
  { name: "Mod West", handle: "JagexWest", role: "Old School art" },
  { name: "Mod Boko", handle: "JagexBoko", role: "Old School engineering" },
  { name: "Mod Curse", handle: "JagexCurse", role: "Old School QA" },
  { name: "Mod Nox", handle: "JagexNox", role: "Old School QA" },
  { name: "Mod Bruno", handle: "JagexBruno", role: "Old School QA" },
  { name: "Mod Archie", handle: "JagexArchie", role: "Video" },
  { name: "Mod Ramen", handle: "JagexRamen", role: "RuneScape principal design" },
  { name: "Mod Ryan", handle: "JagexRyan", role: "RuneScape creative" },
];
