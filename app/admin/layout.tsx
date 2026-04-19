"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  FileText, 
  Image as ImageIcon, 
  MessageSquare, 
  Settings, 
  ChevronLeft,
  Menu,
  LogOut,
  Globe,
  HelpCircle
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
  SidebarRail
} from "@/components/ui/sidebar"
import { useSession, signOut } from "@/lib/auth-client"
import { redirect } from "next/navigation"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { data: session, isPending } = useSession()

  // Protect the admin route (Bypassed temporarily for Development UI Testing)
  // React.useEffect(() => {
  //   if (!isPending && !session) {
  //     redirect("/auth/login")
  //   }
  // }, [session, isPending])

  // if (isPending) return <div className="h-screen w-full flex items-center justify-center bg-background"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Blog Posts", href: "/admin/blog", icon: FileText },
    { name: "FAQ", href: "/admin/faq", icon: HelpCircle },
    { name: "Solutions", href: "/admin/solutions", icon: ImageIcon },
    { name: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ]

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar collapsible="icon" className="border-r border-white/5 bg-card/30 backdrop-blur-xl">
          <SidebarHeader className="p-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight truncate group-data-[collapsible=icon]:hidden">
                Manggala <span className="text-primary">Admin</span>
              </span>
            </Link>
          </SidebarHeader>
          <SidebarContent className="px-3">
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.name}
                    className="h-11 rounded-xl"
                  >
                    <Link href={item.href}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4 border-t border-white/5">
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-3 h-11 rounded-xl text-destructive hover:bg-destructive/10"
              onClick={() => signOut()}
            >
              <LogOut className="h-5 w-5" />
              <span className="group-data-[collapsible=icon]:hidden">Sign Out</span>
            </Button>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>

        <SidebarInset className="flex flex-col">
          <header className="flex h-16 items-center gap-4 border-b border-white/5 bg-background/50 backdrop-blur-md px-6 sticky top-0 z-10">
            <SidebarTrigger />
            <div className="h-4 w-px bg-white/10" />
            <div className="flex-1">
              <h1 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
                {navItems.find(i => i.href === pathname)?.name || "Dashboard"}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end leading-none">
                <span className="text-sm font-bold">{session?.user?.name}</span>
                <span className="text-[10px] text-muted-foreground">{session?.user?.email}</span>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                <span className="font-bold text-primary">{session?.user?.name?.[0].toUpperCase()}</span>
              </div>
            </div>
          </header>
          <main className="flex-1 p-6 lg:p-10 max-w-7xl mx-auto w-full">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
