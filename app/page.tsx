import Link from 'next/link';

import { ProjectVisual } from '@/components/project-visual';
import { ThemeToggleButton } from '@/components/site-theme-toggle';
import { featuredProjects, projects, siteStats } from '@/lib/projects';

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jermaine-pasamba-2b9256355/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.5 8.5H4V20h2.5V8.5Zm-1.25-1.3c.87 0 1.57-.71 1.57-1.58A1.57 1.57 0 0 0 5.25 4c-.87 0-1.58.71-1.58 1.62 0 .87.71 1.58 1.58 1.58ZM10 20h2.5v-6.1c0-1.61.29-3.17 2.3-3.17 1.98 0 2 1.85 2 3.27V20h2.5v-6.9c0-3.37-.73-5.95-4.14-5.95-1.64 0-2.74.9-3.18 1.75h-.04V7H10c.03 1.2 0 13 0 13Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/watashiii5',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.77-.24.77-.54v-1.92c-3.14.68-3.8-1.34-3.8-1.34-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.17 1.75 1.17 1.02 1.75 2.69 1.25 3.35.96.1-.74.4-1.25.72-1.54-2.5-.29-5.14-1.25-5.14-5.58 0-1.23.44-2.23 1.17-3.02-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.15a10.8 10.8 0 0 1 5.72 0c2.18-1.46 3.13-1.15 3.13-1.15.63 1.57.24 2.73.12 3.02.73.79 1.17 1.79 1.17 3.02 0 4.34-2.65 5.29-5.16 5.58.42.36.79 1.08.79 2.18v3.24c0 .3.2.65.78.54A11.2 11.2 0 0 0 12 .8Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/jermainepasamba5',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M13.5 8.1V6.9c0-.9.6-1.1 1-1.1h1.9V3h-2.6C10.9 3 10 4.7 10 7v1.1H8.2v2.9H10V21h3.5v-9H16l.5-2.9h-3Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'OnlineJobs.ph',
    href: 'https://www.onlinejobs.ph/jobseekers/info/5129931',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm1.4 4.2a4.6 4.6 0 0 0 0 7.6 7.4 7.4 0 0 1 0-7.6Zm9.2 0a7.4 7.4 0 0 1 0 7.6 4.6 4.6 0 0 0 0-7.6ZM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z" fill="currentColor" />
      </svg>
    ),
  },
];

export default function HomePage() {
  const featured = featuredProjects
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter(Boolean)
    .slice(0, 2);

  return (
    <main className="page page--home">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true">
            JP
          </div>
          <div className="brand-copy">
            <div className="brand-name">Jermaine Pasamba</div>
            <div className="brand-subtitle">Next.js portfolio</div>
          </div>
        </div>
        <div className="topbar-actions">
          <div className="topbar-socials" aria-label="Social links">
            {socialLinks.map((link) => (
              <a className="topbar-icon-link" href={link.href} key={link.label} target="_blank" rel="noreferrer" aria-label={link.label}>
                {link.icon}
              </a>
            ))}
          </div>
          <ThemeToggleButton compact />
        </div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">Portfolio</div>
          <h1>
            <span>Engineered for Speed.</span>
            Built for work.
          </h1>
          <p>
            A short, professional portfolio with centered layouts, cleaner spacing, and a stronger presentation for projects, experience, and
            contact.
          </p>
          <div className="hero-actions">
            <Link className="button" href="#projects">
              Featured work
            </Link>
            <Link className="button-ghost" href="#contact">
              Contact
            </Link>
          </div>
          <div className="hero-meta">
            {siteStats.map((stat) => (
              <div className="stat-card" key={stat.label}>
                <span className="stat-label">{stat.label}</span>
                <span className="stat-value">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual" aria-label="Portfolio preview illustration">
          <div className="hero-orbit" />
          <div className="hero-card hero-card--photo">
            <img src="/portfolio/2by2New.png" alt="Bulacan State University portrait" loading="lazy" decoding="async" />
          </div>
          <div className="hero-badge">
            <strong>Bulacan State University</strong>
            <span>B.S. Mathematics, Computer Science</span>
          </div>
        </div>
      </section>

      <section className="section" id="projects">
        <div className="section-head">
          <div>
            <div className="section-kicker">Projects</div>
            <h2>Featured work.</h2>
          </div>
        </div>

        <div className="feature-grid">
          {featured.map((project) => {
            if (!project) {
              return null;
            }

            const projectItem = project as {
              slug: string;
              title: string;
              category: string;
              summary: string;
              tech: string[];
            };

            return (
              <article className="feature-card" key={projectItem.slug}>
                <ProjectVisual project={projectItem} />
                <div className="project-pill-row">
                  <span className="pill">{projectItem.category}</span>
                </div>
                <h3>{projectItem.title}</h3>
                <p>{projectItem.summary}</p>
                <div className="tag-row">
                  {projectItem.tech.slice(0, 4).map((stack) => (
                    <span className="tag" key={stack}>
                      {stack}
                    </span>
                  ))}
                </div>
                <Link className="project-link" href={`/projects/${projectItem.slug}`}>
                  Open project
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section" id="all-projects">
        <div className="section-head">
          <div>
            <div className="section-kicker">All work</div>
            <h2>Everything in one view.</h2>
          </div>
        </div>

        <div className="project-grid">
          {projects.map((project) => {
            const projectItem = project as {
              slug: string;
              title: string;
              category: string;
              summary: string;
              tech: string[];
            };

            return (
              <Link className="project-card" href={`/projects/${projectItem.slug}`} key={projectItem.slug}>
                <ProjectVisual project={projectItem} />
                <div className="project-pill-row">
                  <span className="pill">{projectItem.category}</span>
                </div>
                <h3>{projectItem.title}</h3>
                <p>{projectItem.summary}</p>
                <div className="tag-row">
                  {projectItem.tech.slice(0, 3).map((stack) => (
                    <span className="tag" key={stack}>
                      {stack}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section" id="contact">
        <div className="section-head">
          <div>
            <div className="section-kicker">Contact</div>
            <h2>Get in touch.</h2>
          </div>
        </div>

        <div className="contact-grid">
          <article className="contact-card">
            <h3>Direct contact</h3>
            <p>Email: jermaine.pasamba@gmail.com</p>
            <p>Contact number: 0942 696 3787</p>
            <div className="contact-actions">
              <a className="button" href="https://www.linkedin.com/in/jermaine-pasamba-2b9256355/" target="_blank" rel="noreferrer">
                View LinkedIn
              </a>
            </div>
          </article>

          <article className="contact-card">
            <h3>Chatbot</h3>
            <p>Open my separate chatbot demo hosted on Vercel.</p>
            <div className="contact-actions">
              <a className="button" href="https://portfolio-opal-iota-2ffsqksb9m.vercel.app/" target="_blank" rel="noreferrer">
                Open chatbot
              </a>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}