export const BANNER_FONTS = [
  {
    id: "chat",
    name: "Chat",
    note: "RS3 public chat yellow",
    stack: "'Source Sans 3', Arial, sans-serif",
  },
  {
    id: "bold",
    name: "Bold",
    note: "RS3 interface and level-up",
    stack: "'Source Sans 3', Arial, sans-serif",
  },
  {
    id: "quill",
    name: "Quill",
    note: "Books and Old School dialogue",
    stack: "Fondamento, 'Times New Roman', serif",
  },
] as const;

export type BannerFontId = (typeof BANNER_FONTS)[number]["id"];

export function fontStackFor(id: BannerFontId | string, edition: string) {
  const pack = BANNER_FONTS.find((item) => item.id === id);
  if (pack) return pack.stack;
  return edition === "OSRS" ? BANNER_FONTS[2].stack : BANNER_FONTS[0].stack;
}
