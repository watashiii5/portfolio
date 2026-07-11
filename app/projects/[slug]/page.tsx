import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { getProjectBySlug, projectSlugs, projects } from '@/lib/projects';

type ProjectPageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return projectSlugs;
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return { title: 'Project not found' };
  }

  return {
    title: `${project.title} | Portfolio`,
    description: project.summary,
  };
}

function mediaFrame(media: (typeof projects)[number]['media'][number]) {
  if (media.kind === 'image') {
    return <img src={media.src} alt={media.alt} loading="lazy" decoding="async" />;
  }

  if (media.kind === 'video') {
    return <video controls playsInline preload="metadata" src={media.src} aria-label={media.alt} />;
  }

  if (media.kind === 'pdf') {
    return <iframe title={media.label} src={media.src} />;
  }

  return (
    <a className="resource-link" href={media.href} target="_blank" rel="noreferrer">
      {media.label}
    </a>
  );
}

function mediaKey(media: (typeof projects)[number]['media'][number]) {
  switch (media.kind) {
    case 'image':
    case 'video':
      return `${media.kind}-${media.src}`;
    case 'pdf':
      return `pdf-${media.src}`;
    case 'link':
      return `link-${media.label}`;
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="page">
      <div className="topbar">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true">
            JP
          </div>
          <div className="brand-copy">
            <div className="brand-name">Jermaine Pasamba</div>
            <div className="brand-subtitle">Project detail view</div>
          </div>
        </div>
        <Link className="nav-chip" href="/">
          <strong>Home</strong>
          <span>Back to the portfolio</span>
        </Link>
      </div>

      <article className="project-shell">
        <div className="project-hero">
          <section className="project-summary-card" style={{ ['--card-accent' as never]: project.accent } as React.CSSProperties}>
            <div className="project-kicker">{project.category}</div>
            <h1>{project.title}</h1>
            <p className="project-summary">{project.summary}</p>
            <p className="project-body">{project.intro}</p>

            <div className="project-meta">
              {project.role ? <span className="pill">{project.role}</span> : null}
              {project.timeline ? <span className="pill">{project.timeline}</span> : null}
            </div>

            <div className="project-actions">
              <Link className="button" href="/">
                Back to home
              </Link>
              {project.liveUrl ? (
                <a className="button-ghost" href={project.liveUrl} target="_blank" rel="noreferrer">
                  View live demo
                </a>
              ) : null}
            </div>
          </section>

          <aside className="project-media-card">
            <div className="project-metrics">
              {project.metrics.map((metric) => (
                <div className="metric" key={metric.label}>
                  <span className="stat-label">{metric.label}</span>
                  <strong>{metric.value}</strong>
                </div>
              ))}
            </div>

            <div className="tag-row" style={{ marginTop: 16 }}>
              {project.tech.map((tech) => (
                <span className="tag" key={tech}>
                  {tech}
                </span>
              ))}
            </div>
          </aside>
        </div>

        <section className="section-panel">
          <div className="section-head" style={{ marginBottom: 10 }}>
            <div>
              <div className="section-kicker">Highlights</div>
              <h2>What this project demonstrates.</h2>
            </div>
          </div>
          <ul className="project-highlights">
            {project.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="section-panel">
          <div className="section-head" style={{ marginBottom: 10 }}>
            <div>
              <div className="section-kicker">Media</div>
              <h2>Screenshots, documents, and supporting files.</h2>
            </div>
          </div>

          <div className="media-grid">
            {project.media.map((media) => (
              <article className="media-card" key={mediaKey(media)}>
                <div className="media-frame">{mediaFrame(media)}</div>
                {media.kind === 'pdf' ? (
                  <a className="resource-link" href={media.src} target="_blank" rel="noreferrer">
                    {media.label}
                  </a>
                ) : media.kind === 'link' ? (
                  <a className="resource-link" href={media.href} target="_blank" rel="noreferrer">
                    {media.label}
                  </a>
                ) : (
                  <div className="media-caption">{media.alt}</div>
                )}
              </article>
            ))}
          </div>
        </section>

        {project.sourceUrl ? (
          <section className="section-panel">
            <div className="section-head" style={{ marginBottom: 10 }}>
              <div>
                <div className="section-kicker">Source</div>
                <h2>Related external link.</h2>
              </div>
            </div>
            <a className="resource-link" href={project.sourceUrl} target="_blank" rel="noreferrer">
              Open related site
            </a>
          </section>
        ) : null}

        <section className="footer-note">
          <Link className="button-inline" href="/">
            Return to the portfolio overview
          </Link>
        </section>
      </article>
    </main>
  );
}