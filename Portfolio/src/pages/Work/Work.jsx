import { useMemo, useState } from 'react'
import { projects, projectCategories } from '@/data/projects'
import ProjectListItem from '@/components/projects/ProjectListItem'
import ShrinkHeading from '@/components/typography/ShrinkHeading'
import RevealText from '@/components/typography/RevealText'

const HEADLINE = ['SELECTED', 'WORK.']
const SUBTEXT = [
  'Seven shipped products — full stack, AI, frontend and experimental —',
  'each built to prove a specific engineering or design idea.',
]

export default function Work() {
  const [filter, setFilter] = useState('ALL')
  const [hovered, setHovered] = useState(null)

  const filtered = useMemo(
    () => (filter === 'ALL' ? projects : projects.filter((p) => p.category.includes(filter))),
    [filter],
  )

  return (
    <div className="px-6 pb-32 pt-32 md:px-10 md:pt-40">
      <div className="mx-auto max-w-[1600px]">
        <ShrinkHeading lines={HEADLINE} size="section" endScale={0.8} end="+=50%" />

        <RevealText as="p" lines={SUBTEXT} className="mt-8 max-w-2xl font-body text-lg text-muted" />

        <div className="mt-14 flex flex-wrap gap-3">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              data-cursor="click"
              onClick={() => setFilter(cat)}
              className={`rounded-full border px-5 py-2 font-display text-xs uppercase tracking-[0.12em] transition-colors ${
                filter === cat ? 'border-accent bg-accent/15 text-text' : 'border-line text-muted hover:text-text'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-10">
          {filtered.map((project) => (
            <ProjectListItem
              key={project.slug}
              project={project}
              dimmed={hovered && hovered !== project.slug}
              onHover={() => setHovered(project.slug)}
              onLeave={() => setHovered(null)}
            />
          ))}
          <div className="border-t border-line" />
        </div>
      </div>
    </div>
  )
}
