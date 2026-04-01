import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Learn about our step-by-step medical weight management process — from initial consultation to ongoing GLP-1 therapy support with Dr. Libby Rhee.",
};

const journey = [
  {
    num: "01",
    title: "Initial Consultation",
    desc: "Your journey begins with a comprehensive one-on-one consultation with Dr. Rhee. During this visit, she will review your complete medical history, current medications, previous weight loss attempts, and overall health goals.",
    details: [
      "Full health assessment and lab review",
      "BMI and body composition analysis",
      "Discussion of GLP-1 medication options",
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
    desc: "Once your plan is in place, you'll begin your GLP-1 medication at a carefully calibrated starting dose. Dr. Rhee uses a gradual titration approach to minimize side effects and optimize your body's response.",
    details: [
      "First injection guidance and training",
      "What to expect in the first weeks",
      "Dietary tips for best results",
      "Direct line to our care team for questions",
    ],
  },
  {
    num: "04",
    title: "Ongoing Monitoring & Support",
    desc: "Regular check-ins ensure your treatment is working effectively and safely. Dr. Rhee monitors your progress, adjusts dosing as needed, and provides continuous support throughout your journey.",
    details: [
      "Monthly physician check-ins",
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
      {/* Hero */}
      <section className="relative pt-36 pb-24 bg-cream overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-wellness.png"
            alt=""
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-6">
            Your Journey
          </p>
          <h1
            className="font-serif text-5xl md:text-6xl leading-[1.08] tracking-tight text-soft-black"
            style={{ textWrap: "balance" }}
          >
            How it <span className="text-gold">works</span>
          </h1>
          <p className="mt-8 text-lg text-neutral-500 max-w-2xl mx-auto leading-relaxed">
            From your first consultation to lasting results — here&apos;s what to
            expect when you join Precision Weight + Wellness.
          </p>
        </div>
      </section>

      {/* Journey Steps */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6 space-y-20">
          {journey.map((step, i) => (
            <div
              key={step.num}
              className={`grid grid-cols-1 lg:grid-cols-[100px_1fr] gap-10 items-start ${
                i % 2 === 1 ? "lg:ml-12" : ""
              }`}
            >
              <p className="font-serif text-5xl text-gold/30 leading-none tabular-nums">{step.num}</p>
              <div className="border-l border-neutral-200 pl-10">
                <h2 className="font-serif text-3xl tracking-tight text-soft-black">
                  {step.title}
                </h2>
                <p className="mt-5 text-neutral-500 leading-relaxed">
                  {step.desc}
                </p>
                <ul className="mt-8 space-y-3">
                  {step.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-start gap-3 text-sm text-neutral-500"
                    >
                      <span className="text-gold mt-0.5 shrink-0">&#10003;</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mb-20">
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
              First Visit
            </p>
            <h2
              className="font-serif text-4xl md:text-5xl tracking-tight text-soft-black"
              style={{ textWrap: "balance" }}
            >
              What to expect at your consultation
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {expectations.map((exp) => (
              <div
                key={exp.title}
                className="bg-white p-10 rounded-2xl transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-y-[-2px] hover:shadow-[0_16px_40px_-12px_rgba(201,169,110,0.08)]"
              >
                <h3 className="font-serif text-xl text-soft-black mb-5">
                  {exp.title}
                </h3>
                <ul className="space-y-3">
                  {exp.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-neutral-500"
                    >
                      <span className="text-gold mt-0.5 shrink-0">&#10003;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ongoing Care */}
      <section className="relative py-32 bg-white overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-x-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-6">
            Ongoing Care
          </p>
          <h2
            className="font-serif text-4xl md:text-5xl tracking-tight text-soft-black"
            style={{ textWrap: "balance" }}
          >
            You&apos;re never on your own
          </h2>
          <div className="mt-10 space-y-6 text-neutral-500 leading-relaxed text-left max-w-3xl mx-auto">
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
      </section>

      {/* Pricing Teaser */}
      <section className="py-28 bg-cream">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
            Investment
          </p>
          <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-soft-black">
            Pricing & packages
          </h2>
          <p className="mt-6 text-neutral-500 leading-relaxed">
            We offer flexible pricing options to make medically supervised
            weight management accessible. Contact us for current pricing
            details.
          </p>
          <Link
            href="/pricing"
            className="inline-block mt-10 border border-neutral-300 text-neutral-600 hover:border-gold hover:text-gold text-sm tracking-wide uppercase px-8 py-4 rounded-full transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-y-[-1px]"
          >
            View Pricing
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 bg-soft-black text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-2xl mx-auto px-6">
          <h2
            className="font-serif text-4xl md:text-5xl tracking-tight text-white"
            style={{ textWrap: "balance" }}
          >
            Ready to get started?
          </h2>
          <p className="mt-6 text-neutral-400 leading-relaxed">
            Take the first step. Schedule your consultation with Dr. Rhee today.
          </p>
          <Link
            href="/book"
            className="inline-block mt-10 bg-gold hover:bg-gold-dark text-white text-sm tracking-wide uppercase px-10 py-4 rounded-full transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-y-[-1px] hover:shadow-[0_8px_24px_-8px_rgba(201,169,110,0.4)]"
          >
            Book Your Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
