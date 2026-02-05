import { useState, useEffect, useCallback } from "react";

interface ExchangeRates {
  usdToMxn: number;
  cryptoPrices: {
    usdt: number;  // Tether
    usdc: number;  // USD Coin
    eth: number;   // Ethereum
    sol: number;   // Solana
  };
  lastUpdated: Date | null;
  isLoading: boolean;
  error: string | null;
}

// Precios fallback (últimos conocidos) en caso de que la API falle
const FALLBACK_RATES = {
  usdToMxn: 17.2,
  cryptoPrices: {
    usdt: 1.0,
    usdc: 1.0,
    eth: 2800,
    sol: 110,
  },
};

export const useExchangeRates = (): ExchangeRates & { refresh: () => void } => {
  const [rates, setRates] = useState<ExchangeRates>({
    usdToMxn: FALLBACK_RATES.usdToMxn,
    cryptoPrices: FALLBACK_RATES.cryptoPrices,
    lastUpdated: null,
    isLoading: true,
    error: null,
  });

  const fetchRates = useCallback(async () => {
    setRates((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // Fetch USD/MXN rate
      const exchangeResponse = await fetch(
        "https://api.exchangerate-api.com/v4/latest/USD"
      );
      
      if (!exchangeResponse.ok) {
        throw new Error("Failed to fetch exchange rates");
      }

      const exchangeData = await exchangeResponse.json();
      const usdToMxn = exchangeData.rates?.MXN || FALLBACK_RATES.usdToMxn;

      // Fetch crypto prices from CoinGecko
      const cryptoResponse = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=tether,usd-coin,ethereum,solana&vs_currencies=usd"
      );

      let cryptoPrices = FALLBACK_RATES.cryptoPrices;

      if (cryptoResponse.ok) {
        const cryptoData = await cryptoResponse.json();
        cryptoPrices = {
          usdt: cryptoData.tether?.usd || 1.0,
          usdc: cryptoData["usd-coin"]?.usd || 1.0,
          eth: cryptoData.ethereum?.usd || 2800,
          sol: cryptoData.solana?.usd || 110,
        };
      }

      setRates({
        usdToMxn,
        cryptoPrices,
        lastUpdated: new Date(),
        isLoading: false,
        error: null,
      });
    } catch (err) {
      console.error("Error fetching rates:", err);
      setRates((prev) => ({
        ...prev,
        isLoading: false,
        error: "No se pudieron actualizar las tasas. Usando valores aproximados.",
      }));
    }
  }, []);

  useEffect(() => {
    fetchRates();
    
    // Actualizar cada 5 minutos
    const interval = setInterval(fetchRates, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [fetchRates]);

  // Calcular monto en cripto
  const calculateCryptoAmount = useCallback(
    (mxnAmount: number, cryptoId: "usdt" | "usdc" | "eth" | "sol"): number => {
      const usdAmount = mxnAmount / rates.usdToMxn;
      const cryptoPrice = rates.cryptoPrices[cryptoId];
      return usdAmount / cryptoPrice;
    },
    [rates]
  );

  return {
    ...rates,
    refresh: fetchRates,
    calculateCryptoAmount,
  };
};

export default useExchangeRates;
