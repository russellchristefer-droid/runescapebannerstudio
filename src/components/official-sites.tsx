export const OFFICIAL_SITES = [
  ["Old School RuneScape", "https://oldschool.runescape.com/"],
  ["RuneScape", "https://www.runescape.com/"],
  ["Old School wiki", "https://oldschool.runescape.wiki/"],
  ["RuneScape wiki", "https://runescape.wiki/"],
  ["Fan Content Policy", "https://legal.jagex.com/docs/policies/fan-content-policy"],
  ["Jagex Support", "https://support.runescape.com/"],
] as const;

export function OfficialSites() {
  return (
    <section>
      <h2 className="mb-2 text-sm font-semibold text-parchment">Official sites</h2>
      <p className="mb-2 text-[11px] text-faint">Official · not this desk.</p>
      <p className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-parchment">
        {OFFICIAL_SITES.map(([name, href]) => (
          <a key={href} href={href} target="_blank" rel="noopener noreferrer">
            {name}
          </a>
        ))}
      </p>
    </section>
  );
}