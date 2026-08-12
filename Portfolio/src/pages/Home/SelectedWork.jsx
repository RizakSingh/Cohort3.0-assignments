import { getFeaturedProjects } from '@/data/projects'
import ProjectCarousel from '@/components/projects/ProjectCarousel'
import SectionLabel from '@/components/sections/SectionLabel'
import ArrowLink from '@/components/buttons/ArrowLink'

export default function SelectedWork() {
  const projects = getFeaturedProjects()

  return (
    <section id="selected-work" className="relative border-t border-line px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between">
        <SectionLabel index="02" title="Selected Work" />
        <ArrowLink to="/work" cursor="view" className="hidden md:inline-flex">
          View All
        </ArrowLink>
      </div>

      <p className="mx-auto mt-6 max-w-[1600px] font-body text-sm text-muted">
        Drag to spin the shelf, or use the arrows — click any project to open its case study.
      </p>

      <div className="mx-auto mt-16 max-w-[1600px]">
        <ProjectCarousel projects={projects} />
      </div>
    </section>
  )
}
