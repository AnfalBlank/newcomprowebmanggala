import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { articles } from "@/server/db/schema";
import { eq, sql } from "drizzle-orm";
import { auth } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const [article] = await db.select().from(articles).where(eq(articles.id, id));

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // Increment view count
    await db
      .update(articles)
      .set({ viewCount: sql<number>`${articles.viewCount} + 1` })
      .where(eq(articles.id, id));

    return NextResponse.json({ ...article, viewCount: (article.viewCount || 0) + 1 });
  } catch (error) {
    console.error("Failed to fetch article", error);
    return NextResponse.json({ error: "Failed to fetch article" }, { status: 500 });
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
    const {
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      category,
      tags,
      author,
      publishedDate,
      active,
      featured,
    } = body;

    const [updatedArticle] = await db
      .update(articles)
      .set({
        title,
        slug,
        excerpt,
        content,
        featuredImage,
        category,
        tags: JSON.stringify(tags || []),
        author,
        publishedDate: publishedDate ? new Date(publishedDate) : undefined,
        active,
        featured,
      })
      .where(eq(articles.id, id))
      .returning();

    if (!updatedArticle) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json(updatedArticle);
  } catch (error) {
    console.error("Failed to update article", error);
    return NextResponse.json({ error: "Failed to update article" }, { status: 500 });
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
    const [deletedArticle] = await db
      .delete(articles)
      .where(eq(articles.id, id))
      .returning();

    if (!deletedArticle) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Article deleted successfully" });
  } catch (error) {
    console.error("Failed to delete article", error);
    return NextResponse.json({ error: "Failed to delete article" }, { status: 500 });
  }
}
