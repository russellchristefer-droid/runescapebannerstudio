import { pad } from "@/lib/clock";
import { useVisibleNow } from "@/hooks/use-visible-now";

export function UtcClock() {
  const now = useVisibleNow();
  const date = new Date(now);
  const label = date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
  return (
    <p className="mt-1 font-mono text-[10px] tabular-nums text-faint">
      {label} · {pad(date.getUTCHours())}:{pad(date.getUTCMinutes())}:{pad(date.getUTCSeconds())} UTC
    </p>
  );
}
