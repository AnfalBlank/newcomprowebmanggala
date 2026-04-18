import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/server/db';
import { crmInvoices, crmProjects } from '@/server/db/schema';
import { auth } from '@/lib/auth';
import { eq, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const invoices = await db.query.crmInvoices.findMany({
      orderBy: [desc(crmInvoices.createdAt)],
      with: {
        project: {
          columns: {
            name: true,
            clientName: true,
          }
        }
      }
    });

    // Flatten data for UI
    const formattedInvoices = invoices.map((inv: any) => ({
      id: inv.id,
      invoiceNumber: inv.invoiceNumber,
      projectName: inv.project.name,
      clientName: inv.project.clientName,
      amount: inv.amount,
      dueDate: inv.dueDate,
      status: inv.status,
    }));

    return NextResponse.json(formattedInvoices);
  } catch (error) {
    console.error('Failed to fetch invoices', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
