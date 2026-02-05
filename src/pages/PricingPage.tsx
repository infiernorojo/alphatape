import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    price: "$0",
    desc: "Explore the demo widgets.",
    features: ["Whale tape (limited)", "Trending markets", "Wallet lookup"],
    cta: "Open demo",
    href: "/demo",
    highlight: false,
  },
  {
    name: "Pro",
    price: "89 USDT/mo",
    desc: "Retail-grade edge.",
    features: [
      "Bigger tape + faster refresh",
      "Pattern tags (conviction / longshot / exit)",
      "Hot Markets radar (where whales concentrate)",
      "Top Profitable Wallets (Today / 7d / 30d)",
      "CSV export + saved filters",
      "Higher request limits",
    ],
    cta: "Pay with crypto",
    href: "/checkout?plan=pro",
    highlight: true,
  },
  {
    name: "Team",
    price: "499 USDT/mo",
    desc: "For serious research teams.",
    features: [
      "All Pro features",
      "Whale Wallets radar (top flow)",
      "Copy top wallets (copy portfolio)",
      "Multiple workspaces",
      "Shareable snapshots",
    ],
    cta: "Pay with crypto",
    href: "/checkout?plan=team",
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main" className="pt-20">
        <section className="py-10">
          <div className="container mx-auto px-4">
            <h1 className="font-heading text-3xl md:text-4xl font-bold">Pricing</h1>
            <p className="mt-3 text-muted-foreground max-w-2xl">
              Crypto-friendly access. Stablecoins are exact, other coins are priced at live USD rates.
            </p>

            <div className="mt-8 grid md:grid-cols-3 gap-4">
              {plans.map((p) => (
                <div
                  key={p.name}
                  className={
                    "rounded-2xl border bg-card/40 p-6 " +
                    (p.highlight ? "border-primary/50 shadow-[0_0_40px_hsl(var(--primary)/0.15)]" : "border-border")
                  }
                >
                  <div className="flex items-baseline justify-between">
                    <div className="text-lg font-semibold">{p.name}</div>
                    <div className="text-2xl font-bold gradient-text">{p.price}</div>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">{p.desc}</div>

                  <ul className="mt-5 space-y-2 text-sm">
                    {p.features.map((f) => (
                      <li key={f} className="text-muted-foreground">• {f}</li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    <Button asChild variant={p.highlight ? "hero" : "secondary"} className="w-full">
                      <Link to={p.href}>{p.cta}</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-border bg-card/30 p-6 text-sm text-muted-foreground">
              <div className="font-semibold text-foreground">Why retail pays</div>
              <ul className="mt-2 space-y-1">
                <li>• Tape + radars show where real size is flowing.</li>
                <li>• Wallet leaderboards surface who’s consistently positioned well.</li>
                <li>• Watchlists + saved filters make it a repeatable routine (not random scrolling).</li>
                <li>• Copy workflows (Team) turn top wallets into a one-click research feed.</li>
              </ul>

              <div className="mt-4">
                <Button asChild variant="heroOutline">
                  <Link to="/demo">See the live demo</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
