"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { clinicFetch } from "@/lib/clinic/client";

const field =
  "w-full px-5 py-4 bg-cream/50 border border-navy/[0.06] rounded-2xl text-[15px] text-navy focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 focus:bg-white";

export default function LoginForm({
  heading,
  redirectTo,
  expectedRole,
}: {
  heading: string;
  redirectTo: string;
  expectedRole: "staff" | "patient";
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const data = await clinicFetch<{
        user: { role: string };
      }>("/api/clinic/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const role = data.user.role;
      if (expectedRole === "staff" && role !== "staff" && role !== "doctor") {
        setError("This login is for clinic staff.");
        return;
      }
      if (expectedRole === "patient" && role !== "patient") {
        setError("This login is for patients. Staff should use /staff/login.");
        return;
      }
      router.push(redirectTo);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-dvh bg-cream flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-md">
        <p className="font-serif text-center text-[22px] text-navy mb-2">
          Precision <span className="text-gold">W+W</span>
        </p>
        <p className="text-center text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-8">
          {expectedRole === "staff" ? "Care team" : "Patient portal"}
        </p>
        <div className="doppelrand doppelrand-light">
          <div className="bg-white rounded-[18px] border border-[rgba(27,42,74,0.04)] p-8">
            <h1 className="font-serif text-[28px] tracking-[-0.02em] text-navy mb-6">
              {heading}
            </h1>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-[13px] text-navy mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  data-testid="login-email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={field}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-[13px] text-navy mb-1.5">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  data-testid="login-password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={field}
                />
              </div>
              {error && (
                <p className="text-[13px] text-red-700" role="alert">
                  {error}
                </p>
              )}
              <button
                type="submit"
                data-testid="login-submit"
                disabled={busy}
                className="btn-primary w-full"
              >
                {busy ? "Signing in…" : "Log in"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
