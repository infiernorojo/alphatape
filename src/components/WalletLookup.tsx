import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Search } from "lucide-react";

import { apiPositions, apiTrades } from "@/lib/polymarket";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

function isEvmAddress(v: string) {
  return /^0x[a-fA-F0-9]{40}$/.test(v.trim());
}

function shortAddr(addr: string, chars = 6) {
  return `${addr.slice(0, 2 + chars)}…${addr.slice(-chars)}`;
}

export function WalletLookup() {
  const [value, setValue] = useState("");
  const [address, setAddress] = useState<string | null>(null);

  const valid = address ? isEvmAddress(address) : false;

  const positionsQuery = useQuery({
    queryKey: ["pm-positions", address],
    queryFn: () => apiPositions({ user: address!, limit: 20, sortBy: "CASHPNL", sortDirection: "DESC", sizeThreshold: 1 }),
    enabled: Boolean(address && valid),
    staleTime: 30_000,
  });

  const tradesQuery = useQuery({
    queryKey: ["pm-wallet-trades", address],
    queryFn: () => apiTrades({ user: address!, limit: 12 }),
    enabled: Boolean(address && valid),
    staleTime: 30_000,
  });

  const positions = useMemo(() => positionsQuery.data ?? [], [positionsQuery.data]);
  const trades = useMemo(() => tradesQuery.data ?? [], [tradesQuery.data]);

  return (
    <Card className="card-gradient border-border">
      <div className="p-4 md:p-5">
        <div className="text-sm font-semibold">Wallet lookup</div>
        <div className="text-xs text-muted-foreground">
          Paste a Polygon/EVM address (0x…). We display positions & recent trades from Polymarket public Data API.
        </div>

        <form
          className="mt-4 flex flex-col sm:flex-row gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            const v = value.trim();
            setAddress(v);
          }}
        >
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="0x…"
            spellCheck={false}
            inputMode="text"
            className="flex-1"
            aria-label="Wallet address"
          />
          <Button type="submit" variant="hero" className="sm:w-40">
            <Search className="w-4 h-4 mr-2" aria-hidden="true" />
            Lookup
          </Button>
        </form>

        {address && !isEvmAddress(address) && (
          <div className="mt-2 text-xs text-red-300">Please enter a valid EVM address (0x + 40 hex chars).</div>
        )}

        {valid && address && (
          <div className="mt-3 text-xs text-muted-foreground">
            Address: <span className="text-foreground font-medium">{shortAddr(address)}</span> —{" "}
            <a
              className="text-primary inline-flex items-center gap-1 hover:underline"
              href={`https://polygonscan.com/address/${address}`}
              target="_blank"
              rel="noreferrer"
            >
              view on Polygonscan <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        )}
      </div>

      {valid && address && (
        <div className="px-4 md:px-5 pb-5 grid lg:grid-cols-2 gap-4">
          {/* Positions */}
          <div className="rounded-xl border border-border bg-background/40 p-3">
            <div className="text-sm font-semibold">Positions</div>
            <div className="text-xs text-muted-foreground">Sorted by cash PnL (as returned by API).</div>

            {positionsQuery.isLoading ? (
              <div className="mt-3 space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            ) : positionsQuery.isError ? (
              <div className="mt-3 text-xs text-red-300">Failed to load positions.</div>
            ) : (
              <div className="mt-3 space-y-2">
                {positions.slice(0, 8).map((p) => (
                  <div key={p.conditionId + String(p.outcome)} className="rounded-lg border border-border bg-background/40 p-2">
                    <div className="text-sm leading-snug line-clamp-2">{p.title ?? "Market"}</div>
                    <div className="text-xs text-muted-foreground mt-1 flex flex-wrap gap-x-3 gap-y-1">
                      <span>Outcome: {p.outcome ?? "—"}</span>
                      <span>cur: {Number(p.curPrice).toFixed(3)}</span>
                      <span>
                        cashPnl: {Number(p.cashPnl).toFixed(2)} ({Number(p.percentPnl).toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                ))}
                {positions.length === 0 && <div className="text-xs text-muted-foreground">No positions returned.</div>}
              </div>
            )}
          </div>

          {/* Trades */}
          <div className="rounded-xl border border-border bg-background/40 p-3">
            <div className="text-sm font-semibold">Recent trades</div>
            <div className="text-xs text-muted-foreground">Last 12 (most recent first).</div>

            {tradesQuery.isLoading ? (
              <div className="mt-3 space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            ) : tradesQuery.isError ? (
              <div className="mt-3 text-xs text-red-300">Failed to load trades.</div>
            ) : (
              <div className="mt-3 space-y-2">
                {trades.map((t) => (
                  <div
                    key={(t.transactionHash ?? "") + String(t.timestamp) + t.asset}
                    className="flex items-start justify-between gap-2 rounded-lg border border-border bg-background/40 p-2"
                  >
                    <div className="min-w-12 pt-0.5">
                      <span className={"text-xs font-bold " + (t.side === "BUY" ? "text-primary" : "text-red-400")}>
                        {t.side}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm line-clamp-2">{t.title ?? "Market"}</div>
                      <div className="text-xs text-muted-foreground">Price: {Number(t.price).toFixed(3)}</div>
                    </div>
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
                ))}
                {trades.length === 0 && <div className="text-xs text-muted-foreground">No trades returned.</div>}
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
