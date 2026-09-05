export type Streamer = {
  name: string;
  edition: "OSRS" | "RS3" | "Official";
  note: string;
  twitch?: string;
  youtube?: string;
  x?: string;
};

export const DIRECTORIES = [
  {
    name: "Twitch Old School",
    href: "https://www.twitch.tv/directory/category/old-school-runescape",
  },
  {
    name: "Twitch RuneScape",
    href: "https://www.twitch.tv/directory/category/runescape",
  },
  {
    name: "TwitchMetrics OSRS",
    href: "https://www.twitchmetrics.net/channels/viewership?game=Old+School+RuneScape",
  },
  {
    name: "TwitchMetrics RS3",
    href: "https://www.twitchmetrics.net/channels/viewership?game=RuneScape",
  },
];

export function directoryWeek(date = new Date()) {
  const tmp = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = tmp.getUTCDay() || 7;
  tmp.setUTCDate(tmp.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(tmp.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((tmp.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${tmp.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

export const STREAMERS: Streamer[] = [
  {
    name: "Old School RuneScape",
    edition: "Official",
    note: "Official Old School",
    twitch: "https://www.twitch.tv/oldschoolrs",
    youtube: "https://www.youtube.com/oldschoolrunescape",
  },
  {
    name: "RuneScape",
    edition: "Official",
    note: "Official RuneScape",
    twitch: "https://www.twitch.tv/runescape",
    youtube: "https://www.youtube.com/runescape",
    x: "https://x.com/RuneScape",
  },
  {
    name: "Faux",
    edition: "OSRS",
    note: "Old School",
    twitch: "https://www.twitch.tv/faux",
  },
  {
    name: "B0aty",
    edition: "OSRS",
    note: "Old School",
    twitch: "https://www.twitch.tv/b0aty",
    x: "https://x.com/B0aty",
  },
  {
    name: "Sick_Nerd",
    edition: "OSRS",
    note: "Old School",
    twitch: "https://www.twitch.tv/sick_nerd",
    youtube: "https://www.youtube.com/sick_nerd",
  },
  {
    name: "Purpp",
    edition: "OSRS",
    note: "Old School",
    twitch: "https://www.twitch.tv/purpp",
  },
  {
    name: "Mr_Mammal",
    edition: "OSRS",
    note: "Old School",
    twitch: "https://www.twitch.tv/mr_mammal",
  },
  {
    name: "C Engineer",
    edition: "OSRS",
    note: "Old School",
    youtube: "https://www.youtube.com/@CEngineer",
    twitch: "https://www.twitch.tv/c_engineer",
  },
  {
    name: "Framed",
    edition: "OSRS",
    note: "Old School",
    youtube: "https://www.youtube.com/@FramedYT",
    twitch: "https://www.twitch.tv/framed",
  },
  {
    name: "Sparc Mac",
    edition: "OSRS",
    note: "Old School",
    youtube: "https://www.youtube.com/c/SparcMac",
  },
  {
    name: "J1mmy",
    edition: "OSRS",
    note: "Old School",
    youtube: "https://www.youtube.com/@J1mmy",
  },
  {
    name: "Theoatrix",
    edition: "OSRS",
    note: "Old School",
    youtube: "https://www.youtube.com/@TheoatrixOSRS",
  },
  {
    name: "Slayermusiq1",
    edition: "OSRS",
    note: "Old School",
    youtube: "https://www.youtube.com/slayermusiq1",
  },
  {
    name: "Skill Specs",
    edition: "OSRS",
    note: "Old School",
    youtube: "https://www.youtube.com/skillspecs",
  },
  {
    name: "A Friend",
    edition: "OSRS",
    note: "Old School",
    youtube: "https://www.youtube.com/@AFriend",
  },
  {
    name: "Torvesta",
    edition: "OSRS",
    note: "Old School",
    youtube: "https://www.youtube.com/torvestars",
  },
  {
    name: "Settled",
    edition: "OSRS",
    note: "Old School",
    twitch: "https://www.twitch.tv/settled",
  },
  {
    name: "Soup",
    edition: "OSRS",
    note: "Old School",
    twitch: "https://www.twitch.tv/soup",
  },
  {
    name: "Odablock",
    edition: "OSRS",
    note: "Old School",
    twitch: "https://www.twitch.tv/odablock",
  },
  {
    name: "25 Buttholes",
    edition: "OSRS",
    note: "Old School",
    youtube: "https://www.youtube.com/c/25buttholes",
  },
  {
    name: "Woox",
    edition: "OSRS",
    note: "Old School",
    twitch: "https://www.twitch.tv/wooxsolo",
  },
  {
    name: "Gnomonkey",
    edition: "OSRS",
    note: "Old School",
    twitch: "https://www.twitch.tv/gnomonkey",
  },
  {
    name: "Rendi",
    edition: "OSRS",
    note: "Old School",
    youtube: "https://www.youtube.com/@RendiMento",
    twitch: "https://www.twitch.tv/rendimento",
  },
  {
    name: "TheRSGuy",
    edition: "RS3",
    note: "RuneScape 3",
    twitch: "https://www.twitch.tv/thersguy",
    youtube: "https://www.youtube.com/@TheRSGuy",
    x: "https://x.com/TheRSguyy",
  },
  {
    name: "Wazzy",
    edition: "RS3",
    note: "RuneScape 3",
    twitch: "https://www.twitch.tv/wazzy",
    youtube: "https://www.youtube.com/@WazzyRS",
    x: "https://x.com/WazzyRS",
  },
  {
    name: "Maikeru",
    edition: "RS3",
    note: "RuneScape 3",
    twitch: "https://www.twitch.tv/maikeru",
    youtube: "https://www.youtube.com/maikerurs",
  },
  {
    name: "couchy",
    edition: "RS3",
    note: "RuneScape 3",
    twitch: "https://www.twitch.tv/couchy",
  },
  {
    name: "PupRs",
    edition: "RS3",
    note: "RuneScape 3",
    twitch: "https://www.twitch.tv/puprs",
    x: "https://x.com/Puprs1",
  },
  {
    name: "Protoxx",
    edition: "RS3",
    note: "RuneScape 3",
    twitch: "https://www.twitch.tv/protoxx",
    youtube: "https://www.youtube.com/@ProtoxxGaming",
  },
  {
    name: "Evil Lucario",
    edition: "RS3",
    note: "RuneScape 3",
    youtube: "https://www.youtube.com/@EvilLucario",
    twitch: "https://www.twitch.tv/evillucario",
  },
  {
    name: "Alkan",
    edition: "RS3",
    note: "RuneScape 3",
    twitch: "https://www.twitch.tv/alkan",
  },
  {
    name: "Hexis",
    edition: "RS3",
    note: "RuneScape 3",
    twitch: "https://www.twitch.tv/hexis",
    youtube: "https://www.youtube.com/@HexisRS",
  },
  {
    name: "Ramen RS",
    edition: "RS3",
    note: "RuneScape 3",
    youtube: "https://www.youtube.com/@RamenRS",
  },
  {
    name: "DitterBitter",
    edition: "OSRS",
    note: "Old School",
    twitch: "https://www.twitch.tv/ditterbitter",
  },
  {
    name: "Mmorpg",
    edition: "OSRS",
    note: "Old School",
    twitch: "https://www.twitch.tv/mmorpg",
  },
  {
    name: "Rice Cup",
    edition: "OSRS",
    note: "Old School",
    twitch: "https://www.twitch.tv/ricecup",
  },
  {
    name: "Coxie",
    edition: "OSRS",
    note: "Old School",
    twitch: "https://www.twitch.tv/coxie",
  },
  {
    name: "Verzide",
    edition: "OSRS",
    note: "Old School",
    twitch: "https://www.twitch.tv/verzide",
  },
  {
    name: "KempQ",
    edition: "OSRS",
    note: "Old School",
    twitch: "https://www.twitch.tv/kempq",
  },
  {
    name: "FlippingOldschool",
    edition: "OSRS",
    note: "Old School",
    twitch: "https://www.twitch.tv/flippingoldschool",
    youtube: "https://www.youtube.com/@FlippingOldschool",
  },
  {
    name: "Manked",
    edition: "OSRS",
    note: "Old School",
    twitch: "https://www.twitch.tv/manked",
  },
  {
    name: "Gunschilli",
    edition: "OSRS",
    note: "Old School",
    twitch: "https://www.twitch.tv/gunschilli",
  },
  {
    name: "Bruzz",
    edition: "OSRS",
    note: "Old School",
    twitch: "https://www.twitch.tv/bruzz",
  },
  {
    name: "Jepk",
    edition: "OSRS",
    note: "Old School",
    twitch: "https://www.twitch.tv/jepk",
  },
  {
    name: "Unit",
    edition: "OSRS",
    note: "Old School",
    twitch: "https://www.twitch.tv/unitthetv",
  },
  {
    name: "Rageface",
    edition: "RS3",
    note: "RuneScape 3",
    twitch: "https://www.twitch.tv/rageface",
  },
  {
    name: "Acidia",
    edition: "RS3",
    note: "RuneScape 3",
    twitch: "https://www.twitch.tv/acidia",
  },
  {
    name: "Heirloom",
    edition: "RS3",
    note: "RuneScape 3",
    twitch: "https://www.twitch.tv/heirloom",
  },
  {
    name: "Grodoto",
    edition: "RS3",
    note: "RuneScape 3",
    twitch: "https://www.twitch.tv/grodoto",
  },
  {
    name: "SpongeRS",
    edition: "RS3",
    note: "RuneScape 3",
    twitch: "https://www.twitch.tv/spongers",
  },
  {
    name: "ImNooblet",
    edition: "RS3",
    note: "RuneScape 3",
    twitch: "https://www.twitch.tv/imnooblet",
  },
  {
    name: "Mukluk",
    edition: "RS3",
    note: "RuneScape 3",
    twitch: "https://www.twitch.tv/mukluk",
  },
  {
    name: "WillMissIt",
    edition: "RS3",
    note: "RuneScape 3",
    twitch: "https://www.twitch.tv/rswillmissit",
  },
];

