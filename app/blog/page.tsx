"use client"

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { Search, Calendar, User, Eye, Newspaper, Filter, ChevronRight } from "lucide-react";
import { FadeIn, StaggerContainer } from "@/components/animations";
import { TechHero } from "@/components/ui/tech-hero";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { cn } from "@/lib/utils";

const BLOG_CATEGORIES = [
  { value: 'all', label: 'Semua' },
  { value: 'company_news', label: 'Berita Perusahaan' },
  { value: 'product_updates', label: 'Update Produk' },
  { value: 'technical', label: 'Teknis' },
  { value: 'case_studies', label: 'Studi Kasus' },
  { value: 'industry', label: 'Industri' },
];

export default function BlogPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<any[]>([]);
  const [featuredArticles, setFeaturedArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch('/api/articles?active=true');
        if (!res.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await res.json();
        const allArticles = data.articles || [];

        // Separate featured and regular articles
        const featured = allArticles.filter((a: any) => a.featured);
        const regular = allArticles.filter((a: any) => !a.featured);

        setFeaturedArticles(featured);
        setArticles(regular);
        setFilteredArticles(regular);
      } catch (error) {
        console.error("Failed to load articles:", error);
        // Set empty arrays on error to prevent crashes
        setArticles([]);
        setFeaturedArticles([]);
        setFilteredArticles([]);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  useEffect(() => {
    let result = articles;

    if (searchTerm) {
      result = result.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (article.excerpt && article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter(article => article.category === selectedCategory);
    }

    setFilteredArticles(result);
  }, [searchTerm, selectedCategory, articles]);

  const getCategoryBadge = (category: string) => {
    const categories: Record<string, { className: string, label: string }> = {
      'company_news': { className: 'bg-blue-500/20 text-blue-300 border border-blue-500/30', label: 'Berita Perusahaan' },
      'product_updates': { className: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30', label: 'Update Produk' },
      'technical': { className: 'bg-purple-500/20 text-purple-300 border border-purple-500/30', label: 'Teknis' },
      'case_studies': { className: 'bg-orange-500/20 text-orange-300 border border-orange-500/30', label: 'Studi Kasus' },
      'industry': { className: 'bg-amber-500/20 text-amber-300 border border-amber-500/30', label: 'Industri' },
    }
    return categories[category] || { className: 'bg-white/10 text-white/60 border border-white/20', label: category };
  };

  const ArticleCard = ({ article, featured = false }: { article: any, featured?: boolean }) => (
    <Link href={`/blog/${article.slug}`} className="group">
      <Card className={cn(
        "h-full overflow-hidden transition-all duration-300 hover:shadow-2xl border-0",
        featured ? "bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20" : "bg-white/5 border border-white/8 hover:border-white/15"
      )}>
        {article.featuredImage && (
          <div className="relative h-56 overflow-hidden">
            <Image
              src={article.featuredImage}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
            {featured && (
              <div className="absolute top-4 right-4">
                <Badge className="bg-amber-500 text-white border-none shadow-lg">
                  Featured
                </Badge>
              </div>
            )}
          </div>
        )}
        <CardHeader className={cn(article.featuredImage ? "relative -mt-20 pt-24" : "")}>
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge className={getCategoryBadge(article.category).className}>
              {getCategoryBadge(article.category).label}
            </Badge>
            {article.tags && Array.isArray(article.tags) && article.tags.slice(0, 2).map((tag: string) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <h3 className={cn(
            "font-bold line-clamp-2 group-hover:text-primary transition-colors",
            featured ? "text-2xl" : "text-xl"
          )}>
            {article.title}
          </h3>
        </CardHeader>
        <CardContent className="flex-1">
          {article.excerpt && (
            <p className="text-slate-600 line-clamp-3 mb-4">
              {article.excerpt}
            </p>
          )}
          <div className="flex items-center gap-4 text-sm text-slate-500">
            {article.author && (
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                <span>{article.author}</span>
              </div>
            )}
            {article.publishedDate && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{format(new Date(article.publishedDate), 'dd MMM yyyy', { locale: id })}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Eye className="w-4 h-4" />
              <span>{article.viewCount || 0}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" className="group/btn w-full justify-between text-primary hover:bg-primary/5 hover:text-primary rounded-xl">
            Baca Selengkapnya
            <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <TechHero
        badge="Blog & Artikel"
        title={
          <h1 className="text-5xl md:text-7xl font-black font-heading tracking-tight leading-[1.05]">
            Wawasan &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
              Berita
            </span>{" "}
            Industri
          </h1>
        }
        subtitle="Temukan artikel teknis, studi kasus, dan update terbaru tentang solusi IT dan sistem integrasi."
      >
        <div className="max-w-xl w-full">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cari artikel..."
              className="h-14 pl-12 pr-6 text-base rounded-2xl bg-white/5 border border-white/10 placeholder:text-muted-foreground/60"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </TechHero>

      {/* Category Filter */}
      <section className="py-6 border-b border-white/5 sticky top-16 z-20 backdrop-blur-xl bg-background/80">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {BLOG_CATEGORIES.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.value)}
                className={cn(
                  "rounded-full whitespace-nowrap transition-all",
                  selectedCategory === category.value
                    ? "bg-primary text-white shadow-[0_0_12px_rgba(var(--primary),0.3)]"
                    : "border-white/10 bg-white/5 hover:bg-white/10 text-muted-foreground"
                )}
              >
                <Filter className="w-4 h-4 mr-2" />
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && selectedCategory === "all" && !searchTerm && (
        <section className="py-16 border-b border-white/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <FadeIn>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1 h-8 bg-primary rounded-full shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
                  <h2 className="text-3xl font-bold">Artikel Featured</h2>
                </div>
              </FadeIn>

              <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredArticles.map((article) => (
                  <FadeIn key={article.id}>
                    <ArticleCard article={article} featured />
                  </FadeIn>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-8 bg-primary rounded-full shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
                <h2 className="text-3xl font-bold">
                  {selectedCategory === "all" ? "Semua Artikel" : BLOG_CATEGORIES.find(c => c.value === selectedCategory)?.label}
                </h2>
                <span className="text-muted-foreground text-sm font-medium">
                  ({filteredArticles.length} artikel)
                </span>
              </div>
            </FadeIn>

            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="h-[400px] border-white/10">
                    <div className="h-48 bg-white/5 animate-pulse" />
                    <CardHeader>
                      <div className="h-6 bg-white/5 animate-pulse rounded mb-2" />
                      <div className="h-4 bg-white/5 animate-pulse rounded" />
                    </CardHeader>
                    <CardContent>
                      <div className="h-20 bg-white/5 animate-pulse rounded" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredArticles.length === 0 ? (
              <Card className="p-20 text-center border-white/10 bg-white/5">
                <Newspaper className="w-20 h-20 mx-auto mb-6 text-muted-foreground/30" />
                <h3 className="text-2xl font-bold mb-3">Tidak Ada Artikel Ditemukan</h3>
                <p className="text-muted-foreground mb-8">Coba kata kunci pencarian lain atau kategori berbeda.</p>
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
              <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article) => (
                  <FadeIn key={article.id}>
                    <ArticleCard article={article} />
                  </FadeIn>
                ))}
              </StaggerContainer>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <FadeIn>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading">
                Tetap <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Terupdate</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-10">
                Dapatkan berita terbaru dan wawasan industri langsung ke inbox Anda.
              </p>
              <Button asChild size="lg" className="rounded-2xl h-14 px-8 bg-primary text-white font-bold shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)]">
                <Link href="/contact" className="flex items-center gap-2">
                  Hubungi Kami
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </Button>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
