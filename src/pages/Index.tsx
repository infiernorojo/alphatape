import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ServicesGrid } from "@/components/ServicesGrid";
import { WhySection } from "@/components/WhySection";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { ServiceModalProvider } from "@/contexts/ServiceModalContext";
import { GlobalServiceModal } from "@/components/GlobalServiceModal";

const Index = () => {
  return (
    <ServiceModalProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <ServicesGrid />
          <WhySection />
        </main>
        <Footer />
        <CartDrawer />
        <GlobalServiceModal />
      </div>
    </ServiceModalProvider>
  );
};

export default Index;
