"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams } from "next/navigation";
import { formatCurrency } from "@/lib/utils";
import { Printer, Download, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

function ReceiptContent() {
  const params = useParams();
  const [payment, setPayment] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchPayment();
    }
  }, [params.id]);

  const fetchPayment = async () => {
    try {
      const res = await fetch(`/api/crm/payments/${params.id}`);
      const data = await res.json();
      setPayment(data);
    } catch (error) {
      console.error("Failed to fetch payment details", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) return <div className="p-8 text-center">Memuat Kwitansi...</div>;
  if (!payment) return <div className="p-8 text-center text-red-500">Kwitansi tidak ditemukan.</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex justify-between items-center print:hidden">
          <Button asChild variant="ghost">
            <Link href="/admin/finance/payments">
              <ChevronLeft className="mr-2 h-4 w-4" /> Kembali
            </Link>
          </Button>
          <Button onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" /> Cetak Kwitansi
          </Button>
        </div>

        {/* Kwitansi UI */}
        <div className="bg-white p-8 md:p-12 shadow-lg border rounded-lg relative overflow-hidden receipt-card">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start border-b-4 border-slate-900 pb-8 mb-10 gap-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
              <img
                src="/logo-placeholder.svg"
                alt="Logo Manggala"
                className="h-24 w-auto object-contain"
              />
              <div className="space-y-1">
                <h1 className="text-3xl font-black uppercase tracking-tight text-slate-900">PT. MANGGALA UTAMA INDONESIA</h1>
                <p className="text-sm text-slate-600 font-bold uppercase tracking-wider">
                  Mechanical, Electrical, & General Contractor
                </p>
                <p className="text-xs text-slate-500 max-w-md leading-relaxed flex flex-wrap gap-x-3">
                  <span>Jl. Kapling DPR Kec. Cakung, Jakarta Timur</span>
                  <span>Telp: +62 878-8424-1703</span>
                  <span>Email: admin@manggala-utama.id</span>
                  <span>Web: www.manggala-utama.id</span>
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-end bg-slate-100 p-4 rounded-xl border-2 border-slate-200 min-w-[200px]">
              <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-1">KWITANSI</h2>
              <div className="h-1 w-full bg-slate-900 mb-2"></div>
              <p className="text-sm font-black text-slate-600 uppercase tracking-widest">No: {payment.id.toUpperCase().substring(0, 8)}</p>
            </div>
          </div>

          {/* Body */}
          <div className="space-y-10 mb-16 text-slate-900">
            <div className="flex flex-col md:flex-row md:items-center gap-4 pb-2 border-b-2 border-dotted border-slate-300">
              <span className="text-xs uppercase font-black text-slate-400 min-w-[150px]">Sudah Terima Dari :</span>
              <span className="text-xl font-black tracking-tight uppercase text-blue-900">{payment.invoice?.project?.clientName || "Pelanggan Setia"}</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <span className="text-xs uppercase font-black text-slate-400 min-w-[150px]">Banyaknya Uang :</span>
              <div className="flex-1 bg-slate-50 border-2 border-slate-200 p-4 rounded-xl italic font-bold text-slate-700 relative">
                <span className="absolute -top-3 left-4 bg-white px-2 text-[10px] text-slate-400 font-black tracking-widest uppercase">Amount in Words</span>
                # {formatTerbilang(payment.amount)} Rupiah #
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-start gap-4 pb-2 border-b-2 border-dotted border-slate-300">
              <span className="text-xs uppercase font-black text-slate-400 min-w-[150px] mt-1">Untuk Pembayaran :</span>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-slate-700">
                  {payment.invoice?.invoiceNumber} - {payment.invoice?.project?.name}
                </span>
                <span className="text-xs text-slate-400 italic">Project Reference: {payment.invoice?.project?.id || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* Footer / Signature Area */}
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mt-20 gap-12">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-slate-900 to-blue-900 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-slate-900 text-white px-10 py-6 rounded-xl flex items-center gap-6 shadow-2xl">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Nominal Pembayaran</span>
                  <span className="text-3xl font-black">{formatCurrency(payment.amount)}</span>
                </div>
                <div className="h-10 w-px bg-slate-700"></div>
                <div className="text-right">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-1">Status</span>
                  <Badge className="bg-green-500 hover:bg-green-600 text-[10px] font-black uppercase tracking-widest">VERIFIED</Badge>
                </div>
              </div>
            </div>

            <div className="text-center relative min-w-[300px]">
              <p className="text-sm font-bold text-slate-500 mb-20">Jakarta, {new Date(payment.paymentDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              
              {/* Signature/Stamp Container */}
              <div className="relative h-32 w-full flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                  <img 
                    src="https://files.useyapi.com/0aa16f19-3bc2-46e4-a4f2-1cb16ad96fbf-image.png" 
                    alt="TTD Direktur" 
                    className="w-56 mix-blend-multiply drop-shadow-sm contrast-125 rotate-[-5deg] opacity-90"
                  />
                </div>
                
                {/* Company Stamp Background Decoration */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-40 h-40 border-[6px] border-blue-600/5 rounded-full flex items-center justify-center -rotate-12">
                    <span className="text-blue-600/5 font-black text-3xl uppercase tracking-tighter">MANGGALA</span>
                  </div>
                </div>
              </div>

              <div className="relative z-20 space-y-1 border-t-2 border-slate-900 pt-3 inline-block px-14">
                <p className="font-black text-slate-900 text-xl tracking-tight uppercase leading-none">Muhammad Hidayat</p>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mt-1">Direktur Utama</p>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rotate-45 translate-x-16 -translate-y-16 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-slate-50 rotate-45 -translate-x-16 translate-y-16 pointer-events-none" />
        </div>
        
        <style jsx global>{`
          @media print {
            body { background: white !important; padding: 0 !important; }
            .print\\:hidden { display: none !important; }
            .shadow-lg { shadow: none !important; border: none !important; }
            .receipt-card { border: none !important; }
          }
        `}</style>
      </div>
    </div>
  );
}

// Helper to convert number to Indonesian "Terbilang" words
function formatTerbilang(amount: number): string {
  const units = ['', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan', 'sepuluh', 'sebelas'];
  
  if (amount === 0) return 'nol';
  
  let result = '';
  
  if (amount < 12) {
    result = units[amount];
  } else if (amount < 20) {
    result = formatTerbilang(amount - 10) + ' belas';
  } else if (amount < 100) {
    result = formatTerbilang(Math.floor(amount / 10)) + ' puluh ' + formatTerbilang(amount % 10);
  } else if (amount < 200) {
    result = 'seratus ' + formatTerbilang(amount - 100);
  } else if (amount < 1000) {
    result = formatTerbilang(Math.floor(amount / 100)) + ' ratus ' + formatTerbilang(amount % 100);
  } else if (amount < 2000) {
    result = 'seribu ' + formatTerbilang(amount - 1000);
  } else if (amount < 1000000) {
    result = formatTerbilang(Math.floor(amount / 1000)) + ' ribu ' + formatTerbilang(amount % 1000);
  } else if (amount < 1000000000) {
    result = formatTerbilang(Math.floor(amount / 1000000)) + ' juta ' + formatTerbilang(amount % 1000000);
  } else if (amount < 1000000000000) {
    result = formatTerbilang(Math.floor(amount / 1000000000)) + ' milyar ' + formatTerbilang(amount % 1000000000);
  }
  
  return result.replace(/\s+/g, ' ').trim();
}

export default function ReceiptPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReceiptContent />
    </Suspense>
  );
}
