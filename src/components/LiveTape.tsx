import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, RefreshCw } from "lucide-react";

import { apiTrades, type PolymarketTrade } from "@/lib/polymarket";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function shortAddr(addr?: string, chars = 4) {
  if (!addr) return "";
  if (addr.length <= 2 * chars + 2) return addr;
  return `${addr.slice(0, 2 + chars)}…${addr.slice(-chars)}`;
}

function formatUsdNotional(t: PolymarketTrade) {
  // size is outcome tokens; price is USDC per token. This is an approximation of notional.
  const v = Number(t.size) * Number(t.price);
  if (!Number.isFinite(v)) return "—";
  return v.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function formatTime(ts?: number) {
  if (!ts) return "—";
  const d = new Date(ts * 1000);
  return d.toISOString().replace("T", " ").slice(0, 16) + " UTC";
}

export function LiveTape({ compact = false }: { compact?: boolean }) {
  const query = useQuery({
    queryKey: ["pm-trades", { limit: compact ? 8 : 15 }],
    queryFn: () => apiTrades({ limit: compact ? 8 : 15, filterType: "CASH", filterAmount: 1000 }),
    refetchInterval: 30_000,
  });

  const trades = useMemo(() => query.data ?? [], [query.data]);

  return (
    <Card className="card-gradient border-border">
      <div className="p-4 md:p-5 flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">Live Whale Tape</div>
          <div className="text-xs text-muted-foreground">
            Real trades from Polymarket Data API (proxied). Refreshes every ~30s.
          </div>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => query.refetch()}
          disabled={query.isFetching}
          aria-label="Refresh"
        >
          <RefreshCw className={"w-4 h-4 " + (query.isFetching ? "animate-spin" : "")} />
        </Button>
      </div>

      <div className="px-4 md:px-5 pb-5">
        {query.isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: compact ? 6 : 10 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        ) : query.isError ? (
          <div className="text-sm text-red-300">
            Failed to load tape. {String(query.error)}
          </div>
        ) : (
          <div className="space-y-2">
            {trades.map((t) => (
              <div
                key={(t.transactionHash ?? "") + String(t.timestamp) + t.asset}
                className="flex items-start justify-between gap-3 rounded-xl border border-border bg-background/40 px-3 py-2"
              >
                <div className="min-w-14 pt-0.5">
                  <span className={"text-xs font-bold " + (t.side === "BUY" ? "text-primary" : "text-red-400")}>
                    {t.side}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-sm leading-snug line-clamp-2">
                    {t.title ?? "Market"} <span className="text-muted-foreground">({t.outcome ?? ""})</span>
                  </div>
                  <div className="text-xs text-muted-foreground flex flex-wrap gap-x-3 gap-y-1 mt-1">
                    <span>Price: {Number(t.price).toFixed(3)}</span>
                    <span>Notional: {formatUsdNotional(t)}</span>
                    <span>Time: {formatTime(t.timestamp)}</span>
                  </div>
                </div>

                <div className="text-right whitespace-nowrap">
                  <div className="text-xs text-muted-foreground">{shortAddr(t.proxyWallet)}</div>
                  {t.transactionHash ? (
                    <a
                      className="text-xs text-primary inline-flex items-center gap-1 hover:underline"
                      href={`https://polygonscan.com/tx/${t.transactionHash}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      tx <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="text-xs text-muted-foreground">tx —</span>
                  )}
                </div>
              </div>
            ))}

            {trades.length === 0 && (
              <div className="text-sm text-muted-foreground">No trades returned.</div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
