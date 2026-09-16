import { useEffect, useRef } from 'react';

/**
 * Adds the `is-visible` class to the returned ref's element when it scrolls
 * into view (once). Used for lightweight scroll-reveal animations.
 * Respects prefers-reduced-motion via CSS.
 */
export default function useReveal(options = { threshold: 0.12 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-visible');
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.unobserve(el);
        }
      });
    }, options);
    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return ref;
}
