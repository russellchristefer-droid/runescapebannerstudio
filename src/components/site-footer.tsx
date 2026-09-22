import { Link } from "@tanstack/react-router";

export const FAN_POLICY =
  "Created using intellectual property belonging to Jagex Limited under the terms of Jagex's Fan Content Policy. This content is not endorsed by or affiliated with Jagex.";

export const CASH_APP = "https://cash.app/$takemymoneypleaseok";
export const CASH_HANDLE = "$takemymoneypleaseok";

export function ProductAsk() {
  return (
    <nav aria-label="Product" className="flex flex-wrap justify-center gap-2 px-3 py-3">
      <a href="#desk" className="rs-chip min-h-11 text-xs">
        Banner desk
      </a>
      <Link to="/edit" className="rs-chip min-h-11 text-xs">
        Clip bench
      </Link>
      <a href={CASH_APP} target="_blank" rel="noopener noreferrer" className="rs-chip min-h-11 text-xs">
        Support
      </a>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line px-3 py-4 text-[11px] leading-relaxed text-faint md:px-8">
      <p>Independent desk. If a plate or clip saved you ten minutes — Cash App.</p>
      <nav className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-parchment" aria-label="Studio">
        <a href={CASH_APP} target="_blank" rel="noopener noreferrer">
          Support · Cash App {CASH_HANDLE}
        </a>
        <Link to="/legal">Legal</Link>
        <a href="mailto:russell.christefer@gmail.com">russell.christefer@gmail.com</a>
      </nav>
    </footer>
  );
}
