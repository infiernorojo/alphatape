import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LiveTape } from "@/components/LiveTape";
import { TrendingMarkets } from "@/components/TrendingMarkets";
import { HotMarkets } from "@/components/HotMarkets";
import { WhaleWallets } from "@/components/WhaleWallets";
import { WalletLookup } from "@/components/WalletLookup";
import { WatchlistPanel } from "@/components/WatchlistPanel";
import { Button } from "@/components/ui/button";

import { getPlan, isAtLeastPro, type Plan } from "@/lib/plan";

export default function DemoPage() {
  const [params] = useSearchParams();
  const wallet = params.get("wallet") ?? undefined;

  const [plan, setPlan] = useState<Plan>("free");
  useEffect(() => setPlan(getPlan()), [params]);
  const pro = isAtLeastPro(plan);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main" className="pt-20">
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="flex items-start justify-between gap-4 flex-col md:flex-row">
              <div>
                <h1 className="font-heading text-3xl md:text-4xl font-bold">Live demo</h1>
                <p className="mt-3 text-muted-foreground max-w-2xl">
                  Everything below is powered by public Polymarket endpoints (Data API + Gamma API) and verifiable on
                  Polygonscan.
                </p>
              </div>

              {!pro && (
                <div className="rounded-2xl border border-border bg-card/40 p-4 max-w-md">
                  <div className="text-sm font-semibold">Retail mode: upgrade for the good stuff</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Pro unlocks a bigger tape, faster refresh, pattern tags, watchlists, CSV export, plus the Hot Markets
                    & Whale Wallets radars.
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button asChild variant="hero" size="sm">
                      <Link to="/pricing">Upgrade</Link>
                    </Button>
                    <Button asChild variant="secondary" size="sm">
                      <Link to="/checkout?plan=pro">Pay with crypto</Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 grid lg:grid-cols-2 gap-4">
              <LiveTape />
              <TrendingMarkets />
            </div>

            {pro && (
              <div className="mt-4 grid lg:grid-cols-2 gap-4">
                <HotMarkets />
                <WhaleWallets />
              </div>
            )}

            <div className="mt-4 grid lg:grid-cols-2 gap-4">
              <WalletLookup initialAddress={wallet} />
              <WatchlistPanel />
            </div>

            <section className="mt-10 rounded-2xl border border-border bg-card/30 p-6">
              <h2 className="font-heading text-2xl font-bold">How to verify</h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-3xl">
                Every trade row includes a Polygonscan tx link when available. Market cards link to Polymarket. We keep
                this MVP lightweight (no heavy quant engine) — the goal is a fast, trustworthy retail UX.
              </p>

              <div className="mt-4 text-sm text-muted-foreground">
                <div className="font-semibold text-foreground mb-2">Sources</div>
                <ul className="space-y-1">
                  <li>
                    • Data API (trades/positions): <span className="text-foreground">https://data-api.polymarket.com</span>
                  </li>
                  <li>
                    • Gamma API (markets): <span className="text-foreground">https://gamma-api.polymarket.com</span>
                  </li>
                  <li>• Tx verification: Polygonscan</li>
                </ul>
              </div>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
