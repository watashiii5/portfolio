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
        <rect x="2" y="2" width="20" height="20" rx="4" stroke={accent('#C53AFF')} strokeWidth="1.5" />
        <path d="M7 8h4c2.2 0 4 1.8 4 4s-1.8 4-4 4H7V8z" stroke={accent('#C53AFF')} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="17" cy="8" r="1.5" fill={accent('#C53AFF')} />
      </svg>
    ),
    'Java': (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none">
        <path d="M6 3c5.5 3 8.5 7 9 11.5-.5 3-2 5.5-3 6.5" stroke={accent('#ED8B00')} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 3c-5 3.5-7.5 7.5-8 11.5.5 3 1.5 5 2.5 6.5" stroke={accent('#ED8B00')} strokeWidth="1.5" strokeLinecap="round" />
        <text x="7" y="16" fill={accent('#ED8B00')} fontSize="7" fontWeight="800" fontFamily="monospace">Jv</text>
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
