import { useState, useEffect } from 'react';
import { ModernDashboardLayout } from '@/components/layout/ModernDashboardLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { Bell, Mail, MessageSquare, FileText, Settings, Check, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getCredentials } from '@/lib/supabase';
import type { Credential } from '@/types/supabase';

const getDaysUntilExpiry = (expiryDate: string): number => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  return Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
};

const getExpiryStatus = (days: number): 'success' | 'warning' | 'danger' => {
  if (days < 0) return 'danger';
  if (days <= 15) return 'danger';
  if (days <= 30) return 'warning';
  return 'success';
};

export function RemindersPage() {
  const { user } = useAuth();
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCredentials = async () => {
      if (!user) return;
      setIsLoading(true);
      const { data } = await getCredentials(user.id);
      if (data) {
        setCredentials(data);
      }
      setIsLoading(false);
    };
    fetchCredentials();
  }, [user]);

  const upcomingReminders = credentials
    .map((cred) => ({
      ...cred,
      daysUntil: getDaysUntilExpiry(cred.expiry_date),
    }))
    .filter((cred) => cred.daysUntil > 0 && cred.daysUntil <= 90)
    .sort((a, b) => a.daysUntil - b.daysUntil);

  if (isLoading) {
    return (
      <ModernDashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      </ModernDashboardLayout>
    );
  }

  return (
    <ModernDashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Reminders</h1>
            <p className="text-gray-400 mt-1">Manage your notification preferences</p>
          </div>
          <Button variant="outline" className="border-white/10 text-gray-300 hover:bg-white/5">
            <Settings className="w-4 h-4 mr-2" />
            Notification Settings
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Reminder Settings */}
          <div className="lg:col-span-1 space-y-6">
            {/* Email Notifications */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Email Reminders</h3>
                  <p className="text-sm text-gray-400">Get notified via email</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">90 days before</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">60 days before</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">30 days before</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">7 days before</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">1 day before</span>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>

            {/* SMS Notifications */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">SMS Reminders</h3>
                  <Badge className="bg-amber-500/20 text-amber-400 border border-amber-500/30 mt-1">Pro Feature</Badge>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">30 days before</span>
                  <Switch disabled />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">7 days before</span>
                  <Switch disabled />
                </div>
              </div>
              <Button className="w-full mt-4 gradient-primary btn-glow text-white border-0">
                Upgrade to Pro
              </Button>
            </div>

            {/* In-App Notifications */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Bell className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">In-App Notifications</h3>
                  <p className="text-sm text-gray-400">Dashboard alerts</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Show expiry alerts</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Weekly digest</span>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Reminders */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-xl overflow-hidden">
              <div className="p-6 border-b border-white/5">
                <h3 className="text-lg font-semibold text-white">Scheduled Reminders</h3>
                <p className="text-sm text-gray-400 mt-1">
                  Upcoming notifications for your credentials
                </p>
              </div>
              <div className="divide-y divide-white/5">
                {upcomingReminders.length > 0 ? (
                  upcomingReminders.map((cred) => {
                    const status = getExpiryStatus(cred.daysUntil);
                    const reminderDays = [90, 60, 30, 7, 1].filter((d) => d <= cred.daysUntil);

                    return (
                      <div key={cred.id} className="p-4 hover:bg-white/5 transition-colors">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FileText className="w-5 h-5 text-gray-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <p className="font-medium text-white">{cred.name}</p>
                                <p className="text-sm text-gray-400">{cred.organization}</p>
                              </div>
                              <Badge className={cn(
                                status === 'success' && 'bg-green-500/20 text-green-400 border border-green-500/30',
                                status === 'warning' && 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
                                status === 'danger' && 'bg-red-500/20 text-red-400 border border-red-500/30'
                              )}>
                                {cred.daysUntil} days left
                              </Badge>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {[90, 60, 30, 7, 1].map((days) => {
                                const isPast = days > cred.daysUntil;
                                const isNext =
                                  reminderDays.length > 0 && days === reminderDays[0];

                                return (
                                  <div
                                    key={days}
                                    className={cn(
                                      'flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
                                      isPast
                                        ? 'bg-green-500/20 text-green-400'
                                        : isNext
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-white/10 text-gray-400'
                                    )}
                                  >
                                    {isPast && <Check className="w-3 h-3" />}
                                    {days}d
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-green-400" />
                    </div>
                    <p className="text-white">No upcoming reminders</p>
                    <p className="text-sm text-gray-400 mt-1">
                      All your credentials are up to date!
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Reminder History */}
            <div className="mt-6 glass-card rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Notifications</h3>
              <div className="space-y-3">
                {[
                  {
                    credential: 'Dental License',
                    type: 'email',
                    date: '2 days ago',
                    message: '30-day reminder sent',
                  },
                  {
                    credential: 'DEA Registration',
                    type: 'email',
                    date: '1 week ago',
                    message: '60-day reminder sent',
                  },
                  {
                    credential: 'Malpractice Insurance',
                    type: 'email',
                    date: '2 weeks ago',
                    message: '90-day reminder sent',
                  },
                ].map((notification, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-lg bg-white/5"
                  >
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <Mail className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">
                        {notification.credential}
                      </p>
                      <p className="text-xs text-gray-400">{notification.message}</p>
                    </div>
                    <span className="text-xs text-gray-500">{notification.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModernDashboardLayout>
  );
}
