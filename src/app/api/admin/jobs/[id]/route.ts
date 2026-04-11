import { NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAdminSession } from '@/lib/adminApi';
import { deleteJobById, updateJobById } from '@/lib/db/jobs';
import { slugify } from '@/lib/slugify';

const patchSchema = z.object({
  title: z.string().min(1).max(300).optional(),
  slug: z.string().min(1).max(200).optional(),
  location: z.string().min(1).max(200).optional(),
  salary: z.string().min(1).max(120).optional(),
  jobType: z.string().min(1).max(120).optional(),
  closingDate: z.string().min(1).optional(),
  description: z.string().min(1).max(50000).optional(),
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
    const { closingDate, slug: slugIn, imageUrl: imgIn, ...rest } = parsed.data;
    const data: Parameters<typeof updateJobById>[1] = { ...rest };
    if (imgIn !== undefined) {
      data.imageUrl = imgIn.trim();
    }
    if (slugIn) {
      data.slug = slugify(slugIn);
    }
    if (closingDate) {
      data.closingDate = new Date(`${closingDate}T12:00:00.000Z`);
    }
    const updated = await updateJobById(id, data);
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
    return NextResponse.json({ error: 'Failed to update job' }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const denied = await requireAdminSession();
  if (denied) return denied;
  const { id } = await params;
  try {
    const deleted = await deleteJobById(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 });
  }
}
