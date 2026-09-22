/** Gielinor first. */
export const GAME_NAV = [
  ["/towns", "Towns"],
  ["/gods", "Gods"],
  ["/bosses", "Bosses"],
  ["/pvp", "PvP"],
  ["/classic", "Classic"],
] as const;

/** The product. */
export const STUDIO_NAV = [
  ["/", "Banner Studio"],
  ["/edit", "Clip Editor"],
  ["/brief", "Brief"],
  ["/legal", "Legal"],
] as const;

/** Footer product only. Atlas stays in GAME_NAV. */
export const STUDIO_INDEX = [
  ["/", "Banner Studio"],
  ["/edit", "Clip Editor"],
  ["/brief", "Brief"],
  ["/legal", "Legal"],
  ["/donate", "Donate"],
] as const;

export type PlaceSection = "towns" | "gods" | "bosses" | "pvp" | "clan-wars";

export const PLACE_SECTIONS: { id: PlaceSection; href: string; label: string }[] = [
  { id: "towns", href: "/towns", label: "Towns" },
  { id: "gods", href: "/gods", label: "Gods" },
  { id: "bosses", href: "/bosses", label: "Bosses" },
  { id: "pvp", href: "/pvp", label: "PvP" },
  { id: "clan-wars", href: "/clan-wars", label: "Clan Wars" },
];
