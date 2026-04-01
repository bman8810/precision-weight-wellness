import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Dr. Libby Rhee",
  description:
    "Learn about Dr. Libby Rhee, DO, MS, FAAD — a board-certified dermatologist offering medically supervised weight management in NYC.",
};

const credentials = [
  {
    label: "Education",
    items: [
      "Doctor of Osteopathic Medicine (DO)",
      "Master of Science (MS)",
    ],
  },
  {
    label: "Board Certifications",
    items: [
      "American Board of Dermatology",
      "Fellow, American Academy of Dermatology (FAAD)",
    ],
  },
  {
    label: "Affiliations",
    items: [
      "Clinical Instructor, Mount Sinai Icahn School of Medicine",
      "Founder, Liora",
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-24 bg-cream">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-6">
            About Us
          </p>
          <h1
            className="font-serif text-5xl md:text-6xl leading-[1.08] tracking-tight text-soft-black"
            style={{ textWrap: "balance" }}
          >
            Meet <span className="text-gold">Dr. Libby Rhee</span>
          </h1>
          <p className="mt-8 text-lg text-neutral-500 max-w-2xl mx-auto leading-relaxed">
            Board-certified dermatologist, clinical educator, and founder of
            Liora — now bringing the same
            evidence-based approach to medical weight management.
          </p>
        </div>
      </section>

      {/* Bio */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Photo */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-gold/8 via-transparent to-gold/5 rounded-[3rem] blur-2xl" />
            <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(201,169,110,0.18)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/libby-photo-1.jpeg"
                alt="Dr. Libby Rhee, DO, MS, FAAD — board-certified dermatologist and founder of Precision Weight & Wellness"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-soft-black/15 via-transparent to-transparent" />
            </div>
          </div>

          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
              Your Physician
            </p>
            <h2 className="font-serif text-4xl tracking-tight text-soft-black">
              Dr. Libby Rhee
            </h2>
            <p className="text-sm text-neutral-400 mt-2">DO, MS, FAAD</p>

            <div className="mt-8 space-y-5 text-neutral-500 leading-relaxed">
              <p>
                Dr. Libby Rhee is a board-certified dermatologist and the
                founder of Liora on Manhattan&apos;s
                Upper East Side. A Clinical Instructor at Mount Sinai&apos;s
                Icahn School of Medicine, she is recognized as one of New
                York&apos;s leading physicians with thousands of five-star
                patient reviews.
              </p>
              <p>
                With her deep understanding of the body&apos;s physiology and
                her commitment to evidence-based medicine, Dr. Rhee launched
                Precision Weight + Wellness to help patients achieve sustainable
                weight loss through FDA-approved weight loss medications,
                including GLP-1 receptor agonists, dual agonists, and emerging therapies. Her approach
                combines medical expertise with genuine compassion — treating
                each patient as a whole person, not just a number on a scale.
              </p>
              <p>
                Dr. Rhee believes that weight management is healthcare, not
                vanity. She works closely with every patient to develop a
                personalized plan that accounts for their unique biology, health
                history, and lifestyle goals.
              </p>
            </div>

            {/* Credentials */}
            <div className="mt-12 space-y-8">
              {credentials.map((c) => (
                <div key={c.label}>
                  <p className="text-[11px] tracking-[0.2em] uppercase text-gold mb-3">
                    {c.label}
                  </p>
                  <ul className="space-y-1.5">
                    {c.items.map((item) => (
                      <li
                        key={item}
                        className="text-sm text-neutral-500"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="relative py-32 bg-cream overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-x-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-6">
            Our Philosophy
          </p>
          <h2
            className="font-serif text-4xl md:text-5xl tracking-tight text-soft-black"
            style={{ textWrap: "balance" }}
          >
            Medicine-enabled wellness
          </h2>
          <div className="mt-10 space-y-6 text-neutral-500 leading-relaxed text-left max-w-3xl mx-auto">
            <p>
              At Precision Weight + Wellness, we believe that every
              patient&apos;s journey is unique. For some, FDA-approved
              medications are the foundation of treatment. For others, a
              combination of nutritional guidance, lifestyle modification, and
              behavioral support is the right path. We meet you where you are.
            </p>
            <p>
              Our program is built on the science of weight management — but
              it&apos;s driven by your goals, your preferences, and your life.
              Whether you&apos;re exploring medication options or looking for a
              physician-guided wellness plan without them, Dr. Rhee will work
              with you to create an approach that fits.
            </p>
          </div>
        </div>
      </section>

      {/* Where We Practice */}
      <section className="py-32 bg-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-6">
              Where we practice
            </p>
            <h2
              className="font-serif text-4xl md:text-5xl tracking-tight text-soft-black"
              style={{ textWrap: "balance" }}
            >
              Multiple locations, one standard of care
            </h2>
            <p className="mt-6 text-neutral-500 leading-relaxed max-w-2xl mx-auto">
              Dr. Rhee is licensed to provide medical weight management across
              three states — with in-person visits and telehealth available.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-neutral-200 rounded-2xl p-8">
              <p className="text-[11px] tracking-[0.2em] uppercase text-gold mb-3">
                New York
              </p>
              <p className="font-serif text-xl text-soft-black">
                In-person + telehealth
              </p>
              <p className="mt-4 text-sm text-neutral-500">
                New York City &amp; Middletown, NY
              </p>
            </div>
            <div className="bg-white border border-neutral-200 rounded-2xl p-8">
              <p className="text-[11px] tracking-[0.2em] uppercase text-gold mb-3">
                Connecticut
              </p>
              <p className="font-serif text-xl text-soft-black">Telehealth</p>
              <p className="mt-2 text-sm text-neutral-400">In-person coming soon</p>
              <p className="mt-4 text-sm text-neutral-500">
                Virtual consultations available statewide.
              </p>
            </div>
            <div className="bg-white border border-neutral-200 rounded-2xl p-8">
              <p className="text-[11px] tracking-[0.2em] uppercase text-gold mb-3">
                Michigan
              </p>
              <p className="font-serif text-xl text-soft-black">Telehealth</p>
              <p className="mt-2 text-sm text-neutral-400">In-person coming soon</p>
              <p className="mt-4 text-sm text-neutral-500">
                Virtual consultations available statewide.
              </p>
            </div>
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
            Start your weight loss journey
          </h2>
          <p className="mt-6 text-neutral-400 leading-relaxed">
            Schedule a consultation with Dr. Rhee to learn how our medically
            supervised program can help you reach your goals.
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
