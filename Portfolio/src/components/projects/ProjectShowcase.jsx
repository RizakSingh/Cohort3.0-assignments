import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGsap } from '@/hooks/useGsap'
import { projectEnter } from '@/animations/projects'
import ProjectVisual from './ProjectVisual'
import ArrowLink from '@/components/buttons/ArrowLink'

export default function ProjectShowcase({ project }) {
  const visualRef = useRef(null)
  const indexRef = useRef(null)
  const copyRefs = useRef([])
  copyRefs.current = []

  const addCopyRef = (el) => {
    if (el && !copyRefs.current.includes(el)) copyRefs.current.push(el)
  }

  const scope = useGsap(() => {
    projectEnter({ visual: visualRef.current, copy: copyRefs.current, index: indexRef.current, trigger: scope.current })
  }, [project.slug])

  return (
    <article ref={scope} className="border-t border-line px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-10">
        <div className="flex items-start justify-between gap-6">
          <span ref={indexRef} className="font-display text-sm text-accent">
            {project.index}
          </span>
          <span ref={addCopyRef} className="font-display text-xs uppercase tracking-[0.14em] text-muted">
            {project.category.join(' • ')}
          </span>
        </div>

        <h3 ref={addCopyRef} className="font-display text-[clamp(2.4rem,7vw,5.5rem)] font-semibold uppercase leading-[0.95] tracking-tight text-text">
          {project.title}
        </h3>

        <p ref={addCopyRef} className="max-w-lg font-body text-base text-muted md:text-lg">
          {project.tagline}
        </p>

        <Link to={`/work/${project.slug}`} data-cursor="project" className="group block">
          <div ref={visualRef}>
            <ProjectVisual project={project} className="transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
          </div>
        </Link>

        <div ref={addCopyRef}>
          <ArrowLink to={`/work/${project.slug}`} cursor="project">
            View Case Study
          </ArrowLink>
        </div>
      </div>
    </article>
  )
}
