//#region node_modules/.nitro/vite/services/ssr/assets/locations-CLZLnwld.js
var GODS = [
	"Saradomin",
	"Zamorak",
	"Guthix",
	"Armadyl",
	"Bandos",
	"Seren",
	"Zaros",
	"Sliske",
	"Tumeken",
	"Elidinis",
	"Marimbo"
];
var ASSET_REV = "20260904i";
function asset(path) {
	return `${path}?v=${ASSET_REV}`;
}
function stillAllowed(path, edition) {
	const p = path.toLowerCase();
	if (edition === "OSRS") {
		if (p.includes("/rs3") || p.includes("rs3-") || p.includes("/rsc/") || p.includes("rsc-")) return false;
	}
	if (edition === "RS3") {
		if (p.includes("/osrs") || p.includes("osrs-") || p.includes("/rsc/") || p.includes("rsc-")) return false;
	}
	return true;
}
function loc(id, name, region, god, edition, kind, extra = {}) {
	const viewA = extra.viewA ?? (kind === "boss" ? asset(`/stills/${edition === "OSRS" ? "osrs" : "rs3"}/boss-${id}.jpg`) : asset(`/locations/${id}.jpg`));
	const viewB = extra.viewB && stillAllowed(extra.viewB, edition) ? extra.viewB : void 0;
	const safeA = stillAllowed(viewA, edition) ? viewA : viewA;
	const stills = [
		safeA,
		viewB,
		...(extra.stills ?? []).filter((src) => stillAllowed(src, edition))
	].filter((src, i, arr) => Boolean(src) && arr.indexOf(src) === i);
	return {
		id,
		name,
		region,
		god,
		edition,
		kind,
		nightSrc: viewB ?? safeA,
		auraSrc: safeA,
		source: extra.source ?? "unknown",
		stills,
		...extra,
		viewA: safeA,
		viewB,
		viewALabel: extra.viewALabel ?? extra.pairA ?? "A",
		viewBLabel: viewB ? extra.viewBLabel ?? extra.pairB ?? "B" : void 0
	};
}
var LOCATIONS = [
	loc("lumbridge", "Lumbridge", "Misthalin", "Saradomin", "RS3", "town", {
		viewA: asset("/locations/rs3-lumbridge-a.jpg"),
		viewB: asset("/locations/rs3-lumbridge-b.jpg"),
		viewALabel: "A",
		viewBLabel: "B",
		source: "wiki-file",
		filePage: "https://runescape.wiki/w/File:Lumbridge.png",
		stills: [asset("/locations/lumbridge.jpg"), asset("/locations/lumbridge-nightstone.jpg")]
	}),
	loc("falador", "Falador", "Asgarnia", "Saradomin", "RS3", "town", {
		viewA: asset("/locations/rs3-falador-a.jpg"),
		viewALabel: "A",
		source: "wiki-file",
		filePage: "https://runescape.wiki/w/File:Falador.png"
	}),
	loc("varrock", "Varrock", "Misthalin", "Saradomin", "RS3", "town", {
		viewA: asset("/locations/rs3-varrock-a.jpg"),
		viewB: asset("/locations/rs3-varrock-b.jpg"),
		viewALabel: "Square",
		viewBLabel: "Palace",
		source: "wiki-file",
		filePage: "https://runescape.wiki/w/File:Varrock.png"
	}),
	loc("prifddinas", "Prifddinas", "Tirannwn", "Seren", "RS3", "town"),
	loc("canifis", "Canifis", "Morytania", "Zamorak", "RS3", "town"),
	loc("catherby", "Catherby", "Kandarin", "Saradomin", "RS3", "town"),
	loc("portsarim", "Port Sarim", "Asgarnia", "Saradomin", "RS3", "town"),
	loc("taverley", "Taverley", "Asgarnia", "Guthix", "RS3", "town"),
	loc("burthorpe", "Burthorpe", "Asgarnia", "Bandos", "RS3", "town"),
	loc("edgeville", "Edgeville", "Misthalin", "Zamorak", "RS3", "town"),
	loc("alkharid", "Al Kharid", "Kharidian", "Tumeken", "RS3", "town"),
	loc("daemonheim", "Daemonheim", "Fremennik", "Zaros", "RS3", "town"),
	loc("menaphos", "Menaphos", "Kharidian", "Tumeken", "RS3", "town"),
	loc("lostgrove", "Lost Grove", "Anachronia", "Guthix", "RS3", "town"),
	loc("tears", "Tears of Guthix", "Lumbridge Swamp", "Guthix", "RS3", "town", {
		skies: "pair",
		pairA: "Juna",
		pairB: "Cavern",
		viewA: asset("/locations/tears.jpg"),
		viewB: asset("/locations/tears-nightstone.jpg"),
		viewALabel: "Juna",
		viewBLabel: "Cavern"
	}),
	loc("zanaris", "Zanaris", "Lost City", "Guthix", "RS3", "town"),
	loc("ardougne", "Ardougne", "Kandarin", "Saradomin", "RS3", "town"),
	loc("gnome", "Tree Gnome Stronghold", "Kandarin", "Guthix", "RS3", "town"),
	loc("seers", "Seers' Village", "Kandarin", "Saradomin", "RS3", "town"),
	loc("anachronia", "Anachronia", "Fossil Island", "Guthix", "RS3", "town"),
	loc("yanille", "Yanille", "Kandarin", "Saradomin", "RS3", "town"),
	loc("draynor", "Draynor Village", "Misthalin", "Saradomin", "RS3", "town"),
	loc("grandexchange", "Grand Exchange", "Misthalin", "Saradomin", "RS3", "town"),
	loc("empyrean", "Empyrean Citadel", "Otherworld", "Armadyl", "RS3", "town"),
	loc("senntisten", "Senntisten", "Forinthry", "Zaros", "RS3", "town"),
	loc("sophanem", "Sophanem", "Kharidian", "Elidinis", "RS3", "town"),
	loc("apeatoll", "Ape Atoll", "Southern Sea", "Marimbo", "RS3", "town"),
	loc("goblin", "Goblin Village", "Asgarnia", "Bandos", "RS3", "town"),
	loc("heart", "Heart of Gielinor", "God Wars", "Zaros", "RS3", "town"),
	loc("entrana", "Entrana", "Asgarnia", "Saradomin", "RS3", "town"),
	loc("cityofum", "City of Um", "Underworld", "Sliske", "RS3", "town"),
	loc("warsretreat", "War's Retreat", "Otherworld", "Zaros", "RS3", "town"),
	loc("darkmeyer", "Darkmeyer", "Morytania", "Zamorak", "RS3", "town"),
	loc("osrslumbridge", "Lumbridge", "Misthalin · OSRS", "Saradomin", "OSRS", "town", {
		viewA: asset("/locations/osrs-lumbridge-a.jpg"),
		viewB: asset("/locations/osrs-lumbridge-b.jpg"),
		viewALabel: "A",
		viewBLabel: "B",
		source: "wiki-file",
		filePage: "https://oldschool.runescape.wiki/w/File:Lumbridge.png",
		stills: [asset("/locations/osrslumbridge.jpg"), asset("/locations/osrslumbridge-nightstone.jpg")]
	}),
	loc("osrsfalador", "Falador", "Asgarnia · OSRS", "Saradomin", "OSRS", "town", {
		viewA: asset("/locations/osrs-falador-a.jpg"),
		viewB: asset("/locations/osrs-falador-b.jpg"),
		viewALabel: "A",
		viewBLabel: "B",
		source: "wiki-file",
		filePage: "https://oldschool.runescape.wiki/w/File:Falador.png"
	}),
	loc("osrsvarrock", "Varrock", "Misthalin · OSRS", "Saradomin", "OSRS", "town", {
		viewA: asset("/locations/osrs-varrock-a.jpg"),
		viewB: asset("/locations/osrs-varrock-b.jpg"),
		viewALabel: "Square",
		viewBLabel: "Palace",
		source: "wiki-file",
		filePage: "https://oldschool.runescape.wiki/w/File:Varrock_Square.png"
	}),
	loc("hosidius", "Hosidius", "Great Kourend · OSRS", "Saradomin", "OSRS", "town"),
	loc("osrsprif", "Prifddinas", "Tirannwn · OSRS", "Seren", "OSRS", "town"),
	loc("osrscani", "Canifis", "Morytania · OSRS", "Zamorak", "OSRS", "town"),
	loc("osrscath", "Catherby", "Kandarin · OSRS", "Saradomin", "OSRS", "town"),
	loc("osrsport", "Port Sarim", "Asgarnia · OSRS", "Saradomin", "OSRS", "town"),
	loc("osrstav", "Taverley", "Asgarnia · OSRS", "Guthix", "OSRS", "town"),
	loc("osrsburth", "Burthorpe", "Asgarnia · OSRS", "Bandos", "OSRS", "town"),
	loc("osrsedge", "Edgeville", "Misthalin · OSRS", "Zamorak", "OSRS", "town"),
	loc("osrsalk", "Al Kharid", "Kharidian · OSRS", "Tumeken", "OSRS", "town"),
	loc("osrstears", "Tears of Guthix", "Lumbridge Swamp · OSRS", "Guthix", "OSRS", "town", {
		skies: "pair",
		pairA: "Tears",
		pairB: "Chasm",
		viewA: asset("/locations/osrstears.jpg"),
		viewB: asset("/locations/osrstears-nightstone.jpg"),
		viewALabel: "Tears",
		viewBLabel: "Chasm"
	}),
	loc("osrszanaris", "Zanaris", "Lost City · OSRS", "Guthix", "OSRS", "town", {
		viewA: asset("/locations/osrs-zanaris-a.jpg"),
		viewALabel: "Market"
	}),
	loc("osrsard", "Ardougne", "Kandarin · OSRS", "Saradomin", "OSRS", "town"),
	loc("osrsgnome", "Tree Gnome Stronghold", "Kandarin · OSRS", "Guthix", "OSRS", "town"),
	loc("osrsseers", "Seers' Village", "Kandarin · OSRS", "Saradomin", "OSRS", "town"),
	loc("osrsyan", "Yanille", "Kandarin · OSRS", "Saradomin", "OSRS", "town"),
	loc("osrssoph", "Sophanem", "Kharidian · OSRS", "Elidinis", "OSRS", "town"),
	loc("osrsape", "Ape Atoll", "Southern Sea · OSRS", "Marimbo", "OSRS", "town"),
	loc("osrsent", "Entrana", "Asgarnia · OSRS", "Saradomin", "OSRS", "town"),
	loc("osrsgob", "Goblin Village", "Asgarnia · OSRS", "Bandos", "OSRS", "town"),
	loc("rellekka", "Rellekka", "Fremennik", "Guthix", "RS3", "town"),
	loc("keldagrim", "Keldagrim", "Fremennik", "Guthix", "RS3", "town"),
	loc("phasmatys", "Port Phasmatys", "Morytania", "Zamorak", "RS3", "town"),
	loc("lletya", "Lletya", "Tirannwn", "Seren", "RS3", "town"),
	loc("fortforinthry", "Fort Forinthry", "Misthalin", "Saradomin", "RS3", "town"),
	loc("waiko", "Waiko", "The Arc", "Guthix", "RS3", "town"),
	loc("osrsrel", "Rellekka", "Fremennik · OSRS", "Guthix", "OSRS", "town"),
	loc("shayzien", "Shayzien", "Great Kourend · OSRS", "Saradomin", "OSRS", "town"),
	loc("lovakengj", "Lovakengj", "Great Kourend · OSRS", "Bandos", "OSRS", "town"),
	loc("arceuus", "Arceuus", "Great Kourend · OSRS", "Zaros", "OSRS", "town"),
	loc("piscarilius", "Port Piscarilius", "Great Kourend · OSRS", "Saradomin", "OSRS", "town"),
	loc("fortis", "Civitas Fortis", "Varlamore · OSRS", "Tumeken", "OSRS", "town"),
	loc("raksha", "Raksha", "Anachronia", "Guthix", "RS3", "boss"),
	loc("vorago", "Vorago", "Borehole", "Guthix", "RS3", "boss"),
	loc("solak", "Solak", "Lost Grove", "Guthix", "RS3", "boss"),
	loc("telos", "Telos", "The Heart", "Zaros", "RS3", "boss"),
	loc("glacor", "Arch-Glacor", "Senntisten", "Zaros", "RS3", "boss"),
	loc("rasial", "Rasial", "City of Um", "Sliske", "RS3", "boss"),
	loc("araxxor", "Araxxor", "Morytania", "Zamorak", "RS3", "boss"),
	loc("kerapac", "Kerapac", "Anachronia", "Zaros", "RS3", "boss"),
	loc("qbd", "Queen Black Dragon", "Ancient Cavern", "Zaros", "RS3", "boss"),
	loc("zamorakboss", "Zamorak, Lord of Chaos", "Infernal Source", "Zamorak", "RS3", "boss"),
	loc("helwyr", "Helwyr", "Tiranwnn", "Seren", "RS3", "boss"),
	loc("vindicta", "Vindicta", "Tiranwnn", "Zaros", "RS3", "boss"),
	loc("toa", "Tombs of Amascut", "Kharidian · OSRS", "Tumeken", "OSRS", "boss"),
	loc("vorkath", "Vorkath", "Ungael · OSRS", "Zaros", "OSRS", "boss"),
	loc("tob", "Theatre of Blood", "Morytania · OSRS", "Zamorak", "OSRS", "boss"),
	loc("corp", "Corporeal Beast", "Wilderness · OSRS", "Zaros", "OSRS", "boss"),
	loc("nex", "Nex", "God Wars · OSRS", "Zaros", "OSRS", "boss"),
	loc("zulrah", "Zulrah", "Zul-Andra · OSRS", "Zaros", "OSRS", "boss"),
	loc("inferno", "The Inferno", "TzHaar · OSRS", "Zamorak", "OSRS", "boss"),
	loc("nightmare", "The Nightmare", "Morytania · OSRS", "Zamorak", "OSRS", "boss"),
	loc("graardor", "General Graardor", "God Wars · OSRS", "Bandos", "OSRS", "boss"),
	loc("kree", "Kree'arra", "God Wars · OSRS", "Armadyl", "OSRS", "boss"),
	loc("muspah", "Phantom Muspah", "Ghorrock · OSRS", "Zaros", "OSRS", "boss"),
	loc("hydra", "Alchemical Hydra", "Kebos · OSRS", "Guthix", "OSRS", "boss"),
	loc("cox", "Chambers of Xeric", "Great Olm · OSRS", "Zaros", "OSRS", "boss"),
	loc("colosseum", "Fortis Colosseum", "Varlamore · OSRS", "Saradomin", "OSRS", "boss"),
	loc("duke", "Duke Sucellus", "Ghorrock · OSRS", "Zaros", "OSRS", "boss"),
	loc("whisperer", "The Whisperer", "Lassar · OSRS", "Zaros", "OSRS", "boss"),
	loc("leviathan", "The Leviathan", "Scar · OSRS", "Zaros", "OSRS", "boss"),
	loc("vardorvis", "Vardorvis", "Stranglewood · OSRS", "Zaros", "OSRS", "boss"),
	loc("gauntlet", "The Gauntlet", "Prifddinas · OSRS", "Seren", "OSRS", "boss"),
	loc("kril", "K'ril Tsutsaroth", "God Wars · OSRS", "Zamorak", "OSRS", "boss"),
	loc("zilyana", "Commander Zilyana", "God Wars · OSRS", "Saradomin", "OSRS", "boss"),
	loc("kq", "Kalphite Queen", "Kharidian · OSRS", "Tumeken", "OSRS", "boss"),
	loc("scurrius", "Scurrius", "Varrock · OSRS", "Zamorak", "OSRS", "boss"),
	loc("zuk", "TzKal-Zuk", "Elder Kiln", "Zamorak", "RS3", "boss"),
	loc("ambassador", "The Ambassador", "Dungeons of Daemonheim", "Zaros", "RS3", "boss"),
	loc("croesus", "Croesus", "Senntisten", "Zaros", "RS3", "boss"),
	loc("aod", "Nex: Angel of Death", "God Wars", "Zaros", "RS3", "boss"),
	loc("kk", "Kalphite King", "Exiled Kalphite Hive", "Tumeken", "RS3", "boss", {
		viewA: asset("/locations/kk.jpg"),
		viewALabel: "Hive"
	}),
	loc("gregorovic", "Gregorovic", "Tiranwnn", "Sliske", "RS3", "boss"),
	loc("sanctum", "Sanctum of Rebirth", "Underworld", "Sliske", "RS3", "boss"),
	loc("bm", "Beastmaster Durzag", "Mazcab", "Bandos", "RS3", "boss"),
	loc("yaka", "Yakamaru", "Mazcab", "Bandos", "RS3", "boss")
];
function hasViewB(loc) {
	return Boolean(loc.viewB && loc.viewB !== loc.viewA);
}
var BANNER_SIZES = [
	{
		id: "1200x480",
		name: "1200×480",
		width: 1200,
		height: 480,
		note: "Twitch profile banner",
		mark: "twitch"
	},
	{
		id: "1280x720",
		name: "1280×720",
		width: 1280,
		height: 720,
		note: "YouTube thumb / 16:9 card",
		mark: "youtube"
	},
	{
		id: "1920x1080",
		name: "1920×1080",
		width: 1920,
		height: 1080,
		note: "Offline / player banner",
		mark: "none"
	},
	{
		id: "1920x480",
		name: "1920×480",
		width: 1920,
		height: 480,
		note: "Wide panel",
		mark: "none"
	}
];
function migrateBannerSizeId(raw) {
	const key = (raw ?? "").toLowerCase().replace(/×/g, "x");
	if (key === "1200x480" || key === "m" || key === "twitch" || key === "rs3") return "1200x480";
	if (key === "1280x720" || key === "youtube") return "1280x720";
	if (key === "1920x1080" || key === "offline") return "1920x1080";
	if (key === "1920x480" || key === "xl" || key === "wall" || key === "facebook") return "1920x480";
	if (key === "s" || key === "discord" || key === "tiktok") return "1200x480";
	if (key === "l" || key === "x") return "1920x480";
	return "1200x480";
}
var RULES = {
	title: "Rules of RuneScape",
	sections: [
		{
			heading: "Honour",
			body: "Play fair. Do not scam, lure, or buy gold."
		},
		{
			heading: "Respect",
			body: "No hate in public chat. Treat other players as players."
		},
		{
			heading: "Security",
			body: "Never share a password. Jagex will not ask for one."
		}
	]
};
function townAtHour(now = Date.now(), edition = "RS3") {
	const list = LOCATIONS.filter((l) => l.kind === "town" && l.edition === edition);
	return list[Math.floor(now / 36e5) % list.length] ?? LOCATIONS[0];
}
//#endregion
export { hasViewB as a, townAtHour as c, RULES as i, GODS as n, migrateBannerSizeId as o, LOCATIONS as r, stillAllowed as s, BANNER_SIZES as t };
