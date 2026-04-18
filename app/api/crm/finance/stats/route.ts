import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/server/db';
import { crmProjects, crmInvoices, crmPayments } from '@/server/db/schema';
import { auth } from '@/lib/auth';
import { eq, sum, sql } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    // 1. Get all projects with P&L info
    const projects = await db.query.crmProjects.findMany({
      with: {
        expenses: true,
        invoices: {
          with: {
            payments: true
          }
        }
      },
      orderBy: (projects, { desc }) => [desc(projects.createdAt)],
    });

    const projectPerformance = projects.map(p => {
      const actualCost = p.expenses.reduce((acc, e) => acc + e.amount, 0);
      const totalPaid = p.invoices.reduce((acc, inv) => {
        const verifiedPayments = inv.payments
          .filter(pay => pay.status === "verified")
          .reduce((sum, pay) => sum + pay.amount, 0);
        return acc + verifiedPayments;
      }, 0);

      return {
        id: p.id,
        name: p.name,
        contractValue: p.contractValue || 0,
        actualCost: actualCost,
        paidAmount: totalPaid,
        profit: (p.contractValue || 0) - actualCost,
        status: p.status,
      };
    });

    // 2. Calculate Totals
    const totalRevenue = projectPerformance.reduce((acc, p) => acc + p.paidAmount, 0); // Money actually received
    const totalPotentialRevenue = projectPerformance.reduce((acc, p) => acc + p.contractValue, 0);
    const totalCost = projectPerformance.reduce((acc, p) => acc + p.actualCost, 0);
    const totalProfit = totalPotentialRevenue - totalCost;

    // 3. Category Breakdown
    const allExpenses = projects.flatMap(p => p.expenses);
    const categoryBreakdown = allExpenses.reduce((acc: any, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {});

    // 4. Outstanding Invoices
    const invoices = await db.query.crmInvoices.findMany({
      where: sql`${crmInvoices.status} != 'paid'`,
    });

    const unpaidAmount = invoices.reduce((acc, inv) => acc + inv.amount, 0);

    return NextResponse.json({
      totalRevenue,
      totalCost,
      totalProfit,
      outstandingInvoices: invoices.length,
      unpaidAmount,
      projectPerformance,
      categoryBreakdown
    });
  } catch (error) {
    console.error('Failed to fetch finance stats', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
