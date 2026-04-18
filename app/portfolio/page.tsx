"use client";

import { useEffect, useState } from "react";
import { fetchProjects } from "@/lib/api-client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Briefcase, ChevronRight, FolderOpen, MapPin, Calendar as CalendarIcon } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import { TechHero } from "@/components/ui/tech-hero";

export default function PortfolioPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        console.error("Failed to load projects:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <TechHero
        badge="Portfolio & Showcase"
        title={
          <h1 className="text-5xl md:text-7xl font-black font-heading tracking-tight leading-[1.05]">
            Proyek{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
              Sukses
            </span>{" "}
            Kami
          </h1>
        }
        subtitle={t('portfolio.subtitle')}
      >
        {[
          { value: "500+", label: "Proyek Selesai" },
          { value: "50+", label: "Klien Puas" },
          { value: "10+", label: "Industri" }
        ].map((stat) => (
          <div key={stat.label} className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-2xl font-black font-heading text-primary">{stat.value}</span>
            <span className="text-sm text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </TechHero>

      {/* Projects Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-muted-foreground">{t('common.loading')}</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted/20 mb-4">
                <Briefcase className="w-10 h-10 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-lg">Tidak ada proyek ditemukan.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Card key={project.id} className="group hover:shadow-2xl transition-all duration-300 overflow-hidden border border-border/50 hover:border-primary/50">
                  <div className="relative h-72 w-full bg-gradient-to-br from-muted to-muted">
                    {project.imageUrl ? (
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        <Briefcase className="w-16 h-16 opacity-20" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6">
                      <Badge className="bg-primary/90 backdrop-blur-sm text-white hover:bg-primary transition-colors">
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-4">
                    <CardTitle className="line-clamp-2 min-h-[3.5rem] text-xl group-hover:text-primary transition-colors font-heading">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground line-clamp-3 text-sm min-h-[4.5rem]">
                      {project.description}
                    </p>

                    <div className="space-y-3 border-t pt-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="truncate">{project.location || "Indonesia"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarIcon className="w-4 h-4 text-primary" />
                        <span>{project.year || "2024"}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-4 border-t">
                    <Button className="w-full group" asChild size="lg">
                      <Link href={`/portfolio/${project.id}`} className="flex items-center justify-center gap-2">
                        Lihat Detail
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
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
