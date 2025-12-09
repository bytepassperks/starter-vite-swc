import { useState, useEffect } from 'react';
import { ModernDashboardLayout } from '@/components/layout/ModernDashboardLayout';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { FileText, Loader2 } from 'lucide-react';
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

export function CalendarPage() {
  const { user } = useAuth();
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

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

  // Get credentials expiring on selected date
  const getCredentialsForDate = (date: Date) => {
    return credentials.filter((cred) => {
      const expiryDate = new Date(cred.expiry_date);
      return (
        expiryDate.getDate() === date.getDate() &&
        expiryDate.getMonth() === date.getMonth() &&
        expiryDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // Get all dates with expiring credentials
  const expiryDates = credentials.map((cred) => new Date(cred.expiry_date));

  const selectedCredentials = selectedDate ? getCredentialsForDate(selectedDate) : [];

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
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Calendar</h1>
          <p className="text-gray-400 mt-1">View all your credential expiry dates at a glance</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2 glass-card rounded-xl p-6">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              month={currentMonth}
              onMonthChange={setCurrentMonth}
              className="w-full"
              classNames={{
                months: 'w-full',
                month: 'w-full space-y-4',
                caption: 'flex justify-center pt-1 relative items-center mb-4',
                caption_label: 'text-lg font-semibold text-white',
                nav: 'space-x-1 flex items-center',
                nav_button: cn(
                  'h-9 w-9 bg-transparent p-0 opacity-50 hover:opacity-100 inline-flex items-center justify-center rounded-md border border-white/10 hover:bg-white/5 text-white'
                ),
                nav_button_previous: 'absolute left-1',
                nav_button_next: 'absolute right-1',
                table: 'w-full border-collapse',
                head_row: 'flex w-full',
                head_cell: 'text-gray-400 rounded-md w-full font-medium text-sm py-2',
                row: 'flex w-full mt-2',
                cell: cn(
                  'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 w-full h-12'
                ),
                day: cn(
                  'h-12 w-full p-0 font-normal rounded-lg hover:bg-white/10 inline-flex items-center justify-center text-gray-300'
                ),
                day_selected:
                  'bg-blue-500 text-white hover:bg-blue-600 hover:text-white focus:bg-blue-500 focus:text-white',
                day_today: 'bg-white/10 text-white',
                day_outside: 'text-gray-600 opacity-50',
                day_disabled: 'text-gray-600',
                day_hidden: 'invisible',
              }}
              modifiers={{
                hasExpiry: expiryDates,
              }}
              modifiersClassNames={{
                hasExpiry: 'relative after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-blue-500 after:rounded-full',
              }}
            />
          </div>

          {/* Selected Date Details */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              {selectedDate
                ? selectedDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : 'Select a date'}
            </h3>

            {selectedCredentials.length > 0 ? (
              <div className="space-y-3">
                {selectedCredentials.map((cred) => {
                  const daysUntil = getDaysUntilExpiry(cred.expiry_date);
                  const status = getExpiryStatus(daysUntil);

                  return (
                    <div
                      key={cred.id}
                      className="p-4 rounded-lg border border-white/10 hover:border-blue-500/50 transition-colors bg-white/5"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FileText className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-white">{cred.name}</p>
                          <p className="text-sm text-gray-400 truncate">{cred.organization}</p>
                          <Badge className={cn('mt-2',
                            status === 'success' && 'bg-green-500/20 text-green-400 border border-green-500/30',
                            status === 'warning' && 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
                            status === 'danger' && 'bg-red-500/20 text-red-400 border border-red-500/30'
                          )}>
                            {daysUntil < 0
                              ? 'Expired'
                              : daysUntil === 0
                              ? 'Expires Today'
                              : `${daysUntil} days left`}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-gray-500" />
                </div>
                <p className="text-gray-400">No credentials expiring on this date</p>
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Expirations List */}
        <div className="mt-6 glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Upcoming Expirations</h3>
          {credentials.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {credentials
                .sort((a, b) => new Date(a.expiry_date).getTime() - new Date(b.expiry_date).getTime())
                .slice(0, 4)
                .map((cred) => {
                  const daysUntil = getDaysUntilExpiry(cred.expiry_date);
                  const status = getExpiryStatus(daysUntil);

                  return (
                    <div
                      key={cred.id}
                      className="p-4 rounded-lg border border-white/10 hover:border-blue-500/50 transition-colors cursor-pointer bg-white/5"
                    >
                      <p className="font-medium text-white truncate">{cred.name}</p>
                      <p className="text-sm text-gray-400 mt-1">
                        {new Date(cred.expiry_date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                      <Badge className={cn('mt-2',
                        status === 'success' && 'bg-green-500/20 text-green-400 border border-green-500/30',
                        status === 'warning' && 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
                        status === 'danger' && 'bg-red-500/20 text-red-400 border border-red-500/30'
                      )}>
                        {daysUntil < 0
                          ? `${Math.abs(daysUntil)} days overdue`
                          : daysUntil === 0
                          ? 'Today'
                          : `${daysUntil} days`}
                      </Badge>
                    </div>
                  );
                })}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-8">No credentials added yet</p>
          )}
        </div>
      </div>
    </ModernDashboardLayout>
  );
}
