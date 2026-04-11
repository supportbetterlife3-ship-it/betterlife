import { NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAdminSession } from '@/lib/adminApi';
import { deleteMessageById, updateMessageStatus } from '@/lib/db/messages';

const patchSchema = z.object({
  status: z.enum(['pending', 'resolved']),
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
    const updated = await updateMessageStatus(id, parsed.data.status);
    if (!updated) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to update message' }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const denied = await requireAdminSession();
  if (denied) return denied;
  const { id } = await params;
  try {
    const deleted = await deleteMessageById(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
  }
}
