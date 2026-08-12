import { useFrame, useThree } from '@react-three/fiber'

/**
 * Lerps the camera toward the mouse position every frame — small amplitudes
 * only, per spec §9 ("never make the website feel like it is moving
 * uncontrollably"). `mouse` is a ref of {x, y} in -1..1, updated outside R3F.
 */
export default function CameraRig({ mouse, scrollProgress }) {
  const { camera } = useThree()

  useFrame(() => {
    const mx = mouse?.current?.x ?? 0
    const my = mouse?.current?.y ?? 0
    const scroll = scrollProgress?.current ?? 0

    const targetX = mx * 0.6
    const targetY = my * 0.35 + scroll * -1.2
    const targetZ = 8.5 + scroll * 1.5

    camera.position.x += (targetX - camera.position.x) * 0.035
    camera.position.y += (targetY - camera.position.y) * 0.035
    camera.position.z += (targetZ - camera.position.z) * 0.035

    camera.rotation.z += (mx * -0.02 - camera.rotation.z) * 0.03
    camera.lookAt(0, 0, -4)
  })

  return null
}
