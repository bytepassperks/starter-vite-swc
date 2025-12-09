import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import { useAuth } from '@/context/AuthContext';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import {
  Shield,
  Check,
  Zap,
  Users,
  Building2,
  ArrowRight,
  Sparkles,
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
      'Email reminders (30 days)',
      'Basic calendar view',
      'Document upload (5 files)',
    ],
    cta: 'Get Started Free',
    ctaLink: '/signup',
    popular: false,
    icon: Zap,
    gradient: 'from-gray-500 to-gray-600',
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
      'Email + SMS reminders',
      'Advanced analytics',
      'Export as PDF',
      'Priority support',
    ],
    cta: 'Start Pro Trial',
    ctaLink: '/signup?plan=pro',
    popular: true,
    icon: Users,
    gradient: 'from-blue-500 to-purple-500',
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
      'Compliance reports',
      'SSO integration',
      'Dedicated support',
    ],
    cta: 'Contact Sales',
    ctaLink: '/contact',
    popular: false,
    icon: Building2,
    gradient: 'from-purple-500 to-pink-500',
  },
];

const faqs = [
  {
    question: 'Can I upgrade or downgrade at any time?',
    answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate your billing accordingly.',
  },
  {
    question: 'What happens when my trial ends?',
    answer: 'After your 14-day trial, you\'ll be automatically moved to the Free plan unless you choose to upgrade. No credit card is required to start.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. We use bank-level encryption (AES-256) for all data at rest and TLS 1.3 for data in transit. We\'re GDPR and CCPA compliant.',
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes, you can cancel your subscription at any time. Your account will remain active until the end of your billing period.',
  },
];

export function ModernPricingPage() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#0a0e27] text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -top-48 -left-48 animate-float" />
        <div className="absolute w-80 h-80 bg-purple-500/20 rounded-full blur-3xl top-1/3 -right-40 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute w-72 h-72 bg-pink-500/10 rounded-full blur-3xl bottom-1/4 left-1/4 animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center glow-blue transition-all duration-300 group-hover:scale-110">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl gradient-text">CertTracker</span>
            </Link>
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button className="gradient-primary btn-glow text-white border-0">Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/5">Login</Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="gradient-primary btn-glow text-white border-0">
                      Sign Up Free
                      <Sparkles className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Pricing Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Simple, <span className="gradient-text">Transparent</span> Pricing
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Choose the plan that fits your needs. All plans include a 14-day free trial.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative glass-card rounded-2xl p-8 animate-slide-in-up ${
                  plan.popular ? 'ring-2 ring-blue-500 scale-105 z-10' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="gradient-primary px-4 py-1.5 rounded-full text-sm font-medium text-white glow-blue">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center`}>
                    <plan.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <p className="text-sm text-gray-400">{plan.description}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                    <span className="text-gray-400">{plan.period}</span>
                  </div>
                  {plan.yearlyPrice && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-sm text-gray-400">{plan.yearlyPrice}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                        {plan.yearlySavings}
                      </span>
                    </div>
                  )}
                  {plan.trial && (
                    <p className="mt-2 text-sm text-blue-400 font-medium">{plan.trial}</p>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm">
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-green-400" />
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to={plan.ctaLink}>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? 'gradient-primary btn-glow'
                        : 'bg-white/5 hover:bg-white/10 border border-white/10'
                    } text-white`}
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
          <div className="mt-24 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="glass-card rounded-xl p-6 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                  <p className="text-gray-400 text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
