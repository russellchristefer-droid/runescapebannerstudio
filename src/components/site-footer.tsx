import { Link } from "@tanstack/react-router";

export const FAN_POLICY =
  "Created using intellectual property belonging to Jagex Limited under the terms of Jagex's Fan Content Policy. This content is not endorsed by or affiliated with Jagex.";

export function SiteFooter() {
  return (
    <footer className="border-t border-line px-3 py-4 text-[11px] leading-relaxed text-faint md:px-8">
      <p>Independent studio · not a Jagex product</p>
      <p>Plate type: RS Chat Bold (fan replica). Stills are identification.</p>
      <nav className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-parchment">
        <Link to="/brief">Brief</Link>
        <Link to="/legal">Legal</Link>
        <a
          href="https://legal.jagex.com/docs/policies/fan-content-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Fan Content Policy
        </a>
      </nav>
    </footer>
  );
}
