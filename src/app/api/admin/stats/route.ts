import { NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/adminApi';
import { countPendingMessages } from '@/lib/db/messages';

export async function GET() {
  const denied = await requireAdminSession();
  if (denied) return denied;
  try {
    const pendingMessages = await countPendingMessages();
    return NextResponse.json({ pendingMessages });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to load stats' }, { status: 500 });
  }
}
