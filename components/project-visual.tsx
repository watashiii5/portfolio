import type { Project } from '@/lib/projects';

type ProjectVisualProps = {
  project: Project;
  variant?: 'hero' | 'card';
};

export function ProjectVisual({ project, variant = 'card' }: ProjectVisualProps) {
  if (project.visual.kind === 'image' && project.visual.src) {
    return <img className={`project-visual project-visual--${variant}`} src={project.visual.src} alt={project.visual.alt || project.title} loading="lazy" decoding="async" />;
  }

  return (
    <div className={`project-visual project-visual--placeholder project-visual--${variant}`} style={{ ['--visual-accent' as never]: project.accent } as React.CSSProperties}>
      <div className="project-visual__badge">{project.visual.label || project.category}</div>
      <div className="project-visual__title">{project.title}</div>
      <div className="project-visual__sub">{project.tech.slice(0, 3).join(' • ')}</div>
    </div>
  );
}