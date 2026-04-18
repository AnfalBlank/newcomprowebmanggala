import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { crmExpenses, crmProjects } from "@/server/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  // Get expense to subtract from project actual cost
  const expense = await db.query.crmExpenses.findFirst({
    where: eq(crmExpenses.id, id)
  });

  if (!expense) return NextResponse.json({ error: "Expense not found" }, { status: 404 });

  // Update project actual cost
  const project = await db.query.crmProjects.findFirst({
    where: eq(crmProjects.id, expense.projectId)
  });

  if (project) {
    await db.update(crmProjects)
      .set({ actualCost: Math.max(0, (project.actualCost || 0) - expense.amount) })
      .where(eq(crmProjects.id, project.id));
  }

  await db.delete(crmExpenses).where(eq(crmExpenses.id, id));

  return NextResponse.json({ success: true });
}
