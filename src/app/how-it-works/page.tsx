import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Learn about our step-by-step medical weight management process — from initial consultation to ongoing therapy support with Dr. Libby Rhee.",
};

const journey = [
  {
    num: "01",
    title: "Initial Consultation",
    desc: "Your journey begins with a comprehensive one-on-one consultation with Dr. Rhee. During this visit, she will review your complete medical history, current medications, previous weight loss attempts, and overall health goals.",
    details: [
      "Full health assessment and lab review",
      "BMI and body composition analysis",
      "Discussion of medication options",
      "Personalized goal setting",
      "Insurance coverage review for medications",
    ],
  },
  {
    num: "02",
    title: "Your Personalized Treatment Plan",
    desc: "Based on your consultation, Dr. Rhee creates a tailored weight management protocol designed specifically for your biology, health conditions, and lifestyle.",
    details: [
      "Medication selection (Semaglutide or Tirzepatide)",
      "Customized dosing schedule with gradual titration",
      "Nutritional guidance and meal planning support",
      "Exercise and lifestyle recommendations",
      "Side effect management strategies",
    ],
  },
  {
    num: "03",
    title: "Starting Treatment",
    desc: "Once your plan is in place, you'll begin your medication at a carefully calibrated starting dose. Dr. Rhee uses a gradual titration approach to minimize side effects and optimize your body's response.",
    details: [
      "First injection guidance and training",
      "What to expect in the first weeks",
      "Dietary tips for best results",
      "Direct line to our care team for questions",
    ],
  },
  {
    num: "04",
    title: "Check-ins to Set & Evaluate Goals",
    desc: "Regular check-ins ensure your treatment is working effectively and safely. Dr. Rhee monitors your progress, adjusts dosing as needed, and provides continuous support throughout your journey.",
    details: [
      "Monthly provider check-ins",
      "Dose adjustments based on progress and tolerance",
      "Lab monitoring as needed",
      "Nutritional coaching and accountability",
      "Long-term maintenance planning",
    ],
  },
];

const expectations = [
  {
    title: "What to bring",
    items: [
      "Photo ID and insurance card",
      "List of current medications",
      "Recent lab results (if available)",
      "Your health and weight loss goals",
    ],
  },
  {
    title: "First visit duration",
    items: [
      "Plan for approximately 45-60 minutes",
      "Thorough health assessment",
      "Time for all your questions",
      "Leave with a clear plan",
    ],
  },
  {
    title: "After your visit",
    items: [
      "Prescription sent to your pharmacy (if appropriate)",
      "Written treatment plan provided",
      "Follow-up appointment scheduled",
      "Access to our patient support line",
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero — cream */}
      <section className="bg-cream pt-28 pb-14 md:pt-36 md:pb-20">
        <ScrollReveal>
          <div className="max-w-[1200px] mx-auto px-5 md:px-6 text-center">
            <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-5">
              Your Journey
            </p>
            <h1
              className="font-serif text-[clamp(2.5rem,5vw,3.75rem)] leading-[1.08] tracking-[-0.02em] text-navy"
              style={{ textWrap: "balance" }}
            >
              How it <em className="text-gold">works</em>
            </h1>
            <p className="mt-6 text-[16px] text-body leading-[1.7] max-w-2xl mx-auto">
              From your first consultation to lasting results — here&apos;s what to
              expect when you join Precision Weight + Wellness.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Journey Steps — white */}
      <section className="py-14 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6 space-y-16">
          {journey.map((step, i) => (
            <ScrollReveal key={step.num} delay={i * 100}>
              <div
                className={`grid grid-cols-1 lg:grid-cols-[100px_1fr] gap-10 items-start ${
                  i % 2 === 1 ? "lg:ml-12" : ""
                }`}
              >
                <p className="font-serif text-[clamp(2.5rem,5vw,3.5rem)] text-gold/30 leading-none tabular-nums">
                  {step.num}
                </p>
                <div className="border-l border-[rgba(27,42,74,0.06)] pl-10">
                  <h2 className="font-serif text-[clamp(1.75rem,3.5vw,2.25rem)] tracking-[-0.02em] text-navy">
                    {step.title}
                  </h2>
                  <p className="mt-5 text-[15px] text-body leading-[1.65]">
                    {step.desc}
                  </p>
                  <ul className="mt-8 space-y-3">
                    {step.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-start gap-3 text-[15px] text-body leading-[1.65]"
                      >
                        <span className="w-5 h-5 rounded-full bg-sage/12 flex items-center justify-center shrink-0 mt-0.5">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#7BAE8E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* What to Expect — cream */}
      <section className="py-14 md:py-24 bg-cream">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <ScrollReveal>
            <div className="max-w-xl mb-14">
              <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">
                First Visit
              </p>
              <h2
                className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-navy"
                style={{ textWrap: "balance" }}
              >
                What to expect at your <em className="text-gold">consultation</em>
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200} stagger={100}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {expectations.map((exp) => (
                <div key={exp.title} className="doppelrand doppelrand-light">
                  <div className="bg-white rounded-[18px] p-8 border border-[rgba(27,42,74,0.04)] card-hover h-full">
                    <h3 className="font-serif text-[20px] tracking-[-0.01em] text-navy mb-5">
                      {exp.title}
                    </h3>
                    <ul className="space-y-3">
                      {exp.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-[15px] text-body leading-[1.65]"
                        >
                          <span className="w-5 h-5 rounded-full bg-sage/12 flex items-center justify-center shrink-0 mt-0.5">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#7BAE8E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Ongoing Care — white */}
      <section className="py-14 md:py-24 bg-white">
        <ScrollReveal>
          <div className="max-w-[1200px] mx-auto px-5 md:px-6 text-center">
            <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">
              Ongoing Care
            </p>
            <h2
              className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-navy"
              style={{ textWrap: "balance" }}
            >
              You&apos;re never on your <em className="text-gold">own</em>
            </h2>
            <div className="mt-10 space-y-6 text-[15px] text-body leading-[1.65] text-left max-w-3xl mx-auto">
              <p>
                Weight management is a marathon, not a sprint. Our program is
                designed for long-term success, with regular physician check-ins,
                dose optimization, and ongoing lifestyle support. Dr. Rhee
                personally monitors every patient&apos;s progress and adjusts
                treatment plans as needed.
              </p>
              <p>
                As you approach your goal weight, we work with you to develop a
                maintenance strategy — including medication tapering protocols,
                sustainable nutrition habits, and exercise routines — so you can
                keep the weight off for good.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Pricing Teaser — cream */}
      <section className="py-14 md:py-24 bg-cream">
        <ScrollReveal>
          <div className="max-w-[1200px] mx-auto px-5 md:px-6 text-center">
            <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">
              Investment
            </p>
            <h2 className="font-serif text-[clamp(2rem,4vw,2.75rem)] leading-[1.1] tracking-[-0.02em] text-navy">
              Pricing &amp; <em className="text-gold">packages</em>
            </h2>
            <p className="mt-4 text-[16px] text-body leading-[1.7] max-w-2xl mx-auto">
              We offer flexible pricing options to make medically supervised
              weight management accessible. Contact us for current pricing
              details.
            </p>
            <div className="mt-8">
              <Link href="/pricing" className="btn-secondary">
                View Pricing
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* CTA — navy-deep */}
      <section className="py-14 md:py-24 bg-navy-deep text-center">
        <ScrollReveal>
          <div className="max-w-[680px] mx-auto px-5 md:px-6">
            <h2
              className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-white"
              style={{ textWrap: "balance" }}
            >
              Ready to get <em className="text-gold">started?</em>
            </h2>
            <p className="mt-4 text-[16px] text-white/60 leading-[1.7]">
              Take the first step. Schedule your consultation with Dr. Rhee today.
            </p>
            <div className="mt-8">
              <Link href="/book" className="btn-gold">
                Book Your Consultation
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
