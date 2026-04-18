"use client"

import { useEffect, useState } from "react";
import { fetchProducts } from "@/lib/api-client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { Search, Filter, Package, ArrowRight, Server, Cpu, Database } from "lucide-react";
import { FadeIn } from "@/components/animations";
import { TechHero } from "@/components/ui/tech-hero";
import { FAQSection } from "@/components/faq-section";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  useEffect(() => {
    let result = products;

    if (searchTerm) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, products]);

  const categories = ["all", ...new Set(products.map(p => p.category))];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <TechHero
        badge="Katalog Produk"
        title={
          <h1 className="text-5xl md:text-7xl font-black font-heading tracking-tight leading-[1.05]">
            Hardware &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
              Perangkat IT
            </span>{" "}
            Enterprise
          </h1>
        }
        subtitle="Temukan berbagai perangkat teknis, sistem kontrol, dan hardware IT berkualitas tinggi untuk kebutuhan operasional industri Anda."
      >
        <div className="flex flex-wrap justify-center gap-3 mt-2">
          {[
            { icon: Server, text: "Server & Workstation" },
            { icon: Cpu, text: "Networking Devices" },
            { icon: Database, text: "Storage Solutions" },
            { icon: Package, text: "Industrial PC" }
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
              <item.icon className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">{item.text}</span>
            </div>
          ))}
        </div>
      </TechHero>

      {/* Products Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-4 py-2">Katalog Lengkap</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">
              Produk <span className="gradient-text">Pilihan</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Jelajahi katalog produk kami dan temukan solusi yang sesuai dengan kebutuhan bisnis Anda
            </p>
          </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 justify-between items-center">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Cari produk..."
              className="pl-12 h-12 text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-3 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="capitalize whitespace-nowrap h-11 px-6 text-sm font-semibold"
              >
                {category === "all" ? "Semua Kategori" : category.replace("_", " ")}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-muted-foreground">Memuat produk...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted/20 mb-4">
              <Search className="w-10 h-10 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-lg">Tidak ada produk ditemukan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-border/50">
                <div className="relative h-56 w-full bg-gradient-to-br from-muted/50 to-muted">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      <Package className="w-16 h-16 opacity-20" />
                    </div>
                  )}
                  <Badge className="absolute top-4 right-4 capitalize bg-primary text-primary-foreground shadow-lg">
                    {product.category.replace("_", " ")}
                  </Badge>
                </div>
                <CardHeader className="pb-4">
                  <CardTitle className="line-clamp-1 text-xl font-heading">{product.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                    {product.description}
                  </p>
                  <div className="space-y-3">
                    <div>
                      <span className="text-xs font-semibold uppercase text-muted-foreground mb-1 block">Fitur Utama:</span>
                      <p className="text-sm line-clamp-2">{product.features}</p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase text-muted-foreground mb-1 block">Area Penggunaan:</span>
                      <p className="text-sm">{product.area}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-4 border-t">
                  <Button className="w-full" asChild size="lg">
                    <Link href="https://wa.me/6287884241703?text=Halo%20PT.%20Manggala%20Utama%20Indonesia,%20saya%20ingin%20meminta%20penawaran%20harga%20untuk%20produk%20Anda." target="_blank" className="flex items-center justify-center gap-2">
                      Minta Penawaran
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection
        category="products"
        title="Pertanyaan Seputar Produk Kami"
        subtitle="Jawaban untuk pertanyaan yang sering diajukan mengenai produk, spesifikasi, dan garansi"
        limit={5}
      />
    </div>
  );
}
