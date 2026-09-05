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
      "Duke Horacio holds Lumbridge on the River Lum. Saradomin’s church and the castle mark the duchy.",
      "The Battle of Lumbridge tore the meadow when Zamorak and Saradomin made landfall. The crater and the rebuilt walls are part of that wound.",
      "Adventurers still wake in the castle courtyard. The town is the first road into Misthalin.",
      "The river is the town’s other wall. Mills, the swamp path, and the road toward Draynor share the same water.",
      "The church bell and the castle gate argue about what the place is for: prayer, or a first lesson in walking.",
      "Guards on the bridge treat the crossing as work. The meadow remembers a war the shops try to forget.",
      "From the courtyard the world looks simple. From the crater rim it does not.",
    ],
    history: [
      "On the main RuneScape client Lumbridge is a palimpsest over the Sixth Age landfall.",
      "The crater is current geography here: a rebuild sitting on a wound, not a rumour.",
      "World Wakes and the Battle of Lumbridge are how this client writes the town’s later age.",
      "Do not export that crater onto an Old School still. The two Lumbridges are two grammars.",
      "Official news and the RuneScape wiki keep the hour if this desk lags.",
    ],
  },
  falador: {
    title: "Falador",
    region: "Asgarnia",
    lore: [
      "White marble and the White Knights. Falador is Asgarnia’s crown, held by Temple Knights and the White Knight order.",
      "Saradomin’s hand is on the square. The Rising Sun, the park, and the party room sit inside walls that have faced Kinshra and goblin warbands.",
      "The city performs virtue in stone. Knights drill. The park is a pause. The party room is the joke that lives in the same postcode.",
      "Gates look north to the dwarves and south to Port Sarim. The walls are the argument.",
      "Piety and slapstick share a street. That tension is the town.",
      "From the white square a banner reads as order. From the party room it reads as farce.",
    ],
    history: [
      "RuneScape’s Falador carries later-age plot where that client published it: Temple Knight work, Kinshra pressure, rebuilds after war.",
      "White walls here are not only 2007 continuity. They have taken hits this client recorded.",
      "Do not file the Old School party-room rupture as this page’s only memory.",
      "The live RuneScape wiki is the hour for what the city currently is.",
    ],
  },
  varrock: {
    title: "Varrock",
    region: "Misthalin",
    lore: [
      "Varrock is Misthalin’s capital. King Roald rules from the palace. The museum, the palace guard, and the slums of the south-east are one city.",
      "Zamorakian unrest has walked these streets — from the Embassy to the chaos of the slums. The Grand Exchange later grew against the west wall.",
      "The square is agora and rumour mill. Palace and drain share a grid.",
      "Gertrude’s household sits in the domestic grain. A cat on a sill is more honest than the throne room.",
      "Price became public speech at the Exchange. The stalls inside the gates did not vanish; they were outvoted.",
      "Tension here is square versus palace: who speaks for the city, the crowd or the crown.",
    ],
    history: [
      "On the main client Varrock has taken later-age scars this desk will not dump onto Old School cards.",
      "Embassy plots, slum unrest, and Exchange law are published history for this grammar.",
      "The palace still stands. What changed is the weather around it.",
      "Read the RuneScape wiki if this paragraph and a live post disagree.",
    ],
  },
  prifddinas: {
    title: "Prifddinas",
    region: "Tirannwn",
    lore: [
      "The crystal city of the elves. Seren’s song is in the walls. Eight clans hold the eight towers around the Tower of Voices.",
      "Prifddinas was grown, shattered, and grown again. After the God Wars and the Plague of the east, the city returned as living crystal, not stone.",
      "The streets are districts of work and prayer, not a human market copied in green glass.",
      "Voice of Seren turns on the hour. This desk will not invent the pair to decorate a banner.",
      "Tension is hour versus name: the city pulses; the desk stays quiet about which clan is lit.",
      "A still of Prifddinas is a clock-face, not a souvenir.",
    ],
    history: [
      "RuneScape Prifddinas is the restored clan city of the later age, with Voice of Seren as civic pulse.",
      "It is not the Song of the Elves street plan copied from Old School.",
      "Elder-war and crystal-city plot belong on this slug only.",
      "The RuneScape wiki keeps which hour the city is in.",
    ],
  },
  canifis: {
    title: "Canifis",
    region: "Morytania",
    lore: [
      "A werewolf town east of the Salve. Lord Drakan’s shadow is the law. Humans who walk in unannounced are meat.",
      "The inn, the tannery, and the temple of Zamorak sit in fog. Canifis is the first Morytanian stop after the temple on the Salve.",
    ],
  },
  catherby: {
    title: "Catherby",
    region: "Kandarin",
    lore: [
      "A fishing town on Kandarin’s coast. Beehives, a range, and boats that work the sea toward White Wolf Mountain.",
      "Catherby lives off the catch and the pass. It is not a capital. It is the shore that feeds Seers’ and the mountain road.",
    ],
  },
  portsarim: {
    title: "Port Sarim",
    region: "Asgarnia",
    lore: [
      "Asgarnia’s harbour. Ships leave here for Karamja, Entrana, and the penal hulks. The jail and the rusted pier are the same town.",
      "Port Sarim has always been the door. Pirates, monks, and the navy share the same slip.",
    ],
  },
  taverley: {
    title: "Taverley",
    region: "Asgarnia",
    lore: [
      "Druids of Guthix keep Taverley. Herblore, the stone circle, and the lake sit under White Wolf Mountain.",
      "Guthixian balance is the town’s creed. The dwarves of the mountain and the knights of Falador are neighbours, not rulers here.",
    ],
  },
  burthorpe: {
    title: "Burthorpe",
    region: "Asgarnia",
    lore: [
      "An Imperial Guard town under the shadow of Trollheim. The prince of Asgarnia has wintered here while trolls press the pass.",
      "Burthorpe is a camp that became a town. Games, barracks, and the death plateau road are the same story: hold the mountain.",
    ],
  },
  edgeville: {
    title: "Edgeville",
    region: "Misthalin",
    lore: [
      "A frontier village on the edge of the Wilderness. The monastery and the ruins watch the ditch.",
      "Edgeville has been a pad, a ruin, and a watch post. It is the last hearth before the wild.",
    ],
  },
  alkharid: {
    title: "Al Kharid",
    region: "Kharidian",
    lore: [
      "A desert city under the Emir. Menaphite gold and Misthalin trade meet at the gate and the palace.",
      "Tumeken’s sun is the law of the sand. The duel arena and the palace garden belong to the same emirate.",
    ],
  },
  daemonheim: {
    title: "Daemonheim",
    region: "Wilderness",
    lore: [
      "A Fremennik-named castle on the eastern wild. Beneath it, the rumbling floors of the dragonkin and the maelstrom of Daemonheim.",
      "The surface keep is a lid. The stories that matter are the rings under the stone.",
    ],
  },
  menaphos: {
    title: "Menaphos",
    region: "Kharidian",
    lore: [
      "The golden city of the Menaphites. Four districts, a Pharaoh, and the cult of the sun and the river.",
      "Menaphos closed itself for years. When the gates opened again, the city was still the heart of the southern desert.",
    ],
  },
  lostgrove: {
    title: "Lost Grove",
    region: "Anachronia",
    lore: [
      "A living woodland torn from time. Solak was bound here. The Grove remembers a war older than the God Wars the surface tells.",
      "Roots, anima, and the silence after a warden falls. It is not a market town. It is a wound that grew leaves.",
    ],
  },
  tears: {
    title: "Tears of Guthix",
    region: "Lumbridge Swamp",
    lore: [
      "Juna keeps the light in a cave under the swamp. The tears are Guthix’s grief given water.",
      "Those who tell a true story of the week may gather the light. The cave is a shrine, not a mine.",
    ],
  },
  zanaris: {
    title: "Zanaris",
    region: "Lost City",
    lore: [
      "The fairy otherworld. Markets, the cosmic altar, and the court of the Fairy Godfather have all claimed the same mist.",
      "Zanaris is reached through a lost city and a ring. Time and law do not sit the same way here as they do in Misthalin.",
    ],
  },
  ardougne: {
    title: "East Ardougne",
    region: "Kandarin",
    lore: [
      "Kandarin’s great city. King Lathas and the market square, the zoo, and the wall that hid West Ardougne’s plague.",
      "The plague was a lie and a prison. East Ardougne lived well while the west coughed. That stain is part of the civic record.",
    ],
  },
  gnome: {
    title: "Tree Gnome Stronghold",
    region: "Kandarin",
    lore: [
      "King Narnode’s stronghold in the Grand Tree. Gnomes of the north built a city in living wood.",
      "Glough’s plot, the shipyards, and the stronghold’s watch on Kandarin are one history: a small people holding a tall tree.",
    ],
  },
  seers: {
    title: "Seers' Village",
    region: "Kandarin",
    lore: [
      "Foresters and seers on the road to Camelot. The court of King Arthur sits beyond the gate.",
      "The name is the work. Sight, flax, and the hall of the seers keep the village between the forest and the castle.",
    ],
  },
  anachronia: {
    title: "Anachronia",
    region: "Fossil Island",
    lore: [
      "An island out of time. Dinosaurs, the base camp, and the ruins of a dragonkin working.",
      "Anachronia is a shard of an older Gielinor. The present washed up on it; the past did not leave.",
    ],
  },
  yanille: {
    title: "Yanille",
    region: "Kandarin",
    lore: [
      "Walls and the Wizards’ Guild. Yanille watches the ogre lands to the south.",
      "A garrison town with a tower of magic. The watch is the point of the place.",
    ],
  },
  empyrean: {
    title: "Empyrean Citadel",
    region: "Abyss",
    lore: [
      "Armadyl’s fortress in the sky and the abyss. The Aviansie rebuilt a seat after the God Wars tore their kind from the world.",
      "The citadel is a court and a war-camp. Sliske’s contest later walked its halls.",
    ],
  },
  senntisten: {
    title: "Senntisten",
    region: "Forinthry",
    lore: [
      "Zaros’s capital. Cathedrals, the colosseum, and the long dark after the empire fell.",
      "The empty city was dug out again when the Elder Gods turned on the world. Senntisten is a name that keeps returning.",
    ],
  },
  sophanem: {
    title: "Sophanem",
    region: "Kharidian",
    lore: [
      "The city of the dead on the opposite bank from Menaphos. Plague, priests of Elidinis, and the pyramids of the south.",
      "Sophanem kept the funerary rites when Menaphos shut its gates. The river is the border and the bond.",
    ],
  },
  apeatoll: {
    title: "Ape Atoll",
    region: "Southern Sea",
    lore: [
      "Marimbo’s island. Temples, jungle, and a city of monkeys that learned to wear armour.",
      "Humans who come uninvited are sport. The atoll is a kingdom, not a curiosity.",
    ],
  },
  goblin: {
    title: "Goblin Village",
    region: "Asgarnia",
    lore: [
      "Generals Bentnoze and Wartface argue the colour of goblin mail under Bandos’s old banner.",
      "The village is a war-camp that forgot which war. The gods they name are bigger than the huts.",
    ],
  },
  heart: {
    title: "Heart of Gielinor",
    region: "The Heart",
    lore: [
      "A God Wars prison Sliske opened. Twin Furies, Vindicta, Helwyr, and Gregorovic were set to fight for a stone.",
      "The Heart is a theatre of the dead gods’ champions. The audience is the world.",
    ],
  },
  entrana: {
    title: "Entrana",
    region: "Asgarnia",
    lore: [
      "Saradomin’s holy island. No weapons, no armour. Monks keep the law at the dock.",
      "The law is the lore. Entrana is a vow you walk onto, not a fort you hold.",
    ],
  },
  warsretreat: {
    title: "War's Retreat",
    region: "PvM hub",
    lore: [
      "War keeps a hall for those who fight the great beasts. Bank, instance, and the road back to the next kill.",
      "It is not a town. It is the camp between deaths. Reapers and generals pass through the same door.",
    ],
  },
  cityofum: {
    title: "City of Um",
    region: "Underworld",
    lore: [
      "A city of the dead under the world. Necromancy found its first streets here. Rasial’s shadow is still on the stone.",
      "The living walk it as guests. The dead keep the market.",
    ],
  },
};

const OSRS: Record<string, TownNote> = {
  darkmeyer: {
    title: "Darkmeyer",
    region: "Morytania · OSRS",
    lore: [
      "The vampyre capital above Meiyerditch. Darkmeyer: Sins of the Father opened the dark streets to those who wear the right colours.",
      "Vyrewatch law. Icyene ruin under the towers. Old School Darkmeyer is that city, not a later rebuild.",
    ],
  },
  hosidius: {
    title: "Hosidius",
    region: "Great Kourend · OSRS",
    lore: [
      "Hosidius is the farming house of Great Kourend. Tithe, fields, and the favour of a house that feeds the kingdom.",
      "In Old School the five houses still stand. Hosidius is bread and law. The other houses watch it because armies eat.",
    ],
  },
  osrslumbridge: {
    title: "Lumbridge",
    region: "Misthalin · OSRS",
    lore: [
      "Duke Horacio holds Lumbridge on the River Lum. The castle, the church of Saradomin, and the mill are the whole duchy.",
      "Old School never saw the Battle of Lumbridge. The meadow east of the castle is still grass, goblins, and the road to Al Kharid.",
      "New adventurers still appear in the courtyard. The town is Misthalin’s south gate, not a crater.",
      "The river road teaches grammar: chapel, gate, bridge, the lie that the world is simple.",
      "Tension is castle versus river — authority on the hill, work on the water.",
      "Tutorial Island is a pedagogic ghost. Players remember it more than they inhabit it.",
      "From this sill the first sermon is stone, not a Sixth Age wound.",
    ],
    history: [
      "This slug is 2007-era continuity. No crater is current geography.",
      "The 2013 poll put the dialect back on a live client. Lumbridge was part of that constitution.",
      "Quest-state changes the courtyard; it does not import the other game’s landfall.",
      "The Old School wiki keeps the hour for this town.",
    ],
  },
  osrsfalador: {
    title: "Falador",
    region: "Asgarnia · OSRS",
    lore: [
      "White Knights and white stone. Sir Amik Varze commands the order that holds Asgarnia’s capital for the king.",
      "The park, the Party Room, and the Rising Sun sit inside walls that have faced the Kinshra.",
      "The city performs virtue in limestone. Knights drill. The park is a pause in the white argument.",
      "Piety and slapstick share a postcode. That is the tension.",
      "Gates look toward Taverley and Port Sarim. The walls are the civic sentence.",
      "A banner from the square reads order. A banner from the party room reads farce.",
      "Old School Falador is that garrison city, not a rebuilt war-camp.",
    ],
    history: [
      "In 2006 the party room entered common record as a glitch-massacre the culture still cites.",
      "The sill files it under the game surprising the city, not under a sermon.",
      "No later-age rebuild is current on this card. White walls here are the 2007-era plan.",
      "The Old School wiki keeps the hour.",
    ],
  },
  osrsvarrock: {
    title: "Varrock",
    region: "Misthalin · OSRS",
    lore: [
      "King Roald’s capital. Palace, museum, and the slums of the south-east.",
      "The Grand Exchange sits against the west wall. Reldo’s library and the palace guard are the old city under that market.",
      "The square is agora and rumour. Palace and drain share a grid.",
      "Gertrude’s household is the unfashionable centre. Bob keeps the sill.",
      "Price became a public sentence at the Exchange. The stalls did not vanish; they were outvoted.",
      "Tension is square versus palace. Who speaks for the city is the work of the place.",
      "Zamorakian unrest is weather in the slums, not this desk’s gossip column.",
    ],
    history: [
      "Old School Varrock is the maintained 2007-era capital plus the Exchange as later civic engine in this client.",
      "No Sixth Age crater belongs on this slug.",
      "Famous names passed through the Exchange like weather. This page confers no rank.",
      "The Old School wiki keeps the hour.",
    ],
  },
  osrsprif: {
    title: "Prifddinas",
    region: "Tirannwn · OSRS",
    lore: [
      "After Song of the Elves the crystal city stands again. Seren’s song is in the walls.",
      "Eight clans hold eight towers around the Tower of Voices.",
      "The streets are grown crystal, not a human market painted green.",
      "Old School Prifddinas is the restored city of that quest.",
      "Tension is seed versus ruin: the city was grown back, not administered from a later war.",
      "This desk will not paste Voice of Seren hour-clans onto this card.",
    ],
    history: [
      "Song of the Elves is the constitution of this city in Old School.",
      "It is not the RuneScape clan-district clock.",
      "No Sixth Age weather is current here.",
      "The Old School wiki keeps the hour.",
    ],
  },
  osrscani: {
    title: "Canifis",
    region: "Morytania · OSRS",
    lore: [
      "Werewolves east of the Salve. Priest in Peril is the crossing. Humans who walk in without the temple’s leave are prey.",
      "The Hair of the Dog, the tannery, and the wooden houses sit in Lord Drakan’s fog. Old School Canifis has not seen the later Morytania campaigns of the other game.",
    ],
  },
  osrscath: {
    title: "Catherby",
    region: "Kandarin · OSRS",
    lore: [
      "A fishing town under White Wolf Mountain. Beehives, a range, and boats that work the sea.",
      "Catherby feeds Seers’ Village and the mountain pass. It is Kandarin’s shore, not a capital.",
    ],
  },
  osrsport: {
    title: "Port Sarim",
    region: "Asgarnia · OSRS",
    lore: [
      "Asgarnia’s harbour. Boats to Karamja, Entrana, and the rusted jail hulks.",
      "Customs, pirates, and the monks share the same slip. Old School Port Sarim is still that door.",
    ],
  },
  osrstav: {
    title: "Taverley",
    region: "Asgarnia · OSRS",
    lore: [
      "Druids of Guthix. The stone circle, herblore, and the lake under White Wolf Mountain.",
      "Sanfew and the order keep the balance. The dwarves of the mountain are neighbours. Falador’s knights are not the law here.",
    ],
  },
  osrsburth: {
    title: "Burthorpe",
    region: "Asgarnia · OSRS",
    lore: [
      "Imperial Guard under Trollheim. Death Plateau is the road. The prince of Asgarnia has used this camp while trolls press the pass.",
      "Games Room and barracks. Old School Burthorpe is a mountain watch, not a later tutorial city.",
    ],
  },
  osrsedge: {
    title: "Edgeville",
    region: "Misthalin · OSRS",
    lore: [
      "A village on the Wilderness ditch. Monastery, pad, and the last hearth before the wild.",
      "Edgeville has been ruin and watch post. In Old School it is still that frontier, not a rebuilt fortress of another age.",
    ],
  },
  osrsalk: {
    title: "Al Kharid",
    region: "Kharidian · OSRS",
    lore: [
      "The Emir’s city on the desert gate. Prince Ali, the palace, and the duel arena belong to one emirate.",
      "Tumeken’s sun is the old law of the sand. Shantay’s pass is the south door. Old School Al Kharid has not opened Menaphos.",
    ],
  },
  osrstears: {
    title: "Tears of Guthix",
    region: "Lumbridge Swamp · OSRS",
    lore: [
      "Juna keeps the light under the swamp. The tears are Guthix’s grief given water.",
      "Tell her a true story of the week and she may let you gather the light. The cave is a shrine. Old School never moved it to another world.",
    ],
  },
  osrszanaris: {
    title: "Zanaris",
    region: "Lost City · OSRS",
    lore: [
      "The Lost City of the fairies. A zanarian market, the cosmic altar, and the court that Fairytale quests later named.",
      "You reach it through a leprechaun and a ring. Time does not sit here as it does in Misthalin.",
    ],
  },
  osrsard: {
    title: "East Ardougne",
    region: "Kandarin · OSRS",
    lore: [
      "King Lathas’s city. Market, zoo, and the wall that hid West Ardougne’s plague.",
      "Plague City through Mourning’s End told the truth: the plague was a prison. Old School Ardougne still carries that stain on the civic record.",
    ],
  },
  osrsgnome: {
    title: "Tree Gnome Stronghold",
    region: "Kandarin · OSRS",
    lore: [
      "King Narnode Shareen in the Grand Tree. Glough’s plot is the old wound.",
      "Gnomes of the north built a city in living wood. The stronghold watches Kandarin from the leaves.",
    ],
  },
  osrsseers: {
    title: "Seers' Village",
    region: "Kandarin · OSRS",
    lore: [
      "Foresters and seers on the road to Camelot. King Arthur’s hall sits beyond the gate.",
      "Flax, the court of seers, and the castle. The village is the yard of that legend.",
    ],
  },
  osrsyan: {
    title: "Yanille",
    region: "Kandarin · OSRS",
    lore: [
      "Walls, the Wizards’ Guild, and the Watchtower looking south at ogre land.",
      "A garrison with a tower of magic. The watch is the point of the place.",
    ],
  },
  osrssoph: {
    title: "Sophanem",
    region: "Kharidian · OSRS",
    lore: [
      "City of the dead across from Menaphos. Icthlarin’s Little Helper and Contact! are the doors.",
      "Plague, priests, and pyramids. Menaphos’s gates stay shut in Old School. Sophanem keeps the funerary rites alone.",
    ],
  },
  osrsape: {
    title: "Ape Atoll",
    region: "Southern Sea · OSRS",
    lore: [
      "Marimbo’s island. Monkey Madness is the crossing. Temples, jungle, and a city of monkeys in armour.",
      "Humans who come uninvited are sport. The atoll is a kingdom.",
    ],
  },
  osrsgob: {
    title: "Goblin Village",
    region: "Asgarnia · OSRS",
    lore: [
      "Generals Bentnoze and Wartface argue the colour of goblin mail. Goblin Diplomacy is the whole politics.",
      "Bandos is a name they shout. The village is a war-camp that forgot which war.",
    ],
  },
  osrsent: {
    title: "Entrana",
    region: "Asgarnia · OSRS",
    lore: [
      "Saradomin’s holy island. No weapons, no armour. Monks search you at the Port Sarim dock.",
      "The law is the lore. Lost City begins in that vow. Entrana is not a fort.",
    ],
  },
  draynor: {
    title: "Draynor Village",
    region: "Misthalin · OSRS",
    lore: [
      "Willows, Ned, and a market in the shade of Draynor Manor. Count Draynor’s crypt is under the house on the hill.",
      "Vampyre Slayer and the jail. Old School Draynor is that quiet that is not quiet.",
    ],
  },
  grandexchange: {
    title: "Grand Exchange",
    region: "Varrock · OSRS",
    lore: [
      "Raised west of Varrock in Old School as the clerks’ market. Four corners of trade against the city wall.",
      "It is not a temple. It is the civic machine that replaced the old stalls inside the gates.",
    ],
  },
};

function isOsrsId(id: string) {
  return (
    id.startsWith("osrs") ||
    ["hosidius", "shayzien", "lovakengj", "arceuus", "piscarilius", "fortis", "rellekka"].includes(id) === false &&
    ["hosidius", "shayzien", "lovakengj", "arceuus", "piscarilius", "fortis"].includes(id)
  );
}

function fillEssay(id: string, note: TownNote): TownNote {
  const osrs = id.startsWith("osrs") || ["hosidius", "shayzien", "lovakengj", "arceuus", "piscarilius", "fortis"].includes(id);
  const lore = [...note.lore];
  if (lore.length < 6) {
    lore.push(
      `${note.title} works as streets: trade, watch, prayer, or harvest, according to ${note.region.split("·")[0].trim()}.`,
      "One landmark holds the camera for a banner. The rest of the town is the argument around it.",
      "Tension in the place is civic — who holds the gate, who keeps the shrine — not a drop table.",
      "This desk describes the town as this client shows it. The sister game is a different grammar.",
    );
  }
  const history =
    note.history?.length
      ? note.history
      : osrs
        ? [
            `${note.title} in Old School RuneScape is 2007-era continuity, not a later rebuild.`,
            "The 2013 poll put this dialect back on a live client. Geography here is maintained, not cratered.",
            "No Sixth Age landfall, edict, or Voice of Seren hour is current on this slug.",
            "The Old School wiki keeps the hour if this desk and a live page disagree.",
          ]
        : [
            `${note.title} on the main RuneScape client carries later-age change only where that client published it.`,
            "Rebuilds, hour-cities, and elder-war scars belong on this slug when the live page says so.",
            "Do not copy this paragraph onto an Old School card of the same name.",
            "The RuneScape wiki keeps the hour.",
          ];
  return { ...note, lore, history };
}

export function townNote(id: string): TownNote | undefined {
  const raw = OSRS[id] ?? SHARED[id];
  return raw ? fillEssay(id, raw) : undefined;
}
