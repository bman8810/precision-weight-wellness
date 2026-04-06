import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title:
    "Precision Weight + Wellness | Medical Weight Loss NYC | Dr. Libby Rhee",
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

export default function Home() {
  return (
    <>
      {/* ── Hero — navy ── */}
      <section className="bg-navy pt-20">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6 pt-14 pb-14 md:pt-28 md:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[72px] items-center">
            <div>
              <p
                className="animate-fade-up flex items-center gap-2 text-sage text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-5"
                style={{ animationDelay: "0.1s" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                Precision Weight + Wellness
              </p>
              <h1
                className="animate-fade-up font-serif text-[clamp(2.75rem,5.5vw,4.25rem)] leading-[1.08] tracking-[-0.02em] text-white"
                style={{ animationDelay: "0.2s" }}
              >
                Your journey,
                <br />
                <em className="text-gold">refined.</em>
              </h1>
              <p
                className="animate-fade-up text-[16px] text-white/65 leading-[1.7] mt-6 max-w-md"
                style={{ animationDelay: "0.35s" }}
              >
                A clinical-grade, doctor-led GLP-1 weight management program
                that bridges the gap between metabolic science and personal
                wellness.
              </p>
              <div
                className="animate-fade-up mt-8 flex flex-col sm:flex-row gap-3"
                style={{ animationDelay: "0.5s" }}
              >
                <Link href="/book" className="btn-gold w-full sm:w-auto justify-center group">
                  Start your journey
                  <ArrowIcon className="text-navy-deep transition-transform duration-500 group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/science"
                  className="inline-flex items-center justify-center text-[15px] font-medium text-white/70 border border-white/25 rounded-full px-8 py-[15px] min-h-[48px] hover:bg-white/10 hover:text-white active:scale-[0.98] w-full sm:w-auto"
                >
                  View science
                </Link>
              </div>
            </div>

            {/* Hero images — Doppelrand shells */}
            <div
              className="animate-fade-up grid grid-cols-2 gap-4"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="doppelrand doppelrand-dark">
                <div className="rounded-[16px] overflow-hidden aspect-[3/4]">
                  <Image
                    src="/images/apple/warm-products.jpg"
                    alt="GLP-1 weight loss medications"
                    width={400}
                    height={533}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
              <div className="doppelrand doppelrand-dark">
                <div className="rounded-[16px] overflow-hidden aspect-[3/4]">
                  <Image
                    src="/images/apple/doctor-portrait.jpg"
                    alt="Dr. Libby Rhee"
                    width={400}
                    height={533}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Stats — cream ── */}
      <section className="bg-cream py-14 md:py-20">
        <ScrollReveal>
          <div className="max-w-[1200px] mx-auto px-5 md:px-6">
            <div className="grid grid-cols-3 gap-6 md:gap-10 text-center">
              {[
                { value: "15–22%", label: "Average body weight lost" },
                { value: "FDA", label: "Approved medications" },
                { value: "1:1", label: "Physician-led care" },
              ].map((s, i) => (
                <div key={s.label} className={`${i > 0 ? "border-l border-[rgba(27,42,74,0.08)]" : ""} px-2`}>
                  <p className="font-serif text-[clamp(28px,4vw,44px)] font-semibold tracking-[-0.03em] text-gold leading-[1]">
                    {s.value}
                  </p>
                  <p className="text-[10.5px] uppercase tracking-[0.14em] font-semibold text-light mt-3">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── The Science of Satiety — teal to navy gradient ── */}
      <section
        className="py-14 md:py-24"
        style={{ background: "linear-gradient(180deg, #1D5C4D 0%, #0F1D35 100%)" }}
      >
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <ScrollReveal>
            <div className="mb-16">
              <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">Clinical science</p>
              <h2 className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-white max-w-xl">
                The Science of{" "}<em className="text-gold">Satiety</em>
              </h2>
              <p className="text-[16px] text-white/60 leading-[1.7] mt-4 max-w-2xl">
                GLP-1 is a hormone naturally produced in your gut. Our program
                enhances this signal to help you feel fuller, longer — while
                optimizing insulin sensitivity and metabolic function.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="space-y-6 mb-16 max-w-xl">
              {[
                { name: "Semaglutide", pct: 15, width: "67%" },
                { name: "Tirzepatide", pct: 22.5, width: "100%" },
              ].map((med) => (
                <div key={med.name}>
                  <div className="flex justify-between text-[14px] mb-2">
                    <span className="text-white/80 font-medium">{med.name}</span>
                    <span className="text-gold font-semibold">{med.pct}%</span>
                  </div>
                  <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: med.width, background: "linear-gradient(90deg, #7BAE8E, #C9A96E)" }} />
                  </div>
                </div>
              ))}
              <p className="text-[12px] text-white/35 mt-3">Average patient body weight reduction in clinical trials</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

      {/* ── Medications — white ── */}
      <section className="bg-white py-14 md:py-24">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">
                Your Medication
              </p>
              <h2 className="font-serif text-[clamp(2rem,4vw,2.75rem)] leading-[1.1] tracking-[-0.02em] text-navy">
                The Right <em className="text-gold">Fit</em> for You
              </h2>
              <p className="mt-4 text-body text-[15px] max-w-xl mx-auto leading-relaxed">
                Dr. Rhee will recommend the medication best suited to your
                biology, health history, and goals.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150} stagger={100}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  name: "Wegovy",
                  generic: "Semaglutide",
                  form: "Weekly injection",
                  mechanism: "GLP-1 receptor agonist",
                  benefit: "Up to 15% body weight loss",
                  badge: "FDA Approved",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
                      <rect x="10" y="2" width="4" height="16" rx="2" fill="currentColor" opacity="0.2" />
                      <rect x="11" y="4" width="2" height="8" rx="1" fill="currentColor" />
                      <path d="M12 18v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  ),
                },
                {
                  name: "Zepbound",
                  generic: "Tirzepatide",
                  form: "Weekly injection",
                  mechanism: "Dual GLP-1 & GIP agonist",
                  benefit: "Up to 22.5% body weight loss",
                  badge: "FDA Approved",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
                      <rect x="10" y="2" width="4" height="16" rx="2" fill="currentColor" opacity="0.2" />
                      <rect x="11" y="4" width="2" height="8" rx="1" fill="currentColor" />
                      <path d="M12 18v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  ),
                },
                {
                  name: "Oral Semaglutide",
                  generic: "Rybelsus",
                  form: "Daily pill",
                  mechanism: "GLP-1 receptor agonist",
                  benefit: "Needle-free option",
                  badge: "Oral",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
                      <rect x="4" y="9" width="16" height="6" rx="3" fill="currentColor" opacity="0.2" />
                      <rect x="4" y="9" width="8" height="6" rx="3" fill="currentColor" opacity="0.5" />
                    </svg>
                  ),
                },
                {
                  name: "Emerging Therapies",
                  generic: "Retatrutide & more",
                  form: "Weekly injection",
                  mechanism: "Triple agonist (GLP-1, GIP, glucagon)",
                  benefit: "Next-generation results",
                  badge: "Coming Soon",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
                      <circle cx="12" cy="12" r="8" fill="currentColor" opacity="0.1" />
                      <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  ),
                },
              ].map((med) => (
                <div
                  key={med.name}
                  className="relative bg-cream/60 border border-neutral-200 rounded-[18px] p-7 flex flex-col card-hover"
                >
                  <span className="absolute top-4 right-4 text-[10px] font-semibold uppercase tracking-[0.12em] bg-gold/10 text-gold px-2.5 py-1 rounded-full">
                    {med.badge}
                  </span>
                  <div className="text-gold mb-5">{med.icon}</div>
                  <h3 className="font-serif text-[22px] tracking-[-0.01em] text-navy leading-tight">
                    {med.name}
                  </h3>
                  <p className="text-[13px] text-gold mt-0.5">{med.generic}</p>
                  <div className="mt-4 space-y-2 flex-1">
                    <p className="text-[13px] text-body flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-gold shrink-0" />
                      {med.form}
                    </p>
                    <p className="text-[13px] text-body flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-gold shrink-0" />
                      {med.mechanism}
                    </p>
                    <p className="text-[13px] text-body flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-gold shrink-0" />
                      {med.benefit}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <div className="text-center mt-10">
            <Link href="/science" className="text-gold text-[15px] font-medium hover:text-gold-light">
              View clinical evidence &rsaquo;
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Us — Bento Grid — navy-deep ── */}
      <section className="bg-navy-deep py-14 md:py-24">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">Why us</p>
              <h2 className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-white">
                Expert care you can{" "}<em className="text-gold">trust.</em>
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="md:col-span-2 relative rounded-[18px] overflow-hidden min-h-[320px] card-hover border border-transparent">
                <Image src="/images/apple/doctor-sage.jpg" alt="Dr. Libby Rhee providing care" fill className="object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #1D5C4D 0%, rgba(29,92,77,0.4) 50%, transparent 100%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <p className="text-teal-bright text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-2">Physician-Led</p>
                  <h3 className="font-serif text-[28px] md:text-[32px] leading-[1.1] tracking-[-0.02em] text-white">Board-Certified <em className="text-gold">Physician</em></h3>
                  <p className="text-[15px] text-white/70 leading-[1.65] mt-3 max-w-md">Dr. Libby Rhee, DO, MS, FAAD — not an algorithm, not a chatbot.</p>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <div className="bg-sage rounded-[18px] p-7 flex-1 card-hover border border-transparent">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mb-4"><path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-8.038 0l-2.387.477a2 2 0 00-1.022.547L2 18h20l-2.572-2.572z" fill="white"/><circle cx="12" cy="7" r="4" fill="white"/></svg>
                  <h3 className="text-[16px] font-semibold tracking-[-0.01em] text-white">Science-First</h3>
                  <p className="text-[14px] text-white/80 leading-[1.65] mt-2">FDA-approved GLP-1 agonists backed by robust clinical evidence.</p>
                </div>
                <div className="bg-teal rounded-[18px] p-7 flex-1 card-hover border border-transparent">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mb-4"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" fill="white"/></svg>
                  <h3 className="text-[16px] font-semibold tracking-[-0.01em] text-white">Multi-State</h3>
                  <p className="text-[14px] text-white/80 leading-[1.65] mt-2">In-person in NYC. Telehealth across NY, CT, and MI.</p>
                </div>
              </div>
              <div className="bg-white/8 rounded-[18px] p-7 border border-white/10 card-hover">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mb-4"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#C9A96E"/></svg>
                <h3 className="text-[16px] font-semibold tracking-[-0.01em] text-white">Personalized Protocols</h3>
                <p className="text-[14px] text-white/55 leading-[1.65] mt-2">Every plan tailored to your biology, conditions, and goals.</p>
              </div>
              <div className="md:col-span-2 bg-gold/12 border border-gold/20 rounded-[18px] p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <h3 className="text-[18px] font-semibold tracking-[-0.01em] text-gold">See how we compare</h3>
                  <p className="text-[15px] text-white/50 leading-[1.65] mt-1">Most programs are built on algorithms and chatbots.</p>
                </div>
                <Link href="/why-us" className="btn-gold shrink-0 w-full sm:w-auto justify-center group">
                  Full comparison <ArrowIcon className="text-navy-deep" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── How It Works — cream ── */}
      <section className="bg-cream py-14 md:py-24">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">The process</p>
              <h2 className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-navy">
                Three steps to{" "}<em className="text-gold">lasting results.</em>
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { num: "01", title: "Get Assessed", desc: "Comprehensive health assessment, lab review, and goal setting with Dr. Rhee." },
                { num: "02", title: "Get Your Protocol", desc: "Custom treatment plan — medication selection, dosing, nutritional guidance — designed for your biology." },
                { num: "03", title: "Get Results", desc: "Careful dose titration, regular check-ins, lab monitoring, and continuous optimization." },
              ].map((step) => (
                <div key={step.num} className="doppelrand doppelrand-light">
                  <div className="bg-white rounded-[18px] p-7 text-center border border-[rgba(27,42,74,0.04)] card-hover h-full">
                    <div className="w-12 h-12 rounded-full bg-sage/12 flex items-center justify-center mx-auto mb-4">
                      <p className="font-serif text-[18px] font-semibold text-gold">{step.num}</p>
                    </div>
                    <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-navy mt-2">{step.title}</h3>
                    <p className="text-[15px] text-body leading-[1.65] mt-3">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/how-it-works" className="text-gold text-[15px] font-medium hover:text-gold-light">Full breakdown &rsaquo;</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Human-Centric Support — white ── */}
      <section className="bg-white py-14 md:py-24">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[72px] items-center">
              <div>
                <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">Beyond the prescription</p>
                <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-[-0.02em] text-navy">
                  Human-Centric<br /><em className="text-gold">Digital Support</em>
                </h2>
                <p className="text-[16px] text-body leading-[1.7] mt-5 max-w-md">
                  Medication is the catalyst; coaching is the sustainer. Your
                  dedicated physician coordinates your nutrition and movement as
                  your metabolism shifts.
                </p>
                <ul className="mt-6 space-y-3">
                  {["24/7 Access to Medical Experts", "Precision Nutrition Planning", "Bi-weekly Progress Consultations"].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-sage/12 flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#7BAE8E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-[15px] text-navy font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="doppelrand doppelrand-light">
                <div className="rounded-[16px] overflow-hidden">
                  <Image src="/images/apple/doctor-sage.jpg" alt="Dr. Rhee providing personalized care" width={600} height={500} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Testimonial — navy-deep ── */}
      <section className="bg-navy-deep py-14 md:py-24">
        <ScrollReveal>
          <div className="max-w-[720px] mx-auto px-5 md:px-6 text-center">
            <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-8">Patient results</p>
            <div className="relative">
              <span className="absolute -top-6 -left-4 text-gold/15 font-serif text-[120px] leading-[1] select-none">&ldquo;</span>
              <blockquote>
                <p className="font-serif text-[clamp(1.5rem,3.5vw,2.25rem)] leading-[1.3] tracking-[-0.02em] text-white italic">
                  The program has completely changed my relationship with food.
                  I&apos;ve lost 45 pounds and feel better than I have in years.
                </p>
              </blockquote>
            </div>
            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal flex items-center justify-center text-white text-[14px] font-semibold ring-2 ring-teal-bright/30 ring-offset-2 ring-offset-navy-deep">S</div>
              <div className="text-left">
                <p className="text-[15px] text-white font-semibold">Sarah M.</p>
                <p className="text-[13px] text-white/45">Middletown, NY</p>
              </div>
            </div>
            <div className="mt-10">
              <Link href="/testimonials" className="text-gold text-[15px] font-medium hover:text-gold-light">See all testimonials &rsaquo;</Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Final CTA — cream ── */}
      <section className="bg-cream py-14 md:py-[128px]">
        <ScrollReveal>
          <div className="max-w-[680px] mx-auto px-5 md:px-6 text-center">
            <h2 className="font-serif text-[clamp(2.5rem,5.5vw,4rem)] leading-[1.08] tracking-[-0.02em] text-navy">
              Ready to{" "}<em className="text-gold">start?</em>
            </h2>
            <p className="text-[16px] text-body leading-[1.7] mt-4">
              Schedule a consultation with Dr. Rhee. Real medicine. Real results.
              Many patients also qualify for insurance coverage of medications.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/book" className="btn-primary w-full sm:w-auto justify-center group">
                Book your consultation
                <ArrowIcon className="text-white" />
              </Link>
              <Link href="/eligibility" className="btn-secondary w-full sm:w-auto justify-center">Check eligibility</Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
