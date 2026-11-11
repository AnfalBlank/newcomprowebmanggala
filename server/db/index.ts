import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client/web";
import type { Client } from "@libsql/client";
import * as schema from "./schema";

// Initialize Turso database connection using environment variables
// The TURSO_DATABASE_URL and TURSO_AUTH_TOKEN are provided at runtime
const url = process.env.TURSO_DATABASE_URL!;

// URL "file:..." hanya untuk tes lokal dengan database file (client web tidak bisa membuka file).
// Di server, URL Turso (libsql:// / https://) tetap memakai client web seperti sebelumnya.
const turso: Client = url?.startsWith("file:")
  ? // eslint-disable-next-line @typescript-eslint/no-require-imports
    (require("@libsql/client") as typeof import("@libsql/client")).createClient({ url })
  : (createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN }) as unknown as Client);

// Export the drizzle instance for use throughout the application
export const db = drizzle(turso, { schema });

export type Database = typeof db;
