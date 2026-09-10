import React from 'react';
import { motion } from 'framer-motion';
import { Upload, LayoutTemplate, Palette, Download } from 'lucide-react';

const STEPS = [
  { icon: Upload, title: 'Upload your app screenshots', text: 'Add the screenshots from your app.' },
  { icon: LayoutTemplate, title: 'Choose a template', text: 'Pick a layout and device frame that fits your app.' },
  { icon: Palette, title: 'Customize', text: 'Edit headlines, colors, backgrounds, fonts, and positioning.' },
  { icon: Download, title: 'Export', text: 'Download store-ready PNG or JPEG screenshots.' },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-[#FAFAFC]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm font-medium text-violet-600 mb-3">How it works</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[#0B0B12]">From screenshot to store in four steps</h2>
          <p className="mt-4 text-[#0B0B12]/60 leading-relaxed">No design skills needed — just upload, pick, customize, and export.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }} className="relative">
              <div className="flex flex-col items-start">
                <div className="w-12 h-12 rounded-2xl grid place-items-center bg-gradient-to-br from-violet-500 to-pink-600 text-white shadow-lg shadow-violet-500/20 mb-4">
                  <s.icon className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold text-violet-400 mb-1">Step {i + 1}</div>
                <h3 className="font-display font-semibold text-lg text-[#0B0B12] mb-1.5">{s.title}</h3>
                <p className="text-sm text-[#0B0B12]/60 leading-relaxed">{s.text}</p>
              </div>
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-6 -right-3 text-violet-200">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12h14m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}