import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    price: "$0",
    desc: "Try the demo widgets.",
    features: ["Limited tape", "Trending markets", "Basic wallet lookup"],
    cta: "Open demo",
    href: "/demo",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$19/mo",
    desc: "For traders scanning daily.",
    features: ["Higher limits", "Faster refresh", "Saved watchlists (coming soon)"],
    cta: "Get Pro",
    href: "/pricing",
    highlight: true,
  },
  {
    name: "Team",
    price: "$49/mo",
    desc: "Small research groups.",
    features: ["Shared watchlist (coming soon)", "Priority updates", "Early feature access"],
    cta: "See pricing",
    href: "/pricing",
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
            This is a frontend MVP — the point is a legit, paid-product feel. Payments/checkout can be wired later.
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
