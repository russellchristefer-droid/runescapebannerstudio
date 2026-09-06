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
  const file = slug === "warpedterrobird" ? "warpedterrorbird" : slug;
  return `/stills/${game}/beast-${file}.jpg?v=5`;
}

export function monsterStillLine(row: Pick<Monster, "id" | "name" | "edition">) {
  return MONSTER_LINE[row.id] ?? "The creature. Not the room. Bosses have their own page.";
}

const MONSTER_LINE: Record<string, string> = {
  "osrs-goblin": "Yard fodder. Diplomacy is upstairs.",
  "osrs-cow": "Hide is the lesson. Leave the scythe home.",
  "osrs-gargoyle": "They do not die until the hammer.",
  "osrs-abyssal": "They teleport a few tiles. Do not plant.",
  "osrs-spectre": "Nose peg. Bare-faced is the wipe.",
  "osrs-banshee": "Earmuffs. The wipe is a bare ear.",
  "osrs-hellhound": "Protect Melee. Cerberus is on Bosses.",
  "osrs-hydra": "Task hydras. Alchemical is on Bosses.",
  "osrs-dustdevil": "Face mask. No mask, they drain.",
  "osrs-kurask": "Leaf-bladed or broad. Ordinary steel bounces.",
  "osrs-turoth": "Same gate as Kurask.",
  "osrs-cockatrice": "Mirror shield. That is the prayer.",
  "osrs-basilisk": "Same shield as Cockatrice.",
  "osrs-skeletalwyvern": "Elemental or mind shield. Breath is the wipe.",
  "osrs-araxyte": "Task spiders. Araxxor stays on Bosses.",
  "osrs-smokedevil": "The cave is not the Thermonuclear room.",
  "osrs-spiritualwarrior": "Kill count. Not Graardor.",
  "osrs-spiritualranger": "Kill count. Not Kree'arra.",
  "osrs-spiritualmage": "Kill count. Not a commander.",
  "rs3-gargoyle": "Finish them. They do not drop until that click.",
  "rs3-abyssal": "They teleport. Play the bar. No barrage paragraph.",
  "rs3-ripper": "RuneScape-only. Task-only door on some versions.",
  "rs3-edimmu": "Crystal dungeon. No Old School room.",
  "rs3-souldevourer": "Sophanem task. Amascut’s raid stays on Bosses.",
  "rs3-airut": "RuneScape-only. Heavy melee.",
  "rs3-camel": "The live page owns the clones.",
  "rs3-cow": "Rebuilt paddock. Leave the scythe home.",
};

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
  { id: "osrs-goblin", slug: "goblin", name: "Goblin", edition: "OSRS", kind: "monster", where: "Goblin Village", hunt: "Yard melee. Multi. Learn food on these, then leave. Diplomacy is the politics; this is the fodder.", wiki: osrsWiki("Goblin"), still: "/locations/osrsgob.jpg", placeId: "osrsgob" },
  { id: "osrs-cow", slug: "cow", name: "Cow", edition: "OSRS", kind: "monster", where: "Lumbridge east field", hunt: "Paddock melee. Hide is the lesson. Leave the scythe home.", wiki: osrsWiki("Cow"), still: "/stills/osrs/osrs-lumbridge-a.jpg", placeId: "osrslumbridge" },
  { id: "osrs-hillgiant", slug: "hill-giant", name: "Hill giant", edition: "OSRS", kind: "monster", slayer: true, where: "Edgeville dungeon", hunt: "Crush in multi. Brass key from the west door. Big bones. Not a boss.", wiki: osrsWiki("Hill_Giant"), still: "/locations/osrsedge.jpg", placeId: "osrsedge" },
  { id: "osrs-lesserdemon", slug: "lesser-demon", name: "Lesser demon", edition: "OSRS", kind: "monster", slayer: true, where: "Taverley dungeon", hunt: "Magic and melee. Protect Magic if you idle. Taverley is a lane, not a raid.", wiki: osrsWiki("Lesser_demon"), still: "/locations/osrstav.jpg", placeId: "osrstav" },
  { id: "osrs-greaterdemon", slug: "greater-demon", name: "Greater demon", edition: "OSRS", kind: "monster", slayer: true, where: "Taverley dungeon, Chasm of Fire", hunt: "Heavier demon. Protect as the live page says. Chasm of Fire is the burst room when the task allows it.", wiki: osrsWiki("Greater_demon"), still: "/locations/osrstav.jpg", placeId: "osrstav" },
  { id: "osrs-blackdemon", slug: "black-demon", name: "Black demon", edition: "OSRS", kind: "monster", slayer: true, where: "Taverley dungeon, Catacombs", hunt: "Harder demon. Catacombs is multi — burst is common. Taverley is the long room. Leave a raid invocation home.", wiki: osrsWiki("Black_demon"), still: "/locations/osrstav.jpg", placeId: "osrstav" },
  { id: "osrs-hellhound", slug: "hellhound", name: "Hellhound", edition: "OSRS", kind: "monster", slayer: true, where: "Taverley dungeon, Wilderness", hunt: "Fast melee. Protect Melee. Taverley takes a cannon. Wilderness is a risk trip. Cerberus is on Bosses.", wiki: osrsWiki("Hellhound"), still: "/locations/osrstav.jpg", placeId: "osrstav" },
  { id: "osrs-crawlinghand", slug: "crawling-hand", name: "Crawling Hand", edition: "OSRS", kind: "monster", slayer: true, where: "Slayer Tower", gate: "Slayer", hunt: "Ground floor of the Tower. Melee. Stairs, then the floor they live on. Do not invent a scythe.", wiki: osrsWiki("Crawling_Hand"), still: "/locations/osrscani.jpg", placeId: "osrscani" },
  { id: "osrs-banshee", slug: "banshee", name: "Banshee", edition: "OSRS", kind: "monster", slayer: true, where: "Slayer Tower", gate: "Slayer — earmuffs", hunt: "They scream without cover. Earmuffs or a slayer helm. Protect Magic. The wipe is a bare ear.", wiki: osrsWiki("Banshee"), still: "/locations/osrscani.jpg", placeId: "osrscani" },
  { id: "osrs-infernalmage", slug: "infernal-mage", name: "Infernal Mage", edition: "OSRS", kind: "monster", slayer: true, where: "Slayer Tower", gate: "Slayer", hunt: "They cast. Protect Magic. Mid tower. Single-way. Click and pray.", wiki: osrsWiki("Infernal_Mage"), still: "/locations/osrscani.jpg", placeId: "osrscani" },
  { id: "osrs-bloodveld", slug: "bloodveld", name: "Bloodveld", edition: "OSRS", kind: "monster", slayer: true, where: "Slayer Tower, Catacombs", gate: "Slayer", hunt: "Melee. Tower is single. Catacombs is the burst room. Mutated variants stay on the wiki.", wiki: osrsWiki("Bloodveld"), still: "/locations/osrscani.jpg", placeId: "osrscani" },
  { id: "osrs-gargoyle", slug: "gargoyle", name: "Gargoyle", edition: "OSRS", kind: "monster", slayer: true, where: "Slayer Tower top", gate: "Slayer", hunt: "Rock melee. Protect Melee. They do not die until a rock hammer or the helm perk finishes them. That is the wipe.", wiki: osrsWiki("Gargoyle"), still: "/locations/osrscani.jpg", placeId: "osrscani" },
  { id: "osrs-nechryael", slug: "nechryael", name: "Nechryael", edition: "OSRS", kind: "monster", slayer: true, where: "Slayer Tower, Catacombs", gate: "Slayer", hunt: "Death spawn. Protect Melee. Tower is single. Catacombs is the burst room. Leave the spawn on the floor and the next pull is messy.", wiki: osrsWiki("Nechryael"), still: "/locations/osrscani.jpg", placeId: "osrscani" },
  { id: "osrs-abyssal", slug: "abyssal-demon", name: "Abyssal demon", edition: "OSRS", kind: "monster", slayer: true, where: "Slayer Tower, Catacombs", gate: "Slayer", hunt: "They melee and teleport a few tiles. Do not plant on the tile they just left. Protect Melee. Catacombs is the burst room. Cannon stays out of the Tower.", wiki: osrsWiki("Abyssal_demon"), still: "/locations/osrscani.jpg", placeId: "osrscani" },
  { id: "osrs-spectre", slug: "aberrant-spectre", name: "Aberrant spectre", edition: "OSRS", kind: "monster", slayer: true, where: "Slayer Tower", gate: "Slayer — nose peg or slayer helm", hunt: "They drain without a face cover. Nose peg or helm. Protect Magic. Bare-faced is the wipe.", wiki: osrsWiki("Aberrant_spectre"), still: "/locations/osrscani.jpg", placeId: "osrscani" },
  { id: "osrs-jelly", slug: "jelly", name: "Jelly", edition: "OSRS", kind: "monster", slayer: true, where: "Fremennik Slayer Dungeon", gate: "Slayer", hunt: "Magic hits. Protect Magic. The cave is a lane. Ordinary steel works.", wiki: osrsWiki("Jelly"), still: "/locations/osrsrel.jpg", placeId: "osrsrel" },
  { id: "osrs-turoth", slug: "turoth", name: "Turoth", edition: "OSRS", kind: "monster", slayer: true, where: "Fremennik Slayer Dungeon", gate: "Slayer, leaf-bladed or broad", hunt: "Ordinary steel bounces. Leaf-bladed or broad. That is the gate, not a suggestion.", wiki: osrsWiki("Turoth"), still: "/locations/osrsrel.jpg", placeId: "osrsrel" },
  { id: "osrs-kurask", slug: "kurask", name: "Kurask", edition: "OSRS", kind: "monster", slayer: true, where: "Fremennik Slayer Dungeon", gate: "Slayer, leaf-bladed or broad", hunt: "Same rule as Turoth. Protect Melee. Leave the whip home if it is not leaf-bladed.", wiki: osrsWiki("Kurask"), still: "/locations/osrsrel.jpg", placeId: "osrsrel" },
  { id: "osrs-cockatrice", slug: "cockatrice", name: "Cockatrice", edition: "OSRS", kind: "monster", slayer: true, where: "Fremennik Slayer Dungeon", gate: "Slayer — mirror shield", hunt: "They cut stats without a mirror shield. The shield is the prayer. Melee after that.", wiki: osrsWiki("Cockatrice"), still: "/locations/osrsrel.jpg", placeId: "osrsrel" },
  { id: "osrs-basilisk", slug: "basilisk", name: "Basilisk", edition: "OSRS", kind: "monster", slayer: true, where: "Fremennik Slayer Dungeon", gate: "Slayer — mirror shield", hunt: "Same shield as Cockatrice. Melee. Knights are a later room on the wiki — confirm the assignment.", wiki: osrsWiki("Basilisk"), still: "/locations/osrsrel.jpg", placeId: "osrsrel" },
  { id: "osrs-pyrefiend", slug: "pyrefiend", name: "Pyrefiend", edition: "OSRS", kind: "monster", slayer: true, where: "Fremennik Slayer Dungeon", gate: "Slayer", hunt: "Magic. Protect Magic. The cave is a lane.", wiki: osrsWiki("Pyrefiend"), still: "/locations/osrsrel.jpg", placeId: "osrsrel" },
  { id: "osrs-cavecrawler", slug: "cave-crawler", name: "Cave crawler", edition: "OSRS", kind: "monster", slayer: true, where: "Fremennik Slayer Dungeon", gate: "Slayer", hunt: "Poison. Antipoison before the first hit. The wipe is a stack you did not sip.", wiki: osrsWiki("Cave_crawler"), still: "/locations/osrsrel.jpg", placeId: "osrsrel" },
  { id: "osrs-dagannoth", slug: "dagannoth", name: "Dagannoth", edition: "OSRS", kind: "monster", slayer: true, where: "Lighthouse, Waterbirth", hunt: "Melee and ranged packs. Lighthouse is the task. Kings stay on Bosses. Leave the rex trip off this sheet.", wiki: osrsWiki("Dagannoth"), still: "/locations/osrsrel.jpg", placeId: "osrsrel" },
  { id: "osrs-dustdevil", slug: "dust-devil", name: "Dust devil", edition: "OSRS", kind: "monster", slayer: true, where: "Smoke Dungeon, Catacombs", gate: "Slayer — face mask", hunt: "Face mask or helm. No mask, they drain. Catacombs is the burst room. Smoke Dungeon is hot. Confirm the tile on the wiki.", wiki: osrsWiki("Dust_devil"), still: "/locations/osrsalk.jpg", placeId: "osrsalk" },
  { id: "osrs-smokedevil", slug: "smoke-devil", name: "Smoke devil", edition: "OSRS", kind: "monster", slayer: true, where: "Smoke Devil Dungeon", gate: "Slayer — face mask", hunt: "Face mask. The Thermonuclear fight is on Bosses. These are the task. Do not treat the cave as that room.", wiki: osrsWiki("Smoke_devil"), still: "/locations/osrsalk.jpg", placeId: "osrsalk" },
  { id: "osrs-darkbeast", slug: "dark-beast", name: "Dark beast", edition: "OSRS", kind: "monster", slayer: true, where: "Mourner Tunnels", gate: "Slayer", hunt: "Heavy melee and a magic slap. Protect Melee. Mourner tunnels after the west plague work. Food is a missed pray, not a rotation.", wiki: osrsWiki("Dark_beast"), still: "/locations/osrsprif.jpg", placeId: "osrsprif" },
  { id: "osrs-ankou", slug: "ankou", name: "Ankou", edition: "OSRS", kind: "monster", slayer: true, where: "Stronghold of Security, Catacombs", hunt: "Melee. Stronghold is single. Catacombs is the burst room. Leave a raid title home.", wiki: osrsWiki("Ankou"), still: "/stills/osrs/osrs-varrock-a.jpg", placeId: "osrsvarrock" },
  { id: "osrs-lizardman", slug: "lizardman", name: "Lizardman", edition: "OSRS", kind: "monster", slayer: true, where: "Kebos, Shayzien", hunt: "Ranged packs on the Kebos hill. Shamans that sit on Bosses stay there. This sheet is the fodder.", wiki: osrsWiki("Lizardman"), still: "/locations/osrstav.jpg", placeId: "osrstav" },
  { id: "osrs-wyrm", slug: "wyrm", name: "Wyrm", edition: "OSRS", kind: "monster", slayer: true, where: "Karuulm Slayer Dungeon", gate: "Slayer", hunt: "Boots for the floor. Task in the mountain. Not Alchemical Hydra. Leave that room on Bosses.", wiki: osrsWiki("Wyrm"), still: "" },
  { id: "osrs-drake", slug: "drake", name: "Drake", edition: "OSRS", kind: "monster", slayer: true, where: "Karuulm Slayer Dungeon", gate: "Slayer", hunt: "Heavier wyrm-kin. Boots for the floor. Protect as the live page says. Confirm the style on the wiki.", wiki: osrsWiki("Drake"), still: "" },
  { id: "osrs-hydra", slug: "hydra", name: "Hydra", edition: "OSRS", kind: "monster", slayer: true, where: "Karuulm Slayer Dungeon", gate: "Slayer", hunt: "The task hydras. Boots for the floor. Alchemical Hydra is on Bosses. Do not mix the two rooms.", wiki: osrsWiki("Hydra"), still: "" },
  { id: "osrs-deviantspectre", slug: "deviant-spectre", name: "Deviant spectre", edition: "OSRS", kind: "monster", slayer: true, where: "Catacombs of Kourend", gate: "Slayer — nose peg or helm", hunt: "Catacombs variant. Nose peg or helm. Protect Magic. Burst if the room is multi. Bare-faced is the wipe.", wiki: osrsWiki("Deviant_spectre"), still: "" },
  { id: "osrs-firegiant", slug: "fire-giant", name: "Fire giant", edition: "OSRS", kind: "monster", slayer: true, where: "Waterfall dungeon, Catacombs", hunt: "Melee. Waterfall is the old room. Catacombs is multi. Confirm cannon rules on the wiki.", wiki: osrsWiki("Fire_giant"), still: "", placeId: "osrstav" },
  { id: "osrs-icegiant", slug: "ice-giant", name: "Ice giant", edition: "OSRS", kind: "monster", slayer: true, where: "Asgarnian Ice Dungeon, Wilderness", hunt: "Crush. Protect Melee if you idle. Wilderness is a risk trip. Protect item.", wiki: osrsWiki("Ice_giant"), still: "" },
  { id: "osrs-mossgiant", slug: "moss-giant", name: "Moss giant", edition: "OSRS", kind: "monster", slayer: true, where: "Varrock sewers, Crandor", hunt: "Low crush. Multi in some rooms. Learn the click, then leave.", wiki: osrsWiki("Moss_giant"), still: "", placeId: "osrsvarrock" },
  { id: "osrs-troll", slug: "troll", name: "Troll", edition: "OSRS", kind: "monster", slayer: true, where: "Troll Stronghold", hunt: "Melee on the mountain. Ice trolls are a variant — confirm the assignment. Death Plateau is the road, not the wipe.", wiki: osrsWiki("Troll"), still: "", placeId: "osrstav" },
  { id: "osrs-suqah", slug: "suqah", name: "Suqah", edition: "OSRS", kind: "monster", slayer: true, where: "Lunar Isle", hunt: "Melee and mage. The isle is the room. Lunar Diplomacy is the door. Confirm pray on the wiki.", wiki: osrsWiki("Suqah"), still: "" },
  { id: "osrs-waterfiend", slug: "waterfiend", name: "Waterfiend", edition: "OSRS", kind: "monster", slayer: true, where: "Ancient Cavern, Kraken Cove", hunt: "Magic. Protect Magic. Crush helps. Ancient Cavern is the usual room. Kraken itself is on Bosses.", wiki: osrsWiki("Waterfiend"), still: "" },
  { id: "osrs-skeletalwyvern", slug: "skeletal-wyvern", name: "Skeletal wyvern", edition: "OSRS", kind: "monster", slayer: true, where: "Asgarnian Ice Dungeon", gate: "Slayer — elemental or mind shield", hunt: "Icy breath. Elemental or mind shield. Protect Missiles. Ancient wyverns are a separate file on the wiki if the task names them.", wiki: osrsWiki("Skeletal_Wyvern"), still: "" },
  { id: "osrs-spiritualwarrior", slug: "spiritual-warrior", name: "Spiritual warrior", edition: "OSRS", kind: "monster", slayer: true, where: "God Wars Dungeon", gate: "Slayer", hunt: "GWD task, not a commander. Protect Melee. Kill count is the door. Commanders sit on Bosses.", wiki: osrsWiki("Spiritual_warrior"), still: "" },
  { id: "osrs-spiritualranger", slug: "spiritual-ranger", name: "Spiritual ranger", edition: "OSRS", kind: "monster", slayer: true, where: "God Wars Dungeon", gate: "Slayer", hunt: "Protect Missiles. Not Kree'arra. Kill count is the door.", wiki: osrsWiki("Spiritual_ranger"), still: "" },
  { id: "osrs-spiritualmage", slug: "spiritual-mage", name: "Spiritual mage", edition: "OSRS", kind: "monster", slayer: true, where: "God Wars Dungeon", gate: "Slayer", hunt: "Protect Magic. Not a commander. Kill count is the door.", wiki: osrsWiki("Spiritual_mage"), still: "" },
  { id: "osrs-fossilwyvern", slug: "fossil-island-wyvern", name: "Fossil Island wyvern", edition: "OSRS", kind: "monster", slayer: true, where: "Wyvern Cave", gate: "Slayer", hunt: "Spitting, taloned, long-tailed. Shield as the live page says. Ancient wyvern if treated as a boss stays off this list.", wiki: osrsWiki("Fossil_Island_wyvern"), still: "" },
  { id: "osrs-araxyte", slug: "araxyte", name: "Araxyte", edition: "OSRS", kind: "monster", slayer: true, where: "Morytania", gate: "Slayer", hunt: "The task spiders. Araxxor stays on Bosses. Do not mix the nest with that room.", wiki: osrsWiki("Araxyte"), still: "", placeId: "osrscani" },
  { id: "osrs-warpedtb", slug: "warped-terrobird", name: "Warped terrorbird", edition: "OSRS", kind: "monster", slayer: true, where: "Poison Waste dungeon", gate: "Slayer", hunt: "Poison Waste after the west plague work. The live page owns the room. Confirm the style before you camp.", wiki: osrsWiki("Warped_terrobird"), still: "" },
  { id: "osrs-warpedto", slug: "warped-tortoise", name: "Warped tortoise", edition: "OSRS", kind: "monster", slayer: true, where: "Poison Waste dungeon", gate: "Slayer", hunt: "Same dungeon as the birds. Confirm the assignment. Leave a raid title home.", wiki: osrsWiki("Warped_tortoise"), still: "" },

  { id: "rs3-goblin", slug: "goblin", name: "Goblin", edition: "RS3", kind: "monster", where: "Goblin Village", hunt: "Yard melee on the RuneScape client. Learn the click. Then leave.", wiki: rs3Wiki("Goblin"), still: "/locations/goblin.jpg", placeId: "goblin" },
  { id: "rs3-cow", slug: "cow", name: "Cow", edition: "RS3", kind: "monster", where: "Lumbridge field", hunt: "Melee in the rebuilt paddock. Hide is still the lesson. Leave the scythe home.", wiki: rs3Wiki("Cow"), still: "/stills/rs3/rs3-lumbridge-a.jpg", placeId: "lumbridge" },
  { id: "rs3-hillgiant", slug: "hill-giant", name: "Hill giant", edition: "RS3", kind: "monster", slayer: true, where: "Edgeville dungeon", hunt: "Crush in the later dungeon. Multi. Big bones. Not a commander.", wiki: rs3Wiki("Hill_giant"), still: "/locations/edgeville.jpg", placeId: "edgeville" },
  { id: "rs3-lesserdemon", slug: "lesser-demon", name: "Lesser demon", edition: "RS3", kind: "monster", slayer: true, where: "Taverley dungeon", hunt: "Magic and melee. Play the bar. Taverley is a lane.", wiki: rs3Wiki("Lesser_demon"), still: "/locations/taverley.jpg", placeId: "taverley" },
  { id: "rs3-greaterdemon", slug: "greater-demon", name: "Greater demon", edition: "RS3", kind: "monster", slayer: true, where: "Taverley dungeon", hunt: "Heavier demon. Protect as the RuneScape page says. Ability lines live on the wiki.", wiki: rs3Wiki("Greater_demon"), still: "/locations/taverley.jpg", placeId: "taverley" },
  { id: "rs3-hellhound", slug: "hellhound", name: "Hellhound", edition: "RS3", kind: "monster", slayer: true, where: "Taverley dungeon", hunt: "Fast melee. Protect Melee. Not a GWD commander. Cerberus-class rooms stay on Bosses.", wiki: rs3Wiki("Hellhound"), still: "/locations/taverley.jpg", placeId: "taverley" },
  { id: "rs3-abyssal", slug: "abyssal-demon", name: "Abyssal demon", edition: "RS3", kind: "monster", slayer: true, where: "Slayer Tower, Abyss", gate: "Slayer", hunt: "They melee and teleport. Protect Melee. Play your bar. Weakness is slashing as a type. Do not paste an Old School barrage paragraph here.", wiki: rs3Wiki("Abyssal_demon"), still: "/locations/canifis.jpg", placeId: "canifis" },
  { id: "rs3-gargoyle", slug: "gargoyle", name: "Gargoyle", edition: "RS3", kind: "monster", slayer: true, where: "Slayer Tower", gate: "Slayer", hunt: "Stone melee. Finish them as the RuneScape page says. They do not drop until that finish. That is the wipe.", wiki: rs3Wiki("Gargoyle"), still: "/locations/canifis.jpg", placeId: "canifis" },
  { id: "rs3-spectre", slug: "aberrant-spectre", name: "Aberrant spectre", edition: "RS3", kind: "monster", slayer: true, where: "Slayer Tower", gate: "Slayer — nose peg or equivalent", hunt: "They drain without a cover. Nose peg or the live equivalent. Protect Magic. Bare-faced is the wipe.", wiki: rs3Wiki("Aberrant_spectre"), still: "/locations/canifis.jpg", placeId: "canifis" },
  { id: "rs3-nechryael", slug: "nechryael", name: "Nechryael", edition: "RS3", kind: "monster", slayer: true, where: "Slayer Tower", gate: "Slayer", hunt: "Death spawn. Protect Melee. Play the bar. Leave the spawn on the floor and the next pull is messy.", wiki: rs3Wiki("Nechryael"), still: "/locations/canifis.jpg", placeId: "canifis" },
  { id: "rs3-bloodveld", slug: "bloodveld", name: "Bloodveld", edition: "RS3", kind: "monster", slayer: true, where: "Slayer Tower", gate: "Slayer", hunt: "Melee task. Mutated variants on the wiki. Confirm the room before you camp.", wiki: rs3Wiki("Bloodveld"), still: "/locations/canifis.jpg", placeId: "canifis" },
  { id: "rs3-banshee", slug: "banshee", name: "Banshee", edition: "RS3", kind: "monster", slayer: true, where: "Slayer Tower", gate: "Slayer — earmuffs", hunt: "They scream without cover. Earmuffs. Protect Magic. The wipe is a bare ear.", wiki: rs3Wiki("Banshee"), still: "/locations/canifis.jpg", placeId: "canifis" },
  { id: "rs3-darkbeast", slug: "dark-beast", name: "Dark beast", edition: "RS3", kind: "monster", slayer: true, where: "Temple of Light tunnels", gate: "Slayer", hunt: "Heavy hits. Prayer and food. Temple of Light tunnels after the west work. Confirm the live page.", wiki: rs3Wiki("Dark_beast"), still: "/locations/prifddinas.jpg", placeId: "prifddinas" },
  { id: "rs3-kurask", slug: "kurask", name: "Kurask", edition: "RS3", kind: "monster", slayer: true, where: "Pollnivneach Slayer Dungeon", gate: "Slayer, leaf-bladed or broad", hunt: "Ordinary weapons bounce. Leaf-bladed or broad. That is the gate.", wiki: rs3Wiki("Kurask"), still: "/locations/sophanem.jpg", placeId: "sophanem" },
  { id: "rs3-turoth", slug: "turoth", name: "Turoth", edition: "RS3", kind: "monster", slayer: true, where: "Pollnivneach Slayer Dungeon", gate: "Slayer", hunt: "Leaf-bladed or broad. Same gate as Kurask. Confirm the dungeon on the wiki.", wiki: rs3Wiki("Turoth"), still: "" },
  { id: "rs3-jelly", slug: "jelly", name: "Jelly", edition: "RS3", kind: "monster", slayer: true, where: "Fremennik slayer dungeon", gate: "Slayer", hunt: "Protect Magic. Play the bar. The cave is a lane.", wiki: rs3Wiki("Jelly"), still: "" },
  { id: "rs3-firegiant", slug: "fire-giant", name: "Fire giant", edition: "RS3", kind: "monster", slayer: true, where: "Waterfall dungeon, Brimhaven", hunt: "Melee task. Waterfall or Brimhaven. Confirm the room. Leave a raid title home.", wiki: rs3Wiki("Fire_giant"), still: "" },
  { id: "rs3-waterfiend", slug: "waterfiend", name: "Waterfiend", edition: "RS3", kind: "monster", slayer: true, where: "Ancient Cavern", hunt: "Magic. Protect Magic. Crush helps. Ancient Cavern is the room.", wiki: rs3Wiki("Waterfiend"), still: "" },
  { id: "rs3-edimmu", slug: "edimmu", name: "Edimmu", edition: "RS3", kind: "monster", slayer: true, where: "Prifddinas slayer dungeon", gate: "Slayer, Prifddinas", hunt: "RuneScape-only. Crystal dungeon after the city stands. The live page owns the hour. Do not invent an Old School room.", wiki: rs3Wiki("Edimmu"), still: "/locations/prifddinas.jpg", placeId: "prifddinas" },
  { id: "rs3-ripper", slug: "ripper-demon", name: "Ripper Demon", edition: "RS3", kind: "monster", slayer: true, where: "Ripper Demon cave", gate: "Slayer", hunt: "RuneScape-only. Fast melee. Ability lines on the wiki. Task-only door on some versions. Confirm before you camp.", wiki: rs3Wiki("Ripper_Demon"), still: "/locations/edgeville.jpg", placeId: "edgeville" },
  { id: "rs3-aquanite", slug: "aquanite", name: "Aquanite", edition: "RS3", kind: "monster", slayer: true, where: "Fremennik slayer dungeon", gate: "Slayer", hunt: "RuneScape slayer. Protect as the live page says. Leave an Old School barrage paragraph home.", wiki: rs3Wiki("Aquanite"), still: "" },
  { id: "rs3-ganodermic", slug: "ganodermic-beast", name: "Ganodermic beast", edition: "RS3", kind: "monster", slayer: true, where: "Polypore Dungeon", gate: "Slayer", hunt: "Magic task in the polypore. Not a raid. Confirm weakness on the wiki.", wiki: rs3Wiki("Ganodermic_beast"), still: "" },
  { id: "rs3-airut", slug: "airut", name: "Airut", edition: "RS3", kind: "monster", slayer: true, where: "Airut cave", gate: "Slayer", hunt: "RuneScape-only. Heavy melee. Play the bar. Confirm the cave on the wiki.", wiki: rs3Wiki("Airut"), still: "" },
  { id: "rs3-camel", slug: "camel-warrior", name: "Camel Warrior", edition: "RS3", kind: "monster", slayer: true, where: "Sophanem slayer dungeon", gate: "Slayer", hunt: "RuneScape-only. The live page owns the clones. Confirm the mechanic before the first pull.", wiki: rs3Wiki("Camel_Warrior"), still: "", placeId: "sophanem" },
  { id: "rs3-automaton", slug: "automaton", name: "Automaton", edition: "RS3", kind: "monster", slayer: true, where: "Guthixian temple", gate: "Slayer", hunt: "Melee, ranged, or mage body. Not a world boss. The World Wakes temple is the room. Confirm the style on the wiki.", wiki: rs3Wiki("Automaton"), still: "", placeId: "taverley" },
  { id: "rs3-souldevourer", slug: "soul-devourer", name: "Soul devourer", edition: "RS3", kind: "monster", slayer: true, where: "Sophanem slayer dungeon", gate: "Slayer", hunt: "Several faces in the Sophanem dungeon. Amascut’s raid stays on Bosses. Do not mix the two rooms.", wiki: rs3Wiki("Soul_devourer"), still: "", placeId: "sophanem" },
  { id: "rs3-livingwyvern", slug: "living-wyvern", name: "Living wyvern", edition: "RS3", kind: "monster", slayer: true, where: "Wyvern cave", gate: "Slayer", hunt: "Icy breath. Shield as the live page says. Confirm the cave. Leave an Old School Fossil Island paragraph home.", wiki: rs3Wiki("Living_wyvern"), still: "" },
];

const NOTES: Record<string, { masters?: string; style?: string; watch?: string; slayerWiki?: string }> = {
  "osrs-abyssal": {
    masters: "Chaeldar, Konar, Nieve/Steve, Duradel.",
    style:
      "Slayer Tower floor or Catacombs multi. They melee and teleport a few tiles — do not plant on the tile they just left. Protect Melee. Tower is single; Catacombs is the burst room. Cannon stays out of the Tower. Slayer helm on task.",
    watch: "They teleport a few tiles.",
    slayerWiki: "https://oldschool.runescape.wiki/w/Abyssal_demon#Slayer_task",
  },
  "rs3-abyssal": {
    masters: "RuneScape slayer masters. Laniakea’s list on the live page.",
    style:
      "RuneScape slayer dungeon. They melee and teleport. Protect Melee. Play the bar. Weakness is slashing as a type. No Old School barrage paragraph belongs here.",
    watch: "They teleport.",
  },
  "osrs-gargoyle": {
    masters: "Chaeldar, Konar, Nieve/Steve, Duradel.",
    style: "Protect Melee. They do not die until a rock hammer or the slayer helm perk finishes them. Tower is single.",
    watch: "They do not die until you finish them.",
  },
  "osrs-spectre": {
    masters: "Chaeldar, Konar, Nieve/Steve, Duradel.",
    style: "Protect Magic. Nose peg or slayer helm. Burst in Catacombs if the assignment allows it.",
    watch: "Bare-faced they drain you.",
  },
  "osrs-hellhound": {
    masters: "Chaeldar, Konar, Nieve/Steve, Duradel.",
    style: "Protect Melee. Taverley can take a cannon. Wilderness is a risk trip. Protect item.",
    watch: "Cerberus is on Bosses.",
  },
  "osrs-dustdevil": {
    masters: "Chaeldar, Konar, Nieve/Steve, Duradel.",
    style: "Face mask or helm. Burst in Catacombs. Smoke Dungeon is hot.",
    watch: "No mask, they drain.",
  },
  "rs3-ripper": {
    masters: "High RuneScape slayer masters. Live page lists who.",
    style: "Fast melee. Ability lines on the wiki. Task-only door on some versions.",
    watch: "Task-only door on some versions.",
  },
  "osrs-banshee": {
    masters: "Turael through Chaeldar. Live page lists who.",
    style: "Earmuffs or slayer helm. Protect Magic.",
    watch: "They scream without cover.",
  },
  "osrs-kurask": {
    masters: "Chaeldar, Konar, Nieve/Steve, Duradel.",
    style: "Leaf-bladed or broad. Ordinary steel bounces. Protect Melee.",
    watch: "Ordinary steel bounces.",
  },
  "osrs-skeletalwyvern": {
    masters: "Chaeldar, Konar, Nieve/Steve, Duradel.",
    style: "Elemental or mind shield. Protect Missiles. Icy breath is the wipe.",
    watch: "Icy breath without a shield.",
  },
};

export function monsterTaskLine(row: Monster) {
  if (!row.slayer) return "Not a slayer assignment. Learn the room, then leave.";
  const note = NOTES[row.id];
  if (note?.masters) return note.masters;
  return row.edition === "OSRS"
    ? "Assigned by Old School slayer masters (Chaeldar through Duradel, and Konar). The live page lists who."
    : "Assigned by RuneScape slayer masters. The live page lists who.";
}

export function monsterHuntLine(row: Monster) {
  const note = NOTES[row.id];
  if (note?.style) return `${note.style} ${row.hunt}`.trim();
  return row.hunt;
}

export function monsterKillLine(row: Monster) {
  const gameWiki = row.edition === "OSRS" ? "Old School wiki" : "RuneScape wiki";
  return [
    `A kill ends when ${row.name.toLowerCase()} drops. Walk the room if you pulled extras. Reset at the door when the task is done.`,
    "Wrong prayer or the wrong tile is the wipe. That is the whole file.",
    row.edition === "OSRS"
      ? "Do not treat a slayer floor as a raid invocation."
      : "Do not treat this as an enrage boss. Those sheets live under Bosses.",
    `Counts, drops, and the living method: the ${gameWiki} for this hour.`,
  ].join(" ");
}

export function monsterWatchLine(row: Monster) {
  return NOTES[row.id]?.watch ?? row.watch ?? "Task-only doors, face covers, and cannon-blocks are on the live page. Confirm on the wiki.";
}

export function monsterSlayerLink(row: Monster) {
  return NOTES[row.id]?.slayerWiki;
}

export function monsterById(id: string) {
  return MONSTERS.find((row) => row.id === id);
}
