import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/server/db';
import { crmLeads, crmProjects } from '@/server/db/schema';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { auth } from '@/lib/auth';
import { sendWhatsAppMessage } from '@/lib/whatsapp';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const lead = await db.query.crmLeads.findFirst({ where: eq(crmLeads.id, id) });

  if (!lead) return NextResponse.json({ error: 'Lead not found' }, { status: 404 });

  try {
    // 1. Update Lead Status
    await db.update(crmLeads).set({ status: 'po_spk' }).where(eq(crmLeads.id, id));

    // 2. Create Project
    const projectId = nanoid();
    await db.insert(crmProjects).values({
      id: projectId,
      leadId: lead.id,
      name: lead.projectName,
      clientName: lead.clientName,
      picClient: lead.picClient,
      picPhone: lead.picPhone,
      type: 'pengadaan', // Default
      contractValue: lead.quotedValue,
      actualCost: lead.estimatedCost || 0,
      status: 'on_going',
      startDate: new Date(),
    });

    // 3. Send WA Notification to PIC
    if (lead.picPhone) {
      await sendWhatsAppMessage(
        lead.picPhone,
        `Halo ${lead.picClient},\n\nTerima kasih telah mempercayai kami. Proyek "${lead.projectName}" telah resmi dimulai. Kami akan segera menghubungi Anda untuk langkah selanjutnya.\n\nSalam,\nAdmin CRM`
      );
    }

    return NextResponse.json({ success: true, projectId });
  } catch (error) {
    console.error('Conversion failed', error);
    return NextResponse.json({ error: 'Conversion failed' }, { status: 500 });
  }
}
