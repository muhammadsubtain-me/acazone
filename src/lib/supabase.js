import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const SUPABASE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? '';

// During build/SSR these will be empty strings — guard against Supabase throwing
const isBrowser = typeof window !== 'undefined';

export const supabase = (isBrowser || (SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY))
  ? createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY)
  : null;
