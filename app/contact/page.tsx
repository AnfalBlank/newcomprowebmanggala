'use client';

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle, ArrowRight } from "lucide-react"
import { TechHero } from "@/components/ui/tech-hero"
import { toast } from "sonner"
import { FAQSection } from "@/components/faq-section"

const formSchema = z.object({
  name: z.string().min(2, "Nama wajib diisi"),
  email: z.string().email("Email tidak valid"),
  phone: z.string().min(8, "Nomor telepon tidak valid"),
  company: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Pesan minimal 10 karakter"),
})

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error("Failed to submit")

      toast.success("Pesan Anda telah terkirim! Tim kami akan segera menghubungi Anda.")
      setIsSuccess(true)
      reset()
    } catch (error) {
      console.error(error)
      toast.error("Gagal mengirim pesan. Silakan coba lagi.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-hidden">
      {/* Hero Section */}
      <TechHero
        badge="Connect With Us"
        title={
          <h1 className="text-5xl md:text-7xl font-black font-heading tracking-tight leading-[1.05]">
            Mari Bangun{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
              Masa Depan
            </span>{" "}
            Bersama.
          </h1>
        }
        subtitle="Diskusikan tantangan engineering Anda dengan tim ahli kami. Kami siap menghadirkan solusi infrastruktur yang scalable dan handal untuk bisnis Anda."
        minHeight="min-h-[60vh]"
      />

      {/* Main Content */}
      <section className="py-24 px-6 relative">
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Contact Info */}
            <div className="space-y-8 lg:sticky lg:top-32 h-fit">
              {[
                { 
                  icon: MapPin, 
                  title: "Kantor Pusat", 
                  text: "Jl. Kapling DPR, Kec. Cakung Jakarta Timur, 13920",
                  subtext: "PT. Manggala Utama Indonesia"
                },
                { 
                  icon: Phone, 
                  title: "Direct Contact", 
                  text: "+62 878-8424-1703",
                  subtext: "Senin - Jumat, 09:00 - 17:00"
                },
                { 
                  icon: Mail, 
                  title: "Support Email", 
                  text: "admin@manggala-utama.id",
                  subtext: "Respon dalam 24 jam"
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-primary/50 transition-all shadow-xl">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-1">{item.title}</h3>
                    <p className="text-xl font-bold mb-1">{item.text}</p>
                    <p className="text-sm text-muted-foreground">{item.subtext}</p>
                  </div>
                </motion.div>
              ))}

              <div className="pt-8 p-8 rounded-3xl bg-primary/5 border border-primary/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse ring-4 ring-green-500/20" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-green-500">Fast Response Available</span>
                </div>
                <p className="text-sm leading-relaxed mb-6">
                  Butuh konsultasi mendesak? Hubungi tim support kami melalui WhatsApp untuk respon instan.
                </p>
                <Button variant="outline" className="w-full rounded-xl border-white/10 bg-white/5 hover:bg-primary hover:text-white transition-all font-bold">
                  <a
                    href={`https://wa.me/6287884281703?text=${encodeURIComponent('Halo PT. Manggala Utama Indonesia, saya membutuhkan konsultasi teknis segera. Bisakah tim Anda membantu saya sekarang?')}`}
                    target="_blank"
                    className="flex items-center gap-2"
                  >
                    Chat on WhatsApp <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="p-8 md:p-12 rounded-[2.5rem] bg-card/30 backdrop-blur-xl border border-white/5 shadow-2xl"
              >
                {isSuccess ? (
                  <div className="text-center py-20">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/20 mb-8 border border-primary/30">
                      <CheckCircle className="w-12 h-12 text-primary" />
                    </div>
                    <h2 className="text-3xl font-black font-heading mb-4">Pesan Terkirim!</h2>
                    <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto">
                      Terima kasih telah menghubungi kami. Tim kami akan segera meninjau pesan Anda dan merespon secepat mungkin.
                    </p>
                    <Button onClick={() => setIsSuccess(false)} variant="outline" className="rounded-xl border-white/10">
                      Kirim Pesan Lain
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground pl-1">Full Name</Label>
                        <Input
                          placeholder="John Carter"
                          {...register("name")}
                          className="h-14 rounded-2xl border-white/5 bg-white/5 focus:ring-primary/20 focus:border-primary/30 transition-all px-6 text-lg"
                        />
                        {errors.name && <p className="text-xs text-destructive pl-1">{errors.name.message}</p>}
                      </div>
                      <div className="space-y-3">
                        <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground pl-1">Business Email</Label>
                        <Input
                          type="email"
                          placeholder="john@company.com"
                          {...register("email")}
                          className="h-14 rounded-2xl border-white/5 bg-white/5 focus:ring-primary/20 focus:border-primary/30 transition-all px-6 text-lg"
                        />
                        {errors.email && <p className="text-xs text-destructive pl-1">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground pl-1">Phone Number</Label>
                        <Input
                          placeholder="+62 812..."
                          {...register("phone")}
                          className="h-14 rounded-2xl border-white/5 bg-white/5 focus:ring-primary/20 focus:border-primary/30 transition-all px-6 text-lg"
                        />
                        {errors.phone && <p className="text-xs text-destructive pl-1">{errors.phone.message}</p>}
                      </div>
                      <div className="space-y-3">
                        <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground pl-1">Company Name</Label>
                        <Input
                          placeholder="PT. Example Indo"
                          {...register("company")}
                          className="h-14 rounded-2xl border-white/5 bg-white/5 focus:ring-primary/20 focus:border-primary/30 transition-all px-6 text-lg"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground pl-1">Subject</Label>
                      <Input
                        placeholder="Inquiry about fueling systems"
                        {...register("subject")}
                        className="h-14 rounded-2xl border-white/5 bg-white/5 focus:ring-primary/20 focus:border-primary/30 transition-all px-6 text-lg"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground pl-1">Your Message</Label>
                      <Textarea
                        placeholder="Dapatkah Anda membantu kami dengan..."
                        rows={6}
                        {...register("message")}
                        className="rounded-2xl border-white/5 bg-white/5 focus:ring-primary/20 focus:border-primary/30 transition-all p-6 text-lg resize-none"
                      />
                      {errors.message && <p className="text-xs text-destructive pl-1">{errors.message.message}</p>}
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-16 rounded-2xl bg-primary text-white font-black text-xl shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-transparent rounded-full animate-spin" />
                          MENGRIM...
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          SEND MESSAGE <Send className="w-5 h-5" />
                        </div>
                      )}
                    </Button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FAQSection
        category="general"
        className="py-24 border-t border-white/5"
      />
    </div>
  )
}
