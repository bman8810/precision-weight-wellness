import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "The Science",
  description:
    "Explore the evolution of weight loss medicine — from early receptor agonists to dual and triple agonists. Learn the science behind modern medical weight management.",
};

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

const timeline = [
  {
    num: "01",
    name: "Liraglutide (Saxenda)",
    badge: "GLP-1",
    desc: "The first GLP-1 approved for weight management. Clinical trials showed ~8% average body weight loss. A breakthrough that proved hormonal therapy could meaningfully treat obesity.",
    pct: 8,
  },
  {
    num: "02",
    name: "Semaglutide (Wegovy)",
    badge: "GLP-1",
    desc: "A GLP-1 receptor agonist that changed the landscape. Clinical trials demonstrated ~15% average body weight loss. Available as a weekly injection or daily oral pill, it became the gold standard for medical weight management.",
    pct: 15,
  },
  {
    num: "03",
    name: "Tirzepatide (Zepbound)",
    badge: "Dual",
    desc: "A dual GIP/GLP-1 receptor agonist. Clinical trials showed up to 22.5% body weight loss — the most effective weight loss medication approved to date.",
    pct: 22.5,
  },
  {
    num: "04",
    name: "Retatrutide & Beyond",
    badge: "Triple",
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
      {/* ── Hero — navy ── */}
      <section className="bg-navy pt-20">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6 pt-14 pb-14 md:pt-28 md:pb-28">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto">
              <p
                className="animate-fade-up flex items-center justify-center gap-2 text-sage text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-5"
                style={{ animationDelay: "0.1s" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                The Science
              </p>
              <h1
                className="animate-fade-up font-serif text-[clamp(2.75rem,5.5vw,4.25rem)] leading-[1.08] tracking-[-0.02em] text-white"
                style={{ animationDelay: "0.2s" }}
              >
                The evolution of weight loss{" "}
                <em className="text-gold">medicine</em>
              </h1>
              <p
                className="animate-fade-up text-[16px] text-white/65 leading-[1.7] mt-6 max-w-2xl mx-auto"
                style={{ animationDelay: "0.35s" }}
              >
                The science of obesity treatment has advanced dramatically in the
                last decade. What was once considered a matter of willpower is now
                understood as a complex hormonal condition — and the medications to
                treat it have never been more effective.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Evolution Timeline — white, Doppelrand 2-col grid ── */}
      <section className="py-14 md:py-28 bg-white">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">
                A New Era
              </p>
              <h2 className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-navy">
                How we got{" "}<em className="text-gold">here</em>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200} stagger={100}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {timeline.map((step) => (
                <div key={step.num} className="doppelrand doppelrand-light">
                  <div className="bg-white rounded-[18px] p-7 border border-[rgba(27,42,74,0.04)] card-hover h-full">
                    <div className="flex items-start gap-5">
                      <div className="w-14 h-14 rounded-full bg-sage/12 flex items-center justify-center shrink-0">
                        <p className="font-serif text-[22px] font-semibold text-gold">{step.num}</p>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2.5 mb-2">
                          <span className="inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.12em] bg-sage/10 text-sage px-2.5 py-1 rounded-full">
                            {step.badge}
                          </span>
                          <span className="text-[13px] text-gold font-semibold">{step.pct}% avg loss</span>
                        </div>
                        <h3 className="font-serif text-[20px] tracking-[-0.01em] text-navy leading-tight">
                          {step.name}
                        </h3>
                        <p className="text-[15px] text-body leading-[1.65] mt-3">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Chart — teal-to-navy gradient ── */}
      <section
        className="py-14 md:py-28"
        style={{ background: "linear-gradient(180deg, #1D5C4D 0%, #0F1D35 100%)" }}
      >
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">Clinical Data</p>
              <h2 className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-white">
                Average body weight loss by{" "}<em className="text-gold">medication</em>
              </h2>
              <p className="mt-4 text-[16px] text-white/60 leading-[1.7]">
                Based on published clinical trial data
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="space-y-6 max-w-2xl mx-auto">
              {chartData.map((d) => (
                <div key={d.label}>
                  <div className="flex justify-between text-[14px] mb-2">
                    <span className="text-white/80 font-medium">{d.label}</span>
                    <span className="text-gold font-semibold">
                      {d.pct}%
                      {d.note && (
                        <span className="text-[11px] text-white/35 font-normal ml-1">{d.note}</span>
                      )}
                    </span>
                  </div>
                  <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(d.pct / maxPct) * 100}%`,
                        background: "linear-gradient(90deg, #7BAE8E, #C9A96E)",
                      }}
                    />
                  </div>
                </div>
              ))}
              <p className="text-[12px] text-white/35 mt-3">Average patient body weight reduction in clinical trials</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              {[
                { title: "Appetite Regulation", desc: "Communicates directly with the hypothalamus to quiet food noise.", iconPath: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" },
                { title: "Insulin Sensitivity", desc: "Maintains blood sugar and regulates appetite through GLP-1 receptor activation.", iconPath: "M12 6a6 6 0 100 12 6 6 0 000-12zm0-4a10 10 0 110 20 10 10 0 010-20z" },
                { title: "Gastric Emptying", desc: "Slows digestion to ensure a sustained release of nutrients and energy.", iconPath: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" },
              ].map((card) => (
                <div key={card.title} className="doppelrand doppelrand-dark">
                  <div className="bg-white/8 rounded-[18px] p-7 border border-white/10 card-hover h-full">
                    <div className="w-10 h-10 rounded-full bg-sage/12 flex items-center justify-center mb-4">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d={card.iconPath} fill="#7BAE8E" /></svg>
                    </div>
                    <h3 className="text-[16px] font-semibold tracking-[-0.01em] text-white">{card.title}</h3>
                    <p className="text-[15px] text-white/55 leading-[1.65] mt-2">{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Beyond the Scale — cream with Doppelrand ── */}
      <section className="py-14 md:py-28 bg-cream">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">
                The future of wellness
              </p>
              <h2 className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-navy">
                Beyond the{" "}<em className="text-gold">scale</em>
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
                  <div className="bg-white rounded-[18px] p-7 border border-[rgba(27,42,74,0.04)] card-hover h-full">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-sage/12 flex items-center justify-center shrink-0 mt-0.5">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#7BAE8E" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-[20px] text-navy tracking-[-0.01em] leading-tight">
                          {card.title}
                        </h3>
                        <p className="text-[15px] text-body leading-[1.65] mt-3">
                          {card.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── What Comes Next — white ribbon ── */}
      <section className="py-14 md:py-28 bg-white">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">
                What Comes Next
              </p>
              <h2 className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-navy">
                From weight loss to whole-body{" "}
                <em className="text-gold">optimization</em>
              </h2>
              <p className="mt-4 text-[16px] text-body leading-[1.7] max-w-2xl mx-auto">
                The next generation of obesity medicine isn&apos;t just about
                losing weight — it&apos;s about reshaping body composition,
                preserving muscle, and optimizing metabolic health from the
                inside out.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200} stagger={100}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Muscle Preservation",
                  desc: "Myostatin inhibitors and activin receptor antibodies are being combined with GLP-1 therapies to protect lean mass during weight loss — early trials show muscle gains of up to 3% even while losing fat.",
                  badge: "In Trials",
                },
                {
                  title: "Triple Agonists",
                  desc: "Retatrutide targets GLP-1, GIP, and glucagon receptors simultaneously — increasing energy expenditure and fat metabolism. Phase II trials demonstrated up to 24% body weight reduction.",
                  badge: "Phase III",
                },
                {
                  title: "Oral GLP-1s",
                  desc: "Orforglipron and oral semaglutide are eliminating the need for weekly injections. An FDA decision on the first oral-only GLP-1 for weight loss is expected in 2026.",
                  badge: "FDA Review",
                },
                {
                  title: "Body Composition",
                  desc: "The goal is shifting from pounds lost to fat-to-muscle ratio. Combination therapies aim to reduce visceral fat by 40%+ while maintaining or building lean muscle mass.",
                  badge: "Emerging",
                },
                {
                  title: "Liver & Metabolic Health",
                  desc: "Dual agonists like survodutide are showing dramatic improvements in liver fat and metabolic dysfunction (MASH) — treating the root metabolic disease, not just the symptom.",
                  badge: "Phase III",
                },
                {
                  title: "Cardiovascular Protection",
                  desc: "The SELECT trial proved semaglutide reduces major cardiac events by 20% in patients with obesity. Future therapies are being designed with cardiovascular endpoints built in.",
                  badge: "Proven",
                },
              ].map((card) => (
                <div key={card.title} className="doppelrand doppelrand-light">
                  <div className="relative bg-white rounded-[18px] p-7 border border-[rgba(27,42,74,0.04)] card-hover h-full">
                    <span className="absolute top-5 right-5 text-[10px] font-semibold uppercase tracking-[0.12em] bg-sage/10 text-sage px-2.5 py-1 rounded-full">
                      {card.badge}
                    </span>
                    <h3 className="font-serif text-[20px] text-navy tracking-[-0.01em] leading-tight pr-16">
                      {card.title}
                    </h3>
                    <p className="text-[15px] text-body leading-[1.65] mt-3">
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Final CTA — navy-deep ── */}
      <section className="relative py-14 md:py-28 bg-navy-deep text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <ScrollReveal>
          <div className="relative max-w-[680px] mx-auto px-5 md:px-6">
            <h2 className="font-serif text-[clamp(2.5rem,5.5vw,4rem)] leading-[1.08] tracking-[-0.02em] text-white">
              See what modern medicine can do for{" "}<em className="text-gold">you</em>
            </h2>
            <p className="mt-4 text-[16px] text-white/60 leading-[1.7]">
              Schedule a consultation with Dr. Rhee to explore your options and
              start your personalized treatment plan.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/book" className="btn-gold w-full sm:w-auto justify-center group">
                Book Your Consultation
                <ArrowIcon className="text-navy-deep transition-transform duration-500 group-hover:translate-x-0.5" />
              </Link>
              <Link href="/eligibility" className="inline-flex items-center justify-center text-[15px] font-medium text-white/70 border border-white/25 rounded-full px-8 py-[15px] min-h-[48px] hover:bg-white/10 hover:text-white active:scale-[0.98] w-full sm:w-auto">
                Check Eligibility
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
