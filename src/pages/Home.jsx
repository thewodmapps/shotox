import React from 'react';
import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import TemplateShowcase from '@/components/landing/TemplateShowcase';
import Pricing from '@/components/landing/Pricing';
import Footer from '@/components/landing/Footer';
import HeroMarqueeStrip from '@/components/landing/HeroMarqueeStrip';

export default function Home() {
  return (
    <div className="font-body">
      <Navbar />
      <Hero />
      <HeroMarqueeStrip />
      <Features />
      <TemplateShowcase />
      <Pricing />
      <Footer />
    </div>
  );
}