'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { Project } from '@/lib/projects';
import { ProjectVisual } from '@/components/project-visual';

type ProjectCarouselProps = {
  projects: Project[];
};

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scrollTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement | undefined;
    if (!card) return;
    track.scrollTo({
      left: card.offsetLeft - (track.offsetWidth - card.offsetWidth) / 2,
      behavior: 'smooth',
    });
  }, []);

  const goTo = useCallback((index: number) => {
    const i = Math.max(0, Math.min(index, projects.length - 1));
    setActiveIndex(i);
    scrollTo(i);
  }, [projects.length, scrollTo]);

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const rect = track.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      let closestIdx = activeIndex;
      let closestDist = Infinity;
      for (let i = 0; i < track.children.length; i++) {
        const child = track.children[i] as HTMLElement;
        const cr = child.getBoundingClientRect();
        const dist = Math.abs(cr.left + cr.width / 2 - center);
        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = i;
        }
      }
      setActiveIndex(closestIdx);
    };

    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, [activeIndex]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const nextIdx = prev + 1 >= projects.length ? 0 : prev + 1;
        scrollTo(nextIdx);
        return nextIdx;
      });
    }, 3000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [projects.length, scrollTo]);

  if (projects.length === 0) return null;

  return (
    <div className="carousel">
      <div className="carousel__track" ref={trackRef}>
        {projects.map((project) => (
          <Link className="carousel__card" href={`/projects/${project.slug}`} key={project.slug}>
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

      <div className="carousel__controls">
        <button className="carousel__btn" type="button" onClick={prev} aria-label="Previous project">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="carousel__dots" role="tablist" aria-label="Project slides">
          {projects.map((project, i) => (
            <button
              key={project.slug}
              className={`carousel__dot ${i === activeIndex ? 'carousel__dot--active' : ''}`}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Go to project ${i + 1}: ${project.title}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        <button className="carousel__btn" type="button" onClick={next} aria-label="Next project">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
