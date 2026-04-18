import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { crmPayments, crmInvoices } from "@/server/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { status } = await req.json();

  if (!["verified", "rejected"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  // Update payment status
  const [updatedPayment] = await db
    .update(crmPayments)
    .set({ 
      status,
      verifiedAt: new Date(),
      verifiedBy: session.user.id
    })
    .where(eq(crmPayments.id, id))
    .returning();

  if (status === "verified") {
    // If verified, update invoice status if fully paid
    const invoice = await db.query.crmInvoices.findFirst({
      where: eq(crmInvoices.id, updatedPayment.invoiceId),
      with: {
        payments: true
      }
    });

    if (invoice) {
      const totalVerified = invoice.payments
        .filter(p => p.status === "verified")
        .reduce((sum, p) => sum + p.amount, 0);

      const newStatus = totalVerified >= invoice.amount ? "paid" : (totalVerified > 0 ? "partial" : "unpaid");
      
      await db.update(crmInvoices)
        .set({ status: newStatus })
        .where(eq(crmInvoices.id, invoice.id));
    }
  }

  return NextResponse.json(updatedPayment);
}
