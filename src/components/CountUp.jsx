import { useEffect, useRef, useState } from 'react';

/**
 * Counts from 0 up to the number inside `value` (e.g. "310K+" -> 0..310 then "K+")
 * when the element scrolls into view. Static under prefers-reduced-motion.
 */
export default function CountUp({ value, duration = 1800 }) {
  const match = String(value).match(/^([^\d]*)(\d+)(.*)$/);
  const prefix = match ? match[1] : '';
  const target = match ? parseInt(match[2], 10) : 0;
  const suffix = match ? match[3] : '';
  const ref = useRef(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      setN(target);
      return undefined;
    }
    let raf;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setN(Math.round(target * eased));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]);

  if (!match) return <span ref={ref}>{value}</span>;
  return (
    <span ref={ref} aria-label={`${prefix}${target}${suffix}`}>
      {prefix}
      {n}
      {suffix}
    </span>
  );
}
