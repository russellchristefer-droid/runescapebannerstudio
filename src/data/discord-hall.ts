export type DiscordGame = "osrs" | "rs3" | "dw" | "both";

export type DiscordDoor = {
  id: string;
  name: string;
  href: string;
  game: DiscordGame;
  official?: boolean;
  note: string;
};

export function discordGameLabel(game: DiscordGame) {
  if (game === "rs3") return "RuneScape";
  if (game === "dw") return "Dragonwilds";
  if (game === "both") return "Both";
  return "Old School";
}

/** Public invites we could confirm. Official first. Not a clan list. */
export const DISCORD_HALL: DiscordDoor[] = [
  {
    id: "osrs",
    name: "Old School RuneScape",
    href: "https://discord.com/invite/osrs",
    game: "osrs",
    official: true,
    note: "Official Old School server. J-Mods post here. Not Support.",
  },
  {
    id: "rs",
    name: "RuneScape",
    href: "https://discord.com/invite/rs",
    game: "rs3",
    official: true,
    note: "Official RuneScape server. Same house, different grammar.",
  },
  {
    id: "dw",
    name: "RuneScape: Dragonwilds",
    href: "https://discord.com/invite/rsdragonwilds",
    game: "dw",
    official: true,
    note: "Official Dragonwilds server. Not the MMO client.",
  },
  {
    id: "wiki",
    name: "RuneScape Wiki",
    href: "https://discord.com/invite/runescapewiki",
    game: "both",
    note: "Wiki editors. Old School, RuneScape, and Classic rooms. Not Jagex.",
  },
  {
    id: "runelite",
    name: "RuneLite",
    href: "https://runelite.net/discord",
    game: "osrs",
    note: "Third-party client. Invite is on runelite.net. Official rules still win.",
  },
  {
    id: "wom",
    name: "Wise Old Man",
    href: "https://discord.com/invite/Ky5vNt2",
    game: "osrs",
    note: "Hiscores and group tracker. Not Jagex.",
  },
  {
    id: "pvme",
    name: "PvM Encyclopedia",
    href: "https://discord.com/invite/pvme",
    game: "both",
    note: "Community rotation sheets. Labelled unofficial.",
  },
];
