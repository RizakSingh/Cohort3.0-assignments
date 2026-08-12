import { Canvas } from '@react-three/fiber'
import Lines from './Lines'
import Particles from './Particles'
import CameraRig from './Camera'

export default function Scene({ mouse, scrollProgress, accent = '#6e56cf', quality = 'high' }) {
  const lineCount = quality === 'high' ? 12 : 8
  const particleCount = quality === 'high' ? 160 : 90

  return (
    <Canvas
      camera={{ position: [0, 0, 8.5], fov: 55, near: 0.1, far: 40 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'default' }}
      dpr={[1, quality === 'high' ? 1.5 : 1]}
      performance={{ min: 0.5 }}
    >
      <color attach="background" args={['#070707']} />
      <fog attach="fog" args={['#070707', 8, 22]} />
      <CameraRig mouse={mouse} scrollProgress={scrollProgress} />
      <Lines count={lineCount} accent={accent} />
      <Particles count={particleCount} />
    </Canvas>
  )
}
