import { Suspense, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import AvatarPlane from './AvatarPlane'
import OrbitRings from './OrbitRings'

function TiltGroup({ children }) {
  const ref = useRef(null)
  const t = useRef(0)

  useFrame((state, delta) => {
    if (!ref.current) return
    t.current += delta

    const { x, y } = state.pointer // canvas-local, -1..1
    const targetRotY = x * 0.35
    const targetRotX = -y * 0.22
    const bob = Math.sin(t.current * 0.9) * 0.08

    ref.current.rotation.y += (targetRotY - ref.current.rotation.y) * 0.06
    ref.current.rotation.x += (targetRotX - ref.current.rotation.x) * 0.06
    ref.current.position.y += (bob - ref.current.position.y) * 0.08
  })

  return <group ref={ref}>{children}</group>
}

function Rig({ accent, avatarSrc }) {
  const { camera } = useThree()
  camera.position.set(0, 0, 5.5)

  return (
    <TiltGroup>
      <Suspense fallback={null}>
        <AvatarPlane src={avatarSrc} />
      </Suspense>
      <OrbitRings accent={accent} />
    </TiltGroup>
  )
}

export default function AvatarScene({ avatarSrc, accent = '#6e56cf' }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'default' }}
      dpr={[1, 1.5]}
    >
      <Rig accent={accent} avatarSrc={avatarSrc} />
    </Canvas>
  )
}
