export const BOB_LINES = [
  "From the Varrock sill where Gertrude's tom keeps vigil, the atlas of Gielinor is a palimpsest: each street a lemma, each dungeon a gloss.",
  "Bob the Cat, familiar of thresholds, regards the world as a closed book whose errata are quests and whose colophon is death.",
  "The wise player reads not the map but the interstices — the stile, the gate, the unremarked alley where lore coagulates.",
  "Misthalin's domestic numen is a cat. Treat that seriously and the rest of the pantheon becomes footnotes.",
  "To grind is to iterate a rite until chance pretends it was design. Bob has seen both and yawned.",
  "ScapeRune is the apophatic twin: the world said backwards. The adept learns the obverse by studying the cat who has walked both.",
  "Do not confuse opulence with gnosis. The richest bank is still a ledger; the oldest login is still a timestamp.",
  "Names are twelve glyphs. Meaning is what you refuse to stamp on the banner.",
  "The edict and the edict's absence are two canons. Keep them unmingled, as Bob keeps his paws off the wrong side of the river.",
  "A still is not the town. It is a deixis: here, from this window, at this hour of the tessellated day.",
  "The cat has seniority. Act like it.",
];

export const BOB_BY_PLACE: Record<string, string[]> = {
  "osrs:lumbridge": [
    "The duke's stone is still the first sermon. Tutorial Island is a rumour the river has not forgotten.",
    "From this sill the castle is a theorem: walls, then church, then the road that pretends it is simple.",
    "The meadow east is grass. No crater. The cat will not pretend otherwise.",
  ],
  "osrs:varrock": [
    "Gertrude's tom keeps this city. Palaces are commentary; the sill is the text.",
    "Square and palace are two lemmas. The cat declines to choose.",
    "The museum keeps bones. Bob keeps the hour.",
  ],
  "osrs:falador": [
    "White walls perform virtue. The cat has seen the inside of the party room and remains unconverted.",
    "The park is a pause in the white argument. Sit. Do not enlist.",
    "Knights polish. Bob does not.",
  ],
  "osrs:prifddinas": [
    "Song of the Elves raised this crystal. Sixth Age doctrine stays off this key.",
    "Eight clans, one city, no Voice of Seren named here.",
  ],
  "osrs:zanaris": [
    "The fairy ring is a hinge. Zanaris opens only if you already know the joke.",
    "Lost City is not lost to the cat. It is merely sideways.",
  ],
  "osrs:alkharid": [
    "The desert begins at the toll. Bob paid once and still resents it.",
    "Silk and scimitars. The sill prefers Varrock brick.",
  ],
  "osrs:draynorvillage": [
    "Willows lean over dark water. The manor does not invite the cat.",
    "Draynor sleeps with one eye on the willows.",
  ],
  "osrs:edgeville": [
    "The ditch is a sentence. Wilderness is the clause that follows.",
  ],
  "osrs:catherby": [
    "Bees, fish, and a range. Kandarin pretends to be gentle.",
  ],
  "osrs:portsarim": [
    "Ships lie. The cat does not sail.",
  ],
  "osrs:ardougne": [
    "East market, west plague memory. Keep the two streets unmingled.",
  ],
  "osrs:canifis": [
    "Moonrise is a local ordinance. Bob stays on the Varrock side of the river after dark.",
  ],
  "osrs:entrana": [
    "No weapons. The rule is older than most logins.",
  ],
  "osrs:apeatoll": [
    "Marimbo's island is loud. The cat is not a monkey.",
  ],
  "rs3:lumbridge": [
    "The rebuilt street is a palimpsest over a crater. Read both layers or you are only sightseeing.",
    "The duke still holds the keep. The meadow does not forget the Sixth Age.",
    "Battle scar and baker's stall share one frame. Name the age before you quote it.",
  ],
  "rs3:prifddinas": [
    "The hour will turn without a clan name on this desk. The cat respects that silence.",
    "Crystal under a living sun. Seren is present; this line will not invent her Voice.",
  ],
  "rs3:varrock": [
    "The square is still a square. RS3 only added more hats.",
    "Gertrude's house is still the correct door.",
  ],
  "rs3:falador": [
    "White walls again. The workshop under the city is a later gloss.",
  ],
  "rs3:senntisten": [
    "The ledger is methods, not prices. Bob will not quote the GE.",
    "Zarosian brick remembers an empire. The cat remembers mice.",
  ],
  "rs3:menaphos": [
    "Four districts, one sun. Tumeken is not a drop table.",
  ],
  "rs3:cityofum": [
    "The underworld keeps appointments. Bob has none.",
  ],
  "rs3:warsretreat": [
    "A lobby is not a fight. Leave the enrage on the wiki.",
  ],
  "rs3:anachronia": [
    "Dinosaurs are a thesis about time. The cat is unimpressed.",
  ],
};

export function placeSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

export function rememberBobPlace(game: "osrs" | "rs3", slug: string) {
  try {
    const until = Math.ceil(Date.now() / 300000) * 300000;
    sessionStorage.setItem("rs-bob-hold", JSON.stringify({ game, slug, until }));
  } catch {
    /* private */
  }
}

export function heldBobPlace(game: "osrs" | "rs3", slug: string, now = Date.now()) {
  try {
    const raw = sessionStorage.getItem("rs-bob-hold");
    if (!raw) return slug;
    const data = JSON.parse(raw) as { game?: string; slug?: string; until?: number };
    if (data.game === game && data.slug && Number(data.until) > now) return data.slug;
  } catch {
    /* ignore */
  }
  return slug;
}

export function bobLine(game: "osrs" | "rs3", slug: string, now = Date.now()) {
  const key = heldBobPlace(game, slug, now);
  const pool = BOB_BY_PLACE[`${game}:${key}`] ?? BOB_LINES;
  return pool[Math.floor(now / 300000) % pool.length] ?? pool[0] ?? BOB_LINES[0];
}
