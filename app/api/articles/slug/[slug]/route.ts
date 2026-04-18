import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { articles } from "@/server/db/schema";
import { eq, sql } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const [article] = await db
      .select()
      .from(articles)
      .where(eq(articles.slug, slug));

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // Increment view count
    await db
      .update(articles)
      .set({ viewCount: sql<number>`${articles.viewCount} + 1` })
      .where(eq(articles.slug, slug));

    return NextResponse.json({ ...article, viewCount: (article.viewCount || 0) + 1 });
  } catch (error) {
    console.error("Failed to fetch article", error);
    return NextResponse.json({ error: "Failed to fetch article" }, { status: 500 });
  }
}
