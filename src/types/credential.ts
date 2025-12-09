export type CredentialType = 'license' | 'certificate' | 'insurance' | 'permit' | 'other';

export type CredentialStatus = 'valid' | 'expiring_soon' | 'expired';

export interface Credential {
  id: string;
  user_id: string;
  name: string;
  type: CredentialType;
  issue_date: string;
  expiry_date: string;
  organization: string;
  credential_number: string;
  description?: string;
  document_url?: string;
  status: CredentialStatus;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  profession?: string;
  profile_pic_url?: string;
  plan: 'free' | 'pro' | 'team';
  created_at: string;
  updated_at: string;
}

export interface DashboardStats {
  total: number;
  expiringSoon: number;
  expired: number;
  upToDate: number;
}
