import { n as GODS } from "./locations-CLZLnwld.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gods-9ecR_EMd.js
/** Prayer-book / God Wars colours from the live clients. */
var GOD_INK = {
	Saradomin: "#3a6fd4",
	Zamorak: "#c62828",
	Guthix: "#3d8b3d",
	Armadyl: "#c5d4e8",
	Bandos: "#8b6914",
	Seren: "#5ec8d4",
	Zaros: "#7b3fa0",
	Sliske: "#c4a35a",
	Tumeken: "#d4a017",
	Elidinis: "#2a9b8f",
	Marimbo: "#b85c38"
};
function godInk(god) {
	return GOD_INK[god] ?? "#e0b45c";
}
var GOD_SLUGS = {
	Saradomin: "saradomin",
	Zamorak: "zamorak",
	Guthix: "guthix",
	Armadyl: "armadyl",
	Bandos: "bandos",
	Seren: "seren",
	Zaros: "zaros",
	Sliske: "sliske",
	Tumeken: "tumeken",
	Elidinis: "elidinis",
	Marimbo: "marimbo"
};
function godFromSlug(slug) {
	const lower = slug.toLowerCase();
	return GODS.find((god) => GOD_SLUGS[god] === lower);
}
var GOD_HOME = {
	saradomin: {
		osrs: "falador",
		rs3: "falador"
	},
	zamorak: {
		osrs: "edgeville",
		rs3: "edgeville"
	},
	guthix: {
		osrs: "tav",
		rs3: "taverley"
	},
	armadyl: {
		osrs: "falador",
		rs3: "falador"
	},
	bandos: {
		osrs: "gob",
		rs3: "goblin"
	},
	seren: {
		osrs: "prif",
		rs3: "prifddinas"
	},
	zaros: { rs3: "senntisten" },
	sliske: { rs3: "senntisten" },
	tumeken: {
		osrs: "alk",
		rs3: "menaphos"
	},
	elidinis: {
		osrs: "soph",
		rs3: "sophanem"
	},
	marimbo: { osrs: "ape" }
};
function deskGodPath(godSlug, game) {
	const place = GOD_HOME[godSlug]?.[game];
	if (!place) return "";
	return `/?game=${game}&place=${encodeURIComponent(place)}&marks=${encodeURIComponent(godSlug)}#desk`;
}
var GOD_BRIEFS = {
	Saradomin: {
		god: "Saradomin",
		title: "God of order",
		domain: "Order, law, and the human crownlands",
		status: "Walks Gielinor in RuneScape 3 Sixth Age writing. Still worshipped in Old School.",
		summary: "Saradomin is the face of order in both clients: White Knights, Entrana, Lumbridge church.",
		osrs: "In Old School RuneScape he is a prayer-god and a God Wars house. White Knights hold Falador. Entrana bans weapons at the Port Sarim boat. Commander Zilyana holds his chamber. There is no Sixth Age landfall and no walking Saradomin in that client.",
		rs3: "RuneScape 3 published history treats him as a former justicar of Teragard who found the Elder Crown. After Sliske killed Guthix the Edicts fell and Saradomin returned. The Battle of Lumbridge is that return on the meadow.",
		notes: [
			"Symbol: four-point star. Colours: blue and white.",
			"Entrana bans weapons in both clients. That is a stream rule, not flavour.",
			"Commander Zilyana holds his God Wars dungeon."
		],
		play: ["Banner: Falador, Lumbridge, Entrana, Grand Exchange.", "Old School fight: Zilyana. RuneScape 3: the same house plus Sixth Age sites."],
		source: "RuneScape Wiki: Saradomin/History, Entrana, The World Wakes.",
		wikiOsrs: "https://oldschool.runescape.wiki/w/Saradomin",
		wikiRs3: "https://runescape.wiki/w/Saradomin"
	},
	Zamorak: {
		god: "Zamorak",
		title: "God of chaos",
		domain: "Chaos, rebellion, and the breaking of empires",
		status: "Active. Returned after the Edicts fell in RuneScape 3.",
		summary: "Zamorak was a Mahjarrat general of Zaros who used the Staff of Armadyl and rose.",
		osrs: "Old School keeps the chaos altar, the Wilderness cults, and K'ril Tsutsaroth. There is no Battle of Lumbridge crater and no Infernal Source world event in that client.",
		rs3: "RuneScape 3 plays his return after the Edicts fell, the Battle of Lumbridge, and Zamorak, Lord of Chaos at the Infernal Source.",
		notes: [
			"Not an Elder God. He stole godhood.",
			"K'ril Tsutsaroth leads his God Wars force.",
			"Canifis, Darkmeyer, and Port Phasmatys sit on this map."
		],
		play: ["Banner: Canifis, Edgeville, Darkmeyer.", "Old School fight: K'ril. RuneScape 3: Zamorak Lord of Chaos at the Infernal Source."],
		source: "RuneScape Wiki: Zamorak, Staff of Armadyl, God Wars Dungeon.",
		wikiOsrs: "https://oldschool.runescape.wiki/w/Zamorak",
		wikiRs3: "https://runescape.wiki/w/Zamorak"
	},
	Guthix: {
		god: "Guthix",
		title: "God of balance",
		domain: "Balance, nature, and the shaping of Gielinor",
		status: "Slain in RuneScape 3 Fifth Age year 169. Still a prayer-god in Old School.",
		summary: "Guthix found the blank plane, named it Gielinor, then slept. Tears of Guthix, Taverley, and Zanaris are the Guthix sites on this desk.",
		osrs: "Old School does not play The World Wakes. The Guthix altar and Juna’s cavern still work. He remains a prayer-god. The Edicts falling is not current history in that client.",
		rs3: "In RuneScape 3 Sliske killed Guthix with the Staff of Armadyl in Fifth Age year 169. The Edicts fell. The Sixth Age began. Do not title a main-game stream as if he still walks.",
		notes: ["Juna still keeps the Tears cavern in both clients.", "Old School does not play The World Wakes. The altar still works."],
		play: ["Banner: Zanaris, Tears of Guthix, Taverley, Tree Gnome Stronghold.", "Do not title a stream “Guthix lives” on the main game. The wiki is the status."],
		source: "RuneScape Wiki: Guthix, Edicts of Guthix, The World Wakes.",
		wikiOsrs: "https://oldschool.runescape.wiki/w/Guthix",
		wikiRs3: "https://runescape.wiki/w/Guthix"
	},
	Armadyl: {
		god: "Armadyl",
		title: "God of justice",
		domain: "Justice, peace, and the aviantese of Abbinah",
		status: "Alive. Fought Bandos in The Bird and the Beast on RuneScape 3.",
		summary: "Armadyl is a winged god from Abbinah. Kree'arra holds the Eyrie.",
		osrs: "Old School fights Kree'arra in the God Wars Dungeon. The Staff of Armadyl appears in Temple of Ikov. There is no Bird and the Beast world event in that client.",
		rs3: "RuneScape 3 returned him after the Edicts. He killed Bandos in The Bird and the Beast. The Empyrean Citadel is the Armadyl still on this desk.",
		notes: ["The Staff is the Siphon, one of twelve Elder Artefacts.", "Justice is the published theme. He is not an Elder God."],
		play: ["Banner: Empyrean Citadel.", "Old School fight: Kree'arra. RuneScape 3: the same dungeon plus the citadel."],
		source: "RuneScape Wiki: Armadyl, Empyrean Citadel, The Bird and the Beast.",
		wikiOsrs: "https://oldschool.runescape.wiki/w/Armadyl",
		wikiRs3: "https://runescape.wiki/w/Armadyl"
	},
	Bandos: {
		god: "Bandos",
		title: "God of war",
		domain: "War, strength, and the goblin nations",
		status: "Killed by Armadyl in The Bird and the Beast. Still worshipped in Old School.",
		summary: "Bandos brought goblins, ogres, and orks to Gielinor. Graardor holds the Stronghold.",
		osrs: "Old School still treats Bandos as a living God Wars faction. Graardor is the commander. Goblin Village argues mail colour. Lovakengj sits on this colour in Great Kourend.",
		rs3: "RuneScape 3 ends his life in The Bird and the Beast. The Mighty Fall is the aftermath. Do not write that death onto an Old School card.",
		notes: ["Big High War God is the goblin name in quest text.", "Old School still treats Bandos as a living God Wars faction."],
		play: ["Banner: Goblin Village, Burthorpe, Lovakengj.", "Old School fight: Graardor. RuneScape 3: Graardor plus Mazcab raids."],
		source: "RuneScape Wiki: Bandos, Goblin Village, The Bird and the Beast.",
		wikiOsrs: "https://oldschool.runescape.wiki/w/Bandos",
		wikiRs3: "https://runescape.wiki/w/Bandos"
	},
	Seren: {
		god: "Seren",
		title: "Goddess of the elves",
		domain: "Crystal, harmony, and Tirannwn",
		status: "Restored in RuneScape 3. Present in Old School Prifddinas.",
		summary: "Seren is crystal light. She led the elves to Tirannwn and built Prifddinas.",
		osrs: "Old School restores the city through Song of the Elves. Voice of Seren is not an Old School hour flip on this desk. The crystal city is post-SotE geography only.",
		rs3: "RuneScape 3 restores Seren after she shattered herself rather than leave under the Edicts. Voice of Seren flips on the UTC hour in the clan districts. Fate of the Gods is her RS3 record with Zaros.",
		notes: ["Clan crystals are pieces of her city.", "Transcendent-tier in published rankings. Not an Elder God."],
		play: ["Banner: Prifddinas, Lletya, Gauntlet.", "Check Voice of Seren on Today before you title a crystal hour."],
		source: "RuneScape Wiki: Seren, Prifddinas, Fate of the Gods.",
		wikiOsrs: "https://oldschool.runescape.wiki/w/Seren",
		wikiRs3: "https://runescape.wiki/w/Seren"
	},
	Zaros: {
		god: "Zaros",
		title: "Empty Lord",
		domain: "Control, fate, and the Second Age empire",
		status: "Returned in RuneScape 3 (Fate of the Gods). Not a walking god in Old School.",
		summary: "Zaros built Senntisten in the Second Age. Zamorak struck him with the Staff of Armadyl.",
		osrs: "Old School has Zarosian prayers, Nex, and Desert Treasure II. He does not walk the world. Fate of the Gods is not that client.",
		rs3: "RuneScape 3 returns him in Fate of the Gods. Telos, Angel of Death, and Senntisten sit on this colour.",
		notes: ["Nex and Azzanadra are published Zarosian champions.", "Old School has Zarosian prayers and archaeology, not Fate of the Gods."],
		play: ["Banner: Senntisten, War's Retreat, Heart of Gielinor.", "Old School fight: Nex, Olm, DT2. RuneScape 3: Telos, AoD, Croesus."],
		source: "RuneScape Wiki: Zaros, Senntisten, Fate of the Gods.",
		wikiOsrs: "https://oldschool.runescape.wiki/w/Zaros",
		wikiRs3: "https://runescape.wiki/w/Zaros"
	},
	Sliske: {
		god: "Sliske",
		title: "Mahjarrat of the Shadow Realm",
		domain: "Deception, the Shadow Realm, and contests among gods",
		status: "Killed in Sliske's Endgame. Not a founder god.",
		summary: "Sliske is a Mahjarrat, not a creator. Treat him as an antagonist on the banner, not a church.",
		osrs: "Old School has no Sliske raid and no walking Sliske. Do not put him on an OSRS town card as a local god.",
		rs3: "RuneScape 3: he took the Staff of Armadyl, killed Guthix, and ran the Heart contest. Sliske's Endgame ends that plot. Gregorovic and the City of Um sit here.",
		notes: ["Killing Guthix did not make him an Elder God.", "Gregorovic and the City of Um sit on this colour here."],
		play: ["Banner: Heart of Gielinor, City of Um, Sanctum of Rebirth.", "RuneScape 3 fight: Rasial, Gregorovic. Old School has no Sliske raid."],
		source: "RuneScape Wiki: Sliske, The World Wakes, Sliske's Endgame.",
		wikiOsrs: "https://oldschool.runescape.wiki/w/Sliske",
		wikiRs3: "https://runescape.wiki/w/Sliske"
	},
	Tumeken: {
		god: "Tumeken",
		title: "God of the sun",
		domain: "Sun, light, and the Menaphite pantheon",
		status: "Spent or fragmented in published desert myth. Menaphos still names him.",
		summary: "Tumeken is the sun god of the Kharidian pantheon and husband of Elidinis.",
		osrs: "Old School: Al Kharid, Sophanem, Tombs of Amascut, Kalphite Queen. No Sixth Age Menaphos district plot required to banner the desert.",
		rs3: "RuneScape 3: Menaphos names him. Kalphite King is the RS3 desert fight on this colour. Do not invent a God Wars seat for him.",
		notes: ["Al Kharid, Menaphos, and Civitas Fortis sit on this colour here.", "Kalphite King and Queen are desert fights, not church rites."],
		play: ["Banner: Al Kharid, Menaphos, Fortis.", "Old School fight: Tombs of Amascut, Kalphite Queen. RuneScape 3: Menaphos, Kalphite King."],
		source: "RuneScape Wiki: Tumeken, Menaphos, Menaphite Pantheon.",
		wikiOsrs: "https://oldschool.runescape.wiki/w/Tumeken",
		wikiRs3: "https://runescape.wiki/w/Tumeken"
	},
	Elidinis: {
		god: "Elidinis",
		title: "Goddess of fertility and the river",
		domain: "Growth, water, and Sophanem",
		status: "Active in published desert lore.",
		summary: "Elidinis is Tumeken's consort and the goddess of the River Elid.",
		osrs: "Old School Sophanem keeps funerary rites. Menaphos’s gates stay shut. Short record. Do not pad with RS3 district plot.",
		rs3: "RuneScape 3 desert quests keep her beside Icthlarin. Sophanem and the river are the stills.",
		notes: ["The River Elid is named for her.", "Sophanem's plague and pyramids sit in both desert questlines."],
		play: ["Banner: Sophanem.", "Read the desert quest notes before you title a Sophanem hour."],
		source: "RuneScape Wiki: Elidinis, Sophanem, River Elid.",
		wikiOsrs: "https://oldschool.runescape.wiki/w/Elidinis",
		wikiRs3: "https://runescape.wiki/w/Elidinis"
	},
	Marimbo: {
		god: "Marimbo",
		title: "Goddess of monkeys and revelry",
		domain: "Ape Atoll, drink, and simian kind",
		status: "Alive in published lore. Thinner record than the God Wars four.",
		summary: "Marimbo is the goddess of monkeys. Ape Atoll and Marim are her home.",
		osrs: "Old School reaches the island through Monkey Madness. Temple of Marimbo stands in Marim. She is not a God Wars four.",
		rs3: "RuneScape 3 keeps the same island record. Do not invent a Sixth Age war for her.",
		notes: ["Temple of Marimbo stands in Marim.", "Stay inside that short record. Do not invent a Sixth Age war for her."],
		play: ["Banner: Ape Atoll.", "Quest line first. The island is the still."],
		source: "RuneScape Wiki: Marimbo, Ape Atoll, Marim.",
		wikiOsrs: "https://oldschool.runescape.wiki/w/Marimbo",
		wikiRs3: "https://runescape.wiki/w/Marimbo"
	}
};
//#endregion
export { godInk as a, godFromSlug as i, GOD_SLUGS as n, deskGodPath as r, GOD_BRIEFS as t };
