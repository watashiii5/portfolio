'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { Project } from '@/lib/projects';
import { ProjectVisual } from '@/components/project-visual';

type ProjectCarouselProps = {
  projects: Project[];
};

const AUTO_ADVANCE_MS = 3000;
const TRANSITION_MS = 600;

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dragRef = useRef({ startX: 0, currentX: 0, dragging: false, startTime: 0 });

  const n = projects.length;

  const getCardStep = useCallback(() => {
    const track = trackRef.current;
    if (!track || track.children.length < 2) return 400;
    const first = track.children[0] as HTMLElement;
    const second = track.children[1] as HTMLElement;
    return second.offsetLeft - first.offsetLeft;
  }, []);

  const moveTo = useCallback((index: number, smooth: boolean) => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;
    const step = getCardStep();
    const centerOffset = (container.offsetWidth - step) / 2;

    if (smooth) {
      track.style.transition = `transform ${TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`;
    } else {
      track.style.transition = 'none';
    }

    track.style.transform = `translateX(${-index * step + centerOffset}px)`;
    setActiveIndex(index);
  }, [getCardStep]);

  const goTo = useCallback((index: number, smooth = true) => {
    moveTo(index, smooth);
  }, [moveTo]);

  const next = useCallback(() => {
    const nextIdx = activeIndex + 1;
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;
    const step = getCardStep();
    const centerOffset = (container.offsetWidth - step) / 2;

    if (nextIdx >= n * 3) {
      track.style.transition = 'none';
      track.style.transform = `translateX(${-(n - 1) * step + centerOffset}px)`;
      track.getBoundingClientRect();
      track.style.transition = `transform ${TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`;
      track.style.transform = `translateX(${-n * step + centerOffset}px)`;
      setActiveIndex(n);
    } else {
      moveTo(nextIdx, true);
    }
  }, [activeIndex, getCardStep, n, moveTo]);

  const prev = useCallback(() => {
    const prevIdx = activeIndex - 1;
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;
    const step = getCardStep();
    const centerOffset = (container.offsetWidth - step) / 2;

    if (prevIdx < 0) {
      track.style.transition = 'none';
      track.style.transform = `translateX(${-n * step + centerOffset}px)`;
      track.getBoundingClientRect();
      track.style.transition = `transform ${TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`;
      track.style.transform = `translateX(${-(n - 1) * step + centerOffset}px)`;
      setActiveIndex(n - 1);
    } else {
      moveTo(prevIdx, true);
    }
  }, [activeIndex, getCardStep, n, moveTo]);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      next();
    }, AUTO_ADVANCE_MS);
  }, [next]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0) return;
    const track = trackRef.current;
    if (!track) return;
    track.style.transition = 'none';
    dragRef.current = {
      startX: e.clientX,
      currentX: e.clientX,
      dragging: true,
      startTime: Date.now(),
    };
    stopTimer();
  }, [stopTimer]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d.dragging) return;
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;
    const step = getCardStep();
    const centerOffset = (container.offsetWidth - step) / 2;
    const dx = e.clientX - d.startX;
    const base = -activeIndex * step + centerOffset;
    track.style.transform = `translateX(${base + dx}px)`;
    d.currentX = e.clientX;
  }, [activeIndex, getCardStep]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d.dragging) return;
    d.dragging = false;

    const dx = e.clientX - d.startX;
    const elapsed = Date.now() - d.startTime;
    const velocity = Math.abs(dx) / Math.max(elapsed, 1);
    const isFlick = velocity > 0.4 && Math.abs(dx) > 20;

    if (isFlick || Math.abs(dx) > 80) {
      if (dx < 0) next();
      else prev();
    } else {
      goTo(activeIndex, true);
    }

    startTimer();
  }, [activeIndex, goTo, next, prev, startTimer]);

  const handlePointerCancel = useCallback(() => {
    dragRef.current.dragging = false;
    goTo(activeIndex, true);
    startTimer();
  }, [activeIndex, goTo, startTimer]);

  useEffect(() => {
    if (n === 0) return;
    goTo(n, false);
  }, [n, goTo]);

  useEffect(() => {
    startTimer();
    return stopTimer;
  }, [startTimer, stopTimer]);

  const cardCenterIndex = ((activeIndex % n) + n) % n;

  if (n === 0) return null;

  const tripled = [...projects, ...projects, ...projects];

  return (
    <div className="carousel" ref={containerRef}>
      <div className="carousel__fade" aria-hidden="true" />
      <div
        className="carousel__track"
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        style={{ touchAction: 'pan-y', userSelect: 'none' }}
      >
        {tripled.map((project, i) => {
          const dist = Math.abs(i - activeIndex);
          const scale = Math.max(0.82, 1 - dist * 0.06);
          const opacity = Math.max(0.5, 1 - dist * 0.1);
          return (
            <Link
              className="carousel__card"
              href={`/projects/${project.slug}`}
              key={`${project.slug}-${i}`}
              style={{ transform: `scale(${scale})`, opacity }}
            >
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
          );
        })}
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
              className={`carousel__dot ${i === cardCenterIndex ? 'carousel__dot--active' : ''}`}
              type="button"
              role="tab"
              aria-selected={i === cardCenterIndex}
              aria-label={`Go to project ${i + 1}: ${project.title}`}
              onClick={() => goTo(i + n)}
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
