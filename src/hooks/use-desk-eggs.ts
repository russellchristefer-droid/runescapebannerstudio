import { useEffect, useRef } from "react";
import { eggToast, fieldFocused, isOwnerName, ownerToast } from "@/lib/eggs";

export function useDeskEggs(name: string) {
  const nameRef = useRef(name);
  nameRef.current = name;
  const lastOwner = useRef("");

  useEffect(() => {
    if (isOwnerName(name) && lastOwner.current !== name.trim().toLowerCase()) {
      lastOwner.current = name.trim().toLowerCase();
      ownerToast();
    }
    if (!isOwnerName(name)) lastOwner.current = "";
  }, [name]);

  useEffect(() => {
    if (window.location.pathname.startsWith("/legal")) return;
    let buf = "";
    let idle = 0;
    const onKey = (e: KeyboardEvent) => {
      if (fieldFocused()) {
        buf = "";
        return;
      }
      if (e.key.length !== 1 || e.metaKey || e.ctrlKey) return;
      buf += e.key.toLowerCase();
      window.clearTimeout(idle);
      idle = window.setTimeout(() => {
        buf = "";
      }, 1200);
      if (buf.includes("owner")) {
        buf = "";
        ownerToast();
      } else if (buf.includes("cabbage")) {
        buf = "";
        eggToast("The cabbage looks tasty.");
      } else if (buf.includes("www")) {
        buf = "";
        eggToast("The World Wide Web is not a plane.");
      } else if (buf.includes("abyssal")) {
        buf = "";
        eggToast("A dark power stirs.");
      } else if (buf.includes("karamja")) {
        buf = "";
        eggToast("You feel the need for a ticket.");
      } else if (buf.includes("guthix")) {
        buf = "";
        eggToast("Balance is not a banner size.");
      } else if (buf.includes("maxed")) {
        buf = "";
        eggToast("They would not put that on Legal.");
      } else if (buf.includes("split")) {
        buf = "";
        eggToast("The other person left the raid. This one stayed.");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(idle);
    };
  }, []);
}
