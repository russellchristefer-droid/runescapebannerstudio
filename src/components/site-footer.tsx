import { Link } from "@tanstack/react-router";

export const FAN_POLICY =
  "Created using intellectual property belonging to Jagex Limited under the terms of Jagex's Fan Content Policy. This content is not endorsed by or affiliated with Jagex.";

export const CASH_APP = "https://cash.app/$takemymoneypleaseok";
export const CASH_HANDLE = "$takemymoneypleaseok";

export function SiteFooter() {
  return (
    <footer className="border-t px-3 py-4 text-[11px] leading-relaxed text-faint md:px-8" style={{ borderColor: "color-mix(in srgb, #e6d000 60%, transparent)" }}>
      <p>Independent desk. If a plate or clip saved you ten minutes — Cash App.</p>
      <nav className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-parchment" aria-label="Studio">
        <a href={CASH_APP} target="_blank" rel="noopener noreferrer">
          Support
        </a>
        <Link to="/legal">Legal</Link>
      </nav>
    </footer>
  );
}
