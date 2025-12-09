-- Drop the existing foreign key constraint on credentials
ALTER TABLE public.credentials DROP CONSTRAINT IF EXISTS credentials_user_id_fkey;

-- Add a new foreign key that references auth.users directly
ALTER TABLE public.credentials 
  ADD CONSTRAINT credentials_user_id_fkey 
  FOREIGN KEY (user_id) 
  REFERENCES auth.users(id) 
  ON DELETE CASCADE;

-- Also fix documents table
ALTER TABLE public.documents DROP CONSTRAINT IF EXISTS documents_user_id_fkey;
ALTER TABLE public.documents 
  ADD CONSTRAINT documents_user_id_fkey 
  FOREIGN KEY (user_id) 
  REFERENCES auth.users(id) 
  ON DELETE CASCADE;

-- Also fix reminders table
ALTER TABLE public.reminders DROP CONSTRAINT IF EXISTS reminders_user_id_fkey;
ALTER TABLE public.reminders 
  ADD CONSTRAINT reminders_user_id_fkey 
  FOREIGN KEY (user_id) 
  REFERENCES auth.users(id) 
  ON DELETE CASCADE;

-- Also fix notification_settings table
ALTER TABLE public.notification_settings DROP CONSTRAINT IF EXISTS notification_settings_user_id_fkey;
ALTER TABLE public.notification_settings 
  ADD CONSTRAINT notification_settings_user_id_fkey 
  FOREIGN KEY (user_id) 
  REFERENCES auth.users(id) 
  ON DELETE CASCADE;
