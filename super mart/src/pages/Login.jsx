import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "../components/Logo";

export default function Login() {
  const { login, authError, setAuthError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const from = location.state?.from?.pathname || "/";

  function handleSubmit(e) {
    e.preventDefault();
    const ok = login(email, password);
    if (ok) navigate(from, { replace: true });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Logo size={40} />
        </div>

        <div className="rounded-3xl border border-line bg-paper-raised p-8 shadow-sm">
          <h1 className="font-display text-xl font-semibold">Welcome back</h1>
          <p className="mt-1 text-sm text-ink/50">Log in to keep shopping.</p>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-semibold text-ink/60">Email</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setAuthError("");
                }}
                placeholder="you@example.com"
                className="rounded-xl border border-line px-3.5 py-2.5 text-sm outline-none focus:border-coral"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-xs font-semibold text-ink/60">Password</label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setAuthError("");
                }}
                placeholder="••••••••"
                className="rounded-xl border border-line px-3.5 py-2.5 text-sm outline-none focus:border-coral"
              />
            </div>

            {authError && <p className="text-xs font-medium text-coral-dark">{authError}</p>}

            <button
              type="submit"
              className="mt-2 rounded-xl bg-coral py-3 text-sm font-semibold text-white hover:bg-coral-dark"
            >
              Log In
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-ink/50">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-coral hover:text-coral-dark">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
