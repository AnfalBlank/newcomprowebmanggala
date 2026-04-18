"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import React from "react"

interface TechHeroProps {
  badge?: string
  title: React.ReactNode
  subtitle?: string
  children?: React.ReactNode
  className?: string
  contentClassName?: string
  minHeight?: string
}

// Canvas-based animated circuit board effect
function CircuitCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animFrame: number
    let w = 0, h = 0

    // Node type
    type Node = {
      x: number; y: number;
      vx: number; vy: number;
      pulsePhase: number
    }

    const nodes: Node[] = []
    const NUM_NODES = 28
    const CONNECTION_DIST = 200

    // Pulse particles
    type Pulse = {
      fromX: number; fromY: number;
      toX: number; toY: number;
      progress: number; speed: number
    }
    const pulses: Pulse[] = []

    function resize() {
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      canvas.width = w
      canvas.height = h
    }

    function spawnNodes() {
      nodes.length = 0
      for (let i = 0; i < NUM_NODES; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          pulsePhase: Math.random() * Math.PI * 2,
        })
      }
    }

    function spawnPulse() {
      // Pick a random edge and send pulse
      const a = nodes[Math.floor(Math.random() * nodes.length)]
      if (!a) return
      let best: Node | null = null
      let bestDist = Infinity
      for (const b of nodes) {
        if (b === a) continue
        const d = Math.hypot(b.x - a.x, b.y - a.y)
        if (d < CONNECTION_DIST && d < bestDist) { bestDist = d; best = b }
      }
      if (best) {
        pulses.push({ fromX: a.x, fromY: a.y, toX: best.x, toY: best.y, progress: 0, speed: 0.006 + Math.random() * 0.008 })
      }
    }

    // Primary color from CSS variable (approximate since we can't read CSS from canvas)
    const PRIMARY = "rgba(90, 140, 240,"
    const PRIMARY_DIM = "rgba(90, 140, 240,"

    let frameCount = 0

    function draw() {
      animFrame = requestAnimationFrame(draw)
      frameCount++

      ctx.clearRect(0, 0, w, h)

      // Update node positions
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1
        n.pulsePhase += 0.02
      }

      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j]
          const dist = Math.hypot(b.x - a.x, b.y - a.y)
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.18
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `${PRIMARY_DIM} ${alpha})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      // Draw pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i]
        p.progress += p.speed
        if (p.progress >= 1) { pulses.splice(i, 1); continue }

        const px = p.fromX + (p.toX - p.fromX) * p.progress
        const py = p.fromY + (p.toY - p.fromY) * p.progress
        const grd = ctx.createRadialGradient(px, py, 0, px, py, 8)
        grd.addColorStop(0, `${PRIMARY} 0.9)`)
        grd.addColorStop(1, `${PRIMARY} 0)`)
        ctx.beginPath()
        ctx.arc(px, py, 8, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        // Trail
        const tx = p.fromX + (p.toX - p.fromX) * Math.max(0, p.progress - 0.15)
        const ty = p.fromY + (p.toY - p.fromY) * Math.max(0, p.progress - 0.15)
        ctx.beginPath()
        ctx.moveTo(tx, ty)
        ctx.lineTo(px, py)
        ctx.strokeStyle = `${PRIMARY} 0.4)`
        ctx.lineWidth = 2
        ctx.stroke()
      }

      // Draw nodes
      for (const n of nodes) {
        const pulse = (Math.sin(n.pulsePhase) + 1) * 0.5
        const r = 2 + pulse * 1.5
        const alpha = 0.5 + pulse * 0.4

        // Glow ring
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 12)
        grd.addColorStop(0, `${PRIMARY} ${alpha * 0.3})`)
        grd.addColorStop(1, `${PRIMARY} 0)`)
        ctx.beginPath()
        ctx.arc(n.x, n.y, 12, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        // Core dot
        ctx.beginPath()
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
        ctx.fillStyle = `${PRIMARY} ${alpha})`
        ctx.fill()
      }

      // Spawn new pulses occasionally
      if (frameCount % 60 === 0 && pulses.length < 12) spawnPulse()
    }

    resize()
    spawnNodes()
    // Spawn initial pulses
    for (let i = 0; i < 5; i++) setTimeout(spawnPulse, i * 400)
    draw()

    const ro = new ResizeObserver(() => {
      resize()
      spawnNodes()
    })
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(animFrame)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  )
}

export function TechHero({
  badge,
  title,
  subtitle,
  children,
  className,
  contentClassName,
  minHeight = "min-h-[78vh]",
}: TechHeroProps) {
  return (
    <section
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-[oklch(0.12_0.02_260)] border-b border-white/5",
        minHeight,
        className
      )}
    >
      {/* Animated canvas background */}
      <CircuitCanvas />

      {/* Top-left corner bracket decoration */}
      <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-primary/30 rounded-tl-lg pointer-events-none" />
      <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-primary/30 rounded-tr-lg pointer-events-none" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-primary/30 rounded-bl-lg pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-primary/30 rounded-br-lg pointer-events-none" />

      {/* Ambient blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[400px] rounded-full bg-blue-600/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full bg-orange-500/4 blur-[100px] pointer-events-none" />

      {/* Content */}
      <div className={cn("container relative z-10 mx-auto px-6 pt-28 pb-24 md:pt-36 md:pb-32 max-w-5xl", contentClassName)}>
        <div className="flex flex-col items-center text-center gap-6">
          {/* Badge */}
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-blue-300 text-[11px] font-bold tracking-[0.2em] uppercase">
                {badge}
              </span>
            </motion.div>
          )}

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="max-w-4xl w-full"
          >
            {title}
          </motion.div>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base md:text-lg text-white/60 max-w-2xl leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}

          {/* CTA slot */}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4 mt-4"
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
