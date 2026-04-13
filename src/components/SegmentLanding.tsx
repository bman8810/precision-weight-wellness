import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

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

export interface SegmentTestimonial {
  quote: string;
  name: string;
  location: string;
  detail: string;
}

export interface SegmentFAQ {
  q: string;
  a: string;
}

export interface SegmentStat {
  value: string;
  label: string;
}

export interface SegmentProps {
  /** URL slug for UTM tracking */
  slug: string;
  /** Hero section */
  hero: {
    badge: string;
    headline: string;
    headlineEmphasis: string;
    subheadline: string;
  };
  /** Emotional hook / empathy section */
  empathy: {
    badge: string;
    headline: string;
    headlineEmphasis: string;
    body: string;
    painPoints: string[];
  };
  /** Why this is different */
  differentiator: {
    badge: string;
    headline: string;
    headlineEmphasis: string;
    body: string;
    points: { title: string; desc: string }[];
  };
  /** Stats */
  stats: SegmentStat[];
  /** Testimonial */
  testimonial: SegmentTestimonial;
  /** Segment-specific FAQs */
  faqs: SegmentFAQ[];
  /** Final CTA */
  cta: {
    headline: string;
    headlineEmphasis: string;
    body: string;
    buttonText: string;
  };
}

export default function SegmentLanding({ data }: { data: SegmentProps }) {
  const bookUrl = `/book?utm_source=segment&utm_medium=landing&utm_campaign=${data.slug}`;
  const eligibilityUrl = `/eligibility?utm_source=segment&utm_medium=landing&utm_campaign=${data.slug}`;

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[85dvh] flex flex-col">
        <Image
          src="/images/doctor/libby-nyc-skyline.jpeg"
          alt="Dr. Libby Rhee with NYC skyline"
          fill
          className="object-cover object-[25%_top] md:object-[5%_top] opacity-[0.825] md:opacity-100"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/90 via-navy-deep/60 to-navy-deep/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-navy-deep/40" />

        <div className="relative flex-1 flex flex-col justify-center max-w-[1200px] mx-auto w-full px-5 md:px-6 pt-28 pb-20">
          <p
            className="animate-fade-up flex items-center gap-2 text-sage text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-6"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sage" />
            {data.hero.badge}
          </p>
          <h1
            className="animate-fade-up font-serif text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.08] tracking-[-0.02em] text-white max-w-2xl"
            style={{ animationDelay: "0.2s" }}
          >
            {data.hero.headline}
            <br />
            <em className="text-gold">{data.hero.headlineEmphasis}</em>
          </h1>
          <p
            className="animate-fade-up text-[16px] text-white/65 leading-[1.7] mt-6 max-w-lg"
            style={{ animationDelay: "0.35s" }}
          >
            {data.hero.subheadline}
          </p>
          <div
            className="animate-fade-up mt-8 flex flex-col sm:flex-row gap-3"
            style={{ animationDelay: "0.5s" }}
          >
            <Link href={bookUrl} className="btn-gold w-full sm:w-auto justify-center group">
              {data.cta.buttonText}
              <ArrowIcon className="text-navy-deep transition-transform duration-500 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href={eligibilityUrl}
              className="inline-flex items-center justify-center text-[15px] font-medium text-white/70 border border-white/25 rounded-full px-8 py-[15px] min-h-[48px] hover:bg-white/10 hover:text-white active:scale-[0.98] w-full sm:w-auto"
            >
              Check Eligibility
            </Link>
          </div>

          {/* Stats bar */}
          <div
            className="animate-fade-up mt-auto pt-16 flex flex-wrap gap-4 sm:gap-8 md:gap-12"
            style={{ animationDelay: "0.65s" }}
          >
            {data.stats.map((s, i) => (
              <div key={s.label} className={`${i > 0 ? "border-l border-white/15 pl-4 sm:pl-8 md:pl-12" : ""}`}>
                <p className="font-serif text-[clamp(18px,3.5vw,40px)] font-semibold tracking-[-0.03em] text-gold leading-[1]">
                  {s.value}
                </p>
                <p className="text-[9px] sm:text-[11px] uppercase tracking-[0.12em] text-white/45 mt-1.5 sm:mt-2">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Empathy Section ── */}
      <section className="py-14 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[72px] items-center">
              <div>
                <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">
                  {data.empathy.badge}
                </p>
                <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-[-0.02em] text-navy">
                  {data.empathy.headline}{" "}
                  <em className="text-gold">{data.empathy.headlineEmphasis}</em>
                </h2>
                <p className="text-[16px] text-body leading-[1.7] mt-5 max-w-md">
                  {data.empathy.body}
                </p>
                <ul className="mt-6 space-y-3">
                  {data.empathy.painPoints.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-sage/12 flex items-center justify-center shrink-0 mt-0.5">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#7BAE8E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-[15px] text-body leading-[1.6]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="doppelrand doppelrand-light">
                <div className="rounded-[16px] overflow-hidden">
                  <Image
                    src="/images/doctor/dr-rhee-figs.jpg"
                    alt="Dr. Rhee providing personalized care"
                    width={832}
                    height={1248}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Differentiator Section ── */}
      <section
        className="py-14 md:py-24"
        style={{ background: "linear-gradient(180deg, #1D5C4D 0%, #0F1D35 100%)" }}
      >
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">
                {data.differentiator.badge}
              </p>
              <h2 className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-white">
                {data.differentiator.headline}{" "}
                <em className="text-gold">{data.differentiator.headlineEmphasis}</em>
              </h2>
              <p className="text-[16px] text-white/60 leading-[1.7] mt-4 max-w-2xl mx-auto">
                {data.differentiator.body}
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200} stagger={100}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.differentiator.points.map((point) => (
                <div key={point.title} className="doppelrand doppelrand-dark">
                  <div className="bg-white/8 rounded-[18px] p-7 border border-white/10 card-hover h-full">
                    <h3 className="text-[16px] font-semibold tracking-[-0.01em] text-white">
                      {point.title}
                    </h3>
                    <p className="text-[15px] text-white/55 leading-[1.65] mt-2">
                      {point.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section className="bg-cream py-14 md:py-24">
        <ScrollReveal>
          <div className="max-w-[720px] mx-auto px-5 md:px-6 text-center">
            <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-8">
              Patient results
            </p>
            <div className="relative">
              <span className="absolute -top-6 -left-4 text-gold/15 font-serif text-[120px] leading-[1] select-none">
                &ldquo;
              </span>
              <blockquote>
                <p className="font-serif text-[clamp(1.5rem,3.5vw,2.25rem)] leading-[1.3] tracking-[-0.02em] text-navy italic">
                  {data.testimonial.quote}
                </p>
              </blockquote>
            </div>
            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center text-white text-[14px] font-semibold ring-2 ring-gold/20 ring-offset-2 ring-offset-cream">
                {data.testimonial.name.charAt(0)}
              </div>
              <div className="text-left">
                <p className="text-[15px] text-navy font-semibold">{data.testimonial.name}</p>
                <p className="text-[13px] text-light">{data.testimonial.location}</p>
              </div>
            </div>
            <p className="mt-3 text-[14px] text-body italic">
              {data.testimonial.detail}
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ── FAQs ── */}
      <section className="py-14 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-14 lg:gap-20 items-start">
            <ScrollReveal>
              <div className="lg:sticky lg:top-28">
                <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">
                  Common questions
                </p>
                <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-[-0.02em] text-navy">
                  Questions &amp; <em className="text-gold">answers</em>
                </h2>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <div className="space-y-6">
                {data.faqs.map((faq) => (
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

      {/* ── Final CTA ── */}
      <section className="relative py-14 md:py-28 bg-navy-deep text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <ScrollReveal>
          <div className="relative max-w-[680px] mx-auto px-5 md:px-6">
            <h2
              className="font-serif text-[clamp(2.5rem,5.5vw,4rem)] leading-[1.08] tracking-[-0.02em] text-white"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              {data.cta.headline}{" "}
              <em className="text-gold">{data.cta.headlineEmphasis}</em>
            </h2>
            <p className="mt-4 text-[16px] text-white/55 leading-[1.7]">
              {data.cta.body}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <Link href={bookUrl} className="btn-gold w-full sm:w-auto justify-center group">
                {data.cta.buttonText}
                <ArrowIcon className="text-navy-deep transition-transform duration-500 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href={eligibilityUrl}
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
