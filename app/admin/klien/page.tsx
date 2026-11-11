"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Plus, Edit2, Trash2, Loader2, ArrowUp, ArrowDown, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ImageUpload } from "@/components/ui/image-upload"
import { needsUnoptimized } from "@/lib/image"
import { toast } from "sonner"

type Client = {
  id: string
  name: string
  logoUrl: string
  sortOrder: number
  active: boolean
}

const labelCls = "text-xs font-bold uppercase tracking-wider"
const inputCls = "bg-background/50 border-white/10"

export default function ClientAdminPage() {
  const [items, setItems] = useState<Client[]>([])
  const [tableReady, setTableReady] = useState(true)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [busyId, setBusyId] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({ name: "", logoUrl: "", active: true })

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/clients?all=1", { cache: "no-store" })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setItems(data.clients || [])
      setTableReady(data.tableReady !== false)
    } catch {
      toast.error("Gagal memuat klien")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const openForm = (c?: Client) => {
    setEditingId(c?.id ?? null)
    setForm(c ? { name: c.name, logoUrl: c.logoUrl, active: c.active } : { name: "", logoUrl: "", active: true })
    setOpen(true)
  }

  const save = async () => {
    setSaving(true)
    try {
      const nextOrder = items.reduce((m, c) => Math.max(m, c.sortOrder), 0) + 1
      const res = await fetch(editingId ? `/api/clients/${editingId}` : "/api/clients", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingId ? form : { ...form, sortOrder: nextOrder }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.error || "Gagal menyimpan")
      toast.success(editingId ? "Klien diperbarui" : "Klien ditambahkan")
      setOpen(false)
      load()
    } catch (e: any) {
      toast.error(e.message)
    } finally {
      setSaving(false)
    }
  }

  const patch = async (id: string, body: Partial<Client>) => {
    const res = await fetch(`/api/clients/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error()
  }

  const toggle = async (c: Client) => {
    setBusyId(c.id)
    try {
      await patch(c.id, { active: !c.active })
      toast.success(c.active ? `${c.name} disembunyikan dari web` : `${c.name} tampil lagi di web`)
      await load()
    } catch {
      toast.error("Gagal mengubah status")
    } finally {
      setBusyId(null)
    }
  }

  // Tukar posisi dengan tetangga, lalu simpan ulang urutan 1..n supaya rapi.
  const move = async (index: number, dir: -1 | 1) => {
    const target = index + dir
    if (target < 0 || target >= items.length) return
    const next = [...items]
    ;[next[index], next[target]] = [next[target]!, next[index]!]
    setItems(next)
    setBusyId(next[target]!.id)
    try {
      await Promise.all(
        next.map((c, i) => (c.sortOrder === i + 1 ? null : patch(c.id, { sortOrder: i + 1 })))
      )
      await load()
    } catch {
      toast.error("Gagal menyimpan urutan")
      load()
    } finally {
      setBusyId(null)
    }
  }

  const remove = async (c: Client) => {
    if (!confirm(`Hapus klien "${c.name}"? Kalau cuma mau disembunyikan sementara, pakai tombol Tampil.`)) return
    const res = await fetch(`/api/clients/${c.id}`, { method: "DELETE" })
    if (res.ok) {
      toast.success("Klien dihapus")
      load()
    } else {
      toast.error("Gagal menghapus klien")
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black font-heading tracking-tight">Klien</h2>
          <p className="text-muted-foreground mt-1">Logo di bagian “Trusted by” beranda dan halaman About, sesuai urutan di sini.</p>
        </div>
        <Button onClick={() => openForm()} disabled={!tableReady} className="rounded-xl bg-primary text-white shadow-[0_0_15px_rgba(var(--primary),0.3)]">
          <Plus className="mr-2 h-4 w-4" /> Tambah Klien
        </Button>
      </div>

      {!tableReady && (
        <div className="flex gap-3 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-sm text-yellow-200">
          <AlertTriangle className="h-5 w-5 shrink-0 text-yellow-400" />
          <p>
            Tabel klien belum dipasang di database, jadi web masih memakai 6 logo bawaan. Minta developer menjalankan
            <code className="mx-1 rounded bg-black/30 px-1.5 py-0.5">scripts/pasang-tabel-klien.mjs</code> sekali.
          </p>
        </div>
      )}

      {loading ? (
        <div className="p-12 flex justify-center text-muted-foreground"><Loader2 className="w-8 h-8 animate-spin" /></div>
      ) : tableReady && items.length === 0 ? (
        <div className="rounded-[2rem] border border-white/5 bg-card/30 p-12 text-center text-muted-foreground">
          Belum ada klien. Bagian “Trusted by” di web akan kosong sampai ada klien yang tampil.
        </div>
      ) : (
        <ol className="space-y-3">
          {items.map((c, i) => (
            <li key={c.id} className="flex flex-wrap sm:flex-nowrap items-center gap-4 rounded-2xl border border-white/5 bg-card/30 backdrop-blur-xl p-4">
              <span className="w-6 text-center text-sm font-mono text-muted-foreground">{i + 1}</span>
              <div className={`relative h-14 w-28 shrink-0 rounded-xl bg-white/90 ${c.active ? "" : "opacity-40"}`}>
                <Image src={c.logoUrl} alt={c.name} fill unoptimized={needsUnoptimized(c.logoUrl)} sizes="112px" className="object-contain p-2" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold truncate">{c.name}</p>
                <p className={`text-xs ${c.active ? "text-green-500" : "text-yellow-500"}`}>{c.active ? "Tampil di web" : "Disembunyikan"}</p>
              </div>
              <div className="flex w-full sm:w-auto items-center justify-end gap-2">
                <label className="flex items-center gap-2 text-xs text-muted-foreground mr-1">
                  <Switch checked={c.active} disabled={busyId === c.id} onCheckedChange={() => toggle(c)} aria-label={`Tampilkan ${c.name}`} />
                  Tampil
                </label>
                <Button variant="outline" size="icon" className="h-9 w-9 border-white/10" disabled={i === 0 || !!busyId} onClick={() => move(i, -1)} aria-label="Naikkan urutan">
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-9 w-9 border-white/10" disabled={i === items.length - 1 || !!busyId} onClick={() => move(i, 1)} aria-label="Turunkan urutan">
                  <ArrowDown className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-9 w-9 border-white/10" onClick={() => openForm(c)} aria-label={`Ubah ${c.name}`}>
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-9 w-9 border-white/10 text-destructive hover:text-destructive" onClick={() => remove(c)} aria-label={`Hapus ${c.name}`}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </li>
          ))}
        </ol>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[520px] max-h-[90dvh] overflow-y-auto bg-card border-white/10">
          <DialogHeader>
            <DialogTitle>{editingId ? "Ubah Klien" : "Tambah Klien"}</DialogTitle>
            <DialogDescription>Pakai logo PNG latar transparan supaya rapi di web.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-2">
            <div className="space-y-2">
              <label className={labelCls} htmlFor="k-name">Nama klien *</label>
              <Input id="k-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
            </div>
            <div className="space-y-2">
              <span className={labelCls}>Logo *</span>
              <ImageUpload fit="contain" value={form.logoUrl} onChange={(v) => setForm({ ...form, logoUrl: (v as string) || "" })} label="Pilih atau tarik logo ke sini" />
            </div>
            <label className="flex items-center gap-3 text-sm">
              <Switch checked={form.active} onCheckedChange={(v) => setForm({ ...form, active: v })} />
              Tampilkan di web
            </label>
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
