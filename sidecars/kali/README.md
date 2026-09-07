# Kali Linux sidecars

These run **on** Kali as ordinary Python tools. They are not attack scripts.
They do not scan the live site. They do not ship nmap, hydra, or Metasploit.

Kali is Debian. Use `apt` for the libraries, then the same two files as everywhere else.

```bash
sudo apt update
sudo apt install -y python3 python3-pil ffmpeg
python3 sidecars/still_desk.py --still public/Falador.png --name Christefer --out /tmp/banner.jpg
python3 sidecars/clip_bench.py public/media/poh.mp4 --in 0 --out 3 --write /tmp/clip.webm --mute
```

Or the wrappers in this folder:

```bash
sidecars/kali/still-compositor.sh --still public/Falador.png --name Christefer
sidecars/kali/clip-bench.sh public/media/poh.mp4 --in 0 --out 3 --mute
```

Pillow: `python3-pil` from apt. Do not `pip install` as root unless you know why.
ffmpeg must be on `PATH` for the clip bench.

RuneScape® and Old School RuneScape® are Jagex Limited trademarks.
