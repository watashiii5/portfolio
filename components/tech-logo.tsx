'use client';

import { useEffect, useState } from 'react';

type TechLogoProps = {
  name: string;
  size?: number;
};

const CDN_ICONS: Record<string, { slug: string; darkColor: string; lightColor: string }> = {
  'Next.js': { slug: 'nextdotjs', darkColor: 'FFFFFF', lightColor: '000000' },
  'TypeScript': { slug: 'typescript', darkColor: '3178C6', lightColor: '3178C6' },
  'Python': { slug: 'python', darkColor: '3776AB', lightColor: '3776AB' },
  'Supabase': { slug: 'supabase', darkColor: '3ECF8E', lightColor: '1C865A' },
  'Vercel': { slug: 'vercel', darkColor: 'FFFFFF', lightColor: '000000' },
  'Render': { slug: 'render', darkColor: '46E3B7', lightColor: '1A8A6A' },
  'Unity': { slug: 'unity', darkColor: 'FFFFFF', lightColor: '4D4D4D' },
  'Figma': { slug: 'figma', darkColor: 'A259FF', lightColor: '7B3EBF' },
  'FastAPI': { slug: 'fastapi', darkColor: '009688', lightColor: '00796B' },
};

function CdnIcon({ name, isDark }: { name: string; isDark: boolean }) {
  const icon = CDN_ICONS[name];
  if (!icon) return null;
  const color = isDark ? icon.darkColor : icon.lightColor;
  return (
    <img
      src={`https://cdn.simpleicons.org/${icon.slug}/${color}`}
      alt={`${name} logo`}
      width={22}
      height={22}
      loading="lazy"
      decoding="async"
    />
  );
}

function CustomIcon({ name, isDark, size = 22 }: { name: string; isDark: boolean; size?: number }) {
  const c = isDark ? 'currentColor' : 'currentColor';
  const accent = (hex: string) => isDark ? hex : hex;

  const icons: Record<string, JSX.Element> = {
    'Groq': (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
        <circle cx="12" cy="12" r="10" stroke={accent('#F55036')} strokeWidth="1.5" />
        <path d="M8 12.5c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4" stroke={accent('#F55036')} strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="12" cy="12.5" r="1.5" fill={accent('#F55036')} />
      </svg>
    ),
    'FlutterFlow': (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
        <path d="M14.5 3.5L6 12l4 4 8.5-8.5L14.5 3.5z" fill={accent('#6C63FF')} opacity="0.9" />
        <path d="M10 16l-4 4.5L14.5 20.5 18 17l-4-4" fill={accent('#6C63FF')} opacity="0.65" />
        <path d="M6 12L2 7.5 10 3.5l4.5 4.5" fill={accent('#6C63FF')} opacity="0.45" />
      </svg>
    ),
    'Phaser': (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
        <path d="M12 2C12 2 5 10 5 14.5a7 7 0 0 0 14 0C19 10 12 2 12 2z" fill={accent('#C53AFF')} />
        <circle cx="9.5" cy="13.5" r="1.3" fill="#fff" />
        <circle cx="14.5" cy="13.5" r="1.3" fill="#fff" />
        <path d="M9.5 16.5c1 1.2 4 1.2 5 0" stroke="#fff" strokeWidth="1" strokeLinecap="round" fill="none" />
      </svg>
    ),
    'Java': (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
        <rect x="5" y="12" width="14" height="9" rx="1.5" stroke={accent('#ED8B00')} strokeWidth="1.5" />
        <path d="M8 12V9c0-1 .5-2 2-2.5" stroke={accent('#ED8B00')} strokeWidth="1.3" strokeLinecap="round" />
        <path d="M12 12V8.5c0-1 .8-1.8 2-2" stroke={accent('#ED8B00')} strokeWidth="1.3" strokeLinecap="round" />
        <path d="M16 12V10c0-.8.5-1.5 1.5-1.8" stroke={accent('#ED8B00')} strokeWidth="1.3" strokeLinecap="round" />
        <line x1="7" y1="15" x2="17" y2="15" stroke={accent('#ED8B00')} strokeWidth="1" opacity="0.5" />
        <line x1="7" y1="17.5" x2="17" y2="17.5" stroke={accent('#ED8B00')} strokeWidth="1" opacity="0.5" />
      </svg>
    ),
    'C#': (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
        <circle cx="12" cy="12" r="10" stroke={accent('#68217A')} strokeWidth="1.5" />
        <text x="6" y="16.5" fill={accent('#68217A')} fontSize="10" fontWeight="800" fontFamily="monospace">C#</text>
      </svg>
    ),
  };

  return icons[name] || null;
}

export default function TechLogo({ name, size = 22 }: TechLogoProps) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const check = () => {
      setIsDark(document.documentElement.dataset.theme !== 'light');
    };
    check();
    const handler = () => check();
    window.addEventListener('jermaine-portfolio-theme-change', handler);
    return () => window.removeEventListener('jermaine-portfolio-theme-change', handler);
  }, []);

  if (CDN_ICONS[name]) {
    return <CdnIcon name={name} isDark={isDark} />;
  }

  return <CustomIcon name={name} isDark={isDark} size={size} />;
}
