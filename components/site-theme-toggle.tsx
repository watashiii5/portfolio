'use client';

import { useEffect, useState } from 'react';

type ThemeMode = 'dark' | 'light';

const THEME_KEY = 'jermaine-portfolio-theme';
const THEME_EVENT = 'jermaine-portfolio-theme-change';

type ThemeToggleButtonProps = {
  compact?: boolean;
};

export function ThemeToggleButton({ compact = false }: ThemeToggleButtonProps) {
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
    <button className={`theme-toggle-button${compact ? ' theme-toggle-button--compact' : ''}`} type="button" onClick={toggleTheme} aria-label="Toggle theme">
      <span className="theme-toggle-icon" aria-hidden="true">
        {theme === 'dark' ? (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="4.5" fill="currentColor" />
            <path d="M12 1.8v3M12 19.2v3M4.7 4.7l2.1 2.1M17.2 17.2l2.1 2.1M1.8 12h3M19.2 12h3M4.7 19.3l2.1-2.1M17.2 6.8l2.1-2.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
            <path d="M18 15.8A7.8 7.8 0 0 1 8.2 6a8 8 0 1 0 9.8 9.8Z" fill="currentColor" />
          </svg>
        )}
      </span>
      <span className="theme-toggle-label">{ready ? (theme === 'dark' ? 'Light' : 'Dark') : 'Theme'}</span>
    </button>
  );
}

export default function SiteThemeToggle() {
  return (
    <div className="theme-toggle-shell">
      <ThemeToggleButton />
    </div>
  );
}