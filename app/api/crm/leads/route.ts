import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { crmLeads } from "@/server/db/schema";
import { auth } from "@/lib/auth";
import { nanoid } from "nanoid";
import { eq, desc } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const leads = await db.select().from(crmLeads).orderBy(desc(crmLeads.createdAt));
  return NextResponse.json(leads);
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const id = nanoid();

  const [newLead] = await db.insert(crmLeads).values({
    id,
    projectName: body.projectName,
    clientName: body.clientName,
    picClient: body.picClient,
    quotedValue: parseInt(body.quotedValue) || 0,
    estimatedCost: parseInt(body.estimatedCost) || 0,
    estimatedProfit: parseInt(body.estimatedProfit) || 0,
    closingDeadline: body.closingDeadline ? new Date(body.closingDeadline) : null,
    status: body.status || "lead",
    notes: body.notes,
    proposalUrl: body.proposalUrl,
  }).returning();

  return NextResponse.json(newLead);
}
