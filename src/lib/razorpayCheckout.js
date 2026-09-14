// Lightweight loader + opener for the Razorpay Checkout modal. The script is
// loaded on demand so it isn't part of the initial bundle.

const SCRIPT = "https://checkout.razorpay.com/v1/checkout.js";
let loadPromise = null;

export function loadRazorpay() {
  if (window.Razorpay) return Promise.resolve();
  if (loadPromise) return loadPromise;
  loadPromise = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = SCRIPT;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => {
      loadPromise = null;
      reject(new Error("Failed to load Razorpay checkout"));
    };
    document.body.appendChild(s);
  });
  return loadPromise;
}

// Opens the hosted checkout modal for an existing subscription id. Resolves
// with the Razorpay response on success, rejects on dismissal or failure.
export async function openRazorpaySubscription({
  keyId,
  subscriptionId,
  name,
  description,
  email,
  userId,
  plan,
}) {
  await loadRazorpay();
  return new Promise((resolve, reject) => {
    const rzp = new window.Razorpay({
      key: keyId,
      subscription_id: subscriptionId,
      name: name || "Shotox",
      description: description || "Subscription",
      prefill: { email: email || "" },
      notes: { user_id: userId || "", plan: plan || "" },
      handler: (response) => resolve(response),
      modal: { ondismiss: () => reject(new Error("dismissed")) },
      theme: { color: "#7c3aed" },
    });
    rzp.on("payment.failed", () => reject(new Error("Payment failed")));
    rzp.open();
  });
}