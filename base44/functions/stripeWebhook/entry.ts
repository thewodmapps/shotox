import { secrets } from "base44:runtime";

async function verifySignature(payload: string, header: string, secret: string): Promise<boolean> {
  const parts: Record<string, string> = Object.fromEntries(
    header.split(",").map((p) => p.split("=") as [string, string])
  );
  const t = parts.t;
  const sig = parts.v1;
  if (!t || !sig) return false;
  const age = Math.abs(Date.now() / 1000 - parseInt(t, 10));
  if (age > 300) return false;
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const mac = await crypto.subtle.sign("HMAC", key, enc.encode(`${t}.${payload}`));
  const expected = [...new Uint8Array(mac)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return expected === sig;
}

export default async function (req: Request): Promise<Response> {
  try {
    const sig = req.headers.get("Stripe-Signature");
    const body = await req.text();
    const secret = secrets.get("STRIPE_WEBHOOK_SECRET");
    if (!sig || !secret) {
      return Response.json({ error: "Missing signature or secret" }, { status: 400 });
    }
    const ok = await verifySignature(body, sig, secret);
    if (!ok) return Response.json({ error: "Invalid signature" }, { status: 400 });

    const event = JSON.parse(body);
    // Transaction tracking is handled by Base44 via metadata[base44_app_id].
    // Extend here to grant entitlements once user accounts exist.
    console.log("Stripe webhook received:", event.type);
    return Response.json({ received: true, type: event.type });
  } catch (error) {
    console.error("stripeWebhook error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}