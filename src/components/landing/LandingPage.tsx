import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
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
  Linkedin,
} from 'lucide-react';

const benefits = [
  {
    icon: Bell,
    title: 'Smart Reminders',
    description: '90/60/30 day notifications via email and SMS so you never miss a renewal deadline.',
  },
  {
    icon: Lock,
    title: 'Secure Vault',
    description: 'Bank-level encrypted document storage keeps your credentials safe and accessible.',
  },
  {
    icon: LayoutDashboard,
    title: 'One Dashboard',
    description: 'Track all your licenses, certifications, and permits in a single organized view.',
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

export function LandingPage() {
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
              <Link to="/pricing">
                <Button variant="ghost">Pricing</Button>
              </Link>
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#0066FF] hover:bg-[#0052CC]">Sign Up Free</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-[#0066FF] text-sm font-medium mb-6">
              <Star className="w-4 h-4 fill-current" />
              Trusted by 5,000+ professionals
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Never Miss a Professional{' '}
              <span className="text-[#0066FF]">Certification</span> Again
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Automated expiry tracking for doctors, lawyers, engineers, and pilots.
              Stay compliant, avoid fines, and focus on what matters most.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="bg-[#0066FF] hover:bg-[#0052CC] text-lg px-8 py-6 h-auto"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <p className="text-sm text-gray-500">No credit card required</p>
            </div>

            {/* Profession Icons */}
            <div className="flex items-center justify-center gap-8 flex-wrap">
              {professions.map((prof) => (
                <div key={prof.label} className="flex items-center gap-2 text-gray-500">
                  <prof.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{prof.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Stay Compliant
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stop juggling spreadsheets and calendar reminders. CertTracker handles it all.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                  <benefit.icon className="w-7 h-7 text-[#0066FF]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features List Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Powerful Features for Busy Professionals
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Whether you're a solo practitioner or managing a team, CertTracker
                scales with your needs.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              <Link to="/signup">
                <Button
                  size="lg"
                  className="mt-8 bg-[#0066FF] hover:bg-[#0052CC]"
                >
                  Get Started Free
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80"
                  alt="Dashboard preview"
                  className="rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0066FF]">
        <div className="max-w-7xl mx-auto text-center">
          <div className="grid sm:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center justify-center gap-1 mb-2">
                <Users className="w-8 h-8 text-white/80" />
              </div>
              <p className="text-4xl font-bold text-white mb-2">5,000+</p>
              <p className="text-blue-100">Active Professionals</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 mb-2">
                <FileCheck className="w-8 h-8 text-white/80" />
              </div>
              <p className="text-4xl font-bold text-white mb-2">25,000+</p>
              <p className="text-blue-100">Credentials Tracked</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 mb-2">
                <Bell className="w-8 h-8 text-white/80" />
              </div>
              <p className="text-4xl font-bold text-white mb-2">99.9%</p>
              <p className="text-blue-100">On-Time Renewals</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Ready to Take Control of Your Credentials?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of professionals who trust CertTracker to keep their
            licenses and certifications up to date.
          </p>
          <Link to="/signup">
            <Button
              size="lg"
              className="bg-[#0066FF] hover:bg-[#0052CC] text-lg px-8 py-6 h-auto"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
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
