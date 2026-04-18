import jsPDF from 'jspdf';
import autoTable, { CellInput } from 'jspdf-autotable';

interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  clientName: string;
  projectName: string;
  amount: number; // Subtotal
  taxRate?: number;
  taxAmount?: number;
  downPaymentRate?: number;
  downPaymentAmount?: number;
  balanceAmount?: number;
  items?: Array<{ description: string; quantity: number; unitPrice: number; total: number }>;
}

interface QuotationData {
  quotationNumber: string;
  date: string;
  clientName: string;
  picClient: string;
  projectName: string;
  items: Array<{ description: string; quantity: number; unitPrice: number; total: number }>;
  totalValue: number;
}

const getBase64ImageFromUrl = async (url: string): Promise<string | null> => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Network response was not ok');
    const blob = await res.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
};

export const generateInvoicePDF = async (data: InvoiceData) => {
  const doc = new jsPDF();
  const logoUrl = 'https://files.useyapi.com/bc66354d-a84f-47a9-9fd1-3a6be416e89a-hh.png';
  const stampUrl = 'https://files.useyapi.com/0aa16f19-3bc2-46e4-a4f2-1cb16ad96fbf-image.png';

  const [logoBase64, stampBase64] = await Promise.all([
    getBase64ImageFromUrl(logoUrl),
    getBase64ImageFromUrl(stampUrl)
  ]);

  // --- HEADER SECTION ---
  if (logoBase64) {
    try {
      // Auto-detect format from base64 string
      const format = logoBase64.includes('image/png') ? 'PNG' : 'JPEG';
      doc.addImage(logoBase64, format, 15, 10, 25, 25);
    } catch (e) {
      console.error('Error adding logo to PDF', e);
    }
  }

  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42); // Slate-900
  doc.text('PT. MANGGALA UTAMA INDONESIA', 45, 20);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('Office: Jl. Kapling DPR Kec. Cakung, Jakarta Timur', 45, 25);
  doc.text('Phone: +62 878-8424-1703 | Email: admin@manggala-utama.id | Web: www.manggala-utama.id', 45, 30);

  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(1.2);
  doc.line(15, 36, 195, 36);
  doc.setLineWidth(0.3);
  doc.line(15, 37.5, 195, 37.5);

  // --- INVOICE TITLE & INFO ---
  doc.setFontSize(50);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  doc.text('INVOICE', 195, 60, { align: 'right' });

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Bill To :', 15, 80);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(data.clientName || 'Client', 15, 88);
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(data.projectName || '-', 15, 95);

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('Invoice Number', 195, 80, { align: 'right' });
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(data.invoiceNumber, 195, 88, { align: 'right' });
  doc.text(data.date, 195, 95, { align: 'right' });

  // --- ITEMS TABLE ---
  const tableItems = data.items || [];
  const subtotal = data.amount || 0;
  const taxAmount = data.taxAmount || 0;
  const dpAmount = data.downPaymentAmount || 0;
  const balanceAmount = data.balanceAmount || 0;

  const body: CellInput[][] = tableItems.map((item, idx) => [
    (idx + 1).toString(),
    { content: item.description || '-', styles: { fontStyle: 'italic' } },
    (item.quantity || 0).toString(),
    { content: `Rp ${item.total.toLocaleString('id-ID')}`, styles: { halign: 'right' } }
  ]);

  // Padding rows
  const remaining = Math.max(0, 3 - tableItems.length);
  for (let i = 0; i < remaining; i++) {
    body.push(['', '', '', '']);
  }

  // Summary rows
  body.push([
    { content: 'Total', colSpan: 3, styles: { halign: 'right', fontStyle: 'bolditalic' } },
    { content: `Rp ${subtotal.toLocaleString('id-ID')}`, styles: { halign: 'right', fontStyle: 'bold' } }
  ]);

  if (taxAmount > 0) {
    body.push([
      { content: `Tax (${data.taxRate}%)`, colSpan: 3, styles: { halign: 'right', fontStyle: 'bolditalic' } },
      { content: `Rp ${taxAmount.toLocaleString('id-ID')}`, styles: { halign: 'right', fontStyle: 'bold' } }
    ]);
  }

  body.push([
    { content: 'Down Payment', colSpan: 3, styles: { halign: 'right', fontStyle: 'bolditalic' } },
    { content: `Rp ${dpAmount.toLocaleString('id-ID')}`, styles: { halign: 'right', fontStyle: 'bold' } }
  ]);

  body.push([
    { content: 'Balance Due', colSpan: 3, styles: { halign: 'right', fontStyle: 'bolditalic', fillColor: [241, 245, 249] } },
    { content: `Rp ${balanceAmount.toLocaleString('id-ID')}`, styles: { halign: 'right', fontStyle: 'bold', fillColor: [241, 245, 249] } }
  ]);

  autoTable(doc, {
    startY: 105,
    margin: { left: 15, right: 15 },
    head: [['No', 'Description', 'Qty', 'Amount']],
    body: body,
    theme: 'grid',
    headStyles: { 
      fillColor: [248, 250, 252], 
      textColor: [0, 0, 0], 
      lineColor: [226, 232, 240], 
      lineWidth: 0.1,
      halign: 'center',
      fontStyle: 'bold'
    },
    styles: { 
      lineColor: [226, 232, 240], 
      lineWidth: 0.1,
      textColor: [0, 0, 0],
      fontSize: 10
    },
    columnStyles: {
      0: { halign: 'center', cellWidth: 15 },
      1: { halign: 'left' },
      2: { halign: 'center', cellWidth: 20 },
      3: { halign: 'right', cellWidth: 45 }
    }
  });

  // --- FOOTER SECTION ---
  const finalY = (doc as any).lastAutoTable.finalY + 15;
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Payment Information', 15, finalY);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('• Bank Name : Bank Mandiri', 15, finalY + 8);
  doc.text('• Account Number : 1660007095094', 15, finalY + 14);
  doc.text('• Account Name : PT. Manggala Utama Indonesia', 15, finalY + 20);

  const signatureX = 140;
  const signatureCenter = signatureX + 25;
  doc.setFontSize(11);
  doc.text(`Jakarta, ${data.date}`, signatureCenter, finalY + 10, { align: 'center' });
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 41, 59);
  doc.text('MANGGALA UTAMA', signatureCenter, finalY + 15, { align: 'center' });

  if (stampBase64) {
    try {
      const format = stampBase64.includes('image/png') ? 'PNG' : 'JPEG';
      doc.addImage(stampBase64, format, signatureX, finalY + 15, 50, 30);
    } catch (e) {
      console.error('Error adding stamp to PDF', e);
    }
  }

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('Muhammad Hidayat', signatureCenter, finalY + 50, { align: 'center' });
  doc.line(signatureX, finalY + 52, signatureX + 50, finalY + 52);
  doc.setFontSize(11);
  doc.text('Direktur', signatureCenter, finalY + 58, { align: 'center' });

  return doc;
};

export const downloadInvoicePDF = async (data: InvoiceData) => {
  const doc = await generateInvoicePDF(data);
  doc.save(`Invoice_${data.invoiceNumber}.pdf`);
};

export const generateQuotationPDF = async (data: QuotationData) => {
  const doc = new jsPDF();
  const logoUrl = 'https://files.useyapi.com/bc66354d-a84f-47a9-9fd1-3a6be416e89a-hh.png';
  const stampUrl = 'https://files.useyapi.com/0aa16f19-3bc2-46e4-a4f2-1cb16ad96fbf-image.png';

  const [logoBase64, stampBase64] = await Promise.all([
    getBase64ImageFromUrl(logoUrl),
    getBase64ImageFromUrl(stampUrl)
  ]);

  // --- HEADER SECTION ---
  if (logoBase64) {
    try {
      const format = logoBase64.includes('image/png') ? 'PNG' : 'JPEG';
      doc.addImage(logoBase64, format, 15, 10, 25, 25);
    } catch (e) {
      console.error('Error adding logo to PDF', e);
    }
  }

  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('PT. MANGGALA UTAMA INDONESIA', 45, 20);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text('Office: Jl. Kapling DPR Kec. Cakung, Jakarta Timur', 45, 25);
  doc.text('Phone: +62 878-8424-1703 | Email: admin@manggala-utama.id | Web: www.manggala-utama.id', 45, 30);

  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(1.2);
  doc.line(15, 36, 195, 36);
  doc.setLineWidth(0.3);
  doc.line(15, 37.5, 195, 37.5);

  // --- QUOTATION TITLE ---
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('SURAT PENAWARAN HARGA', 105, 55, { align: 'center' });

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Nomor: ${data.quotationNumber}`, 105, 62, { align: 'center' });
  doc.text(`Tanggal: ${data.date}`, 105, 68, { align: 'center' });

  // --- CLIENT INFO ---
  doc.setFontSize(11);
  doc.text('Kepada Yth.', 15, 80);
  doc.setFont('helvetica', 'bold');
  doc.text(data.clientName || 'Client Name', 15, 86);
  doc.setFont('helvetica', 'normal');
  doc.text(`Up. ${data.picClient || 'PIC'}`, 15, 92);
  
  doc.text('Dengan hormat,', 15, 105);
  doc.text(`Bersama surat ini, kami sampaikan penawaran harga untuk pekerjaan ${data.projectName} dengan rincian sebagai berikut:`, 15, 111, { maxWidth: 180 });

  // --- ITEMS TABLE ---
  const body: CellInput[][] = data.items.map((item, idx) => [
    (idx + 1).toString(),
    item.description,
    (item.quantity || 1).toString(),
    { content: `Rp ${item.unitPrice.toLocaleString('id-ID')}`, styles: { halign: 'right' } },
    { content: `Rp ${item.total.toLocaleString('id-ID')}`, styles: { halign: 'right' } }
  ]);

  // Total Row
  body.push([
    { content: 'TOTAL PENAWARAN', colSpan: 4, styles: { halign: 'right', fontStyle: 'bold', fillColor: [248, 250, 252] } },
    { content: `Rp ${data.totalValue.toLocaleString('id-ID')}`, styles: { halign: 'right', fontStyle: 'bold', fillColor: [248, 250, 252] } }
  ]);

  autoTable(doc, {
    startY: 120,
    margin: { left: 15, right: 15 },
    head: [['No', 'Uraian Pekerjaan', 'Qty', 'Harga Satuan', 'Total']],
    body: body,
    theme: 'grid',
    headStyles: { 
      fillColor: [30, 41, 59], 
      textColor: [255, 255, 255], 
      halign: 'center',
      fontStyle: 'bold'
    },
    styles: { 
      fontSize: 9,
      cellPadding: 3
    },
    columnStyles: {
      0: { halign: 'center', cellWidth: 10 },
      1: { halign: 'left' },
      2: { halign: 'center', cellWidth: 15 },
      3: { halign: 'right', cellWidth: 35 },
      4: { halign: 'right', cellWidth: 35 }
    }
  });

  // --- TERMS & CONDITIONS ---
  const finalY = (doc as any).lastAutoTable.finalY + 10;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Syarat dan Ketentuan:', 15, finalY);
  doc.setFont('helvetica', 'normal');
  doc.text('1. Harga sudah termasuk pajak (jika berlaku).', 15, finalY + 6);
  doc.text('2. Masa berlaku penawaran: 14 hari kalender.', 15, finalY + 11);
  doc.text('3. Sistem pembayaran sesuai dengan kesepakatan dalam kontrak.', 15, finalY + 16);

  doc.text('Demikian penawaran ini kami sampaikan. Atas perhatian dan kerjasamanya, kami ucapkan terima kasih.', 15, finalY + 28, { maxWidth: 180 });

  // --- SIGNATURE ---
  const signatureY = finalY + 45;
  const signatureX = 140;
  const signatureCenter = signatureX + 25;

  doc.text('Hormat kami,', signatureCenter, signatureY, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.text('PT. Manggala Utama Indonesia', signatureCenter, signatureY + 6, { align: 'center' });

  if (stampBase64) {
    try {
      const format = stampBase64.includes('image/png') ? 'PNG' : 'JPEG';
      doc.addImage(stampBase64, format, signatureX, signatureY + 5, 50, 30);
    } catch (e) {
      console.error('Error adding stamp to PDF', e);
    }
  }

  doc.text('Muhammad Hidayat', signatureCenter, signatureY + 40, { align: 'center' });
  doc.line(signatureX, signatureY + 42, signatureX + 50, signatureY + 42);
  doc.setFont('helvetica', 'normal');
  doc.text('Direktur', signatureCenter, signatureY + 48, { align: 'center' });

  return doc;
};

export const downloadQuotationPDF = async (data: QuotationData) => {
  const doc = await generateQuotationPDF(data);
  doc.save(`Quotation_${data.quotationNumber}.pdf`);
};
