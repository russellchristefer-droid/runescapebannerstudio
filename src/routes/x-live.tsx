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
      "Go live on X. Phone tap, or OBS into Live Studio. This desk never takes a stream key.",
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
          Two doors. Phone is one tap. The Jagex client goes through Live Studio and OBS. This page never takes a stream key.
        </p>
        <span className="mx-auto mt-2 block h-px w-24 bg-[#c6a45a]/80" aria-hidden="true" />
      </header>
      <main id="content" className="mx-auto flex max-w-3xl flex-col gap-8 px-5 py-6 md:px-8">
        <div className="overflow-hidden rounded-md border border-[#c6a45a] bg-[#1a1610] shadow-[inset_0_1px_8px_rgba(0,0,0,0.45)]">
          <div className="px-4 py-3">
            <h2 className="page-h1 m-0 text-left">Phone</h2>
            <p className="mt-2 text-sm text-muted">Fastest path. Public account. No OBS.</p>
          </div>
          <div className="h-px bg-[#c6a45a]/80" aria-hidden="true" />
          <ol className="list-decimal space-y-2 px-4 py-4 pl-9 text-sm text-muted">
            <li>Open the X app.</li>
            <li>Tap the composer, then Live.</li>
            <li>One line of text. Say the activity. One game name.</li>
            <li>Tap Go live.</li>
            <li>Stop when you are done. Do not show a Bank PIN.</li>
          </ol>
        </div>

        <div className="overflow-hidden rounded-md border border-[#c6a45a] bg-[#1a1610] shadow-[inset_0_1px_8px_rgba(0,0,0,0.45)]">
          <div className="px-4 py-3">
            <h2 className="page-h1 m-0 text-left">Jagex client</h2>
            <p className="mt-2 text-sm text-muted">
              Desktop RTMP needs X Premium. Confirm the current tier on X help. Encode in OBS. Capture the client window, not the desktop.
            </p>
          </div>
          <div className="h-px bg-[#c6a45a]/80" aria-hidden="true" />
          <ol className="list-decimal space-y-2 px-4 py-4 pl-9 text-sm text-muted">
            <li>
              Open{" "}
              <a className="text-parchment" href="https://x.com/i/live-studio" target="_blank" rel="noopener noreferrer">
                Live Studio
              </a>
              . New livestream. Title from the line below.
            </li>
            <li>Create or pick a Source. Type RTMP. Region closest to you. Copy the RTMP URL and stream key into OBS only — Settings → Stream → Custom.</li>
            <li>OBS: Window Capture or Game Capture the Jagex client. 1080p60, H.264, CBR 6000 (X allows up to about 9000). Audio AAC 128. Keyframe 3 seconds at 60fps.</li>
            <li>Start Streaming in OBS. When Live Studio shows the preview, Go Live. Pin the post with the same title.</li>
            <li>PIN / login scene stays a hotkey. This desk never stores the key.</li>
          </ol>
        </div>

        <section>
          <h2 className="mb-2 text-sm font-semibold text-parchment">Title</h2>
          <p className="mb-3 flex flex-wrap items-center gap-2 text-sm">
            <button
              type="button"
              className="min-h-11 rounded-md border border-line px-3 py-2 text-parchment"
              onClick={() => {
                void navigator.clipboard.writeText(title);
                setNote("Title copied.");
              }}
            >
              Copy title
            </button>
            <span className="font-mono text-xs text-muted">{title}</span>
            {note ? <span className="text-[10px] text-faint">{note}</span> : null}
          </p>
          <p className="text-xs text-muted">
            Header still is 1500×500 — download{" "}
            <Link to="/" className="text-parchment">
              X header
            </Link>{" "}
            from the still desk. Cut a kill on{" "}
            <Link to="/edit" className="text-parchment">
              Clips
            </Link>
            .
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-md border border-line bg-raised px-3 py-3">
            <h3 className="mb-2 text-sm font-semibold text-parchment">OBS for X</h3>
            <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted">
              <li>Service: Custom. Server = RTMP URL. Key stays in OBS.</li>
              <li>1920×1080 or 1280×720. 60fps if the GPU is calm.</li>
              <li>H.264 CBR 6000. Keyframe 3s. AAC 128.</li>
              <li>Client window only. Dual-stream only if the upload is honest.</li>
            </ul>
          </div>
          <div className="rounded-md border border-line bg-raised px-3 py-3">
            <h3 className="mb-2 text-sm font-semibold text-parchment">Do not</h3>
            <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted">
              <li>Paste a stream key into this origin.</li>
              <li>Capture the desktop, mail, or PIN pad.</li>
              <li>Promise Drops you do not control.</li>
              <li>Call tiles in the wild on 0 delay.</li>
            </ul>
          </div>
        </section>

        <p className="text-sm text-muted">
          Official notes:{" "}
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
          . Fan sheet. X keeps the rules.
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
