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

export default function WhyUsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-14 md:pt-36 md:pb-20 bg-cream">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6 text-center">
          <ScrollReveal>
            <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-5">
              The Precision Difference
            </p>
            <h1
              className="font-serif text-[clamp(2.5rem,5vw,3.75rem)] leading-[1.08] tracking-[-0.02em] text-navy"
              style={{ textWrap: "balance" }}
            >
              What changes when your doctor actually{" "}
              <em className="text-gold">knows your name</em>
            </h1>
            <p className="mt-6 text-[16px] text-body max-w-2xl mx-auto leading-[1.7]">
              Most weight loss programs are built on algorithms, chatbots, and
              one-size-fits-all protocols. Precision Weight + Wellness is built on
              something different: a named physician, a real medical office, and a
              plan created for you alone.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-14 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">
                The landscape today
              </p>
              <h2
                className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-navy"
                style={{ textWrap: "balance" }}
              >
                Weight loss has become an industry. We think it should be <em className="text-gold">medicine.</em>
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="space-y-6 text-body leading-relaxed max-w-3xl mx-auto">
              <p>
                Telehealth startups dispense medications after a five-minute
                questionnaire. Subscription apps assign you to a chat-based
                &ldquo;coach&rdquo; you will never meet. Celebrity-endorsed
                programs sell community when what you need is clinical expertise.
              </p>
              <p>
                These approaches work for some people. But if you want a physician
                who personally reviews your labs, adjusts your medication, and
                knows your name — not your user ID — you need a different model
                entirely.
              </p>
              <p className="text-navy font-medium">
                That is why Precision Weight + Wellness exists.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Six Differentiators */}
      <section className="py-14 md:py-24 bg-cream">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <ScrollReveal>
            <div className="max-w-xl mb-14">
              <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">
                Why patients choose us
              </p>
              <h2
                className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-navy"
                style={{ textWrap: "balance" }}
              >
                Six things you will not find <em className="text-gold">anywhere else</em>
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200} stagger={100}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {differentiators.map((d, i) => (
                <div
                  key={d.title}
                  className={`doppelrand doppelrand-light ${i === 0 ? "md:col-span-2" : ""}`}
                >
                  <div className="bg-white rounded-[18px] p-8 border border-[rgba(27,42,74,0.04)] card-hover h-full">
                    <h3
                      className={`font-serif text-navy tracking-[-0.02em] ${
                        i === 0 ? "text-2xl" : "text-xl"
                      }`}
                    >
                      {d.title}
                    </h3>
                    <p
                      className={`mt-4 text-body leading-relaxed ${
                        i === 0 ? "text-base max-w-3xl" : "text-sm"
                      }`}
                    >
                      {d.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Side-by-Side Comparison */}
      <section className="py-14 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <ScrollReveal>
            <div className="max-w-xl mb-14">
              <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">
                A different standard of care
              </p>
              <h2
                className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-navy"
                style={{ textWrap: "balance" }}
              >
                What most programs offer vs. what we believe you <em className="text-gold">deserve</em>
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <ComparisonTable contrasts={contrasts} />
          </ScrollReveal>
        </div>
      </section>

      {/* Credentials Bar */}
      <section className="bg-navy-deep py-14 md:py-20">
        <ScrollReveal>
          <div className="max-w-[1200px] mx-auto px-5 md:px-6 grid grid-cols-2 sm:grid-cols-4 gap-10 text-center">
            {[
              { value: "DO, MS, FAAD", label: "Board-Certified Credentials" },
              { value: "Mount Sinai", label: "Clinical Instructor" },
              { value: "1:1", label: "Every Patient Sees Dr. Rhee" },
              { value: "Flexible", label: "In-Person or Telehealth — You Decide" },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-serif text-2xl md:text-3xl text-gold tracking-[-0.02em]">
                  {s.value}
                </p>
                <p className="text-[10.5px] tracking-[0.14em] uppercase font-semibold text-light mt-3">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Testimonial Spotlight */}
      <section className="py-14 md:py-24 bg-cream">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <ScrollReveal>
            <div className="max-w-xl mb-14">
              <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">
                In their words
              </p>
              <h2
                className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-navy"
                style={{ textWrap: "balance" }}
              >
                What our patients notice <em className="text-gold">first</em>
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Featured testimonial */}
              <div className="doppelrand doppelrand-light md:row-span-2">
                <div className="bg-white rounded-[18px] p-8 md:p-12 border border-[rgba(27,42,74,0.04)] card-hover h-full flex flex-col justify-center">
                  <div className="flex gap-1 text-gold mb-6">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} className="text-lg">
                        &#9733;
                      </span>
                    ))}
                  </div>
                  <p className="text-[16px] text-body leading-[1.7] italic">
                    &ldquo;I&apos;ve tried everything — keto, intermittent fasting,
                    personal trainers. Nothing worked long-term until I started
                    working with Dr. Rhee. This is different because it actually
                    addresses the root cause.&rdquo;
                  </p>
                  <div className="mt-8">
                    <p className="font-medium text-navy">Mark S.</p>
                    <p className="text-xs text-light mt-1">Stamford, CT</p>
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
                    "Dr. Rhee took the time to understand my health history and created a plan that actually works. The ongoing support has been incredible — I never feel like I'm doing this alone.",
                  name: "Sarah M.",
                  city: "Middletown, NY",
                },
              ].map((t, i) => (
                <div key={i} className="doppelrand doppelrand-light">
                  <div className="bg-white rounded-[18px] p-8 border border-[rgba(27,42,74,0.04)] card-hover h-full">
                    <div className="flex gap-1 text-gold mb-4">
                      {[...Array(5)].map((_, j) => (
                        <span key={j}>&#9733;</span>
                      ))}
                    </div>
                    <p className="text-sm text-body leading-relaxed italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="mt-5">
                      <p className="text-sm font-medium text-navy">
                        {t.name}
                      </p>
                      <p className="text-xs text-light">{t.city}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
          <div className="mt-10">
            <Link
              href="/testimonials"
              className="text-gold text-[15px] font-medium hover:text-gold-light"
            >
              See all testimonials &rsaquo;
            </Link>
          </div>
        </div>
      </section>

      {/* Is This Right For You? */}
      <section className="py-14 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-14">
              <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">
                Is this right for you?
              </p>
              <h2
                className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-navy"
                style={{ textWrap: "balance" }}
              >
                We are not the right fit for everyone — and that is by <em className="text-gold">design</em>
              </h2>
              <p className="mt-4 text-[16px] text-body leading-[1.7]">
                Precision Weight + Wellness is a boutique medical practice, not a
                volume-based subscription service. We intentionally keep our
                patient panel small so that Dr. Rhee can give every patient the
                attention they deserve.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <div className="doppelrand doppelrand-light">
                <div className="bg-white rounded-[18px] p-8 border border-[rgba(27,42,74,0.04)] card-hover h-full">
                  <h3 className="font-serif text-xl text-navy mb-6 tracking-[-0.02em]">
                    This might be right for you if&hellip;
                  </h3>
                  <ul className="space-y-4">
                    {rightFor.map((item) => (
                      <li key={item} className="flex gap-3 text-sm text-body leading-relaxed">
                        <span className="w-5 h-5 rounded-full bg-sage/12 flex items-center justify-center shrink-0"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="#7BAE8E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="doppelrand doppelrand-light">
                <div className="bg-white rounded-[18px] p-8 border border-[rgba(27,42,74,0.04)] card-hover h-full">
                  <h3 className="font-serif text-xl text-navy mb-6 tracking-[-0.02em]">
                    You might prefer another option if&hellip;
                  </h3>
                  <ul className="space-y-4">
                    {otherOption.map((item) => (
                      <li key={item} className="flex gap-3 text-sm text-light leading-relaxed">
                        <span className="text-light mt-0.5 shrink-0">&mdash;</span>
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

      {/* Final CTA */}
      <section className="relative py-14 md:py-24 bg-navy-deep text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <ScrollReveal>
          <div className="relative max-w-2xl mx-auto px-5 md:px-6">
            <h2
              className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-white"
              style={{ textWrap: "balance" }}
            >
              Experience the difference for <em className="text-gold">yourself</em>
            </h2>
            <p className="mt-4 text-[16px] text-white/60 leading-[1.7]">
              Schedule a consultation with Dr. Rhee to see what personalized,
              physician-led weight management looks like.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/book" className="btn-gold w-full sm:w-auto justify-center">
                Book Your Consultation
              </Link>
              <Link
                href="/eligibility"
                className="btn-secondary !border-white/25 !text-white/70 hover:!border-gold hover:!text-gold w-full sm:w-auto justify-center"
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
