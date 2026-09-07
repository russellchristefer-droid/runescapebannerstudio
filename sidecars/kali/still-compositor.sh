#!/usr/bin/env bash
# Kali wrapper — still compositor. Not an exploit.
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
if ! python3 -c "from PIL import Image" >/dev/null 2>&1; then
  echo "On Kali: sudo apt install -y python3-pil" >&2
  exit 2
fi
exec python3 "$here/../still_desk.py" "$@"
