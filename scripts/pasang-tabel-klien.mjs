// Menjalankan drizzle/migrations/0001_clients.sql ke database yang ada di TURSO_DATABASE_URL.
// Hanya membuat tabel `clients` (kalau belum ada) dan mengisi 6 klien awal (kalau belum ada).
// Tidak mengubah atau menghapus tabel lain. Aman dijalankan lebih dari sekali.
//
// Pakai:  node --env-file=.env.local scripts/pasang-tabel-klien.mjs
//   (ganti .env.local dengan file env yang dipakai web di server)
import { readFile } from "node:fs/promises";
import { createClient } from "@libsql/client";

const url = process.env.TURSO_DATABASE_URL;
if (!url) {
  console.error("TURSO_DATABASE_URL belum diisi.");
  process.exit(1);
}

const sqlText = await readFile(new URL("../drizzle/migrations/0001_clients.sql", import.meta.url), "utf8");
const statements = sqlText
  .split("--> statement-breakpoint")
  .map((s) => s.replace(/^\s*--.*$/gm, "").trim())
  .filter(Boolean);

const db = createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN });
for (const stmt of statements) {
  await db.execute(stmt);
}
const { rows } = await db.execute("SELECT COUNT(*) AS n FROM clients");
console.log(`Selesai. Tabel clients berisi ${rows[0].n} klien.`);
