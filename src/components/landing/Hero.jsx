import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Smartphone, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';

const HERO_IMG = 'https://media.base44.com/images/public/6aa0ad9172db932d1d29336b/4a6c3fbf3_generated_image.png';

const Float = ({ className, delay = 0, children }) => (
  <motion.div className={`absolute ${className}`} animate={{ y: [0, -14, 0], rotate: [0, 4, 0] }} transition={{ duration: 6, delay, repeat: Infinity, ease: 'easeInOut' }}>
    {children}
  </motion.div>
);

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#0B0B12] text-white overflow-hidden pt-36 pb-20 px-6 bg-grid">
      <motion.div className="absolute -top-32 -left-24 w-[520px] h-[520px] rounded-full bg-violet-600/40 blur-[120px]" animate={{ x: [0, 40, 0], y: [0, 30, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="absolute top-40 -right-24 w-[520px] h-[520px] rounded-full bg-pink-500/35 blur-[120px]" animate={{ x: [0, -40, 0], y: [0, 40, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="absolute bottom-0 left-1/3 w-[420px] h-[420px] rounded-full bg-orange-500/25 blur-[120px]" animate={{ y: [0, -50, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />

      <div className="relative max-w-6xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime-300 text-[#0B0B12] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" /> iPhone, iPad & Android — store-ready sizes
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display font-bold tracking-[-0.04em] leading-[0.95] text-6xl sm:text-7xl lg:text-8xl mt-7">
          App Screenshot<br /><span className="zubilo-gradient-text">Generator</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-7 text-lg text-white/65 max-w-xl mx-auto">
          Create beautiful, customized app screenshots for your App Store & Google Play page — in minutes, not days.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild size="lg" className="rounded-full h-12 px-7 bg-white text-[#0B0B12] hover:bg-white/90 text-base shadow-[0_20px_50px_-15px_rgba(255,255,255,0.4)]">
            <Link to="/projects">Get started for free <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
          <a href="#features" className="text-sm text-white/60 hover:text-white transition-colors px-4 py-3">See how it works</a>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 60, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="relative mt-16 max-w-4xl mx-auto">
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} className="rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_60px_120px_-40px_rgba(124,58,237,0.6)]">
            <Image src={HERO_IMG} alt="3D floating phones showing generated app screenshots" className="w-full aspect-[16/9]" />
          </motion.div>
          <Float className="-left-4 top-10 hidden sm:block" delay={0.5}>
            <div className="glass-card"><Smartphone className="w-4 h-4 text-violet-300" /> Store-ready sizes for every device</div>
          </Float>
          <Float className="-right-6 top-1/3 hidden sm:block" delay={1.2}>
            <div className="glass-card"><Zap className="w-4 h-4 text-lime-300" /> Pixel-perfect PNG & JPEG export</div>
          </Float>
          <Float className="left-10 -bottom-6 hidden md:block" delay={2}>
            <div className="glass-card"><Sparkles className="w-4 h-4 text-pink-300" /> 20 designer templates</div>
          </Float>
        </motion.div>
      </div>
    </section>
  );
}