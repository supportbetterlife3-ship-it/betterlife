import { NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAdminSession } from '@/lib/adminApi';
import { dbConnect } from '@/lib/mongodb';
import { BlogPost } from '@/models/BlogPost';
import { deletePostById, updatePostById } from '@/lib/db/posts';
import { slugify } from '@/lib/slugify';

const patchSchema = z.object({
  title: z.string().min(1).max(300).optional(),
  slug: z.string().min(1).max(200).optional(),
  excerpt: z.string().min(1).max(500).optional(),
  content: z.string().min(1).max(200000).optional(),
  imageUrl: z.string().max(2000).optional(),
  published: z.boolean().optional(),
});

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: RouteParams) {
  const denied = await requireAdminSession();
  if (denied) return denied;
  const { id } = await params;
  try {
    const json = await request.json();
    const parsed = patchSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input', details: parsed.error.flatten() }, { status: 400 });
    }
    await dbConnect();
    const existing = await BlogPost.findById(id).lean();
    if (!existing) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const patch = parsed.data;
    const data: Parameters<typeof updatePostById>[1] = {};
    if (patch.title !== undefined) data.title = patch.title;
    if (patch.excerpt !== undefined) data.excerpt = patch.excerpt;
    if (patch.content !== undefined) data.content = patch.content;
    if (patch.imageUrl !== undefined) data.imageUrl = patch.imageUrl.trim();
    if (patch.slug !== undefined) data.slug = slugify(patch.slug);
    if (patch.published === true) {
      data.published = true;
      data.publishedAt = existing.publishedAt ? new Date(existing.publishedAt) : new Date();
    } else if (patch.published === false) {
      data.published = false;
      data.publishedAt = null;
    }

    const updated = await updatePostById(id, data);
    if (!updated) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const code = e && typeof e === 'object' && 'code' in e ? (e as { code?: number }).code : undefined;
    if (code === 11000) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 409 });
    }
    console.error(e);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const denied = await requireAdminSession();
  if (denied) return denied;
  const { id } = await params;
  try {
    const deleted = await deletePostById(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
