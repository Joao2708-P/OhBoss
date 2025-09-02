import { NextResponse } from 'next/server'
import { getSupabaseServer } from '../../../utils/supabase/server'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    if (!file) return NextResponse.json({ error: 'Arquivo obrigatório' }, { status: 400 })

    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)
    const ext = (file.name.split('.').pop() || 'jpg').toLowerCase()
    const path = `landing/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

    // garante bucket
    // nota: createBucket falha se já existir; ignoramos erro 409
    // @ts-ignore - createBucket não tipado nas versões antigas
    const supabaseServer = getSupabaseServer()
    const { error: bucketError } = await (supabaseServer.storage as any).createBucket?.('comments-avatars', {
      public: true
    })
    if (bucketError && !bucketError.message?.includes('already exists')) {
      // se método não existir, segue
      if (!('createBucket' in (supabaseServer.storage as any))) {
        // noop
      } else {
        return NextResponse.json({ error: bucketError.message }, { status: 500 })
      }
    }

    const { error: uploadError } = await supabaseServer
      .storage
      .from('comments-avatars')
      .upload(path, buffer, { contentType: file.type, upsert: true })

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 })
    }

    const { data } = supabaseServer.storage.from('comments-avatars').getPublicUrl(path)
    return NextResponse.json({ publicUrl: data.publicUrl })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Erro inesperado'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}


