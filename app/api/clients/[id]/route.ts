import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { clients } from "@/server/db/schema";
import { requireAdmin } from "@/lib/admin-guard";
import { bad, cleanImageUrl, cleanText } from "@/lib/content-validate";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin(request);
  if (!guard.ok) return guard.response;
  const { id } = await params;

  const body = await request.json().catch(() => null);
  const update: Partial<typeof clients.$inferInsert> = { updatedAt: new Date() };
  if (body?.name !== undefined) {
    const name = cleanText(body.name, 150);
    if (!name) return bad("Nama klien wajib diisi");
    update.name = name;
  }
  if (body?.logoUrl !== undefined) {
    const logoUrl = cleanImageUrl(body.logoUrl);
    if (!logoUrl) return bad("Logo wajib diupload");
    update.logoUrl = logoUrl;
  }
  if (body?.sortOrder !== undefined) {
    const n = Number(body.sortOrder);
    if (!Number.isFinite(n)) return bad("Urutan harus angka");
    update.sortOrder = Math.trunc(n);
  }
  if (body?.active !== undefined) update.active = !!body.active;

  try {
    const [row] = await db.update(clients).set(update).where(eq(clients.id, id)).returning();
    if (!row) return NextResponse.json({ error: "Klien tidak ditemukan" }, { status: 404 });
    return NextResponse.json(row);
  } catch (error) {
    console.error("Gagal mengubah klien", error);
    return NextResponse.json({ error: "Gagal menyimpan klien" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin(request);
  if (!guard.ok) return guard.response;
  const { id } = await params;
  try {
    const [row] = await db.delete(clients).where(eq(clients.id, id)).returning();
    if (!row) return NextResponse.json({ error: "Klien tidak ditemukan" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Gagal menghapus klien", error);
    return NextResponse.json({ error: "Gagal menghapus klien" }, { status: 500 });
  }
}
