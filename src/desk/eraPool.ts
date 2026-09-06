export type Era = "classic" | "rs2" | "osrs" | "rs3";

export type EraStill = {
  src: string;
  era: Era;
  name: string;
};

export const ERA_POOL: Record<Era, EraStill[]> = {
  classic: [
    { src: "/era/classic/lumbridge.jpg", era: "classic", name: "Lumbridge" },
    { src: "/era/classic/varrock.jpg", era: "classic", name: "Varrock" },
    { src: "/era/classic/draynor.jpg", era: "classic", name: "Draynor" },
  ],
  rs2: [
    { src: "/era/rs2/wilderness.jpg", era: "rs2", name: "Wilderness" },
    { src: "/era/rs2/edgeville.jpg", era: "rs2", name: "Edgeville" },
    { src: "/era/rs2/draynor.jpg", era: "rs2", name: "Draynor" },
  ],
  osrs: [
    { src: "/era/osrs/falador.png", era: "osrs", name: "Falador" },
    { src: "/era/osrs/canifis.png", era: "osrs", name: "Canifis" },
    { src: "/era/osrs/catherby.png", era: "osrs", name: "Catherby" },
    { src: "/era/osrs/port-sarim.png", era: "osrs", name: "Port Sarim" },
    { src: "/era/osrs/taverley.png", era: "osrs", name: "Taverley" },
    { src: "/era/osrs/burthorpe.png", era: "osrs", name: "Burthorpe" },
    { src: "/Falador.png", era: "osrs", name: "Falador" },
    { src: "/Canifis.png", era: "osrs", name: "Canifis" },
    { src: "/Catherby.png", era: "osrs", name: "Catherby" },
    { src: "/Port_Sarim.png", era: "osrs", name: "Port Sarim" },
    { src: "/Taverley.png", era: "osrs", name: "Taverley" },
    { src: "/Burthorpe.png", era: "osrs", name: "Burthorpe" },
  ],
  rs3: [
    { src: "/era/rs3/prifddinas.png", era: "rs3", name: "Prifddinas" },
    { src: "/era/rs3/menaphos.png", era: "rs3", name: "Menaphos" },
    { src: "/era/rs3/daemonheim.png", era: "rs3", name: "Daemonheim" },
    { src: "/era/rs3/lost-grove.png", era: "rs3", name: "The Lost Grove" },
    { src: "/Prifddinas.png", era: "rs3", name: "Prifddinas" },
    { src: "/Menaphos.png", era: "rs3", name: "Menaphos" },
    { src: "/Daemonheim.png", era: "rs3", name: "Daemonheim" },
    { src: "/The_Lost_Grove.png", era: "rs3", name: "The Lost Grove" },
  ],
};

export const FALLBACK = "/Falador.png";

const ERA_LABEL: Record<Era, string> = {
  classic: "Classic",
  rs2: "RS2",
  osrs: "OSRS",
  rs3: "RS3",
};

export function allEraSrcs() {
  return Object.values(ERA_POOL).flat();
}

export function pickRandom(era?: Era): EraStill {
  const pool = era ? ERA_POOL[era] : allEraSrcs();
  return pool[Math.floor(Math.random() * pool.length)] ?? { src: FALLBACK, era: "osrs", name: "Falador" };
}

export function eraCaption(row: EraStill) {
  return `${ERA_LABEL[row.era]} · ${row.name}`;
}

export function loadStill(src: string, img: HTMLImageElement, onOk: () => void) {
  img.onerror = () => {
    if (img.getAttribute("data-era") === "fallback") return;
    img.setAttribute("data-era", "fallback");
    img.src = FALLBACK;
  };
  img.onload = onOk;
  img.src = src;
}
