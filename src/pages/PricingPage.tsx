import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getPlan } from "@/lib/plan";

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
    price: "$19/mo",
    desc: "For daily scanning.",
    features: [
      "Bigger tape + faster refresh",
      "Pattern tags (conviction / longshot / exit)",
      "Hot Markets radar (where whales concentrate)",
      "CSV export + saved filters",
      "Higher request limits",
    ],
    cta: "Pay with crypto",
    href: "/checkout?plan=pro",
    highlight: true,
  },
  {
    name: "Team",
    price: "$49/mo",
    desc: "For small research groups.",
    features: [
      "All Pro features",
      "Whale Wallets radar (top flow)",
      "Multiple workspaces (local)",
      "Shareable snapshots (URL-encoded)",
    ],
    cta: "Pay with crypto",
    href: "/checkout?plan=team",
    highlight: false,
  },
];

export default function PricingPage() {
  const current = getPlan();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main" className="pt-20">
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="flex items-start justify-between gap-4 flex-col md:flex-row">
              <div>
                <h1 className="font-heading text-3xl md:text-4xl font-bold">Pricing</h1>
                <p className="mt-3 text-muted-foreground max-w-2xl">
                  AlphaTape is a conversion-first MVP: real crypto checkout + immediate local unlock (no accounts yet).
                </p>
              </div>
              <Card className="card-gradient border-border p-4 min-w-[220px]">
                <div className="text-xs text-muted-foreground">Current plan</div>
                <div className="text-lg font-bold gradient-text">{current.toUpperCase()}</div>
                <div className="text-xs text-muted-foreground mt-1">Stored locally (frontend MVP)</div>
              </Card>
            </div>

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
              <div className="font-semibold text-foreground">Why retail pays for Pro</div>
              <ul className="mt-2 space-y-1">
                <li>• You stop guessing: the tape + radars show where real size is flowing.</li>
                <li>• Pattern tags make scanning faster (conviction vs longshot vs exits).</li>
                <li>• Watchlists + saved filters turn “one lucky scroll” into a repeatable routine.</li>
                <li>• CSV export is for people who want receipts and back-checks.</li>
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
