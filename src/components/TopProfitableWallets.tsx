import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Copy as CopyIcon, Trophy } from "lucide-react";
import { toast } from "sonner";

import { apiTrades, apiPositions, type PolymarketTrade, type PolymarketPosition } from "@/lib/polymarket";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getPlan, isAtLeastPro, type Plan } from "@/lib/plan";
import { addToWatchlist } from "@/lib/watchlist";

function shortAddr(addr: string, chars = 5) {
  return `${addr.slice(0, 2 + chars)}…${addr.slice(-chars)}`;
}

function notionalUsd(t: PolymarketTrade) {
  const v = Number(t.size) * Number(t.price);
  return Number.isFinite(v) ? v : 0;
}

function fmtUsd(v: number) {
  if (!Number.isFinite(v)) return "—";
  const sign = v < 0 ? "-" : "";
  const x = Math.abs(v);
  if (x >= 1_000_000) return `${sign}$${(x / 1_000_000).toFixed(2)}M`;
  if (x >= 1_000) return `${sign}$${(x / 1_000).toFixed(1)}k`;
  return `${sign}$${x.toFixed(0)}`;
}

type Period = "1d" | "7d" | "30d";

type Row = {
  wallet: string;
  flowNotional: number;
  pnlCash: number;
  pnlRealized: number;
  initialValue: number;
  positions: PolymarketPosition[];
};

export function TopProfitableWallets() {
  const [plan, setPlan] = useState<Plan>("free");
  const [period, setPeriod] = useState<Period>("1d");

  useEffect(() => setPlan(getPlan()), []);
  const pro = isAtLeastPro(plan);
  const team = plan === "team";

  const now = Math.floor(Date.now() / 1000);
  const cutoff = useMemo(() => {
    if (period === "1d") return now - 24 * 3600;
    if (period === "7d") return now - 7 * 24 * 3600;
    return now - 30 * 24 * 3600;
  }, [period, now]);

  // Built from wallets seen in the tape (verifiable + fast)
  const tradesQ = useQuery({
    queryKey: ["pm-trades-for-top-wallets", { plan }],
    queryFn: () => apiTrades({ limit: pro ? 600 : 200, filterType: "CASH", filterAmount: pro ? 150 : 1000 }),
    enabled: pro,
    staleTime: 15_000,
    refetchInterval: 30_000,
  });

  const candidateWallets = useMemo(() => {
    const trades = (tradesQ.data ?? []).filter((t) => (t.timestamp ?? 0) >= cutoff);
    const map = new Map<string, number>();
    for (const t of trades) {
      if (!t.proxyWallet) continue;
      map.set(t.proxyWallet, (map.get(t.proxyWallet) ?? 0) + notionalUsd(t));
    }
    return [...map.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, pro ? 10 : 0)
      .map(([wallet, flowNotional]) => ({ wallet, flowNotional }));
  }, [tradesQ.data, cutoff, pro]);

  const walletsKey = candidateWallets.map((w) => w.wallet).join(",");

  const rowsQ = useQuery({
    queryKey: ["pm-top-profitable-wallets", period, walletsKey],
    enabled: pro && candidateWallets.length > 0,
    queryFn: async (): Promise<Row[]> => {
      const out: Row[] = [];

      const results = await Promise.all(
        candidateWallets.map(async (w) => {
          const positions = await apiPositions({ user: w.wallet, limit: 30, sortBy: "CASHPNL", sortDirection: "DESC", sizeThreshold: 1 });
          const pnlCash = positions.reduce((s, p) => s + Number(p.cashPnl ?? 0), 0);
          const pnlRealized = positions.reduce((s, p) => s + Number(p.realizedPnl ?? 0), 0);
          const initialValue = positions.reduce((s, p) => s + Number(p.initialValue ?? 0), 0);
          return { wallet: w.wallet, flowNotional: w.flowNotional, pnlCash, pnlRealized, initialValue, positions } as Row;
        })
      );

      for (const r of results) out.push(r);

      return out.sort((a, b) => b.pnlCash - a.pnlCash).slice(0, 10);
    },
    staleTime: 20_000,
  });

  if (!pro) return null;

  return (
    <Card className="card-gradient border-border">
      <div className="p-4 md:p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold inline-flex items-center gap-2">
              <Trophy className="w-4 h-4 text-primary" aria-hidden="true" />
              Top Profitable Wallets (active in window)
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Filtered by activity in the selected window and ranked by <span className="text-foreground">cashPnl</span>
              (as returned by Polymarket Data API).
            </div>
          </div>

          <div className="flex items-center gap-2">
            {([
              { id: "1d", label: "Today" },
              { id: "7d", label: "7d" },
              { id: "30d", label: "30d" },
            ] as const).map((p) => (
              <button
                key={p.id}
                className={
                  "px-3 py-1.5 rounded-lg text-xs border transition-colors " +
                  (period === p.id ? "border-primary/50 bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:text-foreground")
                }
                onClick={() => setPeriod(p.id)}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 md:px-5 pb-5">
        {tradesQ.isLoading || rowsQ.isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : tradesQ.isError || rowsQ.isError ? (
          <div className="text-sm text-red-300">Failed to load wallets. {String(tradesQ.error ?? rowsQ.error)}</div>
        ) : (
          <div className="space-y-2">
            {(rowsQ.data ?? []).map((r) => (
              <div
                key={r.wallet}
                className="flex items-start justify-between gap-3 rounded-xl border border-border bg-background/40 px-3 py-2"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{shortAddr(r.wallet)}</div>
                  <div className="text-xs text-muted-foreground mt-1 flex flex-wrap gap-x-3 gap-y-1">
                    <span>cashPnl: {fmtUsd(r.pnlCash)}</span>
                    <span>realized: {fmtUsd(r.pnlRealized)}</span>
                    <span>tape flow: {fmtUsd(r.flowNotional)}</span>
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
                        // Copy portfolio → add current positions into watchlist
                        const positions = await apiPositions({ user: r.wallet, limit: 30, sortBy: "CURRENT", sortDirection: "DESC", sizeThreshold: 1 });
                        let added = 0;
                        for (const p of positions) {
                          if (!p.conditionId || !p.slug) continue;
                          addToWatchlist({ conditionId: p.conditionId, slug: p.slug, question: p.title ?? p.slug });
                          added += 1;
                        }
                        toast.success(`Copied ${added} markets → watchlist`);
                      }}
                    >
                      <CopyIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                      Copy wallet
                    </Button>
                  )}
                </div>
              </div>
            ))}

            <div className="mt-3 text-[11px] text-muted-foreground">
              Method: we sample wallets active in the selected window and rank by Polymarket Data API PnL fields.
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
