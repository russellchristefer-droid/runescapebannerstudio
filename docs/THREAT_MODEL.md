# Threat model — RuneScape Banner Studio

Fan desk. Not Jagex. Assets are small. Controls must match.

## Assets and controls

| Asset | Threat | Control |
| --- | --- | --- |
| Hiscores proxy | SSRF, scrape-amplification | HTTPS allowlist, timeout, no client cookies, cache, User-Agent |
| Upload → canvas | Polyglot, pixel bomb | Magic bytes, 4 MB cap, same-origin blob, redraw, revoke |
| Display name / clan | XSS, path injection | Schema, React text, filename sanitiser |
| Stills bandwidth | Hotlink | Hosted under `/locations`, version query |
| Reputation | Looks-like-Jagex | No login, Fan Content Policy sentence, `/jagex` → directory |
| Mailbox | Form spam | Mail draft only; no SMTP in this pass |
| Supply chain | Bad npm publish | Lockfile, `npm ci` in CI |
| Preview deploys | Indexing drafts | Preview may `noindex`; production meta is `index,follow` |

## STRIDE (short)

**Proxy.** Spoofing is limited because we do not send cookies. Tampering is a forged name; we sanitise. Repudiation is not relevant. Information disclosure is a public hiscore. Denial is rate and timeout. Elevation is SSRF — blocked by allowlist.

**Upload.** Spoofing MIME is sniffed. Tampering is a polyglot — rejected. Disclosure is EXIF; we do not re-serve the original. Denial is a huge decode — byte cap. Elevation is script-in-image — canvas redraw.

**Desk state.** LocalStorage only. Tampering is a bad JSON blob — schema drop. Disclosure is a shared computer — Clear saved desk.
