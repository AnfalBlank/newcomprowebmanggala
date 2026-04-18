'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

export interface TimelineItem {
  year?: string;
  date?: string;
  title: string;
  description: string;
  icon?: LucideIcon;
  details?: string[];
}

export interface TimelineProps {
  items: TimelineItem[];
  variant?: 'vertical' | 'horizontal';
  orientation?: 'left' | 'center' | 'right';
  className?: string;
}

/**
 * Timeline Component
 *
 * Displays a timeline of events or process steps with animated nodes
 * and connecting lines. Supports both vertical and horizontal layouts.
 */
export const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ items, variant = 'vertical', orientation = 'left', className }, ref) => {
    if (variant === 'horizontal') {
      return <HorizontalTimeline items={items} className={className} />;
    }

    return <VerticalTimeline items={items} orientation={orientation} className={className} ref={ref} />;
  }
);

Timeline.displayName = 'Timeline';

/**
 * VerticalTimeline Component
 *
 * Vertical timeline with configurable orientation (left, center, right).
 */
interface VerticalTimelineProps extends Omit<TimelineProps, 'variant'> {
  orientation: 'left' | 'center' | 'right';
}

const VerticalTimeline = React.forwardRef<HTMLDivElement, VerticalTimelineProps>(
  ({ items, orientation = 'left', className }, ref) => {
    return (
      <div ref={ref} className={cn('relative', className)}>
        {/* Center line */}
        <div
          className={cn(
            'absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary',
            {
              'left-8 md:left-1/2': orientation === 'center',
              'left-8': orientation === 'left',
              'right-8': orientation === 'right',
            }
          )}
        />

        {/* Timeline items */}
        <div className={cn('space-y-12', { 'md:space-y-0': orientation === 'center' })}>
          {items.map((item, index) => (
            <div
              key={index}
              className={cn('relative flex items-start', {
                'md:flex-row': orientation === 'center' && index % 2 === 0,
                'md:flex-row-reverse': orientation === 'center' && index % 2 === 1,
                'flex-row': orientation === 'left',
                'flex-row-reverse': orientation === 'right',
              })}
            >
              {/* Timeline node */}
              <div
                className={cn(
                  'absolute flex items-center justify-center w-16 h-16 rounded-full bg-background border-4 border-primary shadow-lg z-10',
                  'transition-all duration-300 hover:scale-110 hover:shadow-primary/50',
                  {
                    'left-0 md:left-1/2 md:-translate-x-1/2': orientation === 'center',
                    'left-0': orientation === 'left',
                    'right-0': orientation === 'right',
                  }
                )}
              >
                {item.icon ? (
                  <item.icon className="w-6 h-6 text-primary" />
                ) : (
                  <span className="text-sm font-bold text-primary">{item.year || index + 1}</span>
                )}
              </div>

              {/* Content */}
              <div
                className={cn('flex-1 pl-20', {
                  'md:pl-0 md:pr-20 md:text-right': orientation === 'center' && index % 2 === 0,
                  'md:pl-20 md:pr-0 md:text-left': orientation === 'center' && index % 2 === 1,
                  'pl-20 pr-0': orientation === 'left',
                  'pr-20 pl-0 text-right': orientation === 'right',
                })}
              >
                <div className="bg-card/80 backdrop-blur-md border border-border/50 rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                  {item.year && (
                    <p className="text-sm font-semibold text-primary mb-2">{item.year}</p>
                  )}
                  {item.date && (
                    <p className="text-xs text-muted-foreground mb-2">{item.date}</p>
                  )}
                  <h3 className="text-xl font-bold font-display text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  {item.details && item.details.length > 0 && (
                    <ul className="space-y-1">
                      {item.details.map((detail, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start">
                          <span className="w-1 h-1 rounded-full bg-primary mt-1.5 mr-2 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

VerticalTimeline.displayName = 'VerticalTimeline';

/**
 * HorizontalTimeline Component
 *
 * Horizontal timeline for process flows and steps.
 */
const HorizontalTimeline = ({ items, className }: { items: TimelineItem[]; className?: string }) => {
  return (
    <div className={cn('relative overflow-x-auto', className)}>
      <div className="min-w-max px-8">
        {/* Horizontal line */}
        <div className="absolute top-8 left-8 right-8 h-0.5 bg-gradient-to-r from-primary via-accent to-primary" />

        {/* Timeline items */}
        <div className="flex gap-8">
          {items.map((item, index) => (
            <div key={index} className="relative pt-20 pb-4 min-w-[250px]">
              {/* Timeline node */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center justify-center w-16 h-16 rounded-full bg-background border-4 border-primary shadow-lg z-10 transition-all duration-300 hover:scale-110 hover:shadow-primary/50">
                {item.icon ? (
                  <item.icon className="w-6 h-6 text-primary" />
                ) : (
                  <span className="text-sm font-bold text-primary">{index + 1}</span>
                )}
              </div>

              {/* Content */}
              <div className="bg-card/80 backdrop-blur-md border border-border/50 rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg text-center">
                {item.year && (
                  <p className="text-sm font-semibold text-primary mb-2">{item.year}</p>
                )}
                {item.date && (
                  <p className="text-xs text-muted-foreground mb-2">{item.date}</p>
                )}
                <h3 className="text-lg font-bold font-display text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                {item.details && item.details.length > 0 && (
                  <ul className="mt-4 space-y-1 text-left">
                    {item.details.map((detail, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-start">
                        <span className="w-1 h-1 rounded-full bg-primary mt-1.5 mr-2 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * ProcessTimeline Component
 *
 * Specialized timeline for showing process steps with icons and descriptions.
 */
export interface ProcessStep {
  icon: LucideIcon;
  title: string;
  description: string;
  duration?: string;
}

export interface ProcessTimelineProps {
  steps: ProcessStep[];
  className?: string;
}

export const ProcessTimeline = React.forwardRef<HTMLDivElement, ProcessTimelineProps>(
  ({ steps, className }, ref) => {
    return (
      <div ref={ref} className={cn('py-8', className)}>
        {/* Horizontal line for large screens */}
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary -translate-y-1/2" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection line for mobile */}
              {index < steps.length - 1 && (
                <div className="lg:hidden absolute top-8 left-16 right-0 h-0.5 bg-gradient-to-r from-primary to-border/50" />
              )}

              <div className="bg-card/80 backdrop-blur-md border border-border/50 rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg relative z-10">
                {/* Step number */}
                <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-lg">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary mb-4">
                  <step.icon className="w-8 h-8" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold font-display text-foreground mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-3">
                  {step.description}
                </p>

                {/* Duration */}
                {step.duration && (
                  <div className="flex items-center text-xs font-semibold text-primary">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {step.duration}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

ProcessTimeline.displayName = 'ProcessTimeline';
