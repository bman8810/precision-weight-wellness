"use client";

import { useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const HEALTHIE_DIETITIAN_ID = "14666692";
const HEALTHIE_COLOR = "c7a96f";

const packages = [
  {
    key: "essential",
    name: "Essential",
    price: "$199",
    period: "/mo",
    image: "/images/packages/package-essential.jpg",
    offeringId: "244715",
    description: "Monthly check-in, medication management, and baseline labs.",
  },
  {
    key: "premium",
    name: "Premium",
    price: "$349",
    period: "/mo",
    image: "/images/packages/package-premium.jpg",
    offeringId: "244716",
    description:
      "Twice-monthly visits, B12 injections, and nutritional counseling.",
  },
  {
    key: "concierge",
    name: "Concierge",
    price: "$599",
    period: "/mo",
    image: "/images/packages/package-concierge.jpg",
    offeringId: "244717",
    description:
      "Unlimited check-ins, priority scheduling, and direct access to Dr. Rhee.",
  },
];

const RETURNING_EMBED_URL = `https://secure.gethealthie.com/appointments/embed_appt?dietitian_id=${HEALTHIE_DIETITIAN_ID}&provider_ids=%5B${HEALTHIE_DIETITIAN_ID}%5D&appt_type_ids=%5B520046,520047%5D&primary_color=${HEALTHIE_COLOR}`;

function BookingFlowInner() {
  const searchParams = useSearchParams();
  const tierParam = searchParams.get("tier");

  const [mode, setMode] = useState<"new" | "returning">("new");
  const [selectedTier, setSelectedTier] = useState<string | null>(
    tierParam && packages.some((p) => p.key === tierParam) ? tierParam : null
  );

  const selectedPackage = packages.find((p) => p.key === selectedTier);

  return (
    <section className="py-14 md:py-28 bg-cream">
      <div className="max-w-[1100px] mx-auto px-5 md:px-6">
        {/* Mode Toggle — pill switcher */}
        <div className="flex justify-center mb-14">
          <div className="doppelrand doppelrand-light inline-block">
            <div className="inline-flex rounded-full bg-white p-1 border border-[rgba(27,42,74,0.04)]">
              <button
                onClick={() => {
                  setMode("new");
                  setSelectedTier(null);
                }}
                className={`px-7 py-2.5 rounded-full text-[14px] font-medium transition-all duration-500 active:scale-[0.98] ${
                  mode === "new"
                    ? "bg-navy text-white shadow-[0_4px_12px_rgba(27,42,74,0.15)]"
                    : "text-body hover:text-navy"
                }`}
                style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}
              >
                New Patient
              </button>
              <button
                onClick={() => {
                  setMode("returning");
                  setSelectedTier(null);
                }}
                className={`px-7 py-2.5 rounded-full text-[14px] font-medium transition-all duration-500 active:scale-[0.98] ${
                  mode === "returning"
                    ? "bg-navy text-white shadow-[0_4px_12px_rgba(27,42,74,0.15)]"
                    : "text-body hover:text-navy"
                }`}
                style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}
              >
                Returning Patient
              </button>
            </div>
          </div>
        </div>

        {/* New Patient — Plan Selection */}
        {mode === "new" && !selectedTier && (
          <>
            <div className="text-center mb-12">
              <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">
                Step 1
              </p>
              <h2 className="font-serif text-[clamp(1.75rem,3.5vw,2.5rem)] tracking-[-0.02em] text-navy">
                Select your <em className="text-gold">plan</em>
              </h2>
              <p className="mt-3 text-[15px] text-body leading-[1.65]">
                Choose a membership to get started with your initial consultation.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {packages.map((pkg) => (
                <button
                  key={pkg.key}
                  onClick={() => setSelectedTier(pkg.key)}
                  className="group text-left doppelrand doppelrand-light"
                >
                  <div className="flex flex-col rounded-[18px] overflow-hidden bg-white border border-[rgba(27,42,74,0.04)] card-hover h-full">
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={pkg.image}
                        alt={`${pkg.name} package`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-2">
                        {pkg.name}
                      </p>
                      <p className="font-serif text-[28px] tracking-[-0.02em] text-navy leading-[1]">
                        {pkg.price}
                        <span className="text-[14px] font-sans text-light ml-1">
                          {pkg.period}
                        </span>
                      </p>
                      <p className="mt-3 text-[14px] text-body leading-[1.6] flex-1">
                        {pkg.description}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-gold group-hover:text-gold-light transition-colors duration-500">
                        Select plan
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform duration-500 group-hover:translate-x-1" style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}>
                          <path d="M3.5 8h9M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {/* New Patient — Healthie Enrollment Embed */}
        {mode === "new" && selectedTier && selectedPackage && (
          <>
            <div className="text-center mb-10">
              <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">
                Step 2
              </p>
              <h2 className="font-serif text-[clamp(1.75rem,3.5vw,2.5rem)] tracking-[-0.02em] text-navy">
                Complete your <em className="text-gold">enrollment</em>
              </h2>
              <p className="mt-3 text-[15px] text-body leading-[1.65]">
                {selectedPackage.name} plan &mdash; {selectedPackage.price}
                {selectedPackage.period}
              </p>
              <button
                onClick={() => setSelectedTier(null)}
                className="mt-3 text-[14px] text-gold hover:text-gold-light font-medium transition-colors duration-500"
                style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}
              >
                &larr; Choose a different plan
              </button>
            </div>
            <div className="doppelrand doppelrand-light">
              <div className="rounded-[18px] overflow-hidden bg-white border border-[rgba(27,42,74,0.04)]">
                <iframe
                  src={`https://secure.gethealthie.com/appointments/embed_appt?offering_id=${selectedPackage.offeringId}&dietitian_id=${HEALTHIE_DIETITIAN_ID}&primary_color=${HEALTHIE_COLOR}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    minHeight: "900px",
                    border: "0px",
                  }}
                  title={`Enroll in ${selectedPackage.name} plan and book your consultation`}
                />
              </div>
            </div>
          </>
        )}

        {/* Returning Patient — redirect to Healthie patient portal */}
        {mode === "returning" && (
          <>
            <div className="text-center mb-10">
              <h2 className="font-serif text-[clamp(1.75rem,3.5vw,2.5rem)] tracking-[-0.02em] text-navy">
                Welcome back
              </h2>
              <p className="mt-3 text-[15px] text-body leading-[1.65] max-w-md mx-auto">
                Log in to your patient portal to schedule follow-ups, view your
                plan, and message Dr. Rhee.
              </p>
            </div>
            <div className="flex justify-center">
              <a
                href="https://secure.gethealthie.com/go/precisionww"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Go to Patient Portal
              </a>
            </div>
          </>
        )}

        <p className="mt-8 text-center text-[12px] text-light">
          Scheduling and payments processed securely
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
