import { Link } from "react-router-dom";
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
      "Whale Wallets radar (top recent flow)",
      "Copy top wallets (copy portfolio)",
      "Multiple watchlists / workspaces",
      "Shareable snapshots (URL-encoded)",
    ],
    cta: "Pay with crypto",
    href: "/checkout?plan=team",
    highlight: false,
  },
];

export function PricingTeaser() {
  return (
    <section className="py-14">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl">
          <h2 className="font-heading text-3xl md:text-4xl font-bold">Pricing</h2>
          <p className="mt-3 text-muted-foreground">
            Upgrade to unlock full tape limits, wallet leaderboards, and copy-style workflows.
          </p>
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
      </div>
    </section>
  );
}
