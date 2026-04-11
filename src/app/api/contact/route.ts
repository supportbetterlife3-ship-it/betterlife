import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createContactMessage } from '@/lib/db/messages';

const bodySchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  phone: z.string().min(5).max(50),
  message: z.string().min(1).max(10000),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input', details: parsed.error.flatten() }, { status: 400 });
    }
    await createContactMessage(parsed.data);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
  }
}
