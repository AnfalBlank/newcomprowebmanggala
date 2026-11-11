import path from "node:path";

// Folder penyimpanan foto upload admin. Di server, pakai folder yang tidak ikut terhapus saat deploy.
export const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(process.cwd(), "uploads");

export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5 MB

export const MIME_BY_EXT: Record<string, string> = {
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

// Nama file buatan server: huruf kecil/angka/strip + ekstensi gambar. Tidak ada garis miring atau "..".
export const SAFE_NAME = /^[a-z0-9-]{8,80}\.(jpg|png|webp)$/;

/** Kenali jenis gambar dari isi file, bukan dari nama atau tipe yang dikirim browser. */
export function detectImageType(buf: Uint8Array): "jpg" | "png" | "webp" | null {
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "jpg";
  if (
    buf.length >= 8 &&
    buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47 &&
    buf[4] === 0x0d && buf[5] === 0x0a && buf[6] === 0x1a && buf[7] === 0x0a
  ) return "png";
  if (
    buf.length >= 12 &&
    buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46 &&
    buf[8] === 0x57 && buf[9] === 0x45 && buf[10] === 0x42 && buf[11] === 0x50
  ) return "webp";
  return null;
}
