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
      {/* ── Hero — full-bleed image ── */}
      <section className="relative min-h-[100dvh] flex flex-col">
        {/* Background image */}
        <Image
          src="/images/doctor/libby-nyc-skyline.jpeg"
          alt="Dr. Libby Rhee with NYC skyline"
          fill
          className="object-cover object-[65%_top]"
          priority
        />
        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/85 via-navy-deep/50 to-navy-deep/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-navy-deep/40" />

        {/* Content */}
        <div className="relative flex-1 flex flex-col justify-center max-w-[1200px] mx-auto w-full px-5 md:px-6 pt-28 pb-20">
          <p
            className="animate-fade-up flex items-center gap-2 text-sage text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-6"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sage" />
            Doctor-Led Weight Management
          </p>
          <h1
            className="animate-fade-up font-serif text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.08] tracking-[-0.02em] text-white max-w-2xl"
            style={{ animationDelay: "0.2s" }}
          >
            Medical weight loss,
            <br />
            <em className="text-gold">done right.</em>
          </h1>
          <p
            className="animate-fade-up text-[16px] text-white/65 leading-[1.7] mt-6 max-w-lg"
            style={{ animationDelay: "0.35s" }}
          >
            A clinical-grade program using FDA-approved weight loss medications,
            led by board-certified physicians — built around you, not a subscription model.
          </p>
          <div
            className="animate-fade-up mt-8 flex flex-col sm:flex-row gap-3"
            style={{ animationDelay: "0.5s" }}
          >
            <Link href="/book" className="btn-gold w-full sm:w-auto justify-center group">
              Start your consult
              <ArrowIcon className="text-navy-deep transition-transform duration-500 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center justify-center text-[15px] font-medium text-white/70 border border-white/25 rounded-full px-8 py-[15px] min-h-[48px] hover:bg-white/10 hover:text-white active:scale-[0.98] w-full sm:w-auto"
            >
              How it works
            </Link>
          </div>

          {/* Stats bar */}
          <div
            className="animate-fade-up mt-auto pt-16 flex flex-wrap gap-4 sm:gap-8 md:gap-12"
            style={{ animationDelay: "0.65s" }}
          >
            {[
              { value: "Board-Certified", label: "Physician-led" },
              { value: "1:1", label: "Personalized care" },
              { value: "3 States", label: "NY · CT · MI" },
            ].map((s, i) => (
              <div key={s.label} className={`${i > 0 ? "border-l border-white/15 pl-4 sm:pl-8 md:pl-12" : ""}`}>
                <p className="font-serif text-[clamp(18px,3.5vw,40px)] font-semibold tracking-[-0.03em] text-gold leading-[1]">
                  {s.value}
                </p>
                <p className="text-[9px] sm:text-[11px] uppercase tracking-[0.12em] text-white/45 mt-1.5 sm:mt-2">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
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
                Your body naturally produces hormones that regulate hunger and metabolism. Our program uses FDA-approved medications that
                enhances this signal to help you feel fuller, longer — while
                optimizing insulin sensitivity and metabolic function.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="space-y-6 mb-16 max-w-xl">
              {[
                { name: "Liraglutide", pct: 8, width: "33%" },
                { name: "Semaglutide", pct: 15, width: "63%" },
                { name: "Tirzepatide", pct: 22.5, width: "94%" },
                { name: "Retatrutide", pct: 24, width: "100%", note: "in trials" },
              ].map((med) => (
                <div key={med.name}>
                  <div className="flex justify-between text-[14px] mb-2">
                    <span className="text-white/80 font-medium">{med.name}</span>
                    <span className="text-gold font-semibold">
                      {med.pct}%
                      {"note" in med && med.note && (
                        <span className="text-[11px] text-white/35 font-normal ml-1">{med.note}</span>
                      )}
                    </span>
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
                { title: "Insulin Sensitivity", desc: "Maintains blood sugar and regulates appetite through targeted receptor activation.", iconPath: "M12 6a6 6 0 100 12 6 6 0 000-12zm0-4a10 10 0 110 20 10 10 0 010-20z" },
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
                <Image src="/images/doctor/libby-photo-1.jpeg" alt="Dr. Libby Rhee providing care" fill className="object-cover object-top" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #1D5C4D 0%, rgba(29,92,77,0.4) 50%, transparent 100%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <p className="text-teal-bright text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-2">Physician-Led</p>
                  <h3 className="font-serif text-[28px] md:text-[32px] leading-[1.1] tracking-[-0.02em] text-white">Board-Certified <em className="text-gold">Physician</em></h3>
                  <p className="text-[15px] text-white/70 leading-[1.65] mt-3 max-w-md">Dr. Libby Rhee, DO, MS, FAAD — not an algorithm, not a chatbot.</p>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <div className="bg-sage rounded-[18px] p-7 flex-1 card-hover border border-transparent">
                  <h3 className="text-[16px] font-semibold tracking-[-0.01em] text-white">Science-First</h3>
                  <p className="text-[14px] text-white/80 leading-[1.65] mt-2">FDA-approved medications backed by robust clinical evidence.</p>
                </div>
                {/* Multi-State — visual map with state outlines + flight arcs */}
                <div className="bg-teal rounded-[18px] p-6 flex-1 card-hover border border-transparent flex flex-col items-center justify-center">
                  <svg viewBox="0 0 320 120" className="w-full max-w-[280px] h-auto" fill="none" aria-hidden="true">
                    {/* MI state outline (left, higher — northern latitude) */}
                    <g transform="translate(5,2) scale(0.42)">
                      <path d="m 132.1,135.4 .1,1.4 21.4,-3.5 .5,-1.2 3.9,-5.9 v -4.3 l .8,-2.1 2.2,-.8 2,-7.8 1,-.5 1,.6 -.2,.6 -1.1,.8 .3,.9 .8,.4 1.9,-1.4 .4,-9.8 -1.6,-2.3 -1.2,-3.7 v -2.5 l -2.3,-4.4 v -1.8 l -1.2,-3.3 -2.3,-3 -2.9,-1 -4.8,3 -2.5,4.6 -.2,.9 -3,3.5 -1.5,-.2 -2.9,-2.8 -.1,-3.4 1.5,-1.9 2,-.2 1.2,-1.7 .2,-4 .8,-.8 1.1,-.1 .9,-1.7 -.2,-9.6 -.3,-1.3 -1.2,-1.2 -1.7,-1 -.1,-1.8 .7,-.6 1.8,.8 -.3,-1.7 -1.9,-2.7 -.7,-1.6 -1.1,-1.1 h -2.2 l -8.1,-2.9 -1.4,-1.7 -3.1,-.3 -1.2,.3 -4.4,-2.3 h -1.4 l .5,1 -2.7,-.1 .1,.6 .6,.6 -2.5,2.1 .1,1.8 1.5,2.3 1.5,.2 v .6 l -1.5,.5 -2.1,-.1 -2.8,2.5 .1,2.5 .4,5.8 -2.2,3.4 .8,-4.5 -.8,-.6 -.9,5.3 -1,-2.3 .5,-2.3 -.5,-1 .6,-1.3 -.6,-1.1 1,-1 v -1.2 l -1.3,.6 -1.3,3.1 -.7,.7 -1.3,2.4 -1.7,-.2 -.1,1.2 h -1.6 l .2,1.5 .2,2 -3,1.2 .1,1.3 1,1.7 -.1,5.2 -1.3,4.4 -1.7,2.5 1.2,1.4 .8,3.5 -1,2.5 -.2,2.1 1.7,3.4 2.5,4.9 1.2,1.9 1.6,6.9 -.1,8.8 -.9,3.9 -2,3.2 -.9,3.7 -2,3 -1.2,1 z m -95.8,-96.8 3,3.8 17,3.8 1.4,1 4,.8 .7,.5 2.8,-.2 4.9,.8 1.4,1.5 -1,1 .8,.8 3.8,.7 1.2,1.2 .1,4.4 -1.3,2.8 2,.1 1,-.8 .9,.8 -1.1,3.1 1,1.6 1.2,.3 .8,-1.8 2.9,-4.6 1.6,-6 2.3,-2 -.5,-1.6 .5,-.9 1,1.6 -.3,2.2 2.9,-2.2 .2,-2.3 2.1,.6 .8,-1.6 .7,.6 -.7,1.5 -1,.5 -1,2 1.4,1.8 1.1,-.5 -.5,-.7 1,-1.5 1.9,-1.7 h .8 l .2,-2.6 2,-1.8 7.9,-.5 1.9,-3.1 3.8,-.3 3.8,1.2 4.2,2.7 .7,-.2 -.2,-3.5 .7,-.2 4.5,1.1 1.5,-.2 2.9,-.7 1.7,.4 1.8,.1 v -1.1 l -.7,-.9 -1.5,-.2 -1.1,-.8 .5,-1.4 -.8,-.3 -2.6,.1 -.1,-1 1.1,-.8 .6,.8 .5,-1.8 -.7,-.7 .7,-.2 -1.4,-1.3 .3,-1.3 .1,-1.9 h -1.3 l -1.5,1 -1.9,.1 -.5,1.8 -1.9,.2 -.3,-1.2 -2.2,.1 -1,1.2 -.7,-.1 -.2,-.8 -2.6,.4 -.1,-4.8 1,-2 -.7,-.1 -1.8,1.1 h -2.2 l -3.8,2.7 -6.2,.3 -4.1,.8 -1.9,1.5 -1.4,1.3 -2.5,1.7 -.3,.8 -.6,-1.7 -1.3,-.6 v .6 l .7,.7 v 1.3 l -1.5,-.6 h -.6 l -.3,1.2 -2,-1.9 -1.3,-.2 -1.3,1.5 -3.2,-.1 -.5,-1.4 -2,-1.9 -1.3,-1.6 v -.7 l -1.1,-1.4 -2.6,-1.2 -3.3,-.1 -1.1,-.9 h -1.4 l -.7,.4 -2.2,2.2 -.7,1.1 -1,-.7 .2,-1 .8,-2.1 3.2,-5 .8,-.2 1.7,-1.9 .7,-1.6 3,-.6 .8,-.6 -.1,-1 -.5,-.5 -4.5,.2 -2,.5 -2.6,1.2 -1.2,1.2 -1.7,2.2 -1.8,1 -3.3,3.4 -.4,1.6 -7.4,4.6 -4,.5 -1.8,.4 -2.3,3 -1.8,.7 -4.4,2.3 z" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
                    </g>
                    {/* NY state outline (center, lower — southern latitude) */}
                    <g transform="translate(110,22) scale(0.55)">
                      <path d="m 91.4,4.2 -.6,1.9 1.4,.9 -.4,1.5 .5,3.2 2.2,2.3 -.4,2.2 .6,2 -.4,1 -.3,3.8 3.1,6.7 -.8,1.8 .9,2.2 .9,-1.6 1.9,1.5 3,14.2 -.5,2 1.1,1 -.5,15 .7,1 2.8,16.3 1.8,1.5 -3.5,3.4 1.7,2.2 -1.3,3.3 -1.5,1.7 -1.5,2.3 -.2,-.7 .4,-5.9 -14.6,-4.9 -1.6,-1.1 -1.9,.3 -3,-2.2 -3,-5.8 h -2 l -.4,-1.5 -1.7,-1.1 -70.5,13.9 -.8,-6 4.3,-3.9 .6,-1.7 3.9,-2.5 .6,-2.4 2.3,-2 .8,-1.1 -1.7,-3.3 -1.7,-.5 -1.8,-3 -.2,-3.2 7.6,-3.9 8.2,-1.6 h 4.4 l 3.2,1.6 .9,-.1 1.8,-1.6 3.4,-.7 h 3 l 2.6,-1.3 2.5,-2.6 2.4,-3.1 1.9,-.4 1.1,-.5 .4,-3.2 -1.4,-2.7 -1.2,-.7 2,-1.3 -.1,-1.8 h -1.5 l -2.3,-1.4 -.1,-3.1 6.2,-6.1 .7,-2.4 3.7,-6.3 5.9,-6.4 2.1,-1.7 2.5,.1 20.6,-5.2 z" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
                    </g>
                    {/* CT state outline (right, higher — northern latitude) */}
                    <g transform="translate(228,25) scale(1.8)">
                      <path d="m 31.7,15.7 .4,-1.1 -3.2,-12.3 -.1,-.3 -14.9,3.4 v .7 l -.9,.3 -.5,-.7 -10.5,2.4 2.8,16.3 1.8,1.5 -3.5,3.4 1.7,2.2 5.4,-4.5 1.7,-1.3 h .8 l 2.4,-3.1 1.4,.1 2.9,-1.1 h 2.1 l 5.3,-2.7 2.8,-.9 1,-1 1.5,.5 z" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.3" />
                    </g>
                    {/* Flight arc lines: MI → NY → CT */}
                    <path d="M 55,44 Q 105,20 155,57" stroke="rgba(201,169,110,0.6)" strokeWidth="1" strokeDasharray="3,3" fill="none" />
                    <path d="M 165,57 Q 215,25 265,42" stroke="rgba(201,169,110,0.6)" strokeWidth="1" strokeDasharray="3,3" fill="none" />
                    {/* Dots at connection points */}
                    <circle cx="55" cy="44" r="2.5" fill="#C9A96E" />
                    <circle cx="160" cy="57" r="2.5" fill="#C9A96E" />
                    <circle cx="265" cy="42" r="2.5" fill="#C9A96E" />
                  </svg>
                  <p className="text-[13px] text-white/70 mt-2 text-center">In-person <span className="font-bold text-white">NYC</span> &middot; Telehealth <span className="font-bold text-white">NY</span>, <span className="font-bold text-white">CT</span>, <span className="font-bold text-white">MI</span></p>
                </div>
              </div>
              <div className="bg-white/8 rounded-[18px] p-7 border border-white/10 card-hover">
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
                  <Image src="/images/doctor/dr-rhee-figs.jpg" alt="Dr. Rhee providing personalized care" width={832} height={1248} className="w-full h-auto" />
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
