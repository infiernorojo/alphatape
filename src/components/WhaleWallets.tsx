import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Copy as CopyIcon, ExternalLink, Users } from "lucide-react";
import { toast } from "sonner";

import { apiPositions, apiTrades, type PolymarketTrade } from "@/lib/polymarket";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getPlan, isAtLeastPro, type Plan } from "@/lib/plan";
import { addToWatchlist } from "@/lib/watchlist";

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

function shortAddr(addr: string, chars = 5) {
  if (!addr) return "";
  return `${addr.slice(0, 2 + chars)}…${addr.slice(-chars)}`;
}

type Row = {
  wallet: string;
  trades: number;
  totalNotional: number;
  lastTs?: number;
};

export function WhaleWallets() {
  const [plan, setPlan] = useState<Plan>("free");
  useEffect(() => setPlan(getPlan()), []);
  const pro = isAtLeastPro(plan);
  const team = plan === "team";

  const limit = pro ? 250 : 80;
  const filterAmount = pro ? 150 : 1000;

  const q = useQuery({
    queryKey: ["pm-whale-wallets", { limit, filterAmount }],
    queryFn: () => apiTrades({ limit, filterType: "CASH", filterAmount }),
    staleTime: 20_000,
    refetchInterval: pro ? 20_000 : 60_000,
  });

  const rows = useMemo<Row[]>(() => {
    const trades = q.data ?? [];
    const map = new Map<string, Row>();

    for (const t of trades) {
      const w = t.proxyWallet;
      if (!w) continue;

      const cur = map.get(w) ?? { wallet: w, trades: 0, totalNotional: 0 };
      cur.trades += 1;
      cur.totalNotional += notionalUsd(t);
      if (cur.lastTs === undefined) cur.lastTs = t.timestamp;
      map.set(w, cur);
    }

    return [...map.values()].sort((a, b) => b.totalNotional - a.totalNotional).slice(0, 10);
  }, [q.data]);

  return (
    <Card className="card-gradient border-border">
      <div className="p-4 md:p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-sm font-semibold inline-flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" aria-hidden="true" />
              Whale Wallets (Radar)
            </div>
            <div className="text-xs text-muted-foreground">
              Simple leaderboard from recent large trades. Click a wallet to inspect it.
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
          <div className="text-sm text-red-300">Failed to load wallets. {String(q.error)}</div>
        ) : (
          <div className="space-y-2">
            {rows.map((r) => (
              <div
                key={r.wallet}
                className="flex items-start justify-between gap-3 rounded-xl border border-border bg-background/40 px-3 py-2"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{shortAddr(r.wallet)}</div>
                  <div className="text-xs text-muted-foreground mt-1 flex flex-wrap gap-x-3 gap-y-1">
                    <span>Trades: {r.trades}</span>
                    <span>Notional: {formatUsd(r.totalNotional)}</span>
                  </div>
                </div>

                <div className="text-right whitespace-nowrap flex flex-col items-end gap-1">
                  <a className="text-xs text-primary hover:underline" href={`/demo?wallet=${encodeURIComponent(r.wallet)}`}>
                    inspect
                  </a>
                  <a
                    className="text-xs text-muted-foreground inline-flex items-center gap-1 hover:text-foreground"
                    href={`https://polygonscan.com/address/${r.wallet}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    scan <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>

                  {team && (
                    <Button
                      variant="secondary"
                      size="sm"
                      className="mt-1"
                      onClick={async () => {
                        const positions = await apiPositions({ user: r.wallet, limit: 50, sortBy: "CURRENT", sortDirection: "DESC", sizeThreshold: 1 });
                        let added = 0;
                        for (const p of positions) {
                          if (!p.conditionId || !p.slug) continue;
                          addToWatchlist({ conditionId: p.conditionId, slug: p.slug, question: p.title ?? p.slug });
                          added += 1;
                        }
                        toast.success(`Copied ${added} positions → watchlist`);
                      }}
                    >
                      <CopyIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                      Copy
                    </Button>
                  )}
                </div>
              </div>
            ))}

            {rows.length === 0 && <div className="text-sm text-muted-foreground">No wallets returned.</div>}

            {!pro && (
              <div className="mt-3 text-xs text-muted-foreground">
                Pro shows a broader radar by scanning more trades and lowering the threshold.
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
