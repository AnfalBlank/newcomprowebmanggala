// Daftar logo klien bawaan. Dipakai kalau tabel `clients` belum dipasang atau database sedang gangguan,
// supaya bagian "Trusted by" tetap tampil seperti sebelumnya.
export type ClientLogo = { name: string; logo: string };

export const DEFAULT_CLIENTS: ClientLogo[] = [
  { name: "PERTAMINA", logo: "/partners/pertamina-partner.png" },
  { name: "PELINDO INDONESIA", logo: "/partners/pelindo-indonesia-partner.png" },
  { name: "PLN Persero", logo: "/partners/pln-persero-partner.png" },
  { name: "PT Prasaad Seeds Indonesia", logo: "/partners/pt-prasaad-seeds-indonesia-partner.png" },
  { name: "PT Pura Barutama", logo: "/partners/purabarutama-partner.png" },
  { name: "RSUP PERSAHABATAN", logo: "/partners/rsup-persahabatan-partner.png" },
];
