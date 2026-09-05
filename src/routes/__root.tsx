import { createRootRoute, HeadContent, Link, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WorldEggs } from "@/components/world-eggs";
import appCss from "../styles.css?url";

const APP_NAME = "RuneScape Banner Studio";

function publicAppHost() {
  const raw = String(import.meta.env.VITE_PUBLIC_HOSTNAME ?? "").trim();
  const host = raw.split(",")[0].trim().split(":")[0].toLowerCase();
  if (!host.endsWith(".grok.me")) return "";
  if (host.includes("vercel")) return "";
  return host;
}

export const Route = createRootRoute({
  head: () => {
    const host = publicAppHost();
    const origin = host ? `https://${host}` : "";
    const xBanner = origin ? `${origin}/x-banner.jpg` : "";
    const ogImage = origin ? `${origin}/og.jpg` : "";
    const desc =
      "RuneScape Banner Studio. Independent fan desk for Old School RuneScape and RuneScape banners. Not a Jagex product.";
    return {
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: APP_NAME },
      { name: "description", content: desc },
      { name: "theme-color", content: "#0c0a08" },
      { name: "color-scheme", content: "dark" },
      { name: "robots", content: "index,follow" },
      { name: "referrer", content: "strict-origin-when-cross-origin" },
      { name: "format-detection", content: "telephone=no" },
      { name: "application-name", content: APP_NAME },
      { name: "apple-mobile-web-app-title", content: APP_NAME },
      { property: "og:type", content: "website" },
      { property: "og:title", content: APP_NAME },
      { property: "og:description", content: desc },
      { property: "og:locale", content: "en_GB" },
      ...(ogImage
        ? [
            { property: "og:image", content: ogImage },
            { property: "og:image:width", content: "1200" },
            { property: "og:image:height", content: "630" },
            { name: "twitter:card", content: "summary_large_image" },
            { name: "twitter:title", content: APP_NAME },
            { name: "twitter:description", content: desc },
            { name: "twitter:image", content: ogImage },
          ]
        : []),
      ...(xBanner
        ? [{ property: "x:game:image", content: xBanner }]
        : []),
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "preload", href: "/fonts/runescape-uf.ttf", as: "font", type: "font/ttf", crossOrigin: "anonymous" },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "dns-prefetch", href: "https://secure.runescape.com" },
      ...(origin ? [{ rel: "canonical", href: `${origin}/` }] : []),
    ],
  };
  },
  errorComponent: () => (
    <div className="min-h-dvh bg-bg px-5 py-16 text-center text-fg">
      <SiteHeader />
      <p className="mt-4 text-sm text-parchment">This tile failed to load.</p>
    </div>
  ),
  notFoundComponent: () => (
    <div className="min-h-dvh bg-bg px-5 py-16 text-center text-fg">
      <SiteHeader />
      <h1 className="page-h1 mt-4">This tile is empty.</h1>
      <p className="mt-3">
        <Link to="/" className="text-parchment">
          Banner Studio
        </Link>
      </p>
    </div>
  ),
  component: () => (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
          <WorldEggs />
        </AuthProvider>
        <SiteFooter />
        <Scripts />
      </body>
    </html>
  ),
});
