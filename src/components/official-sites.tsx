export const OFFICIAL_SITES = [
  ["Jagex", "https://www.jagex.com/"],
  ["Jagex Launcher", "https://www.jagex.com/launcher"],
  ["Old School RuneScape", "https://oldschool.runescape.com/"],
  ["RuneScape", "https://www.runescape.com/"],
  ["RuneScape: Dragonwilds", "https://dragonwilds.runescape.com/"],
  ["Support", "https://support.runescape.com/"],
  ["Help", "https://help.jagex.com/hc/en-gb"],
  ["Legal", "https://legal.jagex.com/"],
  ["Terms", "https://legal.jagex.com/docs/terms/terms-and-conditions"],
  ["Rules of Old School", "https://legal.jagex.com/docs/rules/rules-of-old-school-runescape"],
  ["Rules of RuneScape", "https://legal.jagex.com/docs/rules/rules-of-runescape"],
  ["Fan Content Policy", "https://legal.jagex.com/docs/policies/fan-content-policy"],
  ["Old School wiki", "https://oldschool.runescape.wiki/"],
  ["RuneScape wiki", "https://runescape.wiki/"],
  ["Classic wiki", "https://classic.runescape.wiki/"],
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