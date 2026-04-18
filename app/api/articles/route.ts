import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { articles } from "@/server/db/schema";
import { desc, eq, sql, or, like } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { nanoid } from "nanoid";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const tag = searchParams.get("tag");
    const search = searchParams.get("search");
    const featured = searchParams.get("featured");
    const active = searchParams.get("active");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = (page - 1) * limit;

    let query = db.select().from(articles);

    // Only show active articles on public pages
    if (active === "true") {
      query = query.where(eq(articles.active, true));
    }

    // Filter by category
    if (category && category !== "all") {
      query = query.where(eq(articles.category, category));
    }

    // Filter featured articles
    if (featured === "true") {
      query = query.where(eq(articles.featured, true));
    }

    // Search in title and excerpt
    if (search) {
      query = query.where(
        or(
          like(articles.title, `%${search}%`),
          like(articles.excerpt, `%${search}%`)
        )
      );
    }

    // Filter by tag (requires JSON parsing)
    if (tag) {
      query = query.where(sql`${articles.tags} LIKE ${`%"${tag}"%`}`);
    }

    // Fetch articles with pagination
    const allArticles = await query
      .orderBy(desc(articles.publishedDate), desc(articles.createdAt))
      .limit(limit)
      .offset(offset);

    // Get total count for pagination
    const countQuery = db.select({ count: sql<number>`count(*)` }).from(articles);

    // Apply same filters to count query
    if (active === "true") {
      countQuery.where(eq(articles.active, true));
    }
    if (category && category !== "all") {
      countQuery.where(eq(articles.category, category));
    }
    if (featured === "true") {
      countQuery.where(eq(articles.featured, true));
    }
    if (search) {
      countQuery.where(
        or(
          like(articles.title, `%${search}%`),
          like(articles.excerpt, `%${search}%`)
        )
      );
    }
    if (tag) {
      countQuery.where(sql`${articles.tags} LIKE ${`%"${tag}"%`}`);
    }

    const totalCountResult = await countQuery;
    const totalCount = totalCountResult[0]?.count || 0;

    return NextResponse.json({
      articles: allArticles,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error("Failed to fetch articles", error);
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
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
      active = false,
      featured = false,
    } = body;

    const [newArticle] = await db.insert(articles).values({
      id: nanoid(),
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      category,
      tags: JSON.stringify(tags || []),
      author,
      publishedDate: publishedDate ? new Date(publishedDate) : new Date(),
      active,
      featured,
    }).returning();

    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    console.error("Failed to create article", error);
    return NextResponse.json({ error: "Failed to create article" }, { status: 500 });
  }
}
