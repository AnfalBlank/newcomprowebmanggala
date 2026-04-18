"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Motion values for smooth trailing effect
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 40, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only show custom cursor on desktop devices
    if (typeof window !== 'undefined' && window.matchMedia("(pointer: fine)").matches) {
      setIsVisible(true);
      
      const updateMousePosition = (e: MouseEvent) => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      };

      const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const isInteractive = 
          target.tagName.toLowerCase() === 'a' || 
          target.tagName.toLowerCase() === 'button' || 
          target.closest('a') !== null || 
          target.closest('button') !== null ||
          target.closest('.interactive') !== null;
          
        setIsHovering(isInteractive);
      };

      window.addEventListener("mousemove", updateMousePosition);
      window.addEventListener("mouseover", handleMouseOver);

      return () => {
        window.removeEventListener("mousemove", updateMousePosition);
        window.removeEventListener("mouseover", handleMouseOver);
      };
    }
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Soft large glow that follows exactly */}
      <motion.div
        className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none z-[999] mix-blend-screen"
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 60%)",
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      {/* Small trailing solid dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-white/70 shadow-[0_0_10px_rgba(255,255,255,0.8)] rounded-full pointer-events-none z-[1000] mix-blend-screen backdrop-blur-sm hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
          opacity: isHovering ? 0.3 : 1
        }}
        transition={{
          scale: { type: "spring", stiffness: 300, damping: 20 },
          opacity: { duration: 0.2 }
        }}
      />
    </>
  );
};
