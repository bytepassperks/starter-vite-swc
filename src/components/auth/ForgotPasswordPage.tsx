import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase';
import { Shield, Mail, Loader2, CheckCircle, ArrowLeft } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

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
    setIsLoading(false);
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
          <h2 className="text-3xl font-bold text-white mb-4">Check your email</h2>
          <p className="text-gray-400 mb-8">
            We've sent a password reset link to <strong className="text-white">{email}</strong>. 
            Please check your inbox and follow the instructions.
          </p>
          <Link to="/login">
            <Button className="w-full gradient-primary btn-glow h-12 text-white border-0">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
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
            <h2 className="text-2xl font-bold text-white mb-2">Reset your password</h2>
            <p className="text-gray-400">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
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

            <Button
              type="submit"
              className="w-full gradient-primary btn-glow ripple h-12 text-white border-0"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Reset Link'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm gradient-text hover:underline inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
