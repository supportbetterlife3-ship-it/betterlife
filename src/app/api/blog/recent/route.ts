import { NextResponse } from 'next/server';
import { listRecentPublishedPosts } from '@/lib/db/posts';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const raw = searchParams.get('limit');
    const limit = raw ? Math.min(12, Math.max(1, parseInt(raw, 10) || 3)) : 3;
    const posts = await listRecentPublishedPosts(limit);
    return NextResponse.json(
      posts.map((p) => ({
        _id: p._id,
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        publishedAt: p.publishedAt,
        imageUrl: p.imageUrl ?? null,
      })),
      {
        headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' },
      }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to load posts' }, { status: 500 });
  }
}
