import { createClient } from '@supabase/supabase-js';

export function getSupabaseServer() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // só no server!
  if (!url) throw new Error('Supabase URL ausente (NEXT_PUBLIC_SUPABASE_URL)');
  if (!serviceKey) throw new Error('Service role ausente (SUPABASE_SERVICE_ROLE_KEY)');
  return createClient(url, serviceKey, { auth: { persistSession: false } });
}
