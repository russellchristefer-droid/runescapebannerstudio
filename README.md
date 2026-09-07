# RuneScape Banner Studio

Independent fan desk. Not Jagex. Not a client. Not an overlay.

**Live:** [runescapebannerstudio.grok.me](https://runescapebannerstudio.grok.me/)

```
public   github.com/russellchristefer-droid/runescapebannerstudio
private  github.com/russellchristefer-droid/runescapebannerstudio-private
```

A browser compositor that writes a **JPEG** at platform pixels, plus the halls a streamer actually opens: towns, gods, bosses, PvP (Old School), a local clip bench, streamer / YouTuber directories.

## Why this tree looks like this

Two live games. Two inventories. Two streets. The code keeps that split on purpose.

| Rule | Where it lives |
| --- | --- |
| OSRS and RS3 never share a still, a street quote, or a skill pack | `src/lib/locations.ts`, `src/data/streetTalk.ts`, `src/lib/skills.ts` |
| Plate type is RS Chat Bold, yellow, black edge | `src/lib/draw-banner.ts` · `paintRSYellow` |
| Pack layout fits the export box (icons + levels) | `src/desk/compositor.ts` |
| Random stills are local era files, not live Wayback | `src/desk/eraPool.ts` · `public/era/` |
| Hiscores and live badges fail-soft | `server/api/hiscores.get.ts`, `server/api/live.get.ts` |
| Clip Save records the processed graph (mute / gain / fades) | `src/edit/clipSound.ts` |
| Official news and the wiki win on numbers | halls + `/legal` |

Decisions are short ADRs under [`docs/adr/`](docs/adr/).

## Stack

| Layer | Choice |
| --- | --- |
| UI | React 19, TanStack Router / Start |
| Build | Vite 8, Node **22** |
| Plate | Canvas 2D, one painter |
| Clips | `MediaRecorder` + Web Audio, WebM |
| CI | `.github/workflows/ci.yml` → `npm run ci:gates` then `npm run build` |

No Python sidecar. No second Vite. Tokens stay in env, never in git.

## Layout engineers actually open

```
src/desk/       compositor, store, still hook, era pool
src/places/     PlaceRail + cards (one switcher)
src/edit/       clip bench + sound graph
src/legal/      operator notice
src/lib/        catalogs, yellow paint, hiscores, PvP sheet
src/routes/     file routes (TanStack)
public/         stills, skills, marks, fonts, era plates
server/api/     hiscores + live probes
```

## Clone

```bash
git clone https://github.com/russellchristefer-droid/runescapebannerstudio.git
cd runescapebannerstudio
npm ci
npm run dev
```

```bash
npm run ci:gates    # tsc + unit + grep
npm run build
npm run preview
```

Line endings are `LF` ([.gitattributes](.gitattributes)). Phone: use the live site; there is no App Store build.

## Optional env (never commit)

```
TWITCH_CLIENT_ID=
TWITCH_APP_TOKEN=
YOUTUBE_API_KEY=
```

Empty keys → halls render with `Live check is off.` That is correct.

## Policy

Stills are identification. Jagex property stays named. Fan policy is on Legal.

- [Legal](https://runescapebannerstudio.grok.me/legal)
- [SECURITY.md](SECURITY.md)
- [NOTICE](NOTICE)
- [CONTRIBUTING.md](CONTRIBUTING.md)
- [Jagex Fan Content Policy](https://legal.jagex.com/docs/policies/fan-content-policy)

## License

[LICENSE](LICENSE) + [NOTICE](NOTICE). RuneScape © Jagex. Operator: Christefer Lee Russell-Barnett.
