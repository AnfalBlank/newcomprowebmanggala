'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

export interface StatCounterProps {
  icon: LucideIcon;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description?: string;
  duration?: number;
  delay?: number;
  className?: string;
  iconClassName?: string;
}

/**
 * StatCounter Component
 *
 * Animated statistic counter with number counting animation,
 * icon with glow effect, and tech-inspired styling.
 */
export const StatCounter = React.forwardRef<HTMLDivElement, StatCounterProps>(
  ({
    icon: Icon,
    value,
    suffix = '',
    prefix = '',
    label,
    description,
    duration = 2000,
    delay = 0,
    className,
    iconClassName,
  }, ref) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const counterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold: 0.1 }
      );

      if (counterRef.current) {
        observer.observe(counterRef.current);
      }

      return () => {
        if (counterRef.current) {
          observer.unobserve(counterRef.current);
        }
      };
    }, []);

    useEffect(() => {
      if (!isVisible) return;

      const startTime = Date.now() + delay;
      const endTime = startTime + duration;

      const animate = () => {
        const now = Date.now();
        if (now < startTime) {
          requestAnimationFrame(animate);
          return;
        }

        const progress = Math.min((now - startTime) / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(easeOutQuart * value);

        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(value);
        }
      };

      requestAnimationFrame(animate);
    }, [isVisible, value, duration, delay]);

    return (
      <div
        ref={(node) => {
          counterRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        className={cn(
          'group relative',
          className
        )}
      >
        {/* Background card */}
        <div className="relative overflow-hidden rounded-2xl bg-card/80 backdrop-blur-md border border-border/50 p-6 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          {/* Tech pattern overlay */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="stat-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="0.5" fill="currentColor" className="text-primary/10" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#stat-pattern)" />
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* Icon with glow */}
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <div className={cn(
                  'flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary',
                  'group-hover:from-primary group-hover:to-primary-light group-hover:text-primary-foreground',
                  'transition-all duration-300',
                  iconClassName
                )}>
                  <Icon className="w-7 h-7" />
                </div>
                {/* Animated glow effect */}
                <div className="absolute inset-0 w-14 h-14 rounded-xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-glow" />
              </div>
            </div>

            {/* Counter value */}
            <div className="mb-2">
              <span className="text-4xl md:text-5xl font-bold font-display text-foreground tabular-nums">
                {prefix}
                {count.toLocaleString('id-ID')}
                {suffix}
              </span>
            </div>

            {/* Label */}
            <p className="text-sm md:text-base font-semibold text-primary mb-1">
              {label}
            </p>

            {/* Description */}
            {description && (
              <p className="text-xs md:text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
);

StatCounter.displayName = 'StatCounter';

/**
 * StatCounterCompact Component
 *
 * Smaller variant for compact layouts.
 */
export interface StatCounterCompactProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
  delay?: number;
  className?: string;
}

export const StatCounterCompact = React.forwardRef<HTMLDivElement, StatCounterCompactProps>(
  ({
    value,
    suffix = '',
    prefix = '',
    label,
    duration = 1500,
    delay = 0,
    className,
  }, ref) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const counterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold: 0.1 }
      );

      if (counterRef.current) {
        observer.observe(counterRef.current);
      }

      return () => {
        if (counterRef.current) {
          observer.unobserve(counterRef.current);
        }
      };
    }, []);

    useEffect(() => {
      if (!isVisible) return;

      const startTime = Date.now() + delay;
      const endTime = startTime + duration;

      const animate = () => {
        const now = Date.now();
        if (now < startTime) {
          requestAnimationFrame(animate);
          return;
        }

        const progress = Math.min((now - startTime) / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(easeOutQuart * value);

        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(value);
        }
      };

      requestAnimationFrame(animate);
    }, [isVisible, value, duration, delay]);

    return (
      <div
        ref={(node) => {
          counterRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        className={cn('text-center', className)}
      >
        <div className="text-3xl md:text-4xl font-bold font-display text-foreground tabular-nums mb-1">
          {prefix}
          {count.toLocaleString('id-ID')}
          {suffix}
        </div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </div>
    );
  }
);

StatCounterCompact.displayName = 'StatCounterCompact';

/**
 * StatCounterGrid Component
 *
 * Grid of stat counters with automatic layout.
 */
export interface StatCounterGridProps {
  stats: {
    icon: LucideIcon;
    value: number;
    suffix?: string;
    prefix?: string;
    label: string;
    description?: string;
  }[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export const StatCounterGrid = ({ stats, columns = 4, className }: StatCounterGridProps) => {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={cn('grid gap-6', gridCols[columns], className)}>
      {stats.map((stat, index) => (
        <StatCounter
          key={index}
          {...stat}
          delay={index * 100}
        />
      ))}
    </div>
  );
};
