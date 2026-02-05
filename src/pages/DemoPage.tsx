import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LiveTape } from "@/components/LiveTape";
import { TrendingMarkets } from "@/components/TrendingMarkets";
import { WalletLookup } from "@/components/WalletLookup";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main" className="pt-20">
        <section className="py-10">
          <div className="container mx-auto px-4">
            <h1 className="font-heading text-3xl md:text-4xl font-bold">Live demo</h1>
            <p className="mt-3 text-muted-foreground max-w-2xl">
              Everything below is powered by public Polymarket endpoints (Data API + Gamma API) and verifiable on
              Polygonscan.
            </p>

            <div className="mt-6 grid lg:grid-cols-2 gap-4">
              <LiveTape />
              <TrendingMarkets />
            </div>

            <div className="mt-4">
              <WalletLookup />
            </div>

            <section className="mt-10 rounded-2xl border border-border bg-card/30 p-6">
              <h2 className="font-heading text-2xl font-bold">How to verify</h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-3xl">
                Every trade row includes a Polygonscan tx link when available. Market cards link to Polymarket. We avoid
                custom “alpha” calculations in this MVP — we focus on a clean UX + real data.
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
