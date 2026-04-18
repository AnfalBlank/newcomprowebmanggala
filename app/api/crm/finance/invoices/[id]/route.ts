import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { crmInvoices } from "@/server/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const invoice = await db.query.crmInvoices.findFirst({
    where: eq(crmInvoices.id, id),
    with: {
      project: true,
      payments: true
    }
  });

  if (!invoice) return NextResponse.json({ error: "Invoice not found" }, { status: 404 });

  return NextResponse.json(invoice);
}
