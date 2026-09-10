import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';

const PLAN_INFO = {
  monthly: { name: 'Pro Monthly', price: '$9 / month', perks: ['All devices & templates', 'Unlimited projects & slides', 'No watermark'] },
  yearly: { name: 'Pro Yearly', price: '$69 / year', perks: ['Everything in Pro Monthly', 'New templates 2 weeks early', 'Priority support'] },
  lifetime: { name: 'Lifetime', price: '$149 one-time', perks: ['Everything in Pro, forever', 'All future updates included', 'Dedicated support'] },
};

export default function WelcomeModal() {
  const [params, setParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const plan = params.get('plan');
  const info = PLAN_INFO[plan];

  useEffect(() => {
    if (params.get('upgraded') === '1' && info) {
      setOpen(true);
      const end = Date.now() + 1200;
      const colors = ['#c4b5fd', '#f472b6', '#fdba74', '#ffffff'];
      const frame = () => {
        confetti({ particleCount: 4, angle: 60, spread: 70, origin: { x: 0 }, colors });
        confetti({ particleCount: 4, angle: 120, spread: 70, origin: { x: 1 }, colors });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const close = () => {
    setOpen(false);
    const next = new URLSearchParams(params);
    next.delete('upgraded');
    next.delete('plan');
    setParams(next, { replace: true });
  };

  if (!info) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="relative w-full max-w-md rounded-3xl bg-[#0B0B12] border border-white/10 p-8 text-center overflow-hidden"
          >
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[320px] h-[320px] rounded-full bg-gradient-to-b from-violet-600/40 to-pink-600/30 blur-[80px] pointer-events-none" />
            <div className="relative">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center mb-5">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <p className="text-xs font-semibold text-pink-400 tracking-wide uppercase">You're all set</p>
              <h2 className="mt-2 font-display text-3xl font-bold text-white">Welcome to {info.name} 🎉</h2>
              <p className="mt-2 text-white/60 text-sm">Thanks for upgrading. Your Pro features are unlocked and ready to go.</p>
              <div className="mt-5 rounded-2xl bg-white/5 border border-white/10 p-4 text-left">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-white/60">Plan</span>
                  <span className="font-semibold text-white">{info.name}</span>
                </div>
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/10">
                  <span className="text-sm text-white/60">Billed</span>
                  <span className="font-semibold text-white">{info.price}</span>
                </div>
                <ul className="space-y-2">
                  {info.perks.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-white/80">
                      <Check className="w-4 h-4 text-pink-400 shrink-0" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
              <Button onClick={close} className="mt-6 w-full h-12 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 hover:opacity-90 text-white border-0">
                Start creating
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}