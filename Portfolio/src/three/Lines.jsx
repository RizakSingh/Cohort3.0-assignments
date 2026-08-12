import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'

function makeCurvePoints(seed, radius) {
  const points = []
  const segments = 4 + (seed % 3)
  for (let i = 0; i <= segments; i++) {
    const t = i / segments
    const angle = t * Math.PI * 2 + seed
    const r = radius * (0.5 + 0.5 * Math.sin(seed * 3 + t * 4))
    points.push(
      new THREE.Vector3(
        Math.cos(angle + seed) * r,
        (Math.sin(seed * 5 + t * 6) * radius) / 2,
        Math.sin(angle - seed) * r - 4,
      ),
    )
  }
  const curve = new THREE.CatmullRomCurve3(points, true, 'catmullrom', 0.4)
  return curve.getPoints(48)
}

function WireLine({ seed, radius, color, opacity }) {
  const ref = useRef(null)
  const points = useMemo(() => makeCurvePoints(seed, radius), [seed, radius])
  const speed = useMemo(() => 0.02 + (seed % 5) * 0.006, [seed])

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * speed
    ref.current.rotation.x += delta * speed * 0.3
  })

  return (
    <group ref={ref}>
      <Line points={points} color={color} lineWidth={0.7} transparent opacity={opacity} />
    </group>
  )
}

export default function Lines({ count = 16, accent = '#6e56cf' }) {
  const lines = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        seed: i * 1.37 + 0.5,
        radius: 4 + (i % 5) * 1.6,
        color: i % 4 === 0 ? accent : '#f4f4f4',
        opacity: i % 4 === 0 ? 0.22 : 0.09,
      })),
    [count, accent],
  )

  return (
    <group>
      {lines.map((l, i) => (
        <WireLine key={i} {...l} />
      ))}
    </group>
  )
}
