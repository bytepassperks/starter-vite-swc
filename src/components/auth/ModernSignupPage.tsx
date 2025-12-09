import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { Shield, Mail, Lock, User, Eye, EyeOff, Loader2, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export function ModernSignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const passwordRequirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Contains a number', met: /\d/.test(password) },
    { label: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: 'Passwords do not match',
        description: 'Please make sure your passwords match.',
        variant: 'destructive',
      });
      return;
    }

    if (!passwordRequirements.every((req) => req.met)) {
      toast({
        title: 'Password requirements not met',
        description: 'Please ensure your password meets all requirements.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    const { error } = await register(email, password, fullName);

    if (error) {
      toast({
        title: 'Registration failed',
        description: error.message || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    setIsSuccess(true);
    toast({
      title: 'Account created!',
      description: 'Please check your email to verify your account.',
    });
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#0a0e27] flex items-center justify-center p-8 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-96 h-96 bg-green-500/20 rounded-full blur-3xl top-1/4 left-1/4 animate-float" />
          <div className="absolute w-80 h-80 bg-blue-500/20 rounded-full blur-3xl bottom-1/4 right-1/4 animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="glass-card rounded-3xl p-12 text-center max-w-md animate-scale-in gradient-border">
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Check your email</h2>
          <p className="text-gray-400 mb-8">
            We've sent a verification link to <strong className="text-white">{email}</strong>. 
            Please click the link to verify your account.
          </p>
          <Button
            onClick={() => navigate('/login')}
            className="w-full gradient-primary btn-glow h-12 text-white border-0"
          >
            Go to Login
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0e27] flex relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -top-48 -right-48 animate-float" />
        <div className="absolute w-80 h-80 bg-blue-500/20 rounded-full blur-3xl bottom-1/3 -left-40 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute w-72 h-72 bg-pink-500/10 rounded-full blur-3xl top-1/4 right-1/4 animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md animate-slide-in-left">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center glow-blue">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-2xl gradient-text">CertTracker</span>
          </div>

          <div className="glass-card rounded-3xl p-8 gradient-border">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Create your account</h2>
              <p className="text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="gradient-text hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-gray-300 flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 input-glow h-12"
                  placeholder="Dr. John Smith"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  Email address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 input-glow h-12"
                  placeholder="you@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-gray-400" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 input-glow h-12 pr-12"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <div className="mt-3 space-y-2">
                  {passwordRequirements.map((req) => (
                    <div
                      key={req.label}
                      className={`flex items-center gap-2 text-xs transition-colors ${
                        req.met ? 'text-green-400' : 'text-gray-500'
                      }`}
                    >
                      <CheckCircle className={`w-4 h-4 ${req.met ? 'opacity-100' : 'opacity-30'}`} />
                      {req.label}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-300 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-gray-400" />
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 input-glow h-12"
                  placeholder="••••••••"
                />
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-xs text-red-400 mt-1">Passwords do not match</p>
                )}
              </div>

              <div className="flex items-start gap-3">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="w-4 h-4 mt-1 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500/30"
                />
                <label htmlFor="terms" className="text-sm text-gray-400">
                  I agree to the{' '}
                  <a href="#" className="gradient-text hover:underline">Terms of Service</a>{' '}
                  and{' '}
                  <a href="#" className="gradient-text hover:underline">Privacy Policy</a>
                </label>
              </div>

              <Button
                type="submit"
                className="w-full gradient-primary btn-glow ripple h-12 text-white border-0"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account
                    <Sparkles className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Right Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12">
        <div className="max-w-lg animate-slide-in-right">
          <Link to="/" className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center glow-blue">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <span className="font-bold text-3xl gradient-text">CertTracker</span>
          </Link>
          
          <h1 className="text-4xl font-bold text-white mb-4">
            Start tracking your{' '}
            <span className="gradient-text">credentials today</span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-8">
            Join thousands of professionals who trust CertTracker to manage their licenses and certifications.
          </p>

          <div className="glass-card rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-white">Free forever plan</p>
                <p className="text-sm text-gray-400">Track up to 10 credentials</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-white">Smart reminders</p>
                <p className="text-sm text-gray-400">Never miss a renewal deadline</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
