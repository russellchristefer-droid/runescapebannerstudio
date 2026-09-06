/** Fan flavour only. Not live worlds. No player names. */

const OSRS: Record<string, string[]> = {
  osrslumbridge: [
    "Duke’s clerk: the courtyard still wakes strangers. The meadow is grass. Leave the crater title home.",
    "Bridge guard: river first, castle second. Goblins on the east road are the first lesson.",
    "Miller: the wheel turns. Tutorial is a rumour the water has not forgotten.",
  ],
  osrsfalador: [
    "White Knight on the square: walls hold. Kinshra are weather, not a schedule I print.",
    "Rising Sun keep: knights drill, the park rests, the party room is still a room.",
    "Park warden: virtue in limestone. Slapstick lives in the same postcode.",
  ],
  osrsvarrock: [
    "Palace clerk: Roald’s name is on the writ. The slums keep their own hours.",
    "Exchange runner: price is a public sentence. This desk does not print one.",
    "Gertrude’s neighbour: the sill has a cat. Palaces inflate. The slums persist.",
  ],
  osrsprif: [
    "Elven door-warden: the city grew back from a seed. Song of the Elves is the constitution here.",
    "Crystal-stall: eight towers, one voice. No hour-clan on this card.",
    "Singer on the stair: the song is public. I do not sell a clan name.",
  ],
  osrsedge: [
    "A guard: monastery west, ditch north. The line is the point.",
    "Monk: we keep the hill. The wilderness is weather. Protect item.",
    "Adventurer at the ditch: cross it knowing the grammar.",
  ],
  osrsdraynor: [
    "Market guard: willows, bank, and a village that remembers worse nights.",
    "Willow cutter: the trees are the work. Draynor keeps its voice down.",
    "Bank clerk: I do not discuss the manor after dark.",
  ],
  osrscani: [
    "Innkeep: Hair of the Dog. Priest in Peril is the crossing. Humans without leave are prey.",
    "Tanner: Drakan’s fog is the law. I do not sell a later campaign.",
    "Temple acolyte: Zamorak’s house. The Salve is behind you. Keep walking.",
  ],
  osrsent: [
    "Monk at the slip: no weapons. No armour. The wipe is the item you forgot to bank.",
    "Dock warden: Port Sarim searches you. That is the dock rule.",
    "Novice: Lost City begins in that vow. Entrana is not a fort.",
  ],
};

const RS3: Record<string, string[]> = {
  lumbridge: [
    "Courtyard watch: strangers still appear. The crater is part of the walk now.",
    "Church sexton: the bell and the rim of the wound share a town.",
    "Bridge guard: rebuild is polite. The meadow remembers otherwise.",
  ],
  falador: [
    "White Knight: the square still performs order. The walls have taken hits this client recorded.",
    "Rising Sun keep: same postcode for piety and farce.",
    "Park warden: I sweep limestone. I do not print Kinshra hours.",
  ],
  varrock: [
    "Palace clerk: the crown speaks. The Exchange answers in numbers.",
    "South-east stall: unrest is weather. I do not sell it.",
    "Square runner: price is public. Gossip is not my stock.",
  ],
  prifddinas: [
    "Tower door: the hour will turn. This desk will not name the clan.",
    "Crystal-stall: Voice of Seren is a pulse. Confirm it on Today.",
    "Clerk: no clan pair on this card. The clock is enough.",
  ],
  edgeville: [
    "Guard: the ditch is still a dare in this client. Protect item.",
    "Monk: the hill holds. I do not price the wilderness.",
    "Adventurer: the line is the point. Cross it knowing the grammar.",
  ],
  menaphos: [
    "Gate clerk: four districts. The gates opened. Confirm the hour on the wiki.",
    "River porter: sun and river. I do not invent a God Wars seat.",
    "Stall: the golden city is work. Leave an Old School shut-gate title home.",
  ],
  cityofum: [
    "Ferry: the living walk as guests. The dead keep the market.",
    "Necromancer: Rasial’s shadow is on the stone. That fight is on Bosses.",
    "Clerk: I do not sell an enrage. Confirm the hour on the wiki.",
  ],
};

const FALLBACK_OSRS = [
  "A guard: keep walking. The street is the 2007-era plan.",
  "A stallholder: I sell what the client shows. The wiki keeps the hour.",
  "A clerk: no later crater lives on this card.",
];

const FALLBACK_RS3 = [
  "A clerk: later-age weather only where the live page says so.",
  "A stallholder: I do not invent raids. Official news wins.",
  "A guard: this street is this client. Do not paste the other grammar.",
];

function padLines(lines: string[], fallback: string[]) {
  const out = [...lines];
  let i = 0;
  while (out.length < 3) {
    out.push(fallback[i % fallback.length]!);
    i += 1;
  }
  return out;
}

export function streetTalk(id: string, game: "osrs" | "rs3"): string[] {
  const raw = game === "osrs" ? OSRS[id] ?? FALLBACK_OSRS : RS3[id] ?? FALLBACK_RS3;
  return padLines(raw.length ? raw : FALLBACK_OSRS, game === "osrs" ? FALLBACK_OSRS : FALLBACK_RS3);
}
