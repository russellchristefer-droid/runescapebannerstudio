import { i as __toESM } from "../_runtime.mjs";
import { V as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as useVisibleNow, S as BackLink, s as EggToast, w as eggToast } from "./router-D8oIjQ4W.mjs";
import { i as stillPool, n as canUseOnDesk, r as heroCaption } from "./still-pool-DmUeBE-J.mjs";
import { t as useEggGestures } from "./use-egg-gestures-C3ULa-RT.mjs";
import { i as stillIndex, n as formatRemain, r as msUntilNext } from "./still-clock-F1LQ7Gge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/still-pLe8U5PO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FILTERS = [
	{
		id: "rsc",
		label: "Classic"
	},
	{
		id: "osrs",
		label: "Old School"
	},
	{
		id: "rs3",
		label: "RuneScape"
	}
];
function RotatingStill({ onUse }) {
	const [filter, setFilter] = (0, import_react.useState)("rsc");
	const frameRef = (0, import_react.useRef)(null);
	const displayRef = (0, import_react.useRef)(null);
	const pool = (0, import_react.useMemo)(() => stillPool(filter), [filter]);
	const now = useVisibleNow();
	const [shown, setShown] = (0, import_react.useState)(null);
	const idx = stillIndex(pool.length, now);
	const nextIdx = pool.length ? (idx + 1) % pool.length : 0;
	const current = pool[idx];
	const upcoming = pool[nextIdx];
	(0, import_react.useEffect)(() => {
		if (!current) {
			setShown(null);
			return;
		}
		const img = new Image();
		img.src = current.src;
		const apply = () => setShown(current);
		if (typeof img.decode === "function") img.decode().then(apply).catch(apply);
		else img.onload = apply;
	}, [
		current?.src,
		current?.name,
		current?.era
	]);
	(0, import_react.useEffect)(() => {
		if (!upcoming) return;
		const img = new Image();
		img.src = upcoming.src;
	}, [upcoming?.src]);
	const remain = msUntilNext(now);
	const display = shown ?? current;
	displayRef.current = display ?? null;
	useEggGestures(frameRef, () => {
		const card = displayRef.current;
		if (!card) return "It's a picture.";
		const game = card.gameLabel;
		if (/telos|vorago|raksha|vorkath|zul|tomb|inferno|olm|theatre|tob|fight cave/i.test(card.name)) return `It's ${card.name}, ${game}. I wouldn't like to fight that from here.`;
		if (/saradomin|zamorak|guthix|armadyl|bandos|seren|zaros|sliske|tumeken|elidinis|marimbo/i.test(card.name)) return `It's ${card.name}, ${game}. The stone remembers a name.`;
		return `It's ${card.name}, ${game}.`;
	});
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		if (window.location.pathname !== "/still") return;
		const seq = [
			"ArrowUp",
			"ArrowUp",
			"ArrowDown",
			"ArrowDown",
			"ArrowLeft",
			"ArrowRight",
			"ArrowLeft",
			"ArrowRight",
			"b",
			"a"
		];
		let i = 0;
		const onKey = (e) => {
			const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
			if (key === seq[i]) {
				i += 1;
				if (i === seq.length) {
					i = 0;
					if (stillPool("rsc").length) {
						setFilter("rsc");
						eggToast("You feel a longing for 2001.");
					} else eggToast("The memories aren't hosted yet.");
				}
			} else if (key === seq[0]) i = 1;
			else i = 0;
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	if (!display) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "px-3 py-4 text-sm text-muted",
		children: "Nothing here yet. Try another era chip."
	});
	const deskOk = canUseOnDesk(display);
	const useHref = deskOk ? `/?place=${encodeURIComponent(display.placeId)}&game=${display.era}&view=${display.view ?? "a"}` : "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "border-b border-line bg-raised",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: frameRef,
			className: "relative w-full overflow-hidden bg-[#1a1612]",
			style: { aspectRatio: "1200 / 480" },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: display.src,
				width: 1200,
				height: 480,
				alt: heroCaption(display),
				fetchPriority: "high",
				className: "absolute inset-0 h-full w-full object-cover"
			}, display.src)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-2 px-3 py-3 md:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-fg",
					children: heroCaption(display)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[11px] text-faint",
					children: [
						"Next still in ",
						formatRemain(remain),
						" · ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: display.filePage,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "text-parchment",
							children: "File page"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [FILTERS.map((chip) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-pressed": filter === chip.id,
						className: `min-h-11 rounded-md border px-3 text-xs ${filter === chip.id ? "border-parchment bg-surface text-parchment" : "border-line text-muted"}`,
						onClick: () => setFilter(chip.id),
						children: chip.label
					}, chip.id)), deskOk && onUse ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 rounded-md border border-parchment px-3 text-xs text-parchment",
						onClick: () => onUse(display),
						children: "Use on desk"
					}) : deskOk ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: useHref,
						className: "inline-flex min-h-11 items-center rounded-md border border-parchment px-3 text-xs text-parchment",
						children: "Use on desk"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "self-center text-[11px] text-faint",
						children: "Gallery only — not a desk still."
					})]
				})
			]
		})]
	});
}
function StillPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EggToast, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "border-b border-line px-5 py-5 md:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackLink, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "page-h1 mt-1",
						children: "Still"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-2xl text-sm text-muted",
						children: "One hosted photograph at a time from official wiki File pages. Classic, Old School, and RuneScape. Places and people. Same picture for everyone on the UTC five-minute mark. Identification only. Not a Jagex product."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotatingStill, {})
		]
	});
}
//#endregion
export { StillPage as component };
