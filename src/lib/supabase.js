import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://nlxsgwwlvztbndwnjnhp.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_GNmKEBsvqOvxSKygM4Efpg_rFxy3Qto';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
