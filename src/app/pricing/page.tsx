import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing & Packages",
  description:
    "Explore our medical weight management pricing and packages. Cash-pay programs with flexible options for GLP-1 therapy.",
};

const tiers = [
  {
    name: "Essential",
    price: "$199",
    period: "per month",
    features: [
      "1 follow-up visit per month (in-person or virtual, 15–20 min)",
      "Medication management and prescriptions",
      "Prior authorization support",
      "Secure messaging (48-hour response)",
      "Baseline + quarterly labs",
      "Body composition tracking",
    ],
    highlighted: false,
  },
  {
    name: "Premium",
    price: "$349",
    period: "per month",
    features: [
      "2 follow-up visits per month",
      "Monthly B12 injection (in-office)",
      "Nutritional counseling resources",
      "Same-day secure messaging (24-hour response)",
      "Quarterly body composition analysis",
    ],
    highlighted: true,
  },
  {
    name: "Concierge",
    price: "$599",
    period: "per month",
    features: [
      "Unlimited virtual check-ins",
      "Weekly B12 or lipotropic injection",
      "Priority scheduling (same-week guaranteed)",
      "Direct access to Dr. Rhee (within business hours)",
      "Quarterly comprehensive lab panel included",
      "20% discount on all add-on services",
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`flex flex-col h-full p-8 rounded-xl ${
                  tier.highlighted
                    ? "bg-soft-black text-white ring-2 ring-gold"
                    : "bg-cream"
                }`}
              >
                <p className="text-xs tracking-[0.2em] uppercase mb-2 text-gold">
                  {tier.name}
                </p>
                <p
                  className={`font-serif text-4xl ${
                    tier.highlighted ? "text-white" : "text-soft-black"
                  }`}
                >
                  {tier.price}
                </p>
                <p className="text-sm mt-1 text-neutral-400">
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
                <div className="mt-auto pt-8">
                  <Link
                    href="/contact"
                    className={`block text-center text-sm tracking-wide uppercase px-6 py-3 rounded-full transition-colors ${
                      tier.highlighted
                        ? "bg-gold hover:bg-gold-dark text-white"
                        : "border border-neutral-300 text-neutral-600 hover:border-gold hover:text-gold"
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-sm text-gold font-medium">
            Founding member rate: First 20 patients receive 20% off for life.
          </p>
          <p className="text-center mt-3 text-sm text-neutral-400">
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
