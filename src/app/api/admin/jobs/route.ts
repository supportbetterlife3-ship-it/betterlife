import { NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAdminSession } from '@/lib/adminApi';
import { createJob, listAllJobsAdmin } from '@/lib/db/jobs';
import { slugify } from '@/lib/slugify';

const createSchema = z.object({
  title: z.string().min(1).max(300),
  slug: z.string().min(1).max(200).optional(),
  location: z.string().min(1).max(200),
  salary: z.string().min(1).max(120),
  jobType: z.string().min(1).max(120),
  closingDate: z.string().min(1),
  description: z.string().min(1).max(50000),
  imageUrl: z.string().max(2000).optional(),
  published: z.boolean().optional(),
});

export async function GET() {
  const denied = await requireAdminSession();
  if (denied) return denied;
  try {
    const jobs = await listAllJobsAdmin();
    return NextResponse.json(
      jobs.map((j) => ({
        ...j,
        _id: String(j._id),
        closingDate: j.closingDate instanceof Date ? j.closingDate.toISOString() : j.closingDate,
        imageUrl: typeof j.imageUrl === 'string' ? j.imageUrl : '',
      }))
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to load jobs' }, { status: 500 });
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
    const { title, slug: rawSlug, location, salary, jobType, closingDate, description, published, imageUrl: rawImg } =
      parsed.data;
    const slug = rawSlug?.trim() ? slugify(rawSlug.trim()) : slugify(title);
    const imageUrl = rawImg?.trim() ?? '';
    const doc = await createJob({
      title,
      slug,
      location,
      salary,
      jobType,
      closingDate: new Date(`${closingDate}T12:00:00.000Z`),
      description,
      imageUrl,
      published: published ?? true,
    });
    return NextResponse.json({ ok: true, id: String(doc._id) });
  } catch (e: unknown) {
    const code = e && typeof e === 'object' && 'code' in e ? (e as { code?: number }).code : undefined;
    if (code === 11000) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 409 });
    }
    console.error(e);
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
  }
}
