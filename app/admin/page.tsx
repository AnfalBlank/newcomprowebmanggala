"use client"

import { motion } from "framer-motion"
import { 
  Users, 
  MessageSquare, 
  FileText, 
  TrendingUp, 
  Clock,
  ArrowUpRight,
  Plus
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AdminDashboard() {
  const stats = [
    { title: "Total Inquiries", value: "24", change: "+12%", icon: MessageSquare, color: "text-blue-500" },
    { title: "Published Articles", value: "15", change: "+2", icon: FileText, color: "text-primary" },
    { title: "Total Projects", value: "42", change: "+5", icon: Users, color: "text-accent" },
    { title: "Avg. Response Time", value: "1.2h", change: "-15%", icon: Clock, color: "text-purple-500" },
  ]

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black font-heading tracking-tight">System Overview</h2>
          <p className="text-muted-foreground mt-1">Monitor your website's performance and inquiries.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl border-white/5 bg-white/5">
            Export Report
          </Button>
          <Button className="rounded-xl bg-primary text-white shadow-[0_0_15px_rgba(var(--primary),0.3)]">
            <Plus className="mr-2 h-4 w-4" /> New Article
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="border-white/5 bg-card/30 backdrop-blur-xl hover:border-primary/20 transition-all group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-primary/50 transition-all`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-lg">
                    {stat.change} <ArrowUpRight className="h-3 w-3" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-black font-heading tracking-tight">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Inquiries */}
        <Card className="lg:col-span-2 border-white/5 bg-card/30 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-heading">Recent Inquiries</CardTitle>
              <CardDescription>Messages from your contact form.</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-xs hover:bg-white/5">View All</Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-white/5">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="px-6 py-5 hover:bg-white/5 transition-colors flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center font-bold text-blue-500">
                      JS
                    </div>
                    <div>
                      <p className="text-sm font-bold">John Smith</p>
                      <p className="text-xs text-muted-foreground">Inquiry about Fueling System</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-muted-foreground">2 hours ago</span>
                    <Button variant="outline" size="sm" className="opacity-0 group-hover:opacity-100 transition-all rounded-lg border-white/10 h-8">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card className="border-white/5 bg-card/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="font-heading">System Status</CardTitle>
            <CardDescription>Real-time platform monitoring.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {[
              { label: "Storage Use", value: 65, color: "bg-blue-500" },
              { label: "API Requests", value: 42, color: "bg-primary" },
              { label: "Engagement", value: 88, color: "bg-accent" },
            ].map((item) => (
              <div key={item.label} className="space-y-3">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  <span>{item.label}</span>
                  <span>{item.value}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full ${item.color} shadow-[0_0_10px_rgba(var(--primary),0.5)]`} 
                  />
                </div>
              </div>
            ))}

            <div className="pt-4">
              <div className="p-4 rounded-2xl bg-green-500/5 border border-green-500/20 flex items-center gap-4">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse ring-4 ring-green-500/20" />
                <span className="text-xs font-bold text-green-500 uppercase tracking-widest">All Systems Operational</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
