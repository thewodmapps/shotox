import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PLANS = [
  { name: 'Free', price: '$0', period: 'forever', features: ['1 device size', '1 template', 'PNG export', '1 project', 'Ad-supported'], cta: 'Start free' },
  { name: 'Pro', price: '$9', period: 'per month', featured: true, features: ['All templates', 'Unlimited projects', 'PNG + JPEG export', 'Priority new templates', 'Commercial use'], cta: 'Go Pro' },
  { name: 'Lifetime', price: '$49', period: 'one-time', features: ['Everything in Pro', 'Lifetime updates', 'Early access to AI features'], cta: 'Buy once' },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6 bg-[#0B0B12] text-white relative overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-violet-600/30 blur-[140px] pointer-events-none" />
      <div className="max-w-5xl mx-auto relative">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-medium text-pink-400 mb-3">Pricing</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">Simple pricing. Serious results.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5 items-stretch">
          {PLANS.map((p) => (
            <div key={p.name} className={`rounded-3xl p-7 border flex flex-col ${p.featured ? 'bg-gradient-to-b from-violet-600 to-pink-600 border-transparent shadow-[0_40px_80px_-30px_rgba(236,72,153,0.5)] md:-my-4' : 'bg-white/5 border-white/10'}`}>
              <div className="text-sm font-medium opacity-80">{p.name}</div>
              <div className="mt-3 flex items-baseline gap-1.5"><span className="font-display text-4xl font-bold">{p.price}</span><span className="text-sm opacity-70">{p.period}</span></div>
              <ul className="mt-6 space-y-2.5 text-sm flex-1">
                {p.features.map((f) => <li key={f} className="flex items-center gap-2.5"><Check className="w-4 h-4 shrink-0" /> {f}</li>)}
              </ul>
              <Button asChild className={`mt-7 rounded-xl h-11 ${p.featured ? 'bg-white text-[#0B0B12] hover:bg-white/90' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
                <Link to="/projects">{p.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}