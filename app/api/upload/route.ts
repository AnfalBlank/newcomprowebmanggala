import { NextRequest, NextResponse } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { requireAdmin } from "@/lib/admin-guard";
import { UPLOAD_DIR, MAX_UPLOAD_BYTES, detectImageType } from "@/lib/uploads";

export const runtime = "nodejs";

const MAX_FILES = 10;

/**
 * Upload foto (khusus admin). Body: multipart/form-data, field "files" (boleh lebih dari satu).
 * Hanya JPG/PNG/WEBP, maksimal 5 MB per file. Nama file dibuat server, nama asli tidak dipakai.
 * Balasan: { urls: ["/media/<nama>.jpg", ...] }
 */
export async function POST(request: NextRequest) {
  const guard = await requireAdmin(request);
  if (!guard.ok) return guard.response;

  const declared = Number(request.headers.get("content-length") || 0);
  if (declared > MAX_UPLOAD_BYTES * MAX_FILES + 64 * 1024) {
    return NextResponse.json({ error: "Ukuran upload terlalu besar" }, { status: 413 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Format upload tidak dikenali" }, { status: 400 });
  }

  const files = form.getAll("files").filter((f): f is File => typeof f !== "string");
  if (files.length === 0) {
    return NextResponse.json({ error: "Tidak ada file yang dikirim" }, { status: 400 });
  }
  if (files.length > MAX_FILES) {
    return NextResponse.json({ error: `Maksimal ${MAX_FILES} foto sekali upload` }, { status: 400 });
  }

  const checked: { buf: Buffer; ext: string }[] = [];
  for (const file of files) {
    if (file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json({ error: `"${file.name}" lebih dari 5 MB` }, { status: 413 });
    }
    const buf = Buffer.from(await file.arrayBuffer());
    const ext = detectImageType(buf);
    if (!ext) {
      return NextResponse.json({ error: `"${file.name}" bukan foto JPG, PNG, atau WEBP` }, { status: 415 });
    }
    checked.push({ buf, ext });
  }

  await mkdir(UPLOAD_DIR, { recursive: true });
  const urls: string[] = [];
  for (const { buf, ext } of checked) {
    const name = `${Date.now().toString(36)}-${randomBytes(8).toString("hex")}.${ext}`;
    await writeFile(path.join(UPLOAD_DIR, name), buf, { flag: "wx" });
    urls.push(`/media/${name}`);
  }

  return NextResponse.json({ urls }, { status: 201 });
}
