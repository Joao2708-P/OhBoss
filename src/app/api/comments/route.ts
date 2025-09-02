import { NextResponse } from "next/server";
import  { getSupabaseServer } from '../../utils/supabase/server';

export async function GET(request: Request) {
    const { searchParams } = new  URL(request.url);
    const postId = searchParams.get('post_id');
    if(!postId) return NextResponse.json({error: 'postId é obrigatório' }, {status: 400});

    const supabaseServer = getSupabaseServer();
    const { data, error } = await supabaseServer
    .from("comments")
    .select("id, name, avatar_url, content, rating, created_at")
    .eq("post_id", postId)
    .order("created_at", { ascending: false })

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

export async function POST(request: Request) {
    const body = await request.json().catch(() => null);
    if (!body?.content) {
        return NextResponse.json({ error: 'Conteúdo obrigatório '}, {status: 400})
    }

    const supabaseServer = getSupabaseServer();
    const { data, error } = await supabaseServer
        .from('comments')
        .insert({
            post_id: 'landing',
            name: body.name ?? 'anonimo',
            content: body.content,
            avatar_url: body.avatar_url ?? 'nulo',
            rating: body.rating
        })
        .select()
        .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
        return NextResponse.json(data, { status: 201 });
}