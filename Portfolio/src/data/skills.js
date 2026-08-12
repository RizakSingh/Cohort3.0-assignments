/**
 * Positions are polar (angle in degrees, radius 0-1) around the center label —
 * <Capabilities/> converts these to x/y so the ecosystem layout stays data-driven.
 */
export const skills = [
  { id: 'react', label: 'React', angle: 20, radius: 0.9, description: 'Building scalable interfaces and interactive experiences with component-driven architecture.' },
  { id: 'js', label: 'JavaScript', angle: 65, radius: 0.65, description: 'The language underneath every project here — from vanilla DOM work to modern React.' },
  { id: 'node', label: 'Node.js', angle: 100, radius: 0.95, description: 'Express APIs, authentication, and server-side orchestration of third-party services.' },
  { id: 'mongo', label: 'MongoDB', angle: 140, radius: 0.7, description: 'Schema design with Mongoose across auth, tasks and image-processing pipelines.' },
  { id: 'ai', label: 'AI Integration', angle: 175, radius: 0.9, description: 'Wiring real AI APIs into production apps — auth, rate limits and async jobs included.' },
  { id: 'tailwind', label: 'Tailwind CSS', angle: 215, radius: 0.6, description: 'A fast, consistent design system layer across every recent frontend.' },
  { id: 'gsap', label: 'GSAP', angle: 250, radius: 0.95, description: 'Scroll-driven and interaction-driven motion — the animation language of this site.' },
  { id: 'threejs', label: 'Three.js / WebGL', angle: 285, radius: 0.7, description: 'Real-time 3D in the browser — the line environment behind this page is one.' },
  { id: 'express', label: 'Express', angle: 320, radius: 0.9, description: 'REST APIs with JWT auth, role guards and middleware-based access control.' },
  { id: 'cloud', label: 'Cloud & Deploy', angle: 355, radius: 0.65, description: 'Vercel, Render and MongoDB Atlas — shipping frontend and backend independently.' },
]

export const skillsCenter = { label: 'DIGITAL', sublabel: 'DEVELOPMENT' }
