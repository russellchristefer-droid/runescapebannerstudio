const DB_NAME = "rsbs.clip-banner";
const STORE = "plate";
const KEY = "current";
export const CLIP_BANNER_LS = "rsbs.clip-banner.v1";
export const CLIP_BANNER_EVENT = "rsbs-clip-banner";

export type ClipBannerPin = {
  blob: Blob;
  w: number;
  h: number;
};

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(STORE)) req.result.createObjectStore(STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function saveLocal(blob: Blob, w: number, h: number) {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
  if (dataUrl.length > 4_000_000) return;
  localStorage.setItem(CLIP_BANNER_LS, JSON.stringify({ w, h, dataUrl }));
}

function loadLocal(): ClipBannerPin | null {
  try {
    const raw = JSON.parse(localStorage.getItem(CLIP_BANNER_LS) || "null") as { w?: number; h?: number; dataUrl?: string } | null;
    if (!raw?.dataUrl || !raw.w || !raw.h) return null;
    const comma = raw.dataUrl.indexOf(",");
    const b64 = comma >= 0 ? raw.dataUrl.slice(comma + 1) : raw.dataUrl;
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return { blob: new Blob([bytes], { type: "image/jpeg" }), w: raw.w, h: raw.h };
  } catch {
    return null;
  }
}

export async function saveClipBanner(blob: Blob, w: number, h: number) {
  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
      tx.objectStore(STORE).put({ blob, w, h, at: Date.now() }, KEY);
    });
    db.close();
  } catch {
    /* private / blocked */
  }
  try {
    await saveLocal(blob, w, h);
  } catch {
    /* quota */
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(CLIP_BANNER_EVENT));
    try {
      const bus = new BroadcastChannel(CLIP_BANNER_EVENT);
      bus.postMessage({ w, h });
      bus.close();
    } catch {
      /* no channel */
    }
  }
}

export async function loadClipBanner(): Promise<ClipBannerPin | null> {
  try {
    const db = await openDb();
    const row = await new Promise<{ blob: Blob; w: number; h: number } | undefined>((resolve, reject) => {
      const tx = db.transaction(STORE, "readonly");
      const req = tx.objectStore(STORE).get(KEY);
      req.onsuccess = () => resolve(req.result as { blob: Blob; w: number; h: number } | undefined);
      req.onerror = () => reject(req.error);
    });
    db.close();
    if (row?.blob && row.w && row.h) return { blob: row.blob, w: row.w, h: row.h };
  } catch {
    /* fall through */
  }
  return loadLocal();
}
