import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { 
  Copy, 
  Check, 
  AlertTriangle, 
  HelpCircle, 
  ChevronDown,
  Wallet,
  Shield,
  Info,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useExchangeRates } from "@/hooks/useExchangeRates";
import { toast } from "sonner";

// Tipos de monedas y redes
interface CryptoOption {
  id: string;
  name: string;
  symbol: string;
  networks: Network[];
}

interface Network {
  id: string;
  name: string;
  fullName: string;
  addressPlaceholder: string;
  warning?: string;
}

// Configuración de monedas y redes con addresses reales
const cryptoOptions: CryptoOption[] = [
  {
    id: "usdt",
    name: "Tether",
    symbol: "USDT",
    networks: [
      { 
        id: "trc20", 
        name: "TRC20", 
        fullName: "Tron (TRC20)",
        addressPlaceholder: "TKJWNpZiH1zskhZ9QWagc1Y7AKewWb11C4",
        warning: "Red Tron - Fees bajos"
      },
      { 
        id: "erc20", 
        name: "ERC20", 
        fullName: "Ethereum (ERC20)",
        addressPlaceholder: "0x376818665bC6041fb2cb449cDa362Ed10a492e2e",
        warning: "Red Ethereum - Fees altos"
      },
      { 
        id: "polygon", 
        name: "Polygon", 
        fullName: "Polygon (PoS)",
        addressPlaceholder: "0x376818665bC6041fb2cb449cDa362Ed10a492e2e",
        warning: "Red Polygon - Fees muy bajos"
      },
    ],
  },
  {
    id: "usdc",
    name: "USD Coin",
    symbol: "USDC",
    networks: [
      { 
        id: "ethereum", 
        name: "Ethereum", 
        fullName: "Ethereum (ERC20)",
        addressPlaceholder: "0x376818665bC6041fb2cb449cDa362Ed10a492e2e",
        warning: "Red Ethereum - Fees altos"
      },
      { 
        id: "polygon", 
        name: "Polygon", 
        fullName: "Polygon (PoS)",
        addressPlaceholder: "0x376818665bC6041fb2cb449cDa362Ed10a492e2e",
        warning: "Red Polygon - Fees muy bajos"
      },
      { 
        id: "solana", 
        name: "Solana", 
        fullName: "Solana (SPL)",
        addressPlaceholder: "87TK1xZ7xopNvaF2k83iuEvqaDM31nKGqf94DGUeAYGp",
        warning: "Red Solana - Fees bajos"
      },
    ],
  },
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    networks: [
      { 
        id: "mainnet", 
        name: "Mainnet", 
        fullName: "Ethereum Mainnet",
        addressPlaceholder: "0x376818665bC6041fb2cb449cDa362Ed10a492e2e",
        warning: "Red principal Ethereum"
      },
    ],
  },
  {
    id: "sol",
    name: "Solana",
    symbol: "SOL",
    networks: [
      { 
        id: "solana", 
        name: "Solana", 
        fullName: "Solana",
        addressPlaceholder: "87TK1xZ7xopNvaF2k83iuEvqaDM31nKGqf94DGUeAYGp",
        warning: "Red Solana nativa"
      },
    ],
  },
];

// FAQ Data
const faqItems = [
  {
    question: "¿Por qué hay varias redes?",
    answer: "Cada red tiene diferentes fees (comisiones) y tiempos de confirmación. TRC20 y Polygon suelen ser más económicas, mientras que ERC20 es la más universal pero con fees más altas."
  },
  {
    question: "¿Puedo mandar desde un exchange?",
    answer: "Sí, puedes enviar desde cualquier exchange (Binance, Coinbase, etc.) siempre y cuando soporte la red que seleccionaste. Verifica que el exchange permita retiros en esa red específica."
  },
  {
    question: "¿Qué pasa si me equivoco de red?",
    answer: "Enviar por una red incorrecta puede causar la pérdida permanente de tus fondos. Por ejemplo, si envías USDT por ERC20 a una dirección TRC20, los fondos se perderán. Siempre verifica la red antes de enviar."
  },
];

interface CryptoPaymentProps {
  amount: number;
  onConfirm: () => void;
}

export const CryptoPayment = ({ amount, onConfirm }: CryptoPaymentProps) => {
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoOption>(cryptoOptions[0]);
  const [selectedNetwork, setSelectedNetwork] = useState<Network>(cryptoOptions[0].networks[0]);
  const [understandsRisk, setUnderstandsRisk] = useState(false);
  const [copied, setCopied] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  
  // Usar hook de tasas de cambio en tiempo real
  const { usdToMxn, isLoading, error, refresh } = useExchangeRates();

  // Actualizar red cuando cambia la moneda
  useEffect(() => {
    setSelectedNetwork(selectedCrypto.networks[0]);
  }, [selectedCrypto]);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(selectedNetwork.addressPlaceholder);
    setCopied(true);
    toast.success("Dirección copiada al portapapeles");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirm = () => {
    if (!understandsRisk) {
      toast.error("Debes confirmar que entiendes el riesgo de enviar en la red correcta");
      return;
    }
    onConfirm();
  };

  return (
    <div className="space-y-6">
      {/* Título */}
      <div className="flex items-center gap-3 pb-4 border-b border-border">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Wallet className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-heading font-bold text-lg">Paga con Cripto</h3>
          <p className="text-sm text-muted-foreground">
            Selecciona tu moneda y red preferida
          </p>
        </div>
      </div>

      {/* Selector de Moneda */}
      <div className="space-y-3">
        <label className="text-sm font-medium">Seleccionar Moneda</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {cryptoOptions.map((crypto) => (
            <button
              key={crypto.id}
              onClick={() => setSelectedCrypto(crypto)}
              className={`p-3 rounded-xl border-2 transition-all ${
                selectedCrypto.id === crypto.id
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50 bg-card"
              }`}
            >
              <div className="font-bold text-sm">{crypto.symbol}</div>
              <div className="text-xs text-muted-foreground">{crypto.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Selector de Red */}
      <div className="space-y-3">
        <label className="text-sm font-medium">Seleccionar Red</label>
        <div className="relative">
          <select
            value={selectedNetwork.id}
            onChange={(e) => {
              const network = selectedCrypto.networks.find(n => n.id === e.target.value);
              if (network) setSelectedNetwork(network);
            }}
            className="w-full p-3 pr-10 bg-muted border border-border rounded-lg text-sm appearance-none cursor-pointer"
          >
            {selectedCrypto.networks.map((network) => (
              <option key={network.id} value={network.id}>
                {network.fullName}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-muted-foreground" />
        </div>
        
        {/* Warning de red */}
        <div className="flex items-start gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-yellow-600">
            {selectedNetwork.warning}
          </p>
        </div>
      </div>

      {/* Bloque de Instrucciones */}
      <div className="bg-muted rounded-xl p-4 md:p-6 space-y-4">
        <h4 className="font-bold flex items-center gap-2">
          <Info className="w-4 h-4 text-primary" />
          Instrucciones de Pago
        </h4>

        {/* Monto */}
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground">Monto a pagar</label>
          <div className="text-2xl font-bold">${amount.toLocaleString()} MXN</div>
          <div className="text-sm text-muted-foreground">
            Equivalente en {selectedCrypto.symbol}: {" "}
            <span className="font-mono text-foreground">
              {isLoading ? (
                <span className="text-xs">Cargando tasa...</span>
              ) : error ? (
                <span className="text-xs text-yellow-500">{(amount / usdToMxn).toFixed(6)} {selectedCrypto.symbol} (estimado)</span>
              ) : (
                <span>{(amount / usdToMxn).toFixed(6)} {selectedCrypto.symbol}</span>
              )}
            </span>
            <span className="text-xs block mt-1">
              *Tasa actual: 1 USD = ${usdToMxn.toFixed(2)} MXN {isLoading && "(cargando...)"}
            </span>
            {!isLoading && (
              <button 
                onClick={refresh}
                className="text-xs text-primary hover:underline mt-1 inline-flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Actualizar tasa
              </button>
            )}
          </div>
        </div>

        {/* Red seleccionada */}
        <div className="p-3 bg-background rounded-lg border-2 border-primary">
          <div className="text-xs text-muted-foreground mb-1">Red seleccionada</div>
          <div className="font-bold text-primary">{selectedNetwork.fullName}</div>
        </div>

        {/* Address */}
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground">Dirección de depósito</label>
          <div className="flex gap-2">
            <code className="flex-1 p-3 bg-background rounded-lg text-xs font-mono break-all border border-border">
              {selectedNetwork.addressPlaceholder}
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
        </div>

        {/* QR Code */}
        <div className="flex flex-col items-center gap-3">
          <label className="text-xs text-muted-foreground">Escanea el QR</label>
          <div className="p-4 bg-white rounded-xl">
            <QRCodeSVG
              value={selectedNetwork.addressPlaceholder}
              size={180}
              level="M"
              includeMargin={true}
            />
          </div>
        </div>

        {/* Warning de seguridad */}
        <div className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <Shield className="w-5 h-5 text-red-500 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-red-600">
              ⚠️ Importante: Envía solo en la red indicada
            </p>
            <p className="text-xs text-red-500 mt-1">
              Enviar por otra red puede causar la pérdida permanente de fondos.
              Verifica cuidadosamente antes de confirmar la transacción.
            </p>
          </div>
        </div>
      </div>

      {/* Checkbox de confirmación */}
      <div className="flex items-start space-x-3">
        <Checkbox
          id="understands-risk"
          checked={understandsRisk}
          onCheckedChange={(checked) => setUnderstandsRisk(checked as boolean)}
        />
        <label
          htmlFor="understands-risk"
          className="text-sm leading-tight cursor-pointer"
        >
          Entiendo que debo enviar en la red{" "}
          <span className="font-bold text-primary">{selectedNetwork.fullName}</span>{" "}
          y que enviar por otra red puede causar pérdida de fondos.
        </label>
      </div>

      {/* Botón Continuar */}
      <Button
        onClick={handleConfirm}
        disabled={!understandsRisk}
        className="w-full"
        size="lg"
      >
        Confirmar Pedido
      </Button>

      {/* Mini FAQ */}
      <div className="border-t border-border pt-4 space-y-2">
        <h4 className="font-bold text-sm flex items-center gap-2">
          <HelpCircle className="w-4 h-4" />
          Preguntas Frecuentes
        </h4>
        {faqItems.map((faq, index) => (
          <div key={index} className="border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
              className="w-full p-3 text-left text-sm font-medium flex items-center justify-between hover:bg-muted transition-colors"
            >
              {faq.question}
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  expandedFaq === index ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {expandedFaq === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="p-3 text-xs text-muted-foreground border-t border-border">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoPayment;
