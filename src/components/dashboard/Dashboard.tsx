import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from './StatsCard';
import { ExpiryAlert } from './ExpiryAlert';
import { useAuth } from '@/context/AuthContext';
import { getCredentials, getDashboardStats } from '@/lib/supabase';
import type { Credential } from '@/types/supabase';
import { FileText, AlertTriangle, XCircle, CheckCircle, Plus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function Dashboard() {
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
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-[#0066FF]" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Welcome back, {firstName}
            </h1>
            <p className="text-gray-500 mt-1">
              Here's an overview of your credentials
            </p>
          </div>
          <Link to="/credentials">
            <Button className="bg-[#0066FF] hover:bg-[#0052CC]">
              <Plus className="w-4 h-4 mr-2" />
              Add Credential
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Total Credentials"
            value={stats.total}
            icon={FileText}
            variant="default"
          />
          <StatsCard
            title="Expiring Soon"
            value={stats.expiringSoon}
            icon={AlertTriangle}
            variant={stats.expiringSoon > 0 ? 'warning' : 'default'}
          />
          <StatsCard
            title="Expired"
            value={stats.expired}
            icon={XCircle}
            variant={stats.expired > 0 ? 'danger' : 'default'}
          />
          <StatsCard
            title="Up to Date"
            value={stats.upToDate}
            icon={CheckCircle}
            variant="success"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Expiry Alerts */}
          <ExpiryAlert credentials={credentials} />

          {/* Quick Actions */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link to="/credentials" className="block">
                <div className="flex items-center gap-4 p-4 rounded-lg border border-white/10 hover:border-[#0066FF] hover:bg-white/5 transition-colors cursor-pointer">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Plus className="w-5 h-5 text-[#0066FF]" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Add New Credential</p>
                    <p className="text-sm text-gray-500">Track a new license or certification</p>
                  </div>
                </div>
              </Link>
              <Link to="/calendar" className="block">
                <div className="flex items-center gap-4 p-4 rounded-lg border border-white/10 hover:border-[#0066FF] hover:bg-white/5 transition-colors cursor-pointer">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-white">View Calendar</p>
                    <p className="text-sm text-gray-500">See all expiry dates at a glance</p>
                  </div>
                </div>
              </Link>
              <Link to="/reminders" className="block">
                <div className="flex items-center gap-4 p-4 rounded-lg border border-white/10 hover:border-[#0066FF] hover:bg-white/5 transition-colors cursor-pointer">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Manage Reminders</p>
                    <p className="text-sm text-gray-500">Configure notification preferences</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Credentials */}
        <div className="mt-6 glass-card rounded-xl overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Recent Credentials</h3>
              <p className="text-sm text-gray-500 mt-1">Your most recently added credentials</p>
            </div>
            <Link to="/credentials">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>
          {credentials.length === 0 ? (
            <div className="p-8 text-center">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No credentials yet</h3>
              <p className="text-gray-500 mb-4">Get started by adding your first credential</p>
              <Link to="/credentials">
                <Button className="bg-[#0066FF] hover:bg-[#0052CC]">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Credential
                </Button>
              </Link>
            </div>
          ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Credential
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expiry Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {credentials.slice(0, 5).map((cred) => {
                  const daysUntil = Math.ceil(
                    (new Date(cred.expiry_date).getTime() - new Date().getTime()) /
                      (1000 * 60 * 60 * 24)
                  );
                  const statusColor =
                    daysUntil < 0
                      ? 'bg-red-100 text-red-700'
                      : daysUntil <= 15
                      ? 'bg-red-100 text-red-700'
                      : daysUntil <= 30
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-green-100 text-green-700';
                  const statusText =
                    daysUntil < 0
                      ? 'Expired'
                      : daysUntil <= 30
                      ? 'Expiring Soon'
                      : 'Valid';

                  return (
                    <tr key={cred.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-4 h-4 text-gray-400" />
                          </div>
                          <div>
                            <p className="font-medium text-white">{cred.name}</p>
                            <p className="text-sm text-gray-500">{cred.organization}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-400 capitalize">{cred.type}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-400">
                          {new Date(cred.expiry_date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor}`}
                        >
                          {statusText}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
