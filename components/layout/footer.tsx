import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-background border-t border-white/5 relative overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Company Info */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center space-x-3 group w-fit">
              <div className="relative h-12 shrink-0 flex items-center">
                <img
                  src="/logo.png"
                  alt="PT. Manggala Utama Indonesia Logo"
                  className="h-full w-auto object-contain drop-shadow-md"
                />
              </div>
              <div className="flex items-center ml-1 overflow-hidden">
                <span className="font-black text-[14px] sm:text-[16px] text-white tracking-tighter flex items-center gap-1 sm:gap-1.5 whitespace-nowrap">
                  <span className="group-hover:text-primary transition-colors duration-300">MANGGALA</span>
                  <span className="text-primary group-hover:text-orange-400 transition-colors duration-300">UTAMA</span>
                  <span className="text-white/60 font-semibold group-hover:text-white transition-colors duration-300">INDONESIA</span>
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Membangun masa depan infrastruktur industri dengan solusi automasi, integasi sistem, dan teknologi jaringan berstandar enterprise.
            </p>
            <div className="flex space-x-4">
              {[Linkedin, Instagram, Facebook].map((Icon, i) => (
                <Link 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 group"
                >
                  <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="lg:pl-8">
            <h3 className="font-bold text-foreground mb-8 text-sm uppercase tracking-widest font-heading">Quick Navigation</h3>
            <ul className="space-y-4">
              {["About", "Solutions", "Products", "Portfolio", "Blog", "Contact"].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary group-hover:scale-125 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-foreground mb-8 text-sm uppercase tracking-widest font-heading">Solusi Utama</h3>
            <ul className="space-y-4">
              {[
                { name: "Fueling & ATG", href: "/solutions/fueling" },
                { name: "POS & MCU", href: "/solutions/integration" },
                { name: "Network Infrastructure", href: "/solutions/network" },
                { name: "IT Procurement", href: "/solutions/procurement" },
                { name: "Maintenance & SLA", href: "/solutions/maintenance" }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary group-hover:scale-125 transition-all" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-8">
            <h3 className="font-bold text-foreground mb-8 text-sm uppercase tracking-widest font-heading">Hubungi Kami</h3>
            <div className="space-y-6">
              {[
                { icon: MapPin, text: "Jl. Kapling DPR, Kec. Cakung Jakarta Timur, 13920" },
                { icon: Phone, text: "+62 878-8424-1703" },
                { icon: Mail, text: "admin@manggala-utama.id" }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-primary/50 transition-all">
                    <item.icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors pt-2">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} PT. Manggala Utama Indonesia. Solusi Engineering Terintegrasi.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
