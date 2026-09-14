import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';
import { secrets } from "base44:runtime";

// Razorpay signs webhook payloads with HMAC-SHA256 of the raw body using the
// webhook secret configured in the Razorpay dashboard.
async function verifySignature(payload: string, sig: string, secret: string): Promise<boolean> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const mac = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  const expected = [...new Uint8Array(mac)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return expected === sig;
}

const VALID_PLANS = ["monthly", "yearly", "lifetime"];

export default async function (req: Request): Promise<Response> {
  try {
    const sig = req.headers.get("X-Razorpay-Signature");
    const body = await req.text();
    const secret = secrets.get("RAZORPAY_WEBHOOK_SECRET");
    if (!sig || !secret) {
      return Response.json({ error: "Missing signature or secret" }, { status: 400 });
    }
    const ok = await verifySignature(body, sig, secret);
    if (!ok) return Response.json({ error: "Invalid signature" }, { status: 400 });

    const event = JSON.parse(body);
    const base44 = createClientFromRequest(req);

    // The subscription/payment entity carries the notes we set at creation,
    // including the user_id and plan the entitlement maps to.
    const sub = event.payload?.subscription?.entity;
    const payment = event.payload?.payment?.entity;
    const userId = sub?.notes?.user_id || payment?.notes?.user_id;
    const plan = sub?.notes?.plan || payment?.notes?.plan;

    if (event.event === "subscription.activated" || event.event === "subscription.charged") {
      if (userId && VALID_PLANS.includes(plan)) {
        await base44.asServiceRole.entities.User.update(userId, { plan });
        console.log("Razorpay entitlement granted:", plan, "for user", userId);
      }
    } else if (event.event === "subscription.cancelled") {
      // A cancelled recurring plan revokes Pro at the end of its cycle.
      // A one-time lifetime charge completes (not cancels), so it stays granted.
      if (userId && plan !== "lifetime") {
        await base44.asServiceRole.entities.User.update(userId, { plan: "free" });
        console.log("Razorpay entitlement revoked: user", userId);
      }
    }

    return Response.json({ received: true, event: event.event });
  } catch (error) {
    console.error("razorpayWebhook error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}