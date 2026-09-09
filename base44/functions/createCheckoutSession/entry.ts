import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';
import { secrets } from "base44:runtime";

const PRICES = {
  monthly: { id: "price_1UDhgRGViU3LxfspePdA6476", mode: "subscription" },
  yearly: { id: "price_1UDhgRGViU3LxfspeGcBf4Eb", mode: "subscription" },
  lifetime: { id: "price_1UDhgRGViU3LxfspQpWG4Tef", mode: "payment" },
};

const STRIPE_VERSION = "2025-10-29.clover";

export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: "Login required to upgrade" }, { status: 401 });

    const body = await req.json();
    const plan = PRICES[body.plan as keyof typeof PRICES];
    if (!plan) return Response.json({ error: "Invalid plan" }, { status: 400 });

    const origin = (body.origin as string) || "https://zubilo-visual-flow.base44.app";
    const key = secrets.get("STRIPE_SECRET_KEY");
    const appId = secrets.get("BASE44_APP_ID") || "";

    const params = new URLSearchParams();
    params.set("mode", plan.mode);
    params.set("line_items[0][price]", plan.id);
    params.set("line_items[0][quantity]", "1");
    params.set("client_reference_id", user.id);
    if (user.email) params.set("customer_email", user.email);
    params.set("success_url", `${origin}/projects?upgraded=1`);
    params.set("cancel_url", `${origin}/#pricing`);
    params.set("metadata[base44_app_id]", appId);
    params.set("metadata[user_id]", user.id);
    if (plan.mode === "subscription") {
      params.set("subscription_data[metadata][base44_app_id]", appId);
      params.set("subscription_data[metadata][user_id]", user.id);
    }

    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Stripe-Version": STRIPE_VERSION,
        "Content-Type": "application/x-www-form-urlencoded",
        "Idempotency-Key": crypto.randomUUID(),
      },
      body: params.toString(),
    });
    const data = await res.json();
    if (!res.ok) {
      console.error("Stripe checkout error:", JSON.stringify(data));
      return Response.json({ error: data?.error?.message || "Stripe error" }, { status: 502 });
    }
    return Response.json({ url: data.url });
  } catch (error) {
    console.error("createCheckoutSession error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}