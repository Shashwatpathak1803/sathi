import { useCallback, useEffect, useRef } from 'react';
import Icon from './Icon';

/**
 * Accessible image lightbox.
 * - Escape closes, arrow keys navigate, focus is trapped inside.
 * - `labelFor(image)` returns the small label (project name) shown above the caption.
 */
export default function Lightbox({ images, index, onClose, onNavigate, labelFor }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const image = images[index];
  const total = images.length;

  const prev = useCallback(() => onNavigate((index - 1 + total) % total), [index, total, onNavigate]);
  const next = useCallback(() => onNavigate((index + 1) % total), [index, total, onNavigate]);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'Tab') {
        const focusable = dialogRef.current.querySelectorAll('button');
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previouslyFocused?.focus?.();
    };
  }, [onClose, prev, next]);

  // Preload neighbours for smoother navigation
  useEffect(() => {
    [images[(index + 1) % total], images[(index - 1 + total) % total]].forEach((img) => {
      if (img) new Image().src = img.src;
    });
  }, [index, images, total]);

  if (!image) return null;

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${total}: ${image.caption}`}
      ref={dialogRef}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button ref={closeRef} type="button" className="lightbox__close" onClick={onClose} aria-label="Close">
        <Icon name="close" size={26} />
      </button>

      {total > 1 && (
        <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={prev} aria-label="Previous photo">
          <Icon name="chevronLeft" size={28} />
        </button>
      )}

      <figure className="lightbox__figure">
        <img key={image.src} src={image.src} alt={image.caption} width={image.width} height={image.height} />
        <figcaption>
          {labelFor && <span className="lightbox__label">{labelFor(image)}</span>}
          <span>{image.caption}</span>
          <span className="lightbox__count">
            {index + 1} / {total}
          </span>
        </figcaption>
      </figure>

      {total > 1 && (
        <button type="button" className="lightbox__nav lightbox__nav--next" onClick={next} aria-label="Next photo">
          <Icon name="chevronRight" size={28} />
        </button>
      )}
    </div>
  );
}
