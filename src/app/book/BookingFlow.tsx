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
    whatsIncluded: [
      "1 follow-up visit per month (in-person or virtual)",
      "Medication management & prescriptions",
      "Prior authorization support",
      "Secure messaging (48-hour response)",
      "Baseline + quarterly labs",
      "Body composition tracking",
    ],
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
    whatsIncluded: [
      "2 follow-up visits per month",
      "Everything in Essential, plus:",
      "Monthly B12 injection (in-office)",
      "Nutritional counseling resources",
      "Same-day secure messaging (24-hour response)",
      "Quarterly body composition analysis",
    ],
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
    whatsIncluded: [
      "Unlimited virtual check-ins",
      "Everything in Premium, plus:",
      "Weekly B12 or lipotropic injection",
      "Priority scheduling (same-week guaranteed)",
      "Direct access to Dr. Rhee (business hours)",
      "20% discount on all add-on services",
    ],
  },
];

const RETURNING_EMBED_URL = `https://secure.gethealthie.com/appointments/embed_appt?dietitian_id=${HEALTHIE_DIETITIAN_ID}&provider_ids=%5B${HEALTHIE_DIETITIAN_ID}%5D&appt_type_ids=%5B520046,520047%5D&primary_color=${HEALTHIE_COLOR}`;

const journeySteps = [
  {
    num: "1",
    title: "Complete enrollment",
    desc: "Create your account and set up secure payment for your membership.",
  },
  {
    num: "2",
    title: "Schedule your consultation",
    desc: "Pick a date and time that works for you \u2014 in-person in NYC or via telehealth.",
  },
  {
    num: "3",
    title: "Dr. Rhee reviews your history",
    desc: "Before your visit, our team reviews your intake forms, medical history, and any prior labs.",
  },
  {
    num: "4",
    title: "Your first visit",
    desc: "A comprehensive 30-minute consultation \u2014 health assessment, medication discussion, and your personalized plan.",
  },
];

const prepItems = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 10h18" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 4V2M15 4V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: "Photo ID & insurance card",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="9" y="3" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    label: "List of current medications",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: "Recent lab results (if available)",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    label: "Your health & weight loss goals",
  },
];

function BookingFlowInner() {
  const searchParams = useSearchParams();
  const tierParam = searchParams.get("tier");

  const [mode, setMode] = useState<"new" | "returning">("new");
  const [selectedTier, setSelectedTier] = useState<string | null>(
    tierParam && packages.some((p) => p.key === tierParam) ? tierParam : null
  );
  const [confirmedTier, setConfirmedTier] = useState<boolean>(false);

  const selectedPackage = packages.find((p) => p.key === selectedTier);

  // Determine which step we're on for the progress indicator
  const currentStep = !selectedTier ? 1 : !confirmedTier ? 2 : 3;

  return (
    <section className="py-14 md:py-28 bg-cream">
      <div className="max-w-[1100px] mx-auto px-5 md:px-6">
        {/* Mode Toggle \u2014 pill switcher */}
        <div className="flex justify-center mb-10">
          <div className="doppelrand doppelrand-light inline-block">
            <div className="inline-flex rounded-full bg-white p-1 border border-[rgba(27,42,74,0.04)]">
              <button
                onClick={() => {
                  setMode("new");
                  setSelectedTier(null);
                  setConfirmedTier(false);
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
                  setConfirmedTier(false);
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

        {/* Step Progress Indicator \u2014 New Patients Only */}
        {mode === "new" && (
          <div className="flex items-center justify-center gap-3 mb-14">
            {[
              { num: 1, label: "Select Plan" },
              { num: 2, label: "What\u2019s Next" },
              { num: 3, label: "Enroll" },
            ].map((s, i) => (
              <div key={s.num} className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-semibold transition-all duration-500 ${
                      currentStep > s.num
                        ? "bg-gold text-white"
                        : currentStep === s.num
                          ? "bg-white border-2 border-gold text-gold shadow-[0_0_0_4px_rgba(201,169,110,0.1)]"
                          : "bg-white border border-[rgba(27,42,74,0.1)] text-light"
                    }`}
                    style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}
                  >
                    {currentStep > s.num ? (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      s.num
                    )}
                  </div>
                  <span
                    className={`hidden sm:inline text-[12px] font-medium transition-colors duration-500 ${
                      currentStep === s.num ? "text-gold" : currentStep > s.num ? "text-gold/60" : "text-light"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < 2 && (
                  <div
                    className={`w-8 sm:w-12 h-[1.5px] rounded-full transition-all duration-500 ${
                      currentStep > s.num ? "bg-gold" : "bg-[rgba(27,42,74,0.08)]"
                    }`}
                    style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* \u2500\u2500\u2500 Step 1: New Patient \u2014 Plan Selection \u2500\u2500\u2500 */}
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
                  onClick={() => {
                    setSelectedTier(pkg.key);
                    setConfirmedTier(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
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

        {/* \u2500\u2500\u2500 Step 2: What Happens Next \u2014 Interstitial \u2500\u2500\u2500 */}
        {mode === "new" && selectedTier && selectedPackage && !confirmedTier && (
          <>
            <div className="text-center mb-10">
              <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">
                Step 2
              </p>
              <h2 className="font-serif text-[clamp(1.75rem,3.5vw,2.5rem)] tracking-[-0.02em] text-navy">
                Here&apos;s what happens <em className="text-gold">next</em>
              </h2>
              <p className="mt-3 text-[15px] text-body leading-[1.65] max-w-lg mx-auto">
                You&apos;ve selected the <strong className="text-navy">{selectedPackage.name}</strong> plan
                at {selectedPackage.price}{selectedPackage.period}. Here&apos;s
                how your journey begins.
              </p>
              <button
                onClick={() => {
                  setSelectedTier(null);
                  setConfirmedTier(false);
                }}
                className="mt-3 text-[14px] text-gold hover:text-gold-light font-medium transition-colors duration-500"
                style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}
              >
                &larr; Choose a different plan
              </button>
            </div>

            <div className="max-w-[820px] mx-auto space-y-6">
              {/* Your Plan Summary */}
              <div className="doppelrand doppelrand-light">
                <div className="rounded-[18px] bg-white border border-[rgba(27,42,74,0.04)] p-7 md:p-9">
                  <div className="flex items-start gap-5">
                    <div className="relative w-16 h-16 rounded-[12px] overflow-hidden shrink-0 hidden sm:block">
                      <Image
                        src={selectedPackage.image}
                        alt={`${selectedPackage.name} package`}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div>
                          <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-1">
                            Your Plan
                          </p>
                          <h3 className="font-serif text-[22px] tracking-[-0.01em] text-navy leading-tight">
                            {selectedPackage.name}
                          </h3>
                        </div>
                        <p className="font-serif text-[24px] tracking-[-0.02em] text-navy">
                          {selectedPackage.price}
                          <span className="text-[13px] font-sans text-light ml-1">
                            {selectedPackage.period}
                          </span>
                        </p>
                      </div>
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {selectedPackage.whatsIncluded.map((item) => (
                          <div key={item} className="flex items-start gap-2">
                            <span className="w-4 h-4 rounded-full bg-sage/12 flex items-center justify-center shrink-0 mt-0.5">
                              <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                                <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#7BAE8E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                            <span className="text-[13px] text-body leading-[1.5]">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Your Journey Timeline */}
              <div className="doppelrand doppelrand-light">
                <div className="rounded-[18px] bg-white border border-[rgba(27,42,74,0.04)] p-7 md:p-9">
                  <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-1">
                    Your Journey
                  </p>
                  <h3 className="font-serif text-[20px] tracking-[-0.01em] text-navy mb-6">
                    From enrollment to your first visit
                  </h3>
                  <div className="space-y-0">
                    {journeySteps.map((step, i) => (
                      <div key={step.num} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-gold/10 border-2 border-gold/30 flex items-center justify-center shrink-0">
                            <span className="text-[12px] font-bold text-gold">{step.num}</span>
                          </div>
                          {i < journeySteps.length - 1 && (
                            <div className="w-[1.5px] flex-1 bg-gold/15 my-1" />
                          )}
                        </div>
                        <div className={`pb-6 ${i === journeySteps.length - 1 ? "pb-0" : ""}`}>
                          <h4 className="text-[15px] font-semibold text-navy leading-tight">
                            {step.title}
                          </h4>
                          <p className="text-[14px] text-body leading-[1.6] mt-1">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* What to Have Ready */}
              <div className="doppelrand doppelrand-light">
                <div className="rounded-[18px] bg-white border border-[rgba(27,42,74,0.04)] p-7 md:p-9">
                  <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-1">
                    Before Your Visit
                  </p>
                  <h3 className="font-serif text-[20px] tracking-[-0.01em] text-navy mb-5">
                    What to have ready
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {prepItems.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center gap-3 bg-cream/60 rounded-[12px] px-4 py-3 border border-[rgba(27,42,74,0.03)]"
                      >
                        <span className="text-gold shrink-0">{item.icon}</span>
                        <span className="text-[14px] text-navy font-medium">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Good to Know */}
              <div className="doppelrand doppelrand-light">
                <div className="rounded-[18px] bg-white border border-[rgba(27,42,74,0.04)] p-7 md:p-9">
                  <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-1">
                    Good to Know
                  </p>
                  <h3 className="font-serif text-[20px] tracking-[-0.01em] text-navy mb-5">
                    A few important details
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        q: "Is medication included in my plan?",
                        a: "Medication costs are separate from your membership. We\u2019ll help you navigate insurance coverage, manufacturer savings programs, and pharmacy options to find the most affordable path.",
                      },
                      {
                        q: "Can I cancel or change plans?",
                        a: "Monthly memberships can be cancelled at any time. You can upgrade or downgrade your plan at any point during your journey.",
                      },
                      {
                        q: "Is my payment secure?",
                        a: "All payments are processed through our HIPAA-compliant patient portal. Your information is encrypted and never shared.",
                      },
                    ].map((faq) => (
                      <div key={faq.q} className="bg-cream/40 rounded-[12px] px-5 py-4 border border-[rgba(27,42,74,0.03)]">
                        <p className="text-[14px] font-semibold text-navy">{faq.q}</p>
                        <p className="text-[14px] text-body leading-[1.6] mt-1.5">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA \u2014 Continue to Enrollment */}
              <div className="text-center pt-4">
                <button
                  onClick={() => {
                    setConfirmedTier(true);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="btn-primary group inline-flex items-center"
                >
                  Continue to Enrollment
                  <span className="ml-2 w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform duration-500 group-hover:translate-x-0.5" style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}>
                      <path d="M3.5 8h9M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
                <p className="mt-4 text-[13px] text-light">
                  You&apos;ll create an account and schedule your consultation on the next step.
                </p>
              </div>
            </div>
          </>
        )}

        {/* \u2500\u2500\u2500 Step 3: New Patient \u2014 Healthie Enrollment Embed \u2500\u2500\u2500 */}
        {mode === "new" && selectedTier && selectedPackage && confirmedTier && (
          <>
            <div className="text-center mb-10">
              <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">
                Step 3
              </p>
              <h2 className="font-serif text-[clamp(1.75rem,3.5vw,2.5rem)] tracking-[-0.02em] text-navy">
                Complete your <em className="text-gold">enrollment</em>
              </h2>
              <p className="mt-3 text-[15px] text-body leading-[1.65]">
                {selectedPackage.name} plan &mdash; {selectedPackage.price}
                {selectedPackage.period}
              </p>
              <button
                onClick={() => setConfirmedTier(false)}
                className="mt-3 text-[14px] text-gold hover:text-gold-light font-medium transition-colors duration-500"
                style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}
              >
                &larr; Back to plan details
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

        {/* Returning Patient \u2014 redirect to Healthie patient portal */}
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
