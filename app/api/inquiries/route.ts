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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, subject, message } = body;

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
    const adminEmail = process.env.ADMIN_EMAIL || email; // Fallback to submitter email for testing or env
    void sendEmail({
      to: adminEmail,
      subject: `[INQUIRY] ${subject || 'New Message from Website'}`,
      html: `
        <h2>Pesan Baru dari Website</h2>
        <p><strong>Nama:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telepon:</strong> ${phone || '-'}</p>
        <p><strong>Perusahaan:</strong> ${company || '-'}</p>
        <p><strong>Subjek:</strong> ${subject || '-'}</p>
        <p><strong>Pesan:</strong></p>
        <div style="background: #f4f4f4; padding: 15px; border-radius: 5px;">
          ${message.replace(/\n/g, '<br>')}
        </div>
      `
    }).catch(e => console.error("Admin Email notification failed", e));

    return NextResponse.json(newInquiry, { status: 201 });
  } catch (error) {
    console.error("Failed to submit inquiry", error);
    return NextResponse.json({ error: "Failed to submit inquiry" }, { status: 500 });
  }
}
