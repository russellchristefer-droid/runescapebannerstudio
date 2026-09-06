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
  unlock: string;
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
  bank?: string;
  sanity?: string;
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
  raksha: {
    label: "PvME Raksha basic",
    href: "https://pvme.io/pvme-guides/basic-guides/raksha-basic/",
  },
  kerapac: {
    label: "PvME Kerapac HM basic",
    href: "https://pvme.io/pvme-guides/basic-guides/kerapac-hm-basic/",
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
    unlock: "Fire cape. Fight Caves until Jad is boring.",
    weakness: "None. Waves set the style. Zuk is a prayer exam.",
    instance: "Solo instance.",
    death: OSRS_UNSAFE,
  },
  tob: {
    combat: "90+ melee. Range and mage seats exist. Entry mode first.",
    slayer: "None.",
    unlock: "Theatre ticket. Entry mode until Maiden crabs are a call.",
    weakness: "Slash on most rooms. Range Maiden nylos and Xarpus. Mage Verzik P1.",
    instance: "Instance · 3–5. Entry is the learner size.",
    death: "Raid death. Coffer / team recover. Confirm the current fee on the wiki.",
  },
  toa: {
    combat: "80+ all styles. 0 invocation until rooms have names.",
    slayer: "None.",
    unlock: "Beneath Cursed Sands.",
    weakness: "Yellow Keris on path bosses. Wardens follow the skull.",
    instance: "Instance · 1–8.",
    death: "Raid death. Confirm invocation and fee on the wiki.",
  },
  cox: {
    combat: "80+. Overloads come from the raid.",
    slayer: "None.",
    unlock: "Lizardman shaman killcount for the mountain. Confirm on the wiki.",
    weakness: "Olm: spec the mage claw, melee the left, range the head when he stands.",
    instance: "Instance · learn one layout. Do not first-time in a 15-man.",
    death: "Raid death. Confirm points and fee on the wiki.",
  },
  vorkath: {
    combat: "80+ Ranged (or 80+ melee if you camp lance).",
    slayer: "None. Dragon Slayer II unlocks the island.",
    unlock: "Dragon Slayer II. Boat from Ungael.",
    weakness: "Ranged. Dragonfire needs super antifire plus a ward.",
    instance: "Instance · solo.",
    death: OSRS_UNSAFE,
  },
  zulrah: {
    combat: "80+ Magic and Ranged.",
    slayer: "None. Regicide / Western diary boat saves deaths.",
    unlock: "Regicide. Western diary boat saves deaths.",
    weakness: "Green is range. Red and blue are mage.",
    instance: "Instance · solo.",
    death: OSRS_UNSAFE,
  },
  nex: {
    combat: "90+ Magic. Range or melee if the team called that seat.",
    slayer: "None. Frozen door / God Wars unlock.",
    unlock: "Frozen door / God Wars. Confirm kc on the wiki.",
    weakness: "Smoke and Zaros want mage. Shadow wants range. Blood may want melee.",
    instance: "Instance · 5-man or mass.",
    death: OSRS_UNSAFE,
  },
  hydra: {
    combat: "90+ Ranged.",
    slayer: "95 Slayer. Konar / Duradel / other masters who assign it.",
    unlock: "Kourend slayer cave. Task for the claw if you care about the drop.",
    weakness: "Ranged. Poison walk. Enrage is a prayer swap.",
    instance: "Instance · solo.",
    death: OSRS_UNSAFE,
  },
  corp: {
    combat: "80+ Magic or spear melee.",
    slayer: "None.",
    unlock: "Games necklace to Corporeal Beast.",
    weakness: "Magic or spear. Dark bow specs if the mass uses them.",
    instance: "Cave · solo, small team, or mass.",
    death: OSRS_UNSAFE,
  },
  rasial: {
    combat: "90+ Necromancy. Other styles do not count.",
    slayer: "None.",
    unlock: "Necromancy story through City of Um. Confirm the live gate on the wiki.",
    weakness: "Necromancy only.",
    instance: "Instance · solo.",
    death: RS3_GRAVE,
  },
  telos: {
    combat: "90+ Necromancy (mage and melee still work if that is your log).",
    slayer: "None.",
    unlock: "Heart of Gielinor / Telos instance. Confirm on the wiki.",
    weakness: "Necromancy is the current desk. Fonts are the wipe.",
    instance: "Instance · solo.",
    death: RS3_GRAVE,
  },
  zuk: {
    combat: "90+ Necromancy or Magic.",
    slayer: "None.",
    unlock: "Elder Kiln / TzKal-Zuk instance. Confirm on the wiki.",
    weakness: "Waves set the style. Zuk is the last question.",
    instance: "Instance · solo. Normal mode has checkpoints.",
    death: RS3_GRAVE,
  },
  sanctum: {
    combat: "90+. What the lead listed.",
    slayer: "None.",
    unlock: "Underworld raid unlock. Confirm on the wiki.",
    weakness: "Team sheet. Necro is common.",
    instance: "Instance · group raid.",
    death: RS3_GRAVE,
  },
  glacor: {
    combat: "80+ Necromancy or Magic.",
    slayer: "None.",
    unlock: "Senntisten / Glacor instance.",
    weakness: "The mechanic you ticked is the fight.",
    instance: "Instance · solo streaks.",
    death: RS3_GRAVE,
  },
  vorago: {
    combat: "90+. Do not first-time as base.",
    slayer: "None.",
    unlock: "Borehole. Week rotation is public.",
    weakness: "Week rotation is public. Usually melee bombs and a mage.",
    instance: "Borehole · 5–10.",
    death: RS3_GRAVE,
  },
  nightmare: {
    combat: "80+ melee. Range the totems.",
    slayer: "None.",
    unlock: "Priest in Peril / Sisterhood. Phosani is a different exam.",
    weakness: "Slash on the boss. Range totems. Mage parasites if that is your seat.",
    instance: "Mass or small team instance.",
    death: OSRS_UNSAFE,
  },
  graardor: {
    combat: "70+ melee.",
    slayer: "None.",
    unlock: "40+ Bandos killcount. Confirm the live number on the wiki.",
    weakness: "Slash / crush. Minions are the extra style.",
    instance: "GWD room · duo or trio. Mass worlds exist.",
    death: OSRS_UNSAFE,
  },
  kree: {
    combat: "70+ Ranged.",
    slayer: "None.",
    unlock: "40+ Armadyl killcount. Confirm on the wiki.",
    weakness: "Ranged. Knockback is the wipe, not the HP bar.",
    instance: "GWD room · duo or trio.",
    death: OSRS_UNSAFE,
  },
  kril: {
    combat: "70+ melee.",
    slayer: "None.",
    unlock: "40+ Zamorak killcount. Antipoison on.",
    weakness: "Slash. Poison if you skipped the pot.",
    instance: "GWD room · duo or trio.",
    death: OSRS_UNSAFE,
  },
  zilyana: {
    combat: "70+ melee or range.",
    slayer: "None.",
    unlock: "40+ Saradomin killcount. Confirm on the wiki.",
    weakness: "The style the tank listed. Mage pray on her.",
    instance: "GWD room · duo or trio.",
    death: OSRS_UNSAFE,
  },
  muspah: {
    combat: "80+ Ranged with a mage or melee swap.",
    slayer: "None.",
    unlock: "Desert Treasure II. Ghorrock.",
    weakness: "Ranged on the body. Swap style on the prayer-shield phase.",
    instance: "Instance · solo.",
    death: OSRS_UNSAFE,
  },
  colosseum: {
    combat: "90+ melee. Waves set the rest.",
    slayer: "None.",
    unlock: "Varlamore / Fortis. Confirm the entry on the wiki.",
    weakness: "Waves set the style. Sol is a prayer exam.",
    instance: "Solo instance.",
    death: OSRS_UNSAFE,
  },
  duke: {
    combat: "80+ Magic or melee.",
    slayer: "None.",
    unlock: "Desert Treasure II.",
    weakness: "Magic or melee. Stun the eyes. Gas is a walk.",
    instance: "Instance · solo.",
    death: OSRS_UNSAFE,
  },
  whisperer: {
    combat: "80+ Magic.",
    slayer: "None.",
    unlock: "Desert Treasure II.",
    weakness: "Magic. Sanity is the mechanic.",
    instance: "Instance · solo.",
    death: OSRS_UNSAFE,
  },
  leviathan: {
    combat: "80+ Ranged.",
    slayer: "None.",
    unlock: "Desert Treasure II.",
    weakness: "Ranged. Path around the arena. Abyss is a walk.",
    instance: "Instance · solo.",
    death: OSRS_UNSAFE,
  },
  vardorvis: {
    combat: "80+ melee.",
    slayer: "None.",
    unlock: "Desert Treasure II.",
    weakness: "Slash. Axes are the fight.",
    instance: "Instance · solo.",
    death: OSRS_UNSAFE,
  },
  gauntlet: {
    combat: "80+ in the styles you craft.",
    slayer: "None.",
    unlock: "Song of the Elves. Corrupted is a different exam.",
    weakness: "Hunllef wants the two styles you are not praying.",
    instance: "Solo instance. Prep is the raid.",
    death: OSRS_UNSAFE,
  },
  kq: {
    combat: "70+ crush then the other style.",
    slayer: "None to enter. Kalphites task if you want the helm bonus.",
    unlock: "Desert. Rope on the tunnel. Confirm the live entry on the wiki.",
    weakness: "Form 1 crush or range. Form 2 the other style.",
    instance: "Lair · solo or duo.",
    death: OSRS_UNSAFE,
  },
  scurrius: {
    combat: "50+ in whatever you train. This is a first boss.",
    slayer: "None.",
    unlock: "Varrock sewers. No extra quest.",
    weakness: "Any. Walk the falling rocks.",
    instance: "Instance · solo learner.",
    death: OSRS_UNSAFE,
  },
  raksha: {
    combat: "90+ Magic or Necromancy.",
    slayer: "None.",
    unlock: "Anachronia. Learn poison pools first.",
    weakness: "Magic or necro. Poison and shadow walks.",
    instance: "Instance · solo or duo.",
    death: RS3_GRAVE,
  },
  solak: {
    combat: "90+. Do not first-time as tank.",
    slayer: "None.",
    unlock: "Lost Grove. 7-man pin.",
    weakness: "Base and bombs melee. One mage on the core if the sheet says so.",
    instance: "Instance · 7-man.",
    death: RS3_GRAVE,
  },
  araxxor: {
    combat: "80+ in the path style.",
    slayer: "None.",
    unlock: "Araxyte hive. Week path is public.",
    weakness: "The two paths open this week. Confirm on the wiki.",
    instance: "Instance · solo or duo.",
    death: RS3_GRAVE,
  },
  kerapac: {
    combat: "90+ Magic or Necromancy.",
    slayer: "None. Nodon task is a bonus, not the gate.",
    unlock: "Anachronia lab.",
    weakness: "Magic or necro. Time-stop is a walk.",
    instance: "Instance · solo or duo.",
    death: RS3_GRAVE,
  },
  qbd: {
    combat: "80+ Magic or Necromancy.",
    slayer: "None.",
    unlock: "Song from the Depths / QBD portal. Confirm on the wiki.",
    weakness: "Magic or necro. Artifacts in order.",
    instance: "Instance · solo.",
    death: RS3_GRAVE,
  },
  zamorakboss: {
    combat: "90+ Necromancy or Magic.",
    slayer: "None.",
    unlock: "Infernal Source. 0–100% until the map is memory.",
    weakness: "Team or solo sheet. Map first.",
    instance: "Instance · solo or group.",
    death: RS3_GRAVE,
  },
  helwyr: {
    combat: "80+ melee or range.",
    slayer: "None.",
    unlock: "Heart of Gielinor. GWD2.",
    weakness: "Melee or range. Mushrooms and howls.",
    instance: "Instance · duo.",
    death: RS3_GRAVE,
  },
  vindicta: {
    combat: "80+ melee or range.",
    slayer: "None.",
    unlock: "Heart of Gielinor. GWD2.",
    weakness: "Melee or range. Hurricane is a walk.",
    instance: "Instance · duo.",
    death: RS3_GRAVE,
  },
  gregorovic: {
    combat: "80+ Ranged or Necromancy.",
    slayer: "None.",
    unlock: "Heart of Gielinor. GWD2.",
    weakness: "Range or necro. Knives are a walk.",
    instance: "Instance · duo.",
    death: RS3_GRAVE,
  },
  ambassador: {
    combat: "90+ Magic or Necromancy.",
    slayer: "None.",
    unlock: "Elite Dungeon 3 end boss.",
    weakness: "Magic or necro. Black holes are a walk.",
    instance: "Instance · solo or duo.",
    death: RS3_GRAVE,
  },
  croesus: {
    combat: "Skilling levels for the role you were given. Combat is not the point.",
    slayer: "None.",
    unlock: "Senntisten. 4-man skilling boss.",
    weakness: "Nodes. Combat gear does not clear fungus.",
    instance: "Instance · 4-man.",
    death: RS3_GRAVE,
  },
  aod: {
    combat: "90+. Do not first-time as tank.",
    slayer: "None.",
    unlock: "Nex: Angel of Death. 7-man pin. Not mass Nex.",
    weakness: "Team sheet. Usually melee bombs and a mage.",
    instance: "Instance · 7-man.",
    death: RS3_GRAVE,
  },
  kk: {
    combat: "80+ in two styles.",
    slayer: "None.",
    unlock: "Exiled kalphite hive.",
    weakness: "The colour he is not immune to. Swap on the animation.",
    instance: "Instance · duo or small.",
    death: RS3_GRAVE,
  },
  bm: {
    combat: "90+. What the lead listed.",
    slayer: "None.",
    unlock: "Liberation of Mazcab. 10-man.",
    weakness: "Team sheet. Pets and charges are the wipe.",
    instance: "Instance · 10-man.",
    death: RS3_GRAVE,
  },
  yaka: {
    combat: "90+. After a clean Durzag.",
    slayer: "None.",
    unlock: "Liberation of Mazcab after Durzag.",
    weakness: "Team sheet. Stun and poison roles.",
    instance: "Instance · 10-man.",
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
    "Blood seat — leave the siphon. Not a first-night seat.",
  ],
  vorago: [
    "Base — not a first-night seat.",
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
  aod: ["Tank — the seat the pin named.", "North — one line.", "South — one line.", "DPS — tank is not a first-night seat."],
  solak: ["Tank — not a first-night seat.", "North / south — the called tile.", "DPS — the pin."],
  corp: ["Spear — if the small team uses spears.", "Mage — mass core.", "Caller — specs only if the mass uses them."],
  nightmare: ["Totem — charge, then the boss.", "Parasite — mage seat if the pin listed it.", "Stack — spores are a walk."],
  croesus: ["Wood — one node set.", "Mining — one node set.", "Hunter — one node set.", "Fishing — one node set."],
  bm: ["Pet — the pet the pin named.", "Charge — walk when called.", "DPS — the style the pin listed."],
  yaka: ["Stun — when the base says.", "Poison — the pool you were given.", "DPS — stun is not a first-night seat."],
  kk: ["Colour caller — names the swap.", "Second style — already in the bag."],
};

function headerFor(note: BossNote): FightHeader {
  const custom = HEADERS[note.id];
  if (custom) return custom;
  const teamish = /\d|raid|team|mass|5-man|group/i.test(note.role);
  if (note.edition === "OSRS") {
    return {
      combat: "80+. Confirm recommended stats on the wiki.",
      slayer: /slayer/i.test(note.role) ? "Slayer task or unlock — confirm the level on the wiki." : "None unless the wiki lists a task.",
      unlock: "Confirm quest / killcount on the wiki.",
      weakness: note.style.split(".")[0] ?? WIKI,
      instance: teamish ? "Instance or cave · team size on the wiki." : "Instance · solo unless the wiki says otherwise.",
      death: OSRS_UNSAFE,
    };
  }
  return {
    combat: "80+ in the style you camp. Confirm on the wiki.",
    slayer: "None unless the wiki lists a task.",
    unlock: "Confirm quest / instance unlock on the wiki.",
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
    corp: {
      budget: "Trident or hasta. Games necklace.",
      mid: "Sang or trident, spear if the team uses them.",
      max: "Zamorakian / dragon hunter lance plus crystal halberd specs. Mass mage is a different night.",
    },
    nightmare: {
      budget: "Hasta, blowpipe for totems.",
      mid: "Scythe or hasta, blowpipe, parasite mage switch.",
      max: "Scythe, tbow on totems. Phosani is a different bag.",
    },
    graardor: {
      budget: "Bandos, hasta, super combats.",
      mid: "Bandos, hasta or scythe, blood fury.",
      max: "Scythe, inquisitor if you own it. Tank tile is still a contract.",
    },
    kree: {
      budget: "Blessed, bowfa or crossbow.",
      mid: "Masori pieces, bowfa, anguish.",
      max: "Twisted bow, masori. Knockback is still the wipe.",
    },
    kril: {
      budget: "Bandos, hasta, antipoison.",
      mid: "Bandos, hasta or scythe, super combats.",
      max: "Scythe. Poison pot still on.",
    },
    zilyana: {
      budget: "Bandos or arma, the style the tank listed.",
      mid: "Bandos, hasta or bowfa.",
      max: "Scythe or tbow if the tank listed it.",
    },
    muspah: {
      budget: "Bowfa, trident, a melee swap.",
      mid: "Bowfa, sang, scythe on the last form if that is your note.",
      max: "Tbow, shadow or sang, scythe. Spikes are still a walk.",
    },
    colosseum: {
      budget: "Hasta, brews you can count.",
      mid: "Scythe or hasta, the modifiers you practiced.",
      max: "Scythe. Invos you practiced, not a random stack.",
    },
    duke: {
      budget: "Trident, thralls.",
      mid: "Sang or shadow, thralls, restore for enrage.",
      max: "Shadow. Eyes down, then boss.",
    },
    whisperer: {
      budget: "Trident, sanity food the wiki lists this hour.",
      mid: "Sang, saturated heart, sanity supplies.",
      max: "Shadow. Sanity is still the mechanic.",
    },
    leviathan: {
      budget: "Bowfa, stams.",
      mid: "Bowfa or tbow, stams.",
      max: "Twisted bow. Path first.",
    },
    vardorvis: {
      budget: "Hasta, food you can count.",
      mid: "Hasta or scythe, blood fury if you wear it.",
      max: "Scythe. Axes are still the fight.",
    },
    gauntlet: {
      budget: "What you crafted. The door is not a shortcut.",
      mid: "Perfected weapons and armour before the door.",
      max: "Corrupted prep. Hunllef still wants the other two styles.",
    },
    kq: {
      budget: "Crush or range, then the swap. Antipoison. Keris if you have it.",
      mid: "Keris, range or crush swap.",
      max: "The two styles the wiki Strategies page lists this hour.",
    },
    scurrius: {
      budget: "Whatever you train with. Food you can afford to lose.",
      mid: "Same. Leave the scythe home.",
      max: "Still a first boss. Prayer swaps are the lesson.",
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
    corp: "Food for the core soak. Restores. Confirm the mass bag on the wiki.",
    nightmare: "4 brews, 3 restores, sanfew. Totem range pot if that is your seat.",
    graardor: "4–6 food, 1 super combat, 2 restores. Kc trips, not one-kill bags.",
    kree: "4–6 food, ranging pot, 2 restores.",
    kril: "4–6 food, super combat, antipoison, 2 restores.",
    zilyana: "4–6 food, combat or range pot, 2 restores.",
    muspah: "6–8 food, 2 restores, stamina. Swap pots if you brought two styles.",
    colosseum: "8–10 brews, 4 restores. Confirm the live wave bag on the wiki.",
    duke: "6 food, 2 restores, thralls. Restore for enrage.",
    whisperer: "Sanity food the wiki lists this hour, plus 2 restores and mage food.",
    leviathan: "6–8 food, 2 restores, stamina.",
    vardorvis: "6–8 food, 2 restores. Axes are a walk, not an eat.",
    gauntlet: "What you gathered in prep. Short food stays in prep.",
    kq: "8 food, antipoison, 2 restores. Two styles eat two bags.",
    scurrius: "Cheap food. Walk the rocks. Leave the raid bag home.",
  };
  return table[id] ?? "Restores and food to finish the kill. Confirm counts on the wiki. Do not invent a number.";
}

function osrsSkip(id: string): string {
  const table: Partial<Record<string, string>> = {
    inferno: "Leave the melee camp home. Leave the infernal-on-wave-1 experiment home. Third potion type you have not practiced stays in the bank.",
    tob: "Leave hard mode home on a first purple. Second talker stays muted. Leave the scythe flex home in Entry if void plus hasta still clears.",
    toa: "Leave the 300 rack home on raid one. Leave a path you cannot name home.",
    cox: "Leave the 15-man first Olm home. Leave the middle tile when the crystal lands.",
    vorkath: "Leave the zig-zag on acid home. Leave the trip without antifire home.",
    zulrah: "Leave the third rotation mid-kill home. Leave the range-only bag home if Jad still ends you.",
    nex: "Leave the first-night blood siphon seat home. Leave the 20-man with no caller home.",
    hydra: "Leave the wrong vent home. Leave the plant on poison home.",
    corp: "Leave non-spear melee home if the team called spears. Leave a dark core on one person.",
    nightmare: "Leave Phosani home on a first night. Leave the spore plant home.",
    graardor: "Leave the 5 kc walk-in home. Leave the tank tile home if you are not the tank.",
    kree: "Leave the stand-under-Kree tile home. Confirm kc on the wiki.",
    kril: "Leave the trip without antipoison home.",
    zilyana: "Leave the tank tile home if you are not the tank.",
    muspah: "Leave the spike plant home. Leave the shield phase on the wrong style home.",
    colosseum: "Leave the random modifier stack home on a first Sol.",
    duke: "Leave the sit in first gas home. Leave skipped vents home.",
    whisperer: "Leave first-kill enrage home. Leave the trip without sanity food home.",
    leviathan: "Leave the skipped abyss tile home.",
    vardorvis: "Leave the axe line home.",
    gauntlet: "Leave the door home before perfected weapons. Leave corrupted home on a first prep.",
    kq: "Leave the one-style bag home. Leave form-change greed home.",
    scurrius: "Leave the scythe home. Leave the plant under falling rocks home.",
  };
  return table[id] ?? "Leave the style the room does not use home. Confirm the skip list on the wiki.";
}

function osrsBank(id: string): string {
  const table: Partial<Record<string, string>> = {
    inferno: "Cape attempt is one pull. Bank after a wipe. Write the wave.",
    tob: "Chest between rooms. Bank after the raid, not mid-Maiden.",
    toa: "Bank after two wipes on the same room. That room is the night.",
    cox: "Overload and brews come from the raid. Bank after Olm.",
    vorkath: "Pool, bank, boat. Two deaths already in the trip plan.",
    zulrah: "Diary cape or scroll for the boat. Fairy ring every death is wasted time.",
    nex: "Bank after a siphon wipe. Frozen door is the walk back.",
    hydra: "Konar task bank. One vent error ends the trip.",
    whisperer: "Bank when sanity food is gone. Enrage thin is a different night.",
    gauntlet: "Prep is the bank. The door is the raid.",
    scurrius: "Varrock sewers. Cheap food. Walk back.",
  };
  return table[id] ?? "Bank when food or restores run out. Confirm the walk-back on the wiki.";
}

function osrsSanity(id: string): string | undefined {
  const table: Partial<Record<string, string>> = {
    whisperer: "Sanity is the mechanic. Eat the sanity food the wiki lists this hour. Corridor plan before the pull. Enrage is a tile test — not first kill.",
    duke: "No sanity drain. Gas and eyes are the exam.",
    leviathan: "No sanity drain. Abyss path is the exam.",
    vardorvis: "No sanity drain. Axes are the exam.",
    muspah: "No sanity drain. Spikes and the shield phase are the exam.",
    inferno: "No sanity drain. Prayer and the shield are the exam.",
  };
  return table[id];
}

type OsrsDraft = Omit<OsrsDesk, "tiers" | "supplies" | "skip" | "bank" | "sanity"> &
  Partial<Pick<OsrsDesk, "tiers" | "supplies" | "skip" | "bank" | "sanity">>;
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
      "You already know the lobby. Fight Caves until Jad is boring. Inferno is the second exam.",
      "North pillar. Ice Barrage the nibbler pack off the west face so the south spawn never sees you.",
      "Kill order in front of you: mager, ranger, meleer, blob, bat. Solve that stack. Wave 12 is not Zuk.",
      "Triple Jad: sound first on mage, delayed slam is range. One healer at a time.",
      "Zuk: the shield is the prayer. Setters and Jad heals are the exam. Corners when the shield parks.",
    ],
    wipe: "A blob stacked on a ranger you left alive, or Zuk Jad healers into the next set.",
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
    style: "Scythe is the room. Range and mage for Maiden nylos and Xarpus. Hasta plus void still clears Entry.",
    opener: [
      "You already know the lobby. Entry until Maiden crabs are a call. One new seat per raid.",
      "Say the role at the chest: melee, range, or freezer. One bag covers all three until it does not.",
      "Maiden crabs die on their side. A leak is her heal. That is the first room.",
      "Bloat walks the stomp. Nylos holds the pillar you were given. Sotetseg is one maze voice.",
      "Hard mode is another night. First purple stays on Entry.",
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
      "You already know the lobby. 0 invocation until every room has a name. Solo or a quiet two.",
      "Name the path. Yellow Keris on Akkha, Ba-Ba, Kephri, Zebak.",
      "Two wipes on the same room: that room is the night.",
      "One invocation rack after a clean raid. A clean 50 teaches more than a wipe 200.",
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
      "Learn one layout. First Olm is not a 15-man.",
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
      "Super antifire plus a dragonfire ward. Salve (ei) if it is already on the neck.",
      "Six autos, then the special. Acid or spawn — count it, do not guess it.",
      "Pink fireball: step one tile. Acid: one straight line. Spawn: Crumble Undead before the next fireball.",
      "Bank the trip with two deaths already in the plan. Pools before kills/hr. Woox walk is extra kills after the six-count is muscle.",
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
      "Pin a rotation. First ten kills are the rotation. The boss is later.",
      "Diary cape or scroll for the boat. Fairy ring every death is wasted time.",
      "Green is range. Red and blue are mage. Jad phase: prayer first, click second.",
      "Stand the tile that rotation marked. No third rotation mid-kill.",
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
      tiles: "Stand the tile the rotation sheet marked for that spawn. No third rotation mid-kill.",
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
      "Four wings as a list: smoke, shadow, blood, ice, then Zaros.",
      "Blood siphon is not a first-night seat.",
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
      "Poison pools are a walk. Leave the splash.",
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
      "Conjures up outside the portal. Living Death is a window you booked, not a panic button.",
      "One preset. Touch of Death builds. Death Grasp is the spec. Death Mark on phase 4.",
      "Volley is a walk. Living Death does not sit on that volley.",
      "The 1:03 clip is not this pull.",
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
      "0–100% until fonts and anima are boring. A 200% VOD is not this pull.",
      "War's Retreat. One preset. Write the % on screen.",
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
      "One healer at a time on Zuk. Panic eat into a Jad is the wipe.",
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
      "Learn the wing you were given. Every wing in one night is a different exam.",
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
      "Streaks pay. A wipe on mechanic three is a note you skipped.",
      "Five ticks on a first night is a different exam.",
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
      "Base is not a first-night seat. Watch this week's mechanic.",
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
  whisperer: {
    id: "whisperer",
    title: "The Whisperer",
    edition: "OSRS",
    role: "Solo DT2 · sanity is the mechanic",
    style: "Magic. Sanity food is part of the bag, not a flex.",
    opener: [
      "Desert Treasure II. Corridor plan before the pull.",
      "Sanity food the wiki lists this hour. Enrage is not first kill.",
      "Keep sanity up. Enrage is a tile test.",
    ],
    wipe: "Sanity gone in the corridor, or a silence tile you stood on.",
    sources: [],
    osrs: {
      inventoryNote: "Mage bag plus sanity supplies. Shadow or sang worn if you own it.",
      inventory: padInv(
        [
          "Saturated heart",
          "Book of the dead",
          "Rune pouch",
          "Sanity food",
          "Sanity food",
          "Sanity food",
          "Sanity food",
          "Super restore",
          "Super restore",
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
        { phase: "Normal", pray: "Protect Magic." },
        { phase: "Silence tiles", pray: "Protect Magic. Walk. Do not plant." },
        { phase: "Enrage", pray: "Protect Magic. Tile test. Sanity first." },
      ],
      tiles: "Walk the silence tiles. Corridor is a plan, not a panic.",
      spec: "Thralls after sanity is stable. Death charge only if you practiced it. Sanity food before every corridor.",
    },
  },
  gauntlet: {
    id: "gauntlet",
    title: "The Gauntlet",
    edition: "OSRS",
    role: "Solo · prep is the raid",
    style: "The weapons you crafted. Hunllef wants the other two styles.",
    opener: [
      "Perfected weapons and armour before the door.",
      "Corrupted is another exam. Not first prep.",
      "Hunllef: tornado walk, prayer swap, damage the right style.",
    ],
    wipe: "Door before perfected gear, or a tornado you stood in.",
    sources: [],
    osrs: {
      inventoryNote: "What you built. Confirm the prep path on the wiki.",
      inventory: padInv(
        [
          "Crafted staff",
          "Crafted bow",
          "Crafted halberd",
          "Teleport crystal",
          "Potion",
          "Potion",
          "Food",
          "Food",
          "Food",
          "Food",
          "Food",
          "Food",
        ],
        "Food",
      ),
      prayers: [
        { phase: "Hunllef", pray: "The style he is using. Swap on the animation." },
        { phase: "Tornado", pray: "Same overhead. Walk." },
      ],
      tiles: "Prep path first. Hunllef: tornadoes are a walk. Do not plant.",
      spec: "No outside spec weapon. The crafted weapons are the bag.",
    },
  },
  scurrius: {
    id: "scurrius",
    title: "Scurrius",
    edition: "OSRS",
    role: "Solo learner · first boss",
    style: "Any. Walk the falling rocks.",
    opener: [
      "Varrock sewers. Food you can afford to lose.",
      "Protect Melee. Click the rats if they pile.",
      "Learn prayer swaps here. The next boss will use them.",
    ],
    wipe: "Standing in falling rocks, or ignoring the pile of rats.",
    sources: [],
    osrs: {
      inventoryNote: "Training gear. Leave the scythe home.",
      inventory: padInv(
        ["Rune pouch", "Teleport", "Cheap food", "Cheap food", "Cheap food", "Cheap food", "Cheap food", "Cheap food"],
        "Cheap food",
      ),
      prayers: [
        { phase: "Boss", pray: "Protect Melee." },
        { phase: "Rocks", pray: "Same overhead. Walk." },
      ],
      tiles: "Walk the debris. Do not plant under a rock shadow.",
      spec: "None required. Spec is extra. No thrall, no death charge, no sanity.",
    },
  },
  croesus: {
    id: "croesus",
    title: "Croesus",
    edition: "RS3",
    role: "4-man skilling boss · one person per node set",
    style: "Skilling. Combat is not the point.",
    opener: [
      "Roles: wood, mining, hunter, fishing. One person per node set.",
      "Call the fungus. Four people on one node is the wipe.",
      "A quiet four-man beats a loud four-man with better picks.",
    ],
    wipe: "Four people on one node, or a fungus call nobody answered.",
    sources: [],
    rs3: {
      bar: ["Wood", "Mine", "Hunter", "Fish", "Call fungus", "Swap node", "Eat", "Walk blight"],
      revolution: "No ability bar. Roles are skilling nodes.",
      familiar: "None required. Confirm the skilling familiar on the wiki if the team uses one.",
      pocket: "Skilling pocket for the role you were given.",
      relic: "Skilling relic if the pin listed one.",
      camp: "Camp the node set you were given.",
      ultimates: "None. This is a skilling boss.",
    },
  },
  raksha: {
    id: "raksha",
    title: "Raksha",
    edition: "RS3",
    role: "Solo or duo · poison and shadow walks",
    style: "Magic or necro. Pools first.",
    opener: [
      "Anachronia. Poison pools have names before you chase a time.",
      "Pools: walk. Shadow: the tile. P4: do not channel into a beam.",
    ],
    wipe: "A pool you stood in, or a beam you channeled into.",
    sources: [],
    rs3: {
      bar: ["Touch of Death", "Soul Sap", "Finger of Death", "Death Skulls", "Volley of Souls", "Bloat", "Living Death", "Reflect", "Freedom", "Resonance", "Disrupt"],
      revolution: "Revolution until pools are boring. Manual the beam walk.",
      familiar: "Ripper or the familiar the wiki page lists this hour.",
      pocket: "Scripture of Wen or Jas.",
      relic: "Conservation of Energy.",
      camp: "Camp one style. Do not rebuild mid-phase.",
      ultimates: "Living Death on a clean pool window. Do not dump on a beam.",
      enrage: "No Telos ladder. Bank after a wipe. Do not restack mid-P4.",
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
    bank: osrsBank(note.id),
    sanity: osrsSanity(note.id),
  };
}

function fallbackRs3(note: BossNote): Rs3Desk {
  if (note.id === "croesus") {
    return {
      bar: ["Wood", "Mine", "Hunter", "Fish", "Call fungus", "Swap node", "Eat", "Walk blight"],
      revolution: "No ability bar. Roles are skilling nodes. Combat ultimates do not clear fungus.",
      familiar: "None required. Confirm the skilling familiar on the wiki if the team uses one.",
      pocket: "Skilling pocket for the role you were given.",
      relic: "Skilling relic if the pin listed one.",
      camp: "Camp the node set you were given. Do not stack four people on one node.",
      ultimates: "None. This is a skilling boss.",
    };
  }
  if (note.id === "kk") {
    return {
      bar: ["Style A builder", "Style A threshold", "Style switch", "Style B builder", "Freedom", "Reflect", "Resonance", "Disrupt"],
      revolution: "Short revolution per colour. Manual the swap on the animation.",
      familiar: "Ripper or the familiar the wiki page lists this hour.",
      pocket: "Scripture that matches the colour you are on.",
      relic: "Conservation of Energy unless the lead pinned another.",
      camp: "Switch. Do not camp one style. Colour swap is the fight.",
      ultimates: "Dump on the colour he is not immune to. Do not leave an ultimate on the immune colour.",
    };
  }
  const enrageIds = new Set(["telos", "kerapac", "zamorakboss", "ambassador", "glacor", "araxxor"]);
  return {
    bar: ["Touch of Death", "Soul Sap", "Finger of Death", "Death Skulls", "Volley of Souls", "Bloat", "Freedom", "Reflect", "Resonance", "Disrupt"],
    revolution: "Revolution until the mechanic is boring. Full manual only if that is your log.",
    familiar: "Ripper Demon or the familiar on the wiki page for this hour.",
    pocket: "Scripture that matches the style you brought.",
    relic: "Conservation of Energy unless the lead pinned another.",
    enrage: enrageIds.has(note.id) || note.role.toLowerCase().includes("enrage")
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
    bank: draft.bank ?? base.bank,
    sanity: draft.sanity ?? base.sanity,
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
