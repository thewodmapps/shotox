import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';
import CheckoutNoticeModal from '@/components/landing/CheckoutNoticeModal';

const PLAN_KEY = { 'Pro Monthly': 'monthly', 'Pro Yearly': 'yearly', 'Lifetime': 'lifetime' };
const PLAN_ID = { 'Free': 'free', 'Pro Monthly': 'monthly', 'Pro Yearly': 'yearly', 'Lifetime': 'lifetime' };
const RANK = { free: 0, monthly: 1, yearly: 2, lifetime: 3 };

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    features: ['1 device of your choice — iPhone, Android, iPad, etc.', '3 starter templates', 'Up to 3 projects', 'All 8 slides per template', 'Shotox watermark', 'Personal use only', 'No credit card required'],
    cta: 'Start free',
  },
  {
    name: 'Pro Monthly',
    price: '$9',
    period: '/ month',
    features: ['All devices — iPhone, iPad, Android, Feature Graphic, custom', 'All 100+ designer templates', 'Unlimited projects & slides', 'No watermark', 'PNG + JPEG export', 'AI copy generator', 'Commercial use license', 'Email support'],
    cta: 'Go monthly',
  },
  {
    name: 'Pro Yearly',
    price: '$69',
    period: '/ year',
    featured: true,
    badge: 'Most popular',
    features: ['Everything in Pro Monthly', 'New templates 2 weeks early', 'Early access to AI features', 'Priority email support', '≈ $5.75 / month'],
    cta: 'Go yearly',
  },
  {
    name: 'Lifetime',
    price: '$149',
    period: 'one-time',
    accent: 'amber',
    badge: 'Best value',
    features: ['Everything in Pro Yearly, forever', 'Lifetime updates — all future templates & devices', 'All future AI features included', 'One payment, no subscription', 'Dedicated support'],
    cta: 'Buy once',
  },
];

export default function Pricing() {
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [showNotice, setShowNotice] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const currentRank = RANK[user?.plan] ?? 0;

  async function handleCheckout(name) {
    if (window.self !== window.top) {
      setShowNotice(true);
      return;
    }
    if (!isAuthenticated) {
      navigate(`/login?returnTo=${encodeURIComponent('/projects')}`);
      return;
    }
    try {
      setLoadingPlan(name);
      const res = await base44.functions.invoke('createCheckoutSession', {
        plan: PLAN_KEY[name],
        origin: window.location.origin,
        user_id: user?.id,
        email: user?.email,
      });
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
      <div className="absolute -bottom-20 right-0 w-[500px] h-[400px] rounded-full bg-pink-600/15 blur-[120px] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-medium text-pink-400 mb-3">Pricing</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">Simple pricing. Serious results.</h2>
          <p className="mt-3 text-white/55">Start free with one device of your choice. Upgrade anytime to unlock every device, template and export.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {PLANS.map((p) => {
            const isHero = p.featured;
            const isAmber = p.accent === 'amber';
            const planRank = RANK[PLAN_ID[p.name]] ?? 0;
            const isCurrent = planRank === currentRank;
            const isDowngrade = planRank < currentRank;
            const isOwned = isCurrent || isDowngrade;
            return (
              <div
                key={p.name}
                className={`relative rounded-3xl p-6 flex flex-col transition-all duration-300 ${isOwned ? 'opacity-60' : 'hover:-translate-y-1'} ${
                  isHero
                    ? 'bg-gradient-to-b from-violet-600 to-fuchsia-600 border border-transparent shadow-[0_40px_80px_-30px_rgba(217,70,239,0.5)] lg:-my-2'
                    : 'bg-white/[0.04] border border-white/10 hover:border-white/20 backdrop-blur-sm'
                }`}
              >
                {isAmber && !isHero && (
                  <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/60 to-transparent" />
                )}
                {p.badge && (
                  <span
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 text-[11px] font-semibold px-3 py-1 rounded-full shadow-lg flex items-center gap-1 ${
                      isHero ? 'bg-white text-[#0B0B12]' : 'bg-amber-300 text-[#0B0B12]'
                    }`}
                  >
                    {isHero && <Sparkles className="w-3 h-3" />}
                    {p.badge}
                  </span>
                )}
                <div className="text-sm font-medium opacity-80">{p.name}</div>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="font-display text-4xl font-bold tracking-tight">{p.price}</span>
                  <span className="text-sm opacity-70">{p.period}</span>
                </div>
                <div className={`mt-5 h-px ${isHero ? 'bg-white/20' : 'bg-white/10'}`} />
                <ul className="mt-5 space-y-3 text-sm flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <span
                        className={`shrink-0 mt-0.5 flex items-center justify-center w-4 h-4 rounded-full ${
                          isHero ? 'bg-white/20' : isAmber ? 'bg-amber-300/15' : 'bg-white/10'
                        }`}
                      >
                        <Check className={`w-3 h-3 ${isAmber ? 'text-amber-300' : isHero ? 'text-white' : 'text-violet-300'}`} />
                      </span>
                      <span className={isHero ? 'text-white/90' : 'text-white/75'}>{f}</span>
                    </li>
                  ))}
                </ul>
                {p.name === 'Free' ? (
                  isOwned ? (
                    <Button disabled className="mt-7 rounded-xl h-11 bg-white/5 text-white/40 border border-white/10 cursor-not-allowed">
                      Included
                    </Button>
                  ) : (
                    <Button asChild className={`mt-7 rounded-xl h-11 ${isHero ? 'bg-white text-[#0B0B12] hover:bg-white/90' : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'}`}>
                      <Link to="/projects">{p.cta}</Link>
                    </Button>
                  )
                ) : (
                  <Button
                    disabled={isOwned || loadingPlan === p.name}
                    onClick={() => handleCheckout(p.name)}
                    className={`mt-7 rounded-xl h-11 ${isOwned ? 'bg-white/5 text-white/40 border border-white/10 cursor-not-allowed' : isHero ? 'bg-white text-[#0B0B12] hover:bg-white/90' : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'}`}
                  >
                    {loadingPlan === p.name ? 'Redirecting…' : isCurrent ? 'Current plan' : isDowngrade ? 'Included' : p.cta}
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <CheckoutNoticeModal open={showNotice} onClose={() => setShowNotice(false)} />
    </section>
  );
}