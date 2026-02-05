import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, ChevronDown, Wallet, Shield, Clock, BadgeCheck, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useExchangeRates } from "@/hooks/useExchangeRates";

interface CryptoPaymentSelectorProps {
  amount: number;
  onSelect: (crypto: any, network: any) => void;
}

// Direcciones de wallet proporcionadas
const WALLET_ADDRESSES = {
  evm: "0x376818665bC6041fb2cb449cDa362Ed10a492e2e", // ETH, Polygon, BNB, USDT, USDC
  tron: "TKJWNpZiH1zskhZ9QWagc1Y7AKewWb11C4", // TRX, USDT TRC20
  solana: "87TK1xZ7xopNvaF2k83iuEvqaDM31nKGqf94DGUeAYGp", // SOL, USDC SPL
  btc: "bc1qmgux4hu40ltckrdxe40ffhrep2q3mrq6p056gc",
};

const cryptoOptions = [
  {
    id: "usdt",
    name: "Tether",
    symbol: "USDT",
    icon: "₮",
    isStable: true,
    networks: [
      { id: "trc20", name: "TRC20", fullName: "Tron (TRC20)", addressPlaceholder: WALLET_ADDRESSES.tron, warning: "Red Tron - Fees bajos (~$0.01)" },
      { id: "erc20", name: "ERC20", fullName: "Ethereum (ERC20)", addressPlaceholder: WALLET_ADDRESSES.evm, warning: "Red Ethereum - Fees altos (~$5-20)" },
      { id: "polygon", name: "Polygon", fullName: "Polygon (PoS)", addressPlaceholder: WALLET_ADDRESSES.evm, warning: "Red Polygon - Fees muy bajos (~$0.001)" },
      { id: "bep20", name: "BEP20", fullName: "BNB Chain (BEP20)", addressPlaceholder: WALLET_ADDRESSES.evm, warning: "Red BNB - Fees bajos (~$0.05)" },
    ],
  },
  {
    id: "usdc",
    name: "USD Coin",
    symbol: "USDC",
    icon: "$",
    isStable: true,
    networks: [
      { id: "ethereum", name: "Ethereum", fullName: "Ethereum (ERC20)", addressPlaceholder: WALLET_ADDRESSES.evm, warning: "Red Ethereum - Fees altos (~$5-20)" },
      { id: "polygon", name: "Polygon", fullName: "Polygon (PoS)", addressPlaceholder: WALLET_ADDRESSES.evm, warning: "Red Polygon - Fees muy bajos (~$0.001)" },
      { id: "solana", name: "Solana", fullName: "Solana (SPL)", addressPlaceholder: WALLET_ADDRESSES.solana, warning: "Red Solana - Fees bajos (~$0.01)" },
    ],
  },
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    icon: "♦",
    networks: [
      { id: "mainnet", name: "Mainnet", fullName: "Ethereum Mainnet", addressPlaceholder: WALLET_ADDRESSES.evm, warning: "Red principal Ethereum - Fees variables (~$2-15)" },
      { id: "arbitrum", name: "Arbitrum", fullName: "Arbitrum One", addressPlaceholder: WALLET_ADDRESSES.evm, warning: "L2 Arbitrum - Fees bajos (~$0.50)" },
      { id: "polygon", name: "Polygon", fullName: "Polygon (PoS)", addressPlaceholder: WALLET_ADDRESSES.evm, warning: "Sidechain Polygon - Fees mínimos (~$0.001)" },
    ],
  },
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    icon: "₿",
    networks: [
      { id: "bitcoin", name: "BTC", fullName: "Bitcoin Network", addressPlaceholder: WALLET_ADDRESSES.btc, warning: "Red Bitcoin nativa - Fees (~$2-10)" },
    ],
  },
  {
    id: "sol",
    name: "Solana",
    symbol: "SOL",
    icon: "◎",
    networks: [
      { id: "solana", name: "SOL", fullName: "Solana (SOL)", addressPlaceholder: WALLET_ADDRESSES.solana, warning: "Red Solana nativa - Fees bajos (~$0.01)" },
    ],
  },
  {
    id: "bnb",
    name: "BNB",
    symbol: "BNB",
    icon: "B",
    networks: [
      { id: "bep20", name: "BEP20", fullName: "BNB Chain (BEP20)", addressPlaceholder: WALLET_ADDRESSES.evm, warning: "Red BNB Chain - Fees bajos (~$0.05)" },
      { id: "bep2", name: "BEP2", fullName: "Binance Chain", addressPlaceholder: "bnb1..." }, // Placeholder, need actual if they have
    ],
  },
  {
    id: "trx",
    name: "TRON",
    symbol: "TRX",
    icon: "TRX",
    networks: [
      { id: "tron", name: "TRC20", fullName: "Tron (TRC20)", addressPlaceholder: WALLET_ADDRESSES.tron, warning: "Red Tron - Fees muy bajos (~$0.001)" },
    ],
  },
  {
    id: "matic",
    name: "Polygon",
    symbol: "MATIC",
    icon: "M",
    networks: [
      { id: "poly", name: "Polygon", fullName: "Polygon (PoS)", addressPlaceholder: WALLET_ADDRESSES.evm, warning: "Red Polygon - Fees mínimos (~$0.001)" },
    ],
  },
];

export const CryptoPaymentSelector = ({ amount, onSelect }: CryptoPaymentSelectorProps) => {
  const [selectedCrypto, setSelectedCrypto] = useState(cryptoOptions[0]);
  const [selectedNetwork, setSelectedNetwork] = useState(cryptoOptions[0].networks[0]);
  const { usdToMxn, isLoading } = useExchangeRates();

  const handleContinue = () => {
    onSelect(selectedCrypto, selectedNetwork);
  };

  return (
    <div className="space-y-3">
      {/* Trust Badges */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-1.5 bg-muted/50 rounded-lg p-2">
          <Shield className="w-3.5 h-3.5 text-green-500" />
          <span>Pago Seguro</span>
        </div>
        <div className="flex items-center gap-1.5 bg-muted/50 rounded-lg p-2">
          <Zap className="w-3.5 h-3.5 text-yellow-500" />
          <span>Confirmación 2-10 min</span>
        </div>
      </div>

      {/* Selector de Moneda - Grid compacto */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Seleccionar Criptomoneda</label>
        <div className="grid grid-cols-4 gap-1.5">
          {cryptoOptions.map((crypto) => (
            <button
              key={crypto.id}
              onClick={() => {
                setSelectedCrypto(crypto);
                setSelectedNetwork(crypto.networks[0]);
              }}
              className={`relative p-2.5 rounded-xl border-2 transition-all text-center ${
                selectedCrypto.id === crypto.id
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50 bg-muted/50"
              }`}
            >
              {crypto.isStable && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  $
                </span>
              )}
              <div className="text-lg font-bold">{crypto.icon}</div>
              <div className="text-[10px] font-medium mt-0.5">{crypto.symbol}</div>
            </button>
          ))}
        </div>
        <p className="text-[10px] text-muted-foreground text-center flex items-center justify-center gap-1">
          <BadgeCheck className="w-3 h-3 text-green-500" />
          <span className="text-green-600">Stablecoins</span> = mismo valor USD
        </p>
      </div>

      {/* Selector de Red */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Red para {selectedCrypto.symbol}
        </label>
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
          <p className="text-xs text-yellow-700">
            {selectedNetwork.warning}
          </p>
        </div>
      </div>

      {/* Estimated Amount Preview */}
      <div className="bg-primary/5 rounded-xl p-3 border border-primary/20">
        <p className="text-xs text-muted-foreground mb-1">Monto a pagar</p>
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-bold">${amount.toLocaleString()} MXN</span>
          <span className="text-sm text-muted-foreground">
            ≈ {(amount / (isLoading ? 17.5 : usdToMxn || 17.5)).toFixed(6)} {selectedCrypto.symbol}
          </span>
        </div>
      </div>

      {/* Continue Button */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          onClick={handleContinue}
          className="w-full"
          size="lg"
        >
          <ArrowRight className="w-4 h-4 mr-2" />
          Continuar al Pago
        </Button>
      </motion.div>

      {/* Security Note */}
      <p className="text-center text-[10px] text-muted-foreground">
        ⚠️ Sólo envías cripto al address que te mostraremos a continuación
      </p>
    </div>
  );
};
