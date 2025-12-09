import { Credential, User, DashboardStats } from '@/types/credential';

export const mockUser: User = {
  id: '1',
  email: 'sarah.chen@example.com',
  full_name: 'Dr. Sarah Chen',
  phone: '+1 (555) 123-4567',
  profession: 'Dentist',
  profile_pic_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&q=80',
  plan: 'pro',
  created_at: '2024-01-15T00:00:00Z',
  updated_at: '2024-01-15T00:00:00Z',
};

const today = new Date();
const addDays = (days: number) => {
  const date = new Date(today);
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
};

export const mockCredentials: Credential[] = [
  {
    id: '1',
    user_id: '1',
    name: 'Dental License',
    type: 'license',
    issue_date: '2022-03-15',
    expiry_date: addDays(5),
    organization: 'California Dental Board',
    credential_number: 'DL-2022-45678',
    description: 'State dental license for California',
    status: 'expiring_soon',
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
  },
  {
    id: '2',
    user_id: '1',
    name: 'DEA Registration',
    type: 'license',
    issue_date: '2023-01-10',
    expiry_date: addDays(45),
    organization: 'Drug Enforcement Administration',
    credential_number: 'DEA-BC1234567',
    description: 'DEA registration for controlled substances',
    status: 'valid',
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
  },
  {
    id: '3',
    user_id: '1',
    name: 'Malpractice Insurance',
    type: 'insurance',
    issue_date: '2024-01-01',
    expiry_date: addDays(180),
    organization: 'MedPro Insurance',
    credential_number: 'MP-2024-98765',
    description: 'Professional liability insurance',
    status: 'valid',
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
  },
  {
    id: '4',
    user_id: '1',
    name: 'CPR Certification',
    type: 'certificate',
    issue_date: '2023-06-15',
    expiry_date: addDays(-10),
    organization: 'American Heart Association',
    credential_number: 'CPR-2023-11111',
    description: 'Basic Life Support certification',
    status: 'expired',
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
  },
  {
    id: '5',
    user_id: '1',
    name: 'Radiation Safety Certificate',
    type: 'certificate',
    issue_date: '2023-09-01',
    expiry_date: addDays(20),
    organization: 'State Radiation Control',
    credential_number: 'RSC-2023-22222',
    description: 'X-ray equipment operation certification',
    status: 'expiring_soon',
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
  },
  {
    id: '6',
    user_id: '1',
    name: 'HIPAA Compliance Training',
    type: 'certificate',
    issue_date: '2024-02-01',
    expiry_date: addDays(300),
    organization: 'Healthcare Compliance Institute',
    credential_number: 'HIPAA-2024-33333',
    description: 'Annual HIPAA compliance certification',
    status: 'valid',
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
  },
  {
    id: '7',
    user_id: '1',
    name: 'Business Permit',
    type: 'permit',
    issue_date: '2024-01-01',
    expiry_date: addDays(3),
    organization: 'City of San Francisco',
    credential_number: 'BP-2024-44444',
    description: 'Business operating permit',
    status: 'expiring_soon',
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
  },
];

export const calculateStats = (credentials: Credential[]): DashboardStats => {
  const today = new Date();
  let expiringSoon = 0;
  let expired = 0;
  let upToDate = 0;

  credentials.forEach((cred) => {
    const expiryDate = new Date(cred.expiry_date);
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntilExpiry < 0) {
      expired++;
    } else if (daysUntilExpiry <= 30) {
      expiringSoon++;
    } else {
      upToDate++;
    }
  });

  return {
    total: credentials.length,
    expiringSoon,
    expired,
    upToDate,
  };
};

export const getDaysUntilExpiry = (expiryDate: string): number => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  return Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
};

export const getExpiryStatus = (days: number): 'success' | 'warning' | 'danger' => {
  if (days < 0) return 'danger';
  if (days <= 15) return 'danger';
  if (days <= 30) return 'warning';
  return 'success';
};
