import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing & Packages",
  description:
    "Explore our medical weight management pricing and packages. Cash-pay programs with flexible options for GLP-1 therapy.",
};

const tiers = [
  {
    name: "Initial Consultation",
    price: "[TBD]",
    period: "one-time",
    features: [
      "Comprehensive health assessment",
      "BMI and body composition analysis",
      "Lab review and medication evaluation",
      "Personalized treatment plan",
      "Insurance coverage guidance",
    ],
    highlighted: false,
  },
  {
    name: "Monthly Membership",
    price: "[TBD]",
    period: "per month",
    features: [
      "Monthly physician check-in",
      "Prescription management",
      "Dose adjustments as needed",
      "Nutritional guidance",
      "Direct access to care team",
      "Lab monitoring",
    ],
    highlighted: true,
  },
  {
    name: "3-Month Package",
    price: "[TBD]",
    period: "3 months",
    features: [
      "Everything in Monthly Membership",
      "Discounted rate",
      "Priority scheduling",
      "Extended consultations",
      "Progress tracking & reporting",
    ],
    highlighted: false,
  },
  {
    name: "6-Month Package",
    price: "[TBD]",
    period: "6 months",
    features: [
      "Everything in Monthly Membership",
      "Best value — significant savings",
      "Priority scheduling",
      "Extended consultations",
      "Comprehensive progress reports",
      "Maintenance planning included",
    ],
    highlighted: false,
  },
];

const faqs = [
  {
    q: "What does the program fee include?",
    a: "Our program fees cover physician consultations, treatment planning, dosing management, nutritional guidance, and ongoing monitoring. Medication costs are separate and may be covered by your insurance.",
  },
  {
    q: "Is the medication included in the price?",
    a: "Medication costs are separate from program fees. We'll help you understand your options — including insurance coverage, manufacturer savings programs, and pharmacy alternatives — to find the most cost-effective path.",
  },
  {
    q: "Do you accept insurance?",
    a: "Our program is cash-pay, but many insurers cover GLP-1 medications with prior authorization. We'll help you check your coverage and navigate the approval process.",
  },
  {
    q: "Can I cancel or switch plans?",
    a: "Yes. Monthly memberships can be cancelled at any time. Package plans are non-refundable but can be paused for medical reasons. Contact us to discuss your options.",
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-cream">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">
            Investment in Your Health
          </p>
          <h1 className="font-serif text-5xl md:text-6xl leading-tight text-soft-black">
            Pricing & <span className="text-gold">Packages</span>
          </h1>
          <p className="mt-6 text-lg text-neutral-500 max-w-2xl mx-auto leading-relaxed">
            Transparent, straightforward pricing for medically supervised weight
            management. No hidden fees, no surprises.
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`p-8 rounded-xl ${
                  tier.highlighted
                    ? "bg-soft-black text-white ring-2 ring-gold"
                    : "bg-cream"
                }`}
              >
                <p
                  className={`text-xs tracking-[0.2em] uppercase mb-2 ${
                    tier.highlighted ? "text-gold" : "text-gold"
                  }`}
                >
                  {tier.name}
                </p>
                <p
                  className={`font-serif text-4xl ${
                    tier.highlighted ? "text-white" : "text-soft-black"
                  }`}
                >
                  {tier.price}
                </p>
                <p
                  className={`text-sm mt-1 ${
                    tier.highlighted ? "text-neutral-400" : "text-neutral-400"
                  }`}
                >
                  {tier.period}
                </p>
                <ul className="mt-6 space-y-3">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-start gap-3 text-sm ${
                        tier.highlighted
                          ? "text-neutral-300"
                          : "text-neutral-500"
                      }`}
                    >
                      <span className="text-gold mt-0.5">&#10003;</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`block text-center mt-8 text-sm tracking-wide uppercase px-6 py-3 rounded-full transition-colors ${
                    tier.highlighted
                      ? "bg-gold hover:bg-gold-dark text-white"
                      : "border border-neutral-300 text-neutral-600 hover:border-gold hover:text-gold"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-sm text-neutral-400">
            Prices are subject to change. Contact us for the most current
            pricing information.
          </p>
        </div>
      </section>

      {/* Healthie Note */}
      <section className="py-16 bg-cream">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">
            Easy Scheduling & Payments
          </p>
          <h2 className="font-serif text-3xl text-soft-black">
            Powered by Healthie
          </h2>
          <p className="mt-4 text-neutral-500 leading-relaxed">
            Scheduling appointments and managing payments is simple and secure
            through our Healthie patient portal. You&apos;ll receive access
            after your initial consultation.
          </p>
          <a
            href="https://app.gethealthie.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 border border-neutral-300 text-neutral-600 hover:border-gold hover:text-gold text-sm tracking-wide uppercase px-8 py-4 rounded-full transition-colors"
          >
            Visit Patient Portal
          </a>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">
              Common Questions
            </p>
            <h2 className="font-serif text-4xl text-soft-black">
              Pricing FAQs
            </h2>
          </div>
          <div className="space-y-8">
            {faqs.map((faq) => (
              <div key={faq.q}>
                <h3 className="font-serif text-lg text-soft-black">
                  {faq.q}
                </h3>
                <p className="mt-2 text-sm text-neutral-500 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-soft-black text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-serif text-4xl text-white">
            Invest in Your Health Today
          </h2>
          <p className="mt-4 text-neutral-400 leading-relaxed">
            Schedule a consultation to discuss which plan is right for you.
          </p>
          <Link
            href="/contact"
            className="inline-block mt-8 bg-gold hover:bg-gold-dark text-white text-sm tracking-wide uppercase px-10 py-4 rounded-full transition-colors"
          >
            Book Your Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
