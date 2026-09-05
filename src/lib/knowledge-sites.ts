export type KnowledgeSite = {
  name: string;
  href: string;
  edition: "OSRS" | "RS3" | "Both";
  use: string;
};

export const KNOWLEDGE_SITES: KnowledgeSite[] = [
  {
    name: "Old School RuneScape Wiki",
    href: "https://oldschool.runescape.wiki/",
    edition: "OSRS",
    use: "First stop. Drop tables, quests, tiles, and the live money-making list.",
  },
  {
    name: "RuneScape Wiki",
    href: "https://runescape.wiki/",
    edition: "RS3",
    use: "Same job for RuneScape 3. Rotations, relics, and patch notes live here first.",
  },
  {
    name: "Official Old School",
    href: "https://oldschool.runescape.com/",
    edition: "OSRS",
    use: "News, polls, and the client the game expects.",
  },
  {
    name: "Official RuneScape",
    href: "https://www.runescape.com/",
    edition: "RS3",
    use: "Launcher, membership, and Sixth Age news.",
  },
  {
    name: "RuneLite",
    href: "https://runelite.net/",
    edition: "OSRS",
    use: "The client almost every Old School PvM and skilling stream uses.",
  },
  {
    name: "Wise Old Man",
    href: "https://wiseoldman.net/",
    edition: "OSRS",
    use: "Clan hiscores, competitions, and name tracking.",
  },
  {
    name: "TempleOSRS",
    href: "https://templeosrs.com/",
    edition: "OSRS",
    use: "Collection log and hiscores a lot of raid clans still check.",
  },
  {
    name: "PvM Encyclopedia",
    href: "https://pvme.io/",
    edition: "Both",
    use: "Discord + site. The rotation sheets high-level PvM teams actually open.",
  },
  {
    name: "OSRS Wiki calculators",
    href: "https://oldschool.runescape.wiki/w/Calculator",
    edition: "OSRS",
    use: "Skill, combat, and money calculators on the official wiki.",
  },
  {
    name: "RuneApps",
    href: "https://runeapps.org/",
    edition: "RS3",
    use: "Alt1 and the overlays RS3 PvM still runs.",
  },
  {
    name: "r/2007scape",
    href: "https://www.reddit.com/r/2007scape/",
    edition: "OSRS",
    use: "Patch talk and method arguments. Not a wiki. Still where the crowd is.",
  },
  {
    name: "r/runescape",
    href: "https://www.reddit.com/r/runescape/",
    edition: "RS3",
    use: "Same for RuneScape 3.",
  },
];
