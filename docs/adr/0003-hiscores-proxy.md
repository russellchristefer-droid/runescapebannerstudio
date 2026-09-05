# 0003 Hiscores proxy

Context: Jagex hiscores have no CORS. Rules frown on hammering.

Decision: Server proxy, Jagex first. Wise Old Man is OSRS fallback only.

Consequences: RS3 never calls WOM. Timeouts do not block JPEG export.
