export type Mark = {
  id: string;
  name: string;
  editions: ("OSRS" | "RS3")[];
  src: string;
  group: "account" | "cape" | "overhead" | "raid" | "combat";
};

export const MARKS: Mark[] = [
  { id: "mark-osrs-im", name: "Ironman", editions: ["OSRS"], src: "/marks/osrs-ironman.png", group: "account" },
  { id: "mark-osrs-hcim", name: "Hardcore ironman", editions: ["OSRS"], src: "/marks/osrs-hcim.png", group: "account" },
  { id: "mark-osrs-uim", name: "Ultimate ironman", editions: ["OSRS"], src: "/marks/osrs-uim.png", group: "account" },
  { id: "mark-osrs-gim", name: "Group ironman", editions: ["OSRS"], src: "/marks/osrs-gim.png", group: "account" },
  { id: "mark-osrs-fire", name: "Fire cape", editions: ["OSRS"], src: "/marks/osrs-fire-cape.png", group: "cape" },
  { id: "mark-osrs-infernal", name: "Infernal cape", editions: ["OSRS"], src: "/marks/osrs-infernal-cape.png", group: "cape" },
  { id: "mark-osrs-quest", name: "Quest cape", editions: ["OSRS"], src: "/marks/osrs-quest-cape.png", group: "cape" },
  { id: "mark-osrs-diary", name: "Diary cape", editions: ["OSRS"], src: "/marks/osrs-achieve-cape.png", group: "cape" },
  { id: "mark-osrs-max", name: "Max cape", editions: ["OSRS"], src: "/marks/osrs-max-cape.png", group: "cape" },
  { id: "mark-osrs-melee", name: "Protect Melee", editions: ["OSRS"], src: "/marks/osrs-protect-melee.png", group: "overhead" },
  { id: "mark-osrs-range", name: "Protect Missiles", editions: ["OSRS"], src: "/marks/osrs-protect-missiles.png", group: "overhead" },
  { id: "mark-osrs-mage", name: "Protect Magic", editions: ["OSRS"], src: "/marks/osrs-protect-magic.png", group: "overhead" },
  { id: "mark-osrs-smite", name: "Smite", editions: ["OSRS"], src: "/marks/osrs-smite.png", group: "overhead" },
  { id: "mark-osrs-prayer", name: "Prayer", editions: ["OSRS"], src: "/skills/osrs-Prayer.png", group: "overhead" },
  { id: "mark-osrs-combat", name: "Combat", editions: ["OSRS"], src: "/skills/osrs-Combat.png", group: "combat" },
  { id: "mark-osrs-veng", name: "Vengeance", editions: ["OSRS"], src: "/marks/osrs-vengeance.png", group: "combat" },
  { id: "mark-osrs-slayer", name: "Slayer", editions: ["OSRS"], src: "/skills/osrs-Slayer.png", group: "combat" },
  { id: "mark-osrs-dt2", name: "DT2", editions: ["OSRS"], src: "/marks/osrs-dt2.svg", group: "raid" },
  { id: "mark-rs3-im", name: "Ironman", editions: ["RS3"], src: "/marks/rs3-ironman.svg", group: "account" },
  { id: "mark-rs3-hcim", name: "Hardcore ironman", editions: ["RS3"], src: "/marks/rs3-hcim.svg", group: "account" },
  { id: "mark-rs3-uim", name: "Ultimate ironman", editions: ["RS3"], src: "/marks/rs3-uim.svg", group: "account" },
  { id: "mark-rs3-max", name: "Max cape", editions: ["RS3"], src: "/marks/rs3-max.png", group: "cape" },
  { id: "mark-rs3-prayer", name: "Prayer", editions: ["RS3"], src: "/skills/rs3-Prayer.png", group: "combat" },
  { id: "mark-rs3-slayer", name: "Slayer", editions: ["RS3"], src: "/skills/rs3-Slayer.png", group: "combat" },
  { id: "mark-rs3-summoning", name: "Summoning", editions: ["RS3"], src: "/skills/rs3-Summoning.png", group: "combat" },
];

export function stampsFor(pack: "OSRS" | "RS3") {
  return MARKS.filter((mark) => mark.editions.includes(pack));
}
