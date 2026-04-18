import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { crmExpenses, crmProjects } from "@/server/db/schema";
import { auth } from "@/lib/auth";
import { eq, desc } from "drizzle-orm";
import { nanoid } from "nanoid";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const expenses = await db.query.crmExpenses.findMany({
    with: {
      project: true
    },
    orderBy: [desc(crmExpenses.date)]
  });

  return NextResponse.json(expenses);
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { projectId, title, amount, category, date, description, receiptUrl } = body;

  const [newExpense] = await db.insert(crmExpenses).values({
    id: nanoid(),
    projectId,
    title,
    amount: parseInt(amount),
    category,
    date: new Date(date),
    description,
    receiptUrl
  }).returning();

  // Update actual cost in project
  const project = await db.query.crmProjects.findFirst({
    where: eq(crmProjects.id, projectId)
  });

  if (project) {
    await db.update(crmProjects)
      .set({ actualCost: (project.actualCost || 0) + parseInt(amount) })
      .where(eq(crmProjects.id, projectId));
  }

  return NextResponse.json(newExpense);
}
