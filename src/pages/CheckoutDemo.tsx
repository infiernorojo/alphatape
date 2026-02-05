import { motion } from "framer-motion";
import { X, CreditCard, Bitcoin, Lock, Mail, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

// Página de demo para screenshot del checkout
const CheckoutDemo = () => {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bitcoin">("card");
  
  // Mock data para visualización
  const mockItems = [
    { platform: "Instagram", type: "SEGUIDORES", state: "CDMX", quantity: 100, price: 499 },
    { platform: "TikTok", type: "LIKES", state: "Jalisco", quantity: 500, price: 399 }
  ];
  const totalPrice = 898;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-card border-b border-border p-6 rounded-t-2xl">
          <h2 className="font-heading text-2xl font-bold">Finalizar Compra</h2>
          <p className="text-muted-foreground">
            Total: <span className="text-primary font-bold">${totalPrice.toLocaleString()} MXN</span>
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                defaultValue="usuario@ejemplo.com"
                className="pl-10"
              />
            </div>
          </div>

          {/* URLs de los Servicios */}
          <div className="space-y-4 bg-muted/50 rounded-xl p-4 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <LinkIcon className="w-5 h-5 text-primary" />
              <h4 className="font-bold text-sm">URLs Objetivo de los Servicios</h4>
            </div>
            {mockItems.map((item, index) => (
              <div key={index} className="space-y-2">
                <Label className="text-xs">
                  {item.platform} {item.type} - {item.state} ({item.quantity}x)
                </Label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="url"
                    defaultValue={`https://${item.platform.toLowerCase()}.com/usuario${index + 1}`}
                    className="pl-10"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-3">
            <Label>Método de Pago</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`p-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${
                  paymentMethod === "card"
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span className="font-medium">Tarjeta</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("bitcoin")}
                className={`p-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${
                  paymentMethod === "bitcoin"
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <Bitcoin className="w-5 h-5" />
                <span className="font-medium">Bitcoin</span>
              </button>
            </div>
          </div>

          {paymentMethod === "card" ? (
            <>
              {/* Card Name */}
              <div className="space-y-2">
                <Label>Nombre en la Tarjeta</Label>
                <Input defaultValue="Juan Pérez García" />
              </div>

              {/* Card Number */}
              <div className="space-y-2">
                <Label>Número de Tarjeta</Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    defaultValue="4111 1111 1111 1111"
                    className="pl-10 font-mono"
                  />
                </div>
              </div>

              {/* Expiry & CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Fecha de Expiración</Label>
                  <Input defaultValue="12/25" className="font-mono" />
                </div>
                <div className="space-y-2">
                  <Label>CVV</Label>
                  <Input defaultValue="123" type="password" className="font-mono" />
                </div>
              </div>
            </>
          ) : (
            <div className="bg-muted rounded-xl p-6 text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Bitcoin className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg mb-2">Pago con Bitcoin</h3>
                <p className="text-sm text-muted-foreground">
                  Al confirmar, se generará una dirección única para tu pago
                </p>
              </div>
              <div className="bg-background p-4 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Monto en BTC (aprox.)</p>
                <p className="font-mono font-bold text-lg">₿ 0.000498</p>
              </div>
            </div>
          )}

          {/* Order Summary */}
          <div className="bg-muted rounded-xl p-4 space-y-2">
            <h4 className="font-bold text-sm mb-3">Resumen del Pedido</h4>
            {mockItems.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {item.platform} {item.type} ({item.state}) x{item.quantity}
                </span>
                <span className="font-medium">
                  ${(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
            <div className="border-t border-border pt-2 mt-2 flex justify-between font-bold">
              <span>Total</span>
              <span className="text-primary">${totalPrice.toLocaleString()} MXN</span>
            </div>
          </div>

          {/* Submit Button */}
          <Button className="w-full" size="lg">
            <Lock className="w-4 h-4 mr-2" />
            Confirmar Pago
          </Button>

          {/* Security Note */}
          <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1">
            <Lock className="w-3 h-3" />
            Transacción segura y encriptada
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default CheckoutDemo;
