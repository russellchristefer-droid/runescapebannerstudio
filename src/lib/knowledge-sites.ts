export type KnowledgeSite = {
  name: string;
  href: string;
  group: "client" | "wiki" | "board";
  edition: "OSRS" | "RS3" | "Both" | "Classic";
  use: string;
};

export const KNOWLEDGE_SITES: KnowledgeSite[] = [
  {
    name: "RuneLite",
    href: "https://runelite.net/",
    group: "client",
    edition: "OSRS",
    use: "Third-party Old School client. Plugin Hub. Official rules still win.",
  },
  {
    name: "Alt1 Toolkit",
    href: "https://runeapps.org/",
    group: "client",
    edition: "RS3",
    use: "Overlays for RuneScape. Add-app configs. Does not click for you.",
  },
  {
    name: "Jagex Launcher",
    href: "https://www.jagex.com/launcher",
    group: "client",
    edition: "Both",
    use: "The official door for Old School and RuneScape on one machine.",
  },
  {
    name: "RuneScape: Dragonwilds",
    href: "https://dragonwilds.runescape.com/",
    group: "client",
    edition: "Both",
    use: "Official survival game in the same house. Not the Old School or RuneScape client.",
  },
  {
    name: "Desk sidecars on GitHub",
    href: "https://github.com/russellchristefer-droid/runescapebannerstudio#for-runescape-players--alt1-and-runelite",
    group: "client",
    edition: "Both",
    use: "This studio’s still compositor and clip bench for Alt1 and RuneLite. Not Plugin Hub.",
  },
  {
    name: "Old School RuneScape Wiki",
    href: "https://oldschool.runescape.wiki/",
    group: "wiki",
    edition: "OSRS",
    use: "First stop. Drop tables, quests, tiles, live money-making.",
  },
  {
    name: "RuneScape Wiki",
    href: "https://runescape.wiki/",
    group: "wiki",
    edition: "RS3",
    use: "Same job for RuneScape. Rotations and patch notes live here first.",
  },
  {
    name: "RuneScape Classic Wiki",
    href: "https://classic.runescape.wiki/",
    group: "wiki",
    edition: "Classic",
    use: "Worlds are closed. The letters still remember the walk.",
  },
  {
    name: "OSRS Wiki calculators",
    href: "https://oldschool.runescape.wiki/w/Calculator",
    group: "wiki",
    edition: "OSRS",
    use: "Skill, combat, and money calculators on the official wiki.",
  },
  {
    name: "Old School hiscores",
    href: "https://secure.runescape.com/m=hiscore_oldschool/overall",
    group: "wiki",
    edition: "OSRS",
    use: "Official board. This desk looks up names against it.",
  },
  {
    name: "RuneScape hiscores",
    href: "https://secure.runescape.com/m=hiscore/overall",
    group: "wiki",
    edition: "RS3",
    use: "Official board for the main client.",
  },
  {
    name: "Wise Old Man",
    href: "https://wiseoldman.net/",
    group: "board",
    edition: "OSRS",
    use: "Clan hiscores, competitions, name tracking. Not Jagex.",
  },
  {
    name: "TempleOSRS",
    href: "https://templeosrs.com/",
    group: "board",
    edition: "OSRS",
    use: "Collection log and hiscores a lot of raid clans still check.",
  },
  {
    name: "PvM Encyclopedia",
    href: "https://pvme.io/",
    group: "board",
    edition: "Both",
    use: "Community rotation sheets. Labelled unofficial.",
  },
  {
    name: "r/2007scape",
    href: "https://www.reddit.com/r/2007scape/",
    group: "board",
    edition: "OSRS",
    use: "Patch talk. Not a wiki.",
  },
  {
    name: "r/runescape",
    href: "https://www.reddit.com/r/runescape/",
    group: "board",
    edition: "RS3",
    use: "Same for RuneScape.",
  },
];
