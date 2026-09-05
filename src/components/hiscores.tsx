import { useEffect, useMemo, useRef, useState } from "react";
import { HISCORE_URLS, loadHiscores, type HiscoreRow } from "@/lib/hiscores";
import { hiscoresQuery, sanitizeDisplayNameLive } from "@/lib/rsText";

export function HiscoresLookup({
  name: boundName,
  onName,
  onLevels,
  bare = false,
}: {
  name?: string;
  onName?: (next: string) => void;
  onLevels?: (levels: Record<string, string>, edition: "OSRS" | "RS3") => void;
  bare?: boolean;
}) {
  const [localName, setLocalName] = useState(() => {
    try {
      return window.localStorage.getItem("rs-hiscore-name") ?? "";
    } catch {
      return "";
    }
  });
  const name = boundName ?? localName;
  function setName(next: string) {
    setLocalName(next);
    onName?.(next);
  }
  const [edition, setEdition] = useState<"OSRS" | "RS3">("OSRS");
  const [rows, setRows] = useState<HiscoreRow[] | null>(null);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [filter, setFilter] = useState("");
  const [foundName, setFoundName] = useState("");
  const seq = useRef(0);
  const abortRef = useRef<AbortController | null>(null);
  const nameRef = useRef(name);
  nameRef.current = name;
  const editionRef = useRef(edition);
  editionRef.current = edition;

  async function lookup(nextEdition = editionRef.current) {
    const clean = hiscoresQuery(nameRef.current);
    if (!clean) {
      setStatus("Type a display name first.");
      return;
    }
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    const id = ++seq.current;
    setBusy(true);
    setStatus(
      nextEdition === "OSRS"
        ? "Looking up on Old School Hiscores…"
        : "Looking up on RuneScape Hiscores…",
    );
    try {
      const next = await loadHiscores(clean, nextEdition, ctrl.signal);
      if (id !== seq.current) return;
      setRows(next);
      setFoundName(clean);
      const filled: Record<string, string> = {};
      for (const row of next) {
        if (row.skill === "Overall") continue;
        filled[row.skill.toLowerCase()] = String(row.level);
      }
      onLevels?.(filled, nextEdition);
      try {
        const nines = next
          .filter((row) => row.skill !== "Overall" && Number(row.level) >= 99)
          .map((row) => row.skill.toLowerCase());
        sessionStorage.setItem("rs-99-skills", JSON.stringify(nines));
      } catch {
        /* ignore */
      }
      setStatus(next.length ? "Found" : "Not on that board.");
    } catch {
      if (id !== seq.current) return;
      setStatus("Boards are busy. Download is not.");
    } finally {
      if (id === seq.current) setBusy(false);
    }
  }

  useEffect(() => {
    const onLookup = () => {
      void lookup();
    };
    window.addEventListener("rs-hiscores-lookup", onLookup);
    return () => {
      window.removeEventListener("rs-hiscores-lookup", onLookup);
      abortRef.current?.abort();
    };
  }, []);

    const officialName = hiscoresQuery(name);
    const official = officialName
      ? edition === "OSRS"
        ? HISCORE_URLS.osrsPage(officialName)
        : HISCORE_URLS.rs3Page(officialName)
      : "";
    const wom = officialName && edition === "OSRS" ? HISCORE_URLS.osrsWom(officialName) : "";

  const overall = rows?.find((row) => row.skill === "Overall");
  const shown = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!rows) return [];
    if (!q) return rows;
    return rows.filter((row) => row.skill.toLowerCase().includes(q));
  }, [rows, filter]);

  return (
    <section className={bare ? "" : "overflow-hidden rounded-md border border-line bg-raised"}>
      {bare ? null : (
      <h2 className="border-b border-line px-3 py-2 text-center text-sm font-semibold tracking-tight text-parchment">
        Hiscores
      </h2>
      )}
      <div className={bare ? "pt-2" : "px-2 py-2"}>
      <p className="mb-2 text-[11px] text-muted">
        Type a display name. Jagex first. Old School may fall back to Wise
        Old Man, a community board, not Jagex. Not found means not on that
        board.
      </p>
      <form
        className="flex flex-col gap-2 sm:flex-row sm:items-center"
        onSubmit={(e) => {
          e.preventDefault();
          void lookup();
        }}
      >
        <input
          value={name}
          onChange={(e) => {
            const next = sanitizeDisplayNameLive(e.target.value);
            setName(next);
            try {
              window.localStorage.setItem("rs-hiscore-name", next);
            } catch {
              /* ignore */
            }
          }}
          maxLength={12}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          enterKeyHint="done"
          placeholder="Display name"
          className="h-11 flex-1 rounded-md border border-line bg-raised px-3 text-base text-fg placeholder:text-faint outline-none focus-visible:border-parchment"
        />
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => {
              setEdition("OSRS");
              if (hiscoresQuery(name)) void lookup("OSRS");
            }}
            className={`h-10 rounded-md border px-3 text-xs ${
              edition === "OSRS" ? "border-parchment bg-surface" : "border-line hover:bg-white/[0.08]"
            }`}
          >
            Old School™
          </button>
          <button
            type="submit"
            disabled={busy}
            className="h-10 rounded-md border px-4 text-xs font-semibold disabled:opacity-60"
            style={{
              borderColor: "#5a1008",
              background: "linear-gradient(180deg, #c43a28 0%, #8a1c14 55%, #4a0c08 100%)",
              color: "#f8e6c8",
              textShadow: "0 1px 0 #2a0604",
              boxShadow: "inset 0 1px 0 rgba(255,200,180,0.35)",
            }}
          >
            {busy ? "Looking…" : "Look up"}
          </button>
          <button
            type="button"
            onClick={() => {
              setEdition("RS3");
              if (hiscoresQuery(name)) void lookup("RS3");
            }}
            className={`h-10 rounded-md border px-3 text-xs ${
              edition === "RS3" ? "border-parchment bg-raised" : "border-line hover:bg-white/[0.08]"
            }`}
          >
            RuneScape™
          </button>
        </div>
      </form>
      {status ? (
        <p className="mt-2 text-xs text-muted" aria-live="polite">
          {status}
        </p>
      ) : null}
      {officialName ? (
        <a
          href={official}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-block text-xs text-parchment"
        >
          Official hiscores for {officialName}
        </a>
      ) : null}
      {wom ? (
        <a
          href={wom}
          target="_blank"
          rel="noreferrer"
          className="mt-1 inline-block text-xs text-parchment"
        >
          Wise Old Man for {officialName}
        </a>
      ) : null}
      {overall ? (
        <p className="mt-2 font-mono text-sm tabular-nums text-parchment">
          {foundName || officialName} · total {overall.level.toLocaleString()}
          {" · "}
          {overall.xp.toLocaleString()} xp
          {overall.rank > 0 ? ` · rank ${overall.rank.toLocaleString()}` : ""}
        </p>
      ) : null}
      {rows && rows.length > 0 ? (
        <>
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter skill"
            className="mt-2 h-8 w-full rounded-md border border-line bg-bg px-2 text-xs text-fg outline-none focus:border-parchment"
          />
          <div className="mt-2 max-h-56 overflow-auto">
            <table className="w-full text-left text-xs">
              <thead className="sticky top-0 bg-raised text-faint">
                <tr>
                  <th className="py-1.5 pr-2">Skill</th>
                  <th className="pr-2">Level</th>
                  <th className="pr-2">XP</th>
                  <th>Rank</th>
                </tr>
              </thead>
              <tbody>
                {shown.map((row) => (
                  <tr
                    key={row.skill}
                    className={`border-t border-line ${row.skill === "Overall" ? "text-parchment" : ""}`}
                  >
                    <td className="py-1.5 pr-2">{row.skill}</td>
                    <td className="pr-2 tabular-nums">{row.level}</td>
                    <td className="pr-2 tabular-nums">{row.xp.toLocaleString()}</td>
                    <td className="tabular-nums">{row.rank > 0 ? row.rank.toLocaleString() : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : null}
      </div>
    </section>
  );
}
