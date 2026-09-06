import { i as __toESM } from "../_runtime.mjs";
import { L as redirect, V as require_react, _ as createRootRoute, b as require_jsx_runtime, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-header-BjHYT6a8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function pad(n) {
	return String(n).padStart(2, "0");
}
function formatRemain(ms) {
	const safe = Math.max(0, ms);
	const h = Math.floor(safe / 36e5);
	const m = Math.floor(safe % 36e5 / 6e4);
	const s = Math.floor(safe % 6e4 / 1e3);
	if (h >= 1) return `${h}h ${pad(m)}m`;
	return `${m}m ${pad(s)}s`;
}
function untilUtcHour(now) {
	return formatRemain(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours() + 1, 0, 0) - now.getTime());
}
function untilUtcMidnight(now) {
	return formatRemain(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0) - now.getTime());
}
/** 1s tick while the tab is visible. Sleeps when hidden. */
function useVisibleNow(periodMs = 1e3) {
	const [now, setNow] = (0, import_react.useState)(() => Date.now());
	(0, import_react.useEffect)(() => {
		const tick = () => setNow(Date.now());
		let id = 0;
		const arm = () => {
			window.clearInterval(id);
			if (document.visibilityState === "visible") {
				tick();
				id = window.setInterval(tick, periodMs);
			}
		};
		arm();
		document.addEventListener("visibilitychange", arm);
		return () => {
			window.clearInterval(id);
			document.removeEventListener("visibilitychange", arm);
		};
	}, [periodMs]);
	return now;
}
function UtcClock() {
	const now = useVisibleNow();
	const date = new Date(now);
	const label = date.toLocaleDateString("en-GB", {
		weekday: "long",
		day: "numeric",
		month: "short",
		timeZone: "UTC"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "mt-1 font-mono text-[10px] tabular-nums text-faint",
		children: [
			label,
			" · ",
			pad(date.getUTCHours()),
			":",
			pad(date.getUTCMinutes()),
			":",
			pad(date.getUTCSeconds()),
			" UTC"
		]
	});
}
var EGG_EVENT = "rs-egg-toast";
function eggToast(message) {
	if (typeof window === "undefined") return;
	if (window.location.pathname.startsWith("/legal")) return;
	window.dispatchEvent(new CustomEvent(EGG_EVENT, { detail: message }));
}
function reducedMotion() {
	return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function fieldFocused() {
	const el = document.activeElement;
	if (!el) return false;
	return el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable;
}
function sessionOnce(key) {
	try {
		if (sessionStorage.getItem(key)) return false;
		sessionStorage.setItem(key, "1");
		return true;
	} catch {
		return true;
	}
}
var OWNER_LINES = [
	"The banks still send this one birthday cards.",
	"GP so old it has rumours.",
	"Logged in before some worlds had names.",
	"Sweat tier: the mouse asked for a break.",
	"Grind so long the rocks respawned out of respect."
];
function isOwnerName(raw) {
	return raw.trim().toLowerCase().replace(/[^a-z]/g, "") === "christefer";
}
function ownerToast() {
	eggToast(OWNER_LINES[Math.floor(Math.random() * OWNER_LINES.length)] ?? OWNER_LINES[0]);
}
function savedEdition() {
	try {
		const raw = localStorage.getItem("rsbs.desk.v1") || localStorage.getItem("rs-banner-studio");
		if (!raw) return "OSRS";
		return JSON.parse(raw).edition === "RS3" ? "RS3" : "OSRS";
	} catch {
		return "OSRS";
	}
}
var STUDIO_NAV = [
	["/", "Banner Studio"],
	["/edit", "Video editor"],
	["/classic", "Classic"],
	["/gods", "Gods"],
	["/bosses", "Bosses"],
	["/pvp", "PvP"],
	["/monsters", "Bestiary"],
	["/towns", "Towns"],
	["/knowledge", "Sites"],
	["/jmods", "Jagex directory"],
	["/brief", "Brief"],
	["/history", "History"],
	["/chronicle", "Chronicle"],
	["/streamers", "Streamers"],
	["/youtubers", "Youtubers"],
	["/legal", "Legal"]
];
function navActive(path, to) {
	if (to === "/") return path === "/";
	return path === to || path.startsWith(`${to}/`);
}
function StudioNavLinks({ onPick }) {
	const path = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: STUDIO_NAV.map(([to, label], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [i ? " · " : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to,
		preload: to === "/streamers" || to === "/youtubers" ? "intent" : false,
		"aria-current": navActive(path, to) ? "page" : void 0,
		className: navActive(path, to) ? "font-semibold text-parchment underline decoration-parchment/60 underline-offset-4" : "",
		onClick: () => onPick?.(),
		children: label
	})] }, to)) });
}
function SiteHeader({ onMarkClick, children, skip }) {
	const pete = (0, import_react.useRef)({
		n: 0,
		t: 0
	});
	const [menu, setMenu] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!menu) return;
		const onKey = (e) => {
			if (e.key === "Escape") setMenu(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [menu]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [skip ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href: skip.href,
		className: "sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-20 focus:bg-raised focus:px-3 focus:py-2",
		children: skip.label
	}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rs-stone-header mb-3 px-1 py-1 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "cursor-default text-[10px] tracking-[0.2em] text-faint uppercase",
				onClick: onMarkClick ?? (() => {
					const now = Date.now();
					if (now - pete.current.t > 2e3) pete.current.n = 0;
					pete.current.t = now;
					pete.current.n += 1;
					if (pete.current.n >= 7) {
						pete.current.n = 0;
						eggToast("You've got mail. (You haven't.)");
					}
				}),
				children: "Independent studio · not a Jagex product"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "site-title page-h1 no-underline",
					children: "RuneScape Banner Studio"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UtcClock, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				"aria-label": "Studio",
				className: "mt-1.5 hidden flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-parchment md:flex",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioNavLinks, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 md:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "min-h-11 min-w-11 rounded-md border border-line px-3 text-sm text-parchment",
					"aria-expanded": menu,
					onClick: () => setMenu((v) => !v),
					children: "Menu"
				}), menu ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 flex flex-col gap-1 border border-line bg-[#1a1610] p-2 text-sm text-parchment",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioNavLinks, { onPick: () => setMenu(false) })
				}) : null]
			}),
			children
		]
	})] });
}
function BackLink() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, { skip: {
		href: "#content",
		label: "Skip to content"
	} });
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/boss-notes-BfYEPY6b.js
function bossWiki(note) {
	if (note.wiki) return note.wiki;
	const page = note.title.replace(/ /g, "_");
	return note.edition === "OSRS" ? `https://oldschool.runescape.wiki/w/${page}` : `https://runescape.wiki/w/${page}`;
}
function bossWipe(note) {
	return note.wipe ?? note.method[0] ?? "Confirm the wipe on the wiki for this hour.";
}
var BOSS_NOTES = {
	toa: {
		id: "toa",
		title: "Tombs of Amascut",
		edition: "OSRS",
		role: "Raid · 1–8",
		style: "All three. Yellow Keris on path bosses. Wardens take the skull he is charging.",
		pray: "Room by room. Akkha: the style he just used. Zebak: missiles, then mage on the roar. Wardens: the charging skull.",
		start: [
			"You already know the lobby. 0 invocation until every room has a name.",
			"Solo or a quiet two. A 300 with no room notes is a bank tax.",
			"Two wipes on the same mechanic: that room is the night. Next pull waits."
		],
		kit: [
			"Learner: swamp trident, blowpipe, bandos or blessed, yellow Keris, lightbearer if it is already in the bank.",
			"Desk: Tumeken's shadow or sang, masori / ancestral swaps, saturated heart, thralls.",
			"Stamina and restore before Wardens. Food is a missed tile, not a rotation."
		],
		route: [
			"Name the path. Akkha: memory tiles, then the boss. Baba: boulder line, then the monkey. Kephri: dunk dung, swarms down. Zebak: jugs on waves, walk the acid.",
			"Wardens: tiles, then the core. Last phase walks the slam. A charged skull is a leave.",
			"Kephri dung and Zebak waves end more raids than Wardens HP."
		],
		method: ["One invocation rack after a clean raid. A clean 50 teaches more than a wipe 200.", "One talker. Time the raid. Cut one minute, not five."],
		wipe: "Kephri dung on the floor, or a Zebak wave nobody jugged. Wardens is almost never first.",
		wiki: "https://oldschool.runescape.wiki/w/Tombs_of_Amascut"
	},
	vorkath: {
		id: "vorkath",
		title: "Vorkath",
		edition: "OSRS",
		role: "Solo slayer / money",
		style: "Ranged (Zaryte, tbow, blowpipe) or melee lance. Pick one. Stay on it for the trip.",
		pray: "Protect Missiles plus Rigour or Piety. Walk the pink fireball. Never tank it.",
		start: [
			"Super antifire plus a dragonfire ward. Salve (ei) if it is already on the neck.",
			"Six autos, then the special. Acid or spawn — count it, do not guess it.",
			"Bank the trip with two deaths already in the plan. Pools before kills/hr."
		],
		kit: ["Learner: void or blessed, blowpipe or rune cbow, ruby then diamond, extended antifire.", "Desk: masori, Zaryte or tbow, slayer staff for Crumble, divine ranging."],
		route: [
			"Pool, bank, boat. Spec the first grounded hits.",
			"Acid: one straight line, one-tile path. The pool is not a panic click.",
			"Spawn: Crumble Undead or a golden pool before the next fireball. Resume the six-count."
		],
		method: ["Woox walk is extra kills after the six-count is muscle. It is not hour one.", "A death on acid is a count error. Slow the next kill. Speed comes back."]
	},
	tob: {
		id: "tob",
		title: "Theatre of Blood",
		edition: "OSRS",
		role: "Raid · 3–5",
		style: "Scythe is the room. Range and mage for Maiden nylos and Xarpus. Hasta plus void still clears Entry.",
		pray: "Maiden mage. Bloat missiles, walk the stomp. Nylos mix. Sotetseg mage. Xarpus range. Verzik mix — call the swap.",
		start: ["You already know the lobby. Entry until Maiden crabs are a call, not a surprise.", "One new seat per raid. Notes after the room, not mid-cast."],
		kit: ["Learner: hasta or whip, trident, blowpipe, avernic if it is already in the bank.", "Desk: scythe, tbow, sang, avernic, justiciar only if you are the Verzik tank."],
		route: [
			"Five rooms, then Verzik. Maiden crabs die on their side. A leak is her heal. That is the first room.",
			"Bloat sleeps, then stomps. Walk the stomp. Planted feet are the wipe.",
			"Nylos: the pillar you were given. A missed pillar dumps the room on the team.",
			"Sotetseg: one maze voice. Wrong tile is a death.",
			"Xarpus: poison splash on the walk, range when he is exposed.",
			"Verzik P1 is crabs. P2 is yellow — leave the tile. P3 is tornadoes and one talker."
		],
		method: ["A 4:30 Maiden does not save a 12-minute Verzik. Film the seat.", "Hard mode is another night. First purple stays on Entry."],
		wipe: "A Maiden crab on the wrong side, or a Sotetseg maze tile nobody called.",
		wiki: "https://oldschool.runescape.wiki/w/Theatre_of_Blood"
	},
	corp: {
		id: "corp",
		title: "Corporeal Beast",
		edition: "OSRS",
		role: "Mass or 2–6 spear",
		style: "Spears only for a real split. Everything else feeds the core.",
		pray: "Protect Mage if you are on the dark core. Protect Melee on the stomp if you are stacked.",
		start: ["Games necklace. Do not walk from the ditch with a spear out.", "No spear: you are a core soak. Say that before the pull."],
		kit: ["Learner: hasta if you must. Zamorakian / dragon hunter lance is the ticket.", "Desk: crystal halberd specs, slayer helm on task, divine super combat."],
		route: ["Stack the core. A dark core left on one person is the wipe.", "Stomp: step out, then back in. A sigil drop is not a reason to stand middle."],
		method: ["Mass is a lottery. Spear teams are a job. Name which night this is."]
	},
	nex: {
		id: "nex",
		title: "Nex",
		edition: "OSRS",
		role: "5-man or mass",
		style: "Magic on smoke and Zaros. Range or mage on shadow. Melee on blood if the team called it.",
		pray: "Smoke mage. Shadow missiles. Blood mage. Ice mage. Zaros: the auto she is using.",
		start: ["Four wings as a list: smoke, shadow, blood, ice, then Zaros.", "Blood siphon is not a first-night seat."],
		kit: ["Learner: trident, blessed, one tank piece.", "Desk: ancestral, sang or shadow, tbow for shadow if the team uses it."],
		route: ["Smoke: clear minions, walk the cough. Shadow: off the line. Blood: leave the siphon. Ice: break icicles. Zaros: pray the auto."],
		method: ["A 5-man with a caller beats a 20-man with no plan. One VOD per wing."]
	},
	zulrah: {
		id: "zulrah",
		title: "Zulrah",
		edition: "OSRS",
		role: "Solo",
		style: "Mage and range. Swap on the colour, not on HP.",
		pray: "Green: missiles. Red: mage. Blue: mage. Jad: the hit that is about to land.",
		start: ["Pin a rotation. First ten kills are the rotation. The boss is later.", "Diary cape or scroll for the boat. Fairy ring every death is wasted time."],
		kit: ["Learner: trident, blowpipe, void or ahrim / blessed swaps.", "Desk: ancestral, sang or shadow, tbow, toxic blowpipe for green."],
		route: ["Stand the tile that rotation marked. Jad: prayer first, click second.", "Snakelings: kill or ignore on the note you brought. No third plan mid-kill."],
		method: ["Kill time drops when the rotation is memory. Film one kill. Fix one tile."]
	},
	inferno: {
		id: "inferno",
		title: "The Inferno",
		edition: "OSRS",
		role: "Solo cape",
		style: "Range camp. Mage on blobs and Jad. Zuk is a prayer exam.",
		pray: "Every tick is an overhead. Zuk: the shield setter plus the Jad healers.",
		start: ["You already know the lobby. Fight Caves until Jad is boring. Inferno is the second exam.", "Nibbler pathing in a dummy world or a guide that uses the spawn set you will see."],
		kit: ["First cape: bowfa or tbow, ancestral, sang, justiciar optional, 3–4 brews you can count.", "Desk: tbow, ancestral, lightbearer, the exact bag you practiced."],
		route: ["Waves: solve the stack in front of you. Wave 12 is not Zuk.", "Jad: healers one at a time. Zuk: set, walk, Jad, healers, set again."],
		method: ["A 60-wave attempt with notes beats ten 20-wave panics. Write the wipe. Change one thing."],
		wipe: "A blob stacked on a ranger you left alive, or Zuk Jad healers into the next set.",
		wiki: "https://oldschool.runescape.wiki/w/Inferno"
	},
	nightmare: {
		id: "nightmare",
		title: "The Nightmare",
		edition: "OSRS",
		role: "Mass or small team",
		style: "Melee on the boss. Range the totems. Mage the parasites if that is the seat.",
		pray: "The attack she is using. Husk: the style of the husk.",
		start: ["Mass first so every special has a name before you own the room.", "Phosani is another exam. Not first night."],
		kit: ["Learner: hasta, blowpipe for totems.", "Desk: scythe, tbow, the parasite mage switch."],
		route: ["Spores: walk. Husks: pray. Totems: charge, then the boss. Parasites: the seat that owns them clicks them."],
		method: ["Small team is a totem job. Mass is a prayer job. Name which night this is."]
	},
	graardor: {
		id: "graardor",
		title: "General Graardor",
		edition: "OSRS",
		role: "Duo or trio GWD",
		style: "Melee. Range only if the tank asked for it.",
		pray: "Protect Melee on Graardor. Switch for the minions when they are on you.",
		start: ["Kc first. Five kc and a scythe screenshot is still five kc.", "Tank tile is a contract. Do not stand it unless you are the tank."],
		kit: ["Learner: bandos, hasta, super combats.", "Desk: scythe, inquisitor if it is already in the bank, blood fury."],
		route: ["Minions then boss, or the order the tank called. No third order."],
		method: ["A trip is kc plus a door. Loot talk is after the last kill."]
	},
	kree: {
		id: "kree",
		title: "Kree'arra",
		edition: "OSRS",
		role: "Duo or trio GWD",
		style: "Ranged. Magic only if the team brought it on purpose.",
		pray: "Protect Missiles. Switch for the melee minion if it is on you.",
		start: ["Kc. Armadyl is a knockback room. Stand the tiles the tank uses."],
		kit: ["Learner: blessed, bowfa or crossbow.", "Desk: masori, tbow, anguish."],
		route: ["Do not stand under Kree. Minions on the call."],
		method: ["Knockback deaths are tile errors. Slow the next kill."]
	},
	muspah: {
		id: "muspah",
		title: "Phantom Muspah",
		edition: "OSRS",
		role: "Solo DT2",
		style: "Ranged on the body. Mage or melee on the prayer-shield phase.",
		pray: "Protect the style it is using. Walk the spike.",
		start: ["Ghorrock after DT2. Three forms as a list before you chase a time."],
		kit: ["Learner: bowfa, trident, a melee swap.", "Desk: tbow, shadow or sang, scythe on the last form if that is the note."],
		route: ["Spikes: walk. Shield: swap style. Teleport smash: step out."],
		method: ["A death on spikes is a walk error. Film one kill."]
	},
	hydra: {
		id: "hydra",
		title: "Alchemical Hydra",
		edition: "OSRS",
		role: "Solo slayer",
		style: "Ranged. The colour of the vent is the mechanic.",
		pray: "Protect the head that is attacking. Swap on the animation.",
		start: ["Konar or slayer task. Off-task first kill if you care about the claw is a different night."],
		kit: ["Learner: blowpipe or bowfa, antipoison.", "Desk: tbow, masori, thralls."],
		route: ["Lure to the correct vent. Poison walk. Enrage: keep the prayer swap."],
		method: ["Vent order is the fight. DPS is second."]
	},
	telos: {
		id: "telos",
		title: "Telos, the Warden",
		edition: "RS3",
		role: "Solo enrage",
		style: "Necromancy is the current desk. Magic and melee still work if that is your log.",
		pray: "Soul Split. Deflect the font style. 100%+ is a prayer exam.",
		start: ["0–100% until fonts and anima are boring. A 200% VOD is not this pull.", "War's Retreat. One preset. One familiar. Write the % on screen."],
		kit: ["Learner: best necro or mage you own, vuln bomb, a stun that lands.", "Desk: the PvME page for this hour. Do not mix three discords."],
		route: [
			"Three phases at every enrage. Fonts are the wipe: matching colour, or the room ends you.",
			"Anima is spent on purpose. Dumping it late is how a clean first minute still dies.",
			"Gogoa’l is a walk. Tendrils are a cut. Do not eat both at once.",
			"Hold Soul Split. Deflect the style the current font is teaching.",
			"At 100% the rooms keep their names and lose their time.",
			"At 200%+ one missed font is the kill. Add % only after two clean kills."
		],
		method: ["Add 25% after two clean kills. A wipe streak is a note problem."],
		wipe: "Wrong font colour. The room ends the pull. The HP bar does not.",
		wiki: "https://runescape.wiki/w/Telos,_the_Warden"
	},
	raksha: {
		id: "raksha",
		title: "Raksha",
		edition: "RS3",
		role: "Solo or duo",
		style: "Magic or necro. Poison and shadow walks.",
		pray: "Soul Split. Deflect mage on the beam.",
		start: ["Anachronia. Poison pools have names before you chase a time."],
		kit: ["Learner: best mage, poison purge if you use it.", "Desk: PvME necro or mage page."],
		route: ["Pools: walk. Shadow: the tile. P4: do not channel into a beam."],
		method: ["A pool death is a walk error. Slow the next kill."]
	},
	vorago: {
		id: "vorago",
		title: "Vorago",
		edition: "RS3",
		role: "5–10 man borehole",
		style: "Team sheet. Usually melee bombs and a mage.",
		pray: "Soul Split. Deflect melee on the smash.",
		start: ["Week rotation is public. Read it before you type inv.", "Base is not a first-night seat. Watch this week's mechanic."],
		kit: ["What the lead pinned. No surprise scythe if they asked for a bomb."],
		route: ["P5 bleed: stack only on the called tile. One talker. Extra voice on bomb is the wipe."],
		method: ["On time, week note open. Gear flex is not a role."]
	},
	solak: {
		id: "solak",
		title: "Solak",
		edition: "RS3",
		role: "7-man",
		style: "Base and bombs melee. One mage on the core if the sheet says so.",
		pray: "Soul Split. Deflect on the cleanse.",
		start: ["Arms and legs die on the call. Do not pad an arm that is already dead."],
		kit: ["Team sheet first. Best melee unless the lead parked you on core."],
		route: ["Mindscape: stand your colour. Blight: cleanse when the base says. One talker in the mindscape."],
		method: ["A quiet 7-man outruns a loud 7-man with better weapons."]
	},
	glacor: {
		id: "glacor",
		title: "Arch-Glacor",
		edition: "RS3",
		role: "Solo streaks",
		style: "Necro or mage. The mechanic you ticked is the fight.",
		pray: "Soul Split. Deflect the mechanic you enabled.",
		start: ["0 mechanic until the kill is clean. Add one mechanic at a time."],
		kit: ["Best necro or mage. The stun you will actually press."],
		route: ["The mechanic you ticked is the fight. Five ticks on a first night is a different exam."],
		method: ["Streaks pay. A wipe on mechanic three is a note you skipped."]
	},
	rasial: {
		id: "rasial",
		title: "Rasial",
		edition: "RS3",
		role: "Solo necromancy exam",
		style: "Necromancy. This is the necro log.",
		pray: "Soul Split. Deflect the volley.",
		start: ["City of Um. Conjure cycle has a name before you chase a time."],
		kit: ["Best necro. The PvME Rasial page for this hour."],
		route: ["Conjures up. Volley is a walk. Living Death does not sit on that volley."],
		method: ["A missed conjure is a reset. The HP bar follows the cycle."],
		wipe: "Living Death window dropped on a volley. The cycle is the fight.",
		wiki: "https://runescape.wiki/w/Rasial,_the_First_Necromancer"
	},
	araxxor: {
		id: "araxxor",
		title: "Araxxor / Araxxi",
		edition: "RS3",
		role: "Solo or duo",
		style: "The path that is open this week. Melee or range usually.",
		pray: "Soul Split. Deflect the swipe.",
		start: ["Week path is public. Acid, minions, or darkness — read which two are open."],
		kit: ["Path kit. Do not bring a mage preset to a melee path."],
		route: ["P1–2 on the path. P3 Araxxi: walk the acid, click the minion if that is the week."],
		method: ["Path knowledge is the money. Enrage later."]
	},
	kerapac: {
		id: "kerapac",
		title: "Kerapac",
		edition: "RS3",
		role: "Solo or duo",
		style: "Magic or necro.",
		pray: "Soul Split. Deflect mage.",
		start: ["Anachronia lab. Time-stop walk before 100% enrage."],
		kit: ["Best mage or necro. A stun that lands."],
		route: ["Clones: the real one. Time-stop: walk. P4: do not channel into a slam."],
		method: ["Add enrage after two clean kills. A slam death is a greed."]
	},
	qbd: {
		id: "qbd",
		title: "Queen Black Dragon",
		edition: "RS3",
		role: "Solo money / logs",
		style: "Magic or necro. Artifacts in the correct order.",
		pray: "Soul Split. Deflect mage on the fire.",
		start: ["Artifacts first. The dragon is a timer around the artifacts."],
		kit: ["Best mage. Super antifire. The four artifacts in inventory order."],
		route: ["Click artifacts on the order you practiced. Walk the fire walls. Kill the coffins if they are up."],
		method: ["A death on artifacts is an order error. Slow the next kill."]
	},
	zamorakboss: {
		id: "zamorakboss",
		title: "Zamorak, Lord of Chaos",
		edition: "RS3",
		role: "Solo or group enrage",
		style: "Team or solo sheet. Necro and mage are common.",
		pray: "Soul Split. Deflect the current special.",
		start: ["Infernal Source. 0–100% until the map is memory."],
		kit: ["PvME page for this hour. Do not mix two discords."],
		route: ["Map first. Specials on the call. High enrage is a prayer exam."],
		method: ["Add 50% after two clean kills. A wipe streak is a map problem."]
	},
	helwyr: {
		id: "helwyr",
		title: "Helwyr",
		edition: "RS3",
		role: "Duo GWD2",
		style: "Melee or range.",
		pray: "Soul Split. Deflect melee on the leap.",
		start: ["Mushrooms and howls. Walk the fungus."],
		kit: ["Best melee or range. One person on the add if it is called."],
		route: ["Howl: walk. Mushrooms: do not stand in them."],
		method: ["GWD2 is practice for the next raid. Treat the walk like one."]
	},
	vindicta: {
		id: "vindicta",
		title: "Vindicta",
		edition: "RS3",
		role: "Duo GWD2",
		style: "Melee or range.",
		pray: "Soul Split. Deflect melee on the charge.",
		start: ["Hurricane: walk out. Do not stand in front of a charge."],
		kit: ["Melee or range camp. Resonate if you brought it."],
		route: ["Dragon phase: kill Gorvek fire, not only the rider."],
		method: ["Charge walk is the trip. The HP bar follows."]
	},
	cox: {
		id: "cox",
		title: "Chambers of Xeric",
		edition: "OSRS",
		role: "Raid · 1–15",
		style: "All three. Olm: melee left claw, mage right claw, range the head in last phase.",
		pray: "Head: the style he is using. Hands: stay off the wrong claw.",
		start: ["Learn one layout. First Olm is not a 15-man.", "Points come from rooms, not only the head."],
		kit: ["Learner: hasta, trident, blowpipe, dwh or bgs.", "Desk: scythe, shadow or sang, tbow, elder maul."],
		route: ["Clear rooms clean. Olm: spec the mage claw, melee the left, range the head when he stands.", "A teleport crystal in the middle of the room is a leave."],
		method: ["A clean trio teaches more than a messy mass. Add scale after Olm is boring."],
		wipe: "Teleport crystal in the middle, or a claw you hit while praying the head.",
		wiki: "https://oldschool.runescape.wiki/w/Chambers_of_Xeric"
	},
	colosseum: {
		id: "colosseum",
		title: "Fortis Colosseum",
		edition: "OSRS",
		role: "Solo waves then Sol Heredit",
		style: "Melee or the style the modifier asks.",
		pray: "Sol: the overhead he is about to throw. Waves: flick the spawn.",
		start: ["Clear waves with one modifier off until Sol is a known fight."],
		kit: ["Learner: hasta or scythe, brews you can count.", "Desk: the invos you practiced, not a random stack."],
		route: ["Waves first. Sol: walk the shockwave. Do not eat into a combo."],
		method: ["A cape is a wave exam plus a boss. Notes beat extra food."]
	},
	duke: {
		id: "duke",
		title: "Duke Sucellus",
		edition: "OSRS",
		role: "Solo DT2",
		style: "Magic or melee. Stun the eyes.",
		pray: "Protect Mage on the volley. Walk the gas.",
		start: ["Open the vents. Do not sit in the first gas."],
		kit: ["Best mage or melee. Thralls. Restore for the enrage."],
		route: ["Eyes down, then boss. Enrage: keep moving."],
		method: ["A missed vent is a reset. The HP bar is not the puzzle."]
	},
	whisperer: {
		id: "whisperer",
		title: "The Whisperer",
		edition: "OSRS",
		role: "Solo DT2",
		style: "Magic. Sanity is the mechanic.",
		pray: "Protect Mage. Walk the silence tiles.",
		start: ["Sanity food and a corridor plan. Enrage is not first kill."],
		kit: ["Best mage. Saturated heart. The sanity supplies the wiki lists this hour."],
		route: ["Keep sanity up. Enrage is a tile test."],
		method: ["A wipe on sanity is a supply error. Slow the next kill."]
	},
	leviathan: {
		id: "leviathan",
		title: "The Leviathan",
		edition: "OSRS",
		role: "Solo DT2",
		style: "Ranged.",
		pray: "Protect Missiles. Walk the tail and the abyss.",
		start: ["The path around the arena has a name before you chase a time."],
		kit: ["Bowfa or tbow. Stams."],
		route: ["Abyss: do the path. Do not skip a tile to greed a hit."],
		method: ["Path first. DPS second."]
	},
	vardorvis: {
		id: "vardorvis",
		title: "Vardorvis",
		edition: "OSRS",
		role: "Solo DT2",
		style: "Melee.",
		pray: "Protect Melee. Walk the axes.",
		start: ["Axes are the fight. The boss is the timer."],
		kit: ["Scythe or hasta. Blood fury if you wear it."],
		route: ["Do not stand in an axe line. Enrage: keep the walk."],
		method: ["An axe death is a tile error. Slow the next kill."]
	},
	gauntlet: {
		id: "gauntlet",
		title: "The Gauntlet",
		edition: "OSRS",
		role: "Solo",
		style: "The weapon you crafted. Hunllef wants the other two styles in rotation.",
		pray: "Pray the style Hunllef is using. Swap on the animation.",
		start: ["Perfected weapons and armour before the door. Corrupted is another exam."],
		kit: ["What you built. The door is not a shortcut."],
		route: ["Hunllef: tornado walk, prayer swap, damage the right style."],
		method: ["Prep time is the raid. The boss is the test of the prep."]
	},
	kril: {
		id: "kril",
		title: "K'ril Tsutsaroth",
		edition: "OSRS",
		role: "Duo or trio GWD",
		style: "Melee. Poison protection.",
		pray: "Protect Melee on K'ril. Switch for minions.",
		start: ["Antipoison on. Tank tile in the pin."],
		kit: ["Bandos, hasta or scythe. Super combats."],
		route: ["Minions then boss, or the order the tank called."],
		method: ["Kc before loot talk."]
	},
	zilyana: {
		id: "zilyana",
		title: "Commander Zilyana",
		edition: "OSRS",
		role: "Duo or trio GWD",
		style: "Melee or range.",
		pray: "Protect Mage on Zilyana.",
		start: ["Do not stand the tank's tile. Minion prayer swaps."],
		kit: ["Bandos or arma. The style the tank listed."],
		route: ["Kill the minions that are hitting you."],
		method: ["A trip is kc. Screenshots come after the door."]
	},
	kq: {
		id: "kq",
		title: "Kalphite Queen",
		edition: "OSRS",
		role: "Solo or duo",
		style: "Form 1 crush or range. Form 2 the other style.",
		pray: "Protect the form she is in.",
		start: ["Keris if you have it. Two styles in the bag."],
		kit: ["Crush or range, then the swap. Antipoison."],
		route: ["Form change: swap gear before you greed the last hits."],
		method: ["The second form is a new fight. Treat it like one."]
	},
	scurrius: {
		id: "scurrius",
		title: "Scurrius",
		edition: "OSRS",
		role: "Solo learner",
		style: "Any. This is a first boss.",
		pray: "Protect Melee. Walk the falling rocks.",
		start: ["Varrock sewers. Food you can afford to lose."],
		kit: ["Whatever you train with. Leave the scythe home."],
		route: ["Click the rats if they pile. Walk the debris."],
		method: ["Learn prayer swaps here. The next boss will use them."]
	},
	cerberus: {
		id: "cerberus",
		title: "Cerberus",
		edition: "OSRS",
		role: "Solo slayer",
		style: "Melee or ranged. Pick one and stay on it.",
		pray: "Protect Magic on the first special if that is the live order. Confirm the three ghosts on the wiki.",
		start: ["Taverley hellhound task or the key. Antifire is not this room.", "Two deaths already in the plan. Pools before kills/hr."],
		kit: ["Slayer helm on task. Spectre or hasta. Protect item if you brought risk."],
		route: ["Three heads. Walk the lava. Ghosts: pray the style they named.", "Do not plant in the middle when the pool drops."],
		method: ["Task first. Off-task is a tax unless the live page still pays."],
		wipe: "A ghost you did not pray, or a lava tile you stood in.",
		wiki: "https://oldschool.runescape.wiki/w/Cerberus"
	},
	kraken: {
		id: "kraken",
		title: "Kraken",
		edition: "OSRS",
		role: "Solo slayer",
		style: "Magic. Trident or the live equivalent.",
		pray: "Protect Missiles. The tentacles hit first.",
		start: ["Cave kraken task. Disturb the large whirlpool last."],
		kit: ["Trident, slayer helm on task, ranging potion if the page still says so."],
		route: ["Tentacles first. Then the boss. Do not idle on a tentacle you left up."],
		method: ["This is not the cove task sheet. Cave kraken stays on Bestiary."],
		wipe: "A tentacle left alive while you chase the boss.",
		wiki: "https://oldschool.runescape.wiki/w/Kraken"
	},
	kbd: {
		id: "kbd",
		title: "King Black Dragon",
		edition: "OSRS",
		role: "Solo / small team",
		style: "Melee, ranged, or magic. Antifire is the tax.",
		pray: "Protect Magic. Super antifire plus a dragonfire ward.",
		start: ["Wilderness lair. Protect item. The lever is a risk tile."],
		kit: ["Antifire. Ward. Food you can laugh off. Leave the bank home."],
		route: ["Walk poison. Count the heads. Do not stand in the breath."],
		method: ["A trip is a risk number. Black dragons on a task stay on Bestiary."],
		wipe: "Dragonfire without antifire, or a PKer on the lever.",
		wiki: "https://oldschool.runescape.wiki/w/King_Black_Dragon"
	},
	zuk: {
		id: "zuk",
		title: "TzKal-Zuk",
		edition: "RS3",
		role: "Solo kiln",
		style: "Necro or magic at the current meta.",
		pray: "Soul Split. Deflect the wave style. Zuk: the shield call.",
		start: ["Waves are the exam. Zuk is the last question."],
		kit: ["Best necro or mage. Supplies you can count."],
		route: ["Clear waves. Zuk: one healer at a time. Do not panic eat into a Jad."],
		method: ["Open PvME the morning you push. A cape is a wave log."]
	},
	ambassador: {
		id: "ambassador",
		title: "The Ambassador",
		edition: "RS3",
		role: "Solo or duo ED3",
		style: "Magic or necro.",
		pray: "Soul Split. Deflect the current blast.",
		start: ["Black hole walk before you chase enrage."],
		kit: ["Best mage or necro. The stun you will press."],
		route: ["Holes: walk. Crystals: click early."],
		method: ["A late stun is a reset. Walk instead of greed."]
	},
	croesus: {
		id: "croesus",
		title: "Croesus",
		edition: "RS3",
		role: "4-man skilling boss",
		style: "Skilling. Combat is not the point.",
		pray: "None. Eat the fungus, not a prayer flick.",
		start: ["Roles: wood, mining, hunter, fishing. One person per node set."],
		kit: ["Skilling outfit and the tool the role needs. Leave the scythe home."],
		route: ["Call the fungus. Four people on one node is the wipe."],
		method: ["A quiet four-man beats a loud four-man with better picks."]
	},
	aod: {
		id: "aod",
		title: "Nex: Angel of Death",
		edition: "RS3",
		role: "7-man",
		style: "Team sheet. Usually melee bombs and a mage.",
		pray: "Soul Split. Deflect the element she is on.",
		start: ["Roles before the door. This is not mass Nex."],
		kit: ["What the lead listed. No flex piece they did not call."],
		route: ["Elements in order. Minions on the call. One talker."],
		method: ["On time, week note open. Gear flex is not a role."]
	},
	kk: {
		id: "kk",
		title: "Kalphite King",
		edition: "RS3",
		role: "Duo or small",
		style: "The colour he is not immune to.",
		pray: "Soul Split. Deflect the incoming style.",
		start: ["Swap when he changes colour. One-style camp is the wipe."],
		kit: ["Two styles in the bag. Drygores plus mage or range."],
		route: ["Colour swap is the fight. Incite if the team uses it."],
		method: ["A missed colour is a death. Swap on the animation."]
	},
	gregorovic: {
		id: "gregorovic",
		title: "Gregorovic",
		edition: "RS3",
		role: "Duo GWD2",
		style: "Range or necro.",
		pray: "Soul Split. Deflect range on the knives.",
		start: ["Knives and shadows. Walk the clock."],
		kit: ["Range camp. One person on the add if it is called."],
		route: ["Do not stand in a knife line."],
		method: ["GWD2 is practice for the next raid. Treat the walk like one."]
	},
	sanctum: {
		id: "sanctum",
		title: "Sanctum of Rebirth",
		edition: "RS3",
		role: "Group underworld raid",
		style: "Team sheet. Necro is common.",
		pray: "Soul Split. Deflect the current boss.",
		start: ["Learn the wing you were given. Every wing in one night is a different exam."],
		kit: ["What the lead listed."],
		route: ["Wings first. Last boss last. One talker."],
		method: ["Open the wiki the morning of. The instance is the exam."],
		wipe: "A wing mechanic you did not own. Last boss is not the first wipe.",
		wiki: "https://runescape.wiki/w/Sanctum_of_Rebirth"
	},
	bm: {
		id: "bm",
		title: "Beastmaster Durzag",
		edition: "RS3",
		role: "10-man Liberation of Mazcab",
		style: "Team sheet.",
		pray: "Soul Split. Deflect melee on the smash.",
		start: ["Pets and charges are the wipe. Roles before the pull."],
		kit: ["What the raid lead pinned."],
		route: ["Pets down on the call. Charges walked."],
		method: ["A quiet ten-man outruns a loud ten-man."]
	},
	yaka: {
		id: "yaka",
		title: "Yakamaru",
		edition: "RS3",
		role: "10-man after Durzag",
		style: "Team sheet. Stun and poison roles.",
		pray: "Soul Split. Deflect the pool you are in.",
		start: ["Yaka is not the same night as first Durzag."],
		kit: ["Raid sheet."],
		route: ["Pools on the call. Stun when the base says."],
		method: ["Durzag clean first. Yaka is a different exam."]
	}
};
function noteFor(id) {
	return BOSS_NOTES[id];
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/monsters-D-7F5dd7.js
function monsterStillSrc(row) {
	const game = row.edition === "OSRS" ? "osrs" : "rs3";
	const slug = row.slug.replace(/-/g, "");
	return `/stills/${game}/beast-${slug === "warpedterrobird" ? "warpedterrorbird" : slug}.jpg?v=9`;
}
function monsterStillLine(row) {
	return MONSTER_LINE[row.id] ?? "The creature. Not the room. Bosses have their own page.";
}
var MONSTER_LINE = {
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
	"osrs-cavehorror": "Witchwood icon. Bare-neck is the wipe.",
	"osrs-greendragon": "Wilderness bones. Protect item.",
	"osrs-bluedragon": "Taverley lane. Antifire.",
	"osrs-blackdragon": "The task. KBD is on Bosses.",
	"osrs-reddragon": "Brimhaven and the isle. Antifire.",
	"osrs-cavekraken": "The cove task. The boss is on Bosses.",
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
	"rs3-cow": "Rebuilt paddock. Leave the scythe home."
};
function sisterMonster(row) {
	const other = row.edition === "OSRS" ? "RS3" : "OSRS";
	return MONSTERS.find((item) => item.slug === row.slug && item.edition === other);
}
function osrsWiki(page) {
	return `https://oldschool.runescape.wiki/w/${page}`;
}
function rs3Wiki(page) {
	return `https://runescape.wiki/w/${page}`;
}
var MONSTERS = [
	{
		id: "osrs-goblin",
		slug: "goblin",
		name: "Goblin",
		edition: "OSRS",
		kind: "monster",
		where: "Goblin Village",
		hunt: "Yard melee. Multi. Learn food on these, then leave. Diplomacy is the politics; this is the fodder.",
		wiki: osrsWiki("Goblin"),
		still: "/locations/osrsgob.jpg",
		placeId: "osrsgob"
	},
	{
		id: "osrs-cow",
		slug: "cow",
		name: "Cow",
		edition: "OSRS",
		kind: "monster",
		where: "Lumbridge east field",
		hunt: "Paddock melee. Hide is the lesson. Leave the scythe home.",
		wiki: osrsWiki("Cow"),
		still: "/stills/osrs/osrs-lumbridge-a.jpg",
		placeId: "osrslumbridge"
	},
	{
		id: "osrs-hillgiant",
		slug: "hill-giant",
		name: "Hill giant",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "Edgeville dungeon",
		hunt: "Crush in multi. Brass key from the west door. Big bones. Not a boss.",
		wiki: osrsWiki("Hill_Giant"),
		still: "/locations/osrsedge.jpg",
		placeId: "osrsedge"
	},
	{
		id: "osrs-lesserdemon",
		slug: "lesser-demon",
		name: "Lesser demon",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "Taverley dungeon",
		hunt: "Magic and melee. Protect Magic if you idle. Taverley is a lane, not a raid.",
		wiki: osrsWiki("Lesser_demon"),
		still: "/locations/osrstav.jpg",
		placeId: "osrstav"
	},
	{
		id: "osrs-greaterdemon",
		slug: "greater-demon",
		name: "Greater demon",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "Taverley dungeon, Chasm of Fire",
		hunt: "Heavier demon. Protect as the live page says. Chasm of Fire is the burst room when the task allows it.",
		wiki: osrsWiki("Greater_demon"),
		still: "/locations/osrstav.jpg",
		placeId: "osrstav"
	},
	{
		id: "osrs-blackdemon",
		slug: "black-demon",
		name: "Black demon",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "Taverley dungeon, Catacombs",
		hunt: "Harder demon. Catacombs is multi — burst is common. Taverley is the long room. Leave a raid invocation home.",
		wiki: osrsWiki("Black_demon"),
		still: "/locations/osrstav.jpg",
		placeId: "osrstav"
	},
	{
		id: "osrs-hellhound",
		slug: "hellhound",
		name: "Hellhound",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "Taverley dungeon, Wilderness",
		hunt: "Fast melee. Protect Melee. Taverley takes a cannon. Wilderness is a risk trip. Cerberus is on Bosses.",
		wiki: osrsWiki("Hellhound"),
		still: "/locations/osrstav.jpg",
		placeId: "osrstav"
	},
	{
		id: "osrs-crawlinghand",
		slug: "crawling-hand",
		name: "Crawling Hand",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "Slayer Tower",
		gate: "Slayer",
		hunt: "Ground floor of the Tower. Melee. Stairs, then the floor they live on. Do not invent a scythe.",
		wiki: osrsWiki("Crawling_Hand"),
		still: "/locations/osrscani.jpg",
		placeId: "osrscani"
	},
	{
		id: "osrs-banshee",
		slug: "banshee",
		name: "Banshee",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "Slayer Tower",
		gate: "Slayer — earmuffs",
		hunt: "They scream without cover. Earmuffs or a slayer helm. Protect Magic. The wipe is a bare ear.",
		wiki: osrsWiki("Banshee"),
		still: "/locations/osrscani.jpg",
		placeId: "osrscani"
	},
	{
		id: "osrs-infernalmage",
		slug: "infernal-mage",
		name: "Infernal Mage",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "Slayer Tower",
		gate: "Slayer",
		hunt: "They cast. Protect Magic. Mid tower. Single-way. Click and pray.",
		wiki: osrsWiki("Infernal_Mage"),
		still: "/locations/osrscani.jpg",
		placeId: "osrscani"
	},
	{
		id: "osrs-bloodveld",
		slug: "bloodveld",
		name: "Bloodveld",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "Slayer Tower, Catacombs",
		gate: "Slayer",
		hunt: "Melee. Tower is single. Catacombs is the burst room. Mutated variants stay on the wiki.",
		wiki: osrsWiki("Bloodveld"),
		still: "/locations/osrscani.jpg",
		placeId: "osrscani"
	},
	{
		id: "osrs-gargoyle",
		slug: "gargoyle",
		name: "Gargoyle",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "Slayer Tower top",
		gate: "Slayer",
		hunt: "Rock melee. Protect Melee. They do not die until a rock hammer or the helm perk finishes them. That is the wipe.",
		wiki: osrsWiki("Gargoyle"),
		still: "/locations/osrscani.jpg",
		placeId: "osrscani"
	},
	{
		id: "osrs-nechryael",
		slug: "nechryael",
		name: "Nechryael",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "Slayer Tower, Catacombs",
		gate: "Slayer",
		hunt: "Death spawn. Protect Melee. Tower is single. Catacombs is the burst room. Leave the spawn on the floor and the next pull is messy.",
		wiki: osrsWiki("Nechryael"),
		still: "/locations/osrscani.jpg",
		placeId: "osrscani"
	},
	{
		id: "osrs-abyssal",
		slug: "abyssal-demon",
		name: "Abyssal demon",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "Slayer Tower, Catacombs",
		gate: "Slayer",
		hunt: "They melee and teleport a few tiles. Do not plant on the tile they just left. Protect Melee. Catacombs is the burst room. Cannon stays out of the Tower.",
		wiki: osrsWiki("Abyssal_demon"),
		still: "/locations/osrscani.jpg",
		placeId: "osrscani"
	},
	{
		id: "osrs-spectre",
		slug: "aberrant-spectre",
		name: "Aberrant spectre",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "Slayer Tower",
		gate: "Slayer — nose peg or slayer helm",
		hunt: "They drain without a face cover. Nose peg or helm. Protect Magic. Bare-faced is the wipe.",
		wiki: osrsWiki("Aberrant_spectre"),
		still: "/locations/osrscani.jpg",
		placeId: "osrscani"
	},
	{
		id: "osrs-jelly",
		slug: "jelly",
		name: "Jelly",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "Fremennik Slayer Dungeon",
		gate: "Slayer",
		hunt: "Magic hits. Protect Magic. The cave is a lane. Ordinary steel works.",
		wiki: osrsWiki("Jelly"),
		still: "/locations/osrsrel.jpg",
		placeId: "osrsrel"
	},
	{
		id: "osrs-turoth",
		slug: "turoth",
		name: "Turoth",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "Fremennik Slayer Dungeon",
		gate: "Slayer, leaf-bladed or broad",
		hunt: "Ordinary steel bounces. Leaf-bladed or broad. That is the gate, not a suggestion.",
		wiki: osrsWiki("Turoth"),
		still: "/locations/osrsrel.jpg",
		placeId: "osrsrel"
	},
	{
		id: "osrs-kurask",
		slug: "kurask",
		name: "Kurask",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "Fremennik Slayer Dungeon",
		gate: "Slayer, leaf-bladed or broad",
		hunt: "Same rule as Turoth. Protect Melee. Leave the whip home if it is not leaf-bladed.",
		wiki: osrsWiki("Kurask"),
		still: "/locations/osrsrel.jpg",
		placeId: "osrsrel"
	},
	{
		id: "osrs-cockatrice",
		slug: "cockatrice",
		name: "Cockatrice",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "Fremennik Slayer Dungeon",
		gate: "Slayer — mirror shield",
		hunt: "They cut stats without a mirror shield. The shield is the prayer. Melee after that.",
		wiki: osrsWiki("Cockatrice"),
		still: "/locations/osrsrel.jpg",
		placeId: "osrsrel"
	},
	{
		id: "osrs-basilisk",
		slug: "basilisk",
		name: "Basilisk",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "Fremennik Slayer Dungeon",
		gate: "Slayer — mirror shield",
		hunt: "Same shield as Cockatrice. Melee. Knights are a later room on the wiki — confirm the assignment.",
		wiki: osrsWiki("Basilisk"),
		still: "/locations/osrsrel.jpg",
		placeId: "osrsrel"
	},
	{
		id: "osrs-pyrefiend",
		slug: "pyrefiend",
		name: "Pyrefiend",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "Fremennik Slayer Dungeon",
		gate: "Slayer",
		hunt: "Magic. Protect Magic. The cave is a lane.",
		wiki: osrsWiki("Pyrefiend"),
		still: "/locations/osrsrel.jpg",
		placeId: "osrsrel"
	},
	{
		id: "osrs-cavecrawler",
		slug: "cave-crawler",
		name: "Cave crawler",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "Fremennik Slayer Dungeon",
		gate: "Slayer",
		hunt: "Poison. Antipoison before the first hit. The wipe is a stack you did not sip.",
		wiki: osrsWiki("Cave_crawler"),
		still: "/locations/osrsrel.jpg",
		placeId: "osrsrel"
	},
	{
		id: "osrs-dagannoth",
		slug: "dagannoth",
		name: "Dagannoth",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "Lighthouse, Waterbirth",
		hunt: "Melee and ranged packs. Lighthouse is the task. Kings stay on Bosses. Leave the rex trip off this sheet.",
		wiki: osrsWiki("Dagannoth"),
		still: "/locations/osrsrel.jpg",
		placeId: "osrsrel"
	},
	{
		id: "osrs-dustdevil",
		slug: "dust-devil",
		name: "Dust devil",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "Smoke Dungeon, Catacombs",
		gate: "Slayer — face mask",
		hunt: "Face mask or helm. No mask, they drain. Catacombs is the burst room. Smoke Dungeon is hot. Confirm the tile on the wiki.",
		wiki: osrsWiki("Dust_devil"),
		still: "/locations/osrsalk.jpg",
		placeId: "osrsalk"
	},
	{
		id: "osrs-smokedevil",
		slug: "smoke-devil",
		name: "Smoke devil",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "Smoke Devil Dungeon",
		gate: "Slayer — face mask",
		hunt: "Face mask. The Thermonuclear fight is on Bosses. These are the task. Do not treat the cave as that room.",
		wiki: osrsWiki("Smoke_devil"),
		still: "/locations/osrsalk.jpg",
		placeId: "osrsalk"
	},
	{
		id: "osrs-darkbeast",
		slug: "dark-beast",
		name: "Dark beast",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "Mourner Tunnels",
		gate: "Slayer",
		hunt: "Heavy melee and a magic slap. Protect Melee. Mourner tunnels after the west plague work. Food is a missed pray, not a rotation.",
		wiki: osrsWiki("Dark_beast"),
		still: "/locations/osrsprif.jpg",
		placeId: "osrsprif"
	},
	{
		id: "osrs-ankou",
		slug: "ankou",
		name: "Ankou",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "Stronghold of Security, Catacombs",
		hunt: "Melee. Stronghold is single. Catacombs is the burst room. Leave a raid title home.",
		wiki: osrsWiki("Ankou"),
		still: "/stills/osrs/osrs-varrock-a.jpg",
		placeId: "osrsvarrock"
	},
	{
		id: "osrs-lizardman",
		slug: "lizardman",
		name: "Lizardman",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "Kebos, Shayzien",
		hunt: "Ranged packs on the Kebos hill. Shamans that sit on Bosses stay there. This sheet is the fodder.",
		wiki: osrsWiki("Lizardman"),
		still: "/locations/osrstav.jpg",
		placeId: "osrstav"
	},
	{
		id: "osrs-wyrm",
		slug: "wyrm",
		name: "Wyrm",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "Karuulm Slayer Dungeon",
		gate: "Slayer",
		hunt: "Boots for the floor. Task in the mountain. Not Alchemical Hydra. Leave that room on Bosses.",
		wiki: osrsWiki("Wyrm"),
		still: ""
	},
	{
		id: "osrs-drake",
		slug: "drake",
		name: "Drake",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "Karuulm Slayer Dungeon",
		gate: "Slayer",
		hunt: "Heavier wyrm-kin. Boots for the floor. Protect as the live page says. Confirm the style on the wiki.",
		wiki: osrsWiki("Drake"),
		still: ""
	},
	{
		id: "osrs-hydra",
		slug: "hydra",
		name: "Hydra",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "Karuulm Slayer Dungeon",
		gate: "Slayer",
		hunt: "The task hydras. Boots for the floor. Alchemical Hydra is on Bosses. Do not mix the two rooms.",
		wiki: osrsWiki("Hydra"),
		still: ""
	},
	{
		id: "osrs-deviantspectre",
		slug: "deviant-spectre",
		name: "Deviant spectre",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "Catacombs of Kourend",
		gate: "Slayer — nose peg or helm",
		hunt: "Catacombs variant. Nose peg or helm. Protect Magic. Burst if the room is multi. Bare-faced is the wipe.",
		wiki: osrsWiki("Deviant_spectre"),
		still: ""
	},
	{
		id: "osrs-firegiant",
		slug: "fire-giant",
		name: "Fire giant",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "Waterfall dungeon, Catacombs",
		hunt: "Melee. Waterfall is the old room. Catacombs is multi. Confirm cannon rules on the wiki.",
		wiki: osrsWiki("Fire_giant"),
		still: "",
		placeId: "osrstav"
	},
	{
		id: "osrs-icegiant",
		slug: "ice-giant",
		name: "Ice giant",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "Asgarnian Ice Dungeon, Wilderness",
		hunt: "Crush. Protect Melee if you idle. Wilderness is a risk trip. Protect item.",
		wiki: osrsWiki("Ice_giant"),
		still: ""
	},
	{
		id: "osrs-mossgiant",
		slug: "moss-giant",
		name: "Moss giant",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "Varrock sewers, Crandor",
		hunt: "Low crush. Multi in some rooms. Learn the click, then leave.",
		wiki: osrsWiki("Moss_giant"),
		still: "",
		placeId: "osrsvarrock"
	},
	{
		id: "osrs-troll",
		slug: "troll",
		name: "Troll",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "Troll Stronghold",
		hunt: "Melee on the mountain. Ice trolls are a variant — confirm the assignment. Death Plateau is the road, not the wipe.",
		wiki: osrsWiki("Troll"),
		still: "",
		placeId: "osrstav"
	},
	{
		id: "osrs-suqah",
		slug: "suqah",
		name: "Suqah",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "Lunar Isle",
		hunt: "Melee and mage. The isle is the room. Lunar Diplomacy is the door. Confirm pray on the wiki.",
		wiki: osrsWiki("Suqah"),
		still: ""
	},
	{
		id: "osrs-waterfiend",
		slug: "waterfiend",
		name: "Waterfiend",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "Ancient Cavern, Kraken Cove",
		hunt: "Magic. Protect Magic. Crush helps. Ancient Cavern is the usual room. Kraken itself is on Bosses.",
		wiki: osrsWiki("Waterfiend"),
		still: ""
	},
	{
		id: "osrs-skeletalwyvern",
		slug: "skeletal-wyvern",
		name: "Skeletal wyvern",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "Asgarnian Ice Dungeon",
		gate: "Slayer — elemental or mind shield",
		hunt: "Icy breath. Elemental or mind shield. Protect Missiles. Ancient wyverns are a separate file on the wiki if the task names them.",
		wiki: osrsWiki("Skeletal_Wyvern"),
		still: ""
	},
	{
		id: "osrs-spiritualwarrior",
		slug: "spiritual-warrior",
		name: "Spiritual warrior",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "God Wars Dungeon",
		gate: "Slayer",
		hunt: "GWD task, not a commander. Protect Melee. Kill count is the door. Commanders sit on Bosses.",
		wiki: osrsWiki("Spiritual_warrior"),
		still: ""
	},
	{
		id: "osrs-spiritualranger",
		slug: "spiritual-ranger",
		name: "Spiritual ranger",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "God Wars Dungeon",
		gate: "Slayer",
		hunt: "Protect Missiles. Not Kree'arra. Kill count is the door.",
		wiki: osrsWiki("Spiritual_ranger"),
		still: ""
	},
	{
		id: "osrs-spiritualmage",
		slug: "spiritual-mage",
		name: "Spiritual mage",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "God Wars Dungeon",
		gate: "Slayer",
		hunt: "Protect Magic. Not a commander. Kill count is the door.",
		wiki: osrsWiki("Spiritual_mage"),
		still: ""
	},
	{
		id: "osrs-fossilwyvern",
		slug: "fossil-island-wyvern",
		name: "Fossil Island wyvern",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "Wyvern Cave",
		gate: "Slayer",
		hunt: "Spitting, taloned, long-tailed. Shield as the live page says. Ancient wyvern if treated as a boss stays off this list.",
		wiki: osrsWiki("Fossil_Island_wyvern"),
		still: ""
	},
	{
		id: "osrs-araxyte",
		slug: "araxyte",
		name: "Araxyte",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "Morytania",
		gate: "Slayer",
		hunt: "The task spiders. Araxxor stays on Bosses. Do not mix the nest with that room.",
		wiki: osrsWiki("Araxyte"),
		still: "",
		placeId: "osrscani"
	},
	{
		id: "osrs-warpedtb",
		slug: "warped-terrobird",
		name: "Warped terrorbird",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "Poison Waste dungeon",
		gate: "Slayer",
		hunt: "Poison Waste after the west plague work. The live page owns the room. Confirm the style before you camp.",
		wiki: osrsWiki("Warped_terrobird"),
		still: ""
	},
	{
		id: "osrs-warpedto",
		slug: "warped-tortoise",
		name: "Warped tortoise",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "Poison Waste dungeon",
		gate: "Slayer",
		hunt: "Same dungeon as the birds. Confirm the assignment. Leave a raid title home.",
		wiki: osrsWiki("Warped_tortoise"),
		still: ""
	},
	{
		id: "osrs-cavehorror",
		slug: "cave-horror",
		name: "Cave horror",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "Mos Le'Harmless cave",
		gate: "Slayer — witchwood icon",
		hunt: "Witchwood icon. No icon, they drain. Protect Melee. The cave is the task. Confirm the door on the wiki.",
		wiki: osrsWiki("Cave_horror"),
		still: ""
	},
	{
		id: "osrs-greendragon",
		slug: "green-dragon",
		name: "Green dragon",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "Wilderness",
		hunt: "Wilderness trip. Protect item. Antifire. Bones and hides. The ditch is the grammar.",
		wiki: osrsWiki("Green_dragon"),
		still: ""
	},
	{
		id: "osrs-bluedragon",
		slug: "blue-dragon",
		name: "Blue dragon",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "Taverley dungeon, Myths' Guild",
		hunt: "Antifire. Protect Magic if you idle. Taverley is the old room. Baby blues are a different assignment.",
		wiki: osrsWiki("Blue_dragon"),
		still: "",
		placeId: "osrstav"
	},
	{
		id: "osrs-blackdragon",
		slug: "black-dragon",
		name: "Black dragon",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "Taverley dungeon, Myths' Guild",
		hunt: "Heavier dragon. Antifire. KBD stays on Bosses. This sheet is the task.",
		wiki: osrsWiki("Black_dragon"),
		still: "",
		placeId: "osrstav"
	},
	{
		id: "osrs-reddragon",
		slug: "red-dragon",
		name: "Red dragon",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "Brimhaven dungeon, Myths' Guild",
		hunt: "Antifire. Protect Magic if you idle. Brimhaven is the old room. The isle is a trip. KBD stays on Bosses.",
		wiki: osrsWiki("Red_dragon"),
		still: ""
	},
	{
		id: "osrs-cavekraken",
		slug: "cave-kraken",
		name: "Cave kraken",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "Kraken Cove",
		gate: "Slayer",
		hunt: "The task tentacles. The boss Kraken is on Bosses. Do not mix the two rooms.",
		wiki: osrsWiki("Cave_kraken"),
		still: ""
	},
	{
		id: "rs3-goblin",
		slug: "goblin",
		name: "Goblin",
		edition: "RS3",
		kind: "monster",
		where: "Goblin Village",
		hunt: "Yard melee on the RuneScape client. Learn the click. Then leave.",
		wiki: rs3Wiki("Goblin"),
		still: "/locations/goblin.jpg",
		placeId: "goblin"
	},
	{
		id: "rs3-cow",
		slug: "cow",
		name: "Cow",
		edition: "RS3",
		kind: "monster",
		where: "Lumbridge field",
		hunt: "Melee in the rebuilt paddock. Hide is still the lesson. Leave the scythe home.",
		wiki: rs3Wiki("Cow"),
		still: "/stills/rs3/rs3-lumbridge-a.jpg",
		placeId: "lumbridge"
	},
	{
		id: "rs3-hillgiant",
		slug: "hill-giant",
		name: "Hill giant",
		edition: "RS3",
		kind: "monster",
		slayer: true,
		where: "Edgeville dungeon",
		hunt: "Crush in the later dungeon. Multi. Big bones. Not a commander.",
		wiki: rs3Wiki("Hill_giant"),
		still: "/locations/edgeville.jpg",
		placeId: "edgeville"
	},
	{
		id: "rs3-lesserdemon",
		slug: "lesser-demon",
		name: "Lesser demon",
		edition: "RS3",
		kind: "monster",
		slayer: true,
		where: "Taverley dungeon",
		hunt: "Magic and melee. Play the bar. Taverley is a lane.",
		wiki: rs3Wiki("Lesser_demon"),
		still: "/locations/taverley.jpg",
		placeId: "taverley"
	},
	{
		id: "rs3-greaterdemon",
		slug: "greater-demon",
		name: "Greater demon",
		edition: "RS3",
		kind: "monster",
		slayer: true,
		where: "Taverley dungeon",
		hunt: "Heavier demon. Protect as the RuneScape page says. Ability lines live on the wiki.",
		wiki: rs3Wiki("Greater_demon"),
		still: "/locations/taverley.jpg",
		placeId: "taverley"
	},
	{
		id: "rs3-hellhound",
		slug: "hellhound",
		name: "Hellhound",
		edition: "RS3",
		kind: "monster",
		slayer: true,
		where: "Taverley dungeon",
		hunt: "Fast melee. Protect Melee. Not a GWD commander. Cerberus-class rooms stay on Bosses.",
		wiki: rs3Wiki("Hellhound"),
		still: "/locations/taverley.jpg",
		placeId: "taverley"
	},
	{
		id: "rs3-abyssal",
		slug: "abyssal-demon",
		name: "Abyssal demon",
		edition: "RS3",
		kind: "monster",
		slayer: true,
		where: "Slayer Tower, Abyss",
		gate: "Slayer",
		hunt: "They melee and teleport. Protect Melee. Play your bar. Weakness is slashing as a type. Do not paste an Old School barrage paragraph here.",
		wiki: rs3Wiki("Abyssal_demon"),
		still: "/locations/canifis.jpg",
		placeId: "canifis"
	},
	{
		id: "rs3-gargoyle",
		slug: "gargoyle",
		name: "Gargoyle",
		edition: "RS3",
		kind: "monster",
		slayer: true,
		where: "Slayer Tower",
		gate: "Slayer",
		hunt: "Stone melee. Finish them as the RuneScape page says. They do not drop until that finish. That is the wipe.",
		wiki: rs3Wiki("Gargoyle"),
		still: "/locations/canifis.jpg",
		placeId: "canifis"
	},
	{
		id: "rs3-spectre",
		slug: "aberrant-spectre",
		name: "Aberrant spectre",
		edition: "RS3",
		kind: "monster",
		slayer: true,
		where: "Slayer Tower",
		gate: "Slayer — nose peg or equivalent",
		hunt: "They drain without a cover. Nose peg or the live equivalent. Protect Magic. Bare-faced is the wipe.",
		wiki: rs3Wiki("Aberrant_spectre"),
		still: "/locations/canifis.jpg",
		placeId: "canifis"
	},
	{
		id: "rs3-nechryael",
		slug: "nechryael",
		name: "Nechryael",
		edition: "RS3",
		kind: "monster",
		slayer: true,
		where: "Slayer Tower",
		gate: "Slayer",
		hunt: "Death spawn. Protect Melee. Play the bar. Leave the spawn on the floor and the next pull is messy.",
		wiki: rs3Wiki("Nechryael"),
		still: "/locations/canifis.jpg",
		placeId: "canifis"
	},
	{
		id: "rs3-bloodveld",
		slug: "bloodveld",
		name: "Bloodveld",
		edition: "RS3",
		kind: "monster",
		slayer: true,
		where: "Slayer Tower",
		gate: "Slayer",
		hunt: "Melee task. Mutated variants on the wiki. Confirm the room before you camp.",
		wiki: rs3Wiki("Bloodveld"),
		still: "/locations/canifis.jpg",
		placeId: "canifis"
	},
	{
		id: "rs3-banshee",
		slug: "banshee",
		name: "Banshee",
		edition: "RS3",
		kind: "monster",
		slayer: true,
		where: "Slayer Tower",
		gate: "Slayer — earmuffs",
		hunt: "They scream without cover. Earmuffs. Protect Magic. The wipe is a bare ear.",
		wiki: rs3Wiki("Banshee"),
		still: "/locations/canifis.jpg",
		placeId: "canifis"
	},
	{
		id: "rs3-darkbeast",
		slug: "dark-beast",
		name: "Dark beast",
		edition: "RS3",
		kind: "monster",
		slayer: true,
		where: "Temple of Light tunnels",
		gate: "Slayer",
		hunt: "Heavy hits. Prayer and food. Temple of Light tunnels after the west work. Confirm the live page.",
		wiki: rs3Wiki("Dark_beast"),
		still: "/locations/prifddinas.jpg",
		placeId: "prifddinas"
	},
	{
		id: "rs3-kurask",
		slug: "kurask",
		name: "Kurask",
		edition: "RS3",
		kind: "monster",
		slayer: true,
		where: "Pollnivneach Slayer Dungeon",
		gate: "Slayer, leaf-bladed or broad",
		hunt: "Ordinary weapons bounce. Leaf-bladed or broad. That is the gate.",
		wiki: rs3Wiki("Kurask"),
		still: "/locations/sophanem.jpg",
		placeId: "sophanem"
	},
	{
		id: "rs3-turoth",
		slug: "turoth",
		name: "Turoth",
		edition: "RS3",
		kind: "monster",
		slayer: true,
		where: "Pollnivneach Slayer Dungeon",
		gate: "Slayer",
		hunt: "Leaf-bladed or broad. Same gate as Kurask. Confirm the dungeon on the wiki.",
		wiki: rs3Wiki("Turoth"),
		still: ""
	},
	{
		id: "rs3-jelly",
		slug: "jelly",
		name: "Jelly",
		edition: "RS3",
		kind: "monster",
		slayer: true,
		where: "Fremennik slayer dungeon",
		gate: "Slayer",
		hunt: "Protect Magic. Play the bar. The cave is a lane.",
		wiki: rs3Wiki("Jelly"),
		still: ""
	},
	{
		id: "rs3-firegiant",
		slug: "fire-giant",
		name: "Fire giant",
		edition: "RS3",
		kind: "monster",
		slayer: true,
		where: "Waterfall dungeon, Brimhaven",
		hunt: "Melee task. Waterfall or Brimhaven. Confirm the room. Leave a raid title home.",
		wiki: rs3Wiki("Fire_giant"),
		still: ""
	},
	{
		id: "rs3-waterfiend",
		slug: "waterfiend",
		name: "Waterfiend",
		edition: "RS3",
		kind: "monster",
		slayer: true,
		where: "Ancient Cavern",
		hunt: "Magic. Protect Magic. Crush helps. Ancient Cavern is the room.",
		wiki: rs3Wiki("Waterfiend"),
		still: ""
	},
	{
		id: "rs3-edimmu",
		slug: "edimmu",
		name: "Edimmu",
		edition: "RS3",
		kind: "monster",
		slayer: true,
		where: "Prifddinas slayer dungeon",
		gate: "Slayer, Prifddinas",
		hunt: "RuneScape-only. Crystal dungeon after the city stands. The live page owns the hour. Do not invent an Old School room.",
		wiki: rs3Wiki("Edimmu"),
		still: "/locations/prifddinas.jpg",
		placeId: "prifddinas"
	},
	{
		id: "rs3-ripper",
		slug: "ripper-demon",
		name: "Ripper Demon",
		edition: "RS3",
		kind: "monster",
		slayer: true,
		where: "Ripper Demon cave",
		gate: "Slayer",
		hunt: "RuneScape-only. Fast melee. Ability lines on the wiki. Task-only door on some versions. Confirm before you camp.",
		wiki: rs3Wiki("Ripper_Demon"),
		still: "/locations/edgeville.jpg",
		placeId: "edgeville"
	},
	{
		id: "rs3-aquanite",
		slug: "aquanite",
		name: "Aquanite",
		edition: "RS3",
		kind: "monster",
		slayer: true,
		where: "Fremennik slayer dungeon",
		gate: "Slayer",
		hunt: "RuneScape slayer. Protect as the live page says. Leave an Old School barrage paragraph home.",
		wiki: rs3Wiki("Aquanite"),
		still: ""
	},
	{
		id: "rs3-ganodermic",
		slug: "ganodermic-beast",
		name: "Ganodermic beast",
		edition: "RS3",
		kind: "monster",
		slayer: true,
		where: "Polypore Dungeon",
		gate: "Slayer",
		hunt: "Magic task in the polypore. Not a raid. Confirm weakness on the wiki.",
		wiki: rs3Wiki("Ganodermic_beast"),
		still: ""
	},
	{
		id: "rs3-airut",
		slug: "airut",
		name: "Airut",
		edition: "RS3",
		kind: "monster",
		slayer: true,
		where: "Airut cave",
		gate: "Slayer",
		hunt: "RuneScape-only. Heavy melee. Play the bar. Confirm the cave on the wiki.",
		wiki: rs3Wiki("Airut"),
		still: ""
	},
	{
		id: "rs3-camel",
		slug: "camel-warrior",
		name: "Camel Warrior",
		edition: "RS3",
		kind: "monster",
		slayer: true,
		where: "Sophanem slayer dungeon",
		gate: "Slayer",
		hunt: "RuneScape-only. The live page owns the clones. Confirm the mechanic before the first pull.",
		wiki: rs3Wiki("Camel_Warrior"),
		still: "",
		placeId: "sophanem"
	},
	{
		id: "rs3-automaton",
		slug: "automaton",
		name: "Automaton",
		edition: "RS3",
		kind: "monster",
		slayer: true,
		where: "Guthixian temple",
		gate: "Slayer",
		hunt: "Melee, ranged, or mage body. Not a world boss. The World Wakes temple is the room. Confirm the style on the wiki.",
		wiki: rs3Wiki("Automaton"),
		still: "",
		placeId: "taverley"
	},
	{
		id: "rs3-souldevourer",
		slug: "soul-devourer",
		name: "Soul devourer",
		edition: "RS3",
		kind: "monster",
		slayer: true,
		where: "Sophanem slayer dungeon",
		gate: "Slayer",
		hunt: "Several faces in the Sophanem dungeon. Amascut’s raid stays on Bosses. Do not mix the two rooms.",
		wiki: rs3Wiki("Soul_devourer"),
		still: "",
		placeId: "sophanem"
	},
	{
		id: "rs3-livingwyvern",
		slug: "living-wyvern",
		name: "Living wyvern",
		edition: "RS3",
		kind: "monster",
		slayer: true,
		where: "Wyvern cave",
		gate: "Slayer",
		hunt: "Icy breath. Shield as the live page says. Confirm the cave. Leave an Old School Fossil Island paragraph home.",
		wiki: rs3Wiki("Living_wyvern"),
		still: ""
	}
];
var NOTES = {
	"osrs-abyssal": {
		masters: "Chaeldar, Konar, Nieve/Steve, Duradel.",
		style: "Slayer Tower floor or Catacombs multi. They melee and teleport a few tiles — do not plant on the tile they just left. Protect Melee. Tower is single; Catacombs is the burst room. Cannon stays out of the Tower. Slayer helm on task.",
		watch: "They teleport a few tiles.",
		slayerWiki: "https://oldschool.runescape.wiki/w/Abyssal_demon#Slayer_task"
	},
	"rs3-abyssal": {
		masters: "RuneScape slayer masters. Laniakea’s list on the live page.",
		style: "RuneScape slayer dungeon. They melee and teleport. Protect Melee. Play the bar. Weakness is slashing as a type. No Old School barrage paragraph belongs here.",
		watch: "They teleport."
	},
	"osrs-gargoyle": {
		masters: "Chaeldar, Konar, Nieve/Steve, Duradel.",
		style: "Protect Melee. They do not die until a rock hammer or the slayer helm perk finishes them. Tower is single.",
		watch: "They do not die until you finish them."
	},
	"osrs-spectre": {
		masters: "Chaeldar, Konar, Nieve/Steve, Duradel.",
		style: "Protect Magic. Nose peg or slayer helm. Burst in Catacombs if the assignment allows it.",
		watch: "Bare-faced they drain you."
	},
	"osrs-hellhound": {
		masters: "Chaeldar, Konar, Nieve/Steve, Duradel.",
		style: "Protect Melee. Taverley can take a cannon. Wilderness is a risk trip. Protect item.",
		watch: "Cerberus is on Bosses."
	},
	"osrs-dustdevil": {
		masters: "Chaeldar, Konar, Nieve/Steve, Duradel.",
		style: "Face mask or helm. Burst in Catacombs. Smoke Dungeon is hot.",
		watch: "No mask, they drain."
	},
	"rs3-ripper": {
		masters: "High RuneScape slayer masters. Live page lists who.",
		style: "Fast melee. Ability lines on the wiki. Task-only door on some versions.",
		watch: "Task-only door on some versions."
	},
	"osrs-banshee": {
		masters: "Turael through Chaeldar. Live page lists who.",
		style: "Earmuffs or slayer helm. Protect Magic.",
		watch: "They scream without cover."
	},
	"osrs-kurask": {
		masters: "Chaeldar, Konar, Nieve/Steve, Duradel.",
		style: "Leaf-bladed or broad. Ordinary steel bounces. Protect Melee.",
		watch: "Ordinary steel bounces."
	},
	"osrs-skeletalwyvern": {
		masters: "Chaeldar, Konar, Nieve/Steve, Duradel.",
		style: "Elemental or mind shield. Protect Missiles. Icy breath is the wipe.",
		watch: "Icy breath without a shield."
	}
};
function monsterTaskLine(row) {
	if (!row.slayer) return "Not a slayer assignment. Learn the room, then leave.";
	const note = NOTES[row.id];
	if (note?.masters) return note.masters;
	return row.edition === "OSRS" ? "Assigned by Old School slayer masters (Chaeldar through Duradel, and Konar). The live page lists who." : "Assigned by RuneScape slayer masters. The live page lists who.";
}
function monsterHuntLine(row) {
	const note = NOTES[row.id];
	if (note?.style) return `${note.style} ${row.hunt}`.trim();
	return row.hunt;
}
function monsterKillLine(row) {
	const gameWiki = row.edition === "OSRS" ? "Old School wiki" : "RuneScape wiki";
	return [
		`A kill ends when ${row.name.toLowerCase()} drops. Walk the room if you pulled extras. Reset at the door when the task is done.`,
		"Wrong prayer or the wrong tile is the wipe. That is the whole file.",
		row.edition === "OSRS" ? "Do not treat a slayer floor as a raid invocation." : "Do not treat this as an enrage boss. Those sheets live under Bosses.",
		`Counts, drops, and the living method: the ${gameWiki} for this hour.`
	].join(" ");
}
function monsterWatchLine(row) {
	return NOTES[row.id]?.watch ?? row.watch ?? "Task-only doors, face covers, and cannon-blocks are on the live page. Confirm on the wiki.";
}
function monsterSlayerLink(row) {
	return NOTES[row.id]?.slayerWiki;
}
function monsterById(id) {
	return MONSTERS.find((row) => row.id === id);
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/page-title-20nP_CP-.js
var APP = "RuneScape Banner Studio";
function pageTitle(page) {
	return page ? `${page} · ${APP}` : APP;
}
function pageMeta(page, description) {
	return { meta: [{ title: pageTitle(page) }, {
		name: "description",
		content: description
	}] };
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-D8oIjQ4W.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function EggToast() {
	const [line, setLine] = (0, import_react.useState)(null);
	const timer = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		const onToast = (event) => {
			const message = String(event.detail ?? "").trim();
			if (!message) return;
			window.clearTimeout(timer.current);
			setLine(message);
			timer.current = window.setTimeout(() => setLine(null), 4e3);
		};
		window.addEventListener(EGG_EVENT, onToast);
		return () => {
			window.removeEventListener(EGG_EVENT, onToast);
			window.clearTimeout(timer.current);
		};
	}, []);
	if (!line) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "status",
		className: `fixed bottom-4 left-1/2 z-40 max-w-sm -translate-x-1/2 border border-line bg-raised px-3 py-2 text-center text-sm text-parchment ${reducedMotion() ? "" : ""}`,
		children: line
	});
}
function useDeskEggs(name) {
	const nameRef = (0, import_react.useRef)(name);
	nameRef.current = name;
	const lastOwner = (0, import_react.useRef)("");
	(0, import_react.useEffect)(() => {
		if (isOwnerName(name) && lastOwner.current !== name.trim().toLowerCase()) {
			lastOwner.current = name.trim().toLowerCase();
			ownerToast();
		}
		if (!isOwnerName(name)) lastOwner.current = "";
	}, [name]);
	(0, import_react.useEffect)(() => {
		if (window.location.pathname.startsWith("/legal")) return;
		let buf = "";
		let idle = 0;
		const onKey = (e) => {
			if (fieldFocused()) {
				buf = "";
				return;
			}
			if (e.key.length !== 1 || e.metaKey || e.ctrlKey) return;
			buf += e.key.toLowerCase();
			window.clearTimeout(idle);
			idle = window.setTimeout(() => {
				buf = "";
			}, 1200);
			if (buf.includes("owner")) {
				buf = "";
				ownerToast();
			} else if (buf.includes("cabbage")) {
				buf = "";
				eggToast("The cabbage looks tasty.");
			} else if (buf.includes("www")) {
				buf = "";
				eggToast("The World Wide Web is not a plane.");
			} else if (buf.includes("abyssal")) {
				buf = "";
				eggToast("A dark power stirs.");
			} else if (buf.includes("karamja")) {
				buf = "";
				eggToast("You feel the need for a ticket.");
			} else if (buf.includes("guthix")) {
				buf = "";
				eggToast("Balance is not a banner size.");
			} else if (buf.includes("maxed")) {
				buf = "";
				eggToast("They would not put that on Legal.");
			} else if (buf.includes("split")) {
				buf = "";
				eggToast("The other person left the raid. This one stayed.");
			}
		};
		window.addEventListener("keydown", onKey);
		return () => {
			window.removeEventListener("keydown", onKey);
			window.clearTimeout(idle);
		};
	}, []);
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "page-h1",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	(0, import_react.useEffect)(() => {
		if (typeof document === "undefined") return;
		if (window.parent === window) return;
		const ask = () => {
			const anyDoc = document;
			if (typeof anyDoc.requestStorageAccess !== "function") return;
			(async () => {
				try {
					if (!(await anyDoc.hasStorageAccess?.() ?? false)) await anyDoc.requestStorageAccess();
				} catch {}
			})();
		};
		window.addEventListener("pointerup", ask, {
			once: true,
			passive: true
		});
		return () => window.removeEventListener("pointerup", ask);
	}, []);
	return null;
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "border-t border-line px-3 py-4 text-[11px] leading-relaxed text-faint md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Independent studio · not a Jagex product" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Plate type: RS Chat Bold (fan replica). Stills are identification." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "mt-2 flex flex-wrap gap-x-3 gap-y-1 text-parchment",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/brief",
						children: "Brief"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/legal",
						children: "Legal"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "mailto:russell.christefer@gmail.com",
						children: "russell.christefer@gmail.com"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "https://legal.jagex.com/docs/policies/fan-content-policy",
						target: "_blank",
						rel: "noopener noreferrer",
						children: "Fan Content Policy"
					})
				]
			})
		]
	});
}
/** Quiet in-world eggs. Not mounted as a joke on Legal — eggToast no-ops there. */
function WorldEggs() {
	useDeskEggs("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EggToast, {});
}
var styles_default = "/assets/styles-X8-j28Aw.css";
var APP_NAME = "RuneScape Banner Studio";
function publicAppHost() {
	const host = String("").trim().split(",")[0].trim().split(":")[0].toLowerCase();
	if (!host.endsWith(".grok.me")) return "";
	if (host.includes("vercel")) return "";
	return host;
}
var Route$30 = createRootRoute({
	head: () => {
		const host = publicAppHost();
		const origin = host ? `https://${host}` : "";
		const xBanner = origin ? `${origin}/x-banner.jpg` : "";
		const ogImage = origin ? `${origin}/og.jpg` : "";
		const desc = "RuneScape Banner Studio. Independent fan desk for Old School RuneScape and RuneScape banners. Not a Jagex product.";
		return {
			meta: [
				{ charSet: "utf-8" },
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1, viewport-fit=cover"
				},
				{ title: APP_NAME },
				{
					name: "description",
					content: desc
				},
				{
					name: "theme-color",
					content: "#0c0a08"
				},
				{
					name: "color-scheme",
					content: "dark"
				},
				{
					name: "robots",
					content: "index,follow"
				},
				{
					name: "referrer",
					content: "strict-origin-when-cross-origin"
				},
				{
					name: "format-detection",
					content: "telephone=no"
				},
				{
					name: "application-name",
					content: APP_NAME
				},
				{
					name: "apple-mobile-web-app-title",
					content: APP_NAME
				},
				{
					property: "og:type",
					content: "website"
				},
				{
					property: "og:title",
					content: APP_NAME
				},
				{
					property: "og:description",
					content: desc
				},
				{
					property: "og:locale",
					content: "en_GB"
				},
				...ogImage ? [
					{
						property: "og:image",
						content: ogImage
					},
					{
						property: "og:image:width",
						content: "1200"
					},
					{
						property: "og:image:height",
						content: "630"
					},
					{
						name: "twitter:card",
						content: "summary_large_image"
					},
					{
						name: "twitter:title",
						content: APP_NAME
					},
					{
						name: "twitter:description",
						content: desc
					},
					{
						name: "twitter:image",
						content: ogImage
					}
				] : [],
				...xBanner ? [{
					property: "x:game:image",
					content: xBanner
				}] : []
			],
			links: [
				{
					rel: "icon",
					type: "image/svg+xml",
					href: "/favicon.svg"
				},
				{
					rel: "stylesheet",
					href: styles_default
				},
				{
					rel: "preload",
					href: "/fonts/rs-chat-bold.ttf",
					as: "font",
					type: "font/ttf",
					crossOrigin: "anonymous"
				},
				{
					rel: "manifest",
					href: "/__grok/manifest.webmanifest"
				},
				{
					rel: "apple-touch-icon",
					href: "/__grok/icon-180.png"
				},
				{
					rel: "dns-prefetch",
					href: "https://secure.runescape.com"
				},
				...origin ? [{
					rel: "canonical",
					href: `${origin}/`
				}] : []
			]
		};
	},
	errorComponent: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg px-5 py-16 text-center text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-sm text-parchment",
			children: "This tile failed to load."
		})]
	}),
	notFoundComponent: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg px-5 py-16 text-center text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "page-h1 mt-4",
				children: "This tile is empty."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "text-parchment",
					children: "Banner Studio"
				})
			})
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorldEggs, {})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$26 = () => import("./routes-DOcWkmUi.mjs");
var Route$29 = createFileRoute("/")({
	head: () => ({ links: [{
		rel: "preconnect",
		href: "https://secure.runescape.com"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$26, "component")
});
var $$splitComponentImporter$25 = () => import("./brief-DXHbk13O.mjs");
var Route$28 = createFileRoute("/brief")({
	head: () => pageMeta("Brief", "What RuneScape Banner Studio is and is not. Independent fan desk. Not Jagex."),
	component: lazyRouteComponent($$splitComponentImporter$25, "component")
});
var $$splitComponentImporter$24 = () => import("./chronicle-CJIo9Hki.mjs");
var Route$27 = createFileRoute("/chronicle")({
	head: () => pageMeta("Chronicle", "A fan ledger of Old School RuneScape and RuneScape public memory. Two games. Not Jagex."),
	component: lazyRouteComponent($$splitComponentImporter$24, "component")
});
var $$splitComponentImporter$23 = () => import("./classic-DJJQeKCh.mjs");
var Route$26 = createFileRoute("/classic")({
	head: () => pageMeta("Classic", "RuneScape Classic archive gallery. Memory. Not a live world."),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("./donate-BvFJpaJL.mjs");
var Route$25 = createFileRoute("/donate")({ component: lazyRouteComponent($$splitComponentImporter$22, "component") });
var $$splitComponentImporter$21 = () => import("./edit-DDUS_1lj.mjs");
var Route$24 = createFileRoute("/edit")({
	head: () => pageMeta("Clips", "Local clip bench. Trim and save a file. This page does not go live."),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var $$splitComponentImporter$20 = () => import("./egg-BFGYoB2m.mjs");
var Route$23 = createFileRoute("/egg")({
	head: () => ({ meta: [{ title: pageTitle("Box") }] }),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./guthix-ledger-BX6GRWit.mjs");
var Route$22 = createFileRoute("/guthix-ledger")({ component: lazyRouteComponent($$splitComponentImporter$19, "component") });
var $$splitComponentImporter$18 = () => import("./history-DU2U0Yz2.mjs");
var Route$21 = createFileRoute("/history")({
	head: () => pageMeta("History", "A fan story of public RuneScape memory. Two games. Not a rank."),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var Route$20 = createFileRoute("/jagex")({ beforeLoad: () => {
	throw redirect({ to: "/jmods" });
} });
var $$splitComponentImporter$17 = () => import("./jmods-BQl9GUal.mjs");
var Route$19 = createFileRoute("/jmods")({
	head: () => ({ meta: [{ title: pageTitle("Jagex directory") }] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./knowledge-BzIAQ4gg.mjs");
var Route$18 = createFileRoute("/knowledge")({
	head: () => ({ meta: [{ title: pageTitle("Sites") }] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./legal-y-FKca86.mjs");
var Route$17 = createFileRoute("/legal")({
	head: () => pageMeta("Legal", "Independent fan studio. Fan Content Policy. Not endorsed by Jagex."),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var Route$16 = createFileRoute("/lumb")({ beforeLoad: () => {
	const edition = savedEdition();
	throw redirect({
		to: "/towns/$id",
		params: { id: edition === "RS3" ? "lumbridge" : "osrslumbridge" }
	});
} });
var $$splitComponentImporter$14 = () => import("./pvp-Dr_PWpQT.mjs");
var Route$15 = createFileRoute("/pvp")({
	head: () => pageMeta("PvP", "Old School. What each method is. Freeze then spec. Eat the incoming. Risk first. Wiki keeps the skull rule."),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./senntisten-C6xxMfru.mjs");
var Route$14 = createFileRoute("/senntisten")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./still-pLe8U5PO.mjs");
var Route$13 = createFileRoute("/still")({
	head: () => ({ meta: [{ title: pageTitle("Still") }] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./story-CjGTC5IT.mjs");
var Route$12 = createFileRoute("/story")({
	head: () => ({ meta: [{ title: pageTitle("What this is") }] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./stream-VxOpiTM7.mjs");
var Route$11 = createFileRoute("/stream")({
	head: () => pageMeta("Stream", "Go-live notes. Category is Old School RuneScape or RuneScape."),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./streamers-Dlozv3AO.mjs");
var Route$10 = createFileRoute("/streamers")({
	head: () => pageMeta("Streamers", "Independent Twitch directory for Old School RuneScape and RuneScape."),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var Route$9 = createFileRoute("/varrock")({ beforeLoad: () => {
	const edition = savedEdition();
	throw redirect({
		to: "/towns/$id",
		params: { id: edition === "RS3" ? "varrock" : "osrsvarrock" }
	});
} });
var $$splitComponentImporter$8 = () => import("./youtubers-Cribsj1E.mjs");
var Route$8 = createFileRoute("/youtubers")({
	head: () => pageMeta("Youtubers", "Hall of known RuneScape YouTube channels. Not complete. Not Jagex."),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./bosses.index-Ht8MoEJS.mjs");
var Route$7 = createFileRoute("/bosses/")({
	head: () => pageMeta("Bosses", "Boss arenas for Old School RuneScape and RuneScape. Wiki keeps the hour."),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./bosses._id-B-kGN0HG.mjs");
var Route$6 = createFileRoute("/bosses/$id")({
	head: ({ params }) => {
		return pageMeta(noteFor(params.id)?.title ?? "Boss", "Working PvM sheet. Wear, eat, spec, wipe. Wiki keeps the hour.");
	},
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./gods.index-BQBK6yCA.mjs");
var Route$5 = createFileRoute("/gods/")({
	head: () => pageMeta("Gods", "Gods of Old School RuneScape and RuneScape. Two canons."),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./gods._god-C3zCLDpG.mjs");
var Route$4 = createFileRoute("/gods/$god")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./monsters.index-C3ojwUrU.mjs");
var Route$3 = createFileRoute("/monsters/")({
	head: () => pageMeta("Bestiary", "Slayer and dungeon creatures. Bosses have their own page."),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./monsters._id-23KG6Uak.mjs");
var Route$2 = createFileRoute("/monsters/$id")({
	head: ({ params }) => pageMeta(monsterById(params.id)?.name ?? "Bestiary", "Hunt notes. The wiki keeps the hour."),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./towns.index-BDxtBH62.mjs");
var Route$1 = createFileRoute("/towns/")({
	head: () => pageMeta("Towns", "Towns in Old School RuneScape and RuneScape. Correct client stills."),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./towns._id-CmKW9Dk8.mjs");
var Route = createFileRoute("/towns/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$29.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$30
});
var BriefRoute = Route$28.update({
	id: "/brief",
	path: "/brief",
	getParentRoute: () => Route$30
});
var ChronicleRoute = Route$27.update({
	id: "/chronicle",
	path: "/chronicle",
	getParentRoute: () => Route$30
});
var ClassicRoute = Route$26.update({
	id: "/classic",
	path: "/classic",
	getParentRoute: () => Route$30
});
var DonateRoute = Route$25.update({
	id: "/donate",
	path: "/donate",
	getParentRoute: () => Route$30
});
var EditRoute = Route$24.update({
	id: "/edit",
	path: "/edit",
	getParentRoute: () => Route$30
});
var EggRoute = Route$23.update({
	id: "/egg",
	path: "/egg",
	getParentRoute: () => Route$30
});
var GuthixLedgerRoute = Route$22.update({
	id: "/guthix-ledger",
	path: "/guthix-ledger",
	getParentRoute: () => Route$30
});
var HistoryRoute = Route$21.update({
	id: "/history",
	path: "/history",
	getParentRoute: () => Route$30
});
var JagexRoute = Route$20.update({
	id: "/jagex",
	path: "/jagex",
	getParentRoute: () => Route$30
});
var JmodsRoute = Route$19.update({
	id: "/jmods",
	path: "/jmods",
	getParentRoute: () => Route$30
});
var KnowledgeRoute = Route$18.update({
	id: "/knowledge",
	path: "/knowledge",
	getParentRoute: () => Route$30
});
var LegalRoute = Route$17.update({
	id: "/legal",
	path: "/legal",
	getParentRoute: () => Route$30
});
var LumbRoute = Route$16.update({
	id: "/lumb",
	path: "/lumb",
	getParentRoute: () => Route$30
});
var PvpRoute = Route$15.update({
	id: "/pvp",
	path: "/pvp",
	getParentRoute: () => Route$30
});
var SenntistenRoute = Route$14.update({
	id: "/senntisten",
	path: "/senntisten",
	getParentRoute: () => Route$30
});
var StillRoute = Route$13.update({
	id: "/still",
	path: "/still",
	getParentRoute: () => Route$30
});
var StoryRoute = Route$12.update({
	id: "/story",
	path: "/story",
	getParentRoute: () => Route$30
});
var StreamRoute = Route$11.update({
	id: "/stream",
	path: "/stream",
	getParentRoute: () => Route$30
});
var StreamersRoute = Route$10.update({
	id: "/streamers",
	path: "/streamers",
	getParentRoute: () => Route$30
});
var VarrockRoute = Route$9.update({
	id: "/varrock",
	path: "/varrock",
	getParentRoute: () => Route$30
});
var YoutubersRoute = Route$8.update({
	id: "/youtubers",
	path: "/youtubers",
	getParentRoute: () => Route$30
});
var BossesIndexRoute = Route$7.update({
	id: "/bosses/",
	path: "/bosses/",
	getParentRoute: () => Route$30
});
var BossesIdRoute = Route$6.update({
	id: "/bosses/$id",
	path: "/bosses/$id",
	getParentRoute: () => Route$30
});
var GodsIndexRoute = Route$5.update({
	id: "/gods/",
	path: "/gods/",
	getParentRoute: () => Route$30
});
var GodsGodRoute = Route$4.update({
	id: "/gods/$god",
	path: "/gods/$god",
	getParentRoute: () => Route$30
});
var MonstersIndexRoute = Route$3.update({
	id: "/monsters/",
	path: "/monsters/",
	getParentRoute: () => Route$30
});
var MonstersIdRoute = Route$2.update({
	id: "/monsters/$id",
	path: "/monsters/$id",
	getParentRoute: () => Route$30
});
var TownsIndexRoute = Route$1.update({
	id: "/towns/",
	path: "/towns/",
	getParentRoute: () => Route$30
});
var rootRouteChildren = {
	IndexRoute,
	BriefRoute,
	ChronicleRoute,
	ClassicRoute,
	DonateRoute,
	EditRoute,
	EggRoute,
	GuthixLedgerRoute,
	HistoryRoute,
	JagexRoute,
	JmodsRoute,
	KnowledgeRoute,
	LegalRoute,
	LumbRoute,
	PvpRoute,
	SenntistenRoute,
	StillRoute,
	StoryRoute,
	StreamRoute,
	StreamersRoute,
	VarrockRoute,
	YoutubersRoute,
	BossesIdRoute,
	GodsGodRoute,
	MonstersIdRoute,
	TownsIdRoute: Route.update({
		id: "/towns/$id",
		path: "/towns/$id",
		getParentRoute: () => Route$30
	}),
	BossesIndexRoute,
	GodsIndexRoute,
	MonstersIndexRoute,
	TownsIndexRoute
};
var routeTree = Route$30._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent,
		scrollRestoration: true
	});
}
//#endregion
export { useVisibleNow as A, SiteHeader as C, sessionOnce as D, pad as E, untilUtcHour as O, BackLink as S, isOwnerName as T, sisterMonster as _, Route$6 as a, bossWipe as b, MONSTERS as c, monsterKillLine as d, monsterSlayerLink as f, monsterWatchLine as g, monsterTaskLine as h, Route$4 as i, untilUtcMidnight as k, monsterById as l, monsterStillSrc as m, Route as n, useDeskEggs as o, monsterStillLine as p, Route$2 as r, EggToast as s, router_exports as t, monsterHuntLine as u, BOSS_NOTES as v, eggToast as w, noteFor as x, bossWiki as y };
