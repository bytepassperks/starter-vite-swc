import { ModernDashboardLayout } from '@/components/layout/ModernDashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/ui/badge';
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Camera,
  Mail,
  Phone,
  Briefcase,
  Lock,
  Smartphone,
  LogOut,
  Trash2,
  Check,
} from 'lucide-react';

export function SettingsPage() {
  const { user, profile } = useAuth();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <ModernDashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Settings</h1>
          <p className="text-gray-400 mt-1">Manage your account and preferences</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-white/5 border border-white/10 p-1 rounded-lg">
            <TabsTrigger value="profile" className="gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="billing" className="gap-2">
              <CreditCard className="w-4 h-4" />
              Billing
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Profile Information</h3>

              {/* Avatar */}
              <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={profile?.profile_pic_url} alt={profile?.full_name} />
                    <AvatarFallback className="bg-[#0066FF] text-white text-xl">
                      {profile?.full_name ? getInitials(profile.full_name) : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#0066FF] rounded-full flex items-center justify-center text-white hover:bg-[#0052CC] transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <p className="font-medium text-white">{profile?.full_name}</p>
                  <p className="text-sm text-gray-400">{user?.email}</p>
                  <Badge className="mt-2 bg-[#0066FF] text-white capitalize">
                    {profile?.plan || 'free'} Plan
                  </Badge>
                </div>
              </div>

              {/* Form */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="fullName" className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    defaultValue={profile?.full_name}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={user?.email}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    defaultValue={profile?.phone}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="profession" className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-gray-400" />
                    Profession
                  </Label>
                  <Input
                    id="profession"
                    defaultValue={profile?.profession}
                    className="mt-1.5"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button className="bg-[#0066FF] hover:bg-[#0052CC]">Save Changes</Button>
              </div>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-6">
                Notification Preferences
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-white mb-4">Email Notifications</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-300">Expiry Reminders</p>
                        <p className="text-sm text-gray-400">
                          Get notified before credentials expire
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-300">Weekly Digest</p>
                        <p className="text-sm text-gray-400">
                          Summary of upcoming expirations
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-300">Product Updates</p>
                        <p className="text-sm text-gray-400">
                          New features and improvements
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6">
                  <h4 className="font-medium text-white mb-4">Reminder Timing</h4>
                  <div>
                    <Label>Default reminder schedule</Label>
                    <Select defaultValue="90-60-30">
                      <SelectTrigger className="mt-1.5 w-full sm:w-[300px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="90-60-30">90, 60, 30 days before</SelectItem>
                        <SelectItem value="60-30-7">60, 30, 7 days before</SelectItem>
                        <SelectItem value="30-14-7">30, 14, 7 days before</SelectItem>
                        <SelectItem value="custom">Custom schedule</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button className="bg-[#0066FF] hover:bg-[#0052CC]">Save Preferences</Button>
              </div>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="space-y-6">
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Password</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="currentPassword" className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-gray-400" />
                      Current Password
                    </Label>
                    <Input id="currentPassword" type="password" className="mt-1.5" />
                  </div>
                  <div></div>
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" className="mt-1.5" />
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <Button className="bg-[#0066FF] hover:bg-[#0052CC]">Update Password</Button>
                </div>
              </div>

              <div className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-6">
                  Two-Factor Authentication
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Authenticator App</p>
                      <p className="text-sm text-gray-400">
                        Use an authenticator app for additional security
                      </p>
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Active Sessions</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#0066FF] rounded-lg flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Current Session</p>
                        <p className="text-sm text-gray-400">Chrome on macOS • San Francisco, CA</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700">Active</Badge>
                  </div>
                </div>
                <Button variant="outline" className="mt-4">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out All Other Sessions
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing">
            <div className="space-y-6">
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Current Plan</h3>
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div>
                    <p className="font-semibold text-white capitalize">{profile?.plan || 'free'} Plan</p>
                    <p className="text-sm text-gray-400">
                      {(profile?.plan || 'free') === 'free'
                        ? 'Up to 10 credentials'
                        : profile?.plan === 'pro'
                        ? 'Unlimited credentials + SMS reminders'
                        : 'Team features + compliance reports'}
                    </p>
                  </div>
                  {(profile?.plan || 'free') === 'free' && (
                    <Button className="bg-[#0066FF] hover:bg-[#0052CC]">Upgrade to Pro</Button>
                  )}
                </div>
              </div>

              <div className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Available Plans</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    {
                      name: 'Free',
                      price: '$0',
                      features: ['10 credentials', 'Email reminders', 'Basic dashboard'],
                    },
                    {
                      name: 'Pro',
                      price: '$9.99',
                      features: [
                        'Unlimited credentials',
                        'SMS reminders',
                        'Advanced analytics',
                        'CSV export',
                      ],
                      popular: true,
                    },
                    {
                      name: 'Team',
                      price: '$299',
                      features: [
                        'Up to 50 members',
                        'Compliance reports',
                        'API access',
                        'Priority support',
                      ],
                    },
                  ].map((plan) => (
                    <div
                      key={plan.name}
                      className={`p-4 rounded-lg border-2 ${
                        plan.popular
                          ? 'border-[#0066FF] bg-blue-50/50'
                          : 'border-white/10'
                      }`}
                    >
                      {plan.popular && (
                        <Badge className="bg-[#0066FF] text-white mb-2">Most Popular</Badge>
                      )}
                      <p className="font-semibold text-white">{plan.name}</p>
                      <p className="text-2xl font-bold text-white mt-1">
                        {plan.price}
                        <span className="text-sm font-normal text-gray-400">/mo</span>
                      </p>
                      <ul className="mt-4 space-y-2">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm text-gray-400">
                            <Check className="w-4 h-4 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-red-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-red-600 mb-2">Danger Zone</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ModernDashboardLayout>
  );
}
