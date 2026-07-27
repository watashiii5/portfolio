import Link from 'next/link';

import { ContactForm } from '@/components/contact-form';
import { OpenChatbotButton } from '@/components/open-chatbot-button';
import CertificateCarousel from '@/components/certificate-carousel';
import type { Certificate } from '@/components/certificate-carousel';
import CvDownloadButton from '@/components/cv-download-button';
import ProjectCarousel from '@/components/project-carousel';
import { ProjectVisual } from '@/components/project-visual';
import { ScrollReveal } from '@/components/scroll-reveal';
import StackMarquee from '@/components/stack-marquee';
import { ThemeToggleButton } from '@/components/site-theme-toggle';
import { featuredProjects, projects } from '@/lib/projects';

const certificates: Certificate[] = [
  {
    id: 'ojt',
    title: 'Certificate of Completion',
    organization: 'Nantes Bautista Consulting',
    meta: ['Web Developer Intern — June 2025 – July 2025', '250 hours of On-the-Job Training'],
    imageSrc: '/portfolio/Certification/Intern_Certificate_OJT.png',
    imageAlt: 'Certificate of Completion — Jermaine Pasamba, Web Developer Intern at Nantes Bautista Consulting',
    pdfUrl: '/portfolio/Certification/Certificate of Completion-Jermaine Pasamba(Internship).pdf',
  },
  {
    id: 'thesis',
    title: 'Certificate of Participation',
    organization: 'Bulacan State University',
    meta: ['Best Programmed System Competition 2026', 'April 7, 2026'],
    imageSrc: '/portfolio/Certification/Certificate_thesis.jpg',
    imageAlt: 'Certificate of Participation — Best Programmed System Competition 2026, Bulacan State University',
  },
  {
    id: 'c1-english',
    title: 'Certification of Achievement',
    organization: 'Exam English (examenglish.com)',
    meta: ['C1 Advanced English'],
    imageSrc: '/portfolio/Certification/Certification_of_achievement_C1_Advance.png',
    imageAlt: 'Certification of Achievement — C1 Advanced English, Exam English',
  },
];

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

      <div className="hero-marquee-wrap">
        <StackMarquee />
      </div>

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

        <ProjectCarousel projects={projects.filter(p => !featured.some(f => f?.slug === p.slug))} />
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

        <div className="exp-showcase">
          <div className="exp-card">
            <div className="exp-card__glow" aria-hidden="true" />
            <div className="exp-card__top">
              <div className="exp-card__logo">
                <img src="/portfolio/workExperience/nbconsulting(ojtlogo).png" alt="Nantes Bautista Consulting" />
              </div>
              <div className="exp-card__meta">
                <span className="exp-card__date">June 2025 – July 2025</span>
                <span className="exp-card__hours">250 hrs</span>
              </div>
            </div>
            <h3 className="exp-card__title">Web Developer Intern</h3>
            <p className="exp-card__org">Nantes Bautista Consulting</p>
            <ul className="exp-card__details">
              <li>Served as the primary technical developer, utilizing FlutterFlow and Supabase to transition legacy processes into a modern digital interface.</li>
              <li>Built complex system logic including advanced search filtering and database queries, overcoming limitations in a low-code environment.</li>
              <li>Collaborated with a cross-functional team to refine UI/UX components and ensure system performance met business objectives.</li>
            </ul>
            <div className="exp-card__tags">
              <span className="exp-tag">FlutterFlow</span>
              <span className="exp-tag">Supabase</span>
              <span className="exp-tag">Groq API</span>
              <span className="exp-tag">Figma</span>
            </div>
          </div>
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
        </div>

        <div className="edu-h-timeline">
          <div className="edu-h-timeline__track" aria-hidden="true">
            <div className="edu-h-timeline__track-fill" />
          </div>

          <div className="edu-h-timeline__node">
            <div className="edu-h-timeline__logo">
              <img src="/portfolio/education/bulsuLogo.png" alt="Bulacan State University" />
            </div>
            <div className="edu-h-timeline__dot">
              <span>Tertiary</span>
            </div>
            <div className="edu-h-timeline__date">Aug 2022 – June 2026</div>
            <div className="edu-h-timeline__card">
              <span className="edu-h-timeline__level edu-h-timeline__level--college">College</span>
              <h3>Bulacan State University</h3>
              <p>BS in Mathematics with Specialization in Computer Science</p>
              <span className="edu-h-timeline__detail">BulSU Microsoft Student Community</span>
            </div>
          </div>

          <div className="edu-h-timeline__node">
            <div className="edu-h-timeline__logo">
              <img src="/portfolio/education/eccat(hsLogo).png" alt="Early Christian College of Arts and Technology" />
            </div>
            <div className="edu-h-timeline__dot">
              <span>Secondary</span>
            </div>
            <div className="edu-h-timeline__date">June 2016 – May 2022</div>
            <div className="edu-h-timeline__card">
              <span className="edu-h-timeline__level edu-h-timeline__level--hs">High School</span>
              <h3>Early Christian College of Arts and Technology</h3>
              <p>Junior & Senior High School</p>
              <span className="edu-h-timeline__detail">Robotics · Math Quiz Bee Rep · Peer Counseling · Chess Club</span>
            </div>
          </div>

          <div className="edu-h-timeline__node">
            <div className="edu-h-timeline__logo">
              <img src="/portfolio/education/elemLogo.png" alt="Santa Maria Central School" />
            </div>
            <div className="edu-h-timeline__dot">
              <span>Primary</span>
            </div>
            <div className="edu-h-timeline__date">June 2007 – March 2016</div>
            <div className="edu-h-timeline__card">
              <span className="edu-h-timeline__level edu-h-timeline__level--elem">Elementary</span>
              <h3>Santa Maria Central School</h3>
              <p>Elementary Education</p>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal delay={100}>
      <section className="section" id="certificates">
        <div className="section-head">
          <div>
            <div className="section-kicker">Certificates</div>
            <h2>Certifications.</h2>
          </div>
        </div>

        <CertificateCarousel certificates={certificates} />
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
                <CvDownloadButton pdfUrl="/portfolio/workExperience/Jermaine_Pasamba_Curriculum_Vitae.pdf" />
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
              <div className="contact-card__icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <h3>Direct contact</h3>
              <p className="contact-card__detail">jermaine.pasamba@gmail.com</p>
              <p className="contact-card__detail">0942 696 3787</p>
              <div className="contact-actions">
                <a className="button" href="https://www.linkedin.com/in/jermaine-pasamba-2b9256355/" target="_blank" rel="noreferrer">
                  View LinkedIn
                </a>
              </div>
            </article>

            <article className="contact-card">
              <div className="contact-card__icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3>Chatbot</h3>
              <p className="contact-card__detail">Chat with Porcha to learn more about my experience and projects.</p>
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