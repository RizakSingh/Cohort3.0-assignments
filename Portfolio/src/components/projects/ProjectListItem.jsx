import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

export default function ProjectListItem({ project, dimmed, onHover, onLeave }) {
  return (
    <Link
      to={`/work/${project.slug}`}
      data-cursor="project"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="group grid grid-cols-1 items-center gap-4 border-t border-line py-8 transition-opacity duration-500 md:grid-cols-[3rem_1fr_auto_auto] md:gap-8"
      style={{ opacity: dimmed ? 0.3 : 1 }}
    >
      <span className="font-display text-sm text-muted">{project.index}</span>

      <div>
        <h3 className="font-display text-2xl font-semibold uppercase tracking-tight text-text md:text-4xl">
          {project.title} <span className="text-muted">— {project.shortTitle}</span>
        </h3>
        <p className="mt-1 font-body text-sm text-muted">{project.tagline}</p>
      </div>

      <span className="hidden font-display text-xs uppercase tracking-[0.14em] text-muted md:block">
        {project.category.join(' • ')}
      </span>

      <span className="hidden font-display text-xs uppercase tracking-[0.14em] text-muted md:block">
        {project.year}
      </span>

      <ArrowUpRight
        size={20}
        className="text-text transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 md:hidden"
      />
    </Link>
  )
}
