import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, ShoppingCart, Check, ChevronDown, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mexicanStates, generateStatePackages } from "@/data/mexicanStates";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  platform: string;
  type: string;
  icon: React.ReactNode;
}

// Estados más populares para mostrar primero (DEBEN coincidir con nombres en mexicanStates.ts)
const popularStates = ["Ciudad de México", "Jalisco", "Nuevo León", "Estado de México", "Puebla", "Guanajuato"];

export const ProductModal = ({
  isOpen,
  onClose,
  platform,
  type,
  icon,
}: ProductModalProps) => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<{
    quantity: number;
    price: number;
  } | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showAllStates, setShowAllStates] = useState(false);
  const { addItem, setIsCartOpen } = useCart();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const statePackages = generateStatePackages(platform, type);

  const handleAddToCart = () => {
    if (!selectedState || !selectedPackage) {
      toast.error("Por favor selecciona un estado y un paquete");
      return;
    }

    const itemId = `${platform}-${type}-${selectedState}-${selectedPackage.quantity}`;
    
    addItem({
      id: itemId,
      platform,
      type,
      state: selectedState,
      quantity: 1,
      price: selectedPackage.price,
    });

    toast.success(`${selectedPackage.quantity} ${type} de ${platform} agregado al carrito`);
    setSelectedState(null);
    setSelectedPackage(null);
    onClose();
    setIsCartOpen(true);
  };

  const currentStatePackages = statePackages.find(
    (sp) => sp.state === selectedState
  );

  // Estados a mostrar (populares primero, o todos si showAllStates)
  const displayStates = showAllStates ? mexicanStates : 
    mexicanStates.filter(s => popularStates.includes(s) || s === selectedState);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: isMobile ? 100 : 0 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: isMobile ? 100 : 0 }}
            className="relative w-full h-full md:h-auto md:max-w-4xl md:max-h-[90vh] overflow-hidden bg-card md:border md:border-border md:rounded-2xl shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-card border-b border-border p-4 md:p-6 flex-shrink-0">
              <button
                onClick={onClose}
                className="absolute top-3 right-3 md:top-4 md:right-4 p-2 rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center justify-between pr-12">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    {icon}
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-heading text-lg md:text-2xl font-bold truncate">
                      {platform} {type}
                    </h2>
                    <p className="text-muted-foreground text-xs md:text-sm">
                      Selecciona estado y paquete
                    </p>
                  </div>
                </div>
                
                {/* Sticky Price Badge */}
                {selectedPackage && (
                  <div className="hidden sm:block bg-primary/10 px-3 py-1.5 rounded-lg">
                    <p className="text-xs text-muted-foreground">Total</p>
                    <p className="text-lg font-bold text-primary">${selectedPackage.price}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              {/* Urgency Badge */}
              <div className="mb-4 bg-orange-500/10 border border-orange-500/20 rounded-lg p-2.5 flex items-center gap-2">
                <Zap className="w-4 h-4 text-orange-500" />
                <p className="text-xs text-orange-600">
                  <strong>15% OFF</strong> en tu primera compra - Solo hoy
                </p>
              </div>

              {/* States Selection - Compacto */}
              <div className="mb-4">
                <h3 className="font-heading font-bold text-sm md:text-base mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>1. Selecciona tu estado</span>
                </h3>
                
                {isMobile ? (
                  // Mobile: Dropdown compacto + Chips rápidos
                  <div className="space-y-2">
                    {/* Chips de estados populares primero */}
                    <div className="flex flex-wrap gap-1.5">
                      {popularStates.slice(0, 4).map((state) => (
                        <button
                          key={state}
                          onClick={() => {
                            setSelectedState(state);
                            setSelectedPackage(null);
                          }}
                          className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                            selectedState === state
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted hover:bg-muted/80 text-foreground"
                          }`}
                        >
                          {state === "Ciudad de México" ? "CDMX" : state}
                        </button>
                      ))}
                    </div>
                    
                    {/* Dropdown para todos los estados */}
                    <div className="relative">
                      <select
                        value={selectedState || ""}
                        onChange={(e) => {
                          setSelectedState(e.target.value || null);
                          setSelectedPackage(null);
                        }}
                        className="w-full p-2.5 pr-10 bg-muted border border-border rounded-lg text-sm appearance-none cursor-pointer"
                      >
                        <option value="">Más estados...</option>
                        {mexicanStates.filter(s => !popularStates.includes(s)).map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-muted-foreground" />
                    </div>
                  </div>
                ) : (
                  // Desktop: Grid compacto
                  <div className="grid grid-cols-5 lg:grid-cols-8 gap-1.5">
                    {mexicanStates.map((state) => (
                      <button
                        key={state}
                        onClick={() => {
                          setSelectedState(state);
                          setSelectedPackage(null);
                        }}
                        className={`p-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                          selectedState === state
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted hover:bg-muted/80 text-foreground"
                        }`}
                      >
                        {state === "Ciudad de México" ? "CDMX" : state}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Packages - Compacto */}
              {selectedState && currentStatePackages && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4"
                >
                  <h3 className="font-heading font-bold text-sm md:text-base mb-2">
                    2. Selecciona cantidad para <span className="text-primary">{selectedState}</span>
                  </h3>
                  
                  {isMobile ? (
                    // Mobile: Grid 2 columnas compacto
                    <div className="grid grid-cols-2 gap-2">
                      {currentStatePackages.packages.map((pkg) => (
                        <button
                          key={pkg.quantity}
                          onClick={() => setSelectedPackage(pkg)}
                          className={`relative p-2.5 rounded-xl border-2 transition-all duration-200 ${
                            selectedPackage?.quantity === pkg.quantity
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-primary/50 bg-card"
                          }`}
                        >
                          {pkg.popular && (
                            <span className="absolute -top-1.5 right-1.5 px-1.5 py-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full">
                              TOP
                            </span>
                          )}
                          <div className="text-center">
                            <div className="text-lg font-bold text-foreground">
                              {pkg.quantity >= 1000 ? (pkg.quantity / 1000) + "K" : pkg.quantity}
                            </div>
                            <div className="text-[10px] text-muted-foreground uppercase">
                              {type}
                            </div>
                            <div className="text-base font-bold text-primary mt-0.5">
                              ${pkg.price}
                            </div>
                          </div>
                          {selectedPackage?.quantity === pkg.quantity && (
                            <div className="absolute bottom-1 right-1">
                              <Check className="w-3 h-3 text-primary" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  ) : (
                    // Desktop: Grid compacto
                    <div className="grid grid-cols-3 lg:grid-cols-5 gap-2">
                      {currentStatePackages.packages.map((pkg) => (
                        <button
                          key={pkg.quantity}
                          onClick={() => setSelectedPackage(pkg)}
                          className={`relative p-2.5 rounded-xl border-2 transition-all duration-200 ${
                            selectedPackage?.quantity === pkg.quantity
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-primary/50 bg-card"
                          }`}
                        >
                          {pkg.popular && (
                            <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                              POPULAR
                            </span>
                          )}
                          <div className="text-center">
                            <div className="text-xl md:text-2xl font-bold text-foreground">
                              {pkg.quantity.toLocaleString()}
                            </div>
                            <div className="text-xs md:text-sm text-muted-foreground mb-1 md:mb-2">
                              {type}
                            </div>
                            <div className="text-lg md:text-xl font-bold text-primary">
                              ${pkg.price} MXN
                            </div>
                          </div>
                          {selectedPackage?.quantity === pkg.quantity && (
                            <div className="absolute top-2 right-2">
                              <Check className="w-5 h-5 text-primary" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            {/* Footer - Buy Now */}
            <div className="sticky bottom-0 bg-card border-t border-border p-3 md:p-4 flex-shrink-0">
              <Button
                onClick={handleAddToCart}
                disabled={!selectedState || !selectedPackage}
                className="w-full"
                size={isMobile ? "default" : "lg"}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {!selectedState || !selectedPackage ? (
                  "Selecciona estado y cantidad"
                ) : (
                  <>
                    Comprar Ahora
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
              
              {/* Trust indicators */}
              <div className="flex items-center justify-center gap-4 mt-2 text-[10px] text-muted-foreground">
                <span>✓ Entrega garantizada</span>
                <span>✓ Soporte 24/7</span>
                <span>✓ Pago seguro</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
