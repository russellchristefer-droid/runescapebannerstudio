# Edge

Origin: `https://runescapebannerstudio.grok.me/`

- HTTPS only. We do not own `grok.me`. Do **not** HSTS-preload that suffix.
- Preview hostnames should stay `noindex`. Production meta is `index,follow`.
- WAF: challenge `/api/*` floods if the panel allows. Do not lock the gazetteer.
- 0-RTT: do not enable on the hiscores proxy.
- CAA / DNSSEC: only if the grok.me operator sets them. Do not copy a blog CAA.
- Backup of the public zone is not ours to export.
