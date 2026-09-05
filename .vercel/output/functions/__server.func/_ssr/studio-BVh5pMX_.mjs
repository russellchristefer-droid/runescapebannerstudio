import { i as __toESM } from "../_runtime.mjs";
import { V as require_react, b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as hasViewB, c as townAtHour, i as RULES, n as GODS, o as migrateBannerSizeId, r as LOCATIONS, s as stillAllowed, t as BANNER_SIZES } from "./locations-CLZLnwld.mjs";
import { n as writeStudioSave, t as loadStudioSave } from "./studio-save-BZUmR0QZ.mjs";
import { t as OfficialPulse } from "./official-pulse-Bm5wbKDQ.mjs";
import { a as placeLore, i as loreLead, o as readDeskQuery, r as deskSharePath, t as MARKS } from "./desk-link-XZ3O19hH.mjs";
import { a as useDeskEggs, c as SiteHeader, d as pad, f as sessionOnce, h as useVisibleNow, l as eggToast, m as untilUtcMidnight, o as EggToast, p as untilUtcHour, u as isOwnerName } from "./router-DXmYNu76.mjs";
import { t as StillPhoto } from "./still-photo-DC0nvt0B.mjs";
import { a as sanitizeDisplayName, c as sanitizeHandle, d as worldLabel, i as sanitizeDiscord, l as sanitizeTagline, n as looksLikeStaffName, r as sanitizeClan, s as sanitizeGrind, u as sanitizeWorld } from "./rsText-CBarotbs.mjs";
import { n as safeZoneRects, t as drawSafeZoneGhosts } from "./bannerFeatures-LfEr2lXW.mjs";
import { a as godInk, n as GOD_SLUGS } from "./gods-9ecR_EMd.mjs";
import { t as useEggGestures } from "./use-egg-gestures-BzHAgDVs.mjs";
import { i as stillIndex, n as formatRemain, r as msUntilNext, t as PERIOD_MS } from "./still-clock-F1LQ7Gge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/studio-BVh5pMX_.js
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
					children: "RuneScape 3"
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
function townPool(edition) {
	return LOCATIONS.filter((loc) => loc.kind === "town" && loc.edition === edition && stillAllowed(loc.stills[0] ?? loc.viewA, edition));
}
function stillsOf(loc) {
	return (loc.stills?.length ? loc.stills : [loc.viewA, loc.viewB]).filter(Boolean).filter((src) => stillAllowed(src, loc.edition));
}
function TownHero({ onTown }) {
	const saved = loadStudioSave();
	const [edition, setEdition] = (0, import_react.useState)(saved.edition === "RS3" ? "RS3" : "OSRS");
	const pool = (0, import_react.useMemo)(() => townPool(edition), [edition]);
	const now = useVisibleNow();
	const idx = stillIndex(Math.max(pool.length, 1), now);
	const loc = pool[idx] ?? pool[0];
	const shots = loc ? stillsOf(loc) : [];
	const src = shots[stillIndex(Math.max(shots.length, 1), now)] ?? loc?.viewA;
	const nextLoc = pool.length ? pool[(idx + 1) % pool.length] : void 0;
	const nextSrc = nextLoc ? stillsOf(nextLoc)[0] : void 0;
	const [shown, setShown] = (0, import_react.useState)(src);
	(0, import_react.useEffect)(() => {
		if (!src) return;
		const img = new Image();
		img.src = src;
		const apply = () => setShown(src);
		if (typeof img.decode === "function") img.decode().then(apply).catch(apply);
		else img.onload = apply;
	}, [src]);
	(0, import_react.useEffect)(() => {
		if (nextSrc) {
			const img = new Image();
			img.src = nextSrc;
		}
	}, [nextSrc]);
	(0, import_react.useEffect)(() => {
		if (loc) onTown?.(loc.name, edition);
	}, [loc?.id, edition]);
	if (!loc || !shown) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "px-3 py-4 text-sm text-muted",
		children: "Nothing here yet. Pick Old School or RuneScape 3."
	});
	const game = edition === "OSRS" ? "Old School RuneScape" : "RuneScape 3";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "hero",
		className: "border-b border-line bg-raised",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative w-full overflow-hidden bg-[#1a1612]",
			style: { aspectRatio: "1200 / 480" },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: shown,
				width: 1200,
				height: 480,
				alt: `${loc.name}, town, ${game}`,
				fetchPriority: "high",
				className: "absolute inset-0 h-full w-full object-cover"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-2 px-3 py-3 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-fg",
					children: [
						loc.name,
						" · town · ",
						game
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[11px] text-faint",
					children: ["Next still in ", formatRemain(msUntilNext(now))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: ["OSRS", "RS3"].map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-pressed": edition === id,
						className: `min-h-11 rounded-md border px-3 text-xs ${edition === id ? "border-parchment bg-surface text-parchment" : "border-line text-muted"}`,
						onClick: () => setEdition(id),
						children: id === "OSRS" ? "Old School" : "RuneScape 3"
					}, id))
				})
			]
		})]
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
	"A still is not the town. It is a deixis: here, from this window, at this hour of the tessellated day."
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
						alt: "Bob the Cat, RuneScape 3",
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
var RS_YELLOW = "#FFFF00";
var RS_INK = "#000000";
var RS_TYPE = "\"Source Sans 3\", Arial Black, Arial, sans-serif";
var hardOutline = true;
function paintYellow(ctx, x, y, text, color = RS_YELLOW, _style = "chat") {
	ctx.save();
	ctx.lineJoin = hardOutline ? "miter" : "round";
	ctx.miterLimit = 2;
	ctx.lineWidth = hardOutline ? 2.25 : 1.5;
	ctx.strokeStyle = RS_INK;
	ctx.strokeText(text, Math.round(x), Math.round(y));
	ctx.fillStyle = color;
	ctx.fillText(text, Math.round(x), Math.round(y));
	ctx.restore();
}
function fitYellow(ctx, text, x, y, size, max, _font, _weight = "800", color = RS_YELLOW, style = "chat") {
	let next = Math.round(size);
	ctx.font = `800 ${next}px ${RS_TYPE}`;
	while (next > 10 && ctx.measureText(text).width > max) {
		next -= 1;
		ctx.font = `800 ${next}px ${RS_TYPE}`;
	}
	paintYellow(ctx, x, y, text, color, style);
}
function loadImage(src) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.decoding = "async";
		const done = () => {
			if (typeof img.decode === "function") img.decode().then(() => resolve(img)).catch(() => resolve(img));
			else resolve(img);
		};
		img.onload = done;
		img.onerror = () => reject(new Error(src));
		img.src = src;
	});
}
function fontStack(_edition, _fontId) {
	return RS_TYPE;
}
function wrapText(ctx, text, max) {
	const words = text.split(/\s+/);
	const lines = [];
	let line = "";
	for (const word of words) {
		const next = line ? `${line} ${word}` : word;
		if (ctx.measureText(next).width > max && line) {
			lines.push(line);
			line = word;
		} else line = next;
	}
	if (line) lines.push(line);
	return lines;
}
function skillGrid(count, width, height, place, skillX, skillY, showRules, iconSize, withLevels = true) {
	const icon = Math.max(16, Math.min(96, Math.round(iconSize ?? height * .06)));
	const type = Math.max(10, Math.round(icon * .58));
	const labelW = withLevels ? Math.round(type * 2.2) : 0;
	const gapX = Math.max(8, Math.round(icon * .28));
	const gapY = Math.max(8, Math.round(icon * .32));
	const cellW = icon + labelW + gapX;
	const cellH = icon + gapY;
	const photoW = showRules ? width * .62 : width;
	const usable = Math.max(cellW, photoW - 24);
	const cols = Math.max(1, Math.min(count || 1, Math.floor(usable / cellW)));
	const rows = Math.max(1, Math.ceil(Math.max(1, count) / cols));
	const blockW = cols * cellW - gapX;
	const left = Math.round(48 * (width / 1200));
	let originX = place === "name" ? left : Math.max(12, Math.round((photoW - blockW) / 2));
	let originY = 16;
	if (place === "name") originY = Math.round(height * .28);
	if (place === "bottom") originY = Math.max(16, height - rows * cellH - 16);
	if (skillX != null) originX = Math.max(8, Math.min(skillX, width - blockW - 8));
	if (skillY != null) originY = Math.max(8, Math.min(skillY, height - rows * cellH - 8));
	return {
		originX,
		originY,
		cellW,
		cellH,
		icon,
		cols,
		labelW,
		rows
	};
}
function drawIdentityPlate(ctx, options, textMax, height, font, boxes, weight, inkStyle) {
	const plateFont = RS_TYPE;
	const color = options.textColor || RS_YELLOW;
	const lines = [];
	const name = sanitizeDisplayName(options.streamer);
	const clan = sanitizeClan(options.clan);
	const handle = sanitizeHandle(options.handle);
	const tagline = sanitizeTagline(options.tagline);
	const discord = sanitizeDiscord(options.discord);
	const grind = sanitizeGrind(options.grind);
	const world = worldLabel(sanitizeWorld(options.world));
	if (name && name !== "Player" && name !== "Optional") lines.push({
		id: "streamer",
		text: name,
		size: Math.round(height * .07)
	});
	if (clan) lines.push({
		id: "clan",
		text: clan,
		size: 16
	});
	if (handle) lines.push({
		id: "handle",
		text: handle,
		size: 14
	});
	if (tagline) {
		ctx.font = `800 13px ${plateFont}`;
		const wrapped = wrapText(ctx, tagline, textMax).slice(0, 2);
		if (wrapText(ctx, tagline, textMax).length > 2 && wrapped[1]) wrapped[1] = `${wrapped[1].replace(/…$/, "")}…`;
		wrapped.forEach((text, i) => {
			lines.push({
				id: i ? `tagline-${i}` : "tagline",
				text,
				size: 13
			});
		});
	}
	[
		world,
		grind,
		options.maxed ? "Maxed" : "",
		options.mode,
		options.focus,
		options.style,
		options.cape,
		discord,
		options.learners ? "Learners welcome" : ""
	].filter((item) => item && item !== "Not shown").forEach((text, i) => lines.push({
		id: `extra-${i}`,
		text,
		size: 12
	}));
	const layout = options.layout ?? "banner";
	ctx.textAlign = layout === "title-card" ? "center" : "left";
	let y = layout === "lower-third" ? Math.round(height * .74) : layout === "title-card" ? Math.round(height * .42) : Math.round(height * .16);
	for (const line of lines) {
		const scale = Math.min(2, Math.max(.75, options.textScale?.[line.id] ?? 1));
		const size = Math.max(8, Math.round(line.size * scale));
		const pos = options.textPos[line.id];
		const inset = Math.round(48 * (options.width / 1200));
		const x = pos ? pos.x + 4 : layout === "title-card" ? Math.round(options.width / 2) : inset;
		const yy = pos ? pos.y + size : y;
		ctx.font = `800 ${size}px ${plateFont}`;
		fitYellow(ctx, line.text, x, yy, size, textMax, plateFont, "800", color, "chat");
		boxes.push({
			id: line.id,
			x: x - 4,
			y: yy - size,
			w: textMax,
			h: size + 8
		});
		y = yy + size + 8;
	}
	return y;
}
function drawBanner(ctx, scene, options) {
	const { width, height } = options;
	const font = fontStack(options.edition, options.fontId);
	hardOutline = options.edition === "OSRS";
	if ("letterSpacing" in ctx) ctx.letterSpacing = hardOutline ? "-0.04em" : "0px";
	const inkStyle = options.fontId === "bold" ? "bold" : options.fontId === "quill" ? "quill" : "chat";
	const weight = inkStyle === "bold" ? "800" : "600";
	ctx.fillStyle = "#100e0c";
	ctx.fillRect(0, 0, width, height);
	ctx.imageSmoothingEnabled = true;
	ctx.imageSmoothingQuality = "high";
	const src = scene;
	const sw = Math.max(1, src.naturalWidth ?? src.width ?? width);
	const sh = Math.max(1, src.naturalHeight ?? src.height ?? height);
	const srcRatio = sw / sh;
	const dstRatio = width / Math.max(1, height);
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
	ctx.drawImage(scene, sx, sy, tw, th, 0, 0, width, height);
	ctx.imageSmoothingEnabled = options.edition !== "OSRS";
	const fade = ctx.createLinearGradient(0, 0, 0, height);
	fade.addColorStop(0, "rgba(0,0,0,0.25)");
	fade.addColorStop(.55, "rgba(0,0,0,0)");
	fade.addColorStop(1, "rgba(0,0,0,0.35)");
	ctx.fillStyle = fade;
	ctx.fillRect(0, 0, width, height);
	const boardW = Math.round(width * .34);
	const boardLeft = width - boardW - 16;
	if (options.showRules) {
		const bx = boardLeft;
		const by = 16;
		const bw = boardW;
		const bh = height - 32;
		ctx.fillStyle = "#5a3a1c";
		ctx.fillRect(bx - 6, 10, bw + 12, bh + 12);
		ctx.fillStyle = "#d4b07a";
		ctx.fillRect(bx, by, bw, bh);
		ctx.fillStyle = "#efe0c4";
		ctx.fillRect(bx + 8, 24, bw - 16, bh - 16);
		ctx.textAlign = "center";
		const title = options.rulesTitle.trim() || RULES.title;
		ctx.fillStyle = "#3a2410";
		ctx.font = `700 16px ${font}`;
		wrapText(ctx, title, bw - 28).forEach((line, i) => {
			ctx.fillText(line, bx + bw / 2, 52 + i * 18);
		});
		const blocks = [
			[options.honourHead || RULES.sections[0].heading, options.honourBody || RULES.sections[0].body],
			[options.respectHead || RULES.sections[1].heading, options.respectBody || RULES.sections[1].body],
			[options.securityHead || RULES.sections[2].heading, options.securityBody || RULES.sections[2].body]
		];
		ctx.textAlign = "left";
		let ty = 94;
		for (const [head, body] of blocks) {
			ctx.fillStyle = "#3a2410";
			ctx.font = `700 13px ${font}`;
			ctx.fillText(head, bx + 18, ty);
			ctx.font = `600 11px ${font}`;
			const lines = wrapText(ctx, body, bw - 36);
			lines.forEach((line, i) => ctx.fillText(line, bx + 18, ty + 16 + i * 14));
			ty += 28 + lines.length * 14;
		}
	}
	if (options.watermark) {
		const mark = options.watermark;
		const mw = mark.naturalWidth ?? mark.width ?? 80;
		const mh = mark.naturalHeight ?? mark.height ?? 24;
		const maxW = Math.max(48, (options.showRules ? boardLeft : width) * .2);
		const maxH = Math.max(18, height * .08);
		const scale = Math.min(maxW / Math.max(1, mw), maxH / Math.max(1, mh));
		const dw = mw * scale;
		const dh = mh * scale;
		const pad = Math.max(12, height * .04);
		const dx = (options.showRules ? boardLeft : width) - pad - dw;
		const dy = height - pad - dh;
		ctx.globalAlpha = .88;
		ctx.drawImage(options.watermark, dx, dy, dw, dh);
		ctx.globalAlpha = 1;
	}
	const boxes = [];
	const inset = Math.round(48 * (width / 1200));
	drawIdentityPlate(ctx, options, Math.max(220, (options.showRules ? boardLeft : width) - inset * 2), height, font, boxes, weight, inkStyle);
	if (options.skillIcons.length) {
		const count = options.skillIcons.length;
		const grid = skillGrid(count, width, height, options.skillPlace, options.skillX, options.skillY, options.showRules, options.skillSize);
		ctx.textAlign = "left";
		const lastCount = count % grid.cols || grid.cols;
		options.skillIcons.forEach((slot, i) => {
			const col = i % grid.cols;
			const row = Math.floor(i / grid.cols);
			const icon = Math.max(16, Math.min(96, Math.round((slot.size ?? grid.icon) * (slot.scale ?? 1))));
			const rowShift = row === grid.rows - 1 && lastCount < grid.cols ? Math.round((grid.cols - lastCount) * grid.cellW / 2) : 0;
			let px = grid.originX + rowShift + col * grid.cellW;
			let py = grid.originY + row * grid.cellH;
			if (slot.x != null && slot.y != null) {
				px = Math.max(8, Math.min(slot.x, width - icon - grid.labelW - 8));
				py = Math.max(8, Math.min(slot.y, height - icon - 8));
			}
			ctx.drawImage(slot.img, px, py, icon, icon);
			const label = slot.level.trim();
			if (label) {
				const type = Math.max(10, Math.round(icon * .4));
				ctx.save();
				ctx.textAlign = "right";
				ctx.textBaseline = "bottom";
				ctx.font = `800 ${type}px ${RS_TYPE}`;
				ctx.lineJoin = "round";
				ctx.lineWidth = 1;
				ctx.strokeStyle = RS_INK;
				paintYellow(ctx, px + icon, py + icon, label, options.textColor || RS_YELLOW);
				ctx.restore();
			}
			boxes.push({
				id: slot.id,
				x: px,
				y: py,
				w: icon,
				h: icon
			});
		});
	}
	if (options.showSafeZones && options.safeZone && options.safeZone !== "none") drawSafeZoneGhosts(ctx, width, height, options.safeZone);
	options.onSkillBoxes?.(boxes);
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
var HiscoresLookup = (0, import_react.lazy)(() => import("./hiscores-Bu69iAvQ.mjs").then((mod) => ({ default: mod.HiscoresLookup })));
function Studio() {
	const saved = (0, import_react.useMemo)(() => loadStudioSave(), []);
	const boot = (0, import_react.useMemo)(() => readDeskQuery(), []);
	const peteNow = useVisibleNow(3e5);
	const [edition, setEdition] = (0, import_react.useState)(boot.edition ?? saved.edition ?? "RS3");
	const [kind, setKind] = (0, import_react.useState)(() => {
		return (boot.locationId ? LOCATIONS.find((row) => row.id === boot.locationId) : void 0)?.kind ?? "town";
	});
	const [godFilter, setGodFilter] = (0, import_react.useState)("");
	const [locationId, setLocationId] = (0, import_react.useState)(boot.locationId ?? saved.locationId ?? townAtHour().id);
	const [view, setView] = (0, import_react.useState)(saved.view ?? "a");
	const [viewLocked, setViewLocked] = (0, import_react.useState)(false);
	const [poolSkip, setPoolSkip] = (0, import_react.useState)(0);
	const [, setCycleTick] = (0, import_react.useState)(0);
	const [sizeId, setSizeId] = (0, import_react.useState)(() => migrateBannerSizeId(boot.sizeId ?? saved.sizeId ?? "m"));
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
	const [sceneReady, setSceneReady] = (0, import_react.useState)(true);
	const [skillPack, setSkillPack] = (0, import_react.useState)(boot.edition ?? saved.skillPack ?? "RS3");
	const [skillPlace, setSkillPlace] = (0, import_react.useState)("name");
	const [skillSize, setSkillSize] = (0, import_react.useState)(saved.skillSize ?? 28);
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
			scale: row.scale
		})) ?? [];
	});
	const [boardLevels, setBoardLevels] = (0, import_react.useState)({
		OSRS: {},
		RS3: {}
	});
	const [armedSkill, setArmedSkill] = (0, import_react.useState)(null);
	const [pickedSkill, setPickedSkill] = (0, import_react.useState)(null);
	const [textPos, setTextPos] = (0, import_react.useState)({});
	const [textScale, setTextScale] = (0, import_react.useState)(saved.textScale ?? {});
	const [saveNote, setSaveNote] = (0, import_react.useState)("");
	const [pickedText, setPickedText] = (0, import_react.useState)(null);
	const boxesRef = (0, import_react.useRef)([]);
	const dragRef = (0, import_react.useRef)(null);
	const [placeCap, setPlaceCap] = (0, import_react.useState)(12);
	const [status, setStatus] = (0, import_react.useState)("Ready");
	const canvasRef = (0, import_react.useRef)(null);
	const previewRef = (0, import_react.useRef)(null);
	const stillCacheRef = (0, import_react.useRef)(null);
	const stampBitmaps = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	const dirtyRef = (0, import_react.useRef)(false);
	const rafRef = (0, import_react.useRef)(0);
	const draggingRef = (0, import_react.useRef)(false);
	const peteClicks = (0, import_react.useRef)(0);
	const peteTimer = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
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
			const cache = stillCacheRef.current;
			if (cache) {
				cache.width = 1;
				cache.height = 1;
			}
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
	const sceneSrc = customSrc ?? (viewLocked ? view === "b" && location.viewB ? location.viewB : location.viewA : safeCycle);
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
	function applyStill(id, nextView) {
		if (!(id === locationId && !customSrc)) clearStampsAndText();
		pickLocation(id);
		if (nextView) {
			setView(nextView);
			setViewLocked(true);
		} else setViewLocked(false);
		setCustomSrc((prev) => {
			if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
			return null;
		});
		setSceneReady(true);
	}
	const catalog = [...SKILLS, ...MARKS];
	function stampFile(id, game) {
		return catalog.find((item) => item.id === id && item.editions.includes(game));
	}
	function dropIllegal(pack) {
		setSkillPicks((cur) => cur.filter((item) => catalog.some((row) => row.id === item.id && row.editions.includes(pack))));
	}
	function placeStamp(id) {
		setSkillPicks((cur) => {
			if (cur.find((item) => item.id === id)) {
				setPickedSkill(id);
				return cur;
			}
			if (cur.length >= 12) {
				setStatus("Twelve marks on this banner.");
				return cur;
			}
			const n = cur.length;
			const left = Math.round(size.width * .04);
			const x = skillPlace === "name" ? left + n * (skillSize + 10) : Math.round(size.width * .08 + n % 6 * (skillSize + 16));
			const y = skillPlace === "name" ? Math.round(size.height * .28) : Math.round(size.height * .55 + Math.floor(n / 6) * (skillSize + 16));
			setPickedSkill(id);
			setArmedSkill(null);
			return [...cur, {
				id,
				game: skillPack,
				level: boardLevels[skillPack][id] ?? "",
				x,
				y,
				size: skillSize,
				scale: 1
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
					setSkillPicks((cur) => cur.filter((item) => item.id !== skillId));
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
			const step = e.shiftKey ? 16 : 4;
			if ([
				"ArrowUp",
				"ArrowDown",
				"ArrowLeft",
				"ArrowRight"
			].includes(e.key)) {
				e.preventDefault();
				const dir = e.key.replace("Arrow", "").toLowerCase();
				if (pickedText) {
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
					if (item.id !== pickedSkill || item.x == null || item.y == null) return item;
					const mark = (item.size ?? skillSize) * (item.scale ?? 1);
					let x = item.x;
					let y = item.y;
					if (dir === "left") x = Math.max(0, x - step);
					if (dir === "right") x = Math.min(size.width - mark, x + step);
					if (dir === "up") y = Math.max(0, y - step);
					if (dir === "down") y = Math.min(size.height - mark, y + step);
					return {
						...item,
						x,
						y
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
					scale: row.scale
				})),
				textScale,
				locationId,
				view
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
		textScale
	]);
	const skillPicksRef = (0, import_react.useRef)(skillPicks);
	skillPicksRef.current = skillPicks;
	const textPosRef = (0, import_react.useRef)(textPos);
	textPosRef.current = textPos;
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
		god: location.god
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
		god: location.god
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
		const still = stillCacheRef.current;
		if (!canvas || !still || !sceneReady) return;
		const ctx = canvas.getContext("2d", {
			alpha: false,
			willReadFrequently: false
		});
		if (!ctx) return;
		ctx.imageSmoothingEnabled = edition !== "OSRS" && !draggingRef.current;
		if (ctx.imageSmoothingEnabled) ctx.imageSmoothingQuality = "high";
		const catalog = [...SKILLS, ...MARKS];
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
				size: (pick.size ?? skillSize) * (pick.scale ?? 1),
				scale: pick.scale
			});
		}
		const copy = copyRef.current;
		drawBanner(ctx, still, {
			showRules: false,
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
	(0, import_react.useEffect)(() => {
		if (!sceneReady) return;
		let gone = false;
		(async () => {
			const tries = [
				sceneSrc,
				location.viewA,
				...location.stills ?? []
			].filter(Boolean);
			let img = null;
			for (const src of tries) try {
				img = await loadImage(src);
				break;
			} catch {}
			if (gone || !img) {
				if (!gone) {
					if (!customSrc && !viewLocked && townPool.length > 1 && poolSkip < townPool.length - 1) {
						setPoolSkip((n) => n + 1);
						return;
					}
					setStatus("Still needed");
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
				}
				return;
			}
			const cache = stillCacheRef.current ?? document.createElement("canvas");
			cache.width = size.width;
			cache.height = size.height;
			const c = cache.getContext("2d", { alpha: false });
			if (!c) return;
			c.imageSmoothingEnabled = true;
			c.imageSmoothingQuality = "high";
			coverStill(c, img, size.width, size.height);
			stillCacheRef.current = cache;
			const canvas = canvasRef.current;
			if (canvas) {
				canvas.width = size.width;
				canvas.height = size.height;
			}
			requestPaint();
			setStatus(skillPicksRef.current.length >= 12 ? "Twelve marks on this banner." : "Ready");
		})();
		return () => {
			gone = true;
		};
	}, [
		sceneSrc,
		size.width,
		size.height,
		sceneReady,
		location.viewA
	]);
	(0, import_react.useEffect)(() => {
		let gone = false;
		const catalog = [...SKILLS, ...MARKS];
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
		edition
	]);
	(0, import_react.useEffect)(() => {
		const el = canvasRef.current;
		if (!el) return;
		const stop = (e) => {
			if (pickedSkill || pickedText || overIcon) e.preventDefault();
		};
		el.addEventListener("wheel", stop, { passive: false });
		return () => el.removeEventListener("wheel", stop);
	}, [
		pickedSkill,
		pickedText,
		overIcon
	]);
	function downloadJpeg() {
		const canvas = canvasRef.current;
		if (!canvas) return;
		canvas.toBlob((blob) => {
			if (!blob) {
				setSaveNote("Could not save. Try M size.");
				return;
			}
			const who = sanitizeDisplayName(streamer) || "desk";
			const worldTag = sanitizeWorld(world) ? `-w${sanitizeWorld(world)}` : "";
			const a = document.createElement("a");
			a.href = URL.createObjectURL(blob);
			a.download = `banner-${edition.toLowerCase()}-${who.replace(/\s+/g, "-")}${worldTag}-${location.id}-${size.width}x${size.height}.jpg`;
			a.click();
			URL.revokeObjectURL(a.href);
			setSaveNote(`Saved ${a.download}`);
		}, "image/jpeg", .92);
	}
	const visible = LOCATIONS.filter((loc) => {
		if (loc.kind !== kind || loc.edition !== edition) return false;
		if (godFilter && loc.god !== godFilter) return false;
		return true;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EggToast, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, { skip: {
				href: "#desk",
				label: "Skip to desk"
			} }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfficialPulse, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TownHero, { onTown: (name, ed) => setHeroTown({
				name,
				edition: ed
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OracleLine, {
				place: heroTown.name,
				edition: heroTown.edition
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TodayDesk, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "page-band py-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "section-h2",
						children: "Places to visit"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex flex-wrap justify-center gap-2",
						children: [["town", "boss"].map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setKind(id),
							className: `min-h-11 rounded-md border px-3 text-xs ${kind === id ? "border-parchment bg-raised" : "border-line"}`,
							children: id === "town" ? "Towns" : "Bosses"
						}, id)), ["RS3", "OSRS"].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setEdition(item);
								setSkillPack(item);
								const next = LOCATIONS.find((loc) => loc.kind === kind && loc.edition === item);
								if (next) setLocationId(next.id);
							},
							className: `min-h-11 rounded-md border px-3 text-xs ${edition === item ? "border-parchment bg-raised" : "border-line"}`,
							children: item === "RS3" ? "RuneScape 3" : "Old School RuneScape"
						}, item))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-3 flex flex-wrap justify-center gap-1",
						children: GODS.map((god) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setGodFilter((cur) => cur === god ? "" : god),
							className: `min-h-11 rounded-md border px-2 text-[10px] ${godFilter === god ? "border-parchment" : "border-line"}`,
							style: { color: godInk(god) },
							children: god
						}, god))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4",
						children: visible.slice(0, placeCap).map((loc, i) => {
							const raw = loc.stills?.length ? loc.stills[stillIndex(loc.stills.length, peteNow)] : loc.viewA;
							const src = stillAllowed(raw, loc.edition) ? raw : loc.viewA;
							const lore = placeLore(loc);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "overflow-hidden rounded-md border border-line hover:border-[#F5C400]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => applyStill(loc.id),
										className: "block w-full text-left",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StillPhoto, {
											src,
											alt: `${loc.name}, ${loc.region}`,
											priority: i < 2,
											className: "aspect-video w-full object-cover [content-visibility:auto]"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "site-title block truncate px-2 pt-1.5 text-center text-sm no-underline",
											children: loc.name
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "px-2 pb-1.5 text-center text-[10px] text-faint",
										children: [
											loc.region.replace(/\s·\sOSRS$/, ""),
											" ·",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/gods/$god",
												params: { god: GOD_SLUGS[loc.god] },
												className: "no-underline",
												style: { color: godInk(loc.god) },
												children: loc.god
											})
										]
									}),
									lore ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "px-2 pb-2 text-center text-[10px] text-muted",
										children: [
											loreLead(lore.brief),
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: loc.kind === "boss" ? "/bosses/$id" : "/towns/$id",
												params: { id: loc.id },
												className: "text-parchment",
												children: "Lore"
											})
										]
									}) : null
								]
							}, loc.id);
						})
					}),
					visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-sm text-muted",
						children: "Nothing here yet. Clear a filter chip."
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
								className: "desk-preview-well relative mx-auto w-full overflow-hidden",
								ref: previewRef,
								style: {
									maxWidth: size.height > size.width ? "22rem" : "56rem",
									aspectRatio: `${size.width} / ${size.height}`,
									background: "#1a1610",
									boxShadow: "inset 0 8px 18px rgba(0,0,0,0.35)"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
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
										const step = e.shiftKey ? .25 : .08;
										const delta = e.deltaY > 0 ? -step : step;
										const pad = 8;
										let skillId = pickedSkill;
										if (!skillId) {
											const hit = [...skillPicksRef.current].reverse().find((item) => {
												const mark = (item.size ?? skillSize) * (item.scale ?? 1);
												return item.x != null && item.y != null && x >= item.x - pad && x <= item.x + mark + pad && y >= item.y - pad && y <= item.y + mark + pad;
											});
											if (hit) {
												skillId = hit.id;
												setPickedSkill(hit.id);
												setPickedText(null);
											}
										}
										if (skillId) {
											e.preventDefault();
											setSkillPicks((cur) => {
												const next = cur.map((item) => item.id === skillId ? {
													...item,
													scale: Math.min(2.5, Math.max(.5, (item.scale ?? 1) + delta))
												} : item);
												skillPicksRef.current = next;
												return next;
											});
											requestPaint();
											return;
										}
										let textId = pickedText;
										if (!textId) {
											const hit = [...boxesRef.current].reverse().find((box) => {
												if (skillPicksRef.current.some((item) => item.id === box.id)) return false;
												return x >= box.x - pad && x <= box.x + box.w + pad && y >= box.y - pad && y <= box.y + box.h + pad;
											});
											if (hit) {
												textId = hit.id;
												setPickedText(hit.id);
												setPickedSkill(null);
											}
										}
										if (!textId) return;
										e.preventDefault();
										setTextScale((cur) => {
											const next = {
												...cur,
												[textId]: Math.min(2, Math.max(.75, (cur[textId] ?? 1) + delta))
											};
											textScaleRef.current = next;
											return next;
										});
										requestPaint();
									},
									onPointerDown: (e) => {
										const canvas = canvasRef.current;
										if (!canvas) return;
										const rect = canvas.getBoundingClientRect();
										const x = (e.clientX - rect.left) / rect.width * size.width;
										const y = (e.clientY - rect.top) / rect.height * size.height;
										if (armedSkill) {
											if (skillPicks.length >= 12) {
												setStatus("Twelve marks on this banner.");
												setArmedSkill(null);
												return;
											}
											setSkillPicks((cur) => [...cur.filter((item) => item.id !== armedSkill), {
												id: armedSkill,
												game: skillPack,
												level: "",
												x,
												y,
												size: skillSize,
												scale: 1
											}]);
											setPickedSkill(armedSkill);
											setArmedSkill(null);
											return;
										}
										const pad = 8;
										const skillHit = [...skillPicks].reverse().find((item) => {
											const mark = (item.size ?? skillSize) * (item.scale ?? 1);
											return item.x != null && item.y != null && x >= item.x - pad && x <= item.x + mark + pad && y >= item.y - pad && y <= item.y + mark + pad;
										});
										if (skillHit && skillHit.x != null && skillHit.y != null) {
											setPickedSkill(skillHit.id);
											setPickedText(null);
											if (e.detail >= 2) return;
											setGrabbing(true);
											draggingRef.current = true;
											dragRef.current = {
												id: skillHit.id,
												dx: x - skillHit.x,
												dy: y - skillHit.y,
												kind: "skill"
											};
											e.target.setPointerCapture(e.pointerId);
											return;
										}
										const textHit = [...boxesRef.current].reverse().find((box) => {
											if (skillPicks.some((item) => item.id === box.id)) return false;
											return x >= box.x - pad && x <= box.x + box.w + pad && y >= box.y - pad && y <= box.y + box.h + pad;
										});
										if (!textHit) {
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
											dx: x - textHit.x,
											dy: y - textHit.y,
											kind: "text"
										};
										e.target.setPointerCapture(e.pointerId);
									},
									onPointerMove: (e) => {
										const canvas = canvasRef.current;
										if (!canvas) return;
										const rect = canvas.getBoundingClientRect();
										const x = (e.clientX - rect.left) / rect.width * size.width;
										const y = (e.clientY - rect.top) / rect.height * size.height;
										const pad = 8;
										setOverIcon(skillPicks.some((item) => {
											const mark = (item.size ?? skillSize) * (item.scale ?? 1);
											return item.x != null && item.y != null && x >= item.x - pad && x <= item.x + mark + pad && y >= item.y - pad && y <= item.y + mark + pad;
										}) || boxesRef.current.some((box) => !skillPicks.some((item) => item.id === box.id) && x >= box.x - pad && x <= box.x + box.w + pad && y >= box.y - pad && y <= box.y + box.h + pad));
										const drag = dragRef.current;
										if (!drag) return;
										if (drag.kind === "text") {
											const nx = Math.max(8, Math.min(size.width - 40, x - drag.dx));
											const ny = Math.max(16, Math.min(size.height - 8, y - drag.dy));
											textPosRef.current = {
												...textPosRef.current,
												[drag.id]: {
													x: nx,
													y: ny
												}
											};
											requestPaint();
											return;
										}
										const pick = skillPicksRef.current.find((item) => item.id === drag.id);
										if (!pick || pick.x == null || pick.y == null) return;
										const mark = (pick.size ?? skillSize) * (pick.scale ?? 1);
										const nx = Math.max(0, Math.min(size.width - mark, x - drag.dx));
										const ny = Math.max(0, Math.min(size.height - mark, y - drag.dy));
										skillPicksRef.current = skillPicksRef.current.map((item) => item.id === drag.id ? {
											...item,
											x: nx,
											y: ny
										} : item);
										requestPaint();
									},
									onPointerUp: () => {
										dragRef.current = null;
										setGrabbing(false);
										draggingRef.current = false;
										setSkillPicks(skillPicksRef.current);
										setTextPos(textPosRef.current);
										requestPaint();
									},
									onPointerCancel: () => {
										dragRef.current = null;
										setGrabbing(false);
										draggingRef.current = false;
										requestPaint();
									}
								}), size.mark !== "none" ? safeZoneRects(size.mark).map((zone) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
								}, `${zone.label}-${zone.x}-${zone.y}`)) : null]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-center text-[10px] text-muted",
								children: [
									location.name,
									" · ",
									size.width,
									"×",
									size.height,
									" · ",
									size.note,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block",
										children: edition === "OSRS" ? "Old School RuneScape" : "RuneScape"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex flex-wrap justify-center gap-1 px-2 py-2",
								style: { background: "#1a1610" },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: `h-7 rounded-md border px-2 text-[10px] ${view === "a" ? "border-parchment" : "border-line"}`,
									onClick: () => {
										setView("a");
										setViewLocked(true);
									},
									children: "View A"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									disabled: !hasViewB(location),
									title: hasViewB(location) ? location.viewBLabel : "Only one view of this place",
									className: `h-7 rounded-md border px-2 text-[10px] disabled:opacity-40 ${view === "b" ? "border-parchment" : "border-line"}`,
									onClick: () => {
										if (!hasViewB(location)) return;
										setView("b");
										setViewLocked(true);
									},
									children: "View B"
								})]
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
										applyStill(sister.id);
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
										className: "h-8 rounded-md border border-line px-2 text-[10px] capitalize disabled:opacity-40",
										onClick: (e) => {
											const step = e.shiftKey ? 16 : 4;
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
												const mark = (item.size ?? skillSize) * (item.scale ?? 1);
												let x = item.x;
												let y = item.y;
												if (dir === "left") x = Math.max(0, x - step);
												if (dir === "right") x = Math.min(size.width - mark, x + step);
												if (dir === "up") y = Math.max(0, y - step);
												if (dir === "down") y = Math.min(size.height - mark, y + step);
												return {
													...item,
													x,
													y
												};
											}));
										},
										children: dir
									}, dir)),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										disabled: !pickedSkill,
										className: "h-8 rounded-md border border-line px-2 text-[10px] disabled:opacity-40",
										onClick: () => {
											setSkillPicks((cur) => cur.filter((item) => item.id !== pickedSkill));
											setPickedSkill(null);
										},
										children: "Remove"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "h-8 rounded-md border border-line px-2 text-[10px]",
										onClick: () => {
											const towns = visible.length ? visible : LOCATIONS.filter((loc) => loc.kind === kind && loc.edition === edition);
											if (!towns.length) return;
											applyStill(towns[Math.floor(Math.random() * towns.length)].id);
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
													children: pack === "OSRS" ? "Old School" : "RuneScape 3"
												}, pack)),
												[
													"name",
													"bottom",
													"top"
												].map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => setSkillPlace(id),
													className: `h-7 rounded-md border px-2 text-[10px] ${skillPlace === id ? "border-parchment bg-[#241e16]" : "border-line"}`,
													children: id === "name" ? "Under name" : id === "bottom" ? "Bottom" : "Top"
												}, id)),
												BANNER_SIZES.map((box) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => setSizeId(box.id),
													className: `h-7 rounded-md border px-2 text-[10px] ${sizeId === box.id ? "border-parchment" : "border-line"}`,
													children: box.name
												}, box.id)),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													className: "h-7 rounded-md border border-line px-2 text-[10px]",
													onClick: () => {
														const pack = SKILLS.filter((skill) => skill.editions.includes(skillPack));
														setSkillPicks(pack.slice(0, 12).map((skill, i) => ({
															id: skill.id,
															game: skillPack,
															level: "",
															x: Math.round(size.width * .08 + i % 6 * (skillSize + 16)),
															y: Math.round(size.height * .55 + Math.floor(i / 6) * (skillSize + 16)),
															size: skillSize,
															scale: 1
														})));
													},
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
																if (cur.length >= 12) return cur;
																return [...cur, {
																	id: skill.id,
																	game: skillPack,
																	level: next,
																	size: skillSize,
																	scale: 1
																}];
															});
														}
													})]
												}, skill.id);
											})
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "px-1 text-[10px] text-muted",
									children: "Marks"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
								})] })]
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
												className: "mt-0.5 h-8 w-full rounded-sm border border-[#c6a45a]/35 bg-[#1a1610] px-1 text-sm text-parchment outline-none ring-0 focus-visible:border-[#c6a45a]"
											}),
											looksLikeStaffName(streamer) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block text-[10px] text-muted",
												children: "Do not impersonate Jagex staff on a banner."
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "block text-[10px] text-faint",
												children: [streamer.length, " / 12 · Twelve letters, as in game."]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "text-[10px] text-muted",
										children: ["Clan", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: clan,
											onChange: (e) => setClan(sanitizeClan(e.target.value)),
											className: "mt-0.5 h-8 w-full rounded-sm border border-[#c6a45a]/35 bg-[#1a1610] px-1 text-sm text-parchment outline-none ring-0 focus-visible:border-[#c6a45a]"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "text-[10px] text-muted",
										children: ["Handle", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: handle,
											onChange: (e) => setHandle(sanitizeHandle(e.target.value)),
											className: "mt-0.5 h-8 w-full rounded-sm border border-[#c6a45a]/35 bg-[#1a1610] px-1 text-sm text-parchment outline-none ring-0 focus-visible:border-[#c6a45a]"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "text-[10px] text-muted",
										children: ["Tagline", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: tagline,
											onChange: (e) => setTagline(sanitizeTagline(e.target.value)),
											className: "mt-0.5 h-8 w-full rounded-sm border border-[#c6a45a]/35 bg-[#1a1610] px-1 text-sm text-parchment outline-none ring-0 focus-visible:border-[#c6a45a]"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "text-[10px] text-muted",
										children: ["Discord", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: discord,
											onChange: (e) => setDiscord(sanitizeDiscord(e.target.value)),
											className: "mt-0.5 h-8 w-full rounded-sm border border-[#c6a45a]/35 bg-[#1a1610] px-1 text-sm text-parchment outline-none ring-0 focus-visible:border-[#c6a45a]"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "text-[10px] text-muted",
										children: ["Grind", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: grind,
											onChange: (e) => setGrind(sanitizeGrind(e.target.value)),
											className: "mt-0.5 h-8 w-full rounded-sm border border-[#c6a45a]/35 bg-[#1a1610] px-1 text-sm text-parchment outline-none ring-0 focus-visible:border-[#c6a45a]"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "text-[10px] text-muted",
										children: ["World", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: world,
											onChange: (e) => setWorld(sanitizeWorld(e.target.value)),
											className: "mt-0.5 h-8 w-full rounded-sm border border-[#c6a45a]/35 bg-[#1a1610] px-1 text-sm text-parchment outline-none ring-0 focus-visible:border-[#c6a45a]"
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
										setSkillPicks((cur) => cur.map((item) => {
											if (item.game !== pack) return item;
											if (MARKS.some((mark) => mark.id === item.id)) return item;
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
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Pick Towns or Bosses, then the game you actually play." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
										"Open a still, or",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "text-parchment underline",
											onClick: () => fileRef.current?.click(),
											children: "upload your own picture"
										}),
										"."
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Choose the size the platform asks for." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Name, clan, skills. Drag to place. Wheel to resize." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Pete saves the picture. That is the whole job." })
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
									window.clearTimeout(peteTimer.current);
									peteClicks.current += 1;
									peteTimer.current = window.setTimeout(() => {
										peteClicks.current = 0;
									}, 2e3);
									if (peteClicks.current >= 7) {
										peteClicks.current = 0;
										eggToast("Mail for the founder. It's another death pile.");
									}
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-sm text-center text-sm text-parchment",
								children: postieLineAt(peteNow)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-md text-center text-sm text-muted",
								children: "He saves the picture. That is the whole job."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-md text-center text-xs text-muted",
								children: "Download the picture — size is the chip you picked (1200×480 Twitch · 1280×720 YouTube · 1920×1080 offline · 1920×480 wide). Copy desk link shares the place and size, not your display name."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: downloadJpeg,
								className: "min-h-11 rounded-md border border-parchment px-3 text-sm text-parchment",
								children: "Download the picture"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "min-h-11 rounded-md border border-line px-3 text-sm text-muted",
								onClick: () => {
									const path = deskSharePath(edition, location.id, size.id, skillPicks.map((row) => row.id));
									navigator.clipboard.writeText(`${window.location.origin}${path}`);
									setSaveNote("Desk link copied.");
								},
								children: "Copy desk link"
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
