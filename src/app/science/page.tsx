import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Science",
  description:
    "Explore the evolution of weight loss medicine — from GLP-1 receptor agonists to dual and triple agonists. Learn the science behind modern medical weight management.",
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
    desc: "The next generation. Clinical trials demonstrated ~15% average body weight loss — nearly double the previous standard. Changed the conversation around medical weight management.",
    pct: 15,
  },
  {
    num: "03",
    name: "Tirzepatide (Zepbound)",
    desc: "A dual GIP/GLP-1 receptor agonist. Clinical trials showed up to 22.5% body weight loss. The most effective weight loss medication to date.",
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
      <section className="pt-36 pb-24 bg-cream">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-6">
            The Science
          </p>
          <h1
            className="font-serif text-5xl md:text-6xl leading-[1.08] tracking-tight text-soft-black"
            style={{ textWrap: "balance" }}
          >
            The evolution of weight loss{" "}
            <span className="text-gold">medicine</span>
          </h1>
          <p className="mt-8 text-lg text-neutral-500 max-w-2xl mx-auto leading-relaxed">
            The science of obesity treatment has advanced dramatically in the
            last decade. What was once considered a matter of willpower is now
            understood as a complex hormonal condition — and the medications to
            treat it have never been more effective.
          </p>
        </div>
      </section>

      {/* Evolution Timeline */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-6">
              A New Era
            </p>
            <h2
              className="font-serif text-4xl md:text-5xl tracking-tight text-soft-black"
              style={{ textWrap: "balance" }}
            >
              How we got here
            </h2>
          </div>

          <div className="space-y-20">
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
                <div className="border-l border-neutral-200 pl-10">
                  <h3 className="font-serif text-3xl tracking-tight text-soft-black">
                    {step.name}
                  </h3>
                  <p className="mt-5 text-neutral-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chart Section */}
      <section className="py-32 bg-cream">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2
              className="font-serif text-4xl md:text-5xl tracking-tight text-soft-black"
              style={{ textWrap: "balance" }}
            >
              Average body weight loss by medication
            </h2>
            <p className="mt-6 text-neutral-500 leading-relaxed">
              Based on published clinical trial data
            </p>
          </div>

          <div className="space-y-6">
            {chartData.map((d) => (
              <div key={d.label} className="flex items-center gap-6">
                <p className="w-28 shrink-0 text-sm text-neutral-500 text-right">
                  {d.label}
                </p>
                <div className="flex-1 relative">
                  <div
                    className="h-10 rounded-full bg-gradient-to-r from-gold/80 to-gold"
                    style={{ width: `${(d.pct / maxPct) * 100}%` }}
                  />
                </div>
                <p className="w-20 shrink-0 text-sm font-medium text-soft-black">
                  {d.pct}%
                  {d.note && (
                    <span className="block text-[11px] text-neutral-400 font-normal">
                      {d.note}
                    </span>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beyond Weight */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-6">
              The future of wellness
            </p>
            <h2
              className="font-serif text-4xl md:text-5xl tracking-tight text-soft-black"
              style={{ textWrap: "balance" }}
            >
              Beyond the scale
            </h2>
            <p className="mt-6 text-neutral-500 leading-relaxed max-w-2xl mx-auto">
              The field of medical weight management is evolving beyond pounds
              lost. Today&apos;s treatments are about optimizing the whole
              person — body, metabolism, and long-term health.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {beyondCards.map((card) => (
              <div
                key={card.title}
                className="bg-cream/60 border border-neutral-200 p-10 rounded-2xl transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-y-[-2px] hover:shadow-[0_16px_40px_-12px_rgba(201,169,110,0.08)]"
              >
                <h3 className="font-serif text-xl text-soft-black mb-4">
                  {card.title}
                </h3>
                <p className="text-neutral-500 leading-relaxed text-sm">
                  {card.desc}
                </p>
              </div>
            ))}
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
            See what modern weight loss medicine can do for you
          </h2>
          <p className="mt-6 text-neutral-400 leading-relaxed">
            Schedule a consultation with Dr. Rhee to explore your options and
            start your personalized treatment plan.
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
