/**
 * Positions are polar (angle in degrees, radius 0-1) around the center label —
 * <Capabilities/> converts these to x/y so the ecosystem layout stays data-driven.
 */
export const skills = [
  { id: 'react', label: 'React / Next.js', angle: 12, radius: 0.92, description: 'React.js and Next.js for production interfaces — the frontend behind every shipped project here.' },
  { id: 'reactnative', label: 'React Native', angle: 48, radius: 0.62, description: 'Built and maintained a live mobile app frontend end-to-end, serving 10,000+ active users.' },
  { id: 'node', label: 'Node.js / Express', angle: 84, radius: 0.95, description: 'REST APIs, JWT auth and middleware-based access control across every full-stack project.' },
  { id: 'db', label: 'MongoDB / SQL', angle: 120, radius: 0.65, description: 'MongoDB, MySQL and PostgreSQL — schema design for auth, tasks and image-processing pipelines.' },
  { id: 'ai', label: 'AI / Gen AI', angle: 156, radius: 0.92, description: 'LLM API integration, RAG and prompt engineering — wiring real AI APIs into production apps.' },
  { id: 'ts', label: 'TypeScript', angle: 192, radius: 0.6, description: 'Typed JavaScript across frontend and backend for safer refactors at scale.' },
  { id: 'redux', label: 'Redux', angle: 228, radius: 0.9, description: 'State management for complex UIs — cut UI-related defects 25% on a production React codebase.' },
  { id: 'tailwind', label: 'Tailwind CSS', angle: 264, radius: 0.62, description: 'A fast, consistent design system layer across every recent frontend.' },
  { id: 'gsap', label: 'GSAP', angle: 300, radius: 0.95, description: 'Scroll-driven and interaction-driven motion — the animation language of this site.' },
  { id: 'cloud', label: 'AWS / Docker / CI-CD', angle: 336, radius: 0.65, description: 'AWS, Firebase, Vercel, Docker and GitHub Actions — shipping frontend and backend independently.' },
]

export const skillsCenter = { label: 'DIGITAL', sublabel: 'DEVELOPMENT' }
