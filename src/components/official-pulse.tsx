import { PATCH_LINKS } from "@/lib/patches";

export function OfficialPulse() {
  return (
      <details className="page-band py-3">
        <summary className="cursor-pointer text-sm text-muted">Official notes</summary>
        <p className="mb-2 mt-2 text-[10px] text-faint">
          This desk does not write the patch. Official news wins.
        </p>
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
      </details>
  );
}
