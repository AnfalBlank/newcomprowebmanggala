"use client"

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Search, HelpCircle, ChevronRight, Mail } from "lucide-react";
import { FadeIn, StaggerContainer } from "@/components/animations";
import { TechHero } from "@/components/ui/tech-hero";
import { TechPatternWrapper } from "@/components/ui/tech-pattern";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const FAQ_CATEGORIES = [
  { value: 'all', label: 'Semua', icon: HelpCircle },
  { value: 'general', label: 'Umum', icon: HelpCircle },
  { value: 'products', label: 'Produk', icon: HelpCircle },
  { value: 'services', label: 'Layanan', icon: HelpCircle },
  { value: 'technical', label: 'Teknis', icon: HelpCircle },
  { value: 'billing', label: 'Tagihan', icon: HelpCircle },
];

export default function FAQPage() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [filteredFaqs, setFilteredFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    async function fetchFAQs() {
      try {
        const res = await fetch('/api/faqs?active=true');
        if (!res.ok) {
          throw new Error('Failed to fetch FAQs');
        }
        const data = await res.json();
        setFaqs(data || []);
        setFilteredFaqs(data || []);
      } catch (error) {
        console.error("Failed to load FAQs:", error);
        // Set empty arrays on error to prevent crashes
        setFaqs([]);
        setFilteredFaqs([]);
      } finally {
        setLoading(false);
      }
    }
    fetchFAQs();
  }, []);

  useEffect(() => {
    let result = faqs;

    if (searchTerm) {
      result = result.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter(faq => faq.category === selectedCategory);
    }

    setFilteredFaqs(result);
  }, [searchTerm, selectedCategory, faqs]);

  const getCategoryBadge = (category: string) => {
    const categories: Record<string, { className: string, label: string }> = {
      'general': { className: 'bg-blue-500/20 text-blue-300 border-blue-500/30', label: 'Umum' },
      'products': { className: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', label: 'Produk' },
      'services': { className: 'bg-purple-500/20 text-purple-300 border-purple-500/30', label: 'Layanan' },
      'technical': { className: 'bg-orange-500/20 text-orange-300 border-orange-500/30', label: 'Teknis' },
      'billing': { className: 'bg-red-500/20 text-red-300 border-red-500/30', label: 'Tagihan' },
    }
    return categories[category] || { className: 'bg-white/10 text-white/60 border-white/20', label: category };
  };

  return (
    <div className="flex flex-col min-h-screen bg-[oklch(0.12_0.02_260)]">
      {/* Hero Section */}
      <TechHero
        badge="Pusat Bantuan"
        title={
          <h1 className="text-5xl md:text-7xl font-black font-heading tracking-tight leading-[1.05] text-white">
            Frequently Asked{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400">
              Questions
            </span>
          </h1>
        }
        subtitle="Temukan jawaban untuk pertanyaan yang sering diajukan tentang produk dan layanan kami."
      >
        {/* Inline search bar in hero */}
        <div className="w-full max-w-2xl relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <Input
            type="text"
            placeholder="Cari pertanyaan..."
            className="h-14 pl-14 pr-6 text-base rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus-visible:border-primary/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </TechHero>

      {/* Category Filter */}
      <section className="py-5 border-b border-white/5 sticky top-16 z-20 backdrop-blur-md bg-[oklch(0.12_0.02_260)]/90">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {FAQ_CATEGORIES.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.value)}
                className={cn(
                  "rounded-full whitespace-nowrap transition-all",
                  selectedCategory === category.value
                    ? "bg-primary text-white shadow-primary/20 hover:bg-primary/90"
                    : "border-white/10 bg-white/5 hover:bg-white/10 text-white/60"
                )}
              >
                <category.icon className="w-4 h-4 mr-2" />
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {loading ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Card key={i} className="p-6 bg-white/5 border-white/10">
                    <div className="h-8 bg-white/5 animate-pulse rounded mb-4"></div>
                    <div className="h-24 bg-white/5 animate-pulse rounded"></div>
                  </Card>
                ))}
              </div>
            ) : filteredFaqs.length === 0 ? (
              <Card className="p-20 text-center bg-white/5 border-white/10">
                <HelpCircle className="w-20 h-20 mx-auto mb-6 text-white/20" />
                <h3 className="text-2xl font-bold text-white mb-3">Tidak Ada FAQ Ditemukan</h3>
                <p className="text-white/50 mb-8">Coba kata kunci pencarian lain atau kategori berbeda.</p>
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                  className="rounded-full"
                >
                  Reset Filter
                </Button>
              </Card>
            ) : (
              <StaggerContainer>
                <Card className="bg-white/5 border-white/10 overflow-hidden">
                  <CardContent className="p-0">
                    <Accordion type="single" collapsible className="divide-y divide-white/8">
                      {filteredFaqs.map((faq, index) => (
                        <AccordionItem value={faq.id} key={faq.id} className="border-white/8">
                          <AccordionTrigger className="px-6 py-5 hover:bg-white/[0.04] transition-colors text-left group">
                            <div className="flex items-start gap-4 flex-1 min-w-0">
                              <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-black text-sm group-hover:bg-primary group-hover:text-white transition-all duration-300 border border-primary/30 shadow-[0_0_12px_rgba(var(--primary),0.2)] group-hover:shadow-[0_0_20px_rgba(var(--primary),0.4)]">
                                {index + 1}
                              </span>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-base font-semibold text-white group-hover:text-primary transition-colors duration-200 leading-snug">
                                  {faq.question}
                                </h3>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-6 pb-5 pt-1">
                            <div className="pl-12">
                              <p className="text-white/65 leading-relaxed whitespace-pre-line text-sm">
                                {faq.answer}
                              </p>
                              <div className="mt-4">
                                <Badge className={cn("border text-xs", getCategoryBadge(faq.category).className)}>
                                  {getCategoryBadge(faq.category).label}
                                </Badge>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </StaggerContainer>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent pointer-events-none" />
        <TechPatternWrapper variant="grid" opacity={0.03}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <FadeIn>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                  Masih Punya Pertanyaan?
                </h2>
                <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">
                  Tim kami siap membantu Anda. Hubungi kami untuk informasi lebih lanjut.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="rounded-full bg-primary text-white hover:bg-primary/90 shadow-xl px-10">
                    <Link href="/contact" className="flex items-center gap-2">
                      <Mail className="w-5 h-5" />
                      Hubungi Kami
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="rounded-full border-white/15 text-white hover:bg-white/5">
                    <Link href="/products">
                      Lihat Produk
                    </Link>
                  </Button>
                </div>
              </FadeIn>
            </div>
          </div>
        </TechPatternWrapper>
      </section>
    </div>
  );
}
