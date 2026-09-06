export type Citizen = {
  role: string;
  src?: string;
};

function c(role: string, src?: string): Citizen {
  return src ? { role, src } : { role };
}

const OSRS: Record<string, Citizen[]> = {
  osrslumbridge: [
    c("Duke's clerk", "/stills/osrs/citizens/lumbridge-1.png"),
    c("Town guard", "/stills/osrs/citizens/lumbridge-2.png"),
  ],
  osrsfalador: [c("White Knight", "/stills/osrs/citizens/falador-1.png")],
  osrsvarrock: [
    c("Stallholder", "/stills/osrs/citizens/varrock-1.png"),
    c("Guard", "/stills/osrs/citizens/varrock-2.png"),
  ],
  osrsedge: [
    c("Guard", "/stills/osrs/citizens/edgeville-1.png"),
    c("Monk", "/stills/osrs/citizens/edgeville-2.png"),
    c("Adventurer at the ditch", "/stills/osrs/citizens/edgeville-3.png"),
  ],
  osrsdraynor: [c("Market guard", "/stills/osrs/citizens/draynor-1.png")],
  osrsalk: [c("Palace guard", "/stills/osrs/citizens/al-kharid-1.png")],
  osrscath: [c("Fisher", "/stills/osrs/citizens/catherby-1.png")],
  osrsard: [c("Knight of Ardougne", "/stills/osrs/citizens/ardougne-1.png")],
  osrsyan: [c("Wizard", "/stills/osrs/citizens/yanille-1.png")],
  osrsprif: [c("Elven door-warden", "/stills/osrs/citizens/prifddinas-1.png")],
};

const RS3: Record<string, Citizen[]> = {
  lumbridge: [
    c("Duke's clerk", "/stills/rs3/citizens/lumbridge-1.png"),
    c("Town guard", "/stills/rs3/citizens/lumbridge-2.png"),
  ],
  falador: [c("White Knight", "/stills/rs3/citizens/falador-1.png")],
  varrock: [
    c("Stallholder", "/stills/rs3/citizens/varrock-1.png"),
    c("Guard", "/stills/rs3/citizens/varrock-2.png"),
  ],
  edgeville: [
    c("Guard", "/stills/rs3/citizens/edgeville-1.png"),
    c("Monk", "/stills/rs3/citizens/edgeville-2.png"),
  ],
  draynor: [c("Market guard", "/stills/rs3/citizens/draynor-1.png")],
  alkharid: [c("Palace guard", "/stills/rs3/citizens/alkharid-1.png")],
  prifddinas: [c("Elven door-warden", "/stills/rs3/citizens/prifddinas-1.png")],
};

const APE_OSRS: Citizen[] = [
  c("Gorilla guard", "/stills/osrs/citizens/ape-gorilla.png"),
  c("Marim monkey", "/stills/osrs/citizens/ape-monkey.png"),
  c("Ninja ape", "/stills/osrs/citizens/ape-ninja.png"),
];

const APE_RS3: Citizen[] = [
  c("Gorilla guard", "/stills/rs3/citizens/ape-gorilla.png"),
  c("Marim monkey", "/stills/rs3/citizens/ape-monkey.png"),
  c("Ninja ape", "/stills/rs3/citizens/ape-ninja.png"),
];

const APE_SLUGS = new Set(["apeatoll", "osrsape", "marim", "marimbo"]);

const GOBLIN_OSRS: Citizen[] = [
  c("Goblin", "/stills/osrs/citizens/goblin-1.png"),
  c("Village goblin", "/stills/osrs/citizens/goblin-2.png"),
];

const GOBLIN_RS3: Citizen[] = [
  c("Goblin", "/stills/rs3/citizens/goblin-1.png"),
  c("Village goblin", "/stills/rs3/citizens/goblin-2.png"),
];

const GOBLIN_SLUGS = new Set(["goblin", "osrsgob", "goblinvillage"]);

const DEFAULT_OSRS: Citizen[] = [
  c("Guard", "/stills/osrs/citizens/_default-0.png"),
  c("Stallholder", "/stills/osrs/citizens/_default-1.png"),
];

const DEFAULT_RS3: Citizen[] = [
  c("Guard", "/stills/rs3/citizens/_default-0.png"),
  c("Clerk", "/stills/rs3/citizens/_default-1.png"),
];

export function citizenPool(id: string, game: "osrs" | "rs3"): Citizen[] {
  if (APE_SLUGS.has(id)) return game === "osrs" ? APE_OSRS : APE_RS3;
  if (GOBLIN_SLUGS.has(id)) return game === "osrs" ? GOBLIN_OSRS : GOBLIN_RS3;
  const named = game === "osrs" ? OSRS[id] : RS3[id];
  const fallback = game === "osrs" ? DEFAULT_OSRS : DEFAULT_RS3;
  const base = named?.length ? named : [];
  const seen = new Set(base.map((row) => row.src ?? row.role));
  const extra = fallback.filter((row) => !seen.has(row.src ?? row.role));
  const pool = [...base, ...extra];
  return pool.length ? pool : fallback;
}

export function citizenFor(id: string, game: "osrs" | "rs3", now = Date.now()): Citizen {
  const pool = citizenPool(id, game);
  const slot = Math.floor(now / 300000);
  return pool[slot % pool.length]!;
}
