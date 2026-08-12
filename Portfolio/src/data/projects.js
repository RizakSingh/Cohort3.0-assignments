/**
 * Single source of truth for every case study — Home's "Selected Work",
 * /work, and /work/:slug all read from this file. `image` is optional:
 * when absent, <ProjectVisual/> renders a generative placeholder seeded
 * from `accent`/`slug` instead of a fake screenshot.
 */
export const projects = [
  {
    slug: 'enhanso-ai-image-enhancer',
    index: '01',
    title: 'Enhanso',
    shortTitle: 'AI Image Enhancer',
    year: '2026',
    category: ['FULL STACK', 'AI'],
    tagline: 'AI-powered image enhancement, full stack, in production.',
    summary:
      'A full-stack MERN platform that enhances, upscales, colorizes and unblurs images through a real third-party AI API — with authentication, cloud storage and a user gallery.',
    overview:
      'Enhanso is a full-stack AI image enhancement platform built on the MERN stack. Users register, upload an image, and run it through one of four AI-powered operations backed by the PicWish AI API — the frontend and backend are deployed independently and talk over an authenticated REST API.',
    problem:
      'Most "AI photo enhancer" demos are single-page tricks with no accounts, no persistence and no real backend — they don’t prove the ability to ship a production-shaped full-stack app around a paid third-party API with real constraints (auth, rate limits, cold starts).',
    solution:
      'Built a proper client/server split: a React + Vite frontend calling a secured Express API, JWT-based auth with a forgot/reset password flow, MongoDB Atlas for persistence, Multer for uploads, and server-side orchestration of the PicWish AI API so the API key never reaches the client.',
    features: [
      'Email/password auth with JWT + protected routes',
      'Forgot & reset password flow',
      'Image enhancement, background removal, colorization and unblur',
      'Image upload with live preview',
      'Per-user image gallery',
      'User feedback form',
    ],
    tech: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB Atlas', 'Mongoose', 'JWT', 'Multer', 'PicWish AI API'],
    architecture: {
      nodes: [
        { id: 'client', label: 'React Client', sub: 'Vercel', col: 1, row: 0 },
        { id: 'api', label: 'Express API', sub: 'Render', col: 1, row: 1 },
        { id: 'db', label: 'MongoDB Atlas', sub: 'Mongoose', col: 0, row: 2 },
        { id: 'ai', label: 'PicWish AI API', sub: 'Image processing', col: 2, row: 2 },
      ],
      edges: [
        { from: 'client', to: 'api', label: 'Axios + JWT' },
        { from: 'api', to: 'db', label: 'user & image data' },
        { from: 'api', to: 'ai', label: 'enhance / remove-bg / colorize / unblur' },
      ],
    },
    results: [
      'Cut a multi-step image-editing task down to a single click',
      'JWT auth with user-scoped cloud storage — 0 unauthorized data-access incidents across testing',
      'Async request queuing lowered average response latency by 40% as usage scaled',
      'Independently deployed frontend (Vercel) and backend (Render) talking over a versioned REST API',
    ],
    challenges:
      'The PicWish API is asynchronous and metered on a paid/free-tier key, so the backend has to queue the task, poll for completion and surface a clean loading/error state to the client without leaking provider-specific errors — while keeping cold starts on the free Render tier from breaking the UX.',
    demoUrl: 'https://enhanso-ai-image-enhancer.vercel.app',
    githubUrl: 'https://github.com/RizakSingh/Enhanso-Ai-Image-Enhancer-',
    accent: '#6E56CF',
    image: '/projects/enhanso.png',
    featured: true,
  },
  {
    slug: 'employee-management-system',
    index: '02',
    title: 'EMS',
    shortTitle: 'Employee Management System',
    year: '2026',
    category: ['FULL STACK'],
    tagline: 'Role-based dashboards for admins and employees.',
    summary:
      'A full-stack MERN app with role-based authentication — admins assign and track tasks, employees manage their own workload, all behind JWT-protected routes.',
    overview:
      'Employee Management System is a role-based internal tool: two distinct dashboards (Admin and Employee) sit behind the same authenticated API, with the backend enforcing what each role can see and do rather than trusting the client.',
    problem:
      'Internal tools rarely need public-facing polish — they need correct, enforced permission boundaries between roles, and a workflow (assign → track → complete) that maps to how a real team actually works.',
    solution:
      'Modeled two roles (admin, employee) with JWT claims checked by Express middleware, not just hidden UI. Admins get a centralized panel to create employees and assign tasks; employees get a focused view of their own tasks and stats, all backed by MongoDB via Mongoose.',
    features: [
      'JWT authentication with bcrypt password hashing',
      'Role-based access control (admin / employee) enforced server-side',
      'Admin: create employees, assign tasks, view all tasks',
      'Employee: view and track assigned tasks, personal stats overview',
      'Protected routes on both client and API',
    ],
    tech: ['React', 'Vite', 'Tailwind CSS', 'Context API', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'JWT', 'bcrypt'],
    architecture: {
      nodes: [
        { id: 'client', label: 'React Client', sub: 'Vercel', col: 1, row: 0 },
        { id: 'guard', label: 'JWT + Role Guard', sub: 'Express middleware', col: 1, row: 1 },
        { id: 'api', label: 'Express API', sub: 'Render', col: 1, row: 2 },
        { id: 'db', label: 'MongoDB', sub: 'Mongoose', col: 1, row: 3 },
      ],
      edges: [
        { from: 'client', to: 'guard', label: 'Axios' },
        { from: 'guard', to: 'api', label: 'admin / employee' },
        { from: 'api', to: 'db', label: 'employees & tasks' },
      ],
    },
    results: [
      'Automated task allocation on a custom MongoDB schema, cutting manual assignment time by 50%',
      'JWT-based access control enforced across 3 permission tiers platform-wide',
      'Two functionally distinct dashboards sharing one authenticated API',
      'Deployed frontend + backend, demo credentials available for reviewers',
    ],
    challenges:
      'Keeping the permission model in one place: early on, role checks leaked into individual route handlers. Consolidating them into a single reusable Express middleware kept the admin/employee boundary consistent as new endpoints were added.',
    demoUrl: 'https://employee-management-system-drab-seven.vercel.app/',
    githubUrl: 'https://github.com/RizakSingh/Employee-management-system-',
    accent: '#4F8A8B',
    image: '/projects/employee-management-system.png',
    featured: true,
  },
  {
    slug: 'havn',
    index: '03',
    title: 'Havn',
    shortTitle: 'Everyday Market',
    year: '2026',
    category: ['FRONTEND'],
    tagline: 'A front-end e-commerce experience, built the way a real store ships.',
    summary:
      'A React storefront — catalog, search, filtering, a cart drawer and checkout flow — architected with React Router’s data router and Context, no backend required.',
    overview:
      'Havn is a front-end-only e-commerce app built to prove out real store mechanics: browsing, filtering, cart state and checkout, without leaning on a framework starter kit. Routing, cart and auth state are each owned by dedicated contexts rather than one global blob.',
    problem:
      'It’s easy to fake a product grid; it’s harder to get cart persistence, route-aware layouts and auth-gated checkout to feel coherent without a backend to lean on.',
    solution:
      'Used React Router v7’s data router APIs for layout/route composition, separate Cart and Auth contexts backed by localStorage, and Tailwind v4 for a fast, consistent design system across product, cart and checkout views.',
    features: [
      'Product catalog with search, filter and sort',
      'Cart drawer with persistent state',
      'Multi-step checkout flow',
      'Register / login (client-side auth)',
      'Responsive layout across catalog, product and checkout views',
    ],
    tech: ['React 19', 'React Router v7', 'Context API', 'Tailwind CSS v4', 'Vite'],
    architecture: {
      nodes: [
        { id: 'router', label: 'React Router', sub: 'Data router', col: 1, row: 0 },
        { id: 'context', label: 'Cart / Auth Context', sub: 'App state', col: 1, row: 1 },
        { id: 'store', label: 'LocalStorage', sub: 'Persistence', col: 1, row: 2 },
      ],
      edges: [
        { from: 'router', to: 'context', label: 'route-aware layouts' },
        { from: 'context', to: 'store', label: 'cart & session' },
      ],
    },
    results: [
      '21 source files organized across pages, components, layouts and context',
      'Full catalog → cart → checkout flow with no backend dependency',
    ],
    challenges:
      'Keeping cart state consistent across route transitions (product page, cart drawer, checkout) without prop-drilling meant getting the Context boundaries right early — cart and auth are deliberately separate contexts so a checkout redirect doesn’t entangle unrelated state.',
    demoUrl: 'https://cohort3-0-assignments-3ppj.vercel.app/',
    githubUrl: 'https://github.com/RizakSingh/Cohort3.0-assignments/tree/main/super%20mart',
    accent: '#C97B4A',
    image: '/projects/havn.png',
    featured: true,
  },
  {
    slug: 'nova',
    index: '04',
    title: 'Nova',
    shortTitle: 'Productivity Dashboard',
    year: '2025',
    category: ['FRONTEND'],
    tagline: 'A multi-widget control panel for the day, wired to live data.',
    summary:
      'A vanilla JS productivity dashboard — todos, a day planner, goal tracking, live weather and a quote of the day — pulling from two real external APIs.',
    overview:
      'Nova is a dependency-free productivity dashboard: a grid of focused widgets (todo, planner, goals, weather, quote-of-the-day) that persist to localStorage and pull live data from public APIs, built entirely in vanilla JavaScript.',
    problem:
      'A todo list alone doesn’t demonstrate working with real, unreliable external data — geolocation permissions, API failures and loading states all need handling without a framework’s conveniences.',
    solution:
      'Used the browser Geolocation API paired with Open-Meteo for live weather, ZenQuotes for a daily quote, and hand-rolled state management with localStorage for the todo/planner/goals widgets — including a time-of-day-aware greeting.',
    features: [
      'Todo list, day planner and goals tracker',
      'Live weather via Geolocation + Open-Meteo API',
      'Quote of the day via ZenQuotes API',
      'Dark / light theme toggle',
      'Time-of-day aware greeting',
    ],
    tech: ['JavaScript', 'HTML5', 'CSS3', 'Open-Meteo API', 'ZenQuotes API', 'Geolocation API', 'LocalStorage'],
    architecture: {
      nodes: [
        { id: 'ui', label: 'Widget Grid', sub: 'Vanilla JS', col: 1, row: 0 },
        { id: 'geo', label: 'Geolocation API', sub: 'Browser', col: 0, row: 1 },
        { id: 'weather', label: 'Open-Meteo API', sub: 'Live weather', col: 0, row: 2 },
        { id: 'quote', label: 'ZenQuotes API', sub: 'Daily quote', col: 2, row: 1 },
        { id: 'store', label: 'LocalStorage', sub: 'Todos / goals', col: 1, row: 2 },
      ],
      edges: [
        { from: 'ui', to: 'geo' },
        { from: 'geo', to: 'weather' },
        { from: 'ui', to: 'quote' },
        { from: 'ui', to: 'store' },
      ],
    },
    results: [
      '528-line vanilla JS app — the largest of the framework-free builds',
      'Two live external API integrations with graceful fallback states',
    ],
    challenges:
      'Geolocation is opt-in and can be denied or time out — the weather widget needed a clear fallback state rather than silently failing when permission wasn’t granted.',
    demoUrl: 'https://cohort3-0-assignments-frov.vercel.app/',
    githubUrl: 'https://github.com/RizakSingh/Cohort3.0-assignments/tree/main/productivity%20dashboard',
    accent: '#7BAE7F',
    image: '/projects/nova.png',
    featured: true,
  },
  {
    slug: 'fintrack-pro',
    index: '05',
    title: 'FinTrack Pro',
    shortTitle: 'Finance Tracker',
    year: '2025',
    category: ['FRONTEND'],
    tagline: 'A personal finance dashboard, built without a framework.',
    summary:
      'Balance, income and expense tracking with full transaction CRUD, a settings page and theming — all in plain HTML, CSS and JavaScript.',
    overview:
      'FinTrack Pro is a personal finance dashboard: stat cards for balance/income/expense, a transaction ledger with add/edit/delete, and a settings page — all state persisted client-side, with a mock authentication UI for the login/logout flow.',
    problem:
      'Finance dashboards live or die on data consistency — every add, edit and delete has to keep the balance/income/expense totals correct without a database to enforce it.',
    solution:
      'Centralized transaction state in a single source of truth synced to localStorage on every mutation, with derived stat cards recomputed from that state rather than tracked separately — eliminating an entire class of "balance drifted from transactions" bugs.',
    features: [
      'Balance, income and expense stat cards',
      'Transaction add / edit / delete',
      'Settings page',
      'Theme toggle',
      'Mock login / logout UI',
    ],
    tech: ['JavaScript', 'HTML5', 'CSS3', 'LocalStorage'],
    architecture: {
      nodes: [
        { id: 'ui', label: 'Dashboard UI', sub: 'Stat cards', col: 1, row: 0 },
        { id: 'state', label: 'Transaction State', sub: 'Single source of truth', col: 1, row: 1 },
        { id: 'store', label: 'LocalStorage', sub: 'Persistence', col: 1, row: 2 },
      ],
      edges: [
        { from: 'ui', to: 'state', label: 'add / edit / delete' },
        { from: 'state', to: 'store' },
        { from: 'store', to: 'ui', label: 'derived totals' },
      ],
    },
    results: [
      'Stat cards always derived from transaction state — never out of sync',
      '~350 lines of dependency-free JavaScript',
    ],
    demoUrl: 'https://cohort3-0-assignments-i33a.vercel.app/',
    githubUrl: 'https://github.com/RizakSingh/Cohort3.0-assignments/tree/main/finance%20tracker',
    accent: '#C9A15A',
    image: '/projects/fintrack-pro.png',
    featured: true,
  },
  {
    slug: 'dom-explorer',
    index: '06',
    title: 'DOM Explorer',
    shortTitle: 'Task Manager',
    year: '2025',
    category: ['EXPERIMENTAL', 'FRONTEND'],
    tagline: 'A task manager built to teach the DOM, not just use it.',
    summary:
      'A zero-dependency task manager written explicitly as a deep dive into event delegation, bubbling vs. capturing, and attributes vs. properties.',
    overview:
      'DOM Explorer is a task manager on the surface, but its real purpose is documented in its own README: it’s a teaching artifact for core DOM concepts — event delegation, the bubbling/capturing phases, the difference between attributes and properties, and the browser’s rendering pipeline.',
    problem:
      'Frameworks abstract away exactly the DOM mechanics that explain why event listeners, re-renders and attribute updates behave the way they do — worth building without that abstraction at least once.',
    solution:
      'No frameworks, no build tools, no dependencies. Task add/edit/complete/delete and search/filter are handled through a single delegated event listener rather than binding one listener per task node, with the README documenting the reasoning behind each decision.',
    features: [
      'Add / edit / complete / delete tasks',
      'Search and filter',
      'Dark / light theme',
      'Single delegated event listener for all task interactions',
    ],
    tech: ['JavaScript', 'HTML5', 'CSS3'],
    architecture: {
      nodes: [
        { id: 'dom', label: 'Task List (DOM)', sub: 'Rendered nodes', col: 1, row: 0 },
        { id: 'delegate', label: 'Delegated Listener', sub: 'Bubbling phase', col: 1, row: 1 },
        { id: 'handlers', label: 'add / edit / complete / delete', sub: 'One dispatcher', col: 1, row: 2 },
      ],
      edges: [
        { from: 'dom', to: 'delegate', label: 'click bubbles up' },
        { from: 'delegate', to: 'handlers', label: 'dataset.action' },
      ],
    },
    results: [
      'One listener handles every task interaction, regardless of list size',
      'README doubles as a written explainer of DOM event internals',
    ],
    demoUrl: 'https://cohort3-0-assignments-68f8.vercel.app/',
    githubUrl: 'https://github.com/RizakSingh/Cohort3.0-assignments/tree/main/task%20manager',
    accent: '#8B7BC9',
    image: '/projects/dom-explorer.png',
    featured: false,
  },
]

export const projectCategories = ['ALL', 'FULL STACK', 'AI', 'FRONTEND', 'EXPERIMENTAL']

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug)
}

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured)
}

export function getAdjacentProject(slug) {
  const i = projects.findIndex((p) => p.slug === slug)
  return projects[(i + 1) % projects.length]
}
