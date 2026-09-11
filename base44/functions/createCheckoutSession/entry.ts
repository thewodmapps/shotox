import { secrets } from "base44:runtime";

const PRICES = {
  monthly: { id: "price_1UDhgRGViU3LxfspePdA6476", mode: "subscription" },
  yearly: { id: "price_1UDhgRGViU3LxfspeGcBf4Eb", mode: "subscription" },
  lifetime: { id: "price_1UDhgRGViU3LxfspQpWG4Tef", mode: "payment" },
};

const STRIPE_VERSION = "2025-10-29.clover";

export default async function (req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const plan = PRICES[body.plan as keyof typeof PRICES];
    if (!plan) return Response.json({ error: "Invalid plan" }, { status: 400 });

    const userId = (body.user_id as string) || "";
    const email = (body.email as string) || "";
    // Return the user to the exact origin the app is running in so the post-purchase
    // redirect lands back inside the app (and triggers the welcome popup), not on a
    // different domain that would open in the external browser.
    const origin = (body.origin as string) || "https://shotox.in";

    const key = secrets.get("STRIPE_SECRET_KEY");
    const appId = secrets.get("BASE44_APP_ID") || "";

    const params = new URLSearchParams();
    params.set("mode", plan.mode);
    params.set("line_items[0][price]", plan.id);
    params.set("line_items[0][quantity]", "1");
    if (userId) params.set("client_reference_id", userId);
    if (email) params.set("customer_email", email);
    params.set("success_url", `${origin}/projects?upgraded=1&plan=${body.plan}`);
    params.set("cancel_url", `${origin}/#pricing`);
    params.set("metadata[base44_app_id]", appId);
    if (userId) params.set("metadata[user_id]", userId);
    params.set("metadata[plan]", body.plan);
    if (plan.mode === "subscription") {
      params.set("subscription_data[metadata][base44_app_id]", appId);
      if (userId) params.set("subscription_data[metadata][user_id]", userId);
      params.set("subscription_data[metadata][plan]", body.plan);
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