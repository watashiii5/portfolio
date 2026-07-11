'use client';

import { useEffect, useState } from 'react';

type ThemeMode = 'dark' | 'light';

const THEME_KEY = 'jermaine-portfolio-theme';

export default function SiteThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_KEY) as ThemeMode | null;
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const nextTheme = stored === 'light' || stored === 'dark' ? stored : prefersLight ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    setReady(true);
  }, []);

  function toggleTheme() {
    const nextTheme: ThemeMode = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem(THEME_KEY, nextTheme);
  }

  return (
    <div className="theme-toggle-shell">
      <button className="theme-toggle-button" type="button" onClick={toggleTheme} aria-label="Toggle theme">
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
    </div>
  );
}