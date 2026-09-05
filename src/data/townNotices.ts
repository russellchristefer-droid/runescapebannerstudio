export type TownNotice = {
  slug: string;
  game: "osrs" | "rs3";
  date: string;
  line: string;
  url: string;
  kind: "news" | "wiki";
};

/** Dated official or wiki notes only. Add a row when Jagex or the wiki names the street. */
export const TOWN_NOTICES: TownNotice[] = [];

export function noticeFor(slug: string, game: "osrs" | "rs3") {
  return TOWN_NOTICES.find((row) => row.slug === slug && row.game === game);
}
