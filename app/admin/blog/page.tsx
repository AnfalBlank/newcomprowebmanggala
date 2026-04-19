"use client"

import { useState, useEffect } from "react"
import { 
  FileText, 
  Search, 
  Plus, 
  MoreVertical, 
  Eye, 
  Edit2, 
  Trash2,
  Calendar,
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
  DialogTrigger,
} from "@/components/ui/dialog"
import { format } from "date-fns"
import { toast } from "sonner"

export default function BlogManagement() {
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    category: "general",
    active: false,
    author: "Admin"
  })

  const fetchArticles = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/articles?limit=50")
      const data = await res.json()
      setArticles(data.articles || [])
    } catch (error) {
      toast.error("Failed to load articles")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  const handleOpenDialog = (article?: any) => {
    if (article) {
      setEditingId(article.id)
      setFormData({
        title: article.title,
        slug: article.slug,
        content: article.content,
        // Default excerpt to empty string if missing
        excerpt: article.excerpt || "", 
        category: article.category,
        active: article.active,
        author: article.author || "Admin"
      })
    } else {
      setEditingId(null)
      setFormData({
        title: "",
        slug: "",
        content: "",
        excerpt: "",
        category: "general",
        active: false,
        author: "Admin"
      })
    }
    setIsDialogOpen(true)
  }

  const handleSave = async () => {
    try {
      const method = editingId ? "PUT" : "POST"
      const url = editingId ? `/api/articles/${editingId}` : "/api/articles"
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      if (!res.ok) throw new Error("Failed to save")

      toast.success(editingId ? "Article updated" : "Article created")
      setIsDialogOpen(false)
      fetchArticles()
    } catch (error) {
      toast.error("Failed to save article")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return
    
    try {
      const res = await fetch(`/api/articles/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete")
      toast.success("Article deleted")
      fetchArticles()
    } catch (error) {
      toast.error("Failed to delete article")
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black font-heading tracking-tight">Blog Articles</h2>
          <p className="text-muted-foreground mt-1">Manage your website's content and news.</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Button onClick={() => handleOpenDialog()} className="rounded-xl bg-primary text-white shadow-[0_0_15px_rgba(var(--primary),0.3)]">
            <Plus className="mr-2 h-4 w-4" /> Create New Post
          </Button>
          <DialogContent className="sm:max-w-[700px] bg-card border-white/10 max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Article" : "Create New Article"}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider">Title</label>
                  <Input 
                    placeholder="Article Title..." 
                    value={formData.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      // Auto-generate slug conditionally for new forms if slug hasn't been set by user
                      setFormData(prev => ({ 
                        ...prev, 
                        title, 
                        slug: (!editingId && prev.slug === title.replace(/\s+/g, '-').toLowerCase().slice(0, -1)) 
                          ? title.replace(/\s+/g, '-').toLowerCase() 
                          : prev.slug 
                      }))
                    }}
                    className="bg-background/50 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider">Slug</label>
                  <Input 
                    placeholder="article-slug..." 
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    className="bg-background/50 border-white/10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider">Category</label>
                  <Input 
                    placeholder="Technology, Engineering..." 
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="bg-background/50 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-wider">Author</label>
                   <Input 
                    placeholder="Admin" 
                    value={formData.author}
                    onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                    className="bg-background/50 border-white/10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider">Excerpt</label>
                <Textarea 
                  placeholder="Short description..." 
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  className="bg-background/50 border-white/10 h-20"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider">Full Content (Markdown/Text)</label>
                <Textarea 
                  placeholder="Write your article content here..." 
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  className="bg-background/50 border-white/10 min-h-[200px]"
                />
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
               <Button onClick={handleSave}>{editingId ? "Update" : "Save"} Article</Button>
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
        ) : articles.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground">
            No articles found. Create one.
          </div>
        ) : (
          <table className="w-full text-left min-w-[900px]">
            <thead>
              <tr className="border-b border-white/5 bg-white/5 whitespace-nowrap">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Article</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground w-32">Category</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground w-32">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground w-32">Date</th>
                <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-widest text-muted-foreground w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {articles.map((article: any) => (
                <tr key={article.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <FileText className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-bold text-sm leading-tight group-hover:text-primary transition-colors">{article.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">by {article.author}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="bg-white/5 border-white/10 text-[10px] uppercase font-bold tracking-tighter italic">
                      {article.category}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {article.active ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span className="text-sm font-medium text-green-500">Published</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-medium text-yellow-500">Draft</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      {format(new Date(article.createdAt), "MMM dd, yyyy")}
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
                        <DropdownMenuItem onClick={() => window.open(`/blog/${article.slug}`, '_blank')} className="gap-2"><Eye className="h-4 w-4" /> View</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleOpenDialog(article)} className="gap-2"><Edit2 className="h-4 w-4" /> Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(article.id)} className="gap-2 text-destructive"><Trash2 className="h-4 w-4" /> Delete</DropdownMenuItem>
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
