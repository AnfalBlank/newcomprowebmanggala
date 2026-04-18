import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { inquiries } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { sendEmail } from "@/lib/email";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { message, subject } = body;

    // 1. Get inquiry details
    const inquiry = await db.query.inquiries.findFirst({
      where: eq(inquiries.id, id),
    });

    if (!inquiry) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    // 2. Send Email to client
    await sendEmail({
      to: inquiry.email,
      subject: subject || `Re: ${inquiry.subject || 'Inquiry Manggala Utama'}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
          <div style="background: #0044cc; color: white; padding: 20px; border-radius: 10px 10px 0 0;">
            <h2 style="margin: 0;">Manggala Utama Indonesia</h2>
          </div>
          <div style="padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
            <p>Halo <strong>${inquiry.name}</strong>,</p>
            <p>Terima kasih telah menghubungi kami. Berikut adalah balasan untuk pertanyaan Anda:</p>
            
            <div style="background: #f9f9f9; padding: 20px; border-left: 4px solid #0044cc; margin: 20px 0;">
              ${message.replace(/\n/g, '<br>')}
            </div>

            <p>Jika ada hal lain yang ingin ditanyakan, jangan ragu untuk membalas email ini.</p>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            
            <div style="font-size: 12px; color: #777;">
              <p>Salam hangat,<br><strong>Admin Manggala Utama Indonesia</strong></p>
              <p>Website: <a href="https://manggalautamaindonesia.co.id" style="color: #0044cc;">manggalautamaindonesia.co.id</a></p>
            </div>
          </div>
        </div>
      `
    });

    // 3. Update status to 'replied'
    await db.update(inquiries)
      .set({ status: 'replied' })
      .where(eq(inquiries.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send reply:", error);
    return NextResponse.json({ error: "Failed to send reply" }, { status: 500 });
  }
}
