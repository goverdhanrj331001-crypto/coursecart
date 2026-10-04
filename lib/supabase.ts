import { createClient } from '@supabase/supabase-js';

const getSupabaseConfig = () => {
  if (typeof window !== 'undefined') {
    const customUrl = localStorage.getItem('bb_supabase_url');
    const customKey = localStorage.getItem('bb_supabase_anon_key');
    if (customUrl && customKey) {
      return { url: customUrl, key: customKey, isCustom: true };
    }
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  return {
    url: url || 'https://placeholder.supabase.co',
    key: key || 'placeholder-anon-key',
    isCustom: Boolean(url && key && !url.includes('your-supabase-project')),
  };
};

const config = getSupabaseConfig();

export const isSupabaseConfigured = () => {
  if (typeof window !== 'undefined') {
    const customUrl = localStorage.getItem('bb_supabase_url');
    const customKey = localStorage.getItem('bb_supabase_anon_key');
    if (customUrl && customKey) return true;
  }
  const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const envKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(
    envUrl &&
      envKey &&
      !envUrl.includes('your-supabase-project') &&
      envUrl.startsWith('https://')
  );
};

export const supabase = createClient(config.url, config.key);

export const saveSupabaseCredentials = (url: string, anonKey: string) => {
  if (typeof window !== 'undefined') {
    if (url.trim() && anonKey.trim()) {
      localStorage.setItem('bb_supabase_url', url.trim());
      localStorage.setItem('bb_supabase_anon_key', anonKey.trim());
    } else {
      localStorage.removeItem('bb_supabase_url');
      localStorage.removeItem('bb_supabase_anon_key');
    }
    window.location.reload();
  }
};

