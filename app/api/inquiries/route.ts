import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { inquiries } from "@/server/db/schema";
import { desc, eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { nanoid } from "nanoid";
import { sendWhatsAppNotification } from "@/lib/whatsapp";
import { sendEmail } from "@/lib/email";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const allInquiries = await db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
    return NextResponse.json(allInquiries);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 });
  }
}

const escapeHtml = (v: unknown) =>
  String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, subject, message } = body;

    if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string" || !name.trim() || !email.trim() || !message.trim()) {
      return NextResponse.json({ error: "Nama, email, dan pesan wajib diisi" }, { status: 400 });
    }
    if (name.length > 200 || email.length > 200 || message.length > 5000 || String(subject ?? "").length > 300 || String(company ?? "").length > 200 || String(phone ?? "").length > 50) {
      return NextResponse.json({ error: "Isian terlalu panjang" }, { status: 400 });
    }

    const [newInquiry] = await db.insert(inquiries).values({
      id: nanoid(),
      name,
      email,
      phone,
      company,
      subject,
      message,
    }).returning();

    // Automatic Notifications
    const adminPhone = "+6285157938871"; // Your phone number
    const notificationMessage = `🔔 *New Inquiry Received!*
    
*Name:* ${name}
*Email:* ${email}
*Phone:* ${phone || '-'}
*Company:* ${company || '-'}
*Subject:* ${subject || 'General Inquiry'}

*Message:*
${message}

---
Manage this inquiry in your admin dashboard.`;

    // Send WhatsApp (Async)
    void sendWhatsAppNotification(adminPhone, notificationMessage);

    // Send Email notification to admin (Async)
    // Jangan pernah kirim ke email pengisi form (bisa dipakai buat spam lewat server kita).
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) void sendEmail({
      to: adminEmail,
      subject: `[INQUIRY] ${subject || 'New Message from Website'}`,
      html: `
        <h2>Pesan Baru dari Website</h2>
        <p><strong>Nama:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Telepon:</strong> ${escapeHtml(phone || '-')}</p>
        <p><strong>Perusahaan:</strong> ${escapeHtml(company || '-')}</p>
        <p><strong>Subjek:</strong> ${escapeHtml(subject || '-')}</p>
        <p><strong>Pesan:</strong></p>
        <div style="background: #f4f4f4; padding: 15px; border-radius: 5px;">
          ${escapeHtml(message).replace(/\n/g, '<br>')}
        </div>
      `
    }).catch(e => console.error("Admin Email notification failed", e));

    return NextResponse.json(newInquiry, { status: 201 });
  } catch (error) {
    console.error("Failed to submit inquiry", error);
    return NextResponse.json({ error: "Failed to submit inquiry" }, { status: 500 });
  }
}
