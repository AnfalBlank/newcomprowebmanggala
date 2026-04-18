import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { crmInvoices, crmPayments } from "@/server/db/schema";
import { auth } from "@/lib/auth";
import { nanoid } from "nanoid";
import { eq, desc } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const invoices = await db.select().from(crmInvoices).orderBy(desc(crmInvoices.createdAt));
  return NextResponse.json(invoices);
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const id = nanoid();

  const [newInvoice] = await db.insert(crmInvoices).values({
    id,
    projectId: body.projectId,
    invoiceNumber: body.invoiceNumber,
    amount: parseInt(body.amount),
    taxRate: body.taxRate || 0,
    taxAmount: body.taxAmount || 0,
    downPaymentRate: body.downPaymentRate || 0,
    downPaymentAmount: body.downPaymentAmount || 0,
    balanceAmount: body.balanceAmount || 0,
    items: body.items ? JSON.stringify(body.items) : null,
    dueDate: new Date(body.dueDate),
    status: body.status || "unpaid",
    notes: body.notes
  }).returning();

  return NextResponse.json(newInvoice);
}
