import { useMemo, useRef } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, GitFork } from 'lucide-react'
import { getAdjacentProject, getProjectBySlug } from '@/data/projects'
import { useGsap } from '@/hooks/useGsap'
import { staggerReveal } from '@/animations/scroll'
import ShrinkHeading from '@/components/typography/ShrinkHeading'
import RevealText from '@/components/typography/RevealText'
import ProjectVisual from '@/components/projects/ProjectVisual'
import ArchitectureDiagram from '@/components/projects/ArchitectureDiagram'
import SectionLabel from '@/components/sections/SectionLabel'

function Field({ label, children }) {
  return (
    <div>
      <SectionLabel title={label} className="mb-4" />
      <div className="max-w-2xl font-body text-base text-muted md:text-lg">{children}</div>
    </div>
  )
}

export default function Project() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)
  const featuresRef = useRef(null)
  const resultsRef = useRef(null)
  const techRef = useRef(null)

  const scope = useGsap(() => {
    if (!project) return
    staggerReveal(featuresRef.current?.children, { trigger: featuresRef.current })
    staggerReveal(resultsRef.current?.children, { trigger: resultsRef.current })
    staggerReveal(techRef.current?.children, { trigger: techRef.current, y: 12, stagger: 0.04 })
  }, [slug])

  const headline = useMemo(
    () => (project ? [project.title.toUpperCase(), project.shortTitle.toUpperCase()] : []),
    [project],
  )

  if (!project) return <Navigate to="/work" replace />

  const next = getAdjacentProject(slug)

  return (
    <div ref={scope} className="px-6 pb-32 pt-32 md:px-10 md:pt-40">
      <div className="mx-auto max-w-[1600px]">
        <Link to="/work" data-cursor="click" className="mb-10 inline-flex items-center gap-2 font-display text-xs uppercase tracking-[0.14em] text-muted hover:text-text">
          <ArrowLeft size={14} /> All Work
        </Link>

        <div className="flex flex-wrap items-center gap-4">
          <span className="font-display text-sm text-accent">{project.index}</span>
          <span className="font-display text-xs uppercase tracking-[0.14em] text-muted">
            {project.category.join(' • ')} — {project.year}
          </span>
        </div>

        <div className="mt-4">
          <ShrinkHeading
            lines={headline}
            size="hero"
            endScale={0.75}
            end="+=60%"
          />
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-6">
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noreferrer" data-cursor="view" className="flex items-center gap-2 rounded-full border border-line px-6 py-3 font-display text-xs uppercase tracking-[0.12em] text-text transition-colors hover:border-accent">
              Live Demo <ArrowUpRight size={14} />
            </a>
          )}
          <a href={project.githubUrl} target="_blank" rel="noreferrer" data-cursor="view" className="flex items-center gap-2 rounded-full border border-line px-6 py-3 font-display text-xs uppercase tracking-[0.12em] text-text transition-colors hover:border-accent">
            <GitFork size={14} /> Source
          </a>
        </div>

        <div className="mt-20">
          <ProjectVisual project={project} className="rounded-sm" />
        </div>

        <div className="mt-24 grid gap-16 md:grid-cols-2">
          <Field label="Overview">{project.overview}</Field>
          <Field label="Problem">{project.problem}</Field>
        </div>

        <div className="mt-16 max-w-2xl">
          <Field label="Solution">{project.solution}</Field>
        </div>

        <div className="mt-24">
          <SectionLabel title="Features" className="mb-8" />
          <ul ref={featuresRef} className="grid gap-x-10 gap-y-4 md:grid-cols-2">
            {project.features.map((f, i) => (
              <li key={i} className="flex items-baseline gap-4 border-t border-line pt-4 font-body text-base text-text">
                <span className="font-display text-xs text-muted">{String(i + 1).padStart(2, '0')}</span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-24">
          <SectionLabel title="Technology" className="mb-8" />
          <div ref={techRef} className="flex flex-wrap gap-3">
            {project.tech.map((t) => (
              <span key={t} className="rounded-full border border-line px-4 py-2 font-display text-xs uppercase tracking-[0.1em] text-muted">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-24">
          <SectionLabel title="Architecture" className="mb-8" />
          <div className="rounded-sm border border-line bg-surface/50 p-6 md:p-10">
            <ArchitectureDiagram architecture={project.architecture} accent={project.accent} />
          </div>
        </div>

        {project.challenges && (
          <div className="mt-24 max-w-2xl">
            <Field label="Challenges">{project.challenges}</Field>
          </div>
        )}

        <div className="mt-24">
          <SectionLabel title="Results" className="mb-8" />
          <ul ref={resultsRef} className="flex flex-col gap-4">
            {project.results.map((r, i) => (
              <li key={i} className="border-t border-line pt-4 font-body text-base text-text md:text-lg">
                {r}
              </li>
            ))}
          </ul>
        </div>

        <Link
          to={`/work/${next.slug}`}
          data-cursor="project"
          className="group mt-32 flex flex-col gap-6 border-t border-line pt-14"
        >
          <SectionLabel title="Next Project" />
          <div className="flex items-end justify-between">
            <RevealText
              as="h3"
              lines={[next.title.toUpperCase()]}
              className="font-display text-[clamp(2.4rem,8vw,6rem)] font-semibold uppercase leading-none tracking-tight text-text transition-colors group-hover:text-accent"
            />
            <span className="inline-flex items-center gap-2 font-display text-sm font-medium uppercase tracking-[0.1em] text-text">
              View
              <ArrowUpRight size={16} className="transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
          </div>
        </Link>
      </div>
    </div>
  )
}
