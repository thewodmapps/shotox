import React from 'react';
import AppNavbar from '@/components/AppNavbar';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import TemplateShowcase from '@/components/landing/TemplateShowcase';
import BlogSection from '@/components/landing/BlogSection';
import FaqSection from '@/components/landing/FaqSection';
import Pricing from '@/components/landing/Pricing';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <div className="font-body">
      <AppNavbar />
      <Hero />
      <Features />
      <TemplateShowcase />
      <BlogSection />
      <Pricing />
      <FaqSection />
      <Footer />
    </div>
  );
}