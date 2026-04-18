import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { crmVendors } from "@/server/db/schema";
import { auth } from "@/lib/auth";
import { nanoid } from "nanoid";
import { eq, desc } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const vendors = await db.select().from(crmVendors).orderBy(desc(crmVendors.createdAt));
  return NextResponse.json(vendors);
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const id = nanoid();

  const [newVendor] = await db.insert(crmVendors).values({
    id,
    name: body.name,
    category: body.category,
    contactPerson: body.contactPerson,
    email: body.email,
    phone: body.phone,
    address: body.address,
    rating: parseInt(body.rating) || 0,
  }).returning();

  return NextResponse.json(newVendor);
}
