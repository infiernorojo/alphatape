import { Database, Flame, Trophy, Users } from "lucide-react";

export function ProductSection() {
  const items = [
    {
      icon: Database,
      title: "Realtime whale tape",
      desc: "See large trades as they hit the tape, with verifiable transaction links.",
    },
    {
      icon: Flame,
      title: "Hot Markets Radar",
      desc: "Spot where size is concentrating right now — without opening 50 tabs.",
    },
    {
      icon: Trophy,
      title: "Top Profitable Wallets",
      desc: "Leaderboards for Today / 7d / 30d so retail can follow the winners.",
    },
    {
      icon: Users,
      title: "Copy-style workflows",
      desc: "Team users can copy top wallets into a watchlist feed in one click.",
    },
  ];

  return (
    <section id="product" className="py-14">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl">
          <h2 className="font-heading text-3xl md:text-4xl font-bold">What you get</h2>
          <p className="mt-3 text-muted-foreground">
            AlphaTape is a Polymarket intelligence layer: tape + radars + wallet leaderboards, built to scan in seconds.
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
