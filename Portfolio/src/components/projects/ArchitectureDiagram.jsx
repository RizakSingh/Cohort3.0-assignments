import { useMemo, useRef } from 'react'
import gsap from 'gsap'
import { useGsap } from '@/hooks/useGsap'

const COL_W = 176
const ROW_H = 104
const PAD = 70
const NODE_W = 148
const NODE_H = 60

/**
 * Self-drawing architecture schematic (spec §21) — data-driven from a
 * project's `{nodes, edges}` grid coordinates so the same component renders
 * every project's stack without a hand-built diagram per case study.
 */
export default function ArchitectureDiagram({ architecture, accent = '#6e56cf', animated = true }) {
  const { nodes, edges } = architecture
  const svgRef = useRef(null)

  const layout = useMemo(() => {
    const maxCol = Math.max(...nodes.map((n) => n.col))
    const maxRow = Math.max(...nodes.map((n) => n.row))
    const width = (maxCol + 1) * COL_W + PAD * 2
    const height = (maxRow + 1) * ROW_H + PAD * 2

    const byId = {}
    nodes.forEach((n) => {
      byId[n.id] = {
        ...n,
        x: PAD + n.col * COL_W + COL_W / 2,
        y: PAD + n.row * ROW_H + ROW_H / 2,
      }
    })

    const resolvedEdges = edges.map((e) => ({
      ...e,
      from: byId[e.from],
      to: byId[e.to],
    }))

    return { width, height, positioned: Object.values(byId), edges: resolvedEdges }
  }, [nodes, edges])

  useGsap(() => {
    const nodeEls = svgRef.current.querySelectorAll('[data-node]')
    const edgeEls = svgRef.current.querySelectorAll('[data-edge]')

    edgeEls.forEach((path) => {
      const len = path.getTotalLength()
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
    })
    gsap.set(nodeEls, { opacity: 0, scale: 0.85, transformOrigin: 'center' })

    const tl = gsap.timeline({
      scrollTrigger: { trigger: svgRef.current, start: 'top 75%', once: true },
    })

    tl.to(edgeEls, { strokeDashoffset: 0, duration: 0.9, stagger: 0.18, ease: 'power2.inOut' })
    tl.to(nodeEls, { opacity: 1, scale: 1, duration: 0.6, stagger: 0.15, ease: 'back.out(1.6)' }, 0.1)

    if (animated) {
      edgeEls.forEach((path) => {
        const len = path.getTotalLength()
        gsap.fromTo(
          path,
          { strokeDashoffset: len * 0.35 },
          {
            strokeDashoffset: -len * 0.65,
            duration: 2.4,
            ease: 'none',
            repeat: -1,
            delay: 1.6,
          },
        )
      })
    }
  }, [architecture, animated])

  return (
    <div className="w-full overflow-x-auto">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${layout.width} ${layout.height}`}
        width={layout.width}
        height={layout.height}
        className="mx-auto"
      >
        {layout.edges.map((e, i) => (
          <line
            key={i}
            data-edge
            x1={e.from.x}
            y1={e.from.y}
            x2={e.to.x}
            y2={e.to.y}
            stroke={accent}
            strokeOpacity={0.5}
            strokeWidth={1.5}
          />
        ))}

        {layout.positioned.map((n) => (
          <g key={n.id} data-node>
            <rect
              x={n.x - NODE_W / 2}
              y={n.y - NODE_H / 2}
              width={NODE_W}
              height={NODE_H}
              rx={4}
              fill="#101010"
              stroke="#1c1c1c"
            />
            <text x={n.x} y={n.y - 4} textAnchor="middle" fill="#f4f4f4" fontSize="13" fontFamily="Space Grotesk, sans-serif" fontWeight={600}>
              {n.label}
            </text>
            {n.sub && (
              <text x={n.x} y={n.y + 16} textAnchor="middle" fill="#777777" fontSize="10" fontFamily="Manrope, sans-serif">
                {n.sub}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  )
}
