const { cmd } = require("./_db");
module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();
  try {
    let b = req.body || {};
    if (typeof b === "string") b = JSON.parse(b);
    const row = { time: new Date().toLocaleString("fa-IR", { timeZone: "Asia/Tehran" }) };
    for (let i = 1; i <= 19; i++) row["q" + i] = String(b["q" + i] ?? "").slice(0, 3000);
    row.name = String(b.name ?? "").slice(0, 200);
    await cmd(["RPUSH", "responses", JSON.stringify(row)]);
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: String(e.message || e) });
  }
};
