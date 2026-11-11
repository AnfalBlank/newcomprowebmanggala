import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { products } from "@/server/db/schema";
import { desc } from "drizzle-orm";
import { nanoid } from "nanoid";
import { requireAdmin } from "@/lib/admin-guard";
import { bad, readProductBody } from "@/lib/content-validate";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const allProducts = await db.select().from(products).orderBy(desc(products.createdAt));
    return NextResponse.json(allProducts);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const guard = await requireAdmin(request);
  if (!guard.ok) return guard.response;

  try {
    const body = await request.json().catch(() => null);
    const parsed = readProductBody(body);
    if ("error" in parsed) return bad(parsed.error as string);

    const [newProduct] = await db
      .insert(products)
      .values({ id: nanoid(), ...parsed.data, createdAt: new Date(), updatedAt: new Date() })
      .returning();

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Failed to create product", error);
    return NextResponse.json({ error: "Gagal menyimpan produk" }, { status: 500 });
  }
}
