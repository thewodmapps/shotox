import { secrets } from "base44:runtime";

// TEST_MODE = true → every plan charges ₹1 once (no recurring) so you can
// verify the flow without accumulating subscription charges. To go live:
//   1. Set TEST_MODE = false.
//   2. Update each `inr` amount to your real price in paise (₹99 = 9900).
//   3. monthly/yearly become indefinite recurring; lifetime stays one charge.
const TEST_MODE = true;

const PRICES = {
  monthly: { inr: 100, period: "monthly", interval: 1, name: "Shotox Pro Monthly", desc: "Pro Monthly — ₹1 test" },
  yearly: { inr: 100, period: "yearly", interval: 1, name: "Shotox Pro Yearly", desc: "Pro Yearly — ₹1 test" },
  lifetime: { inr: 100, period: "monthly", interval: 1, name: "Shotox Lifetime", desc: "Lifetime — ₹1 test" },
};

// Razorpay plans are reusable, so we cache the plan id in-memory (warm worker)
// after the first lookup to avoid recreating plans on every checkout.
const planCache: Record<string, string> = {};

async function getPlanId(plan: string, cfg: any, authHeader: string, appId: string): Promise<string> {
  if (planCache[plan]) return planCache[plan];
  // Reuse an existing plan with the same name + amount to avoid duplicates.
  try {
    const listRes = await fetch("https://api.razorpay.com/v1/plans?count=100", {
      headers: { Authorization: authHeader },
    });
    const list = await listRes.json();
    const existing = (list.items || []).find(
      (p: any) => p.item?.name === cfg.name && p.item?.amount === cfg.inr
    );
    if (existing) {
      planCache[plan] = existing.id;
      return existing.id;
    }
  } catch (_e) {
    /* ignore — fall through to create */
  }

  const params = new URLSearchParams();
  params.set("period", cfg.period);
  params.set("interval", String(cfg.interval));
  params.set("item[name]", cfg.name);
  params.set("item[amount]", String(cfg.inr));
  params.set("item[currency]", "INR");
  params.set("notes[base44_app_id]", appId);

  const res = await fetch("https://api.razorpay.com/v1/plans", {
    method: "POST",
    headers: { Authorization: authHeader, "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error?.description || "Razorpay plan creation failed");
  planCache[plan] = data.id;
  return data.id;
}

export default async function (req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const plan = body.plan as string;
    const cfg = (PRICES as any)[plan];
    if (!cfg) return Response.json({ error: "Invalid plan" }, { status: 400 });

    const userId = (body.user_id as string) || "";
    const email = (body.email as string) || "";
    const appId = secrets.get("BASE44_APP_ID") || "";
    const keyId = secrets.get("RAZORPAY_KEY_ID");
    const keySecret = secrets.get("RAZORPAY_KEY_SECRET");
    if (!keyId || !keySecret) {
      return Response.json({ error: "Razorpay keys not configured" }, { status: 500 });
    }

    const authHeader = `Basic ${btoa(`${keyId}:${keySecret}`)}`;
    const planId = await getPlanId(plan, cfg, authHeader, appId);

    // In test mode every plan is a single ₹1 charge. In production monthly/yearly
    // recur indefinitely (omitted total_count) and lifetime is a single charge.
    const totalCount = TEST_MODE ? 1 : plan === "lifetime" ? 1 : undefined;

    const params = new URLSearchParams();
    params.set("plan_id", planId);
    params.set("customer_notify", "1");
    if (totalCount) params.set("total_count", String(totalCount));
    if (userId) params.set("notes[user_id]", userId);
    if (email) params.set("notes[email]", email);
    params.set("notes[plan]", plan);
    params.set("notes[base44_app_id]", appId);

    const res = await fetch("https://api.razorpay.com/v1/subscriptions", {
      method: "POST",
      headers: { Authorization: authHeader, "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });
    const data = await res.json();
    if (!res.ok) {
      console.error("Razorpay subscription error:", JSON.stringify(data));
      return Response.json({ error: data?.error?.description || "Razorpay error" }, { status: 502 });
    }

    return Response.json({
      subscription_id: data.id,
      short_url: data.short_url,
      key_id: keyId,
      name: "Shotox",
      description: cfg.desc,
      plan,
    });
  } catch (error) {
    console.error("createRazorpaySubscription error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}