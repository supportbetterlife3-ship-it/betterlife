import { NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAdminSession } from '@/lib/adminApi';
import { createPost, listAllPostsAdmin } from '@/lib/db/posts';
import { slugify } from '@/lib/slugify';

const createSchema = z.object({
  title: z.string().min(1).max(300),
  slug: z.string().min(1).max(200).optional(),
  excerpt: z.string().min(1).max(500),
  content: z.string().min(1).max(200000),
  imageUrl: z.string().max(2000).optional(),
  published: z.boolean().optional(),
});

export async function GET() {
  const denied = await requireAdminSession();
  if (denied) return denied;
  try {
    const posts = await listAllPostsAdmin();
    return NextResponse.json(
      posts.map((p) => ({
        ...p,
        _id: String(p._id),
        publishedAt:
          p.publishedAt instanceof Date ? p.publishedAt.toISOString() : p.publishedAt ?? null,
        imageUrl: typeof p.imageUrl === 'string' ? p.imageUrl : '',
      }))
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to load posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const denied = await requireAdminSession();
  if (denied) return denied;
  try {
    const json = await request.json();
    const parsed = createSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input', details: parsed.error.flatten() }, { status: 400 });
    }
    const { title, slug: rawSlug, excerpt, content, published, imageUrl: rawImg } = parsed.data;
    const slug = rawSlug?.trim() ? slugify(rawSlug.trim()) : slugify(title);
    const isPublished = published ?? false;
    const imageUrl = rawImg?.trim() ?? '';
    const doc = await createPost({
      title,
      slug,
      excerpt,
      content,
      imageUrl,
      published: isPublished,
      publishedAt: isPublished ? new Date() : null,
    });
    return NextResponse.json({ ok: true, id: String(doc._id) });
  } catch (e: unknown) {
    const code = e && typeof e === 'object' && 'code' in e ? (e as { code?: number }).code : undefined;
    if (code === 11000) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 409 });
    }
    console.error(e);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
