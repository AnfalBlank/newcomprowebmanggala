import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { projects } from "@/server/db/schema";
import { desc } from "drizzle-orm";
import { nanoid } from "nanoid";
import { requireAdmin } from "@/lib/admin-guard";
import { bad, readProjectBody } from "@/lib/content-validate";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const allProjects = await db.select().from(projects).orderBy(desc(projects.createdAt));
    return NextResponse.json(allProjects);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const guard = await requireAdmin(request);
  if (!guard.ok) return guard.response;

  try {
    const body = await request.json().catch(() => null);
    const parsed = readProjectBody(body);
    if ("error" in parsed) return bad(parsed.error as string);

    const [newProject] = await db
      .insert(projects)
      .values({ id: nanoid(), ...parsed.data, createdAt: new Date(), updatedAt: new Date() })
      .returning();

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Failed to create project", error);
    return NextResponse.json({ error: "Gagal menyimpan proyek" }, { status: 500 });
  }
}
