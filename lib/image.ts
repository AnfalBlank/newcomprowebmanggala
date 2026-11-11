// next/image hanya bisa mengoptimasi foto dari web sendiri dan host yang terdaftar di next.config.ts.
// Foto dari alamat lain tetap ditampilkan, tapi tanpa optimasi, supaya halaman tidak error.
const OPTIMIZABLE_HOSTS = ["images.unsplash.com", "files.useyapi.com"];

export function needsUnoptimized(src?: string | null): boolean {
  if (!src) return false;
  if (src.startsWith("/")) return false;
  try {
    return !OPTIMIZABLE_HOSTS.includes(new URL(src).hostname);
  } catch {
    return true;
  }
}

export function parseGallery(v: unknown): string[] {
  if (Array.isArray(v)) return v.filter((x): x is string => typeof x === "string");
  if (typeof v === "string" && v.trim()) {
    try {
      const parsed = JSON.parse(v);
      return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : [];
    } catch {
      return [];
    }
  }
  return [];
}
