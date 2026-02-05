import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import CONFIG from "@/data/config";

export const HeroSection = () => {
  return (
    <section className="relative hero-gradient overflow-hidden pt-24 md:pt-32 pb-14">
      {/* background glows */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-24 left-1/4 w-[32rem] h-[32rem] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 right-1/4 w-[28rem] h-[28rem] bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/50 text-xs text-muted-foreground">
                <Zap className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                Public-data Polymarket analytics
              </div>

              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mt-5 mb-5 text-balance">
                {CONFIG.TEXT.HERO_TITLE.split("Polymarket")[0]}
                <span className="gradient-text">Polymarket</span>
                {CONFIG.TEXT.HERO_TITLE.split("Polymarket")[1] ?? ""}
              </h1>

              <p className="text-muted-foreground text-lg md:text-xl mb-8 max-w-xl mx-auto lg:mx-0">
                {CONFIG.TEXT.HERO_SUBTITLE}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Button asChild variant="hero" size="xl">
                  <Link to="/demo">
                    {CONFIG.TEXT.CTA_PRIMARY} <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="heroOutline" size="xl">
                  <Link to="/pricing">{CONFIG.TEXT.CTA_SECONDARY}</Link>
                </Button>
              </div>

              <div className="mt-6 text-xs text-muted-foreground">
                {CONFIG.TEXT.DISCLAIMER_SHORT}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="card-gradient border border-border rounded-2xl p-5 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-semibold">Live Whale Tape</div>
                <div className="text-xs text-muted-foreground">real-time feed</div>
              </div>

              <div className="space-y-3">
                {[
                  {
                    side: "BUY",
                    market: "Will Gold hit $10,000 by end of February?",
                    amount: "$1,167",
                    price: "0.996",
                  },
                  {
                    side: "SELL",
                    market: "Will BTC close above $100k this week?",
                    amount: "$2,500",
                    price: "0.421",
                  },
                  {
                    side: "BUY",
                    market: "Who wins the next election?",
                    amount: "$5,000",
                    price: "0.615",
                  },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-start justify-between gap-3 rounded-xl border border-border bg-background/40 px-3 py-2"
                  >
                    <div className="min-w-14">
                      <span
                        className={
                          "text-xs font-bold " +
                          (row.side === "BUY" ? "text-primary" : "text-red-400")
                        }
                      >
                        {row.side}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm leading-snug line-clamp-2">{row.market}</div>
                      <div className="text-xs text-muted-foreground">Price: {row.price}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold">{row.amount}</div>
                      <div className="text-xs text-muted-foreground">notional</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-xs text-muted-foreground">
                Real data on the demo page is pulled from Polymarket public endpoints via a CORS-safe proxy.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
