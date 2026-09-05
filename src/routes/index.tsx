import { lazy, Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";

const Studio = lazy(() =>
  import("@/components/studio").then((mod) => ({ default: mod.Studio })),
);

export const Route = createFileRoute("/")({
  head: () => ({
    links: [{ rel: "preconnect", href: "https://secure.runescape.com" }],
  }),
  component: Home,
});

function Home() {
  return (
    <Suspense
      fallback={
        <main className="min-h-dvh bg-bg px-5 py-8 text-center text-fg">
          <p className="text-[10px] tracking-[0.2em] text-faint uppercase">
            Independent studio · not a Jagex product
          </p>
          <p className="site-title page-h1 mt-2">RuneScape Banner Studio</p>
          <p className="mt-4 text-sm text-muted">Opening the desk…</p>
        </main>
      }
    >
      <Studio />
    </Suspense>
  );
}
