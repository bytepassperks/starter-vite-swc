import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Shield,
  Bell,
  Lock,
  LayoutDashboard,
  CheckCircle,
  ArrowRight,
  Star,
  Users,
  FileCheck,
  Stethoscope,
  Scale,
  HardHat,
  Plane,
  Sparkles,
  Zap,
  Clock,
  FileText,
  Linkedin,
} from 'lucide-react';

const benefits = [
  {
    icon: Bell,
    title: 'Smart Reminders',
    description: '90/60/30 day notifications via email and SMS so you never miss a renewal deadline.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Lock,
    title: 'Secure Vault',
    description: 'Bank-level encrypted document storage keeps your credentials safe and accessible.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: LayoutDashboard,
    title: 'One Dashboard',
    description: 'Track all your licenses, certifications, and permits in a single organized view.',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Clock,
    title: 'Never Miss Deadlines',
    description: 'Automated tracking ensures you stay compliant and avoid costly lapses.',
    gradient: 'from-pink-500 to-purple-500',
  },
];

const professions = [
  { icon: Stethoscope, label: 'Healthcare' },
  { icon: Scale, label: 'Legal' },
  { icon: HardHat, label: 'Engineering' },
  { icon: Plane, label: 'Aviation' },
];

const features = [
  'Unlimited credential tracking',
  'Document upload & storage',
  'Email & SMS reminders',
  'Calendar view',
  'Renewal guidance',
  'Export reports',
];

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Perfect for getting started',
    features: ['10 credentials tracked', 'Email reminders (30 days)', 'Basic calendar view', 'Document upload (5 files)'],
    cta: 'Get Started Free',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$9.99',
    period: '/month',
    description: 'For professionals who need more',
    features: ['Unlimited credentials', 'Email + SMS reminders', 'Advanced analytics', 'Export as PDF', 'Priority support'],
    cta: 'Start Pro Trial',
    popular: true,
  },
  {
    name: 'Team',
    price: '$299',
    period: '/month',
    description: 'For organizations & teams',
    features: ['All Pro features', 'Unlimited team members', 'Compliance reports', 'SSO integration', 'Dedicated support'],
    cta: 'Contact Sales',
    popular: false,
  },
];

function ParticleBackground() {
  return (
    <div className="particles">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
}

function AnimatedGradientOrb({ className }: { className?: string }) {
  return (
    <div className={`absolute rounded-full blur-3xl opacity-30 animate-float ${className}`} />
  );
}

export function ModernLandingPage() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0e27] text-white overflow-hidden">
      <ParticleBackground />
      
      {/* Animated Gradient Orbs */}
      <AnimatedGradientOrb className="w-96 h-96 bg-blue-500 -top-48 -left-48" />
      <AnimatedGradientOrb className="w-80 h-80 bg-purple-500 top-1/4 -right-40" />
      <AnimatedGradientOrb className="w-72 h-72 bg-cyan-500 bottom-1/4 -left-36" />
      <AnimatedGradientOrb className="w-64 h-64 bg-pink-500 -bottom-32 right-1/4" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-lg glow-blue transition-all duration-300 group-hover:scale-110">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl gradient-text">CertTracker</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/pricing" className="text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium">
                Pricing
              </Link>
              <Link to="/login">
                <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/5">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="gradient-primary btn-glow ripple text-white border-0">
                  Sign Up Free
                  <Sparkles className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-8 ${isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
              <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-sm font-medium">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="gradient-text">Trusted by 5,000+ professionals</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                Never Miss a{' '}
                <span className="gradient-text">License Renewal</span>{' '}
                Again
              </h1>
              
              <p className="text-xl text-gray-400 max-w-xl">
                Automated expiry tracking for doctors, lawyers, engineers, and pilots.
                Stay compliant, avoid fines, and focus on what matters most.
              </p>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link to="/signup">
                  <Button size="lg" className="gradient-primary btn-glow ripple text-lg px-8 py-6 h-auto text-white border-0">
                    Start Free Trial
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <p className="text-sm text-gray-500">No credit card required</p>
              </div>

              {/* Profession Icons */}
              <div className="flex items-center gap-6 flex-wrap pt-4">
                {professions.map((prof) => (
                  <div key={prof.label} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer group">
                    <prof.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">{prof.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Visual */}
            <div className={`relative ${isVisible ? 'animate-slide-in-right stagger-2' : 'opacity-0'}`}>
              <div className="relative">
                {/* Floating Cards */}
                <div className="glass-card rounded-2xl p-6 absolute -top-4 -left-4 animate-float z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Medical License</p>
                      <p className="text-sm text-green-400">Valid • 180 days left</p>
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6 absolute -bottom-4 -right-4 animate-float" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                      <Bell className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Reminder Sent</p>
                      <p className="text-sm text-amber-400">DEA expires in 30 days</p>
                    </div>
                  </div>
                </div>

                {/* Main Dashboard Preview */}
                <div className="glass-card rounded-3xl p-8 relative z-0">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Your Credentials</h3>
                      <span className="text-sm text-gray-400">7 total</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="glass rounded-xl p-4 text-center">
                        <p className="text-3xl font-bold gradient-text">5</p>
                        <p className="text-xs text-gray-400">Valid</p>
                      </div>
                      <div className="glass rounded-xl p-4 text-center">
                        <p className="text-3xl font-bold text-amber-400">2</p>
                        <p className="text-xs text-gray-400">Expiring Soon</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {['Medical License', 'DEA Registration', 'CPR Certification'].map((item, i) => (
                        <div key={item} className="flex items-center justify-between p-3 glass rounded-lg">
                          <span className="text-sm">{item}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${i === 1 ? 'bg-amber-500/20 text-amber-400' : 'bg-green-500/20 text-green-400'}`}>
                            {i === 1 ? '30 days' : 'Valid'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Everything You Need to{' '}
              <span className="gradient-text">Stay Compliant</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Stop juggling spreadsheets and calendar reminders. CertTracker handles it all.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className={`glass-card rounded-2xl p-6 group cursor-pointer animate-slide-in-up stagger-${index + 1}`}
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:gradient-text transition-all duration-300">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl sm:text-5xl font-bold">
                Powerful Features for{' '}
                <span className="gradient-text">Busy Professionals</span>
              </h2>
              <p className="text-xl text-gray-400">
                Whether you're a solo practitioner or managing a team, CertTracker
                scales with your needs.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={feature} className={`flex items-center gap-3 animate-fade-in stagger-${index + 1}`}>
                    <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
              <Link to="/signup">
                <Button size="lg" className="gradient-primary btn-glow ripple text-white border-0">
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
            
            <div className="relative">
              <div className="glass-card rounded-3xl p-8">
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80"
                  alt="Dashboard preview"
                  className="rounded-xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card rounded-3xl p-12 gradient-border">
            <div className="grid sm:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="w-8 h-8 text-blue-400" />
                </div>
                <p className="text-5xl font-bold gradient-text">5,000+</p>
                <p className="text-gray-400">Active Professionals</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <FileCheck className="w-8 h-8 text-purple-400" />
                </div>
                <p className="text-5xl font-bold gradient-text">25,000+</p>
                <p className="text-gray-400">Credentials Tracked</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Bell className="w-8 h-8 text-cyan-400" />
                </div>
                <p className="text-5xl font-bold gradient-text">99.9%</p>
                <p className="text-gray-400">On-Time Renewals</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative" id="pricing">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Simple, <span className="gradient-text">Transparent</span> Pricing
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Choose the plan that fits your needs. All plans include a 14-day free trial.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative glass-card rounded-2xl p-8 ${
                  plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''
                } animate-slide-in-up stagger-${index + 1}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="gradient-primary px-4 py-1 rounded-full text-sm font-medium text-white">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-sm text-gray-400">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-400">{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/signup">
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? 'gradient-primary btn-glow'
                        : 'bg-white/5 hover:bg-white/10'
                    } text-white border-0`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card rounded-3xl p-12 gradient-border">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Ready to Take Control of Your{' '}
              <span className="gradient-text">Credentials</span>?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join thousands of professionals who trust CertTracker to keep their
              licenses and certifications up to date.
            </p>
            <Link to="/signup">
              <Button size="lg" className="gradient-primary btn-glow ripple text-lg px-8 py-6 h-auto text-white border-0">
                Start Your Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
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
