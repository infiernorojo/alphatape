export function setCommonHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  // Edge/cache-friendly (Vercel)
  res.setHeader("Cache-Control", "s-maxage=15, stale-while-revalidate=120");
}

export function handleOptions(req, res) {
  if (req.method === "OPTIONS") {
    setCommonHeaders(res);
    res.status(204).end();
    return true;
  }
  return false;
}

export function getQuery(req) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  return url.searchParams;
}
