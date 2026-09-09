import React from 'react';
import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import StatsStrip from '@/components/landing/StatsStrip';
import Features from '@/components/landing/Features';
import TemplateShowcase from '@/components/landing/TemplateShowcase';
import FaqSection from '@/components/landing/FaqSection';
import Pricing from '@/components/landing/Pricing';
import BlogSection from '@/components/landing/BlogSection';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <div className="font-body">
      <Navbar />
      <Hero />
      <StatsStrip />
      <Features />
      <TemplateShowcase />
      <FaqSection />
      <Pricing />
      <BlogSection />
      <Footer />
    </div>
  );
}