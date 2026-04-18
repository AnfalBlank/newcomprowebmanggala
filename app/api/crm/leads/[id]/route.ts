import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { crmLeads, crmProjects } from "@/server/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { sendWhatsAppMessage } from "@/lib/whatsapp";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();

  // Get current lead data to check previous status
  const currentLead = await db.query.crmLeads.findFirst({
    where: eq(crmLeads.id, id),
  });

  if (!currentLead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  const updateData: any = {
    updatedAt: new Date(),
  };

  if (body.projectName !== undefined) updateData.projectName = body.projectName;
  if (body.clientName !== undefined) updateData.clientName = body.clientName;
  if (body.picClient !== undefined) updateData.picClient = body.picClient;
  if (body.picPhone !== undefined) updateData.picPhone = body.picPhone;
  if (body.picEmail !== undefined) updateData.picEmail = body.picEmail;
  if (body.quotedValue !== undefined) updateData.quotedValue = parseInt(body.quotedValue);
  if (body.quotedItems !== undefined) updateData.quotedItems = typeof body.quotedItems === 'string' ? body.quotedItems : JSON.stringify(body.quotedItems);
  if (body.estimatedCost !== undefined) updateData.estimatedCost = parseInt(body.estimatedCost);
  if (body.estimatedCostItems !== undefined) updateData.estimatedCostItems = typeof body.estimatedCostItems === 'string' ? body.estimatedCostItems : JSON.stringify(body.estimatedCostItems);
  if (body.estimatedProfit !== undefined) updateData.estimatedProfit = parseInt(body.estimatedProfit);
  if (body.closingDeadline !== undefined) updateData.closingDeadline = body.closingDeadline ? new Date(body.closingDeadline) : null;
  if (body.status !== undefined) updateData.status = body.status;
  if (body.notes !== undefined) updateData.notes = body.notes;
  if (body.proposalUrl !== undefined) updateData.proposalUrl = body.proposalUrl;
  if (body.inquiryUrl !== undefined) updateData.inquiryUrl = body.inquiryUrl;
  if (body.poUrl !== undefined) updateData.poUrl = body.poUrl;

  const [updatedLead] = await db
    .update(crmLeads)
    .set(updateData)
    .where(eq(crmLeads.id, id))
    .returning();

  // Auto-convert to project if status changed to po_spk
  if (body.status === "po_spk" && currentLead.status !== "po_spk") {
    // Check if project already exists for this lead
    const existingProject = await db.query.crmProjects.findFirst({
      where: eq(crmProjects.leadId, id),
    });

    if (!existingProject) {
      await db.insert(crmProjects).values({
        id: nanoid(),
        leadId: id,
        name: updatedLead.projectName,
        clientName: updatedLead.clientName,
        picClient: updatedLead.picClient,
        picPhone: updatedLead.picPhone,
        type: "pengadaan", // Default, user can change later
        status: "on_going",
        contractValue: updatedLead.quotedValue,
        startDate: new Date(),
      });

      // Send WA notification to client
      if (updatedLead.picPhone) {
        await sendWhatsAppMessage(
          updatedLead.picPhone,
          `Halo ${updatedLead.picClient}, Proyek "${updatedLead.projectName}" telah resmi dimulai. Terima kasih atas kepercayaannya!`
        );
      }
    }
  }

  return NextResponse.json(updatedLead);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await db.delete(crmLeads).where(eq(crmLeads.id, id));
  return NextResponse.json({ success: true });
}
