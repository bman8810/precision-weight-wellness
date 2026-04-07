import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Patient Testimonials",
  description:
    "Read what our patients are saying about their weight loss journey with Precision Weight + Wellness and Dr. Libby Rhee.",
};

const testimonials = [
  {
    quote:
      "The program has completely changed my relationship with food. I've lost 45 pounds and feel better than I have in years. Dr. Rhee truly listens and adjusts my plan as needed.",
    name: "Sarah M.",
    city: "Middletown, NY",
    stars: 5,
    lostLbs: 45,
  },
  {
    quote:
      "Dr. Rhee took the time to understand my health history and created a plan that actually works. The ongoing support has been incredible — I never feel like I'm doing this alone.",
    name: "James R.",
    city: "New Milford, CT",
    stars: 5,
    lostLbs: 38,
  },
  {
    quote:
      "I was skeptical about weight loss medications, but the science-based approach here convinced me. Down 30 pounds in 4 months and my blood pressure is normal for the first time in a decade.",
    name: "Michelle K.",
    city: "Grand Rapids, MI",
    stars: 5,
    lostLbs: 30,
  },
  {
    quote:
      "After years of yo-yo dieting, this is the first time I've lost weight and actually kept it off. The medical supervision gives me confidence that I'm doing this safely.",
    name: "David L.",
    city: "Warwick, NY",
    stars: 5,
    lostLbs: 52,
  },
  {
    quote:
      "The team is wonderful — professional, empathetic, and genuinely invested in my success. I've lost 25 pounds and my energy levels are through the roof.",
    name: "Anna P.",
    city: "Greenwich, CT",
    stars: 5,
    lostLbs: 25,
  },
  {
    quote:
      "I appreciate how Dr. Rhee explains everything clearly. She helped me understand that weight loss is a medical issue, not a personal failing. That shifted my entire mindset.",
    name: "Robert T.",
    city: "Kalamazoo, MI",
    stars: 5,
    lostLbs: 40,
  },
  {
    quote:
      "The flexibility of being able to do both in-person and telehealth visits makes it easy to stay on track. I look forward to my monthly check-ins.",
    name: "Lisa W.",
    city: "Goshen, NY",
    stars: 5,
    lostLbs: 33,
  },
  {
    quote:
      "I've tried everything — keto, intermittent fasting, personal trainers. Nothing worked long-term until I started working with Dr. Rhee. This is different because it actually addresses the root cause.",
    name: "Mark S.",
    city: "Stamford, CT",
    stars: 5,
    lostLbs: 48,
  },
  {
    quote:
      "My A1C has dropped significantly since starting the program. Dr. Rhee coordinates with my endocrinologist, which gives me peace of mind that all aspects of my health are being considered.",
    name: "Patricia H.",
    city: "Portage, MI",
    stars: 5,
    lostLbs: 35,
  },
  {
    quote:
      "I only had about 15 pounds to lose, and every other program told me I didn't need help. Dr. Rhee understood that those last pounds were the hardest — and the most important to me. I'm finally at a weight I feel great at.",
    name: "Jenna C.",
    city: "Upper East Side, NY",
    stars: 5,
    lostLbs: 15,
  },
  {
    quote:
      "I was so close to my goal but completely stuck. Dr. Rhee helped me lose the last 12 pounds I'd been fighting for years. It sounds small, but it changed everything — my confidence, my energy, how my clothes fit.",
    name: "Megan T.",
    city: "Danbury, CT",
    stars: 5,
    lostLbs: 12,
  },
  {
    quote:
      "Everyone thinks weight loss programs are only for people with a lot to lose. I had 10 stubborn pounds that wouldn't budge no matter what I tried. Dr. Rhee's approach finally got me there, and I've kept it off.",
    name: "Christine L.",
    city: "Ann Arbor, MI",
    stars: 5,
    lostLbs: 10,
  },
];

const totalLost = testimonials.reduce((sum, t) => sum + t.lostLbs, 0);
const avgLost = Math.round(totalLost / testimonials.length);

export default function TestimonialsPage() {
  const [featured, ...rest] = testimonials;

  return (
    <>
      {/* ── Hero — teal-to-navy gradient ── */}
      <section
        className="relative pt-28 pb-14 md:pt-40 md:pb-24 overflow-hidden"
        style={{ background: "linear-gradient(180deg, #1D5C4D 0%, #0F1D35 100%)" }}
      >
        <div className="absolute inset-0 opacity-[0.08]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/headers/testimonials-header.jpg" alt="" className="w-full h-full object-cover" aria-hidden="true" />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-5 md:px-6">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto">
              <p className="flex items-center justify-center gap-2 text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                Patient Stories
              </p>
              <h1
                className="font-serif text-[clamp(2.75rem,5.5vw,4.25rem)] leading-[1.08] tracking-[-0.02em] text-white"
                style={{ textWrap: "balance" }}
              >
                Real results, <em className="text-gold">real people</em>
              </h1>
              <p className="mt-6 text-[16px] text-white/60 max-w-2xl mx-auto leading-[1.7]">
                Hear from patients who have transformed their health with our
                medically supervised weight management program.
              </p>
            </div>
          </ScrollReveal>

          {/* Stats bar */}
          <ScrollReveal delay={200}>
            <div className="mt-14 flex flex-wrap justify-center gap-8 md:gap-16">
              {[
                { value: `${testimonials.length}+`, label: "Patient stories" },
                { value: `${avgLost} lbs`, label: "Avg. weight lost" },
                { value: `${totalLost}+`, label: "Total lbs lost" },
                { value: "3 States", label: "NY · CT · MI" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-serif text-[clamp(24px,4vw,40px)] font-semibold tracking-[-0.03em] text-gold leading-[1]">
                    {s.value}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.12em] text-white/40 mt-2">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Featured Testimonial — navy-deep ── */}
      <section className="py-14 md:py-24 bg-navy-deep">
        <ScrollReveal>
          <div className="max-w-[800px] mx-auto px-5 md:px-6 text-center">
            <div className="relative">
              <span className="absolute -top-6 -left-4 text-gold/15 font-serif text-[120px] leading-[1] select-none">&ldquo;</span>
              <blockquote>
                <p className="font-serif text-[clamp(1.5rem,3.5vw,2.25rem)] leading-[1.3] tracking-[-0.02em] text-white italic">
                  {featured.quote}
                </p>
              </blockquote>
            </div>
            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="w-11 h-11 rounded-full bg-teal flex items-center justify-center text-white text-[15px] font-semibold ring-2 ring-teal-bright/30 ring-offset-2 ring-offset-navy-deep">
                {featured.name[0]}
              </div>
              <div className="text-left">
                <p className="text-[15px] text-white font-semibold">{featured.name}</p>
                <p className="text-[13px] text-white/45">{featured.city}</p>
              </div>
              <div className="ml-4 pl-4 border-l border-white/15">
                <p className="font-serif text-[24px] text-gold font-semibold">-{featured.lostLbs} lbs</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Testimonials Grid — cream ── */}
      <section className="py-14 md:py-24 bg-cream">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">
                More stories
              </p>
              <h2 className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-navy">
                Every journey is <em className="text-gold">unique</em>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal stagger={80}>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {rest.map((t, i) => (
                <article
                  key={i}
                  className="break-inside-avoid doppelrand doppelrand-light"
                >
                  <div className="bg-white p-8 rounded-[18px] border border-[rgba(27,42,74,0.04)] card-hover">
                    <div className="flex gap-0.5 text-gold text-[14px] mb-4">
                      {[...Array(t.stars)].map((_, j) => (
                        <span key={j}>&#9733;</span>
                      ))}
                    </div>
                    <p className="text-[15px] text-body leading-[1.65] italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="mt-6 pt-5 border-t border-[rgba(27,42,74,0.06)] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-navy flex items-center justify-center text-white text-[13px] font-semibold">
                          {t.name[0]}
                        </div>
                        <div>
                          <p className="text-[14px] font-medium text-navy">{t.name}</p>
                          <p className="text-[12px] text-light">{t.city}</p>
                        </div>
                      </div>
                      <p className="font-serif text-[20px] text-gold font-semibold tabular-nums">
                        -{t.lostLbs} lbs
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA — white with gold accent ── */}
      <section className="relative py-14 md:py-28 bg-white text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <ScrollReveal>
          <div className="relative max-w-[680px] mx-auto px-5 md:px-6">
            <h2 className="font-serif text-[clamp(2.5rem,5.5vw,4rem)] leading-[1.08] tracking-[-0.02em] text-navy">
              Write your own <em className="text-gold">success story</em>
            </h2>
            <p className="mt-4 text-[16px] text-body leading-[1.7]">
              Join the growing number of patients achieving real, lasting results
              with medically supervised weight management.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/book" className="btn-primary w-full sm:w-auto justify-center">
                Book Your Consultation
              </Link>
              <Link href="/eligibility" className="btn-secondary w-full sm:w-auto justify-center">
                Check Eligibility
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
