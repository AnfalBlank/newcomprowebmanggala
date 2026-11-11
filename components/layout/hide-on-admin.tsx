"use client"

import { usePathname } from "next/navigation"

// Header, footer, dan tombol WhatsApp web publik tidak dipakai di halaman admin (menutupi menu admin).
export function HideOnAdmin({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (pathname?.startsWith("/admin")) return null
  return <>{children}</>
}
