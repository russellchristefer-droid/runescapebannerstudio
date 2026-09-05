import { useEffect, useRef } from "react";
import { eggToast } from "@/lib/eggs";

export function useEggGestures(
  node: { current: HTMLElement | null },
  examine: () => string,
  tripleLine?: () => string,
) {
  const clicks = useRef<{ n: number; t: number }>({ n: 0, t: 0 });
  const press = useRef(0);

  useEffect(() => {
    const el = node.current;
    if (!el) return;

    const onClick = () => {
      const now = Date.now();
      if (now - clicks.current.t > 800) clicks.current.n = 0;
      clicks.current.t = now;
      clicks.current.n += 1;
      if (clicks.current.n >= 3) {
        clicks.current.n = 0;
        eggToast(tripleLine ? tripleLine() : "Nothing interesting happens.");
      }
    };

    const onContext = (e: MouseEvent) => {
      e.preventDefault();
      eggToast(examine());
    };

    const onDown = () => {
      press.current = window.setTimeout(() => eggToast(examine()), 400);
    };
    const onUp = () => window.clearTimeout(press.current);

    el.addEventListener("click", onClick);
    el.addEventListener("contextmenu", onContext);
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("pointerleave", onUp);
    el.addEventListener("pointermove", onUp);
    return () => {
      el.removeEventListener("click", onClick);
      el.removeEventListener("contextmenu", onContext);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("pointerleave", onUp);
      el.removeEventListener("pointermove", onUp);
      window.clearTimeout(press.current);
    };
  }, [node, examine]);
}
