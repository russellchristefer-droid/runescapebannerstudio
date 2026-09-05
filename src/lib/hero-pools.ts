export type HeroChip = "OSRS" | "RS3" | "RSC";

export type HeroShot = {
  src: string;
  name: string;
  game: HeroChip;
};

/** Curated wide town plates. No HUD, no bag, no welcome parchment. */
export const HERO_OSRS: HeroShot[] = [
  { src: "/stills/osrs/osrs-lumbridge-a.jpg", name: "Lumbridge", game: "OSRS" },
  { src: "/stills/osrs/osrs-varrock-a.jpg", name: "Varrock", game: "OSRS" },
  { src: "/stills/osrs/osrs-falador-a.jpg", name: "Falador", game: "OSRS" },
  { src: "/locations/osrsedge.jpg", name: "Edgeville", game: "OSRS" },
  { src: "/locations/osrscani.jpg", name: "Canifis", game: "OSRS" },
  { src: "/locations/osrsprif.jpg", name: "Prifddinas", game: "OSRS" },
  { src: "/locations/hosidius.jpg", name: "Hosidius", game: "OSRS" },
];

export const HERO_RS3: HeroShot[] = [
  { src: "/stills/rs3/rs3-lumbridge-a.jpg", name: "Lumbridge", game: "RS3" },
  { src: "/stills/rs3/rs3-varrock-a.jpg", name: "Varrock", game: "RS3" },
  { src: "/stills/rs3/rs3-falador-a.jpg", name: "Falador", game: "RS3" },
  { src: "/locations/prifddinas.jpg", name: "Prifddinas", game: "RS3" },
  { src: "/locations/senntisten.jpg", name: "Senntisten", game: "RS3" },
  { src: "/locations/edgeville.jpg", name: "Edgeville", game: "RS3" },
];

export const HERO_RSC: HeroShot[] = [
  { src: "/stills/rsc/rsc-lumbridge.jpg", name: "Lumbridge", game: "RSC" },
  { src: "/stills/rsc/rsc-varrock.jpg", name: "Varrock", game: "RSC" },
  { src: "/stills/rsc/rsc-draynor.jpg", name: "Draynor", game: "RSC" },
  { src: "/stills/rsc/rsc-edgeville.jpg", name: "Edgeville", game: "RSC" },
];

export function heroPool(chip: HeroChip): HeroShot[] {
  if (chip === "RS3") return HERO_RS3;
  if (chip === "RSC") return HERO_RSC;
  return HERO_OSRS;
}

export function gameLabel(chip: HeroChip) {
  if (chip === "RSC") return "RuneScape Classic";
  if (chip === "RS3") return "RuneScape";
  return "Old School RuneScape";
}