import { i as __toESM } from "../_runtime.mjs";
import { V as require_react, b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as migrateBannerSizeId, c as townPlateSrc, o as stillAllowed, r as LOCATIONS, t as BANNER_SIZES } from "./locations-DGhympWJ.mjs";
import { i as writeStudioSave, n as putStillOnDesk, t as loadStudioSave } from "./store-pWHXaoAo.mjs";
import { r as readDeskQuery, t as MARKS } from "./desk-link-CEJ4hcj1.mjs";
import { d as townPath, s as bossPath, t as AppLink } from "./place-chip-CCVXVkdy.mjs";
import { t as PlaceRail } from "./place-rail-DFA15Tod.mjs";
import { t as townNote } from "./town-notes-gbQvMCvJ.mjs";
import { A as useVisibleNow, C as SiteHeader, D as sessionOnce, E as pad, O as untilUtcHour, T as isOwnerName, k as untilUtcMidnight, o as useDeskEggs, s as EggToast, w as eggToast, x as noteFor } from "./router-D8oIjQ4W.mjs";
import { t as StillPhoto } from "./still-photo-BOT2Km3b.mjs";
import { t as OfficialPulse } from "./official-pulse-yZGuzRl4.mjs";
import { a as sanitizeDisplayName, c as sanitizeHandle, i as sanitizeDiscord, l as sanitizeTagline, n as looksLikeStaffName, r as sanitizeClan, s as sanitizeGrind, u as sanitizeWorld } from "./rsText-CBarotbs.mjs";
import { i as loadImage, o as plateMetrics, r as ensurePlateFont, s as safeZoneRects, t as drawBanner } from "./draw-banner-B4aWBF2O.mjs";
import { t as useEggGestures } from "./use-egg-gestures-C3ULa-RT.mjs";
import { i as stillIndex, n as formatRemain, t as PERIOD_MS } from "./still-clock-F1LQ7Gge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/studio-BzZRroBs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function weekday(now) {
	return now.toLocaleDateString("en-GB", {
		weekday: "long",
		day: "numeric",
		month: "short",
		timeZone: "UTC"
	});
}
function TodayDesk() {
	const stamp = useVisibleNow();
	const now = new Date(stamp);
	const [stale, setStale] = (0, import_react.useState)(false);
	const prevHour = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const hour = now.getUTCHours();
		if (prevHour.current === 23 && hour === 0 && sessionOnce("rs-egg-midnight")) eggToast("Bob has seen the shops restock. He is unmoved.");
		prevHour.current = hour;
		setStale(false);
	}, [stamp]);
	(0, import_react.useEffect)(() => {
		const onVis = () => {
			if (document.visibilityState === "hidden") return;
			setStale(false);
		};
		document.addEventListener("visibilitychange", onVis);
		return () => document.removeEventListener("visibilitychange", onVis);
	}, []);
	const reset = untilUtcMidnight(now);
	const hour = untilUtcHour(now);
	const day = now.getUTCDay();
	const utcH = now.getUTCHours();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "page-band py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-1 text-center text-sm font-semibold",
				children: "Today"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mb-3 text-center font-mono text-xs tabular-nums text-muted",
				children: [
					weekday(now),
					" · ",
					pad(utcH),
					":",
					pad(now.getUTCMinutes()),
					":",
					pad(now.getUTCSeconds()),
					" UTC",
					stale ? " · clock stale" : ""
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-3xl gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-2 text-sm font-semibold",
					children: "Old School RuneScape"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-1.5 text-xs text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							"Daily reset in ",
							reset,
							" (00:00 UTC). Herb runs, birdhouses, battlestaves, and shop caps flip then. Worlds hitch for a few minutes after."
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: day === 3 ? "Wednesday update window. Do not title the stream as a patch until the official post is live." : "Updates usually Wednesday. Do not promise a patch stream today unless Jagex already posted." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Set the Twitch category to Old School RuneScape before you go live. Title the activity, not the gear." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: utcH >= 18 && utcH < 23 ? "Peak EU/US overlap. Expect full worlds and longer GE queues." : "Off-peak relative to EU prime. Good for teaching and first-hour bosses." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Drops and league promos only count when the official LootScape or news post says they are on." })
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-2 text-sm font-semibold",
					children: "RuneScape"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-1.5 text-xs text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							"Daily reset in ",
							reset,
							" (00:00 UTC). Challenges, ports, cache, Fort contracts, and travelling merchant stock flip then."
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							"Voice of Seren flips on the hour. Next in ",
							hour,
							" (UTC hour). Desk estimate — not a clan table.",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "https://runescape.wiki/w/Voice_of_Seren",
								className: "text-parchment",
								target: "_blank",
								rel: "noreferrer",
								children: "Wiki"
							}),
							"."
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: day === 1 ? "Monday update window. Wait for the official post before you read notes on stream." : "Updates usually Monday. Do not promise a patch stream today unless Jagex already posted." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Set the Twitch category to RuneScape, not Old School. Title the boss or grind, not the overlay." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: utcH >= 18 && utcH < 23 ? "Peak overlap. War's Retreat and hubs will be busy." : "Quieter worlds. Good for learner PvM and first enrage holds." })
					]
				})] })]
			})
		]
	});
}
/** Curated wide town plates. No HUD, no bag, no welcome parchment. */
var HERO_OSRS = [
	{
		src: "/Falador.png",
		name: "Falador",
		game: "OSRS"
	},
	{
		src: "/locations/osrslumbridge.jpg",
		name: "Lumbridge",
		game: "OSRS"
	},
	{
		src: "/locations/osrsvarrock.jpg",
		name: "Varrock",
		game: "OSRS"
	},
	{
		src: "/locations/osrsedge.jpg",
		name: "Edgeville",
		game: "OSRS"
	},
	{
		src: "/locations/osrsprif.jpg",
		name: "Prifddinas",
		game: "OSRS"
	},
	{
		src: "/locations/osrscani.jpg",
		name: "Canifis",
		game: "OSRS"
	}
];
var HERO_RS3 = [
	{
		src: "/Prifddinas.png",
		name: "Prifddinas",
		game: "RS3"
	},
	{
		src: "/Menaphos.png",
		name: "Menaphos",
		game: "RS3"
	},
	{
		src: "/Daemonheim.png",
		name: "Daemonheim",
		game: "RS3"
	},
	{
		src: "/locations/lumbridge.jpg",
		name: "Lumbridge",
		game: "RS3"
	},
	{
		src: "/locations/falador.jpg",
		name: "Falador",
		game: "RS3"
	},
	{
		src: "/Canifis.png",
		name: "Canifis",
		game: "RS3"
	},
	{
		src: "/locations/senntisten.jpg",
		name: "Senntisten",
		game: "RS3"
	}
];
var HERO_RSC = [
	{
		src: "/stills/rsc/rsc-lumbridge.jpg",
		name: "Lumbridge",
		game: "RSC"
	},
	{
		src: "/stills/rsc/rsc-varrock.jpg",
		name: "Varrock",
		game: "RSC"
	},
	{
		src: "/stills/rsc/rsc-draynor.jpg",
		name: "Draynor",
		game: "RSC"
	},
	{
		src: "/stills/rsc/rsc-edgeville.jpg",
		name: "Edgeville",
		game: "RSC"
	}
];
function heroPool(chip) {
	if (chip === "RS3") return HERO_RS3;
	if (chip === "RSC") return HERO_RSC;
	return HERO_OSRS;
}
function gameLabel(chip) {
	if (chip === "RSC") return "RuneScape Classic";
	if (chip === "RS3") return "RuneScape";
	return "Old School RuneScape";
}
function heroFromSearch() {
	if (typeof window === "undefined") return "OSRS";
	const hero = new URLSearchParams(window.location.search).get("hero")?.toLowerCase();
	if (hero === "classic" || hero === "rsc") return "RSC";
	if (hero === "rs3") return "RS3";
	return "OSRS";
}
function TownHero({ onTown }) {
	const [edition, setEdition] = (0, import_react.useState)(heroFromSearch);
	const [origin, setOrigin] = (0, import_react.useState)(() => Date.now());
	const [skip, setSkip] = (0, import_react.useState)(0);
	const pool = heroPool(edition);
	const now = useVisibleNow();
	const clock = Math.max(0, now - origin);
	const n = pool.length;
	const idx = n ? (stillIndex(n, clock) + skip) % n : 0;
	const shot = pool[idx] ?? pool[0];
	const next = n ? pool[(idx + 1) % n] : void 0;
	const [shown, setShown] = (0, import_react.useState)(shot?.src);
	const remain = PERIOD_MS - clock % PERIOD_MS;
	const [caption, setCaption] = (0, import_react.useState)(shot?.name ?? "");
	(0, import_react.useEffect)(() => {
		if (!shot?.src) return;
		const img = new Image();
		img.onload = () => {
			setShown(shot.src);
			setCaption(shot.name);
			if (edition !== "RSC") onTown?.(shot.name, edition);
		};
		img.onerror = () => setSkip((count) => count + 1);
		img.src = shot.src;
	}, [
		shot?.src,
		shot?.name,
		edition
	]);
	(0, import_react.useEffect)(() => {
		if (!next?.src) return;
		const img = new Image();
		img.src = next.src;
	}, [next?.src]);
	function pick(nextChip) {
		setEdition(nextChip);
		setOrigin(Date.now());
		setSkip(0);
		const first = heroPool(nextChip)[0];
		if (first) setShown(first.src);
		if (typeof window !== "undefined") {
			const url = new URL(window.location.href);
			url.searchParams.set("hero", nextChip === "RSC" ? "classic" : nextChip === "RS3" ? "rs3" : "osrs");
			window.history.replaceState(null, "", url);
		}
	}
	const game = gameLabel(edition);
	const name = caption || shot?.name || "Town";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "hero",
		className: "border-b border-line bg-raised",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap justify-center gap-2 px-3 py-3 md:px-8",
				children: [
					["RSC", "Classic"],
					["OSRS", "Old School"],
					["RS3", "RuneScape"]
				].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-pressed": edition === id,
					className: `min-h-11 rounded-md border px-3 text-xs ${edition === id ? "border-parchment bg-surface text-parchment" : "border-line text-muted"}`,
					onClick: () => pick(id),
					children: label
				}, id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative w-full overflow-hidden border-y border-[#c6a45a] bg-[#1a1612]",
				style: { aspectRatio: "1200 / 480" },
				children: shown ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: shown,
					width: 1200,
					height: 480,
					alt: `${name}, town, ${game}`,
					fetchPriority: "high",
					className: "absolute inset-0 h-full w-full object-cover"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "absolute inset-0 flex items-center justify-center text-sm text-muted",
					children: "Still needed."
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "px-3 py-2 text-center text-sm text-fg md:px-8",
				children: [
					name,
					" · ",
					game
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "pb-2 text-center text-[11px] text-faint",
				children: edition === "RSC" ? "Archive. The worlds are not on this page." : `Next still in ${formatRemain(remain)}`
			})
		]
	});
}
var BOB_LINES = [
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
	"The cat has seniority. Act like it."
];
var BOB_BY_PLACE = {
	"osrs:lumbridge": [
		"The duke's stone is still the first sermon. Tutorial Island is a rumour the river has not forgotten.",
		"From this sill the castle is a theorem: walls, then church, then the road that pretends it is simple.",
		"The meadow east is grass. No crater. The cat will not pretend otherwise."
	],
	"osrs:varrock": [
		"Gertrude's tom keeps this city. Palaces are commentary; the sill is the text.",
		"Square and palace are two lemmas. The cat declines to choose.",
		"The museum keeps bones. Bob keeps the hour."
	],
	"osrs:falador": [
		"White walls perform virtue. The cat has seen the inside of the party room and remains unconverted.",
		"The park is a pause in the white argument. Sit. Do not enlist.",
		"Knights polish. Bob does not."
	],
	"osrs:prifddinas": ["Song of the Elves raised this crystal. Sixth Age doctrine stays off this key.", "Eight clans, one city, no Voice of Seren named here."],
	"osrs:zanaris": ["The fairy ring is a hinge. Zanaris opens only if you already know the joke.", "Lost City is not lost to the cat. It is merely sideways."],
	"osrs:alkharid": ["The desert begins at the toll. Bob paid once and still resents it.", "Silk and scimitars. The sill prefers Varrock brick."],
	"osrs:draynorvillage": ["Willows lean over dark water. The manor does not invite the cat.", "Draynor sleeps with one eye on the willows."],
	"osrs:edgeville": ["The ditch is a sentence. Wilderness is the clause that follows."],
	"osrs:catherby": ["Bees, fish, and a range. Kandarin pretends to be gentle."],
	"osrs:portsarim": ["Ships lie. The cat does not sail."],
	"osrs:ardougne": ["East market, west plague memory. Keep the two streets unmingled."],
	"osrs:canifis": ["Moonrise is a local ordinance. Bob stays on the Varrock side of the river after dark."],
	"osrs:entrana": ["No weapons. The rule is older than most logins."],
	"osrs:apeatoll": ["Marimbo's island is loud. The cat is not a monkey."],
	"rs3:lumbridge": [
		"The rebuilt street is a palimpsest over a crater. Read both layers or you are only sightseeing.",
		"The duke still holds the keep. The meadow does not forget the Sixth Age.",
		"Battle scar and baker's stall share one frame. Name the age before you quote it."
	],
	"rs3:prifddinas": ["The hour will turn without a clan name on this desk. The cat respects that silence.", "Crystal under a living sun. Seren is present; this line will not invent her Voice."],
	"rs3:varrock": ["The square is still a square. RS3 only added more hats.", "Gertrude's house is still the correct door."],
	"rs3:falador": ["White walls again. The workshop under the city is a later gloss."],
	"rs3:senntisten": ["The ledger is methods, not prices. Bob will not quote the GE.", "Zarosian brick remembers an empire. The cat remembers mice."],
	"rs3:menaphos": ["Four districts, one sun. Tumeken is not a drop table."],
	"rs3:cityofum": ["The underworld keeps appointments. Bob has none."],
	"rs3:warsretreat": ["A lobby is not a fight. Leave the enrage on the wiki."],
	"rs3:anachronia": ["Dinosaurs are a thesis about time. The cat is unimpressed."]
};
function placeSlug(name) {
	return name.toLowerCase().replace(/[^a-z0-9]+/g, "");
}
function rememberBobPlace(game, slug) {
	try {
		const until = Math.ceil(Date.now() / 3e5) * 3e5;
		sessionStorage.setItem("rs-bob-hold", JSON.stringify({
			game,
			slug,
			until
		}));
	} catch {}
}
function heldBobPlace(game, slug, now = Date.now()) {
	try {
		const raw = sessionStorage.getItem("rs-bob-hold");
		if (!raw) return slug;
		const data = JSON.parse(raw);
		if (data.game === game && data.slug && Number(data.until) > now) return data.slug;
	} catch {}
	return slug;
}
function bobLine(game, slug, now = Date.now()) {
	const pool = BOB_BY_PLACE[`${game}:${heldBobPlace(game, slug, now)}`] ?? BOB_LINES;
	return pool[Math.floor(now / 3e5) % pool.length] ?? pool[0] ?? BOB_LINES[0];
}
var WORDS = [
	{
		t: "palimpsest",
		p: "PAL-imp-sest",
		g: "a surface written over so the older writing still shows"
	},
	{
		t: "apophasis",
		p: "uh-POF-uh-sis",
		g: "mentioning something by saying you will not mention it"
	},
	{
		t: "quiddity",
		p: "KWID-ih-tee",
		g: "the essential what-ness of a thing"
	},
	{
		t: "haecceity",
		p: "hek-SEE-ih-tee",
		g: "the this-ness of one particular thing"
	},
	{
		t: "liminality",
		p: "lim-ih-NAL-ih-tee",
		g: "the state of being on a threshold"
	},
	{
		t: "chthonic",
		p: "THON-ik",
		g: "of the underworld; belonging beneath the earth"
	},
	{
		t: "numinous",
		p: "NOO-min-us",
		g: "filled with a sense of the sacred"
	},
	{
		t: "soteriology",
		p: "so-teer-ee-OL-uh-jee",
		g: "the study of what it means to be saved"
	},
	{
		t: "eschaton",
		p: "ES-kuh-ton",
		g: "the last thing; an end of history"
	},
	{
		t: "praxis",
		p: "PRAK-sis",
		g: "practice; theory carried out in action"
	},
	{
		t: "anagoge",
		p: "an-uh-GOH-jee",
		g: "a reading that lifts a text toward a higher sense"
	},
	{
		t: "catabasis",
		p: "kuh-TAB-uh-sis",
		g: "a descent, especially into the underworld"
	},
	{
		t: "peripeteia",
		p: "pehr-ih-puh-TEE-uh",
		g: "a sudden reversal of fortune"
	},
	{
		t: "aleatory",
		p: "AY-lee-uh-tor-ee",
		g: "dependent on chance"
	},
	{
		t: "agon",
		p: "AH-gohn",
		g: "a contest or structured struggle"
	},
	{
		t: "deixis",
		p: "DYKE-sis",
		g: "pointing at the here and now of speech"
	},
	{
		t: "colophon",
		p: "KOL-uh-fon",
		g: "a short note at the end of a book"
	},
	{
		t: "interstice",
		p: "in-TUR-stiss",
		g: "a small gap between things"
	},
	{
		t: "dialectic",
		p: "dye-uh-LEK-tik",
		g: "argument that moves by opposing claims"
	},
	{
		t: "immanence",
		p: "IM-uh-nunce",
		g: "being present within, not beyond"
	},
	{
		t: "transcendence",
		p: "tran-SEN-dunce",
		g: "going beyond ordinary limits"
	},
	{
		t: "eidolon",
		p: "eye-DOH-lon",
		g: "an image, phantom, or unsubstantial form"
	},
	{
		t: "simulacrum",
		p: "sim-yuh-LAY-krum",
		g: "a copy that stands in for the original"
	},
	{
		t: "mimesis",
		p: "mih-MEE-sis",
		g: "imitation; representation of the real"
	},
	{
		t: "semiosis",
		p: "see-mee-OH-sis",
		g: "the process by which signs make meaning"
	},
	{
		t: "indexical",
		p: "in-DEX-ih-kul",
		g: "a sign that points because it was there"
	},
	{
		t: "iconicity",
		p: "eye-kuh-NISS-ih-tee",
		g: "meaning that comes from resemblance"
	},
	{
		t: "symbolon",
		p: "SIM-buh-lon",
		g: "a token meant to be matched with its other half"
	},
	{
		t: "prosody",
		p: "PROSS-uh-dee",
		g: "the rhythm and sound pattern of speech"
	},
	{
		t: "caesura",
		p: "sih-ZYOOR-uh",
		g: "a pause in the middle of a line"
	},
	{
		t: "kenosis",
		p: "keh-NO-sis",
		g: "an emptying out of the self"
	},
	{
		t: "askesis",
		p: "uh-SKEE-sis",
		g: "discipline practiced as training"
	},
	{
		t: "thnetos",
		p: "THNET-oss",
		g: "mortal; liable to die"
	},
	{
		t: "anabasis",
		p: "uh-NAB-uh-sis",
		g: "a march up-country; an ascent"
	},
	{
		t: "topos",
		p: "TOH-poss",
		g: "a commonplace; a conventional theme"
	},
	{
		t: "genius loci",
		p: "JEE-nee-us LOH-sye",
		g: "the spirit or character of a place"
	},
	{
		t: "parataxis",
		p: "par-uh-TAK-sis",
		g: "placing clauses side by side without joining words"
	},
	{
		t: "hypotaxis",
		p: "hye-poh-TAK-sis",
		g: "subordinating one clause to another"
	},
	{
		t: "aporia",
		p: "uh-POR-ee-uh",
		g: "a productive puzzlement; being stuck in thought"
	},
	{
		t: "catachresis",
		p: "kat-uh-KREE-sis",
		g: "a strained or mixed figure of speech"
	},
	{
		t: "enargia",
		p: "en-AR-jee-uh",
		g: "vivid description that makes a scene present"
	},
	{
		t: "ekphrasis",
		p: "EK-fruh-sis",
		g: "speech that describes a work of art"
	},
	{
		t: "prosopopoeia",
		p: "pruh-so-puh-PEE-uh",
		g: "giving a voice to something that cannot speak"
	},
	{
		t: "chronotope",
		p: "KRON-uh-tope",
		g: "time and place fused as one setting"
	},
	{
		t: "heterotopia",
		p: "het-uh-roh-TOH-pee-uh",
		g: "a real place that works as another world inside the world"
	},
	{
		t: "limen",
		p: "LYE-men",
		g: "a threshold; the edge of crossing"
	},
	{
		t: "vestige",
		p: "VESS-tij",
		g: "a remaining trace of something gone"
	},
	{
		t: "palinode",
		p: "PAL-ih-node",
		g: "a poem or statement that takes back an earlier one"
	},
	{
		t: "recension",
		p: "rih-SEN-shun",
		g: "a distinct edited version of a text"
	},
	{
		t: "stela",
		p: "STEE-luh",
		g: "an upright stone marked with a name or record"
	}
];
function utcDay(now = Date.now()) {
	return Math.floor(now / 864e5);
}
function mulberry32(a) {
	return () => {
		a |= 0;
		a = a + 1831565813 | 0;
		let t = Math.imul(a ^ a >>> 15, 1 | a);
		t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function todaysWords(all, now = Date.now()) {
	const rng = mulberry32(utcDay(now) ^ 2827);
	const copy = all.slice();
	for (let i = copy.length - 1; i > 0; i--) {
		const j = Math.floor(rng() * (i + 1));
		[copy[i], copy[j]] = [copy[j], copy[i]];
	}
	return copy.slice(0, 12);
}
function bobWord(now = Date.now()) {
	const dayList = todaysWords(WORDS, now);
	return dayList[Math.floor(now / 3e5) % dayList.length];
}
function OracleLine({ place, edition }) {
	const now = useVisibleNow();
	const [hitch, setHitch] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const t = new Date(now);
		if (t.getUTCHours() === 0 && t.getUTCMinutes() === 0 && sessionOnce("rs-midnight-hitch")) {
			setHitch(true);
			const id = window.setTimeout(() => setHitch(false), 12e3);
			return () => window.clearTimeout(id);
		}
	}, [now]);
	const game = edition === "OSRS" ? "osrs" : "rs3";
	const slug = placeSlug(place);
	(0, import_react.useEffect)(() => {
		rememberBobPlace(game, slug);
	}, [game, slug]);
	const line = hitch ? "The shopkeepers restock. Worlds hitch." : bobLine(game, slug, now);
	const word = bobWord(now);
	const date = new Date(now).toLocaleDateString("en-GB", {
		weekday: "long",
		day: "numeric",
		month: "short",
		timeZone: "UTC"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "page-band py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
				className: "bob-cite mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/stills/osrs/bob-the-cat.png",
						alt: "Bob the Cat, Old School RuneScape",
						width: 72,
						height: 72,
						className: "h-[72px] w-[72px] shrink-0 object-contain object-bottom"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-[12rem] flex-1 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
							className: "oracle text-sm leading-snug text-parchment/80",
							style: { fontFamily: "Fondamento, serif" },
							"aria-live": "polite",
							children: [
								"“",
								line,
								"”"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "bob-word mt-2 text-sm leading-snug text-parchment/80",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mr-1 text-[11px] text-muted",
									children: "Bob teaches"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "font-semibold text-parchment",
									children: word.t
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted",
									children: [
										" (",
										word.p,
										")"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									style: { fontFamily: "Fondamento, serif" },
									children: [" — ", word.g]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/stills/rs3/bob-the-cat.png",
						alt: "Bob the Cat, RuneScape",
						width: 72,
						height: 72,
						className: "h-[72px] w-[72px] shrink-0 object-contain object-bottom"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
						className: "w-full text-center text-[11px] text-muted",
						children: "Bob the Cat"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-center text-[11px] text-muted",
				children: "Kept by a player who looks first and banks second."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-center text-[11px] text-faint",
				children: "New lesson list at midnight UTC."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-center text-xs text-muted",
				children: ["Today · ", date]
			})
		]
	});
}
var RS3_OWN = /* @__PURE__ */ new Set([
	"constitution",
	"summoning",
	"dungeoneering",
	"divination",
	"invention",
	"archaeology",
	"necromancy"
]);
var RS3_120 = /* @__PURE__ */ new Set([
	"invention",
	"dungeoneering",
	"slayer",
	"farming",
	"herblore",
	"archaeology",
	"necromancy",
	"rs3-slayer",
	"rs3-farming",
	"rs3-herblore"
]);
function osrs(name) {
	return {
		id: name.toLowerCase(),
		name,
		editions: ["OSRS"],
		src: `/skills/osrs-${name}.png`
	};
}
function rs3(name) {
	const slug = name.toLowerCase();
	return {
		id: RS3_OWN.has(slug) ? slug : `rs3-${slug}`,
		name,
		editions: ["RS3"],
		src: `/skills/rs3-${name}.png`
	};
}
var SKILLS = [
	osrs("Attack"),
	osrs("Strength"),
	osrs("Defence"),
	osrs("Ranged"),
	osrs("Prayer"),
	osrs("Magic"),
	osrs("Runecraft"),
	osrs("Construction"),
	osrs("Hitpoints"),
	osrs("Agility"),
	osrs("Herblore"),
	osrs("Thieving"),
	osrs("Crafting"),
	osrs("Fletching"),
	osrs("Slayer"),
	osrs("Hunter"),
	osrs("Mining"),
	osrs("Smithing"),
	osrs("Fishing"),
	osrs("Cooking"),
	osrs("Firemaking"),
	osrs("Woodcutting"),
	osrs("Farming"),
	osrs("Sailing"),
	rs3("Attack"),
	rs3("Strength"),
	rs3("Defence"),
	rs3("Ranged"),
	rs3("Prayer"),
	rs3("Magic"),
	rs3("Runecraft"),
	rs3("Construction"),
	rs3("Constitution"),
	rs3("Agility"),
	rs3("Herblore"),
	rs3("Thieving"),
	rs3("Crafting"),
	rs3("Fletching"),
	rs3("Slayer"),
	rs3("Hunter"),
	rs3("Mining"),
	rs3("Smithing"),
	rs3("Fishing"),
	rs3("Cooking"),
	rs3("Firemaking"),
	rs3("Woodcutting"),
	rs3("Farming"),
	rs3("Summoning"),
	rs3("Dungeoneering"),
	rs3("Divination"),
	rs3("Invention"),
	rs3("Archaeology"),
	rs3("Necromancy")
];
function skillLevelCap(id, pack) {
	if (pack === "RS3" && RS3_120.has(id.toLowerCase())) return 120;
	return 99;
}
function skillIdForHiscore(skillName, pack) {
	const key = skillName.toLowerCase().replace(/[^a-z]/g, "");
	return SKILLS.find((row) => row.editions.includes(pack) && (row.name.toLowerCase().replace(/[^a-z]/g, "") === key || row.id.replace(/^rs3-/, "") === key || row.id === key))?.id ?? "";
}
function sanitizeSkillLevel(raw, cap) {
	const n = parseInt(String(raw).replace(/\D/g, ""), 10);
	if (!Number.isFinite(n) || n < 1) return "";
	return String(Math.min(cap, n));
}
/** In-world flavour. Not a mail server. */
var POSTIE_LINES = [
	"I'm Postie Pete, the bravest postie in all Gielinor!",
	"Hello there. Mail must go through.",
	"I've walked letters into the Wilderness and come back with the bag.",
	"Ghosts still get post. The living complain more.",
	"Special delivery! Don't shoot the postie.",
	"The Gielinor postal service does not lose a letter. We just arrive late and muddy.",
	"A parcel for the Grand Exchange? Mind the crowds.",
	"Lumbridge to Ardougne is a long road when the bag is full.",
	"I do not open the letters. I only get them there.",
	"If it has an address, I will find the door.",
	"Port Sarim smells of fish and unpaid postage.",
	"Varrock's office is busier than a market stall on double xp.",
	"Falador white walls. Still not a safe drop for a parcel.",
	"Zanaris has a postbox. Fairies write small.",
	"I am a gnome. The bag is not."
];
function postieLineAt(now = Date.now()) {
	return POSTIE_LINES[Math.floor(now / PERIOD_MS) % POSTIE_LINES.length];
}
var PETE_LINES = [
	"The file is ready when you are.",
	"He still only saves JPEGs.",
	"Twelve letters. He has counted.",
	"The boards are a different window.",
	"Nothing interesting happens. He posted anyway.",
	"Closed worlds. Open Download.",
	"You have reached a higher Pete."
];
function peteThreshold(level) {
	return level * (level + 1) / 2;
}
var HiscoresLookup = (0, import_react.lazy)(() => import("./hiscores-CkQj_oVC.mjs").then((mod) => ({ default: mod.HiscoresLookup })));
function Studio() {
	const saved = (0, import_react.useMemo)(() => loadStudioSave(), []);
	const boot = (0, import_react.useMemo)(() => readDeskQuery(), []);
	const peteNow = useVisibleNow(3e5);
	const [edition, setEdition] = (0, import_react.useState)(boot.edition ?? saved.edition ?? "RS3");
	const [kind, setKind] = (0, import_react.useState)(() => {
		return (boot.locationId ? LOCATIONS.find((row) => row.id === boot.locationId) : void 0)?.kind ?? "town";
	});
	const [locationId, setLocationId] = (0, import_react.useState)(boot.locationId ?? saved.locationId ?? "falador");
	const [view, setView] = (0, import_react.useState)(saved.view ?? "a");
	const [viewLocked, setViewLocked] = (0, import_react.useState)(false);
	const [poolSkip, setPoolSkip] = (0, import_react.useState)(0);
	const [, setCycleTick] = (0, import_react.useState)(0);
	const [sizeId, setSizeId] = (0, import_react.useState)(() => migrateBannerSizeId(boot.sizeId ?? saved.sizeId ?? "1200x480"));
	const [streamer, setStreamer] = (0, import_react.useState)(saved.streamer ?? "");
	const [clan, setClan] = (0, import_react.useState)(saved.clan ?? "");
	const [handle, setHandle] = (0, import_react.useState)(saved.handle ?? "");
	const [tagline, setTagline] = (0, import_react.useState)(saved.tagline ?? "");
	const [world, setWorld] = (0, import_react.useState)(saved.world ?? "");
	const [discord, setDiscord] = (0, import_react.useState)(saved.discord ?? "");
	const [grind, setGrind] = (0, import_react.useState)(saved.grind ?? "");
	const [heroTown, setHeroTown] = (0, import_react.useState)({
		name: "Lumbridge",
		edition: saved.edition === "RS3" ? "RS3" : "OSRS"
	});
	const [customSrc, setCustomSrc] = (0, import_react.useState)(null);
	const [deskStillSrc, setDeskStillSrc] = (0, import_react.useState)(() => {
		if (boot.still) return boot.still;
		if (saved.stillSrc) return saved.stillSrc;
		const id = boot.locationId ?? saved.locationId ?? "falador";
		const loc = LOCATIONS.find((row) => row.id === id);
		return townPlateSrc(id) ?? loc?.viewA ?? "/Falador.png";
	});
	const [sceneReady, setSceneReady] = (0, import_react.useState)(true);
	const [skillPack, setSkillPack] = (0, import_react.useState)(boot.edition ?? saved.skillPack ?? "RS3");
	const [skillPlace, setSkillPlace] = (0, import_react.useState)("name");
	const [skillSize, setSkillSize] = (0, import_react.useState)(saved.skillSize ?? 40);
	const [skillX] = (0, import_react.useState)(null);
	const [skillY] = (0, import_react.useState)(null);
	const [skillPicks, setSkillPicks] = (0, import_react.useState)(() => {
		if (boot.marks?.length) {
			const pack = boot.edition ?? saved.skillPack ?? "OSRS";
			return boot.marks.map((id, i) => ({
				id,
				game: pack,
				level: "",
				x: 28 + i * 44,
				y: 400,
				size: 28,
				scale: 1
			}));
		}
		if (boot.locationId) return [];
		return saved.skillPicks?.map((row) => ({
			id: row.id,
			game: row.game === "RS3" || row.game === "OSRS" ? row.game : saved.skillPack ?? "RS3",
			level: row.level ?? "",
			x: row.x,
			y: row.y,
			size: row.size,
			scale: row.scale,
			group: row.group
		})) ?? [];
	});
	const [boardLevels, setBoardLevels] = (0, import_react.useState)({
		OSRS: {},
		RS3: {}
	});
	const [armedSkill, setArmedSkill] = (0, import_react.useState)(null);
	const [pickedSkill, setPickedSkill] = (0, import_react.useState)(null);
	const [pickedText, setPickedText] = (0, import_react.useState)(null);
	const [textPos, setTextPos] = (0, import_react.useState)({});
	const [textScale, setTextScale] = (0, import_react.useState)(saved.textScale ?? {});
	const [plateCaption, setPlateCaption] = (0, import_react.useState)("");
	const [saveNote, setSaveNote] = (0, import_react.useState)("");
	const [ghostZone, setGhostZone] = (0, import_react.useState)("none");
	const [customMarks, setCustomMarks] = (0, import_react.useState)([]);
	const markFileRef = (0, import_react.useRef)(null);
	const customMarksRef = (0, import_react.useRef)(customMarks);
	customMarksRef.current = customMarks;
	(0, import_react.useEffect)(() => () => {
		for (const mark of customMarksRef.current) if (mark.src.startsWith("blob:")) URL.revokeObjectURL(mark.src);
	}, []);
	const boxesRef = (0, import_react.useRef)([]);
	const dragRef = (0, import_react.useRef)(null);
	const [placeCap, setPlaceCap] = (0, import_react.useState)(12);
	const [placeGod, setPlaceGod] = (0, import_react.useState)(null);
	const [status, setStatus] = (0, import_react.useState)("Ready");
	const [plateFontOk, setPlateFontOk] = (0, import_react.useState)(false);
	const canvasRef = (0, import_react.useRef)(null);
	const previewRef = (0, import_react.useRef)(null);
	const stillCacheRef = (0, import_react.useRef)(null);
	const stampBitmaps = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	const dirtyRef = (0, import_react.useRef)(false);
	const rafRef = (0, import_react.useRef)(0);
	const draggingRef = (0, import_react.useRef)(false);
	const scalingRef = (0, import_react.useRef)(false);
	const scaleTimer = (0, import_react.useRef)(0);
	const peteClicks = (0, import_react.useRef)(0);
	const peteLevel = (0, import_react.useRef)(0);
	const pointersRef = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	const pinchRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		ensurePlateFont().then((ok) => {
			setPlateFontOk(ok);
			requestPaint();
		});
		const onShow = (event) => {
			if (event.persisted) setPlaceCap((n) => n);
		};
		window.addEventListener("pageshow", onShow);
		return () => window.removeEventListener("pageshow", onShow);
	}, []);
	(0, import_react.useEffect)(() => {
		return () => {
			const src = customSrc;
			if (src?.startsWith("blob:")) URL.revokeObjectURL(src);
		};
	}, [customSrc]);
	(0, import_react.useEffect)(() => {
		if (!boot.locationId && typeof window !== "undefined" && window.location.hash !== "#desk") return;
		const go = () => {
			document.getElementById("desk")?.scrollIntoView({
				block: "start",
				behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
			});
			canvasRef.current?.focus();
		};
		const id = window.requestAnimationFrame(go);
		return () => window.cancelAnimationFrame(id);
	}, [boot.locationId]);
	const fileRef = (0, import_react.useRef)(null);
	const customFileRef = (0, import_react.useRef)(null);
	const [grabbing, setGrabbing] = (0, import_react.useState)(false);
	const [overIcon, setOverIcon] = (0, import_react.useState)(false);
	const [bannerCaps, setBannerCaps] = (0, import_react.useState)(false);
	const location = LOCATIONS.find((l) => l.id === locationId) ?? LOCATIONS[0];
	const size = BANNER_SIZES.find((s) => s.id === sizeId) ?? BANNER_SIZES[0];
	useDeskEggs(streamer);
	useEggGestures(previewRef, () => {
		const game = location.edition === "OSRS" ? "Old School RuneScape" : "RuneScape";
		const base = `It's ${location.name}, ${game}.`;
		return location.kind === "boss" ? `${base} I wouldn't like to fight that from here.` : base;
	}, () => isOwnerName(streamer) ? "Nothing interesting happens. (Something interesting already happened in 2001.)" : "Nothing interesting happens.");
	const townPool = location.stills?.length ? location.stills : [location.viewA];
	const cycleSrc = townPool[(stillIndex(townPool.length, peteNow) + poolSkip) % Math.max(1, townPool.length)] ?? location.viewA;
	const safeCycle = stillAllowed(cycleSrc, location.edition) ? cycleSrc : location.viewA;
	(0, import_react.useEffect)(() => {
		const next = townPool[(stillIndex(townPool.length, peteNow) + 1) % Math.max(1, townPool.length)];
		if (!next) return;
		let idle = 0;
		let usedIdle = false;
		const warm = () => {
			if (document.hidden) return;
			const img = new Image();
			img.decoding = "async";
			img.src = next;
		};
		if (typeof window.requestIdleCallback === "function") {
			idle = window.requestIdleCallback(warm);
			usedIdle = true;
		} else idle = window.setTimeout(warm, 400);
		const onHide = () => {
			if (usedIdle) window.cancelIdleCallback(idle);
			else window.clearTimeout(idle);
		};
		document.addEventListener("visibilitychange", onHide);
		return () => {
			onHide();
			document.removeEventListener("visibilitychange", onHide);
		};
	}, [
		cycleSrc,
		townPool,
		peteNow
	]);
	const sceneSrc = customSrc ?? deskStillSrc ?? (viewLocked ? view === "b" && location.viewB ? location.viewB : location.viewA : safeCycle);
	function clearStampsAndText() {
		setSkillPicks([]);
		setArmedSkill(null);
		setPickedSkill(null);
		setStreamer("");
		setClan("");
		setHandle("");
		setTagline("");
		setWorld("");
		setDiscord("");
		setGrind("");
		setTextPos({});
		setTextScale({});
		setPickedText(null);
	}
	function pickLocation(id) {
		setLocationId(id);
		setPoolSkip(0);
		const loc = LOCATIONS.find((item) => item.id === id);
		if (loc) {
			setEdition(loc.edition);
			setKind(loc.kind);
		}
	}
	function applyStill(id, nextView, src) {
		const loc = LOCATIONS.find((item) => item.id === id);
		const cardSrc = src || townPlateSrc(id) || loc?.viewA;
		if (!cardSrc) {
			setStatus("The picture is not here. Try another street.");
			return;
		}
		if (!(id === locationId && !customSrc)) clearStampsAndText();
		pickLocation(id);
		setDeskStillSrc(cardSrc);
		setView(nextView ?? "a");
		setViewLocked(true);
		setCustomSrc((prev) => {
			if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
			return null;
		});
		setSceneReady(true);
		putStillOnDesk({
			stillSrc: cardSrc,
			locationId: id,
			edition: loc?.edition
		});
		if (typeof document !== "undefined") {
			document.getElementById("desk")?.scrollIntoView({
				block: "start",
				behavior: "smooth"
			});
			canvasRef.current?.focus();
		}
	}
	const catalog = [
		...SKILLS,
		...MARKS,
		...customMarks.map((mark) => ({
			id: mark.id,
			name: mark.name,
			editions: [mark.game],
			src: mark.src
		}))
	];
	function stampFile(id, game) {
		return catalog.find((item) => item.id === id && item.editions.includes(game)) ?? catalog.find((item) => item.id === id);
	}
	function dropIllegal(pack) {
		setSkillPicks((cur) => cur.filter((item) => catalog.some((row) => row.id === item.id && row.editions.includes(pack))));
	}
	function isMark(id) {
		return MARKS.some((mark) => mark.id === id) || id.startsWith("mark-custom-");
	}
	function packMates(id) {
		const hit = skillPicksRef.current.find((item) => item.id === id);
		if (!hit?.group) return skillPicksRef.current.filter((item) => item.id === id);
		return skillPicksRef.current.filter((item) => item.group === hit.group);
	}
	function packScaleMax(count) {
		const m = plateMetrics(size.width, size.height);
		const cols = skillPack === "OSRS" ? 8 : 9;
		const rows = Math.max(1, Math.ceil(count / cols));
		const icon = m.icon;
		const levelW = Math.round(m.level * 2.1);
		const gap = m.gap;
		const strideX = icon + levelW + gap;
		const strideY = icon + gap;
		const maxW = (size.width - 2 * m.pad) / Math.max(1, cols * strideX - gap);
		const maxH = size.height * .62 / Math.max(1, rows * strideY - gap);
		return Math.max(.8, Math.min(maxW, maxH, 2));
	}
	function packScale(count) {
		return Math.min(1, packScaleMax(count));
	}
	function layoutAllGrid(count, packScaleValue) {
		const m = plateMetrics(size.width, size.height);
		const cols = skillPack === "OSRS" ? 8 : 9;
		const scale = Math.max(.8, Math.min(packScaleValue, packScaleMax(count)));
		const icon = Math.round(m.icon * scale);
		const levelW = Math.round(m.level * 2.1 * scale);
		const gap = Math.round(m.gap * scale);
		const strideX = icon + levelW + gap;
		const strideY = icon + gap;
		const rows = Math.max(1, Math.ceil(count / cols));
		const gridW = cols * strideX - gap;
		const gridH = rows * strideY - gap;
		return {
			cols,
			rows,
			icon,
			levelW,
			gap,
			strideX,
			strideY,
			originX: Math.round((size.width - gridW) / 2),
			originY: Math.round(Math.max(m.top + m.name + 12, (size.height - gridH) / 2 + m.name * .35)),
			scale,
			cell: icon
		};
	}
	function placeAllPack(packScaleValue) {
		const pack = SKILLS.filter((skill) => skill.editions.includes(skillPack));
		const kept = skillPicksRef.current.filter((item) => isMark(item.id)).slice(0, 16);
		const wanted = packScaleValue ?? packScale(pack.length);
		const grid = layoutAllGrid(pack.length, wanted);
		const next = [...pack.map((skill, i) => {
			const col = i % grid.cols;
			const row = Math.floor(i / grid.cols);
			const lastCount = pack.length % grid.cols || grid.cols;
			const rowShift = row === grid.rows - 1 && lastCount < grid.cols ? Math.round((grid.cols - lastCount) * grid.strideX / 2) : 0;
			return {
				id: skill.id,
				game: skillPack,
				level: boardLevels[skillPack][skill.id] ?? "",
				x: grid.originX + rowShift + col * grid.strideX,
				y: grid.originY + row * grid.strideY,
				size: grid.icon,
				scale: 1,
				group: "skills-all"
			};
		}), ...kept];
		skillPicksRef.current = next;
		setSkillPicks(next);
	}
	function placeStamp(id) {
		setSkillPicks((cur) => {
			if (cur.find((item) => item.id === id)) {
				setPickedSkill(id);
				return cur;
			}
			const marks = cur.filter((item) => isMark(item.id)).length;
			if (isMark(id) && marks >= 16) {
				setStatus("Sixteen marks on this banner.");
				return cur;
			}
			const n = cur.length;
			const scale = packScale(n + 1);
			const mark = skillSize * scale;
			const left = Math.round(size.width * .04);
			const x = skillPlace === "name" ? left + n * (mark + 6) : Math.round(size.width * .06 + n % 8 * (mark + 8));
			const y = skillPlace === "name" ? Math.round(size.height * .28) : Math.round(size.height * .52 + Math.floor(n / 8) * (mark + 8));
			setPickedSkill(id);
			setArmedSkill(null);
			return [...cur, {
				id,
				game: skillPack,
				level: boardLevels[skillPack][id] ?? "",
				x,
				y,
				size: skillSize,
				scale
			}];
		});
	}
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			const el = e.target;
			if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT")) return;
			if (e.key === "Delete" || e.key === "Backspace") {
				const drag = dragRef.current;
				const skillId = drag?.kind === "skill" ? drag.id : pickedSkill;
				const textId = drag?.kind === "text" ? drag.id : pickedText;
				if (!skillId && !textId) return;
				e.preventDefault();
				if (drag) try {
					canvasRef.current?.releasePointerCapture?.(drag);
				} catch {}
				dragRef.current = null;
				setGrabbing(false);
				if (skillId) {
					setSkillPicks((cur) => {
						const lead = cur.find((item) => item.id === skillId);
						if (lead?.group) return cur.filter((item) => item.group !== lead.group);
						return cur.filter((item) => item.id !== skillId);
					});
					setPickedSkill(null);
				}
				if (textId) {
					if (textId === "streamer") setStreamer("");
					else if (textId === "clan") setClan("");
					else if (textId === "handle") setHandle("");
					else if (textId.startsWith("tagline")) setTagline("");
					else if (textId.startsWith("extra")) {
						setWorld("");
						setGrind("");
						setDiscord("");
					}
					setTextPos((cur) => {
						const next = { ...cur };
						delete next[textId];
						return next;
					});
					setPickedText(null);
				}
				return;
			}
			if (e.key === "Escape") {
				setPickedSkill(null);
				setPickedText(null);
				setArmedSkill(null);
				window.dispatchEvent(new Event("rs-close-menu"));
				return;
			}
			const lead = skillPicks.find((row) => row.id === pickedSkill);
			const stepBase = e.shiftKey ? 8 : 2;
			if ([
				"ArrowUp",
				"ArrowDown",
				"ArrowLeft",
				"ArrowRight"
			].includes(e.key)) {
				e.preventDefault();
				const dir = e.key.replace("Arrow", "").toLowerCase();
				if (pickedText) {
					const step = stepBase;
					setTextPos((cur) => {
						const pos = cur[pickedText] ?? boxesRef.current.find((box) => box.id === pickedText);
						if (!pos) return cur;
						let x = pos.x;
						let y = pos.y;
						if (dir === "left") x = Math.max(8, x - step);
						if (dir === "right") x = Math.min(size.width - 40, x + step);
						if (dir === "up") y = Math.max(8, y - step);
						if (dir === "down") y = Math.min(size.height - 16, y + step);
						return {
							...cur,
							[pickedText]: {
								x,
								y
							}
						};
					});
					return;
				}
				setSkillPicks((cur) => cur.map((item) => {
					if (!(lead?.group && item.group === lead.group) && item.id !== pickedSkill || item.x == null || item.y == null) return item;
					const mark = Math.max(28, (item.size ?? skillSize) * (item.scale ?? 1));
					const step = stepBase * (item.scale ?? 1);
					let x = item.x;
					let y = item.y;
					if (dir === "left") x = Math.max(0, x - step);
					if (dir === "right") x = Math.min(size.width - mark, x + step);
					if (dir === "up") y = Math.max(0, y - step);
					if (dir === "down") y = Math.min(size.height - mark, y + step);
					return {
						...item,
						x,
						y,
						scale: item.scale ?? 1
					};
				}));
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [
		pickedSkill,
		pickedText,
		skillSize,
		size.width,
		size.height
	]);
	(0, import_react.useEffect)(() => {
		if (draggingRef.current) return;
		const id = window.setTimeout(() => {
			writeStudioSave({
				streamer,
				clan,
				handle,
				tagline,
				world,
				discord,
				grind,
				edition,
				sizeId,
				skillPack,
				skillSize,
				skillPicks: skillPicks.map((row) => ({
					id: row.id,
					game: row.game,
					level: row.level,
					x: row.x,
					y: row.y,
					size: row.size,
					scale: row.scale,
					group: row.group
				})),
				textScale,
				locationId,
				view,
				stillSrc: deskStillSrc ?? void 0
			});
		}, 400);
		return () => window.clearTimeout(id);
	}, [
		streamer,
		clan,
		handle,
		tagline,
		world,
		discord,
		grind,
		edition,
		sizeId,
		skillPack,
		skillSize,
		locationId,
		view,
		skillPicks,
		textScale,
		deskStillSrc
	]);
	const skillPicksRef = (0, import_react.useRef)(skillPicks);
	if (!draggingRef.current && !scalingRef.current) skillPicksRef.current = skillPicks;
	const textPosRef = (0, import_react.useRef)(textPos);
	if (!draggingRef.current && !scalingRef.current) textPosRef.current = textPos;
	const textScaleRef = (0, import_react.useRef)(textScale);
	textScaleRef.current = textScale;
	const copyRef = (0, import_react.useRef)({
		streamer,
		clan,
		handle,
		tagline,
		world,
		discord,
		grind,
		edition,
		skillPlace,
		skillSize,
		skillX,
		skillY,
		god: location.god,
		caps: bannerCaps
	});
	copyRef.current = {
		streamer,
		clan,
		handle,
		tagline,
		world,
		discord,
		grind,
		edition,
		skillPlace,
		skillSize,
		skillX,
		skillY,
		god: location.god,
		caps: bannerCaps
	};
	function coverStill(ctx, img, w, h) {
		const src = img;
		const sw = Math.max(1, src.naturalWidth ?? src.width ?? w);
		const sh = Math.max(1, src.naturalHeight ?? src.height ?? h);
		const srcRatio = sw / sh;
		const dstRatio = w / Math.max(1, h);
		let sx = 0;
		let sy = 0;
		let tw = sw;
		let th = sh;
		if (srcRatio > dstRatio) {
			tw = sh * dstRatio;
			sx = (sw - tw) / 2;
		} else {
			th = sw / dstRatio;
			sy = (sh - th) / 2;
		}
		ctx.drawImage(img, sx, sy, tw, th, 0, 0, w, h);
	}
	function paintNow() {
		const canvas = canvasRef.current;
		if (!canvas) return;
		if (canvas.width !== size.width) canvas.width = size.width;
		if (canvas.height !== size.height) canvas.height = size.height;
		const still = stillCacheRef.current;
		const ctx = canvas.getContext("2d", {
			alpha: true,
			willReadFrequently: false
		});
		if (!ctx) return;
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, size.width, size.height);
		ctx.imageSmoothingEnabled = edition !== "OSRS" && !draggingRef.current;
		if (ctx.imageSmoothingEnabled) ctx.imageSmoothingQuality = "high";
		const catalog = [
			...SKILLS,
			...MARKS,
			...customMarks.map((mark) => ({
				id: mark.id,
				name: mark.name,
				editions: [mark.game],
				src: mark.src
			}))
		];
		const icons = [];
		for (const pick of skillPicksRef.current) {
			const skill = stampFile(pick.id, pick.game) ?? catalog.find((item) => item.id === pick.id);
			const img = skill ? stampBitmaps.current.get(skill.src) : void 0;
			if (!skill || !img) continue;
			icons.push({
				id: skill.id,
				img,
				level: pick.level ?? "",
				x: pick.x,
				y: pick.y,
				size: pick.size ?? skillSize,
				scale: pick.scale ?? 1
			});
		}
		const copy = copyRef.current;
		drawBanner(ctx, still ?? canvas, {
			showRules: false,
			overlayOnly: true,
			streamer: copy.streamer,
			clan: copy.clan,
			handle: copy.handle,
			tagline: copy.tagline,
			god: copy.god,
			world: copy.world,
			maxed: false,
			mode: "",
			focus: "",
			style: "",
			cape: "",
			discord: copy.discord,
			grind: copy.grind,
			learners: false,
			layout: "banner",
			vosLine: "",
			showSafeZones: false,
			safeZone: "none",
			showGod: false,
			edition: copy.edition,
			caps: copy.caps,
			textColor: "#ffff00",
			rulesTitle: "",
			honourHead: "",
			honourBody: "",
			respectHead: "",
			respectBody: "",
			securityHead: "",
			securityBody: "",
			width: size.width,
			height: size.height,
			skillIcons: icons,
			skillX: copy.skillX,
			skillY: copy.skillY,
			skillPlace: copy.skillPlace,
			skillSize: copy.skillSize,
			textPos: textPosRef.current,
			textScale: textScaleRef.current,
			onSkillBoxes: (boxes) => {
				boxesRef.current = boxes;
			}
		});
	}
	function requestPaint() {
		dirtyRef.current = true;
		if (rafRef.current) return;
		rafRef.current = window.requestAnimationFrame(() => {
			rafRef.current = 0;
			if (document.visibilityState === "hidden") return;
			if (!dirtyRef.current) return;
			dirtyRef.current = false;
			paintNow();
		});
	}
	function scaleSelected(delta, skillOverride) {
		const skillId = skillOverride ?? pickedSkill;
		if (skillId) {
			const old0 = skillPicksRef.current.find((item) => item.id === skillId)?.scale ?? 1;
			applyStampScale(skillId, Math.min(2.5, Math.max(.5, old0 + delta)));
			return;
		}
		if (!pickedText) return;
		const box = boxesRef.current.find((row) => row.id === pickedText);
		const old = textScaleRef.current[pickedText] ?? 1;
		const nextScale = Math.min(2, Math.max(.75, old + delta));
		if (box) {
			const cx = box.x + box.w / 2;
			const cy = box.y + box.h / 2;
			const ratio = nextScale / Math.max(.01, old);
			textPosRef.current = {
				...textPosRef.current,
				[pickedText]: {
					x: cx - box.w * ratio / 2,
					y: cy - box.h * ratio / 2
				}
			};
		}
		textScaleRef.current = {
			...textScaleRef.current,
			[pickedText]: nextScale
		};
		requestPaint();
		window.clearTimeout(scaleTimer.current);
		scaleTimer.current = window.setTimeout(() => {
			setTextPos(textPosRef.current);
			setTextScale({ ...textScaleRef.current });
		}, 140);
	}
	function applyStampScale(skillId, nextScale) {
		scalingRef.current = true;
		const mates = packMates(skillId).filter((item) => item.x != null && item.y != null);
		const targets = mates.length ? mates : skillPicksRef.current.filter((item) => item.id === skillId && item.x != null);
		if (!targets.length) {
			scalingRef.current = false;
			return;
		}
		const old0 = targets[0].scale ?? 1;
		const scale = Math.min(2.5, Math.max(.5, nextScale));
		const ratio = scale / Math.max(.01, old0);
		let gx = 0;
		let gy = 0;
		for (const item of targets) {
			const base = item.size ?? skillSize;
			const old = item.scale ?? 1;
			gx += item.x + base * old / 2;
			gy += item.y + base * old / 2;
		}
		gx /= targets.length;
		gy /= targets.length;
		skillPicksRef.current = skillPicksRef.current.map((item) => {
			if (!targets.some((row) => row.id === item.id) || item.x == null || item.y == null) return item;
			const old = item.scale ?? 1;
			const base = item.size ?? skillSize;
			const cx = item.x + base * old / 2;
			const cy = item.y + base * old / 2;
			const nx = gx + (cx - gx) * ratio - base * scale / 2;
			const ny = gy + (cy - gy) * ratio - base * scale / 2;
			return {
				...item,
				scale,
				x: Math.max(0, Math.min(size.width - base * scale, nx)),
				y: Math.max(0, Math.min(size.height - base * scale, ny))
			};
		});
		requestPaint();
		window.clearTimeout(scaleTimer.current);
		scaleTimer.current = window.setTimeout(() => {
			scalingRef.current = false;
			setSkillPicks(skillPicksRef.current);
		}, 140);
	}
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const stopPage = (e) => {
			if (pickedSkill || pickedText) e.preventDefault();
		};
		canvas.addEventListener("wheel", stopPage, { passive: false });
		return () => canvas.removeEventListener("wheel", stopPage);
	}, [pickedSkill, pickedText]);
	(0, import_react.useEffect)(() => {
		let gone = false;
		const folder = location.edition === "OSRS" ? "osrs" : "rs3";
		const bare = (src) => src.split("?")[0];
		const tries = [
			customSrc,
			deskStillSrc,
			"/Falador.png",
			sceneSrc,
			location.viewA,
			...location.stills ?? [],
			`/locations/${location.id}.jpg`,
			`/stills/${folder}/${location.id}.jpg`,
			`/stills/${folder}/${location.id}-a.jpg`
		].filter(Boolean).map((src) => bare(String(src))).filter((src, i, arr) => arr.indexOf(src) === i);
		function failPlate() {
			const cache = stillCacheRef.current ?? document.createElement("canvas");
			cache.width = size.width;
			cache.height = size.height;
			const c = cache.getContext("2d", { alpha: false });
			if (c) {
				c.fillStyle = "#1a1610";
				c.fillRect(0, 0, size.width, size.height);
			}
			stillCacheRef.current = cache;
			requestPaint();
			setStatus("The picture is not here. Try another street.");
		}
		function useImg(img) {
			if (gone) return;
			const cache = stillCacheRef.current ?? document.createElement("canvas");
			cache.width = size.width;
			cache.height = size.height;
			const c = cache.getContext("2d", { alpha: false });
			if (!c) return;
			c.imageSmoothingEnabled = true;
			c.imageSmoothingQuality = "high";
			coverStill(c, img, size.width, size.height);
			stillCacheRef.current = cache;
			requestPaint();
			setStatus("Ready");
		}
		let i = 0;
		const next = () => {
			if (gone) return;
			if (i >= tries.length) {
				if (!customSrc && !viewLocked && townPool.length > 1 && poolSkip < townPool.length - 1) {
					setPoolSkip((n) => n + 1);
					return;
				}
				failPlate();
				return;
			}
			const src = tries[i++];
			const img = new Image();
			img.decoding = "async";
			img.onload = () => useImg(img);
			img.onerror = () => next();
			img.src = src;
		};
		next();
		return () => {
			gone = true;
		};
	}, [
		sceneSrc,
		size.width,
		size.height,
		location.id,
		location.viewA,
		customSrc
	]);
	(0, import_react.useEffect)(() => {
		let gone = false;
		const catalog = [
			...SKILLS,
			...MARKS,
			...customMarks.map((mark) => ({
				id: mark.id,
				name: mark.name,
				editions: [mark.game],
				src: mark.src
			}))
		];
		(async () => {
			for (const pick of skillPicks) {
				const skill = stampFile(pick.id, pick.game) ?? catalog.find((item) => item.id === pick.id);
				if (!skill || stampBitmaps.current.has(skill.src)) continue;
				try {
					const img = await loadImage(skill.src);
					if (gone) return;
					stampBitmaps.current.set(skill.src, img);
				} catch {}
			}
			requestPaint();
		})();
		return () => {
			gone = true;
		};
	}, [
		skillPicks,
		customMarks,
		streamer,
		clan,
		handle,
		tagline,
		world,
		discord,
		grind,
		textPos,
		textScale,
		skillSize,
		skillPlace,
		edition,
		bannerCaps
	]);
	(0, import_react.useEffect)(() => {
		const el = canvasRef.current;
		if (!el) return;
		const stop = (e) => {
			e.preventDefault();
		};
		el.addEventListener("wheel", stop, { passive: false });
		return () => el.removeEventListener("wheel", stop);
	}, [
		pickedSkill,
		pickedText,
		overIcon
	]);
	function downloadJpeg() {
		const overlay = canvasRef.current;
		const still = stillCacheRef.current;
		if (!overlay) return;
		const out = document.createElement("canvas");
		out.width = size.width;
		out.height = size.height;
		const ctx = out.getContext("2d", { alpha: false });
		if (!ctx) {
			setSaveNote("Could not save. Try 1200×480.");
			return;
		}
		ctx.fillStyle = "#1a1610";
		ctx.fillRect(0, 0, out.width, out.height);
		if (still && still.width && still.height) coverStill(ctx, still, out.width, out.height);
		else {
			const plate = document.getElementById("still");
			if (plate && plate.naturalWidth) coverStill(ctx, plate, out.width, out.height);
		}
		ctx.drawImage(overlay, 0, 0, out.width, out.height);
		out.toBlob((blob) => {
			if (!blob) {
				setSaveNote("Could not save. Try 1200×480.");
				return;
			}
			const who = sanitizeDisplayName(streamer);
			const worldTag = sanitizeWorld(world) ? `-w${sanitizeWorld(world)}` : "";
			const a = document.createElement("a");
			a.href = URL.createObjectURL(blob);
			a.download = `banner-${edition.toLowerCase()}-${(who || "desk").replace(/\s+/g, "-")}${worldTag}-${location.id}-${size.width}x${size.height}.jpg`;
			a.click();
			URL.revokeObjectURL(a.href);
			if (!who) setSaveNote("Saved without a name.");
			else setSaveNote(`Saved ${size.width}×${size.height}.`);
		}, "image/jpeg", .92);
	}
	const visible = LOCATIONS.filter((loc) => {
		if (loc.edition !== edition) return false;
		if (placeGod && loc.god !== placeGod) return false;
		if (kind === "boss") return loc.kind === "boss" && Boolean(noteFor(loc.id));
		return loc.kind === "town" && Boolean(townNote(loc.id));
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EggToast, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, { skip: {
				href: "#desk",
				label: "Skip to desk"
			} }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TownHero, { onTown: (name, ed) => setHeroTown({
				name,
				edition: ed
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OracleLine, {
				place: heroTown.name,
				edition: heroTown.edition
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TodayDesk, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfficialPulse, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "page-band py-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "section-h2",
						children: "Places to visit"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceRail, {
							section: kind === "boss" ? "bosses" : "towns",
							edition,
							god: placeGod,
							onEdition: (next) => {
								setEdition(next);
								setSkillPack(next);
								const nextLoc = LOCATIONS.find((loc) => loc.kind === kind && loc.edition === next);
								if (nextLoc) setLocationId(nextLoc.id);
							},
							onGod: setPlaceGod,
							onSection: (next) => {
								if (next === "towns") setKind("town");
								if (next === "bosses") setKind("boss");
								setPlaceCap(12);
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4",
						children: visible.slice(0, placeCap).map((loc, i) => {
							const raw = loc.stills?.length ? loc.stills[stillIndex(loc.stills.length, peteNow)] : loc.viewA;
							const src = stillAllowed(raw, loc.edition) ? raw : loc.viewA;
							const href = loc.kind === "boss" ? bossPath(loc.id) : townPath(loc.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "overflow-hidden rounded-md border border-line hover:border-[#F5C400]",
								"data-place-card": true,
								"data-slug": loc.id,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "block w-full text-left [touch-action:manipulation]",
										onClick: () => {
											applyStill(loc.id, "a", src);
											document.getElementById("desk")?.scrollIntoView({
												behavior: "smooth",
												block: "start"
											});
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StillPhoto, {
											src,
											alt: `${loc.name}, ${loc.region}`,
											priority: i < 2,
											className: "aspect-video w-full object-cover [content-visibility:auto]"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLink, {
										href,
										className: "site-title block truncate px-2 pt-1.5 text-center text-sm no-underline",
										children: loc.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "px-2 pb-2 text-center text-[10px] text-faint",
										children: [
											loc.region.replace(/\s·\sOSRS$/, ""),
											" · ",
											loc.god
										]
									})
								]
							}, loc.id);
						})
					}),
					visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-sm text-muted",
						children: "Nothing interesting happens."
					}) : null,
					visible.length > placeCap ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "mt-3 text-xs text-parchment",
						onClick: () => setPlaceCap((n) => n + 12),
						children: "Show more"
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "desk",
				className: "page-band scroll-mt-24 py-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-2 [contain:layout]",
						style: {
							background: "#241e16",
							border: "2px solid #c6a45a",
							borderRadius: 6,
							boxShadow: "inset 0 2px 10px rgba(0,0,0,0.45), inset 0 1px 0 rgba(198,164,90,0.18)"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								id: "plate",
								className: "desk-preview-well relative mx-auto w-full overflow-hidden",
								ref: previewRef,
								style: {
									maxWidth: size.height > size.width ? "22rem" : "56rem",
									aspectRatio: `${size.width} / ${size.height}`,
									background: "#1a1610",
									boxShadow: "inset 0 8px 18px rgba(0,0,0,0.35)"
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										id: "still",
										alt: "",
										src: customSrc || deskStillSrc || location.viewA || "/Falador.png",
										className: "pointer-events-none absolute inset-0 h-full w-full object-cover",
										onLoad: (e) => {
											e.currentTarget.dataset.ok = e.currentTarget.currentSrc;
											setPlateCaption(`${location.name} · ${size.width}×${size.height} JPEG · ${size.note}`);
										},
										onError: (e) => {
											const last = e.currentTarget.dataset.ok;
											if (last && e.currentTarget.src !== last) e.currentTarget.src = last;
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
										id: "overlay",
										ref: canvasRef,
										width: size.width,
										height: size.height,
										className: `desk-preview absolute inset-0 h-full w-full touch-none object-cover ${grabbing ? "cursor-grabbing" : overIcon ? "cursor-grab" : "cursor-default"}`,
										tabIndex: 0,
										role: "img",
										"aria-label": `${location.name}, ${edition === "OSRS" ? "Old School RuneScape" : "RuneScape"}`,
										onWheel: (e) => {
											const canvas = canvasRef.current;
											if (!canvas) return;
											const rect = canvas.getBoundingClientRect();
											const x = (e.clientX - rect.left) / rect.width * size.width;
											const y = (e.clientY - rect.top) / rect.height * size.height;
											const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 120 : 1;
											const factor = Math.exp(-e.deltaY * unit * .0024);
											let skillId = pickedSkill;
											if (!skillId) {
												const hit = [...skillPicksRef.current].reverse().find((item) => {
													if (item.x == null || item.y == null) return false;
													const mark = Math.max(28, (item.size ?? skillSize) * (item.scale ?? 1));
													return x >= item.x && x <= item.x + mark && y >= item.y && y <= item.y + mark;
												});
												if (hit) {
													skillId = hit.id;
													setPickedSkill(hit.id);
													setPickedText(null);
												}
											}
											if (skillId) {
												e.preventDefault();
												const old = skillPicksRef.current.find((item) => item.id === skillId)?.scale ?? 1;
												const next = e.shiftKey ? Math.min(2.5, Math.max(.5, old + (e.deltaY > 0 ? -.25 : .25))) : Math.min(2.5, Math.max(.5, old * factor));
												applyStampScale(skillId, next);
												return;
											}
											let textId = pickedText;
											if (!textId) {
												const hit = [...boxesRef.current].reverse().find((box) => {
													if (skillPicksRef.current.some((item) => item.id === box.id)) return false;
													const hw = Math.max(28, box.w);
													const hh = Math.max(28, box.h);
													return x >= box.x && x <= box.x + hw && y >= box.y && y <= box.y + hh;
												});
												if (hit) {
													textId = hit.id;
													setPickedText(hit.id);
													setPickedSkill(null);
												}
											}
											if (!textId) return;
											e.preventDefault();
											const old = textScaleRef.current[textId] ?? 1;
											const next = e.shiftKey ? Math.min(2, Math.max(.75, old + (e.deltaY > 0 ? -.25 : .25))) : Math.min(2, Math.max(.75, old * factor));
											const box = boxesRef.current.find((row) => row.id === textId);
											if (box) {
												const ratio = next / Math.max(.01, old);
												textPosRef.current = {
													...textPosRef.current,
													[textId]: {
														x: box.x + box.w / 2 - box.w * ratio / 2,
														y: box.y + box.h / 2 - box.h * ratio / 2
													}
												};
											}
											textScaleRef.current = {
												...textScaleRef.current,
												[textId]: next
											};
											requestPaint();
											window.clearTimeout(scaleTimer.current);
											scaleTimer.current = window.setTimeout(() => {
												setTextPos(textPosRef.current);
												setTextScale({ ...textScaleRef.current });
											}, 140);
										},
										onPointerDown: (e) => {
											const canvas = canvasRef.current;
											if (!canvas) return;
											pointersRef.current.set(e.pointerId, {
												x: e.clientX,
												y: e.clientY
											});
											const rect = canvas.getBoundingClientRect();
											const x = (e.clientX - rect.left) / rect.width * size.width;
											const y = (e.clientY - rect.top) / rect.height * size.height;
											Math.max(8, 44 * size.width / Math.max(1, rect.width));
											if (pointersRef.current.size >= 2 && (pickedSkill || pickedText)) {
												const pts = [...pointersRef.current.values()];
												pinchRef.current = {
													dist: Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y),
													scale: pickedSkill ? skillPicksRef.current.find((item) => item.id === pickedSkill)?.scale ?? 1 : textScaleRef.current[pickedText ?? ""] ?? 1
												};
												canvas.setPointerCapture(e.pointerId);
												return;
											}
											if (armedSkill) {
												const marksOn = skillPicksRef.current.filter((item) => isMark(item.id)).length;
												if (isMark(armedSkill) && marksOn >= 16) {
													setStatus("Sixteen marks on this banner.");
													setArmedSkill(null);
													return;
												}
												const prev = skillPicksRef.current.find((item) => item.id === armedSkill);
												const scale = prev?.scale ?? 1;
												const mark = Math.max(28, skillSize * scale);
												const px = Math.max(0, Math.min(size.width - mark, x));
												const py = Math.max(0, Math.min(size.height - mark, y));
												setSkillPicks((cur) => [...cur.filter((item) => item.id !== armedSkill), {
													id: armedSkill,
													game: skillPack,
													level: boardLevels[skillPack][armedSkill] ?? prev?.level ?? "",
													x: px,
													y: py,
													size: prev?.size ?? skillSize,
													scale
												}]);
												setPickedSkill(armedSkill);
												setArmedSkill(null);
												return;
											}
											const skillHit = [...skillPicksRef.current].reverse().find((item) => {
												if (item.x == null || item.y == null) return false;
												const mark = Math.max(28, (item.size ?? skillSize) * (item.scale ?? 1));
												return x >= item.x && x <= item.x + mark && y >= item.y && y <= item.y + mark;
											});
											if (skillHit && skillHit.x != null && skillHit.y != null) {
												setPickedSkill(skillHit.id);
												setPickedText(null);
												if (e.detail >= 2) return;
												setGrabbing(true);
												draggingRef.current = true;
												dragRef.current = {
													id: skillHit.id,
													x0: skillHit.x,
													y0: skillHit.y,
													px: e.clientX,
													py: e.clientY,
													kind: "skill",
													mates: packMates(skillHit.id).filter((item) => item.x != null && item.y != null).map((item) => ({
														id: item.id,
														x0: item.x,
														y0: item.y
													}))
												};
												e.target.setPointerCapture(e.pointerId);
												return;
											}
											const textHit = [...boxesRef.current].reverse().find((box) => {
												if (skillPicksRef.current.some((item) => item.id === box.id)) return false;
												const hw = Math.max(28, box.w);
												const hh = Math.max(28, box.h);
												return x >= box.x && x <= box.x + hw && y >= box.y && y <= box.y + hh;
											});
											if (!textHit) {
												if (pickedSkill) {
													const lead = skillPicksRef.current.find((item) => item.id === pickedSkill);
													if (lead) {
														const mark = Math.max(28, (lead.size ?? skillSize) * (lead.scale ?? 1));
														const px = Math.max(0, Math.min(size.width - mark, x));
														const py = Math.max(0, Math.min(size.height - mark, y));
														const mates = packMates(pickedSkill).filter((item) => item.x != null && item.y != null);
														const dx = px - (lead.x ?? 0);
														const dy = py - (lead.y ?? 0);
														setSkillPicks((cur) => cur.map((item) => {
															if (!mates.find((row) => row.id === item.id) || item.x == null || item.y == null) {
																if (item.id !== pickedSkill) return item;
																return {
																	...item,
																	x: px,
																	y: py,
																	scale: item.scale ?? 1
																};
															}
															const extent = Math.max(28, (item.size ?? skillSize) * (item.scale ?? 1));
															return {
																...item,
																scale: item.scale ?? 1,
																x: Math.max(0, Math.min(size.width - extent, item.x + dx)),
																y: Math.max(0, Math.min(size.height - extent, item.y + dy))
															};
														}));
													}
													return;
												}
												setPickedSkill(null);
												setPickedText(null);
												return;
											}
											setPickedText(textHit.id);
											setPickedSkill(null);
											setGrabbing(true);
											draggingRef.current = true;
											dragRef.current = {
												id: textHit.id,
												x0: textHit.x,
												y0: textHit.y,
												px: e.clientX,
												py: e.clientY,
												kind: "text"
											};
											e.target.setPointerCapture(e.pointerId);
										},
										onPointerMove: (e) => {
											const canvas = canvasRef.current;
											if (!canvas) return;
											if (pointersRef.current.has(e.pointerId)) pointersRef.current.set(e.pointerId, {
												x: e.clientX,
												y: e.clientY
											});
											if (pointersRef.current.size >= 2 && pinchRef.current && (pickedSkill || pickedText)) {
												e.preventDefault();
												const pts = [...pointersRef.current.values()];
												const ratio = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y) / Math.max(8, pinchRef.current.dist);
												scaleSelected((pickedSkill ? Math.min(2.5, Math.max(.5, pinchRef.current.scale * ratio)) : Math.min(2, Math.max(.75, pinchRef.current.scale * ratio))) - (pickedSkill ? skillPicksRef.current.find((item) => item.id === pickedSkill)?.scale ?? 1 : textScaleRef.current[pickedText ?? ""] ?? 1));
												return;
											}
											const rect = canvas.getBoundingClientRect();
											const x = (e.clientX - rect.left) / rect.width * size.width;
											const y = (e.clientY - rect.top) / rect.height * size.height;
											Math.max(8, 44 * size.width / Math.max(1, rect.width));
											setOverIcon(skillPicksRef.current.some((item) => {
												if (item.x == null || item.y == null) return false;
												const mark = Math.max(28, (item.size ?? skillSize) * (item.scale ?? 1));
												return x >= item.x && x <= item.x + mark && y >= item.y && y <= item.y + mark;
											}) || boxesRef.current.some((box) => {
												if (skillPicksRef.current.some((item) => item.id === box.id)) return false;
												const hw = Math.max(28, box.w);
												const hh = Math.max(28, box.h);
												return x >= box.x && x <= box.x + hw && y >= box.y && y <= box.y + hh;
											}));
											const drag = dragRef.current;
											if (!drag) return;
											e.preventDefault();
											const rectScaleX = size.width / Math.max(1, rect.width);
											const rectScaleY = size.height / Math.max(1, rect.height);
											const nx = drag.x0 + (e.clientX - drag.px) * rectScaleX;
											const ny = drag.y0 + (e.clientY - drag.py) * rectScaleY;
											if (drag.kind === "text") {
												textPosRef.current = {
													...textPosRef.current,
													[drag.id]: {
														x: Math.max(8, Math.min(size.width - 40, nx)),
														y: Math.max(16, Math.min(size.height - 8, ny))
													}
												};
												requestPaint();
												return;
											}
											if (!skillPicksRef.current.find((item) => item.id === drag.id)) return;
											const mates = drag.mates?.length ? drag.mates : [{
												id: drag.id,
												x0: drag.x0,
												y0: drag.y0
											}];
											const dx = (e.clientX - drag.px) * rectScaleX;
											const dy = (e.clientY - drag.py) * rectScaleY;
											skillPicksRef.current = skillPicksRef.current.map((item) => {
												const mate = mates.find((row) => row.id === item.id);
												if (!mate) return item;
												const mark = Math.max(28, (item.size ?? skillSize) * (item.scale ?? 1));
												return {
													...item,
													scale: item.scale ?? 1,
													x: Math.max(0, Math.min(size.width - mark, mate.x0 + dx)),
													y: Math.max(0, Math.min(size.height - mark, mate.y0 + dy))
												};
											});
											requestPaint();
										},
										onPointerUp: (e) => {
											pointersRef.current.delete(e.pointerId);
											if (pointersRef.current.size < 2) pinchRef.current = null;
											try {
												e.target.releasePointerCapture(e.pointerId);
											} catch {}
											dragRef.current = null;
											setGrabbing(false);
											draggingRef.current = false;
											setSkillPicks(skillPicksRef.current);
											setTextPos(textPosRef.current);
											requestPaint();
										},
										onPointerCancel: (e) => {
											pointersRef.current.delete(e.pointerId);
											pinchRef.current = null;
											try {
												e.target.releasePointerCapture(e.pointerId);
											} catch {}
											dragRef.current = null;
											setGrabbing(false);
											draggingRef.current = false;
											setSkillPicks(skillPicksRef.current);
											setTextPos(textPosRef.current);
											requestPaint();
										}
									}, "overlay-alpha"),
									ghostZone !== "none" ? safeZoneRects(ghostZone).map((zone) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "pointer-events-none absolute border border-dashed border-[#ffe9b0]/70 bg-black/20 text-[9px] text-[#ffe9b0]",
										style: {
											left: `${zone.x * 100}%`,
											top: `${zone.y * 100}%`,
											width: `${zone.w * 100}%`,
											height: `${zone.h * 100}%`
										},
										children: zone.label ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "px-1",
											children: zone.label
										}) : null
									}, `${zone.label}-${zone.x}-${zone.y}`)) : null
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-center text-[10px] text-muted",
								children: plateCaption || `${size.width}×${size.height} JPEG`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 flex flex-wrap justify-center gap-1",
								children: [
									"none",
									"twitch",
									"youtube",
									"discord"
								].map((zone) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: `min-h-11 rounded-md border px-2 text-[10px] ${ghostZone === zone ? "border-parchment" : "border-line"}`,
									onClick: () => setGhostZone(zone),
									children: zone === "none" ? "Ghosts off" : zone === "twitch" ? "Twitch crop" : zone === "youtube" ? "YouTube crop" : "Discord crop"
								}, zone))
							}),
							plateFontOk ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-center text-[10px] text-[#c07050]",
								children: "Font file missing"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rs-plate-probe",
								"aria-hidden": "true",
								children: "CHRISTEFER"
							}),
							LOCATIONS.some((row) => row.name === location.name && row.edition !== location.edition && row.kind === location.kind) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-center text-[10px]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "text-parchment",
									onClick: () => {
										const sister = LOCATIONS.find((row) => row.name === location.name && row.edition !== location.edition && row.kind === location.kind);
										if (!sister) return;
										setSkillPack(sister.edition);
										applyStill(sister.id, "a", sister.viewA);
									},
									children: "Same place in the other game"
								})
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex flex-wrap items-center justify-center gap-1",
								children: [
									[
										"up",
										"down",
										"left",
										"right"
									].map((dir) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										disabled: !pickedSkill && !pickedText,
										className: "min-h-11 rounded-md border border-line px-2 text-[10px] capitalize disabled:opacity-40",
										onClick: (e) => {
											const step = e.shiftKey ? 8 : 2;
											if (pickedText) {
												setTextPos((cur) => {
													const pos = cur[pickedText] ?? boxesRef.current.find((box) => box.id === pickedText);
													if (!pos) return cur;
													let x = pos.x;
													let y = pos.y;
													if (dir === "left") x = Math.max(8, x - step);
													if (dir === "right") x = Math.min(size.width - 40, x + step);
													if (dir === "up") y = Math.max(16, y - step);
													if (dir === "down") y = Math.min(size.height - 8, y + step);
													return {
														...cur,
														[pickedText]: {
															x,
															y
														}
													};
												});
												return;
											}
											setSkillPicks((cur) => cur.map((item) => {
												if (item.id !== pickedSkill || item.x == null || item.y == null) return item;
												const mark = Math.max(28, (item.size ?? skillSize) * (item.scale ?? 1));
												const move = step * (item.scale ?? 1);
												let x = item.x;
												let y = item.y;
												if (dir === "left") x = Math.max(0, x - move);
												if (dir === "right") x = Math.min(size.width - mark, x + move);
												if (dir === "up") y = Math.max(0, y - move);
												if (dir === "down") y = Math.min(size.height - mark, y + move);
												return {
													...item,
													x,
													y,
													scale: item.scale ?? 1
												};
											}));
										},
										children: dir
									}, dir)),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										disabled: !pickedSkill,
										className: "min-h-11 rounded-md border border-line px-2 text-[10px] disabled:opacity-40",
										onClick: () => {
											setSkillPicks((cur) => {
												const lead = cur.find((item) => item.id === pickedSkill);
												if (lead?.group) return cur.filter((item) => item.group !== lead.group);
												return cur.filter((item) => item.id !== pickedSkill);
											});
											setPickedSkill(null);
										},
										children: "Remove"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										disabled: !pickedSkill && !pickedText,
										className: "h-11 min-w-11 rounded-md border border-line px-2 text-[10px] disabled:opacity-40",
										onClick: () => scaleSelected(.08),
										children: "+"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										disabled: !pickedSkill && !pickedText,
										className: "h-11 min-w-11 rounded-md border border-line px-2 text-[10px] disabled:opacity-40",
										onClick: () => scaleSelected(-.08),
										children: "−"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "h-8 rounded-md border border-line px-2 text-[10px]",
										onClick: () => {
											const pool = (visible.length ? visible : LOCATIONS.filter((loc) => loc.kind === kind && loc.edition === edition)).filter((loc) => Boolean(townPlateSrc(loc.id) || loc.viewA || loc.stills?.length));
											if (!pool.length) return;
											const pick = pool[Math.floor(Math.random() * pool.length)];
											const raw = pick.stills?.length ? pick.stills[stillIndex(pick.stills.length, peteNow)] : pick.viewA;
											const src = townPlateSrc(pick.id) || (stillAllowed(raw, pick.edition) ? raw : pick.viewA);
											if (!src) return;
											applyStill(pick.id, "a", src);
										},
										children: "Random"
									}),
									pickedSkill && SKILLS.some((skill) => skill.id === pickedSkill) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex h-8 items-center gap-1 text-[10px] text-muted",
										children: ["Level", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: skillPicks.find((item) => item.id === pickedSkill)?.level ?? "",
											inputMode: "numeric",
											className: "h-8 w-12 rounded-sm border border-[#c6a45a]/35 bg-[#1a1610] px-1 text-sm text-parchment outline-none ring-0 focus-visible:border-[#c6a45a]",
											onChange: (e) => {
												const cap = skillLevelCap(pickedSkill, skillPack);
												const next = sanitizeSkillLevel(e.target.value, cap);
												setSkillPicks((cur) => cur.map((item) => item.id === pickedSkill ? {
													...item,
													level: next
												} : item));
											}
										})]
									}) : null
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 grid gap-2 lg:grid-cols-2",
								style: { borderTop: "1px solid rgba(198,164,90,0.2)" },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "lg:border-r lg:border-[#c6a45a]/20",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "px-1 pt-2 text-[10px] text-muted",
										children: "Skills"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-1 p-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap gap-1",
											children: [
												["OSRS", "RS3"].map((pack) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => {
														setSkillPack(pack);
														dropIllegal(pack);
													},
													className: `h-7 rounded-md border px-2 text-[10px] ${skillPack === pack ? "border-parchment bg-[#241e16]" : "border-line"}`,
													children: pack === "OSRS" ? "Old School" : "RuneScape"
												}, pack)),
												BANNER_SIZES.map((box) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => setSizeId(box.id),
													className: `min-h-11 rounded-md border px-2 text-[10px] ${sizeId === box.id ? "border-parchment" : "border-line"}`,
													children: box.name
												}, box.id)),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													className: "h-7 rounded-md border border-line px-2 text-[10px]",
													onClick: () => placeAllPack(),
													children: "All"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													className: "h-7 rounded-md border border-line px-2 text-[10px]",
													onClick: () => setSkillPicks([]),
													children: "Clear"
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid grid-cols-4 gap-1 sm:grid-cols-6 xl:grid-cols-8",
											children: SKILLS.filter((skill) => skill.editions.includes(skillPack)).map((skill) => {
												const pick = skillPicks.find((item) => item.id === skill.id);
												const on = armedSkill === skill.id || Boolean(pick);
												const cap = skillLevelCap(skill.id, skillPack);
												return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-0.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														title: skill.name,
														"aria-label": `Place ${skill.name}`,
														"aria-pressed": on,
														onClick: () => placeStamp(skill.id),
														className: `flex size-8 shrink-0 items-center justify-center rounded-sm p-0 ${on ? "bg-[#241e16]" : "bg-[#1a140c]"}`,
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
															src: skill.src,
															alt: "",
															className: `size-6 object-contain ${skillPack === "OSRS" ? "[image-rendering:pixelated]" : ""}`
														})
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														"aria-label": `${skill.name} level`,
														inputMode: "numeric",
														value: pick?.level ?? boardLevels[skillPack][skill.id] ?? "",
														placeholder: "—",
														className: "h-8 w-8 rounded-sm border border-[#c6a45a]/35 bg-[#1a1610] px-0.5 text-center text-[10px] text-parchment outline-none ring-0 focus-visible:border-[#c6a45a]",
														onChange: (e) => {
															const next = sanitizeSkillLevel(e.target.value, cap);
															setSkillPicks((cur) => {
																if (cur.find((item) => item.id === skill.id)) return cur.map((item) => item.id === skill.id ? {
																	...item,
																	level: next
																} : item);
																if (!next) return cur;
																return [...cur, {
																	id: skill.id,
																	game: skillPack,
																	level: next,
																	size: skillSize,
																	scale: packScale(cur.length + 1)
																}];
															});
														}
													})]
												}, skill.id);
											})
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "px-1 text-[10px] text-muted",
										children: "Marks"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid grid-cols-8 gap-0.5 p-1 sm:grid-cols-10",
										children: MARKS.filter((mark) => mark.editions.includes(skillPack)).map((mark) => {
											const on = armedSkill === mark.id || skillPicks.some((item) => item.id === mark.id);
											return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												title: mark.name,
												"aria-label": `Place ${mark.name}`,
												"aria-pressed": on,
												onClick: () => placeStamp(mark.id),
												className: `flex size-12 items-center justify-center rounded-none bg-transparent p-0 ${on ? "outline outline-1 outline-[#F5C400]" : ""}`,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: mark.src,
													alt: "",
													className: `size-8 object-contain ${skillPack === "OSRS" ? "[image-rendering:pixelated]" : ""}`
												})
											}, mark.id);
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 px-1 text-[10px] text-muted",
										children: "Your marks · 16–128px PNG or WebP, close to square. Session only."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-1 p-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												className: "h-8 rounded-md border border-line px-2 text-[10px] text-muted",
												onClick: () => markFileRef.current?.click(),
												children: "Upload a mark"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												ref: markFileRef,
												type: "file",
												accept: "image/png,image/webp,image/jpeg",
												className: "sr-only",
												onChange: (e) => {
													const file = e.target.files?.[0];
													e.target.value = "";
													if (!file) return;
													if (file.size > 25e4) {
														setStatus("That file is too heavy for a mark.");
														return;
													}
													const src = URL.createObjectURL(file);
													const img = new Image();
													img.onload = () => {
														const w = img.naturalWidth;
														const h = img.naturalHeight;
														const ratio = Math.max(w, h) / Math.max(1, Math.min(w, h));
														if (w < 16 || h < 16 || w > 128 || h > 128 || ratio > 1.35) {
															URL.revokeObjectURL(src);
															setStatus("Mark must be 16–128px and nearly square.");
															return;
														}
														const id = `mark-custom-${Date.now()}`;
														stampBitmaps.current.set(src, img);
														setCustomMarks((cur) => [...cur, {
															id,
															name: file.name.replace(/\.[^.]+$/, "").slice(0, 24) || "Mark",
															src,
															game: skillPack
														}]);
														setSkillPicks((cur) => {
															if (cur.filter((item) => isMark(item.id)).length >= 16) {
																setStatus("Sixteen marks on this banner.");
																return cur;
															}
															const n = cur.length;
															const scale = packScale(n + 1);
															const mark = skillSize * scale;
															const left = Math.round(size.width * .04);
															return [...cur, {
																id,
																game: skillPack,
																level: "",
																x: left + n % 8 * (mark + 8),
																y: Math.round(size.height * .52 + Math.floor(n / 8) * (mark + 8)),
																size: skillSize,
																scale
															}];
														});
														setPickedSkill(id);
														setArmedSkill(null);
														requestPaint();
														setStatus("Mark on the plate. Drag it like the others.");
													};
													img.onerror = () => {
														URL.revokeObjectURL(src);
														setStatus("That picture would not open.");
													};
													img.src = src;
												}
											}),
											customMarks.filter((mark) => mark.game === skillPack).map((mark) => {
												const on = armedSkill === mark.id || skillPicks.some((item) => item.id === mark.id);
												return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													title: mark.name,
													"aria-label": `Place ${mark.name}`,
													"aria-pressed": on,
													onClick: () => placeStamp(mark.id),
													className: `flex size-12 items-center justify-center bg-transparent p-0 ${on ? "outline outline-1 outline-[#F5C400]" : ""}`,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
														src: mark.src,
														alt: "",
														className: "size-8 object-contain"
													})
												}, mark.id);
											})
										]
									})
								] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 grid grid-cols-2 gap-1.5 p-1 md:grid-cols-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "text-[10px] text-muted",
										children: [
											"Display name",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												value: streamer,
												onChange: (e) => setStreamer(sanitizeDisplayName(e.target.value)),
												onPaste: (e) => {
													e.preventDefault();
													const text = e.clipboardData.getData("text/plain");
													setStreamer(sanitizeDisplayName(text));
												},
												onKeyDown: (e) => {
													if (e.key === "Enter") {
														e.preventDefault();
														window.dispatchEvent(new Event("rs-hiscores-lookup"));
													}
												},
												maxLength: 12,
												spellCheck: false,
												autoComplete: "off",
												className: "mt-0.5 min-h-11 w-full rounded-sm border border-[#c6a45a]/35 bg-[#1a1610] px-1 text-base text-parchment outline-none ring-0 focus-visible:border-[#c6a45a]"
											}),
											looksLikeStaffName(streamer) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block text-[10px] text-muted",
												children: "Do not impersonate Jagex staff on a banner."
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "block text-[10px] text-faint",
												children: [streamer.length, " / 12 · Twelve letters, as in game."]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setBannerCaps((on) => !on),
												className: `mt-1 h-7 rounded-md border px-2 text-[10px] ${bannerCaps ? "border-parchment bg-[#241e16]" : "border-line"}`,
												children: "Caps"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "text-[10px] text-muted",
										children: ["Clan", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: clan,
											onChange: (e) => setClan(sanitizeClan(e.target.value)),
											className: "mt-0.5 min-h-11 w-full rounded-sm border border-[#c6a45a]/35 bg-[#1a1610] px-1 text-base text-parchment outline-none ring-0 focus-visible:border-[#c6a45a]"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "text-[10px] text-muted",
										children: ["Handle", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: handle,
											onChange: (e) => setHandle(sanitizeHandle(e.target.value)),
											className: "mt-0.5 min-h-11 w-full rounded-sm border border-[#c6a45a]/35 bg-[#1a1610] px-1 text-base text-parchment outline-none ring-0 focus-visible:border-[#c6a45a]"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "text-[10px] text-muted",
										children: ["Tagline", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: tagline,
											onChange: (e) => setTagline(sanitizeTagline(e.target.value)),
											className: "mt-0.5 min-h-11 w-full rounded-sm border border-[#c6a45a]/35 bg-[#1a1610] px-1 text-base text-parchment outline-none ring-0 focus-visible:border-[#c6a45a]"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "text-[10px] text-muted",
										children: ["Discord", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: discord,
											onChange: (e) => setDiscord(sanitizeDiscord(e.target.value)),
											className: "mt-0.5 min-h-11 w-full rounded-sm border border-[#c6a45a]/35 bg-[#1a1610] px-1 text-base text-parchment outline-none ring-0 focus-visible:border-[#c6a45a]"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "text-[10px] text-muted",
										children: ["Grind", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: grind,
											onChange: (e) => setGrind(sanitizeGrind(e.target.value)),
											className: "mt-0.5 min-h-11 w-full rounded-sm border border-[#c6a45a]/35 bg-[#1a1610] px-1 text-base text-parchment outline-none ring-0 focus-visible:border-[#c6a45a]"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "text-[10px] text-muted",
										children: ["World", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: world,
											onChange: (e) => setWorld(sanitizeWorld(e.target.value)),
											className: "mt-0.5 min-h-11 w-full rounded-sm border border-[#c6a45a]/35 bg-[#1a1610] px-1 text-base text-parchment outline-none ring-0 focus-visible:border-[#c6a45a]"
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: fileRef,
								type: "file",
								accept: "image/jpeg,image/png,image/webp",
								className: "sr-only",
								tabIndex: -1,
								"aria-hidden": "true",
								onChange: (e) => {
									const file = e.target.files?.[0];
									if (!file) return;
									if (customSrc?.startsWith("blob:")) URL.revokeObjectURL(customSrc);
									customFileRef.current = file;
									setCustomSrc(URL.createObjectURL(file));
									clearStampsAndText();
									setSceneReady(true);
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
								fallback: null,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HiscoresLookup, {
									bare: true,
									name: streamer,
									onName: setStreamer,
									onLevels: (levels, pack) => {
										const mapped = {};
										for (const [name, lvl] of Object.entries(levels)) {
											const id = skillIdForHiscore(name, pack);
											if (!id) continue;
											mapped[id] = sanitizeSkillLevel(lvl, skillLevelCap(id, pack));
										}
										setBoardLevels((cur) => ({
											...cur,
											[pack]: mapped
										}));
										setSkillPack(pack);
										setSkillPicks((cur) => cur.filter((item) => item.game === pack).map((item) => {
											if (item.game !== pack) return item;
											if (isMark(item.id)) return item;
											const next = mapped[item.id];
											if (!next) return item;
											if (next === "99" && sessionOnce("rs-deja-vu")) {
												eggToast("You have a feeling of déjà vu.");
												return {
													...item,
													level: next,
													scale: Math.min(2.5, (item.scale ?? 1) * 1.12)
												};
											}
											return {
												...item,
												level: next
											};
										}));
									}
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "mt-3 px-1 text-xs text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "section-h2",
								children: "How to use"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
								className: "list-decimal space-y-1 pl-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Pick a street you know." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Twelve letters. Same rule as the client." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Stamp what you wear. The rest can stay in the tray." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Wheel to scale. Drag to place." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Pixels are the platform’s. Match them." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Pete writes the JPEG. That is the work." })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-[11px] text-faint",
								children: "Clips are on the Video editor page."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
						className: "mt-4 flex flex-col items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/brand/postie-pete.png",
								alt: "Postie Pete",
								className: "h-36 w-auto cursor-pointer",
								onClick: () => {
									peteClicks.current += 1;
									if (peteLevel.current >= PETE_LINES.length) {
										if (peteClicks.current === peteThreshold(PETE_LINES.length) + 1) eggToast("Pete has no more mail.");
										return;
									}
									if (peteClicks.current === peteThreshold(peteLevel.current + 1)) {
										eggToast(PETE_LINES[peteLevel.current]);
										peteLevel.current += 1;
									}
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-sm text-center text-sm text-parchment",
								children: postieLineAt(peteNow)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-md text-center text-xs text-muted",
								children: "One JPEG. Size is the chip you already picked."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: downloadJpeg,
								className: "min-h-11 rounded-md border border-parchment px-3 text-sm text-parchment",
								children: "Download"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "sr-only",
								"aria-live": "polite",
								children: saveNote
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "flex max-w-md flex-wrap justify-center gap-x-2 gap-y-1 text-center text-sm text-parchment",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/stream",
										children: "How to go live"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-faint",
										children: "·"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/brief",
										children: "Brief"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-faint",
										children: "·"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/legal",
										children: "Legal"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-faint",
										children: "·"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "mailto:russell.christefer@gmail.com",
										children: "russell.christefer@gmail.com"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-faint",
										children: "·"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "https://legal.jagex.com/docs/policies/fan-content-policy",
										target: "_blank",
										rel: "noopener noreferrer",
										children: "Fan Content Policy"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-center text-[11px] text-faint",
								children: "Not in-game post."
							})
						]
					})
				]
			})
		]
	});
}
//#endregion
export { Studio, Studio as default };
