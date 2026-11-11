import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { articles } from "@/server/db/schema";
import { and, desc, eq, sql, or, like, type SQL } from "drizzle-orm";
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

    // Draft (belum terbit) cuma boleh dilihat admin. Pengunjung selalu dapat artikel aktif saja.
    const session = await auth.api.getSession({ headers: request.headers }).catch(() => null);
    const isAdmin = session?.user?.role === "admin";

    const conditions: SQL[] = [];
    if (active === "true" || !isAdmin) {
      conditions.push(eq(articles.active, true));
    }
    if (category && category !== "all") {
      conditions.push(eq(articles.category, category));
    }
    if (featured === "true") {
      conditions.push(eq(articles.featured, true));
    }
    if (search) {
      conditions.push(
        or(
          like(articles.title, `%${search}%`),
          like(articles.excerpt, `%${search}%`)
        )!
      );
    }
    if (tag) {
      conditions.push(sql`${articles.tags} LIKE ${`%"${tag}"%`}`);
    }
    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const allArticles = await db
      .select()
      .from(articles)
      .where(where)
      .orderBy(desc(articles.publishedDate), desc(articles.createdAt))
      .limit(limit)
      .offset(offset);

    const countQuery = db.select({ count: sql<number>`count(*)` }).from(articles).where(where);

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
