import { useState } from 'react'
import { skills, skillsCenter } from '@/data/skills'
import SectionLabel from '@/components/sections/SectionLabel'

function toPosition(angle, radius) {
  const rad = (angle * Math.PI) / 180
  const x = 50 + Math.cos(rad) * radius * 42
  const y = 50 + Math.sin(rad) * radius * 42
  return { left: `${x}%`, top: `${y}%` }
}

export default function Capabilities() {
  const [active, setActive] = useState(null)
  const activeSkill = skills.find((s) => s.id === active)

  return (
    <section className="relative border-t border-line px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-16">
        <SectionLabel index="03" title="Capabilities" />

        <div className="relative mx-auto aspect-square w-full max-w-3xl">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {skills.map((skill) => {
              const pos = toPosition(skill.angle, skill.radius)
              const x = parseFloat(pos.left)
              const y = parseFloat(pos.top)
              const isActive = active === skill.id
              return (
                <line
                  key={skill.id}
                  x1="50"
                  y1="50"
                  x2={x}
                  y2={y}
                  stroke={isActive ? '#6e56cf' : '#f4f4f4'}
                  strokeOpacity={isActive ? 0.6 : 0.08}
                  strokeWidth={0.3}
                />
              )
            })}
          </svg>

          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
            <span className="font-display text-lg font-semibold uppercase tracking-tight text-text md:text-2xl">
              {activeSkill ? activeSkill.label : skillsCenter.label}
            </span>
            <span className="mt-1 max-w-[14rem] font-body text-xs text-muted md:text-sm">
              {activeSkill ? activeSkill.description : skillsCenter.sublabel}
            </span>
          </div>

          {skills.map((skill, i) => (
            <button
              type="button"
              key={skill.id}
              data-cursor="click"
              onMouseEnter={() => setActive(skill.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(skill.id)}
              onBlur={() => setActive(null)}
              style={{ ...toPosition(skill.angle, skill.radius), animationDelay: `${i * 0.4}s` }}
              className={`animate-float absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center whitespace-nowrap rounded-full border px-4 py-2 font-display text-xs uppercase tracking-[0.08em] transition-colors duration-300 ${
                active === skill.id
                  ? 'border-accent bg-accent/15 text-text'
                  : 'border-line bg-bg/60 text-muted hover:text-text'
              }`}
            >
              {skill.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
