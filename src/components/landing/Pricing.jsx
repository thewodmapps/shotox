import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';

const PLAN_KEY = { 'Pro Monthly': 'monthly', 'Pro Yearly': 'yearly', 'Lifetime': 'lifetime' };

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    features: ['1 device of your choice', '3 starter templates', 'Up to 3 projects · 5 slides each', 'PNG export only', 'Shotox watermark', 'Personal use only', 'Community support'],
    cta: 'Start free',
  },
  {
    name: 'Pro Monthly',
    price: '$9',
    period: '/ month',
    featured: true,
    features: ['All devices — iPhone, iPad, Android, Feature Graphic, custom', 'All 20+ designer templates', 'Unlimited projects & slides', 'No watermark', 'PNG + JPEG export', 'AI copy generator', 'Commercial use license', 'Email support', 'Cancel anytime'],
    cta: 'Go monthly',
  },
  {
    name: 'Pro Yearly',
    price: '$69',
    period: '/ year',
    badge: 'Save 36%',
    features: ['Everything in Pro Monthly', 'New templates 2 weeks early', 'Early access to AI features', 'Priority email support', '≈ $5.75 / month'],
    cta: 'Go yearly',
  },
  {
    name: 'Lifetime',
    price: '$149',
    period: 'one-time',
    features: ['Everything in Pro Yearly, forever', 'Lifetime updates — all future templates & devices', 'All future AI features included', 'One payment, no subscription', 'Dedicated support'],
    cta: 'Buy once',
  },
];

export default function Pricing() {
  const [loadingPlan, setLoadingPlan] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  async function handleCheckout(name) {
    if (window.self !== window.top) {
      alert('Checkout works only from the published app. Open Shotox in a new tab to upgrade.');
      return;
    }
    if (!isAuthenticated) {
      navigate(`/login?returnTo=${encodeURIComponent('/projects')}`);
      return;
    }
    try {
      setLoadingPlan(name);
      const res = await base44.functions.invoke('createCheckoutSession', { plan: PLAN_KEY[name], origin: window.location.origin });
      if (res.data?.url) window.location.href = res.data.url;
      else throw new Error(res.data?.error || 'No checkout URL returned');
    } catch (e) {
      alert(e.message || 'Checkout failed. Please try again.');
    } finally {
      setLoadingPlan(null);
    }
  }

  return (
    <section id="pricing" className="py-24 px-6 bg-[#0B0B12] text-white relative overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-violet-600/30 blur-[140px] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-medium text-pink-400 mb-3">Pricing</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">Simple pricing. Serious results.</h2>
          <p className="mt-3 text-white/55">Start free with one device. Upgrade anytime to unlock every device, template and export.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {PLANS.map((p) => (
            <div key={p.name} className={`relative rounded-3xl p-6 border flex flex-col ${p.featured ? 'bg-gradient-to-b from-violet-600 to-pink-600 border-transparent shadow-[0_40px_80px_-30px_rgba(236,72,153,0.5)] lg:-my-3' : 'bg-white/5 border-white/10'}`}>
              {p.badge && <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[11px] font-semibold px-3 py-1 rounded-full bg-lime-300 text-[#0B0B12]">{p.badge}</span>}
              <div className="text-sm font-medium opacity-80">{p.name}</div>
              <div className="mt-3 flex items-baseline gap-1.5"><span className="font-display text-4xl font-bold">{p.price}</span><span className="text-sm opacity-70">{p.period}</span></div>
              <ul className="mt-6 space-y-2.5 text-sm flex-1">
                {p.features.map((f) => <li key={f} className="flex items-start gap-2.5"><Check className="w-4 h-4 shrink-0 mt-0.5" /> <span>{f}</span></li>)}
              </ul>
              {p.name === 'Free' ? (
                <Button asChild className={`mt-7 rounded-xl h-11 ${p.featured ? 'bg-white text-[#0B0B12] hover:bg-white/90' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
                  <Link to="/projects">{p.cta}</Link>
                </Button>
              ) : (
                <Button
                  disabled={loadingPlan === p.name}
                  onClick={() => handleCheckout(p.name)}
                  className={`mt-7 rounded-xl h-11 ${p.featured ? 'bg-white text-[#0B0B12] hover:bg-white/90' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                >
                  {loadingPlan === p.name ? 'Redirecting…' : p.cta}
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}