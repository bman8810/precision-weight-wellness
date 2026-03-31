import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Precision Weight + Wellness | Medical Weight Loss NYC | Dr. Libby Rhee",
};

const steps = [
  {
    num: "01",
    title: "Book a Consultation",
    desc: "Meet with Dr. Rhee to discuss your health history, weight loss goals, and determine if GLP-1 therapy is right for you.",
  },
  {
    num: "02",
    title: "Your Personalized Plan",
    desc: "Receive a customized treatment protocol including medication selection, dosing schedule, nutrition guidance, and lifestyle support.",
  },
  {
    num: "03",
    title: "Ongoing Support",
    desc: "Regular check-ins, dose adjustments, and continuous monitoring to ensure safe, effective, and lasting results.",
  },
];

const reasons = [
  {
    title: "Board-Certified Physician",
    desc: "Dr. Libby Rhee, DO, MS, FAAD brings years of medical expertise and a holistic approach to every patient's weight management journey.",
  },
  {
    title: "Science-Based Approach",
    desc: "We use FDA-approved GLP-1 medications — Semaglutide and Tirzepatide — backed by robust clinical evidence for safe, significant weight loss.",
  },
  {
    title: "Premium NYC Location",
    desc: "Located on the Upper East Side at 110 E 60th Street, our practice offers a comfortable, private setting for your care.",
  },
  {
    title: "Personalized Care",
    desc: "No cookie-cutter programs. Every treatment plan is tailored to your unique biology, health conditions, and lifestyle goals.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center bg-cream pt-32">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">
              Medically Supervised Weight Loss
            </p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight text-soft-black">
              Your Weight Loss
              <br />
              Journey,{" "}
              <span className="text-gold">Guided by Science</span>
            </h1>
            <p className="mt-6 text-lg text-neutral-500 max-w-lg leading-relaxed">
              Board-certified physician Dr. Libby Rhee offers personalized medical weight management — GLP-1s, dual agonists, metabolic agents, and behavioral support
              — in a premium Upper East Side setting.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="bg-gold hover:bg-gold-dark text-white text-sm tracking-wide uppercase px-8 py-4 rounded-full transition-colors"
              >
                Start Your Journey
              </Link>
              <Link
                href="/eligibility"
                className="border border-neutral-300 text-neutral-600 hover:border-gold hover:text-gold text-sm tracking-wide uppercase px-8 py-4 rounded-full transition-colors"
              >
                Check Eligibility
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-warm flex items-center justify-center">
              <div className="text-center p-8">
                <p className="font-serif text-6xl text-gold mb-4">PWW</p>
                <p className="text-sm tracking-[0.2em] uppercase text-neutral-400">
                  Precision Weight + Wellness
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-soft-black py-12">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-3 gap-8 text-center">
          {[
            { value: "15%+", label: "Average Body Weight Lost" },
            { value: "FDA", label: "Approved Medications" },
            { value: "1:1", label: "Physician-Led Care" },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-serif text-3xl md:text-4xl text-gold">
                {s.value}
              </p>
              <p className="text-xs tracking-[0.2em] uppercase text-neutral-400 mt-2">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">
              Why Choose Us
            </p>
            <h2 className="font-serif text-4xl text-soft-black">
              Expert Care You Can Trust
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reasons.map((r) => (
              <div key={r.title} className="bg-cream p-8 rounded-xl">
                <h3 className="font-serif text-xl text-soft-black">
                  {r.title}
                </h3>
                <p className="mt-3 text-sm text-neutral-500 leading-relaxed">
                  {r.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">
              How It Works
            </p>
            <h2 className="font-serif text-4xl text-soft-black">
              Three Simple Steps
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.num} className="bg-white p-8 rounded-xl">
                <p className="font-serif text-3xl text-gold mb-4">
                  {step.num}
                </p>
                <h3 className="font-serif text-xl text-soft-black">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-neutral-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/how-it-works"
              className="inline-block text-sm tracking-wide uppercase text-gold hover:text-gold-dark transition-colors"
            >
              Learn More About Our Process &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Results / Testimonials Teaser */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">
              Patient Results
            </p>
            <h2 className="font-serif text-4xl text-soft-black">
              Real People, Real Results
            </h2>
            <p className="mt-4 text-neutral-500 max-w-2xl mx-auto">
              Our patients are achieving life-changing results with medically
              supervised medical weight management. Clinical studies show average weight loss
              of 15-20% of body weight.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "The program has completely changed my relationship with food. I've lost 45 pounds and feel better than I have in years.",
                name: "Sarah M.",
                city: "New York, NY",
              },
              {
                quote:
                  "Dr. Rhee took the time to understand my health history and created a plan that actually works. The support has been incredible.",
                name: "James R.",
                city: "New York, NY",
              },
              {
                quote:
                  "I was skeptical about weight loss medications, but the science-based approach here convinced me. Down 30 pounds in 4 months.",
                name: "Michelle K.",
                city: "New York, NY",
              },
            ].map((t, i) => (
              <div key={i} className="bg-cream p-8 rounded-xl">
                <div className="flex gap-1 text-gold mb-4">
                  {[...Array(5)].map((_, j) => (
                    <span key={j}>&#9733;</span>
                  ))}
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="mt-4 text-sm font-medium text-soft-black">
                  {t.name}
                </p>
                <p className="text-xs text-neutral-400">{t.city}</p>
                <p className="mt-2 text-[10px] tracking-wide uppercase text-neutral-300">
                  Placeholder testimonial
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/testimonials"
              className="inline-block text-sm tracking-wide uppercase text-gold hover:text-gold-dark transition-colors"
            >
              See All Testimonials &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Insurance Check Teaser */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">
            Insurance & Eligibility
          </p>
          <h2 className="font-serif text-3xl text-soft-black">
            Check Your Insurance Coverage
          </h2>
          <p className="mt-4 text-neutral-500 leading-relaxed">
            While our program is cash-pay, many patients qualify for insurance
            coverage of weight management medications. Use our free eligibility tool to
            check your coverage and estimate your potential results.
          </p>
          <Link
            href="/eligibility"
            className="inline-block mt-8 bg-gold hover:bg-gold-dark text-white text-sm tracking-wide uppercase px-8 py-4 rounded-full transition-colors"
          >
            Check Your Eligibility
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-soft-black text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-serif text-4xl text-white">
            Ready to Transform Your Health?
          </h2>
          <p className="mt-4 text-neutral-400 leading-relaxed">
            Schedule a consultation with Dr. Rhee and take the first step toward
            lasting, medically supported weight loss.
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
