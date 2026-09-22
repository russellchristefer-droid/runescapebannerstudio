/** Fan flavour. Not live worlds. No player names. Slot = floor(now / 300000). */

export const STREET_SLOT_MS = 300_000;

export type StreetBit = { speaker: string; line: string };

const LOCAL: StreetBit = { speaker: "Local", line: "Market’s open. Keep your bag closed." };

const BANNED =
  /this card|this desk|do not export|official notes|\bbanner\b|clan pair on this card/i;

function b(speaker: string, line: string): StreetBit {
  return { speaker, line };
}

const OSRS: Record<string, StreetBit[]> = {
  osrslumbridge: [
    b("Guard", "Bank’s east. Don’t stand in the courtyard AFK."),
    b("Cook", "Duke wants a cake. I want a day off."),
    b("Man", "Goblins at the gate again. Same as last year."),
    b("Miller", "Wheel’s turning. Flour’s cheaper than the inn."),
    b("Fisher", "Lum’s the river. Castle’s homework."),
    b("Guide", "Bridge first. Bank after. Don’t skip the walk."),
  ],
  osrsfalador: [
    b("White Knight", "South gate to Sarim. North gate to the park."),
    b("Guard", "Walls hold. Kinshra are weather."),
    b("Smith", "Furnace is work. Honour comes after."),
    b("Warden", "Park’s green. Party room’s next door."),
    b("Knight", "Polish isn’t piety. The gate still asks."),
    b("Keep", "Rising Sun’s a room. Park’s a park."),
  ],
  osrsvarrock: [
    b("Stallholder", "East market first. Palace second."),
    b("Guard", "Fountain square. Slums keep their own hours."),
    b("Runner", "Tax is public. Don’t ask me for a mid."),
    b("Neighbour", "Cat on the sill. Palaces inflate."),
    b("Clerk", "Roald’s name is on the writ. I sell bread."),
    b("Sewer", "Rats under the city. Watch the grate."),
  ],
  hosidius: [
    b("Farmer", "Fields are the house. Favour’s the old word."),
    b("Cook", "Kitchen and tithe. Don’t ask about a raid."),
    b("Guard", "South to the coast. North to the statue."),
    b("Clerk", "Spirit tree if you’ve done the diary."),
    b("Plough", "Dirt’s current. Leave Varrock talk home."),
    b("Local", "Hosidius grows. Shayzien drills."),
  ],
  osrsprif: [
    b("Elf", "Song of the Elves is the door. This street is later."),
    b("Guard", "Keep to the crystal. Don’t wander the walls."),
    b("Singer", "Eight clans. No hour-voice on this street."),
    b("Porter", "Lletya was the camp. Walk it like a city."),
    b("Stall", "Crystal sings. Bank’s in the city."),
    b("Warden", "Gauntlet’s downstairs. Don’t start it in the square."),
  ],
  osrscani: [
    b("Guard", "Tower’s north. Stay on the path after dark."),
    b("Resident", "Hair of the dog. Then you leave."),
    b("Canifis guard", "Outsiders talk too much."),
    b("Innkeep", "Humans without leave are prey."),
    b("Tanner", "Task starts at the tower. Not in the tap."),
    b("Wolf", "Moonrise is local law. Keep walking."),
  ],
  osrscath: [
    b("Fisher", "Spots and the range. You know the dock."),
    b("Guard", "Boat talk belongs at Port Sarim."),
    b("Cook", "Range is public. Don’t crowd the bank."),
    b("Clerk", "White walls of Falador are west."),
    b("Net hand", "Catherby is work, not a city title."),
    b("Local", "Sharks at the range. Pay for the coals."),
  ],
  osrsport: [
    b("Warden", "Boat to Entrana. Bank the blade first."),
    b("Guard", "Karamja’s the other slip. Pay the fare."),
    b("Clerk", "Customs first. Don’t argue the search."),
    b("Sailor", "Port Sarim searches you. That’s the dock."),
    b("Porter", "Rimmington’s a walk. The boat’s the point."),
    b("Fishmonger", "Stalls smell like the slip."),
  ],
  osrstav: [
    b("Druid", "Dungeon mouth is under this. Leave city talk."),
    b("Guard", "Burthorpe is up the path."),
    b("Stall", "Grimy is work. Don’t ask potion prices."),
    b("Clerk", "Guthix keeps the green. Falador the walls."),
    b("Novice", "Taverley’s a village with a hole under it."),
    b("Local", "Herbs first. Then the stairs."),
  ],
  osrsburth: [
    b("Imperial Guard", "Death Plateau starts up that path."),
    b("Clerk", "Games stay in the Games Room."),
    b("Smith", "Anvil’s work. I don’t sell a war."),
    b("Guard", "Taverley is down the hill."),
    b("Recruit", "Plateau’s a climb, not a postcard."),
    b("Local", "Imperial yard. Keep off the drill."),
  ],
  osrsedge: [
    b("Guard", "Monastery west. Ditch north. That’s the line."),
    b("Monk", "We keep the hill. Protect item over the ditch."),
    b("Adventurer", "Cross it knowing the grammar."),
    b("Clerk", "Edgeville’s a wall town. Wild is weather."),
    b("Banker", "Jewellery on the body. Not under the sharks."),
    b("Watch", "The ditch does not care what you meant."),
  ],
  osrsalk: [
    b("Palace guard", "Silk and the gate. Menaphos is another city."),
    b("Stall", "Desert tax is the walk."),
    b("Clerk", "Duel arena’s a rumour the sand still tells."),
    b("Guard", "Shantay is south. The palace is here."),
    b("Porter", "Al Kharid is the gate, not a golden city."),
    b("Local", "Pay the toll. Don’t argue the scimitar."),
  ],
  osrstears: [
    b("Juna", "The drip is the hour. Spectacle can wait."),
    b("Guard", "He does not walk the chasm."),
    b("Novice", "One small weekly mercy under the swamp."),
    b("Clerk", "Cave’s down. Don’t guess the tears."),
    b("Guide", "Lumbridge is up. The stone is down."),
    b("Local", "Bring empty vials. Leave the cape talk."),
  ],
  osrszanaris: [
    b("Fairy", "Dramen staff, then the stalls."),
    b("Guard", "Lost City is not a postcard."),
    b("Clerk", "Rings first. Then the market."),
    b("Porter", "Canopy’s the joke at surface kings."),
    b("Stall", "Wheat and other people’s errands."),
    b("Local", "Don’t lose the staff. That’s the wipe."),
  ],
  osrsard: [
    b("Knight", "Two towns, one wall. Pick a gate."),
    b("Stall", "Market first. West remembers plague."),
    b("Guard", "Zoo’s a walk. Clocktower’s a hole."),
    b("Thief", "Stalls keep their own hours."),
    b("Watch", "The wall is the lesson."),
    b("Local", "East for bread. West if you’re working."),
  ],
  osrsgnome: [
    b("Gnome", "Spirit trees and the stronghold. Toads in the maze."),
    b("Guard", "Grand Tree is upstairs."),
    b("Clerk", "Gliders if you’ve done the quest."),
    b("Cook", "Toad crunchies are work, not a joke."),
    b("Porter", "The canopy is the town."),
    b("Local", "Watch your head. We’re shorter than you."),
  ],
  osrsseers: [
    b("Seer", "Bank is here. Camelot is next door."),
    b("Guard", "Court and flax. Leave palace talk."),
    b("Clerk", "Flax is work. Don’t ask me rates."),
    b("Porter", "Catherby is the dock. This is the village."),
    b("Watch", "Elements stay in the workshop."),
    b("Local", "Spin upstairs. Bank downstairs."),
  ],
  osrsyan: [
    b("Wizard", "Guild upstairs. Watchtower road."),
    b("Guard", "The wall holds. I don’t sell a spell."),
    b("Clerk", "Yanille keeps its voice down."),
    b("Porter", "Port Khazard is a walk."),
    b("Novice", "The door is the lesson."),
    b("Local", "Wizards upstairs. Beer downstairs."),
  ],
  osrssoph: [
    b("Guard", "The gate and the plague. Menaphos is the other door."),
    b("Priest", "Elidinis keeps the water."),
    b("Clerk", "Sophanem is shut for a reason."),
    b("Porter", "Desert is thirst. Bank the skins."),
    b("Watch", "Cats walk. Tourists argue."),
    b("Local", "Bring waterskins. Don’t pet the plague."),
  ],
  osrsape: [
    b("Monkey", "Greegree first. Humans stay on the boat."),
    b("Gorilla", "Temple’s Marimbo’s. Keep the scim sheathed."),
    b("Ninja ape", "Speak ape or stay on the dock."),
    b("Altar monkey", "Statue’s the law. Bow or walk."),
    b("Dock ape", "Boat’s the rule. Marim’s the town."),
    b("Guard", "Customs first. No human faces past the gate."),
  ],
  osrsent: [
    b("Monk", "No weapons. No armour."),
    b("Warden", "Port Sarim searches you. That’s the dock."),
    b("Novice", "Wipe is the item you forgot to bank."),
    b("Clerk", "Lost City begins in that vow."),
    b("Watch", "Entrana is not a fort."),
    b("Gardener", "The law is the pack, not the sermon."),
  ],
  osrsgob: [
    b("Goblin", "Big High War God lives in the huts."),
    b("Guard", "Diplomacy is politics. This is the yard."),
    b("Watch", "Green and red keep their own hours."),
    b("Porter", "Falador is down the road. Leave it there."),
    b("Goblin", "Generals shout. We poke with spears."),
    b("Local", "Don’t laugh at the armour. They’ll stack you."),
  ],
  osrsrel: [
    b("Dock", "Longhall first. Waterbirth is a boat."),
    b("Guard", "Fremennik tests stay on the door."),
    b("Fisher", "The slip is work."),
    b("Clerk", "Helm talk belongs in the longhall."),
    b("Watch", "Neitiznot is another boat."),
    b("Local", "Prove yourself. Then we talk."),
  ],
  shayzien: [
    b("Soldier", "The camp. Lizardmen stay on the hill."),
    b("Guard", "Shayzien is a drill, not a farm."),
    b("Watch", "Hosidius is the dirt. This is the armour."),
    b("Porter", "Graveyard is a walk."),
    b("Recruit", "Drill first. Then the overrun."),
    b("Local", "Salute or keep moving."),
  ],
  lovakengj: [
    b("Smith", "Blast mine and the forge."),
    b("Guard", "Sulphur is the weather."),
    b("Watch", "The house is the heat."),
    b("Porter", "Shayzien buys what we make."),
    b("Miner", "Don’t stand in the blast."),
    b("Local", "Masks on. Lungs later."),
  ],
  arceuus: [
    b("Librarian", "Dark altar. Hours stay on the books."),
    b("Guard", "Tower is blood and books."),
    b("Watch", "Hosidius is green. This house is not."),
    b("Porter", "The library is the town."),
    b("Acolyte", "Don’t guess the blood altar."),
    b("Local", "Quiet in the stacks."),
  ],
  piscarilius: [
    b("Dock", "Port house. Tiles if you know the job."),
    b("Guard", "Ships keep their own hours."),
    b("Watch", "Kourend’s wet door."),
    b("Porter", "Shayzien is inland. Stay on the slip."),
    b("Fisher", "Bait’s dear. Don’t waste it."),
    b("Local", "Pay the crew. Then the catch."),
  ],
  fortis: [
    b("Guard", "Varlamore capital. Colosseum’s south."),
    b("Stall", "The square is work."),
    b("Watch", "The sun is different here."),
    b("Porter", "Gate’s current. Don’t wander the dunes."),
    b("Clerk", "City of Fortis. Not Varrock."),
    b("Local", "Shade first. Then the forum."),
  ],
  osrsdraynor: [
    b("Guard", "Willows, bank, and worse nights."),
    b("Cutter", "Trees are the work."),
    b("Clerk", "Don’t discuss the manor after dark."),
    b("Watch", "Draynor keeps its voice down."),
    b("Porter", "Lumbridge is east. Willows are here."),
    b("Local", "Bank’s busy. Wizards linger."),
  ],
};

const RS3: Record<string, StreetBit[]> = {
  lumbridge: [
    b("Guard", "Watch the crater path. Meadow’s not a shortcut."),
    b("Foreman", "Rebuild’s paid. The hole still isn’t."),
    b("Woman", "Chapel first. Then the lodestone."),
    b("Miller", "Same wheel. Different scar."),
    b("Sexton", "Bell still rings. Crater still sits."),
    b("Porter", "Castle first. Wound’s just geography."),
  ],
  falador: [
    b("White Knight", "The square still performs order."),
    b("Keep", "Same postcode for piety and farce."),
    b("Warden", "I sweep limestone. Kinshra keep their hours."),
    b("Guard", "Walls have taken hits this age recorded."),
    b("Smith", "Furnace is work. Hats are another yard."),
    b("Clerk", "South to the port. North to the park."),
  ],
  varrock: [
    b("Clerk", "Crown speaks. Exchange answers in numbers."),
    b("Stall", "Unrest is weather. I sell bread."),
    b("Runner", "Gossip isn’t my stock."),
    b("Guard", "Fountain and palace. Slums keep hours."),
    b("Porter", "GE is west. This brick is Gertrude’s."),
    b("Local", "Tax is public. Don’t ask me a mid."),
  ],
  prifddinas: [
    b("Clerk", "Voices first. Then your clan tower."),
    b("Ithell worker", "Crystal sings this hour. Don’t guess the pair."),
    b("Guard", "Max Guild is not a bank."),
    b("Singer", "Eight towers. One voice this hour."),
    b("Porter", "Lletya was camp. This is the city."),
    b("Warden", "Gauntlet’s downstairs. Street’s the street."),
  ],
  canifis: [
    b("Guard", "Tower’s north. Fog is the law."),
    b("Innkeep", "Hair of the dog. Then you leave."),
    b("Resident", "Humans without leave are prey."),
    b("Tanner", "Drakan’s weather. Keep to the path."),
    b("Watch", "Salve is behind you."),
    b("Wolf", "Moonrise is local. Don’t linger."),
  ],
  catherby: [
    b("Fisher", "Spots and a range. You know the dock."),
    b("Guard", "Boat talk belongs at Port Sarim."),
    b("Cook", "Range is public."),
    b("Clerk", "White walls are west."),
    b("Porter", "Sharks at the range."),
    b("Local", "Pay for the coals."),
  ],
  portsarim: [
    b("Dock", "Boats and the Entrana rule start here."),
    b("Guard", "Customs first. Bank the blade."),
    b("Sailor", "Karamja is the other slip."),
    b("Porter", "Falador is up the road."),
    b("Fishmonger", "Stalls smell like the slip."),
    b("Local", "Don’t miss the charter."),
  ],
  taverley: [
    b("Druid", "Dungeon mouth under the green."),
    b("Guard", "Burthorpe is up the path."),
    b("Clerk", "Guthix keeps the village."),
    b("Stall", "Grimy is work."),
    b("Porter", "Falador keeps the walls."),
    b("Local", "Herbs first. Stairs second."),
  ],
  burthorpe: [
    b("Imperial Guard", "The yard and the plateau."),
    b("Clerk", "Games stay in the room."),
    b("Smith", "Anvil is work."),
    b("Watch", "Taverley is down the hill."),
    b("Recruit", "I don’t sell a war."),
    b("Local", "Keep off the drill."),
  ],
  edgeville: [
    b("Guard", "Ditch is still a dare. Protect item."),
    b("Monk", "The hill holds."),
    b("Adventurer", "The line is the point."),
    b("Clerk", "Edgeville’s a wall town."),
    b("Banker", "Jewellery on the body."),
    b("Watch", "The ditch does not care what you meant."),
  ],
  alkharid: [
    b("Palace guard", "Silk and the desert gate."),
    b("Stall", "Don’t ask gem prices."),
    b("Clerk", "Menaphos is another city. This is the gate."),
    b("Guard", "Shantay is south."),
    b("Porter", "The palace is here."),
    b("Local", "Pay the toll."),
  ],
  daemonheim: [
    b("Warden", "Floors live downstairs."),
    b("Guard", "A lobby is not a fight."),
    b("Porter", "Sinkhole is weather."),
    b("Watch", "Fremennik stone. Leave city talk."),
    b("Clerk", "Ring first. Then the stairs."),
    b("Local", "Don’t start a floor in the lobby."),
  ],
  menaphos: [
    b("Clerk", "Four districts. The gates opened."),
    b("Porter", "Sun and river."),
    b("Stall", "Golden city is work."),
    b("Guard", "Sophanem is the other door."),
    b("Watch", "Districts keep their own hours."),
    b("Local", "Shifting tombs aren’t a bank."),
  ],
  lostgrove: [
    b("Warden", "Solak’s wood. Leave the hour talk."),
    b("Guard", "Grove is a fight. Not this path."),
    b("Porter", "Anachronia is the island after."),
    b("Watch", "Trees keep their own hours."),
    b("Ranger", "Don’t wander off the root."),
    b("Local", "Quiet. The wood listens."),
  ],
  tears: [
    b("Juna", "The drip is the hour."),
    b("Guard", "Spectacle can wait."),
    b("Novice", "A small weekly mercy."),
    b("Porter", "Lumbridge is up."),
    b("Clerk", "Empty vials. Then the stone."),
    b("Local", "Don’t crowd the drip."),
  ],
  zanaris: [
    b("Fairy", "Lost City on later stones."),
    b("Guard", "Rings first."),
    b("Porter", "The canopy is the joke."),
    b("Stall", "Other people’s errands."),
    b("Clerk", "Don’t lose the staff."),
    b("Local", "Market’s odd. Keep walking."),
  ],
  ardougne: [
    b("Knight", "West clocktower. East market."),
    b("Stall", "Two towns, one wall."),
    b("Guard", "Zoo’s a walk."),
    b("Watch", "Plague memory stays west."),
    b("Porter", "Pick a gate."),
    b("Local", "East for bread."),
  ],
  gnome: [
    b("Gnome", "Stronghold canopy. Toads in the maze."),
    b("Guard", "Grand Tree upstairs."),
    b("Cook", "Crunchies are work."),
    b("Porter", "The trees are the town."),
    b("Clerk", "Gliders if you’ve done the quest."),
    b("Local", "Watch your head."),
  ],
  seers: [
    b("Seer", "Camelot is next door. Bank is here."),
    b("Guard", "Flax and court."),
    b("Porter", "Catherby is the dock."),
    b("Watch", "Leave palace talk."),
    b("Clerk", "Spin upstairs."),
    b("Local", "Elements stay in the workshop."),
  ],
  anachronia: [
    b("Ranger", "The island after the island."),
    b("Guard", "Dinosaurs keep their own hours."),
    b("Porter", "The grove is another door."),
    b("Watch", "Confirm the landing before you jump."),
    b("Clerk", "Base camp is work."),
    b("Local", "Don’t poke the big ones."),
  ],
  yanille: [
    b("Wizard", "Wizards’ Guild. You know the door."),
    b("Guard", "The wall holds."),
    b("Porter", "Watchtower road."),
    b("Watch", "Yanille keeps its voice down."),
    b("Clerk", "Beer downstairs. Guild up."),
    b("Local", "Don’t loiter the portal."),
  ],
  draynor: [
    b("Guard", "Willows, bank, and worse nights."),
    b("Cutter", "Trees are the work."),
    b("Clerk", "Don’t discuss the manor after dark."),
    b("Watch", "Draynor keeps its voice down."),
    b("Porter", "Lumbridge is east."),
    b("Local", "Wizards linger at the willows."),
  ],
  grandexchange: [
    b("Clerk", "Tax is public. Don’t ask me a price."),
    b("Runner", "Four clerks, one floor."),
    b("Guard", "Varrock is east. Exchange is the work."),
    b("Porter", "I don’t sell a flip."),
    b("Watch", "Leave the bank tab home."),
    b("Stall", "Offers in. Offers out."),
  ],
  empyrean: [
    b("Warden", "Armadyl’s hall after the edicts."),
    b("Guard", "Citadel is a hall, not a farm."),
    b("Porter", "Altitude first."),
    b("Watch", "Wings keep their hours."),
    b("Clerk", "Don’t start a kill in the lobby."),
    b("Local", "Wind’s the weather."),
  ],
  senntisten: [
    b("Clerk", "Zarosian stone. Cathedral is the still."),
    b("Guard", "The front is a fight. Not this nave."),
    b("Acolyte", "The street is the ruin you can walk."),
    b("Watch", "Empty Lord talk stays downstairs."),
    b("Porter", "Don’t loiter the pillars."),
    b("Local", "Quiet in the ruin."),
  ],
  sophanem: [
    b("Guard", "Plague city. The gate is the lesson."),
    b("Priest", "Elidinis keeps the water."),
    b("Clerk", "Menaphos is the other door."),
    b("Porter", "Bank the skins."),
    b("Watch", "Cats walk. Tourists argue."),
    b("Local", "Bring waterskins."),
  ],
  apeatoll: [
    b("Monkey", "Greegree first. Humans stay on the boat."),
    b("Gorilla", "Temple’s Marimbo’s. Keep the scim sheathed."),
    b("Ninja ape", "Speak ape or stay on the dock."),
    b("Altar monkey", "Statue’s the law. Bow or walk."),
    b("Dock ape", "Boat’s the rule. Marim’s the town."),
    b("Guard", "Customs first. No human faces past the gate."),
  ],
  goblin: [
    b("Goblin", "Big High War God lives in the huts."),
    b("Guard", "This is the yard."),
    b("Watch", "Green and red keep their own hours."),
    b("Porter", "Falador is down the road."),
    b("Goblin", "Generals shout. We poke with spears."),
    b("Local", "Don’t laugh at the armour."),
  ],
  heart: [
    b("Warden", "Four houses. Pick a wing."),
    b("Guard", "Heart is a fight. Not this hall."),
    b("Porter", "Leave city talk."),
    b("Watch", "Houses keep their own hours."),
    b("Clerk", "Don’t start an enrage in the lobby."),
    b("Local", "Gear here. Die elsewhere."),
  ],
  entrana: [
    b("Monk", "No weapons. No armour."),
    b("Dock", "Port Sarim searches you."),
    b("Novice", "Wipe is the item you forgot to bank."),
    b("Clerk", "Entrana is not a fort."),
    b("Watch", "The law is the pack."),
    b("Gardener", "I don’t sell a sword."),
  ],
  cityofum: [
    b("Ferry", "Living walk as guests. Dead keep the market."),
    b("Necromancer", "Rasial’s shadow is on the stone."),
    b("Watch", "Dock is the town."),
    b("Porter", "Don’t start a ritual in the street."),
    b("Clerk", "Um keeps its own hours."),
    b("Local", "Mind the ferry."),
  ],
  warsretreat: [
    b("Clerk", "Hub, not a kill."),
    b("Guard", "The retreat is a lobby."),
    b("Warden", "Gear here. Die elsewhere."),
    b("Watch", "Don’t start a streak on the mat."),
    b("Porter", "Instance is downstairs."),
    b("Local", "Bank first."),
  ],
  darkmeyer: [
    b("Vyrewatch", "These streets are not Canifis."),
    b("Clerk", "Wear the right colours."),
    b("Guard", "Meiyerditch is below."),
    b("Watch", "The capital keeps its own hours."),
    b("Porter", "Don’t flash human clothes."),
    b("Local", "Keep your head down."),
  ],
  rellekka: [
    b("Dock", "Longhall first. The boat is later."),
    b("Guard", "Prove yourself. Then we talk."),
    b("Fisher", "The slip is work."),
    b("Watch", "Waterbirth is a boat, not this street."),
    b("Clerk", "Helm talk belongs in the hall."),
    b("Local", "Don’t mock the trials."),
  ],
  keldagrim: [
    b("Clerk", "Under the mountain. Consortium halls."),
    b("Guard", "The blast is work."),
    b("Smith", "Leave a surface title home."),
    b("Watch", "The city is the hall."),
    b("Porter", "Don’t block the carts."),
    b("Local", "Hats off in the hall."),
  ],
  phasmatys: [
    b("Dock", "Ectoplasm and the slip."),
    b("Guard", "The town is the veil."),
    b("Watch", "Canifis is inland."),
    b("Porter", "Pay the fare."),
    b("Clerk", "Don’t waste a token."),
    b("Local", "Keep walking. Ghosts linger."),
  ],
  lletya: [
    b("Warden", "Refugee camp before the city stands."),
    b("Guard", "Prifddinas is the later street."),
    b("Watch", "Trees keep their own hours."),
    b("Porter", "Tirannwn is the walk."),
    b("Elf", "Crystal’s scarce. Don’t wander."),
    b("Local", "Keep to the path."),
  ],
  marim: [
    b("Monkey", "Greegree first. Humans stay on the boat."),
    b("Gorilla", "Temple’s Marimbo’s. Keep the scim sheathed."),
    b("Ninja ape", "Speak ape or stay on the dock."),
    b("Altar monkey", "Statue’s the law. Bow or walk."),
    b("Dock ape", "Boat’s the rule. Marim’s the town."),
    b("Guard", "Customs first. No human faces past the gate."),
  ],
  fortforinthry: [
    b("Guard", "The fort after the fort."),
    b("Watch", "Ditch is north."),
    b("Porter", "Edgeville is a different grammar."),
    b("Warden", "Rebuild is work."),
    b("Clerk", "Contracts at the board."),
    b("Local", "Walls first. Then the wood."),
  ],
  waiko: [
    b("Dock", "The Arc. Voyages, not a mainland bank."),
    b("Guard", "Boat is the town."),
    b("Porter", "Leave Varrock talk."),
    b("Watch", "Confirm the island before you sail."),
    b("Clerk", "Contracts at the board."),
    b("Local", "Pay the crew."),
  ],
};

function poolOf(id: string, game: "osrs" | "rs3"): StreetBit[] {
  const raw = game === "osrs" ? OSRS[id] : RS3[id];
  const out = [...(raw ?? [])];
  while (out.length < 6) out.push(LOCAL);
  return out;
}

export function streetTalk(id: string, game: "osrs" | "rs3"): StreetBit[] {
  return poolOf(id, game);
}

export function streetLine(id: string, game: "osrs" | "rs3", now = Date.now()): StreetBit {
  const pool = streetTalk(id, game);
  const slot = Math.floor(now / STREET_SLOT_MS);
  return pool[slot % pool.length] ?? LOCAL;
}

export function streetFlipRemain(now = Date.now()): string {
  const left = STREET_SLOT_MS - (now % STREET_SLOT_MS);
  const s = Math.max(1, Math.ceil(left / 1000));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${String(r).padStart(2, "0")}`;
}

export function streetBanned(bit: StreetBit): boolean {
  return BANNED.test(`${bit.speaker} ${bit.line}`);
}

export function streetWordCount(bit: StreetBit): number {
  return bit.line.trim().split(/\s+/).filter(Boolean).length;
}
