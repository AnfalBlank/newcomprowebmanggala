import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { crmProjects, crmLeads, crmInvoices } from "@/server/db/schema";
import { eq, sql } from "drizzle-orm";
import { auth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const cashFlowData = await db
      .select({
        id: crmProjects.id,
        projectName: crmProjects.name,
        clientName: crmProjects.clientName,
        picClient: crmLeads.picClient,
        estimatedCost: crmLeads.estimatedCost,
        contractValue: crmProjects.contractValue,
        proposalUrl: crmLeads.proposalUrl,
        inquiryUrl: crmLeads.inquiryUrl,
        poUrl: crmLeads.poUrl,
        leadStatus: crmLeads.status,
        projectStatus: crmProjects.status,
      })
      .from(crmProjects)
      .leftJoin(crmLeads, eq(crmProjects.leadId, crmLeads.id));

    // Get invoice sums for each project
    const invoices = await db.select().from(crmInvoices);

    const result = cashFlowData.map((project) => {
      const projectInvoices = invoices.filter(inv => inv.projectId === project.id);
      const totalInvoiced = projectInvoices.reduce((sum, inv) => sum + inv.amount, 0);
      const hasInvoice = projectInvoices.length > 0;
      
      return {
        ...project,
        totalInvoiced,
        taxAmount: Math.round(totalInvoiced * 0.11),
        documents: {
          permintaan: !!project.inquiryUrl,
          penawaran: !!project.proposalUrl,
          pembelian: !!project.poUrl,
          invoice: hasInvoice,
        }
      };
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to fetch cash flow data", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
