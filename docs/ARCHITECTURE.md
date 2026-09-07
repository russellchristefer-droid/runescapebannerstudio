# Architecture

One site. The desk is a canvas. Routes are files. Pictures live in `public/`.

```
card picture  →  desk store  →  paint  →  JPEG
PlaceRail     →  /towns  /gods  /bosses  /pvp
/edit         →  clip + Web Audio  →  WebM
```

There is one of each:

- PlaceRail — towns, gods, bosses, PvP, then the canon
- desk store — name, clan, still, stamps
- paintRSYellow — the plate and the lower third
- useStill — cards and Use on banner
- layoutPack — Fit / Room / Desk so the grid stays on the banner
- clipSound — mute, gain, fades, meter; Save records that graph

Rules we do not bend:

1. Old School and RuneScape 3 catalogs stay apart.
2. A missing picture is skipped or falls back to Falador. The plate is never blank on purpose.
3. preventDefault only on Use on banner and when you drag a stamp.
4. The browser does not scrape the wiki or Wayback.
5. `.env` does not go in git.

`npm run ci:gates` typechecks, runs the small tests, and greps for the obvious foot-guns. If that is red, we do not ship.
