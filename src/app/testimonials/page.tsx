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
    city: "Upper East Side, NY",
    stars: 5,
    lostLbs: 45,
  },
  {
    quote:
      "Dr. Rhee took the time to understand my health history and created a plan that actually works. The ongoing support has been incredible — I never feel like I'm doing this alone.",
    name: "James R.",
    city: "Midtown, NY",
    stars: 5,
    lostLbs: 38,
  },
  {
    quote:
      "I was skeptical about weight loss medications, but the science-based approach here convinced me. Down 30 pounds in 4 months and my blood pressure is normal for the first time in a decade.",
    name: "Michelle K.",
    city: "Brooklyn, NY",
    stars: 5,
    lostLbs: 30,
  },
  {
    quote:
      "After years of yo-yo dieting, this is the first time I've lost weight and actually kept it off. The medical supervision gives me confidence that I'm doing this safely.",
    name: "David L.",
    city: "Upper West Side, NY",
    stars: 5,
    lostLbs: 52,
  },
  {
    quote:
      "The team is wonderful — professional, empathetic, and genuinely invested in my success. I've lost 25 pounds and my energy levels are through the roof.",
    name: "Anna P.",
    city: "SoHo, NY",
    stars: 5,
    lostLbs: 25,
  },
  {
    quote:
      "I appreciate how Dr. Rhee explains everything clearly. She helped me understand that weight loss is a medical issue, not a personal failing. That shifted my entire mindset.",
    name: "Robert T.",
    city: "Murray Hill, NY",
    stars: 5,
    lostLbs: 40,
  },
  {
    quote:
      "The convenience of the Upper East Side location and the seamless scheduling make it easy to stay on track. I look forward to my monthly check-ins.",
    name: "Lisa W.",
    city: "Gramercy, NY",
    stars: 5,
    lostLbs: 33,
  },
  {
    quote:
      "I've tried everything — keto, intermittent fasting, personal trainers. Nothing worked long-term until I started GLP-1 therapy with Dr. Rhee. This is different because it actually addresses the root cause.",
    name: "Mark S.",
    city: "Tribeca, NY",
    stars: 5,
    lostLbs: 48,
  },
  {
    quote:
      "My A1C has dropped significantly since starting the program. Dr. Rhee coordinates with my endocrinologist, which gives me peace of mind that all aspects of my health are being considered.",
    name: "Patricia H.",
    city: "Chelsea, NY",
    stars: 5,
    lostLbs: 35,
  },
];

export default function TestimonialsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-cream">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">
            Patient Stories
          </p>
          <h1 className="font-serif text-5xl md:text-6xl leading-tight text-soft-black">
            Real Results, <span className="text-gold">Real People</span>
          </h1>
          <p className="mt-6 text-lg text-neutral-500 max-w-2xl mx-auto leading-relaxed">
            Hear from patients who have transformed their health with our
            medically supervised weight management program.
          </p>
        </div>
      </section>

      {/* Notice */}
      <section className="bg-warm py-4">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs text-neutral-400 tracking-wide">
            These are placeholder testimonials for demonstration purposes.
            Actual patient testimonials will be added as the program grows.
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-cream p-8 rounded-xl">
                <div className="flex gap-1 text-gold mb-4">
                  {[...Array(t.stars)].map((_, j) => (
                    <span key={j}>&#9733;</span>
                  ))}
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-soft-black">
                      {t.name}
                    </p>
                    <p className="text-xs text-neutral-400">{t.city}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-xl text-gold">
                      -{t.lostLbs} lbs
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-soft-black text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-serif text-4xl text-white">
            Start Your Success Story
          </h2>
          <p className="mt-4 text-neutral-400 leading-relaxed">
            Join the growing number of patients achieving real, lasting results
            with Dr. Rhee.
          </p>
          <Link
            href="/contact"
            className="inline-block mt-8 bg-gold hover:bg-gold-dark text-white text-sm tracking-wide uppercase px-10 py-4 rounded-full transition-colors"
          >
            Book Your Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
