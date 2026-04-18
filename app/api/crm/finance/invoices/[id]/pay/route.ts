import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { crmPayments, crmInvoices } from "@/server/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

  const invoice = await db.query.crmInvoices.findFirst({
    where: eq(crmInvoices.id, id),
  });

  if (!invoice) {
    return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
  }

  const paymentId = nanoid();
  const [newPayment] = await db.insert(crmPayments).values({
    id: paymentId,
    invoiceId: id,
    amount: parseInt(body.amount),
    paymentDate: new Date(body.paymentDate),
    method: body.method,
    proofUrl: body.proofUrl,
    status: "pending",
  }).returning();

  return NextResponse.json(newPayment);
}
