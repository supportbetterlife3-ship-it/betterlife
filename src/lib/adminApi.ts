import { auth } from '@/auth';
import { NextResponse } from 'next/server';

/** Returns null if the caller is an authenticated admin session, otherwise a 401 Response. */
export async function requireAdminSession(): Promise<NextResponse | null> {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}
