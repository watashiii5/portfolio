'use client';

import { useEffect, useState } from 'react';

type ThemeMode = 'dark' | 'light';

const THEME_KEY = 'jermaine-portfolio-theme';
const THEME_EVENT = 'jermaine-portfolio-theme-change';

export function ThemeToggleButton() {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [ready, setReady] = useState(false);

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

  function toggleTheme() {
    const nextTheme: ThemeMode = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem(THEME_KEY, nextTheme);
    window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: nextTheme }));
  }

  return (
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
  return <FloatingThemeToggle />;
}
