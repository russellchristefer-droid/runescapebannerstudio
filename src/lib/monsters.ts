import type { Edition } from "./locations";

export type Monster = {
  id: string;
  slug: string;
  name: string;
  edition: Edition;
  kind: "monster";
  slayer?: boolean;
  where: string;
  gate?: string;
  hunt: string;
  wiki: string;
  slayerWiki?: string;
  masters?: string;
  watch?: string;
  style?: string;
  still: string;
  placeId?: string;
};

export function monsterStillSrc(row: Pick<Monster, "edition" | "slug">) {
  const game = row.edition === "OSRS" ? "osrs" : "rs3";
  const slug = row.slug.replace(/-/g, "");
  return `/stills/${game}/beast-${slug}.jpg`;
}

export function sisterMonster(row: Monster) {
  const other = row.edition === "OSRS" ? "RS3" : "OSRS";
  return MONSTERS.find((item) => item.slug === row.slug && item.edition === other);
}

function osrsWiki(page: string) {
  return `https://oldschool.runescape.wiki/w/${page}`;
}
function rs3Wiki(page: string) {
  return `https://runescape.wiki/w/${page}`;
}

export const MONSTERS: Monster[] = [
  { id: "osrs-goblin", slug: "goblin", name: "Goblin", edition: "OSRS", kind: "monster", where: "Goblin Village", hunt: "Low-level melee in the yard. Multi. Learn food, then leave.", wiki: osrsWiki("Goblin"), still: "/locations/osrsgob.jpg", placeId: "osrsgob" },
  { id: "osrs-cow", slug: "cow", name: "Cow", edition: "OSRS", kind: "monster", where: "Lumbridge east field", hunt: "Melee in the paddock. Hide is the lesson.", wiki: osrsWiki("Cow"), still: "/stills/osrs/osrs-lumbridge-a.jpg", placeId: "osrslumbridge" },
  { id: "osrs-hillgiant", slug: "hill-giant", name: "Hill giant", edition: "OSRS", kind: "monster", slayer: true, where: "Edgeville dungeon", hunt: "Crush in multi. Brass key from the west.", wiki: osrsWiki("Hill_Giant"), still: "/locations/osrsedge.jpg", placeId: "osrsedge" },
  { id: "osrs-lesserdemon", slug: "lesser-demon", name: "Lesser demon", edition: "OSRS", kind: "monster", slayer: true, where: "Taverley dungeon", hunt: "Magic and melee. Protect Magic if you idle.", wiki: osrsWiki("Lesser_demon"), still: "/locations/osrstav.jpg", placeId: "osrstav" },
  { id: "osrs-greaterdemon", slug: "greater-demon", name: "Greater demon", edition: "OSRS", kind: "monster", slayer: true, where: "Taverley dungeon, Chasm of Fire", hunt: "Heavier melee and mage. Protect as the live page says.", wiki: osrsWiki("Greater_demon"), still: "/locations/osrstav.jpg", placeId: "osrstav" },
  { id: "osrs-blackdemon", slug: "black-demon", name: "Black demon", edition: "OSRS", kind: "monster", slayer: true, where: "Taverley dungeon, Catacombs", hunt: "Harder demon. Multi in the catacombs. Burst is common.", wiki: osrsWiki("Black_demon"), still: "/locations/osrstav.jpg", placeId: "osrstav" },
  { id: "osrs-hellhound", slug: "hellhound", name: "Hellhound", edition: "OSRS", kind: "monster", slayer: true, where: "Taverley dungeon, Wilderness", hunt: "Fast melee. Protect Melee. Not Cerberus — that fight is on Bosses.", wiki: osrsWiki("Hellhound"), still: "/locations/osrstav.jpg", placeId: "osrstav" },
  { id: "osrs-crawlinghand", slug: "crawling-hand", name: "Crawling Hand", edition: "OSRS", kind: "monster", slayer: true, where: "Slayer Tower", gate: "Slayer", hunt: "Low tower task. Melee. The still is the Morytania approach, not an icon.", wiki: osrsWiki("Crawling_Hand"), still: "/locations/osrscani.jpg", placeId: "osrscani" },
  { id: "osrs-banshee", slug: "banshee", name: "Banshee", edition: "OSRS", kind: "monster", slayer: true, where: "Slayer Tower", gate: "Slayer — earmuffs", hunt: "They scream without cover. Protect Magic.", wiki: osrsWiki("Banshee"), still: "/locations/osrscani.jpg", placeId: "osrscani" },
  { id: "osrs-infernalmage", slug: "infernal-mage", name: "Infernal Mage", edition: "OSRS", kind: "monster", slayer: true, where: "Slayer Tower", gate: "Slayer", hunt: "They cast. Protect Magic. Mid tower.", wiki: osrsWiki("Infernal_Mage"), still: "/locations/osrscani.jpg", placeId: "osrscani" },
  { id: "osrs-bloodveld", slug: "bloodveld", name: "Bloodveld", edition: "OSRS", kind: "monster", slayer: true, where: "Slayer Tower, Catacombs", gate: "Slayer", hunt: "Melee. Burst in multi. Mutated variants stay on the wiki.", wiki: osrsWiki("Bloodveld"), still: "/locations/osrscani.jpg", placeId: "osrscani" },
  { id: "osrs-gargoyle", slug: "gargoyle", name: "Gargoyle", edition: "OSRS", kind: "monster", slayer: true, where: "Slayer Tower top", gate: "Slayer", hunt: "Rock melee. Finish with a rock hammer or helm perk.", wiki: osrsWiki("Gargoyle"), still: "/locations/osrscani.jpg", placeId: "osrscani" },
  { id: "osrs-nechryael", slug: "nechryael", name: "Nechryael", edition: "OSRS", kind: "monster", slayer: true, where: "Slayer Tower, Catacombs", gate: "Slayer", hunt: "Death spawn. Protect Melee. Burst in multi.", wiki: osrsWiki("Nechryael"), still: "/locations/osrscani.jpg", placeId: "osrscani" },
  { id: "osrs-abyssal", slug: "abyssal-demon", name: "Abyssal demon", edition: "OSRS", kind: "monster", slayer: true, where: "Slayer Tower, Catacombs", gate: "Slayer", hunt: "They teleport a few tiles. Protect Melee.", wiki: osrsWiki("Abyssal_demon"), still: "/locations/osrscani.jpg", placeId: "osrscani" },
  { id: "osrs-spectre", slug: "aberrant-spectre", name: "Aberrant spectre", edition: "OSRS", kind: "monster", slayer: true, where: "Slayer Tower", gate: "Slayer — nose peg or slayer helm", hunt: "They drain without a face cover. Protect Magic.", wiki: osrsWiki("Aberrant_spectre"), still: "/locations/osrscani.jpg", placeId: "osrscani" },
  { id: "osrs-jelly", slug: "jelly", name: "Jelly", edition: "OSRS", kind: "monster", slayer: true, where: "Fremennik Slayer Dungeon", gate: "Slayer", hunt: "Magic hits. Protect Magic. The cave is a lane.", wiki: osrsWiki("Jelly"), still: "/locations/osrsrel.jpg", placeId: "osrsrel" },
  { id: "osrs-turoth", slug: "turoth", name: "Turoth", edition: "OSRS", kind: "monster", slayer: true, where: "Fremennik Slayer Dungeon", gate: "Slayer, leaf-bladed or broad", hunt: "Ordinary steel bounces.", wiki: osrsWiki("Turoth"), still: "/locations/osrsrel.jpg", placeId: "osrsrel" },
  { id: "osrs-kurask", slug: "kurask", name: "Kurask", edition: "OSRS", kind: "monster", slayer: true, where: "Fremennik Slayer Dungeon", gate: "Slayer, leaf-bladed or broad", hunt: "Same rule as Turoth. Protect Melee.", wiki: osrsWiki("Kurask"), still: "/locations/osrsrel.jpg", placeId: "osrsrel" },
  { id: "osrs-cockatrice", slug: "cockatrice", name: "Cockatrice", edition: "OSRS", kind: "monster", slayer: true, where: "Fremennik Slayer Dungeon", gate: "Slayer — mirror shield", hunt: "They reduce stats without a shield.", wiki: osrsWiki("Cockatrice"), still: "/locations/osrsrel.jpg", placeId: "osrsrel" },
  { id: "osrs-basilisk", slug: "basilisk", name: "Basilisk", edition: "OSRS", kind: "monster", slayer: true, where: "Fremennik Slayer Dungeon", gate: "Slayer — mirror shield", hunt: "Same shield as Cockatrice. Melee.", wiki: osrsWiki("Basilisk"), still: "/locations/osrsrel.jpg", placeId: "osrsrel" },
  { id: "osrs-pyrefiend", slug: "pyrefiend", name: "Pyrefiend", edition: "OSRS", kind: "monster", slayer: true, where: "Fremennik Slayer Dungeon", gate: "Slayer", hunt: "Magic. Protect Magic.", wiki: osrsWiki("Pyrefiend"), still: "/locations/osrsrel.jpg", placeId: "osrsrel" },
  { id: "osrs-cavecrawler", slug: "cave-crawler", name: "Cave crawler", edition: "OSRS", kind: "monster", slayer: true, where: "Fremennik Slayer Dungeon", gate: "Slayer", hunt: "Poison. Bring an antipoison.", wiki: osrsWiki("Cave_crawler"), still: "/locations/osrsrel.jpg", placeId: "osrsrel" },
  { id: "osrs-dagannoth", slug: "dagannoth", name: "Dagannoth", edition: "OSRS", kind: "monster", slayer: true, where: "Lighthouse, Waterbirth", hunt: "Melee and ranged packs. Kings stay on Bosses.", wiki: osrsWiki("Dagannoth"), still: "/locations/osrsrel.jpg", placeId: "osrsrel" },
  { id: "osrs-dustdevil", slug: "dust-devil", name: "Dust devil", edition: "OSRS", kind: "monster", slayer: true, where: "Smoke Dungeon, Catacombs", gate: "Slayer — face mask", hunt: "They drain without a mask. Burst in multi.", wiki: osrsWiki("Dust_devil"), still: "/locations/osrsalk.jpg", placeId: "osrsalk" },
  { id: "osrs-smokedevil", slug: "smoke-devil", name: "Smoke devil", edition: "OSRS", kind: "monster", slayer: true, where: "Smoke Devil Dungeon", gate: "Slayer — face mask", hunt: "The Thermonuclear fight is on Bosses. These are the task.", wiki: osrsWiki("Smoke_devil"), still: "/locations/osrsalk.jpg", placeId: "osrsalk" },
  { id: "osrs-darkbeast", slug: "dark-beast", name: "Dark beast", edition: "OSRS", kind: "monster", slayer: true, where: "Mourner Tunnels", gate: "Slayer", hunt: "Heavy melee and a magic slap. Protect Melee.", wiki: osrsWiki("Dark_beast"), still: "/locations/osrsprif.jpg", placeId: "osrsprif" },
  { id: "osrs-ankou", slug: "ankou", name: "Ankou", edition: "OSRS", kind: "monster", slayer: true, where: "Stronghold of Security, Catacombs", hunt: "Melee. Burst in multi catacombs.", wiki: osrsWiki("Ankou"), still: "/stills/osrs/osrs-varrock-a.jpg", placeId: "osrsvarrock" },
  { id: "osrs-lizardman", slug: "lizardman", name: "Lizardman", edition: "OSRS", kind: "monster", slayer: true, where: "Kebos, Shayzien", hunt: "Ranged packs. Shamans that sit on Bosses stay there.", wiki: osrsWiki("Lizardman"), still: "/locations/osrstav.jpg", placeId: "osrstav" },

  { id: "rs3-goblin", slug: "goblin", name: "Goblin", edition: "RS3", kind: "monster", where: "Goblin Village", hunt: "Low-level melee on the RS3 yard.", wiki: rs3Wiki("Goblin"), still: "/locations/goblin.jpg", placeId: "goblin" },
  { id: "rs3-cow", slug: "cow", name: "Cow", edition: "RS3", kind: "monster", where: "Lumbridge field", hunt: "Melee in the rebuilt paddock.", wiki: rs3Wiki("Cow"), still: "/stills/rs3/rs3-lumbridge-a.jpg", placeId: "lumbridge" },
  { id: "rs3-hillgiant", slug: "hill-giant", name: "Hill giant", edition: "RS3", kind: "monster", slayer: true, where: "Edgeville dungeon", hunt: "Crush in the later dungeon. Multi.", wiki: rs3Wiki("Hill_giant"), still: "/locations/edgeville.jpg", placeId: "edgeville" },
  { id: "rs3-lesserdemon", slug: "lesser-demon", name: "Lesser demon", edition: "RS3", kind: "monster", slayer: true, where: "Taverley dungeon", hunt: "Magic and melee.", wiki: rs3Wiki("Lesser_demon"), still: "/locations/taverley.jpg", placeId: "taverley" },
  { id: "rs3-greaterdemon", slug: "greater-demon", name: "Greater demon", edition: "RS3", kind: "monster", slayer: true, where: "Taverley dungeon", hunt: "Heavier demon. Protect as the RS3 page says.", wiki: rs3Wiki("Greater_demon"), still: "/locations/taverley.jpg", placeId: "taverley" },
  { id: "rs3-hellhound", slug: "hellhound", name: "Hellhound", edition: "RS3", kind: "monster", slayer: true, where: "Taverley dungeon", hunt: "Fast melee. Not a GWD commander.", wiki: rs3Wiki("Hellhound"), still: "/locations/taverley.jpg", placeId: "taverley" },
  { id: "rs3-abyssal", slug: "abyssal-demon", name: "Abyssal demon", edition: "RS3", kind: "monster", slayer: true, where: "Slayer Tower, Abyss", gate: "Slayer", hunt: "They teleport. Protect Melee. Ability lines live on the wiki.", wiki: rs3Wiki("Abyssal_demon"), still: "/locations/canifis.jpg", placeId: "canifis" },
  { id: "rs3-gargoyle", slug: "gargoyle", name: "Gargoyle", edition: "RS3", kind: "monster", slayer: true, where: "Slayer Tower", gate: "Slayer", hunt: "Stone melee. Finish them as the RS3 page says.", wiki: rs3Wiki("Gargoyle"), still: "/locations/canifis.jpg", placeId: "canifis" },
  { id: "rs3-spectre", slug: "aberrant-spectre", name: "Aberrant spectre", edition: "RS3", kind: "monster", slayer: true, where: "Slayer Tower", gate: "Slayer — nose peg or equivalent", hunt: "They drain without a cover. Protect Magic.", wiki: rs3Wiki("Aberrant_spectre"), still: "/locations/canifis.jpg", placeId: "canifis" },
  { id: "rs3-nechryael", slug: "nechryael", name: "Nechryael", edition: "RS3", kind: "monster", slayer: true, where: "Slayer Tower", gate: "Slayer", hunt: "Death spawn. Protect Melee.", wiki: rs3Wiki("Nechryael"), still: "/locations/canifis.jpg", placeId: "canifis" },
  { id: "rs3-bloodveld", slug: "bloodveld", name: "Bloodveld", edition: "RS3", kind: "monster", slayer: true, where: "Slayer Tower", gate: "Slayer", hunt: "Melee task. Mutated variants on the wiki.", wiki: rs3Wiki("Bloodveld"), still: "/locations/canifis.jpg", placeId: "canifis" },
  { id: "rs3-banshee", slug: "banshee", name: "Banshee", edition: "RS3", kind: "monster", slayer: true, where: "Slayer Tower", gate: "Slayer — earmuffs", hunt: "They scream without cover.", wiki: rs3Wiki("Banshee"), still: "/locations/canifis.jpg", placeId: "canifis" },
  { id: "rs3-darkbeast", slug: "dark-beast", name: "Dark beast", edition: "RS3", kind: "monster", slayer: true, where: "Temple of Light tunnels", gate: "Slayer", hunt: "Heavy hits. Prayer and food.", wiki: rs3Wiki("Dark_beast"), still: "/locations/prifddinas.jpg", placeId: "prifddinas" },
  { id: "rs3-kurask", slug: "kurask", name: "Kurask", edition: "RS3", kind: "monster", slayer: true, where: "Pollnivneach Slayer Dungeon", gate: "Slayer, leaf-bladed or broad", hunt: "Ordinary weapons bounce.", wiki: rs3Wiki("Kurask"), still: "/locations/sophanem.jpg", placeId: "sophanem" },
  { id: "rs3-edimmu", slug: "edimmu", name: "Edimmu", edition: "RS3", kind: "monster", slayer: true, where: "Prifddinas slayer dungeon", gate: "Slayer, Prifddinas", hunt: "RS3-only. The live page owns the hour.", wiki: rs3Wiki("Edimmu"), still: "/locations/prifddinas.jpg", placeId: "prifddinas" },
  { id: "rs3-ripper", slug: "ripper-demon", name: "Ripper Demon", edition: "RS3", kind: "monster", slayer: true, where: "Ripper Demon cave", gate: "Slayer", hunt: "RS3-only. Fast melee. Method on the wiki.", wiki: rs3Wiki("Ripper_Demon"), still: "/locations/edgeville.jpg", placeId: "edgeville" },

  { id: "osrs-wyrm", slug: "wyrm", name: "Wyrm", edition: "OSRS", kind: "monster", slayer: true, where: "Karuulm Slayer Dungeon", gate: "Slayer", hunt: "Task in the mountain. Boots for the floor. Not the Alchemical fight.", wiki: osrsWiki("Wyrm"), still: "" },
  { id: "osrs-drake", slug: "drake", name: "Drake", edition: "OSRS", kind: "monster", slayer: true, where: "Karuulm Slayer Dungeon", gate: "Slayer", hunt: "Heavier wyrm-kin. Protect as the live page says.", wiki: osrsWiki("Drake"), still: "" },
  { id: "osrs-hydra", slug: "hydra", name: "Hydra", edition: "OSRS", kind: "monster", slayer: true, where: "Karuulm Slayer Dungeon", gate: "Slayer", hunt: "The task hydras. Alchemical Hydra is on Bosses.", wiki: osrsWiki("Hydra"), still: "" },
  { id: "osrs-deviantspectre", slug: "deviant-spectre", name: "Deviant spectre", edition: "OSRS", kind: "monster", slayer: true, where: "Catacombs of Kourend", gate: "Slayer — nose peg or helm", hunt: "Catacombs variant. Protect Magic.", wiki: osrsWiki("Deviant_spectre"), still: "" },
  { id: "osrs-firegiant", slug: "fire-giant", name: "Fire giant", edition: "OSRS", kind: "monster", slayer: true, where: "Waterfall dungeon, Catacombs", hunt: "Melee. Multi in catacombs.", wiki: osrsWiki("Fire_giant"), still: "", placeId: "osrstav" },
  { id: "osrs-icegiant", slug: "ice-giant", name: "Ice giant", edition: "OSRS", kind: "monster", slayer: true, where: "Asgarnian Ice Dungeon, Wilderness", hunt: "Crush. Protect Melee if you idle.", wiki: osrsWiki("Ice_giant"), still: "" },
  { id: "osrs-mossgiant", slug: "moss-giant", name: "Moss giant", edition: "OSRS", kind: "monster", slayer: true, where: "Varrock sewers, Crandor", hunt: "Low crush. Multi in some rooms.", wiki: osrsWiki("Moss_giant"), still: "", placeId: "osrsvarrock" },
  { id: "osrs-troll", slug: "troll", name: "Troll", edition: "OSRS", kind: "monster", slayer: true, where: "Troll Stronghold", hunt: "Melee on the mountain. Ice trolls are a variant on the wiki.", wiki: osrsWiki("Troll"), still: "", placeId: "osrstav" },
  { id: "osrs-suqah", slug: "suqah", name: "Suqah", edition: "OSRS", kind: "monster", slayer: true, where: "Lunar Isle", hunt: "Melee and mage. The isle is the room.", wiki: osrsWiki("Suqah"), still: "" },
  { id: "osrs-waterfiend", slug: "waterfiend", name: "Waterfiend", edition: "OSRS", kind: "monster", slayer: true, where: "Ancient Cavern, Kraken Cove", hunt: "Magic. Protect Magic. Crush helps.", wiki: osrsWiki("Waterfiend"), still: "" },
  { id: "osrs-skeletalwyvern", slug: "skeletal-wyvern", name: "Skeletal wyvern", edition: "OSRS", kind: "monster", slayer: true, where: "Asgarnian Ice Dungeon", gate: "Slayer — elemental or mind shield", hunt: "Icy breath. The ancient wyvern stay on the wiki if they are a separate task.", wiki: osrsWiki("Skeletal_Wyvern"), still: "" },
  { id: "osrs-spiritualwarrior", slug: "spiritual-warrior", name: "Spiritual warrior", edition: "OSRS", kind: "monster", slayer: true, where: "God Wars Dungeon", gate: "Slayer", hunt: "GWD task, not a commander. Commanders are on Bosses.", wiki: osrsWiki("Spiritual_warrior"), still: "" },
  { id: "osrs-spiritualranger", slug: "spiritual-ranger", name: "Spiritual ranger", edition: "OSRS", kind: "monster", slayer: true, where: "God Wars Dungeon", gate: "Slayer", hunt: "Protect Missiles. Not Kree'arra.", wiki: osrsWiki("Spiritual_ranger"), still: "" },
  { id: "osrs-spiritualmage", slug: "spiritual-mage", name: "Spiritual mage", edition: "OSRS", kind: "monster", slayer: true, where: "God Wars Dungeon", gate: "Slayer", hunt: "Protect Magic. Not a commander.", wiki: osrsWiki("Spiritual_mage"), still: "" },
  { id: "osrs-fossilwyvern", slug: "fossil-island-wyvern", name: "Fossil Island wyvern", edition: "OSRS", kind: "monster", slayer: true, where: "Wyvern Cave", gate: "Slayer", hunt: "Spitting, taloned, long-tailed. Ancient wyvern if treated as a boss stays off this list.", wiki: osrsWiki("Fossil_Island_wyvern"), still: "" },
  { id: "osrs-araxyte", slug: "araxyte", name: "Araxyte", edition: "OSRS", kind: "monster", slayer: true, where: "Morytania", gate: "Slayer", hunt: "The task spiders. Araxxor stays on Bosses.", wiki: osrsWiki("Araxyte"), still: "", placeId: "osrscani" },
  { id: "osrs-warpedtb", slug: "warped-terrorbird", name: "Warped terrorbird", edition: "OSRS", kind: "monster", slayer: true, where: "Poison Waste dungeon", gate: "Slayer", hunt: "The live page owns the room.", wiki: osrsWiki("Warped_terrobird"), still: "" },
  { id: "osrs-warpedto", slug: "warped-tortoise", name: "Warped tortoise", edition: "OSRS", kind: "monster", slayer: true, where: "Poison Waste dungeon", gate: "Slayer", hunt: "Same dungeon as the birds.", wiki: osrsWiki("Warped_tortoise"), still: "" },

  { id: "rs3-turoth", slug: "turoth", name: "Turoth", edition: "RS3", kind: "monster", slayer: true, where: "Pollnivneach Slayer Dungeon", gate: "Slayer", hunt: "Leaf-bladed or broad.", wiki: rs3Wiki("Turoth"), still: "" },
  { id: "rs3-jelly", slug: "jelly", name: "Jelly", edition: "RS3", kind: "monster", slayer: true, where: "Fremennik slayer dungeon", gate: "Slayer", hunt: "Protect Magic.", wiki: rs3Wiki("Jelly"), still: "" },
  { id: "rs3-firegiant", slug: "fire-giant", name: "Fire giant", edition: "RS3", kind: "monster", slayer: true, where: "Waterfall dungeon, Brimhaven", hunt: "Melee task.", wiki: rs3Wiki("Fire_giant"), still: "" },
  { id: "rs3-waterfiend", slug: "waterfiend", name: "Waterfiend", edition: "RS3", kind: "monster", slayer: true, where: "Ancient Cavern", hunt: "Magic. Protect Magic.", wiki: rs3Wiki("Waterfiend"), still: "" },
  { id: "rs3-aquanite", slug: "aquanite", name: "Aquanite", edition: "RS3", kind: "monster", slayer: true, where: "Fremennik slayer dungeon", gate: "Slayer", hunt: "RS3 slayer. The live page owns the hour.", wiki: rs3Wiki("Aquanite"), still: "" },
  { id: "rs3-ganodermic", slug: "ganodermic-beast", name: "Ganodermic beast", edition: "RS3", kind: "monster", slayer: true, where: "Polypore Dungeon", gate: "Slayer", hunt: "Magic task. Not a raid.", wiki: rs3Wiki("Ganodermic_beast"), still: "" },
  { id: "rs3-airut", slug: "airut", name: "Airut", edition: "RS3", kind: "monster", slayer: true, where: "Airut cave", gate: "Slayer", hunt: "RS3-only. Heavy melee.", wiki: rs3Wiki("Airut"), still: "" },
  { id: "rs3-camel", slug: "camel-warrior", name: "Camel Warrior", edition: "RS3", kind: "monster", slayer: true, where: "Sophanem slayer dungeon", gate: "Slayer", hunt: "RS3-only. The live page owns the clones.", wiki: rs3Wiki("Camel_Warrior"), still: "", placeId: "sophanem" },
  { id: "rs3-automaton", slug: "automaton", name: "Automaton", edition: "RS3", kind: "monster", slayer: true, where: "Guthixian temple", gate: "Slayer", hunt: "Melee, ranged, or mage body. Not a world boss.", wiki: rs3Wiki("Automaton"), still: "", placeId: "taverley" },
  { id: "rs3-souldevourer", slug: "soul-devourer", name: "Soul devourer", edition: "RS3", kind: "monster", slayer: true, where: "Sophanem slayer dungeon", gate: "Slayer", hunt: "Several faces. Amascut’s raid stays on Bosses.", wiki: rs3Wiki("Soul_devourer"), still: "", placeId: "sophanem" },
  { id: "rs3-livingwyvern", slug: "living-wyvern", name: "Living wyvern", edition: "RS3", kind: "monster", slayer: true, where: "Wyvern cave", gate: "Slayer", hunt: "Icy breath. Shield as the live page says.", wiki: rs3Wiki("Living_wyvern"), still: "" },
];

const NOTES: Record<string, { masters?: string; style?: string; watch?: string; slayerWiki?: string }> = {
  "osrs-abyssal": {
    masters: "Chaeldar, Konar, Nieve/Steve, Duradel.",
    style:
      "Stand on the Slayer Tower floor or in the Catacombs multi. They melee and teleport a few tiles — do not plant your feet on the last tile they leave. Protect Melee. Tower is single; Catacombs is the Old School burst room. Cannon stays out of the Tower. Slayer helm on task. Do not invent a scythe.",
    watch: "They teleport a few tiles.",
    slayerWiki: "https://oldschool.runescape.wiki/w/Abyssal_demon#Slayer_task",
  },
  "rs3-abyssal": {
    masters: "RuneScape slayer masters from Laniakea’s list on the live page.",
    style:
      "Stand in the RuneScape slayer dungeon that holds them. They melee and teleport. Protect Melee. Play your bar. Weakness is slashing as a type. No Old School barrage paragraph belongs here.",
    watch: "They teleport.",
  },
  "osrs-gargoyle": {
    masters: "Chaeldar, Konar, Nieve/Steve, Duradel.",
    style: "Protect Melee. Finish with a rock hammer or the slayer helm perk. Tower is single.",
    watch: "They do not die until you finish them.",
  },
  "osrs-spectre": {
    masters: "Chaeldar, Konar, Nieve/Steve, Duradel.",
    style: "Protect Magic. Nose peg or slayer helm. Burst in Catacombs.",
    watch: "Bare-faced they drain you.",
  },
  "osrs-hellhound": {
    masters: "Chaeldar, Konar, Nieve/Steve, Duradel.",
    style: "Protect Melee. Taverley can take a cannon. Wilderness is a risk.",
    watch: "Cerberus is on Bosses.",
  },
  "osrs-dustdevil": {
    masters: "Chaeldar, Konar, Nieve/Steve, Duradel.",
    style: "Face mask. Burst in Catacombs. Smoke Dungeon is hot.",
    watch: "No mask, they drain.",
  },
  "rs3-ripper": {
    masters: "High RS3 slayer masters. Live page lists who.",
    style: "Fast melee. Ability lines on the wiki.",
    watch: "Task-only door on some versions.",
  },
};

export function monsterTaskLine(row: Monster) {
  if (!row.slayer) return "Not even a task.";
  const note = NOTES[row.id];
  if (note?.masters) return note.masters;
  return row.edition === "OSRS"
    ? "Assigned by Old School slayer masters (Chaeldar through Duradel, and Konar). The live page lists who."
    : "Assigned by RuneScape slayer masters. The live page lists who.";
}

export function monsterHuntLine(row: Monster) {
  const note = NOTES[row.id];
  if (note?.style && note.style.split(". ").length >= 4) return note.style;
  const slayer = row.slayer;
  const tower = /tower|morytania|canifis/i.test(row.where);
  const wildy = /wilderness/i.test(row.where);
  const multi = /catacombs|multi/i.test(row.hunt + row.where);
  if (row.edition === "OSRS") {
    const burst = /dust devil|nechryael|smoke devil|abyssal|black demon|greater demon|dustdevil|nech|smoke/i.test(row.slug + row.name);
    const bits = [
      `Stand in ${row.where.split(",")[0]}. The door or the middle of the room is the usual tile; a safespot only if the live page still names one.`,
      `${row.name} hits with the style that room is known for — melee, magic, or a mix. Protect that style before you loot.`,
      slayer ? "A slayer helm is the face cover and the accuracy. Task-only doors stay shut without the assignment." : "This is not a slayer assignment in Old School.",
      burst && multi
        ? "This is an Old School burst task when the room is multi. Splash, then barrage. Do not copy that sentence onto a RuneScape sheet."
        : "Single-way rooms are click and protect. Do not invent a barrage tile here.",
      "A dwarf cannon only if this cave allows it. Some slayer rooms block it; the wiki says which.",
      row.watch || "Poison, line-of-sight, and cannon-blocks are the caution — not a price.",
      "If you die, that is also data.",
    ];
    if (tower) bits.splice(2, 0, "The Slayer Tower is the lesson: stairs, then the floor they live on. Do not invent a scythe.");
    if (wildy) bits.push("Wilderness is risk, not a raid. Protect item as you would on any ditch trip.");
    if (note?.style) bits.unshift(note.style);
    return bits.join(" ");
  }
  const bits = [
    `Stand in ${row.where.split(",")[0]} on the RuneScape client.`,
    `${row.name} uses the style that dungeon is built for. Protect that style.`,
    slayer ? "Slayer helm if you are on task. Masters and doors are on the live page." : "Not a slayer task in this game.",
    "Play your own ability bar. Weakness is a type (crush, fire, slash), not a shopping list.",
    "Do not paste an Old School barrage paragraph onto this sheet.",
    row.watch || "Task-only doors and line-of-sight are the caution.",
    "The wiki has the rest.",
  ];
  if (note?.style) bits.unshift(note.style);
  return bits.join(" ");
}

export function monsterKillLine(row: Monster) {
  const gameWiki = row.edition === "OSRS" ? "Old School wiki" : "RuneScape wiki";
  return [
    `A kill ends when ${row.name.toLowerCase()} drops. Walk the room if you pulled extras. Reset at the door if the task is done.`,
    "Do not stand on the wrong tile and do not pray the wrong style. That is the whole wipe.",
    row.edition === "OSRS"
      ? "Do not treat a slayer floor as a raid invocation."
      : "Do not treat this as an enrage boss. Those sheets live under Bosses.",
    `Counts, drops, and the living method: the ${gameWiki} for this hour.`,
  ].join(" ");
}

export function monsterWatchLine(row: Monster) {
  return NOTES[row.id]?.watch ?? row.watch ?? "Task-only doors and cannon-blocks are on the live page.";
}

export function monsterSlayerLink(row: Monster) {
  return NOTES[row.id]?.slayerWiki;
}

export function monsterById(id: string) {
  return MONSTERS.find((row) => row.id === id);
}