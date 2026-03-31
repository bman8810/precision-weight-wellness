import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Dr. Libby Rhee",
  description:
    "Learn about Dr. Libby Rhee, DO, MS, FAAD — a board-certified dermatologist offering medically supervised GLP-1 weight management in NYC.",
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

const glp1Facts = [
  {
    title: "What are GLP-1 medications?",
    desc: "GLP-1 receptor agonists (like Semaglutide and Tirzepatide) are FDA-approved medications that mimic a natural hormone to regulate appetite, slow gastric emptying, and improve metabolic function.",
  },
  {
    title: "Proven clinical results",
    desc: "In landmark clinical trials, patients on Semaglutide lost an average of 15% of their body weight, while Tirzepatide showed up to 22.5% weight reduction — results previously achievable only through surgery.",
  },
  {
    title: "Beyond weight loss",
    desc: "GLP-1 medications have demonstrated significant cardiovascular benefits, improved blood sugar control, reduced inflammation, and may lower the risk of certain obesity-related conditions.",
  },
  {
    title: "Safe under medical supervision",
    desc: "When prescribed and monitored by a qualified physician, GLP-1 therapies have an excellent safety profile. Dr. Rhee carefully manages dosing, monitors for side effects, and adjusts treatment as needed.",
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
                src="/images/dr-rhee.jpg"
                alt="GLP-1 injection pen, fresh apple, and water — precision medical weight loss"
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
                weight loss through FDA-approved GLP-1 medications. Her approach
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
            Medicine-first weight management
          </h2>
          <div className="mt-10 space-y-6 text-neutral-500 leading-relaxed text-left max-w-3xl mx-auto">
            <p>
              At Precision Weight + Wellness, we believe that obesity is a
              chronic medical condition — not a failure of willpower. The latest
              science shows that biology, genetics, and hormones play a central
              role in weight regulation, and that effective treatment requires
              medical intervention, not just diet and exercise advice.
            </p>
            <p>
              Our program uses FDA-approved GLP-1 receptor agonist medications
              as the foundation of treatment, combined with nutritional
              guidance, lifestyle modification support, and ongoing physician
              monitoring. This is not a fad diet or a quick fix — it&apos;s a
              comprehensive, evidence-based approach to lasting health.
            </p>
          </div>
        </div>
      </section>

      {/* Science of GLP-1 */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mb-20">
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
              The Science
            </p>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-soft-black">
              Understanding GLP-1 medications
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {glp1Facts.map((fact, i) => (
              <div
                key={fact.title}
                className={`bg-cream p-10 rounded-2xl transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-y-[-2px] hover:shadow-[0_16px_40px_-12px_rgba(201,169,110,0.08)] ${
                  i === 0 ? "md:col-span-2" : ""
                }`}
              >
                <h3 className={`font-serif text-soft-black ${i === 0 ? "text-2xl" : "text-xl"}`}>
                  {fact.title}
                </h3>
                <p className={`mt-4 text-neutral-500 leading-relaxed ${i === 0 ? "text-base max-w-3xl" : "text-sm"}`}>
                  {fact.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-32 bg-cream">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-6">
            Our Location
          </p>
          <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-soft-black">
            Upper East Side, Manhattan
          </h2>
          <address className="mt-10 space-y-2 text-neutral-500 not-italic">
            <p>110 E 60th Street, Suite 800</p>
            <p>New York, NY 10022</p>
            <a
              href="tel:+12124334569"
              className="inline-block mt-3 text-gold hover:text-gold-dark transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
              212.433.4569
            </a>
          </address>
          <div className="mt-10 aspect-video rounded-2xl overflow-hidden shadow-[0_24px_48px_-16px_rgba(0,0,0,0.08)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/about-office.png"
              alt="Liora — Upper East Side, Manhattan office"
              className="w-full h-full object-cover"
              loading="lazy"
            />
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
            href="/contact"
            className="inline-block mt-10 bg-gold hover:bg-gold-dark text-white text-sm tracking-wide uppercase px-10 py-4 rounded-full transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-y-[-1px] hover:shadow-[0_8px_24px_-8px_rgba(201,169,110,0.4)]"
          >
            Book Your Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
