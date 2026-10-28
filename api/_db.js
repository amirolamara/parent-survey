// پیدا کردن خودکار آدرس و توکن دیتابیس، با هر نامی که ورسل گذاشته باشد
function find(re) {
  const k = Object.keys(process.env).find(k => re.test(k) && !/READ_ONLY/.test(k));
  return k ? process.env[k] : undefined;
}
const URL_ = find(/REST_(API_)?URL$/);
const TOKEN = find(/REST_(API_)?TOKEN$/);
async function cmd(args) {
  if (!URL_ || !TOKEN) throw new Error("DB_ENV_MISSING");
  const r = await fetch(URL_, { method: "POST", headers: { Authorization: "Bearer " + TOKEN }, body: JSON.stringify(args) });
  if (!r.ok) throw new Error("DB_HTTP_" + r.status);
  return (await r.json()).result;
}
module.exports = { cmd };
