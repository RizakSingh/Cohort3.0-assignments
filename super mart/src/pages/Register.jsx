import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "../components/Logo";

export default function Register() {
  const { register, authError, setAuthError } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [localError, setLocalError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setLocalError("");

    if (password !== confirm) {
      setLocalError("Passwords don't match.");
      return;
    }
    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters.");
      return;
    }

    const ok = register(name, email, password);
    if (ok) navigate("/", { replace: true });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-6 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Logo size={40} />
        </div>

        <div className="rounded-3xl border border-line bg-paper-raised p-8 shadow-sm">
          <h1 className="font-display text-xl font-semibold">Create your account</h1>
          <p className="mt-1 text-sm text-ink/50">Takes less than a minute.</p>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-xs font-semibold text-ink/60">Full Name</label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="rounded-xl border border-line px-3.5 py-2.5 text-sm outline-none focus:border-coral"
              />
            </div>
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
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-xs font-semibold text-ink/60">Password</label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="rounded-xl border border-line px-3.5 py-2.5 text-sm outline-none focus:border-coral"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="confirm" className="text-xs font-semibold text-ink/60">Confirm</label>
                <input
                  id="confirm"
                  type="password"
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="••••••••"
                  className="rounded-xl border border-line px-3.5 py-2.5 text-sm outline-none focus:border-coral"
                />
              </div>
            </div>

            {(localError || authError) && (
              <p className="text-xs font-medium text-coral-dark">{localError || authError}</p>
            )}

            <button
              type="submit"
              className="mt-2 rounded-xl bg-coral py-3 text-sm font-semibold text-white hover:bg-coral-dark"
            >
              Create Account
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-ink/50">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-coral hover:text-coral-dark">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
