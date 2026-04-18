import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/server/db';
import { crmReminders, crmLeads } from '@/server/db/schema';
import { eq, lte, and } from 'drizzle-orm';
import { sendWhatsAppMessage } from '@/lib/whatsapp';

export async function GET(request: NextRequest) {
  // Simple check for due reminders
  const now = new Date();
  
  try {
    const dueReminders = await db.query.crmReminders.findMany({
      where: and(
        lte(crmReminders.remindAt, now),
        eq(crmReminders.isSent, false)
      ),
      with: {
        lead: true
      }
    });

    let sentCount = 0;
    for (const reminder of dueReminders) {
      if (reminder.lead?.picPhone) {
        const message = `PENGINGAT FOLLOW-UP:\n\nProyek: ${reminder.lead.projectName}\nPesan: ${reminder.message}\n\nMohon segera ditindaklanjuti.`;
        await sendWhatsAppMessage(reminder.lead.picPhone, message);
        
        await db.update(crmReminders)
          .set({ isSent: true })
          .where(eq(crmReminders.id, reminder.id));
        
        sentCount++;
      }
    }

    return NextResponse.json({ success: true, sent: sentCount });
  } catch (error) {
    console.error('Reminder cron failed', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
