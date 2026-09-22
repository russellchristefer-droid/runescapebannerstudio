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

function DeskFallback() {
  return (
    <main className="min-h-dvh bg-bg px-5 py-6 text-fg">
      <p className="text-center text-[10px] tracking-[0.2em] text-faint uppercase">
        Independent studio · not a Jagex product
      </p>
      <p className="site-title page-h1 mt-2 text-center">RuneScape Banner Studio</p>
      <figure className="mx-auto mt-4 max-w-[1200px]">
        <img
          id="still"
          src="/Falador.png"
          alt="Falador"
          width={1200}
          height={480}
          decoding="async"
          className="block h-auto w-full bg-[#1a1610]"
        />
      </figure>
    </main>
  );
}

function Home() {
  return (
    <Suspense fallback={<DeskFallback />}>
      <Studio />
    </Suspense>
  );
}
