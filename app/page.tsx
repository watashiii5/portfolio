import Link from 'next/link';

import { ContactForm } from '@/components/contact-form';
import { OpenChatbotButton } from '@/components/open-chatbot-button';
import { ProjectVisual } from '@/components/project-visual';
import { ScrollReveal } from '@/components/scroll-reveal';
import { ThemeToggleButton } from '@/components/site-theme-toggle';
import TechLogo from '@/components/tech-logo';
import { featuredProjects, projects } from '@/lib/projects';

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
      <header className="topbar" id="site-topbar">
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
              <a className="topbar-icon-link" href={link.href} key={link.label} target="_blank" rel="noreferrer" aria-label={link.label} title={link.label}>
                {link.icon}
              </a>
            ))}
          </div>
          <ThemeToggleButton />
        </div>
      </header>
      <div id="theme-sentinel" className="theme-sentinel" aria-hidden="true" />

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">Portfolio</div>
          <h1>
            <span>Engineered for Speed.</span>
            Built for work.
          </h1>
          <p className="hero-subtitle">Full-Stack Developer</p>
          <p>
            Computer Science graduate specializing in modern web architecture and algorithmic precision, dedicated to writing high-performance, maintainable code.
          </p>
          <div className="hero-actions">
            <Link className="button" href="#projects">
              Featured work
            </Link>
            <Link className="button-ghost" href="#about">
              About me
            </Link>
            <Link className="button-ghost" href="#contact">
              Contact
            </Link>
          </div>
          <div className="stack-bento">
            <div className="stack-bento__header">Primary stack</div>
            <div className="stack-bento__grid">
              {[
                'Next.js', 'TypeScript', 'Python', 'Supabase',
                'FlutterFlow', 'Groq', 'Vercel', 'Render',
              ].map((name) => (
                <div className="stack-tile" key={name} title={name}>
                  <span className="stack-tile__logo-wrap">
                    <TechLogo name={name} />
                  </span>
                  <span className="stack-tile__name">{name}</span>
                </div>
              ))}
            </div>
            <div className="stack-bento__divider" />
            <div className="stack-bento__header stack-bento__header--sub">Also experienced with</div>
            <div className="stack-bento__grid stack-bento__grid--secondary">
              {[
                'Unity', 'Phaser', 'Java', 'C#', 'Figma', 'FastAPI',
              ].map((name) => (
                <div className="stack-tile stack-tile--sm" key={name} title={name}>
                  <span className="stack-tile__logo-wrap stack-tile__logo-wrap--sm">
                    <TechLogo name={name} />
                  </span>
                  <span className="stack-tile__name">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hero-visual" aria-label="Portfolio preview illustration">
          <div className="hero-orbit" />
          <div className="hero-card hero-card--photo">
            <img src="/portfolio/2by2New.png" alt="Bulacan State University portrait" loading="lazy" decoding="async" />
          </div>
          <div className="hero-badge">
            <strong>Bulacan State University</strong>
            <span>B.S. Computer Science — June 2026 Graduate</span>
          </div>
          <div className="hero-stats">
            {[
              { label: 'Projects', value: '9' },
              { label: 'Internship', value: '250 hrs' },
              { label: 'Live demos', value: '4' },
              { label: 'Stack', value: 'Next.js + Supabase' },
            ].map((stat) => (
              <div className="stat-card" key={stat.label}>
                <span className="stat-label">{stat.label}</span>
                <span className="stat-value">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ScrollReveal>
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

            return (
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
            );
          })}
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal delay={100}>
      <section className="section" id="all-projects">
        <div className="section-head">
          <div>
            <div className="section-kicker">All work</div>
            <h2>Everything in one view.</h2>
          </div>
        </div>

        <div className="project-grid">
          {projects.filter(p => !featured.some(f => f?.slug === p.slug)).map((project) => (
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
      </ScrollReveal>

      <ScrollReveal delay={100}>
      <section className="section" id="experience">
        <div className="section-head">
          <div>
            <div className="section-kicker">Experience</div>
            <h2>Work experience.</h2>
          </div>
        </div>

        <div className="timeline">
          <article className="timeline-item">
            <div className="timeline-logo">
              <img src="/portfolio/workExperience/nbconsulting(ojtlogo).png" alt="Nantes Bautista Consulting" />
            </div>
            <div className="timeline-content">
              <div className="timeline-header">
                <h3>Web Developer Intern</h3>
                <span className="timeline-date">June 2025 – July 2025</span>
              </div>
              <p className="timeline-org">Nantes Bautista Consulting</p>
              <ul className="timeline-details">
                <li>Served as the primary technical developer for a web-app system, utilizing FlutterFlow and Supabase to transition legacy processes into a modern digital interface.</li>
                <li>Built and implemented complex system logic, including advanced search filtering and database queries, overcoming technical limitations in a low-code environment.</li>
                <li>Collaborated with a cross-functional team to refine UI/UX components and ensure system performance met business objectives.</li>
              </ul>
            </div>
          </article>
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal delay={100}>
      <section className="section" id="education">
        <div className="section-head">
          <div>
            <div className="section-kicker">Education</div>
            <h2>Academic background.</h2>
          </div>
          <a className="button" href="/portfolio/workExperience/Jermaine PasambaCV.pdf" download>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6 }}>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download CV
          </a>
        </div>

        <div className="timeline">
          <article className="timeline-item">
            <div className="timeline-logo">
              <img src="/portfolio/education/bulsuLogo.png" alt="Bulacan State University" />
            </div>
            <div className="timeline-content">
              <div className="timeline-header">
                <h3>Bulacan State University</h3>
                <span className="timeline-date">August 2022 – June 2026</span>
              </div>
              <p className="timeline-org">Bachelor of Science in Mathematics with Specialization in Computer Science</p>
              <ul className="timeline-details">
                <li>Organization/Club: BulSu Microsoft Student Community</li>
              </ul>
            </div>
          </article>

          <article className="timeline-item">
            <div className="timeline-logo">
              <img src="/portfolio/education/eccat(hsLogo).png" alt="Early Christian College of Arts and Technology" />
            </div>
            <div className="timeline-content">
              <div className="timeline-header">
                <h3>Early Christian College of Arts and Technology</h3>
                <span className="timeline-date">June 2016 – May 2022</span>
              </div>
              <p className="timeline-org">Junior & Senior High School</p>
              <ul className="timeline-details">
                <li>Designed and optimized a robotic control system (Robotics)</li>
                <li>Math Quiz Bee Section Representative</li>
                <li>Memberships: Peer Counseling, Math Wizard, Book Lovers, Chess Club</li>
              </ul>
            </div>
          </article>

          <article className="timeline-item">
            <div className="timeline-logo">
              <img src="/portfolio/education/elemLogo.png" alt="Santa Maria Elementary School" />
            </div>
            <div className="timeline-content">
              <div className="timeline-header">
                <h3>Santa Maria Central School</h3>
                <span className="timeline-date">June 2007 – March 2016</span>
              </div>
              <p className="timeline-org">Elementary Education</p>
            </div>
          </article>
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal delay={120}>
      <section className="section" id="about">
        <div className="section-head">
          <div>
            <div className="section-kicker">About</div>
            <h2>About me.</h2>
          </div>
        </div>

        <div className="about-card">
          <div className="about-card__inner">
            <div className="about-card__photo">
              <img src="/portfolio/2by2New.png" alt="Jermaine Pasamba" />
            </div>
            <div className="about-card__text">
              <p>I am a Computer Science student at Bulacan State University graduated in June 2026, with full-stack experience in Next.js and FastAPI, a 250-hour web development internship, and specialized expertise in building algorithmic optimization systems.</p>
              <div className="about-card__actions">
                <a className="button" href="/portfolio/workExperience/Jermaine PasambaCV.pdf" download>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6 }}>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download CV
                </a>
                <Link className="button-ghost" href="#contact">
                  Get in touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal delay={150}>
      <section className="section" id="contact">
        <div className="section-head">
          <div>
            <div className="section-kicker">Contact</div>
            <h2>Get in touch.</h2>
          </div>
        </div>

        <div className="contact-grid">
          <div className="contact-top-row">
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
              <p>Chat with my AI assistant to learn more about my experience.</p>
              <div className="contact-actions">
                <OpenChatbotButton />
              </div>
            </article>
          </div>

          <ContactForm />
        </div>
      </section>
      </ScrollReveal>
    </main>
  );
}