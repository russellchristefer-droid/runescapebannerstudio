/** One in-flight promise per key so a crowd of visitors does not stampede Jagex / Helix. */
const inflight = new Map<string, Promise<unknown>>();

export function singleFlight<T>(key: string, run: () => Promise<T>): Promise<T> {
  const hit = inflight.get(key);
  if (hit) return hit as Promise<T>;
  const next = run().finally(() => {
    if (inflight.get(key) === next) inflight.delete(key);
  });
  inflight.set(key, next);
  return next;
}

type Entry<T> = { at: number; value: T };

/** LRU-ish TTL bag. Oldest keys drop first when the cap is hit. */
export function makeTtlCache<T>(max = 256, ttlMs = 60_000) {
  const bag = new Map<string, Entry<T>>();
  return {
    get(key: string): T | undefined {
      const hit = bag.get(key);
      if (!hit) return undefined;
      if (Date.now() - hit.at > ttlMs) {
        bag.delete(key);
        return undefined;
      }
      bag.delete(key);
      bag.set(key, hit);
      return hit.value;
    },
    set(key: string, value: T) {
      if (bag.has(key)) bag.delete(key);
      bag.set(key, { at: Date.now(), value });
      while (bag.size > max) {
        const first = bag.keys().next().value;
        if (!first) break;
        bag.delete(first);
      }
    },
    size() {
      return bag.size;
    },
    clear() {
      bag.clear();
    },
  };
}

export function capMap<K, V>(bag: Map<K, V>, max: number) {
  while (bag.size > max) {
    const first = bag.keys().next().value;
    if (first === undefined) break;
    bag.delete(first);
  }
}
