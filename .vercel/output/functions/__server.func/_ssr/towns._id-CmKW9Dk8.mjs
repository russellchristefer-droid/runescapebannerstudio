import { B as notFound, b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as LOCATIONS, u as townStillLine } from "./locations-DGhympWJ.mjs";
import { t as UseOnBanner } from "./use-on-banner-CNPfvmiC.mjs";
import { d as townPath, l as godInk, o as VisitPlaces, s as bossPath, t as AppLink, u as godPath } from "./place-chip-CCVXVkdy.mjs";
import { t as PlaceRail } from "./place-rail-DFA15Tod.mjs";
import { t as townNote } from "./town-notes-gbQvMCvJ.mjs";
import { A as useVisibleNow, S as BackLink, n as Route, x as noteFor } from "./router-D8oIjQ4W.mjs";
import { t as OfficialPulse } from "./official-pulse-yZGuzRl4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/towns._id-CmKW9Dk8.js
var import_jsx_runtime = require_jsx_runtime();
function wikiPath(title) {
	return encodeURI(title.replace(/ /g, "_"));
}
function placeLore(loc) {
	const game = loc.edition === "OSRS" ? "osrs" : "rs3";
	const host = game === "osrs" ? "https://oldschool.runescape.wiki/w/" : "https://runescape.wiki/w/";
	if (loc.kind === "town") {
		const note = townNote(loc.id);
		if (!note?.lore?.length) return null;
		return {
			game,
			slug: loc.id,
			kind: "town",
			brief: note.lore.join(" "),
			sourceName: note.title,
			sourceUrl: `${host}${wikiPath(note.title)}`
		};
	}
	const note = noteFor(loc.id);
	if (!note) return null;
	const brief = [
		note.style,
		note.start[0],
		note.route[0]
	].filter(Boolean).join(" ");
	if (!brief) return null;
	return {
		game,
		slug: loc.id,
		kind: "boss",
		brief,
		sourceName: note.title,
		sourceUrl: `${host}${wikiPath(note.title)}`
	};
}
/** Dated official or wiki notes only. Add a row when Jagex or the wiki names the street. */
var TOWN_NOTICES = [];
function noticeFor(slug, game) {
	return TOWN_NOTICES.find((row) => row.slug === slug && row.game === game);
}
function c(role, src) {
	return src ? {
		role,
		src
	} : { role };
}
var OSRS$1 = {
	osrslumbridge: [c("Duke's clerk", "/stills/osrs/citizens/lumbridge-1.png"), c("Town guard", "/stills/osrs/citizens/lumbridge-2.png")],
	osrsfalador: [c("White Knight", "/stills/osrs/citizens/falador-1.png")],
	osrsvarrock: [c("Stallholder", "/stills/osrs/citizens/varrock-1.png"), c("Guard", "/stills/osrs/citizens/varrock-2.png")],
	osrsedge: [
		c("Guard", "/stills/osrs/citizens/edgeville-1.png"),
		c("Monk", "/stills/osrs/citizens/edgeville-2.png"),
		c("Adventurer at the ditch", "/stills/osrs/citizens/edgeville-3.png")
	],
	osrsdraynor: [c("Market guard", "/stills/osrs/citizens/draynor-1.png")],
	osrsalk: [c("Palace guard", "/stills/osrs/citizens/al-kharid-1.png")],
	osrscath: [c("Fisher", "/stills/osrs/citizens/catherby-1.png")],
	osrsard: [c("Knight of Ardougne", "/stills/osrs/citizens/ardougne-1.png")],
	osrsyan: [c("Wizard", "/stills/osrs/citizens/yanille-1.png")],
	osrsprif: [c("Elven door-warden", "/stills/osrs/citizens/prifddinas-1.png")]
};
var RS3$1 = {
	lumbridge: [c("Duke's clerk", "/stills/rs3/citizens/lumbridge-1.png"), c("Town guard", "/stills/rs3/citizens/lumbridge-2.png")],
	falador: [c("White Knight", "/stills/rs3/citizens/falador-1.png")],
	varrock: [c("Stallholder", "/stills/rs3/citizens/varrock-1.png"), c("Guard", "/stills/rs3/citizens/varrock-2.png")],
	edgeville: [c("Guard", "/stills/rs3/citizens/edgeville-1.png"), c("Monk", "/stills/rs3/citizens/edgeville-2.png")],
	draynor: [c("Market guard", "/stills/rs3/citizens/draynor-1.png")],
	alkharid: [c("Palace guard", "/stills/rs3/citizens/alkharid-1.png")],
	prifddinas: [c("Elven door-warden", "/stills/rs3/citizens/prifddinas-1.png")]
};
var APE_OSRS = [
	c("Gorilla guard", "/stills/osrs/citizens/ape-gorilla.png"),
	c("Marim monkey", "/stills/osrs/citizens/ape-monkey.png"),
	c("Ninja ape", "/stills/osrs/citizens/ape-ninja.png")
];
var APE_RS3 = [
	c("Gorilla guard", "/stills/rs3/citizens/ape-gorilla.png"),
	c("Marim monkey", "/stills/rs3/citizens/ape-monkey.png"),
	c("Ninja ape", "/stills/rs3/citizens/ape-ninja.png")
];
var APE_SLUGS = /* @__PURE__ */ new Set([
	"apeatoll",
	"osrsape",
	"marim",
	"marimbo"
]);
var DEFAULT_OSRS = [c("Guard", "/stills/osrs/citizens/_default-0.png"), c("Stallholder", "/stills/osrs/citizens/_default-1.png")];
var DEFAULT_RS3 = [c("Guard", "/stills/rs3/citizens/_default-0.png"), c("Clerk", "/stills/rs3/citizens/_default-1.png")];
function citizenPool(id, game) {
	if (APE_SLUGS.has(id)) return game === "osrs" ? APE_OSRS : APE_RS3;
	const named = game === "osrs" ? OSRS$1[id] : RS3$1[id];
	const fallback = game === "osrs" ? DEFAULT_OSRS : DEFAULT_RS3;
	const base = named?.length ? named : [];
	const seen = new Set(base.map((row) => row.src ?? row.role));
	const extra = fallback.filter((row) => !seen.has(row.src ?? row.role));
	const pool = [...base, ...extra];
	return pool.length ? pool : fallback;
}
function citizenFor(id, game, now = Date.now()) {
	const pool = citizenPool(id, game);
	return pool[Math.floor(now / 3e5) % pool.length];
}
var QUIET = "Quiet on this ditch.";
var OSRS = {
	osrslumbridge: [
		"Guard: courtyard first. The meadow is grass. Leave a crater title home.",
		"Miller: the wheel turns. Goblins keep the east road.",
		"Clerk: the Duke’s name is on the writ. I do not sell a later age.",
		"Fisher on the river: Lum still means the water.",
		"Cook: the castle kitchen still burns the same stew.",
		"Guide: tutorial is a rumour. The bridge is the lesson."
	],
	osrsfalador: [
		"White Knight: walls hold. Kinshra are weather, not a timetable.",
		"Rising Sun keep: party room is still a room. Park is still a park.",
		"Guard: south gate to Port Sarim. North gate to the park.",
		"Smith: the furnace is work. I do not print a partyhat price.",
		"Park warden: white walls, green lawn. Slapstick lives next door.",
		"Knight on drill: honour is the report after the loot."
	],
	osrsvarrock: [
		"Stallholder: east market first. Palace second.",
		"Guard: fountain square. Slums keep their own hours.",
		"Exchange runner: tax is public. This desk does not print a price.",
		"Gertrude’s neighbour: the sill has a cat. Palaces inflate.",
		"Clerk: Roald’s name is on the writ. I sell bread.",
		"Sewer grate: Scurrius lives under the city. Confirm the hole on the wiki."
	],
	hosidius: [
		"Farmer: the fields are the house. Favour is the old word.",
		"Cook: kitchen and tithe. I do not sell a raid hour.",
		"Guard: south to the coast. North to the statue.",
		"Clerk: Spirit tree if the page still says so.",
		"Plough hand: the dirt is current. Leave a Varrock title home.",
		QUIET
	],
	osrsprif: [
		"Door-warden: Song of the Elves built this. No hour-clan on this card.",
		"Crystal-stall: eight towers. I do not sell a clan name.",
		"Guard: Gauntlet is downstairs. The street is the street.",
		"Singer: the song is public. Confirm the hour on the wiki.",
		"Clerk: Zalcano is a rock. This desk does not print a drop.",
		"Porter: Lletya was the camp. This is the city."
	],
	osrscani: [
		"Innkeep: Hair of the Dog. Humans without leave are prey.",
		"Tanner: Slayer Tower is upstairs. The village is the door.",
		"Guard: Salve is behind you. Keep walking.",
		"Temple acolyte: Zamorak’s house. I do not sell a later campaign.",
		"Wolf on the lane: Canifis keeps its voice down after dark.",
		QUIET
	],
	osrscath: [
		"Fisher: the spots and the range. You already know the dock.",
		"Guard: boat talk belongs at Port Sarim.",
		"Cook: the range is public. I do not print a shark price.",
		"Bank clerk: white wall of Falador is west. Leave it there.",
		"Net hand: Catherby is work, not a city title.",
		QUIET
	],
	osrsport: [
		"Dock warden: boat to Entrana. Bank the blade first.",
		"Guard: Karamja boat is the other slip. Pay the fare.",
		"Clerk: customs first. I do not sell a charter price.",
		"Sailor: Port Sarim searches you. That is the dock rule.",
		"Porter: Rimmington is a walk. The boat is the point.",
		"Fishmonger: the stalls smell like the slip."
	],
	osrstav: [
		"Druid: the dungeon mouth is under this. Leave a city title home.",
		"Guard: Burthorpe is up the path.",
		"Herblore stall: grimy is work. I do not print a potion price.",
		"Clerk: Guthix keeps the green. Falador keeps the walls.",
		"Novice: Taverley is a village with a hole under it.",
		QUIET
	],
	osrsburth: [
		"Imperial Guard: Death Plateau starts up that path.",
		"Games Room clerk: the games stay in the room.",
		"Smith: the anvil is work. I do not sell a war.",
		"Guard: Taverley is down the hill.",
		"Recruit: the plateau is a climb, not a postcard.",
		QUIET
	],
	osrsedge: [
		"Guard: monastery west. Ditch north. The line is the point.",
		"Monk: we keep the hill. Protect item if you step over.",
		"Adventurer at the ditch: cross it knowing the grammar.",
		"Clerk: Edgeville is a wall town. The wild is weather.",
		"Banker: jewellery on the body, not under the sharks.",
		"Watch: the ditch does not care what you meant."
	],
	osrsalk: [
		"Palace guard: silk and the gate. Leave Menaphos home.",
		"Stall: desert tax is the walk. I do not print a gem price.",
		"Clerk: the duel arena is a rumour the sand still tells.",
		"Guard: Shantay is south. The palace is here.",
		"Porter: Al Kharid is the gate, not a golden city.",
		QUIET
	],
	osrstears: [
		"Juna: the drip is the hour. Spectacle can wait.",
		"Guard of the chasm: he does not walk.",
		"Novice: one small weekly mercy under the swamp.",
		"Clerk: confirm the cave on the wiki. I do not sell a tear.",
		"Swamp guide: Lumbridge is up. The stone is down.",
		QUIET
	],
	osrszanaris: [
		"Market fairy: Dramen staff, then the stalls.",
		"Guard: Lost City is not a postcard.",
		"Clerk: rings first. I do not sell a plane.",
		"Porter: the canopy is the joke at surface kings.",
		"Stall: wheat and other people’s errands.",
		QUIET
	],
	osrsard: [
		"Knight of Ardougne: two towns, one wall. Pick a gate.",
		"East stall: market first. West remembers plague.",
		"Guard: zoo is a walk. The clocktower is a hole.",
		"Clerk: I do not sell a later campaign.",
		"Thief on the square: the stalls keep their own hours.",
		"West watch: the wall is the lesson."
	],
	osrsgnome: [
		"Gnome: spirit trees and the stronghold. Giant toads stay in the maze.",
		"Guard: Grand Tree is upstairs.",
		"Clerk: gliders if the page still says so.",
		"Cook: toad crunchies are work, not a joke I print.",
		"Porter: the canopy is the town.",
		QUIET
	],
	osrsseers: [
		"Seer: the bank is here. Camelot is next door.",
		"Guard: court and flax. Leave a palace title home.",
		"Clerk: I do not print a flax price.",
		"Porter: Catherby is the dock. This is the village.",
		"Watch: the elements stay in the workshop.",
		QUIET
	],
	osrsyan: [
		"Wizard: guild upstairs. Watchtower road.",
		"Guard: the wall holds. I do not sell a spell.",
		"Clerk: Yanille keeps its voice down.",
		"Porter: Port Khazard is a walk.",
		"Novice: the door is the lesson.",
		QUIET
	],
	osrssoph: [
		"Guard: the gate and the plague. Leave Menaphos home.",
		"Priest: Elidinis keeps the water. I do not sell a pyramid hour.",
		"Clerk: Sophanem is shut for a reason.",
		"Porter: the desert is thirst. Bank the skins.",
		"Watch: cats walk. Tourists argue.",
		QUIET
	],
	osrsape: [
		"Monkey at customs: greegree first. Humans stay on the boat.",
		"Gorilla guard: the temple is Marimbo’s. I do not sell a scim.",
		"Ninja ape: stall first. Speak ape or stay on the dock.",
		"Altar monkey: the statue is the law. Leave a Falador title home.",
		"Dock ape: the boat is the rule. Marim is the town.",
		"Quiet on this ditch."
	],
	osrsent: [
		"Monk at the slip: no weapons. No armour.",
		"Dock warden: Port Sarim searches you. That is the dock rule.",
		"Novice: the wipe is the item you forgot to bank.",
		"Clerk: Lost City begins in that vow.",
		"Watch: Entrana is not a fort.",
		"Gardener: the law is the pack, not the sermon."
	],
	osrsgob: [
		"Goblin: Big High War God lives in the huts.",
		"Guard: Diplomacy is politics. This is the yard.",
		"Clerk: I do not sell a general.",
		"Watch: green and red keep their own hours.",
		"Porter: Falador is down the road. Leave it there.",
		QUIET
	],
	osrsrel: [
		"Dock: the longhall first. Waterbirth is a boat, not this street.",
		"Guard: Fremennik tests stay on the wiki.",
		"Clerk: I do not sell a slayer helm.",
		"Fisher: the slip is work.",
		"Watch: Neitiznot is another boat.",
		QUIET
	],
	shayzien: [
		"Soldier: the camp. Lizardmen stay on the hill.",
		"Guard: Shayzien is a drill, not a farm.",
		"Clerk: I do not sell a raid.",
		"Watch: Hosidius is the dirt. This is the armour.",
		"Porter: the graveyard is a walk.",
		QUIET
	],
	lovakengj: [
		"Smith: blast mine and the forge.",
		"Guard: the sulphur is the weather.",
		"Clerk: I do not print a bar price.",
		"Watch: the house is the heat.",
		"Porter: Shayzien buys what we make.",
		QUIET
	],
	arceuus: [
		"Librarian: dark altar. Hours stay on the wiki.",
		"Guard: the tower is blood and books.",
		"Clerk: I do not sell a rune.",
		"Watch: Hosidius is green. This house is not.",
		"Porter: the library is the town.",
		QUIET
	],
	piscarilius: [
		"Dock: the port house. Thieving tiles if the page still says so.",
		"Guard: the ships keep their own hours.",
		"Clerk: I do not print a fish price.",
		"Watch: Kourend’s wet door.",
		"Porter: Shayzien is inland. Stay on the slip.",
		QUIET
	],
	fortis: [
		"Guard: Varlamore capital. Colosseum is on Bosses.",
		"Clerk: I do not sell a wave.",
		"Stall: the square is work. Leave a Varrock title home.",
		"Watch: the sun is different here.",
		"Porter: the gate is current. Confirm the hour on the wiki.",
		QUIET
	]
};
var RS3 = {
	lumbridge: [
		"Watch: strangers still appear. The crater is part of the walk now.",
		"Sexton: the bell and the rim of the wound share a town.",
		"Guard: rebuild is polite. The meadow remembers otherwise.",
		"Clerk: I do not sell a 2012 title. The street is later.",
		"Miller: the wheel turns over a different map.",
		"Porter: castle first. The wound is geography."
	],
	falador: [
		"White Knight: the square still performs order.",
		"Rising Sun keep: same postcode for piety and farce.",
		"Park warden: I sweep limestone. I do not print Kinshra hours.",
		"Guard: the walls have taken hits this client recorded.",
		"Smith: the furnace is work. Partyhats are a different yard.",
		"Clerk: south to the port. North to the park."
	],
	varrock: [
		"Palace clerk: the crown speaks. The Exchange answers in numbers.",
		"South-east stall: unrest is weather. I do not sell it.",
		"Square runner: tax is public. Gossip is not my stock.",
		"Guard: fountain and palace. Slums keep their own hours.",
		"Porter: the GE is a walk west. This is the city.",
		"Clerk: I do not print a price."
	],
	prifddinas: [
		"Tower door: Voice of Seren is a pulse. Confirm it on Today.",
		"Crystal-stall: the hour will turn. This desk will not name the clan.",
		"Clerk: no clan pair on this card. The clock is enough.",
		"Guard: eight towers, one voice. I sweep the stair.",
		"Singer: the song is public. I do not sell a drop.",
		"Porter: Lletya was the camp. This is the clock-face."
	],
	canifis: [
		"Innkeep: Hair of the Dog. The fog is the law.",
		"Tanner: Drakan’s weather. I do not sell a later campaign.",
		"Guard: Slayer Tower is upstairs.",
		"Clerk: humans without leave are prey.",
		"Watch: the Salve is behind you.",
		QUIET
	],
	catherby: [
		"Fisher: spots and a range. You already know the dock.",
		"Guard: the boat talk belongs at Port Sarim.",
		"Cook: the range is public.",
		"Clerk: I do not print a shark price.",
		"Porter: white walls are west.",
		QUIET
	],
	portsarim: [
		"Dock: boats and the Entrana rule start here.",
		"Guard: customs first. Bank the blade.",
		"Clerk: I do not sell a charter price.",
		"Sailor: Karamja is the other slip.",
		"Porter: Falador is up the road.",
		"Fishmonger: the stalls smell like the slip."
	],
	taverley: [
		"Druid: dungeon mouth under the green.",
		"Guard: Burthorpe is up the path.",
		"Clerk: Guthix keeps the village.",
		"Herblore stall: grimy is work.",
		"Porter: Falador keeps the walls.",
		QUIET
	],
	burthorpe: [
		"Imperial Guard: the yard and the plateau.",
		"Games Room clerk: the games stay in the room.",
		"Smith: the anvil is work.",
		"Watch: Taverley is down the hill.",
		"Recruit: I do not sell a war.",
		QUIET
	],
	edgeville: [
		"Guard: the ditch is still a dare in this client. Protect item.",
		"Monk: the hill holds. I do not price the wilderness.",
		"Adventurer: the line is the point.",
		"Clerk: Edgeville is a wall town.",
		"Banker: jewellery on the body.",
		"Watch: the ditch does not care what you meant."
	],
	alkharid: [
		"Palace guard: silk and the desert gate.",
		"Stall: I do not print a gem price.",
		"Clerk: Menaphos is another city. This is the gate.",
		"Guard: Shantay is south.",
		"Porter: the palace is here.",
		QUIET
	],
	daemonheim: [
		"Ring warden: floors live downstairs.",
		"Guard: a lobby is not a fight.",
		"Clerk: I do not sell a floor.",
		"Porter: the sinkhole is weather. Confirm the hour.",
		"Watch: Fremennik stone. Leave a city title home.",
		QUIET
	],
	menaphos: [
		"Gate clerk: four districts. The gates opened.",
		"River porter: sun and river. Confirm the hour on the wiki.",
		"Stall: the golden city is work. Leave an Old School shut-gate title home.",
		"Guard: Sophanem is the other door.",
		"Clerk: I do not invent a God Wars seat.",
		"Watch: the districts keep their own hours."
	],
	lostgrove: [
		"Warden: Solak’s wood. Leave the GP/hour title home.",
		"Guard: the grove is a fight on Bosses.",
		"Clerk: I do not sell an enrage.",
		"Porter: Anachronia is the island after.",
		"Watch: the trees keep their own hours.",
		QUIET
	],
	tears: [
		"Juna: the drip is the hour.",
		"Guard of the chasm: spectacle can wait.",
		"Clerk: confirm the cave on the wiki.",
		"Novice: a small weekly mercy.",
		"Porter: Lumbridge is up.",
		QUIET
	],
	zanaris: [
		"Market fairy: Lost City on later stones.",
		"Guard: rings first.",
		"Clerk: I do not sell a plane.",
		"Porter: the canopy is the joke.",
		"Stall: other people’s errands.",
		QUIET
	],
	ardougne: [
		"Knight: west clocktower. East market.",
		"Stall: two towns, one wall.",
		"Guard: I do not sell a later campaign.",
		"Clerk: the zoo is a walk.",
		"Watch: plague memory stays west.",
		"Porter: pick a gate."
	],
	gnome: [
		"Gnome: stronghold canopy. Toads stay in the maze.",
		"Guard: Grand Tree upstairs.",
		"Clerk: gliders if the page still says so.",
		"Cook: crunchies are work.",
		"Porter: the trees are the town.",
		QUIET
	],
	seers: [
		"Seer: Camelot is next door. The bank is here.",
		"Guard: flax and court.",
		"Clerk: I do not print a flax price.",
		"Porter: Catherby is the dock.",
		"Watch: leave a palace title home.",
		QUIET
	],
	anachronia: [
		"Ranger: the island after the island.",
		"Guard: dinosaurs are a thesis about time.",
		"Clerk: I do not sell a base camp hour.",
		"Porter: the grove is another door.",
		"Watch: confirm the landing on the wiki.",
		QUIET
	],
	yanille: [
		"Wizard: Wizards’ Guild. You already know the door.",
		"Guard: the wall holds.",
		"Clerk: I do not sell a spell.",
		"Porter: Watchtower road.",
		"Watch: Yanille keeps its voice down.",
		QUIET
	],
	draynor: [
		"Market guard: willows, bank, and a village that remembers worse nights.",
		"Willow cutter: the trees are the work.",
		"Bank clerk: I do not discuss the manor after dark.",
		"Watch: Draynor keeps its voice down.",
		"Porter: Lumbridge is east. The willows are here.",
		QUIET
	],
	grandexchange: [
		"Clerk: tax is public. This desk does not print a price.",
		"Runner: four clerks, one floor.",
		"Guard: Varrock is east. The Exchange is the work.",
		"Porter: I do not sell a flip.",
		"Watch: the geode is not a sermon.",
		"Stall: leave the bank tab home."
	],
	empyrean: [
		"Warden: Armadyl’s hall after the edicts.",
		"Guard: the citadel is a hall, not a farm.",
		"Clerk: I do not sell a wing.",
		"Porter: confirm the hour on the wiki.",
		"Watch: altitude first.",
		QUIET
	],
	senntisten: [
		"Clerk: Zarosian stone. The cathedral is the still.",
		"Guard: the front is a fight on Bosses.",
		"Porter: I do not sell an enrage.",
		"Watch: Empty Lord ledgers stay on the wiki.",
		"Acolyte: the street is the ruin you can walk.",
		QUIET
	],
	sophanem: [
		"Guard: plague city. The gate is the lesson.",
		"Priest: Elidinis keeps the water.",
		"Clerk: Menaphos is the other door.",
		"Porter: bank the skins.",
		"Watch: cats walk. Tourists argue.",
		QUIET
	],
	apeatoll: [
		"Monkey at customs: greegree first. Humans stay on the boat.",
		"Gorilla guard: the temple is Marimbo’s. I do not sell a scim.",
		"Ninja ape: stall first. Speak ape or stay on the dock.",
		"Altar monkey: the statue is the law. Leave a Falador title home.",
		"Dock ape: the boat is the rule. Marim is the town.",
		"Quiet on this ditch."
	],
	goblin: [
		"Goblin: Big High War God lives in the huts.",
		"Guard: this is the yard.",
		"Clerk: I do not sell a general.",
		"Watch: green and red keep their own hours.",
		"Porter: Falador is down the road.",
		QUIET
	],
	heart: [
		"Warden: four houses. Confirm the wing on the wiki.",
		"Guard: the Heart is a fight on Bosses.",
		"Clerk: I do not sell an enrage.",
		"Porter: leave a city title home.",
		"Watch: the houses keep their own hours.",
		QUIET
	],
	entrana: [
		"Monk: no weapons. No armour.",
		"Dock: Port Sarim searches you.",
		"Novice: the wipe is the item you forgot to bank.",
		"Clerk: Entrana is not a fort.",
		"Watch: the law is the pack.",
		"Gardener: I do not sell a sword."
	],
	cityofum: [
		"Ferry: the living walk as guests. The dead keep the market.",
		"Necromancer: Rasial’s shadow is on the stone. That fight is on Bosses.",
		"Clerk: I do not sell an enrage.",
		"Watch: confirm the hour on the wiki.",
		"Porter: the dock is the town.",
		QUIET
	],
	warsretreat: [
		"Clerk: hub, not a kill. Leave the GP/hour title home.",
		"Guard: the retreat is a lobby.",
		"Porter: I do not sell a streak.",
		"Watch: confirm the instance on the wiki.",
		"Warden: gear here. Die elsewhere.",
		QUIET
	],
	darkmeyer: [
		"Vyrewatch: these streets are not Canifis.",
		"Clerk: wear the right colours.",
		"Guard: Meiyerditch is below.",
		"Porter: I do not sell a vyre.",
		"Watch: the capital keeps its own hours.",
		QUIET
	],
	rellekka: [
		"Dock: longhall first. The boat is later.",
		"Guard: Fremennik tests stay on the wiki.",
		"Fisher: the slip is work.",
		"Clerk: I do not sell a slayer helm.",
		"Watch: Waterbirth is a boat, not this street.",
		QUIET
	],
	keldagrim: [
		"Clerk: under the mountain. Consortium halls.",
		"Guard: the blast is work.",
		"Porter: I do not print a bar price.",
		"Watch: the city is the hall.",
		"Smith: leave a surface title home.",
		QUIET
	],
	phasmatys: [
		"Dock: ectoplasm and the slip.",
		"Guard: the town is the veil.",
		"Clerk: I do not sell a token.",
		"Watch: Canifis is inland.",
		"Porter: pay the fare if the page still says so.",
		QUIET
	],
	lletya: [
		"Warden: refugee camp before the city stands.",
		"Guard: Prifddinas is the later street.",
		"Clerk: I do not sell a crystal.",
		"Watch: the trees keep their own hours.",
		"Porter: Tirannwn is the walk.",
		QUIET
	],
	fortforinthry: [
		"Guard: the fort after the fort.",
		"Clerk: I do not sell a contract hour.",
		"Watch: the ditch is north. Confirm the wall on the wiki.",
		"Porter: Edgeville is a different grammar.",
		"Warden: rebuild is work.",
		QUIET
	],
	waiko: [
		"Dock: the Arc. Voyages, not a mainland bank.",
		"Guard: I do not sell a contract.",
		"Clerk: confirm the island on the wiki.",
		"Porter: the boat is the town.",
		"Watch: leave a Varrock title home.",
		QUIET
	]
};
function poolOf(id, game) {
	const out = [...(game === "osrs" ? OSRS[id] : RS3[id]) ?? []];
	while (out.length < 6) out.push(QUIET);
	return out.slice(0, Math.max(6, out.length));
}
function streetTalk(id, game) {
	return poolOf(id, game);
}
function streetLine(id, game, now = Date.now()) {
	const pool = streetTalk(id, game);
	return pool[Math.floor(now / 3e5) % pool.length] ?? QUIET;
}
function townWikiLinks(title, loc) {
	const path = encodeURI(title.replace(/ /g, "_"));
	if (!loc) return [];
	if (loc.edition === "OSRS") {
		const href = placeLore(loc)?.sourceUrl ?? `https://oldschool.runescape.wiki/w/${path}`;
		return [{
			label: `${title} · Old School wiki`,
			href
		}];
	}
	const href = placeLore(loc)?.sourceUrl ?? `https://runescape.wiki/w/${path}`;
	return [{
		label: `${title} · RuneScape wiki`,
		href
	}];
}
function TownNotePage() {
	const { id } = Route.useParams();
	const note = townNote(id);
	const loc = LOCATIONS.find((item) => item.id === id) ?? LOCATIONS.find((item) => item.name === note?.title);
	if (!note) throw notFound();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "border-b border-line px-5 py-5 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackLink, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "page-h1 site-title mt-1",
					children: note.title
				}),
				loc ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-center text-sm text-muted",
					children: [
						loc.region.replace(/\s·\sOSRS$/, ""),
						" ·",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLink, {
							href: godPath(loc.god),
							className: "no-underline",
							style: { color: godInk(loc.god) },
							children: loc.god
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: note.region
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-2 block h-px w-24 bg-[#c6a45a]/80",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceRail, { section: "towns" })
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto flex max-w-3xl flex-col gap-5 px-5 py-6 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfficialPulse, {
					note: "Official wiki for this street. Official news wins.",
					links: townWikiLinks(note.title, loc)
				}),
				loc ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TownCycle, {
					loc,
					title: note.title
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold text-parchment",
					children: "Lore"
				}),
				note.lore.map((para) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: para
				}, para)),
				note.history?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold text-parchment",
					children: "History"
				}), note.history.map((para) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: para
				}, para))] }) : null,
				loc ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StreetAndHour, {
					loc,
					wiki: placeLore(loc)?.sourceUrl
				}) : null,
				loc && placeLore(loc) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: placeLore(loc).sourceUrl,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "text-parchment",
						children: "Read the live page"
					})
				}) : null,
				loc ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SisterPlace, {
					id: loc.id,
					name: loc.name,
					edition: loc.edition
				}) : null,
				loc ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold text-parchment",
					children: "Places to visit"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VisitPlaces, { items: [
					{
						href: godPath(loc.god),
						label: loc.god,
						color: godInk(loc.god)
					},
					...LOCATIONS.filter((row) => row.id !== loc.id && row.kind === "town" && row.god === loc.god && townNote(row.id)).slice(0, 8).map((row) => ({
						href: townPath(row.id),
						label: `${row.name}${row.edition === "OSRS" ? " · OSRS" : ""}`,
						current: row.id === loc.id
					})),
					...LOCATIONS.filter((row) => row.kind === "boss" && row.god === loc.god && noteFor(row.id)).slice(0, 4).map((row) => ({
						href: bossPath(row.id),
						label: row.name
					}))
				] })] }) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-faint",
					children: "Fan desk notes. Live page: the official wiki for this game."
				}),
				loc ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UseOnBanner, {
					src: loc.viewA,
					edition: loc.edition,
					placeId: loc.id
				}) : null
			]
		})]
	});
}
function TownCycle({ loc, title }) {
	const src = loc.viewA;
	const game = loc.edition === "OSRS" ? "Old School RuneScape" : "RuneScape";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src,
		alt: `${title} in ${game}`,
		className: "aspect-[21/9] w-full rounded-md border border-line object-cover"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
		className: "mt-1 text-xs text-faint",
		children: townStillLine(loc.id)
	})] });
}
function SisterPlace({ id, name, edition }) {
	const sister = edition === "OSRS" ? LOCATIONS.find((item) => item.edition === "RS3" && item.name === name) : LOCATIONS.find((item) => item.edition === "OSRS" && item.name === name);
	if (!sister) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/towns/$id",
			params: { id: sister.id },
			className: "text-parchment",
			children: edition === "OSRS" ? "Same name in RuneScape" : "Same name in Old School RuneScape"
		})
	});
}
function StreetAndHour({ loc, wiki }) {
	const now = useVisibleNow(1e3);
	const game = loc.edition === "OSRS" ? "osrs" : "rs3";
	const line = streetLine(loc.id, game, now);
	const notice = noticeFor(loc.id, game);
	const citizen = citizenFor(loc.id, game, now);
	const gameLabel = game === "osrs" ? "Old School RuneScape" : "RuneScape";
	const alt = `${citizen.role} of ${loc.name}, ${gameLabel}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-sm font-semibold text-parchment",
			children: "From the street"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
			className: "citizen-cite flex flex-wrap items-center gap-3",
			children: [
				citizen.src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: citizen.src,
					alt,
					width: 72,
					height: 72,
					className: "h-[72px] w-[72px] shrink-0 object-contain object-bottom",
					onError: (e) => {
						e.currentTarget.remove();
					}
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
					className: "min-w-[12rem] flex-1 text-sm leading-snug text-parchment/80",
					style: { fontFamily: "Fondamento, serif" },
					children: [
						"“",
						line,
						"”"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
					className: "w-full text-[11px] text-muted",
					children: [
						citizen.role,
						" · ",
						gameLabel
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-faint",
			children: "Fan flavour."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-sm font-semibold text-parchment",
			children: "This hour"
		}),
		notice ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm text-muted",
			children: [
				notice.line,
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: notice.url,
					target: "_blank",
					rel: "noopener noreferrer",
					className: "text-parchment",
					children: notice.kind === "news" ? "Official news" : "Wiki"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-faint",
					children: [" · ", notice.date]
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm text-muted",
			children: ["No official notice for this street. The wiki keeps the hour.", wiki ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [" ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: wiki,
				target: "_blank",
				rel: "noopener noreferrer",
				className: "text-parchment",
				children: "Wiki"
			})] }) : null]
		})
	] });
}
//#endregion
export { TownNotePage as component };
