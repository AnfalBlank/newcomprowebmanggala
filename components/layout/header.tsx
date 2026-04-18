"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { Menu, X, Phone, Mail, MapPin, UserCircle, LayoutDashboard, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useSession, signOut } from "@/lib/auth-client"
import { useTranslation } from "@/context/LanguageContext"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = React.useState(false)

  const navigation = [
    { name: t('nav.home'), href: "/" },
    { name: t('nav.about'), href: "/about" },
    { name: t('nav.solutions'), href: "/solutions" },
    { name: t('nav.products'), href: "/products" },
    { name: t('nav.portfolio'), href: "/portfolio" },
    { name: t('nav.blog'), href: "/blog" },
    { name: t('nav.contact'), href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full px-4 py-4 pointer-events-none">
      <div className="container mx-auto max-w-7xl pointer-events-auto">
        <nav className="flex h-16 items-center justify-between px-6 rounded-2xl bg-card/60 backdrop-blur-md border border-white/10 shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center space-x-3 group">
              {/* Logo block */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 sm:gap-3 cursor-pointer"
              >
                <motion.div 
                  initial={{ rotate: -10, scale: 0.9 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  className="relative h-9 sm:h-11 md:h-12 w-auto shrink-0 flex items-center"
                >
                  <img
                    src="/logo.png"
                    alt="Manggala Utama Indonesia Logo"
                    className="h-full w-auto object-contain drop-shadow-[0_0_12px_rgba(59,130,246,0.3)] group-hover:drop-shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all duration-300"
                  />
                </motion.div>
                
                {/* Single line brand name */}
                <div className="flex items-center overflow-hidden">
                  <motion.span 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="font-black text-[13px] sm:text-[15px] md:text-[17px] lg:text-xl text-white tracking-tighter flex items-center gap-1 sm:gap-1.5 whitespace-nowrap"
                  >
                    <span className="group-hover:text-primary transition-colors duration-300">MANGGALA</span>
                    <span className="text-primary group-hover:text-orange-400 transition-colors duration-300">UTAMA</span>
                    <span className="text-white/60 font-semibold group-hover:text-white transition-colors duration-300">INDONESIA</span>
                  </motion.span>
                </div>
              </motion.div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-all hover:text-primary relative group/link",
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
                <span className={cn(
                  "absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover/link:w-full",
                  pathname === item.href && "w-full"
                )} />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            
            {session?.user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2 px-2 hover:bg-white/5">
                    <UserCircle className="h-5 w-5 text-primary" />
                    <span className="hidden xl:block max-w-[80px] truncate text-xs font-semibold">
                      {session.user.name.split(' ')[0]}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-popover/95 backdrop-blur-md border-white/10">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{session.user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{session.user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/5" />
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Dashboard Admin</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/5" />
                  <DropdownMenuItem 
                    className="text-destructive focus:text-destructive cursor-pointer"
                    onClick={() => signOut()}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Keluar</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            
            <Button asChild size="sm" className="hidden sm:flex rounded-xl bg-primary hover:bg-primary/90 text-white shadow-[0_0_15px_rgba(var(--primary),0.3)]">
              <Link href="/contact" className="font-bold tracking-tight">
                Hubungi Kami
              </Link>
            </Button>

            {/* Mobile Menu Trigger */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden h-10 w-10 hover:bg-white/5">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[350px] bg-background/95 backdrop-blur-xl border-white/10">
                <SheetTitle className="sr-only">Navigasi Utama</SheetTitle>
                <div className="flex flex-col gap-8 mt-10">
                  <Link href="/" className="flex items-center gap-4 group" onClick={() => setIsOpen(false)}>
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <motion.div 
                        initial={{ rotate: -10, scale: 0.9 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        className="relative h-10 w-auto shrink-0 flex items-center"
                      >
                        <img
                          src="/logo.png"
                          alt="Manggala Utama Indonesia Logo"
                          className="h-full w-auto object-contain drop-shadow-[0_0_12px_rgba(59,130,246,0.3)]"
                        />
                      </motion.div>
                      
                      <div className="flex items-center overflow-hidden">
                        <motion.span 
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.1, duration: 0.5 }}
                          className="font-black text-[13px] sm:text-sm text-white tracking-tighter flex items-center gap-1 whitespace-nowrap"
                        >
                          <span className="group-hover:text-primary transition-colors">MANGGALA</span>
                          <span className="text-primary group-hover:text-orange-400 transition-colors">UTAMA</span>
                          <span className="text-white/60 font-semibold group-hover:text-white transition-colors">INDONESIA</span>
                        </motion.span>
                      </div>
                    </motion.div>
                  </Link>
                  <nav className="flex flex-col gap-2">
                    {navigation.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "px-4 py-4 rounded-xl text-lg font-medium transition-all",
                          pathname === item.href
                            ? "bg-primary/10 text-primary border border-primary/20"
                            : "text-muted-foreground hover:bg-white/5"
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                  
                  <div className="mt-auto border-t border-white/5 pt-8 space-y-4">
                    <div className="flex justify-between items-center px-4">
                      <span className="text-sm text-muted-foreground">Pilih Bahasa</span>
                      <LanguageSwitcher />
                    </div>
                    {session?.user && (
                      <Button asChild variant="outline" className="w-full justify-start gap-4 h-14 rounded-2xl border-white/10 bg-white/5">
                        <Link href="/admin" onClick={() => setIsOpen(false)}>
                          <LayoutDashboard className="h-5 w-5 text-primary" />
                          Dashboard Admin
                        </Link>
                      </Button>
                    )}
                    <Button asChild className="w-full h-14 rounded-2xl bg-primary text-white text-lg font-bold shadow-2xl">
                      <Link href="/contact" onClick={() => setIsOpen(false)}>Hubungi Kami</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  )
}
