import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Mail, Lock, AlertCircle, ArrowRight } from "lucide-react";
import { useAdminAuth } from "../AdminAuthContext";

export default function AdminLoginPage() {
  const { user, loading, signIn } = useAdminAuth();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user) {
    const from = location.state?.from?.pathname || "/admin/jobs";
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const { error: signInError } = await signIn(email, password);
    setSubmitting(false);
    if (signInError) setError("Invalid email or password.");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4">
      {/* Dot grid + glow, consistent with the site's dark surfaces */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[36rem] -translate-x-1/2 rounded-full bg-indigo-600/25 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-cyan-500/15 blur-[100px]" />

      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl"
      >
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400" />

        <div className="mb-7 flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-sm font-black text-white shadow-lg shadow-indigo-600/30">
            AX
          </div>
          <div className="leading-tight">
            <h1 className="text-lg font-bold text-white">Admin Login</h1>
            <p className="text-[13px] text-slate-400">AurowinX control panel</p>
          </div>
        </div>

        <label htmlFor="admin-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">
          Email
        </label>
        <div className="mb-4 flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 transition-colors focus-within:border-indigo-400 focus-within:bg-white/[0.07] focus-within:ring-4 focus-within:ring-indigo-500/15">
          <Mail size={16} className="shrink-0 text-slate-500" />
          <input
            id="admin-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
            placeholder="you@aurowinx.com"
          />
        </div>

        <label htmlFor="admin-password" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">
          Password
        </label>
        <div className="mb-5 flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 transition-colors focus-within:border-indigo-400 focus-within:bg-white/[0.07] focus-within:ring-4 focus-within:ring-indigo-500/15">
          <Lock size={16} className="shrink-0 text-slate-500" />
          <input
            id="admin-password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
            placeholder="••••••••"
          />
        </div>

        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-3.5 py-2.5 text-[13px] text-red-300">
            <AlertCircle size={15} className="shrink-0" />
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all hover:shadow-indigo-600/40 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Signing in..." : "Sign in"}
          {!submitting && <ArrowRight size={15} />}
        </button>
      </form>
    </div>
  );
}
