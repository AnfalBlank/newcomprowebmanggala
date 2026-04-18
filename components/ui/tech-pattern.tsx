import React from 'react';
import { cn } from '@/lib/utils';

export interface TechPatternProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'grid' | 'dots' | 'circuit' | 'network' | 'wave';
  opacity?: number;
  animated?: boolean;
}

/**
 * TechPattern Component
 *
 * Provides various tech-themed background patterns for sections.
 *
 * Variants:
 * - grid: Grid pattern for general tech sections
 * - dots: Dot pattern for subtle texture
 * - circuit: Circuit board pattern for IT/infrastructure sections
 * - network: Network node pattern for connectivity themes
 * - wave: Wave pattern for flow/movement themes
 */
export const TechPattern = React.forwardRef<HTMLDivElement, TechPatternProps>(
  ({ variant = 'grid', opacity = 0.03, animated = false, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'absolute inset-0 pointer-events-none overflow-hidden',
          {
            'animate-pulse': animated,
          },
          className
        )}
        style={{ opacity }}
        {...props}
      >
        {variant === 'grid' && (
          <svg
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="tech-grid"
                width="50"
                height="50"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 50 0 L 0 0 0 50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-primary/20"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#tech-grid)" />
          </svg>
        )}

        {variant === 'dots' && (
          <svg
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="tech-dots"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <circle
                  cx="2"
                  cy="2"
                  r="1"
                  fill="currentColor"
                  className="text-primary/20"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#tech-dots)" />
          </svg>
        )}

        {variant === 'circuit' && (
          <svg
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="tech-circuit"
                width="100"
                height="100"
                patternUnits="userSpaceOnUse"
              >
                <g className="text-primary/20">
                  {/* Horizontal lines */}
                  <line x1="0" y1="20" x2="40" y2="20" strokeWidth="1" stroke="currentColor" />
                  <line x1="60" y1="20" x2="100" y2="20" strokeWidth="1" stroke="currentColor" />
                  <circle cx="50" cy="20" r="3" fill="currentColor" />

                  <line x1="0" y1="80" x2="30" y2="80" strokeWidth="1" stroke="currentColor" />
                  <line x1="70" y1="80" x2="100" y2="80" strokeWidth="1" stroke="currentColor" />
                  <circle cx="50" cy="80" r="3" fill="currentColor" />

                  {/* Vertical lines */}
                  <line x1="20" y1="0" x2="20" y2="40" strokeWidth="1" stroke="currentColor" />
                  <line x1="20" y1="60" x2="20" y2="100" strokeWidth="1" stroke="currentColor" />
                  <circle cx="20" cy="50" r="3" fill="currentColor" />

                  <line x1="80" y1="0" x2="80" y2="30" strokeWidth="1" stroke="currentColor" />
                  <line x1="80" y1="70" x2="80" y2="100" strokeWidth="1" stroke="currentColor" />
                  <circle cx="80" cy="50" r="3" fill="currentColor" />
                </g>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#tech-circuit)" />
          </svg>
        )}

        {variant === 'network' && (
          <svg
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="tech-network"
                width="120"
                height="120"
                patternUnits="userSpaceOnUse"
              >
                <g className="text-primary/20">
                  {/* Network nodes and connections */}
                  <circle cx="60" cy="60" r="5" fill="currentColor" />
                  <circle cx="20" cy="20" r="3" fill="currentColor" />
                  <circle cx="100" cy="20" r="3" fill="currentColor" />
                  <circle cx="20" cy="100" r="3" fill="currentColor" />
                  <circle cx="100" cy="100" r="3" fill="currentColor" />

                  {/* Connections */}
                  <line x1="60" y1="60" x2="20" y2="20" strokeWidth="1" stroke="currentColor" opacity="0.5" />
                  <line x1="60" y1="60" x2="100" y2="20" strokeWidth="1" stroke="currentColor" opacity="0.5" />
                  <line x1="60" y1="60" x2="20" y2="100" strokeWidth="1" stroke="currentColor" opacity="0.5" />
                  <line x1="60" y1="60" x2="100" y2="100" strokeWidth="1" stroke="currentColor" opacity="0.5" />
                </g>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#tech-network)" />
          </svg>
        )}

        {variant === 'wave' && (
          <svg
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
                <stop offset="50%" stopColor="currentColor" stopOpacity="0.1" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,50 Q150,0 300,50 T600,50 T900,50 T1200,50 V100 H0 Z"
              fill="url(#wave-gradient)"
              className="text-primary"
            />
            <path
              d="M0,70 Q150,20 300,70 T600,70 T900,70 T1200,70 V100 H0 Z"
              fill="url(#wave-gradient)"
              className="text-primary"
              opacity="0.5"
            />
          </svg>
        )}
      </div>
    );
  }
);

TechPattern.displayName = 'TechPattern';

/**
 * TechPatternWrapper Component
 *
 * Wrapper component that includes both the pattern and a gradient overlay.
 */
export interface TechPatternWrapperProps extends TechPatternProps {
  gradient?: boolean;
  gradientFrom?: string;
  gradientTo?: string;
  children?: React.ReactNode;
}

export const TechPatternWrapper = React.forwardRef<HTMLDivElement, TechPatternWrapperProps>(
  (
    {
      variant = 'grid',
      opacity = 0.03,
      animated = false,
      gradient = false,
      gradientFrom = 'transparent',
      gradientTo = 'transparent',
      children,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn('relative overflow-hidden', className)} {...props}>
        <TechPattern variant={variant} opacity={opacity} animated={animated} />
        {gradient && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
            }}
          />
        )}
        {children}
      </div>
    );
  }
);

TechPatternWrapper.displayName = 'TechPatternWrapper';
