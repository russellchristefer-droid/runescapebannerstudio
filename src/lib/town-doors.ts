import { LOCATIONS, townRegionHead, type Location } from "@/lib/locations";
import { townNote } from "@/lib/town-notes";
import { noteFor } from "@/lib/boss-notes";
import { monsterById } from "@/lib/monsters";

/** Towns that actually border this one. Names match Location.name. */
const NEARBY: Record<string, string[]> = {
  Lumbridge: ["Varrock", "Draynor Village", "Al Kharid"],
  Varrock: ["Lumbridge", "Edgeville", "Draynor Village"],
  "Draynor Village": ["Lumbridge", "Port Sarim", "Falador"],
  "Al Kharid": ["Lumbridge", "Varrock", "Sophanem"],
  Falador: ["Taverley", "Port Sarim", "Goblin Village"],
  Taverley: ["Falador", "Burthorpe", "Catherby"],
  Burthorpe: ["Taverley", "Goblin Village", "Falador"],
  "Port Sarim": ["Falador", "Draynor Village", "Entrana"],
  Catherby: ["Seers' Village", "Taverley", "Ardougne"],
  "Seers' Village": ["Catherby", "Ardougne", "Rellekka"],
  Ardougne: ["Yanille", "Tree Gnome Stronghold", "Catherby"],
  Yanille: ["Ardougne", "Tree Gnome Stronghold", "Port Sarim"],
  Canifis: ["Varrock", "Port Phasmatys", "Darkmeyer"],
  Edgeville: ["Varrock", "Lumbridge", "Falador"],
  Prifddinas: ["Lletya", "Ardougne", "Zanaris"],
  "Goblin Village": ["Falador", "Burthorpe", "Taverley"],
  Entrana: ["Port Sarim", "Falador", "Taverley"],
  Zanaris: ["Lumbridge", "Prifddinas", "Draynor Village"],
  Menaphos: ["Sophanem", "Al Kharid", "Pollnivneach"],
  Sophanem: ["Menaphos", "Al Kharid", "Al Kharid"],
  "Ape Atoll": ["Port Sarim", "Karamja", "Lumbridge"],
  Rellekka: ["Seers' Village", "Keldagrim", "Catherby"],
  Hosidius: ["Shayzien", "Port Piscarilius", "Lovakengj"],
  Shayzien: ["Hosidius", "Lovakengj", "Arceuus"],
};

export function regionAnchor(region: string) {
  return townRegionHead(region)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function sisterTown(loc: Location): Location | undefined {
  return LOCATIONS.find((row) => row.kind === "town" && row.edition !== loc.edition && row.name === loc.name && townNote(row.id));
}

export function nearbyTowns(loc: Location): Location[] {
  const same = LOCATIONS.filter((row) => row.kind === "town" && row.edition === loc.edition && row.id !== loc.id && townNote(row.id));
  const wanted = NEARBY[loc.name] ?? [];
  const hits: Location[] = [];
  for (const name of wanted) {
    const row = same.find((item) => item.name === name);
    if (row && !hits.some((h) => h.id === row.id)) hits.push(row);
    if (hits.length === 3) return hits;
  }
  for (const row of same) {
    if (townRegionHead(row.region) !== townRegionHead(loc.region)) continue;
    if (hits.some((h) => h.id === row.id)) continue;
    hits.push(row);
    if (hits.length === 3) break;
  }
  return hits.slice(0, 3);
}

export function localFight(loc: Location): { href: string; label: string } | undefined {
  const key = loc.id.toLowerCase();
  const name = loc.name.toLowerCase();
  if (key.includes("cani") || name === "canifis") {
    const id = loc.edition === "OSRS" ? "osrs-spectre" : "rs3-spectre";
    if (monsterById(id)) return { href: `/monsters/${id}`, label: "Slayer Tower" };
  }
  const bosses: [string, string, string][] = [
    ["lostgrove", "solak", "Solak"],
    ["heart", "telos", "Telos"],
    ["cityofum", "rasial", "Rasial"],
    ["senntisten", "glacor", "Arch-Glacor"],
    ["anachronia", "raksha", "Raksha"],
  ];
  for (const [place, boss, label] of bosses) {
    if (key.includes(place) || name.includes(place.replace("cityofum", "city of um"))) {
      if (noteFor(boss)) return { href: `/bosses/${boss}`, label };
    }
  }
  const sitting = LOCATIONS.find(
    (row) => row.kind === "boss" && row.edition === loc.edition && noteFor(row.id) && (row.region === loc.name || townRegionHead(row.region) === loc.name),
  );
  if (sitting) return { href: `/bosses/${sitting.id}`, label: sitting.name };
  return undefined;
}
