import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { resources } from "@/server/db/schema";
import { desc, eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { nanoid } from "nanoid";

export async function GET(request: NextRequest) {
  try {
    const allResources = await db.select().from(resources).orderBy(desc(resources.createdAt));
    return NextResponse.json(allResources);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch resources" }, { status: 500 });
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
    const { title, type, category, fileUrl } = body;

    const [newResource] = await db.insert(resources).values({
      id: nanoid(),
      title,
      type,
      category,
      fileUrl,
    }).returning();

    return NextResponse.json(newResource, { status: 201 });
  } catch (error) {
    console.error("Failed to create resource", error);
    return NextResponse.json({ error: "Failed to create resource" }, { status: 500 });
  }
}
