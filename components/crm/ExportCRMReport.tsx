'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Lead {
  projectName: string;
  clientName: string;
  quotedValue: number;
  status: string;
  createdAt: string;
}

export function ExportCRMReport({ leads }: { leads: Lead[] }) {
  const [loading, setLoading] = useState(false);

  const exportPDF = () => {
    setLoading(true);
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('CRM Leads & Pipeline Report', 105, 20, { align: 'center' });

    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 30);

    autoTable(doc, {
      startY: 40,
      head: [['Project', 'Client', 'Value', 'Status', 'Date']],
      body: leads.map(l => [
        l.projectName,
        l.clientName,
        `IDR ${l.quotedValue?.toLocaleString() || 0}`,
        l.status.toUpperCase(),
        new Date(l.createdAt).toLocaleDateString(),
      ]),
      theme: 'grid',
    });

    const totalValue = leads.reduce((acc, l) => acc + (l.quotedValue || 0), 0);
    const finalY = (doc as any).lastAutoTable.finalY || 150;
    
    doc.setFontSize(11);
    doc.text(`Total Pipeline Value: IDR ${totalValue.toLocaleString()}`, 20, finalY + 10);
    doc.text(`Total Leads: ${leads.length}`, 20, finalY + 17);

    doc.save(`CRM_Report_${new Date().toISOString().split('T')[0]}.pdf`);
    setLoading(false);
  };

  return (
    <Button variant="outline" onClick={exportPDF} disabled={loading} className="gap-2">
      <FileDown className="h-4 w-4" />
      {loading ? 'Exporting...' : 'Export PDF Report'}
    </Button>
  );
}
