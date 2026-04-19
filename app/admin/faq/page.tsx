"use client"

import { useState, useEffect } from "react"
import { 
  MessageCircle, 
  Plus, 
  MoreVertical, 
  Edit2, 
  Trash2,
  CheckCircle2,
  XCircle,
  Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"

export default function FAQManagement() {
  const [faqs, setFaqs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "general",
    order: 0,
    active: true,
  })

  const fetchFaqs = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/faqs?category=all")
      const data = await res.json()
      setFaqs(data || [])
    } catch (error) {
      toast.error("Failed to load FAQs")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFaqs()
  }, [])

  const handleOpenDialog = (faq?: any) => {
    if (faq) {
      setEditingId(faq.id)
      setFormData({
        question: faq.question,
        answer: faq.answer,
        category: faq.category,
        order: faq.order || 0,
        active: faq.active,
      })
    } else {
      setEditingId(null)
      setFormData({
        question: "",
        answer: "",
        category: "general",
        order: 0,
        active: true,
      })
    }
    setIsDialogOpen(true)
  }

  const handleSave = async () => {
    try {
      const method = editingId ? "PUT" : "POST"
      const url = editingId ? `/api/faqs/${editingId}` : "/api/faqs"
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      if (!res.ok) throw new Error("Failed to save")

      toast.success(editingId ? "FAQ updated" : "FAQ created")
      setIsDialogOpen(false)
      fetchFaqs()
    } catch (error) {
      toast.error("Failed to save FAQ")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return
    
    try {
      const res = await fetch(`/api/faqs/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete")
      toast.success("FAQ deleted")
      fetchFaqs()
    } catch (error) {
      toast.error("Failed to delete FAQ")
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black font-heading tracking-tight">FAQ Management</h2>
          <p className="text-muted-foreground mt-1">Manage frequently asked questions on your website.</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Button onClick={() => handleOpenDialog()} className="rounded-xl bg-primary text-white shadow-[0_0_15px_rgba(var(--primary),0.3)]">
            <Plus className="mr-2 h-4 w-4" /> Add New FAQ
          </Button>
          <DialogContent className="sm:max-w-[600px] bg-card border-white/10">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit FAQ" : "Add New FAQ"}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider">Question</label>
                <Input 
                  placeholder="What is..." 
                  value={formData.question}
                  onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
                  className="bg-background/50 border-white/10"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider">Answer</label>
                <Textarea 
                  placeholder="Detailed answer..." 
                  value={formData.answer}
                  onChange={(e) => setFormData(prev => ({ ...prev, answer: e.target.value }))}
                  className="bg-background/50 border-white/10 min-h-[120px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider">Category</label>
                  <Input 
                    placeholder="general, services..." 
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="bg-background/50 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-wider">Display Order</label>
                   <Input 
                    type="number"
                    placeholder="0" 
                    value={formData.order}
                    onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                    className="bg-background/50 border-white/10"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 mt-2">
                 <input 
                   type="checkbox" 
                   id="active" 
                   checked={formData.active} 
                   onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))} 
                   className="w-4 h-4 rounded border-white/10 bg-background/50 accent-primary"
                 />
                 <label htmlFor="active" className="text-sm cursor-pointer">Published (Active)</label>
              </div>

            </div>
            <div className="flex justify-end gap-3 mt-4">
               <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-white/10">Cancel</Button>
               <Button onClick={handleSave}>{editingId ? "Update" : "Save"} FAQ</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table/List */}
      <div className="rounded-[2rem] border border-white/5 bg-card/30 backdrop-blur-xl overflow-x-auto w-full">
        {loading ? (
          <div className="p-12 flex justify-center text-muted-foreground">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : faqs.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            No FAQs found. Add one above.
          </div>
        ) : (
            <table className="w-full text-left min-w-[800px]">
              <thead>
                <tr className="border-b border-white/5 bg-white/5 whitespace-nowrap">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Question</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground w-28">Category</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground w-20">Order</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground w-32">Status</th>
                  <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-widest text-muted-foreground w-24">Actions</th>
                </tr>
              </thead>
            <tbody className="divide-y divide-white/5">
              {faqs.map((faq: any) => (
                <tr key={faq.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <MessageCircle className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="max-w-md">
                        <p className="font-bold text-sm leading-tight group-hover:text-primary transition-colors line-clamp-1">{faq.question}</p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{faq.answer}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="bg-white/5 border-white/10 text-[10px] uppercase font-bold tracking-tighter italic">
                      {faq.category}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-muted-foreground">
                    {faq.order}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {faq.active ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span className="text-sm font-medium text-green-500">Active</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-medium text-yellow-500">Hidden</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-card border-white/10 text-foreground">
                        <DropdownMenuItem onClick={() => handleOpenDialog(faq)} className="gap-2"><Edit2 className="h-4 w-4" /> Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(faq.id)} className="gap-2 text-destructive"><Trash2 className="h-4 w-4" /> Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
