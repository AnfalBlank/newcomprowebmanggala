import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { crmProjectTasks } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { auth } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const tasks = await db.query.crmProjectTasks.findMany({
      where: eq(crmProjectTasks.projectId, id),
      orderBy: (tasks, { desc }) => [desc(tasks.createdAt)],
    });

    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const body = await request.json();
    const { title, description, priority, dueDate } = body;

    if (!title) return NextResponse.json({ error: "Title is required" }, { status: 400 });

    const newTask = await db.insert(crmProjectTasks).values({
      id: nanoid(),
      projectId: id,
      title,
      description,
      priority: priority || "medium",
      dueDate: dueDate ? new Date(dueDate) : null,
      status: "pending",
    }).returning();

    return NextResponse.json(newTask[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}
