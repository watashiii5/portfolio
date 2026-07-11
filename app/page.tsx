import Link from 'next/link';

import { featuredProjects, projects, siteStats } from '@/lib/projects';

function accentForIndex(index: number) {
  return ['#7dd3fc', '#fb923c', '#a78bfa', '#34d399'][index % 4];
}

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
            <div className="brand-subtitle">Portfolio redesign in Next.js</div>
          </div>
        </div>
        <Link className="nav-chip" href="#projects">
          <strong>Explore</strong>
          <span>Projects and experience</span>
        </Link>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">Student portfolio</div>
          <h1>
            <span>Visual polish</span>
            with a sharper technical edge.
          </h1>
          <p>
            This rebuild keeps the original portfolio content but wraps it in a more intentional presentation: richer motion, layered backgrounds,
            stronger project storytelling, and a route structure that is ready for GitHub Pages export.
          </p>
          <div className="hero-actions">
            <Link className="button" href="#projects">
              View featured work
            </Link>
            <Link className="button-ghost" href="#contact">
              Contact and links
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
            <img src="/portfolio/2by2%20New.png" alt="Jermaine Pasamba portrait" />
            <div className="hero-badge">
              <strong>Bulacan State University</strong>
              <span>B.S. Mathematics, Computer Science specialization</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <div className="section-kicker">What changed</div>
            <h2>More depth, better spacing, and a clearer visual hierarchy.</h2>
          </div>
          <Link className="button-inline" href="#contact">
            Jump to contact
          </Link>
        </div>
        <div className="feature-grid">
          <article className="feature-card">
            <h3>Strong visual system</h3>
            <p>
              The new layout uses layered gradients, glass panels, and color-coded project accents so each section feels intentional instead of
              stacked HTML blocks.
            </p>
          </article>
          <article className="feature-card">
            <h3>Project-first structure</h3>
            <p>
              Every portfolio item now has a reusable data shape, which makes it easier to add new work without rebuilding the page each time.
            </p>
          </article>
        </div>
      </section>

      <section className="section" id="projects">
        <div className="section-head">
          <div>
            <div className="section-kicker">Featured work</div>
            <h2>Selected projects with live demos, screenshots, and documents.</h2>
          </div>
          <Link className="button-inline" href="#all-projects">
            See all projects
          </Link>
        </div>

        <div className="feature-grid">
          {featured.map((project, index) =>
            project ? (
              <article className="feature-card" key={project.slug} style={{ ['--card-accent' as never]: accentForIndex(index) } as React.CSSProperties}>
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
            <div className="section-kicker">Full portfolio</div>
            <h2>All projects in one clean grid.</h2>
          </div>
        </div>

        <div className="project-grid">
          {projects.map((project, index) => (
            <Link className="project-card" href={`/projects/${project.slug}`} key={project.slug} style={{ ['--card-accent' as never]: project.accent } as React.CSSProperties}>
              <div className="project-preview">
                {project.media.find((media) => media.kind === 'image') ? (
                  <img src={project.media.find((media) => media.kind === 'image' && 'src' in media)?.src} alt={project.title} />
                ) : (
                  <div className="pill">Project {index + 1}</div>
                )}
              </div>
              <div className="project-pill-row">
                <span className="pill">{project.category}</span>
                {project.liveUrl ? <span className="pill">Live demo</span> : null}
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
            <h2>Ways to reach me and the original portfolio links.</h2>
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
            <h3>Notes</h3>
            <p>
              This redesign keeps the same portfolio content but packages it as a Next.js static export, which makes GitHub Pages deployment much
              cleaner.
            </p>
            <p className="small-print">Built from the existing HTML content and media in this repository.</p>
          </article>
        </div>
      </section>
    </main>
  );
}