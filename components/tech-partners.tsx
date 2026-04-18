'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon, Cpu, Server, Database, Network, Shield, Code } from 'lucide-react';

export interface TechCategory {
  id: string;
  name: string;
  icon: LucideIcon;
  technologies: TechItem[];
}

export interface TechItem {
  name: string;
  description?: string;
  logo?: string;
  certified?: boolean;
  link?: string;
}

export interface TechPartnersProps {
  categories?: TechCategory[];
  technologies?: TechItem[];
  className?: string;
}

/**
 * TechPartners Component
 *
 * Displays technology stack, partners, and certifications in a grid layout
 * with category filtering and hover effects.
 */
export const TechPartners = React.forwardRef<HTMLDivElement, TechPartnersProps>(
  ({ categories, technologies, className }, ref) => {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    // Default categories if none provided
    const defaultCategories: TechCategory[] = [
      {
        id: 'programming',
        name: 'Programming Languages',
        icon: Code,
        technologies: [
          { name: 'JavaScript', description: 'Frontend & Backend', certified: true },
          { name: 'TypeScript', description: 'Type-Safe Development', certified: true },
          { name: 'Python', description: 'Data & Automation' },
          { name: 'Go', description: 'High-Performance Services' },
          { name: 'Java', description: 'Enterprise Applications' },
        ],
      },
      {
        id: 'frameworks',
        name: 'Frameworks & Platforms',
        icon: Cpu,
        technologies: [
          { name: 'React', description: 'UI Development', certified: true },
          { name: 'Next.js', description: 'Full-Stack Framework', certified: true },
          { name: 'Node.js', description: 'Server-Side JavaScript' },
          { name: 'Django', description: 'Python Web Framework' },
          { name: 'Spring Boot', description: 'Java Microservices' },
        ],
      },
      {
        id: 'infrastructure',
        name: 'Infrastructure & Cloud',
        icon: Server,
        technologies: [
          { name: 'Docker', description: 'Containerization', certified: true },
          { name: 'Kubernetes', description: 'Orchestration' },
          { name: 'AWS', description: 'Cloud Services', certified: true },
          { name: 'Azure', description: 'Microsoft Cloud' },
          { name: 'Google Cloud', description: 'GCP Platform' },
        ],
      },
      {
        id: 'databases',
        name: 'Databases',
        icon: Database,
        technologies: [
          { name: 'PostgreSQL', description: 'Relational Database', certified: true },
          { name: 'MongoDB', description: 'NoSQL Database' },
          { name: 'Redis', description: 'Caching & Messaging' },
          { name: 'MySQL', description: 'Open Source Database' },
          { name: 'SQLite', description: 'Embedded Database' },
        ],
      },
      {
        id: 'networking',
        name: 'Networking',
        icon: Network,
        technologies: [
          { name: 'Cisco', description: 'Network Infrastructure', certified: true },
          { name: 'MikroTik', description: 'Routing & Switching', certified: true },
          { name: 'Fortinet', description: 'Security & Firewall' },
          { name: 'Ubiquiti', description: 'Wireless Networking' },
          { name: 'Juniper', description: 'Enterprise Networking' },
        ],
      },
      {
        id: 'security',
        name: 'Security',
        icon: Shield,
        technologies: [
          { name: 'ISO 27001', description: 'Information Security', certified: true },
          { name: 'SOC 2', description: 'Security Compliance' },
          { name: 'OWASP', description: 'Web Security' },
          { name: 'Burp Suite', description: 'Security Testing' },
          { name: 'Wireshark', description: 'Network Analysis' },
        ],
      },
    ];

    const displayCategories = categories || defaultCategories;
    const allTechnologies = technologies || displayCategories.flatMap(cat => cat.technologies);

    const filteredTechnologies = activeCategory
      ? displayCategories.find(cat => cat.id === activeCategory)?.technologies || []
      : allTechnologies;

    return (
      <div ref={ref} className={cn('space-y-8', className)}>
        {/* Category Filter */}
        {categories && categories.length > 0 && (
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setActiveCategory(null)}
              className={cn(
                'px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300',
                'border-2',
                activeCategory === null
                  ? 'border-primary bg-primary text-primary-foreground shadow-lg'
                  : 'border-border bg-card/50 text-muted-foreground hover:border-primary/50 hover:text-foreground'
              )}
            >
              All Technologies
            </button>
            {displayCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  'px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300',
                  'border-2',
                  'flex items-center gap-2',
                  activeCategory === category.id
                    ? 'border-primary bg-primary text-primary-foreground shadow-lg'
                    : 'border-border bg-card/50 text-muted-foreground hover:border-primary/50 hover:text-foreground'
                )}
              >
                <category.icon className="w-4 h-4" />
                {category.name}
              </button>
            ))}
          </div>
        )}

        {/* Technology Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredTechnologies.map((tech, index) => (
            <div
              key={index}
              className="group relative bg-card/80 backdrop-blur-md border border-border/50 rounded-xl p-5 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Certified Badge */}
              {tech.certified && (
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-md">
                  <svg className="w-3 h-3 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}

              {/* Tech Name */}
              <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                {tech.name}
              </h4>

              {/* Description */}
              {tech.description && (
                <p className="text-xs text-muted-foreground">{tech.description}</p>
              )}

              {/* Hover effect overlay */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    );
  }
);

TechPartners.displayName = 'TechPartners';

/**
 * TechStackShowcase Component
 *
 * Visual showcase of technology stack with category icons and descriptions.
 */
export interface TechStackShowcaseProps {
  categories: TechCategory[];
  className?: string;
}

export const TechStackShowcase = React.forwardRef<HTMLDivElement, TechStackShowcaseProps>(
  ({ categories, className }, ref) => {
    return (
      <div ref={ref} className={cn('space-y-12', className)}>
        {categories.map((category, categoryIndex) => (
          <div key={category.id} className="space-y-4">
            {/* Category Header */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary">
                <category.icon className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold font-display text-foreground">
                {category.name}
              </h3>
            </div>

            {/* Technology Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.technologies.map((tech, techIndex) => (
                <div
                  key={techIndex}
                  className="group relative bg-card/80 backdrop-blur-md border border-border/50 rounded-xl p-5 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Tech Name */}
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {tech.name}
                    </h4>
                    {tech.certified && (
                      <span className="px-2 py-0.5 text-xs font-semibold bg-primary/10 text-primary rounded-full">
                        Certified
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  {tech.description && (
                    <p className="text-sm text-muted-foreground">{tech.description}</p>
                  )}

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
);

TechStackShowcase.displayName = 'TechStackShowcase';

/**
 * PartnerLogoGrid Component
 *
 * Simple grid for displaying partner logos.
 */
export interface PartnerLogo {
  name: string;
  logo: string;
  link?: string;
}

export interface PartnerLogoGridProps {
  partners: PartnerLogo[];
  columns?: 3 | 4 | 5 | 6;
  className?: string;
}

export const PartnerLogoGrid = React.forwardRef<HTMLDivElement, PartnerLogoGridProps>(
  ({ partners, columns = 5, className }, ref) => {
    const gridCols = {
      3: 'grid-cols-1 md:grid-cols-3',
      4: 'grid-cols-2 md:grid-cols-4',
      5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
      6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6',
    };

    return (
      <div ref={ref} className={cn('grid gap-6', gridCols[columns], className)}>
        {partners.map((partner, index) => (
          <a
            key={index}
            href={partner.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex items-center justify-center h-24"
          >
            {/* Partner Logo */}
            <img
              src={partner.logo}
              alt={partner.name}
              className="max-h-12 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
            />

            {/* Hover overlay */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
        ))}
      </div>
    );
  }
);

PartnerLogoGrid.displayName = 'PartnerLogoGrid';
