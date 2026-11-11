-- Tabel baru untuk logo klien "Trusted by". Aman dijalankan berulang: tidak mengubah atau menghapus tabel lain.
CREATE TABLE IF NOT EXISTS `clients` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`logo_url` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`active` integer DEFAULT true NOT NULL,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
-- Isi awal: 6 klien yang sudah tampil di web sebelum fitur ini dipasang.
INSERT OR IGNORE INTO `clients` (`id`, `name`, `logo_url`, `sort_order`, `active`, `created_at`, `updated_at`) VALUES
	('klien-pertamina', 'PERTAMINA', '/partners/pertamina-partner.png', 1, 1, CAST(strftime('%s','now') AS INTEGER), CAST(strftime('%s','now') AS INTEGER)),
	('klien-pelindo', 'PELINDO INDONESIA', '/partners/pelindo-indonesia-partner.png', 2, 1, CAST(strftime('%s','now') AS INTEGER), CAST(strftime('%s','now') AS INTEGER)),
	('klien-pln', 'PLN Persero', '/partners/pln-persero-partner.png', 3, 1, CAST(strftime('%s','now') AS INTEGER), CAST(strftime('%s','now') AS INTEGER)),
	('klien-prasaad', 'PT Prasaad Seeds Indonesia', '/partners/pt-prasaad-seeds-indonesia-partner.png', 4, 1, CAST(strftime('%s','now') AS INTEGER), CAST(strftime('%s','now') AS INTEGER)),
	('klien-pura-barutama', 'PT Pura Barutama', '/partners/purabarutama-partner.png', 5, 1, CAST(strftime('%s','now') AS INTEGER), CAST(strftime('%s','now') AS INTEGER)),
	('klien-rsup-persahabatan', 'RSUP PERSAHABATAN', '/partners/rsup-persahabatan-partner.png', 6, 1, CAST(strftime('%s','now') AS INTEGER), CAST(strftime('%s','now') AS INTEGER));
