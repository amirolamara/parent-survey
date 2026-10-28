const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();
  const b = req.body || {};
  const row = { time: new Date().toLocaleString("fa-IR", { timeZone: "Asia/Tehran" }) };
  for (let i = 1; i <= 19; i++) row["q" + i] = String(b["q" + i] ?? "").slice(0, 3000);
  row.name = String(b.name ?? "").slice(0, 200);
  const r = await fetch(URL_, { method: "POST", headers: { Authorization: "Bearer " + TOKEN },
    body: JSON.stringify(["RPUSH", "responses", JSON.stringify(row)]) });
  if (!r.ok) return res.status(500).json({ ok: false });
  res.status(200).json({ ok: true });
};
