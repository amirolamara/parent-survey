const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
module.exports = async (req, res) => {
  if (!process.env.ADMIN_PASSWORD || req.headers["x-admin-password"] !== process.env.ADMIN_PASSWORD)
    return res.status(401).json({ error: "unauthorized" });
  const r = await fetch(URL_, { method: "POST", headers: { Authorization: "Bearer " + TOKEN },
    body: JSON.stringify(["LRANGE", "responses", 0, -1]) });
  const j = await r.json();
  res.status(200).json({ rows: (j.result || []).map(x => JSON.parse(x)) });
};
