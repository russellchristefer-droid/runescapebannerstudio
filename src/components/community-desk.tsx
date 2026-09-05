import { DESK_GROUPS } from "@/lib/community-desk";

export function CommunityDesk() {
  return (
    <section className="border-b border-line px-3 py-3 md:px-8">
      <h2 className="mb-3 text-center text-sm font-semibold">Streamer desk</h2>
      <div className="mx-auto flex max-w-4xl flex-col gap-4">
        {DESK_GROUPS.map((group) => (
          <div key={group.title}>
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-5">
              {group.items.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target={item.href.startsWith("/") ? undefined : "_blank"}
                    rel={item.href.startsWith("/") ? undefined : "noreferrer"}
                    className="block rounded-md border border-line bg-raised px-3 py-2"
                  >
                    <span className="block text-sm font-medium">{item.name}</span>
                    <span className="block text-[11px] text-faint">{item.note}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
