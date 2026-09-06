export type HeroChip = "OSRS" | "RS3" | "RSC";

export type HeroShot = {
  src: string;
  name: string;
  game: HeroChip;
};

/** Curated wide town plates. No HUD, no bag, no welcome parchment. */
export const HERO_OSRS: HeroShot[] = [
  { src: "/Falador.png", name: "Falador", game: "OSRS" },
  { src: "/locations/osrslumbridge.jpg", name: "Lumbridge", game: "OSRS" },
  { src: "/locations/osrsvarrock.jpg", name: "Varrock", game: "OSRS" },
  { src: "/locations/osrsedge.jpg", name: "Edgeville", game: "OSRS" },
  { src: "/locations/osrsprif.jpg", name: "Prifddinas", game: "OSRS" },
  { src: "/locations/osrscani.jpg", name: "Canifis", game: "OSRS" },
];

export const HERO_RS3: HeroShot[] = [
  { src: "/Prifddinas.png", name: "Prifddinas", game: "RS3" },
  { src: "/Menaphos.png", name: "Menaphos", game: "RS3" },
  { src: "/Daemonheim.png", name: "Daemonheim", game: "RS3" },
  { src: "/locations/lumbridge.jpg", name: "Lumbridge", game: "RS3" },
  { src: "/locations/falador.jpg", name: "Falador", game: "RS3" },
  { src: "/Canifis.png", name: "Canifis", game: "RS3" },
  { src: "/locations/senntisten.jpg", name: "Senntisten", game: "RS3" },
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