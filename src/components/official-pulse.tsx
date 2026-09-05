import { PATCH_LINKS } from "@/lib/patches";

export type PulseLink = { label: string; href: string };

export function OfficialPulse({
  note = "This desk does not write the patch. Official news wins.",
  links,
}: {
  note?: string;
  links?: PulseLink[];
}) {
  const custom = links?.filter((row) => row.href);
  return (
    <details className="page-band py-3">
      <summary className="cursor-pointer text-sm text-muted">Official notes</summary>
      <p className="mb-2 mt-2 text-[10px] text-faint">{note}</p>
      {custom?.length ? (
        <ul className="mt-1 flex flex-col gap-1 text-xs">
          {custom.map((link) => (
            <li key={link.href}>
              <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-parchment">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {PATCH_LINKS.map((col) => (
            <div key={col.title}>
              <p className="text-xs text-parchment">{col.title}</p>
              <ul className="mt-1 flex flex-col gap-1 text-xs">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-fg">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </details>
  );
}
