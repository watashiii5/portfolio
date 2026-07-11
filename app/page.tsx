import Link from 'next/link';

import { ProjectVisual } from '@/components/project-visual';
import { featuredProjects, projects, siteStats } from '@/lib/projects';

export default function HomePage() {
  const featured = featuredProjects
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter(Boolean)
    .slice(0, 3);

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
      </header>

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">Portfolio</div>
          <h1>
            <span>Clean. Centered.</span>
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
          <div className="hero-card">
            <ProjectVisual project={projects[0]} variant="hero" />
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
            <h2>Selected work.</h2>
          </div>
        </div>

        <div className="feature-grid">
          {featured.map((project) =>
            project ? (
              <article className="feature-card" key={project.slug}>
                <ProjectVisual project={project} />
                <div className="project-pill-row">
                  <span className="pill">{project.category}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <div className="tag-row">
                  {project.tech.slice(0, 4).map((stack) => (
                    <span className="tag" key={stack}>
                      {stack}
                    </span>
                  ))}
                </div>
                <Link className="project-link" href={`/projects/${project.slug}`}>
                  Open project
                </Link>
              </article>
            ) : null,
          )}
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
          {projects.map((project) => (
            <Link className="project-card" href={`/projects/${project.slug}`} key={project.slug}>
              <ProjectVisual project={project} />
              <div className="project-pill-row">
                <span className="pill">{project.category}</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <div className="tag-row">
                {project.tech.slice(0, 3).map((stack) => (
                  <span className="tag" key={stack}>
                    {stack}
                  </span>
                ))}
              </div>
            </Link>
          ))}
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