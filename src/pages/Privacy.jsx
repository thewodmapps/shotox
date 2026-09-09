import React from 'react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export default function Privacy() {
  return (
    <div className="font-body bg-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-20">
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0B0B12]">Privacy Policy</h1>
        <p className="mt-3 text-sm text-[#0B0B12]/45">Last updated September 9, 2026</p>

        <div className="article-body max-w-none mt-8">
          <p>Shotox ("we", "us", "our") operates the app screenshot generator at shotox.in. This Privacy Policy explains what information we collect and how we use it.</p>

          <h2>Information we collect</h2>
          <p>When you create an account we collect your email address. When you create projects we store the designs, uploaded screenshots, and export settings you provide. We do not sell your data to third parties.</p>

          <h2>How we use your information</h2>
          <p>We use your information to provide the service, authenticate your account, process payments through our payment provider Stripe, and send transactional emails related to your account.</p>

          <h2>Payment processing</h2>
          <p>Payments are processed by Stripe. We do not store your full card number on our servers. Stripe handles all card data in accordance with PCI-DSS standards.</p>

          <h2>Data retention</h2>
          <p>Your designs remain stored while your account is active. You can delete a project at any time, which permanently removes it. You can request account deletion by contacting us.</p>

          <h2>Cookies</h2>
          <p>We use essential cookies to keep you signed in and remember your session. We do not use advertising cookies.</p>

          <h2>Third-party services</h2>
          <p>We rely on Stripe for payments and our hosting provider for infrastructure. These providers process data under their own privacy policies.</p>

          <h2>Your rights</h2>
          <p>You can access, export, or delete your personal data at any time. To exercise these rights, contact us using the details below.</p>

          <h2>Contact</h2>
          <p>For privacy questions, contact us at the support address provided in the app.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}