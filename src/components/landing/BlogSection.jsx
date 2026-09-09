import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';

const POSTS = [
  {
    tag: 'App Store Optimization',
    title: 'How to Design App Store Screenshots That Convert',
    excerpt: 'The first screenshot decides whether a user taps Get. Learn the layout patterns, text hierarchy, and color choices that top-grossing apps use to boost install rates.',
    read: '6 min',
    accent: 'from-violet-500 to-fuchsia-500',
  },
  {
    tag: 'Google Play',
    title: 'Google Play Screenshot Sizes & Feature Graphics in 2026',
    excerpt: 'Every required Google Play asset dimension — phone, tablet, feature graphic and icon — plus how to export them all from one project without re-rendering.',
    read: '5 min',
    accent: 'from-emerald-500 to-teal-500',
  },
  {
    tag: 'Design',
    title: 'The Best Fonts for App Screenshots (and How to Pair Them)',
    excerpt: 'A practical guide to choosing display typefaces that stay legible at thumbnail size, with pairing rules for headlines and subheadings that feel premium.',
    read: '7 min',
    accent: 'from-orange-500 to-pink-500',
  },
  {
    tag: 'ASO',
    title: 'Why Your App Screenshots Matter More Than Your Description',
    excerpt: 'Only 2% of users read the full app description, but nearly everyone scrolls the screenshots. Here is what that means for your launch strategy.',
    read: '4 min',
    accent: 'from-blue-500 to-indigo-500',
  },
  {
    tag: 'Workflow',
    title: 'From Figma to Store-Ready: A Designer\u2019s Export Checklist',
    excerpt: 'A repeatable checklist for turning design files into pixel-perfect store assets — correct PPI, safe zones, color profiles, and filename conventions.',
    read: '8 min',
    accent: 'from-rose-500 to-violet-500',
  },
  {
    tag: 'Inspiration',
    title: '10 App Screenshot Layouts That Work for Every Category',
    excerpt: 'From finance to fitness to games — a gallery of proven screenshot compositions you can copy today, with notes on why each one performs.',
    read: '6 min',
    accent: 'from-amber-500 to-orange-500',
  },
];

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
          {POSTS.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="group flex flex-col rounded-3xl bg-white border border-black/5 overflow-hidden hover:shadow-[0_20px_60px_-20px_rgba(124,58,237,0.25)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`h-40 bg-gradient-to-br ${p.accent} relative`}>
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 text-[11px] font-semibold text-[#0B0B12]">{p.tag}</span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-display font-semibold text-lg text-[#0B0B12] leading-snug group-hover:text-violet-600 transition-colors">{p.title}</h3>
                <p className="mt-3 text-sm text-[#0B0B12]/60 leading-relaxed flex-1">{p.excerpt}</p>
                <div className="mt-5 flex items-center justify-between text-xs text-[#0B0B12]/45">
                  <span className="inline-flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {p.read} read</span>
                  <span className="inline-flex items-center gap-1 font-medium text-violet-600 opacity-0 group-hover:opacity-100 transition-opacity">Read <ArrowRight className="w-3.5 h-3.5" /></span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}