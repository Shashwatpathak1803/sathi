import { useEffect, useState } from 'react';

/**
 * Types each phrase, pauses, deletes it, then moves to the next.
 * Under prefers-reduced-motion it shows the first phrase without animation.
 * The visible text is aria-hidden; screen readers get the full list via `srText`.
 */
export default function Typewriter({ phrases, typeMs = 55, deleteMs = 28, holdMs = 1800, srText }) {
  const [text, setText] = useState('');
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduce(true);
      return undefined;
    }
    let i = 0;
    let n = 0;
    let deleting = false;
    let timer;
    const step = () => {
      const full = phrases[i];
      if (!deleting) {
        n += 1;
        setText(full.slice(0, n));
        if (n === full.length) {
          deleting = true;
          timer = setTimeout(step, holdMs);
          return;
        }
        timer = setTimeout(step, typeMs);
      } else {
        n -= 1;
        setText(full.slice(0, n));
        if (n === 0) {
          deleting = false;
          i = (i + 1) % phrases.length;
          timer = setTimeout(step, 350);
          return;
        }
        timer = setTimeout(step, deleteMs);
      }
    };
    timer = setTimeout(step, 600);
    return () => clearTimeout(timer);
  }, [phrases, typeMs, deleteMs, holdMs]);

  return (
    <>
      <span className="sr-only">{srText || phrases.join(', ')}</span>
      <span className="typewriter" aria-hidden="true">
        {reduce ? phrases[0] : text}
        {!reduce && <span className="typewriter__caret" />}
      </span>
    </>
  );
}
