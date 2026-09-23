export type LocationId = string;
export type Edition = "RS3" | "OSRS";
export type SceneKind = "town" | "boss";
export type Skybox = "a" | "b";
export type God =
  | "Saradomin"
  | "Zamorak"
  | "Guthix"
  | "Armadyl"
  | "Bandos"
  | "Seren"
  | "Zaros"
  | "Sliske"
  | "Tumeken"
  | "Elidinis"
  | "Marimbo";

export const GODS: God[] = [
  "Saradomin",
  "Zamorak",
  "Guthix",
  "Armadyl",
  "Bandos",
  "Seren",
  "Zaros",
  "Sliske",
  "Tumeken",
  "Elidinis",
  "Marimbo",
];

export type StillSource = "studio-capture" | "official" | "wiki-file" | "unknown";

export type Location = {
  id: LocationId;
  name: string;
  region: string;
  god: God;
  edition: Edition;
  kind: SceneKind;
  viewA: string;
  viewB?: string;
  viewALabel: string;
  viewBLabel?: string;
  nightSrc: string;
  auraSrc: string;
  skies?: "daynight" | "pair";
  pairA?: string;
  pairB?: string;
  source?: StillSource;
  filePage?: string;
  stills: string[];
};

export const ASSET_REV = "20260905b";

function asset(path: string) {
  return `${path}?v=${ASSET_REV}`;
}

export function stillAllowed(path: string, edition: Edition) {
  const p = path.toLowerCase().split("?")[0];
  if (edition === "OSRS") {
    if (p.includes("/rs3") || p.includes("rs3-") || p.includes("/rsc/") || p.includes("rsc-")) return false;
    if (p.includes("/era/rs3/")) return false;
    if (p.endsWith("/locations/falador.jpg") || p.includes("/locations/falador-nightstone")) return false;
  }
  if (edition === "RS3") {
    if (p.includes("/osrs") || p.includes("osrs-") || p.includes("/rsc/") || p.includes("rsc-")) return false;
    if (p.includes("/era/osrs/") || p.includes("/era/classic/")) return false;
    if (p.endsWith("/falador.png")) return false;
  }
  return true;
}

/** Sharpest same-canon in-world plate. Root PNG only when that file is this client. */
const SHARP_TOWN: Record<string, string> = {
  falador: "/locations/rs3-falador-a.jpg",
  osrsfalador: "/locations/osrs-falador-a.jpg",
  canifis: "/Canifis.png",
  catherby: "/Catherby.png",
  daemonheim: "/Daemonheim.png",
  menaphos: "/Menaphos.png",
  portsarim: "/Port_Sarim.png",
  prifddinas: "/Prifddinas.png",
  taverley: "/Taverley.png",
  burthorpe: "/Burthorpe.png",
  lostgrove: "/The_Lost_Grove.png",
};

/** Same-origin town plates that exist in public/. Card and plate share this path. */
export const TOWN_SRC: Record<string, string> = SHARP_TOWN;

export function townPlateSrc(id: string) {
  return SHARP_TOWN[id] ? asset(SHARP_TOWN[id]) : undefined;
}

export function townStillLine(id: string) {
  return TOWN_LINE[id] ?? "In-world still. Same file on the card and the plate.";
}

export function townRegionHead(region: string) {
  return region.replace(/\s·\sOSRS$/, "").replace(/\s·\sRuneScape$/, "");
}

export function townHasStill(loc: Location) {
  return Boolean(loc.viewA);
}

const TOWN_LINE: Record<string, string> = {
  lumbridge: "The crater is current geography. Leave the courtyard sermon home.",
  osrslumbridge: "You already know the courtyard. Leave the crater home.",
  falador: "White walls on the later client. Not the partyhat yard.",
  osrsfalador: "Partyhats on the cobbles. This is the yard.",
  varrock: "Palace and square on the later stones.",
  osrsvarrock: "The square. You already know the fountain.",
  prifddinas: "A still of Prifddinas is a clock-face. Leave the wrong clan home.",
  osrsprif: "Song of the Elves built this. No Voice of Seren hour here.",
  canifis: "Werewolf street. Later engine, same damp.",
  osrscani: "Slayer Tower is the upstairs problem. The village is the door.",
  catherby: "Fishing tiles and a range. You already know the dock.",
  osrscath: "The range and the spots. Leave a city title home.",
  portsarim: "Boats and the Entrana rule start here.",
  osrsport: "The boat to Entrana. Bank the blade first.",
  taverley: "Druids and the dungeon mouth.",
  osrstav: "Taverley dungeon is the lane under this.",
  burthorpe: "Games Room. Imperial Guard yard.",
  osrsburth: "Death Plateau starts up that path.",
  daemonheim: "The ring. Floors live downstairs.",
  menaphos: "Four districts. Confirm the gate on the wiki.",
  lostgrove: "Solak’s wood. Leave the GP/hour title home.",
  tears: "Juna keeps the cave. The tears are the hour.",
  osrstears: "The cave under the swamp. He does not walk.",
  zanaris: "Lost City on the later stones.",
  osrszanaris: "Dramen staff, then the market.",
  ardougne: "West clocktower. East market.",
  osrsard: "Two towns, one wall. Pick a gate.",
  gnome: "Stronghold canopy. Giant toads stay in the maze.",
  osrsgnome: "Spirit trees and the stronghold.",
  seers: "Camelot is next door. The bank is here.",
  osrsseers: "The bank and the court. Leave Camelot’s title home.",
  anachronia: "The island after the island.",
  yanille: "Wizards’ Guild. You already know the door.",
  osrsyan: "Watchtower road. Guild upstairs.",
  draynor: "Willow trees and a locked shed.",
  grandexchange: "This desk does not print a price.",
  empyrean: "Armadyl’s hall after the edicts.",
  senntisten: "Zarosian stone. The cathedral is the still.",
  sophanem: "Plague city. The gate is the lesson.",
  osrssoph: "The gate and the plague. Leave Menaphos home.",
  apeatoll: "Greegree first. Marimbo’s island.",
  osrsape: "You already know the greegree.",
  goblin: "Big High War God lives in the huts.",
  osrsgob: "Goblin Diplomacy is politics. This is the yard.",
  heart: "Four houses. Confirm the wing on the wiki.",
  entrana: "The wipe is the item you forgot to bank.",
  osrsent: "The wipe is the item you forgot to bank.",
  cityofum: "Necromancy dock. Rasial is on Bosses.",
  warsretreat: "Hub, not a kill. Leave the GP/hour title home.",
  darkmeyer: "Vyrewatch streets. Darkmeyer is not Canifis.",
  hosidius: "Kourend farm belt. Favour is the old word.",
  shayzien: "The camp. Lizardmen stay on the hill.",
  lovakengj: "Blast mine and the forge.",
  arceuus: "Dark altar. Library hours stay on the wiki.",
  piscarilius: "The port house. Thieving tiles if the page still says so.",
  fortis: "Varlamore capital. Colosseum is on Bosses.",
  edgeville: "Wilderness wall. The ditch is the grammar.",
  osrsedge: "The ditch. Protect item if you step over.",
  alkharid: "Palace and the desert gate.",
  osrsalk: "Silk and the gate. Leave Menaphos home.",
  rellekka: "Fremennik dock. Longhall first.",
  osrsrel: "The longhall. Waterbirth is a boat, not this street.",
  keldagrim: "Under the mountain. Consortium halls.",
  phasmatys: "Ectoplasm and the dock.",
  lletya: "Refugee camp before the city stands.",
  fortforinthry: "The fort after the fort.",
  waiko: "The Arc. Voyages, not a mainland bank.",
  osrsdraynor: "Willows and a manor. The bank is the village.",
  osrsbarb: "Gunnarsgrunn. The river crossing is the town.",
  osrsdig: "The Digsite. Bones before the city.",
  barbarian: "Gunnarsgrunn on the later stones. Same river.",
  digsite: "The dig east of Varrock. The exam is the door.",
  osrsrim: "The well, the mine, and the walk to Sarim.",
  osrscam: "Seers is the bank. Camelot is the castle.",
  osrshemen: "Fishing Guild road. Hemenster is the village.",
  hemenster: "The guild and the village. Not Catherby.",
  osrskhaz: "Khazard’s port. The fight arena is next door.",
  khazard: "General Khazard’s dock. The arena is the other door.",
  osrstgv: "The maze and the battlefield. Not the stronghold.",
  gnomevillage: "The village, not the stronghold canopy.",
  falls: "Baxtorian’s waterfall. The house is behind the water.",
  osrspisc: "The colony north of the stronghold.",
  piscatoris: "The fishing colony. Swan song is the door.",
  osrspoll: "Bandit town. Smoke and the magic carpet.",
  pollnivneach: "The desert town of smoke. Carpets leave from here.",
  osrsnardah: "The town of the Elidinis shrine.",
  nardah: "Elidinis’s town. Water is the work.",
  osrsshan: "The gate of the desert. Shantay takes the toll.",
  shantay: "The pass. The desert starts after the toll.",
  osrsphas: "Ghost dock. The ectofuntus is the work.",
  osrsmort: "The ruined town. Shades under the temple.",
  osrsburgh: "The town that holds the swamp road.",
  burgh: "Burgh de Rott. The swamp road’s last door.",
  osrsmeiyer: "The ghetto under Darkmeyer. Don’t walk the walls.",
  meiyerditch: "The ghetto. Vyrewatch streets above it.",
  osrsslepe: "The church town. The nightmare is not the street.",
  osrsdark: "Vyrewatch capital. The cloak is the law.",
  osrsking: "The statue square. Five houses meet here.",
  osrswinter: "The camp, not a house. The fire is the work.",
  osrscamtorum: "The dwarven city under Varlamore.",
  osrsaldarin: "The coastal town. The voyage west ends here.",
  osrskastori: "The hunter town. Quetzals, not a second Fortis.",
  osrslletya: "The camp before the crystal city.",
  osrstyras: "The camp in the forest. Iorwerth is not this gate.",
  tyras: "Port Tyras. The camp on the later client.",
  osrsneit: "The island of the bridge. Burgher’s hall.",
  osrsjat: "The other island. The bridge is the argument.",
  osrsmisc: "The kingdom on the rock. Managing it is the work.",
  miscellania: "The rock kingdom. The other client’s throne.",
  osrslunar: "The moon isle. Seal of passage or you do not land.",
  lunar: "The moon isle on the later stones.",
  osrskeld: "The dwarf city under the mountain.",
  osrsmusa: "The banana dock. The boat from Sarim lands here.",
  musa: "Musa Point. The Karamja dock.",
  osrsbrim: "The pirate port. Agility arena is inland.",
  brimhaven: "The pirate port on the later stones.",
  osrsshilo: "The village past the cart. Shilo is not Brimhaven.",
  shilo: "Shilo Village. The cart is the door.",
  osrstai: "The village in the jungle. Broodoo, not a bank.",
  osrsmor: "The volcano city. The pits are the bowl.",
  morulrek: "TzHaar City. The same bowl, later grammar.",
};

function loc(
  id: string,
  name: string,
  region: string,
  god: God,
  edition: Edition,
  kind: SceneKind,
  extra: Partial<Location> = {},
): Location {
  const viewA =
    extra.viewA ??
    (kind === "boss"
      ? asset(`/stills/${edition === "OSRS" ? "osrs" : "rs3"}/boss-${id}.jpg`)
      : townPlateSrc(id) ?? asset(`/locations/${id}.jpg`));
  const viewB =
    extra.viewB === ""
      ? undefined
      : extra.viewB && stillAllowed(extra.viewB, edition)
        ? extra.viewB
        : kind === "town"
          ? asset(`/locations/${id}-nightstone.jpg`)
          : undefined;
  const safeA = stillAllowed(viewA, edition) ? viewA : viewA;
  const extras = (extra.stills ?? []).filter((src) => stillAllowed(src, edition));
  const stillKey = (src: string) => src.split("?")[0];
  const stills = [safeA, viewB, ...extras].filter((src, i, arr): src is string => {
    if (!src) return false;
    return arr.findIndex((row) => row && stillKey(row) === stillKey(src)) === i;
  });
  return {
    id,
    name,
    region,
    god,
    edition,
    kind,
    nightSrc: viewB ?? safeA,
    auraSrc: safeA,
    source: extra.source ?? "unknown",
    stills,
    ...extra,
    viewA: safeA,
    viewB,
    viewALabel: extra.viewALabel ?? extra.pairA ?? "A",
    viewBLabel: viewB ? extra.viewBLabel ?? extra.pairB ?? "B" : undefined,
  };
}

export const LOCATIONS: Location[] = [
  loc("lumbridge", "Lumbridge", "Misthalin", "Saradomin", "RS3", "town", {
    source: "studio-capture",
    filePage: "https://runescape.wiki/w/File:Lumbridge.png",
  }),
  loc("falador", "Falador", "Asgarnia", "Saradomin", "RS3", "town", {
    source: "studio-capture",
    filePage: "https://runescape.wiki/w/File:Falador.png",
    stills: ["/locations/falador.jpg"],
  }),
  loc("varrock", "Varrock", "Misthalin", "Saradomin", "RS3", "town", {
    source: "studio-capture",
    filePage: "https://runescape.wiki/w/File:Varrock.png",
  }),
  loc("prifddinas", "Prifddinas", "Tirannwn", "Seren", "RS3", "town"),
  loc("canifis", "Canifis", "Morytania", "Zamorak", "RS3", "town"),
  loc("catherby", "Catherby", "Kandarin", "Saradomin", "RS3", "town"),
  loc("portsarim", "Port Sarim", "Asgarnia", "Saradomin", "RS3", "town"),
  loc("taverley", "Taverley", "Asgarnia", "Guthix", "RS3", "town"),
  loc("burthorpe", "Burthorpe", "Asgarnia", "Bandos", "RS3", "town"),
  loc("edgeville", "Edgeville", "Misthalin", "Zamorak", "RS3", "town"),
  loc("alkharid", "Al Kharid", "Kharidian", "Tumeken", "RS3", "town"),
  loc("daemonheim", "Daemonheim", "Fremennik", "Zaros", "RS3", "town"),
  loc("menaphos", "Menaphos", "Kharidian", "Tumeken", "RS3", "town"),
  loc("lostgrove", "Lost Grove", "Anachronia", "Guthix", "RS3", "town"),
  loc("tears", "Tears of Guthix", "Misthalin", "Guthix", "RS3", "town", {
    skies: "pair",
    pairA: "Juna",
    pairB: "Cavern",
    viewA: asset("/locations/tears.jpg"),
    viewB: asset("/locations/tears-nightstone.jpg"),
    viewALabel: "Juna",
    viewBLabel: "Cavern",
  }),
  loc("zanaris", "Zanaris", "Lost City", "Guthix", "RS3", "town"),
  loc("ardougne", "Ardougne", "Kandarin", "Saradomin", "RS3", "town"),
  loc("gnome", "Tree Gnome Stronghold", "Kandarin", "Guthix", "RS3", "town"),
  loc("seers", "Seers' Village", "Kandarin", "Saradomin", "RS3", "town"),
  loc("anachronia", "Anachronia", "Fossil Island", "Guthix", "RS3", "town"),
  loc("yanille", "Yanille", "Kandarin", "Saradomin", "RS3", "town"),
  loc("draynor", "Draynor Village", "Misthalin", "Saradomin", "RS3", "town"),
  loc("grandexchange", "Grand Exchange", "Misthalin", "Saradomin", "RS3", "town"),
  loc("empyrean", "Empyrean Citadel", "Otherworld", "Armadyl", "RS3", "town"),
  loc("senntisten", "Senntisten", "Forinthry", "Zaros", "RS3", "town"),
  loc("sophanem", "Sophanem", "Kharidian", "Elidinis", "RS3", "town"),
  loc("apeatoll", "Ape Atoll", "Southern Sea", "Marimbo", "RS3", "town"),
  loc("goblin", "Goblin Village", "Asgarnia", "Bandos", "RS3", "town"),
  loc("heart", "Heart of Gielinor", "God Wars", "Zaros", "RS3", "town"),
  loc("entrana", "Entrana", "Asgarnia", "Saradomin", "RS3", "town"),
  loc("cityofum", "City of Um", "Underworld", "Sliske", "RS3", "town"),
  loc("warsretreat", "War's Retreat", "Otherworld", "Zaros", "RS3", "town"),
  loc("darkmeyer", "Darkmeyer", "Morytania", "Zamorak", "RS3", "town"),
  loc("osrslumbridge", "Lumbridge", "Misthalin · OSRS", "Saradomin", "OSRS", "town", {
    source: "studio-capture",
    filePage: "https://oldschool.runescape.wiki/w/File:Lumbridge.png",
  }),
  loc("osrsfalador", "Falador", "Asgarnia · OSRS", "Saradomin", "OSRS", "town", {
    source: "studio-capture",
    filePage: "https://oldschool.runescape.wiki/w/File:Falador.png",
    viewB: "/locations/osrs-falador-a.jpg",
  }),
  loc("osrsvarrock", "Varrock", "Misthalin · OSRS", "Saradomin", "OSRS", "town", {
    source: "studio-capture",
    filePage: "https://oldschool.runescape.wiki/w/File:Varrock_Square.png",
  }),
  loc("hosidius", "Hosidius", "Great Kourend · OSRS", "Saradomin", "OSRS", "town"),
  loc("osrsprif", "Prifddinas", "Tirannwn · OSRS", "Seren", "OSRS", "town"),
  loc("osrscani", "Canifis", "Morytania · OSRS", "Zamorak", "OSRS", "town"),
  loc("osrscath", "Catherby", "Kandarin · OSRS", "Saradomin", "OSRS", "town"),
  loc("osrsport", "Port Sarim", "Asgarnia · OSRS", "Saradomin", "OSRS", "town"),
  loc("osrstav", "Taverley", "Asgarnia · OSRS", "Guthix", "OSRS", "town"),
  loc("osrsburth", "Burthorpe", "Asgarnia · OSRS", "Bandos", "OSRS", "town"),
  loc("osrsedge", "Edgeville", "Misthalin · OSRS", "Zamorak", "OSRS", "town"),
  loc("osrsalk", "Al Kharid", "Kharidian · OSRS", "Tumeken", "OSRS", "town"),
  loc("osrstears", "Tears of Guthix", "Misthalin · OSRS", "Guthix", "OSRS", "town", {
    skies: "pair",
    pairA: "Tears",
    pairB: "Chasm",
    viewA: asset("/locations/osrstears.jpg"),
    viewB: asset("/locations/osrstears-nightstone.jpg"),
    viewALabel: "Tears",
    viewBLabel: "Chasm",
  }),
  loc("osrszanaris", "Zanaris", "Lost City · OSRS", "Guthix", "OSRS", "town", {
    viewB: asset("/locations/osrs-zanaris-a.jpg"),
    viewALabel: "Canopy",
    viewBLabel: "Market",
  }),
  loc("osrsard", "Ardougne", "Kandarin · OSRS", "Saradomin", "OSRS", "town"),
  loc("osrsgnome", "Tree Gnome Stronghold", "Kandarin · OSRS", "Guthix", "OSRS", "town"),
  loc("osrsseers", "Seers' Village", "Kandarin · OSRS", "Saradomin", "OSRS", "town"),
  loc("osrsyan", "Yanille", "Kandarin · OSRS", "Saradomin", "OSRS", "town"),
  loc("osrssoph", "Sophanem", "Kharidian · OSRS", "Elidinis", "OSRS", "town"),
  loc("osrsape", "Ape Atoll", "Southern Sea · OSRS", "Marimbo", "OSRS", "town"),
  loc("osrsent", "Entrana", "Asgarnia · OSRS", "Saradomin", "OSRS", "town"),
  loc("osrsgob", "Goblin Village", "Asgarnia · OSRS", "Bandos", "OSRS", "town"),
  loc("rellekka", "Rellekka", "Fremennik", "Guthix", "RS3", "town"),
  loc("keldagrim", "Keldagrim", "Fremennik", "Guthix", "RS3", "town"),
  loc("phasmatys", "Port Phasmatys", "Morytania", "Zamorak", "RS3", "town"),
  loc("lletya", "Lletya", "Tirannwn", "Seren", "RS3", "town"),
  loc("fortforinthry", "Fort Forinthry", "Misthalin", "Saradomin", "RS3", "town"),
  loc("waiko", "Waiko", "The Arc", "Guthix", "RS3", "town"),
  loc("osrsrel", "Rellekka", "Fremennik · OSRS", "Guthix", "OSRS", "town"),
  loc("shayzien", "Shayzien", "Great Kourend · OSRS", "Saradomin", "OSRS", "town"),
  loc("lovakengj", "Lovakengj", "Great Kourend · OSRS", "Bandos", "OSRS", "town"),
  loc("arceuus", "Arceuus", "Great Kourend · OSRS", "Zaros", "OSRS", "town"),
  loc("piscarilius", "Port Piscarilius", "Great Kourend · OSRS", "Saradomin", "OSRS", "town"),
  loc("fortis", "Civitas Fortis", "Varlamore · OSRS", "Tumeken", "OSRS", "town"),
  loc("osrsdraynor", "Draynor Village", "Misthalin · OSRS", "Saradomin", "OSRS", "town", { viewB: "", source: "wiki-file" }),
  loc("osrsbarb", "Barbarian Village", "Misthalin · OSRS", "Guthix", "OSRS", "town", { viewB: "", source: "wiki-file" }),
  loc("osrsdig", "Digsite", "Misthalin · OSRS", "Saradomin", "OSRS", "town", { viewB: "", source: "wiki-file" }),
  loc("osrsrim", "Rimmington", "Asgarnia · OSRS", "Saradomin", "OSRS", "town", { viewB: "", source: "wiki-file" }),
  loc("osrscam", "Camelot", "Kandarin · OSRS", "Saradomin", "OSRS", "town", { viewB: "", source: "wiki-file" }),
  loc("osrshemen", "Hemenster", "Kandarin · OSRS", "Saradomin", "OSRS", "town", { viewB: "", source: "wiki-file" }),
  loc("osrskhaz", "Port Khazard", "Kandarin · OSRS", "Zamorak", "OSRS", "town", { viewB: "", source: "wiki-file" }),
  loc("osrstgv", "Tree Gnome Village", "Kandarin · OSRS", "Guthix", "OSRS", "town", { viewB: "", source: "wiki-file" }),
  loc("osrspisc", "Piscatoris", "Kandarin · OSRS", "Guthix", "OSRS", "town", { viewB: "", source: "wiki-file" }),
  loc("osrspoll", "Pollnivneach", "Kharidian · OSRS", "Tumeken", "OSRS", "town", { viewB: "", source: "wiki-file" }),
  loc("osrsnardah", "Nardah", "Kharidian · OSRS", "Elidinis", "OSRS", "town", { viewB: "", source: "wiki-file" }),
  loc("osrsshan", "Shantay Pass", "Kharidian · OSRS", "Tumeken", "OSRS", "town", { viewB: "", source: "wiki-file" }),
  loc("osrsphas", "Port Phasmatys", "Morytania · OSRS", "Zamorak", "OSRS", "town", { viewB: "", source: "wiki-file" }),
  loc("osrsmort", "Mort'ton", "Morytania · OSRS", "Zamorak", "OSRS", "town", { viewB: "", source: "wiki-file" }),
  loc("osrsburgh", "Burgh de Rott", "Morytania · OSRS", "Saradomin", "OSRS", "town", { viewB: "", source: "wiki-file" }),
  loc("osrsmeiyer", "Meiyerditch", "Morytania · OSRS", "Zamorak", "OSRS", "town", { viewB: "", source: "wiki-file" }),
  loc("osrsslepe", "Slepe", "Morytania · OSRS", "Zamorak", "OSRS", "town", { viewB: "", source: "wiki-file" }),
  loc("osrsdark", "Darkmeyer", "Morytania · OSRS", "Zamorak", "OSRS", "town", { viewB: "", source: "wiki-file" }),
  loc("osrsking", "Kingstown", "Great Kourend · OSRS", "Saradomin", "OSRS", "town", { viewB: "", source: "wiki-file" }),
  loc("osrswinter", "Wintertodt Camp", "Great Kourend · OSRS", "Guthix", "OSRS", "town", { viewB: "", source: "wiki-file" }),
  loc("osrscamtorum", "Cam Torum", "Varlamore · OSRS", "Tumeken", "OSRS", "town", { viewB: "", source: "wiki-file" }),
  loc("osrsaldarin", "Aldarin", "Varlamore · OSRS", "Tumeken", "OSRS", "town", { viewB: "", source: "wiki-file" }),
  loc("osrskastori", "Kastori", "Varlamore · OSRS", "Tumeken", "OSRS", "town", { viewB: "", source: "wiki-file" }),
  loc("osrslletya", "Lletya", "Tirannwn · OSRS", "Seren", "OSRS", "town", { viewB: "", source: "wiki-file" }),
  loc("osrstyras", "Tyras Camp", "Tirannwn · OSRS", "Seren", "OSRS", "town", { viewB: "", source: "wiki-file" }),
  loc("osrsneit", "Neitiznot", "Fremennik · OSRS", "Guthix", "OSRS", "town", { viewB: "", source: "wiki-file" }),
  loc("osrsjat", "Jatizso", "Fremennik · OSRS", "Guthix", "OSRS", "town", { viewB: "", source: "wiki-file" }),
  loc("osrsmisc", "Miscellania", "Fremennik · OSRS", "Guthix", "OSRS", "town", { viewB: "", source: "wiki-file" }),
  loc("osrslunar", "Lunar Isle", "Fremennik · OSRS", "Guthix", "OSRS", "town", { viewB: "", source: "wiki-file" }),
  loc("osrskeld", "Keldagrim", "Fremennik · OSRS", "Guthix", "OSRS", "town", { viewB: "", source: "wiki-file" }),
  loc("osrsmusa", "Musa Point", "Karamja · OSRS", "Saradomin", "OSRS", "town", { viewB: "", source: "wiki-file" }),
  loc("osrsbrim", "Brimhaven", "Karamja · OSRS", "Saradomin", "OSRS", "town", { viewB: "", source: "wiki-file" }),
  loc("osrsshilo", "Shilo Village", "Karamja · OSRS", "Saradomin", "OSRS", "town", { viewB: "", source: "wiki-file" }),
  loc("osrstai", "Tai Bwo Wannai", "Karamja · OSRS", "Guthix", "OSRS", "town", { viewB: "", source: "wiki-file" }),
  loc("osrsmor", "Mor Ul Rek", "Karamja · OSRS", "Zamorak", "OSRS", "town", { viewB: "", source: "wiki-file" }),
  loc("barbarian", "Barbarian Village", "Misthalin", "Guthix", "RS3", "town", { viewB: "", source: "wiki-file" }),
  loc("digsite", "Digsite", "Misthalin", "Saradomin", "RS3", "town", { viewB: "", source: "wiki-file" }),
  loc("hemenster", "Hemenster", "Kandarin", "Saradomin", "RS3", "town", { viewB: "", source: "wiki-file" }),
  loc("khazard", "Port Khazard", "Kandarin", "Zamorak", "RS3", "town", { viewB: "", source: "wiki-file" }),
  loc("gnomevillage", "Tree Gnome Village", "Kandarin", "Guthix", "RS3", "town", { viewB: "", source: "wiki-file" }),
  loc("falls", "Baxtorian Falls", "Kandarin", "Guthix", "RS3", "town", { viewB: "", source: "wiki-file" }),
  loc("piscatoris", "Piscatoris", "Kandarin", "Guthix", "RS3", "town", { viewB: "", source: "wiki-file" }),
  loc("pollnivneach", "Pollnivneach", "Kharidian", "Tumeken", "RS3", "town", { viewB: "", source: "wiki-file" }),
  loc("nardah", "Nardah", "Kharidian", "Elidinis", "RS3", "town", { viewB: "", source: "wiki-file" }),
  loc("shantay", "Shantay Pass", "Kharidian", "Tumeken", "RS3", "town", { viewB: "", source: "wiki-file" }),
  loc("burgh", "Burgh de Rott", "Morytania", "Saradomin", "RS3", "town", { viewB: "", source: "wiki-file" }),
  loc("meiyerditch", "Meiyerditch", "Morytania", "Zamorak", "RS3", "town", { viewB: "", source: "wiki-file" }),
  loc("tyras", "Tyras Camp", "Tirannwn", "Seren", "RS3", "town", { viewB: "", source: "wiki-file" }),
  loc("miscellania", "Miscellania", "Fremennik", "Guthix", "RS3", "town", { viewB: "", source: "wiki-file" }),
  loc("lunar", "Lunar Isle", "Fremennik", "Guthix", "RS3", "town", { viewB: "", source: "wiki-file" }),
  loc("musa", "Musa Point", "Karamja", "Saradomin", "RS3", "town", { viewB: "", source: "wiki-file" }),
  loc("brimhaven", "Brimhaven", "Karamja", "Saradomin", "RS3", "town", { viewB: "", source: "wiki-file" }),
  loc("shilo", "Shilo Village", "Karamja", "Saradomin", "RS3", "town", { viewB: "", source: "wiki-file" }),
  loc("morulrek", "TzHaar City", "Karamja", "Zamorak", "RS3", "town", { viewB: "", source: "wiki-file" }),
  loc("raksha", "Raksha", "Anachronia", "Guthix", "RS3", "boss"),
  loc("vorago", "Vorago", "Borehole", "Guthix", "RS3", "boss"),
  loc("solak", "Solak", "Lost Grove", "Guthix", "RS3", "boss"),
  loc("telos", "Telos", "The Heart", "Zaros", "RS3", "boss"),
  loc("glacor", "Arch-Glacor", "Senntisten", "Zaros", "RS3", "boss"),
  loc("rasial", "Rasial", "City of Um", "Sliske", "RS3", "boss"),
  loc("araxxor", "Araxxor", "Morytania", "Zamorak", "RS3", "boss"),
  loc("kerapac", "Kerapac", "Anachronia", "Zaros", "RS3", "boss"),
  loc("qbd", "Queen Black Dragon", "Ancient Cavern", "Zaros", "RS3", "boss"),
  loc("zamorakboss", "Zamorak, Lord of Chaos", "Infernal Source", "Zamorak", "RS3", "boss"),
  loc("helwyr", "Helwyr", "Tiranwnn", "Seren", "RS3", "boss"),
  loc("vindicta", "Vindicta", "Tiranwnn", "Zaros", "RS3", "boss"),
  loc("toa", "Tombs of Amascut", "Kharidian · OSRS", "Tumeken", "OSRS", "boss"),
  loc("vorkath", "Vorkath", "Ungael · OSRS", "Zaros", "OSRS", "boss"),
  loc("tob", "Theatre of Blood", "Morytania · OSRS", "Zamorak", "OSRS", "boss"),
  loc("corp", "Corporeal Beast", "Wilderness · OSRS", "Zaros", "OSRS", "boss"),
  loc("nex", "Nex", "God Wars · OSRS", "Zaros", "OSRS", "boss"),
  loc("zulrah", "Zulrah", "Zul-Andra · OSRS", "Zaros", "OSRS", "boss"),
  loc("inferno", "The Inferno", "TzHaar · OSRS", "Zamorak", "OSRS", "boss"),
  loc("nightmare", "The Nightmare", "Morytania · OSRS", "Zamorak", "OSRS", "boss"),
  loc("graardor", "General Graardor", "God Wars · OSRS", "Bandos", "OSRS", "boss"),
  loc("kree", "Kree'arra", "God Wars · OSRS", "Armadyl", "OSRS", "boss"),
  loc("muspah", "Phantom Muspah", "Ghorrock · OSRS", "Zaros", "OSRS", "boss"),
  loc("hydra", "Alchemical Hydra", "Kebos · OSRS", "Guthix", "OSRS", "boss"),
  loc("cox", "Chambers of Xeric", "Great Olm · OSRS", "Zaros", "OSRS", "boss"),
  loc("colosseum", "Fortis Colosseum", "Varlamore · OSRS", "Saradomin", "OSRS", "boss"),
  loc("duke", "Duke Sucellus", "Ghorrock · OSRS", "Zaros", "OSRS", "boss"),
  loc("whisperer", "The Whisperer", "Lassar · OSRS", "Zaros", "OSRS", "boss"),
  loc("leviathan", "The Leviathan", "Scar · OSRS", "Zaros", "OSRS", "boss"),
  loc("vardorvis", "Vardorvis", "Stranglewood · OSRS", "Zaros", "OSRS", "boss"),
  loc("gauntlet", "The Gauntlet", "Prifddinas · OSRS", "Seren", "OSRS", "boss"),
  loc("kril", "K'ril Tsutsaroth", "God Wars · OSRS", "Zamorak", "OSRS", "boss"),
  loc("zilyana", "Commander Zilyana", "God Wars · OSRS", "Saradomin", "OSRS", "boss"),
  loc("kq", "Kalphite Queen", "Kharidian · OSRS", "Tumeken", "OSRS", "boss"),
  loc("scurrius", "Scurrius", "Varrock · OSRS", "Zamorak", "OSRS", "boss"),
  loc("cerberus", "Cerberus", "Taverley · OSRS", "Zamorak", "OSRS", "boss"),
  loc("kraken", "Kraken", "Kraken Cove · OSRS", "Zaros", "OSRS", "boss"),
  loc("kbd", "King Black Dragon", "Wilderness · OSRS", "Zamorak", "OSRS", "boss"),
  loc("jad", "TzTok-Jad", "TzHaar · OSRS", "Zamorak", "OSRS", "boss", { viewA: asset("/locations/jad.jpg"), viewB: "" }),
  loc("mole", "Giant Mole", "Asgarnia · OSRS", "Saradomin", "OSRS", "boss", { viewA: asset("/locations/mole.jpg"), viewB: "" }),
  loc("chaosel", "Chaos Elemental", "Wilderness · OSRS", "Zamorak", "OSRS", "boss", { viewA: asset("/locations/chaosel.jpg"), viewB: "" }),
  loc("vetion", "Vet'ion", "Wilderness · OSRS", "Zamorak", "OSRS", "boss", { viewA: asset("/locations/vetion.jpg"), viewB: "" }),
  loc("calvarion", "Calvar'ion", "Wilderness · OSRS", "Zamorak", "OSRS", "boss", { viewA: asset("/locations/calvarion.jpg"), viewB: "" }),
  loc("callisto", "Callisto", "Wilderness · OSRS", "Zamorak", "OSRS", "boss", { viewA: asset("/locations/callisto.jpg"), viewB: "" }),
  loc("artio", "Artio", "Wilderness · OSRS", "Zamorak", "OSRS", "boss", { viewA: asset("/locations/artio.jpg"), viewB: "" }),
  loc("venenatis", "Venenatis", "Wilderness · OSRS", "Zamorak", "OSRS", "boss", { viewA: asset("/locations/venenatis.jpg"), viewB: "" }),
  loc("spindel", "Spindel", "Wilderness · OSRS", "Zamorak", "OSRS", "boss", { viewA: asset("/locations/spindel.jpg"), viewB: "" }),
  loc("scorpia", "Scorpia", "Wilderness · OSRS", "Zamorak", "OSRS", "boss", { viewA: asset("/locations/scorpia.jpg"), viewB: "" }),
  loc("crazyarch", "Crazy Archaeologist", "Wilderness · OSRS", "Zamorak", "OSRS", "boss", { viewA: asset("/locations/crazyarch.jpg"), viewB: "" }),
  loc("fanatic", "Chaos Fanatic", "Wilderness · OSRS", "Zamorak", "OSRS", "boss", { viewA: asset("/locations/fanatic.jpg"), viewB: "" }),
  loc("sire", "Abyssal Sire", "Abyss · OSRS", "Zaros", "OSRS", "boss", { viewA: asset("/locations/sire.jpg"), viewB: "" }),
  loc("guardians", "Grotesque Guardians", "Morytania · OSRS", "Bandos", "OSRS", "boss", { viewA: asset("/locations/guardians.jpg"), viewB: "" }),
  loc("smoke", "Thermonuclear smoke devil", "Kandarin · OSRS", "Zamorak", "OSRS", "boss", { viewA: asset("/locations/smoke.jpg"), viewB: "" }),
  loc("sarachnis", "Sarachnis", "Great Kourend · OSRS", "Saradomin", "OSRS", "boss", { viewA: asset("/locations/sarachnis.jpg"), viewB: "" }),
  loc("yama", "Yama", "Chasm · OSRS", "Zamorak", "OSRS", "boss", { viewA: asset("/locations/yama.jpg"), viewB: "" }),
  loc("huey", "The Hueycoatl", "Varlamore · OSRS", "Guthix", "OSRS", "boss", { viewA: asset("/locations/huey.jpg"), viewB: "" }),
  loc("amox", "Amoxliatl", "Varlamore · OSRS", "Zaros", "OSRS", "boss", { viewA: asset("/locations/amox.jpg"), viewB: "" }),
  loc("zuk", "TzKal-Zuk", "Elder Kiln", "Zamorak", "RS3", "boss"),
  loc("ambassador", "The Ambassador", "Dungeons of Daemonheim", "Zaros", "RS3", "boss"),
  loc("croesus", "Croesus", "Senntisten", "Zaros", "RS3", "boss"),
  loc("aod", "Nex: Angel of Death", "God Wars", "Zaros", "RS3", "boss"),
  loc("kk", "Kalphite King", "Exiled Kalphite Hive", "Tumeken", "RS3", "boss", {
    viewA: asset("/locations/kk.jpg"),
    viewALabel: "Hive",
  }),
  loc("gregorovic", "Gregorovic", "Tiranwnn", "Sliske", "RS3", "boss"),
  loc("sanctum", "Sanctum of Rebirth", "Underworld", "Sliske", "RS3", "boss"),
  loc("bm", "Beastmaster Durzag", "Mazcab", "Bandos", "RS3", "boss"),
  loc("yaka", "Yakamaru", "Mazcab", "Bandos", "RS3", "boss"),
  loc("akkha", "Akkha", "Kharidian · OSRS", "Tumeken", "OSRS", "boss", { viewA: asset("/locations/akkha.jpg"), viewB: "", source: "wiki-file" }),
  loc("zebak", "Zebak", "Kharidian · OSRS", "Tumeken", "OSRS", "boss", { viewA: asset("/locations/zebak.jpg"), viewB: "", source: "wiki-file" }),
  loc("baba", "Ba-Ba", "Kharidian · OSRS", "Tumeken", "OSRS", "boss", { viewA: asset("/locations/baba.jpg"), viewB: "", source: "wiki-file" }),
  loc("kephri", "Kephri", "Kharidian · OSRS", "Tumeken", "OSRS", "boss", { viewA: asset("/locations/kephri.jpg"), viewB: "", source: "wiki-file" }),
  loc("royal", "Royal Titans", "Asgarnia · OSRS", "Guthix", "OSRS", "boss", { viewA: asset("/locations/royal.jpg"), viewB: "", source: "wiki-file" }),
  loc("rs3graardor", "General Graardor", "God Wars", "Bandos", "RS3", "boss", { viewA: asset("/locations/rs3graardor.jpg"), viewB: "", source: "wiki-file" }),
  loc("rs3kree", "Kree'arra", "God Wars", "Armadyl", "RS3", "boss", { viewA: asset("/locations/rs3kree.jpg"), viewB: "", source: "wiki-file" }),
  loc("rs3zilyana", "Commander Zilyana", "God Wars", "Saradomin", "RS3", "boss", { viewA: asset("/locations/rs3zilyana.jpg"), viewB: "", source: "wiki-file" }),
  loc("rs3kril", "K'ril Tsutsaroth", "God Wars", "Zamorak", "RS3", "boss", { viewA: asset("/locations/rs3kril.jpg"), viewB: "", source: "wiki-file" }),
  loc("rs3nex", "Nex", "God Wars", "Zaros", "RS3", "boss", { viewA: asset("/locations/rs3nex.jpg"), viewB: "", source: "wiki-file" }),
  loc("rs3kq", "Kalphite Queen", "Kharidian", "Tumeken", "RS3", "boss", { viewA: asset("/locations/rs3kq.jpg"), viewB: "", source: "wiki-file" }),
  loc("rs3kbd", "King Black Dragon", "Wilderness", "Zamorak", "RS3", "boss", { viewA: asset("/locations/rs3kbd.jpg"), viewB: "", source: "wiki-file" }),
];

export function skyLabels(loc: Location) {
  return ["A", "B"] as const;
}

export function hasViewB(loc: Location) {
  return Boolean(loc.viewB && loc.viewB !== loc.viewA);
}

export type BannerSizeId = "1200x480" | "1280x720" | "1920x1080" | "1920x480";

export const BANNER_SIZES: {
  id: BannerSizeId;
  name: string;
  width: number;
  height: number;
  note: string;
  mark: "twitch" | "rs" | "x" | "youtube" | "discord" | "tiktok" | "facebook" | "none";
}[] = [
  { id: "1200x480", name: "1200×480", width: 1200, height: 480, note: "Twitch profile banner", mark: "twitch" },
  { id: "1280x720", name: "1280×720", width: 1280, height: 720, note: "YouTube thumb / 16:9 card", mark: "youtube" },
  { id: "1920x1080", name: "1920×1080", width: 1920, height: 1080, note: "Offline / player banner", mark: "none" },
  { id: "1920x480", name: "1920×480", width: 1920, height: 480, note: "Wide panel", mark: "none" },
];

export function migrateBannerSizeId(raw: string | undefined): BannerSizeId {
  const key = (raw ?? "").toLowerCase().replace(/×/g, "x");
  if (key === "1200x480" || key === "m" || key === "twitch" || key === "rs3") return "1200x480";
  if (key === "1280x720" || key === "youtube") return "1280x720";
  if (key === "1920x1080" || key === "offline") return "1920x1080";
  if (key === "1920x480" || key === "xl" || key === "wall" || key === "facebook") return "1920x480";
  if (key === "s" || key === "discord" || key === "tiktok") return "1200x480";
  if (key === "l" || key === "x") return "1920x480";
  return "1200x480";
}

export const MODES = [
  "",
  "Main",
  "Ironman",
  "Hardcore Ironman",
  "Ultimate Ironman",
  "Group Ironman",
  "Leagues",
];
export const FOCUSES = [
  "",
  "PvM",
  "Raids",
  "Slayer",
  "Skilling",
  "Quests",
  "Clues",
  "PvP",
  "Leagues",
];
export const STYLES = ["", "Melee", "Ranged", "Magic", "Necromancy", "Hybrid"];
export const CAPES = [
  "",
  "Max",
  "Completionist",
  "Trimmed comp",
  "Fire cape",
  "Infernal",
  "Quest point",
  "Achievement diary",
  "Music",
];
export const TEXT_INKS = [
  { name: "Jagex yellow", value: "#f5c400" },
  { name: "Chat yellow", value: "#ffff00" },
  { name: "White", value: "#f4efe4" },
  { name: "Parchment", value: "#e0b45c" },
];

export const RULES = {
  title: "Rules of RuneScape",
  sections: [
    { heading: "Honour", body: "Play fair. Do not scam, lure, or buy gold." },
    { heading: "Respect", body: "No hate in public chat. Treat other players as players." },
    { heading: "Security", body: "Never share a password. Jagex will not ask for one." },
  ],
};

const COOL_OSRS = ["osrszanaris", "osrslumbridge", "osrstears", "osrsseers", "hosidius", "osrsprif"];
const COOL_RS3 = ["zanaris", "lumbridge", "tears", "prifddinas", "grandexchange", "warsretreat"];

export function coolPlacesAt(now = Date.now()) {
  const hour = Math.floor(now / 3_600_000);
  const osrs = COOL_OSRS.slice(hour % 3, hour % 3 + 3);
  const rs3 = COOL_RS3.slice(hour % 3, hour % 3 + 3);
  const padO = osrs.length < 3 ? [...osrs, ...COOL_OSRS].slice(0, 3) : osrs;
  const padR = rs3.length < 3 ? [...rs3, ...COOL_RS3].slice(0, 3) : rs3;
  return [...padO, ...padR];
}

export function townAtHour(now = Date.now(), edition: Edition = "RS3") {
  const list = LOCATIONS.filter((l) => l.kind === "town" && l.edition === edition);
  const hour = Math.floor(now / 3_600_000);
  return list[hour % list.length] ?? LOCATIONS[0];
}
