import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { crmProjectTasks } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string, taskId: string }> }
) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { taskId } = await params;
    const body = await request.json();
    const { status, progress } = body;

    const updatedTask = await db.update(crmProjectTasks)
      .set({ 
        status: status,
        updatedAt: new Date()
      })
      .where(eq(crmProjectTasks.id, taskId))
      .returning();

    return NextResponse.json(updatedTask[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string, taskId: string }> }
) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { taskId } = await params;
    await db.delete(crmProjectTasks).where(eq(crmProjectTasks.id, taskId));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
  }
}
