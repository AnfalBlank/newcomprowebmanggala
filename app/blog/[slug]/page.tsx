"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, Eye, ArrowLeft, Clock, BookOpen, ChevronRight, MessageCircle } from "lucide-react";
import { FadeIn } from "@/components/animations";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// Estimated reading time
function readingTime(content: string): number {
  const wordsPerMin = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMin));
}

export default function ArticleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<any>(null);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setScrollProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const slug = params.slug as string;
        const res = await fetch(`/api/articles/slug/${slug}`);
        if (!res.ok) { router.push('/blog'); return; }
        const data = await res.json();
        setArticle(data);

        if (data.category) {
          try {
            const relatedRes = await fetch(`/api/articles?active=true&category=${data.category}&limit=3`);
            if (relatedRes.ok) {
              const relatedData = await relatedRes.json();
              const filtered = (relatedData.articles || []).filter((a: any) => a.id !== data.id).slice(0, 3);
              setRelatedArticles(filtered);
            }
          } catch { setRelatedArticles([]); }
        }
      } catch {
        router.push('/blog');
      } finally {
        setLoading(false);
      }
    }
    fetchArticle();
  }, [params.slug, router]);

  const getCategoryBadge = (category: string) => {
    const categories: Record<string, { className: string, label: string }> = {
      'company_news':    { className: 'bg-blue-500/20 text-blue-300 border-blue-500/30',    label: 'Berita Perusahaan' },
      'product_updates': { className: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', label: 'Update Produk' },
      'technical':       { className: 'bg-purple-500/20 text-purple-300 border-purple-500/30',   label: 'Teknis' },
      'case_studies':    { className: 'bg-orange-500/20 text-orange-300 border-orange-500/30',   label: 'Studi Kasus' },
      'industry':        { className: 'bg-amber-500/20 text-amber-300 border-amber-500/30',      label: 'Industri' },
    };
    return categories[category] || { className: 'bg-white/10 text-white/70 border-white/20', label: category };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[oklch(0.12_0.02_260)] flex items-center justify-center">
        <div className="animate-pulse text-center space-y-4">
          <div className="w-16 h-16 bg-white/10 rounded-full mx-auto" />
          <div className="h-4 w-32 bg-white/10 rounded mx-auto" />
        </div>
      </div>
    );
  }

  if (!article) return null;

  const mins = readingTime(article.content || "");
  const waMessage = encodeURIComponent(`Halo PT. Manggala Utama Indonesia, saya baru membaca artikel "${article.title}" dan ingin bertanya lebih lanjut.`);
  const waUrl = `https://wa.me/6287884281703?text=${waMessage}`;

  return (
    <div className="flex flex-col min-h-screen bg-[oklch(0.12_0.02_260)]">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-white/5">
        <motion.div
          className="h-full bg-gradient-to-r from-primary via-blue-400 to-accent"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Sticky Nav Bar */}
      <header className="sticky top-16 z-40 border-b border-white/5 bg-[oklch(0.12_0.02_260)]/95 backdrop-blur-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Button asChild variant="ghost" className="group hover:bg-white/5 rounded-full text-white/60 hover:text-white text-sm h-8 px-3">
            <Link href="/blog" className="flex items-center gap-2">
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              Kembali ke Blog
            </Link>
          </Button>
          <div className="flex items-center gap-3 text-white/30 text-xs">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {mins} menit baca</span>
            <span className="hidden sm:flex items-center gap-1"><Eye className="w-3 h-3" /> {article.viewCount || 0} views</span>
          </div>
        </div>
      </header>

      {/* Featured Image Hero */}
      {article.featuredImage && (
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <Image src={article.featuredImage} alt={article.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.12_0.02_260)] via-black/30 to-transparent" />
        </div>
      )}

      {/* Article Header */}
      <section className={cn("relative z-10", article.featuredImage ? "-mt-40" : "pt-16")}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              {/* Category + Read Time */}
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <Badge className={cn("border text-xs px-3 py-1", getCategoryBadge(article.category).className)}>
                  {getCategoryBadge(article.category).label}
                </Badge>
                <span className="text-white/30 text-xs flex items-center gap-1">
                  <BookOpen className="w-3 h-3" /> {mins} menit baca
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-5xl font-black text-white mb-6 leading-[1.15] font-heading tracking-tight">
                {article.title}
              </h1>

              {/* Author + Date row */}
              <div className="flex flex-wrap items-center gap-5 mb-6">
                {article.author && (
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{article.author}</p>
                      <p className="text-xs text-white/40">Penulis</p>
                    </div>
                  </div>
                )}
                {article.publishedDate && (
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {format(new Date(article.publishedDate), 'dd MMMM yyyy', { locale: id })}
                      </p>
                      <p className="text-xs text-white/40">Diterbitkan</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Tags */}
              {article.tags && Array.isArray(article.tags) && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {article.tags.map((tag: string) => (
                    <Badge key={tag} variant="outline" className="text-xs border-white/12 text-white/40 rounded-full">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}

              <Separator className="bg-white/8 mb-0" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Article Body — Magazine Layout */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* 2-column layout on large screens: main content + sidebar */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 items-start">

            {/* Main Article Content */}
            <FadeIn>
              <article
                className="
                  prose prose-lg max-w-none

                  /* Base text */
                  prose-p:text-white/70 prose-p:leading-[1.9] prose-p:mb-6

                  /* Headings */
                  prose-headings:font-heading prose-headings:font-black prose-headings:text-white prose-headings:tracking-tight
                  prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-10
                  prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-10 prose-h2:pb-3 prose-h2:border-b prose-h2:border-white/8
                  prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-8 prose-h3:text-white/90

                  /* Links */
                  prose-a:text-blue-400 prose-a:no-underline prose-a:font-medium hover:prose-a:text-blue-300 hover:prose-a:underline

                  /* Strong / Em */
                  prose-strong:text-white prose-strong:font-bold
                  prose-em:text-white/80

                  /* Lists */
                  prose-ul:text-white/65 prose-ul:pl-5 prose-ul:space-y-1
                  prose-ol:text-white/65 prose-ol:pl-5 prose-ol:space-y-1
                  prose-li:text-white/65 prose-li:leading-relaxed

                  /* Blockquote */
                  prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-white/[0.03]
                  prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-xl
                  prose-blockquote:text-white/60 prose-blockquote:italic prose-blockquote:not-italic

                  /* Code */
                  prose-code:text-blue-300 prose-code:bg-white/8 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                  prose-pre:bg-[oklch(0.09_0.02_260)] prose-pre:border prose-pre:border-white/8 prose-pre:rounded-2xl prose-pre:overflow-x-auto prose-pre:p-6 prose-pre:shadow-xl

                  /* Tables */
                  prose-table:border prose-table:border-white/10 prose-table:rounded-xl prose-table:overflow-hidden
                  prose-th:bg-white/5 prose-th:text-white prose-th:font-bold prose-th:px-4 prose-th:py-3 prose-th:text-sm
                  prose-td:text-white/60 prose-td:px-4 prose-td:py-3 prose-td:border-t prose-td:border-white/5 prose-td:text-sm

                  /* Images */
                  prose-img:rounded-2xl prose-img:shadow-2xl prose-img:border prose-img:border-white/10 prose-img:my-8

                  /* HR */
                  prose-hr:border-white/8 prose-hr:my-12
                "
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {article.content}
                </ReactMarkdown>
              </article>
            </FadeIn>

            {/* Sticky Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-6">

                {/* WhatsApp CTA */}
                <div className="rounded-2xl bg-gradient-to-br from-green-500/15 to-emerald-500/5 border border-green-500/20 p-6">
                  <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-green-400" />
                    Diskusikan Artikel Ini
                  </h4>
                  <p className="text-xs text-white/50 mb-4 leading-relaxed">
                    Ada pertanyaan terkait topik ini? Tim kami siap membantu Anda.
                  </p>
                  <Button asChild className="w-full rounded-xl h-10 bg-green-600 hover:bg-green-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(34,197,94,0.25)] gap-2">
                    <a href={waUrl} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-4 h-4" /> Chat WhatsApp
                    </a>
                  </Button>
                </div>

                {/* Article Info */}
                <div className="rounded-2xl bg-white/5 border border-white/8 p-6 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-4">Info Artikel</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-white/40">Kategori</span>
                      <Badge className={cn("border text-xs", getCategoryBadge(article.category).className)}>
                        {getCategoryBadge(article.category).label}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/40">Waktu Baca</span>
                      <span className="text-white/70 font-medium">{mins} menit</span>
                    </div>
                    {article.author && (
                      <div className="flex justify-between items-center">
                        <span className="text-white/40">Penulis</span>
                        <span className="text-white/70 font-medium">{article.author}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-white/40">Dilihat</span>
                      <span className="text-white/70 font-medium">{article.viewCount || 0}×</span>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                {article.tags && Array.isArray(article.tags) && article.tags.length > 0 && (
                  <div className="rounded-2xl bg-white/5 border border-white/8 p-6">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-4">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag: string) => (
                        <Badge key={tag} variant="outline" className="text-xs border-white/12 text-white/40 rounded-full">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-16 border-t border-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <FadeIn>
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-1 h-8 bg-gradient-to-b from-primary to-primary/0 rounded-full" />
                  <h2 className="text-2xl font-black text-white font-heading">Artikel Terkait</h2>
                </div>
              </FadeIn>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedArticles.map((rel) => (
                  <FadeIn key={rel.id}>
                    <Link href={`/blog/${rel.slug}`} className="group block">
                      <div className="rounded-2xl overflow-hidden bg-white/5 border border-white/8 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl h-full">
                        {rel.featuredImage && (
                          <div className="relative h-44 overflow-hidden">
                            <Image src={rel.featuredImage} alt={rel.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                          </div>
                        )}
                        <div className="p-5">
                          <Badge className={cn("mb-3 border text-xs", getCategoryBadge(rel.category).className)}>
                            {getCategoryBadge(rel.category).label}
                          </Badge>
                          <h3 className="font-bold text-base mb-2 line-clamp-2 text-white group-hover:text-primary transition-colors leading-snug">
                            {rel.title}
                          </h3>
                          {rel.excerpt && (
                            <p className="text-white/45 text-sm line-clamp-2">{rel.excerpt}</p>
                          )}
                        </div>
                      </div>
                    </Link>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Back to Blog */}
      <section className="py-20 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent pointer-events-none" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-black mb-5 text-white font-heading">
              Jelajahi Artikel Lainnya
            </h2>
            <p className="text-lg text-white/50 mb-10 max-w-xl mx-auto">
              Temukan lebih banyak wawasan teknis, berita industri, dan studi kasus kami.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="rounded-full bg-primary text-white hover:bg-primary/90 shadow-xl px-10">
                <Link href="/blog" className="flex items-center gap-2">
                  Semua Artikel <ChevronRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-white/15 bg-white/5 hover:bg-white/10 text-white px-10 gap-2">
                <a href={waUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 text-green-400" /> Tanya via WhatsApp
                </a>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
