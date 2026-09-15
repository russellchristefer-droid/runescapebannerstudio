# Kali Linux sidecars

Not attack tooling. Wrappers around the Python still compositor and clip bench.
They need `python3-pil` and `ffmpeg`. They do not scan hosts.

```bash
sudo apt install -y python3-pil ffmpeg
python3 sidecars/still_desk.py --still public/Falador.png --name Christefer --out /tmp/banner.jpg
python3 sidecars/clip_bench.py public/media/poh.mp4 --in 0 --out 3 --write /tmp/clip.webm --mute
```

Same through the wrappers:

```bash
sidecars/kali/still-compositor.sh --still public/Falador.png --name Christefer
sidecars/kali/clip-bench.sh public/media/poh.mp4 --in 0 --out 3 --mute
```

RuneScape® and Old School RuneScape® are trademarks of Jagex Limited.
