import { useEffect, useMemo, useState } from "react";
import { ExternalLink, StarOff } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getWatchlist, removeFromWatchlist, type WatchItem } from "@/lib/watchlist";
import { getPlan, isAtLeastPro, type Plan } from "@/lib/plan";

export function WatchlistPanel() {
  const [plan, setPlan] = useState<Plan>("free");
  const [seed, setSeed] = useState(0);

  useEffect(() => {
    setPlan(getPlan());
  }, []);

  const pro = isAtLeastPro(plan);

  const items = useMemo<WatchItem[]>(() => {
    // seed triggers refresh
    void seed;
    return getWatchlist();
  }, [seed]);

  if (!pro) {
    return (
      <Card className="card-gradient border-border">
        <div className="p-4 md:p-5">
          <div className="text-sm font-semibold">Watchlist</div>
          <div className="text-xs text-muted-foreground mt-1">
            Watchlists are a Pro feature (stored locally for now).
          </div>
          <div className="mt-4">
            <Button asChild variant="heroOutline">
              <a href="/pricing">Upgrade to Pro</a>
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="card-gradient border-border">
      <div className="p-4 md:p-5">
        <div className="text-sm font-semibold">Watchlist</div>
        <div className="text-xs text-muted-foreground mt-1">Saved locally on this device (frontend MVP).</div>

        <div className="mt-4 space-y-2">
          {items.map((it) => (
            <div
              key={it.conditionId}
              className="flex items-start justify-between gap-3 rounded-xl border border-border bg-background/40 px-3 py-2"
            >
              <div className="flex-1 min-w-0">
                <div className="text-sm line-clamp-2">{it.question || it.slug}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Added: {new Date(it.addedAt).toISOString().slice(0, 10)}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  className="text-xs text-primary inline-flex items-center gap-1 hover:underline"
                  href={`https://polymarket.com/market/${it.slug}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  open <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>

                <Button
                  variant="secondary"
                  size="icon"
                  aria-label="Remove from watchlist"
                  onClick={() => {
                    removeFromWatchlist(it.conditionId);
                    setSeed((x) => x + 1);
                  }}
                >
                  <StarOff className="w-4 h-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          ))}

          {items.length === 0 && <div className="text-sm text-muted-foreground">No items yet. Star a market to save it.</div>}
        </div>
      </div>
    </Card>
  );
}
