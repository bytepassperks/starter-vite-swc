import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables - some features may not work');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Auth helpers
export const signUp = async (email: string, password: string, fullName: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

export const getSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  return { session, error };
};

// Profile helpers
export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return { data, error };
};

export const updateProfile = async (userId: string, updates: {
  full_name?: string;
  phone?: string;
  profession?: string;
  profile_pic_url?: string;
}) => {
  const { data, error } = await supabase
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', userId)
    .select()
    .single();
  return { data, error };
};

// Credentials helpers
export const getCredentials = async (userId: string) => {
  const { data, error } = await supabase
    .from('credentials')
    .select('*')
    .eq('user_id', userId)
    .order('expiry_date', { ascending: true });
  return { data, error };
};

export const getCredential = async (credentialId: string) => {
  const { data, error } = await supabase
    .from('credentials')
    .select('*')
    .eq('id', credentialId)
    .single();
  return { data, error };
};

export const createCredential = async (credential: {
  user_id: string;
  name: string;
  type: 'license' | 'certificate' | 'insurance' | 'permit' | 'other';
  issue_date?: string;
  expiry_date: string;
  organization?: string;
  credential_number?: string;
  description?: string;
  document_url?: string;
}) => {
  const { data, error } = await supabase
    .from('credentials')
    .insert(credential)
    .select()
    .single();
  return { data, error };
};

export const updateCredential = async (credentialId: string, updates: {
  name?: string;
  type?: 'license' | 'certificate' | 'insurance' | 'permit' | 'other';
  issue_date?: string;
  expiry_date?: string;
  organization?: string;
  credential_number?: string;
  description?: string;
  document_url?: string;
}) => {
  const { data, error } = await supabase
    .from('credentials')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', credentialId)
    .select()
    .single();
  return { data, error };
};

export const deleteCredential = async (credentialId: string) => {
  const { error } = await supabase
    .from('credentials')
    .delete()
    .eq('id', credentialId);
  return { error };
};

// Reminders helpers
export const getReminders = async (userId: string) => {
  const { data, error } = await supabase
    .from('reminders')
    .select(`
      *,
      credentials (
        name,
        organization,
        expiry_date
      )
    `)
    .eq('user_id', userId)
    .order('reminder_date', { ascending: true });
  return { data, error };
};

export const getUpcomingReminders = async (userId: string, days: number = 90) => {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + days);
  
  const { data, error } = await supabase
    .from('reminders')
    .select(`
      *,
      credentials (
        name,
        organization,
        expiry_date
      )
    `)
    .eq('user_id', userId)
    .eq('status', 'pending')
    .gte('reminder_date', new Date().toISOString().split('T')[0])
    .lte('reminder_date', futureDate.toISOString().split('T')[0])
    .order('reminder_date', { ascending: true });
  return { data, error };
};

// Notification settings helpers
export const getNotificationSettings = async (userId: string) => {
  const { data, error } = await supabase
    .from('notification_settings')
    .select('*')
    .eq('user_id', userId)
    .single();
  return { data, error };
};

export const updateNotificationSettings = async (userId: string, settings: {
  email_enabled?: boolean;
  sms_enabled?: boolean;
  in_app_enabled?: boolean;
  reminder_90_days?: boolean;
  reminder_60_days?: boolean;
  reminder_30_days?: boolean;
  reminder_7_days?: boolean;
  reminder_1_day?: boolean;
  weekly_digest?: boolean;
}) => {
  const { data, error } = await supabase
    .from('notification_settings')
    .update({ ...settings, updated_at: new Date().toISOString() })
    .eq('user_id', userId)
    .select()
    .single();
  return { data, error };
};

// Document upload helpers
export const uploadDocument = async (userId: string, file: File) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/${Date.now()}.${fileExt}`;
  
  const { data, error } = await supabase.storage
    .from('credentials-documents')
    .upload(fileName, file);
  
  if (error) return { data: null, error };
  
  const { data: { publicUrl } } = supabase.storage
    .from('credentials-documents')
    .getPublicUrl(fileName);
  
  return { data: { path: data.path, url: publicUrl }, error: null };
};

export const deleteDocument = async (filePath: string) => {
  const { error } = await supabase.storage
    .from('credentials-documents')
    .remove([filePath]);
  return { error };
};

// Dashboard stats helper
export const getDashboardStats = async (userId: string) => {
  const { data: credentials, error } = await supabase
    .from('credentials')
    .select('status')
    .eq('user_id', userId);
  
  if (error) return { data: null, error };
  
  const stats = {
    total: credentials.length,
    expiringSoon: credentials.filter(c => c.status === 'expiring_soon').length,
    expired: credentials.filter(c => c.status === 'expired').length,
    upToDate: credentials.filter(c => c.status === 'valid').length,
  };
  
  return { data: stats, error: null };
};
