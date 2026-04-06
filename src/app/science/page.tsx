import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "The Science",
  description:
    "Explore the evolution of weight loss medicine — from early receptor agonists to dual and triple agonists. Learn the science behind modern medical weight management.",
};

const timeline = [
  {
    num: "01",
    name: "Liraglutide (Saxenda)",
    desc: "The first GLP-1 approved for weight management. Clinical trials showed ~8% average body weight loss. A breakthrough that proved hormonal therapy could meaningfully treat obesity.",
    pct: 8,
  },
  {
    num: "02",
    name: "Semaglutide (Wegovy)",
    desc: "A GLP-1 receptor agonist that changed the landscape. Clinical trials demonstrated ~15% average body weight loss. Available as a weekly injection or daily oral pill, it became the gold standard for medical weight management.",
    pct: 15,
  },
  {
    num: "03",
    name: "Tirzepatide (Zepbound)",
    desc: "A dual GIP/GLP-1 receptor agonist. Clinical trials showed up to 22.5% body weight loss — the most effective weight loss medication approved to date.",
    pct: 22.5,
  },
  {
    num: "04",
    name: "Retatrutide & Beyond",
    desc: "Triple agonists targeting GLP-1, GIP, and glucagon receptors are in late-stage trials showing up to 24% weight loss. The future of obesity medicine is accelerating.",
    pct: 24,
  },
];

const chartData = [
  { label: "Liraglutide", pct: 8, note: null },
  { label: "Semaglutide", pct: 15, note: null },
  { label: "Tirzepatide", pct: 22.5, note: null },
  { label: "Retatrutide", pct: 24, note: "in trials" },
];

const beyondCards = [
  {
    title: "Body composition",
    desc: "New protocols focus on preserving lean muscle mass during weight loss — not just reducing a number on the scale. The goal is a healthier body, not just a smaller one.",
  },
  {
    title: "Cardiovascular health",
    desc: "GLP-1 medications have demonstrated significant cardiovascular benefits, including reduced risk of major cardiac events — benefits that extend well beyond weight loss alone.",
  },
  {
    title: "Metabolic markers",
    desc: "Patients consistently see improvements in A1C, blood pressure, and lipid panels. These medications treat the metabolic dysfunction at the root of obesity.",
  },
  {
    title: "Whole-person optimization",
    desc: "The future of weight management isn\u2019t about a single metric. It\u2019s about optimizing energy, mobility, longevity, and quality of life — the whole person.",
  },
];

export default function SciencePage() {
  const maxPct = 24;

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-14 md:pt-36 md:pb-20 bg-cream">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6 text-center">
          <ScrollReveal>
            <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-5">
              The Science
            </p>
            <h1
              className="font-serif text-[clamp(2.5rem,5vw,3.75rem)] leading-[1.08] tracking-[-0.02em] text-navy"
              style={{ textWrap: "balance" }}
            >
              The evolution of weight loss{" "}
              <em className="text-gold">medicine</em>
            </h1>
            <p className="mt-6 text-[16px] text-body max-w-2xl mx-auto leading-[1.7]">
              The science of obesity treatment has advanced dramatically in the
              last decade. What was once considered a matter of willpower is now
              understood as a complex hormonal condition — and the medications to
              treat it have never been more effective.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Evolution Timeline */}
      <section className="py-14 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">
                A New Era
              </p>
              <h2
                className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-navy"
                style={{ textWrap: "balance" }}
              >
                How we got <em className="text-gold">here</em>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="space-y-16">
              {timeline.map((step, i) => (
                <div
                  key={step.num}
                  className={`grid grid-cols-1 lg:grid-cols-[100px_1fr] gap-10 items-start ${
                    i % 2 === 1 ? "lg:ml-12" : ""
                  }`}
                >
                  <p className="font-serif text-5xl text-gold/30 leading-none tabular-nums">
                    {step.num}
                  </p>
                  <div className="border-l border-[rgba(27,42,74,0.06)] pl-10">
                    <h3 className="font-serif text-3xl tracking-[-0.02em] text-navy">
                      {step.name}
                    </h3>
                    <p className="mt-5 text-body leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Chart Section — teal-to-navy gradient */}
      <section
        className="py-14 md:py-24"
        style={{ background: "linear-gradient(180deg, #1D5C4D 0%, #0F1D35 100%)" }}
      >
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2
                className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-white"
                style={{ textWrap: "balance" }}
              >
                Average body weight loss by <em className="text-gold">medication</em>
              </h2>
              <p className="mt-4 text-[16px] text-white/60 leading-[1.7]">
                Based on published clinical trial data
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="space-y-6 max-w-2xl mx-auto">
              {chartData.map((d) => (
                <div key={d.label} className="flex items-center gap-6">
                  <p className="w-28 shrink-0 text-sm text-white/60 text-right">
                    {d.label}
                  </p>
                  <div className="flex-1 relative">
                    <div
                      className="h-10 rounded-full"
                      style={{
                        width: `${(d.pct / maxPct) * 100}%`,
                        background: "linear-gradient(90deg, #7BAE8E, #C9A96E)",
                      }}
                    />
                  </div>
                  <p className="w-20 shrink-0 text-sm font-medium text-white">
                    {d.pct}%
                    {d.note && (
                      <span className="block text-[11px] text-white/40 font-normal">
                        {d.note}
                      </span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Beyond Weight */}
      <section className="py-14 md:py-24 bg-cream">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">
                The future of wellness
              </p>
              <h2
                className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-navy"
                style={{ textWrap: "balance" }}
              >
                Beyond the <em className="text-gold">scale</em>
              </h2>
              <p className="mt-4 text-[16px] text-body leading-[1.7] max-w-2xl mx-auto">
                The field of medical weight management is evolving beyond pounds
                lost. Today&apos;s treatments are about optimizing the whole
                person — body, metabolism, and long-term health.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200} stagger={100}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {beyondCards.map((card) => (
                <div key={card.title} className="doppelrand doppelrand-light">
                  <div className="bg-white rounded-[18px] p-8 border border-[rgba(27,42,74,0.04)] card-hover h-full">
                    <h3 className="font-serif text-xl text-navy mb-4 tracking-[-0.02em]">
                      {card.title}
                    </h3>
                    <p className="text-body leading-relaxed text-sm">
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-14 md:py-24 bg-navy-deep text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <ScrollReveal>
          <div className="relative max-w-2xl mx-auto px-5 md:px-6">
            <h2
              className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-white"
              style={{ textWrap: "balance" }}
            >
              See what modern weight loss medicine can do for <em className="text-gold">you</em>
            </h2>
            <p className="mt-4 text-[16px] text-white/60 leading-[1.7]">
              Schedule a consultation with Dr. Rhee to explore your options and
              start your personalized treatment plan.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/book" className="btn-gold w-full sm:w-auto justify-center">
                Book Your Consultation
              </Link>
              <Link
                href="/eligibility"
                className="btn-secondary !border-white/25 !text-white/70 hover:!border-gold hover:!text-gold w-full sm:w-auto justify-center"
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
