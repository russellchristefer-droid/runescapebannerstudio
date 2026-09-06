export type TownNote = {
  title: string;
  region: string;
  lore: string[];
  history?: string[];
};

const SHARED: Record<string, TownNote> = {
  lumbridge: {
    title: "Lumbridge",
    region: "Misthalin · RuneScape",
    lore: [
      "You already know the courtyard. Duke Horacio holds the duchy on the Lum. Chapel west, castle on the hill, mill on the water.",
      "The Battle of Lumbridge tore the meadow when Zamorak and Saradomin made landfall. The crater is current geography on this client, not a rumour.",
      "Adventurers still wake in the yard. The river is the other wall. Guards on the bridge treat the crossing as work.",
      "The church bell and the crater rim share a town. Shops try to forget a war the grass did not.",
    ],
    history: [
      "This Lumbridge is a rebuild sitting on a wound. World Wakes and the landfall are how this client writes the later age.",
      "Do not export that crater onto an Old School still. The two Lumbridges are two grammars.",
      "Official news and the RuneScape wiki keep the hour if this desk lags.",
    ],
  },
  falador: {
    title: "Falador",
    region: "Asgarnia",
    lore: [
      "White marble. White Knights. Sir Amik’s order holds Asgarnia’s crown for the king.",
      "Saradomin’s hand is on the square. Rising Sun, park, party room — piety and slapstick share a postcode. That tension is the town.",
      "Gates look north to the dwarves and south to Port Sarim. Kinshra and goblin warbands have tested the walls. The walls are the argument.",
    ],
    history: [
      "RuneScape’s Falador carries later-age Temple Knight work and rebuilds after war where that client published them.",
      "Do not file the Old School party-room rupture as this page’s only memory.",
      "The live RuneScape wiki is the hour for what the city currently is.",
    ],
  },
  varrock: {
    title: "Varrock",
    region: "Misthalin",
    lore: [
      "King Roald’s capital. Palace, museum, south-east slums. One grid.",
      "The square is agora and rumour. Gertrude’s sill is more honest than the throne room. The Grand Exchange later grew against the west wall.",
      "Price became public speech at the Exchange. The stalls inside the gates did not vanish; they were outvoted. Square versus palace is the work of the place.",
    ],
    history: [
      "On the main client Varrock has taken later-age scars this desk will not dump onto Old School cards.",
      "Embassy plots, slum unrest, and Exchange law are published history for this grammar.",
      "Read the RuneScape wiki if this paragraph and a live post disagree.",
    ],
  },
  prifddinas: {
    title: "Prifddinas",
    region: "Tirannwn",
    lore: [
      "Crystal city. Seren’s song in the walls. Eight clans, eight towers, Tower of Voices in the middle.",
      "Grown, shattered, grown again. Not a human market copied in green glass. Voice of Seren turns on the UTC hour — confirm the pair on Today. This desk will not invent it for a banner.",
      "A still of Prifddinas is a clock-face. Leave the wrong clan name home.",
    ],
    history: [
      "RuneScape Prifddinas is the restored clan city of the later age. Voice of Seren is civic pulse.",
      "It is not the Song of the Elves street plan copied from Old School.",
      "The RuneScape wiki keeps which hour the city is in.",
    ],
  },
  canifis: {
    title: "Canifis",
    region: "Morytania",
    lore: [
      "Werewolf town east of the Salve. Lord Drakan’s shadow is the law. Humans who walk in unannounced are meat.",
      "Inn, tannery, Zamorak temple in fog. First Morytanian stop after the temple on the Salve. Protect the crossing before you browse the stall.",
    ],
  },
  catherby: {
    title: "Catherby",
    region: "Kandarin",
    lore: [
      "Fishing town on Kandarin’s coast. Beehives, a range, boats working the sea toward White Wolf Mountain.",
      "Not a capital. The catch and the pass feed Seers’ and the mountain road. That is the whole brief.",
    ],
  },
  portsarim: {
    title: "Port Sarim",
    region: "Asgarnia",
    lore: [
      "Asgarnia’s harbour. Karamja, Entrana, penal hulks. Jail and rusted pier are the same town.",
      "Pirates, monks, and the navy share the slip. Entrana strips weapons here. That is a dock rule.",
    ],
  },
  taverley: {
    title: "Taverley",
    region: "Asgarnia",
    lore: [
      "Druids of Guthix. Herblore, stone circle, lake under White Wolf Mountain.",
      "Balance is the creed. Dwarves of the mountain and Falador’s knights are neighbours, not rulers. The dungeon under the town is a separate sheet.",
    ],
  },
  burthorpe: {
    title: "Burthorpe",
    region: "Asgarnia",
    lore: [
      "Imperial Guard under Trollheim. A camp that became a town while trolls pressed the pass.",
      "Barracks, games, Death Plateau road. Hold the mountain. That is the brief.",
    ],
  },
  edgeville: {
    title: "Edgeville",
    region: "Misthalin",
    lore: [
      "Frontier village on the Wilderness ditch. Monastery and ruins watch the line.",
      "Last hearth before the wild. Pad, ruin, watch post. Cross the ditch knowing the grammar. Protect item as you would on any ditch trip.",
    ],
  },
  alkharid: {
    title: "Al Kharid",
    region: "Kharidian",
    lore: [
      "Desert city under the Emir. Menaphite gold and Misthalin trade meet at the gate.",
      "Tumeken’s sun is the old law of the sand. Palace garden and duel arena belong to the same emirate. Shantay is the south door.",
    ],
  },
  daemonheim: {
    title: "Daemonheim",
    region: "Wilderness",
    lore: [
      "Fremennik-named castle on the eastern wild. The surface keep is a lid.",
      "Floors under the stone are the story: dragonkin, maelstrom, the rings. Do not banner the lid and call it the dungeon.",
    ],
  },
  menaphos: {
    title: "Menaphos",
    region: "Kharidian",
    lore: [
      "Golden city of the Menaphites. Four districts, a Pharaoh, sun and river.",
      "The gates were shut for years. When they opened, the city was still the heart of the southern desert. Confirm district hours on the wiki. Leave an invented God Wars seat home.",
    ],
  },
  lostgrove: {
    title: "Lost Grove",
    region: "Anachronia",
    lore: [
      "Living woodland torn from time. Solak was bound here. The Grove remembers a war older than the God Wars the surface tells.",
      "Roots, anima, silence after a warden falls. Not a market town. A wound that grew leaves. Solak is on Bosses.",
    ],
  },
  tears: {
    title: "Tears of Guthix",
    region: "Lumbridge Swamp",
    lore: [
      "Juna keeps the light under the swamp. The tears are Guthix’s grief given water.",
      "A true story of the week is the key. The cave is a shrine, not a mine. Do not title it as if he still walks.",
    ],
  },
  zanaris: {
    title: "Zanaris",
    region: "Lost City",
    lore: [
      "Fairy otherworld. Market, cosmic altar, a court that has changed hands.",
      "Reached through a lost city and a ring. Time and law do not sit the same way here as they do in Misthalin.",
    ],
  },
  ardougne: {
    title: "East Ardougne",
    region: "Kandarin",
    lore: [
      "Kandarin’s great city. King Lathas, market square, zoo, and the wall that hid West Ardougne.",
      "The plague was a lie and a prison. East lived well while the west coughed. That stain is the civic record. Leave it on the card.",
    ],
  },
  gnome: {
    title: "Tree Gnome Stronghold",
    region: "Kandarin",
    lore: [
      "King Narnode in the Grand Tree. A small people holding a tall tree.",
      "Glough’s plot is the old wound. Shipyards and the watch on Kandarin are the same history.",
    ],
  },
  seers: {
    title: "Seers' Village",
    region: "Kandarin",
    lore: [
      "Foresters and seers on the road to Camelot. Arthur’s hall sits beyond the gate.",
      "Sight, flax, the hall of the seers. The village is the yard of that legend, not the castle.",
    ],
  },
  anachronia: {
    title: "Anachronia",
    region: "Fossil Island",
    lore: [
      "Island out of time. Dinosaurs, base camp, dragonkin working in the ruin.",
      "A shard of an older Gielinor. The present washed up on it. The past did not leave.",
    ],
  },
  yanille: {
    title: "Yanille",
    region: "Kandarin",
    lore: [
      "Walls and the Wizards’ Guild. The watch looks south at ogre land.",
      "A garrison with a tower of magic. The watch is the point of the place.",
    ],
  },
  empyrean: {
    title: "Empyrean Citadel",
    region: "Abyss",
    lore: [
      "Armadyl’s seat in the sky. The Aviansie rebuilt after the God Wars tore their kind from the world.",
      "Court and war-camp. Sliske’s contest later walked the halls. Confirm the citadel state on the wiki.",
    ],
  },
  senntisten: {
    title: "Senntisten",
    region: "Forinthry",
    lore: [
      "Zaros’s capital. Cathedrals, colosseum, the long dark after the empire fell.",
      "Dug out again when the Elder Gods turned on the world. The name keeps returning. Telos and the vault fights sit on Bosses.",
    ],
  },
  sophanem: {
    title: "Sophanem",
    region: "Kharidian",
    lore: [
      "City of the dead across from Menaphos. Plague, priests of Elidinis, pyramids of the south.",
      "Kept the funerary rites when Menaphos shut its gates. The river is the border and the bond.",
    ],
  },
  apeatoll: {
    title: "Ape Atoll",
    region: "Southern Sea",
    lore: [
      "Marimbo’s island. Temples, jungle, a city of monkeys that learned to wear armour.",
      "Humans who come uninvited are sport. The atoll is a kingdom, not a curiosity. Greegree first.",
    ],
  },
  goblin: {
    title: "Goblin Village",
    region: "Asgarnia",
    lore: [
      "Generals Bentnoze and Wartface argue the colour of goblin mail under Bandos’s old banner.",
      "A war-camp that forgot which war. The gods they name are bigger than the huts. Diplomacy is the whole politics.",
    ],
  },
  heart: {
    title: "Heart of Gielinor",
    region: "The Heart",
    lore: [
      "A God Wars prison Sliske opened. Twin Furies, Vindicta, Helwyr, Gregorovic set to fight for a stone.",
      "Theatre of the dead gods’ champions. The audience is the world. Those four sit on Bosses.",
    ],
  },
  entrana: {
    title: "Entrana",
    region: "Asgarnia",
    lore: [
      "Saradomin’s holy island. No weapons. No armour. Monks keep the law at the Port Sarim dock.",
      "The law is the lore. A vow you walk onto, not a fort you hold. The wipe is the item you forgot to bank.",
    ],
  },
  warsretreat: {
    title: "War's Retreat",
    region: "PvM hub",
    lore: [
      "War keeps a hall for those who fight the great beasts. Bank, instance, the road back to the next kill.",
      "Not a town. The camp between deaths. Reapers and generals use the same door. Leave the GP/hour title home.",
    ],
  },
  cityofum: {
    title: "City of Um",
    region: "Underworld",
    lore: [
      "City of the dead under the world. Necromancy found its first streets here. Rasial’s shadow is still on the stone.",
      "The living walk it as guests. The dead keep the market. Rasial is on Bosses.",
    ],
  },
};

const OSRS: Record<string, TownNote> = {
  darkmeyer: {
    title: "Darkmeyer",
    region: "Morytania · OSRS",
    lore: [
      "Vampyre capital above Meiyerditch. Sins of the Father opened the dark streets to those who wear the right colours.",
      "Vyrewatch law. Icyene ruin under the towers. This is that city, not a later rebuild. Leave the wrong cloak home.",
    ],
  },
  hosidius: {
    title: "Hosidius",
    region: "Great Kourend · OSRS",
    lore: [
      "Farming house of Great Kourend. Tithe, fields, the house that feeds the kingdom.",
      "Five houses still stand in Old School. Armies eat. The other houses watch Hosidius for that reason.",
    ],
  },
  osrslumbridge: {
    title: "Lumbridge",
    region: "Misthalin · OSRS",
    lore: [
      "You already know the courtyard. Duke Horacio on the Lum. Castle, Saradomin chapel, mill. That is the whole duchy.",
      "Old School never saw the Battle of Lumbridge. The meadow east of the castle is grass, goblins, and the road to Al Kharid. Leave the crater home.",
      "New adventurers still appear in the yard. River first, castle second. Tutorial Island is a pedagogic ghost. Players remember it more than they inhabit it.",
    ],
    history: [
      "This slug is 2007-era continuity. No crater is current geography.",
      "The 2013 poll put the dialect back on a live client. Quest-state changes the courtyard; it does not import the other game’s landfall.",
      "The Old School wiki keeps the hour for this town.",
    ],
  },
  osrsfalador: {
    title: "Falador",
    region: "Asgarnia · OSRS",
    lore: [
      "White Knights and white stone. Sir Amik Varze holds Asgarnia’s capital for the king.",
      "Park, Party Room, Rising Sun inside walls that have faced the Kinshra. Piety and slapstick share a postcode.",
      "A banner from the square reads order. A banner from the party room reads farce. Old School Falador is that garrison, not a rebuilt war-camp.",
    ],
    history: [
      "In 2006 the party room entered common record as a glitch-massacre the culture still cites.",
      "No later-age rebuild is current on this card. White walls here are the 2007-era plan.",
      "The Old School wiki keeps the hour.",
    ],
  },
  osrsvarrock: {
    title: "Varrock",
    region: "Misthalin · OSRS",
    lore: [
      "King Roald’s capital. Palace, museum, south-east slums.",
      "The Grand Exchange sits against the west wall. Reldo’s library is the old city under that market. Gertrude’s sill has a cat.",
      "Square versus palace. Who speaks for the city is the work of the place. Zamorakian unrest is weather in the slums, not this desk’s gossip column.",
    ],
    history: [
      "Old School Varrock is the maintained 2007-era capital plus the Exchange as later civic engine in this client.",
      "No Sixth Age crater belongs on this slug.",
      "The Old School wiki keeps the hour.",
    ],
  },
  osrsprif: {
    title: "Prifddinas",
    region: "Tirannwn · OSRS",
    lore: [
      "After Song of the Elves the crystal city stands again. Eight clans, Tower of Voices, streets grown from a seed.",
      "Not a human market painted green. Song of the Elves is the constitution. This desk will not paste Voice of Seren hour-clans onto this card.",
    ],
    history: [
      "Song of the Elves is the constitution of this city in Old School.",
      "It is not the RuneScape clan-district clock. No Sixth Age weather is current here.",
      "The Old School wiki keeps the hour.",
    ],
  },
  osrscani: {
    title: "Canifis",
    region: "Morytania · OSRS",
    lore: [
      "Werewolves east of the Salve. Priest in Peril is the crossing. Humans without the temple’s leave are prey.",
      "Hair of the Dog, tannery, wooden houses in Drakan’s fog. Old School Canifis has not seen the later Morytania campaigns of the other game.",
    ],
  },
  osrscath: {
    title: "Catherby",
    region: "Kandarin · OSRS",
    lore: [
      "Fishing town under White Wolf Mountain. Beehives, a range, boats on the sea.",
      "Feeds Seers’ and the mountain pass. Kandarin’s shore, not a capital.",
    ],
  },
  osrsport: {
    title: "Port Sarim",
    region: "Asgarnia · OSRS",
    lore: [
      "Asgarnia’s harbour. Karamja, Entrana, rusted jail hulks.",
      "Customs, pirates, and the monks share the slip. Entrana strips you here. That is the dock rule.",
    ],
  },
  osrstav: {
    title: "Taverley",
    region: "Asgarnia · OSRS",
    lore: [
      "Druids of Guthix. Stone circle, herblore, lake under White Wolf Mountain.",
      "Sanfew keeps the balance. Dwarves of the mountain are neighbours. Falador’s knights are not the law here. The dungeon is a separate sheet.",
    ],
  },
  osrsburth: {
    title: "Burthorpe",
    region: "Asgarnia · OSRS",
    lore: [
      "Imperial Guard under Trollheim. Death Plateau is the road. The prince has used this camp while trolls pressed the pass.",
      "Games Room and barracks. A mountain watch, not a later tutorial city. Leave that rebuild home.",
    ],
  },
  osrsedge: {
    title: "Edgeville",
    region: "Misthalin · OSRS",
    lore: [
      "Village on the Wilderness ditch. Monastery, pad, last hearth before the wild.",
      "The line is the point. Cross it knowing the grammar. Protect item. This is still that frontier, not a rebuilt fortress of another age.",
    ],
  },
  osrsalk: {
    title: "Al Kharid",
    region: "Kharidian · OSRS",
    lore: [
      "The Emir’s city on the desert gate. Prince Ali, the palace, the duel arena. One emirate.",
      "Tumeken’s sun is the old law. Shantay’s pass is the south door. Menaphos stays shut in Old School. Leave those gates closed.",
    ],
  },
  osrstears: {
    title: "Tears of Guthix",
    region: "Lumbridge Swamp · OSRS",
    lore: [
      "Juna keeps the light under the swamp. The tears are Guthix’s grief given water.",
      "A true story of the week. The cave is a shrine. Old School never moved it to another world. He does not walk this client.",
    ],
  },
  osrszanaris: {
    title: "Zanaris",
    region: "Lost City · OSRS",
    lore: [
      "Lost City of the fairies. Market, cosmic altar, the court Fairytale later named.",
      "Leprechaun and a ring. Time does not sit here as it does in Misthalin.",
    ],
  },
  osrsard: {
    title: "East Ardougne",
    region: "Kandarin · OSRS",
    lore: [
      "King Lathas’s city. Market, zoo, the wall that hid West Ardougne.",
      "Plague City through Mourning’s End told the truth: the plague was a prison. That stain stays on the civic record.",
    ],
  },
  osrsgnome: {
    title: "Tree Gnome Stronghold",
    region: "Kandarin · OSRS",
    lore: [
      "King Narnode Shareen in the Grand Tree. Glough’s plot is the old wound.",
      "A city in living wood. The stronghold watches Kandarin from the leaves.",
    ],
  },
  osrsseers: {
    title: "Seers' Village",
    region: "Kandarin · OSRS",
    lore: [
      "Foresters and seers on the road to Camelot. Arthur’s hall beyond the gate.",
      "Flax, the court of seers, the castle. The village is the yard of that legend.",
    ],
  },
  osrsyan: {
    title: "Yanille",
    region: "Kandarin · OSRS",
    lore: [
      "Walls, Wizards’ Guild, Watchtower looking south at ogre land.",
      "A garrison with a tower of magic. The watch is the point of the place.",
    ],
  },
  osrssoph: {
    title: "Sophanem",
    region: "Kharidian · OSRS",
    lore: [
      "City of the dead across from Menaphos. Icthlarin’s Little Helper and Contact! are the doors.",
      "Plague, priests, pyramids. Menaphos’s gates stay shut in Old School. Sophanem keeps the funerary rites alone.",
    ],
  },
  osrsape: {
    title: "Ape Atoll",
    region: "Southern Sea · OSRS",
    lore: [
      "Marimbo’s island. Monkey Madness is the crossing. Temples, jungle, monkeys in armour.",
      "Humans who come uninvited are sport. Greegree first. The atoll is a kingdom.",
    ],
  },
  osrsgob: {
    title: "Goblin Village",
    region: "Asgarnia · OSRS",
    lore: [
      "Bentnoze and Wartface argue the colour of goblin mail. Goblin Diplomacy is the whole politics.",
      "Bandos is a name they shout. A war-camp that forgot which war.",
    ],
  },
  osrsent: {
    title: "Entrana",
    region: "Asgarnia · OSRS",
    lore: [
      "Saradomin’s holy island. No weapons, no armour. Monks search you at the Port Sarim dock.",
      "The law is the lore. Lost City begins in that vow. The wipe is the item you forgot to bank.",
    ],
  },
  draynor: {
    title: "Draynor Village",
    region: "Misthalin · OSRS",
    lore: [
      "Willows, Ned, a market in the shade of Draynor Manor. Count Draynor’s crypt is under the house on the hill.",
      "Vampyre Slayer and the jail. The quiet is not quiet. Bank clerks do not discuss the manor after dark.",
    ],
  },
  grandexchange: {
    title: "Grand Exchange",
    region: "Varrock · OSRS",
    lore: [
      "Raised west of Varrock as the clerks’ market. Four corners of trade against the city wall.",
      "Not a temple. The civic machine that replaced the old stalls inside the gates. This desk does not print a price.",
    ],
  },
};

function fillEssay(id: string, note: TownNote): TownNote {
  const osrs =
    id.startsWith("osrs") ||
    ["hosidius", "shayzien", "lovakengj", "arceuus", "piscarilius", "fortis", "draynor", "grandexchange", "darkmeyer"].includes(id);
  const history =
    note.history?.length
      ? note.history
      : osrs
        ? [
            `${note.title} in Old School RuneScape is 2007-era continuity, not a later rebuild.`,
            "No Sixth Age landfall, edict, or Voice of Seren hour is current on this slug.",
            "The Old School wiki keeps the hour if this desk and a live page disagree.",
          ]
        : [
            `${note.title} on the main RuneScape client carries later-age change only where that client published it.`,
            "Do not copy this paragraph onto an Old School card of the same name.",
            "The RuneScape wiki keeps the hour.",
          ];
  return { ...note, history };
}

export function townNote(id: string): TownNote | undefined {
  const raw = OSRS[id] ?? SHARED[id];
  return raw ? fillEssay(id, raw) : undefined;
}
