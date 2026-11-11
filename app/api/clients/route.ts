import { NextRequest, NextResponse } from "next/server";
import { asc, eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { db } from "@/server/db";
import { clients } from "@/server/db/schema";
import { requireAdmin } from "@/lib/admin-guard";
import { DEFAULT_CLIENTS } from "@/lib/clients-default";
import { bad, cleanImageUrl, cleanText } from "@/lib/content-validate";

export const dynamic = "force-dynamic";

// Publik: logo klien yang tampil, urut. ?all=1 (khusus admin): semua klien termasuk yang disembunyikan.
export async function GET(request: NextRequest) {
  const all = request.nextUrl.searchParams.get("all") === "1";
  if (all) {
    const guard = await requireAdmin(request);
    if (!guard.ok) return guard.response;
    try {
      const rows = await db.select().from(clients).orderBy(asc(clients.sortOrder), asc(clients.name));
      return NextResponse.json({ clients: rows, tableReady: true });
    } catch (error) {
      console.error("Tabel clients belum siap", error);
      return NextResponse.json({ clients: [], tableReady: false });
    }
  }

  try {
    const rows = await db
      .select({ name: clients.name, logo: clients.logoUrl })
      .from(clients)
      .where(eq(clients.active, true))
      .orderBy(asc(clients.sortOrder), asc(clients.name));
    return NextResponse.json({ clients: rows, fallback: false });
  } catch {
    // Tabel belum dipasang / database gangguan: pakai daftar lama supaya web tetap sama.
    return NextResponse.json({ clients: DEFAULT_CLIENTS, fallback: true });
  }
}

export async function POST(request: NextRequest) {
  const guard = await requireAdmin(request);
  if (!guard.ok) return guard.response;

  const body = await request.json().catch(() => null);
  const name = cleanText(body?.name, 150);
  const logoUrl = cleanImageUrl(body?.logoUrl);
  if (!name) return bad("Nama klien wajib diisi");
  if (!logoUrl) return bad("Logo wajib diupload");
  const sortOrder = Number.isFinite(Number(body?.sortOrder)) ? Math.trunc(Number(body.sortOrder)) : 0;
  const active = body?.active !== false;

  try {
    const [row] = await db
      .insert(clients)
      .values({ id: nanoid(), name, logoUrl, sortOrder, active })
      .returning();
    return NextResponse.json(row, { status: 201 });
  } catch (error) {
    console.error("Gagal menambah klien", error);
    return NextResponse.json({ error: "Gagal menyimpan. Tabel klien mungkin belum dipasang." }, { status: 500 });
  }
}
