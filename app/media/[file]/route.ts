import { NextRequest, NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { UPLOAD_DIR, SAFE_NAME, MIME_BY_EXT } from "@/lib/uploads";

export const runtime = "nodejs";

// Menyajikan foto hasil upload admin dari UPLOAD_DIR.
export async function GET(_request: NextRequest, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  if (!SAFE_NAME.test(file)) {
    return new NextResponse("Not found", { status: 404 });
  }
  const ext = file.split(".").pop() as string;
  try {
    const data = await readFile(path.join(UPLOAD_DIR, file));
    return new NextResponse(new Uint8Array(data), {
      headers: {
        "Content-Type": MIME_BY_EXT[ext],
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
