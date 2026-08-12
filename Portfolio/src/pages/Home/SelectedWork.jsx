import { getFeaturedProjects } from '@/data/projects'
import ProjectShowcase from '@/components/projects/ProjectShowcase'
import SectionLabel from '@/components/sections/SectionLabel'
import ArrowLink from '@/components/buttons/ArrowLink'

export default function SelectedWork() {
  const projects = getFeaturedProjects()

  return (
    <section className="relative">
      <div className="flex items-center justify-between border-t border-line px-6 pt-28 md:px-10">
        <SectionLabel index="02" title="Selected Work" />
        <ArrowLink to="/work" cursor="view" className="hidden md:inline-flex">
          View All
        </ArrowLink>
      </div>

      {projects.map((project) => (
        <ProjectShowcase key={project.slug} project={project} />
      ))}
    </section>
  )
}
