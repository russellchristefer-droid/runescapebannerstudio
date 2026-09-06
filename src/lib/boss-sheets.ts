import { bossWiki, bossWipe, noteFor, type BossNote } from "./boss-notes";

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
  role: string;
  style: string;
  opener: string[];
  wipe: string;
  sources: RankedSource[];
  osrs?: OsrsDesk;
  rs3?: Rs3Desk;
};

/** This-boss wiki on the other engine, only when the same fight exists there. */
const SISTER_WIKI: Partial<Record<string, { label: string; href: string }>> = {
  vorkath: { label: "Vorkath · RuneScape wiki", href: "https://runescape.wiki/w/Vorkath" },
  corp: { label: "Corporeal Beast · RuneScape wiki", href: "https://runescape.wiki/w/Corporeal_Beast" },
  nex: { label: "Nex · RuneScape wiki", href: "https://runescape.wiki/w/Nex" },
  araxxor: { label: "Araxxor · OSRS wiki", href: "https://oldschool.runescape.wiki/w/Araxxor" },
  graardor: { label: "General Graardor · RuneScape wiki", href: "https://runescape.wiki/w/General_Graardor" },
  kree: { label: "Kree'arra · RuneScape wiki", href: "https://runescape.wiki/w/Kree%27arra" },
  kril: { label: "K'ril Tsutsaroth · RuneScape wiki", href: "https://runescape.wiki/w/K%27ril_Tsutsaroth" },
  zilyana: { label: "Commander Zilyana · RuneScape wiki", href: "https://runescape.wiki/w/Commander_Zilyana" },
  kq: { label: "Kalphite Queen · RuneScape wiki", href: "https://runescape.wiki/w/Kalphite_Queen" },
};

/** One unofficial sheet per fight. Specific page only — no homepages, no news desks. */
const UNOFFICIAL: Partial<Record<string, { label: string; href: string }>> = {
  inferno: {
    label: "OSRSBestInSlot Inferno sheet",
    href: "https://www.osrsbestinslot.com/boss-gear-and-guides/the-inferno/",
  },
  tob: {
    label: "OSRSBestInSlot Theatre sheet",
    href: "https://www.osrsbestinslot.com/boss-gear-and-guides/theatre-of-blood/",
  },
  vorkath: {
    label: "OSRSBestInSlot Vorkath sheet",
    href: "https://www.osrsbestinslot.com/boss-gear-and-guides/vorkath/",
  },
  rasial: {
    label: "PvME Rasial sheet",
    href: "https://pvme.io/pvme-guides/rs3-full-boss-guides/rasial/",
  },
  telos: {
    label: "PvME Telos sheet",
    href: "https://pvme.io/pvme-guides/rs3-full-boss-guides/telos/",
  },
  zuk: {
    label: "PvME TzKal-Zuk basic",
    href: "https://pvme.io/pvme-guides/basic-guides/tzkal-zuk-basic/",
  },
  sanctum: {
    label: "PvME Sanctum mechanics",
    href: "https://pvme.io/pvme-guides/rs3-full-boss-guides/sanctum/sanctum-hm-mechanics-overview/",
  },
  vorago: {
    label: "PvME Vorago intro",
    href: "https://pvme.io/pvme-guides/rs3-full-boss-guides/vorago/introductory-necro-solo-vorago-guide/",
  },
};

export function padInv(items: string[], filler: string): string[] {
  const out = items.filter(Boolean).slice(0, 28);
  while (out.length < 28) out.push(filler);
  return out.slice(0, 28);
}

function wikiSrc(note: BossNote): RankedSource {
  return {
    rank: 1,
    label: note.edition === "OSRS" ? `${note.title} · OSRS wiki` : `${note.title} · RuneScape wiki`,
    href: bossWiki(note),
  };
}

function unofficial(label: string, href: string, rank: 2 | 3): RankedSource {
  return { rank, label: `${label} · Unofficial`, href, unofficial: true };
}

/** At most three outbound links: this-boss wiki, sister-game wiki if the fight exists, one unofficial. */
export function sourcesFor(note: BossNote): RankedSource[] {
  const out: RankedSource[] = [wikiSrc(note)];
  const sister = SISTER_WIKI[note.id];
  if (sister) {
    out.push({ rank: 2, label: sister.label, href: sister.href });
  }
  const extra = UNOFFICIAL[note.id];
  if (extra && out.length < 3) {
    out.push(unofficial(extra.label, extra.href, out.length === 1 ? 2 : 3));
  }
  return out.slice(0, 3);
}

const SHEETS: Record<string, FightSheet> = {
  inferno: {
    id: "inferno",
    title: "The Inferno",
    edition: "OSRS",
    role: "Solo cape · one pillar, then a shield",
    style: "Range camp. Mage on blobs and Jad. Zuk is a prayer exam, not a DPS check.",
    opener: [
      "Fire cape first. Fight Caves until Jad is boring. Inferno is a second exam.",
      "North pillar. Ice Barrage the nibbler pack from the west face so the south spawn never sees you.",
      "Kill order in front of you: mager, ranger, meleer, blob, bat. Solve that stack. Do not think about Zuk on wave 12.",
      "Triple Jad: sound first on mage, delayed slam is range. One healer at a time.",
      "Zuk: the shield is the prayer. Setters and Jad heals are the exam. Corners when the shield parks.",
    ],
    wipe: "A blob stacked on a ranger you did not solve, or Zuk Jad healers left alive into the next set.",
    sources: [],
    osrs: {
      inventoryNote:
        "First-cape bag. Twisted bow or Bow of Faerdhinen is worn, not bagged. Wiki Strategies wins if a clip disagrees.",
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
        "North pillar to start. Trap behind a pillar; diagonal safespot on the south corner. Zuk: stay behind the shield, middle or a half-tile forward. Corners east and west are safespots when the shield parks. Mark with a vial if you must.",
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
    role: "Raid · 3–5 · one new seat per run",
    style: "Scythe is the team ticket. Range and mage for Maiden nylos and Xarpus. Hasta plus void still clears Entry.",
    opener: [
      "Entry mode until Maiden crabs are a call. One new seat per run.",
      "Say the role at the chest: melee, range, or freezer. Learners bring one bag that covers all three.",
      "Maiden crabs die on their side. A leak heals her. That is the first wipe teacher.",
      "Bloat: walk the stomp. Nylos: hold the pillar you were given. Sotetseg: one maze caller.",
      "Hard mode is a different night. Do not add it to a first purple.",
    ],
    wipe: "A Maiden crab on the wrong side, or a Sotetseg maze tile nobody called.",
    sources: [],
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
      spec: "Maiden: warhammer or maul for defence, then claws. Bloat: BGS on a run-by if the team uses it. Verzik P3: dump melee specs at enrage. Thralls on Arceuus if that is your seat.",
    },
  },
  toa: {
    id: "toa",
    title: "Tombs of Amascut",
    edition: "OSRS",
    role: "Raid · 1–8 · 0 invocation until every room has a name",
    style: "All three styles. Yellow Keris on path bosses. Wardens want the style the skull asks.",
    opener: [
      "0 invocation until every room has a name. Solo or a quiet two-man.",
      "Pick a path and say it. Yellow Keris on Akkha, Ba-Ba, Kephri, Zebak.",
      "Leave after two wipes on the same room. That room is the lesson.",
      "Add one invocation rack only after a clean raid. A clean 50 teaches more than a wipe 200.",
    ],
    wipe: "Kephri dung or a Zebak wave you did not jug. Wardens is rarely the first wipe.",
    sources: [],
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
    role: "Raid · learn one layout",
    style: "Spec the mage claw. Melee the left. Range the head when he stands.",
    opener: [
      "Learn one layout. Do not first-time Olm in a 15-man.",
      "Points come from rooms. The head is the exam, not the whole raid.",
      "Overload and brews come from the raid. Bring the specs and the switches.",
    ],
    wipe: "Teleport crystal in the middle, or a claw you hit while praying the head.",
    sources: [],
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
    role: "Solo slayer / money · six-count first",
    style: "Ranged camp. Zaryte or tbow worn. Super antifire plus a dragonfire ward.",
    opener: [
      "Super antifire plus a dragonfire ward or shield. Salve (ei) if you wear it.",
      "Count six autos, then the special. Acid or spawn — never guess.",
      "Pink fireball: step one tile. Acid: one straight line. Spawn: Crumble Undead before the next fireball.",
      "Bank a trip with two deaths planned. Pools before kills/hr. Woox walk is extra kills after the six-count is automatic.",
    ],
    wipe: "Acid path you zig-zagged, or a spawn left under a fireball.",
    sources: [],
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
    role: "Solo · first ten kills are the rotation",
    style: "Mage camp with a range switch. You swap on the colour, not on HP.",
    opener: [
      "Pin a rotation. First ten kills are the rotation, not DPS.",
      "Diary cape or scroll for the boat. Do not run from the fairy ring every death.",
      "Green is range. Red and blue are mage. Jad phase: pray the first hit before you click.",
      "Stand the tile that rotation marked. Do not invent a third rotation mid-kill.",
    ],
    wipe: "Wrong colour prayer on Jad phase, or a tile from the other rotation.",
    sources: [],
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
  nex: {
    id: "nex",
    title: "Nex",
    edition: "OSRS",
    role: "5-man or mass · four wings then Zaros",
    style: "Magic on smoke and Zaros. Range or mage on shadow. Melee on blood if the team calls it.",
    opener: [
      "Learn the wings as a list: smoke, shadow, blood, ice, then Zaros.",
      "Do not first-time as the person who has to tank a blood siphon.",
      "A 5-man with a caller beats a 20-man with no plan.",
    ],
    wipe: "A blood siphon nobody left, or ice icicles nobody broke.",
    sources: [],
    osrs: {
      inventoryNote: "Learner 5-man bag. Sang or trident worn. Tbow for shadow if the team uses it.",
      inventory: padInv(
        [
          "Toxic blowpipe",
          "Twisted bow",
          "Sanguinesti staff",
          "Dragon warhammer",
          "Bandos godsword",
          "Occult necklace",
          "Necklace of anguish",
          "Rune pouch",
          "Book of the dead",
          "Super combat potion",
          "Ranging potion",
          "Saturated heart",
          "Super restore",
          "Super restore",
          "Super restore",
          "Saradomin brew",
          "Saradomin brew",
          "Saradomin brew",
          "Saradomin brew",
          "Anglerfish",
          "Anglerfish",
          "Sanfew serum",
          "Stamina potion",
        ],
        "Saradomin brew",
      ),
      prayers: [
        { phase: "Smoke", pray: "Protect Magic. Clear minions. Walk the cough." },
        { phase: "Shadow", pray: "Protect Missiles. Stand off her line." },
        { phase: "Blood", pray: "Protect Magic. Do not sit the siphon." },
        { phase: "Ice", pray: "Protect Magic. Break icicles." },
        { phase: "Zaros", pray: "The style she is using." },
      ],
      tiles: "Smoke: walk the cough cloud. Shadow: off the line she drew. Blood: leave the siphon tile. Ice: smash icicles before the freeze. Zaros: the middle is a death if nobody called it.",
      spec: "Warhammer on the wing the team named. Claws when defence is down. Thralls if Arceuus is up.",
    },
  },
  hydra: {
    id: "hydra",
    title: "Alchemical Hydra",
    edition: "OSRS",
    role: "Solo slayer · vent order is the fight",
    style: "Ranged. Poison walk. Enrage is a prayer swap, not a panic eat.",
    opener: [
      "Lure to the correct vent. The chemical you stand in is the phase.",
      "Poison pools are a walk. Do not plant in a splash.",
      "Enrage: keep the prayer swap. DPS is second.",
    ],
    wipe: "Wrong vent, or a poison tile you stood in while swapping.",
    sources: [],
    osrs: {
      inventoryNote: "Ranged slayer trip. Bowfa or tbow worn. Brimstone ring if you have it.",
      inventory: padInv(
        [
          "Toxic blowpipe",
          "Dragon hunter lance",
          "Extended anti-venom+",
          "Divine ranging potion",
          "Super combat potion",
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
          "Stamina potion",
          "Rune pouch",
          "Book of the dead",
        ],
        "Manta ray",
      ),
      prayers: [
        { phase: "Green / poison", pray: "Protect Magic. Walk the pool." },
        { phase: "Blue / lightning", pray: "Protect Missiles. Lightning is a leave." },
        { phase: "Red / fire", pray: "Protect Magic. Fire is a leave." },
        { phase: "Enrage", pray: "The style she just used. Keep swapping." },
      ],
      tiles: "Start at the vent the wiki Strategies page starts at. Each colour wants its own chemical. Lightning and fire leave the painted tiles. Enrage: you walk, you swap, you do not plant.",
      spec: "Blowpipe spec between vents if prayer is fine. Thralls after the lure is set.",
    },
  },
  rasial: {
    id: "rasial",
    title: "Rasial",
    edition: "RS3",
    role: "Solo necromancy exam · City of Um",
    style: "Necromancy only. Other styles do not count.",
    opener: [
      "Conjures up outside the portal. Living Death is a window, not a panic button.",
      "One preset. Touch of Death builds. Death Grasp is the spec. Death Mark on phase 4.",
      "Volley is a walk. Do not drop Living Death on that volley.",
      "Do not chase a 1:03 clip on a first kill.",
    ],
    wipe: "Living Death window dropped on a volley, or minions left to eat the skulls.",
    sources: [],
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
      relic: "Conservation of Energy is the usual desk pick. Fury of the Small and Persistent Rage are the common neighbours.",
      enrage: "No enrage ladder like Telos. Phases 1–3 are the conjure cycle. Phase 4 is dump and Death Mark.",
    },
  },
  telos: {
    id: "telos",
    title: "Telos, the Warden",
    edition: "RS3",
    role: "Solo enrage · fonts are the wipe",
    style: "Necromancy is the current desk. Magic and melee still work if that is your log.",
    opener: [
      "0–100% until fonts and anima are boring. Do not jump to 200 because a VOD did.",
      "War's Retreat. One preset. Write the enrage on the screen.",
      "Fonts: stand the matching colour. Anima is spent on purpose.",
      "Gogoa’l is a walk. Tendrils are a cut. Do not eat both at once.",
    ],
    wipe: "Wrong font colour. The room ends the pull; the HP bar does not.",
    sources: [],
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
      familiar: "Ripper or the familiar the live wiki page still lists. Do not mix three discords.",
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
    role: "Solo kiln · waves then Zuk",
    style: "Necro or magic at the current meta. Waves are the exam.",
    opener: [
      "Waves are the exam. Zuk is the last question.",
      "Normal mode checkpoints after waves 5, 10, 15, and 17. Use them.",
      "One healer at a time on Zuk. Do not panic eat into a Jad.",
    ],
    wipe: "A wave you did not solve, or Zuk healers left into the next set.",
    sources: [],
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
    role: "Group underworld raid · one wing a night",
    style: "Team sheet. Necro is common. What the lead listed is the bag.",
    opener: [
      "Learn the wing you were given. Do not first-time every wing in one night.",
      "What the lead listed is the bag. One talker.",
      "Wings first. Last boss last.",
    ],
    wipe: "A wing mechanic you did not own. Last boss is not the first wipe.",
    sources: [],
    rs3: {
      bar: ["Touch of Death", "Soul Sap", "Finger of Death", "Death Skulls", "Volley of Souls", "Bloat", "Living Death", "Reflect", "Freedom", "Disrupt"],
      revolution: "Team sheet first. Revolution unless the lead called full manual.",
      familiar: "What the raid pin listed.",
      pocket: "What the raid pin listed.",
      relic: "What the raid pin listed.",
    },
  },
  glacor: {
    id: "glacor",
    title: "Arch-Glacor",
    edition: "RS3",
    role: "Solo streaks · add one mechanic at a time",
    style: "Necro or mage. The mechanic you ticked is the fight.",
    opener: [
      "0 mechanic until the kill is clean. Add one mechanic at a time.",
      "Streaks pay. A wipe on mechanic three is a note you did not read.",
      "Do not tick five on a first night.",
    ],
    wipe: "The mechanic you enabled and did not walk.",
    sources: [],
    rs3: {
      bar: ["Touch of Death", "Soul Sap", "Finger of Death", "Death Skulls", "Volley of Souls", "Bloat", "Living Death", "Stun", "Reflect", "Freedom", "Resonance"],
      revolution: "Revolution at 0 mechanic. Manual the stun on the mechanic you added.",
      familiar: "Ripper or the familiar the wiki page lists this hour.",
      pocket: "Scripture of Wen or Jas.",
      relic: "Conservation of Energy.",
      enrage: "Streak from 0%. Add one mechanic only after two clean kills.",
    },
  },
  vorago: {
    id: "vorago",
    title: "Vorago",
    edition: "RS3",
    role: "5–10 man borehole · week rotation is public",
    style: "Team sheet. Usually melee bombs and a mage. Do not first-time as base.",
    opener: [
      "Week rotation is public. Read it before you type inv.",
      "Do not first-time as base. Watch a VOD of this week's mechanic.",
      "P5 bleed: stack only on the called tile. One talker.",
    ],
    wipe: "An extra voice on bomb, or a P5 stack on the wrong tile.",
    sources: [],
    rs3: {
      bar: ["Touch of Death", "Soul Sap", "Finger of Death", "Death Skulls", "Volley of Souls", "Bloat", "Living Death", "Reflect", "Freedom", "Disrupt", "Resonance"],
      revolution: "What the lead pinned. Revolution unless they called full manual.",
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
    inventoryNote: "Starter bag from this desk’s kit. Confirm names on the wiki page before you pull.",
    inventory: padInv(bag, "Saradomin brew"),
    prayers: [{ phase: "Fight", pray: note.pray }],
    tiles: note.route.join(" "),
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
  const sources = sourcesFor(note);
  if (custom) return { ...custom, sources };
  return {
    id: note.id,
    title: note.title,
    edition: note.edition,
    role: note.role,
    style: note.style,
    opener: [...note.start, ...note.route.slice(0, 2)],
    wipe: bossWipe(note),
    sources,
    osrs: note.edition === "OSRS" ? fallbackOsrs(note) : undefined,
    rs3: note.edition === "RS3" ? fallbackRs3(note) : undefined,
  };
}
