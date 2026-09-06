import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/legal";
import { pageMeta } from "@/lib/page-title";

export const Route = createFileRoute("/legal")({
  head: () => pageMeta("Legal", "Independent fan studio. Fan Content Policy. Not endorsed by Jagex."),
  component: LegalPage,
});
