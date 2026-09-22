/** Top rail — the desk, not a wiki sitemap. */
export const STUDIO_NAV = [
  ["/", "Banner Studio"],
  ["/edit", "Clip Bench"],
  ["/towns", "Towns"],
  ["/gods", "Gods"],
  ["/bosses", "Bosses"],
  ["/brief", "Brief"],
  ["/legal", "Legal"],
] as const;

/** Everything else stays. Footer Index. */
export const STUDIO_INDEX = [
  ["/classic", "Classic"],
  ["/pvp", "PvP"],
  ["/clan-wars", "Clan Wars"],
  ["/monsters", "Bestiary"],
  ["/skills", "Skills"],
  ["/knowledge", "Sites"],
  ["/jmods", "Jagex directory"],
  ["/history", "History"],
  ["/chronicle", "Chronicle"],
  ["/discord", "Discord"],
  ["/stream", "How to go live"],
] as const;

export type PlaceSection = "towns" | "gods" | "bosses" | "pvp" | "clan-wars";

export const PLACE_SECTIONS: { id: PlaceSection; href: string; label: string }[] = [
  { id: "towns", href: "/towns", label: "Towns" },
  { id: "gods", href: "/gods", label: "Gods" },
  { id: "bosses", href: "/bosses", label: "Bosses" },
  { id: "pvp", href: "/pvp", label: "PvP" },
  { id: "clan-wars", href: "/clan-wars", label: "Clan Wars" },
];
