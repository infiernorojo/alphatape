export type WatchItem = {
  conditionId: string;
  slug: string;
  question: string;
  addedAt: number;
};

const KEY = "alphatape_watchlist";

export function getWatchlist(): WatchItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((x) => x && typeof x.conditionId === "string" && typeof x.slug === "string")
      .map((x) => ({
        conditionId: String(x.conditionId),
        slug: String(x.slug),
        question: String(x.question ?? ""),
        addedAt: Number(x.addedAt ?? Date.now()),
      }));
  } catch {
    return [];
  }
}

export function setWatchlist(items: WatchItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(items.slice(0, 200)));
}

export function isWatched(conditionId: string) {
  return getWatchlist().some((i) => i.conditionId === conditionId);
}

export function addToWatchlist(item: Omit<WatchItem, "addedAt">) {
  const list = getWatchlist();
  if (list.some((i) => i.conditionId === item.conditionId)) return list;
  const next = [{ ...item, addedAt: Date.now() }, ...list];
  setWatchlist(next);
  return next;
}

export function removeFromWatchlist(conditionId: string) {
  const next = getWatchlist().filter((i) => i.conditionId !== conditionId);
  setWatchlist(next);
  return next;
}
