import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/server/db';
import { crmInvoices, crmProjects } from '@/server/db/schema';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { auth } from '@/lib/auth';
import { sendWhatsAppMessage } from '@/lib/whatsapp';

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { projectId, amount, dueDate, invoiceNumber, notes } = await request.json();

    if (!projectId || !amount || !dueDate || !invoiceNumber) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Get Project Info for WA Notification
    const project = await db.query.crmProjects.findFirst({
      where: eq(crmProjects.id, projectId),
    });

    if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });

    // 2. Create Invoice Record
    const id = nanoid();
    await db.insert(crmInvoices).values({
      id,
      projectId,
      invoiceNumber,
      amount: Number(amount),
      dueDate: new Date(dueDate),
      status: 'unpaid',
      notes,
    });

    // 3. Send WA Notification to Client
    if (project.picPhone) {
      const waMessage = `Halo ${project.picClient},\n\nInvoice baru telah diterbitkan untuk proyek "${project.name}".\n\nNo Invoice: ${invoiceNumber}\nJumlah: IDR ${Number(amount).toLocaleString('id-ID')}\nJatuh Tempo: ${new Date(dueDate).toLocaleDateString('id-ID')}\n\nMohon segera melakukan pembayaran. Terima kasih.`;
      
      await sendWhatsAppMessage(project.picPhone, waMessage);
    }

    return NextResponse.json({ success: true, invoiceId: id });
  } catch (error) {
    console.error('Invoice generation failed', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
