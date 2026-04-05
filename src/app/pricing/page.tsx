import type { Metadata } from "next";
import Link from "next/link";

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
    image: "/images/package-essential.jpg",
    offeringId: "244715",
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
    image: "/images/package-premium.jpg",
    offeringId: "244716",
    features: [
      "Initial consultation included",
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
    image: "/images/package-concierge.jpg",
    offeringId: "244717",
    features: [
      "Initial consultation included",
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
            Investment in your health
          </p>
          <h1
            className="font-serif text-5xl md:text-6xl leading-[1.08] tracking-tight text-soft-black"
            style={{ textWrap: "balance" }}
          >
            Pricing & <span className="text-gold">packages</span>
          </h1>
          <p className="mt-8 text-lg text-neutral-500 max-w-2xl mx-auto leading-relaxed">
            Transparent, straightforward pricing for medically supervised weight
            management. No hidden fees, no surprises.
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}

      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`flex flex-col rounded-2xl overflow-hidden transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-y-[-2px] ${
                  tier.highlighted
                    ? "bg-soft-black text-white ring-2 ring-gold shadow-[0_24px_48px_-16px_rgba(0,0,0,0.2)]"
                    : "bg-cream hover:shadow-[0_16px_40px_-12px_rgba(201,169,110,0.08)]"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tier.image}
                  alt={`${tier.name} package`}
                  className="w-full h-48 object-cover"
                />
                <div className="flex flex-col flex-1 p-10">
                  <p className="text-[11px] tracking-[0.2em] uppercase text-gold mb-3">
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
                  <ul className="mt-8 space-y-3 flex-1">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className={`flex items-start gap-3 text-sm ${
                          tier.highlighted
                            ? "text-neutral-300"
                            : "text-neutral-500"
                        }`}
                      >
                        <span className="text-gold mt-0.5 shrink-0">&#10003;</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/book?tier=${tier.name.toLowerCase()}`}
                    className={`block text-center mt-10 text-sm tracking-wide uppercase px-6 py-3 rounded-full transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      tier.highlighted
                        ? "bg-gold hover:bg-gold-dark text-white hover:shadow-[0_8px_24px_-8px_rgba(201,169,110,0.4)]"
                        : "border border-neutral-300 text-neutral-600 hover:border-gold hover:text-gold"
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
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
      <section className="relative py-24 bg-cream overflow-hidden">
        <div className="absolute top-1/2 right-0 translate-x-1/3 -translate-y-1/2 w-[400px] h-[400px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
            Easy scheduling & payments
          </p>
          <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-soft-black">
            Powered by Healthie
          </h2>
          <p className="mt-6 text-neutral-500 leading-relaxed">
            Scheduling appointments and managing payments is simple and secure
            through our Healthie patient portal. You&apos;ll receive access
            after your initial consultation.
          </p>
          <Link
            href="/book"
            className="inline-block mt-10 border border-neutral-300 text-neutral-600 hover:border-gold hover:text-gold text-sm tracking-wide uppercase px-8 py-4 rounded-full transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-y-[-1px]"
          >
            Book an Appointment
          </Link>
        </div>
      </section>

      {/* FAQs — side-by-side layout */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-start">
            <div className="lg:sticky lg:top-32">
              <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
                Common questions
              </p>
              <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-soft-black">
                Pricing FAQs
              </h2>
            </div>
            <div className="space-y-10">
              {faqs.map((faq) => (
                <div key={faq.q} className="border-b border-neutral-100 pb-10 last:border-0">
                  <h3 className="font-serif text-lg text-soft-black">
                    {faq.q}
                  </h3>
                  <p className="mt-3 text-sm text-neutral-500 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
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
            Invest in your health today
          </h2>
          <p className="mt-6 text-neutral-400 leading-relaxed">
            Schedule a consultation to discuss which plan is right for you.
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
