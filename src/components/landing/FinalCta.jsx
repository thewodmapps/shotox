import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/AuthContext';

export default function FinalCta() {
  const { isAuthenticated } = useAuth();
  return (
    <section className="relative overflow-hidden bg-[#0B0B12] text-white px-6 py-24">
      <motion.div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[640px] h-[640px] rounded-full bg-violet-600/30 blur-[140px]" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
      <div className="relative max-w-3xl mx-auto text-center">
        <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display font-bold tracking-[-0.03em] leading-[1] text-4xl sm:text-6xl">
          Ship screenshots that<br /><span className="shotox-gradient-text">sell your app</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="mt-6 text-lg text-white/60 max-w-xl mx-auto">
          Join thousands of makers turning app installs into a design problem — solved.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="mt-8">
          <Button asChild size="lg" className="rounded-full h-12 px-7 bg-white text-[#0B0B12] hover:bg-white/90 text-base shadow-[0_20px_50px_-15px_rgba(255,255,255,0.4)]">
            <Link to="/projects">{isAuthenticated ? 'Go to Dashboard' : 'Start free'} <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}