import type { Edition } from "./locations";
import type { Monster } from "./monsters";

/** Family copy on /monsters. OSRS pool ≠ RS3 pool. */
export function familyLore(family: string, edition: Edition): string | null {
  if (family === "Dragons") {
    return edition === "OSRS"
      ? "Chromatic first: green in the Wilderness, blue under Taverley, red in Brimhaven, black as the late colour. Antifire is the grammar. Metal is Brimhaven, then Ancient Cavern, then Lithkren after Dragon Slayer II. Brutal sit in Catacombs or the Cavern. Lava is an island, not a black-dragon task. Elvarg taught Crandor. KBD, Vorkath, and Queen Black Dragon stay on Bosses."
      : "Same colours, later metal. Frost bones live in the Asgarnian ice resource dungeon — not an Old School Sailing cave. Celestial sit on Dragontooth. Gemstone cavern is dragonstone, onyx, hydrix; the special eats a potion timer. QBD and Black stone dragon stay on Bosses. Dragonkin made the fire. You are camping the product.";
  }
  if (family === "Demons") {
    return edition === "OSRS"
      ? "Lesser, greater, black — Taverley, the Chasm of Fire, Catacombs. Hellhounds are the fast melee; Cerberus is the named door on Bosses. Abyssal teleport a few tiles; Catacombs is the burst room, Tower is single. Nechryael leave death spawn. Infernus is the old country. K’ril stays on Bosses."
      : "Play the bar. Lesser and greater still live in Taverley. Black sit Chaos Tunnels too. Ripper is RuneScape-only and sometimes a task door. Tormented swap prayer — match the style. Abyssal savage and lord are the later abyss; do not paste an Old School barrage paragraph. K’ril stays on Bosses.";
  }
  return null;
}

const LORE: Record<string, string> = {
  "osrs-greendragon":
    "The first chromatic most people actually fight. Forinthry after the ditch. Dragonkin stock, not a pet. Bones and hides pay the trip. Protect item. Antifire. The player who walks in with a bank tab is the loot, not the dragon.",
  "osrs-bluedragon":
    "Taverley is the old lane — dusty, dusty, dusty, and still the room. Myths’ Guild after Dragon Slayer II is the later door. Antifire. Protect Magic if you idle. Baby blues are a different assignment. Elvarg is the island story; this is the mainland colour.",
  "osrs-reddragon":
    "Brimhaven and Red Dragon Isle. Heat and hide. Antifire. The isle is a trip, not a bank. KBD is a named black, not this colour. Dragon Slayer taught people to respect fire; this is the lesson with better bones.",
  "osrs-blackdragon":
    "The late chromatic. Taverley and Myths’ Guild. Antifire. King Black Dragon is the wilderness vault on Bosses — do not treat this task as that room. Dragonkin made them meaner than the greens. You still eat the fire if the potion is down.",
  "osrs-babygreendragon":
    "Cub stock. Corsair Cove and the Guild. Baby bones, not hide. Antifire is still the lesson because fire does not wait for adulthood. The adult assignment is a different click.",
  "osrs-babybluedragon":
    "Taverley cubs under the adults. Same fire, smaller frame. Antifire. They are not a shortcut to blue hide.",
  "osrs-babyreddragon":
    "Brimhaven cubs. The adults are next. Antifire. KBD stays on Bosses.",
  "osrs-babyblackdragon":
    "The small black. Taverley and the Guild. Antifire. The King is a different door.",
  "osrs-bronzedragon":
    "First metal. Dragonkin work, not a chromatic with a tin coat. Long-range fire. Brimhaven or Catacombs. They are never alone. Antifire. Visage is a rumour you do not budget.",
  "osrs-irondragon":
    "Heavier metal. Same floors as bronze and steel. Antifire. The fire is the wipe, not the melee. Brimhaven taught this in 2005. It still does.",
  "osrs-steeldragon":
    "Defence is the difference. Same dungeon family as iron. Antifire. If you came for a visage, you came for a rumour.",
  "osrs-mithrildragon":
    "Ancient Cavern after barbarian training. Magic, range, and fire on one body. Dragon full helm is the camp story. Antifire. Waterfiends share the cave — do not pull the wrong colour and call it a method.",
  "osrs-adamantdragon":
    "Lithkren Vault after Dragon Slayer II. Dragonkin laboratory, not Brimhaven. Slash, range, mage, fire. Antifire. QBD is a named black on Bosses.",
  "osrs-runedragon":
    "The late metal. Lithkren. Antifire and prayer. Confirm the floor. This is the Dragon Slayer II sentence, not a Taverley lap.",
  "osrs-lavadragon":
    "Wilderness 36–42, Lava Dragon Isle. Bones buried on the isle are the hour. Protect item. Antifire. Not a black-dragon task. The ditch is the grammar. Someone will try you for the bones.",
  "osrs-brutalgreendragon":
    "Ancient Cavern. Not a green-dragon task — they sit outside the wild. Heavier chromatic. Antifire. Barbarian training is the door. Elvarg is not this room.",
  "osrs-brutalbluedragon":
    "Catacombs of Kourend. Heavier blue. Antifire. Taverley adults are a different file. Burst if the room is multi.",
  "osrs-brutalreddragon":
    "Catacombs. Heavier red. Antifire. Brimhaven adults are a different file.",
  "osrs-brutalblackdragon":
    "Catacombs top. The late brutal. Antifire. KBD stays on Bosses. This is the Kourend colour, not the wilderness vault.",
  "osrs-frostdragon":
    "Old School frost. Sailing / Grimstone door, not the RS3 ice resource dungeon. Icy fire. Bones are the camp. Confirm the live cavern. Do not paste a Daemonheim paragraph here.",
  "osrs-lesserdemon":
    "Infernus stock, the small door. Taverley is a lane, not a raid. Magic and melee. Protect Magic if you idle. Wizard’s Tower basement is the other old room. K’ril is not this file.",
  "osrs-greaterdemon":
    "Heavier infernal. Taverley and the Chasm of Fire. The Chasm is the burst room when the task allows it. Protect as the live page says. They are Zamorak’s rank-and-file, not a commander.",
  "osrs-blackdemon":
    "Harder demon. Catacombs is multi — burst is common. Taverley is the long room. Leave a raid invocation home. K’ril Tsutsaroth stays on Bosses.",
  "osrs-hellhound":
    "Fast melee. Protect Melee. Taverley takes a cannon. Wilderness is a risk trip — protect item. Cerberus is the named hellhound on Bosses. Do not mix the two rooms.",
  "osrs-abyssal":
    "They are not from Infernus. The Abyss is the country. They melee and teleport a few tiles — do not plant on the tile they just left. Tower is single. Catacombs is the burst room. Cannon stays out of the Tower. Whip is the camp story. The wiki owns the drop.",
  "osrs-nechryael":
    "Death spawn. Protect Melee. Tower is single. Catacombs is the burst room. Leave the spawn on the floor and the next pull is messy. They are demon-kin. The spawn is the wipe, not the parent.",

  "rs3-greendragon":
    "Wilderness bones on the RuneScape client. Protect item. Antifire. Forinthry is still the grammar. The later game did not make the ditch polite.",
  "rs3-bluedragon":
    "Taverley lane. Antifire. Baby blues are a different assignment. Dragonkin stock. Play the bar. QBD is not this colour.",
  "rs3-reddragon":
    "Brimhaven and Red Dragon Isle. Antifire. Protect as the page says. KBD stays on Bosses. Hide is still hide.",
  "rs3-blackdragontask":
    "The task black. Taverley. Antifire. King Black Dragon is the wilderness vault on Bosses. Queen Black Dragon is another named door. This sheet is the floor colour.",
  "rs3-babygreendragon":
    "The small green. Baby bones, not hide. Antifire is still the lesson.",
  "rs3-babybluedragon":
    "Taverley cubs. Antifire. Adults are the next room.",
  "rs3-babyreddragon":
    "Brimhaven cubs. The adults are next. KBD stays on Bosses.",
  "rs3-babyblackdragon":
    "The small black. Antifire. The King is a different door.",
  "rs3-bronzedragon":
    "First metal. Antifire. Play the bar. They are never alone. Brimhaven floor.",
  "rs3-irondragon":
    "Metal. Antifire. Brimhaven floor. Visage is still a rumour you do not budget.",
  "rs3-steeldragon":
    "Heavier metal. Antifire. Same floors as iron. Defence is the difference.",
  "rs3-mithrildragon":
    "Ancient Cavern. Magic, range, and fire. Antifire. Play the bar. Waterfiends share the cave.",
  "rs3-adamantdragon":
    "Brimhaven resource dungeon on this client — not Lithkren. Metal. Antifire. Heavier than iron. QBD stays on Bosses.",
  "rs3-runedragon":
    "The late metal dragon. Resource dungeon. Antifire and prayer. Confirm the floor. QBD stays on Bosses.",
  "rs3-frostdragon":
    "Asgarnian Ice Dungeon resource dungeon. Daemonheim-kin frost. Bones are why people camp. Antifire and prayer. This is not an Old School Sailing cave.",
  "rs3-celestialdragon":
    "Dragontooth Island resource dungeon. RuneScape-only. Magic and prayer as the page says. Not QBD. Dragonkin experiment, not a chromatic.",
  "rs3-gemstonedragon":
    "The cavern under the Wilderness. Several colours. Antifire. Dragonstone, onyx, hydrix are the named floors. QBD stays on Bosses.",
  "rs3-dragonstonedragon":
    "Slayer 95. Gemstone cavern. The special eats your antifire timer — sip again or eat the fire. Not QBD.",
  "rs3-onyxdragon":
    "Heavier gem. Antifire. Wilderness cousins sit south-east of Red Dragon Isle. Confirm the live page. Black stone is a boss.",
  "rs3-hydrixdragon":
    "Slayer 101. The late gem. Stay in melee or the spikes dump adrenaline. Black stone dragon is on Bosses.",
  "rs3-lesserdemon":
    "Infernus stock. Taverley is a lane. Magic and melee. Play the bar. K’ril is not this file.",
  "rs3-greaterdemon":
    "Heavier infernal. Protect as the RuneScape page says. Ability lines live on the wiki. They are rank-and-file.",
  "rs3-blackdemon":
    "Heavy demon. Taverley and Chaos Tunnels. Protect as the page says. K’ril Tsutsaroth stays on Bosses.",
  "rs3-hellhound":
    "Fast melee. Protect Melee. Not a GWD commander. Cerberus-class rooms stay on Bosses.",
  "rs3-abyssal":
    "They melee and teleport. Protect Melee. Play the bar. Weakness is slashing as a type. The Abyss is the country. Do not paste an Old School barrage paragraph here.",
  "rs3-abyssalsavage":
    "Heavier abyssal. They teleport. Play the bar. Lords are the next sentence. Still not a raid.",
  "rs3-abyssallord":
    "The late abyssal. Confirm the floor. Ability lines on the wiki. Still the Abyss, not Infernus.",
  "rs3-ripper":
    "RuneScape-only. Fast melee out of the abyss-adjacent cave. Ability lines on the wiki. Task-only door on some versions. Confirm before you camp. Not a world boss.",
  "rs3-tormenteddemon":
    "While Guthix Sleeps opened this door. They swap prayer — match the style or you tickle them. Not a world boss. Confirm the live cave. OSRS has its own later file; this sheet is RuneScape.",
  "rs3-nechryael":
    "Death spawn. Protect Melee. Play the bar. Leave the spawn on the floor and the next pull is messy.",
};

export function monsterLore(row: Monster): string | null {
  return LORE[row.id] ?? null;
}

export function monsterLead(row: Monster): string {
  const lore = monsterLore(row);
  if (!lore) return "You already know the room. The creature is the constant. You are the variable.";
  const end = lore.indexOf(". ");
  return end === -1 ? lore : lore.slice(0, end + 1);
}
