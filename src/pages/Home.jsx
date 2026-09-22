import React from 'react';
import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import HowItWorks from '@/components/landing/HowItWorks';
import Features from '@/components/landing/Features';
import TemplateShowcase from '@/components/landing/TemplateShowcase';
import BlogSection from '@/components/landing/BlogSection';
import FaqSection from '@/components/landing/FaqSection';
import Contact from '@/components/landing/Contact';
import Footer from '@/components/landing/Footer';
import PullToRefresh from '@/components/PullToRefresh';

export default function Home() {
  return (
    <div className="font-body">
      <PullToRefresh onRefresh={() => window.location.reload()} tone="light" />
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <TemplateShowcase />
      <BlogSection />
      <FaqSection />
      <Contact />
      <Footer />
    </div>
  );
}