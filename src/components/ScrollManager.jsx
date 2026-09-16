import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls to top on route change, or to the element matching the URL hash
 * (e.g. /#about) once the page has rendered.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      // wait a tick so the target section exists after route change
      const t = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
      return () => clearTimeout(t);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    return undefined;
  }, [pathname, hash]);

  return null;
}
