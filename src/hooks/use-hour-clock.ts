import { useEffect, useState } from "react";
import { hourKey, hourLabel } from "@/lib/cadence";

export function useHourClock() {
  const [hour, setHour] = useState(() => hourKey());
  const [label, setLabel] = useState(() => hourLabel());

  useEffect(() => {
    const tick = () => {
      setHour(hourKey());
      setLabel(hourLabel());
    };
    tick();
    const id = window.setInterval(tick, 15_000);
    const onVis = () => {
      if (document.visibilityState === "visible") tick();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return { hour, label };
}
