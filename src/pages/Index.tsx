import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { Footer } from "@/components/Footer";
import { ProductSection } from "@/components/ProductSection";
import { LiveTape } from "@/components/LiveTape";
import { TrendingMarkets } from "@/components/TrendingMarkets";
import { PricingTeaser } from "@/components/PricingTeaser";
import { FAQSection } from "@/components/FAQSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main">
        <HeroSection />
        <ProductSection />

        <section className="py-14">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <h2 className="font-heading text-3xl md:text-4xl font-bold">Live data</h2>
              <p className="mt-3 text-muted-foreground">
                Realtime tape + market snapshots powered by Polymarket public endpoints.
              </p>
            </div>

            <div className="mt-8 grid lg:grid-cols-2 gap-4">
              <LiveTape compact />
              <TrendingMarkets compact />
            </div>

            <div className="mt-4 text-xs text-muted-foreground">
              Open the full demo (wallet lookup, radars, leaderboards): /demo
            </div>
          </div>
        </section>

        <PricingTeaser />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
