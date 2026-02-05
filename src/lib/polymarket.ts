export type PolymarketTrade = {
  proxyWallet: string;
  side: "BUY" | "SELL" | string;
  asset: string;
  conditionId: string;
  size: number;
  price: number;
  timestamp: number;
  title?: string;
  slug?: string;
  icon?: string;
  eventSlug?: string;
  outcome?: string;
  outcomeIndex?: number;
  name?: string;
  pseudonym?: string;
  profileImage?: string;
  transactionHash?: string;
};

export type PolymarketPosition = {
  proxyWallet: string;
  conditionId: string;
  size: number;
  avgPrice: number;
  initialValue: number;
  currentValue: number;
  cashPnl: number;
  percentPnl: number;
  realizedPnl: number;
  percentRealizedPnl: number;
  curPrice: number;
  redeemable: boolean;
  mergeable: boolean;
  title?: string;
  slug?: string;
  icon?: string;
  eventSlug?: string;
  outcome?: string;
  oppositeOutcome?: string;
  endDate?: string;
  negativeRisk?: boolean;
};

export type GammaMarket = {
  id: string;
  question: string;
  conditionId: string;
  slug: string;
  endDate: string;
  startDate?: string;
  image?: string;
  icon?: string;
  description?: string;
  outcomes?: string; // JSON string
  outcomePrices?: string; // JSON string
  volume?: string;
  volume24hr?: number;
  liquidity?: string;
  active?: boolean;
  closed?: boolean;
  category?: string;
};

function qs(params: Record<string, string | number | boolean | undefined>) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined) continue;
    sp.set(k, String(v));
  }
  return sp.toString();
}

async function fetchJson<T>(url: string): Promise<T> {
  const r = await fetch(url);
  if (!r.ok) {
    const text = await r.text().catch(() => "");
    throw new Error(`Request failed (${r.status}): ${text.slice(0, 160)}`);
  }
  return (await r.json()) as T;
}

export function apiTrades(params: {
  limit?: number;
  offset?: number;
  user?: string;
  market?: string;
  side?: "BUY" | "SELL";
  filterType?: "CASH" | "TOKENS";
  filterAmount?: number;
}) {
  return fetchJson<PolymarketTrade[]>(`/api/pm/trades?${qs(params as any)}`);
}

export function apiPositions(params: {
  user: string;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortDirection?: "ASC" | "DESC";
  sizeThreshold?: number;
}) {
  return fetchJson<PolymarketPosition[]>(`/api/pm/positions?${qs(params as any)}`);
}

export function apiMarkets(params: {
  limit?: number;
  offset?: number;
  active?: boolean;
  closed?: boolean;
  category?: string;
}) {
  return fetchJson<GammaMarket[]>(`/api/pm/markets?${qs(params as any)}`);
}
