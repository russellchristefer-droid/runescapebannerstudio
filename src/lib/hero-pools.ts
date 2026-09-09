export type HeroChip = "OSRS" | "RS3" | "RSC";

export type HeroShot = {
  src: string;
  name: string;
  game: HeroChip;
};

/** Edition-correct plates only. No live Wayback. */
export const HERO_OSRS: HeroShot[] = [
  { src: "/locations/osrslumbridge.jpg", name: "Lumbridge", game: "OSRS" },
  { src: "/locations/osrsvarrock.jpg", name: "Varrock", game: "OSRS" },
  { src: "/locations/osrs-falador-a.jpg", name: "Falador", game: "OSRS" },
  { src: "/locations/osrsedge.jpg", name: "Edgeville", game: "OSRS" },
  { src: "/locations/osrscani.jpg", name: "Canifis", game: "OSRS" },
  { src: "/locations/osrscath.jpg", name: "Catherby", game: "OSRS" },
  { src: "/locations/osrsport.jpg", name: "Port Sarim", game: "OSRS" },
  { src: "/locations/osrsburth.jpg", name: "Burthorpe", game: "OSRS" },
  { src: "/locations/osrstav.jpg", name: "Taverley", game: "OSRS" },
  { src: "/locations/osrsard.jpg", name: "Ardougne", game: "OSRS" },
  { src: "/locations/osrsalk.jpg", name: "Al Kharid", game: "OSRS" },
  { src: "/locations/osrsseers.jpg", name: "Seers' Village", game: "OSRS" },
  { src: "/locations/osrszanaris.jpg", name: "Zanaris", game: "OSRS" },
  { src: "/locations/osrsprif.jpg", name: "Prifddinas", game: "OSRS" },
];

export const HERO_RS3: HeroShot[] = [
  { src: "/locations/prifddinas.jpg", name: "Prifddinas", game: "RS3" },
  { src: "/locations/menaphos.jpg", name: "Menaphos", game: "RS3" },
  { src: "/locations/daemonheim.jpg", name: "Daemonheim", game: "RS3" },
  { src: "/locations/lostgrove.jpg", name: "Lost Grove", game: "RS3" },
  { src: "/locations/senntisten.jpg", name: "Senntisten", game: "RS3" },
  { src: "/locations/anachronia.jpg", name: "Anachronia", game: "RS3" },
  { src: "/locations/fortforinthry.jpg", name: "Fort Forinthry", game: "RS3" },
  { src: "/locations/rs3-lumbridge-a.jpg", name: "Lumbridge", game: "RS3" },
  { src: "/locations/rs3-varrock-a.jpg", name: "Varrock", game: "RS3" },
  { src: "/locations/rs3-falador-a.jpg", name: "Falador", game: "RS3" },
];

export const HERO_RSC: HeroShot[] = [
  { src: "/stills/rsc/rsc-lumbridge.jpg", name: "Lumbridge", game: "RSC" },
  { src: "/stills/rsc/rsc-varrock.jpg", name: "Varrock", game: "RSC" },
  { src: "/stills/rsc/rsc-draynor.jpg", name: "Draynor", game: "RSC" },
  { src: "/stills/rsc/rsc-edgeville.jpg", name: "Edgeville", game: "RSC" },
  { src: "/stills/rsc/rsc-wilderness.jpg", name: "Wilderness", game: "RSC" },
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
