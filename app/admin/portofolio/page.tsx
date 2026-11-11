"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Briefcase, Plus, Edit2, Trash2, Loader2, Images, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ImageUpload } from "@/components/ui/image-upload"
import { needsUnoptimized, parseGallery } from "@/lib/image"
import { toast } from "sonner"

type Project = {
  id: string
  title: string
  category: string
  description: string
  client: string | null
  year: string | null
  imageUrl: string | null
  gallery: string | null
  scope: string | null
}

type FormState = {
  title: string
  category: string
  description: string
  client: string
  year: string
  imageUrl: string
  gallery: string[]
  scope: string
}

const EMPTY: FormState = { title: "", category: "", description: "", client: "", year: "", imageUrl: "", gallery: [], scope: "" }
const MAX_GALLERY = 20

const labelCls = "text-xs font-bold uppercase tracking-wider"
const inputCls = "bg-background/50 border-white/10"

export default function PortfolioAdminPage() {
  const [items, setItems] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(EMPTY)

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/projects", { cache: "no-store" })
      if (!res.ok) throw new Error()
      setItems(await res.json())
    } catch {
      toast.error("Gagal memuat portofolio")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const categories = useMemo(() => Array.from(new Set(items.map((p) => p.category))).sort(), [items])

  const openForm = (p?: Project) => {
    setEditingId(p?.id ?? null)
    setForm(
      p
        ? {
            title: p.title,
            category: p.category,
            description: p.description,
            client: p.client ?? "",
            year: p.year ?? "",
            imageUrl: p.imageUrl ?? "",
            gallery: parseGallery(p.gallery),
            scope: p.scope ?? "",
          }
        : EMPTY
    )
    setOpen(true)
  }

  const save = async () => {
    setSaving(true)
    try {
      const res = await fetch(editingId ? `/api/projects/${editingId}` : "/api/projects", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.error || "Gagal menyimpan")
      toast.success(editingId ? "Proyek diperbarui" : "Proyek ditambahkan")
      setOpen(false)
      load()
    } catch (e: any) {
      toast.error(e.message)
    } finally {
      setSaving(false)
    }
  }

  const remove = async (p: Project) => {
    if (!confirm(`Hapus proyek "${p.title}"? Proyek hilang dari web dan tidak bisa dikembalikan.`)) return
    const res = await fetch(`/api/projects/${p.id}`, { method: "DELETE" })
    if (res.ok) {
      toast.success("Proyek dihapus")
      load()
    } else {
      toast.error("Gagal menghapus proyek")
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black font-heading tracking-tight">Portofolio</h2>
          <p className="text-muted-foreground mt-1">Proyek yang tampil di halaman Portfolio, lengkap dengan foto dokumentasi.</p>
        </div>
        <Button onClick={() => openForm()} className="rounded-xl bg-primary text-white shadow-[0_0_15px_rgba(var(--primary),0.3)]">
          <Plus className="mr-2 h-4 w-4" /> Tambah Proyek
        </Button>
      </div>

      {loading ? (
        <div className="p-12 flex justify-center text-muted-foreground"><Loader2 className="w-8 h-8 animate-spin" /></div>
      ) : items.length === 0 ? (
        <div className="rounded-[2rem] border border-white/5 bg-card/30 p-12 text-center text-muted-foreground">
          Belum ada proyek. Klik Tambah Proyek.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {items.map((p) => {
            const count = parseGallery(p.gallery).length
            return (
              <div key={p.id} className="rounded-2xl border border-white/5 bg-card/30 backdrop-blur-xl overflow-hidden flex flex-col">
                <div className="relative aspect-video bg-white/5">
                  {p.imageUrl ? (
                    <Image src={p.imageUrl} alt={p.title} fill unoptimized={needsUnoptimized(p.imageUrl)} sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground"><Briefcase className="h-10 w-10 opacity-30" /></div>
                  )}
                  <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">{p.category}</Badge>
                  <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 text-xs text-white">
                    <Images className="h-3.5 w-3.5" /> {count} foto
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col gap-1.5">
                  <p className="font-bold leading-tight">{p.title}</p>
                  <p className="text-xs text-muted-foreground">{[p.client, p.year].filter(Boolean).join(" · ") || "Klien & tahun belum diisi"}</p>
                  <div className="mt-auto pt-3 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 border-white/10" onClick={() => openForm(p)}>
                      <Edit2 className="h-4 w-4 mr-1.5" /> Ubah
                    </Button>
                    <Button variant="outline" size="sm" className="border-white/10" asChild>
                      <Link href={`/portfolio/${p.id}`} target="_blank" aria-label={`Lihat ${p.title} di web`}><ExternalLink className="h-4 w-4" /></Link>
                    </Button>
                    <Button variant="outline" size="sm" className="border-white/10 text-destructive hover:text-destructive" onClick={() => remove(p)} aria-label={`Hapus ${p.title}`}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[720px] max-h-[90dvh] overflow-y-auto bg-card border-white/10">
          <DialogHeader>
            <DialogTitle>{editingId ? "Ubah Proyek" : "Tambah Proyek"}</DialogTitle>
            <DialogDescription>Kolom bertanda * wajib diisi.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-2">
            <div className="space-y-2">
              <label className={labelCls} htmlFor="j-title">Judul proyek *</label>
              <Input id="j-title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputCls} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className={labelCls} htmlFor="j-cat">Kategori *</label>
                <Input id="j-cat" list="j-cat-list" placeholder="mis. Fuel Automation" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputCls} />
                <datalist id="j-cat-list">{categories.map((c) => <option key={c} value={c} />)}</datalist>
              </div>
              <div className="space-y-2">
                <label className={labelCls} htmlFor="j-year">Tahun</label>
                <Input id="j-year" inputMode="numeric" maxLength={4} placeholder="2025" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value.replace(/\D/g, "") })} className={inputCls} />
              </div>
            </div>
            <div className="space-y-2">
              <label className={labelCls} htmlFor="j-client">Klien / lokasi</label>
              <Input id="j-client" value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} className={inputCls} />
            </div>
            <div className="space-y-2">
              <label className={labelCls} htmlFor="j-desc">Deskripsi *</label>
              <Textarea id="j-desc" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={`${inputCls} min-h-[110px]`} />
            </div>
            <div className="space-y-2">
              <label className={labelCls} htmlFor="j-scope">Ruang lingkup</label>
              <Input id="j-scope" placeholder="Pisahkan dengan koma, mis. Supply, Instalasi, Commissioning" value={form.scope} onChange={(e) => setForm({ ...form, scope: e.target.value })} className={inputCls} />
            </div>
            <div className="space-y-2">
              <span className={labelCls}>Foto utama</span>
              <ImageUpload value={form.imageUrl} onChange={(v) => setForm({ ...form, imageUrl: (v as string) || "" })} />
            </div>
            <div className="space-y-2">
              <span className={labelCls}>Galeri dokumentasi</span>
              <p className="text-xs text-muted-foreground">Boleh pilih banyak foto sekaligus. Urutan bisa digeser dengan tombol panah.</p>
              <ImageUpload multiple maxFiles={MAX_GALLERY} value={form.gallery} onChange={(v) => setForm({ ...form, gallery: (v as string[]) || [] })} />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setOpen(false)} className="border-white/10">Batal</Button>
            <Button onClick={save} disabled={saving}>
              {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />} Simpan
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
