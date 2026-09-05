import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { loadStudioSave } from "@/lib/studio-save";
import { sanitizeDisplayName, sanitizeWorld } from "@/lib/rsText";
import {
  CHECKLIST,
  DELAY,
  DOWNLOADS,
  ENCODE,
  PLATFORMS,
  SCENES,
  SIZES,
  TITLE_TEMPLATES,
  TWITCH,
  XLIVE,
} from "@/lib/stream-guide";

export function StreamDesk() {
  const saved = loadStudioSave();
  const [copyNote, setCopyNote] = useState("");
  const name = sanitizeDisplayName(saved.streamer ?? "");
  const world = sanitizeWorld(saved.world ?? "");
  const category = saved.edition === "RS3" ? "RuneScape" : "Old School RuneScape";
  const title = [name || "Display name", world ? `World ${world}` : "", category].filter(Boolean).join(" · ");
  return (
    <div id="stream-desk" className="mt-8 overflow-hidden rounded-md border border-[#c6a45a] bg-[#1a1610] shadow-[inset_0_1px_8px_rgba(0,0,0,0.45)]">
      <div className="px-4 py-3">
        <h2 className="page-h1 m-0 text-left">Stream desk</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted">
          This page does not go live for you. Encode in OBS or the official studio app. Capture the Jagex
          client window, not the desktop. Category is Old School RuneScape or RuneScape.
          Cut a kill on the clip bench above, then use the notes below to title, size, and start the stream.
        </p>
      </div>
      <div className="h-px bg-[#c6a45a]/80" aria-hidden="true" />

      <div className="flex flex-col gap-8 px-4 py-5">
        <section>
          <h3 className="mb-2 text-sm font-semibold text-parchment">How a session runs</h3>
          <ol className="list-decimal space-y-1.5 pl-5 text-sm text-muted">
            <li>Open the official client from the Jagex Launcher. World and PIN stay off the capture.</li>
            <li>In OBS, Game Capture or Window Capture the client only. Add the banner JPEG as a top or lower-third overlay if you want one.</li>
            <li>Set the category to one game. Copy a title from the table. Check bitrate for your canvas.</li>
            <li>Go live from the official dashboard. After a kill, drop the VOD on the clip bench, set In and Out, Save clip.</li>
            <li>Upload that file to YouTube, TikTok, or Discord yourself. This desk never takes a stream key.</li>
          </ol>
        </section>

        <section>
          <h3 className="mb-3 text-sm font-semibold text-parchment">Downloads</h3>
          <ul className="grid gap-2 sm:grid-cols-2">
            {DOWNLOADS.map((item) => (
              <li key={item.href} className="rounded-md border border-line bg-raised px-3 py-2">
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-sm text-parchment">
                  {item.name}
                </a>
                <p className="text-xs text-muted">{item.note}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {PLATFORMS.map((pack) => (
            <div key={pack.id} className="rounded-md border border-line bg-raised px-3 py-3">
              <h3 className="mb-2 text-sm font-semibold text-parchment">{pack.title}</h3>
              <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted">
                {pack.body.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h3 className="mb-2 text-sm font-semibold text-parchment">Titles</h3>
          <p className="mb-3 text-xs text-muted">Edition · activity · mode · world. Keep it under about 60 characters. One game name.</p>
          <p className="mb-3 flex flex-wrap items-center gap-2 text-sm">
            <button
              type="button"
              className="rounded-md border border-line px-3 py-2 text-parchment"
              onClick={() => {
                void navigator.clipboard.writeText(title);
                setCopyNote("Title copied.");
              }}
            >
              Copy title
            </button>
            <span className="font-mono text-xs text-muted">{title}</span>
            {copyNote ? <span className="text-[10px] text-faint">{copyNote}</span> : null}
          </p>
          <div className="overflow-x-auto rounded-md border border-line">
            <table className="w-full text-left text-sm">
              <tbody>
                {TITLE_TEMPLATES.map((row) => (
                  <tr key={row.use} className="border-t border-line first:border-t-0">
                    <th className="w-44 px-3 py-2 align-top text-xs font-medium text-faint">{row.use.toUpperCase()}</th>
                    <td className="px-3 py-2 font-mono text-xs text-fg">{row.text}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-parchment">Sizes</h3>
            <div className="overflow-x-auto rounded-md border border-line">
              <table className="w-full text-left text-sm">
                <tbody>
                  {SIZES.map((row) => (
                    <tr key={row.where} className="border-t border-line first:border-t-0">
                      <th className="px-3 py-2 text-xs font-medium text-faint">{row.where.toUpperCase()}</th>
                      <td className="px-3 py-2 font-mono text-xs">{row.size}</td>
                      <td className="px-3 py-2 text-xs text-muted">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-parchment">Encode</h3>
            <div className="overflow-x-auto rounded-md border border-line">
              <table className="w-full text-left text-sm">
                <tbody>
                  {ENCODE.map((row) => (
                    <tr key={row.setup} className="border-t border-line first:border-t-0">
                      <th className="px-3 py-2 text-xs font-medium text-faint">{row.setup.toUpperCase()}</th>
                      <td className="px-3 py-2 font-mono text-xs">{row.bitrate}</td>
                      <td className="px-3 py-2 text-xs text-muted">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-parchment">Delay</h3>
            <div className="overflow-x-auto rounded-md border border-line">
              <table className="w-full text-left text-sm">
                <tbody>
                  {DELAY.map((row) => (
                    <tr key={row.place} className="border-t border-line first:border-t-0">
                      <th className="px-3 py-2 text-xs font-medium text-faint">{row.place.toUpperCase()}</th>
                      <td className="px-3 py-2 font-mono text-xs">{row.delay}</td>
                      <td className="px-3 py-2 text-xs text-muted">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-parchment">Scenes</h3>
            <div className="overflow-x-auto rounded-md border border-line">
              <table className="w-full text-left text-sm">
                <tbody>
                  {SCENES.map((row) => (
                    <tr key={row.name} className="border-t border-line first:border-t-0">
                      <th className="px-3 py-2 font-mono text-xs">{row.name}</th>
                      <td className="px-3 py-2 text-xs text-muted">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-md border border-line bg-raised px-3 py-3">
            <h3 className="mb-2 text-sm font-semibold text-parchment">Twitch</h3>
            <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted">
              {TWITCH.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-md border border-line bg-raised px-3 py-3">
            <h3 className="mb-2 text-sm font-semibold text-parchment">X</h3>
            <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted">
              {XLIVE.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </section>

        <section>
          <h3 className="mb-3 text-sm font-semibold text-parchment">Before you go live</h3>
          <ul className="grid gap-2 sm:grid-cols-2">
            {CHECKLIST.map((item) => (
              <li key={item} className="rounded-md border border-line bg-raised px-3 py-2 text-sm">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <p className="text-xs text-faint">
          Fan notes, not a Jagex or Twitch handbook.{" "}
          <Link to="/streamers" className="text-parchment">
            Streamers
          </Link>
          {" · "}
          <Link to="/youtubers" className="text-parchment">
            Youtubers
          </Link>
        </p>
      </div>
    </div>
  );
}
