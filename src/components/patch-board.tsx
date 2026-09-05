import { PATCH_LINKS } from "@/lib/patches";

export function PatchBoard() {
  return (
    <div className="mt-4 flex flex-col gap-4">
      <p className="text-[10px] text-faint">
        This desk does not write the patch. Official news wins.
      </p>
      {PATCH_LINKS.map((col) => (
        <section key={col.title}>
          <h2 className="mb-2 text-xs tracking-[0.16em] text-parchment">{col.title}</h2>
          <ul className="flex flex-col gap-1.5 text-sm">
            {col.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-parchment">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
