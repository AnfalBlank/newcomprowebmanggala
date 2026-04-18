import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/server/db';
import { crmReminders, crmLeads } from '@/server/db/schema';
import { nanoid } from 'nanoid';
import { auth } from '@/lib/auth';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const { message, remindAt } = await request.json();

  try {
    await db.insert(crmReminders).values({
      id: nanoid(),
      leadId: id,
      message,
      remindAt: new Date(remindAt),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create reminder' }, { status: 500 });
  }
}
