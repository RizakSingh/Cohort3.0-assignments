import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function Ring({ radius, tilt, speed, color, opacity, thickness = 0.012 }) {
  const ref = useRef(null)

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.z += delta * speed
  })

  return (
    <group rotation={[tilt.x, tilt.y, 0]}>
      <mesh ref={ref}>
        <torusGeometry args={[radius, thickness, 8, 96]} />
        <meshBasicMaterial color={color} transparent opacity={opacity} toneMapped={false} />
      </mesh>
    </group>
  )
}

function OrbitDot({ radius, tilt, speed, offset, color }) {
  const ref = useRef(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime * speed + offset
    ref.current.position.set(Math.cos(t) * radius, Math.sin(t) * radius, 0)
  })

  return (
    <group rotation={[tilt.x, tilt.y, 0]}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </group>
  )
}

/**
 * The orbit system around the avatar plane — thin rings at different tilts
 * plus a few small dots tracing them, in the same wireframe-on-dark
 * language as the full-page 3D background (spec §41: one animation
 * language across the site), just scaled down to frame a single object.
 */
export default function OrbitRings({ accent = '#6e56cf' }) {
  const rings = useMemo(
    () => [
      { radius: 1.75, tilt: { x: 1.3, y: 0.15 }, speed: 0.12, color: accent, opacity: 0.55 },
      { radius: 2.05, tilt: { x: 1.45, y: -0.25 }, speed: -0.08, color: '#f4f4f4', opacity: 0.16 },
      { radius: 2.3, tilt: { x: 1.15, y: 0.4 }, speed: 0.06, color: accent, opacity: 0.22 },
    ],
    [accent],
  )

  const dots = useMemo(
    () => [
      { radius: 1.75, tilt: rings[0].tilt, speed: 0.5, offset: 0, color: accent },
      { radius: 1.75, tilt: rings[0].tilt, speed: 0.5, offset: Math.PI, color: '#f4f4f4' },
      { radius: 2.3, tilt: rings[2].tilt, speed: -0.32, offset: Math.PI / 2, color: '#f4f4f4' },
    ],
    [rings, accent],
  )

  return (
    <group>
      {rings.map((r, i) => (
        <Ring key={i} {...r} />
      ))}
      {dots.map((d, i) => (
        <OrbitDot key={i} {...d} />
      ))}
    </group>
  )
}
