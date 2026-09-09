import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { BackLink } from "@/components/back-link";
import { readDesk } from "@/desk/store";
import { sanitizeDisplayName, sanitizeWorld } from "@/lib/rsText";
import { pageMeta } from "@/lib/page-title";

export const Route = createFileRoute("/x-live")({
  head: () =>
    pageMeta(
      "X live",
      "A plain walk-through for going live on X. Phone tap, or OBS into Live Studio. This desk never takes a stream key.",
    ),
  component: XLivePage,
});

function titleLine() {
  const saved = readDesk();
  const name = sanitizeDisplayName(saved.streamer ?? "");
  const world = sanitizeWorld(saved.world ?? "");
  const category = saved.edition === "RS3" ? "RuneScape" : "Old School RuneScape";
  return [name || "Display name", world ? `World ${world}` : "", category].filter(Boolean).join(" · ");
}

function XLivePage() {
  const [note, setNote] = useState("");
  const title = titleLine();
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line px-5 py-5 md:px-8">
        <BackLink />
        <h1 className="page-h1 mt-1">X live</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          You can be live in a few minutes. Pick the door that matches what you have in your hands. This page is a walk-through, not a login. We never ask for a stream key.
        </p>
        <span className="mx-auto mt-2 block h-px w-24 bg-[#c6a45a]/80" aria-hidden="true" />
      </header>
      <main id="content" className="mx-auto flex max-w-3xl flex-col gap-8 px-5 py-6 md:px-8">
        <p className="text-sm leading-relaxed text-muted">
          If you are on the sofa with the X app, use Phone. If you want people to watch the Jagex client — raids, a 99, a wildy walk — use Jagex client. Same title either way. One game name. Say what you are actually doing.
        </p>

        <div className="overflow-hidden rounded-md border border-[#c6a45a] bg-[#1a1610] shadow-[inset_0_1px_8px_rgba(0,0,0,0.45)]">
          <div className="px-4 py-3">
            <h2 className="page-h1 m-0 text-left">Phone</h2>
            <p className="mt-2 text-sm text-muted">
              This is the kind door. No OBS, no cables, no stream key. Your account needs to be public. Sit somewhere the mic will not eat the room.
            </p>
          </div>
          <div className="h-px bg-[#c6a45a]/80" aria-hidden="true" />
          <ol className="list-decimal space-y-2.5 px-4 py-4 pl-9 text-sm leading-relaxed text-muted">
            <li>Open the X app and make sure you are on the account you want people to find. A locked account will not reach a public hall.</li>
            <li>Tap the composer (the plus / post button). Along the bottom you should see Live. If you do not, the app is old — update it, or try the same steps on x.com from a phone browser.</li>
            <li>
              Write one honest line: activity, then the game. Example: <span className="font-mono text-xs text-fg">{title}</span>. Skip a wall of hashtags. People tap a sentence they can read.
            </li>
            <li>Give the camera a second to settle, then tap Go live. You are on. Talk like you would in a clan call. Wave once so the first three viewers know you are there.</li>
            <li>
              When you are done, tap Stop and confirm. Do not flip the camera onto a Bank PIN, mail, or recovery. Cut a nice moment later on{" "}
              <Link to="/edit" className="text-parchment">
                Clips
              </Link>
              .
            </li>
          </ol>
        </div>

        <div className="overflow-hidden rounded-md border border-[#c6a45a] bg-[#1a1610] shadow-[inset_0_1px_8px_rgba(0,0,0,0.45)]">
          <div className="px-4 py-3">
            <h2 className="page-h1 m-0 text-left">Jagex client</h2>
            <p className="mt-2 text-sm text-muted">
              This is the raid door. You encode in OBS (free). X receives that picture through Live Studio. Desktop RTMP needs X Premium — confirm the current tier on X help, because they move the gate. Capture the game window, not your whole desktop. Your friends do not need to see the bank pin scene.
            </p>
          </div>
          <div className="h-px bg-[#c6a45a]/80" aria-hidden="true" />
          <ol className="list-decimal space-y-2.5 px-4 py-4 pl-9 text-sm leading-relaxed text-muted">
            <li>
              Install{" "}
              <a className="text-parchment" href="https://obsproject.com/" target="_blank" rel="noopener noreferrer">
                OBS Studio
              </a>{" "}
              if you do not have it. Open the Jagex client from the official launcher and get to a safe square — house, GE, or a BRB still.
            </li>
            <li>
              On a computer, open{" "}
              <a className="text-parchment" href="https://x.com/i/live-studio" target="_blank" rel="noopener noreferrer">
                Live Studio
              </a>
              . Click New livestream. Paste the title from the button below. That string is what the post will say.
            </li>
            <li>
              Make a Source if you do not have one yet: type RTMP, name it something you will recognise next week, pick the region closest to you. Live Studio then shows an RTMP URL and a stream key. Copy those into OBS only — Settings → Stream → Service: Custom. Server is the URL. Stream key is the secret. Never paste that key into this site, Discord, or a screenshot.
            </li>
            <li>
              In OBS, add Window Capture or Game Capture and click the Jagex client. Add your mic. 1080p60 is the comfortable default; 720p60 is cleaner if the GPU is busy in NXT. Video: H.264, CBR 6000 kbps (X will take up to about 9000). Audio: AAC at 128. Keyframe interval 3 seconds at 60fps. That is what X asks for.
            </li>
            <li>
              Hit Start Streaming in OBS first. Live Studio should show a preview of your client. If the preview is black, the capture picked the wrong window — pick again. When it looks like the game, click Go Live. Pin that post so late arrivals can find you.
            </li>
            <li>
              Bind a PIN / login scene to a hotkey before you need it. If you bank, hit that scene. After a kc, drop the file on{" "}
              <Link to="/edit" className="text-parchment">
                Clips
              </Link>{" "}
              and cut In / Out. You are done when you stop OBS and end the livestream in Live Studio — both, in that order, so the VOD closes cleanly.
            </li>
          </ol>
        </div>

        <section>
          <h2 className="mb-2 text-sm font-semibold text-parchment">Title</h2>
          <p className="mb-3 text-sm leading-relaxed text-muted">
            This is pulled from the name and world on your still desk. Change those there if you want a different line. Copy it so the X post and the OBS title match.
          </p>
          <p className="mb-3 flex flex-wrap items-center gap-2 text-sm">
            <button
              type="button"
              className="min-h-11 rounded-md border border-line px-3 py-2 text-parchment"
              onClick={() => {
                void navigator.clipboard.writeText(title);
                setNote("Title copied. Paste it into Live Studio.");
              }}
            >
              Copy title
            </button>
            <span className="font-mono text-xs text-muted">{title}</span>
            {note ? <span className="text-[10px] text-faint">{note}</span> : null}
          </p>
          <p className="text-sm leading-relaxed text-muted">
            Profile header on X likes 1500×500. Make that on the{" "}
            <Link to="/" className="text-parchment">
              still desk
            </Link>{" "}
            with the X header crop, then download. It is a still, not the live picture.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-md border border-line bg-raised px-3 py-3">
            <h3 className="mb-2 text-sm font-semibold text-parchment">OBS, in one glance</h3>
            <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted">
              <li>Service: Custom. Server = the RTMP URL. Key stays in OBS.</li>
              <li>Canvas 1920×1080 or 1280×720. 60fps if the machine is calm; 30 is fine for a bank stand.</li>
              <li>H.264, CBR 6000, keyframe 3s, AAC 128. Wired ethernet if you can. Wifi will drop a freeze.</li>
              <li>Client window only. A second platform at the same time only if the upload still has headroom.</li>
            </ul>
          </div>
          <div className="rounded-md border border-line bg-raised px-3 py-3">
            <h3 className="mb-2 text-sm font-semibold text-parchment">If something sulks</h3>
            <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted">
              <li>No Live button: update the app, or check the account is public.</li>
              <li>No Live Studio: you likely need Premium. X help is the rule, not this sheet.</li>
              <li>Black preview: wrong window in OBS. Pick the Jagex client again.</li>
              <li>Choppy: drop to 720p60 before you raise bitrate. A clean 720 beats a melted 1080.</li>
              <li>Ended early: stop OBS, then end in Live Studio, so the replay saves.</li>
            </ul>
          </div>
        </section>

        <section className="rounded-md border border-line bg-raised px-3 py-3">
          <h3 className="mb-2 text-sm font-semibold text-parchment">Kind rules</h3>
          <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted">
            <li>Do not paste a stream key into this origin, chat, or a screenshot. Treat it like a password.</li>
            <li>Do not capture the desktop, mail, or PIN pad. The street does not need that picture.</li>
            <li>Do not promise Drops you do not control. Official campaigns live on Jagex and X, not this desk.</li>
            <li>In the wild, add a few seconds of delay and skip calling exact tiles. You are allowed to enjoy the fight.</li>
          </ul>
        </section>

        <p className="text-sm leading-relaxed text-muted">
          Official notes, if a button moved:{" "}
          <a className="text-parchment" href="https://help.x.com/en/using-x/x-live" target="_blank" rel="noopener noreferrer">
            Go live on X
          </a>
          {" · "}
          <a className="text-parchment" href="https://help.x.com/en/using-x/live-studio" target="_blank" rel="noopener noreferrer">
            Live Studio
          </a>
          {" · "}
          <a className="text-parchment" href="https://x.com/i/live-studio" target="_blank" rel="noopener noreferrer">
            Open Live Studio
          </a>
          . This is a fan sheet. X keeps the rules. You keep the key.
        </p>
        <p className="text-sm text-parchment">
          <Link to="/stream">Stream</Link>
          {" · "}
          <Link to="/edit">Clips</Link>
          {" · "}
          <Link to="/">Desk</Link>
        </p>
      </main>
    </div>
  );
}
