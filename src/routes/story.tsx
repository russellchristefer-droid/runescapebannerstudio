import { Link, createFileRoute } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";
import { pageTitle } from "@/lib/page-title";

export const Route = createFileRoute("/story")({
  head: () => ({ meta: [{ title: pageTitle("What this is") }] }),
  component: StoryPage,
});

function StoryPage() {
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
        <h1 className="page-h1 mt-1">A yellow name</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Notes on famous players and the feelings Gielinor taught. Not Jagex. Not a ranking.
        </p>
        <span className="mt-2 block h-px w-24 bg-[#c6a45a]/80" aria-hidden="true" />
      </header>
      <main id="content" className="mx-auto flex max-w-3xl flex-col gap-4 px-5 py-6 text-sm leading-relaxed text-muted md:px-8">
        <p>
          A display name is twelve characters and a mask. In RuneScape the mask is the person.
          You meet a string, not a face. Trust attaches to letters the way a prayer attaches to
          a god: by repetition, by risk, by the colour of the text. Yellow is not decoration.
          It is the sign that a body is speaking in the world.
        </p>
        <p>
          Before streams, the hiscores were the public liturgy. Zezima became a common noun for
          “the one who finished the book.” People typed the name into the board the way earlier
          ages looked up a saint. The feeling was not only respect. It was envy wearing courtesy.
          To see a skill at 99 was to feel a private deficit you could not spend gold to close.
          That deficit is the first illicit emotion of the game: wanting another player’s time.
        </p>
        <p>
          Partyhats taught a second lesson. A paper crown from a Christmas event became a sign
          for rare. The sign outlived the event. Trade windows turned into theatres. You offered
          a thing you could lose. You watched the other name hesitate. Luring, scamming, and the
          long pause before Accept are the same grammar: desire arranged as a sentence. Jagex
          wrote rules against real-world trading and impersonation. Players still felt the pull.
          This desk does not sell gold. It only admits that the pull was real.
        </p>
        <p>
          The Wilderness is where that grammar became landscape. White dots on a map. A name
          turning skull. Durial321’s old clip is remembered not because a number died but because
          a crowd learned to watch death as sport and then to feel ashamed of the watching.
          PKing is legal in that place. The illicit part is the aftertaste: laughter that arrives
          too fast, then the quiet walk back from Lumbridge.
        </p>
        <p>
          2012’s Evolution of Combat split the sign-system. One client kept the old verbs. One
          learned new ones. In 2013 Old School RuneScape opened from a 2007 backup because enough
          people voted to keep a dead dialect alive. Lynx Titan later wrote two hundred million
          into every skill in that dialect. Woox treated raids as solvable sentences. B0aty and
          the early streamers turned private grind into public weather. None of them are this
          studio. Their names are history, not a roster we speak for.
        </p>
        <p>
          What repeats is the same small crime of feeling. You want a cape you have not earned.
          You want a name to stay. You want the board to say you were here. Gielinor lets that
          want wear a joke and a skill icon. The joke is the permit. Under it, players have been
          grieving, gloating, and hoping in the same twelve characters since Classic.
        </p>
        <p className="text-parchment">
          <Link to="/">Desk</Link>
          {" · "}
          <Link to="/brief">Brief</Link>
          {" · "}
          <Link to="/legal">Legal</Link>
        </p>
      </main>
    </div>
  );
}
