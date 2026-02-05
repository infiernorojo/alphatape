import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  ChevronDown, 
  Instagram, 
  Youtube, 
  Twitter, 
  Facebook, 
  ShoppingCart,
  User,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useServiceModal } from "@/contexts/ServiceModalContext";
import logoImage from "@/assets/logo.png";

// Mapeo de textos del menú a tipos de servicio
const menuItemToServiceType: { [key: string]: string } = {
  // Instagram
  "Instagram Seguidores": "SEGUIDORES",
  "Instagram Likes": "LIKES",
  "Instagram Vistas": "VISTAS",
  "Instagram Comentarios": "COMENTARIOS",
  "Instagram Historias": "VISTAS HISTORIAS",
  
  // TikTok
  "TikTok Seguidores": "SEGUIDORES",
  "TikTok Likes": "LIKES",
  "TikTok Vistas": "VISTAS",
  "TikTok Shares": "SHARES",
  
  // YouTube
  "YouTube Suscriptores": "SUSCRIPTORES",
  "YouTube Vistas": "VISTAS",
  "YouTube Likes": "LIKES",
  "YouTube Comentarios": "COMENTARIOS",
  "YouTube Watch Time": "WATCH TIME",
  
  // Twitter
  "Twitter Seguidores": "SEGUIDORES",
  "Twitter Likes": "LIKES",
  "Twitter Retweets": "RETWEETS",
  "Twitter Vistas": "VISTAS",
  
  // Facebook
  "Facebook Seguidores de Página": "SEGUIDORES PÁGINA",
  "Facebook Likes": "LIKES",
  "Facebook Shares": "SHARES",
  "Facebook Vistas": "VISTAS",
  
  // Spotify
  "Spotify Seguidores": "SEGUIDORES",
  "Spotify Reproducciones": "REPRODUCCIONES",
  "Spotify Seguidores Playlist": "SEGUIDORES PLAYLIST",
};

const services = [
  { name: "Instagram", icon: Instagram, items: ["Seguidores", "Likes", "Vistas", "Comentarios", "Historias"] },
  { name: "TikTok", icon: () => <span className="text-lg" aria-hidden="true">♪</span>, items: ["Seguidores", "Likes", "Vistas", "Shares"] },
  { name: "YouTube", icon: Youtube, items: ["Suscriptores", "Vistas", "Likes", "Comentarios", "Watch Time"] },
  { name: "Twitter", icon: Twitter, items: ["Seguidores", "Likes", "Retweets", "Vistas"] },
  { name: "Facebook", icon: Facebook, items: ["Seguidores de Página", "Likes", "Shares", "Vistas"] },
  { name: "Spotify", icon: () => <span className="text-lg" aria-hidden="true">🎵</span>, items: ["Seguidores", "Reproducciones", "Seguidores Playlist"] },
];

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { totalItems, setIsCartOpen } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { openServiceModal } = useServiceModal();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Trap focus in mobile menu when open
  useEffect(() => {
    if (isMobileMenuOpen && mobileMenuRef.current) {
      const focusableElements = mobileMenuRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      };

      document.addEventListener('keydown', handleTabKey);
      firstElement?.focus();
      return () => document.removeEventListener('keydown', handleTabKey);
    }
  }, [isMobileMenuOpen]);

  const handleServiceClick = (platform: string, item: string) => {
    const key = `${platform} ${item}`;
    const serviceType = menuItemToServiceType[key];
    if (serviceType) {
      openServiceModal(platform, serviceType);
      setActiveDropdown(null);
      setIsMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      {/* Skip to main content link */}
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 focus-highlight rounded-lg" aria-label="AlphaTape - Inicio">
            <div className="w-12 h-12 relative overflow-hidden rounded-full">
              <img 
                src={logoImage} 
                alt="Logo de AlphaTape" 
                className="absolute w-full h-full object-cover scale-[1.6]"
                style={{ objectPosition: 'center' }}
              />
            </div>
            <span className="font-heading font-bold text-xl">
              Social<span className="text-primary">Mexico</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Navegación principal">
            {services.slice(0, 5).map((service) => (
              <div
                key={service.name}
                className="relative"
                ref={activeDropdown === service.name ? dropdownRef : null}
                onMouseEnter={() => setActiveDropdown(service.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 touch-target"
                  aria-expanded={activeDropdown === service.name}
                  aria-haspopup="true"
                  aria-label={`Menú de ${service.name}`}
                >
                  <service.icon className="w-4 h-4" aria-hidden="true" />
                  {service.name}
                  <ChevronDown className="w-3 h-3" aria-hidden="true" />
                </button>
                
                <AnimatePresence>
                  {activeDropdown === service.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-1 w-48 bg-card border border-border rounded-lg shadow-lg py-2"
                      role="menu"
                      aria-label={`Servicios de ${service.name}`}
                    >
                      {service.items.map((item) => (
                        <button
                          key={item}
                          onClick={() => handleServiceClick(service.name, item)}
                          className="w-full text-left block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors touch-target"
                          role="menuitem"
                        >
                          {service.name} {item}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-lg hover:bg-muted transition-colors touch-target focus-highlight"
              aria-label={`Carrito de compras${totalItems > 0 ? `, ${totalItems} artículos` : ''}`}
            >
              <ShoppingCart className="w-5 h-5" aria-hidden="true" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center" aria-label={`${totalItems} artículos en el carrito`}>
                  {totalItems}
                </span>
              )}
            </button>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/orders" aria-label="Ver mis órdenes">
                  <Button variant="ghost" size="sm" className="touch-target">
                    <Package className="w-4 h-4 mr-2" aria-hidden="true" />
                    Órdenes
                  </Button>
                </Link>
                <Link to="/profile" aria-label="Ver mi perfil">
                  <Button variant="ghost" size="sm" className="touch-target">
                    <User className="w-4 h-4 mr-2" aria-hidden="true" />
                    {user?.name.split(' ')[0]}
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login" aria-label="Iniciar sesión">
                  <Button variant="ghost" size="sm" className="touch-target">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link to="/register" aria-label="Crear cuenta nueva">
                  <Button size="sm" className="touch-target">
                    Crear Cuenta
                  </Button>
                </Link>
              </div>
            )}
            
            <button
              className="lg:hidden p-2 touch-target focus-highlight rounded-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card border-t border-border"
            ref={mobileMenuRef}
            role="dialog"
            aria-label="Menú móvil"
            aria-modal="true"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {services.map((service) => (
                <div key={service.name} className="space-y-2">
                  <p className="font-medium text-foreground flex items-center gap-2">
                    <service.icon className="w-4 h-4" aria-hidden="true" />
                    {service.name}
                  </p>
                  <div className="pl-6 space-y-1">
                    {service.items.map((item) => (
                      <button
                        key={item}
                        onClick={() => handleServiceClick(service.name, item)}
                        className="w-full text-left block text-sm text-muted-foreground hover:text-primary transition-colors touch-target py-2"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              
              {/* Mobile Auth Links */}
              <div className="border-t border-border pt-4 mt-4">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <p className="font-medium text-foreground">Mi Cuenta</p>
                    <div className="pl-6 space-y-1">
                      <Link to="/orders" className="w-full text-left block text-sm text-muted-foreground hover:text-primary transition-colors touch-target py-2">
                        Mis Órdenes
                      </Link>
                      <Link to="/profile" className="w-full text-left block text-sm text-muted-foreground hover:text-primary transition-colors touch-target py-2">
                        Mi Perfil
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link to="/login" className="w-full text-left block text-sm text-muted-foreground hover:text-primary transition-colors touch-target py-2">
                      Iniciar Sesión
                    </Link>
                    <Link to="/register" className="w-full text-left block text-sm text-primary hover:text-primary/80 transition-colors touch-target py-2">
                      Crear Cuenta
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
