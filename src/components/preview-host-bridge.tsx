/**
 * Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
 * (and later receive registered routes). Noops when the app is not embedded.
 */

import { useEffect } from "react";
import { useRouter } from "@tanstack/react-router";
import {
  collectRoutePathsFromTree,
  installPreviewHostBridge,
} from "@/lib/preview-host-bridge";

export function PreviewHostBridge() {
  const router = useRouter();

  useEffect(() => {
    return installPreviewHostBridge({
      navigate: (path) => {
        router.history.push(path);
      },
      getRoutePaths: () => collectRoutePathsFromTree(router.routeTree),
    });
  }, [router]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (window.parent === window) return;
    const ask = () => {
      const anyDoc = document as Document & {
        requestStorageAccess?: () => Promise<void>;
        hasStorageAccess?: () => Promise<boolean>;
      };
      if (typeof anyDoc.requestStorageAccess !== "function") return;
      void (async () => {
        try {
          const has = (await anyDoc.hasStorageAccess?.()) ?? false;
          if (!has) await anyDoc.requestStorageAccess();
        } catch {
          /* third-party cookies stay blocked — desk uses localStorage, not cookies */
        }
      })();
    };
    window.addEventListener("pointerup", ask, { once: true, passive: true });
    return () => window.removeEventListener("pointerup", ask);
  }, []);

  return null;
}
