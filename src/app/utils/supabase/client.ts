import { createClient } from '@supabase/supabase-js'

export function getSupabaseBrowser() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url) throw new Error('NEXT_PUBLIC_SUPABASE_URL ausente')
    if (!anon) throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY ausente')
    return createClient(url, anon)
}