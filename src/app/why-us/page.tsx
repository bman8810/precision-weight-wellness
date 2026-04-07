import type { Metadata } from "next";
import Link from "next/link";
import { ComparisonTable } from "./ComparisonTable";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Why Choose Us | Medical Weight Loss That's Actually Medical",
  description:
    "Discover what makes Precision Weight + Wellness different: board-certified physician Dr. Libby Rhee, personalized 1:1 care, a real NYC medical office, and treatment plans created by a doctor — not an algorithm.",
};

const differentiators = [
  {
    title: "Your doctor has a name",
    desc: "Dr. Libby Rhee, DO, MS, FAAD — board-certified, Mount Sinai clinical instructor, and thousands of five-star patient reviews. She does not hand your case to an algorithm or a nurse practitioner. She is your physician from consultation through maintenance.",
  },
  {
    title: "One physician, one patient, one plan",
    desc: "Every treatment protocol is created by Dr. Rhee personally after reviewing your medical history, lab results, and goals. No templated questionnaires. No auto-generated protocols. Medicine the way it was meant to be practiced.",
  },
  {
    title: "A real medical office, not just an app",
    desc: "We practice in-person and remotely across New York, Connecticut, and Michigan. Whether you prefer a private office visit or a telehealth consultation, you always have the option to be seen face-to-face.",
  },
  {
    title: "Medical credibility you can verify",
    desc: "Board-certified by the American Board of Dermatology. Fellow of the American Academy of Dermatology. Clinical Instructor at Mount Sinai Icahn School of Medicine. These are not marketing claims — they are verifiable credentials.",
  },
  {
    title: "The whole person, not just the prescription",
    desc: "Medication is the foundation, but your plan includes nutritional guidance, lifestyle modification, metabolic monitoring, and behavioral support. We treat the person, not just the number on the scale.",
  },
  {
    title: "AI-powered, physician-led",
    desc: "We leverage advanced AI tools to find the best solutions for your unique situation — so Dr. Rhee can spend more time on what matters: you. Technology serves the physician, not the other way around.",
  },
];

const contrasts = [
  {
    label: "Your physician",
    elsewhere:
      "Assigned provider you have never met, or algorithm-generated care plan",
    here: "Dr. Libby Rhee — your physician from day one through maintenance, board-certified with Mount Sinai affiliation",
    expanded: [
      "Dr. Rhee personally reviews every patient chart before each visit",
      "Board-certified (DO, MS, FAAD) with thousands of five-star reviews",
      "Clinical Instructor at Mount Sinai Icahn School of Medicine",
      "Direct communication — not a chatbot or assistant",
    ],
  },
  {
    label: "Your care plan",
    elsewhere:
      "Templated protocol based on a short online questionnaire",
    here: "Individually designed treatment plan based on comprehensive health assessment, lab review, and in-person evaluation",
    expanded: [
      "Full health assessment including lab work and body composition analysis",
      "Medication selection tailored to your biology and health history",
      "Custom dosing schedule with gradual titration to minimize side effects",
      "Nutritional guidance and lifestyle recommendations built around your routine",
      "Regular plan adjustments based on your response and progress",
    ],
  },
  {
    label: "Medication management",
    elsewhere:
      "Auto-refill prescriptions with periodic check-in surveys",
    here: "Physician-monitored dosing with regular adjustments based on your response, labs, and side effect profile",
    expanded: [
      "Dr. Rhee evaluates multiple FDA-approved medication options for your situation",
      "Dosing is calibrated to your tolerance — not a one-size-fits-all schedule",
      "Side effect management strategies discussed proactively",
      "Lab monitoring to ensure safety and track metabolic improvements",
      "Medication changes made based on clinical data, not automated protocols",
    ],
  },
  {
    label: "Support model",
    elsewhere:
      "Chat-based coaching, community forums, or AI-generated responses",
    here: "Direct access to your physician and care team, secure messaging with human response, priority scheduling",
    expanded: [
      "Secure messaging with a real human response",
      "Priority scheduling for follow-ups and urgent questions",
      "Coordination with your other physicians (endocrinologist, PCP, etc.)*",
      "Nutritional coaching and accountability built into every check-in*",
      "* Premium and Concierge package members",
    ],
  },
  {
    label: "Setting",
    elsewhere:
      "App-only or telehealth-only — no option to be seen in person",
    here: "Private medical office with in-person and telehealth flexibility across multiple locations",
    expanded: [
      "In-person visits available in New York City and Middletown, NY",
      "Telehealth available across New York, Connecticut, and Michigan",
      "You choose the format that works best for each visit",
      "Same quality of care whether in-office or virtual",
    ],
  },
  {
    label: "Continuity",
    elsewhere:
      "Different provider each visit, or no provider at all",
    here: "Same physician, every visit — Dr. Rhee personally monitors your entire journey",
    expanded: [
      "Dr. Rhee sees you at every visit — no hand-offs to other providers",
      "She knows your history, your progress, and your goals",
      "Long-term maintenance planning so you keep the weight off",
      "Relationship-based care that builds trust over time",
    ],
  },
];

const rightFor = [
  "You want a named physician managing your care, not an app or algorithm",
  "You value in-person medical evaluations, not just telehealth questionnaires",
  "You have tried other weight loss approaches without lasting success",
  "You want a treatment plan tailored to your specific biology and health history",
  "You prefer a private, premium medical setting",
];

const otherOption = [
  "You are looking for the lowest-cost option above all else",
  "You prefer a fully self-directed app-based program",
  "You do not need or want regular physician involvement",
  "You are looking for medication only, without comprehensive medical oversight",
];

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

export default function WhyUsPage() {
  return (
    <>
      {/* ── Hero — editorial split ── */}
      <section className="relative bg-cream overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6 pt-36 pb-20 md:pt-44 md:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
            <div className="lg:col-span-7">
              <ScrollReveal>
                <span className="inline-flex items-center gap-2 rounded-full bg-navy/5 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.2em] font-semibold text-navy/60 mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  The Precision Difference
                </span>
                <h1
                  className="font-serif text-[clamp(2.75rem,5.5vw,4.25rem)] leading-[1.06] tracking-[-0.025em] text-navy"
                  style={{ textWrap: "balance" }}
                >
                  What changes when your doctor actually{" "}
                  <em className="text-gold">knows your name</em>
                </h1>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-5">
              <ScrollReveal delay={150}>
                <p className="text-[17px] text-body leading-[1.75] lg:pb-2">
                  Most weight loss programs are built on algorithms, chatbots, and
                  one-size-fits-all protocols. Precision Weight + Wellness is built on
                  something different: a named physician, a real medical office, and a
                  plan created for you alone.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
        {/* Decorative divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-navy/8 to-transparent" />
      </section>

      {/* ── The Problem — navy deep ── */}
      <section className="relative bg-navy-deep py-24 md:py-36 overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/[0.03] rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-[1200px] mx-auto px-5 md:px-6">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.2em] font-semibold text-white/40 mb-8">
                The landscape today
              </span>
              <h2
                className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-white"
                style={{ textWrap: "balance" }}
              >
                Weight loss has become an industry. We think it should be{" "}
                <em className="text-gold">medicine.</em>
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
              {[
                {
                  label: "Telehealth startups",
                  text: "Dispense medications after a five-minute questionnaire. No physical exam. No relationship.",
                },
                {
                  label: "Subscription apps",
                  text: "Assign you to a chat-based \u201Ccoach\u201D you will never meet. Community when what you need is clinical expertise.",
                },
                {
                  label: "Celebrity programs",
                  text: "Sell branding and hype. When what matters is board-certified medical judgment and verifiable credentials.",
                },
              ].map((item, i) => (
                <div key={i} className="doppelrand doppelrand-dark">
                  <div className="bg-white/[0.03] rounded-[18px] p-7 border border-white/[0.06] h-full">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-gold/60 mb-4">{item.label}</p>
                    <p className="text-[15px] text-white/50 leading-[1.7]">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={350}>
            <p className="mt-14 text-center text-[18px] font-serif text-gold tracking-[-0.01em]">
              That is why Precision Weight + Wellness exists.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Six Differentiators — asymmetric bento ── */}
      <section className="bg-cream py-24 md:py-36">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <ScrollReveal>
            <div className="max-w-xl mb-16 md:mb-20">
              <span className="inline-flex items-center gap-2 rounded-full bg-navy/5 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.2em] font-semibold text-navy/60 mb-6">
                Why patients choose us
              </span>
              <h2
                className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-navy"
                style={{ textWrap: "balance" }}
              >
                Six things you will not find{" "}
                <em className="text-gold">anywhere else</em>
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={150} stagger={80}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              {/* Featured card — spans 8 cols */}
              <div className="md:col-span-8 doppelrand doppelrand-light">
                <div className="bg-white rounded-[18px] p-8 md:p-10 border border-[rgba(27,42,74,0.04)] card-hover h-full">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-gold mb-5">01</p>
                  <h3 className="font-serif text-[clamp(1.25rem,2vw,1.5rem)] text-navy tracking-[-0.02em]">
                    {differentiators[0].title}
                  </h3>
                  <p className="mt-4 text-[15px] text-body leading-[1.75] max-w-2xl">
                    {differentiators[0].desc}
                  </p>
                </div>
              </div>
              {/* Second card — 4 cols */}
              <div className="md:col-span-4 doppelrand doppelrand-light">
                <div className="bg-white rounded-[18px] p-8 border border-[rgba(27,42,74,0.04)] card-hover h-full">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-gold mb-5">02</p>
                  <h3 className="font-serif text-xl text-navy tracking-[-0.02em]">
                    {differentiators[1].title}
                  </h3>
                  <p className="mt-4 text-[14px] text-body leading-[1.7]">
                    {differentiators[1].desc}
                  </p>
                </div>
              </div>
              {/* Third — 4 cols */}
              <div className="md:col-span-4 doppelrand doppelrand-light">
                <div className="bg-white rounded-[18px] p-8 border border-[rgba(27,42,74,0.04)] card-hover h-full">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-gold mb-5">03</p>
                  <h3 className="font-serif text-xl text-navy tracking-[-0.02em]">
                    {differentiators[2].title}
                  </h3>
                  <p className="mt-4 text-[14px] text-body leading-[1.7]">
                    {differentiators[2].desc}
                  </p>
                </div>
              </div>
              {/* Fourth — 8 cols */}
              <div className="md:col-span-8 doppelrand doppelrand-light">
                <div className="bg-white rounded-[18px] p-8 md:p-10 border border-[rgba(27,42,74,0.04)] card-hover h-full">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-gold mb-5">04</p>
                  <h3 className="font-serif text-[clamp(1.25rem,2vw,1.5rem)] text-navy tracking-[-0.02em]">
                    {differentiators[3].title}
                  </h3>
                  <p className="mt-4 text-[15px] text-body leading-[1.75] max-w-2xl">
                    {differentiators[3].desc}
                  </p>
                </div>
              </div>
              {/* Fifth — 6 cols */}
              <div className="md:col-span-6 doppelrand doppelrand-light">
                <div className="bg-white rounded-[18px] p-8 border border-[rgba(27,42,74,0.04)] card-hover h-full">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-gold mb-5">05</p>
                  <h3 className="font-serif text-xl text-navy tracking-[-0.02em]">
                    {differentiators[4].title}
                  </h3>
                  <p className="mt-4 text-[14px] text-body leading-[1.7]">
                    {differentiators[4].desc}
                  </p>
                </div>
              </div>
              {/* Sixth — 6 cols */}
              <div className="md:col-span-6 doppelrand doppelrand-light">
                <div className="bg-white rounded-[18px] p-8 border border-[rgba(27,42,74,0.04)] card-hover h-full">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-gold mb-5">06</p>
                  <h3 className="font-serif text-xl text-navy tracking-[-0.02em]">
                    {differentiators[5].title}
                  </h3>
                  <p className="mt-4 text-[14px] text-body leading-[1.7]">
                    {differentiators[5].desc}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Comparison — white ── */}
      <section className="bg-white py-24 md:py-36">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <ScrollReveal>
            <div className="max-w-xl mb-16 md:mb-20">
              <span className="inline-flex items-center gap-2 rounded-full bg-navy/5 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.2em] font-semibold text-navy/60 mb-6">
                A different standard of care
              </span>
              <h2
                className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-navy"
                style={{ textWrap: "balance" }}
              >
                What most programs offer vs. what we believe you{" "}
                <em className="text-gold">deserve</em>
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <ComparisonTable contrasts={contrasts} />
          </ScrollReveal>
        </div>
      </section>

      {/* ── Credentials — navy deep, horizontal rhythm ── */}
      <section className="bg-navy-deep py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
              {[
                { value: "DO, MS, FAAD", label: "Board-Certified Credentials" },
                { value: "Mount Sinai", label: "Clinical Instructor" },
                { value: "1:1", label: "Every Patient Sees Dr. Rhee" },
                { value: "Flexible", label: "In-Person or Telehealth" },
              ].map((s, i) => (
                <div key={s.label} className="text-center md:text-left">
                  <p className="font-serif text-[clamp(1.5rem,3vw,2.25rem)] text-gold tracking-[-0.02em] leading-tight">
                    {s.value}
                  </p>
                  <p className="text-[10.5px] tracking-[0.14em] uppercase font-semibold text-white/35 mt-3">
                    {s.label}
                  </p>
                  {i < 3 && (
                    <div className="hidden md:block h-px bg-white/[0.06] mt-6" />
                  )}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Testimonials — cream ── */}
      <section className="bg-cream py-24 md:py-36">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-navy/5 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.2em] font-semibold text-navy/60 mb-6">
                  In their words
                </span>
                <h2
                  className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-navy"
                  style={{ textWrap: "balance" }}
                >
                  What our patients notice{" "}
                  <em className="text-gold">first</em>
                </h2>
              </div>
              <Link
                href="/testimonials"
                className="text-gold text-[15px] font-medium hover:text-gold-light transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] shrink-0"
              >
                All testimonials &rsaquo;
              </Link>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={150} stagger={100}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              {/* Featured testimonial — tall, spanning left */}
              <div className="md:col-span-5 md:row-span-2 doppelrand doppelrand-light">
                <div className="bg-white rounded-[18px] p-8 md:p-10 border border-[rgba(27,42,74,0.04)] card-hover h-full flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1 text-gold mb-8">
                      {[...Array(5)].map((_, j) => (
                        <span key={j} className="text-lg">&#9733;</span>
                      ))}
                    </div>
                    <p className="font-serif text-[20px] text-navy leading-[1.5] italic tracking-[-0.01em]">
                      &ldquo;I&apos;ve tried everything — keto, intermittent fasting,
                      personal trainers. Nothing worked long-term until I started
                      working with Dr. Rhee. This is different because it actually
                      addresses the root cause.&rdquo;
                    </p>
                  </div>
                  <div className="mt-10 pt-6 border-t border-navy/[0.06]">
                    <p className="font-medium text-navy">Mark S.</p>
                    <p className="text-[13px] text-light mt-1">Stamford, CT</p>
                  </div>
                </div>
              </div>
              {/* Supporting testimonials */}
              {[
                {
                  quote:
                    "My A1C has dropped significantly since starting the program. Dr. Rhee coordinates with my endocrinologist, which gives me peace of mind that all aspects of my health are being considered.",
                  name: "Patricia H.",
                  city: "Greenwich, CT",
                },
                {
                  quote:
                    "Dr. Rhee took the time to understand my health history and created a plan that actually works. The ongoing support has been incredible — I never feel like I\u2019m doing this alone.",
                  name: "Sarah M.",
                  city: "Middletown, NY",
                },
              ].map((t, i) => (
                <div key={i} className="md:col-span-7 doppelrand doppelrand-light">
                  <div className="bg-white rounded-[18px] p-8 border border-[rgba(27,42,74,0.04)] card-hover h-full">
                    <div className="flex gap-1 text-gold mb-5">
                      {[...Array(5)].map((_, j) => (
                        <span key={j}>&#9733;</span>
                      ))}
                    </div>
                    <p className="text-[15px] text-body leading-[1.7] italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="mt-6 pt-5 border-t border-navy/[0.06]">
                      <p className="text-[14px] font-medium text-navy">{t.name}</p>
                      <p className="text-[12px] text-light mt-0.5">{t.city}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Is This Right For You? — white ── */}
      <section className="bg-white py-24 md:py-36">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
              <span className="inline-flex items-center gap-2 rounded-full bg-navy/5 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.2em] font-semibold text-navy/60 mb-6">
                Is this right for you?
              </span>
              <h2
                className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-navy"
                style={{ textWrap: "balance" }}
              >
                We are not the right fit for everyone — and that is by{" "}
                <em className="text-gold">design</em>
              </h2>
              <p className="mt-5 text-[16px] text-body leading-[1.7] max-w-2xl mx-auto">
                Precision Weight + Wellness is a boutique medical practice, not a
                volume-based subscription service. We intentionally keep our
                patient panel small so that Dr. Rhee can give every patient the
                attention they deserve.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
              <div className="doppelrand doppelrand-light">
                <div className="bg-white rounded-[18px] p-8 md:p-10 border border-[rgba(27,42,74,0.04)] card-hover h-full">
                  <h3 className="font-serif text-xl text-navy mb-8 tracking-[-0.02em]">
                    This might be right for you if&hellip;
                  </h3>
                  <ul className="space-y-5">
                    {rightFor.map((item) => (
                      <li key={item} className="flex gap-3.5 text-[14px] text-body leading-relaxed">
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
              <div className="doppelrand doppelrand-light">
                <div className="bg-cream/60 rounded-[18px] p-8 md:p-10 border border-[rgba(27,42,74,0.04)] card-hover h-full">
                  <h3 className="font-serif text-xl text-navy mb-8 tracking-[-0.02em]">
                    You might prefer another option if&hellip;
                  </h3>
                  <ul className="space-y-5">
                    {otherOption.map((item) => (
                      <li key={item} className="flex gap-3.5 text-[14px] text-light leading-relaxed">
                        <span className="text-light/40 mt-0.5 shrink-0">&mdash;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Final CTA — navy deep ── */}
      <section className="relative bg-navy-deep py-24 md:py-36 text-center overflow-hidden">
        {/* Decorative radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold/[0.04] rounded-full blur-3xl pointer-events-none" />
        <ScrollReveal>
          <div className="relative max-w-2xl mx-auto px-5 md:px-6">
            <h2
              className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-white"
              style={{ textWrap: "balance" }}
            >
              Experience the difference for{" "}
              <em className="text-gold">yourself</em>
            </h2>
            <p className="mt-5 text-[16px] text-white/50 leading-[1.7] max-w-lg mx-auto">
              Schedule a consultation with Dr. Rhee to see what personalized,
              physician-led weight management looks like.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/book" className="btn-gold w-full sm:w-auto justify-center group">
                Book Your Consultation
                <ArrowIcon className="text-navy-deep transition-transform duration-500 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/eligibility"
                className="btn-secondary !border-white/20 !text-white/60 hover:!border-gold hover:!text-gold w-full sm:w-auto justify-center"
              >
                Check Your Eligibility
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
