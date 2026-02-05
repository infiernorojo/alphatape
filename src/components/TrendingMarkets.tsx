import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink } from "lucide-react";

import { apiMarkets, type GammaMarket } from "@/lib/polymarket";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function parseJsonArray(s?: string): string[] {
  if (!s) return [];
  try {
    const v = JSON.parse(s);
    return Array.isArray(v) ? v.map(String) : [];
  } catch {
    return [];
  }
}

function num(v?: string) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function formatCompactUsd(v: number) {
  if (!Number.isFinite(v)) return "—";
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `$${(v / 1_000).toFixed(1)}k`;
  return `$${v.toFixed(0)}`;
}

export function TrendingMarkets({ compact = false }: { compact?: boolean }) {
  const query = useQuery({
    queryKey: ["pm-markets", { limit: compact ? 12 : 30 }],
    queryFn: () => apiMarkets({ limit: compact ? 12 : 30, active: true, closed: false }),
    staleTime: 60_000,
    refetchInterval: 120_000,
  });

  const markets = useMemo(() => {
    const list = query.data ?? [];
    return [...list]
      .sort((a, b) => num(b.volume) - num(a.volume))
      .slice(0, compact ? 8 : 12);
  }, [query.data, compact]);

  return (
    <Card className="card-gradient border-border">
      <div className="p-4 md:p-5">
        <div className="text-sm font-semibold">Trending Markets</div>
        <div className="text-xs text-muted-foreground">
          Pulled from Gamma API markets (sorted client-side by total volume).
        </div>
      </div>

      <div className="px-4 md:px-5 pb-5">
        {query.isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: compact ? 6 : 10 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : query.isError ? (
          <div className="text-sm text-red-300">Failed to load markets. {String(query.error)}</div>
        ) : (
          <div className="space-y-2">
            {markets.map((m: GammaMarket) => {
              const outcomes = parseJsonArray(m.outcomes);
              const prices = parseJsonArray(m.outcomePrices);
              const yes = prices[0] ? Number(prices[0]).toFixed(3) : "—";
              const no = prices[1] ? Number(prices[1]).toFixed(3) : "—";
              return (
                <div
                  key={m.conditionId}
                  className="flex items-start justify-between gap-3 rounded-xl border border-border bg-background/40 px-3 py-2"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-sm leading-snug line-clamp-2">{m.question}</div>
                    <div className="text-xs text-muted-foreground mt-1 flex flex-wrap gap-x-3 gap-y-1">
                      <span>YES: {yes}</span>
                      <span>NO: {no}</span>
                      <span>Vol: {formatCompactUsd(num(m.volume))}</span>
                      {m.endDate ? <span>Ends: {m.endDate.slice(0, 10)}</span> : null}
                    </div>
                  </div>

                  <div className="text-right whitespace-nowrap">
                    <a
                      className="text-xs text-primary inline-flex items-center gap-1 hover:underline"
                      href={`https://polymarket.com/market/${m.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open on Polymarket: ${m.question}`}
                    >
                      open <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                    <div className="text-[11px] text-muted-foreground mt-1">
                      {outcomes.length ? outcomes.join(" / ") : "Binary"}
                    </div>
                  </div>
                </div>
              );
            })}

            {markets.length === 0 && (
              <div className="text-sm text-muted-foreground">No markets returned.</div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
