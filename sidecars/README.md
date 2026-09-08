# Sidecars

**Players start with Alt1 and RuneLite** — [overlays/README.md](../overlays/README.md).
Those are the prominent client apps.

These files are extra downloads GitHub will highlight as real languages. They are not the website.

| Kind | Still compositor | Clip bench |
| --- | --- | --- |
| Alt1 (prominent) | [overlays/desk/alt1](../overlays/desk/alt1) | [overlays/clips/alt1](../overlays/clips/alt1) |
| RuneLite (prominent) | [BannerStudioPlugin.java](../overlays/runelite/src/main/java/com/bannerstudio/BannerStudioPlugin.java) | [ClipBenchPlugin.java](../overlays/runelite/src/main/java/com/bannerstudio/ClipBenchPlugin.java) |
| Python | [still_desk.py](still_desk.py) | [clip_bench.py](clip_bench.py) |
| Node 22 | [node/still-desk.mjs](node/still-desk.mjs) | [node/clip-bench.mjs](node/clip-bench.mjs) |
| Kali / bash | [kali/still-compositor.sh](kali/still-compositor.sh) | [kali/clip-bench.sh](kali/clip-bench.sh) |
| Windows PowerShell | [win/still-desk.ps1](win/still-desk.ps1) | [win/clip-bench.ps1](win/clip-bench.ps1) |

```bash
python3 sidecars/still_desk.py --still public/Falador.png --name Christefer
node sidecars/node/still-desk.mjs --still public/Falador.png --name Christefer
python3 sidecars/clip_bench.py clip.mp4 --in 2 --out 8
node sidecars/node/clip-bench.mjs clip.mp4 --in 2 --out 8
```

Node and PowerShell call the Python benches so the file on disk is the same. They do not scan hosts.
