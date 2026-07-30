import { NavLink, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const navLinkClass = ({ isActive }) =>
  `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
    isActive ? "text-coral" : "text-ink/60 hover:text-ink"
  }`;

export default function Navbar() {
  const { user, logout } = useAuth();
  const { totals, setIsOpen } = useCart();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const initial = user?.name?.trim()?.[0]?.toUpperCase() || "?";

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper-raised/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <NavLink to="/">
          <Logo />
        </NavLink>

        <nav className="hidden gap-1 sm:flex">
          <NavLink to="/" end className={navLinkClass}>Home</NavLink>
          <NavLink to="/shop" className={navLinkClass}>Shop</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-full border border-line bg-paper px-2 py-1 sm:flex">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-coral text-xs font-semibold text-white">
              {initial}
            </span>
            <span className="max-w-[110px] truncate text-xs font-medium text-ink/70">
              {user?.name || "Guest"}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink/70 hover:border-coral hover:text-coral"
            aria-label="Open cart"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
              <path d="M3 4h2l2.4 12.2a2 2 0 002 1.8h8.2a2 2 0 002-1.6L21 8H6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="9.5" cy="20.5" r="1.4" fill="currentColor" />
              <circle cx="17.5" cy="20.5" r="1.4" fill="currentColor" />
            </svg>
            {totals.count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-teal px-1 text-[10px] font-bold text-white">
                {totals.count}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink/70 hover:border-coral hover:text-coral"
            aria-label="Log out"
            title="Log out"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <nav className="flex gap-1 border-t border-line px-4 py-1.5 sm:hidden">
        <NavLink to="/" end className={navLinkClass}>Home</NavLink>
        <NavLink to="/shop" className={navLinkClass}>Shop</NavLink>
        <NavLink to="/about" className={navLinkClass}>About</NavLink>
      </nav>
    </header>
  );
}
