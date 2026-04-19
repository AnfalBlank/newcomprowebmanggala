import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { faqs } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const [faq] = await db.select().from(faqs).where(eq(faqs.id, id));

    if (!faq) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
    }

    return NextResponse.json(faq);
  } catch (error) {
    console.error("Failed to fetch FAQ", error);
    return NextResponse.json({ error: "Failed to fetch FAQ" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // const session = await auth.api.getSession({
    //   headers: request.headers,
    // });

    // if (!session?.user || session.user.role !== "admin") {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const { id } = await params;
    const body = await request.json();
    const { question, answer, category, order, active } = body;

    const [updatedFaq] = await db
      .update(faqs)
      .set({
        question,
        answer,
        category,
        order,
        active,
      })
      .where(eq(faqs.id, id))
      .returning();

    if (!updatedFaq) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
    }

    return NextResponse.json(updatedFaq);
  } catch (error) {
    console.error("Failed to update FAQ", error);
    return NextResponse.json({ error: "Failed to update FAQ" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // const session = await auth.api.getSession({
    //   headers: request.headers,
    // });

    // if (!session?.user || session.user.role !== "admin") {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const { id } = await params;
    const [deletedFaq] = await db
      .delete(faqs)
      .where(eq(faqs.id, id))
      .returning();

    if (!deletedFaq) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "FAQ deleted successfully" });
  } catch (error) {
    console.error("Failed to delete FAQ", error);
    return NextResponse.json({ error: "Failed to delete FAQ" }, { status: 500 });
  }
}
