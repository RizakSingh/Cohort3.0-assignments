import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-6xl font-semibold text-coral">404</p>
      <p className="mt-3 text-sm text-ink/50">That page doesn't exist.</p>
      <Link
        to="/"
        className="mt-6 rounded-xl bg-coral px-5 py-3 text-sm font-semibold text-white hover:bg-coral-dark"
      >
        Back to Home
      </Link>
    </div>
  );
}
