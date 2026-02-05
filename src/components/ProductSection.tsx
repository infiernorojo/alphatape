import { Check, Shield, Zap, Database } from "lucide-react";

export function ProductSection() {
  const items = [
    {
      icon: Zap,
      title: "Smart-money signal, instantly",
      desc: "A clean tape UI designed for scanning in seconds (not charts for hours).",
    },
    {
      icon: Database,
      title: "Real, verifiable data",
      desc: "We show Polymarket public API fields + links to Polygonscan for verification.",
    },
    {
      icon: Shield,
      title: "No custody / no trading",
      desc: "Analytics only. No keys, no orders, no on-chain interactions.",
    },
    {
      icon: Check,
      title: "Built for conversion",
      desc: "Landing, demo, pricing, trust, and disclaimers — polished like a real SaaS.",
    },
  ];

  return (
    <section id="product" className="py-14">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl">
          <h2 className="font-heading text-3xl md:text-4xl font-bold">What you get</h2>
          <p className="mt-3 text-muted-foreground">
            AlphaTape is intentionally lightweight: no heavy analytics engine, just the pieces that make users trust the
            product and want access.
          </p>
        </div>

        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((it) => (
            <div key={it.title} className="rounded-2xl border border-border bg-card/40 p-5">
              <it.icon className="w-5 h-5 text-primary" aria-hidden="true" />
              <div className="mt-3 font-semibold">{it.title}</div>
              <div className="mt-2 text-sm text-muted-foreground">{it.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
