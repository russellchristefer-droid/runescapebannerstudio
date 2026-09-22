import { useEffect, useState } from "react";

const STILL = "/bob/bob-still.png";

export function BobPic({
  edition,
  id,
}: {
  edition: "osrs" | "rs3" | "rsc";
  id?: string;
}) {
  const gif = edition === "rs3" ? "/bob/bob-rs3.gif" : edition === "osrs" ? "/bob/bob-osrs.gif" : STILL;
  const [src, setSrc] = useState(STILL);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setSrc(reduce || edition === "rsc" ? STILL : gif);
  }, [edition, gif]);

  return (
    <img
      id={id}
      className="bob-pic h-24 w-24 shrink-0 object-contain object-bottom"
      alt="Bob the Cat"
      src={src}
      width={96}
      height={96}
      onError={(e) => {
        if (!e.currentTarget.src.includes("bob-still.png")) e.currentTarget.src = STILL;
      }}
    />
  );
}
