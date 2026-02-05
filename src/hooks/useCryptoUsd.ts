import { useQuery } from "@tanstack/react-query";

export type CryptoUsdRates = Record<string, { usd: number }>;

export function useCryptoUsd() {
  return useQuery({
    queryKey: ["crypto-usd"],
    queryFn: async () => {
      const r = await fetch("/api/rates");
      if (!r.ok) throw new Error(`rates failed: ${r.status}`);
      return (await r.json()) as CryptoUsdRates;
    },
    staleTime: 60_000,
    refetchInterval: 120_000,
  });
}
