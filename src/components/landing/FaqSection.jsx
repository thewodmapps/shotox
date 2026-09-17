import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FAQS = [
  { q: 'Is Shotox really free?', a: 'Yes — Shotox is completely free right now. Every device size, every template, AI copywriting, and watermark-free export are all unlocked at no cost. No credit card, no subscription, no hidden fees.' },
  { q: 'Which device sizes are supported?', a: 'Shotox supports every store-required size: iPhone 6.7", 6.5", 5.5", iPad 13", iPad 11", Android phone, Android tablet, and the 1024×500 Google Play feature graphic.' },
  { q: 'Can I export images at the exact store resolution?', a: 'Yes. Every export is pixel-perfect at the resolution the Apple App Store and Google Play require, so your listing never gets rejected for wrong dimensions. Export single slides or the full set as PNG or JPEG.' },
  { q: 'Does Shotox include AI features?', a: 'Yes. The built-in AI copywriter drafts high-converting headlines and subheadings tailored to your app category, so you never start from a blank page. Generate copy, tweak it, and drop it straight into your template — free.' },
  { q: 'Do I own the screenshots I create?', a: 'Absolutely. The designs you create are yours to use in your app listings, ads, and marketing — no attribution and no watermark.' },
  { q: 'Is there a watermark on the exports?', a: 'No. Shotox exports are clean and watermark-free for everyone.' },
  { q: 'Can I use the screenshots commercially?', a: 'Yes. You can use your screenshots in Apple App Store and Google Play listings, ads, websites, and press kits — for free.' },
  { q: 'How is Shotox free, and will it stay free?', a: 'Shotox is free while we grow. We plan to keep the core tools free and may add optional ads later to support development — but right now, everything is completely free.' },
  { q: 'Do my projects sync across devices?', a: 'Shotox is a web app that works in any modern browser. Your projects are saved to your account, so you can start on desktop and continue on a tablet or phone.' },
  { q: 'Do I need design skills?', a: 'No. Pick a template, upload your screenshot, customize the text, and export. If you can upload an image, you can ship beautiful store screenshots.' },
];

export default function FaqSection() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="bg-white py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display font-bold tracking-[-0.03em] text-[#111827] text-3xl sm:text-4xl text-center">Frequently asked questions</h2>
        <p className="mt-3 text-[#6b7280] text-center">Everything you need to know about creating app screenshots with Shotox.</p>
        <div className="mt-10 space-y-3">
          {FAQS.map((f, i) => (
            <div key={i} className="border border-[#e5e7eb] rounded-2xl overflow-hidden bg-white">
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full flex items-center justify-between gap-4 text-left px-5 py-4"
                aria-expanded={open === i}
              >
                <h3 className="font-semibold text-[#111827] text-base">{f.q}</h3>
                <span aria-hidden="true" className={`text-[#7C3AED] text-xl transition-transform ${open === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              {open === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="px-5 pb-5">
                  <p className="text-[#4b5563] leading-relaxed">{f.a}</p>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}