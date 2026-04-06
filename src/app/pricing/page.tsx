import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Pricing & Packages",
  description:
    "Explore our medical weight management pricing and packages. Cash-pay programs with flexible options for weight loss medication therapy.",
};

const tiers = [
  {
    name: "Essential",
    price: "$199",
    period: "per month",
    image: "/images/packages/package-essential.jpg",
    offeringId: "244715",
    includes: null,
    features: [
      "Initial consultation included",
      "1 follow-up visit per month (in-person or virtual, 15\u201320 min)",
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
    image: "/images/packages/package-premium.jpg",
    offeringId: "244716",
    includes: "Everything in Essential, plus:",
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
    image: "/images/packages/package-concierge.jpg",
    offeringId: "244717",
    includes: "Everything in Premium, plus:",
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
    a: "Our program is cash-pay, but many insurers cover weight loss medications with prior authorization. We'll help you check your coverage and navigate the approval process.",
  },
  {
    q: "Can I cancel or switch plans?",
    a: "Yes. Monthly memberships can be cancelled at any time. Package plans are non-refundable but can be paused for medical reasons. Contact us to discuss your options.",
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Hero — cream */}
      <section className="bg-cream pt-28 pb-14 md:pt-36 md:pb-20">
        <ScrollReveal>
          <div className="max-w-[1200px] mx-auto px-5 md:px-6 text-center">
            <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-5">
              Investment in your health
            </p>
            <h1
              className="font-serif text-[clamp(2.5rem,5vw,3.75rem)] leading-[1.08] tracking-[-0.02em] text-navy"
              style={{ textWrap: "balance" }}
            >
              Pricing &amp; <em className="text-gold">packages</em>
            </h1>
            <p className="mt-6 text-[16px] text-body leading-[1.7] max-w-2xl mx-auto">
              Transparent, straightforward pricing for medically supervised weight
              management. No hidden fees, no surprises.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Pricing Tiers — white */}
      <section className="py-14 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <ScrollReveal stagger={120}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className={
                    tier.highlighted
                      ? "rounded-2xl overflow-hidden"
                      : "doppelrand doppelrand-light"
                  }
                >
                  <div
                    className={`flex flex-col overflow-hidden h-full ${
                      tier.highlighted
                        ? "bg-navy text-white rounded-2xl ring-2 ring-gold shadow-[0_24px_48px_-16px_rgba(27,42,74,0.25)]"
                        : "bg-white rounded-[18px] border border-[rgba(27,42,74,0.04)] card-hover"
                    }`}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={tier.image}
                        alt={`${tier.name} package`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col flex-1 p-10">
                      <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">
                        {tier.name}
                      </p>
                      <p
                        className={`font-serif text-[clamp(2rem,4vw,2.5rem)] tracking-[-0.02em] ${
                          tier.highlighted ? "text-white" : "text-navy"
                        }`}
                      >
                        {tier.price}
                      </p>
                      <p className="text-[13px] mt-1 text-light">
                        {tier.period}
                      </p>
                      {tier.includes && (
                        <p className={`mt-8 mb-4 text-[13px] font-medium ${tier.highlighted ? "text-gold" : "text-gold"}`}>
                          {tier.includes}
                        </p>
                      )}
                      <ul className={`${tier.includes ? "" : "mt-8 "}space-y-3 flex-1`}>
                        {tier.features.map((feature) => (
                          <li
                            key={feature}
                            className={`flex items-start gap-3 text-[15px] leading-[1.65] ${
                              tier.highlighted
                                ? "text-white/65"
                                : "text-body"
                            }`}
                          >
                            <span className="w-5 h-5 rounded-full bg-sage/12 flex items-center justify-center shrink-0 mt-0.5">
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#7BAE8E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-10">
                        <Link
                          href={`/book?tier=${tier.name.toLowerCase()}`}
                          className={`block text-center w-full ${
                            tier.highlighted
                              ? "btn-gold"
                              : "btn-secondary"
                          }`}
                        >
                          Get Started
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <p className="text-center mt-8 text-[13px] text-light">
            Prices are subject to change. Contact us for the most current
            pricing information.
          </p>
        </div>
      </section>

      {/* Scheduling — cream */}
      <section className="py-14 md:py-24 bg-cream">
        <ScrollReveal>
          <div className="max-w-[1200px] mx-auto px-5 md:px-6 text-center">
            <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">
              Easy scheduling &amp; payments
            </p>
            <h2 className="font-serif text-[clamp(2rem,4vw,2.75rem)] leading-[1.1] tracking-[-0.02em] text-navy">
              Seamless <em className="text-gold">scheduling</em>
            </h2>
            <p className="mt-4 text-[16px] text-body leading-[1.7] max-w-2xl mx-auto">
              Scheduling appointments and managing payments is simple and secure
              through our patient portal. You&apos;ll receive access
              after your initial consultation.
            </p>
            <div className="mt-8">
              <Link href="/book" className="btn-secondary">
                Book an Appointment
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* FAQs — white */}
      <section className="py-14 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-start">
            <ScrollReveal>
              <div className="lg:sticky lg:top-32">
                <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">
                  Common questions
                </p>
                <h2 className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-navy">
                  Pricing <em className="text-gold">FAQs</em>
                </h2>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <div className="space-y-10">
                {faqs.map((faq) => (
                  <div key={faq.q} className="border-b border-[rgba(27,42,74,0.04)] pb-10 last:border-0">
                    <h3 className="font-serif text-[18px] tracking-[-0.01em] text-navy">
                      {faq.q}
                    </h3>
                    <p className="mt-3 text-[15px] text-body leading-[1.65]">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA — navy-deep */}
      <section className="py-14 md:py-24 bg-navy-deep text-center">
        <ScrollReveal>
          <div className="max-w-[680px] mx-auto px-5 md:px-6">
            <h2
              className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-white"
              style={{ textWrap: "balance" }}
            >
              Invest in your <em className="text-gold">health</em> today
            </h2>
            <p className="mt-4 text-[16px] text-white/60 leading-[1.7]">
              Schedule a consultation to discuss which plan is right for you.
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
