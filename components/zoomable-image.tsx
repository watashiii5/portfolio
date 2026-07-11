'use client';

import { useState } from 'react';

type ZoomableImageProps = {
  src: string;
  alt: string;
};

export function ZoomableImage({ src, alt }: ZoomableImageProps) {
  const [zoomed, setZoomed] = useState(false);

  return (
    <>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onClick={() => setZoomed(true)}
        style={{ cursor: 'zoom-in', transition: 'transform 0.3s ease' }}
      />
      {zoomed && (
        <div
          className="image-modal-overlay"
          onClick={() => setZoomed(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            cursor: 'zoom-out',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <img
            src={src}
            alt={alt}
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
              objectFit: 'contain',
              borderRadius: '8px',
              boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
              transform: 'scale(1)',
              animation: 'zoomIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
            onClick={(e) => {
              // Prevent click from bubbling to overlay if needed, though clicking image should also close
              setZoomed(false);
            }}
          />
        </div>
      )}
    </>
  );
}
