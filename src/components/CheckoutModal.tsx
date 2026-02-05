import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { X, CreditCard, Lock, Mail, Link as LinkIcon, MessageSquare, ArrowLeft, Shield, Timer, Users, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { CryptoPaymentSelector } from "./CryptoPaymentSelector";
import { CryptoPaymentStep } from "./CryptoPaymentStep";
import { toast } from "sonner";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type PaymentMethod = "card" | "crypto";
type CheckoutStep = "details" | "payment-select" | "crypto-payment" | "processing";

interface ServiceUrl {
  itemId: string;
  url: string;
}

interface CommentExamples {
  itemId: string;
  comment1: string;
  comment2: string;
  comment3: string;
}

export const CheckoutModal = ({ isOpen, onClose }: CheckoutModalProps) => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { addOrder } = useAuth();
  
  // Steps
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("details");
  
  // Payment
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("crypto");
  const [selectedCrypto, setSelectedCrypto] = useState<any>(null);
  const [selectedNetwork, setSelectedNetwork] = useState<any>(null);
  
  // Form data
  const [email, setEmail] = useState("");
  const [serviceUrls, setServiceUrls] = useState<ServiceUrl[]>([]);
  const [commentExamples, setCommentExamples] = useState<CommentExamples[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const hasCommentServices = items.some(item => item.type === "COMENTARIOS");

  // Inicializar arrays
  useEffect(() => {
    setServiceUrls(items.map(item => ({ itemId: item.id, url: "" })));
    setCommentExamples(
      items
        .filter(item => item.type === "COMENTARIOS")
        .map(item => ({ itemId: item.id, comment1: "", comment2: "", comment3: "" }))
    );
  }, [items]);

  const isServiceDataComplete = () => {
    const allUrlsFilled = serviceUrls.every(su => su.url.trim() !== "");
    if (!allUrlsFilled) return false;
    if (hasCommentServices) {
      const allCommentsFilled = commentExamples.every(
        ce => ce.comment1.trim() !== "" && ce.comment2.trim() !== "" && ce.comment3.trim() !== ""
      );
      return allCommentsFilled;
    }
    return true;
  };

  const updateServiceUrl = (itemId: string, url: string) => {
    setServiceUrls(prev => prev.map(su => su.itemId === itemId ? { ...su, url } : su));
  };

  const updateCommentExample = (itemId: string, field: 'comment1' | 'comment2' | 'comment3', value: string) => {
    setCommentExamples(prev => prev.map(ce => ce.itemId === itemId ? { ...ce, [field]: value } : ce));
  };

  const handleNextStep = () => {
    if (currentStep === "details") {
      if (!email.trim()) {
        toast.error("Por favor ingresa tu correo electrónico");
        return;
      }
      if (!isServiceDataComplete()) {
        toast.error("Por favor completa todos los campos requeridos");
        return;
      }
      setCurrentStep("payment-select");
    }
  };

  const handleSelectCrypto = (crypto: any, network: any) => {
    setSelectedCrypto(crypto);
    setSelectedNetwork(network);
    setCurrentStep("crypto-payment");
  };

  const handleCryptoConfirmed = async () => {
    setCurrentStep("processing");
    
    const orderItems = items.map(item => ({
      platform: item.platform,
      type: item.type,
      state: item.state,
      quantity: item.quantity,
      price: item.price,
      targetUrl: serviceUrls.find(su => su.itemId === item.id)?.url,
    }));

    const orderData = {
      items: orderItems,
      email,
      paymentMethod: "crypto",
      totalPrice,
      status: "completed" as const,
    };

    await new Promise((resolve) => setTimeout(resolve, 1500));
    const orderId = addOrder(orderData);
    
    clearCart();
    onClose();
    navigate(`/order-success?orderId=${orderId}`);
  };

  const handleBack = () => {
    if (currentStep === "payment-select") setCurrentStep("details");
    if (currentStep === "crypto-payment") setCurrentStep("payment-select");
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-4">
      <div className={`w-2 h-2 rounded-full ${currentStep === "details" ? "bg-primary" : "bg-primary/30"}`} />
      <div className="w-4 h-px bg-border" />
      <div className={`w-2 h-2 rounded-full ${currentStep === "payment-select" || currentStep === "crypto-payment" ? "bg-primary" : "bg-primary/30"}`} />
      <div className="w-4 h-px bg-border" />
      <div className={`w-2 h-2 rounded-full ${currentStep === "processing" ? "bg-primary" : "bg-primary/30"}`} />
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-card border border-border rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Sticky con Precio */}
            <div className="sticky top-0 z-10 bg-card border-b border-border p-4 md:p-6">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {(currentStep === "payment-select" || currentStep === "crypto-payment") && (
                <button
                  onClick={handleBack}
                  className="absolute top-4 left-4 p-2 rounded-full hover:bg-muted transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}

              {renderStepIndicator()}

              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-heading text-xl md:text-2xl font-bold">
                    {currentStep === "details" && "Finalizar Compra"}
                    {currentStep === "payment-select" && "Método de Pago"}
                    {currentStep === "crypto-payment" && "Pago con Cripto"}
                    {currentStep === "processing" && "Procesando..."}
                  </h2>
                </div>
                
                {/* Sticky Total Price */}
                <div className="text-right bg-primary/10 px-3 py-1.5 rounded-lg">
                  <p className="text-xs text-muted-foreground">Total</p>
                  <p className="text-lg font-bold text-primary">${totalPrice.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="p-4 md:p-6 space-y-4 md:space-y-6">
              {/* Trust Badges */}
              {currentStep === "details" && (
                <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground bg-muted/50 rounded-lg p-3">
                  <span className="flex items-center gap-1">
                    <Shield className="w-3 h-3 text-green-500" />
                    Pago Seguro
                  </span>
                  <span className="flex items-center gap-1">
                    <BadgeCheck className="w-3 h-3 text-blue-500" />
                    Garantía
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-purple-500" />
                    +1.4M Clientes
                  </span>
                </div>
              )}

              {/* Urgency Indicator */}
              {currentStep === "details" && (
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3 flex items-center gap-3">
                  <Timer className="w-5 h-5 text-orange-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-orange-600">¡Oferta por tiempo limitado!</p>
                    <p className="text-xs text-muted-foreground">17 personas están viendo este servicio ahora</p>
                  </div>
                </div>
              )}

              {/* STEP 1: Details */}
              {currentStep === "details" && (
                <>
                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2 text-base font-bold">
                      <Mail className="w-4 h-4 text-primary" />
                      Correo Electrónico
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Recibirás la confirmación aquí
                    </p>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@email.com"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* URLs */}
                  <div className="space-y-3 bg-muted/50 rounded-xl p-4 border border-border">
                    <div className="flex items-center gap-2">
                      <LinkIcon className="w-5 h-5 text-primary" />
                      <h4 className="font-bold text-sm">URLs de los Servicios</h4>
                    </div>
                    {items.map((item) => (
                      <div key={item.id} className="space-y-2">
                        <Label htmlFor={`url-${item.id}`} className="text-xs">
                          {item.platform} {item.type} - {item.state} ({item.quantity}x)
                        </Label>
                        <div className="relative">
                          <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id={`url-${item.id}`}
                            type="url"
                            value={serviceUrls.find(su => su.itemId === item.id)?.url || ""}
                            onChange={(e) => updateServiceUrl(item.id, e.target.value)}
                            placeholder="https://instagram.com/p/..."
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Comments */}
                  {hasCommentServices && (
                    <div className="space-y-3 bg-primary/5 rounded-xl p-4 border border-primary/20">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-primary" />
                        <h4 className="font-bold text-sm">Ejemplos de Comentarios</h4>
                      </div>
                      {items
                        .filter(item => item.type === "COMENTARIOS")
                        .map((item) => {
                          const examples = commentExamples.find(ce => ce.itemId === item.id);
                          return (
                            <div key={item.id} className="space-y-2">
                              <Label className="text-xs font-bold">
                                {item.platform} - {item.state}
                              </Label>
                              <Textarea
                                value={examples?.comment1 || ""}
                                onChange={(e) => updateCommentExample(item.id, 'comment1', e.target.value)}
                                placeholder="Ejemplo 1"
                                className="resize-none"
                                rows={2}
                                required
                              />
                              <Textarea
                                value={examples?.comment2 || ""}
                                onChange={(e) => updateCommentExample(item.id, 'comment2', e.target.value)}
                                placeholder="Ejemplo 2"
                                className="resize-none"
                                rows={2}
                                required
                              />
                              <Textarea
                                value={examples?.comment3 || ""}
                                onChange={(e) => updateCommentExample(item.id, 'comment3', e.target.value)}
                                placeholder="Ejemplo 3"
                                className="resize-none"
                                rows={2}
                                required
                              />
                            </div>
                          );
                        })}
                    </div>
                  )}

                  {/* Buy Now Button */}
                  <Button
                    onClick={handleNextStep}
                    className="w-full"
                    size="lg"
                  >
                    Continuar al Pago
                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                  </Button>
                </>
              )}

              {/* STEP 2: Payment Select */}
              {currentStep === "payment-select" && (
                <CryptoPaymentSelector
                  amount={totalPrice}
                  onSelect={handleSelectCrypto}
                />
              )}

              {/* STEP 3: Crypto Payment */}
              {currentStep === "crypto-payment" && selectedCrypto && selectedNetwork && (
                <CryptoPaymentStep
                  amount={totalPrice}
                  selectedCrypto={selectedCrypto}
                  selectedNetwork={selectedNetwork}
                  onBack={handleBack}
                  onConfirm={handleCryptoConfirmed}
                />
              )}

              {/* STEP 4: Processing */}
              {currentStep === "processing" && (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
                  />
                  <p className="text-lg font-medium">Procesando tu pedido...</p>
                  <p className="text-sm text-muted-foreground">No cierres esta ventana</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal;
