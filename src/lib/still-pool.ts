export type HeroEra = "rsc" | "rs2" | "osrs" | "rs3";
export type HeroKind = "place" | "person" | "play";
export type HeroFilter = "all" | "rsc" | "osrs" | "rs3" | "place" | "person";

export type HeroStill = {
  src: string;
  era: HeroEra;
  kind: HeroKind;
  name: string;
  gameLabel: string;
  filePage?: string;
  source?: "studio-capture" | "official" | "wiki-file" | "unknown" | "wayback" | "rsc-wiki";
  waybackUrl?: string;
  captured?: string;
  year?: string;
  placeId?: string;
  view?: "a" | "b";
};

export const HERO_STILLS: HeroStill[] = [
  {
    src: "/stills/rsc/rsc-lumbridge.jpg",
    era: "rsc",
    kind: "place",
    name: "Lumbridge",
    gameLabel: "RuneScape Classic",
    filePage: "https://classic.runescape.wiki/w/File:Lumbridge.png",
    year: "2001",
  },
  {
    src: "/stills/rsc/rsc-varrock.jpg",
    era: "rsc",
    kind: "place",
    name: "Varrock",
    gameLabel: "RuneScape Classic",
    filePage: "https://classic.runescape.wiki/w/File:Varrock.png",
    year: "2001",
  },
  {
    src: "/stills/rsc/rsc-draynor.jpg",
    era: "rsc",
    kind: "place",
    name: "Draynor Village",
    gameLabel: "RuneScape Classic",
    filePage: "https://classic.runescape.wiki/w/File:Draynor_Village.png",
    year: "2001",
  },
  {
    src: "/stills/rsc/rsc-edgeville.jpg",
    era: "rsc",
    kind: "place",
    name: "Edgeville",
    gameLabel: "RuneScape Classic",
    filePage: "https://classic.runescape.wiki/w/File:Edgeville.png",
    year: "2001",
  },
  {
    src: "/stills/rsc/rsc-wilderness.jpg",
    era: "rsc",
    kind: "place",
    name: "Red Dragon Isle",
    gameLabel: "RuneScape Classic",
    filePage: "https://classic.runescape.wiki/w/File:Red_Dragon_Isle.png",
    year: "2001",
    source: "rsc-wiki",
  },
  {
    src: "/stills/rsc/rsc-fishing.jpg",
    era: "rsc",
    kind: "play",
    name: "Fishing",
    gameLabel: "RuneScape Classic",
    filePage: "https://classic.runescape.wiki/w/File:Fishing2.jpg",
    source: "rsc-wiki",
    captured: "2003-07",
  },
  {
    src: "/stills/rsc/rsc-mining.jpg",
    era: "rsc",
    kind: "play",
    name: "Mining",
    gameLabel: "RuneScape Classic",
    filePage: "https://classic.runescape.wiki/w/File:Mining2.jpg",
    source: "rsc-wiki",
    captured: "2003-07",
  },
  {
    src: "/stills/rsc/rsc-woodcutting.jpg",
    era: "rsc",
    kind: "play",
    name: "Woodcutting",
    gameLabel: "RuneScape Classic",
    filePage: "https://classic.runescape.wiki/w/File:Woodcutting2.jpg",
    source: "rsc-wiki",
    captured: "2003-07",
  },
  {
    src: "/stills/rsc/rsc-smithing.jpg",
    era: "rsc",
    kind: "play",
    name: "Smithing",
    gameLabel: "RuneScape Classic",
    filePage: "https://classic.runescape.wiki/w/File:Smithing2.jpg",
    source: "rsc-wiki",
    captured: "2003-07",
  },
  {
    src: "/stills/rsc/rsc-ranging.jpg",
    era: "rsc",
    kind: "play",
    name: "Ranged combat",
    gameLabel: "RuneScape Classic",
    filePage: "https://classic.runescape.wiki/w/File:Ranging2.jpg",
    source: "rsc-wiki",
    captured: "2003-07",
  },
  {
    src: "/locations/osrs-lumbridge-a.jpg",
    era: "osrs",
    kind: "place",
    name: "Lumbridge",
    gameLabel: "Old School RuneScape",
    filePage: "https://oldschool.runescape.wiki/w/File:Lumbridge.png",
    placeId: "osrslumbridge",
    view: "a",
  },
  {
    src: "/locations/osrs-falador-a.jpg",
    era: "osrs",
    kind: "place",
    name: "Falador",
    gameLabel: "Old School RuneScape",
    filePage: "https://oldschool.runescape.wiki/w/File:Falador.png",
    placeId: "osrsfalador",
    view: "a",
  },
  {
    src: "/locations/osrs-varrock-a.jpg",
    era: "osrs",
    kind: "place",
    name: "Varrock",
    gameLabel: "Old School RuneScape",
    filePage: "https://oldschool.runescape.wiki/w/File:Varrock.png",
    placeId: "osrsvarrock",
    view: "a",
  },
  {
    src: "/bosses/osrs/zulrah-a.jpg",
    era: "osrs",
    kind: "place",
    name: "Zul-Andra",
    gameLabel: "Old School RuneScape",
    filePage: "https://oldschool.runescape.wiki/w/File:Zul-Andra.png",
    placeId: "zulrah",
    view: "a",
  },
  {
    src: "/bosses/osrs/vorkath-a.jpg",
    era: "osrs",
    kind: "place",
    name: "Vorkath",
    gameLabel: "Old School RuneScape",
    filePage: "https://oldschool.runescape.wiki/w/File:Vorkath.png",
    placeId: "vorkath",
    view: "a",
  },
  {
    src: "/bosses/osrs/toa-a.jpg",
    era: "osrs",
    kind: "place",
    name: "Tombs of Amascut",
    gameLabel: "Old School RuneScape",
    filePage: "https://oldschool.runescape.wiki/w/File:Tombs_of_Amascut.png",
    placeId: "toa",
    view: "a",
  },
  {
    src: "/locations/rs3-lumbridge-a.jpg",
    era: "rs3",
    kind: "place",
    name: "Lumbridge",
    gameLabel: "RuneScape",
    filePage: "https://runescape.wiki/w/File:Lumbridge.png",
    placeId: "lumbridge",
    view: "a",
  },
  {
    src: "/locations/falador.jpg",
    era: "rs3",
    kind: "place",
    name: "Falador",
    gameLabel: "RuneScape",
    filePage: "https://runescape.wiki/w/File:Falador.png",
    placeId: "falador",
    view: "a",
  },
  {
    src: "/locations/varrock.jpg",
    era: "rs3",
    kind: "place",
    name: "Varrock",
    gameLabel: "RuneScape",
    filePage: "https://runescape.wiki/w/File:Varrock.png",
    placeId: "varrock",
    view: "a",
  },
  {
    src: "/locations/prifddinas.jpg",
    era: "rs3",
    kind: "place",
    name: "Prifddinas",
    gameLabel: "RuneScape",
    filePage: "https://runescape.wiki/w/File:Prifddinas.png",
    placeId: "prifddinas",
    view: "a",
  },
  {
    src: "/bosses/rs3/telos-a.jpg",
    era: "rs3",
    kind: "place",
    name: "Telos",
    gameLabel: "RuneScape",
    filePage: "https://runescape.wiki/w/File:Telos,_the_Warden.png",
    placeId: "telos",
    view: "a",
  },
  {
    src: "/bosses/rs3/vorago-a.jpg",
    era: "rs3",
    kind: "place",
    name: "Vorago",
    gameLabel: "RuneScape",
    filePage: "https://runescape.wiki/w/File:Vorago.png",
    placeId: "vorago",
    view: "a",
  },
  {
    src: "/bosses/rs3/raksha-a.jpg",
    era: "rs3",
    kind: "place",
    name: "Raksha",
    gameLabel: "RuneScape",
    filePage: "https://runescape.wiki/w/File:Raksha,_the_Shadow_Colossus.png",
    placeId: "raksha",
    view: "a",
  },
  {
    src: "/stills/hero/rs3-ozan.jpg",
    era: "rs3",
    kind: "person",
    name: "Ozan",
    gameLabel: "RuneScape",
    filePage: "https://runescape.wiki/w/File:Ozan.png",
  },
];

export function stillPool(filter: HeroFilter = "all"): HeroStill[] {
  return HERO_STILLS.filter((card) => {
    if (filter === "all") return true;
    if (filter === "place" || filter === "person") return card.kind === filter;
    return card.era === filter;
  });
}

export function heroCaption(card: HeroStill) {
  if (card.era === "rsc") return `${card.name} · ${card.kind} · RuneScape Classic`;
  return `${card.name} · ${card.gameLabel}${card.year ? ` · ${card.year}` : ""}`;
}

export function canUseOnDesk(card: HeroStill) {
  return card.kind === "place" && (card.era === "osrs" || card.era === "rs3") && Boolean(card.placeId);
}
