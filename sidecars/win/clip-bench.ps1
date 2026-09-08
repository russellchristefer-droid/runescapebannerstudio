# Windows sidecar — clip bench. Requires Python 3 + ffmpeg on PATH.
$ErrorActionPreference = "Stop"
$py = Join-Path $PSScriptRoot "..\clip_bench.py"
$python = Get-Command python3 -ErrorAction SilentlyContinue
if (-not $python) { $python = Get-Command python -ErrorAction SilentlyContinue }
if (-not $python) { Write-Error "Install Python 3, then run this file again."; exit 2 }
& $python.Source $py @args
exit $LASTEXITCODE
