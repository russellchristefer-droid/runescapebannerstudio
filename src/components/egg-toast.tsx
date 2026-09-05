import { useEffect, useRef, useState } from "react";
import { EGG_EVENT, reducedMotion } from "@/lib/eggs";

export function EggToast() {
  const [line, setLine] = useState<string | null>(null);
  const timer = useRef(0);

  useEffect(() => {
    const onToast = (event: Event) => {
      const message = String((event as CustomEvent).detail ?? "").trim();
      if (!message) return;
      window.clearTimeout(timer.current);
      setLine(message);
      timer.current = window.setTimeout(() => setLine(null), 4000);
    };
    window.addEventListener(EGG_EVENT, onToast);
    return () => {
      window.removeEventListener(EGG_EVENT, onToast);
      window.clearTimeout(timer.current);
    };
  }, []);

  if (!line) return null;
  return (
    <div
      role="status"
      className={`fixed bottom-4 left-1/2 z-40 max-w-sm -translate-x-1/2 border border-line bg-raised px-3 py-2 text-center text-sm text-parchment ${
        reducedMotion() ? "" : ""
      }`}
    >
      {line}
    </div>
  );
}
