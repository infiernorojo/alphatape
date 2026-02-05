import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Download, ExternalLink, RefreshCw } from "lucide-react";

import { apiTrades, type PolymarketTrade } from "@/lib/polymarket";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getPlan, isAtLeastPro, type Plan } from "@/lib/plan";

function shortAddr(addr?: string, chars = 4) {
  if (!addr) return "";
  if (addr.length <= 2 * chars + 2) return addr;
  return `${addr.slice(0, 2 + chars)}…${addr.slice(-chars)}`;
}

function notionalUsd(t: PolymarketTrade) {
  // size is outcome tokens; price is USDC per token. This is an approximation of notional.
  const v = Number(t.size) * Number(t.price);
  return Number.isFinite(v) ? v : NaN;
}

function formatUsd(v: number) {
  if (!Number.isFinite(v)) return "—";
  return v.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function formatTime(ts?: number) {
  if (!ts) return "—";
  const d = new Date(ts * 1000);
  return d.toISOString().replace("T", " ").slice(0, 16) + " UTC";
}

function patternTag(t: PolymarketTrade) {
  const p = Number(t.price);
  if (!Number.isFinite(p)) return null;

  if (t.side === "BUY") {
    if (p >= 0.9) return { label: "High conviction", cls: "bg-primary/15 text-primary" };
    if (p <= 0.1) return { label: "Longshot", cls: "bg-accent/15 text-accent" };
    if (p >= 0.6) return { label: "Momentum", cls: "bg-primary/10 text-foreground" };
    return { label: "Position build", cls: "bg-muted text-foreground" };
  }

  if (t.side === "SELL") {
    if (p >= 0.9) return { label: "Exit (near $1)", cls: "bg-primary/10 text-foreground" };
    if (p <= 0.2) return { label: "Cut / hedge", cls: "bg-muted text-foreground" };
    return { label: "Trim", cls: "bg-muted text-foreground" };
  }

  return null;
}

function downloadCsv(rows: PolymarketTrade[]) {
  const header = [
    "timestamp",
    "side",
    "title",
    "outcome",
    "price",
    "size",
    "notional_usd",
    "wallet",
    "tx",
  ];

  const lines = [header.join(",")];
  for (const t of rows) {
    const line = [
      String(t.timestamp ?? ""),
      JSON.stringify(String(t.side ?? "")),
      JSON.stringify(String(t.title ?? "")),
      JSON.stringify(String(t.outcome ?? "")),
      String(t.price ?? ""),
      String(t.size ?? ""),
      String(notionalUsd(t) || ""),
      JSON.stringify(String(t.proxyWallet ?? "")),
      JSON.stringify(String(t.transactionHash ?? "")),
    ].join(",");
    lines.push(line);
  }

  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `alphatape_tape_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function LiveTape({ compact = false }: { compact?: boolean }) {
  const [plan, setPlan] = useState<Plan>("free");

  useEffect(() => {
    setPlan(getPlan());
  }, []);

  const pro = isAtLeastPro(plan);

  const limit = compact ? 8 : pro ? 40 : 15;
  const filterAmount = pro ? 250 : 1000; // show more activity for paid plans
  const refetchInterval = pro ? 10_000 : 30_000;

  const query = useQuery({
    queryKey: ["pm-trades", { limit, filterAmount }],
    queryFn: () => apiTrades({ limit, filterType: "CASH", filterAmount }),
    refetchInterval,
  });

  const trades = useMemo(() => query.data ?? [], [query.data]);

  return (
    <Card className="card-gradient border-border">
      <div className="p-4 md:p-5 flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">Live Whale Tape</div>
          <div className="text-xs text-muted-foreground">
            Plan: <span className="text-foreground font-semibold">{plan.toUpperCase()}</span> · refresh ~
            {Math.round(refetchInterval / 1000)}s · min notional ${filterAmount}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {pro && (
            <Button variant="secondary" size="sm" onClick={() => downloadCsv(trades)} aria-label="Export CSV">
              <Download className="w-4 h-4" />
            </Button>
          )}

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
      </div>

      <div className="px-4 md:px-5 pb-5">
        {query.isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: compact ? 6 : 10 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        ) : query.isError ? (
          <div className="text-sm text-red-300">Failed to load tape. {String(query.error)}</div>
        ) : (
          <div className="space-y-2">
            {trades.map((t) => {
              const tag = pro ? patternTag(t) : null;
              return (
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

                    <div className="text-xs text-muted-foreground flex flex-wrap gap-x-3 gap-y-1 mt-1 items-center">
                      <span>Price: {Number(t.price).toFixed(3)}</span>
                      <span>Notional: {formatUsd(notionalUsd(t))}</span>
                      <span>Time: {formatTime(t.timestamp)}</span>
                      {tag ? (
                        <span className={"px-2 py-0.5 rounded-full text-[11px] border border-border " + tag.cls}>
                          {tag.label}
                        </span>
                      ) : null}
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
              );
            })}

            {trades.length === 0 && <div className="text-sm text-muted-foreground">No trades returned.</div>}

            {!pro && !compact && (
              <div className="mt-3 text-xs text-muted-foreground">
                Upgrade for a bigger tape, faster refresh, pattern tags, and CSV export.
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
