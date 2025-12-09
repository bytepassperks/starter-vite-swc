import { useState, useEffect } from 'react';
import { ModernDashboardLayout } from '@/components/layout/ModernDashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/context/AuthContext';
import { getCredentials, createCredential, deleteCredential } from '@/lib/supabase';
import type { Credential } from '@/types/supabase';
import { cn } from '@/lib/utils';
import {
  Plus,
  Search,
  FileText,
  MoreVertical,
  Edit,
  Trash2,
  Download,
  Eye,
  Filter,
  Grid,
  List,
  Loader2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';

const statusStyles = {
  success: 'bg-green-100 text-green-700',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-red-100 text-red-700',
};

type CredentialType = 'license' | 'certificate' | 'insurance' | 'permit' | 'other';

const typeIcons: Record<CredentialType, string> = {
  license: '📜',
  certificate: '📋',
  insurance: '🛡️',
  permit: '📄',
  other: '📁',
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

export function CredentialsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [filterType, setFilterType] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    type: '' as CredentialType | '',
    organization: '',
    issue_date: '',
    expiry_date: '',
    credential_number: '',
    description: '',
  });

  useEffect(() => {
    fetchCredentials();
  }, [user]);

  const fetchCredentials = async () => {
    if (!user) return;
    setIsLoading(true);
    const { data, error } = await getCredentials(user.id);
    if (data) {
      setCredentials(data);
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !formData.name || !formData.type || !formData.expiry_date) {
      toast({
        title: 'Missing required fields',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    console.log('Creating credential for user:', user.id);
    const { data, error } = await createCredential({
      user_id: user.id,
      name: formData.name,
      type: formData.type as CredentialType,
      organization: formData.organization || undefined,
      issue_date: formData.issue_date || undefined,
      expiry_date: formData.expiry_date,
      credential_number: formData.credential_number || undefined,
      description: formData.description || undefined,
    });

    console.log('Create credential result:', { data, error });

    if (error) {
      console.error('Error creating credential:', error);
      toast({
        title: 'Error creating credential',
        description: error.message || 'Failed to create credential. Please try again.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Credential added',
        description: 'Your credential has been successfully added.',
      });
      setIsAddDialogOpen(false);
      setFormData({
        name: '',
        type: '',
        organization: '',
        issue_date: '',
        expiry_date: '',
        credential_number: '',
        description: '',
      });
      fetchCredentials();
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (credentialId: string) => {
    const { error } = await deleteCredential(credentialId);
    if (error) {
      toast({
        title: 'Error deleting credential',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Credential deleted',
        description: 'Your credential has been successfully deleted.',
      });
      fetchCredentials();
    }
  };

  const filteredCredentials = credentials.filter((cred) => {
    const matchesSearch =
      cred.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (cred.organization?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    const matchesType = filterType === 'all' || cred.type === filterType;
    return matchesSearch && matchesType;
  });

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
            <h1 className="text-2xl sm:text-3xl font-bold text-white">My Credentials</h1>
            <p className="text-gray-400 mt-1">
              Manage all your licenses, certifications, and permits
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary btn-glow text-white border-0">
                <Plus className="w-4 h-4 mr-2" />
                Add Credential
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="text-white">Add New Credential</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Enter the details of your credential below. All fields marked with * are required.
                </DialogDescription>
              </DialogHeader>
              <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="name" className="text-gray-300">Credential Name *</Label>
                    <Input 
                      id="name" 
                      placeholder="e.g., Medical License" 
                      className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="type" className="text-gray-300">Type *</Label>
                    <Select 
                      value={formData.type} 
                      onValueChange={(value) => setFormData({ ...formData, type: value as CredentialType })}
                    >
                      <SelectTrigger className="mt-1.5 bg-white/5 border-white/10 text-white">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0f1629] border-white/10">
                        <SelectItem value="license">License</SelectItem>
                        <SelectItem value="certificate">Certificate</SelectItem>
                        <SelectItem value="insurance">Insurance</SelectItem>
                        <SelectItem value="permit">Permit</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="organization" className="text-gray-300">Issuing Organization</Label>
                    <Input 
                      id="organization" 
                      placeholder="e.g., State Medical Board" 
                      className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="issue_date" className="text-gray-300">Issue Date</Label>
                    <Input 
                      id="issue_date" 
                      type="date" 
                      className="mt-1.5 bg-white/5 border-white/10 text-white"
                      value={formData.issue_date}
                      onChange={(e) => setFormData({ ...formData, issue_date: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="expiry_date" className="text-gray-300">Expiry Date *</Label>
                    <Input 
                      id="expiry_date" 
                      type="date" 
                      className="mt-1.5 bg-white/5 border-white/10 text-white"
                      value={formData.expiry_date}
                      onChange={(e) => setFormData({ ...formData, expiry_date: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="credential_number" className="text-gray-300">License/ID Number</Label>
                    <Input 
                      id="credential_number" 
                      placeholder="e.g., MD-2024-12345" 
                      className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                      value={formData.credential_number}
                      onChange={(e) => setFormData({ ...formData, credential_number: e.target.value })}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="description" className="text-gray-300">Description (Optional)</Label>
                    <Textarea
                      id="description"
                      placeholder="Add any notes about this credential..."
                      className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="document" className="text-gray-300">Upload Document</Label>
                    <div className="mt-1.5 border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-blue-500/50 transition-colors cursor-pointer">
                      <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-400">
                        Drag and drop or <span className="text-blue-400">browse</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG up to 10MB</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)} className="border-white/10 text-gray-300 hover:bg-white/5">
                    Cancel
                  </Button>
                  <Button type="submit" className="gradient-primary btn-glow text-white border-0" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Save Credential'
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search credentials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
            />
          </div>
          <div className="flex gap-2">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[150px] bg-white/5 border-white/10 text-white">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent className="bg-[#0f1629] border-white/10">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="license">License</SelectItem>
                <SelectItem value="certificate">Certificate</SelectItem>
                <SelectItem value="insurance">Insurance</SelectItem>
                <SelectItem value="permit">Permit</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              className="border-white/10 text-gray-300 hover:bg-white/5"
              onClick={() => {
                const { exportCredentialsToPDF } = require('@/lib/export-pdf');
                exportCredentialsToPDF(credentials, 'User');
              }}
              disabled={credentials.length === 0}
            >
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <div className="flex border border-white/10 rounded-lg overflow-hidden">
              <Button
                variant="ghost"
                size="icon"
                className={cn('rounded-none text-gray-400 hover:text-white hover:bg-white/5', viewMode === 'list' && 'bg-white/10 text-white')}
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn('rounded-none text-gray-400 hover:text-white hover:bg-white/5', viewMode === 'grid' && 'bg-white/10 text-white')}
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Credentials List/Grid */}
        {viewMode === 'list' ? (
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Credential
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      ID Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Expiry Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredCredentials.map((cred) => {
                    const daysUntil = getDaysUntilExpiry(cred.expiry_date);
                    const status = getExpiryStatus(daysUntil);
                    const statusText =
                      daysUntil < 0 ? 'Expired' : daysUntil <= 30 ? 'Expiring Soon' : 'Valid';

                    return (
                      <tr key={cred.id} className="hover:bg-white/5">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-lg">
                              {typeIcons[cred.type]}
                            </div>
                            <div>
                              <p className="font-medium text-white">{cred.name}</p>
                              <p className="text-sm text-gray-400">{cred.organization}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-300 capitalize">{cred.type}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-300 font-mono">
                            {cred.credential_number}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-300">
                            {new Date(cred.expiry_date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={cn(
                            status === 'success' && 'bg-green-500/20 text-green-400 border border-green-500/30',
                            status === 'warning' && 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
                            status === 'danger' && 'bg-red-500/20 text-red-400 border border-red-500/30'
                          )}>{statusText}</Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/5">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-[#0f1629] border-white/10">
                              <DropdownMenuItem className="text-gray-300 hover:text-white focus:text-white focus:bg-white/5">
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-gray-300 hover:text-white focus:text-white focus:bg-white/5">
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-gray-300 hover:text-white focus:text-white focus:bg-white/5">
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuSeparator className="bg-white/10" />
                              <DropdownMenuItem 
                                className="text-red-400 hover:text-red-300 focus:text-red-300 focus:bg-red-500/10"
                                onClick={() => handleDelete(cred.id)}
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCredentials.map((cred) => {
              const daysUntil = getDaysUntilExpiry(cred.expiry_date);
              const status = getExpiryStatus(daysUntil);
              const statusText =
                daysUntil < 0 ? 'Expired' : daysUntil <= 30 ? 'Expiring Soon' : 'Valid';

              return (
                <div
                  key={cred.id}
                  className="glass-card rounded-xl p-5"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-2xl">
                      {typeIcons[cred.type]}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/5">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-[#0f1629] border-white/10">
                        <DropdownMenuItem className="text-gray-300 hover:text-white focus:text-white focus:bg-white/5">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-300 hover:text-white focus:text-white focus:bg-white/5">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-300 hover:text-white focus:text-white focus:bg-white/5">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-white/10" />
                        <DropdownMenuItem 
                          className="text-red-400 hover:text-red-300 focus:text-red-300 focus:bg-red-500/10"
                          onClick={() => handleDelete(cred.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <h3 className="font-semibold text-white mb-1">{cred.name}</h3>
                  <p className="text-sm text-gray-400 mb-3">{cred.organization}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500">Expires</p>
                      <p className="text-sm font-medium text-gray-300">
                        {new Date(cred.expiry_date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <Badge className={cn(
                      status === 'success' && 'bg-green-500/20 text-green-400 border border-green-500/30',
                      status === 'warning' && 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
                      status === 'danger' && 'bg-red-500/20 text-red-400 border border-red-500/30'
                    )}>{statusText}</Badge>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {filteredCredentials.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No credentials found</h3>
            <p className="text-gray-400 mb-4">
              {searchQuery
                ? 'Try adjusting your search or filters'
                : 'Get started by adding your first credential'}
            </p>
            {!searchQuery && (
              <Button
                className="gradient-primary btn-glow text-white border-0"
                onClick={() => setIsAddDialogOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Credential
              </Button>
            )}
          </div>
        )}
      </div>
    </ModernDashboardLayout>
  );
}
