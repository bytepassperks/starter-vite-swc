import { cn } from '@/lib/utils';
import type { Credential } from '@/types/supabase';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, ExternalLink } from 'lucide-react';

interface ExpiryAlertProps {
  credentials: Credential[];
}

const statusStyles = {
  success: {
    badge: 'bg-green-100 text-green-700 hover:bg-green-100',
    text: 'text-green-600',
  },
  warning: {
    badge: 'bg-amber-100 text-amber-700 hover:bg-amber-100',
    text: 'text-amber-600',
  },
  danger: {
    badge: 'bg-red-100 text-red-700 hover:bg-red-100',
    text: 'text-red-600',
  },
};

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

export function ExpiryAlert({ credentials }: ExpiryAlertProps) {
  const upcomingExpiries = credentials
    .map((cred) => ({
      ...cred,
      daysUntil: getDaysUntilExpiry(cred.expiry_date),
    }))
    .filter((cred) => cred.daysUntil <= 7)
    .sort((a, b) => a.daysUntil - b.daysUntil);

  if (upcomingExpiries.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Next 7 Days</h3>
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-gray-600">No credentials expiring in the next 7 days</p>
          <p className="text-sm text-gray-500 mt-1">You're all caught up!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Next 7 Days</h3>
        <p className="text-sm text-gray-500 mt-1">
          {upcomingExpiries.length} credential{upcomingExpiries.length !== 1 ? 's' : ''} expiring soon
        </p>
      </div>
      <div className="divide-y divide-gray-100">
        {upcomingExpiries.map((cred) => {
          const status = getExpiryStatus(cred.daysUntil);
          const styles = statusStyles[status];

          return (
            <div
              key={cred.id}
              className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-gray-600" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 truncate">{cred.name}</p>
                  <p className="text-sm text-gray-500 truncate">{cred.organization}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {new Date(cred.expiry_date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                  <Badge className={cn('mt-1', styles.badge)}>
                    {cred.daysUntil < 0
                      ? `${Math.abs(cred.daysUntil)} days overdue`
                      : cred.daysUntil === 0
                      ? 'Expires today'
                      : `${cred.daysUntil} day${cred.daysUntil !== 1 ? 's' : ''} left`}
                  </Badge>
                </div>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
