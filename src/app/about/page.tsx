import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

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
      {/* Hero — centered text with cutout on right */}
      <section className="bg-navy relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6 pt-28 pb-16 md:pt-40 md:pb-24 relative">
          <div className="md:max-w-[60%]">
            <p
              className="animate-fade-up text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-5"
              style={{ animationDelay: "0.1s" }}
            >
              About Us
            </p>
            <h1
              className="animate-fade-up font-serif text-[clamp(2.5rem,5.5vw,4.25rem)] leading-[1.08] tracking-[-0.02em] text-white"
              style={{ animationDelay: "0.2s" }}
            >
              Meet <em className="text-gold">Dr. Libby Rhee</em>
            </h1>
            <p
              className="animate-fade-up mt-6 text-[16px] text-white/70 leading-[1.7] max-w-xl"
              style={{ animationDelay: "0.3s" }}
            >
              Board-certified dermatologist, clinical educator, and founder of
              Liora — now bringing the same evidence-based approach to medical
              weight management.
            </p>
          </div>

          {/* Cutout portrait — right side, bigger & cropped */}
          <div className="hidden md:block absolute top-20 -right-12 w-[44%] max-w-[520px] -bottom-16">
            <Image
              src="/images/doctor/libby-pink-dress-no-background.png"
              alt="Dr. Libby Rhee"
              fill
              className="object-contain object-top"
              priority
            />
          </div>
          {/* Mobile: transparent portrait layered behind text */}
          <div
            className="md:hidden absolute top-20 -right-6 w-[55%] h-[80%] pointer-events-none"
            style={{
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0) 80%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0) 80%)",
            }}
          >
            <Image
              src="/images/doctor/libby-pink-dress-no-background.png"
              alt=""
              fill
              className="object-contain object-top"
              priority
            />
          </div>
        </div>
      </section>

      {/* Credentials ribbon */}
      <section className="bg-navy-deep border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6 py-8 md:py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {credentials.map((c) => (
              <div key={c.label}>
                <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-2.5">
                  {c.label}
                </p>
                <ul className="space-y-1">
                  {c.items.map((item) => (
                    <li
                      key={item}
                      className="text-[14px] text-white/60 leading-[1.6]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy — cream */}
      <section className="py-14 md:py-24 bg-cream">
        <ScrollReveal>
          <div className="max-w-[1200px] mx-auto px-5 md:px-6 text-center">
            <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-5">
              Our Philosophy
            </p>
            <h2
              className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-navy"
              style={{ textWrap: "balance" }}
            >
              Medicine-enabled <em className="text-gold">wellness</em>
            </h2>
            <div className="mt-10 space-y-6 text-[15px] text-body leading-[1.65] text-left max-w-3xl mx-auto">
              <p>
                At Precision Weight + Wellness, we believe that every
                patient&apos;s journey is unique. For some, FDA-approved
                medications are the foundation of treatment. For others, a
                combination of nutritional guidance, lifestyle modification, and
                behavioral support is the right path. <em className="not-italic text-navy font-medium">We meet you where you are.</em>
              </p>
              <p>
                Our program is built on the science of weight management — but
                it&apos;s driven by your goals, your metabolism, your preferences, and your life.
                Whether you&apos;re exploring medication options or looking for a
                physician-guided wellness plan without them, Dr. Rhee will work
                with you to create an approach that fits.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Office Gallery — white */}
      <section className="py-14 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">
                Our Space
              </p>
              <h2 className="font-serif text-[clamp(2rem,4vw,2.75rem)] leading-[1.1] tracking-[-0.02em] text-navy">
                A Calm, Private Setting for Your <em className="text-gold">Care</em>
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="col-span-2 doppelrand doppelrand-light">
                <div className="relative aspect-[16/9] rounded-[16px] overflow-hidden">
                  <Image src="/images/office/office-1.jpg" alt="Liora Dermatology office" fill className="object-cover" />
                </div>
              </div>
              <div className="doppelrand doppelrand-light">
                <div className="relative aspect-square rounded-[16px] overflow-hidden">
                  <Image src="/images/office/office-3.jpg" alt="Liora Dermatology office" fill className="object-cover" />
                </div>
              </div>
              <div className="doppelrand doppelrand-light">
                <div className="relative aspect-square rounded-[16px] overflow-hidden">
                  <Image src="/images/office/office-4.jpg" alt="Liora Dermatology office" fill className="object-cover" />
                </div>
              </div>
              <div className="col-span-2 doppelrand doppelrand-light">
                <div className="relative aspect-[16/9] rounded-[16px] overflow-hidden">
                  <Image src="/images/office/office-2.jpg" alt="Liora Dermatology office" fill className="object-cover" />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Where We Practice — navy-deep */}
      <section className="py-14 md:py-24 bg-navy-deep">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">
                Where we practice
              </p>
              <h2
                className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-white"
                style={{ textWrap: "balance" }}
              >
                Multiple locations, one standard of <em className="text-gold">care</em>
              </h2>
              <p className="mt-4 text-[16px] text-white/60 leading-[1.7] max-w-2xl mx-auto">
                Dr. Rhee is licensed to provide medical weight management across
                three states — with in-person visits and telehealth available.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200} stagger={100}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="doppelrand doppelrand-dark h-full">
                <div className="bg-white/8 border border-white/10 rounded-[18px] p-8 card-hover h-full">
                  <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">
                    New York
                  </p>
                  <p className="font-serif text-[20px] tracking-[-0.01em] text-white">
                    In-person + telehealth
                  </p>
                  <p className="mt-4 text-[15px] text-white/55 leading-[1.65]">
                    New York City &amp; Middletown, NY
                  </p>
                </div>
              </div>
              <div className="doppelrand doppelrand-dark h-full">
                <div className="bg-white/8 border border-white/10 rounded-[18px] p-8 card-hover h-full">
                  <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">
                    Connecticut
                  </p>
                  <p className="font-serif text-[20px] tracking-[-0.01em] text-white">Telehealth</p>
                  <p className="mt-2 text-[13px] text-white/35">In-person coming soon</p>
                  <p className="mt-4 text-[15px] text-white/55 leading-[1.65]">
                    Virtual consultations available statewide.
                  </p>
                </div>
              </div>
              <div className="doppelrand doppelrand-dark h-full">
                <div className="bg-white/8 border border-white/10 rounded-[18px] p-8 card-hover h-full">
                  <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">
                    Michigan
                  </p>
                  <p className="font-serif text-[20px] tracking-[-0.01em] text-white">Telehealth</p>
                  <p className="mt-2 text-[13px] text-white/35">In-person coming soon</p>
                  <p className="mt-4 text-[15px] text-white/55 leading-[1.65]">
                    Virtual consultations available statewide.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA — white */}
      <section className="py-14 md:py-24 bg-white text-center">
        <ScrollReveal>
          <div className="max-w-[680px] mx-auto px-5 md:px-6">
            <h2
              className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-navy"
              style={{ textWrap: "balance" }}
            >
              Start your weight loss <em className="text-gold">journey</em>
            </h2>
            <p className="mt-4 text-[16px] text-body leading-[1.7]">
              Schedule a consultation with Dr. Rhee to learn how our medically
              supervised program can help you reach your goals.
            </p>
            <div className="mt-8">
              <Link href="/book" className="btn-gold">
                Book Your Consultation
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
