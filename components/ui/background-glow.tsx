'use client';

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BackgroundGlowProps {
  className?: string;
  variant?: 'primary' | 'accent' | 'purple' | 'cyan';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  opacity?: number;
}

export function BackgroundGlow({
  className,
  variant = 'primary',
  size = 'md',
  opacity = 0.2,
}: BackgroundGlowProps) {
  const variants = {
    primary: "bg-primary-glow",
    accent: "bg-accent-glow",
    purple: "bg-[#9d50bb]", // Hardcoded or use CSS variable
    cyan: "bg-[#00f2fe]",
  };

  const sizes = {
    sm: "w-48 h-48",
    md: "w-96 h-96",
    lg: "w-[30rem] h-[30rem]",
    xl: "w-[50rem] h-[50rem]",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: opacity, 
        scale: 1,
        x: [0, 20, 0],
        y: [0, -30, 0]
      }}
      transition={{ 
        duration: 10, 
        repeat: Infinity, 
        repeatType: "reverse",
        ease: "easeInOut" 
      }}
      className={cn(
        "absolute rounded-full blur-[120px] pointer-events-none z-0",
        variants[variant],
        sizes[size],
        className
      )}
    />
  );
}
