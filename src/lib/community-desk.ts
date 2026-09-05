export type DeskLink = { name: string; href: string; note: string };

export const DESK_GROUPS: { title: string; items: DeskLink[] }[] = [
  {
    title: "Streamer desk",
    items: [
      { name: "Jagex Launcher", href: "https://www.jagex.com/launcher", note: "Both games" },
      { name: "RuneLite", href: "https://runelite.net/", note: "Old School" },
      { name: "Alt1", href: "https://runeapps.org/alt1", note: "RS3 overlay" },
      { name: "OBS", href: "https://obsproject.com/", note: "Capture" },
      { name: "Twitch dashboard", href: "https://www.twitch.tv/broadcast", note: "Go live" },
      { name: "YouTube Studio", href: "https://studio.youtube.com/", note: "Live and VOD" },
      { name: "OSRS category", href: "https://www.twitch.tv/directory/category/old-school-runescape", note: "Twitch" },
      { name: "RuneScape category", href: "https://www.twitch.tv/directory/category/runescape", note: "Twitch" },
      { name: "LootScape", href: "https://www.runescape.com/twitch", note: "Drops" },
      { name: "Stream notes", href: "/edit#stream-desk", note: "This site" },
    ],
  },
];
