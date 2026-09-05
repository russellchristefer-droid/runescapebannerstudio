/** Fan flavour only. Not live worlds. No player names. */

const OSRS: Record<string, string[]> = {
  osrslumbridge: [
    "Duke’s clerk: the courtyard still wakes strangers. The meadow is grass. Mind the goblins on the east road.",
    "Bridge guard: river first, castle second. If you came looking for a crater you are in the wrong grammar.",
    "Miller: the wheel turns. Tutorial is a rumour the water has not forgotten.",
  ],
  osrsfalador: [
    "White Knight on the square: walls hold. Kinshra are a weather, not a schedule I print.",
    "Rising Sun keep: knights drill, the park rests, the party room is still a room.",
    "Park warden: virtue in limestone. Slapstick lives in the same postcode. That is the town.",
  ],
  osrsvarrock: [
    "Palace clerk: Roald’s name is on the writ. The slums keep their own hours.",
    "Exchange runner: price is a public sentence. The square still argues.",
    "Gertrude’s neighbour: the sill has a cat. Palaces inflate. The slums persist.",
  ],
  osrsprif: [
    "Elven door-warden: the city grew back from a seed. Song of the Elves is the constitution here.",
    "Crystal-stall: eight towers, one voice. No hour-clan on this card.",
    "Singer on the stair: the song is public. I do not sell a clan name.",
  ],
  osrsedge: [
    "A guard: keep walking. Monastery west, ditch north.",
    "Monk: we keep the hill. The wilderness is a weather, not a sermon I finish.",
    "Adventurer at the ditch: the line is the point. Cross it knowing the grammar.",
  ],
  osrsdraynor: [
    "Market guard: willows, bank, and a village that remembers worse nights.",
    "Willow cutter: the trees are the work. Draynor keeps its voice down.",
    "Bank clerk: I do not discuss the manor after dark.",
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
    "Crystal-stall: Voice of Seren is a pulse. I sell thread, not a forecast.",
    "Clerk: no clan pair on this card. The clock is enough.",
  ],
  edgeville: [
    "Guard: the ditch is still a dare in this client. The village keeps its voice down.",
    "Monk: the hill holds. I do not price the wilderness.",
    "Adventurer: the line is the point. Cross it knowing the grammar.",
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
