"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { clinicFetch } from "@/lib/clinic/client";

const packages = [
  {
    key: "essential" as const,
    name: "Essential",
    price: "$199",
    period: "/mo",
    image: "/images/packages/package-essential.jpg",
    description: "Monthly check-in, medication management, and baseline labs.",
  },
  {
    key: "premium" as const,
    name: "Premium",
    price: "$349",
    period: "/mo",
    image: "/images/packages/package-premium.jpg",
    description:
      "Twice-monthly visits, B12 injections, and nutritional counseling.",
  },
  {
    key: "concierge" as const,
    name: "Concierge",
    price: "$599",
    period: "/mo",
    image: "/images/packages/package-concierge.jpg",
    description:
      "Unlimited check-ins, priority scheduling, and direct access to Dr. Rhee.",
  },
];

const field =
  "w-full px-4 py-3 bg-cream border border-navy/10 rounded-xl text-[15px] text-navy focus:outline-none focus:border-gold";

function BookingFlowInner() {
  const searchParams = useSearchParams();
  const tierParam = searchParams.get("tier");

  const [mode, setMode] = useState<"new" | "returning">("new");
  const [selectedTier, setSelectedTier] = useState<string | null>(
    tierParam && packages.some((p) => p.key === tierParam) ? tierParam : null
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [modality, setModality] = useState<"in_person" | "remote">("in_person");
  const [preferredWindow, setPreferredWindow] = useState("anytime");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  const selectedPackage = packages.find((p) => p.key === selectedTier);

  async function submitLead(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedPackage) return;
    setError("");
    setBusy(true);
    try {
      await clinicFetch("/api/clinic/public/leads", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
          tier: selectedPackage.key,
          modality,
          preferredWindow: preferredWindow || undefined,
        }),
      });
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not submit");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="py-14 md:py-28 bg-cream">
      <div className="max-w-[1100px] mx-auto px-5 md:px-6">
        <div className="flex justify-center mb-14">
          <div className="doppelrand doppelrand-light inline-block">
            <div className="inline-flex rounded-full bg-white p-1 border border-[rgba(27,42,74,0.04)]">
              <button
                onClick={() => {
                  setMode("new");
                  setSelectedTier(null);
                  setDone(false);
                }}
                className={`px-7 py-2.5 rounded-full text-[14px] font-medium ${
                  mode === "new" ? "bg-navy text-white" : "text-body"
                }`}
              >
                New Patient
              </button>
              <button
                onClick={() => {
                  setMode("returning");
                  setSelectedTier(null);
                }}
                className={`px-7 py-2.5 rounded-full text-[14px] font-medium ${
                  mode === "returning" ? "bg-navy text-white" : "text-body"
                }`}
              >
                Returning Patient
              </button>
            </div>
          </div>
        </div>

        {mode === "new" && !selectedTier && (
          <>
            <div className="text-center mb-12">
              <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">
                Step 1
              </p>
              <h2 className="font-serif text-[clamp(1.75rem,3.5vw,2.5rem)] tracking-[-0.02em] text-navy">
                Select your <em className="text-gold">plan</em>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {packages.map((pkg) => (
                <button
                  key={pkg.key}
                  data-testid={`tier-${pkg.key}`}
                  onClick={() => setSelectedTier(pkg.key)}
                  className="group text-left doppelrand doppelrand-light"
                >
                  <div className="flex flex-col rounded-[18px] overflow-hidden bg-white border border-[rgba(27,42,74,0.04)] h-full">
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={pkg.image}
                        alt={`${pkg.name} package`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-2">
                        {pkg.name}
                      </p>
                      <p className="font-serif text-[28px] text-navy">
                        {pkg.price}
                        <span className="text-[14px] font-sans text-light ml-1">
                          {pkg.period}
                        </span>
                      </p>
                      <p className="mt-3 text-[14px] text-body">{pkg.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {mode === "new" && selectedTier && selectedPackage && !done && (
          <>
            <div className="text-center mb-10">
              <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">
                Step 2
              </p>
              <h2 className="font-serif text-[clamp(1.75rem,3.5vw,2.5rem)] text-navy">
                Request your <em className="text-gold">visit</em>
              </h2>
              <p className="mt-3 text-[15px] text-body">
                {selectedPackage.name} — {selectedPackage.price}
                {selectedPackage.period}
              </p>
              <button
                onClick={() => setSelectedTier(null)}
                className="mt-3 text-[14px] text-gold"
              >
                ← Choose a different plan
              </button>
            </div>
            <form
              onSubmit={submitLead}
              className="max-w-lg mx-auto bg-white rounded-2xl border border-navy/5 p-8 space-y-4"
              data-testid="lead-form"
            >
              <input
                name="name"
                data-testid="lead-name"
                required
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={field}
              />
              <input
                name="email"
                type="email"
                data-testid="lead-email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={field}
              />
              <input
                name="phone"
                data-testid="lead-phone"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={field}
              />
              <input
                name="password"
                type="password"
                data-testid="lead-password"
                required
                minLength={6}
                placeholder="Portal password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={field}
              />
              <label className="block text-[13px] text-navy">
                Visit type
                <select
                  data-testid="lead-modality"
                  value={modality}
                  onChange={(e) =>
                    setModality(e.target.value as "in_person" | "remote")
                  }
                  className={`${field} mt-1`}
                >
                  <option value="in_person">In person</option>
                  <option value="remote">Remote</option>
                </select>
              </label>
              <label className="block text-[13px] text-navy">
                Roughly when works? (optional)
                <select
                  data-testid="lead-window"
                  value={preferredWindow}
                  onChange={(e) => setPreferredWindow(e.target.value)}
                  className={`${field} mt-1`}
                >
                  <option value="anytime">Anytime — we’ll propose times</option>
                  <option value="mornings">Mornings</option>
                  <option value="afternoons">Afternoons</option>
                  <option value="this_week">This week</option>
                  <option value="next_week">Next week</option>
                </select>
              </label>
              {error && (
                <p className="text-red-700 text-sm" role="alert">
                  {error}
                </p>
              )}
              <button
                type="submit"
                data-testid="lead-submit"
                disabled={busy}
                className="btn-primary w-full"
              >
                {busy ? "Submitting…" : "Request visit"}
              </button>
            </form>
          </>
        )}

        {mode === "new" && done && (
          <div
            className="max-w-lg mx-auto text-center bg-white rounded-2xl border border-navy/5 p-10"
            data-testid="lead-success"
          >
            <h2 className="font-serif text-2xl text-navy mb-3">
              We’ll confirm your visit
            </h2>
            <p className="text-[15px] text-body mb-6">
              The care team has your request. Log in to the patient portal to
              see your membership and upcoming visit.
            </p>
            <Link href="/app/login" className="btn-primary">
              Go to patient login
            </Link>
          </div>
        )}

        {mode === "returning" && (
          <div className="text-center">
            <h2 className="font-serif text-[clamp(1.75rem,3.5vw,2.5rem)] text-navy">
              Welcome back
            </h2>
            <p className="mt-3 text-[15px] text-body max-w-md mx-auto">
              Log in to schedule follow-ups, log weight, and see your protocol.
            </p>
            <div className="flex justify-center mt-8">
              <Link href="/app/login" className="btn-primary">
                Go to Patient Portal
              </Link>
            </div>
          </div>
        )}

        <p className="mt-8 text-center text-[12px] text-light">
          Scheduling through Precision W+W clinic — not a third-party portal
        </p>
      </div>
    </section>
  );
}

export default function BookingFlow() {
  return (
    <Suspense>
      <BookingFlowInner />
    </Suspense>
  );
}
