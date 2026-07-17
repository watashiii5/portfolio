'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type ThemeMode = 'dark' | 'light';
type AnimDir = 'sunrise' | 'sunset' | null;

const THEME_KEY = 'jermaine-portfolio-theme';
const THEME_EVENT = 'jermaine-portfolio-theme-change';
const CYCLE_MS = 3800;

function SkyCycle({ dir, onDone }: { dir: AnimDir; onDone: () => void }) {
  const isSunrise = dir === 'sunrise';

  return (
    <div className={`sky-cycle sky-cycle--${dir}`} onAnimationEnd={onDone}>
      <div className="sky-cycle__sky" />

      {isSunrise ? (
        <>
          <div className="sky-cycle__moon sky-cycle__moon--set" />
          <div className="sky-cycle__sun sky-cycle__sun--rise" />
          <div className="sky-cycle__glow sky-cycle__glow--sunrise" />
        </>
      ) : (
        <>
          <div className="sky-cycle__sun sky-cycle__sun--set" />
          <div className="sky-cycle__moon sky-cycle__moon--rise" />
          <div className="sky-cycle__glow sky-cycle__glow--sunset" />
        </>
      )}

      <div className="sky-cycle__stars">
        {isSunrise ? null : (
          <>
            <span className="sky-cycle__star" style={{ top: '18%', left: '30%', animationDelay: '1.6s' }} />
            <span className="sky-cycle__star" style={{ top: '12%', left: '60%', animationDelay: '2s' }} />
            <span className="sky-cycle__star" style={{ top: '28%', left: '75%', animationDelay: '2.3s' }} />
            <span className="sky-cycle__star" style={{ top: '8%', left: '45%', animationDelay: '1.8s' }} />
            <span className="sky-cycle__star" style={{ top: '22%', left: '20%', animationDelay: '2.5s' }} />
          </>
        )}
      </div>
    </div>
  );
}

export function ThemeToggleButton() {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [ready, setReady] = useState(false);
  const [anim, setAnim] = useState<AnimDir>(null);
  const pendingRef = useRef<ThemeMode | null>(null);
  const cycleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const applyTheme = (nextTheme: ThemeMode) => {
      setTheme(nextTheme);
      document.documentElement.dataset.theme = nextTheme;
    };

    const stored = window.localStorage.getItem(THEME_KEY) as ThemeMode | null;
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const nextTheme = stored === 'light' || stored === 'dark' ? stored : prefersLight ? 'light' : 'dark';

    applyTheme(nextTheme);
    setReady(true);

    const handleStorage = (event: StorageEvent) => {
      if (event.key === THEME_KEY && (event.newValue === 'light' || event.newValue === 'dark')) {
        applyTheme(event.newValue);
      }
    };

    const handleThemeChange = (event: Event) => {
      const customEvent = event as CustomEvent<ThemeMode>;
      if (customEvent.detail === 'light' || customEvent.detail === 'dark') {
        applyTheme(customEvent.detail);
      }
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener(THEME_EVENT, handleThemeChange as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener(THEME_EVENT, handleThemeChange as EventListener);
    };
  }, []);

  const commitTheme = useCallback((next: ThemeMode) => {
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem(THEME_KEY, next);
    window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: next }));
  }, []);

  function toggleTheme() {
    if (anim) return;

    const nextTheme: ThemeMode = theme === 'dark' ? 'light' : 'dark';
    const dir: AnimDir = theme === 'dark' ? 'sunrise' : 'sunset';

    pendingRef.current = nextTheme;
    setAnim(dir);

    cycleTimerRef.current = setTimeout(() => {
      if (pendingRef.current) {
        commitTheme(pendingRef.current);
        pendingRef.current = null;
      }
    }, CYCLE_MS * 0.45);
  }

  function handleAnimDone() {
    if (cycleTimerRef.current) clearTimeout(cycleTimerRef.current);
    if (pendingRef.current) {
      commitTheme(pendingRef.current);
      pendingRef.current = null;
    }
    setAnim(null);
  }

  return (
    <>
      {anim && <SkyCycle dir={anim} onDone={handleAnimDone} />}
      <button
        className={`theme-orb theme-orb--${theme}`}
        type="button"
        onClick={toggleTheme}
        aria-label={ready ? (theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode') : 'Toggle theme'}
      >
        <span className="theme-orb__glow" aria-hidden="true" />
        <span className="theme-orb__icon" aria-hidden="true">
          {theme === 'dark' ? (
            <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
              <path
                d="M24.8 18.4A10.4 10.4 0 0 1 13.6 7.2a10.6 10.6 0 1 0 11.2 11.2Z"
                fill="currentColor"
              />
              <circle cx="20" cy="10" r="1" fill="currentColor" opacity="0.5" />
              <circle cx="25" cy="14" r="0.7" fill="currentColor" opacity="0.4" />
              <circle cx="23" cy="7" r="0.5" fill="currentColor" opacity="0.3" />
            </svg>
          ) : (
            <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
              <circle cx="16" cy="16" r="6" fill="currentColor" />
              <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="16" y1="26" x2="16" y2="30" />
                <line x1="2" y1="16" x2="6" y2="16" />
                <line x1="26" y1="16" x2="30" y2="16" />
                <line x1="6.1" y1="6.1" x2="8.9" y2="8.9" />
                <line x1="23.1" y1="23.1" x2="25.9" y2="25.9" />
                <line x1="6.1" y1="25.9" x2="8.9" y2="23.1" />
                <line x1="23.1" y1="8.9" x2="25.9" y2="6.1" />
              </g>
            </svg>
          )}
        </span>
      </button>
    </>
  );
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      className={`scroll-top ${visible ? 'scroll-top--visible' : ''}`}
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}

function FloatingScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`scroll-top-wrap ${visible ? 'scroll-top-wrap--visible' : ''}`}>
      <ScrollToTop />
    </div>
  );
}

function FloatingThemeToggle() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let retryTimer: ReturnType<typeof setTimeout> | null = null;

    function setup() {
      const sentinel = document.getElementById('theme-sentinel');
      if (!sentinel) {
        retryTimer = setTimeout(setup, 200);
        return;
      }

      observer = new IntersectionObserver(
        ([entry]) => setVisible(!entry.isIntersecting),
        { threshold: 0 }
      );
      observer.observe(sentinel);
    }

    setup();

    return () => {
      if (observer) observer.disconnect();
      if (retryTimer) clearTimeout(retryTimer);
    };
  }, []);

  return (
    <div className={`theme-float ${visible ? 'theme-float--visible' : ''}`}>
      <ThemeToggleButton />
    </div>
  );
}

export default function SiteThemeToggle() {
  return (
    <>
      <FloatingScrollToTop />
      <FloatingThemeToggle />
    </>
  );
}
