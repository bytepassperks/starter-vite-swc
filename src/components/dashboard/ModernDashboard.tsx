import { useState, useEffect } from 'react';
import { ModernDashboardLayout } from '@/components/layout/ModernDashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { getCredentials, getDashboardStats } from '@/lib/supabase';
import type { Credential } from '@/types/supabase';
import { 
  FileText, 
  AlertTriangle, 
  XCircle, 
  CheckCircle, 
  Plus, 
  Loader2,
  Calendar,
  Bell,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  gradient: string;
  delay: number;
}

function StatsCard({ title, value, icon: Icon, gradient, delay }: StatsCardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const steps = 30;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div 
      className="glass-card rounded-2xl p-6 animate-slide-in-up group cursor-pointer"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <TrendingUp className="w-5 h-5 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <p className="text-sm text-gray-400 mb-1">{title}</p>
      <p className="text-3xl font-bold gradient-text">{displayValue}</p>
    </div>
  );
}

function CredentialCard({ credential, index }: { credential: Credential; index: number }) {
  const daysUntil = Math.ceil(
    (new Date(credential.expiry_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );
  
  const getStatusStyles = () => {
    if (daysUntil < 0) return { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', label: 'Expired' };
    if (daysUntil <= 15) return { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', label: `${daysUntil} days` };
    if (daysUntil <= 30) return { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', label: `${daysUntil} days` };
    return { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', label: 'Valid' };
  };

  const status = getStatusStyles();

  return (
    <div 
      className="glass-card rounded-xl p-4 animate-slide-in-up group"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="font-semibold text-white group-hover:gradient-text transition-all">{credential.name}</p>
            <p className="text-sm text-gray-400">{credential.organization || 'No organization'}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">
            {new Date(credential.expiry_date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${status.bg} ${status.border} ${status.text} border`}>
            {status.label}
          </span>
        </div>
      </div>
    </div>
  );
}

function QuickActionCard({ icon: Icon, title, description, to, gradient, delay }: {
  icon: React.ElementType;
  title: string;
  description: string;
  to: string;
  gradient: string;
  delay: number;
}) {
  return (
    <Link to={to}>
      <div 
        className="glass-card rounded-xl p-5 group cursor-pointer animate-slide-in-up"
        style={{ animationDelay: `${delay}ms` }}
      >
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-white group-hover:gradient-text transition-all">{title}</p>
            <p className="text-sm text-gray-400">{description}</p>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </Link>
  );
}

export function ModernDashboard() {
  const { user, profile } = useAuth();
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [stats, setStats] = useState({ total: 0, expiringSoon: 0, expired: 0, upToDate: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      setIsLoading(true);
      const [credentialsResult, statsResult] = await Promise.all([
        getCredentials(user.id),
        getDashboardStats(user.id),
      ]);
      
      if (credentialsResult.data) {
        setCredentials(credentialsResult.data);
      }
      if (statsResult.data) {
        setStats(statsResult.data);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [user]);

  const firstName = profile?.full_name?.split(' ')[0] || 'User';

  if (isLoading) {
    return (
      <ModernDashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
            <p className="text-gray-400">Loading your dashboard...</p>
          </div>
        </div>
      </ModernDashboardLayout>
    );
  }

  return (
    <ModernDashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8 overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              Welcome back, <span className="gradient-text">{firstName}</span>
            </h1>
            <p className="text-gray-400 mt-2">
              Here's an overview of your credentials
            </p>
          </div>
          <Link to="/credentials">
            <Button className="gradient-primary btn-glow ripple text-white border-0">
              <Plus className="w-4 h-4 mr-2" />
              Add Credential
              <Sparkles className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Credentials"
            value={stats.total}
            icon={FileText}
            gradient="from-blue-500 to-cyan-500"
            delay={100}
          />
          <StatsCard
            title="Expiring Soon"
            value={stats.expiringSoon}
            icon={AlertTriangle}
            gradient="from-amber-500 to-orange-500"
            delay={200}
          />
          <StatsCard
            title="Expired"
            value={stats.expired}
            icon={XCircle}
            gradient="from-red-500 to-pink-500"
            delay={300}
          />
          <StatsCard
            title="Up to Date"
            value={stats.upToDate}
            icon={CheckCircle}
            gradient="from-green-500 to-emerald-500"
            delay={400}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Credentials */}
          <div className="glass-card rounded-2xl p-6 animate-slide-in-up" style={{ animationDelay: '500ms' }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-white">Recent Credentials</h3>
                <p className="text-sm text-gray-400">Your latest tracked credentials</p>
              </div>
              <Link to="/credentials">
                <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-white/5">
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            
            {credentials.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">No credentials yet</h3>
                <p className="text-gray-400 mb-4">Get started by adding your first credential</p>
                <Link to="/credentials">
                  <Button className="gradient-primary btn-glow text-white border-0">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Credential
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {credentials.slice(0, 4).map((cred, index) => (
                  <CredentialCard key={cred.id} credential={cred} index={index} />
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6 animate-slide-in-up" style={{ animationDelay: '600ms' }}>
              <h3 className="text-xl font-semibold text-white mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <QuickActionCard
                  icon={Plus}
                  title="Add New Credential"
                  description="Track a new license or certification"
                  to="/credentials"
                  gradient="from-blue-500 to-purple-500"
                  delay={700}
                />
                <QuickActionCard
                  icon={Calendar}
                  title="View Calendar"
                  description="See all expiry dates at a glance"
                  to="/calendar"
                  gradient="from-cyan-500 to-blue-500"
                  delay={800}
                />
                <QuickActionCard
                  icon={Bell}
                  title="Manage Reminders"
                  description="Configure notification preferences"
                  to="/reminders"
                  gradient="from-amber-500 to-orange-500"
                  delay={900}
                />
              </div>
            </div>

            {/* Upcoming Expiries Alert */}
            {stats.expiringSoon > 0 && (
              <div className="glass-card rounded-2xl p-6 gradient-border animate-slide-in-up" style={{ animationDelay: '1000ms' }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center animate-pulse">
                    <Clock className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Attention Required</h4>
                    <p className="text-sm text-gray-400 mb-3">
                      You have {stats.expiringSoon} credential{stats.expiringSoon > 1 ? 's' : ''} expiring soon.
                      Don't forget to renew them!
                    </p>
                    <Link to="/credentials">
                      <Button size="sm" className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30">
                        View Expiring
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ModernDashboardLayout>
  );
}
