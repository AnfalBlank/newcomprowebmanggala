import type { Metadata } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/context/LanguageContext";
import { AnimationProvider, SmoothScroll, ScrollProgressBar } from "@/components/animation-provider";
import { CustomCursor } from "@/components/ui/custom-cursor";

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://manggalautama.com'),
  title: {
    default: "PT. Manggala Utama Indonesia | System Integrator & Engineering",
    template: "%s | PT. Manggala Utama Indonesia"
  },
  description: "Perusahaan engineering dan system integrator terpercaya untuk solusi fueling (SPBU, Depo), otomatisasi industri, infrastruktur IT enterprise, dan software development.",
  keywords: [
    "System Integrator", "Fueling System", "Pengadaan Server", "Infrastruktur IT", 
    "Perangkat Kasir SPBU", "ATG Console", "Software Development", "PT Manggala Utama Indonesia",
    "Konsultan IT", "Instalasi Fiber Optic"
  ],
  authors: [{ name: "PT. Manggala Utama Indonesia" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    title: "PT. Manggala Utama Indonesia | System Integrator",
    description: "Solusi terpercaya untuk kebutuhan infrastruktur IT, Fueling System, dan Software Automation di seluruh Indonesia.",
    siteName: "Manggala Utama Indonesia",
    images: [{
      url: "/logo.png",
      width: 800,
      height: 600,
      alt: "PT. Manggala Utama Indonesia Logo"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PT. Manggala Utama Indonesia | Solution Expert",
    description: "Engineering & IT Solutions Berstandar Enterprise.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased min-h-screen flex flex-col bg-background text-foreground">
        <LanguageProvider>
          <ScrollProgressBar />
          <CustomCursor />
          <AnimationProvider />
          <SmoothScroll />
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
          <Toaster position="top-center" richColors />
        </LanguageProvider>
      </body>
    </html>
  );
}
