export default async function handler(req, res) {
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  // Simple, cacheable price oracle for checkout
  // Source: CoinGecko simple price.
  const ids = [
    "tether",
    "usd-coin",
    "ethereum",
    "bitcoin",
    "solana",
    "tron",
    "binancecoin",
    "polygon-pos",
  ].join(",");

  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(ids)}&vs_currencies=usd`;

  const r = await fetch(url, {
    headers: {
      accept: "application/json",
    },
  });

  const text = await r.text();

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=120, stale-while-revalidate=600");
  res.status(r.status);
  res.setHeader("Content-Type", r.headers.get("content-type") || "application/json");
  return res.send(text);
}
