import { Link } from 'react-router-dom';
import { Shield, ArrowLeft, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollToTop } from '@/components/ui/scroll-to-top';

export function TermsOfServicePage() {
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
          <h1 className="text-4xl font-bold text-white mb-2">Terms of Service</h1>
          <p className="text-gray-400 mb-8">Last updated: January 1, 2025</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <section className="glass-card p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                By accessing or using CertTracker's credential management platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service. CertTracker is operated by CertTracker Inc., a Delaware corporation founded by Michael Chen.
              </p>
            </section>

            <section className="glass-card p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-white mb-4">2. Description of Service</h2>
              <p className="text-gray-300 leading-relaxed">
                CertTracker provides a cloud-based platform for licensed professionals to:
              </p>
              <ul className="text-gray-300 leading-relaxed list-disc list-inside space-y-2 mt-4">
                <li>Track and manage professional credentials, licenses, and certifications</li>
                <li>Receive automated expiry reminders via email and SMS</li>
                <li>Store and organize credential-related documents securely</li>
                <li>Access renewal guidance and instructions</li>
                <li>Generate compliance reports (Pro and Team plans)</li>
              </ul>
            </section>

            <section className="glass-card p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-white mb-4">3. User Accounts</h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <p>To use CertTracker, you must:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Be at least 18 years old</li>
                  <li>Provide accurate and complete registration information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Notify us immediately of any unauthorized access</li>
                  <li>Be responsible for all activities under your account</li>
                </ul>
              </div>
            </section>

            <section className="glass-card p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-white mb-4">4. Subscription Plans & Billing</h2>
              <div className="text-gray-300 leading-relaxed space-y-4">
                <div>
                  <h3 className="text-white font-medium mb-2">Free Plan</h3>
                  <p>Up to 10 credentials, basic email reminders, 5 document uploads.</p>
                </div>
                <div>
                  <h3 className="text-white font-medium mb-2">Pro Plan ($9.99/month or $99/year)</h3>
                  <p>Unlimited credentials, SMS reminders, 50 document uploads, advanced analytics.</p>
                </div>
                <div>
                  <h3 className="text-white font-medium mb-2">Team Plan ($299/month or $2,990/year)</h3>
                  <p>Up to 50 team members, compliance reports, API access, priority support.</p>
                </div>
                <p className="mt-4">
                  Subscriptions auto-renew unless cancelled. You may cancel at any time through your account settings. Refunds are provided on a case-by-case basis within 30 days of purchase.
                </p>
              </div>
            </section>

            <section className="glass-card p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-white mb-4">5. Acceptable Use</h2>
              <p className="text-gray-300 leading-relaxed">
                You agree not to:
              </p>
              <ul className="text-gray-300 leading-relaxed list-disc list-inside space-y-2 mt-4">
                <li>Upload false, misleading, or fraudulent credential information</li>
                <li>Share your account with unauthorized users</li>
                <li>Attempt to access other users' data</li>
                <li>Use the service for any illegal purpose</li>
                <li>Reverse engineer or attempt to extract source code</li>
                <li>Overload or interfere with our infrastructure</li>
              </ul>
            </section>

            <section className="glass-card p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-white mb-4">6. Intellectual Property</h2>
              <p className="text-gray-300 leading-relaxed">
                CertTracker and its original content, features, and functionality are owned by CertTracker Inc. and are protected by international copyright, trademark, and other intellectual property laws. You retain ownership of any documents or data you upload to the platform.
              </p>
            </section>

            <section className="glass-card p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-white mb-4">7. Disclaimer of Warranties</h2>
              <p className="text-gray-300 leading-relaxed">
                CertTracker is provided "as is" without warranties of any kind. While we strive for accuracy, we do not guarantee that reminders will prevent missed renewals. Users are ultimately responsible for maintaining their credentials. We are not liable for any fines, penalties, or consequences resulting from expired credentials.
              </p>
            </section>

            <section className="glass-card p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-white mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-300 leading-relaxed">
                To the maximum extent permitted by law, CertTracker Inc. shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities, arising from your use of the service.
              </p>
            </section>

            <section className="glass-card p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-white mb-4">9. Termination</h2>
              <p className="text-gray-300 leading-relaxed">
                We may terminate or suspend your account at any time for violations of these terms. Upon termination, your right to use the service ceases immediately. You may request export of your data within 30 days of termination.
              </p>
            </section>

            <section className="glass-card p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-white mb-4">10. Governing Law</h2>
              <p className="text-gray-300 leading-relaxed">
                These Terms shall be governed by the laws of the State of Delaware, United States, without regard to conflict of law provisions. Any disputes shall be resolved in the courts of Delaware.
              </p>
            </section>

            <section className="glass-card p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-white mb-4">11. Changes to Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                We reserve the right to modify these terms at any time. We will notify users of material changes via email or in-app notification. Continued use after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section className="glass-card p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-white mb-4">12. Contact Information</h2>
              <p className="text-gray-300 leading-relaxed">
                For questions about these Terms of Service, please contact us at:
              </p>
              <div className="mt-4 text-gray-300">
                <p>Email: legal@certtracker.io</p>
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
