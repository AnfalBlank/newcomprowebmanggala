import { db } from "@/server/db";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 1. Drop existing tables to ensure a clean slate
    const tables = ["session", "account", "verification", "user", "projects", "products", "inquiries", "resources"];
    for (const table of tables) {
      await db.run(sql`DROP TABLE IF EXISTS ${sql.raw(table)}`);
    }

    // 2. Create tables with snake_case names (Standard for Better Auth and Yapi tool)
    // We add DEFAULT values for createdAt/updatedAt to handle Yapi's tool if it omits them
    const now = sql`(strftime('%s', 'now') * 1000)`;

    // User Table
    await db.run(sql`
      CREATE TABLE user (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        email_verified INTEGER DEFAULT 0,
        image TEXT,
        role TEXT DEFAULT 'user',
        banned INTEGER DEFAULT 0,
        ban_reason TEXT,
        ban_expires INTEGER,
        created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now') * 1000),
        updated_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now') * 1000)
      )
    `);

    // Account Table
    await db.run(sql`
      CREATE TABLE account (
        id TEXT PRIMARY KEY,
        account_id TEXT NOT NULL,
        provider_id TEXT NOT NULL,
        user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
        access_token TEXT,
        refresh_token TEXT,
        id_token TEXT,
        access_token_expires_at INTEGER,
        refresh_token_expires_at INTEGER,
        scope TEXT,
        password TEXT,
        created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now') * 1000),
        updated_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now') * 1000)
      )
    `);

    // Session Table
    await db.run(sql`
      CREATE TABLE session (
        id TEXT PRIMARY KEY,
        expires_at INTEGER NOT NULL,
        token TEXT NOT NULL UNIQUE,
        created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now') * 1000),
        updated_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now') * 1000),
        ip_address TEXT,
        user_agent TEXT,
        user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
        impersonated_by TEXT
      )
    `);

    // Verification Table
    await db.run(sql`
      CREATE TABLE verification (
        id TEXT PRIMARY KEY,
        identifier TEXT NOT NULL,
        value TEXT NOT NULL,
        expires_at INTEGER NOT NULL,
        created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now') * 1000),
        updated_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now') * 1000)
      )
    `);

    // Projects Table
    await db.run(sql`
      CREATE TABLE projects (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        description TEXT NOT NULL,
        client TEXT,
        year TEXT,
        image_url TEXT,
        scope TEXT,
        created_at INTEGER DEFAULT (strftime('%s', 'now') * 1000),
        updated_at INTEGER DEFAULT (strftime('%s', 'now') * 1000)
      )
    `);

    // Products Table
    await db.run(sql`
      CREATE TABLE products (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        description TEXT NOT NULL,
        features TEXT,
        image_url TEXT,
        area TEXT,
        created_at INTEGER DEFAULT (strftime('%s', 'now') * 1000),
        updated_at INTEGER DEFAULT (strftime('%s', 'now') * 1000)
      )
    `);

    // Inquiries Table
    await db.run(sql`
      CREATE TABLE inquiries (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        company TEXT,
        subject TEXT,
        message TEXT NOT NULL,
        status TEXT DEFAULT 'new',
        created_at INTEGER DEFAULT (strftime('%s', 'now') * 1000)
      )
    `);

    // Resources Table
    await db.run(sql`
      CREATE TABLE resources (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        type TEXT NOT NULL,
        category TEXT NOT NULL,
        file_url TEXT NOT NULL,
        created_at INTEGER DEFAULT (strftime('%s', 'now') * 1000),
        updated_at INTEGER DEFAULT (strftime('%s', 'now') * 1000)
      )
    `);

    return NextResponse.json({
      success: true,
      message: "Database tables RECREATED with standard snake_case columns. You can now use 'Create Admin User' in the Database tab."
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
