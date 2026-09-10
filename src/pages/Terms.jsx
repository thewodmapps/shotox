import React from 'react';
import AppNavbar from '@/components/AppNavbar';
import Footer from '@/components/landing/Footer';

export default function Terms() {
  return (
    <div className="font-body bg-white">
      <AppNavbar />
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-20">
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0B0B12]">Terms of Service</h1>
        <p className="mt-3 text-sm text-[#0B0B12]/45">Last updated September 10, 2026</p>

        <div className="article-body max-w-none mt-8">
          <p>By using Shotox you agree to these Terms. If you do not agree, do not use the service.</p>

          <h2>Your account</h2>
          <p>You are responsible for keeping your account credentials secure and for all activity under your account. You must be at least 13 years old to use the service.</p>

          <h2>Your content</h2>
          <p>You retain ownership of the screenshots and designs you upload. You grant us a limited license to host, process, and display your content solely to operate the service for you.</p>

          <h2>Acceptable use</h2>
          <p>You agree not to upload unlawful, infringing, or malicious content, and not to attempt to disrupt or reverse-engineer the service.</p>

          <h2>Subscriptions and refunds</h2>
          <p>Pro plans are billed monthly or yearly through Stripe. The Lifetime plan is a one-time purchase. All purchases are final — we do not offer cancellations or refunds. Subscriptions remain active until the end of their paid billing period, and Lifetime access never expires.</p>

          <h2>Service availability</h2>
          <p>We strive for high availability but do not guarantee uninterrupted service. We may modify or discontinue features with reasonable notice.</p>

          <h2>Limitation of liability</h2>
          <p>The service is provided "as is". To the maximum extent permitted by law, we are not liable for indirect or consequential damages arising from your use of the service.</p>

          <h2>Changes to these terms</h2>
          <p>We may update these Terms from time to time. Material changes will be communicated through the app or by email.</p>

          <h2>Contact</h2>
          <p>For questions about these Terms, contact us at <a href="mailto:thewodmapps@gmail.com">thewodmapps@gmail.com</a>.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}