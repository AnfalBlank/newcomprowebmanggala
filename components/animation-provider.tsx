'use client';

import { useEffect } from 'react';
import { initAllAnimations } from '@/lib/animations';

/**
 * AnimationProvider Component
 *
 * Menginisialisasi semua animasi saat website dimuat
 */
export function AnimationProvider() {
  useEffect(() => {
    // Tunggu DOM siap
    const cleanup = initAllAnimations();

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return null;
}

/**
 * Smooth Scroll Component
 *
 * Memastikan smooth scroll untuk anchor links
 */
export function SmoothScroll() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      const href = target.getAttribute('href');

      if (href && href.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return null;
}

/**
 * Scroll Progress Bar Component
 *
 * Menunjukkan progress scroll di bagian atas halaman
 */
export function ScrollProgressBar() {
  useEffect(() => {
    const updateProgressBar = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;

      const progressBar = document.getElementById('scroll-progress-bar');
      if (progressBar) {
        progressBar.style.width = scrolled + '%';
      }
    };

    window.addEventListener('scroll', updateProgressBar);

    return () => {
      window.removeEventListener('scroll', updateProgressBar);
    };
  }, []);

  return (
    <div
      id="scroll-progress-bar"
      className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary via-accent to-primary z-50 transition-all duration-150"
      style={{ width: '0%' }}
    />
  );
}
