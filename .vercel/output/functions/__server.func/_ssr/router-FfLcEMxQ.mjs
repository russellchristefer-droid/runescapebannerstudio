import { i as __toESM } from "../_runtime.mjs";
import { L as redirect, V as require_react, _ as createRootRoute, b as require_jsx_runtime, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-header-C1JWqqq5.js
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
//#region node_modules/.nitro/vite/services/ssr/assets/router-FfLcEMxQ.js
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
	return null;
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "border-t border-line px-3 py-4 text-[11px] leading-relaxed text-faint md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Independent studio · not a Jagex product" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Plate type: RuneScape UF (fan replica). Stills are identification." }),
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
var styles_default = "/assets/styles-IoDSilPN.css";
var APP_NAME = "RuneScape Banner Studio";
function publicAppHost() {
	const host = String("").trim().split(",")[0].trim().split(":")[0].toLowerCase();
	if (!host.endsWith(".grok.me")) return "";
	if (host.includes("vercel")) return "";
	return host;
}
var Route$29 = createRootRoute({
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
					href: "/fonts/runescape-uf.ttf",
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
var $$splitComponentImporter$25 = () => import("./routes-DfB-Dl07.mjs");
var Route$28 = createFileRoute("/")({
	head: () => ({ links: [{
		rel: "preconnect",
		href: "https://secure.runescape.com"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$25, "component")
});
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
var $$splitComponentImporter$24 = () => import("./brief-D66g1rXg.mjs");
var Route$27 = createFileRoute("/brief")({
	head: () => pageMeta("Brief", "What RuneScape Banner Studio is and is not. Independent fan desk. Not Jagex."),
	component: lazyRouteComponent($$splitComponentImporter$24, "component")
});
var $$splitComponentImporter$23 = () => import("./chronicle-t7rlxxyp.mjs");
var Route$26 = createFileRoute("/chronicle")({
	head: () => ({ meta: [{ title: pageTitle("Chronicle") }] }),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("./classic-Bg4s45GR.mjs");
var Route$25 = createFileRoute("/classic")({
	head: () => pageMeta("Classic", "RuneScape Classic archive gallery. Memory. Not a live world."),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("./donate-B0SX76ck.mjs");
var Route$24 = createFileRoute("/donate")({ component: lazyRouteComponent($$splitComponentImporter$21, "component") });
var $$splitComponentImporter$20 = () => import("./edit-B9GVOxOo.mjs");
var Route$23 = createFileRoute("/edit")({
	head: () => pageMeta("Clips", "Local clip bench. Trim and save a file. This page does not go live."),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./egg-BFGYoB2m.mjs");
var Route$22 = createFileRoute("/egg")({
	head: () => ({ meta: [{ title: pageTitle("Box") }] }),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./guthix-ledger-7iIhGado.mjs");
var Route$21 = createFileRoute("/guthix-ledger")({ component: lazyRouteComponent($$splitComponentImporter$18, "component") });
var $$splitComponentImporter$17 = () => import("./history-BQAHpWcJ.mjs");
var Route$20 = createFileRoute("/history")({
	head: () => pageMeta("History", "A fan story of public RuneScape memory. Two games. Not a rank."),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var Route$19 = createFileRoute("/jagex")({ beforeLoad: () => {
	throw redirect({ to: "/jmods" });
} });
var $$splitComponentImporter$16 = () => import("./jmods-CGHB0Xgn.mjs");
var Route$18 = createFileRoute("/jmods")({
	head: () => ({ meta: [{ title: pageTitle("Jagex directory") }] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./knowledge-DRuP3ZQ3.mjs");
var Route$17 = createFileRoute("/knowledge")({
	head: () => ({ meta: [{ title: pageTitle("Sites") }] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./legal-CkM7Sz6Q.mjs");
var Route$16 = createFileRoute("/legal")({
	head: () => pageMeta("Legal", "Independent studio. Fan Content Policy. Not endorsed by Jagex."),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var Route$15 = createFileRoute("/lumb")({ beforeLoad: () => {
	const edition = savedEdition();
	throw redirect({
		to: "/towns/$id",
		params: { id: edition === "RS3" ? "lumbridge" : "osrslumbridge" }
	});
} });
var $$splitComponentImporter$13 = () => import("./senntisten-mOmUFet7.mjs");
var Route$14 = createFileRoute("/senntisten")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./still-B4Pqytdn.mjs");
var Route$13 = createFileRoute("/still")({
	head: () => ({ meta: [{ title: pageTitle("Still") }] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./story-BoYq2ddQ.mjs");
var Route$12 = createFileRoute("/story")({
	head: () => ({ meta: [{ title: pageTitle("What this is") }] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./stream-B_FIcUU0.mjs");
var Route$11 = createFileRoute("/stream")({
	head: () => pageMeta("Stream", "Go-live notes. Category is Old School RuneScape or RuneScape."),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./streamers-D3fR80e5.mjs");
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
var $$splitComponentImporter$8 = () => import("./youtubers-CtRLFE2D.mjs");
var Route$8 = createFileRoute("/youtubers")({
	head: () => pageMeta("Youtubers", "Hall of known RuneScape YouTube channels. Not complete. Not Jagex."),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./bosses.index-wtQIjEq-.mjs");
var Route$7 = createFileRoute("/bosses/")({
	head: () => pageMeta("Bosses", "Boss arenas for Old School RuneScape and RuneScape. Wiki keeps the hour."),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./bosses._id-B0qq6vV4.mjs");
var Route$6 = createFileRoute("/bosses/$id")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./gods.index-Bzr99ez5.mjs");
var Route$5 = createFileRoute("/gods/")({
	head: () => pageMeta("Gods", "Gods of Old School RuneScape and RuneScape. Two canons."),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./gods._god-BXE2cp_B.mjs");
var Route$4 = createFileRoute("/gods/$god")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./monsters.index-CoNuMBxN.mjs");
var Route$3 = createFileRoute("/monsters/")({
	head: () => pageMeta("Bestiary", "Slayer and dungeon creatures. Bosses have their own page."),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
function monsterStillSrc(row) {
	return `/stills/${row.edition === "OSRS" ? "osrs" : "rs3"}/beast-${row.slug.replace(/-/g, "")}.jpg`;
}
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
		hunt: "Low-level melee in the yard. Multi. Learn food, then leave.",
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
		hunt: "Melee in the paddock. Hide is the lesson.",
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
		hunt: "Crush in multi. Brass key from the west.",
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
		hunt: "Magic and melee. Protect Magic if you idle.",
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
		hunt: "Heavier melee and mage. Protect as the live page says.",
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
		hunt: "Harder demon. Multi in the catacombs. Burst is common.",
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
		hunt: "Fast melee. Protect Melee. Not Cerberus — that fight is on Bosses.",
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
		hunt: "Low tower task. Melee. The still is the Morytania approach, not an icon.",
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
		hunt: "They scream without cover. Protect Magic.",
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
		hunt: "They cast. Protect Magic. Mid tower.",
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
		hunt: "Melee. Burst in multi. Mutated variants stay on the wiki.",
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
		hunt: "Rock melee. Finish with a rock hammer or helm perk.",
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
		hunt: "Death spawn. Protect Melee. Burst in multi.",
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
		hunt: "They teleport a few tiles. Protect Melee.",
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
		hunt: "They drain without a face cover. Protect Magic.",
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
		hunt: "Magic hits. Protect Magic. The cave is a lane.",
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
		hunt: "Ordinary steel bounces.",
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
		hunt: "Same rule as Turoth. Protect Melee.",
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
		hunt: "They reduce stats without a shield.",
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
		hunt: "Same shield as Cockatrice. Melee.",
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
		hunt: "Magic. Protect Magic.",
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
		hunt: "Poison. Bring an antipoison.",
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
		hunt: "Melee and ranged packs. Kings stay on Bosses.",
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
		hunt: "They drain without a mask. Burst in multi.",
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
		hunt: "The Thermonuclear fight is on Bosses. These are the task.",
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
		hunt: "Heavy melee and a magic slap. Protect Melee.",
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
		hunt: "Melee. Burst in multi catacombs.",
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
		hunt: "Ranged packs. Shamans that sit on Bosses stay there.",
		wiki: osrsWiki("Lizardman"),
		still: "/locations/osrstav.jpg",
		placeId: "osrstav"
	},
	{
		id: "rs3-goblin",
		slug: "goblin",
		name: "Goblin",
		edition: "RS3",
		kind: "monster",
		where: "Goblin Village",
		hunt: "Low-level melee on the RS3 yard.",
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
		hunt: "Melee in the rebuilt paddock.",
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
		hunt: "Crush in the later dungeon. Multi.",
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
		hunt: "Magic and melee.",
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
		hunt: "Heavier demon. Protect as the RS3 page says.",
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
		hunt: "Fast melee. Not a GWD commander.",
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
		hunt: "They teleport. Protect Melee. Ability lines live on the wiki.",
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
		hunt: "Stone melee. Finish them as the RS3 page says.",
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
		hunt: "They drain without a cover. Protect Magic.",
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
		hunt: "Death spawn. Protect Melee.",
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
		hunt: "Melee task. Mutated variants on the wiki.",
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
		hunt: "They scream without cover.",
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
		hunt: "Heavy hits. Prayer and food.",
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
		hunt: "Ordinary weapons bounce.",
		wiki: rs3Wiki("Kurask"),
		still: "/locations/sophanem.jpg",
		placeId: "sophanem"
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
		hunt: "RS3-only. The live page owns the hour.",
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
		hunt: "RS3-only. Fast melee. Method on the wiki.",
		wiki: rs3Wiki("Ripper_Demon"),
		still: "/locations/edgeville.jpg",
		placeId: "edgeville"
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
		hunt: "Task in the mountain. Boots for the floor. Not the Alchemical fight.",
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
		hunt: "Heavier wyrm-kin. Protect as the live page says.",
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
		hunt: "The task hydras. Alchemical Hydra is on Bosses.",
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
		hunt: "Catacombs variant. Protect Magic.",
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
		hunt: "Melee. Multi in catacombs.",
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
		hunt: "Crush. Protect Melee if you idle.",
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
		hunt: "Low crush. Multi in some rooms.",
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
		hunt: "Melee on the mountain. Ice trolls are a variant on the wiki.",
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
		hunt: "Melee and mage. The isle is the room.",
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
		hunt: "Magic. Protect Magic. Crush helps.",
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
		hunt: "Icy breath. The ancient wyvern stay on the wiki if they are a separate task.",
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
		hunt: "GWD task, not a commander. Commanders are on Bosses.",
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
		hunt: "Protect Missiles. Not Kree'arra.",
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
		hunt: "Protect Magic. Not a commander.",
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
		hunt: "Spitting, taloned, long-tailed. Ancient wyvern if treated as a boss stays off this list.",
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
		hunt: "The task spiders. Araxxor stays on Bosses.",
		wiki: osrsWiki("Araxyte"),
		still: "",
		placeId: "osrscani"
	},
	{
		id: "osrs-warpedtb",
		slug: "warped-terrorbird",
		name: "Warped terrorbird",
		edition: "OSRS",
		kind: "monster",
		slayer: true,
		where: "Poison Waste dungeon",
		gate: "Slayer",
		hunt: "The live page owns the room.",
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
		hunt: "Same dungeon as the birds.",
		wiki: osrsWiki("Warped_tortoise"),
		still: ""
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
		hunt: "Leaf-bladed or broad.",
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
		hunt: "Protect Magic.",
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
		hunt: "Melee task.",
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
		hunt: "Magic. Protect Magic.",
		wiki: rs3Wiki("Waterfiend"),
		still: ""
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
		hunt: "RS3 slayer. The live page owns the hour.",
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
		hunt: "Magic task. Not a raid.",
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
		hunt: "RS3-only. Heavy melee.",
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
		hunt: "RS3-only. The live page owns the clones.",
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
		hunt: "Melee, ranged, or mage body. Not a world boss.",
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
		hunt: "Several faces. Amascut’s raid stays on Bosses.",
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
		hunt: "Icy breath. Shield as the live page says.",
		wiki: rs3Wiki("Living_wyvern"),
		still: ""
	}
];
var NOTES = {
	"osrs-abyssal": {
		masters: "Chaeldar, Konar, Nieve/Steve, Duradel.",
		style: "Stand on the Slayer Tower floor or in the Catacombs multi. They melee and teleport a few tiles — do not plant your feet on the last tile they leave. Protect Melee. Tower is single; Catacombs is the Old School burst room. Cannon stays out of the Tower. Slayer helm on task. Do not invent a scythe.",
		watch: "They teleport a few tiles.",
		slayerWiki: "https://oldschool.runescape.wiki/w/Abyssal_demon#Slayer_task"
	},
	"rs3-abyssal": {
		masters: "RuneScape slayer masters from Laniakea’s list on the live page.",
		style: "Stand in the RuneScape slayer dungeon that holds them. They melee and teleport. Protect Melee. Play your bar. Weakness is slashing as a type. No Old School barrage paragraph belongs here.",
		watch: "They teleport."
	},
	"osrs-gargoyle": {
		masters: "Chaeldar, Konar, Nieve/Steve, Duradel.",
		style: "Protect Melee. Finish with a rock hammer or the slayer helm perk. Tower is single.",
		watch: "They do not die until you finish them."
	},
	"osrs-spectre": {
		masters: "Chaeldar, Konar, Nieve/Steve, Duradel.",
		style: "Protect Magic. Nose peg or slayer helm. Burst in Catacombs.",
		watch: "Bare-faced they drain you."
	},
	"osrs-hellhound": {
		masters: "Chaeldar, Konar, Nieve/Steve, Duradel.",
		style: "Protect Melee. Taverley can take a cannon. Wilderness is a risk.",
		watch: "Cerberus is on Bosses."
	},
	"osrs-dustdevil": {
		masters: "Chaeldar, Konar, Nieve/Steve, Duradel.",
		style: "Face mask. Burst in Catacombs. Smoke Dungeon is hot.",
		watch: "No mask, they drain."
	},
	"rs3-ripper": {
		masters: "High RS3 slayer masters. Live page lists who.",
		style: "Fast melee. Ability lines on the wiki.",
		watch: "Task-only door on some versions."
	}
};
function monsterTaskLine(row) {
	if (!row.slayer) return "Not even a task.";
	const note = NOTES[row.id];
	if (note?.masters) return note.masters;
	return row.edition === "OSRS" ? "Assigned by Old School slayer masters (Chaeldar through Duradel, and Konar). The live page lists who." : "Assigned by RuneScape slayer masters. The live page lists who.";
}
function monsterHuntLine(row) {
	const note = NOTES[row.id];
	if (note?.style && note.style.split(". ").length >= 4) return note.style;
	const slayer = row.slayer;
	const tower = /tower|morytania|canifis/i.test(row.where);
	const wildy = /wilderness/i.test(row.where);
	const multi = /catacombs|multi/i.test(row.hunt + row.where);
	if (row.edition === "OSRS") {
		const burst = /dust devil|nechryael|smoke devil|abyssal|black demon|greater demon|dustdevil|nech|smoke/i.test(row.slug + row.name);
		const bits = [
			`Stand in ${row.where.split(",")[0]}. The door or the middle of the room is the usual tile; a safespot only if the live page still names one.`,
			`${row.name} hits with the style that room is known for — melee, magic, or a mix. Protect that style before you loot.`,
			slayer ? "A slayer helm is the face cover and the accuracy. Task-only doors stay shut without the assignment." : "This is not a slayer assignment in Old School.",
			burst && multi ? "This is an Old School burst task when the room is multi. Splash, then barrage. Do not copy that sentence onto a RuneScape sheet." : "Single-way rooms are click and protect. Do not invent a barrage tile here.",
			"A dwarf cannon only if this cave allows it. Some slayer rooms block it; the wiki says which.",
			row.watch || "Poison, line-of-sight, and cannon-blocks are the caution — not a price.",
			"If you die, that is also data."
		];
		if (tower) bits.splice(2, 0, "The Slayer Tower is the lesson: stairs, then the floor they live on. Do not invent a scythe.");
		if (wildy) bits.push("Wilderness is risk, not a raid. Protect item as you would on any ditch trip.");
		if (note?.style) bits.unshift(note.style);
		return bits.join(" ");
	}
	const bits = [
		`Stand in ${row.where.split(",")[0]} on the RuneScape client.`,
		`${row.name} uses the style that dungeon is built for. Protect that style.`,
		slayer ? "Slayer helm if you are on task. Masters and doors are on the live page." : "Not a slayer task in this game.",
		"Play your own ability bar. Weakness is a type (crush, fire, slash), not a shopping list.",
		"Do not paste an Old School barrage paragraph onto this sheet.",
		row.watch || "Task-only doors and line-of-sight are the caution.",
		"The wiki has the rest."
	];
	if (note?.style) bits.unshift(note.style);
	return bits.join(" ");
}
function monsterKillLine(row) {
	const gameWiki = row.edition === "OSRS" ? "Old School wiki" : "RuneScape wiki";
	return [
		`A kill ends when ${row.name.toLowerCase()} drops. Walk the room if you pulled extras. Reset at the door if the task is done.`,
		"Do not stand on the wrong tile and do not pray the wrong style. That is the whole wipe.",
		row.edition === "OSRS" ? "Do not treat a slayer floor as a raid invocation." : "Do not treat this as an enrage boss. Those sheets live under Bosses.",
		`Counts, drops, and the living method: the ${gameWiki} for this hour.`
	].join(" ");
}
function monsterWatchLine(row) {
	return NOTES[row.id]?.watch ?? row.watch ?? "Task-only doors and cannon-blocks are on the live page.";
}
function monsterSlayerLink(row) {
	return NOTES[row.id]?.slayerWiki;
}
function monsterById(id) {
	return MONSTERS.find((row) => row.id === id);
}
var $$splitComponentImporter$2 = () => import("./monsters._id-YvPqXC7U.mjs");
var Route$2 = createFileRoute("/monsters/$id")({
	head: ({ params }) => pageMeta(monsterById(params.id)?.name ?? "Bestiary", "Hunt notes. The wiki keeps the hour."),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./towns.index-BxJZmyky.mjs");
var Route$1 = createFileRoute("/towns/")({
	head: () => pageMeta("Towns", "Towns in Old School RuneScape and RuneScape. Correct client stills."),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./towns._id-DJzbNgBz.mjs");
var Route = createFileRoute("/towns/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$28.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$29
});
var BriefRoute = Route$27.update({
	id: "/brief",
	path: "/brief",
	getParentRoute: () => Route$29
});
var ChronicleRoute = Route$26.update({
	id: "/chronicle",
	path: "/chronicle",
	getParentRoute: () => Route$29
});
var ClassicRoute = Route$25.update({
	id: "/classic",
	path: "/classic",
	getParentRoute: () => Route$29
});
var DonateRoute = Route$24.update({
	id: "/donate",
	path: "/donate",
	getParentRoute: () => Route$29
});
var EditRoute = Route$23.update({
	id: "/edit",
	path: "/edit",
	getParentRoute: () => Route$29
});
var EggRoute = Route$22.update({
	id: "/egg",
	path: "/egg",
	getParentRoute: () => Route$29
});
var GuthixLedgerRoute = Route$21.update({
	id: "/guthix-ledger",
	path: "/guthix-ledger",
	getParentRoute: () => Route$29
});
var HistoryRoute = Route$20.update({
	id: "/history",
	path: "/history",
	getParentRoute: () => Route$29
});
var JagexRoute = Route$19.update({
	id: "/jagex",
	path: "/jagex",
	getParentRoute: () => Route$29
});
var JmodsRoute = Route$18.update({
	id: "/jmods",
	path: "/jmods",
	getParentRoute: () => Route$29
});
var KnowledgeRoute = Route$17.update({
	id: "/knowledge",
	path: "/knowledge",
	getParentRoute: () => Route$29
});
var LegalRoute = Route$16.update({
	id: "/legal",
	path: "/legal",
	getParentRoute: () => Route$29
});
var LumbRoute = Route$15.update({
	id: "/lumb",
	path: "/lumb",
	getParentRoute: () => Route$29
});
var SenntistenRoute = Route$14.update({
	id: "/senntisten",
	path: "/senntisten",
	getParentRoute: () => Route$29
});
var StillRoute = Route$13.update({
	id: "/still",
	path: "/still",
	getParentRoute: () => Route$29
});
var StoryRoute = Route$12.update({
	id: "/story",
	path: "/story",
	getParentRoute: () => Route$29
});
var StreamRoute = Route$11.update({
	id: "/stream",
	path: "/stream",
	getParentRoute: () => Route$29
});
var StreamersRoute = Route$10.update({
	id: "/streamers",
	path: "/streamers",
	getParentRoute: () => Route$29
});
var VarrockRoute = Route$9.update({
	id: "/varrock",
	path: "/varrock",
	getParentRoute: () => Route$29
});
var YoutubersRoute = Route$8.update({
	id: "/youtubers",
	path: "/youtubers",
	getParentRoute: () => Route$29
});
var BossesIndexRoute = Route$7.update({
	id: "/bosses/",
	path: "/bosses/",
	getParentRoute: () => Route$29
});
var BossesIdRoute = Route$6.update({
	id: "/bosses/$id",
	path: "/bosses/$id",
	getParentRoute: () => Route$29
});
var GodsIndexRoute = Route$5.update({
	id: "/gods/",
	path: "/gods/",
	getParentRoute: () => Route$29
});
var GodsGodRoute = Route$4.update({
	id: "/gods/$god",
	path: "/gods/$god",
	getParentRoute: () => Route$29
});
var MonstersIndexRoute = Route$3.update({
	id: "/monsters/",
	path: "/monsters/",
	getParentRoute: () => Route$29
});
var MonstersIdRoute = Route$2.update({
	id: "/monsters/$id",
	path: "/monsters/$id",
	getParentRoute: () => Route$29
});
var TownsIndexRoute = Route$1.update({
	id: "/towns/",
	path: "/towns/",
	getParentRoute: () => Route$29
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
		getParentRoute: () => Route$29
	}),
	BossesIndexRoute,
	GodsIndexRoute,
	MonstersIndexRoute,
	TownsIndexRoute
};
var routeTree = Route$29._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent,
		scrollRestoration: true
	});
}
//#endregion
export { untilUtcHour as C, sessionOnce as S, useVisibleNow as T, BackLink as _, monsterById as a, isOwnerName as b, monsterSlayerLink as c, monsterWatchLine as d, sisterMonster as f, EggToast as g, useDeskEggs as h, MONSTERS as i, monsterStillSrc as l, Route$6 as m, Route as n, monsterHuntLine as o, Route$4 as p, Route$2 as r, monsterKillLine as s, router_exports as t, monsterTaskLine as u, SiteHeader as v, untilUtcMidnight as w, pad as x, eggToast as y };
