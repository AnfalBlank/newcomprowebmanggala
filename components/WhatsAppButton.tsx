"use client"

import { useState, useEffect } from "react"
import { MessageCircle, X, Send } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasUnread, setHasUnread] = useState(true)
  const [message, setMessage] = useState("")

  const defaultPhone = "6287884241703"

  useEffect(() => {
    // Reveal a persistent unread notification exactly on load
    setHasUnread(true)
  }, [])

  const handleOpen = () => {
    setIsOpen(true)
    setHasUnread(false)
  }

  const handleSend = () => {
    let finalMessage = message.trim() || "Halo PT. Manggala Utama Indonesia, saya butuh konsultasi mengenai layanan terpadu Anda."
    const whatsappUrl = `https://wa.me/${defaultPhone}?text=${encodeURIComponent(finalMessage)}`
    window.open(whatsappUrl, "_blank")
    setMessage("")
    setIsOpen(false)
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-[85px] right-4 sm:right-6 z-[100] w-[calc(100vw-2rem)] sm:w-[350px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 flex items-center justify-between text-white shadow-sm z-20">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1.5 shadow-inner">
                    <img src="/logo.png" alt="PT Manggala Utama" className="w-full h-full object-contain" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-300 border-2 border-white rounded-full ring-2 ring-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight text-white mb-0.5">Admin Manggala Utama</h3>
                  <p className="text-[11px] text-green-100 bg-white/10 px-2 py-0.5 rounded-full inline-block">Online now</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/20 rounded-full transition-colors active:scale-95"
                aria-label="Close chat"
              >
                <X className="w-5 h-5 absolute top-4 right-4" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="bg-[#e5ddd5] p-4 min-h-[200px] flex flex-col gap-4 relative z-10 overflow-hidden">
              <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/az-subtle.png')" }} />
              
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-3 rounded-xl rounded-tl-none shadow-sm max-w-[85%] relative z-10 self-start text-sm text-slate-800"
              >
                <div className="font-semibold text-emerald-600 text-xs mb-1">Admin Manggala</div>
                Halo! 👋 Ada yang bisa dibantu mengenai pengadaan IT, Instalasi Mesin Pertamina, atau Software Development?
                <span className="block text-[9px] font-medium text-slate-400 mt-1.5 text-right uppercase">Just now</span>
              </motion.div>
            </div>

            {/* Input Area */}
            <div className="bg-white p-3 border-t border-slate-100 flex items-center gap-2 relative z-20">
              <input
                type="text"
                placeholder="Ketik sebuah pesan..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 bg-slate-100 border-none rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 text-slate-800 placeholder:text-slate-400"
              />
              <button 
                onClick={handleSend}
                className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white shrink-0 hover:bg-green-600 transition-colors shadow-md active:scale-95"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={isOpen ? () => setIsOpen(false) : handleOpen}
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-[95] flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-[0_5px_15px_rgba(34,197,94,0.4)] hover:bg-green-600 transition-transform hover:scale-105 active:scale-95 group focus:outline-none"
        aria-label="Toggle WhatsApp Chat"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-7 w-7" />}
        
        {/* Unread Interactive Badge */}
        {hasUnread && !isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
          </span>
        )}
      </button>
    </>
  )
}
