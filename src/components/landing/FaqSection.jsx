import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FAQS = [
  { q: 'Is Shotox free to use?', a: 'Yes. The free plan lets you create screenshots for one device with a limited template set — no credit card required. Upgrade any time for all devices, all templates, and watermark-free export.' },
  { q: 'Which device sizes are supported?', a: 'Shotox supports every store-required size: iPhone 6.7", 6.5", 5.5", iPad 12.9", iPad 11", Android phone, Android tablet, and the 1024×500 Google Play feature graphic.' },
  { q: 'Can I export images at the exact store resolution?', a: 'Yes. Every export is pixel-perfect at the resolution the App Store and Google Play require, so your listing never gets rejected for wrong dimensions.' },
  { q: 'Do I own the screenshots I create?', a: 'Absolutely. The designs you create are yours to use in your app listings, ads, and marketing — no attribution, no watermark on paid plans.' },
  { q: 'Is the Lifetime plan really one payment?', a: 'Yes. The Lifetime plan is a single one-time purchase — no recurring subscription, no cancellation needed. You keep access forever.' },
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
              >
                <span className="font-semibold text-[#111827]">{f.q}</span>
                <span className={`text-[#7C3AED] text-xl transition-transform ${open === i ? 'rotate-45' : ''}`}>+</span>
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