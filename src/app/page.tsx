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
      <section className="relative min-h-[100dvh] flex items-center bg-cream pt-32 pb-16 overflow-hidden">
        {/* Subtle radial glow behind content */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p
              className="animate-fade-up text-[11px] tracking-[0.3em] uppercase text-gold mb-6"
              style={{ animationDelay: "0.1s" }}
            >
              Medically Supervised Weight Loss
            </p>
            <h1
              className="animate-fade-up font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.08] tracking-tight text-soft-black"
              style={{ animationDelay: "0.2s", textWrap: "balance" }}
            >
              Your Weight Loss
              <br />
              Journey,{" "}
              <span className="text-gold">Guided by Science</span>
            </h1>
            <p
              className="animate-fade-up mt-8 text-lg text-neutral-500 max-w-lg leading-relaxed"
              style={{ animationDelay: "0.35s" }}
            >
              Board-certified physician Dr. Libby Rhee offers personalized medical
              weight management — GLP-1s, dual agonists, metabolic agents, and
              behavioral support
              — in a premium Upper East Side setting.
            </p>
            <div
              className="animate-fade-up mt-10 flex flex-wrap gap-4"
              style={{ animationDelay: "0.5s" }}
            >
              <Link
                href="/contact"
                className="bg-gold hover:bg-gold-dark text-white text-sm tracking-wide uppercase px-8 py-4 rounded-full transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-y-[-1px] hover:shadow-[0_8px_24px_-8px_rgba(201,169,110,0.4)]"
              >
                Start Your Journey
              </Link>
              <Link
                href="/eligibility"
                className="border border-neutral-300 text-neutral-600 hover:border-gold hover:text-gold text-sm tracking-wide uppercase px-8 py-4 rounded-full transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-y-[-1px]"
              >
                Check Eligibility
              </Link>
            </div>
          </div>
          <div
            className="animate-fade-up relative hidden lg:block"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="absolute -inset-6 bg-gradient-to-br from-gold/8 via-transparent to-gold/5 rounded-[3rem] blur-2xl" />
            <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(201,169,110,0.18)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/dr-rhee.jpg"
                alt="GLP-1 injection pen, fresh apple, and water — precision medical weight loss"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-soft-black/20 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-soft-black py-16">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
          {[
            { value: "15%+", label: "Average Body Weight Lost" },
            { value: "FDA", label: "Approved Medications" },
            { value: "1:1", label: "Physician-Led Care" },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-serif text-3xl md:text-4xl text-gold tabular-nums">
                {s.value}
              </p>
              <p className="text-[11px] tracking-[0.2em] uppercase text-neutral-400 mt-3">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mb-16">
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
              Why Choose Us
            </p>
            <h2
              className="font-serif text-4xl md:text-5xl tracking-tight text-soft-black"
              style={{ textWrap: "balance" }}
            >
              Expert Care You Can Trust
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reasons.map((r, i) => (
              <div
                key={r.title}
                className={`bg-cream p-10 rounded-2xl transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-y-[-2px] hover:shadow-[0_16px_40px_-12px_rgba(201,169,110,0.08)] ${
                  i === 0 ? "md:row-span-2 flex flex-col justify-center" : ""
                }`}
              >
                <h3 className={`font-serif text-soft-black ${i === 0 ? "text-2xl" : "text-xl"}`}>
                  {r.title}
                </h3>
                <p className={`mt-4 text-neutral-500 leading-relaxed ${i === 0 ? "text-base" : "text-sm"}`}>
                  {r.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Link
              href="/why-us"
              className="inline-block text-sm tracking-wide uppercase text-gold hover:text-gold-dark transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
              Learn what makes us different &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works — editorial layout */}
      <section className="py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mb-20">
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
              How It Works
            </p>
            <h2
              className="font-serif text-4xl md:text-5xl tracking-tight text-soft-black"
              style={{ textWrap: "balance" }}
            >
              Three simple steps to lasting results
            </h2>
          </div>
          <div className="max-w-4xl space-y-16">
            {steps.map((step) => (
              <div
                key={step.num}
                className="flex gap-8 md:gap-12 items-start group"
              >
                <p className="font-serif text-5xl md:text-6xl text-gold/30 group-hover:text-gold transition-colors duration-500 shrink-0 w-16 md:w-24 tabular-nums leading-none pt-1">
                  {step.num}
                </p>
                <div className="border-l border-neutral-200 pl-8 md:pl-12 group-hover:border-gold/40 transition-colors duration-500">
                  <h3 className="font-serif text-2xl text-soft-black">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-neutral-500 leading-relaxed max-w-lg">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16">
            <Link
              href="/how-it-works"
              className="inline-block text-sm tracking-wide uppercase text-gold hover:text-gold-dark transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
              Learn more about our process &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Results / Testimonials Teaser — featured layout */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mb-16">
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
              Patient Results
            </p>
            <h2
              className="font-serif text-4xl md:text-5xl tracking-tight text-soft-black"
              style={{ textWrap: "balance" }}
            >
              Real people, real results
            </h2>
            <p className="mt-6 text-neutral-500 leading-relaxed">
              Our patients are achieving life-changing results with medically
              supervised medical weight management. Clinical studies show average weight loss
              of 15-20% of body weight.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Featured testimonial */}
            <div className="bg-cream p-10 md:p-14 rounded-2xl md:row-span-2 flex flex-col justify-center transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-[0_16px_40px_-12px_rgba(201,169,110,0.08)]">
              <div className="flex gap-1 text-gold mb-6">
                {[...Array(5)].map((_, j) => (
                  <span key={j} className="text-lg">&#9733;</span>
                ))}
              </div>
              <p className="text-lg text-neutral-600 leading-relaxed italic">
                &ldquo;The program has completely changed my relationship with food. I&apos;ve lost 45 pounds and feel better than I have in years.&rdquo;
              </p>
              <div className="mt-8">
                <p className="font-medium text-soft-black">Sarah M.</p>
                <p className="text-xs text-neutral-400 mt-1">New York, NY</p>
              </div>
              <p className="mt-3 text-[10px] tracking-wide uppercase text-neutral-300">
                Placeholder testimonial
              </p>
            </div>
            {/* Supporting testimonials */}
            {[
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
              <div
                key={i}
                className="bg-cream p-8 rounded-2xl transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-[0_16px_40px_-12px_rgba(201,169,110,0.08)]"
              >
                <div className="flex gap-1 text-gold mb-4">
                  {[...Array(5)].map((_, j) => (
                    <span key={j}>&#9733;</span>
                  ))}
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-5">
                  <p className="text-sm font-medium text-soft-black">
                    {t.name}
                  </p>
                  <p className="text-xs text-neutral-400">{t.city}</p>
                </div>
                <p className="mt-2 text-[10px] tracking-wide uppercase text-neutral-300">
                  Placeholder testimonial
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Link
              href="/testimonials"
              className="inline-block text-sm tracking-wide uppercase text-gold hover:text-gold-dark transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
              See all testimonials &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Insurance Check Teaser */}
      <section className="relative py-28 bg-cream overflow-hidden">
        <div className="absolute top-1/2 right-0 translate-x-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
            Insurance & eligibility
          </p>
          <h2
            className="font-serif text-3xl md:text-4xl tracking-tight text-soft-black"
            style={{ textWrap: "balance" }}
          >
            Check Your Insurance Coverage
          </h2>
          <p className="mt-6 text-neutral-500 leading-relaxed max-w-2xl mx-auto">
            While our program is cash-pay, many patients qualify for insurance
            coverage of weight management medications. Use our free eligibility tool to
            check your coverage and estimate your potential results.
          </p>
          <Link
            href="/eligibility"
            className="inline-block mt-10 bg-gold hover:bg-gold-dark text-white text-sm tracking-wide uppercase px-8 py-4 rounded-full transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-y-[-1px] hover:shadow-[0_8px_24px_-8px_rgba(201,169,110,0.4)]"
          >
            Check Your Eligibility
          </Link>
        </div>
      </section>

      {/* Where We Practice — map */}
      <section className="py-32 bg-soft-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-6">
                Multi-state practice
              </p>
              <h2
                className="font-serif text-4xl md:text-5xl tracking-tight text-white"
                style={{ textWrap: "balance" }}
              >
                Where we practice
              </h2>
              <p className="mt-6 text-neutral-400 leading-relaxed max-w-lg">
                Dr. Rhee is licensed to provide medical weight management
                across three states — with in-person visits at our Upper East
                Side office and telehealth available for qualifying patients.
              </p>
            </div>

            {/* Minimal geographic map */}
            <div className="relative">
              <svg
                viewBox="0 0 480 340"
                fill="none"
                className="w-full max-w-md mx-auto"
                role="img"
                aria-label="Map showing practice locations in New York, Connecticut, and Michigan"
              >
                {/* Grid lines */}
                <line x1="0" y1="85" x2="480" y2="85" stroke="#2d2d2d" strokeWidth="0.5" strokeDasharray="4 8" />
                <line x1="0" y1="170" x2="480" y2="170" stroke="#2d2d2d" strokeWidth="0.5" strokeDasharray="4 8" />
                <line x1="0" y1="255" x2="480" y2="255" stroke="#2d2d2d" strokeWidth="0.5" strokeDasharray="4 8" />
                <line x1="120" y1="0" x2="120" y2="340" stroke="#2d2d2d" strokeWidth="0.5" strokeDasharray="4 8" />
                <line x1="240" y1="0" x2="240" y2="340" stroke="#2d2d2d" strokeWidth="0.5" strokeDasharray="4 8" />
                <line x1="360" y1="0" x2="360" y2="340" stroke="#2d2d2d" strokeWidth="0.5" strokeDasharray="4 8" />

                {/* Connecting arcs */}
                <path d="M 145 140 Q 270 90 370 115" stroke="#c9a96e" strokeWidth="1" opacity="0.15" />
                <path d="M 370 115 L 395 160" stroke="#c9a96e" strokeWidth="1" opacity="0.15" />

                {/* Michigan */}
                <circle cx="145" cy="140" r="28" fill="#c9a96e" opacity="0.06" />
                <circle cx="145" cy="140" r="14" fill="#c9a96e" opacity="0.12" />
                <circle cx="145" cy="140" r="5.5" fill="#c9a96e" />
                <text x="145" y="188" textAnchor="middle" fill="#c9a96e" fontSize="12" letterSpacing="0.12em" className="font-sans">MI</text>
                <text x="145" y="206" textAnchor="middle" fill="#555" fontSize="9" className="font-sans">Michigan</text>

                {/* New York — primary, largest marker */}
                <circle cx="370" cy="115" r="38" fill="#c9a96e" opacity="0.06" />
                <circle cx="370" cy="115" r="20" fill="#c9a96e" opacity="0.12" />
                <circle cx="370" cy="115" r="8" fill="#c9a96e" />
                <text x="370" y="78" textAnchor="middle" fill="#c9a96e" fontSize="14" fontWeight="500" letterSpacing="0.12em" className="font-sans">NY</text>
                <text x="370" y="95" textAnchor="middle" fill="#555" fontSize="9" className="font-sans">New York</text>

                {/* Connecticut */}
                <circle cx="395" cy="162" r="22" fill="#c9a96e" opacity="0.06" />
                <circle cx="395" cy="162" r="11" fill="#c9a96e" opacity="0.12" />
                <circle cx="395" cy="162" r="4.5" fill="#c9a96e" />
                <text x="430" y="157" textAnchor="start" fill="#c9a96e" fontSize="12" letterSpacing="0.12em" className="font-sans">CT</text>
                <text x="430" y="173" textAnchor="start" fill="#555" fontSize="9" className="font-sans">Connecticut</text>
              </svg>
            </div>
          </div>

          {/* Location detail cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
            <div className="border border-neutral-800 rounded-2xl p-8 transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-gold/30">
              <p className="text-[11px] tracking-[0.2em] uppercase text-gold mb-3">
                New York
              </p>
              <p className="font-serif text-xl text-white">
                In-person + telehealth
              </p>
              <address className="mt-4 space-y-1.5 text-sm text-neutral-400 not-italic">
                <p>110 E 60th Street, Suite 800</p>
                <p>New York, NY 10022</p>
                <a
                  href="tel:+12124334569"
                  className="block mt-2 text-gold hover:text-gold-dark transition-colors"
                >
                  212.433.4569
                </a>
              </address>
            </div>
            <div className="border border-neutral-800 rounded-2xl p-8 transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-gold/30">
              <p className="text-[11px] tracking-[0.2em] uppercase text-gold mb-3">
                Connecticut
              </p>
              <p className="font-serif text-xl text-white">Telehealth</p>
              <p className="mt-4 text-sm text-neutral-400">
                Virtual consultations available for qualifying patients
                statewide.
              </p>
            </div>
            <div className="border border-neutral-800 rounded-2xl p-8 transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-gold/30">
              <p className="text-[11px] tracking-[0.2em] uppercase text-gold mb-3">
                Michigan
              </p>
              <p className="font-serif text-xl text-white">Telehealth</p>
              <p className="mt-4 text-sm text-neutral-400">
                Virtual consultations available for qualifying patients
                statewide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 bg-cream text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-2xl mx-auto px-6">
          <h2
            className="font-serif text-4xl md:text-5xl tracking-tight text-soft-black"
            style={{ textWrap: "balance" }}
          >
            Ready to transform your health?
          </h2>
          <p className="mt-6 text-neutral-500 leading-relaxed">
            Schedule a consultation with Dr. Rhee and take the first step toward
            lasting, medically supported weight loss.
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
