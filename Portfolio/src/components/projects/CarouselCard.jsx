import { ArrowUpRight } from 'lucide-react'
import ProjectVisual from './ProjectVisual'

/**
 * Purely visual/content — positioning in 3D space (rotateY/translateZ) is
 * owned entirely by the wrapper divs in ProjectCarousel; this just renders
 * at the width it's given.
 */
export default function CarouselCard({ project, width, onClick }) {
  return (
    <div className="select-none" style={{ width }}>
      <button type="button" onClick={onClick} data-cursor="project" className="group block w-full text-left" tabIndex={-1}>
        <ProjectVisual project={project} className="pointer-events-none transition-transform duration-500 group-hover:scale-[1.02]" />

        <div className="mt-5 flex items-start justify-between gap-3">
          <div>
            <span className="font-display text-xs text-accent">{project.index}</span>
            <h3 className="mt-1 font-display text-lg font-semibold uppercase tracking-tight text-text sm:text-xl">
              {project.title}
            </h3>
            <p className="mt-1 font-display text-[11px] uppercase tracking-[0.12em] text-muted">
              {project.category.join(' • ')}
            </p>
          </div>
          <ArrowUpRight
            size={18}
            className="mt-1 shrink-0 text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent"
          />
        </div>
      </button>
    </div>
  )
}
