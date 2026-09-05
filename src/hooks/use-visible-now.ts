import { useEffect, useState } from "react";

/** 1s tick while the tab is visible. Sleeps when hidden. */
export function useVisibleNow(periodMs = 1000) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const tick = () => setNow(Date.now());
    let id = 0;
    const arm = () => {
      window.clearInterval(id);
      if (document.visibilityState === "visible") {
        tick();
        id = window.setInterval(tick, periodMs);
      }
    };
    arm();
    document.addEventListener("visibilitychange", arm);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", arm);
    };
  }, [periodMs]);
  return now;
}
