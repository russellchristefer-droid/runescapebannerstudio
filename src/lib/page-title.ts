const APP = "RuneScape Banner Studio";

export function pageTitle(page?: string) {
  return page ? `${page} · ${APP}` : APP;
}

export function pageMeta(page: string, description: string) {
  return {
    meta: [
      { title: pageTitle(page) },
      { name: "description", content: description },
    ],
  };
}
