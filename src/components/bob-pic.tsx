import { useEffect, useState } from "react";

const STILL = "/bob/bob-still.png";

export function BobPic({
  edition,
  id = "bob-wotd",
}: {
  edition: "osrs" | "rs3";
  id?: string;
}) {
  const gif = edition === "rs3" ? "/bob/bob-rs3.gif" : "/bob/bob-osrs.gif";
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
        e.currentTarget.onerror = null;
        e.currentTarget.src = STILL;
      }}
    />
  );
}
