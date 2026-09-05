export const BANNER_FONTS = [
  {
    id: "chat",
    name: "Chat",
    note: "RS3 public chat yellow",
    stack: '"RS Chat Bold"',
  },
  {
    id: "bold",
    name: "Bold",
    note: "RS3 interface and level-up",
    stack: '"RS Chat Bold"',
  },
  {
    id: "quill",
    name: "Quill",
    note: "Books and Old School dialogue",
    stack: '"RS Chat Bold"',
  },
] as const;

export type BannerFontId = (typeof BANNER_FONTS)[number]["id"];

export function fontStackFor(id: BannerFontId | string, edition: string) {
  const pack = BANNER_FONTS.find((item) => item.id === id);
  if (pack) return pack.stack;
  return edition === "OSRS" ? BANNER_FONTS[2].stack : BANNER_FONTS[0].stack;
}
