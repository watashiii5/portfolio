'use client';

import { useEffect, useRef } from 'react';
import TechLogo from '@/components/tech-logo';

const primaryStack = [
  'Next.js', 'TypeScript', 'Python', 'Supabase',
  'FlutterFlow', 'Groq', 'Vercel', 'Render',
];

const secondaryStack = [
  'Unity', 'Phaser', 'Java', 'C#', 'Figma', 'FastAPI',
];

function MarqueeRow({
  items,
  speed,
  reverse,
}: {
  items: string[];
  speed: number;
  reverse?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const inner = innerRef.current;
    if (!track || !inner) return;

    const setWidth = inner.scrollWidth / 2;
    let pos = reverse ? -setWidth : 0;
    let raf: number;
    let lastTime = performance.now();

    function tick(now: number) {
      if (!inner) return;
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      pos += (reverse ? speed : -speed) * dt;

      if (!reverse && pos <= -setWidth) pos += setWidth;
      if (reverse && pos >= 0) pos -= setWidth;

      inner.style.transform = `translateX(${pos}px)`;
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reverse, speed]);

  const duplicated = [...items, ...items];

  return (
    <div className="stack-marquee__track" ref={trackRef}>
      <div className="stack-marquee__inner" ref={innerRef}>
        {duplicated.map((name, i) => (
          <div
            className={`stack-marquee__card ${reverse ? 'stack-marquee__card--sm' : ''}`}
            key={`${reverse ? 's' : 'p'}-${i}`}
            title={name}
          >
            <span className={`stack-marquee__logo ${reverse ? 'stack-marquee__logo--sm' : ''}`}>
              <TechLogo name={name} />
            </span>
            <span className="stack-marquee__name">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StackMarquee() {
  return (
    <div className="stack-marquee">
      <div className="stack-marquee__header">Primary stack</div>
      <MarqueeRow items={primaryStack} speed={35} />
      <div className="stack-marquee__header stack-marquee__header--sub">
        Also experienced with
      </div>
      <MarqueeRow items={secondaryStack} speed={40} reverse />
    </div>
  );
}
