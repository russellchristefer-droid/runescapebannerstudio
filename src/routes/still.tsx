import { createFileRoute } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";
import { EggToast } from "@/components/egg-toast";
import { RotatingStill } from "@/components/rotating-still";

import { pageTitle } from "@/lib/page-title";

export const Route = createFileRoute("/still")({
  head: () => ({ meta: [{ title: pageTitle("Still") }] }),
  component: StillPage,
});

function StillPage() {
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <EggToast />
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
        <h1 className="page-h1 mt-1">Still</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          One hosted photograph at a time from official wiki File pages.
          Classic, Old School, and RuneScape. Places and people.
          Same picture for everyone on the UTC five-minute mark.
          Identification only. Not a Jagex product.
        </p>
      </header>
      <RotatingStill />
    </div>
  );
}
