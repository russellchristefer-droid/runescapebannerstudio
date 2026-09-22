/** Gielinor first. */
export const GAME_NAV = [
  ["/towns", "Towns"],
  ["/gods", "Gods"],
  ["/bosses", "Bosses"],
  ["/pvp", "PvP"],
  ["/classic", "Classic"],
] as const;

/** The product. Legal lives in the footer. */
export const STUDIO_NAV = [
  ["/", "Banner Studio"],
  ["/edit", "Clip Editor"],
  ["/brief", "Brief"],
] as const;

/** Footer ask is Cash App. Keep /donate as the same line. */
export const STUDIO_INDEX = [
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
