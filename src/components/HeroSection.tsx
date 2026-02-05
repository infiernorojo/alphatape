import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import "../styles/rocket-loader.css";

const stats = [
  { value: "50K+", label: "CLIENTES" },
  { value: "250K+", label: "ÓRDENES" },
  { value: "15M+", label: "SEGUIDORES VENDIDOS" },
  { value: "45M+", label: "LIKES VENDIDOS" },
];

export const HeroSection = () => {
  const scrollToServices = () => {
    const servicesSection = document.querySelector('#services-section');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToWhySection = () => {
    const whySection = document.querySelector('#why-section');
    if (whySection) {
      whySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-[auto] md:min-h-screen flex items-center justify-center hero-gradient overflow-hidden pt-24 md:pt-32 pb-12 md:pb-16">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
                #1 <span className="gradient-text">REDES SOCIALES</span> EN MÉXICO
              </h1>
              
              <p className="text-muted-foreground text-lg md:text-xl mb-8 max-w-xl mx-auto lg:mx-0">
                Acelera tu crecimiento en redes sociales con AlphaTape. Obtén seguidores reales, 
                vistas, likes y más con nuestras estrategias de marketing. Conocidos por entrega rápida, 
                calidad premium y precios bajos desde 2017.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button variant="heroOutline" size="xl" onClick={scrollToWhySection}>
                  SABER MÁS
                </Button>
                <Button variant="hero" size="xl" onClick={scrollToServices}>
                  VER TODOS LOS SERVICIOS
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Right - Rocket Loader Animation */}
          <div className="order-1 lg:order-2 flex justify-center items-center min-h-[250px] md:min-h-[400px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full h-48 md:h-64 flex items-center justify-center"
            >
              <div className="loader">
                <span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
                <div className="base">
                  <span></span>
                  <div className="face"></div>
                </div>
              </div>
              <div className="longfazers">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 md:mt-16 lg:mt-24"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
