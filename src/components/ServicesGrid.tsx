import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Instagram, 
  Youtube, 
  Twitter, 
  Facebook,
  ShoppingCart,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { ProductModal } from "./ProductModal";

interface ServiceCardProps {
  platform: string;
  type: string;
  description: string;
  icon: React.ReactNode;
  badge?: string;
  badgeColor?: "hot" | "discount";
}

const ServiceCard = ({ platform, type, description, icon, badge, badgeColor }: ServiceCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ y: -5, scale: 1.02 }}
        className="relative bg-card border border-border rounded-xl p-4 md:p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 group cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        {badge && (
          <div className={`absolute -top-2 left-3 px-2 py-0.5 rounded-full text-xs font-bold ${
            badgeColor === "hot" 
              ? "bg-primary text-primary-foreground" 
              : "bg-accent text-accent-foreground"
          }`}>
            {badge}
          </div>
        )}
        
        <div className="text-center">
          <h3 className="font-heading font-bold text-lg md:text-xl text-foreground mb-1">{type}</h3>
          <p className="text-muted-foreground text-xs md:text-sm mb-3">{description}</p>
          
          <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 text-muted-foreground group-hover:text-primary transition-colors">
            {icon}
          </div>
          
          <Button variant="default" size="sm" className="w-full text-xs md:text-sm">
            <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
            COMPRAR
          </Button>
        </div>
      </motion.div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        platform={platform}
        type={type}
        icon={icon}
      />
    </>
  );
};

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
  </svg>
);

const SpotifyIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

const services: ServiceCardProps[] = [
  // Instagram - Más populares primero
  { platform: "Instagram", type: "SEGUIDORES", description: "Seguidores de Perfil", icon: <Instagram className="w-full h-full" />, badge: "POPULAR", badgeColor: "hot" },
  { platform: "Instagram", type: "LIKES", description: "Likes en Posts", icon: <Instagram className="w-full h-full" />, badge: "POPULAR", badgeColor: "hot" },
  { platform: "Instagram", type: "VISTAS", description: "Vistas de Videos", icon: <Instagram className="w-full h-full" />, badge: "-15%", badgeColor: "discount" },
  { platform: "Instagram", type: "COMENTARIOS", description: "Comentarios", icon: <Instagram className="w-full h-full" />, badge: "-20%", badgeColor: "discount" },
  { platform: "Instagram", type: "VISTAS HISTORIAS", description: "Vistas de Historias", icon: <Instagram className="w-full h-full" />, badge: "-10%", badgeColor: "discount" },
  
  // TikTok
  { platform: "TikTok", type: "SEGUIDORES", description: "Seguidores", icon: <TikTokIcon />, badge: "-15%", badgeColor: "discount" },
  { platform: "TikTok", type: "LIKES", description: "Likes", icon: <TikTokIcon />, badge: "-10%", badgeColor: "discount" },
  { platform: "TikTok", type: "VISTAS", description: "Vistas de Videos", icon: <TikTokIcon />, badge: "-20%", badgeColor: "discount" },
  
  // YouTube
  { platform: "YouTube", type: "SUSCRIPTORES", description: "Suscriptores", icon: <Youtube className="w-full h-full" />, badge: "-15%", badgeColor: "discount" },
  { platform: "YouTube", type: "VISTAS", description: "Vistas de Videos", icon: <Youtube className="w-full h-full" />, badge: "-10%", badgeColor: "discount" },
  { platform: "YouTube", type: "LIKES", description: "Likes", icon: <Youtube className="w-full h-full" />, badge: "-12%", badgeColor: "discount" },
  { platform: "YouTube", type: "COMENTARIOS", description: "Comentarios", icon: <Youtube className="w-full h-full" />, badge: "-18%", badgeColor: "discount" },
  { platform: "YouTube", type: "WATCH TIME", description: "Horas Reproducción", icon: <Youtube className="w-full h-full" />, badge: "-25%", badgeColor: "discount" },
  
  // Twitter
  { platform: "Twitter", type: "SEGUIDORES", description: "Seguidores", icon: <Twitter className="w-full h-full" />, badge: "-25%", badgeColor: "discount" },
  { platform: "Twitter", type: "LIKES", description: "Likes", icon: <Twitter className="w-full h-full" />, badge: "-20%", badgeColor: "discount" },
  { platform: "Twitter", type: "RETWEETS", description: "Retweets", icon: <Twitter className="w-full h-full" />, badge: "-22%", badgeColor: "discount" },
  { platform: "Twitter", type: "VISTAS", description: "Vistas", icon: <Twitter className="w-full h-full" />, badge: "-15%", badgeColor: "discount" },
  
  // Facebook
  { platform: "Facebook", type: "SEGUIDORES PÁGINA", description: "Seguidores Página", icon: <Facebook className="w-full h-full" />, badge: "-25%", badgeColor: "discount" },
  { platform: "Facebook", type: "LIKES", description: "Likes", icon: <Facebook className="w-full h-full" />, badge: "-18%", badgeColor: "discount" },
  { platform: "Facebook", type: "SHARES", description: "Compartidos", icon: <Facebook className="w-full h-full" />, badge: "-20%", badgeColor: "discount" },
  { platform: "Facebook", type: "VISTAS", description: "Vistas Videos", icon: <Facebook className="w-full h-full" />, badge: "-15%", badgeColor: "discount" },
  
  // Spotify
  { platform: "Spotify", type: "SEGUIDORES", description: "Seguidores Artista", icon: <SpotifyIcon /> },
  { platform: "Spotify", type: "SEGUIDORES PLAYLIST", description: "Seguidores Playlist", icon: <SpotifyIcon /> },
  { platform: "Spotify", type: "REPRODUCCIONES", description: "Reproducciones", icon: <SpotifyIcon /> },
];

// Servicios populares para mostrar inicialmente en móvil
const popularServices = services.filter(s => s.badge === "POPULAR" || s.badge?.includes("-15%") || s.badge?.includes("-20%")).slice(0, 6);

export const ServicesGrid = () => {
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es móvil
  useState(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  });

  const displayedServices = isMobile && !showAll ? popularServices : services;

  return (
    <section id="services-section" className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-12"
        >
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
            MEJORES <span className="gradient-text">OFERTAS</span>
          </h2>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">
            Selecciona cualquier servicio para ver paquetes por estado
          </p>
        </motion.div>

        {/* Grid de servicios - 2 cols en móvil, más en desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 md:gap-6">
          {displayedServices.map((service, index) => (
            <motion.div
              key={`${service.platform}-${service.type}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </div>

        {/* Botón Ver Más (solo móvil) */}
        <AnimatePresence>
          {isMobile && !showAll && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 text-center"
            >
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowAll(true)}
                className="w-full md:w-auto"
              >
                <ChevronDown className="w-4 h-4 mr-2" />
                Ver todos los servicios ({services.length - popularServices.length} más)
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botón Ver Menos (solo móvil cuando está expandido) */}
        <AnimatePresence>
          {isMobile && showAll && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 text-center"
            >
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowAll(false)}
                className="w-full md:w-auto"
              >
                <ChevronUp className="w-4 h-4 mr-2" />
                Mostrar menos
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
