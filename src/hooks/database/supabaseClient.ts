
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with proper error handling
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if required environment variables are available
if (!supabaseUrl || !supabaseKey) {
  console.warn(
    'Supabase environment variables are not set. Using mock client. ' +
    'For full functionality, please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY ' +
    'environment variables.'
  );
}

// Create Supabase client with proper fallbacks for development
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-supabase-url.supabase.co', 
  supabaseKey || 'placeholder-anon-key'
);

// Export a helper to check if we have real credentials
export const hasValidSupabaseCredentials = () => {
  return Boolean(supabaseUrl && supabaseKey && !supabaseUrl.includes('placeholder'));
};
