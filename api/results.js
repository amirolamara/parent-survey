const { cmd } = require("./_db");
module.exports = async (req, res) => {
  if (!process.env.ADMIN_PASSWORD || req.headers["x-admin-password"] !== process.env.ADMIN_PASSWORD)
    return res.status(401).json({ error: "unauthorized" });
  try {
    const list = await cmd(["LRANGE", "responses", 0, -1]);
    res.status(200).json({ rows: (list || []).map(x => JSON.parse(x)) });
  } catch (e) {
    res.status(500).json({ error: String(e.message || e) });
  }
};
