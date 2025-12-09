import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase';
import { Shield, Lock, Eye, EyeOff, Loader2, CheckCircle, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const passwordRequirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Contains a number', met: /\d/.test(password) },
    { label: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
  ];

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: 'Invalid or expired link',
          description: 'Please request a new password reset link.',
          variant: 'destructive',
        });
        navigate('/forgot-password');
      }
    };
    checkSession();
  }, [navigate, toast]);

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

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    setIsSuccess(true);
    toast({
      title: 'Password updated',
      description: 'Your password has been successfully reset.',
    });

    setTimeout(() => {
      navigate('/login');
    }, 3000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#0a0e27] flex items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-96 h-96 bg-green-500/20 rounded-full blur-3xl top-1/4 left-1/4 animate-float" />
          <div className="absolute w-80 h-80 bg-blue-500/20 rounded-full blur-3xl bottom-1/4 right-1/4 animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="glass-card rounded-3xl p-12 text-center max-w-md animate-scale-in gradient-border">
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Password Reset!</h2>
          <p className="text-gray-400 mb-8">
            Your password has been successfully updated. Redirecting to login...
          </p>
          <Link to="/login">
            <Button className="w-full gradient-primary btn-glow h-12 text-white border-0">
              Go to Login
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0e27] flex items-center justify-center p-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -top-48 -left-48 animate-float" />
        <div className="absolute w-80 h-80 bg-purple-500/20 rounded-full blur-3xl bottom-1/3 -right-40 animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="w-full max-w-md animate-scale-in">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-8">
            <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center glow-blue">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-2xl gradient-text">CertTracker</span>
          </Link>
        </div>

        <div className="glass-card rounded-3xl p-8 gradient-border">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Set new password</h2>
            <p className="text-gray-400">Enter your new password below.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300 flex items-center gap-2">
                <Lock className="w-4 h-4 text-gray-400" />
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
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
                Confirm New Password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
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

            <Button
              type="submit"
              className="w-full gradient-primary btn-glow ripple h-12 text-white border-0"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Updating...
                </>
              ) : (
                'Reset Password'
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
