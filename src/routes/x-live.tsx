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
          If you are on the sofa with the X app, use Phone. If you want people to watch the Jagex client — raids, a 99, a wildy walk — use Jagex client. Same title either way. One game name. Say what you are actually doing. Read the list once, then do it in order. You do not need a second tab until a link says so.
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
            <li>Sit down somewhere quiet. Charge the phone or leave it on a lead. Headphones with a mic beat the room mic if people are talking behind you.</li>
            <li>Open the X app. Look at the avatar in the corner. That is the account that will go live. Switch now if it is the wrong one — you cannot swap mid-stream.</li>
            <li>
              Make sure the account is public. Settings → Privacy → Audience. A locked account will not reach a public hall. Followers-only is a choice; just know who can find you.
            </li>
            <li>Tap the composer — the plus, the feather, or the post button, depending on the app version. You want a new post, not a reply.</li>
            <li>
              Along the bottom of that composer you should see Live. Tap it. If it is missing, update the app from the store and try again. Still missing: open{" "}
              <a className="text-parchment" href="https://x.com/" target="_blank" rel="noopener noreferrer">
                x.com
              </a>{" "}
              in the phone browser and look for Live there. X help is the rule if the button moved.
            </li>
            <li>The first time, the phone will ask for camera and microphone. Allow both. If you denied them last month, open the phone’s Settings for X and turn them on, then come back.</li>
            <li>
              Write one honest line: activity, then the game. Example:{" "}
              <span className="font-mono text-xs text-fg">{title}</span>. Skip a wall of hashtags. People tap a sentence they can read.
            </li>
            <li>Look at the preview. Front camera is you talking. Rear camera is the room. Flip until it is the picture you meant. Hold the phone landscape if you want a wide picture; portrait is fine for a chat.</li>
            <li>Give the camera a second to settle. Check you are not pointing at a bank PIN, mail, or a recovery screen. Then tap Go live. You are on. The post appears in your followers’ timelines and on your profile.</li>
            <li>Talk like a clan call. Say hello once so the first three people know you are there. Read names if they show up. You do not need a bit. You need to be in the room.</li>
            <li>
              When you are done, tap Stop (usually top left) and confirm. Wait for it to close. Do not force-quit the app mid-goodbye. Cut a nice moment later on{" "}
              <Link to="/edit" className="text-parchment">
                Clips
              </Link>{" "}
              if you saved a recording to the phone.
            </li>
          </ol>
        </div>

        <div className="overflow-hidden rounded-md border border-[#c6a45a] bg-[#1a1610] shadow-[inset_0_1px_8px_rgba(0,0,0,0.45)]">
          <div className="px-4 py-3">
            <h2 className="page-h1 m-0 text-left">Jagex client</h2>
            <p className="mt-2 text-sm text-muted">
              This is the raid door. You encode in OBS (free). X receives that picture through Live Studio. Desktop RTMP needs X Premium — confirm the current tier on X help, because they move the gate. Capture the game window, not your whole desktop.
            </p>
          </div>
          <div className="h-px bg-[#c6a45a]/80" aria-hidden="true" />
          <ol className="list-decimal space-y-2.5 px-4 py-4 pl-9 text-sm leading-relaxed text-muted">
            <li>Plug into wired ethernet if you can. Wifi will drop a freeze. Close downloads and other streams. You want a quiet line.</li>
            <li>
              Open the{" "}
              <a className="text-parchment" href="https://www.jagex.com/launcher" target="_blank" rel="noopener noreferrer">
                Jagex Launcher
              </a>
              . Start Old School or RuneScape — one client. Log in. Park on a safe square: house, GE, or a bank that is not about to show a PIN.
            </li>
            <li>
              Install{" "}
              <a className="text-parchment" href="https://obsproject.com/" target="_blank" rel="noopener noreferrer">
                OBS Studio
              </a>{" "}
              if you do not have it. Open OBS. You want a blank scene called LIVE. Do not capture the whole desktop.
            </li>
            <li>
              In that scene, click + under Sources → Window Capture (or Game Capture). Pick the Jagex client window by name. If the box is black, pick the other capture type. Crop extra chrome later; first get the game on the canvas.
            </li>
            <li>
              Add Audio Input Capture for your mic. In the mixer, game audio on one slider, mic on another. Speak a sentence. The mic bar should move. Game should sit under your voice, not over it.
            </li>
            <li>
              OBS Settings → Video: canvas 1920×1080 (or 1280×720 if the GPU is busy). FPS 60, or 30 if NXT is hot. Settings → Output → Streaming: encoder NVENC or x264, rate control CBR, bitrate 6000, keyframe 3 seconds, audio AAC 128. Apply. Close settings.
            </li>
            <li>
              Make a second scene called PIN. Cam only, or a still from this desk. Bind that scene to a hotkey now — before you need it. When you bank, you hit that key. The street does not need the pad.
            </li>
            <li>
              On the same computer, open{" "}
              <a className="text-parchment" href="https://x.com/i/live-studio" target="_blank" rel="noopener noreferrer">
                Live Studio
              </a>
              . Sign in on the account you want public. If you cannot open it, you likely need X Premium. Confirm the current tier on{" "}
              <a className="text-parchment" href="https://help.x.com/en/using-x/live-studio" target="_blank" rel="noopener noreferrer">
                X help
              </a>
              . This sheet will not invent the price.
            </li>
            <li>
              Click New livestream. Paste the title from the button below. That string is what the post will say. Public unless you have a reason to test privately first.
            </li>
            <li>
              Sources: create one if this is the first time. Type RTMP. Name it something you will recognise next week — “home” is enough. Region closest to you. Create. Live Studio now shows an RTMP URL and a stream key.
            </li>
            <li>
              Back in OBS: Settings → Stream → Service: Custom. Server = the RTMP URL. Stream key = the secret. Apply. Never paste that key into this site, Discord, or a screenshot. Treat it like a password. You can reuse the same source next session.
            </li>
            <li>
              Hit Start Streaming in OBS. Do not go live on X yet. Look at Live Studio. You should see a preview of the Jagex client. Black preview: wrong window — go back to step 4 and pick again. Audio meters should move when you talk.
            </li>
            <li>
              When the preview looks like the game, click Go Live in Live Studio. The post goes out. Pin it so late arrivals can find you. Say hello. You are in the room.
            </li>
            <li>
              Play. If you bank, hit the PIN scene. If the picture melts, drop to 720p60 in OBS Video settings before you raise bitrate. A clean 720 beats a melted 1080.
            </li>
            <li>
              To finish: Stop Streaming in OBS first, then End in Live Studio. Both, in that order, so the replay closes cleanly. After a kc, drop the file on{" "}
              <Link to="/edit" className="text-parchment">
                Clips
              </Link>{" "}
              , mark In and Out, download the crop you want.
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
            with the X header crop, then download. It is a still, not the live picture. Do it before you go live so you are not painting during a raid.
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
              <li>No Live button: update the app, confirm the account is public, then try x.com in a browser.</li>
              <li>Camera or mic greyed out: phone Settings → X → allow camera and microphone, then reopen Live.</li>
              <li>No Live Studio: you likely need Premium. X help is the rule, not this sheet.</li>
              <li>Black preview: wrong window in OBS. Pick the Jagex client again. Try Game Capture if Window Capture is empty.</li>
              <li>OBS says failed to connect: the key or URL is stale. Make a new RTMP source in Live Studio and paste again — still only into OBS.</li>
              <li>Choppy: drop to 720p60 before you raise bitrate. Close other uploads.</li>
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
