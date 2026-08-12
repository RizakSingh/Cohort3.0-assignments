import { useMemo } from 'react'
import { seededRandom } from '@/utils/seededRandom'

/**
 * Data-driven project visual (spec §42: no generic gradient blobs). When a
 * project has a real `image`, it's used directly — otherwise this renders a
 * deterministic "blueprint schematic" seeded from the project slug, so every
 * project without a screenshot still looks distinct and intentional rather
 * than like a placeholder. Swapping in a real screenshot later is just
 * adding an `image` field to data/projects.js.
 */
export default function ProjectVisual({ project, className = '' }) {
  const composition = useMemo(() => {
    if (project.image) return null
    const rand = seededRandom(project.slug)
    const jitter = (range) => (rand() - 0.5) * range

    return {
      gridGap: 36 + rand() * 16,
      panelX: 40 + jitter(16),
      panelY: 36 + jitter(10),
      panelW: 200 + rand() * 60,
      panelH: 130 + rand() * 40,
      dotX: 360 + jitter(20),
      dotY: 220 + jitter(20),
      cards: Array.from({ length: 3 }, (_, i) => ({
        x: 280 + i * 18 + jitter(10),
        y: 70 + i * 34 + jitter(8),
        w: 90 + rand() * 30,
        h: 16,
      })),
    }
  }, [project])

  return (
    <div className={`relative aspect-[16/10] w-full overflow-hidden bg-surface ${className}`}>
      {project.image ? (
        <img
          src={project.image}
          alt={`${project.title} — ${project.shortTitle}`}
          loading="lazy"
          className="h-full w-full object-contain"
        />
      ) : (
        <svg viewBox="0 0 480 300" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
          <rect width="480" height="300" fill="#101010" />

          {Array.from({ length: Math.ceil(480 / composition.gridGap) }, (_, i) => (
            <line
              key={`v${i}`}
              x1={i * composition.gridGap}
              y1={0}
              x2={i * composition.gridGap}
              y2={300}
              stroke="#f4f4f4"
              strokeOpacity={0.05}
            />
          ))}
          {Array.from({ length: Math.ceil(300 / composition.gridGap) }, (_, i) => (
            <line
              key={`h${i}`}
              x1={0}
              y1={i * composition.gridGap}
              x2={480}
              y2={i * composition.gridGap}
              stroke="#f4f4f4"
              strokeOpacity={0.05}
            />
          ))}

          <rect
            x={composition.panelX}
            y={composition.panelY}
            width={composition.panelW}
            height={composition.panelH}
            fill="none"
            stroke={project.accent}
            strokeOpacity={0.55}
            strokeWidth={1}
            rx={2}
          />
          <line
            x1={composition.panelX}
            y1={composition.panelY + 26}
            x2={composition.panelX + composition.panelW}
            y2={composition.panelY + 26}
            stroke={project.accent}
            strokeOpacity={0.3}
          />

          {composition.cards.map((c, i) => (
            <rect key={i} x={c.x} y={c.y} width={c.w} height={c.h} rx={2} fill="#f4f4f4" opacity={0.06 + i * 0.03} />
          ))}

          <circle cx={composition.dotX} cy={composition.dotY} r={26} fill="none" stroke={project.accent} strokeOpacity={0.4} />
          <circle cx={composition.dotX} cy={composition.dotY} r={2.5} fill={project.accent} />

          <text
            x="24"
            y="278"
            fill="#f4f4f4"
            opacity={0.14}
            fontSize="64"
            fontFamily="Space Grotesk, sans-serif"
            fontWeight={600}
          >
            {project.index}
          </text>
        </svg>
      )}

      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
    </div>
  )
}
