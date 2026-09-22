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
  const [src, setSrc] = useState(gif);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setSrc(mq.matches ? STILL : gif);
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
      onError={(e) => {
        if (!e.currentTarget.src.includes("bob-still.png")) {
          e.currentTarget.onerror = null;
          e.currentTarget.src = STILL;
        }
      }}
    />
  );
}
