import { db } from "@/server/db";
import { user, account } from "@/server/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await db.select().from(user);
    const accounts = await db.select().from(account);
    
    // Sanitize output (don't show passwords)
    const sanitizedUsers = users.map(u => ({
      id: u.id,
      email: u.email,
      role: u.role,
      name: u.name
    }));
    
    const sanitizedAccounts = accounts.map(a => ({
      id: a.id,
      userId: a.userId,
      providerId: a.providerId,
      hasPassword: !!a.password
    }));

    return NextResponse.json({
      users: sanitizedUsers,
      accounts: sanitizedAccounts,
      schemaCheck: "Debug completed"
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
