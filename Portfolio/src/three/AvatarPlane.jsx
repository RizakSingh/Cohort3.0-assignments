import { useRef } from 'react'
import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

/**
 * The avatar itself, rendered as a textured plane inside the R3F scene (a
 * real 3D object, not an HTML overlay) so it can sit inside the same space
 * as the orbit rings and tilt/bob with them. Shown at its native square
 * framing — the source art's own circular border and glow stay intact
 * rather than being re-cropped, which reads richer than a clipped version.
 */
export default function AvatarPlane({ src, size = 5.5 }) {
  const texture = useTexture(src)
  const ref = useRef(null)

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.z += delta * 0.02
  })

  return (
    <group ref={ref}>
      <mesh>
        <planeGeometry args={[size, size]} />
        <meshBasicMaterial map={texture} transparent toneMapped={false} />
      </mesh>
    </group>
  )
}
