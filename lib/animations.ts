/**
 * Animation Utilities
 *
 * Script untuk inisialisasi scroll reveal animations dan interaktivitas
 */

export function initScrollAnimations() {
  if (typeof window === 'undefined') return;

  // Intersection Observer untuk scroll reveal
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  // Observe semua elemen dengan class reveal
  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach((el) => observer.observe(el));

  const revealLeftElements = document.querySelectorAll('.reveal-left');
  revealLeftElements.forEach((el) => observer.observe(el));

  const revealRightElements = document.querySelectorAll('.reveal-right');
  revealRightElements.forEach((el) => observer.observe(el));

  const revealScaleElements = document.querySelectorAll('.reveal-scale');
  revealScaleElements.forEach((el) => observer.observe(el));

  return () => {
    revealElements.forEach((el) => observer.unobserve(el));
    revealLeftElements.forEach((el) => observer.unobserve(el));
    revealRightElements.forEach((el) => observer.unobserve(el));
    revealScaleElements.forEach((el) => observer.unobserve(el));
  };
}

export function initSmoothScroll() {
  if (typeof window === 'undefined') return;

  // Smooth scroll untuk anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

export function initParallax() {
  if (typeof window === 'undefined') return;

  // Parallax effect untuk background images
  const parallaxElements = document.querySelectorAll('.parallax');

  function handleScroll() {
    const scrolled = window.pageYOffset;
    parallaxElements.forEach((el) => {
      const speed = el.getAttribute('data-speed') || '0.5';
      const offset = scrolled * parseFloat(speed);
      el.style.transform = `translateY(${offset}px)`;
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}

export function initHoverEffects() {
  if (typeof window === 'undefined') return;

  // Magnetic button effect
  const buttons = document.querySelectorAll('.magnetic-btn');

  buttons.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });
}

export function initCounterAnimations() {
  if (typeof window === 'undefined') return;

  const counters = document.querySelectorAll('[data-count]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const count = parseInt(target.getAttribute('data-count') || '0');
        const duration = parseInt(target.getAttribute('data-duration') || '2000');

        animateCounter(target, count, duration);
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach((counter) => observer.observe(counter));
}

function animateCounter(element: Element, target: number, duration: number) {
  const startTime = Date.now();
  const startValue = 0;

  function update() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease out quart
    const easeOut = 1 - Math.pow(1 - progress, 4);
    const currentValue = Math.floor(easeOut * target);

    element.textContent = currentValue.toLocaleString('id-ID');

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target.toLocaleString('id-ID');
    }
  }

  requestAnimationFrame(update);
}

export function initLazyLoading() {
  if (typeof window === 'undefined') return;

  // Lazy loading untuk images
  const images = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.getAttribute('data-src');
        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

export function initAllAnimations() {
  const cleanup: (() => void)[] = [];

  cleanup.push(initScrollAnimations());
  cleanup.push(initSmoothScroll());
  cleanup.push(initParallax());
  cleanup.push(initHoverEffects());
  cleanup.push(initCounterAnimations());
  cleanup.push(initLazyLoading());

  return () => {
    cleanup.forEach((fn) => fn && fn());
  };
}

/**
 * Trigger animation manually
 */
export function triggerAnimation(element: HTMLElement, animationClass: string) {
  element.classList.add(animationClass);
  setTimeout(() => {
    element.classList.remove(animationClass);
  }, 1000);
}

/**
 * Add stagger animation to children
 */
export function addStaggerAnimation(
  container: HTMLElement,
  selector: string,
  delay: number = 100
) {
  const children = container.querySelectorAll(selector);
  children.forEach((child, index) => {
    (child as HTMLElement).style.animationDelay = `${index * delay}ms`;
    child.classList.add('reveal');
  });
}
