import { bossWiki, bossWipe, noteFor, type BossNote } from "./boss-notes";

export type RankedSource = {
  rank: 1 | 2 | 3;
  label: string;
  href: string;
  unofficial?: boolean;
};

export type PrayerPhase = { phase: string; pray: string };

export type GearTiers = { budget: string; mid: string; max: string };

export type FightHeader = {
  combat: string;
  slayer: string;
  weakness: string;
  instance: string;
  death: string;
};

export type OsrsDesk = {
  inventory: string[];
  inventoryNote: string;
  prayers: PrayerPhase[];
  tiles: string;
  stand?: string[];
  spec: string;
  tiers: GearTiers;
  supplies: string;
  skip: string;
};

export type Rs3Desk = {
  bar: string[];
  revolution: string;
  familiar: string;
  pocket: string;
  relic: string;
  enrage?: string;
  camp: string;
  ultimates: string;
};

export type FightSheet = {
  id: string;
  title: string;
  edition: "OSRS" | "RS3";
  role: string;
  style: string;
  header: FightHeader;
  opener: string[];
  wipe: string;
  sources: RankedSource[];
  team?: string[];
  osrs?: OsrsDesk;
  rs3?: Rs3Desk;
};

const WIKI = "Confirm on the wiki.";

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
  if (sister) out.push({ rank: 2, label: sister.label, href: sister.href });
  const extra = UNOFFICIAL[note.id];
  if (extra && out.length < 3) {
    out.push(unofficial(extra.label, extra.href, out.length === 1 ? 2 : 3));
  }
  return out.slice(0, 3);
}

/** Stale HMR used to import this. Boss pages use sourcesFor. */
export function hubFor(_note?: BossNote): RankedSource[] {
  return [];
}

const OSRS_UNSAFE = "Unsafe. Confirm kept items on the wiki. Do not invent a gp number here.";
const RS3_GRAVE = "War's Retreat / gravestone reclaim. Confirm the cost on the wiki this hour.";

const HEADERS: Partial<Record<string, FightHeader>> = {
  inferno: {
    combat: "90+ Ranged and Magic. Infernal is a second exam after a Fire cape.",
    slayer: "None.",
    weakness: "None. Waves set the style. Zuk is a prayer exam.",
    instance: "Solo instance.",
    death: OSRS_UNSAFE,
  },
  tob: {
    combat: "90+ melee. Range and mage seats exist. Entry mode first.",
    slayer: "None.",
    weakness: "Slash on most rooms. Range Maiden nylos and Xarpus. Mage Verzik P1.",
    instance: "Instance · 3–5. Entry is the learner size.",
    death: "Raid death. Coffer / team recover. Confirm the current fee on the wiki.",
  },
  toa: {
    combat: "80+ all styles. 0 invocation until rooms have names.",
    slayer: "None.",
    weakness: "Yellow Keris on path bosses. Wardens follow the skull.",
    instance: "Instance · 1–8.",
    death: "Raid death. Confirm invocation and fee on the wiki.",
  },
  cox: {
    combat: "80+. Overloads come from the raid.",
    slayer: "None.",
    weakness: "Olm: spec the mage claw, melee the left, range the head when he stands.",
    instance: "Instance · learn one layout. Do not first-time in a 15-man.",
    death: "Raid death. Confirm points and fee on the wiki.",
  },
  vorkath: {
    combat: "80+ Ranged (or 80+ melee if you camp lance).",
    slayer: "None. Dragon Slayer II unlocks the island.",
    weakness: "Ranged. Dragonfire needs super antifire plus a ward.",
    instance: "Instance · solo.",
    death: OSRS_UNSAFE,
  },
  zulrah: {
    combat: "80+ Magic and Ranged.",
    slayer: "None. Regicide / Western diary boat saves deaths.",
    weakness: "Green is range. Red and blue are mage.",
    instance: "Instance · solo.",
    death: OSRS_UNSAFE,
  },
  nex: {
    combat: "90+ Magic. Range or melee if the team called that seat.",
    slayer: "None. Frozen door / God Wars unlock.",
    weakness: "Smoke and Zaros want mage. Shadow wants range. Blood may want melee.",
    instance: "Instance · 5-man or mass.",
    death: OSRS_UNSAFE,
  },
  hydra: {
    combat: "90+ Ranged.",
    slayer: "95 Slayer. Konar / Duradel / other masters who assign it.",
    weakness: "Ranged. Poison walk. Enrage is a prayer swap.",
    instance: "Instance · solo.",
    death: OSRS_UNSAFE,
  },
  corp: {
    combat: "80+ Magic or spear melee.",
    slayer: "None.",
    weakness: "Magic or spear. Dark bow specs if the mass uses them.",
    instance: "Cave · solo, small team, or mass.",
    death: OSRS_UNSAFE,
  },
  rasial: {
    combat: "90+ Necromancy. Other styles do not count.",
    slayer: "None.",
    weakness: "Necromancy only.",
    instance: "Instance · solo.",
    death: RS3_GRAVE,
  },
  telos: {
    combat: "90+ Necromancy (mage and melee still work if that is your log).",
    slayer: "None.",
    weakness: "Necromancy is the current desk. Fonts are the wipe.",
    instance: "Instance · solo.",
    death: RS3_GRAVE,
  },
  zuk: {
    combat: "90+ Necromancy or Magic.",
    slayer: "None.",
    weakness: "Waves set the style. Zuk is the last question.",
    instance: "Instance · solo. Normal mode has checkpoints.",
    death: RS3_GRAVE,
  },
  sanctum: {
    combat: "90+. What the lead listed.",
    slayer: "None.",
    weakness: "Team sheet. Necro is common.",
    instance: "Instance · group raid.",
    death: RS3_GRAVE,
  },
  glacor: {
    combat: "80+ Necromancy or Magic.",
    slayer: "None.",
    weakness: "The mechanic you ticked is the fight.",
    instance: "Instance · solo streaks.",
    death: RS3_GRAVE,
  },
  vorago: {
    combat: "90+. Do not first-time as base.",
    slayer: "None.",
    weakness: "Week rotation is public. Usually melee bombs and a mage.",
    instance: "Borehole · 5–10.",
    death: RS3_GRAVE,
  },
};

const TEAM: Partial<Record<string, string[]>> = {
  tob: [
    "Melee — scythe rooms, Maiden core, Verzik P3.",
    "North freezer — Maiden north crabs. Do not leak.",
    "South freezer — Maiden south crabs.",
    "Range — nylos, Xarpus, Verzik P2.",
  ],
  cox: [
    "Melee — left claw and rooms that call slash.",
    "Mage — mage claw spec and room mage.",
    "Range — head phase and room range.",
  ],
  toa: [
    "Solo — you own every room.",
    "Path caller — names the next room.",
    "Second — Keris and jugs. Do not invent a third talker.",
  ],
  nex: [
    "Tank — holds her when the team called a tank.",
    "Mage — smoke and Zaros.",
    "Range — shadow line.",
    "Blood seat — leave the siphon. Do not first-time this seat.",
  ],
  vorago: [
    "Base — do not first-time this seat.",
    "Bomb — one voice.",
    "Voke — when the pin listed it.",
    "North / south — P5 stack only on the called tile.",
  ],
  sanctum: [
    "Lead — one talker.",
    "Wing — the wing you were given.",
    "Runner — mechanics the pin named.",
  ],
  graardor: ["Tank — melee pray, hold the door side.", "Stack — the tile the mass uses.", "Hammer — if the pin listed specs."],
  kree: ["Tank — range pray.", "Stack — under or the mass tile.", "DPS — the style the pin listed."],
  kril: ["Tank — mage or melee as called.", "Stack — off the poison if the room uses it.", "DPS — the style the pin listed."],
  zilyana: ["Tank — mage pray.", "Stack — the mass tile.", "DPS — the style the pin listed."],
  aod: ["Tank — the seat the pin named.", "North — one line.", "South — one line.", "DPS — do not first-time tank."],
  solak: ["Tank — do not first-time.", "North / south — the called tile.", "DPS — the pin."],
  corp: ["Spear — if the small team uses spears.", "Mage — mass core.", "Caller — specs only if the mass uses them."],
};

function headerFor(note: BossNote): FightHeader {
  const custom = HEADERS[note.id];
  if (custom) return custom;
  const teamish = /\d|raid|team|mass|5-man|group/i.test(note.role);
  if (note.edition === "OSRS") {
    return {
      combat: "80+. Confirm recommended stats on the wiki.",
      slayer: /slayer/i.test(note.role) ? "Slayer task or unlock — confirm the level on the wiki." : "None unless the wiki lists a task.",
      weakness: note.style.split(".")[0] ?? WIKI,
      instance: teamish ? "Instance or cave · team size on the wiki." : "Instance · solo unless the wiki says otherwise.",
      death: OSRS_UNSAFE,
    };
  }
  return {
    combat: "80+ in the style you camp. Confirm on the wiki.",
    slayer: "None unless the wiki lists a task.",
    weakness: note.style.split(".")[0] ?? WIKI,
    instance: teamish ? "Instance · team size on the wiki." : "Instance · solo unless the wiki says otherwise.",
    death: RS3_GRAVE,
  };
}

function teamFor(note: BossNote): string[] | undefined {
  return TEAM[note.id];
}

function osrsTiers(id: string, note: BossNote): GearTiers {
  const table: Partial<Record<string, GearTiers>> = {
    inferno: {
      budget: "Blessed d'hide, blowpipe, trident, crystal shield. Fire cape required.",
      mid: "Bow of Faerdhinen, ancestral switch, eldritch staff, anguish / occult.",
      max: "Twisted bow, ancestral, masori (f), eldritch, divine rune pouch. Wiki Strategies wins if a clip disagrees.",
    },
    tob: {
      budget: "Elite void, hasta or whip, blowpipe, trident. Entry mode.",
      mid: "Bandos or torva pieces, avernic, sang, blowpipe, claws / BGS.",
      max: "Scythe, sang, masori / ancestral swaps, avernic, claws. Hard mode is a different night.",
    },
    toa: {
      budget: "Swamp trident, blowpipe, bandos or blessed, yellow Keris.",
      mid: "Fang, lightbearer, saturated heart, thralls, Keris.",
      max: "Tumeken's shadow or sang, masori / ancestral, Keris. Invocation is the upgrade, not a third weapon.",
    },
    cox: {
      budget: "Trident, blowpipe, hasta, BGS / DWH.",
      mid: "Sang, bowfa, bandos, elder maul if you own it.",
      max: "Scythe, twisted bow, sang. Overload still comes from the raid.",
    },
    vorkath: {
      budget: "Blowpipe or rune crossbow, antifire, dragonfire ward.",
      mid: "Zaryte crossbow or bowfa, salve (ei), ward.",
      max: "Twisted bow or zaryte, salve (ei). Woox walk is extra kills after the six-count.",
    },
    zulrah: {
      budget: "Trident, blowpipe, blessed swaps.",
      mid: "Sang, void or ahrim / blessed, saturated heart.",
      max: "Shadow or sang, masori / ancestral. Rotation first.",
    },
    nex: {
      budget: "Trident, bowfa, bandos. Do not first-time blood siphon.",
      mid: "Sang, tbow, DWH / BGS.",
      max: "Shadow or sang, tbow, scythe if the team called melee blood.",
    },
    hydra: {
      budget: "Bowfa or blowpipe, anti-venom+.",
      mid: "Bowfa, brimstone ring, thralls.",
      max: "Twisted bow or lance if you camp melee. Vent order is still the fight.",
    },
  };
  return (
    table[id] ?? {
      budget: note.kit[0] ?? WIKI,
      mid: note.kit[1] ?? WIKI,
      max: note.kit[2] ?? WIKI,
    }
  );
}

function osrsSupplies(id: string): string {
  const table: Partial<Record<string, string>> = {
    inferno: "8–10 brews, 4–6 restores, 2 bastions, 2 prayer regen, stamina. Counts move — wiki Strategies this hour.",
    tob: "4–6 brews, 3 restores, 2 angler, sanfew, super combat, range pot, stamina. Raid supplies the rest.",
    toa: "4–6 brews, 4 restores, honey locusts, smelling salts, menaphite remedy. Stamina before Wardens.",
    cox: "Brews and overload come from the raid. Bring 2 restores, sanfew, stamina, specs.",
    vorkath: "8–10 manta, 2–3 restores, 2 prayer pots, antifire, anti-venom+. Bank with two deaths planned.",
    zulrah: "3 brews, 2 restores, 4+ manta, anti-venom+, stamina. Diary cape for the boat.",
    nex: "4 brews, 3 restores, 2 angler, sanfew, combat and range pots.",
    hydra: "8 manta, 2 restores, 2 prayer, anti-venom+, stamina.",
  };
  return table[id] ?? "Restores and food to finish the kill. Confirm counts on the wiki. Do not invent a number.";
}

function osrsSkip(id: string): string {
  const table: Partial<Record<string, string>> = {
    inferno: "No melee camp. No infernal-on-wave-1 experiments. No third potion type you have not practiced.",
    tob: "No hard mode on a first purple. No second talker. No scythe flex in Entry if void + hasta still clears.",
    toa: "No 300 invocation first raid. No path you cannot name.",
    cox: "No 15-man first Olm. No teleport crystal in the middle.",
    vorkath: "No zig-zag on acid. No trip without antifire.",
    zulrah: "No third rotation mid-kill. No range-only bag if Jad phase still kills you.",
    nex: "No first-time blood siphon seat. No 20-man with no caller.",
    hydra: "No wrong vent. No plant on poison.",
  };
  return table[id] ?? "Do not bring a style the room does not use. Confirm the skip list on the wiki.";
}

type OsrsDraft = Omit<OsrsDesk, "tiers" | "supplies" | "skip"> & Partial<Pick<OsrsDesk, "tiers" | "supplies" | "skip">>;
type Rs3Draft = Omit<Rs3Desk, "camp" | "ultimates"> & Partial<Pick<Rs3Desk, "camp" | "ultimates" | "enrage">>;
type SheetDraft = Omit<FightSheet, "header" | "osrs" | "rs3" | "sources"> & {
  header?: FightHeader;
  osrs?: OsrsDraft;
  rs3?: Rs3Draft;
  sources: RankedSource[];
};

const SHEETS: Record<string, SheetDraft> = {
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
      spec: "Eldritch staff spec when prayer is thin. Blowpipe spec is extra damage, not a plan. Thralls if you brought the book — tag after the stack is solved. Death charge is not the cape. No sanity drain here.",
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
      spec: "Maiden: warhammer or maul for defence, then claws. Bloat: BGS on a run-by if the team uses it. Verzik P3: dump melee specs at enrage. Thralls on Arceuus if that is your seat. Death charge on Verzik if you practiced it. No sanity drain.",
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
      spec: "Blowpipe or zaryte spec on the first grounded hits. Crumble on the spawn. Death charge is extra, not the trip. No sanity drain.",
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
      enrage: "No enrage ladder like Telos. Phases 1–3 are the conjure cycle. Phase 4 is dump and Death Mark. Bank after a wipe — do not restack mid-phase.",
      camp: "Camp necromancy. No style switch.",
      ultimates: "Living Death on a clean window. Death Skulls inside that window. Do not overlap them on a volley.",
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
        "Start 0%. Add 25% only after two clean kills. Bank at War's Retreat between enrage steps. 100% is the same rooms with less time. 200%+ one missed font is the kill.",
      camp: "Camp one style. Necro is the current desk. Switch only if that is your logged preset.",
      ultimates: "Living Death on a font-safe window. Do not dump an ultimate on tendrils.",
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
      camp: "Camp one style through the waves. Do not rebuild the bar mid-kiln.",
      ultimates: "Living Death on a solved wave, not on a Jad you have not prayed.",
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
      camp: "Camp the style the pin listed. Switches only if the lead called them.",
      ultimates: "What the lead called. Do not dump an ultimate on a wing you do not own.",
      enrage: "Hard mode is a different night. Bank between wings if the pin said so.",
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
      enrage: "Streak from 0%. Add one mechanic only after two clean kills. Bank the streak at War's Retreat if you wipe — confirm streak rules on the wiki.",
      camp: "Camp one style. Do not switch mid-streak.",
      ultimates: "Living Death on a clean mechanic window.",
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
      camp: "Camp the style the pin listed. Switches if the week rotation requires them.",
      ultimates: "What the lead called on this week's mechanic.",
      enrage: "Week rotation is the ladder. Bank between kills if the pin said so.",
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
    spec: "Spec when the room is stable. Thralls if you brought the book. Death charge only if that fight uses it. Confirm on the wiki.",
    tiers: osrsTiers(note.id, note),
    supplies: osrsSupplies(note.id),
    skip: osrsSkip(note.id),
  };
}

function fallbackRs3(note: BossNote): Rs3Desk {
  return {
    bar: ["Touch of Death", "Soul Sap", "Finger of Death", "Death Skulls", "Volley of Souls", "Bloat", "Freedom", "Reflect", "Resonance", "Disrupt"],
    revolution: "Revolution until the mechanic is boring. Full manual only if that is your log.",
    familiar: "Ripper Demon or the familiar on the wiki page for this hour.",
    pocket: "Scripture that matches the style you brought.",
    relic: "Conservation of Energy unless the lead pinned another.",
    enrage: note.role.toLowerCase().includes("enrage")
      ? "Start at 0%. Add enrage after two clean kills. Bank at War's Retreat between steps."
      : undefined,
    camp: "Camp one style unless the wiki lists a required switch.",
    ultimates: "Living Death / style ultimate on a clean window. Confirm order on the wiki.",
  };
}

function finishOsrs(note: BossNote, draft?: OsrsDraft): OsrsDesk | undefined {
  if (!draft && note.edition !== "OSRS") return undefined;
  const base = fallbackOsrs(note);
  if (!draft) return base;
  return {
    ...base,
    ...draft,
    tiers: draft.tiers ?? base.tiers,
    supplies: draft.supplies ?? base.supplies,
    skip: draft.skip ?? base.skip,
  };
}

function finishRs3(note: BossNote, draft?: Rs3Draft): Rs3Desk | undefined {
  if (!draft && note.edition !== "RS3") return undefined;
  const base = fallbackRs3(note);
  if (!draft) return base;
  return {
    ...base,
    ...draft,
    camp: draft.camp ?? base.camp,
    ultimates: draft.ultimates ?? base.ultimates,
  };
}

export function sheetFor(id: string): FightSheet | null {
  const note = noteFor(id);
  if (!note) return null;
  const custom = SHEETS[id];
  const sources = sourcesFor(note);
  const header = custom?.header ?? headerFor(note);
  const team = custom?.team ?? teamFor(note);
  if (custom) {
    return {
      id: custom.id,
      title: custom.title,
      edition: custom.edition,
      role: custom.role,
      style: custom.style,
      header,
      opener: custom.opener,
      wipe: custom.wipe,
      sources,
      team,
      osrs: finishOsrs(note, custom.osrs),
      rs3: finishRs3(note, custom.rs3),
    };
  }
  return {
    id: note.id,
    title: note.title,
    edition: note.edition,
    role: note.role,
    style: note.style,
    header,
    opener: [...note.start, ...note.route.slice(0, 2)],
    wipe: bossWipe(note),
    sources,
    team,
    osrs: note.edition === "OSRS" ? fallbackOsrs(note) : undefined,
    rs3: note.edition === "RS3" ? fallbackRs3(note) : undefined,
  };
}
