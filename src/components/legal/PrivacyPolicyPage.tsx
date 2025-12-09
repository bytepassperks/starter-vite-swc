import { Link } from 'react-router-dom';
import { Shield, ArrowLeft, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollToTop } from '@/components/ui/scroll-to-top';

export function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1a]">
      {/* Header */}
      <header className="py-6 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg gradient-text">CertTracker</span>
          </Link>
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-gray-400 mb-8">Last updated: January 1, 2025</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <section className="glass-card p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-white mb-4">1. Introduction</h2>
              <p className="text-gray-300 leading-relaxed">
                CertTracker ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our credential management platform. Founded by Michael Chen, CertTracker was built with privacy-first principles to help licensed professionals manage their credentials securely.
              </p>
            </section>

            <section className="glass-card p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-white mb-4">2. Information We Collect</h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <div>
                  <h3 className="text-white font-medium mb-2">Personal Information</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Name and email address</li>
                    <li>Phone number (optional, for SMS reminders)</li>
                    <li>Professional credentials and license information</li>
                    <li>Documents you upload (certificates, licenses)</li>
                    <li>Payment information (processed securely via Stripe)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-medium mb-2">Usage Information</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Log data and device information</li>
                    <li>Usage patterns and feature interactions</li>
                    <li>IP address and browser type</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="glass-card p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
              <ul className="text-gray-300 leading-relaxed list-disc list-inside space-y-2">
                <li>To provide and maintain our credential tracking service</li>
                <li>To send you expiry reminders and notifications</li>
                <li>To process your subscription payments</li>
                <li>To improve our services and user experience</li>
                <li>To respond to your inquiries and support requests</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section className="glass-card p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-white mb-4">4. Data Security</h2>
              <p className="text-gray-300 leading-relaxed">
                We implement industry-standard security measures to protect your data:
              </p>
              <ul className="text-gray-300 leading-relaxed list-disc list-inside space-y-2 mt-4">
                <li>All data is encrypted at rest and in transit using AES-256 encryption</li>
                <li>Secure HTTPS connections for all communications</li>
                <li>Regular security audits and penetration testing</li>
                <li>Two-factor authentication available for all accounts</li>
                <li>SOC 2 Type II compliance (in progress)</li>
              </ul>
            </section>

            <section className="glass-card p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-white mb-4">5. Data Sharing</h2>
              <p className="text-gray-300 leading-relaxed">
                We do not sell your personal information. We may share data with:
              </p>
              <ul className="text-gray-300 leading-relaxed list-disc list-inside space-y-2 mt-4">
                <li>Service providers (hosting, email, payment processing)</li>
                <li>Legal authorities when required by law</li>
                <li>Business partners with your explicit consent</li>
              </ul>
            </section>

            <section className="glass-card p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-white mb-4">6. Your Rights</h2>
              <p className="text-gray-300 leading-relaxed">
                You have the right to:
              </p>
              <ul className="text-gray-300 leading-relaxed list-disc list-inside space-y-2 mt-4">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Delete your account and data</li>
                <li>Export your data in a portable format</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            <section className="glass-card p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-white mb-4">7. Cookies</h2>
              <p className="text-gray-300 leading-relaxed">
                We use essential cookies to maintain your session and preferences. Analytics cookies help us understand how you use our service. You can manage cookie preferences in your browser settings.
              </p>
            </section>

            <section className="glass-card p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-white mb-4">8. Contact Us</h2>
              <p className="text-gray-300 leading-relaxed">
                If you have questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-4 text-gray-300">
                <p>Email: privacy@certtracker.io</p>
                <p>Address: 548 Market St, Suite 95879, San Francisco, CA 94104</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg gradient-text">CertTracker</span>
            </div>
            <div className="flex items-center gap-6 text-gray-400 text-sm">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
            <div className="flex items-center gap-4">
              <a 
                href="https://au.linkedin.com/company/certtracker" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <p className="text-gray-500 text-sm">
                © 2025 CertTracker. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
      <ScrollToTop />
    </div>
  );
}
