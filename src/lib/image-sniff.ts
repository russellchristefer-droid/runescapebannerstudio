export async function sniffUpload(file: File) {
  if (/\.hei[c|f]$/i.test(file.name) || file.type === "image/heic" || file.type === "image/heif") {
    return "heic" as const;
  }
  if (file.size > 4_000_000) return "large" as const;
  const buf = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  const jpeg = buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
  const png =
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47;
  if (jpeg || png) return "ok" as const;
  return "other" as const;
}

export async function isJpegOrPng(file: File) {
  return (await sniffUpload(file)) === "ok";
}
