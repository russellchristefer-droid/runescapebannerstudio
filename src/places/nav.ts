export const STUDIO_NAV = [
  ["/", "Banner Studio"],
  ["/edit", "Video editor"],
  ["/classic", "Classic"],
  ["/gods", "Gods"],
  ["/bosses", "Bosses"],
  ["/pvp", "PvP"],
  ["/clan-wars", "Clan Wars"],
  ["/monsters", "Bestiary"],
  ["/skills", "Skills"],
  ["/towns", "Towns"],
  ["/knowledge", "Sites"],
  ["/jmods", "Jagex directory"],
  ["/brief", "Brief"],
  ["/history", "History"],
  ["/chronicle", "Chronicle"],
  ["/streamers", "Twitch Streamers"],
  ["/youtubers", "YouTube Streamers"],
  ["/x-live", "X live"],
  ["/legal", "Legal"],
] as const;

export type PlaceSection = "towns" | "gods" | "bosses" | "pvp" | "clan-wars";

export const PLACE_SECTIONS: { id: PlaceSection; href: string; label: string }[] = [
  { id: "towns", href: "/towns", label: "Towns" },
  { id: "gods", href: "/gods", label: "Gods" },
  { id: "bosses", href: "/bosses", label: "Bosses" },
  { id: "pvp", href: "/pvp", label: "PvP" },
  { id: "clan-wars", href: "/clan-wars", label: "Clan Wars" },
];
