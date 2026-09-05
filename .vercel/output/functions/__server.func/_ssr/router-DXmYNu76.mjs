import { i as __toESM } from "../_runtime.mjs";
import { L as redirect, V as require_react, _ as createRootRoute, b as require_jsx_runtime, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-header-BEMKEFuJ.js
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
		children: label
	})] }, to)) });
}
function SiteHeader({ onMarkClick, children, skip }) {
	const pete = (0, import_react.useRef)({
		n: 0,
		t: 0
	});
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
				className: "mt-1.5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-parchment",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioNavLinks, {})
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
//#region node_modules/.nitro/vite/services/ssr/assets/router-DXmYNu76.js
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
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Independent studio · not a Jagex product" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
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
		})]
	});
}
/** Quiet in-world eggs. Not mounted as a joke on Legal — eggToast no-ops there. */
function WorldEggs() {
	useDeskEggs("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EggToast, {});
}
var styles_default = "/assets/styles-D8GiB1-S.css";
var APP_NAME = "RuneScape Banner Studio";
function publicAppHost() {
	const host = String("").trim().split(",")[0].trim().split(":")[0].toLowerCase();
	if (!host.endsWith(".grok.me")) return "";
	if (host.includes("vercel")) return "";
	return host;
}
var Route$27 = createRootRoute({
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
var $$splitComponentImporter$23 = () => import("./routes-nkiOKj1N.mjs");
var Route$26 = createFileRoute("/")({
	head: () => ({ links: [{
		rel: "preconnect",
		href: "https://secure.runescape.com"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
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
var $$splitComponentImporter$22 = () => import("./brief-BlLGmUox.mjs");
var Route$25 = createFileRoute("/brief")({
	head: () => pageMeta("Brief", "What RuneScape Banner Studio is and is not. Independent fan desk. Not Jagex."),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("./chronicle-CuabZhfD.mjs");
var Route$24 = createFileRoute("/chronicle")({
	head: () => ({ meta: [{ title: pageTitle("Chronicle") }] }),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var $$splitComponentImporter$20 = () => import("./classic-B__3p9rs.mjs");
var Route$23 = createFileRoute("/classic")({
	head: () => pageMeta("Classic", "RuneScape Classic archive gallery. Memory. Not a live world."),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./donate-C5Qjmzwx.mjs");
var Route$22 = createFileRoute("/donate")({ component: lazyRouteComponent($$splitComponentImporter$19, "component") });
var $$splitComponentImporter$18 = () => import("./edit-CNg57khO.mjs");
var Route$21 = createFileRoute("/edit")({
	head: () => pageMeta("Clips", "Local clip bench. Trim and save a file. This page does not go live."),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./egg-BFGYoB2m.mjs");
var Route$20 = createFileRoute("/egg")({
	head: () => ({ meta: [{ title: pageTitle("Box") }] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./guthix-ledger-7iIhGado.mjs");
var Route$19 = createFileRoute("/guthix-ledger")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
var $$splitComponentImporter$15 = () => import("./history-C4a17mkU.mjs");
var Route$18 = createFileRoute("/history")({
	head: () => pageMeta("History", "A fan story of public RuneScape memory. Two games. Not a rank."),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var Route$17 = createFileRoute("/jagex")({ beforeLoad: () => {
	throw redirect({ to: "/jmods" });
} });
var $$splitComponentImporter$14 = () => import("./jmods-BPO334Wx.mjs");
var Route$16 = createFileRoute("/jmods")({
	head: () => ({ meta: [{ title: pageTitle("Jagex directory") }] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./knowledge-hmA9jZn8.mjs");
var Route$15 = createFileRoute("/knowledge")({
	head: () => ({ meta: [{ title: pageTitle("Sites") }] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./legal-CXerLHJ0.mjs");
var Route$14 = createFileRoute("/legal")({
	head: () => pageMeta("Legal", "Independent studio. Fan Content Policy. Not endorsed by Jagex."),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var Route$13 = createFileRoute("/lumb")({ beforeLoad: () => {
	const edition = savedEdition();
	throw redirect({
		to: "/towns/$id",
		params: { id: edition === "RS3" ? "lumbridge" : "osrslumbridge" }
	});
} });
var $$splitComponentImporter$11 = () => import("./senntisten-mOmUFet7.mjs");
var Route$12 = createFileRoute("/senntisten")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./still--UWD2xGS.mjs");
var Route$11 = createFileRoute("/still")({
	head: () => ({ meta: [{ title: pageTitle("Still") }] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./story-BiAODKcL.mjs");
var Route$10 = createFileRoute("/story")({
	head: () => ({ meta: [{ title: pageTitle("What this is") }] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./stream-Dq4Meg_f.mjs");
var Route$9 = createFileRoute("/stream")({
	head: () => pageMeta("Stream", "Go-live notes. Category is Old School RuneScape or RuneScape."),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./streamers-NwuPulZC.mjs");
var Route$8 = createFileRoute("/streamers")({
	head: () => pageMeta("Streamers", "Independent Twitch directory for Old School RuneScape and RuneScape."),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var Route$7 = createFileRoute("/varrock")({ beforeLoad: () => {
	const edition = savedEdition();
	throw redirect({
		to: "/towns/$id",
		params: { id: edition === "RS3" ? "varrock" : "osrsvarrock" }
	});
} });
var $$splitComponentImporter$6 = () => import("./youtubers-D-Rp0Q9A.mjs");
var Route$6 = createFileRoute("/youtubers")({
	head: () => pageMeta("Youtubers", "Hall of known RuneScape YouTube channels. Not complete. Not Jagex."),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./bosses.index-DCub9fKJ.mjs");
var Route$5 = createFileRoute("/bosses/")({
	head: () => pageMeta("Bosses", "Boss arenas for Old School RuneScape and RuneScape. Wiki keeps the hour."),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./bosses._id-LTseaW1D.mjs");
var Route$4 = createFileRoute("/bosses/$id")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./gods.index-CRueQcmc.mjs");
var Route$3 = createFileRoute("/gods/")({
	head: () => pageMeta("Gods", "Gods of Old School RuneScape and RuneScape. Two canons."),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./gods._god-DR0kpkqZ.mjs");
var Route$2 = createFileRoute("/gods/$god")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./towns.index-AuD0lL4M.mjs");
var Route$1 = createFileRoute("/towns/")({
	head: () => pageMeta("Towns", "Towns in Old School RuneScape and RuneScape. Correct client stills."),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./towns._id-BL-lBjN8.mjs");
var Route = createFileRoute("/towns/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$26.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$27
});
var BriefRoute = Route$25.update({
	id: "/brief",
	path: "/brief",
	getParentRoute: () => Route$27
});
var ChronicleRoute = Route$24.update({
	id: "/chronicle",
	path: "/chronicle",
	getParentRoute: () => Route$27
});
var ClassicRoute = Route$23.update({
	id: "/classic",
	path: "/classic",
	getParentRoute: () => Route$27
});
var DonateRoute = Route$22.update({
	id: "/donate",
	path: "/donate",
	getParentRoute: () => Route$27
});
var EditRoute = Route$21.update({
	id: "/edit",
	path: "/edit",
	getParentRoute: () => Route$27
});
var EggRoute = Route$20.update({
	id: "/egg",
	path: "/egg",
	getParentRoute: () => Route$27
});
var GuthixLedgerRoute = Route$19.update({
	id: "/guthix-ledger",
	path: "/guthix-ledger",
	getParentRoute: () => Route$27
});
var HistoryRoute = Route$18.update({
	id: "/history",
	path: "/history",
	getParentRoute: () => Route$27
});
var JagexRoute = Route$17.update({
	id: "/jagex",
	path: "/jagex",
	getParentRoute: () => Route$27
});
var JmodsRoute = Route$16.update({
	id: "/jmods",
	path: "/jmods",
	getParentRoute: () => Route$27
});
var KnowledgeRoute = Route$15.update({
	id: "/knowledge",
	path: "/knowledge",
	getParentRoute: () => Route$27
});
var LegalRoute = Route$14.update({
	id: "/legal",
	path: "/legal",
	getParentRoute: () => Route$27
});
var LumbRoute = Route$13.update({
	id: "/lumb",
	path: "/lumb",
	getParentRoute: () => Route$27
});
var SenntistenRoute = Route$12.update({
	id: "/senntisten",
	path: "/senntisten",
	getParentRoute: () => Route$27
});
var StillRoute = Route$11.update({
	id: "/still",
	path: "/still",
	getParentRoute: () => Route$27
});
var StoryRoute = Route$10.update({
	id: "/story",
	path: "/story",
	getParentRoute: () => Route$27
});
var StreamRoute = Route$9.update({
	id: "/stream",
	path: "/stream",
	getParentRoute: () => Route$27
});
var StreamersRoute = Route$8.update({
	id: "/streamers",
	path: "/streamers",
	getParentRoute: () => Route$27
});
var VarrockRoute = Route$7.update({
	id: "/varrock",
	path: "/varrock",
	getParentRoute: () => Route$27
});
var YoutubersRoute = Route$6.update({
	id: "/youtubers",
	path: "/youtubers",
	getParentRoute: () => Route$27
});
var BossesIndexRoute = Route$5.update({
	id: "/bosses/",
	path: "/bosses/",
	getParentRoute: () => Route$27
});
var BossesIdRoute = Route$4.update({
	id: "/bosses/$id",
	path: "/bosses/$id",
	getParentRoute: () => Route$27
});
var GodsIndexRoute = Route$3.update({
	id: "/gods/",
	path: "/gods/",
	getParentRoute: () => Route$27
});
var GodsGodRoute = Route$2.update({
	id: "/gods/$god",
	path: "/gods/$god",
	getParentRoute: () => Route$27
});
var TownsIndexRoute = Route$1.update({
	id: "/towns/",
	path: "/towns/",
	getParentRoute: () => Route$27
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
	TownsIdRoute: Route.update({
		id: "/towns/$id",
		path: "/towns/$id",
		getParentRoute: () => Route$27
	}),
	BossesIndexRoute,
	GodsIndexRoute,
	TownsIndexRoute
};
var routeTree = Route$27._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent,
		scrollRestoration: true
	});
}
//#endregion
export { useDeskEggs as a, SiteHeader as c, pad as d, sessionOnce as f, useVisibleNow as h, Route$4 as i, eggToast as l, untilUtcMidnight as m, Route as n, EggToast as o, untilUtcHour as p, Route$2 as r, BackLink as s, router_exports as t, isOwnerName as u };
