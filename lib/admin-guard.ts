import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

/**
 * Pastikan request datang dari admin yang sedang login.
 * Hasil `ok: false` sudah membawa response 401/403 yang tinggal dikembalikan.
 */
export async function requireAdmin(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers }).catch(() => null);
  if (!session?.user) {
    return { ok: false as const, response: NextResponse.json({ error: "Harus login sebagai admin" }, { status: 401 }) };
  }
  if (session.user.role !== "admin") {
    return { ok: false as const, response: NextResponse.json({ error: "Khusus admin" }, { status: 403 }) };
  }
  return { ok: true as const, session };
}
