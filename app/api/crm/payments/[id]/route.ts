import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { crmPayments } from "@/server/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const payment = await db.query.crmPayments.findFirst({
    where: eq(crmPayments.id, id),
    with: {
      invoice: {
        with: {
          project: true
        }
      }
    }
  });

  if (!payment) {
    return NextResponse.json({ error: "Payment not found" }, { status: 404 });
  }

  return NextResponse.json(payment);
}
