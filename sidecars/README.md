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
python3 sidecars/still_desk.py --still public/Falador.jpg --name Christefer
python3 sidecars/still_desk.py --still public/Falador.jpg --size native --out banner.jpg
node sidecars/node/still-desk.mjs --still public/Falador.jpg --name Christefer --size 1280x720
python3 sidecars/clip_bench.py clip.mp4 --in 2 --out 8 --size 9:16 --pack balanced
python3 sidecars/clip_bench.py clip.mp4 --in 2 --out 8 --still public/Falador.jpg --write clip.mp4
node sidecars/node/clip-bench.mjs clip.mp4 --in 2 --out 8 --size banner --mute --pack small
```

Still crops: `1200x480` `1280x720` `1920x1080` `1920x480` `native`.
Clip crops: `16:9-1080` `16:9-720` `9:16` (default) `1:1` `banner` `native`.
Clip pack: `small` 4 Mbps · `balanced` 6.5 Mbps · `high` 10 Mbps. VBR. One encode. In→Out only. Does not upscale a smaller source.
Clip files are **MP4** (H.264 + AAC). `--still` cover-crops a photo onto the frame the same way the website bench does.

The live site also has Desk banner (Save for clips) with Remove banner, plus Upload still / Remove still. These sidecars do the file job without the browser chrome.

Node and PowerShell call the Python benches so the file on disk is the same. They do not scan hosts.

RuneScape®, Old School RuneScape®, and Jagex® are trademarks of Jagex Limited. These files are not Jagex products.
