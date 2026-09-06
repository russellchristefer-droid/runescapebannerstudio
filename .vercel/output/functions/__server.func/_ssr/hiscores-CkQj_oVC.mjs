import { i as __toESM } from "../_runtime.mjs";
import { V as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as sanitizeDisplayNameLive, t as hiscoresQuery } from "./rsText-CBarotbs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hiscores-CkQj_oVC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var OSRS_BASE = [
	"Overall",
	"Attack",
	"Defence",
	"Strength",
	"Hitpoints",
	"Ranged",
	"Prayer",
	"Magic",
	"Cooking",
	"Woodcutting",
	"Fletching",
	"Fishing",
	"Firemaking",
	"Crafting",
	"Smithing",
	"Mining",
	"Herblore",
	"Agility",
	"Thieving",
	"Slayer",
	"Farming",
	"Runecraft",
	"Hunter",
	"Construction"
];
var OSRS_SKILLS = [...OSRS_BASE, "Sailing"];
var RS3_SKILLS = [
	...OSRS_BASE.slice(0, 4),
	"Constitution",
	...OSRS_BASE.slice(5),
	"Summoning",
	"Dungeoneering",
	"Divination",
	"Invention",
	"Archaeology",
	"Necromancy"
];
var HISCORE_URLS = {
	osrsLite: (name) => `https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=${encodeURIComponent(name)}`,
	rs3Lite: (name) => `https://secure.runescape.com/m=hiscore/index_lite.ws?player=${encodeURIComponent(name)}`,
	osrsPage: (name) => `https://secure.runescape.com/m=hiscore_oldschool/hiscorepersonal?user1=${encodeURIComponent(name)}`,
	rs3Page: (name) => `https://secure.runescape.com/m=hiscore/hiscorepersonal?user1=${encodeURIComponent(name)}`,
	osrsWom: (name) => `https://wiseoldman.net/players/${encodeURIComponent(name)}`
};
function parseLite(text, skills) {
	return text.trim().split(/\n/).slice(0, skills.length).map((line, i) => {
		const [rank, level, xp] = line.split(",").map((n) => Number(n));
		return {
			skill: skills[i] ?? `Skill ${i}`,
			rank: Number.isFinite(rank) ? rank : -1,
			level: Number.isFinite(level) ? level : 0,
			xp: Number.isFinite(xp) ? xp : 0
		};
	}).filter((row) => row.level > 0 || row.xp > 0);
}
function parseWom(data, skills) {
	const snap = data.latestSnapshot?.data?.skills;
	if (!snap) return [];
	return skills.map((skill) => {
		const row = snap[skill.toLowerCase()];
		return {
			skill,
			rank: Number(row?.rank ?? -1),
			level: Number(row?.level ?? 0),
			xp: Number(row?.experience ?? 0)
		};
	}).filter((row) => row.level > 0 || row.xp > 0);
}
function looksLikeLite(text) {
	const line = text.trim().split(/\n/)[0] ?? "";
	return /^-?\d+,-?\d+,-?\d+/.test(line);
}
async function loadHiscores(name, edition, signal) {
	const clean = hiscoresQuery(name);
	if (!clean) return [];
	const skills = edition === "OSRS" ? OSRS_SKILLS : RS3_SKILLS;
	const local = `/api/hiscores?edition=${encodeURIComponent(edition)}&player=${encodeURIComponent(clean)}`;
	try {
		const res = await fetch(local, {
			cache: "no-store",
			signal: signal ?? AbortSignal.timeout(8e3)
		});
		if (res.ok) {
			const text = await res.text();
			if (looksLikeLite(text)) {
				const rows = parseLite(text, skills);
				if (rows.length) return rows;
			}
		}
	} catch {}
	if (edition === "OSRS" && true) try {
		const res = await fetch(`https://api.wiseoldman.net/v2/players/${encodeURIComponent(clean)}`, { signal: AbortSignal.timeout(8e3) });
		if (res.ok) {
			const rows = parseWom(await res.json(), skills);
			if (rows.length) return rows;
		}
	} catch {}
	return [];
}
function HiscoresLookup({ name: boundName, onName, onLevels, bare = false }) {
	const [localName, setLocalName] = (0, import_react.useState)(() => {
		try {
			return window.localStorage.getItem("rs-hiscore-name") ?? "";
		} catch {
			return "";
		}
	});
	const name = boundName ?? localName;
	function setName(next) {
		setLocalName(next);
		onName?.(next);
	}
	const [edition, setEdition] = (0, import_react.useState)("OSRS");
	const [rows, setRows] = (0, import_react.useState)(null);
	const [status, setStatus] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [filter, setFilter] = (0, import_react.useState)("");
	const [foundName, setFoundName] = (0, import_react.useState)("");
	const seq = (0, import_react.useRef)(0);
	const abortRef = (0, import_react.useRef)(null);
	const nameRef = (0, import_react.useRef)(name);
	nameRef.current = name;
	const editionRef = (0, import_react.useRef)(edition);
	editionRef.current = edition;
	async function lookup(nextEdition = editionRef.current) {
		const clean = hiscoresQuery(nameRef.current);
		if (!clean) {
			setStatus("Type a display name first.");
			return;
		}
		abortRef.current?.abort();
		const ctrl = new AbortController();
		abortRef.current = ctrl;
		const id = ++seq.current;
		setBusy(true);
		setStatus(nextEdition === "OSRS" ? "Looking up on Old School Hiscores…" : "Looking up on RuneScape Hiscores…");
		try {
			const next = await loadHiscores(clean, nextEdition, ctrl.signal);
			if (id !== seq.current) return;
			setRows(next);
			setFoundName(clean);
			const filled = {};
			for (const row of next) {
				if (row.skill === "Overall") continue;
				filled[row.skill.toLowerCase()] = String(row.level);
			}
			onLevels?.(filled, nextEdition);
			try {
				const nines = next.filter((row) => row.skill !== "Overall" && Number(row.level) >= 99).map((row) => row.skill.toLowerCase());
				sessionStorage.setItem("rs-99-skills", JSON.stringify(nines));
			} catch {}
			setStatus(next.length ? "Found" : "Not on that board.");
		} catch {
			if (id !== seq.current) return;
			setStatus("Boards are busy. Download is not.");
		} finally {
			if (id === seq.current) setBusy(false);
		}
	}
	(0, import_react.useEffect)(() => {
		const onLookup = () => {
			lookup();
		};
		window.addEventListener("rs-hiscores-lookup", onLookup);
		return () => {
			window.removeEventListener("rs-hiscores-lookup", onLookup);
			abortRef.current?.abort();
		};
	}, []);
	const officialName = hiscoresQuery(name);
	const official = officialName ? edition === "OSRS" ? HISCORE_URLS.osrsPage(officialName) : HISCORE_URLS.rs3Page(officialName) : "";
	const wom = officialName && edition === "OSRS" ? HISCORE_URLS.osrsWom(officialName) : "";
	const overall = rows?.find((row) => row.skill === "Overall");
	const shown = (0, import_react.useMemo)(() => {
		const q = filter.trim().toLowerCase();
		if (!rows) return [];
		if (!q) return rows;
		return rows.filter((row) => row.skill.toLowerCase().includes(q));
	}, [rows, filter]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: bare ? "" : "overflow-hidden rounded-md border border-line bg-raised",
		children: [bare ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "border-b border-line px-3 py-2 text-center text-sm font-semibold tracking-tight text-parchment",
			children: "Hiscores"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: bare ? "pt-2" : "px-2 py-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-[11px] text-muted",
					children: "Type a display name. Jagex first. Old School may fall back to Wise Old Man, a community board, not Jagex. Not found means not on that board."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "flex flex-col gap-2 sm:flex-row sm:items-center",
					onSubmit: (e) => {
						e.preventDefault();
						lookup();
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: name,
						onChange: (e) => {
							const next = sanitizeDisplayNameLive(e.target.value);
							setName(next);
							try {
								window.localStorage.setItem("rs-hiscore-name", next);
							} catch {}
						},
						maxLength: 12,
						autoComplete: "off",
						autoCorrect: "off",
						autoCapitalize: "off",
						spellCheck: false,
						enterKeyHint: "done",
						placeholder: "Display name",
						className: "h-11 flex-1 rounded-md border border-line bg-raised px-3 text-base text-fg placeholder:text-faint outline-none focus-visible:border-parchment"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setEdition("OSRS");
									if (hiscoresQuery(name)) lookup("OSRS");
								},
								className: `h-10 rounded-md border px-3 text-xs ${edition === "OSRS" ? "border-parchment bg-surface" : "border-line hover:bg-white/[0.08]"}`,
								children: "Old School™"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: busy,
								className: "h-10 rounded-md border px-4 text-xs font-semibold disabled:opacity-60",
								style: {
									borderColor: "#5a1008",
									background: "linear-gradient(180deg, #c43a28 0%, #8a1c14 55%, #4a0c08 100%)",
									color: "#f8e6c8",
									textShadow: "0 1px 0 #2a0604",
									boxShadow: "inset 0 1px 0 rgba(255,200,180,0.35)"
								},
								children: busy ? "Looking…" : "Look up"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setEdition("RS3");
									if (hiscoresQuery(name)) lookup("RS3");
								},
								className: `h-10 rounded-md border px-3 text-xs ${edition === "RS3" ? "border-parchment bg-raised" : "border-line hover:bg-white/[0.08]"}`,
								children: "RuneScape™"
							})
						]
					})]
				}),
				status ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-muted",
					"aria-live": "polite",
					children: status
				}) : null,
				officialName ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: official,
					target: "_blank",
					rel: "noreferrer",
					className: "mt-2 inline-block text-xs text-parchment",
					children: ["Official hiscores for ", officialName]
				}) : null,
				wom ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: wom,
					target: "_blank",
					rel: "noreferrer",
					className: "mt-1 inline-block text-xs text-parchment",
					children: ["Wise Old Man for ", officialName]
				}) : null,
				overall ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 font-mono text-sm tabular-nums text-parchment",
					children: [
						foundName || officialName,
						" · total ",
						overall.level.toLocaleString(),
						" · ",
						overall.xp.toLocaleString(),
						" xp",
						overall.rank > 0 ? ` · rank ${overall.rank.toLocaleString()}` : ""
					]
				}) : null,
				rows && rows.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: filter,
					onChange: (e) => setFilter(e.target.value),
					placeholder: "Filter skill",
					className: "mt-2 h-8 w-full rounded-md border border-line bg-bg px-2 text-xs text-fg outline-none focus:border-parchment"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 max-h-56 overflow-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "sticky top-0 bg-raised text-faint",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-1.5 pr-2",
									children: "Skill"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pr-2",
									children: "Level"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pr-2",
									children: "XP"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Rank" })
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: shown.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: `border-t border-line ${row.skill === "Overall" ? "text-parchment" : ""}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-1.5 pr-2",
									children: row.skill
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "pr-2 tabular-nums",
									children: row.level
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "pr-2 tabular-nums",
									children: row.xp.toLocaleString()
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "tabular-nums",
									children: row.rank > 0 ? row.rank.toLocaleString() : "—"
								})
							]
						}, row.skill)) })]
					})
				})] }) : null
			]
		})]
	});
}
//#endregion
export { HiscoresLookup };
