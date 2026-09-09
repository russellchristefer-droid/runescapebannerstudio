import { Link, createFileRoute } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";
import { OfficialSites } from "@/components/official-sites";
import { DISCORD_HALL, discordGameLabel, type DiscordDoor } from "@/data/discord-hall";
import { pageMeta } from "@/lib/page-title";

export const Route = createFileRoute("/discord")({
  head: () =>
    pageMeta(
      "Discord",
      "Official Old School RuneScape, RuneScape, and Dragonwilds Discord invites. Then the wiki and tools. Not Jagex login.",
    ),
  component: DiscordPage,
});

function Row({ row }: { row: DiscordDoor }) {
  return (
    <li>
      <a
        href={row.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-11 items-center justify-between gap-3 rounded-md border border-line bg-raised px-3 py-3 [touch-action:manipulation]"
      >
        <span>
          <span className="block text-sm font-medium">{row.name}</span>
          <span className="text-xs text-muted">{row.note}</span>
        </span>
        <span className="shrink-0 text-sm text-parchment">
          {row.official ? "Official" : discordGameLabel(row.game)}
        </span>
      </a>
    </li>
  );
}

function DiscordPage() {
  const official = DISCORD_HALL.filter((row) => row.official);
  const rest = DISCORD_HALL.filter((row) => !row.official);
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
        <h1 className="page-h1 mt-1">Discord</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Official Jagex® servers first. Then the wiki and tools this desk already names. Not a clan dump. This origin does not host Discord®. Do not paste a Bank PIN, a stream key, or a Jagex account.
        </p>
        <span className="mx-auto mt-2 block h-px w-24 bg-[#c6a45a]/80" aria-hidden="true" />
      </header>
      <main id="content" className="mx-auto flex max-w-3xl flex-col gap-8 px-5 py-6 md:px-8">
        <OfficialSites />
        <section>
          <h2 className="mb-3 text-sm font-semibold text-parchment">Official</h2>
          <ul className="flex flex-col gap-2">
            {official.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </ul>
        </section>
        <section>
          <h2 className="mb-3 text-sm font-semibold text-parchment">Tools</h2>
          <p className="mb-3 text-xs text-muted">
            Not Jagex. Invites go to those projects. Fake “J-Mod” Discords are how accounts walk. Use these links, not a stranger in the Wilderness.
          </p>
          <ul className="flex flex-col gap-2">
            {rest.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </ul>
        </section>
        <p className="text-sm text-muted">
          Discord® is a trademark of Discord Inc. RuneScape®, Old School RuneScape®, RuneScape: Dragonwilds™, and Jagex® are trademarks of Jagex Limited. Support stays on{" "}
          <a className="text-parchment" href="https://support.jagex.com/" target="_blank" rel="noopener noreferrer">
            Jagex Support
          </a>
          . Discord is not a ban appeal.
        </p>
        <p className="text-sm text-parchment">
          <Link to="/">Desk</Link>
          {" · "}
          <Link to="/knowledge">Sites</Link>
          {" · "}
          <Link to="/jmods">Jagex directory</Link>
          {" · "}
          <Link to="/streamers">Twitch Streamers</Link>
          {" · "}
          <Link to="/legal">Legal</Link>
        </p>
      </main>
    </div>
  );
}
