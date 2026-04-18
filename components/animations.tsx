'use client';

import { motion, useInView, UseInViewHookOptions } from 'framer-motion';
import { useRef, ReactNode } from 'react';

/**
 * FadeIn Animation Component
 * Animasi fade in dari bawah
 */
export interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  once?: boolean;
}

export const FadeIn = ({
  children,
  delay = 0,
  duration = 0.6,
  direction = 'up',
  className = '',
  once = true
}: FadeInProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.3 });

  const variants = {
    up: { y: 60, opacity: 0 },
    down: { y: -60, opacity: 0 },
    left: { x: -60, opacity: 0 },
    right: { x: 60, opacity: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={variants[direction]}
      animate={isInView ? { x: 0, y: 0, opacity: 1 } : variants[direction]}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * ScaleIn Animation Component
 * Animasi scale dengan fade in
 */
export interface ScaleInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export const ScaleIn = ({
  children,
  delay = 0,
  duration = 0.5,
  className = '',
  once = true
}: ScaleInProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * StaggerContainer Component
 * Container untuk children dengan staggered animation
 */
export interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export const StaggerContainer = ({
  children,
  className = '',
  staggerDelay = 0.1
}: StaggerContainerProps) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={containerRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * StaggerItem Component
 * Item untuk StaggerContainer
 */
export interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export const StaggerItem = ({ children, className = '' }: StaggerItemProps) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * SlideIn Component
 * Animasi slide dari arah tertentu
 */
export interface SlideInProps {
  children: ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export const SlideIn = ({
  children,
  direction = 'left',
  delay = 0,
  duration = 0.6,
  className = '',
  once = true
}: SlideInProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.3 });

  const variants = {
    left: { x: -100, opacity: 0 },
    right: { x: 100, opacity: 0 },
    up: { y: 100, opacity: 0 },
    down: { y: -100, opacity: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={variants[direction]}
      animate={isInView ? { x: 0, y: 0, opacity: 1 } : variants[direction]}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * FloatingAnimation Component
 * Animasi floating/bobbing untuk icons/elements
 */
export interface FloatingAnimationProps {
  children: ReactNode;
  duration?: number;
  delay?: number;
  className?: string;
}

export const FloatingAnimation = ({
  children,
  duration = 3,
  delay = 0,
  className = ''
}: FloatingAnimationProps) => {
  return (
    <motion.div
      animate={{
        y: [-20, 20, -20]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * PulseGlow Component
 * Animasi pulse glow untuk buttons/cards
 */
export interface PulseGlowProps {
  children: ReactNode;
  className?: string;
}

export const PulseGlow = ({ children, className = '' }: PulseGlowProps) => {
  return (
    <motion.div
      animate={{
        boxShadow: [
          '0 0 0px rgba(var(--primary), 0)',
          '0 0 20px rgba(var(--primary), 0.3)',
          '0 0 0px rgba(var(--primary), 0)'
        ]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * HoverCard Component
 * Card dengan hover animation yang smooth
 */
export interface HoverCardProps {
  children: ReactNode;
  className?: string;
}

export const HoverCard = ({ children, className = '' }: HoverCardProps) => {
  return (
    <motion.div
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: 'easeOut' }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * CounterAnimation Component
 * Animated number counter
 */
export interface CounterAnimationProps {
  value: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

export const CounterAnimation = ({
  value,
  duration = 2,
  className = '',
  suffix = '',
  prefix = ''
}: CounterAnimationProps) => {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {prefix}
      <motion.span
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{
          duration,
          ease: 'easeOut'
        }}
      >
        {value.toLocaleString('id-ID')}
      </motion.span>
      {suffix}
    </motion.span>
  );
};
