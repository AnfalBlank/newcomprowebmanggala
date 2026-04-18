import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { products } from "@/server/db/schema";
import { desc, eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { nanoid } from "nanoid";

export async function GET(request: NextRequest) {
  try {
    const allProducts = await db.select().from(products).orderBy(desc(products.createdAt));
    return NextResponse.json(allProducts);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
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
    const { name, category, description, features, imageUrl, area } = body;

    const [newProduct] = await db.insert(products).values({
      id: nanoid(),
      name,
      category,
      description,
      features,
      imageUrl,
      area,
    }).returning();

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Failed to create product", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
