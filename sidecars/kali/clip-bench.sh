#!/usr/bin/env bash
# Kali wrapper — clip bench. Not an exploit.
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "On Kali: sudo apt install -y ffmpeg" >&2
  exit 2
fi
exec python3 "$here/../clip_bench.py" "$@"
