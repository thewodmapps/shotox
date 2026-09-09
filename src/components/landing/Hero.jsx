import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/AuthContext';
import HeroExplosion from './HeroExplosion';
import HeroConfetti from './HeroConfetti';

export default function Hero() {
  const { isAuthenticated } = useAuth();
  return (
    <section className="relative min-h-screen bg-[#0B0B12] text-white overflow-hidden pt-28 pb-16 px-6">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(120% 90% at 18% 24%, #1a0b2e 0%, #0a0a0a 55%, #0B0B12 100%)' }} />
      <div className="absolute -top-32 -left-24 w-[520px] h-[520px] rounded-full bg-violet-600/30 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[440px] h-[440px] rounded-full bg-pink-500/20 blur-[130px] pointer-events-none" />
      <HeroConfetti />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[45%_55%] gap-8 lg:gap-6 items-center min-h-[78vh]">
          <div className="text-left max-w-xl">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/8 border border-white/15 backdrop-blur-md text-xs font-semibold text-white/90">
              <Sparkles className="w-3.5 h-3.5 text-violet-300" /> iPhone, iPad, Tablet & Android — store-ready sizes
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display font-bold tracking-[-0.04em] leading-[0.95] text-6xl sm:text-7xl mt-6">
              App Screenshot<br /><span className="shotox-gradient-text">Generator</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mt-6 text-lg text-white/65 max-w-md">
              Create beautiful, customized app screenshots for your App Store & Google Play Store — in minutes, not days.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button asChild size="lg" className="rounded-full h-12 px-7 bg-white text-[#0B0B12] hover:bg-white/90 text-base shadow-[0_20px_50px_-12px_rgba(255,255,255,0.55)]">
                <Link to="/projects">{isAuthenticated ? 'Go to Dashboard' : 'Get started for free'} <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
              <a href="#features" className="text-sm text-white/70 hover:text-white transition-colors px-1 py-3">See how it works</a>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <HeroExplosion />
          </motion.div>
        </div>
      </div>
    </section>
  );
}