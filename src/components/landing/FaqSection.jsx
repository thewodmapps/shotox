import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    q: 'What is an app screenshot generator?',
    a: 'An app screenshot generator is a design tool that turns your raw mobile app screenshots into polished, store-ready marketing images. Shotox wraps your screenshots in 3D device frames, adds headlines and backgrounds, and exports them at the exact dimensions the App Store and Google Play require — no Photoshop or design skills needed.',
  },
  {
    q: 'Is Shotox free to use?',
    a: 'Yes. The free tier lets you design and export screenshots for any single device size. Pro plans (from $9/month) unlock all device sizes, the full template library, AI copywriting, and higher-resolution exports. A $149 Lifetime plan is also available.',
  },
  {
    q: 'What screenshot sizes do the App Store and Google Play require?',
    a: 'Apple requires 6.7", 6.5", 5.5" and iPad sizes depending on your app. Google Play requires phone, 7-inch tablet, 10-inch tablet and a feature graphic. Shotox ships all of these as presets, so every export is pixel-perfect and store-compliant.',
  },
  {
    q: 'Do I need design experience?',
    a: 'No. Pick a template, upload your screenshot, edit the headline, and export. Shotox handles layout, spacing, and device framing automatically so the result looks professionally designed every time.',
  },
  {
    q: 'Can I use my own fonts and brand colors?',
    a: 'Yes. Choose from 20+ curated display typefaces, set custom headline and subheading colors, and pick solid or gradient backgrounds — all per slide so each screenshot can match your brand.',
  },
  {
    q: 'What file formats can I export?',
    a: 'PNG and JPEG at the exact resolution each store expects. Export a single slide or the entire set in one click. Multi-slide projects download as a ZIP bundle.',
  },
  {
    q: 'Does Shotox work on iPhone, iPad and Android?',
    a: 'Shotox is a web app that works in any modern browser on desktop, tablet, and mobile. Designs are saved to your account so you can continue on any device.',
  },
  {
    q: 'Can I generate the marketing copy with AI?',
    a: 'Yes. The AI panel writes high-converting headlines and subheadings tailored to your app category, so you never start from a blank page.',
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-medium text-violet-600 mb-3">Frequently asked questions</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#0B0B12]">Everything you need to know</h2>
        </div>
        <div className="divide-y divide-black/5 rounded-3xl border border-black/5 bg-[#FAFAFC] overflow-hidden">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-display font-semibold text-[#0B0B12]">{f.q}</span>
                  <span className="shrink-0 w-8 h-8 rounded-full bg-violet-500/10 grid place-items-center text-violet-600">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-sm text-[#0B0B12]/60 leading-relaxed">{f.a}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}