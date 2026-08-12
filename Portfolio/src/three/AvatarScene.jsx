import { Suspense, useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'
import AvatarPlane from './AvatarPlane'
import OrbitRings from './OrbitRings'

const AVATAR_SIZE = 5.5
const RING_SCALE = AVATAR_SIZE / 2
const OUTER_RING_RADIUS = 2.08 * RING_SCALE
const FOV = 40
// Back the camera off just far enough that the outermost ring clears the
// frame with margin, however large the avatar/ring system is scaled to —
// keeps the two in lockstep instead of hand-tuning a fixed distance.
const CAMERA_DISTANCE = (OUTER_RING_RADIUS * 1.18) / Math.tan((FOV / 2) * (Math.PI / 180))
const BOB_AMPLITUDE = AVATAR_SIZE * 0.05

function TiltGroup({ children }) {
  const ref = useRef(null)
  const t = useRef(0)

  // Entrance: pop in with an elastic overshoot rather than just fading in —
  // sets the "bouncy" tone the continuous idle motion below keeps going.
  useEffect(() => {
    if (!ref.current) return
    gsap.fromTo(ref.current.scale, { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1, duration: 1.1, ease: 'elastic.out(1, 0.55)' })
  }, [])

  useFrame((state, delta) => {
    if (!ref.current) return
    t.current += delta

    const { x, y } = state.pointer // canvas-local, -1..1
    const targetRotY = x * 0.35
    const targetRotX = -y * 0.22

    // A cartoon-bounce bob: sine drives the up/down travel, a synced
    // squash-and-stretch on scale sells the "bouncy" feel rather than a
    // flat, mechanical float.
    const phase = t.current * 1.1
    const bob = Math.sin(phase) * BOB_AMPLITUDE
    const squash = Math.cos(phase)

    ref.current.rotation.y += (targetRotY - ref.current.rotation.y) * 0.06
    ref.current.rotation.x += (targetRotX - ref.current.rotation.x) * 0.06
    ref.current.position.y += (bob - ref.current.position.y) * 0.12
    ref.current.scale.x = 1 - squash * 0.035
    ref.current.scale.y = 1 + squash * 0.045
  })

  return <group ref={ref}>{children}</group>
}

function Rig({ accent, avatarSrc }) {
  const { camera } = useThree()
  camera.position.set(0, 0, CAMERA_DISTANCE)

  return (
    <TiltGroup>
      <Suspense fallback={null}>
        <AvatarPlane src={avatarSrc} size={AVATAR_SIZE} />
      </Suspense>
      <OrbitRings accent={accent} scale={RING_SCALE} />
    </TiltGroup>
  )
}

export default function AvatarScene({ avatarSrc, accent = '#6e56cf' }) {
  return (
    <Canvas
      camera={{ position: [0, 0, CAMERA_DISTANCE], fov: FOV }}
      gl={{ antialias: true, alpha: true, powerPreference: 'default' }}
      dpr={[1, 1.5]}
    >
      <Rig accent={accent} avatarSrc={avatarSrc} />
    </Canvas>
  )
}
