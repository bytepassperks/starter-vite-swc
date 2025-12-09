import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  variant?: 'default' | 'warning' | 'danger' | 'success';
}

const variantStyles = {
  default: {
    bg: 'glass-card',
    iconBg: 'bg-blue-500/20',
    iconColor: 'text-blue-400',
    valueColor: 'text-white',
  },
  warning: {
    bg: 'glass-card',
    iconBg: 'bg-amber-500/20',
    iconColor: 'text-amber-400',
    valueColor: 'text-amber-400',
  },
  danger: {
    bg: 'glass-card',
    iconBg: 'bg-red-500/20',
    iconColor: 'text-red-400',
    valueColor: 'text-red-400',
  },
  success: {
    bg: 'glass-card',
    iconBg: 'bg-green-500/20',
    iconColor: 'text-green-400',
    valueColor: 'text-green-400',
  },
};

export function StatsCard({ title, value, icon: Icon, variant = 'default' }: StatsCardProps) {
  const styles = variantStyles[variant];

  return (
    <div className={cn('rounded-xl p-6', styles.bg)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <p className={cn('text-3xl font-bold mt-1', styles.valueColor)}>{value}</p>
        </div>
        <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center', styles.iconBg)}>
          <Icon className={cn('w-6 h-6', styles.iconColor)} />
        </div>
      </div>
    </div>
  );
}
