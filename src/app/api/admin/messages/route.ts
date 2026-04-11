import { NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/adminApi';
import { listMessagesAdmin } from '@/lib/db/messages';

export async function GET() {
  const denied = await requireAdminSession();
  if (denied) return denied;
  try {
    const messages = await listMessagesAdmin();
    return NextResponse.json(
      messages.map((m) => ({
        ...m,
        _id: String(m._id),
        status: m.status === 'resolved' ? 'resolved' : 'pending',
      }))
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to load messages' }, { status: 500 });
  }
}
