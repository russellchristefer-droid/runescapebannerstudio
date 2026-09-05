import { LOCATIONS, skyLabels, type Location } from "./locations";

const FILE_PAGES: Record<string, { dark?: string; light?: string }> = {
  lumbridge: {
    light: "https://runescape.wiki/w/File:Lumbridge.png",
  },
  osrslumbridge: {
    light: "https://oldschool.runescape.wiki/w/File:Lumbridge.png",
  },
  falador: {
    light: "https://runescape.wiki/w/File:Falador.png",
  },
  varrock: {
    light: "https://runescape.wiki/w/File:Varrock.png",
    dark: "https://runescape.wiki/w/File:Varrock_bank.png",
  },
  osrsvarrock: {
    light: "https://oldschool.runescape.wiki/w/File:Varrock_Square.png",
    dark: "https://oldschool.runescape.wiki/w/File:Varrock.png",
  },
  zanaris: {
    light: "https://runescape.wiki/w/File:Zanaris.png",
    dark: "https://runescape.wiki/w/File:Fairy_Resistance_Hideout.png",
  },
  osrszanaris: {
    light: "https://oldschool.runescape.wiki/w/File:Zanaris_(2007).png",
    dark: "https://oldschool.runescape.wiki/w/File:Zanaris_bank.png",
  },
};

export type StillRecord = {
  slug: string;
  game: "osrs" | "rs3";
  lighting: "dark" | "light";
  file: string;
  alt: string;
  source: "wiki-file" | "unknown";
  wikiFilePage: string | null;
};

function gameName(loc: Location) {
  return loc.edition === "OSRS" ? "Old School RuneScape" : "RuneScape 3";
}

function record(loc: Location, lighting: "dark" | "light"): StillRecord {
  const labels = skyLabels(loc);
  const file = lighting === "dark" ? loc.nightSrc.split("?")[0] : loc.auraSrc.split("?")[0];
  const label = lighting === "dark" ? labels[0] : labels[1];
  return {
    slug: loc.id,
    game: loc.edition === "OSRS" ? "osrs" : "rs3",
    lighting,
    file,
    alt: `${loc.name} from the ${label}, ${gameName(loc)}`,
    source: "wiki-file",
    wikiFilePage: FILE_PAGES[loc.id]?.[lighting] ?? null,
  };
}

export const STILLS: StillRecord[] = LOCATIONS.flatMap((loc) => [
  record(loc, "dark"),
  record(loc, "light"),
]);
