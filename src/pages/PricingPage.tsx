import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    price: "$0",
    desc: "Explore the demo widgets.",
    features: ["Limited tape", "Trending markets", "Wallet lookup"],
    cta: "Open demo",
    href: "/demo",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$19/mo",
    desc: "For daily scanning.",
    features: ["Higher request limits", "Faster refresh", "Priority UX updates"],
    cta: "Get Pro (coming soon)",
    href: "/demo",
    highlight: true,
  },
  {
    name: "Team",
    price: "$49/mo",
    desc: "For small groups.",
    features: ["Team seats (coming soon)", "Shared watchlists (coming soon)", "Early features"],
    cta: "Contact",
    href: "/demo",
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
              This is a conversion-first MVP. Real checkout can be plugged in later (Stripe/crypto/etc.).
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
              <div className="font-semibold text-foreground">Notes</div>
              <ul className="mt-2 space-y-1">
                <li>• AlphaTape does not trade or custody funds.</li>
                <li>• Data is provided “as is” from public sources.</li>
                <li>
                  • If you want a real checkout, we can wire it with crypto (USDC) or Stripe later — still without a heavy
                  backend.
                </li>
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
