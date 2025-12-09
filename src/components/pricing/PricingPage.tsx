import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import {
  Shield,
  Check,
  Zap,
  Users,
  Building2,
  ArrowRight,
  Linkedin,
} from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Perfect for getting started',
    features: [
      '10 credentials tracked',
      'Email reminders (30 days before)',
      'Basic calendar view',
      'Unlimited edits',
      'Document upload (5 files)',
    ],
    cta: 'Get Started Free',
    ctaLink: '/signup',
    popular: false,
    icon: Zap,
  },
  {
    name: 'Pro',
    price: '$9.99',
    period: '/month',
    yearlyPrice: '$99/year',
    yearlySavings: 'Save 20%',
    description: 'For professionals who need more',
    features: [
      'Unlimited credentials',
      'Email reminders (90/60/30/7 days)',
      'SMS reminders available',
      'Advanced calendar with color coding',
      'Renewal guidance by state',
      'Export credentials as PDF',
      'Document upload (50 files)',
      'Priority email support',
    ],
    cta: 'Start Pro Free Trial',
    ctaLink: '/signup?plan=pro',
    popular: true,
    icon: Users,
    trial: '14-day free trial',
  },
  {
    name: 'Team',
    price: '$299',
    period: '/month',
    description: 'For organizations & teams',
    features: [
      'All Pro features',
      'Unlimited team members',
      'Shared credential library',
      'Admin dashboard & reporting',
      'Compliance audit reports',
      'Custom branding (white-label)',
      'SSO / SAML integration',
      'Dedicated support',
      'SLA agreement',
    ],
    cta: 'Contact Sales',
    ctaLink: '/contact',
    popular: false,
    icon: Building2,
  },
];

export function PricingPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-[#0066FF] rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900">CertTracker</span>
            </Link>
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button className="bg-[#0066FF] hover:bg-[#0052CC]">Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost">Login</Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="bg-[#0066FF] hover:bg-[#0052CC]">Sign Up Free</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Pricing Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that fits your needs. All plans include a 14-day free trial.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-white rounded-2xl border-2 p-8 ${
                  plan.popular
                    ? 'border-[#0066FF] shadow-lg scale-105'
                    : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0066FF] text-white px-4 py-1">
                    Most Popular
                  </Badge>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      plan.popular ? 'bg-[#0066FF]' : 'bg-gray-100'
                    }`}
                  >
                    <plan.icon
                      className={`w-6 h-6 ${plan.popular ? 'text-white' : 'text-gray-600'}`}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                    <p className="text-sm text-gray-500">{plan.description}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-500">{plan.period}</span>
                  </div>
                  {plan.yearlyPrice && (
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-sm text-gray-500">{plan.yearlyPrice}</span>
                      <Badge className="bg-green-100 text-green-700 text-xs">
                        {plan.yearlySavings}
                      </Badge>
                    </div>
                  )}
                  {plan.trial && (
                    <p className="mt-2 text-sm text-[#0066FF] font-medium">{plan.trial}</p>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to={plan.ctaLink}>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? 'bg-[#0066FF] hover:bg-[#0052CC]'
                        : 'bg-gray-900 hover:bg-gray-800'
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>

                {plan.name === 'Free' && (
                  <p className="mt-3 text-center text-xs text-gray-500">
                    No credit card required
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mt-20 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Can I upgrade or downgrade at any time?
                </h3>
                <p className="text-gray-600 text-sm">
                  Yes! You can upgrade or downgrade your plan at any time. Changes take effect
                  immediately, and we'll prorate your billing accordingly.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  What happens when my trial ends?
                </h3>
                <p className="text-gray-600 text-sm">
                  After your 14-day trial, you'll be automatically moved to the Free plan unless
                  you choose to upgrade. No credit card is required to start.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Is my data secure?
                </h3>
                <p className="text-gray-600 text-sm">
                  Absolutely. We use bank-level encryption (AES-256) for all data at rest and
                  TLS 1.3 for data in transit. We're GDPR and CCPA compliant.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Can I cancel anytime?
                </h3>
                <p className="text-gray-600 text-sm">
                  Yes, you can cancel your subscription at any time. Your account will remain
                  active until the end of your billing period.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#0066FF] rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-white">CertTracker</span>
            </div>
            <div className="flex items-center gap-6 text-gray-400 text-sm">
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
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
    </div>
  );
}
