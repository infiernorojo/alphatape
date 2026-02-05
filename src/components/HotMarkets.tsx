import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Flame } from "lucide-react";

import { apiTrades, type PolymarketTrade } from "@/lib/polymarket";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getPlan, isAtLeastPro, type Plan } from "@/lib/plan";

function notionalUsd(t: PolymarketTrade) {
  const v = Number(t.size) * Number(t.price);
  return Number.isFinite(v) ? v : 0;
}

function formatUsd(v: number) {
  if (!Number.isFinite(v)) return "—";
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(2)}M`;
  if (v >= 1_000) return `$${(v / 1_000).toFixed(1)}k`;
  return `$${v.toFixed(0)}`;
}

type HotRow = {
  conditionId: string;
  slug?: string;
  title?: string;
  trades: number;
  totalNotional: number;
  lastPrice?: number;
  lastSide?: string;
};

export function HotMarkets() {
  const [plan, setPlan] = useState<Plan>("free");
  useEffect(() => setPlan(getPlan()), []);
  const pro = isAtLeastPro(plan);

  const limit = pro ? 200 : 60;
  const filterAmount = pro ? 150 : 1000;

  const q = useQuery({
    queryKey: ["pm-hot-markets", { limit, filterAmount }],
    queryFn: () => apiTrades({ limit, filterType: "CASH", filterAmount }),
    staleTime: 20_000,
    refetchInterval: pro ? 20_000 : 60_000,
  });

  const rows = useMemo<HotRow[]>(() => {
    const trades = q.data ?? [];
    const map = new Map<string, HotRow>();

    for (const t of trades) {
      const id = t.conditionId;
      if (!id) continue;
      const cur = map.get(id) ?? {
        conditionId: id,
        slug: t.slug,
        title: t.title,
        trades: 0,
        totalNotional: 0,
      };

      cur.trades += 1;
      cur.totalNotional += notionalUsd(t);
      // first pass is newest -> keep first as last seen
      if (cur.lastPrice === undefined) {
        cur.lastPrice = Number(t.price);
        cur.lastSide = String(t.side);
      }
      if (!cur.slug && t.slug) cur.slug = t.slug;
      if (!cur.title && t.title) cur.title = t.title;

      map.set(id, cur);
    }

    return [...map.values()].sort((a, b) => b.totalNotional - a.totalNotional).slice(0, 10);
  }, [q.data]);

  return (
    <Card className="card-gradient border-border">
      <div className="p-4 md:p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-sm font-semibold inline-flex items-center gap-2">
              <Flame className="w-4 h-4 text-primary" aria-hidden="true" />
              Hot Markets Radar
            </div>
            <div className="text-xs text-muted-foreground">
              Retail-friendly: shows where recent large trades are concentrating (simple aggregation of the tape).
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            Plan: <span className="text-foreground font-semibold">{plan.toUpperCase()}</span>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-5 pb-5">
        {q.isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : q.isError ? (
          <div className="text-sm text-red-300">Failed to load radar. {String(q.error)}</div>
        ) : (
          <div className="space-y-2">
            {rows.map((r) => (
              <div
                key={r.conditionId}
                className="flex items-start justify-between gap-3 rounded-xl border border-border bg-background/40 px-3 py-2"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-sm leading-snug line-clamp-2">{r.title ?? "Market"}</div>
                  <div className="text-xs text-muted-foreground mt-1 flex flex-wrap gap-x-3 gap-y-1">
                    <span>Trades: {r.trades}</span>
                    <span>Notional: {formatUsd(r.totalNotional)}</span>
                    {Number.isFinite(r.lastPrice) ? <span>Last: {Number(r.lastPrice).toFixed(3)}</span> : null}
                    {r.lastSide ? <span>{r.lastSide}</span> : null}
                  </div>
                </div>

                <div className="text-right whitespace-nowrap">
                  {r.slug ? (
                    <a
                      className="text-xs text-primary inline-flex items-center gap-1 hover:underline"
                      href={`https://polymarket.com/market/${r.slug}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      open <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="text-xs text-muted-foreground">open —</span>
                  )}
                </div>
              </div>
            ))}

            {rows.length === 0 && <div className="text-sm text-muted-foreground">No activity returned.</div>}

            {!pro && (
              <div className="mt-3 text-xs text-muted-foreground">
                Pro shows more markets by lowering the threshold and scanning a bigger slice of the tape.
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
