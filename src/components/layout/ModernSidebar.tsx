import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Shield,
  Sparkles,
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: FileText, label: 'My Credentials', path: '/credentials' },
  { icon: Calendar, label: 'Calendar', path: '/calendar' },
  { icon: Bell, label: 'Reminders', path: '/reminders' },
  { icon: Settings, label: 'Settings', path: '/settings' },
  { icon: HelpCircle, label: 'Help', path: '/help' },
];

export function ModernSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, logout } = useAuth();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 glass border-b border-white/5 z-50 flex items-center justify-between px-4">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center glow-blue">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl gradient-text">CertTracker</span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white hover:bg-white/10"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full w-64 glass border-r border-white/5 z-50 transition-transform duration-300 ease-in-out',
          'lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-white/5">
            <Link to="/dashboard" className="flex items-center gap-2 group">
              <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center glow-blue transition-all duration-300 group-hover:scale-110">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl gradient-text">CertTracker</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group',
                    isActive
                      ? 'gradient-primary text-white glow-blue'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <item.icon className={cn(
                    'w-5 h-5 transition-transform duration-300',
                    !isActive && 'group-hover:scale-110'
                  )} />
                  {item.label}
                  {isActive && (
                    <Sparkles className="w-4 h-4 ml-auto animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Upgrade Banner */}
          {profile?.plan === 'free' && (
            <div className="mx-3 mb-4">
              <div className="glass-card rounded-xl p-4 gradient-border">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg gradient-secondary flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Upgrade to Pro</p>
                    <p className="text-xs text-gray-400">Unlock all features</p>
                  </div>
                </div>
                <Button className="w-full gradient-primary btn-glow text-white text-sm border-0">
                  Upgrade Now
                </Button>
              </div>
            </div>
          )}

          {/* User Profile */}
          <div className="p-3 border-t border-white/5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/5 transition-all duration-300">
                  <Avatar className="h-10 w-10 ring-2 ring-blue-500/30">
                    <AvatarImage src={profile?.profile_pic_url || undefined} alt={profile?.full_name || undefined} />
                    <AvatarFallback className="gradient-primary text-white text-sm">
                      {profile?.full_name ? getInitials(profile.full_name) : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-white truncate">
                      {profile?.full_name || 'User'}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {user?.email || profile?.email || 'user@example.com'}
                    </p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 glass border-white/10">
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="cursor-pointer text-gray-300 hover:text-white">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-red-400 hover:text-red-300 focus:text-red-300"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>
    </>
  );
}
