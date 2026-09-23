import { Link } from "@tanstack/react-router";

export const FAN_POLICY =
  "Created using intellectual property belonging to Jagex Limited under the terms of Jagex's Fan Content Policy. This content is not endorsed by or affiliated with Jagex.";

export const CASH_APP = "https://cash.app/$takemymoneypleaseok";
export const CASH_HANDLE = "$takemymoneypleaseok";

export function SiteFooter() {
  return (
    <footer className="home-foot rs-stone-header mx-auto mb-2 mt-4 w-[min(88rem,calc(100%-1rem))] px-4 py-4 text-center text-[11px] leading-relaxed text-faint">
      <p>Independent desk. If a plate or clip saved you ten minutes — Cash App.</p>
      <nav className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1 text-parchment" aria-label="Studio">
        <a href={CASH_APP} target="_blank" rel="noopener noreferrer">
          Support · {CASH_HANDLE}
        </a>
        <Link to="/legal">Legal</Link>
      </nav>
      <p className="mt-2">
        <a href="mailto:russell.christefer@gmail.com">russell.christefer@gmail.com</a>
      </p>
    </footer>
  );
}
