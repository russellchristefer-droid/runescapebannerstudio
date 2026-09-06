import { Link } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { TodayDesk } from "@/components/today-desk";
import { TownHero } from "@/components/town-hero";
import { OracleLine } from "@/components/oracle-line";
import { StillPhoto } from "@/components/still-photo";
import { drawBanner, ensurePlateFont, loadImage, plateMetrics, putStillOnDesk } from "@/desk";
import { loadStudioSave, writeStudioSave } from "@/desk/save";
import { deskSharePath, readDeskQuery } from "@/desk/desk-link";
import { PlaceRail } from "@/places";
import { stillIndex } from "@/lib/still-clock";
import { safeZoneRects, type SafeZone } from "@/lib/bannerFeatures";
import { MARKS } from "@/lib/marks";
import { sanitizeSkillLevel, skillIdForHiscore, skillLevelCap, SKILLS } from "@/lib/skills";
import {
  BANNER_SIZES,
  migrateBannerSizeId,
  GODS,
  LOCATIONS,
  skyLabels,
  stillAllowed,
  townPlateSrc,
  type BannerSizeId,
  type Edition,
  type LocationId,
  type SceneKind,
} from "@/lib/locations";
import { EggToast } from "@/components/egg-toast";
import { useDeskEggs } from "@/hooks/use-desk-eggs";
import { useEggGestures } from "@/hooks/use-egg-gestures";
import { eggToast, isOwnerName, sessionOnce } from "@/lib/eggs";
import { postieLineAt, PETE_LINES, peteThreshold } from "@/lib/postie";
import { useVisibleNow } from "@/hooks/use-visible-now";
import { AppLink, townPath, bossPath } from "@/places";
import { noteFor } from "@/lib/boss-notes";
import { townNote } from "@/lib/town-notes";
import {
  looksLikeStaffName,
  sanitizeClan,
  sanitizeDiscord,
  sanitizeDisplayName,
  sanitizeGrind,
  sanitizeHandle,
  sanitizeTagline,
  sanitizeWorld,
} from "@/lib/rsText";

const HiscoresLookup = lazy(() =>
  import("@/components/hiscores").then((mod) => ({ default: mod.HiscoresLookup })),
);

export function Studio() {
  const saved = useMemo(() => loadStudioSave(), []);
  const boot = useMemo(() => readDeskQuery(), []);
  const peteNow = useVisibleNow(5 * 60 * 1000);
  const [edition, setEdition] = useState<Edition>(boot.edition ?? saved.edition ?? "RS3");
  const [kind, setKind] = useState<SceneKind>(() => {
    const loc = boot.locationId ? LOCATIONS.find((row) => row.id === boot.locationId) : undefined;
    return loc?.kind ?? "town";
  });
  const [locationId, setLocationId] = useState<LocationId>(boot.locationId ?? saved.locationId ?? "falador");
  const [view, setView] = useState<"a" | "b">(saved.view ?? "a");
  const [viewLocked, setViewLocked] = useState(false);
  const [poolSkip, setPoolSkip] = useState(0);
  const [, setCycleTick] = useState(0);
  const [sizeId, setSizeId] = useState<BannerSizeId>(() => migrateBannerSizeId(boot.sizeId ?? saved.sizeId ?? "1200x480"));
  const [streamer, setStreamer] = useState(saved.streamer ?? "");
  const [clan, setClan] = useState(saved.clan ?? "");
  const [handle, setHandle] = useState(saved.handle ?? "");
  const [tagline, setTagline] = useState(saved.tagline ?? "");
  const [world, setWorld] = useState(saved.world ?? "");
  const [discord, setDiscord] = useState(saved.discord ?? "");
  const [grind, setGrind] = useState(saved.grind ?? "");
  const [heroTown, setHeroTown] = useState<{ name: string; edition: Edition }>({
    name: "Lumbridge",
    edition: saved.edition === "RS3" ? "RS3" : "OSRS",
  });
  const [customSrc, setCustomSrc] = useState<string | null>(null);
  const [deskStillSrc, setDeskStillSrc] = useState<string | null>(() => {
    if (boot.still) return boot.still;
    if (saved.stillSrc) return saved.stillSrc;
    const id = boot.locationId ?? saved.locationId ?? "falador";
    const loc = LOCATIONS.find((row) => row.id === id);
    return townPlateSrc(id) ?? loc?.viewA ?? "/Falador.png";
  });
  const [sceneReady, setSceneReady] = useState(true);
  const [skillPack, setSkillPack] = useState<"OSRS" | "RS3">(boot.edition ?? saved.skillPack ?? "RS3");
  const [skillPlace, setSkillPlace] = useState<"name" | "bottom" | "top">("name");
  const [skillSize, setSkillSize] = useState(saved.skillSize ?? 40);
  const [skillX] = useState<number | null>(null);
  const [skillY] = useState<number | null>(null);
  const [skillPicks, setSkillPicks] = useState<
    { id: string; game: "OSRS" | "RS3"; level: string; x?: number; y?: number; size?: number; scale?: number; group?: string }[]
  >(
    () => {
      if (boot.marks?.length) {
        const pack = boot.edition ?? saved.skillPack ?? "OSRS";
        return boot.marks.map((id, i) => ({
          id,
          game: pack,
          level: "",
          x: 28 + i * 44,
          y: 400,
          size: 28,
          scale: 1,
        }));
      }
      if (boot.locationId) return [];
      return (
      saved.skillPicks?.map((row) => ({
        id: row.id,
        game: row.game === "RS3" || row.game === "OSRS" ? row.game : saved.skillPack ?? "RS3",
        level: row.level ?? "",
        x: row.x,
        y: row.y,
        size: row.size,
        scale: row.scale,
        group: row.group,
      })) ?? []
      );
    },
  );
  const [boardLevels, setBoardLevels] = useState<{ OSRS: Record<string, string>; RS3: Record<string, string> }>({
    OSRS: {},
    RS3: {},
  });
  const [armedSkill, setArmedSkill] = useState<string | null>(null);
  const [pickedSkill, setPickedSkill] = useState<string | null>(null);
  const [pickedText, setPickedText] = useState<string | null>(null);
  const [textPos, setTextPos] = useState<Record<string, { x: number; y: number }>>({});
  const [textScale, setTextScale] = useState<Record<string, number>>(saved.textScale ?? {});
  const [plateCaption, setPlateCaption] = useState("");
  const [saveNote, setSaveNote] = useState("");
  const [ghostZone, setGhostZone] = useState<SafeZone>("none");
  const [customMarks, setCustomMarks] = useState<{ id: string; name: string; src: string; game: "OSRS" | "RS3" }[]>([]);
  const markFileRef = useRef<HTMLInputElement>(null);
  const customMarksRef = useRef(customMarks);
  customMarksRef.current = customMarks;
  useEffect(() => () => {
    for (const mark of customMarksRef.current) {
      if (mark.src.startsWith("blob:")) URL.revokeObjectURL(mark.src);
    }
  }, []);
  const boxesRef = useRef<{ id: string; x: number; y: number; w: number; h: number }[]>([]);
  const dragRef = useRef<{
    id: string;
    kind: "skill" | "text";
    x0: number;
    y0: number;
    px: number;
    py: number;
    mates?: { id: string; x0: number; y0: number }[];
  } | null>(null);
  const [placeCap, setPlaceCap] = useState(12);
  const [placeGod, setPlaceGod] = useState<(typeof GODS)[number] | null>(null);
  const [status, setStatus] = useState("Ready");
  const [plateFontOk, setPlateFontOk] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const stillCacheRef = useRef<HTMLCanvasElement | null>(null);
  const stampBitmaps = useRef(new Map<string, HTMLImageElement>());
  const dirtyRef = useRef(false);
  const rafRef = useRef(0);
  const draggingRef = useRef(false);
  const scalingRef = useRef(false);
  const scaleTimer = useRef(0);
  const peteClicks = useRef(0);
  const peteLevel = useRef(0);
  const pointersRef = useRef(new Map<number, { x: number; y: number }>());
  const pinchRef = useRef<{ dist: number; scale: number } | null>(null);
  useEffect(() => {
    void ensurePlateFont().then((ok) => {
      setPlateFontOk(ok);
      requestPaint();
    });
    const onShow = (event: PageTransitionEvent) => {
      if (event.persisted) setPlaceCap((n) => n);
    };
    window.addEventListener("pageshow", onShow);
    return () => window.removeEventListener("pageshow", onShow);
  }, []);
  useEffect(() => {
    return () => {
      const src = customSrc;
      if (src?.startsWith("blob:")) URL.revokeObjectURL(src);
    };
  }, [customSrc]);
  useEffect(() => {
    if (!boot.locationId && typeof window !== "undefined" && window.location.hash !== "#desk") return;
    const go = () => {
      document.getElementById("desk")?.scrollIntoView({
        block: "start",
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
      canvasRef.current?.focus();
    };
    const id = window.requestAnimationFrame(go);
    return () => window.cancelAnimationFrame(id);
  }, [boot.locationId]);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const customFileRef = useRef<File | null>(null);
  const [grabbing, setGrabbing] = useState(false);
  const [overIcon, setOverIcon] = useState(false);
  const [bannerCaps, setBannerCaps] = useState(false);

  const location = LOCATIONS.find((l) => l.id === locationId) ?? LOCATIONS[0];
  const size = BANNER_SIZES.find((s) => s.id === sizeId) ?? BANNER_SIZES[0];
  useDeskEggs(streamer);
  useEggGestures(
    previewRef,
    () => {
      const game = location.edition === "OSRS" ? "Old School RuneScape" : "RuneScape";
      const base = `It's ${location.name}, ${game}.`;
      return location.kind === "boss" ? `${base} I wouldn't like to fight that from here.` : base;
    },
    () =>
      isOwnerName(streamer)
        ? "Nothing interesting happens. (Something interesting already happened in 2001.)"
        : "Nothing interesting happens.",
  );
  const townPool = location.stills?.length ? location.stills : [location.viewA];
  const cycleSrc = townPool[(stillIndex(townPool.length, peteNow) + poolSkip) % Math.max(1, townPool.length)] ?? location.viewA;
  const safeCycle = stillAllowed(cycleSrc, location.edition) ? cycleSrc : location.viewA;
  useEffect(() => {
    const next = townPool[(stillIndex(townPool.length, peteNow) + 1) % Math.max(1, townPool.length)];
    if (!next) return;
    let idle = 0;
    let usedIdle = false;
    const warm = () => {
      if (document.hidden) return;
      const img = new Image();
      img.decoding = "async";
      img.src = next;
    };
    if (typeof window.requestIdleCallback === "function") {
      idle = window.requestIdleCallback(warm);
      usedIdle = true;
    } else {
      idle = window.setTimeout(warm, 400);
    }
    const onHide = () => {
      if (usedIdle) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
    };
    document.addEventListener("visibilitychange", onHide);
    return () => {
      onHide();
      document.removeEventListener("visibilitychange", onHide);
    };
  }, [cycleSrc, townPool, peteNow]);
  const sceneSrc =
    customSrc ??
    deskStillSrc ??
    (viewLocked ? (view === "b" && location.viewB ? location.viewB : location.viewA) : safeCycle);

  function clearStampsAndText() {
    setSkillPicks([]);
    setArmedSkill(null);
    setPickedSkill(null);
    setStreamer("");
    setClan("");
    setHandle("");
    setTagline("");
    setWorld("");
    setDiscord("");
    setGrind("");
    setTextPos({});
    setTextScale({});
    setPickedText(null);
  }

  function pickLocation(id: LocationId) {
    setLocationId(id);
    setPoolSkip(0);
    const loc = LOCATIONS.find((item) => item.id === id);
    if (loc) {
      setEdition(loc.edition);
      setKind(loc.kind);
    }
  }

  function applyStill(id: LocationId, nextView?: "a" | "b", src?: string) {
    const loc = LOCATIONS.find((item) => item.id === id);
    const cardSrc = src || townPlateSrc(id) || loc?.viewA;
    if (!cardSrc) {
      setStatus("The picture is not here. Try another street.");
      return;
    }
    const samePlace = id === locationId && !customSrc;
    if (!samePlace) clearStampsAndText();
    pickLocation(id);
    setDeskStillSrc(cardSrc);
    setView(nextView ?? "a");
    setViewLocked(true);
    setCustomSrc((prev) => {
      if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
      return null;
    });
    setSceneReady(true);
    putStillOnDesk({ stillSrc: cardSrc, locationId: id, edition: loc?.edition });
    if (typeof document !== "undefined") {
      document.getElementById("desk")?.scrollIntoView({ block: "start", behavior: "smooth" });
      canvasRef.current?.focus();
    }
  }

  const catalog = [...SKILLS, ...MARKS, ...customMarks.map((mark) => ({
    id: mark.id,
    name: mark.name,
    editions: [mark.game] as ("OSRS" | "RS3")[],
    src: mark.src,
  }))];

  function stampFile(id: string, game: "OSRS" | "RS3") {
    return (
      catalog.find((item) => item.id === id && item.editions.includes(game)) ??
      catalog.find((item) => item.id === id)
    );
  }

  function dropIllegal(pack: "OSRS" | "RS3") {
    setSkillPicks((cur) =>
      cur.filter((item) => catalog.some((row) => row.id === item.id && row.editions.includes(pack))),
    );
  }

  function isMark(id: string) {
    return MARKS.some((mark) => mark.id === id) || id.startsWith("mark-custom-");
  }

  function packMates(id: string) {
    const hit = skillPicksRef.current.find((item) => item.id === id);
    if (!hit?.group) return skillPicksRef.current.filter((item) => item.id === id);
    return skillPicksRef.current.filter((item) => item.group === hit.group);
  }

  function packScaleMax(count: number) {
    const m = plateMetrics(size.width, size.height);
    const cols = skillPack === "OSRS" ? 8 : 9;
    const rows = Math.max(1, Math.ceil(count / cols));
    const icon = m.icon;
    const levelW = Math.round(m.level * 2.1);
    const gap = m.gap;
    const strideX = icon + levelW + gap;
    const strideY = icon + gap;
    const maxW = (size.width - 2 * m.pad) / Math.max(1, cols * strideX - gap);
    const maxH = (size.height * 0.62) / Math.max(1, rows * strideY - gap);
    return Math.max(0.8, Math.min(maxW, maxH, 2));
  }

  function packScale(count: number) {
    return Math.min(1, packScaleMax(count));
  }

  function layoutAllGrid(count: number, packScaleValue: number) {
    const m = plateMetrics(size.width, size.height);
    const cols = skillPack === "OSRS" ? 8 : 9;
    const scale = Math.max(0.8, Math.min(packScaleValue, packScaleMax(count)));
    const icon = Math.round(m.icon * scale);
    const levelW = Math.round(m.level * 2.1 * scale);
    const gap = Math.round(m.gap * scale);
    const strideX = icon + levelW + gap;
    const strideY = icon + gap;
    const rows = Math.max(1, Math.ceil(count / cols));
    const gridW = cols * strideX - gap;
    const gridH = rows * strideY - gap;
    const originX = Math.round((size.width - gridW) / 2);
    const originY = Math.round(Math.max(m.top + m.name + 12, (size.height - gridH) / 2 + m.name * 0.35));
    return { cols, rows, icon, levelW, gap, strideX, strideY, originX, originY, scale, cell: icon };
  }

  function placeAllPack(packScaleValue?: number) {
    const pack = SKILLS.filter((skill) => skill.editions.includes(skillPack));
    const kept = skillPicksRef.current.filter((item) => isMark(item.id)).slice(0, 16);
    const wanted = packScaleValue ?? packScale(pack.length);
    const grid = layoutAllGrid(pack.length, wanted);
    const next = [
      ...pack.map((skill, i) => {
        const col = i % grid.cols;
        const row = Math.floor(i / grid.cols);
        const lastCount = pack.length % grid.cols || grid.cols;
        const onLast = row === grid.rows - 1 && lastCount < grid.cols;
        const rowShift = onLast ? Math.round(((grid.cols - lastCount) * grid.strideX) / 2) : 0;
        return {
          id: skill.id,
          game: skillPack,
          level: boardLevels[skillPack][skill.id] ?? "",
          x: grid.originX + rowShift + col * grid.strideX,
          y: grid.originY + row * grid.strideY,
          size: grid.icon,
          scale: 1,
          group: "skills-all",
        };
      }),
      ...kept,
    ];
    skillPicksRef.current = next;
    setSkillPicks(next);
  }

  function placeStamp(id: string) {
    setSkillPicks((cur) => {
      const existing = cur.find((item) => item.id === id);
      if (existing) {
        setPickedSkill(id);
        return cur;
      }
      const marks = cur.filter((item) => isMark(item.id)).length;
      if (isMark(id) && marks >= 16) {
        setStatus("Sixteen marks on this banner.");
        return cur;
      }
      const n = cur.length;
      const scale = packScale(n + 1);
      const mark = skillSize * scale;
      const left = Math.round(size.width * 0.04);
      const x = skillPlace === "name" ? left + n * (mark + 6) : Math.round(size.width * 0.06 + (n % 8) * (mark + 8));
      const y = skillPlace === "name" ? Math.round(size.height * 0.28) : Math.round(size.height * 0.52 + Math.floor(n / 8) * (mark + 8));
      setPickedSkill(id);
      setArmedSkill(null);
      return [...cur, { id, game: skillPack, level: boardLevels[skillPack][id] ?? "", x, y, size: skillSize, scale }];
    });
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT")) return;
      if (e.key === "Delete" || e.key === "Backspace") {
        const drag = dragRef.current;
        const skillId = drag?.kind === "skill" ? drag.id : pickedSkill;
        const textId = drag?.kind === "text" ? drag.id : pickedText;
        if (!skillId && !textId) return;
        e.preventDefault();
        if (drag) {
          try {
            (canvasRef.current as HTMLCanvasElement | null)?.releasePointerCapture?.(drag as never);
          } catch {
            /* ignore */
          }
        }
        dragRef.current = null;
        setGrabbing(false);
        if (skillId) {
          setSkillPicks((cur) => {
            const lead = cur.find((item) => item.id === skillId);
            if (lead?.group) return cur.filter((item) => item.group !== lead.group);
            return cur.filter((item) => item.id !== skillId);
          });
          setPickedSkill(null);
        }
        if (textId) {
          if (textId === "streamer") setStreamer("");
          else if (textId === "clan") setClan("");
          else if (textId === "handle") setHandle("");
          else if (textId.startsWith("tagline")) setTagline("");
          else if (textId.startsWith("extra")) {
            setWorld("");
            setGrind("");
            setDiscord("");
          }
          setTextPos((cur) => {
            const next = { ...cur };
            delete next[textId];
            return next;
          });
          setPickedText(null);
        }
        return;
      }
      if (e.key === "Escape") {
        setPickedSkill(null);
        setPickedText(null);
        setArmedSkill(null);
        window.dispatchEvent(new Event("rs-close-menu"));
        return;
      }
      const lead = skillPicks.find((row) => row.id === pickedSkill);
      const stepBase = e.shiftKey ? 8 : 2;
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
        const dir = e.key.replace("Arrow", "").toLowerCase() as "up" | "down" | "left" | "right";
        if (pickedText) {
          const step = stepBase;
          setTextPos((cur) => {
            const pos = cur[pickedText] ?? boxesRef.current.find((box) => box.id === pickedText);
            if (!pos) return cur;
            let x = pos.x;
            let y = pos.y;
            if (dir === "left") x = Math.max(8, x - step);
            if (dir === "right") x = Math.min(size.width - 40, x + step);
            if (dir === "up") y = Math.max(8, y - step);
            if (dir === "down") y = Math.min(size.height - 16, y + step);
            return { ...cur, [pickedText]: { x, y } };
          });
          return;
        }
        setSkillPicks((cur) =>
          cur.map((item) => {
            const inGroup = lead?.group && item.group === lead.group;
            if ((!inGroup && item.id !== pickedSkill) || item.x == null || item.y == null) return item;
            const mark = Math.max(28, (item.size ?? skillSize) * (item.scale ?? 1));
            const step = stepBase * (item.scale ?? 1);
            let x = item.x;
            let y = item.y;
            if (dir === "left") x = Math.max(0, x - step);
            if (dir === "right") x = Math.min(size.width - mark, x + step);
            if (dir === "up") y = Math.max(0, y - step);
            if (dir === "down") y = Math.min(size.height - mark, y + step);
            return { ...item, x, y, scale: item.scale ?? 1 };
          }),
        );
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pickedSkill, pickedText, skillSize, size.width, size.height]);

  useEffect(() => {
    if (draggingRef.current) return;
    const id = window.setTimeout(() => {
      writeStudioSave({
        streamer,
        clan,
        handle,
        tagline,
        world,
        discord,
        grind,
        edition,
        sizeId,
        skillPack,
        skillSize,
        skillPicks: skillPicks.map((row) => ({
          id: row.id,
          game: row.game,
          level: row.level,
          x: row.x,
          y: row.y,
          size: row.size,
          scale: row.scale,
          group: row.group,
        })),
        textScale,
        locationId,
        view,
        stillSrc: deskStillSrc ?? undefined,
      });
    }, 400);
    return () => window.clearTimeout(id);
  }, [streamer, clan, handle, tagline, world, discord, grind, edition, sizeId, skillPack, skillSize, locationId, view, skillPicks, textScale, deskStillSrc]);

  const skillPicksRef = useRef(skillPicks);
  if (!draggingRef.current && !scalingRef.current) skillPicksRef.current = skillPicks;
  const textPosRef = useRef(textPos);
  if (!draggingRef.current && !scalingRef.current) textPosRef.current = textPos;
  const textScaleRef = useRef(textScale);
  textScaleRef.current = textScale;
  const copyRef = useRef({ streamer, clan, handle, tagline, world, discord, grind, edition, skillPlace, skillSize, skillX, skillY, god: location.god, caps: bannerCaps });
  copyRef.current = { streamer, clan, handle, tagline, world, discord, grind, edition, skillPlace, skillSize, skillX, skillY, god: location.god, caps: bannerCaps };

  function coverStill(ctx: CanvasRenderingContext2D, img: CanvasImageSource, w: number, h: number) {
    const src = img as { width?: number; height?: number; naturalWidth?: number; naturalHeight?: number };
    const sw = Math.max(1, src.naturalWidth ?? src.width ?? w);
    const sh = Math.max(1, src.naturalHeight ?? src.height ?? h);
    const srcRatio = sw / sh;
    const dstRatio = w / Math.max(1, h);
    let sx = 0;
    let sy = 0;
    let tw = sw;
    let th = sh;
    if (srcRatio > dstRatio) {
      tw = sh * dstRatio;
      sx = (sw - tw) / 2;
    } else {
      th = sw / dstRatio;
      sy = (sh - th) / 2;
    }
    ctx.drawImage(img, sx, sy, tw, th, 0, 0, w, h);
  }

  function paintNow() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (canvas.width !== size.width) canvas.width = size.width;
    if (canvas.height !== size.height) canvas.height = size.height;
    const still = stillCacheRef.current;
    const ctx = canvas.getContext("2d", { alpha: true, willReadFrequently: false });
    if (!ctx) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, size.width, size.height);
    ctx.imageSmoothingEnabled = edition !== "OSRS" && !draggingRef.current;
    if (ctx.imageSmoothingEnabled) ctx.imageSmoothingQuality = "high";
    const catalog = [...SKILLS, ...MARKS, ...customMarks.map((mark) => ({
    id: mark.id,
    name: mark.name,
    editions: [mark.game] as ("OSRS" | "RS3")[],
    src: mark.src,
  }))];
    const icons = [];
    for (const pick of skillPicksRef.current) {
      const skill = stampFile(pick.id, pick.game) ?? catalog.find((item) => item.id === pick.id);
      const img = skill ? stampBitmaps.current.get(skill.src) : undefined;
      if (!skill || !img) continue;
      icons.push({
        id: skill.id,
        img,
        level: pick.level ?? "",
        x: pick.x,
        y: pick.y,
        size: pick.size ?? skillSize,
        scale: pick.scale ?? 1,
      });
    }
    const copy = copyRef.current;
    drawBanner(ctx, still ?? canvas, {
      showRules: false,
      overlayOnly: true,
      streamer: copy.streamer,
      clan: copy.clan,
      handle: copy.handle,
      tagline: copy.tagline,
      god: copy.god,
      world: copy.world,
      maxed: false,
      mode: "",
      focus: "",
      style: "",
      cape: "",
      discord: copy.discord,
      grind: copy.grind,
      learners: false,
      layout: "banner",
      vosLine: "",
      showSafeZones: false,
      safeZone: "none",
      showGod: false,
      edition: copy.edition,
      caps: copy.caps,
      textColor: "#ffff00",
      rulesTitle: "",
      honourHead: "",
      honourBody: "",
      respectHead: "",
      respectBody: "",
      securityHead: "",
      securityBody: "",
      width: size.width,
      height: size.height,
      skillIcons: icons,
      skillX: copy.skillX,
      skillY: copy.skillY,
      skillPlace: copy.skillPlace,
      skillSize: copy.skillSize,
      textPos: textPosRef.current,
      textScale: textScaleRef.current,
      onSkillBoxes: (boxes) => {
        boxesRef.current = boxes;
      },
    });
  }

  function requestPaint() {
    dirtyRef.current = true;
    if (rafRef.current) return;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = 0;
      if (document.visibilityState === "hidden") return;
      if (!dirtyRef.current) return;
      dirtyRef.current = false;
      paintNow();
    });
  }

  function scaleSelected(delta: number, skillOverride?: string | null) {
    const skillId = skillOverride ?? pickedSkill;
    if (skillId) {
      const lead = skillPicksRef.current.find((item) => item.id === skillId);
      const old0 = lead?.scale ?? 1;
      applyStampScale(skillId, Math.min(2.5, Math.max(0.5, old0 + delta)));
      return;
    }
    if (!pickedText) return;
    const box = boxesRef.current.find((row) => row.id === pickedText);
    const old = textScaleRef.current[pickedText] ?? 1;
    const nextScale = Math.min(2, Math.max(0.75, old + delta));
    if (box) {
      const cx = box.x + box.w / 2;
      const cy = box.y + box.h / 2;
      const ratio = nextScale / Math.max(0.01, old);
      textPosRef.current = {
        ...textPosRef.current,
        [pickedText]: { x: cx - (box.w * ratio) / 2, y: cy - (box.h * ratio) / 2 },
      };
    }
    textScaleRef.current = { ...textScaleRef.current, [pickedText]: nextScale };
    requestPaint();
    window.clearTimeout(scaleTimer.current);
    scaleTimer.current = window.setTimeout(() => {
      setTextPos(textPosRef.current);
      setTextScale({ ...textScaleRef.current });
    }, 140);
  }

  function applyStampScale(skillId: string, nextScale: number) {
    scalingRef.current = true;
    const mates = packMates(skillId).filter((item) => item.x != null && item.y != null);
    const targets = mates.length ? mates : skillPicksRef.current.filter((item) => item.id === skillId && item.x != null);
    if (!targets.length) {
      scalingRef.current = false;
      return;
    }
    const old0 = targets[0].scale ?? 1;
    const scale = Math.min(2.5, Math.max(0.5, nextScale));
    const ratio = scale / Math.max(0.01, old0);
    let gx = 0;
    let gy = 0;
    for (const item of targets) {
      const base = item.size ?? skillSize;
      const old = item.scale ?? 1;
      gx += (item.x as number) + (base * old) / 2;
      gy += (item.y as number) + (base * old) / 2;
    }
    gx /= targets.length;
    gy /= targets.length;
    skillPicksRef.current = skillPicksRef.current.map((item) => {
      if (!targets.some((row) => row.id === item.id) || item.x == null || item.y == null) return item;
      const old = item.scale ?? 1;
      const base = item.size ?? skillSize;
      const cx = item.x + (base * old) / 2;
      const cy = item.y + (base * old) / 2;
      const nx = gx + (cx - gx) * ratio - (base * scale) / 2;
      const ny = gy + (cy - gy) * ratio - (base * scale) / 2;
      return {
        ...item,
        scale,
        x: Math.max(0, Math.min(size.width - base * scale, nx)),
        y: Math.max(0, Math.min(size.height - base * scale, ny)),
      };
    });
    requestPaint();
    window.clearTimeout(scaleTimer.current);
    scaleTimer.current = window.setTimeout(() => {
      scalingRef.current = false;
      setSkillPicks(skillPicksRef.current);
    }, 140);
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const stopPage = (e: WheelEvent) => {
      if (pickedSkill || pickedText) e.preventDefault();
    };
    canvas.addEventListener("wheel", stopPage, { passive: false });
    return () => canvas.removeEventListener("wheel", stopPage);
  }, [pickedSkill, pickedText]);

  useEffect(() => {
    let gone = false;
    const folder = location.edition === "OSRS" ? "osrs" : "rs3";
    const bare = (src: string) => src.split("?")[0];
    const tries = [
      customSrc,
      deskStillSrc,
      "/Falador.png",
      sceneSrc,
      location.viewA,
      ...(location.stills ?? []),
      `/locations/${location.id}.jpg`,
      `/stills/${folder}/${location.id}.jpg`,
      `/stills/${folder}/${location.id}-a.jpg`,
    ]
      .filter(Boolean)
      .map((src) => bare(String(src)))
      .filter((src, i, arr) => arr.indexOf(src) === i);

    function failPlate() {
      const cache = stillCacheRef.current ?? document.createElement("canvas");
      cache.width = size.width;
      cache.height = size.height;
      const c = cache.getContext("2d", { alpha: false });
      if (c) {
        c.fillStyle = "#1a1610";
        c.fillRect(0, 0, size.width, size.height);
      }
      stillCacheRef.current = cache;
      requestPaint();
      setStatus("The picture is not here. Try another street.");
    }

    function useImg(img: HTMLImageElement) {
      if (gone) return;
      const cache = stillCacheRef.current ?? document.createElement("canvas");
      cache.width = size.width;
      cache.height = size.height;
      const c = cache.getContext("2d", { alpha: false });
      if (!c) return;
      c.imageSmoothingEnabled = true;
      c.imageSmoothingQuality = "high";
      coverStill(c, img, size.width, size.height);
      stillCacheRef.current = cache;
      requestPaint();
      setStatus("Ready");
    }

    let i = 0;
    const next = () => {
      if (gone) return;
      if (i >= tries.length) {
        if (!customSrc && !viewLocked && townPool.length > 1 && poolSkip < townPool.length - 1) {
          setPoolSkip((n) => n + 1);
          return;
        }
        failPlate();
        return;
      }
      const src = tries[i++];
      const img = new Image();
      img.decoding = "async";
      img.onload = () => useImg(img);
      img.onerror = () => next();
      img.src = src;
    };
    next();
    return () => {
      gone = true;
    };
  }, [sceneSrc, size.width, size.height, location.id, location.viewA, customSrc]);

  useEffect(() => {
    let gone = false;
    const catalog = [...SKILLS, ...MARKS, ...customMarks.map((mark) => ({
    id: mark.id,
    name: mark.name,
    editions: [mark.game] as ("OSRS" | "RS3")[],
    src: mark.src,
  }))];
    void (async () => {
      for (const pick of skillPicks) {
        const skill = stampFile(pick.id, pick.game) ?? catalog.find((item) => item.id === pick.id);
        if (!skill || stampBitmaps.current.has(skill.src)) continue;
        try {
          const img = await loadImage(skill.src);
          if (gone) return;
          stampBitmaps.current.set(skill.src, img);
        } catch {
          /* skip */
        }
      }
      requestPaint();
    })();
    return () => {
      gone = true;
    };
  }, [skillPicks, customMarks, streamer, clan, handle, tagline, world, discord, grind, textPos, textScale, skillSize, skillPlace, edition, bannerCaps]);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const stop = (e: WheelEvent) => {
      e.preventDefault();
    };
    el.addEventListener("wheel", stop, { passive: false });
    return () => el.removeEventListener("wheel", stop);
  }, [pickedSkill, pickedText, overIcon]);

  function downloadJpeg() {
    const overlay = canvasRef.current;
    const still = stillCacheRef.current;
    if (!overlay) return;
    const out = document.createElement("canvas");
    out.width = size.width;
    out.height = size.height;
    const ctx = out.getContext("2d", { alpha: false });
    if (!ctx) {
      setSaveNote("Could not save. Try 1200×480.");
      return;
    }
    ctx.fillStyle = "#1a1610";
    ctx.fillRect(0, 0, out.width, out.height);
    if (still && still.width && still.height) {
      coverStill(ctx, still, out.width, out.height);
    } else {
      const plate = document.getElementById("still") as HTMLImageElement | null;
      if (plate && plate.naturalWidth) coverStill(ctx, plate, out.width, out.height);
    }
    ctx.drawImage(overlay, 0, 0, out.width, out.height);
    out.toBlob(
      (blob) => {
        if (!blob) {
          setSaveNote("Could not save. Try 1200×480.");
          return;
        }
        const who = sanitizeDisplayName(streamer);
        const worldTag = sanitizeWorld(world) ? `-w${sanitizeWorld(world)}` : "";
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `banner-${edition.toLowerCase()}-${(who || "desk").replace(/\s+/g, "-")}${worldTag}-${location.id}-${size.width}x${size.height}.jpg`;
        a.click();
        URL.revokeObjectURL(a.href);
        if (!who) setSaveNote("Saved without a name.");
        else setSaveNote(`Saved ${size.width}×${size.height}.`);
      },
      "image/jpeg",
      0.92,
    );
  }

  function paintOnto(
    ctx: CanvasRenderingContext2D,
    still: CanvasImageSource,
    w: number,
    h: number,
  ) {
    const sx = w / size.width;
    const sy = h / size.height;
    const catalog = [...SKILLS, ...MARKS, ...customMarks.map((mark) => ({
    id: mark.id,
    name: mark.name,
    editions: [mark.game] as ("OSRS" | "RS3")[],
    src: mark.src,
  }))];
    const icons = [];
    for (const pick of skillPicksRef.current) {
      const skill = stampFile(pick.id, pick.game) ?? catalog.find((item) => item.id === pick.id);
      const img = skill ? stampBitmaps.current.get(skill.src) : undefined;
      if (!skill || !img) continue;
      icons.push({
        id: skill.id,
        img,
        level: pick.level ?? "",
        x: pick.x != null ? pick.x * sx : undefined,
        y: pick.y != null ? pick.y * sy : undefined,
        size: (pick.size ?? skillSize) * sx,
        scale: pick.scale ?? 1,
      });
    }
    const scaledPos = Object.fromEntries(
      Object.entries(textPosRef.current).map(([key, pos]) => [key, { x: pos.x * sx, y: pos.y * sy }]),
    );
    const copy = copyRef.current;
    drawBanner(ctx, still, {
      showRules: false,
      streamer: copy.streamer,
      clan: copy.clan,
      handle: copy.handle,
      tagline: copy.tagline,
      god: copy.god,
      world: copy.world,
      maxed: false,
      mode: "",
      focus: "",
      style: "",
      cape: "",
      discord: copy.discord,
      grind: copy.grind,
      learners: false,
      layout: "banner",
      vosLine: "",
      showSafeZones: false,
      safeZone: "none",
      showGod: false,
      edition: copy.edition,
      caps: copy.caps,
      textColor: "#ffff00",
      rulesTitle: "",
      honourHead: "",
      honourBody: "",
      respectHead: "",
      respectBody: "",
      securityHead: "",
      securityBody: "",
      width: w,
      height: h,
      skillIcons: icons,
      skillX: copy.skillX,
      skillY: copy.skillY,
      skillPlace: copy.skillPlace,
      skillSize: copy.skillSize * sx,
      textPos: scaledPos,
      textScale: textScaleRef.current,
      onSkillBoxes: () => undefined,
    });
  }

  function downloadPair() {
    const still = stillCacheRef.current;
    if (!still) {
      setSaveNote("Could not save. Try 1200×480.");
      return;
    }
    const jobs = [
      [1200, 480],
      [1280, 720],
    ] as const;
    const who = sanitizeDisplayName(streamer) || "desk";
    const worldTag = sanitizeWorld(world) ? `-w${sanitizeWorld(world)}` : "";
    let done = 0;
    for (const [w, h] of jobs) {
      const out = document.createElement("canvas");
      out.width = w;
      out.height = h;
      const ctx = out.getContext("2d", { alpha: false });
      if (!ctx) continue;
      paintOnto(ctx, still, w, h);
      out.toBlob((blob) => {
        if (!blob) {
          setSaveNote("Pete is not a miracle.");
          return;
        }
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `banner-${edition.toLowerCase()}-${who.replace(/\s+/g, "-")}${worldTag}-${location.id}-${w}x${h}.jpg`;
        a.click();
        URL.revokeObjectURL(a.href);
        done += 1;
        if (done === jobs.length) setSaveNote("Saved 1200×480 and 1280×720.");
      }, "image/jpeg", 0.92);
    }
  }

  function downloadHolding() {
    const still = stillCacheRef.current;
    if (!still) {
      setSaveNote("Could not save. Try 1200×480.");
      return;
    }
    const out = document.createElement("canvas");
    out.width = 1200;
    out.height = 480;
    const ctx = out.getContext("2d", { alpha: false });
    if (!ctx) return;
    const saved = skillPicksRef.current;
    skillPicksRef.current = [];
    paintOnto(ctx, still, 1200, 480);
    skillPicksRef.current = saved;
    out.toBlob((blob) => {
      if (!blob) {
        setSaveNote("Pete is not a miracle.");
        return;
      }
      const who = sanitizeDisplayName(streamer) || "desk";
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `holding-${edition.toLowerCase()}-${who.replace(/\s+/g, "-")}-1200x480.jpg`;
      a.click();
      URL.revokeObjectURL(a.href);
      setSaveNote("Saved holding card.");
    }, "image/jpeg", 0.92);
  }

  const visible = LOCATIONS.filter((loc) => {
    if (loc.edition !== edition) return false;
    if (placeGod && loc.god !== placeGod) return false;
    if (kind === "boss") return loc.kind === "boss" && Boolean(noteFor(loc.id));
    return loc.kind === "town" && Boolean(townNote(loc.id));
  });

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <EggToast />
      <SiteHeader skip={{ href: "#desk", label: "Skip to desk" }} />
      <TownHero onTown={(name, ed) => setHeroTown({ name, edition: ed })} />
      <OracleLine place={heroTown.name} edition={heroTown.edition} />
      <TodayDesk />
      <section className="page-band py-6">
        <h2 className="section-h2">Places to visit</h2>
        <div className="mb-3">
          <PlaceRail
            section={kind === "boss" ? "bosses" : "towns"}
            edition={edition}
            god={placeGod}
            onEdition={(next) => {
              setEdition(next);
              setSkillPack(next);
              const nextLoc = LOCATIONS.find((loc) => loc.kind === kind && loc.edition === next);
              if (nextLoc) setLocationId(nextLoc.id);
            }}
            onGod={setPlaceGod}
            onSection={(next) => {
              if (next === "towns") setKind("town");
              if (next === "bosses") setKind("boss");
              setPlaceCap(12);
            }}
          />
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4">
          {visible.slice(0, placeCap).map((loc, i) => {
            const raw = loc.stills?.length ? loc.stills[stillIndex(loc.stills.length, peteNow)] : loc.viewA;
            const src = stillAllowed(raw, loc.edition) ? raw : loc.viewA;
            const href = loc.kind === "boss" ? bossPath(loc.id) : townPath(loc.id);
            return (
              <div key={loc.id} className="overflow-hidden rounded-md border border-line hover:border-[#F5C400]" data-place-card data-slug={loc.id}>
                <AppLink href={href} className="block [touch-action:manipulation]">
                  <StillPhoto
                    src={src}
                    alt={`${loc.name}, ${loc.region}`}
                    priority={i < 2}
                    className="aspect-video w-full object-cover [content-visibility:auto]"
                  />
                </AppLink>
                <AppLink href={href} className="site-title block truncate px-2 pt-1.5 text-center text-sm no-underline">
                  {loc.name}
                </AppLink>
                <p className="px-2 pb-2 text-center text-[10px] text-faint">
                  {loc.region.replace(/\s·\sOSRS$/, "")} · {loc.god}
                </p>
              </div>
            );
          })}
        </div>
        {visible.length === 0 ? (
          <p className="text-center text-sm text-muted">Nothing interesting happens.</p>
        ) : null}
        {visible.length > placeCap ? (
          <button type="button" className="mt-3 text-xs text-parchment" onClick={() => setPlaceCap((n) => n + 12)}>
            Show more
          </button>
        ) : null}
      </section>

      <section id="desk" className="page-band scroll-mt-24 py-6">
        <div
          className="p-2 [contain:layout]"
          style={{
            background: "#241e16",
            border: "2px solid #c6a45a",
            borderRadius: 6,
            boxShadow: "inset 0 2px 10px rgba(0,0,0,0.45), inset 0 1px 0 rgba(198,164,90,0.18)",
          }}
        >
        <div
          id="plate"
          className="desk-preview-well relative mx-auto w-full overflow-hidden"
          ref={previewRef}
          style={{
            maxWidth: size.height > size.width ? "22rem" : "56rem",
            aspectRatio: `${size.width} / ${size.height}`,
            background: "#1a1610",
            boxShadow: "inset 0 8px 18px rgba(0,0,0,0.35)",
          }}
        >
          <img
            id="still"
            alt=""
            src={customSrc || deskStillSrc || location.viewA || "/Falador.png"}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            decoding="async"
            onLoad={(e) => {
              e.currentTarget.dataset.ok = e.currentTarget.currentSrc;
              setPlateCaption(`${location.name} · ${size.width}×${size.height} JPEG · ${size.note}`);
            }}
            onError={(e) => {
              const last = e.currentTarget.dataset.ok;
              if (last && e.currentTarget.src !== last) e.currentTarget.src = last;
            }}
          />
          <canvas
            id="overlay"
            key="overlay-alpha"
            ref={canvasRef}
            width={size.width}
            height={size.height}
            className={`desk-preview absolute inset-0 h-full w-full touch-none object-cover ${grabbing ? "cursor-grabbing" : overIcon ? "cursor-grab" : "cursor-default"}`}
            tabIndex={0}
            role="img"
            aria-label={`${location.name}, ${edition === "OSRS" ? "Old School RuneScape" : "RuneScape"}`}
            onWheel={(e) => {
              const canvas = canvasRef.current;
              if (!canvas) return;
              const rect = canvas.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width) * size.width;
              const y = ((e.clientY - rect.top) / rect.height) * size.height;
              const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 120 : 1;
              const factor = Math.exp(-e.deltaY * unit * 0.0024);
              let skillId = pickedSkill;
              if (!skillId) {
                const hit = [...skillPicksRef.current].reverse().find((item) => {
                  if (item.x == null || item.y == null) return false;
                  const mark = Math.max(28, (item.size ?? skillSize) * (item.scale ?? 1));
                  return x >= item.x && x <= item.x + mark && y >= item.y && y <= item.y + mark;
                });
                if (hit) {
                  skillId = hit.id;
                  setPickedSkill(hit.id);
                  setPickedText(null);
                }
              }
              if (skillId) {
                e.preventDefault();
                const lead = skillPicksRef.current.find((item) => item.id === skillId);
                const old = lead?.scale ?? 1;
                const next = e.shiftKey
                  ? Math.min(2.5, Math.max(0.5, old + (e.deltaY > 0 ? -0.25 : 0.25)))
                  : Math.min(2.5, Math.max(0.5, old * factor));
                applyStampScale(skillId, next);
                return;
              }
              let textId = pickedText;
              if (!textId) {
                const hit = [...boxesRef.current].reverse().find((box) => {
                  if (skillPicksRef.current.some((item) => item.id === box.id)) return false;
                  const hw = Math.max(28, box.w);
                  const hh = Math.max(28, box.h);
                  return x >= box.x && x <= box.x + hw && y >= box.y && y <= box.y + hh;
                });
                if (hit) {
                  textId = hit.id;
                  setPickedText(hit.id);
                  setPickedSkill(null);
                }
              }
              if (!textId) return;
              e.preventDefault();
              const old = textScaleRef.current[textId] ?? 1;
              const next = e.shiftKey
                ? Math.min(2, Math.max(0.75, old + (e.deltaY > 0 ? -0.25 : 0.25)))
                : Math.min(2, Math.max(0.75, old * factor));
              const box = boxesRef.current.find((row) => row.id === textId);
              if (box) {
                const ratio = next / Math.max(0.01, old);
                textPosRef.current = {
                  ...textPosRef.current,
                  [textId]: {
                    x: box.x + box.w / 2 - (box.w * ratio) / 2,
                    y: box.y + box.h / 2 - (box.h * ratio) / 2,
                  },
                };
              }
              textScaleRef.current = { ...textScaleRef.current, [textId]: next };
              requestPaint();
              window.clearTimeout(scaleTimer.current);
              scaleTimer.current = window.setTimeout(() => {
                setTextPos(textPosRef.current);
                setTextScale({ ...textScaleRef.current });
              }, 140);
            }}
            onPointerDown={(e) => {
              const canvas = canvasRef.current;
              if (!canvas) return;
              pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
              const rect = canvas.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width) * size.width;
              const y = ((e.clientY - rect.top) / rect.height) * size.height;
              const pad = Math.max(8, (44 * size.width) / Math.max(1, rect.width));
              if (pointersRef.current.size >= 2 && (pickedSkill || pickedText)) {
                const pts = [...pointersRef.current.values()];
                pinchRef.current = {
                  dist: Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y),
                  scale: pickedSkill
                    ? skillPicksRef.current.find((item) => item.id === pickedSkill)?.scale ?? 1
                    : textScaleRef.current[pickedText ?? ""] ?? 1,
                };
                canvas.setPointerCapture(e.pointerId);
                return;
              }
              if (armedSkill) {
                const marksOn = skillPicksRef.current.filter((item) => isMark(item.id)).length;
                if (isMark(armedSkill) && marksOn >= 16) {
                  setStatus("Sixteen marks on this banner.");
                  setArmedSkill(null);
                  return;
                }
                const prev = skillPicksRef.current.find((item) => item.id === armedSkill);
                const scale = prev?.scale ?? 1;
                const mark = Math.max(28, skillSize * scale);
                const px = Math.max(0, Math.min(size.width - mark, x));
                const py = Math.max(0, Math.min(size.height - mark, y));
                setSkillPicks((cur) => [
                  ...cur.filter((item) => item.id !== armedSkill),
                  {
                    id: armedSkill,
                    game: skillPack,
                    level: boardLevels[skillPack][armedSkill] ?? prev?.level ?? "",
                    x: px,
                    y: py,
                    size: prev?.size ?? skillSize,
                    scale,
                  },
                ]);
                setPickedSkill(armedSkill);
                setArmedSkill(null);
                return;
              }
              const skillHit = [...skillPicksRef.current].reverse().find((item) => {
                if (item.x == null || item.y == null) return false;
                const mark = Math.max(28, (item.size ?? skillSize) * (item.scale ?? 1));
                return x >= item.x && x <= item.x + mark && y >= item.y && y <= item.y + mark;
              });
              if (skillHit && skillHit.x != null && skillHit.y != null) {
                setPickedSkill(skillHit.id);
                setPickedText(null);
                if (e.detail >= 2) return;
                setGrabbing(true);
                draggingRef.current = true;
                dragRef.current = {
                  id: skillHit.id,
                  x0: skillHit.x,
                  y0: skillHit.y,
                  px: e.clientX,
                  py: e.clientY,
                  kind: "skill",
                  mates: packMates(skillHit.id)
                    .filter((item) => item.x != null && item.y != null)
                    .map((item) => ({ id: item.id, x0: item.x as number, y0: item.y as number })),
                };
                (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
                return;
              }
              const textHit = [...boxesRef.current].reverse().find((box) => {
                if (skillPicksRef.current.some((item) => item.id === box.id)) return false;
                const hw = Math.max(28, box.w);
                const hh = Math.max(28, box.h);
                return x >= box.x && x <= box.x + hw && y >= box.y && y <= box.y + hh;
              });
              if (!textHit) {
                if (pickedSkill) {
                  const lead = skillPicksRef.current.find((item) => item.id === pickedSkill);
                  if (lead) {
                    const mark = Math.max(28, (lead.size ?? skillSize) * (lead.scale ?? 1));
                    const px = Math.max(0, Math.min(size.width - mark, x));
                    const py = Math.max(0, Math.min(size.height - mark, y));
                    const mates = packMates(pickedSkill).filter((item) => item.x != null && item.y != null);
                    const dx = px - (lead.x ?? 0);
                    const dy = py - (lead.y ?? 0);
                    setSkillPicks((cur) =>
                      cur.map((item) => {
                        const mate = mates.find((row) => row.id === item.id);
                        if (!mate || item.x == null || item.y == null) {
                          if (item.id !== pickedSkill) return item;
                          return { ...item, x: px, y: py, scale: item.scale ?? 1 };
                        }
                        const extent = Math.max(28, (item.size ?? skillSize) * (item.scale ?? 1));
                        return {
                          ...item,
                          scale: item.scale ?? 1,
                          x: Math.max(0, Math.min(size.width - extent, item.x + dx)),
                          y: Math.max(0, Math.min(size.height - extent, item.y + dy)),
                        };
                      }),
                    );
                  }
                  return;
                }
                setPickedSkill(null);
                setPickedText(null);
                return;
              }
              setPickedText(textHit.id);
              setPickedSkill(null);
              setGrabbing(true);
              draggingRef.current = true;
              dragRef.current = {
                id: textHit.id,
                x0: textHit.x,
                y0: textHit.y,
                px: e.clientX,
                py: e.clientY,
                kind: "text",
              };
              (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
            }}
            onPointerMove={(e) => {
              const canvas = canvasRef.current;
              if (!canvas) return;
              if (pointersRef.current.has(e.pointerId)) pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
              if (pointersRef.current.size >= 2 && pinchRef.current && (pickedSkill || pickedText)) {
                e.preventDefault();
                const pts = [...pointersRef.current.values()];
                const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
                const ratio = dist / Math.max(8, pinchRef.current.dist);
                const next = pickedSkill
                  ? Math.min(2.5, Math.max(0.5, pinchRef.current.scale * ratio))
                  : Math.min(2, Math.max(0.75, pinchRef.current.scale * ratio));
                const current = pickedSkill
                  ? skillPicksRef.current.find((item) => item.id === pickedSkill)?.scale ?? 1
                  : textScaleRef.current[pickedText ?? ""] ?? 1;
                scaleSelected(next - current);
                return;
              }
              const rect = canvas.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width) * size.width;
              const y = ((e.clientY - rect.top) / rect.height) * size.height;
              const pad = Math.max(8, (44 * size.width) / Math.max(1, rect.width));
              setOverIcon(
                skillPicksRef.current.some((item) => {
                  if (item.x == null || item.y == null) return false;
                  const mark = Math.max(28, (item.size ?? skillSize) * (item.scale ?? 1));
                  return x >= item.x && x <= item.x + mark && y >= item.y && y <= item.y + mark;
                }) ||
                  boxesRef.current.some((box) => {
                    if (skillPicksRef.current.some((item) => item.id === box.id)) return false;
                    const hw = Math.max(28, box.w);
                    const hh = Math.max(28, box.h);
                    return x >= box.x && x <= box.x + hw && y >= box.y && y <= box.y + hh;
                  }),
              );
              const drag = dragRef.current;
              if (!drag) return;
              e.preventDefault();
              const rectScaleX = size.width / Math.max(1, rect.width);
              const rectScaleY = size.height / Math.max(1, rect.height);
              const nx = drag.x0 + (e.clientX - drag.px) * rectScaleX;
              const ny = drag.y0 + (e.clientY - drag.py) * rectScaleY;
              if (drag.kind === "text") {
                textPosRef.current = {
                  ...textPosRef.current,
                  [drag.id]: {
                    x: Math.max(8, Math.min(size.width - 40, nx)),
                    y: Math.max(16, Math.min(size.height - 8, ny)),
                  },
                };
                requestPaint();
                return;
              }
              const pick = skillPicksRef.current.find((item) => item.id === drag.id);
              if (!pick) return;
              const mates = drag.mates?.length ? drag.mates : [{ id: drag.id, x0: drag.x0, y0: drag.y0 }];
              const dx = (e.clientX - drag.px) * rectScaleX;
              const dy = (e.clientY - drag.py) * rectScaleY;
              skillPicksRef.current = skillPicksRef.current.map((item) => {
                const mate = mates.find((row) => row.id === item.id);
                if (!mate) return item;
                const mark = Math.max(28, (item.size ?? skillSize) * (item.scale ?? 1));
                return {
                  ...item,
                  scale: item.scale ?? 1,
                  x: Math.max(0, Math.min(size.width - mark, mate.x0 + dx)),
                  y: Math.max(0, Math.min(size.height - mark, mate.y0 + dy)),
                };
              });
              requestPaint();
            }}
            onPointerUp={(e) => {
              pointersRef.current.delete(e.pointerId);
              if (pointersRef.current.size < 2) pinchRef.current = null;
              try {
                (e.target as HTMLCanvasElement).releasePointerCapture(e.pointerId);
              } catch {
                /* already released */
              }
              dragRef.current = null;
              setGrabbing(false);
              draggingRef.current = false;
              setSkillPicks(skillPicksRef.current);
              setTextPos(textPosRef.current);
              requestPaint();
            }}
            onPointerCancel={(e) => {
              pointersRef.current.delete(e.pointerId);
              pinchRef.current = null;
              try {
                (e.target as HTMLCanvasElement).releasePointerCapture(e.pointerId);
              } catch {
                /* already released */
              }
              dragRef.current = null;
              setGrabbing(false);
              draggingRef.current = false;
              setSkillPicks(skillPicksRef.current);
              setTextPos(textPosRef.current);
              requestPaint();
            }}
          />
          {ghostZone !== "none"
            ? safeZoneRects(ghostZone).map((zone) => (
                <div
                  key={`${zone.label}-${zone.x}-${zone.y}`}
                  className="pointer-events-none absolute border border-dashed border-[#ffe9b0]/70 bg-black/20 text-[9px] text-[#ffe9b0]"
                  style={{
                    left: `${zone.x * 100}%`,
                    top: `${zone.y * 100}%`,
                    width: `${zone.w * 100}%`,
                    height: `${zone.h * 100}%`,
                  }}
                >
                  {zone.label ? <span className="px-1">{zone.label}</span> : null}
                </div>
              ))
            : null}
        </div>
        <p className="mt-2 text-center text-[10px] text-muted">
          {plateCaption || `${size.width}×${size.height} JPEG`}
        </p>
        <div className="mt-1 flex flex-wrap justify-center gap-1">
          {(["none", "twitch", "youtube", "discord"] as const).map((zone) => (
            <button
              key={zone}
              type="button"
              className={`min-h-11 rounded-md border px-2 text-[10px] ${ghostZone === zone ? "border-parchment" : "border-line"}`}
              onClick={() => setGhostZone(zone)}
            >
              {zone === "none" ? "Ghosts off" : zone === "twitch" ? "Twitch crop" : zone === "youtube" ? "YouTube crop" : "Discord crop"}
            </button>
          ))}
        </div>
        {plateFontOk ? null : (
          <p className="mt-1 text-center text-[10px] text-[#c07050]">Font file missing</p>
        )}
        <span className="rs-plate-probe" aria-hidden="true">
          CHRISTEFER
        </span>
        {LOCATIONS.some((row) => row.name === location.name && row.edition !== location.edition && row.kind === location.kind) ? (
          <p className="mt-1 text-center text-[10px]">
            <button
              type="button"
              className="text-parchment"
              onClick={() => {
                const sister = LOCATIONS.find(
                  (row) => row.name === location.name && row.edition !== location.edition && row.kind === location.kind,
                );
                if (!sister) return;
                setSkillPack(sister.edition);
                applyStill(sister.id, "a", sister.viewA);
              }}
            >
              Same place in the other game
            </button>
          </p>
        ) : null}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-1">
          {(["up", "down", "left", "right"] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              disabled={!pickedSkill && !pickedText}
              className="min-h-11 rounded-md border border-line px-2 text-[10px] capitalize disabled:opacity-40"
              onClick={(e) => {
                const step = e.shiftKey ? 8 : 2;
                if (pickedText) {
                  setTextPos((cur) => {
                    const pos = cur[pickedText] ?? boxesRef.current.find((box) => box.id === pickedText);
                    if (!pos) return cur;
                    let x = pos.x;
                    let y = pos.y;
                    if (dir === "left") x = Math.max(8, x - step);
                    if (dir === "right") x = Math.min(size.width - 40, x + step);
                    if (dir === "up") y = Math.max(16, y - step);
                    if (dir === "down") y = Math.min(size.height - 8, y + step);
                    return { ...cur, [pickedText]: { x, y } };
                  });
                  return;
                }
                setSkillPicks((cur) =>
                  cur.map((item) => {
                    if (item.id !== pickedSkill || item.x == null || item.y == null) return item;
                    const mark = Math.max(28, (item.size ?? skillSize) * (item.scale ?? 1));
                    const move = step * (item.scale ?? 1);
                    let x = item.x;
                    let y = item.y;
                    if (dir === "left") x = Math.max(0, x - move);
                    if (dir === "right") x = Math.min(size.width - mark, x + move);
                    if (dir === "up") y = Math.max(0, y - move);
                    if (dir === "down") y = Math.min(size.height - mark, y + move);
                    return { ...item, x, y, scale: item.scale ?? 1 };
                  }),
                );
              }}
            >
              {dir}
            </button>
          ))}
          <button
            type="button"
            disabled={!pickedSkill}
            className="min-h-11 rounded-md border border-line px-2 text-[10px] disabled:opacity-40"
            onClick={() => {
              setSkillPicks((cur) => {
                const lead = cur.find((item) => item.id === pickedSkill);
                if (lead?.group) return cur.filter((item) => item.group !== lead.group);
                return cur.filter((item) => item.id !== pickedSkill);
              });
              setPickedSkill(null);
            }}
          >
            Remove
          </button>
          <button
            type="button"
            disabled={!pickedSkill && !pickedText}
            className="h-11 min-w-11 rounded-md border border-line px-2 text-[10px] disabled:opacity-40"
            onClick={() => scaleSelected(0.08)}
          >
            +
          </button>
          <button
            type="button"
            disabled={!pickedSkill && !pickedText}
            className="h-11 min-w-11 rounded-md border border-line px-2 text-[10px] disabled:opacity-40"
            onClick={() => scaleSelected(-0.08)}
          >
            −
          </button>
          <button
            type="button"
            className="h-8 rounded-md border border-line px-2 text-[10px]"
            onClick={() => {
              const pool = (visible.length ? visible : LOCATIONS.filter((loc) => loc.kind === kind && loc.edition === edition)).filter(
                (loc) => Boolean(townPlateSrc(loc.id) || loc.viewA || loc.stills?.length),
              );
              if (!pool.length) return;
              const pick = pool[Math.floor(Math.random() * pool.length)];
              const raw = pick.stills?.length ? pick.stills[stillIndex(pick.stills.length, peteNow)] : pick.viewA;
              const src = townPlateSrc(pick.id) || (stillAllowed(raw, pick.edition) ? raw : pick.viewA);
              if (!src) return;
              applyStill(pick.id, "a", src);
            }}
          >
            Random
          </button>
          {pickedSkill && SKILLS.some((skill) => skill.id === pickedSkill) ? (
            <label className="flex h-8 items-center gap-1 text-[10px] text-muted">
              Level
              <input
                value={skillPicks.find((item) => item.id === pickedSkill)?.level ?? ""}
                inputMode="numeric"
                className="h-8 w-12 rounded-sm border border-[#c6a45a]/35 bg-[#1a1610] px-1 text-sm text-parchment outline-none ring-0 focus-visible:border-[#c6a45a]"
                onChange={(e) => {
                  const cap = skillLevelCap(pickedSkill, skillPack);
                  const next = sanitizeSkillLevel(e.target.value, cap);
                  setSkillPicks((cur) =>
                    cur.map((item) => (item.id === pickedSkill ? { ...item, level: next } : item)),
                  );
                }}
              />
            </label>
          ) : null}
        </div>

        <div className="mt-2 grid gap-2 lg:grid-cols-2" style={{ borderTop: "1px solid rgba(198,164,90,0.2)" }}>
        <div className="lg:border-r lg:border-[#c6a45a]/20">
          <p className="px-1 pt-2 text-[10px] text-muted">Skills</p>
          <div className="flex flex-col gap-1 p-1">
            <div className="flex flex-wrap gap-1">
              {(["OSRS", "RS3"] as const).map((pack) => (
                <button
                  key={pack}
                  type="button"
                  onClick={() => {
                    setSkillPack(pack);
                    dropIllegal(pack);
                  }}
                  className={`h-7 rounded-md border px-2 text-[10px] ${skillPack === pack ? "border-parchment bg-[#241e16]" : "border-line"}`}
                >
                  {pack === "OSRS" ? "Old School" : "RuneScape"}
                </button>
              ))}
              {BANNER_SIZES.map((box) => (
                <button
                  key={box.id}
                  type="button"
                  onClick={() => setSizeId(box.id)}
                  className={`min-h-11 rounded-md border px-2 text-[10px] ${sizeId === box.id ? "border-parchment" : "border-line"}`}
                >
                  {box.name}
                </button>
              ))}
              <button
                type="button"
                className="h-7 rounded-md border border-line px-2 text-[10px]"
                onClick={() => placeAllPack()}
              >
                All
              </button>
              <button type="button" className="h-7 rounded-md border border-line px-2 text-[10px]" onClick={() => setSkillPicks([])}>
                Clear
              </button>
            </div>
            <div className="grid grid-cols-4 gap-1 sm:grid-cols-6 xl:grid-cols-8">
              {SKILLS.filter((skill) => skill.editions.includes(skillPack)).map((skill) => {
                const pick = skillPicks.find((item) => item.id === skill.id);
                const on = armedSkill === skill.id || Boolean(pick);
                const cap = skillLevelCap(skill.id, skillPack);
                return (
                  <div key={skill.id} className="flex items-center gap-0.5">
                    <button
                      type="button"
                      title={skill.name}
                      aria-label={`Place ${skill.name}`}
                      aria-pressed={on}
                      onClick={() => placeStamp(skill.id)}
                      className={`flex size-8 shrink-0 items-center justify-center rounded-sm p-0 ${on ? "bg-[#241e16]" : "bg-[#1a140c]"}`}
                    >
                      <img src={skill.src} alt="" className={`size-6 object-contain ${skillPack === "OSRS" ? "[image-rendering:pixelated]" : ""}`} />
                    </button>
                    <input
                      aria-label={`${skill.name} level`}
                      inputMode="numeric"
                      value={pick?.level ?? boardLevels[skillPack][skill.id] ?? ""}
                      placeholder="—"
                      className="h-8 w-8 rounded-sm border border-[#c6a45a]/35 bg-[#1a1610] px-0.5 text-center text-[10px] text-parchment outline-none ring-0 focus-visible:border-[#c6a45a]"
                      onChange={(e) => {
                        const next = sanitizeSkillLevel(e.target.value, cap);
                        setSkillPicks((cur) => {
                          const existing = cur.find((item) => item.id === skill.id);
                          if (existing) {
                            return cur.map((item) => (item.id === skill.id ? { ...item, level: next } : item));
                          }
                          if (!next) return cur;
                          return [...cur, { id: skill.id, game: skillPack, level: next, size: skillSize, scale: packScale(cur.length + 1) }];
                        });
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div>
          <p className="px-1 text-[10px] text-muted">Marks</p>
          <div className="grid grid-cols-8 gap-0.5 p-1 sm:grid-cols-10">
            {MARKS.filter((mark) => mark.editions.includes(skillPack)).map((mark) => {
              const on = armedSkill === mark.id || skillPicks.some((item) => item.id === mark.id);
              return (
                <button
                  key={mark.id}
                  type="button"
                  title={mark.name}
                  aria-label={`Place ${mark.name}`}
                  aria-pressed={on}
                  onClick={() => placeStamp(mark.id)}
                  className={`flex size-12 items-center justify-center rounded-none bg-transparent p-0 ${on ? "outline outline-1 outline-[#F5C400]" : ""}`}
                >
                  <img src={mark.src} alt="" className={`size-8 object-contain ${skillPack === "OSRS" ? "[image-rendering:pixelated]" : ""}`} />
                </button>
              );
            })}
          </div>
          <p className="mt-1 px-1 text-[10px] text-muted">Your marks · 16–128px PNG or WebP, close to square. Session only.</p>
          <div className="flex flex-wrap items-center gap-1 p-1">
            <button
              type="button"
              className="h-8 rounded-md border border-line px-2 text-[10px] text-muted"
              onClick={() => markFileRef.current?.click()}
            >
              Upload a mark
            </button>
            <input
              ref={markFileRef}
              type="file"
              accept="image/png,image/webp,image/jpeg"
              className="sr-only"
              onChange={(e) => {
                const file = e.target.files?.[0];
                e.target.value = "";
                if (!file) return;
                if (file.size > 250_000) {
                  setStatus("That file is too heavy for a mark.");
                  return;
                }
                const src = URL.createObjectURL(file);
                const img = new Image();
                img.onload = () => {
                  const w = img.naturalWidth;
                  const h = img.naturalHeight;
                  const ratio = Math.max(w, h) / Math.max(1, Math.min(w, h));
                  if (w < 16 || h < 16 || w > 128 || h > 128 || ratio > 1.35) {
                    URL.revokeObjectURL(src);
                    setStatus("Mark must be 16–128px and nearly square.");
                    return;
                  }
                  const id = `mark-custom-${Date.now()}`;
                  stampBitmaps.current.set(src, img);
                  setCustomMarks((cur) => [...cur, { id, name: file.name.replace(/\.[^.]+$/, "").slice(0, 24) || "Mark", src, game: skillPack }]);
                  setSkillPicks((cur) => {
                    const marks = cur.filter((item) => isMark(item.id)).length;
                    if (marks >= 16) {
                      setStatus("Sixteen marks on this banner.");
                      return cur;
                    }
                    const n = cur.length;
                    const scale = packScale(n + 1);
                    const mark = skillSize * scale;
                    const left = Math.round(size.width * 0.04);
                    return [
                      ...cur,
                      {
                        id,
                        game: skillPack,
                        level: "",
                        x: left + (n % 8) * (mark + 8),
                        y: Math.round(size.height * 0.52 + Math.floor(n / 8) * (mark + 8)),
                        size: skillSize,
                        scale,
                      },
                    ];
                  });
                  setPickedSkill(id);
                  setArmedSkill(null);
                  requestPaint();
                  setStatus("Mark on the plate. Drag it like the others.");
                };
                img.onerror = () => {
                  URL.revokeObjectURL(src);
                  setStatus("That picture would not open.");
                };
                img.src = src;
              }}
            />
            {customMarks
              .filter((mark) => mark.game === skillPack)
              .map((mark) => {
                const on = armedSkill === mark.id || skillPicks.some((item) => item.id === mark.id);
                return (
                  <button
                    key={mark.id}
                    type="button"
                    title={mark.name}
                    aria-label={`Place ${mark.name}`}
                    aria-pressed={on}
                    onClick={() => placeStamp(mark.id)}
                    className={`flex size-12 items-center justify-center bg-transparent p-0 ${on ? "outline outline-1 outline-[#F5C400]" : ""}`}
                  >
                    <img src={mark.src} alt="" className="size-8 object-contain" />
                  </button>
                );
              })}
          </div>
        </div>
        </div>

        <div className="mt-2 grid grid-cols-2 gap-1.5 p-1 md:grid-cols-4">
          <label className="text-[10px] text-muted">
            Display name
            <input
              value={streamer}
              onChange={(e) => setStreamer(sanitizeDisplayName(e.target.value))}
              onPaste={(e) => {
                e.preventDefault();
                const text = e.clipboardData.getData("text/plain");
                setStreamer(sanitizeDisplayName(text));
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  window.dispatchEvent(new Event("rs-hiscores-lookup"));
                }
              }}
              maxLength={12}
              spellCheck={false}
              autoComplete="off"
              className="mt-0.5 min-h-11 w-full rounded-sm border border-[#c6a45a]/35 bg-[#1a1610] px-1 text-base text-parchment outline-none ring-0 focus-visible:border-[#c6a45a]"
            />
            {looksLikeStaffName(streamer) ? (
              <span className="block text-[10px] text-muted">Do not impersonate Jagex staff on a banner.</span>
            ) : (
              <span className="block text-[10px] text-faint">{streamer.length} / 12 · Twelve letters, as in game.</span>
            )}
            <button
              type="button"
              onClick={() => setBannerCaps((on) => !on)}
              className={`mt-1 h-7 rounded-md border px-2 text-[10px] ${bannerCaps ? "border-parchment bg-[#241e16]" : "border-line"}`}
            >
              Caps
            </button>
          </label>
          <label className="text-[10px] text-muted">
            Clan
            <input value={clan} onChange={(e) => setClan(sanitizeClan(e.target.value))} className="mt-0.5 min-h-11 w-full rounded-sm border border-[#c6a45a]/35 bg-[#1a1610] px-1 text-base text-parchment outline-none ring-0 focus-visible:border-[#c6a45a]" />
          </label>
          <label className="text-[10px] text-muted">
            Handle
            <input value={handle} onChange={(e) => setHandle(sanitizeHandle(e.target.value))} className="mt-0.5 min-h-11 w-full rounded-sm border border-[#c6a45a]/35 bg-[#1a1610] px-1 text-base text-parchment outline-none ring-0 focus-visible:border-[#c6a45a]" />
          </label>
          <label className="text-[10px] text-muted">
            Tagline
            <input value={tagline} onChange={(e) => setTagline(sanitizeTagline(e.target.value))} className="mt-0.5 min-h-11 w-full rounded-sm border border-[#c6a45a]/35 bg-[#1a1610] px-1 text-base text-parchment outline-none ring-0 focus-visible:border-[#c6a45a]" />
          </label>
          <label className="text-[10px] text-muted">
            Discord
            <input value={discord} onChange={(e) => setDiscord(sanitizeDiscord(e.target.value))} className="mt-0.5 min-h-11 w-full rounded-sm border border-[#c6a45a]/35 bg-[#1a1610] px-1 text-base text-parchment outline-none ring-0 focus-visible:border-[#c6a45a]" />
          </label>
          <label className="text-[10px] text-muted">
            Grind
            <input value={grind} onChange={(e) => setGrind(sanitizeGrind(e.target.value))} className="mt-0.5 min-h-11 w-full rounded-sm border border-[#c6a45a]/35 bg-[#1a1610] px-1 text-base text-parchment outline-none ring-0 focus-visible:border-[#c6a45a]" />
          </label>
          <label className="text-[10px] text-muted">
            World
            <input value={world} onChange={(e) => setWorld(sanitizeWorld(e.target.value))} className="mt-0.5 min-h-11 w-full rounded-sm border border-[#c6a45a]/35 bg-[#1a1610] px-1 text-base text-parchment outline-none ring-0 focus-visible:border-[#c6a45a]" />
          </label>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            if (customSrc?.startsWith("blob:")) URL.revokeObjectURL(customSrc);
            customFileRef.current = file;
            setCustomSrc(URL.createObjectURL(file));
            clearStampsAndText();
            setSceneReady(true);
          }}
        />

        <Suspense fallback={null}>
        <HiscoresLookup
          bare
          name={streamer}
          onName={setStreamer}
          onLevels={(levels, pack) => {
            const mapped: Record<string, string> = {};
            for (const [name, lvl] of Object.entries(levels)) {
              const id = skillIdForHiscore(name, pack);
              if (!id) continue;
              mapped[id] = sanitizeSkillLevel(lvl, skillLevelCap(id, pack));
            }
            setBoardLevels((cur) => ({ ...cur, [pack]: mapped }));
            setSkillPack(pack);
            setSkillPicks((cur) =>
              cur
                .filter((item) => item.game === pack)
                .map((item) => {
                if (item.game !== pack) return item;
                if (isMark(item.id)) return item;
                const next = mapped[item.id];
                if (!next) return item;
                if (next === "99" && sessionOnce("rs-deja-vu")) {
                  eggToast("You have a feeling of déjà vu.");
                  return { ...item, level: next, scale: Math.min(2.5, (item.scale ?? 1) * 1.12) };
                }
                return { ...item, level: next };
              }),
            );
          }}
        />
        </Suspense>
        </div>

        <article className="mt-3 px-1 text-xs text-muted">
          <h2 className="section-h2">How to use</h2>
          <ol className="list-decimal space-y-1 pl-4">
            <li>Pick a street you know.</li>
            <li>Twelve letters. Same rule as the client.</li>
            <li>Stamp what you wear. The rest can stay in the tray.</li>
            <li>Wheel to scale. Drag to place.</li>
            <li>Pixels are the platform’s. Match them.</li>
            <li>Pete writes the JPEG. That is the work.</li>
          </ol>
          <p className="mt-2 text-[11px] text-faint">Clips are on the Video editor page.</p>
        </article>
        <figure className="mt-4 flex flex-col items-center gap-2">
          <img
            src="/brand/postie-pete.png"
            alt="Postie Pete"
            className="h-36 w-auto cursor-pointer"
            onClick={() => {
              peteClicks.current += 1;
              if (peteLevel.current >= PETE_LINES.length) {
                if (peteClicks.current === peteThreshold(PETE_LINES.length) + 1) {
                  eggToast("Pete has no more mail.");
                }
                return;
              }
              if (peteClicks.current === peteThreshold(peteLevel.current + 1)) {
                eggToast(PETE_LINES[peteLevel.current]);
                peteLevel.current += 1;
              }
            }}
          />
          <p className="max-w-sm text-center text-sm text-parchment">
            {postieLineAt(peteNow)}
          </p>
          <p className="max-w-md text-center text-xs text-muted">
            One JPEG. Size is the chip you already picked.
          </p>
          <button
            type="button"
            onClick={downloadJpeg}
            className="min-h-11 rounded-md border border-parchment px-3 text-sm text-parchment"
          >
            Download
          </button>
          <p className="sr-only" aria-live="polite">
            {saveNote}
          </p>
          <p className="flex max-w-md flex-wrap justify-center gap-x-2 gap-y-1 text-center text-sm text-parchment">
            <Link to="/stream">How to go live</Link>
            <span className="text-faint">·</span>
            <Link to="/brief">Brief</Link>
            <span className="text-faint">·</span>
            <Link to="/legal">Legal</Link>
            <span className="text-faint">·</span>
            <a href="mailto:russell.christefer@gmail.com">russell.christefer@gmail.com</a>
            <span className="text-faint">·</span>
            <a
              href="https://legal.jagex.com/docs/policies/fan-content-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fan Content Policy
            </a>
          </p>
          <p className="text-center text-[11px] text-faint">Not in-game post.</p>
        </figure>
      </section>
    </div>
  );
}

export default Studio;
