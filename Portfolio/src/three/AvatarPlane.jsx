import { useRef } from 'react'
import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

/**
 * The avatar itself, rendered as a circular textured plane inside the R3F
 * scene (a real 3D object, not an HTML overlay) so it can sit inside the
 * same space as the orbit rings and tilt/bob with them.
 */
export default function AvatarPlane({ src, radius = 1.4 }) {
  const texture = useTexture(src)
  const ref = useRef(null)

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.z += delta * 0.02
  })

  return (
    <group ref={ref}>
      <mesh>
        <circleGeometry args={[radius, 64]} />
        <meshBasicMaterial map={texture} transparent toneMapped={false} />
      </mesh>
    </group>
  )
}
