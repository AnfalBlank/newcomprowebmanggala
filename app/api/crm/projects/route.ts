import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { crmProjects } from "@/server/db/schema";
import { auth } from "@/lib/auth";
import { nanoid } from "nanoid";
import { eq, desc } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const projects = await db.query.crmProjects.findMany({
    with: {
      tasks: true,
      expenses: true,
      invoices: true,
      lead: true
    },
    orderBy: desc(crmProjects.createdAt)
  });

  // Transform data to include calculations
  const projectsWithStats = projects.map(project => {
    const totalExpenses = project.expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const totalInvoiced = project.invoices.reduce((sum, inv) => sum + inv.amount, 0);
    const totalPaid = project.invoices
      .filter(inv => inv.status === 'paid')
      .reduce((sum, inv) => sum + inv.amount, 0);
    
    const completedTasks = project.tasks.filter(t => t.status === 'completed').length;
    const progress = project.tasks.length > 0 
      ? Math.round((completedTasks / project.tasks.length) * 100) 
      : project.progress || 0;

    return {
      ...project,
      progress,
      totalExpenses,
      totalInvoiced,
      totalPaid,
      netProfit: (project.contractValue || 0) - totalExpenses
    };
  });

  return NextResponse.json(projectsWithStats);
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const id = nanoid();

  const [newProject] = await db.insert(crmProjects).values({
    id,
    leadId: body.leadId,
    name: body.name,
    clientName: body.clientName,
    picClient: body.picClient,
    picPhone: body.picPhone,
    type: body.type,
    status: body.status || "on_going",
    startDate: body.startDate ? new Date(body.startDate) : null,
    endDate: body.endDate ? new Date(body.endDate) : null,
    contractValue: parseInt(body.contractValue) || 0,
    actualCost: parseInt(body.actualCost) || 0,
  }).returning();

  return NextResponse.json(newProject);
}
