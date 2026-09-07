export type HeroChip = "OSRS" | "RS3" | "RSC";

export type HeroShot = {
  src: string;
  name: string;
  game: HeroChip;
};

/** Wide plates already on this origin. No live Wayback. */
export const HERO_OSRS: HeroShot[] = [
  { src: "/Falador.png", name: "Falador", game: "OSRS" },
  { src: "/locations/osrslumbridge.jpg", name: "Lumbridge", game: "OSRS" },
  { src: "/locations/osrsvarrock.jpg", name: "Varrock", game: "OSRS" },
  { src: "/locations/osrsedge.jpg", name: "Edgeville", game: "OSRS" },
  { src: "/Canifis.png", name: "Canifis", game: "OSRS" },
  { src: "/Catherby.png", name: "Catherby", game: "OSRS" },
  { src: "/Port_Sarim.png", name: "Port Sarim", game: "OSRS" },
  { src: "/Taverley.png", name: "Taverley", game: "OSRS" },
  { src: "/Burthorpe.png", name: "Burthorpe", game: "OSRS" },
  { src: "/era/osrs/falador.png", name: "Falador square", game: "OSRS" },
  { src: "/era/rs2/wilderness.jpg", name: "Wilderness", game: "OSRS" },
];

export const HERO_RS3: HeroShot[] = [
  { src: "/Prifddinas.png", name: "Prifddinas", game: "RS3" },
  { src: "/Menaphos.png", name: "Menaphos", game: "RS3" },
  { src: "/Daemonheim.png", name: "Daemonheim", game: "RS3" },
  { src: "/The_Lost_Grove.png", name: "The Lost Grove", game: "RS3" },
  { src: "/locations/lumbridge.jpg", name: "Lumbridge", game: "RS3" },
  { src: "/locations/falador.jpg", name: "Falador", game: "RS3" },
  { src: "/Canifis.png", name: "Canifis", game: "RS3" },
  { src: "/locations/senntisten.jpg", name: "Senntisten", game: "RS3" },
  { src: "/locations/anachronia.jpg", name: "Anachronia", game: "RS3" },
  { src: "/era/rs3/prifddinas.png", name: "Prifddinas gates", game: "RS3" },
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