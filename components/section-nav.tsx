'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const sections = [
  { id: 'projects', label: 'Projects' },
  { id: 'all-projects', label: 'All Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export default function SectionNav() {
  const [active, setActive] = useState<string>(sections[0].id);
  const [visible, setVisible] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    let retryTimer: ReturnType<typeof setTimeout> | null = null;

    function observe() {
      const allFound = sections.every((s) => document.getElementById(s.id));
      if (!allFound) {
        retryTimer = setTimeout(observe, 300);
        return;
      }
      sections.forEach((s) => {
        const el = document.getElementById(s.id);
        if (el) observer.observe(el);
      });
    }

    observe();
    return () => {
      observer.disconnect();
      if (retryTimer) clearTimeout(retryTimer);
    };
  }, []);

  useEffect(() => {
    const btn = buttonRefs.current.get(active);
    if (btn && navRef.current) {
      const nav = navRef.current;
      const btnRect = btn.getBoundingClientRect();
      const navRect = nav.getBoundingClientRect();
      const offset = btnRect.left - navRect.left - (navRect.width / 2) + (btnRect.width / 2);
      nav.scrollTo({ left: nav.scrollLeft + offset, behavior: 'smooth' });
    }
  }, [active]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const topbarHeight = 80;
      const y = el.getBoundingClientRect().top + window.scrollY - topbarHeight;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  return (
    <nav
      ref={navRef}
      className={`section-nav ${visible ? 'section-nav--visible' : ''}`}
      aria-label="Section navigation"
    >
      {sections.map((s) => (
        <button
          key={s.id}
          ref={(el) => { if (el) buttonRefs.current.set(s.id, el); }}
          type="button"
          className={`section-nav__pill ${active === s.id ? 'section-nav__pill--active' : ''}`}
          onClick={() => scrollTo(s.id)}
          aria-current={active === s.id ? 'true' : undefined}
        >
          {s.label}
        </button>
      ))}
    </nav>
  );
}
