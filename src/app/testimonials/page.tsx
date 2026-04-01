import type { Metadata } from "next";
import Link from "next/link";

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

export default function TestimonialsPage() {
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
            Patient Stories
          </p>
          <h1
            className="font-serif text-5xl md:text-6xl leading-[1.08] tracking-tight text-soft-black"
            style={{ textWrap: "balance" }}
          >
            Real results, <span className="text-gold">real people</span>
          </h1>
          <p className="mt-8 text-lg text-neutral-500 max-w-2xl mx-auto leading-relaxed">
            Hear from patients who have transformed their health with our
            medically supervised weight management program.
          </p>
        </div>
      </section>

      {/* Testimonials — masonry-style layout */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {testimonials.map((t, i) => (
              <article
                key={i}
                className="break-inside-avoid bg-cream p-8 rounded-2xl transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-[0_16px_40px_-12px_rgba(201,169,110,0.08)]"
              >
                <div className="flex gap-1 text-gold mb-4">
                  {[...Array(t.stars)].map((_, j) => (
                    <span key={j}>&#9733;</span>
                  ))}
                </div>
                <p className={`text-neutral-600 leading-relaxed italic ${i === 0 || i === 3 ? "text-base" : "text-sm"}`}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-soft-black">
                      {t.name}
                    </p>
                    <p className="text-xs text-neutral-400">{t.city}</p>
                  </div>
                  <p className="font-serif text-xl text-gold tabular-nums">
                    -{t.lostLbs} lbs
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-soft-black text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-2xl mx-auto px-6">
          <h2
            className="font-serif text-4xl md:text-5xl tracking-tight text-white"
            style={{ textWrap: "balance" }}
          >
            Start your success story
          </h2>
          <p className="mt-4 text-neutral-400 leading-relaxed">
            Join the growing number of patients achieving real, lasting results
            with Dr. Rhee.
          </p>
          <Link
            href="/book"
            className="inline-block mt-8 bg-gold hover:bg-gold-dark text-white text-sm tracking-wide uppercase px-10 py-4 rounded-full transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-y-[-1px] hover:shadow-[0_8px_24px_-8px_rgba(201,169,110,0.4)]"
          >
            Book Your Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
