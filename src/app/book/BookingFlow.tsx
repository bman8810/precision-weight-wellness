"use client";

import { useState } from "react";
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

// Follow-up + Group Session only (no Initial Consultation)
const RETURNING_EMBED_URL = `https://secure.gethealthie.com/appointments/embed_appt?dietitian_id=${HEALTHIE_DIETITIAN_ID}&provider_ids=%5B${HEALTHIE_DIETITIAN_ID}%5D&appt_type_ids=%5B520046,520047%5D&primary_color=${HEALTHIE_COLOR}`;

function BookingFlowInner() {
  const searchParams = useSearchParams();
  const tierParam = searchParams.get("tier");

  const [mode, setMode] = useState<"new" | "returning">(
    tierParam ? "new" : "new"
  );
  const [selectedTier, setSelectedTier] = useState<string | null>(
    tierParam && packages.some((p) => p.key === tierParam) ? tierParam : null
  );

  const selectedPackage = packages.find((p) => p.key === selectedTier);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        {/* Mode Toggle */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex rounded-full bg-cream p-1">
            <button
              onClick={() => {
                setMode("new");
                setSelectedTier(null);
              }}
              className={`px-6 py-2.5 rounded-full text-sm tracking-wide transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                mode === "new"
                  ? "bg-soft-black text-white shadow-sm"
                  : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              New Patient
            </button>
            <button
              onClick={() => {
                setMode("returning");
                setSelectedTier(null);
              }}
              className={`px-6 py-2.5 rounded-full text-sm tracking-wide transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                mode === "returning"
                  ? "bg-soft-black text-white shadow-sm"
                  : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              Returning Patient
            </button>
          </div>
        </div>

        {mode === "new" && !selectedTier && (
          <>
            <div className="text-center mb-12">
              <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-3">
                Step 1
              </p>
              <h2 className="font-serif text-3xl tracking-tight text-soft-black">
                Select your plan
              </h2>
              <p className="mt-3 text-sm text-neutral-500">
                Choose a membership to get started with your initial
                consultation.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <button
                  key={pkg.key}
                  onClick={() => setSelectedTier(pkg.key)}
                  className="group flex flex-col rounded-2xl overflow-hidden bg-cream text-left transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-y-[-2px] hover:shadow-[0_16px_40px_-12px_rgba(201,169,110,0.12)]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={pkg.image}
                    alt={`${pkg.name} package`}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-[11px] tracking-[0.2em] uppercase text-gold mb-2">
                      {pkg.name}
                    </p>
                    <p className="font-serif text-2xl text-soft-black">
                      {pkg.price}
                      <span className="text-sm font-sans text-neutral-400 ml-1">
                        {pkg.period}
                      </span>
                    </p>
                    <p className="mt-3 text-sm text-neutral-500 leading-relaxed flex-1">
                      {pkg.description}
                    </p>
                    <span className="mt-4 inline-block text-sm text-gold group-hover:text-gold-dark tracking-wide transition-colors duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]">
                      Select &rarr;
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {mode === "new" && selectedTier && selectedPackage && (
          <>
            <div className="text-center mb-8">
              <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-3">
                Step 2
              </p>
              <h2 className="font-serif text-3xl tracking-tight text-soft-black">
                Complete your enrollment
              </h2>
              <p className="mt-3 text-sm text-neutral-500">
                {selectedPackage.name} plan &mdash; {selectedPackage.price}
                {selectedPackage.period}. Enter your details, payment, and
                select your appointment time.
              </p>
              <button
                onClick={() => setSelectedTier(null)}
                className="mt-3 text-sm text-gold hover:text-gold-dark transition-colors duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]"
              >
                &larr; Choose a different plan
              </button>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-[0_16px_40px_-12px_rgba(0,0,0,0.06)] bg-white">
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
          </>
        )}

        {mode === "returning" && (
          <>
            <div className="text-center mb-8">
              <h2 className="font-serif text-3xl tracking-tight text-soft-black">
                Schedule your next visit
              </h2>
              <p className="mt-3 text-sm text-neutral-500">
                Book a follow-up session or group wellness session with Dr.
                Rhee.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-[0_16px_40px_-12px_rgba(0,0,0,0.06)] bg-white">
              <iframe
                src={RETURNING_EMBED_URL}
                style={{
                  width: "100%",
                  height: "100%",
                  minHeight: "900px",
                  border: "0px",
                }}
                title="Book a follow-up or group session with Dr. Rhee"
              />
            </div>
          </>
        )}

        <p className="mt-6 text-center text-xs text-neutral-400">
          Scheduling and payments provided by{" "}
          <a
            href="https://gethealthie.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:text-gold-dark transition-colors duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]"
          >
            Healthie
          </a>
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
