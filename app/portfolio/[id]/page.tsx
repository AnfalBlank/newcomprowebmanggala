"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  ChevronLeft, 
  Calendar, 
  Briefcase, 
  MapPin, 
  CheckCircle2,
  Image as ImageIcon,
  ArrowRight
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/context/LanguageContext";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    async function loadProject() {
      try {
        const res = await fetch(`/api/projects/${id}`);
        if (!res.ok) throw new Error("Project not found");
        const data = await res.json();
        setProject(data);
      } catch (error) {
        console.error("Error loading project:", error);
        router.push("/portfolio");
      } finally {
        setLoading(false);
      }
    }
    if (id) loadProject();
  }, [id, router]);

  let gallery = [];
  try {
    if (project?.gallery) {
      gallery = typeof project.gallery === 'string' ? JSON.parse(project.gallery) : project.gallery;
    }
  } catch (e) {
    console.error("Failed to parse gallery", e);
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <Skeleton className="h-8 w-48 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-[400px] w-full rounded-xl" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-32 w-full" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-64 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!project) return null;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
        {project.imageUrl ? (
          <Image 
            src={project.imageUrl} 
            alt={project.title} 
            fill 
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-800 via-slate-900 to-black flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-4 relative z-10 backdrop-blur-sm border border-primary/30 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
               <Briefcase className="h-10 w-10 text-primary" />
            </div>
            <p className="text-white/60 font-medium tracking-widest uppercase text-xs relative z-10">Dokumentasi Proyek</p>
          </div>
        )}
        <div className="absolute inset-0 bg-black/60 md:bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center text-center p-4">
          <div className="max-w-4xl space-y-4 pt-10">
            <Badge className="bg-primary/90 backdrop-blur-md border-white/20 text-white font-bold tracking-widest uppercase text-[10px] mb-2">{project.category}</Badge>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight lg:leading-[1.1] drop-shadow-lg">{project.title}</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 md:-mt-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-none shadow-xl shadow-slate-200/50 overflow-hidden">
              <CardContent className="p-8 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-primary rounded-full block" />
                    Deskripsi Proyek
                  </h2>
                  <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {project.description}
                  </p>
                </div>

                {project.scope && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-primary rounded-full block" />
                      {t('portfolio.scope')}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.scope.split(',').map((item: string, i: number) => (
                        <div key={i} className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                          <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm font-medium text-slate-700">{item.trim()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Gallery Documentation */}
                {gallery.length > 0 && (
                  <div className="pt-4">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-primary rounded-full block" />
                      {t('portfolio.documentation')}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {gallery.map((url: string, index: number) => (
                        <div key={index} className="group relative aspect-video rounded-2xl overflow-hidden shadow-lg hover:shadow-primary/20 transition-all duration-300">
                          <Image 
                            src={url} 
                            alt={`${project.title} - Documentation ${index + 1}`} 
                            fill 
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                            <span className="text-white text-xs font-medium">{t('portfolio.documentation')} #{index + 1}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-between items-center pt-4">
              <Button variant="outline" asChild className="rounded-full px-6">
                <Link href="/portfolio">
                  <ChevronLeft className="h-4 w-4 mr-2" /> Kembali ke Portfolio
                </Link>
              </Button>
              <Button asChild className="rounded-full px-8 shadow-lg shadow-primary/30">
                <Link href="https://wa.me/6287884241703?text=Halo%20PT.%20Manggala%20Utama%20Indonesia,%20saya%20tertarik%20mengembangkan%20proyek%20serupa:" target="_blank">
                  Konsultasi Proyek Anda <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <Card className="border-none shadow-xl shadow-slate-200/50 sticky top-24">
              <CardContent className="p-8 space-y-6">
                <h3 className="text-xl font-bold border-b pb-4">Informasi Proyek</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Klien / Lokasi</p>
                      <p className="font-semibold text-slate-800">{project.client || "Instansi Pemerintah/Swasta"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Tahun Pelaksanaan</p>
                      <p className="font-semibold text-slate-800">{project.year || "2023 - 2024"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Status Proyek</p>
                      <p className="font-semibold text-slate-800">Selesai 100%</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-200">
                  <p className="text-sm text-slate-600 italic leading-relaxed">
                    "Proyek ini merupakan bukti komitmen kami dalam memberikan layanan berkualitas tinggi 
                    dengan mengutamakan keselamatan dan kepuasan klien."
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function Separator() {
  return <div className="h-px w-full bg-slate-100" />;
}
