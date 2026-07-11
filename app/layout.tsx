import type { Metadata } from 'next';

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
      <body>
        <div className="site-frame">
          <div className="ambient ambient-one" aria-hidden="true" />
          <div className="ambient ambient-two" aria-hidden="true" />
          <div className="ambient ambient-three" aria-hidden="true" />
          <SiteThemeToggle />
          {children}
          <SiteChatbot />
        </div>
      </body>
    </html>
  );
}