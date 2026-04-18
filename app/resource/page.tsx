"use client"

import { useEffect, useState } from "react";
import { fetchResources } from "@/lib/api-client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText, Download, FileArchive, FileImage, FileDown } from "lucide-react";
import { TechHero } from "@/components/ui/tech-hero";


export default function ResourcesPage() {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadResources() {
      try {
        const data = await fetchResources();
        setResources(data);
      } catch (error) {
        console.error("Failed to load resources:", error);
      } finally {
        setLoading(false);
      }
    }
    loadResources();
  }, []);

  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf": return <FileText className="h-8 w-8 text-red-400" />;
      case "doc": return <FileText className="h-8 w-8 text-blue-400" />;
      case "image": return <FileImage className="h-8 w-8 text-green-400" />;
      default: return <FileArchive className="h-8 w-8 text-white/40" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[oklch(0.12_0.02_260)]">
      {/* Hero Section */}
      <TechHero
        badge="Pusat Sumber Daya"
        title={
          <h1 className="text-5xl md:text-7xl font-black font-heading tracking-tight leading-[1.05]">
            Dokumen &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
              Materi
            </span>{" "}
            Pendukung
          </h1>
        }
        subtitle="Akses company profile, brosur teknis, dan dokumentasi produk untuk mendukung keputusan bisnis Anda."
      />

      {/* Resources Content */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-4 py-2">Dokumen Tersedia</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
              Download <span className="gradient-text">Dokumen</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Pilih dokumen yang Anda butuhkan dan unduh secara gratis
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-muted-foreground">Memuat dokumen...</p>
            </div>
          ) : resources.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted/20 mb-4">
                <FileDown className="w-10 h-10 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-lg">Tidak ada dokumen tersedia saat ini.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {resources.map((resource) => (
                <Card key={resource.id} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-border/50">
                  <CardHeader className="flex flex-row items-center gap-4 pb-4">
                    <div className="p-3 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20">
                      {getIcon(resource.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg md:text-xl font-semibold line-clamp-1">{resource.title}</CardTitle>
                      <p className="text-sm text-muted-foreground capitalize mt-1">{resource.category}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span className="font-medium">Type: {resource.type.toUpperCase()}</span>
                      <span>Size: 2.5 MB</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-4 border-t">
                    <Button variant="outline" className="w-full gap-2 hover:bg-primary hover:text-primary-foreground transition-colors" asChild>
                      <a href={resource.fileUrl} download target="_blank" rel="noopener noreferrer">
                        <Download className="h-4 w-4" /> Download File
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
