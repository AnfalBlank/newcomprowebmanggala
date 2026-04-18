import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { crmPayments, crmInvoices } from "@/server/db/schema";
import { auth } from "@/lib/auth";
import { eq, desc } from "drizzle-orm";
import { nanoid } from "nanoid";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payments = await db.query.crmPayments.findMany({
    with: {
      invoice: {
        with: {
          project: true
        }
      }
    },
    orderBy: [desc(crmPayments.paymentDate)]
  });

  return NextResponse.json(payments);
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { invoiceId, amount, paymentDate, method, proofUrl } = body;

  const [newPayment] = await db.insert(crmPayments).values({
    id: nanoid(),
    invoiceId,
    amount: parseInt(amount),
    paymentDate: new Date(paymentDate),
    method,
    proofUrl,
    status: "pending"
  }).returning();

  return NextResponse.json(newPayment);
}
