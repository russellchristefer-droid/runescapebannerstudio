import { bossPvme, bossStrategy, bossWiki, bossWipe, noteFor, type BossNote } from "./boss-notes";

export type RankedSource = {
  rank: 1 | 2 | 3;
  label: string;
  href: string;
  unofficial?: boolean;
};

export type PrayerPhase = { phase: string; pray: string };

export type OsrsDesk = {
  inventory: string[];
  inventoryNote: string;
  prayers: PrayerPhase[];
  tiles: string;
  stand?: string[];
  spec: string;
};

export type Rs3Desk = {
  bar: string[];
  revolution: string;
  familiar: string;
  pocket: string;
  relic: string;
  enrage?: string;
};

export type FightSheet = {
  id: string;
  title: string;
  edition: "OSRS" | "RS3";
  opener: string[];
  wipe: string;
  sources: RankedSource[];
  osrs?: OsrsDesk;
  rs3?: Rs3Desk;
};

const OSRS_HUB = "https://oldschool.runescape.com/";
const RS3_HUB = "https://www.runescape.com/";
const OSRS_NEWS = "https://secure.runescape.com/m=news/archive?oldschool=1";
const RS3_NEWS = "https://secure.runescape.com/m=news/list?cat=1&page=1";

export function padInv(items: string[], filler: string): string[] {
  const out = items.filter(Boolean).slice(0, 28);
  while (out.length < 28) out.push(filler);
  return out.slice(0, 28);
}

function official(note: BossNote): RankedSource {
  return note.edition === "OSRS"
    ? { rank: 1, label: "Official Old School · news / PvM desk", href: OSRS_NEWS }
    : { rank: 1, label: "Official RuneScape · news / PvM desk", href: RS3_NEWS };
}

function wikiSrc(note: BossNote): RankedSource {
  return {
    rank: 2,
    label: note.edition === "OSRS" ? `${note.title} · OSRS wiki` : `${note.title} · RuneScape wiki`,
    href: bossWiki(note),
  };
}

function unofficial(label: string, href: string): RankedSource {
  return { rank: 3, label: `${label} · Unofficial`, href, unofficial: true };
}

const SHEETS: Record<string, FightSheet> = {
  inferno: {
    id: "inferno",
    title: "The Inferno",
    edition: "OSRS",
    opener: [
      "Fire cape is the ticket. Fight Caves until Jad is boring. Inferno is a second exam.",
      "North pillar first. Ice Barrage the nibbler pack from the west side of that pillar so the south spawn is not in sight.",
      "Solve the stack in front of you. Do not think about Zuk on wave 12.",
    ],
    wipe: "A blob stacked on a ranger you did not solve, or Zuk Jad healers left alive into the next set.",
    sources: [
      official(noteFor("inferno")!),
      wikiSrc(noteFor("inferno")!),
      unofficial("OSRSBestInSlot Inferno sheet", "https://www.osrsbestinslot.com/boss-gear-and-guides/the-inferno/"),
    ],
    osrs: {
      inventoryNote:
        "First-cape bag. Twisted bow or Bow of Faerdhinen is worn, not bagged. Wiki Strategies wins if this disagrees with a clip.",
      inventory: padInv(
        [
          "Toxic blowpipe",
          "Eldritch nightmare staff",
          "Ancestral robe top",
          "Ancestral robe bottom",
          "Ancestral hat",
          "Occult necklace",
          "Imbued god cape",
          "Rune pouch",
          "Divine rune pouch",
          "Bastion potion",
          "Bastion potion",
          "Stamina potion",
          "Prayer regeneration potion",
          "Prayer regeneration potion",
          "Super restore",
          "Super restore",
          "Super restore",
          "Super restore",
          "Super restore",
          "Saradomin brew",
          "Saradomin brew",
          "Saradomin brew",
          "Saradomin brew",
          "Saradomin brew",
          "Saradomin brew",
          "Saradomin brew",
          "Saradomin brew",
          "Saradomin brew",
        ],
        "Saradomin brew",
      ),
      prayers: [
        { phase: "Waves 1–33", pray: "Protect Missiles. Rigour on. Priority mager > ranger > meleer > blob > bat." },
        { phase: "Waves 35–66", pray: "Protect Magic unless the spawn in your face is a ranger. Augury when you swap to mage." },
        { phase: "Triple Jad", pray: "The animation that is about to land. Sound first on mage. Delayed slam is range." },
        { phase: "Zuk", pray: "The shield is the prayer. Setters and Jad heals are the exam. No overhead stops Zuk." },
      ],
      tiles:
        "North pillar to start. Trap behind a pillar; diagonal safespot on the south corner. Zuk: stay behind the shield, middle or a half-tile forward. Corners east and west are safespots when the shield parks. Mark with a vial if you must — no plugin overlay on this desk.",
      stand: [
        "1 North pillar, west face — first nibbler freeze.",
        "2 South-east of that pillar — hide the south spawn.",
        "3 Zuk shield centre — default stand.",
        "4 Zuk east corner — when the shield walks east.",
        "5 Zuk west corner — when the shield walks west.",
      ],
      spec: "Eldritch staff spec when prayer is thin. Blowpipe spec is extra damage, not a plan. Thralls if you brought the book — tag after the stack is solved. Death charge is not the cape.",
    },
  },
  tob: {
    id: "tob",
    title: "Theatre of Blood",
    edition: "OSRS",
    opener: [
      "Entry mode until Maiden crabs are a call. One new seat per run.",
      "Say the role at the chest: melee, range, or freezer. Learners bring one bag that covers all three.",
      "Scythe is the team ticket. Hasta plus void still clears Entry. Hard mode is a different night.",
    ],
    wipe: "A Maiden crab on the wrong side, or a Sotetseg maze tile nobody called.",
    sources: [
      official(noteFor("tob")!),
      wikiSrc(noteFor("tob")!),
      unofficial("OSRSBestInSlot Theatre sheet", "https://www.osrsbestinslot.com/boss-gear-and-guides/theatre-of-blood/"),
    ],
    osrs: {
      inventoryNote:
        "Learner void bag that can sit any seat. Worn: void melee helm, elite void, avernic or dragon defender, fire cape. Swap helms live.",
      inventory: padInv(
        [
          "Scythe of vitur",
          "Sanguinesti staff",
          "Toxic blowpipe",
          "Void mage helm",
          "Void ranger helm",
          "Occult necklace",
          "Necklace of anguish",
          "Dragon warhammer",
          "Dragon claws",
          "Rune pouch",
          "Book of the dead",
          "Super combat potion",
          "Ranging potion",
          "Stamina potion",
          "Super restore",
          "Super restore",
          "Super restore",
          "Saradomin brew",
          "Saradomin brew",
          "Saradomin brew",
          "Saradomin brew",
          "Saradomin brew",
          "Saradomin brew",
          "Anglerfish",
          "Anglerfish",
          "Sanfew serum",
          "Salve amulet (ei)",
          "Saturated heart",
        ],
        "Saradomin brew",
      ),
      prayers: [
        { phase: "Maiden", pray: "Protect Magic." },
        { phase: "Bloat", pray: "Protect Missiles. Walk the stomp; standing still is the wipe." },
        { phase: "Nylos", pray: "The style of the boss form. Pillars first." },
        { phase: "Sotetseg", pray: "The projectile colour. Maze is one caller." },
        { phase: "Xarpus", pray: "Protect Missiles when he is exposed. Redemption is a later seat." },
        { phase: "Verzik P1", pray: "Protect Magic. Crabs." },
        { phase: "Verzik P2", pray: "Protect Missiles. Leave the yellow pool." },
        { phase: "Verzik P3", pray: "The auto she is using. Tornadoes are a walk." },
      ],
      tiles:
        "Maiden: crabs die on their side. A leak heals her. Bloat: walk during the stomp, do not plant. Nylos: hold a pillar. Sotetseg: the maze path the caller said — one wrong tile is a death. Xarpus: do not stand in poison splash. Verzik P2: step off yellow.",
      stand: [
        "1 Maiden north line — north freezer crabs.",
        "2 Maiden south line — south freezer crabs.",
        "3 Bloat walk ring — never the sleep tile.",
        "4 Nylo pillar you were given.",
        "5 Sotetseg maze start — wait for the call.",
      ],
      spec: "Maiden: warhammer or maul for defence, then claws. Bloat: BGS on a run-by if the team uses it. Verzik P3: dump melee specs at enrage. Thralls on Arceuus if that is your seat. Death charge is not Entry homework.",
    },
  },
  toa: {
    id: "toa",
    title: "Tombs of Amascut",
    edition: "OSRS",
    opener: [
      "0 invocation until every room has a name. Solo or a quiet two-man.",
      "Yellow Keris on the path bosses. Wardens want the style the skull asks.",
      "Leave after two wipes on the same room. That room is the lesson.",
    ],
    wipe: "Kephri dung or a Zebak wave you did not jug. Wardens is rarely the first wipe.",
    sources: [
      official(noteFor("toa")!),
      wikiSrc(noteFor("toa")!),
      unofficial("OSRS wiki Strategies · ToA", "https://oldschool.runescape.wiki/w/Tombs_of_Amascut/Strategies"),
    ],
    osrs: {
      inventoryNote: "Learner bag. Shadow or sang is worn if you own it. Yellow Keris stays in the bag until a path boss.",
      inventory: padInv(
        [
          "Yellow keris",
          "Toxic blowpipe",
          "Trident of the swamp",
          "Osmumten's fang",
          "Dragon warhammer",
          "Lightbearer",
          "Saturated heart",
          "Rune pouch",
          "Book of the dead",
          "Bastion potion",
          "Super combat potion",
          "Stamina potion",
          "Super restore",
          "Super restore",
          "Super restore",
          "Super restore",
          "Saradomin brew",
          "Saradomin brew",
          "Saradomin brew",
          "Saradomin brew",
          "Saradomin brew",
          "Saradomin brew",
          "Sanfew serum",
          "Menaphite remedy",
          "Honey locust",
          "Honey locust",
          "Liquid adrenaline",
          "Smelling salts",
        ],
        "Saradomin brew",
      ),
      prayers: [
        { phase: "Akkha", pray: "The style he just used. Memory tiles first." },
        { phase: "Ba-Ba", pray: "Protect Melee. Boulder line." },
        { phase: "Kephri", pray: "Protect Magic. Dunk dung. Swarms down." },
        { phase: "Zebak", pray: "Missiles, then mage on the roar. Jugs on waves." },
        { phase: "Wardens", pray: "The skull he is charging. Walk the last slam." },
      ],
      tiles:
        "Akkha memory: stand the tile the room painted. Baba: one boulder line. Kephri: dung goes in the scarab, not the floor. Zebak: jugs hit waves; acid is a walk. Wardens: charged skull is a leave.",
      spec: "Keris spec on path bosses. Lightbearer if you own it. Thralls after the room is stable. Death charge on Wardens only if the invocation list you practiced includes it.",
    },
  },
  cox: {
    id: "cox",
    title: "Chambers of Xeric",
    edition: "OSRS",
    opener: [
      "Learn one layout. Do not first-time Olm in a 15-man.",
      "Points come from rooms. The head is the exam, not the whole raid.",
      "Spec the mage claw. Melee the left. Range the head when he stands.",
    ],
    wipe: "Teleport crystal in the middle, or a claw you hit while praying the head.",
    sources: [
      official(noteFor("cox")!),
      wikiSrc(noteFor("cox")!),
      unofficial("OSRS wiki Strategies · CoX", "https://oldschool.runescape.wiki/w/Chambers_of_Xeric/Strategies"),
    ],
    osrs: {
      inventoryNote: "Learner trio bag. Scythe / sang / tbow worn if you have them. Overload and brews come from the raid.",
      inventory: padInv(
        [
          "Dragon warhammer",
          "Bandos godsword",
          "Toxic blowpipe",
          "Trident of the swamp",
          "Rune pouch",
          "Stamina potion",
          "Super combat potion",
          "Ranging potion",
          "Sanfew serum",
          "Saradomin brew",
          "Saradomin brew",
          "Super restore",
          "Super restore",
          "Anglerfish",
          "Anglerfish",
          "Book of the dead",
          "Twisted bow",
          "Scythe of vitur",
          "Sanguinesti staff",
          "Elder maul",
        ],
        "Saradomin brew",
      ),
      prayers: [
        { phase: "Rooms", pray: "The style in that room. Call swaps." },
        { phase: "Olm melee claw", pray: "Protect Melee. Stay off the wrong claw." },
        { phase: "Olm mage claw", pray: "Protect Magic." },
        { phase: "Olm head", pray: "The style he is using. Last phase range the head." },
      ],
      tiles: "Do not tank a teleport crystal in the middle. Hands: stand the claw you are assigned. Head phase: the tiles the caller uses.",
      spec: "Warhammer or maul on the mage claw. Specials are for defence drain, then damage. Thralls if Arceuus is up.",
    },
  },
  vorkath: {
    id: "vorkath",
    title: "Vorkath",
    edition: "OSRS",
    opener: [
      "Super antifire plus a dragonfire ward or shield. Salve (ei) if you wear it.",
      "Count six autos, then the special. Acid or spawn — never guess.",
      "Bank a trip with two deaths planned. Pools before kills/hr.",
    ],
    wipe: "Acid path you zig-zagged, or a spawn left under a fireball.",
    sources: [
      official(noteFor("vorkath")!),
      wikiSrc(noteFor("vorkath")!),
      unofficial("Woox walk method · Unofficial clip culture", "https://oldschool.runescape.wiki/w/Vorkath/Strategies"),
    ],
    osrs: {
      inventoryNote: "Ranged trip. Zaryte or tbow worn. Woox walk is extra kills after the six-count is automatic — not hour one.",
      inventory: padInv(
        [
          "Toxic blowpipe",
          "Slayer staff",
          "Ruby dragon bolts (e)",
          "Diamond dragon bolts (e)",
          "Extended super antifire",
          "Divine ranging potion",
          "Super restore",
          "Super restore",
          "Super restore",
          "Prayer potion",
          "Prayer potion",
          "Manta ray",
          "Manta ray",
          "Manta ray",
          "Manta ray",
          "Manta ray",
          "Manta ray",
          "Manta ray",
          "Manta ray",
          "Manta ray",
          "Anti-venom+",
          "Rune pouch",
        ],
        "Manta ray",
      ),
      prayers: [
        { phase: "Grounded", pray: "Protect Missiles + Rigour. Walk the pink fireball." },
        { phase: "Acid", pray: "Same overhead. One straight line." },
        { phase: "Spawn", pray: "Crumble undead, then resume the six-count." },
      ],
      tiles: "Pink fireball: step one tile. Acid: one-tile path, no panic-click. Spawn: kill it before the next fireball.",
      spec: "Blowpipe or zaryte spec on the first grounded hits. Crumble on the spawn. Death charge is extra, not the trip.",
    },
  },
  zulrah: {
    id: "zulrah",
    title: "Zulrah",
    edition: "OSRS",
    opener: [
      "Pin a rotation. First ten kills are the rotation, not DPS.",
      "Diary cape or scroll for the boat.",
      "Swap on the colour. Jad phase: pray the first hit before you click.",
    ],
    wipe: "Wrong colour prayer on Jad phase, or a tile from the other rotation.",
    sources: [
      official(noteFor("zulrah")!),
      wikiSrc(noteFor("zulrah")!),
      unofficial("OSRS wiki Zulrah rotations", "https://oldschool.runescape.wiki/w/Zulrah/Strategies"),
    ],
    osrs: {
      inventoryNote: "Mage camp with a range switch. Shadow or sang worn if you have it.",
      inventory: padInv(
        [
          "Toxic blowpipe",
          "Masori body (f)",
          "Masori chaps (f)",
          "Masori mask (f)",
          "Necklace of anguish",
          "Pegasian boots",
          "Barrows gloves",
          "Divine ranging potion",
          "Saturated heart",
          "Anti-venom+",
          "Rune pouch",
          "Book of the dead",
          "Super restore",
          "Super restore",
          "Saradomin brew",
          "Saradomin brew",
          "Saradomin brew",
          "Manta ray",
          "Manta ray",
          "Manta ray",
          "Manta ray",
          "Stamina potion",
        ],
        "Manta ray",
      ),
      prayers: [
        { phase: "Green", pray: "Protect Missiles. Range it." },
        { phase: "Red / blue", pray: "Protect Magic." },
        { phase: "Jad phase", pray: "The style that is about to land. Prayer first, click second." },
      ],
      tiles: "Stand the tile the rotation sheet marked for that spawn. Do not invent a third rotation mid-kill.",
      spec: "Blowpipe spec on green. Thralls if you brought the book. Death charge is not the first ten kills.",
    },
  },
  rasial: {
    id: "rasial",
    title: "Rasial",
    edition: "RS3",
    opener: [
      "Necromancy only. Other styles do not count.",
      "Conjures up outside the portal. Living Death is a window, not a panic button.",
      "City of Um. One preset. Open the wiki page and the PvME page the morning you push.",
    ],
    wipe: "Living Death window dropped on a volley, or minions left to eat the skulls.",
    sources: [
      official(noteFor("rasial")!),
      wikiSrc(noteFor("rasial")!),
      unofficial("PvME Rasial sheet", "https://pvme.io/pvme-guides/rs3-full-boss-guides/rasial/"),
    ],
    rs3: {
      bar: [
        "Touch of Death",
        "Soul Sap",
        "Necromancy auto",
        "Finger of Death",
        "Death Skulls",
        "Volley of Souls",
        "Bloat",
        "Living Death",
        "Death Grasp (spec)",
        "Reflect",
        "Freedom",
        "Disrupt",
      ],
      revolution:
        "Learners: a long revolution that fires the builders. Desk: short revolution, manual Skulls / Living Death / Volley. PvME lists tick waits — treat those as unofficial until the wiki agrees.",
      familiar: "Ripper Demon or Kal'gerion if the wiki page for this hour still lists them. Hellhound plus Prism if you are learning and need the heal.",
      pocket: "Scripture of Wen, or Jas, or Erethdor's grimoire if that is your log. Salve (e) stays on the neck.",
      relic: "Conservation of Energy is the usual desk pick. Fury of the Small and Persistent Rage are the common neighbours. Check the live relic page.",
      enrage: "No enrage ladder like Telos. Phases 1–3 are the conjure cycle. Phase 4 is dump and Death Mark. Do not chase a 1:03 clip on a first kill.",
    },
  },
  telos: {
    id: "telos",
    title: "Telos, the Warden",
    edition: "RS3",
    opener: [
      "0–100% until fonts and anima are boring. Do not jump to 200 because a VOD did.",
      "War's Retreat. One preset. Write the enrage on the screen.",
      "Fonts are the wipe: stand the matching colour.",
    ],
    wipe: "Wrong font colour. The room ends the pull; the HP bar does not.",
    sources: [
      official(noteFor("telos")!),
      wikiSrc(noteFor("telos")!),
      unofficial("PvME Telos sheet", "https://pvme.io/pvme-guides/rs3-full-boss-guides/telos/"),
    ],
    rs3: {
      bar: [
        "Touch of Death",
        "Soul Sap",
        "Finger of Death",
        "Death Skulls",
        "Volley of Souls",
        "Bloat",
        "Living Death",
        "Vulnerability bomb",
        "Stun",
        "Reflect",
        "Resonance",
        "Freedom",
      ],
      revolution: "Long revolution while fonts are new. Manual the stun and the anima spend. Full manual is a later enrage.",
      familiar: "Ripper or the familiar the live PvME preset still lists. Do not mix three discords.",
      pocket: "Scripture that matches your style. Necro desk usually Wen or Jas.",
      relic: "Conservation of Energy / Fury of the Small. Confirm on the wiki relic list this hour.",
      enrage:
        "Add 25% only after two clean kills. 100% is the same rooms with less time. 200%+ one missed font is the kill.",
    },
  },
  zuk: {
    id: "zuk",
    title: "TzKal-Zuk",
    edition: "RS3",
    opener: [
      "Waves are the exam. Zuk is the last question.",
      "Open PvME the morning you push. A cape is a wave log.",
    ],
    wipe: "A wave you did not solve, or Zuk healers left into the next set.",
    sources: [
      official(noteFor("zuk")!),
      wikiSrc(noteFor("zuk")!),
      unofficial("PvME kiln / Zuk", "https://pvme.io/"),
    ],
    rs3: {
      bar: ["Touch of Death", "Soul Sap", "Finger of Death", "Death Skulls", "Volley of Souls", "Living Death", "Reflect", "Freedom", "Disrupt", "Resonance"],
      revolution: "Revolution through waves. Manual Zuk defensives.",
      familiar: "Ripper or the year-one familiar on the wiki page.",
      pocket: "Scripture of Wen or the pocket the preset lists.",
      relic: "Conservation of Energy.",
    },
  },
  sanctum: {
    id: "sanctum",
    title: "Sanctum of Rebirth",
    edition: "RS3",
    opener: [
      "Learn the wing you were given. Do not first-time every wing in one night.",
      "What the lead listed is the bag. One talker.",
    ],
    wipe: "A wing mechanic you did not own. Last boss is not the first wipe.",
    sources: [
      official(noteFor("sanctum")!),
      wikiSrc(noteFor("sanctum")!),
      unofficial("PvME raid desk", "https://pvme.io/"),
    ],
    rs3: {
      bar: ["Touch of Death", "Soul Sap", "Finger of Death", "Death Skulls", "Volley of Souls", "Bloat", "Living Death", "Reflect", "Freedom", "Disrupt"],
      revolution: "Team sheet first. Revolution unless the lead called full manual.",
      familiar: "What the raid pin listed.",
      pocket: "What the raid pin listed.",
      relic: "What the raid pin listed.",
    },
  },
};

function fallbackOsrs(note: BossNote): OsrsDesk {
  const items = note.kit
    .join(", ")
    .split(/[,.]/)
    .map((s) => s.replace(/^(Learner|Desk):\s*/i, "").trim())
    .filter((s) => s.length > 3 && s.length < 42)
    .slice(0, 12);
  const bag = [note.style.split(".")[0] ?? "Switch", ...items, "Super restore", "Rune pouch", "Stamina potion"];
  return {
    inventoryNote: "Starter bag from this desk’s kit. Confirm names on the wiki Strategies page before you pull.",
    inventory: padInv(bag, "Saradomin brew"),
    prayers: [{ phase: "Fight", pray: note.pray }],
    tiles: note.route[0] ?? "Stand where the wiki Strategies page stands.",
    spec: "Spec when the room is stable. Thralls if you brought the book. Do not invent a tick count.",
  };
}

function fallbackRs3(note: BossNote): Rs3Desk {
  return {
    bar: ["Touch of Death", "Soul Sap", "Finger of Death", "Death Skulls", "Volley of Souls", "Bloat", "Freedom", "Reflect", "Resonance", "Disrupt"],
    revolution: "Revolution until the mechanic is boring. Full manual only if that is your log.",
    familiar: "Ripper Demon or the familiar on the wiki page for this hour.",
    pocket: "Scripture that matches the style you brought.",
    relic: "Conservation of Energy unless the lead pinned another.",
    enrage: note.role.toLowerCase().includes("enrage") ? "Add enrage after two clean kills." : undefined,
  };
}

export function sheetFor(id: string): FightSheet | null {
  const note = noteFor(id);
  if (!note) return null;
  const custom = SHEETS[id];
  if (custom) return custom;
  return {
    id: note.id,
    title: note.title,
    edition: note.edition,
    opener: note.start,
    wipe: bossWipe(note),
    sources: [
      official(note),
      wikiSrc(note),
      note.edition === "RS3"
        ? unofficial("PvME · not Jagex", bossPvme(note) ?? "https://pvme.io/")
        : unofficial(`${note.title} Strategies`, bossStrategy(note)),
    ],
    osrs: note.edition === "OSRS" ? fallbackOsrs(note) : undefined,
    rs3: note.edition === "RS3" ? fallbackRs3(note) : undefined,
  };
}

export function hubFor(edition: "OSRS" | "RS3") {
  return edition === "OSRS" ? OSRS_HUB : RS3_HUB;
}
