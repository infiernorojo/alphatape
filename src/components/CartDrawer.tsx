import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag, CreditCard, Bitcoin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useState, useRef, useEffect } from "react";
import { CheckoutModal } from "./CheckoutModal";

export const CartDrawer = () => {
  const { items, removeItem, updateQuantity, totalPrice, isCartOpen, setIsCartOpen } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isCartOpen, setIsCartOpen]);

  // Focus management - focus close button when opened
  useEffect(() => {
    if (isCartOpen) {
      // Small delay to ensure drawer is rendered
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);
      
      // Prevent background scrolling
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  // Focus trap within drawer
  useEffect(() => {
    if (isCartOpen && drawerRef.current) {
      const focusableElements = drawerRef.current.querySelectorAll(
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
      return () => document.removeEventListener('keydown', handleTabKey);
    }
  }, [isCartOpen]);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsCartOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              ref={drawerRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md z-50 bg-card border-l border-border shadow-2xl flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-label="Carrito de compras"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-6 h-6 text-primary" aria-hidden="true" />
                  <h2 
                    id="cart-title" 
                    className="font-heading text-xl font-bold"
                  >
                    Tu Carrito ({items.length})
                  </h2>
                </div>
                <button
                  ref={closeButtonRef}
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                  aria-label="Cerrar carrito"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              {/* Items */}
              <div 
                className="flex-1 overflow-y-auto p-6"
                role="region"
                aria-label="Artículos en el carrito"
              >
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" aria-hidden="true" />
                    <h3 className="font-heading font-bold text-lg mb-2">
                      Tu carrito está vacío
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Agrega algunos productos para comenzar
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4" role="list" aria-label="Lista de artículos">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="bg-muted rounded-xl p-4"
                        role="listitem"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-bold text-foreground">
                              {item.platform} {item.type}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {item.state}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                            aria-label={`Eliminar ${item.platform} ${item.type} del carrito`}
                          >
                            <Trash2 className="w-4 h-4" aria-hidden="true" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1.5 rounded-lg bg-background hover:bg-primary/10 transition-colors"
                              aria-label={`Disminuir cantidad de ${item.platform} ${item.type}`}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-4 h-4" aria-hidden="true" />
                            </button>
                            <span 
                              className="w-8 text-center font-bold"
                              aria-label={`Cantidad: ${item.quantity}`}
                            >
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1.5 rounded-lg bg-background hover:bg-primary/10 transition-colors"
                              aria-label={`Aumentar cantidad de ${item.platform} ${item.type}`}
                            >
                              <Plus className="w-4 h-4" aria-hidden="true" />
                            </button>
                          </div>
                          <span className="font-bold text-primary" aria-label={`Precio: $${(item.price * item.quantity).toLocaleString()} MXN`}>
                            ${(item.price * item.quantity).toLocaleString()} MXN
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t border-border p-6 space-y-4">
                  <div className="flex items-center justify-between text-lg">
                    <span className="text-muted-foreground">Total:</span>
                    <span 
                      className="font-heading font-bold text-2xl text-primary"
                      aria-label={`Total a pagar: $${totalPrice.toLocaleString()} MXN`}
                    >
                      ${totalPrice.toLocaleString()} MXN
                    </span>
                  </div>

                  <Button
                    onClick={handleCheckout}
                    className="w-full"
                    size="lg"
                    aria-label={`Proceder al pago de $${totalPrice.toLocaleString()} MXN`}
                  >
                    <CreditCard className="w-5 h-5 mr-2" aria-hidden="true" />
                    Proceder al Pago
                  </Button>

                  <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <CreditCard className="w-4 h-4" aria-hidden="true" />
                      <span>Tarjeta</span>
                    </div>
                    <span aria-hidden="true">•</span>
                    <div className="flex items-center gap-1">
                      <Bitcoin className="w-4 h-4" aria-hidden="true" />
                      <span>Cripto</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </>
  );
};
