'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type ZoomableImageProps = {
  src: string;
  alt: string;
};

export function ZoomableImage({ src, alt }: ZoomableImageProps) {
  const [zoomed, setZoomed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomed(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [zoomed]);

  const overlay = zoomed && mounted
    ? createPortal(
        <div
          className="image-lightbox"
          onClick={() => setZoomed(false)}
        >
          <button className="image-lightbox__close" onClick={() => setZoomed(false)} aria-label="Close">
            ×
          </button>
          <img
            src={src}
            alt={alt}
            className="image-lightbox__img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onClick={() => setZoomed(true)}
        style={{ cursor: 'zoom-in' }}
      />
      {overlay}
    </>
  );
}
