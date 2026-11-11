// Pemeriksaan isian admin (produk, proyek, klien) sebelum disimpan.

export function cleanText(v: unknown, max: number): string | null {
  if (v === undefined || v === null) return null;
  const s = String(v).trim();
  if (!s) return null;
  return s.slice(0, max);
}

/** Alamat foto yang boleh disimpan: hasil upload (/media/...), file di /public (/partners/...), atau https. */
export function cleanImageUrl(v: unknown): string | null {
  const s = cleanText(v, 1000);
  if (!s) return null;
  if (/^\/(media|partners)\/[A-Za-z0-9._-]+$/.test(s) && !s.includes("..")) return s;
  if (/^\/[A-Za-z0-9._-]+\.(png|jpe?g|webp|svg)$/i.test(s)) return s;
  try {
    const u = new URL(s);
    if (u.protocol === "https:") return u.toString();
  } catch {}
  return null;
}

export function cleanGallery(v: unknown): string | null {
  let list: unknown = v;
  if (typeof v === "string") {
    try {
      list = JSON.parse(v);
    } catch {
      list = [];
    }
  }
  if (!Array.isArray(list)) return null;
  const urls = list.map(cleanImageUrl).filter((u): u is string => !!u).slice(0, 40);
  return urls.length ? JSON.stringify(urls) : null;
}

export function bad(message: string) {
  return Response.json({ error: message }, { status: 400 });
}

export function readProductBody(body: any) {
  const name = cleanText(body?.name, 200);
  const category = cleanText(body?.category, 60)?.toLowerCase().replace(/\s+/g, "_") ?? null;
  const description = cleanText(body?.description, 3000);
  if (!name) return { error: "Nama produk wajib diisi" } as const;
  if (!category) return { error: "Kategori wajib diisi" } as const;
  if (!description) return { error: "Deskripsi wajib diisi" } as const;
  const imageRaw = cleanText(body?.imageUrl, 1000);
  const imageUrl = cleanImageUrl(imageRaw);
  if (imageRaw && !imageUrl) return { error: "Alamat foto tidak valid" } as const;
  return {
    data: {
      name,
      category,
      description,
      features: cleanText(body?.features, 2000),
      area: cleanText(body?.area, 500),
      imageUrl,
    },
  } as const;
}

export function readProjectBody(body: any) {
  const title = cleanText(body?.title, 200);
  const category = cleanText(body?.category, 80);
  const description = cleanText(body?.description, 5000);
  if (!title) return { error: "Judul proyek wajib diisi" } as const;
  if (!category) return { error: "Kategori wajib diisi" } as const;
  if (!description) return { error: "Deskripsi wajib diisi" } as const;
  const imageRaw = cleanText(body?.imageUrl, 1000);
  const imageUrl = cleanImageUrl(imageRaw);
  if (imageRaw && !imageUrl) return { error: "Alamat foto utama tidak valid" } as const;
  const year = cleanText(body?.year, 10);
  if (year && !/^\d{4}$/.test(year)) return { error: "Tahun harus 4 angka, mis. 2025" } as const;
  return {
    data: {
      title,
      category,
      description,
      client: cleanText(body?.client, 200),
      year,
      imageUrl,
      gallery: cleanGallery(body?.gallery),
      scope: cleanText(body?.scope, 1000),
    },
  } as const;
}
