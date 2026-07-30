# Havn — Everyday Market

A small e-commerce front end built with React 19, React Router's data router API,
the Context API for state, and Tailwind CSS v4. No Redux, no backend — everything
runs client-side with `localStorage` for persistence.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL. Register a new account on first visit — there's
no seeded login, so create one from the Register page.

```bash
npm run build     # production build to dist/
npm run preview   # serve that build locally
```

## Architecture

```
src/
  main.jsx              entry point — wraps the app in AuthProvider, CartProvider, RouterProvider
  router.jsx            the single source of truth for all routes (createBrowserRouter)
  layouts/
    RootLayout.jsx       navbar + <Outlet /> + cart drawer, shared by every authenticated page
  pages/
    Home.jsx             dashboard: hero, stats, categories, top rated / new arrivals
    Shop.jsx             full catalog with search, category filter, and sorting
    About.jsx            team + CTA
    Checkout.jsx         order review / demo "place order" flow
    Login.jsx            standalone auth page (outside RootLayout)
    Register.jsx         standalone auth page (outside RootLayout)
    NotFound.jsx          catch-all 404
  components/
    Navbar.jsx, CartDrawer.jsx, ProductCard.jsx, CategoryCard.jsx,
    StatCard.jsx, Logo.jsx, ProtectedRoute.jsx
  context/
    AuthContext.jsx      register/login/logout, backed by localStorage
    CartContext.jsx      cart items, quantities, totals, backed by localStorage
  data/
    products.js          static product catalog + category list
```

### Routing

`router.jsx` defines routes with `createBrowserRouter`. Everything except
`/login` and `/register` is nested under a `ProtectedRoute` wrapping `RootLayout`,
so an unauthenticated visitor is redirected straight to `/login`, and the
navbar/cart drawer only render once someone is signed in.

### State

Two Context providers cover the whole app:

- **AuthContext** — holds the current user, exposes `login`, `register`,
  `logout`. Accounts are stored under `havn_users` in `localStorage`; the active
  session is stored separately under `havn_session` so a refresh keeps you
  logged in.
- **CartContext** — holds cart items and derived totals (`count`, `value`),
  exposes `addItem`, `removeItem`, `updateQty`, `clearCart`. Persisted under
  `havn_cart`.

Both are consumed through small hooks (`useAuth()`, `useCart()`) rather than
importing the raw context, so components never touch `useContext` directly.

### Styling

Tailwind v4 is wired in through `@tailwindcss/vite` — no `tailwind.config.js`
needed. Brand tokens (colors, fonts) are declared once in `src/index.css` under
an `@theme` block and used everywhere as ordinary utility classes
(`bg-coral`, `text-teal`, `font-display`, etc.).

## Notes

- This is a front-end-only demo: registration/login just checks against
  accounts stored in the browser's `localStorage`, and checkout doesn't talk to
  a payment processor — it clears the cart and shows a confirmation.
- Product images are placeholder photos from `picsum.photos`, seeded per
  product so they stay consistent across reloads.
