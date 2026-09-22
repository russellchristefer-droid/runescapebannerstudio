import { useEffect, useState } from "react";

const STILL = "/bob/bob-still.png";

export function BobPic({
  edition,
  id = "bob-wotd",
}: {
  edition: "osrs" | "rs3";
  id?: string;
}) {
  const gif = edition === "rs3" ? "/bob/bob-rs3.gif?v=2" : "/bob/bob-osrs.gif?v=2";
  const [src, setSrc] = useState(STILL);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const apply = () => setSrc(mq.matches ? gif : STILL);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [gif]);

  return (
    <img
      id={id}
      alt="Bob the Cat"
      width={96}
      height={96}
      src={src}
      decoding="async"
      onError={(e) => {
        if (!e.currentTarget.src.includes("bob-still.png")) {
          e.currentTarget.onerror = null;
          e.currentTarget.src = STILL;
        }
      }}
    />
  );
}
