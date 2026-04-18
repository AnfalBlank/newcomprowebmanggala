"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FadeIn } from "@/components/animations"
import { HelpCircle, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface FAQSectionProps {
  category: string
  title?: string
  subtitle?: string
  limit?: number
  className?: string
}

export function FAQSection({ category, title, subtitle, limit = 5, className }: FAQSectionProps) {
  const [faqs, setFaqs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFAQs() {
      try {
        const res = await fetch(`/api/faqs?active=true&category=${category}`)
        if (!res.ok) {
          console.error('Failed to fetch FAQs:', res.statusText)
          if (res.status === 500) {
            setFaqs([])
            return
          }
        }
        const data = await res.json()
        setFaqs((data || []).slice(0, limit))
      } catch (error) {
        console.error("Failed to load FAQs:", error)
        setFaqs([])
      } finally {
        setLoading(false)
      }
    }
    fetchFAQs()
  }, [category, limit])

  const getCategoryBadge = (cat: string) => {
    const map: Record<string, string> = {
      'general':   'bg-blue-500/20 text-blue-300 border-blue-500/30',
      'products':  'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      'services':  'bg-purple-500/20 text-purple-300 border-purple-500/30',
      'technical': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      'billing':   'bg-red-500/20 text-red-300 border-red-500/30',
    }
    return map[cat] || 'bg-white/10 text-white/60 border-white/20'
  }

  const getCategoryLabel = (cat: string) => {
    const labels: Record<string, string> = {
      'general': 'Umum', 'products': 'Produk',
      'services': 'Layanan', 'technical': 'Teknis', 'billing': 'Tagihan',
    }
    return labels[cat] || cat
  }

  if (loading) {
    return (
      <section className={cn("py-16 md:py-24 relative", className)}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="p-6 bg-white/5 border-white/8">
                <div className="h-5 bg-white/5 animate-pulse rounded mb-3 w-3/4" />
                <div className="h-16 bg-white/5 animate-pulse rounded" />
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (faqs.length === 0) return null

  return (
    <section className={cn("py-16 md:py-24 relative", className)}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-5">
                <HelpCircle className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-widest text-primary">FAQ</span>
              </div>
              {title && (
                <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading text-white">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-lg text-white/50 max-w-3xl mx-auto">
                  {subtitle}
                </p>
              )}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Card className="bg-white/5 border-white/10 overflow-hidden">
              <CardContent className="p-0">
                <Accordion type="single" collapsible className="divide-y divide-white/8">
                  {faqs.map((faq, index) => (
                    <AccordionItem value={faq.id} key={faq.id} className="border-white/8">
                      <AccordionTrigger className="px-6 py-5 hover:bg-white/[0.04] transition-colors text-left group">
                        <div className="flex items-start gap-4 flex-1 min-w-0">
                          <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-black text-sm group-hover:bg-primary group-hover:text-white transition-all duration-300 border border-primary/30 shadow-[0_0_12px_rgba(var(--primary),0.15)]">
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
                          <p className="text-white/60 leading-relaxed whitespace-pre-line text-sm">
                            {faq.answer.split(/\*\*(.*?)\*\*/g).map((part: string, i: number) => 
                              i % 2 === 1 ? (
                                <span key={i} className="text-primary font-bold">{part}</span>
                              ) : (
                                part
                              )
                            )}
                          </p>
                          <div className="mt-4">
                            <Badge className={cn("border text-xs", getCategoryBadge(faq.category))}>
                              {getCategoryLabel(faq.category)}
                            </Badge>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </FadeIn>

          {faqs.length >= limit && (
            <FadeIn delay={0.4}>
              <div className="text-center mt-10">
                <Button variant="outline" asChild className="rounded-full border-white/15 bg-white/5 hover:bg-white/10 text-white gap-2">
                  <Link href="/faq">
                    Lihat Semua FAQ <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </section>
  )
}
