import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Pricing & Packages",
  description:
    "Explore our medical weight management pricing and packages. Cash-pay programs with flexible options for weight loss medication therapy.",
};

/* Cell renderer for comparison table */
function CellValue({ value }: { value: boolean | string }) {
  if (value === true)
    return (
      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-sage/12">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#7BAE8E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  if (value === false)
    return <span className="text-light text-[13px]">&mdash;</span>;
  return <span className="text-body text-[13px]">{value}</span>;
}

/* Reusable trailing arrow for CTAs */
function ArrowIcon({ className = "text-current" }: { className?: string }) {
  return (
    <span className={`ml-2 w-7 h-7 rounded-full bg-current/15 flex items-center justify-center ${className}`}>
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <path d="M3.5 8h9M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

const tiers = [
  {
    name: "Essential",
    monthlyPrice: "$199",
    quarterlyPrice: "$539",
    quarterlySavings: "Save $58",
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
    monthlyPrice: "$349",
    quarterlyPrice: "$939",
    quarterlySavings: "Save $108",
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
    monthlyPrice: "$599",
    quarterlyPrice: "$1,619",
    quarterlySavings: "Save $178",
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
    a: "Medication costs are separate from program fees. We\u2019ll help you understand your options \u2014 including insurance coverage, manufacturer savings programs, and pharmacy alternatives \u2014 to find the most cost-effective path.",
  },
  {
    q: "Do you accept insurance?",
    a: "Our program is cash-pay, but many insurers cover weight loss medications with prior authorization. We\u2019ll help you check your coverage and navigate the approval process.",
  },
  {
    q: "Can I cancel or switch plans?",
    a: "Yes. Monthly memberships can be cancelled at any time. Package plans are non-refundable but can be paused for medical reasons. Contact us to discuss your options.",
  },
];

const comparisonRows = [
  { feature: "Initial consultation", essential: true, premium: true, concierge: true },
  { feature: "Follow-up visits", essential: "1 / month", premium: "2 / month", concierge: "Unlimited" },
  { feature: "Medication management", essential: true, premium: true, concierge: true },
  { feature: "Prior authorization support", essential: true, premium: true, concierge: true },
  { feature: "Secure messaging", essential: "48-hr response", premium: "24-hr response", concierge: "Same-day" },
  { feature: "Lab work", essential: "Baseline + quarterly", premium: "Baseline + quarterly", concierge: "Comprehensive quarterly" },
  { feature: "Body composition tracking", essential: true, premium: "Quarterly analysis", concierge: "Quarterly analysis" },
  { feature: "B12 / lipotropic injections", essential: false, premium: "Monthly ($45 value)", concierge: "Weekly ($180+ value)" },
  { feature: "Nutritional counseling", essential: false, premium: true, concierge: true },
  { feature: "Priority scheduling", essential: false, premium: false, concierge: "Same-week guaranteed" },
  { feature: "Direct physician access", essential: false, premium: false, concierge: "Business hours ($150+ value)" },
  { feature: "Add-on service discount", essential: false, premium: false, concierge: "20% off" },
  { feature: "Estimated monthly value", essential: "$275+", premium: "$500+", concierge: "$900+" },
];

export default function PricingPage() {
  return (
    <>
      {/* ── Hero — navy ── */}
      <section className="relative pt-20 overflow-hidden" style={{ background: "linear-gradient(180deg, #163D3A 0%, #1B2A4A 100%)" }}>
        <div className="absolute inset-0 opacity-[0.08]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/headers/pricing-header.jpg" alt="" className="w-full h-full object-cover" aria-hidden="true" />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-5 md:px-6 pt-14 pb-14 md:pt-28 md:pb-28">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto">
              <p
                className="animate-fade-up flex items-center justify-center gap-2 text-sage text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-6"
                style={{ animationDelay: "0.1s" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                Investment in your health
              </p>
              <h1
                className="animate-fade-up font-serif text-[clamp(2.75rem,5.5vw,4.25rem)] leading-[1.08] tracking-[-0.02em] text-white"
                style={{ animationDelay: "0.2s" }}
              >
                Pricing &amp; <em className="text-gold">packages</em>
              </h1>
              <p
                className="animate-fade-up text-[16px] text-white/60 leading-[1.7] mt-6 max-w-xl mx-auto"
                style={{ animationDelay: "0.35s" }}
              >
                Transparent, straightforward pricing for medically supervised weight
                management. No hidden fees, no surprises.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Pricing Tiers — cream ── */}
      <section className="py-14 md:py-28 bg-cream">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <ScrollReveal stagger={120}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-5 items-start lg:items-center">
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className={
                    tier.highlighted
                      ? "lg:scale-[1.04] lg:z-10 relative"
                      : "doppelrand doppelrand-light"
                  }
                >
                  <div
                    className={`flex flex-col overflow-hidden h-full rounded-[20px] ${
                      tier.highlighted
                        ? "bg-navy text-white ring-2 ring-gold shadow-[0_40px_80px_-20px_rgba(27,42,74,0.35)]"
                        : "bg-white border border-[rgba(27,42,74,0.04)] card-hover"
                    }`}
                  >
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={tier.image}
                        alt={`${tier.name} package`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                        priority
                      />
                      {tier.highlighted && (
                        <div className="absolute top-4 right-4 bg-gold text-navy-deep text-[9px] font-bold uppercase tracking-[0.14em] px-3 py-1.5 rounded-full shadow-[0_4px_12px_rgba(201,169,110,0.3)]">
                          Most Popular
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-8 md:p-10">
                      <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">
                        {tier.name}
                      </p>
                      <p
                        className={`font-serif text-[clamp(2.25rem,4.5vw,3rem)] tracking-[-0.03em] leading-[1] ${
                          tier.highlighted ? "text-white" : "text-navy"
                        }`}
                      >
                        {tier.monthlyPrice}
                      </p>
                      <p className={`text-[13px] mt-1.5 ${tier.highlighted ? "text-white/40" : "text-light"}`}>
                        {tier.period}
                      </p>
                      <div className={`mt-3 px-3 py-2 rounded-xl ${tier.highlighted ? "bg-white/8" : "bg-cream/80"}`}>
                        <p className={`text-[13px] font-medium ${tier.highlighted ? "text-gold" : "text-navy"}`}>
                          {tier.quarterlyPrice}<span className={`text-[12px] font-normal ${tier.highlighted ? "text-white/40" : "text-light"}`}> / quarter</span>
                        </p>
                        <p className="text-[11px] text-sage font-semibold mt-0.5">{tier.quarterlySavings}</p>
                      </div>

                      {tier.includes && (
                        <p className="mt-8 mb-4 text-[13px] font-semibold italic text-gold">
                          {tier.includes}
                        </p>
                      )}

                      <ul className={`${tier.includes ? "" : "mt-8 "}space-y-3 flex-1`}>
                        {tier.features.map((feature) => (
                          <li
                            key={feature}
                            className={`flex items-start gap-3 text-[14px] leading-[1.6] ${
                              tier.highlighted ? "text-white/60" : "text-body"
                            }`}
                          >
                            <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${tier.highlighted ? "bg-sage/20" : "bg-sage/12"}`}>
                              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
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
                          className={`block text-center w-full group ${
                            tier.highlighted ? "btn-gold" : "btn-secondary"
                          }`}
                        >
                          <span className="inline-flex items-center">
                            Get Started
                            {tier.highlighted && (
                              <ArrowIcon className="text-navy-deep transition-transform duration-500 group-hover:translate-x-0.5" />
                            )}
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <p className="text-center mt-10 text-[12px] text-light">
            Prices are subject to change. Contact us for the most current pricing information.
          </p>
        </div>
      </section>

      {/* ── Feature Comparison — navy-deep ── */}
      <section className="py-14 md:py-28 bg-navy-deep">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">Compare plans</p>
              <h2 className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-white">
                Feature <em className="text-gold">breakdown</em>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="doppelrand doppelrand-dark overflow-hidden">
              <div className="bg-white/[0.06] rounded-[18px] overflow-x-auto border border-white/8">
                <table className="w-full text-left min-w-[640px]">
                  <thead>
                    <tr className="border-b border-gold/30">
                      <th className="py-4 px-6 text-[13px] font-semibold text-white/70 w-[40%]">Feature</th>
                      <th className="py-4 px-4 text-center text-[13px] font-semibold text-white/50">Essential</th>
                      <th className="py-4 px-4 text-center text-[13px] font-semibold text-gold">Premium</th>
                      <th className="py-4 px-4 text-center text-[13px] font-semibold text-white/50">Concierge</th>
                    </tr>
                  </thead>
                  <tbody className="text-[14px]">
                    {comparisonRows.map((row, i) => (
                      <tr key={row.feature} className={i % 2 === 0 ? "bg-white/[0.02]" : ""}>
                        <td className="py-3.5 px-6 text-white/80 font-medium">{row.feature}</td>
                        <td className="py-3.5 px-4 text-center">
                          <DarkCellValue value={row.essential} />
                        </td>
                        <td className="py-3.5 px-4 text-center bg-gold/[0.06]">
                          <DarkCellValue value={row.premium} highlight />
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <DarkCellValue value={row.concierge} />
                        </td>
                      </tr>
                    ))}
                    <tr className="border-t border-white/10">
                      <td className="py-5 px-6 font-serif text-[16px] text-white font-semibold">Monthly price</td>
                      <td className="py-5 px-4 text-center font-serif text-[20px] text-white/70 font-semibold">$199</td>
                      <td className="py-5 px-4 text-center bg-gold/[0.06] font-serif text-[22px] text-gold font-semibold">$349</td>
                      <td className="py-5 px-4 text-center font-serif text-[20px] text-white/70 font-semibold">$599</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 text-[14px] text-white/60">Quarterly price <span className="text-sage text-[11px] ml-1">save ~10%</span></td>
                      <td className="py-4 px-4 text-center font-serif text-[18px] text-white/50 font-semibold">$539</td>
                      <td className="py-4 px-4 text-center bg-gold/[0.06] font-serif text-[20px] text-gold/80 font-semibold">$939</td>
                      <td className="py-4 px-4 text-center font-serif text-[18px] text-white/50 font-semibold">$1,619</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Scheduling — cream ── */}
      <section className="py-14 md:py-28 bg-cream">
        <ScrollReveal>
          <div className="max-w-[800px] mx-auto px-5 md:px-6">
            <div className="doppelrand doppelrand-light">
              <div className="bg-white rounded-[18px] border border-[rgba(27,42,74,0.04)] p-10 md:p-14 text-center">
                <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">
                  Easy scheduling &amp; payments
                </p>
                <h2 className="font-serif text-[clamp(2rem,4vw,2.75rem)] leading-[1.1] tracking-[-0.02em] text-navy">
                  Seamless <em className="text-gold">scheduling</em>
                </h2>
                <p className="mt-4 text-[16px] text-body leading-[1.7] max-w-xl mx-auto">
                  Scheduling appointments and managing payments is simple and secure
                  through our patient portal. You&apos;ll receive access
                  after your initial consultation.
                </p>
                <div className="mt-8">
                  <Link href="/book" className="btn-primary group">
                    Book an Appointment
                    <ArrowIcon className="text-white transition-transform duration-500 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── FAQs — white ── */}
      <section className="py-14 md:py-28 bg-white">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-14 lg:gap-20 items-start">
            <ScrollReveal>
              <div className="lg:sticky lg:top-28">
                <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">
                  Common questions
                </p>
                <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-[-0.02em] text-navy">
                  Pricing <em className="text-gold">FAQs</em>
                </h2>
                <p className="mt-4 text-[15px] text-body leading-[1.65]">
                  Everything you need to know about our plans, payments, and insurance.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <div className="space-y-6">
                {faqs.map((faq) => (
                  <div key={faq.q} className="doppelrand doppelrand-light">
                    <div className="bg-white rounded-[18px] border border-[rgba(27,42,74,0.04)] p-7 card-hover">
                      <h3 className="font-serif text-[18px] tracking-[-0.01em] text-navy">
                        {faq.q}
                      </h3>
                      <p className="mt-3 text-[15px] text-body leading-[1.65]">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── CTA — navy-deep ── */}
      <section className="relative py-14 md:py-28 bg-navy-deep text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <ScrollReveal>
          <div className="relative max-w-[680px] mx-auto px-5 md:px-6">
            <h2
              className="font-serif text-[clamp(2.5rem,5.5vw,4rem)] leading-[1.08] tracking-[-0.02em] text-white"
              style={{ textWrap: "balance" }}
            >
              Invest in your <em className="text-gold">health</em>
            </h2>
            <p className="mt-4 text-[16px] text-white/55 leading-[1.7]">
              Schedule a consultation to discuss which plan is right for you.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/book" className="btn-gold w-full sm:w-auto justify-center group">
                Book Your Consultation
                <ArrowIcon className="text-navy-deep transition-transform duration-500 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/eligibility"
                className="inline-flex items-center justify-center text-[15px] font-medium text-white/60 border border-white/20 rounded-full px-8 py-[15px] min-h-[48px] hover:bg-white/8 hover:text-white active:scale-[0.98] w-full sm:w-auto"
              >
                Check Eligibility
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}

/* Dark-mode cell renderer for navy-deep comparison table */
function DarkCellValue({ value, highlight }: { value: boolean | string; highlight?: boolean }) {
  if (value === true)
    return (
      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-sage/20">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#7BAE8E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  if (value === false)
    return <span className="text-white/20 text-[13px]">&mdash;</span>;
  return <span className={`text-[13px] ${highlight ? "text-gold/80" : "text-white/55"}`}>{value}</span>;
}
