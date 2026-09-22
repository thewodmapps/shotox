import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/AuthContext';
import HeroShowcase from './HeroShowcase';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export default function Hero() {
  const { isAuthenticated } = useAuth();
  const reduce = usePrefersReducedMotion();
  return (
    <section className="relative min-h-screen bg-[#0B0B12] text-white overflow-hidden pt-36 pb-20 px-6 bg-grid">
      <motion.div className="absolute -top-32 -left-24 w-[520px] h-[520px] rounded-full bg-violet-600/40 blur-[120px]" animate={reduce ? {} : { x: [0, 40, 0], y: [0, 30, 0] }} transition={reduce ? { duration: 0 } : { duration: 12, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="absolute top-40 -right-24 w-[520px] h-[520px] rounded-full bg-pink-500/35 blur-[120px]" animate={reduce ? {} : { x: [0, -40, 0], y: [0, 40, 0] }} transition={reduce ? { duration: 0 } : { duration: 14, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="absolute bottom-0 left-1/3 w-[420px] h-[420px] rounded-full bg-orange-500/25 blur-[120px]" animate={reduce ? {} : { y: [0, -50, 0] }} transition={reduce ? { duration: 0 } : { duration: 10, repeat: Infinity, ease: 'easeInOut' }} />

      <div className="relative max-w-6xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime-300 text-[#0B0B12] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" /> Free forever • No watermark • No credit card
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display font-bold tracking-[-0.04em] leading-[0.95] text-6xl sm:text-7xl lg:text-8xl mt-7">
          App Screenshot<br /><span className="shotox-gradient-text">Generator</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-7 text-lg text-white/65 max-w-xl mx-auto">
          Create beautiful, customized app screenshots for the Apple App Store & Google Play — in minutes, not days.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild size="lg" className="rounded-full h-12 px-7 bg-white text-[#0B0B12] hover:bg-white/90 text-base shadow-[0_20px_50px_-15px_rgba(255,255,255,0.4)]">
            <Link to="/projects">{isAuthenticated ? 'Dashboard' : 'Create your screenshot free'} <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>

        </motion.div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-5 text-sm text-white/50">
          ✓ Every device & template unlocked · PNG/JPEG export · No watermark
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 60, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="relative mt-14 max-w-5xl mx-auto">
          <HeroShowcase />
        </motion.div>
      </div>
    </section>
  );
}