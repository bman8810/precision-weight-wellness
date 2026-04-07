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
        <div className="max-w-[1200px] mx-auto px-5 md:px-6 pt-32 pb-20 md:pt-48 md:pb-32 relative">
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
              {/* New York */}
              <div className="flex flex-col items-center text-center card-hover">
                <svg
                  viewBox="0 0 136 104"
                  className="w-24 h-auto mb-5 transition-transform duration-500 hover:scale-[1.06]"
                  aria-hidden="true"
                >
                  <path
                    d="m 91.4,4.2 -.6,1.9 1.4,.9 -.4,1.5 .5,3.2 2.2,2.3 -.4,2.2 .6,2 -.4,1 -.3,3.8 3.1,6.7 -.8,1.8 .9,2.2 .9,-1.6 1.9,1.5 3,14.2 -.5,2 1.1,1 -.5,15 .7,1 2.8,16.3 1.8,1.5 -3.5,3.4 1.7,2.2 -1.3,3.3 -1.5,1.7 -1.5,2.3 -.2,-.7 .4,-5.9 -14.6,-4.9 -1.6,-1.1 -1.9,.3 -3,-2.2 -3,-5.8 h -2 l -.4,-1.5 -1.7,-1.1 -70.5,13.9 -.8,-6 4.3,-3.9 .6,-1.7 3.9,-2.5 .6,-2.4 2.3,-2 .8,-1.1 -1.7,-3.3 -1.7,-.5 -1.8,-3 -.2,-3.2 7.6,-3.9 8.2,-1.6 h 4.4 l 3.2,1.6 .9,-.1 1.8,-1.6 3.4,-.7 h 3 l 2.6,-1.3 2.5,-2.6 2.4,-3.1 1.9,-.4 1.1,-.5 .4,-3.2 -1.4,-2.7 -1.2,-.7 2,-1.3 -.1,-1.8 h -1.5 l -2.3,-1.4 -.1,-3.1 6.2,-6.1 .7,-2.4 3.7,-6.3 5.9,-6.4 2.1,-1.7 2.5,.1 20.6,-5.2 z"
                    fill="rgba(201,169,110,0.35)"
                    stroke="rgba(201,169,110,0.5)"
                    strokeWidth="0.5"
                  />
                </svg>
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

              {/* Connecticut */}
              <div className="flex flex-col items-center text-center card-hover">
                <svg
                  viewBox="0 0 34 34"
                  className="w-24 h-auto mb-5 transition-transform duration-500 hover:scale-[1.06]"
                  aria-hidden="true"
                >
                  <path
                    d="m 31.7,15.7 .4,-1.1 -3.2,-12.3 -.1,-.3 -14.9,3.4 v .7 l -.9,.3 -.5,-.7 -10.5,2.4 2.8,16.3 1.8,1.5 -3.5,3.4 1.7,2.2 5.4,-4.5 1.7,-1.3 h .8 l 2.4,-3.1 1.4,.1 2.9,-1.1 h 2.1 l 5.3,-2.7 2.8,-.9 1,-1 1.5,.5 z"
                    fill="rgba(201,169,110,0.35)"
                    stroke="rgba(201,169,110,0.5)"
                    strokeWidth="0.15"
                  />
                </svg>
                <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">
                  Connecticut
                </p>
                <p className="font-serif text-[20px] tracking-[-0.01em] text-white">Telehealth</p>
                <p className="mt-2 text-[13px] text-white/35">In-person coming soon</p>
                <p className="mt-4 text-[15px] text-white/55 leading-[1.65]">
                  Virtual consultations available statewide.
                </p>
              </div>

              {/* Michigan */}
              <div className="flex flex-col items-center text-center card-hover">
                <svg
                  viewBox="0 0 169 141"
                  className="w-24 h-auto mb-5 transition-transform duration-500 hover:scale-[1.06]"
                  aria-hidden="true"
                >
                  <path
                    d="m 132.1,135.4 .1,1.4 21.4,-3.5 .5,-1.2 3.9,-5.9 v -4.3 l .8,-2.1 2.2,-.8 2,-7.8 1,-.5 1,.6 -.2,.6 -1.1,.8 .3,.9 .8,.4 1.9,-1.4 .4,-9.8 -1.6,-2.3 -1.2,-3.7 v -2.5 l -2.3,-4.4 v -1.8 l -1.2,-3.3 -2.3,-3 -2.9,-1 -4.8,3 -2.5,4.6 -.2,.9 -3,3.5 -1.5,-.2 -2.9,-2.8 -.1,-3.4 1.5,-1.9 2,-.2 1.2,-1.7 .2,-4 .8,-.8 1.1,-.1 .9,-1.7 -.2,-9.6 -.3,-1.3 -1.2,-1.2 -1.7,-1 -.1,-1.8 .7,-.6 1.8,.8 -.3,-1.7 -1.9,-2.7 -.7,-1.6 -1.1,-1.1 h -2.2 l -8.1,-2.9 -1.4,-1.7 -3.1,-.3 -1.2,.3 -4.4,-2.3 h -1.4 l .5,1 -2.7,-.1 .1,.6 .6,.6 -2.5,2.1 .1,1.8 1.5,2.3 1.5,.2 v .6 l -1.5,.5 -2.1,-.1 -2.8,2.5 .1,2.5 .4,5.8 -2.2,3.4 .8,-4.5 -.8,-.6 -.9,5.3 -1,-2.3 .5,-2.3 -.5,-1 .6,-1.3 -.6,-1.1 1,-1 v -1.2 l -1.3,.6 -1.3,3.1 -.7,.7 -1.3,2.4 -1.7,-.2 -.1,1.2 h -1.6 l .2,1.5 .2,2 -3,1.2 .1,1.3 1,1.7 -.1,5.2 -1.3,4.4 -1.7,2.5 1.2,1.4 .8,3.5 -1,2.5 -.2,2.1 1.7,3.4 2.5,4.9 1.2,1.9 1.6,6.9 -.1,8.8 -.9,3.9 -2,3.2 -.9,3.7 -2,3 -1.2,1 z m -95.8,-96.8 3,3.8 17,3.8 1.4,1 4,.8 .7,.5 2.8,-.2 4.9,.8 1.4,1.5 -1,1 .8,.8 3.8,.7 1.2,1.2 .1,4.4 -1.3,2.8 2,.1 1,-.8 .9,.8 -1.1,3.1 1,1.6 1.2,.3 .8,-1.8 2.9,-4.6 1.6,-6 2.3,-2 -.5,-1.6 .5,-.9 1,1.6 -.3,2.2 2.9,-2.2 .2,-2.3 2.1,.6 .8,-1.6 .7,.6 -.7,1.5 -1,.5 -1,2 1.4,1.8 1.1,-.5 -.5,-.7 1,-1.5 1.9,-1.7 h .8 l .2,-2.6 2,-1.8 7.9,-.5 1.9,-3.1 3.8,-.3 3.8,1.2 4.2,2.7 .7,-.2 -.2,-3.5 .7,-.2 4.5,1.1 1.5,-.2 2.9,-.7 1.7,.4 1.8,.1 v -1.1 l -.7,-.9 -1.5,-.2 -1.1,-.8 .5,-1.4 -.8,-.3 -2.6,.1 -.1,-1 1.1,-.8 .6,.8 .5,-1.8 -.7,-.7 .7,-.2 -1.4,-1.3 .3,-1.3 .1,-1.9 h -1.3 l -1.5,1 -1.9,.1 -.5,1.8 -1.9,.2 -.3,-1.2 -2.2,.1 -1,1.2 -.7,-.1 -.2,-.8 -2.6,.4 -.1,-4.8 1,-2 -.7,-.1 -1.8,1.1 h -2.2 l -3.8,2.7 -6.2,.3 -4.1,.8 -1.9,1.5 -1.4,1.3 -2.5,1.7 -.3,.8 -.6,-1.7 -1.3,-.6 v .6 l .7,.7 v 1.3 l -1.5,-.6 h -.6 l -.3,1.2 -2,-1.9 -1.3,-.2 -1.3,1.5 -3.2,-.1 -.5,-1.4 -2,-1.9 -1.3,-1.6 v -.7 l -1.1,-1.4 -2.6,-1.2 -3.3,-.1 -1.1,-.9 h -1.4 l -.7,.4 -2.2,2.2 -.7,1.1 -1,-.7 .2,-1 .8,-2.1 3.2,-5 .8,-.2 1.7,-1.9 .7,-1.6 3,-.6 .8,-.6 -.1,-1 -.5,-.5 -4.5,.2 -2,.5 -2.6,1.2 -1.2,1.2 -1.7,2.2 -1.8,1 -3.3,3.4 -.4,1.6 -7.4,4.6 -4,.5 -1.8,.4 -2.3,3 -1.8,.7 -4.4,2.3 z"
                    fill="rgba(201,169,110,0.35)"
                    stroke="rgba(201,169,110,0.5)"
                    strokeWidth="0.5"
                  />
                </svg>
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
