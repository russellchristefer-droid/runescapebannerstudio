#!/usr/bin/env python3
"""Clip bench — one-file Python sidecar.

Not the website editor. The live bench stays in the browser.

  python3 clip_bench.py trim clip.mp4 --in 2 --out 8 --size 1280x720
  python3 clip_bench.py trim clip.mp4 --mute --fade-in 0.5 --fade-out 0.5

Needs ffmpeg on PATH. This file does not ship a codec.
"""

from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SIZES = {
    "1920x1080": (1920, 1080),
    "1280x720": (1280, 720),
    "1080x1920": (1080, 1920),
    "1080x1080": (1080, 1080),
    "1200x480": (1200, 480),
}


def ffmpeg_bin() -> str | None:
    return shutil.which("ffmpeg")


def trim(
    src: Path,
    out: Path,
    in_t: float,
    out_t: float,
    size_id: str,
    mute: bool,
    fade_in: float,
    fade_out: float,
    gain: float,
) -> int:
    bin_ = ffmpeg_bin()
    if not bin_:
        print("ffmpeg is not on PATH. Install ffmpeg, then run this file again.", file=sys.stderr)
        return 2
    if not src.is_file():
        print(f"No clip at {src}", file=sys.stderr)
        return 1
    w, h = SIZES.get(size_id, SIZES["1280x720"])
    span = max(0.05, out_t - in_t)
    vf = [f"scale={w}:{h}:force_original_aspect_ratio=increase", f"crop={w}:{h}"]
    if fade_in > 0:
        vf.append(f"fade=t=in:st=0:d={fade_in}")
    if fade_out > 0:
        start = max(0.0, span - fade_out)
        vf.append(f"fade=t=out:st={start}:d={fade_out}")
    cmd = [
        bin_,
        "-y",
        "-ss",
        str(max(0.0, in_t)),
        "-to",
        str(max(in_t + 0.05, out_t)),
        "-i",
        str(src),
        "-vf",
        ",".join(vf),
        "-c:v",
        "libvpx-vp9",
        "-b:v",
        "2M",
    ]
    if mute:
        cmd += ["-an"]
    else:
        af = []
        if gain != 1:
            af.append(f"volume={max(0.0, min(2.0, gain))}")
        if fade_in > 0:
            af.append(f"afade=t=in:st=0:d={fade_in}")
        if fade_out > 0:
            start = max(0.0, span - fade_out)
            af.append(f"afade=t=out:st={start}:d={fade_out}")
        if af:
            cmd += ["-af", ",".join(af)]
        cmd += ["-c:a", "libopus"]
    cmd.append(str(out))
    out.parent.mkdir(parents=True, exist_ok=True)
    run = subprocess.run(cmd, capture_output=True, text=True)
    if run.returncode != 0:
        print(run.stderr[-800:] or "ffmpeg failed.", file=sys.stderr)
        return 1
    print(f"Wrote {out} ({w}x{h})")
    return 0


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(description="Python clip bench sidecar.")
    p.add_argument("clip", type=Path, help="Source video you own")
    p.add_argument("--in", dest="in_t", type=float, default=0.0)
    p.add_argument("--out", dest="out_t", type=float, default=6.0)
    p.add_argument("--size", default="1280x720", choices=list(SIZES))
    p.add_argument("--write", type=Path, default=ROOT / "clip-out.webm")
    p.add_argument("--mute", action="store_true")
    p.add_argument("--fade-in", type=float, default=0.0)
    p.add_argument("--fade-out", type=float, default=0.0)
    p.add_argument("--gain", type=float, default=1.0, help="Linear gain 0–2")
    args = p.parse_args(argv)
    return trim(args.clip, args.write, args.in_t, args.out_t, args.size, args.mute, args.fade_in, args.fade_out, args.gain)


if __name__ == "__main__":
    raise SystemExit(main())
