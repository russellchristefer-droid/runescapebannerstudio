import { Link, createFileRoute } from "@tanstack/react-router";
import { pageTitle } from "@/lib/page-title";

export const Route = createFileRoute("/egg")({
  head: () => ({ meta: [{ title: pageTitle("Box") }] }),
  component: EggPage,
});

const LIST = [
  "Triple-click a still — Nothing interesting happens.",
  "Examine a still (right-click or long-press).",
  "/lumb and /varrock go to that town.",
  "Off-field: cabbage, www, abyssal, guthix, karamja.",
  "Midnight UTC — shops restock.",
  "Pete ×7 — mail that is not mail.",
  "Konami on /still — 2001 if the stills are hosted.",
  "/guthix-ledger — a balance sheet.",
  "Bob’s quote turns with the five-minute clock.",
];

function EggPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-bg px-5 text-center text-fg">
      <p className="text-lg text-parchment" style={{ fontFamily: "Fondamento, serif" }}>
        There is a box here.
      </p>
      <p className="mt-3 max-w-sm text-sm text-muted">Property of the desk officer. Not a hiscores rank.</p>
      <ul className="mt-6 max-w-md list-none space-y-1.5 p-0 text-left text-[11px] text-muted">
        {LIST.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-parchment">
        <Link to="/">Banner Studio</Link>
        {" · "}
        <Link to="/history">History</Link>
        {" · "}
        <Link to="/classic">Classic</Link>
      </p>
    </div>
  );
}
