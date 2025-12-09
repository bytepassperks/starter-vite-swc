import { ReactNode } from 'react';
import { ModernSidebar } from './ModernSidebar';
import { ScrollToTop } from '@/components/ui/scroll-to-top';

interface ModernDashboardLayoutProps {
  children: ReactNode;
}

export function ModernDashboardLayout({ children }: ModernDashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0a0e27] overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -top-48 -left-48 animate-float" />
        <div className="absolute w-80 h-80 bg-purple-500/20 rounded-full blur-3xl top-1/3 -right-40 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl bottom-1/4 left-1/4 animate-float" style={{ animationDelay: '4s' }} />
      </div>
      
      <ModernSidebar />
      <main className="lg:pl-64 pt-16 lg:pt-0 relative z-10 overflow-x-hidden">
        <div className="p-4 md:p-6 lg:p-8 max-w-full">{children}</div>
      </main>
      <ScrollToTop />
    </div>
  );
}
