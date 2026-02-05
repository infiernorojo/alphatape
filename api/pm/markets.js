import { getQuery, handleOptions, setCommonHeaders } from "./_util.js";

export default async function handler(req, res) {
  if (handleOptions(req, res)) return;
  if (req.method !== "GET") {
    setCommonHeaders(res);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const q = getQuery(req);
  const target = new URL("https://gamma-api.polymarket.com/markets");
  for (const [k, v] of q.entries()) target.searchParams.set(k, v);

  const r = await fetch(target.toString(), {
    headers: { accept: "application/json" },
  });

  const text = await r.text();

  setCommonHeaders(res);
  res.status(r.status);
  res.setHeader("Content-Type", r.headers.get("content-type") || "application/json");
  return res.send(text);
}
