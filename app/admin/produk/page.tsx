"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { Package, Plus, Edit2, Trash2, Loader2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ImageUpload } from "@/components/ui/image-upload"
import { needsUnoptimized } from "@/lib/image"
import { toast } from "sonner"

type Product = {
  id: string
  name: string
  category: string
  description: string
  features: string | null
  area: string | null
  imageUrl: string | null
}

const EMPTY = { name: "", category: "", description: "", features: "", area: "", imageUrl: "" }
const BASE_CATEGORIES = ["it", "fueling", "software"]

const labelCls = "text-xs font-bold uppercase tracking-wider"
const inputCls = "bg-background/50 border-white/10"

export default function ProductAdminPage() {
  const [items, setItems] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(EMPTY)
  const [query, setQuery] = useState("")

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/products", { cache: "no-store" })
      if (!res.ok) throw new Error()
      setItems(await res.json())
    } catch {
      toast.error("Gagal memuat produk")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const categories = useMemo(
    () => Array.from(new Set([...BASE_CATEGORIES, ...items.map((p) => p.category)])).sort(),
    [items]
  )

  const shown = items.filter((p) => {
    const q = query.trim().toLowerCase()
    return !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
  })

  const openForm = (p?: Product) => {
    setEditingId(p?.id ?? null)
    setForm(
      p
        ? {
            name: p.name,
            category: p.category,
            description: p.description,
            features: p.features ?? "",
            area: p.area ?? "",
            imageUrl: p.imageUrl ?? "",
          }
        : EMPTY
    )
    setOpen(true)
  }

  const save = async () => {
    setSaving(true)
    try {
      const res = await fetch(editingId ? `/api/products/${editingId}` : "/api/products", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.error || "Gagal menyimpan")
      toast.success(editingId ? "Produk diperbarui" : "Produk ditambahkan")
      setOpen(false)
      load()
    } catch (e: any) {
      toast.error(e.message)
    } finally {
      setSaving(false)
    }
  }

  const remove = async (p: Product) => {
    if (!confirm(`Hapus produk "${p.name}"? Produk hilang dari web dan tidak bisa dikembalikan.`)) return
    const res = await fetch(`/api/products/${p.id}`, { method: "DELETE" })
    if (res.ok) {
      toast.success("Produk dihapus")
      load()
    } else {
      toast.error("Gagal menghapus produk")
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black font-heading tracking-tight">Produk</h2>
          <p className="text-muted-foreground mt-1">Isi katalog di halaman Produk. Perubahan langsung tampil di web.</p>
        </div>
        <Button onClick={() => openForm()} className="rounded-xl bg-primary text-white shadow-[0_0_15px_rgba(var(--primary),0.3)]">
          <Plus className="mr-2 h-4 w-4" /> Tambah Produk
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Cari nama atau kategori…" value={query} onChange={(e) => setQuery(e.target.value)} className={`pl-9 ${inputCls}`} />
      </div>

      {loading ? (
        <div className="p-12 flex justify-center text-muted-foreground"><Loader2 className="w-8 h-8 animate-spin" /></div>
      ) : shown.length === 0 ? (
        <div className="rounded-[2rem] border border-white/5 bg-card/30 p-12 text-center text-muted-foreground">
          {items.length === 0 ? "Belum ada produk. Klik Tambah Produk." : "Tidak ada produk yang cocok."}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {shown.map((p) => (
            <div key={p.id} className="rounded-2xl border border-white/5 bg-card/30 backdrop-blur-xl overflow-hidden flex flex-col">
              <div className="relative aspect-video bg-white/5">
                {p.imageUrl ? (
                  <Image src={p.imageUrl} alt={p.name} fill unoptimized={needsUnoptimized(p.imageUrl)} sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground"><Package className="h-10 w-10 opacity-30" /></div>
                )}
                <Badge className="absolute top-3 left-3 capitalize bg-primary text-primary-foreground">{p.category.replace(/_/g, " ")}</Badge>
              </div>
              <div className="p-5 flex-1 flex flex-col gap-2">
                <p className="font-bold leading-tight">{p.name}</p>
                <p className="text-sm text-muted-foreground line-clamp-2">{p.description}</p>
                <div className="mt-auto pt-3 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 border-white/10" onClick={() => openForm(p)}>
                    <Edit2 className="h-4 w-4 mr-1.5" /> Ubah
                  </Button>
                  <Button variant="outline" size="sm" className="border-white/10 text-destructive hover:text-destructive" onClick={() => remove(p)} aria-label={`Hapus ${p.name}`}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[640px] max-h-[90dvh] overflow-y-auto bg-card border-white/10">
          <DialogHeader>
            <DialogTitle>{editingId ? "Ubah Produk" : "Tambah Produk"}</DialogTitle>
            <DialogDescription>Kolom bertanda * wajib diisi.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-2">
            <div className="space-y-2">
              <label className={labelCls} htmlFor="p-name">Nama produk *</label>
              <Input id="p-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
            </div>
            <div className="space-y-2">
              <label className={labelCls} htmlFor="p-cat">Kategori *</label>
              <Input id="p-cat" list="p-cat-list" placeholder="mis. it, fueling, software" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputCls} />
              <datalist id="p-cat-list">{categories.map((c) => <option key={c} value={c} />)}</datalist>
              <p className="text-xs text-muted-foreground">Kategori jadi tombol filter di halaman Produk. Pakai yang sudah ada kalau bisa.</p>
            </div>
            <div className="space-y-2">
              <label className={labelCls} htmlFor="p-desc">Deskripsi *</label>
              <Textarea id="p-desc" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={`${inputCls} min-h-[100px]`} />
            </div>
            <div className="space-y-2">
              <label className={labelCls} htmlFor="p-feat">Fitur utama</label>
              <Textarea id="p-feat" placeholder="Pisahkan dengan koma, mis. Dual PSU, RAID, Remote Management" value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} className={inputCls} />
            </div>
            <div className="space-y-2">
              <label className={labelCls} htmlFor="p-area">Area penggunaan</label>
              <Input id="p-area" placeholder="mis. SPBU, Data Center" value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} className={inputCls} />
            </div>
            <div className="space-y-2">
              <span className={labelCls}>Foto produk</span>
              <ImageUpload value={form.imageUrl} onChange={(v) => setForm({ ...form, imageUrl: (v as string) || "" })} />
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
