import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { Copy, Check, Timer, AlertTriangle, ArrowLeft, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useExchangeRates } from "@/hooks/useExchangeRates";
import { toast } from "sonner";

interface CryptoPaymentStepProps {
  amount: number;
  selectedCrypto: {
    id: string;
    name: string;
    symbol: string;
  };
  selectedNetwork: {
    id: string;
    name: string;
    fullName: string;
    addressPlaceholder: string;
    warning?: string;
  };
  onBack: () => void;
  onConfirm: () => void;
}

export const CryptoPaymentStep = ({
  amount,
  selectedCrypto,
  selectedNetwork,
  onBack,
  onConfirm,
}: CryptoPaymentStepProps) => {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutos = 600 segundos
  const [status, setStatus] = useState<"waiting" | "checking" | "confirmed">("waiting");
  const { usdToMxn, isLoading } = useExchangeRates();

  // Formatear dirección en bloques
  const formatAddress = (address: string) => {
    if (selectedNetwork.id === "trc20") {
      // Para TRON: TKJW...b11C4
      return `${address.slice(0, 4)}...${address.slice(-4)}`;
    }
    // Para EVM: 0x3768...2e2e
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Full address para copiar y QR
  const fullAddress = selectedNetwork.addressPlaceholder;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    toast.success("Dirección copiada al portapapeles");
    setTimeout(() => setCopied(false), 2000);
  };

  // Countdown timer
  useEffect(() => {
    if (status !== "waiting") return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [status]);

  // Simular confirmación cuando quedan 3:18 (198 segundos)
  useEffect(() => {
    if (status === "waiting" && timeLeft <= 198 && timeLeft > 0) {
      setStatus("checking");
      
      // Simular verificación de 2 segundos
      setTimeout(() => {
        setStatus("confirmed");
        toast.success("¡Pago confirmado en la blockchain!");
        onConfirm();
      }, 2000);
    }
  }, [timeLeft, status, onConfirm]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const cryptoAmount = (amount / usdToMxn).toFixed(6);

  return (
    <div className="space-y-6">
      {/* Header con back */}
      <div className="flex items-center gap-3 pb-4 border-b border-border">
        <Button variant="ghost" size="icon" onClick={onBack} className="flex-shrink-0">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h3 className="font-heading font-bold text-lg">Pago con Cripto</h3>
          <p className="text-sm text-muted-foreground">
            {selectedCrypto.symbol} - {selectedNetwork.fullName}
          </p>
        </div>
      </div>

      {/* Sticky Price Header */}
      <div className="sticky top-0 z-10 bg-background border-y border-border py-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:rounded-lg sm:border sm:bg-muted/50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Total a pagar</p>
            <p className="text-xl font-bold">${amount.toLocaleString()} MXN</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Equivalente</p>
            <p className="text-lg font-mono">
              {isLoading ? "..." : `${cryptoAmount} ${selectedCrypto.symbol}`}
            </p>
          </div>
        </div>
      </div>

      {/* QR y Dirección */}
      <div className="bg-muted rounded-xl p-6 space-y-4">
        <div className="flex flex-col items-center gap-4">
          {/* QR Grande */}
          <div className="p-4 bg-white rounded-xl shadow-lg">
            <QRCodeSVG
              value={fullAddress}
              size={220}
              level="H"
              includeMargin={true}
            />
          </div>
          
          {/* Dirección formateada */}
          <div className="w-full">
            <label className="text-xs text-muted-foreground block mb-2 text-center">
              Dirección de {selectedNetwork.fullName}
            </label>
            <div className="flex gap-2">
              <code className="flex-1 p-3 bg-background rounded-lg text-sm font-mono text-center border border-border">
                {formatAddress(fullAddress)}
              </code>
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopyAddress}
                className="flex-shrink-0"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground text-center mt-2 break-all px-2">
              {fullAddress}
            </p>
          </div>
        </div>

        {/* Warning */}
        <div className="flex items-start gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-yellow-600">
            <strong>IMPORTANTE:</strong> Envía SOLO en la red {selectedNetwork.fullName}. 
            Enviar por otra red = pérdida total de fondos.
          </p>
        </div>
      </div>

      {/* Timer / Status */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
        {status === "waiting" && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                <Timer className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Esperando tu depósito</p>
                <p className="text-sm text-muted-foreground">
                  Tiempo restante: {formatTime(timeLeft)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-mono font-bold text-primary">
                {formatTime(timeLeft)}
              </p>
            </div>
          </div>
        )}

        {status === "checking" && (
          <div className="flex items-center justify-center gap-3 py-2">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="font-medium">Verificando en blockchain...</p>
          </div>
        )}

        {status === "confirmed" && (
          <div className="flex items-center justify-center gap-3 py-2">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
              <Check className="w-5 h-5 text-white" />
            </div>
            <div className="text-center">
              <p className="font-bold text-green-600">¡Pago Confirmado! ✅</p>
              <p className="text-sm text-muted-foreground">Procesando tu pedido...</p>
            </div>
          </div>
        )}
      </div>

      {/* Botón Ya Deposité */}
      {status === "waiting" && (
        <Button
          onClick={() => setStatus("checking")}
          className="w-full"
          size="lg"
          variant="outline"
        >
          <Wallet className="w-4 h-4 mr-2" />
          Ya realicé el depósito
        </Button>
      )}

      {/* Instrucciones */}
      <div className="text-xs text-muted-foreground space-y-1">
        <p>1. Escanea el QR o copia la dirección</p>
        <p>2. Envía exactamente {cryptoAmount} {selectedCrypto.symbol}</p>
        <p>3. Espera la confirmación (típicamente 2-10 minutos)</p>
        <p>4. Tu pedido se procesará automáticamente</p>
      </div>
    </div>
  );
};

export default CryptoPaymentStep;
