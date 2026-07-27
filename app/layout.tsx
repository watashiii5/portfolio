import type { Metadata } from 'next';

import SectionNav from '@/components/section-nav';
import SiteThemeToggle from '@/components/site-theme-toggle';
import SiteChatbot from '@/components/site-chatbot';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jermaine Pasamba | Portfolio',
  description: 'A modernized portfolio for Jermaine Pasamba with projects, experience, and live demos.',
  metadataBase: new URL('https://watashi5.github.io'),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('jermaine-portfolio-theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t;else if(matchMedia('(prefers-color-scheme:light)').matches)document.documentElement.dataset.theme='light';}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <div className="site-frame">
          <div className="ambient ambient-one" aria-hidden="true" />
          <div className="ambient ambient-two" aria-hidden="true" />
          <div className="ambient ambient-three" aria-hidden="true" />
          <SectionNav />
          <SiteThemeToggle />
          {children}
          <SiteChatbot />
        </div>
      </body>
    </html>
  );
}