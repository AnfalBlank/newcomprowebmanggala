import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { projects } from "@/server/db/schema";
import { desc, eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { nanoid } from "nanoid";

export async function GET(request: NextRequest) {
  try {
    const allProjects = await db.select().from(projects).orderBy(desc(projects.createdAt));
    return NextResponse.json(allProjects);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, category, description, client, year, imageUrl, gallery, scope } = body;

    const [newProject] = await db.insert(projects).values({
      id: nanoid(),
      title,
      category,
      description,
      client,
      year,
      imageUrl,
      gallery,
      scope,
    }).returning();

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Failed to create project", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
