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
  osrsalkharid: [c("Palace guard", "/stills/osrs/citizens/al-kharid-1.png")],
  osrscatherby: [c("Fisher", "/stills/osrs/citizens/catherby-1.png")],
  osrsardougne: [c("Knight of Ardougne", "/stills/osrs/citizens/ardougne-1.png")],
  osrsyanille: [c("Wizard", "/stills/osrs/citizens/yanille-1.png")],
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

const DEFAULT_OSRS: Citizen[] = [
  c("Guard", "/stills/osrs/citizens/_default-0.png"),
  c("Stallholder", "/stills/osrs/citizens/_default-1.png"),
];

const DEFAULT_RS3: Citizen[] = [
  c("Guard", "/stills/rs3/citizens/_default-0.png"),
  c("Clerk", "/stills/rs3/citizens/_default-1.png"),
];

export function citizenPool(id: string, game: "osrs" | "rs3"): Citizen[] {
  const named = game === "osrs" ? OSRS[id] : RS3[id];
  const fallback = game === "osrs" ? DEFAULT_OSRS : DEFAULT_RS3;
  return named?.length ? named : fallback;
}

export function citizenFor(id: string, game: "osrs" | "rs3", now = Date.now()): Citizen {
  const pool = citizenPool(id, game);
  const i = Math.floor(now / 300000);
  return pool[i % pool.length]!;
}
