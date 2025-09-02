import { createClient } from '@supabase/supabase-js'

export const supaBaseBrowser = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_AMON_KEY!
);