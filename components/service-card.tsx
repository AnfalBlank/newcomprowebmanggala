import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { LucideIcon, ArrowRight } from 'lucide-react';

export interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features?: string[];
  stats?: {
    label: string;
    value: string;
  }[];
  href?: string;
  className?: string;
}

/**
 * ServiceCard Component
 *
 * Enhanced service card with glassmorphism effect, hover animations,
 * and tech-inspired design for enterprise IT services.
 */
export const ServiceCard = React.forwardRef<HTMLDivElement, ServiceCardProps>(
  ({ icon: Icon, title, description, features, stats, href, className }, ref) => {
    const cardContent = (
      <>
        {/* Icon Section */}
        <div className="relative mb-6">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-light text-primary-foreground shadow-lg">
            <Icon className="w-8 h-8" />
          </div>
          {/* Animated glow effect */}
          <div className="absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-light opacity-20 blur-xl animate-pulse-glow" />
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold font-display text-foreground mb-3 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-base text-muted-foreground mb-6 leading-relaxed">
          {description}
        </p>

        {/* Features List */}
        {features && features.length > 0 && (
          <ul className="space-y-2 mb-6">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex items-center text-sm text-foreground"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        {/* Stats Section */}
        {stats && stats.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-muted/50 rounded-lg p-3 border border-border/50"
              >
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Learn More Link */}
        {href && (
          <div className="flex items-center text-primary font-semibold group/link">
            <span>Pelajari Lebih Lanjut</span>
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-1" />
          </div>
        )}
      </>
    );

    const cardWrapper = (
      <div
        className={cn(
          'group relative overflow-hidden rounded-2xl',
          'bg-card/80 backdrop-blur-md',
          'border border-border/50',
          'shadow-sm hover:shadow-xl',
          'transition-all duration-300',
          'hover:-translate-y-1',
          'p-6',
          'cursor-pointer',
          className
        )}
      >
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Tech pattern overlay on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="service-card-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.5" fill="currentColor" className="text-primary/20" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#service-card-pattern)" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          {cardContent}
        </div>

        {/* Gradient border effect on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20" style={{ padding: '1px' }}>
            <div className="w-full h-full rounded-2xl bg-card" />
          </div>
        </div>
      </div>
    );

    return (
      <div ref={ref}>
        {href ? (
          <Link href={href}>
            {cardWrapper}
          </Link>
        ) : (
          cardWrapper
        )}
      </div>
    );
  }
);

ServiceCard.displayName = 'ServiceCard';

/**
 * ServiceCardCompact Component
 *
 * Smaller variant for grids with limited space.
 */
export interface ServiceCardCompactProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
  className?: string;
}

export const ServiceCardCompact = React.forwardRef<HTMLDivElement, ServiceCardCompactProps>(
  ({ icon: Icon, title, description, href, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'group relative overflow-hidden rounded-xl',
          'bg-card/60 backdrop-blur-sm',
          'border border-border/50',
          'hover:border-primary/50',
          'transition-all duration-300',
          'hover:-translate-y-0.5 hover:shadow-md',
          'p-5',
          className
        )}
      >
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Icon className="w-6 h-6" />
              </div>
            </div>

            {/* Text Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold font-display text-foreground mb-2 group-hover:text-primary transition-colors">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ServiceCardCompact.displayName = 'ServiceCardCompact';
