import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { faqs } from "@/server/db/schema";
import { desc, eq, asc } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { nanoid } from "nanoid";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const active = searchParams.get("active");

    let query = db.select().from(faqs);

    // Filter by category if provided
    if (category && category !== "all") {
      query = query.where(eq(faqs.category, category));
    }

    // Filter by active status (only show active FAQs by default on public pages)
    if (active === "true") {
      query = query.where(eq(faqs.active, true));
    }

    const allFaqs = await query.orderBy(asc(faqs.order), desc(faqs.createdAt));
    return NextResponse.json(allFaqs);
  } catch (error) {
    console.error("Failed to fetch FAQs", error);
    return NextResponse.json({ error: "Failed to fetch FAQs" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // const session = await auth.api.getSession({
    //   headers: request.headers,
    // });

    // if (!session?.user || session.user.role !== "admin") {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const body = await request.json();
    const { question, answer, category, order = 0, active = true } = body;

    const [newFaq] = await db.insert(faqs).values({
      id: nanoid(),
      question,
      answer,
      category,
      order,
      active,
    }).returning();

    return NextResponse.json(newFaq, { status: 201 });
  } catch (error) {
    console.error("Failed to create FAQ", error);
    return NextResponse.json({ error: "Failed to create FAQ" }, { status: 500 });
  }
}
