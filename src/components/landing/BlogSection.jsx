import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { POSTS as CARDS } from '@/lib/blogPosts';

export default function BlogSection() {
  return (
    <section id="blog" className="py-24 px-6 bg-[#FAFAFC]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-medium text-violet-600 mb-3">Guides & resources</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#0B0B12]">Learn to ship store-ready screenshots</h2>
          <p className="mt-4 text-[#0B0B12]/60">Practical ASO and design guides to help you turn raw screenshots into installs.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CARDS.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
            >
              <Link to={`/blog/${p.slug}`} className="group flex flex-col h-full rounded-3xl bg-white border border-black/5 overflow-hidden hover:shadow-[0_20px_60px_-20px_rgba(124,58,237,0.25)] hover:-translate-y-1 transition-all duration-300">
                <div className="h-40 relative overflow-hidden">
                  <Image src={p.image} alt={p.title} className="w-full h-full" fittingType="fill" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 text-[11px] font-semibold text-[#0B0B12]">{p.tag}</span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display font-semibold text-lg text-[#0B0B12] leading-snug group-hover:text-violet-600 transition-colors">{p.title}</h3>
                  <p className="mt-3 text-sm text-[#0B0B12]/60 leading-relaxed flex-1">{p.body.split('\n').find((l) => l.trim() && !l.startsWith('#')).replace(/[*`]/g, '').slice(0, 150)}…</p>
                  <div className="mt-5 flex items-center justify-between text-xs text-[#0B0B12]/45">
                    <span className="inline-flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {p.read} read</span>
                    <span className="inline-flex items-center gap-1 font-medium text-violet-600 group-hover:gap-2 transition-all">Read <ArrowRight className="w-3.5 h-3.5" /></span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}