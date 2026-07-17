'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type ThemeMode = 'dark' | 'light';
type AnimDir = 'sunrise' | 'sunset' | null;

const THEME_KEY = 'jermaine-portfolio-theme';
const THEME_EVENT = 'jermaine-portfolio-theme-change';
const CYCLE_MS = 3800;

const SunSVG = () => <span className="theme-orb__sun-disk" />;

const MoonSVG = () => (
  <svg viewBox="0 0 36 36" width="30" height="30" fill="none">
    <path
      d="M27.6 20.2A11.5 11.5 0 0 1 15.2 7.8a11.8 11.8 0 1 0 12.4 12.4Z"
      fill="url(#moonGrad)"
    />
    <defs>
      <radialGradient id="moonGrad" cx="0.38" cy="0.38">
        <stop offset="0%" stopColor="#f8f8ff" />
        <stop offset="60%" stopColor="#e0e0ec" />
        <stop offset="100%" stopColor="#c0c0d0" />
      </radialGradient>
    </defs>
    <circle cx="22.5" cy="11" r="1.3" fill="#b0b0c4" opacity="0.5" />
    <circle cx="26.5" cy="15.5" r="0.9" fill="#b0b0c4" opacity="0.35" />
    <circle cx="24" cy="8" r="0.7" fill="#b0b0c4" opacity="0.25" />
  </svg>
);

const SmallSunSVG = () => (
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
);

const SmallMoonSVG = () => (
  <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
    <path d="M24.8 18.4A10.4 10.4 0 0 1 13.6 7.2a10.6 10.6 0 1 0 11.2 11.2Z" fill="currentColor" />
    <circle cx="20" cy="10" r="1" fill="currentColor" opacity="0.5" />
    <circle cx="25" cy="14" r="0.7" fill="currentColor" opacity="0.4" />
    <circle cx="23" cy="7" r="0.5" fill="currentColor" opacity="0.3" />
  </svg>
);

export function ThemeToggleButton() {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [ready, setReady] = useState(false);
  const [anim, setAnim] = useState<AnimDir>(null);
  const pendingRef = useRef<ThemeMode | null>(null);
  const commitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clearTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const apply = (t: ThemeMode) => {
      setTheme(t);
      document.documentElement.dataset.theme = t;
    };
    const stored = window.localStorage.getItem(THEME_KEY) as ThemeMode | null;
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const next = stored === 'light' || stored === 'dark' ? stored : prefersLight ? 'light' : 'dark';
    apply(next);
    setReady(true);

    const onStorage = (e: StorageEvent) => {
      if (e.key === THEME_KEY && (e.newValue === 'light' || e.newValue === 'dark')) apply(e.newValue);
    };
    const onCustom = (e: Event) => {
      const d = (e as CustomEvent<ThemeMode>).detail;
      if (d === 'light' || d === 'dark') apply(d);
    };
    window.addEventListener('storage', onStorage);
    window.addEventListener(THEME_EVENT, onCustom as EventListener);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener(THEME_EVENT, onCustom as EventListener);
    };
  }, []);

  useEffect(() => () => {
    if (commitTimer.current) clearTimeout(commitTimer.current);
    if (clearTimer.current) clearTimeout(clearTimer.current);
  }, []);

  const commit = useCallback((next: ThemeMode) => {
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem(THEME_KEY, next);
    window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: next }));
  }, []);

  function toggle() {
    if (anim) return;
    const next: ThemeMode = theme === 'dark' ? 'light' : 'dark';
    pendingRef.current = next;
    setAnim(theme === 'dark' ? 'sunrise' : 'sunset');

    commitTimer.current = setTimeout(() => {
      if (pendingRef.current) {
        commit(pendingRef.current);
        pendingRef.current = null;
      }
    }, 2600);

    clearTimer.current = setTimeout(() => setAnim(null), CYCLE_MS);
  }

  const isSunrise = anim === 'sunrise';

  return (
    <button
      className={`theme-orb theme-orb--${theme}${anim ? ` theme-orb--animating theme-orb--${anim}` : ''}`}
      type="button"
      onClick={toggle}
      aria-label={ready ? (theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode') : 'Toggle theme'}
    >
      {anim && (
        <span className="theme-orb__dome" aria-hidden="true">
          <span className="theme-orb__sky" />
          <span className="theme-orb__arm theme-orb__arm--set">
            <span className={`theme-orb__body theme-orb__body--${isSunrise ? 'moon' : 'sun'}`}>
              {isSunrise ? <MoonSVG /> : <SunSVG />}
            </span>
          </span>
          <span className="theme-orb__arm theme-orb__arm--rise">
            <span className={`theme-orb__body theme-orb__body--${isSunrise ? 'sun' : 'moon'}`}>
              {isSunrise ? <SunSVG /> : <MoonSVG />}
            </span>
          </span>
          <span className="theme-orb__stars">
            <i /><i /><i /><i /><i /><i /><i /><i />
            <i /><i /><i /><i /><i /><i /><i /><i />
          </span>
          <span className="theme-orb__clouds">
            <span className="theme-orb__cloud theme-orb__cloud--1" />
            <span className="theme-orb__cloud theme-orb__cloud--2" />
            <span className="theme-orb__cloud theme-orb__cloud--3" />
          </span>
          <span className="theme-orb__birds">
            <span className="theme-orb__bird theme-orb__bird--1" />
            <span className="theme-orb__bird theme-orb__bird--2" />
            <span className="theme-orb__bird theme-orb__bird--3" />
          </span>
        </span>
      )}
      <span className="theme-orb__glow" aria-hidden="true" />
      <span className="theme-orb__icon" aria-hidden="true">
        {theme === 'dark' ? <SmallMoonSVG /> : <SmallSunSVG />}
      </span>
    </button>
  );
}

function ScrollToTop() {
  return (
    <button
      className="scroll-top"
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
