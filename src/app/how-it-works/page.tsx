import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import VerticalTimeline from "@/components/VerticalTimeline";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Learn about our step-by-step medical weight management process — from initial consultation to ongoing therapy support with Dr. Libby Rhee.",
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

const journey = [
  {
    num: "01",
    title: "Initial Consultation",
    desc: "Your journey begins with a comprehensive one-on-one consultation with Dr. Rhee. She will review your complete medical history, current medications, previous weight loss attempts, and overall health goals.",
    details: [
      "Full health assessment and lab review",
      "BMI and body composition analysis",
      "Discussion of medication options",
      "Personalized goal setting",
      "Insurance coverage review for medications",
    ],
  },
  {
    num: "02",
    title: "Your Personalized Treatment Plan",
    desc: "Based on your consultation, Dr. Rhee creates a tailored weight management protocol designed specifically for your biology, health conditions, and lifestyle.",
    details: [
      "Medication selection (Semaglutide or Tirzepatide)",
      "Customized dosing schedule with gradual titration",
      "Nutritional guidance and meal planning support",
      "Exercise and lifestyle recommendations",
      "Side effect management strategies",
    ],
  },
  {
    num: "03",
    title: "Starting Treatment",
    desc: "Once your plan is in place, you'll begin your medication at a carefully calibrated starting dose. Dr. Rhee uses a gradual titration approach to minimize side effects and optimize your body's response.",
    details: [
      "First injection guidance and training",
      "What to expect in the first weeks",
      "Dietary tips for best results",
      "Direct line to our care team for questions",
    ],
  },
  {
    num: "04",
    title: "Check-ins to Set & Evaluate Goals",
    desc: "Regular check-ins ensure your treatment is working effectively and safely. Dr. Rhee monitors your progress, adjusts dosing as needed, and provides continuous support throughout your journey.",
    details: [
      "Monthly provider check-ins",
      "Dose adjustments based on progress and tolerance",
      "Lab monitoring as needed",
      "Nutritional coaching and accountability",
      "Long-term maintenance planning",
    ],
  },
];

const expectations = [
  {
    title: "What to bring",
    items: [
      "Photo ID and insurance card",
      "List of current medications",
      "Recent lab results (if available)",
      "Your health and weight loss goals",
    ],
  },
  {
    title: "First visit duration",
    items: [
      "Plan for approximately 30 minutes",
      "Thorough health assessment",
      "Time for all your questions",
      "Leave with a clear plan",
    ],
  },
  {
    title: "After your visit",
    items: [
      "Prescription sent to your pharmacy (if appropriate)",
      "Written treatment plan provided",
      "Follow-up appointment scheduled",
      "Labs ordered if specified by your provider",
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* ── Hero — navy ── */}
      <section className="relative pt-20 overflow-hidden" style={{ background: "linear-gradient(180deg, #1D5C4D 0%, #1B2A4A 100%)" }}>
        <div className="absolute inset-0 opacity-[0.08]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/headers/how-it-works-header.jpg" alt="" className="w-full h-full object-cover" aria-hidden="true" />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-5 md:px-6 pt-14 pb-14 md:pt-28 md:pb-28">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto">
              <p
                className="animate-fade-up flex items-center justify-center gap-2 text-sage text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-5"
                style={{ animationDelay: "0.1s" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                Your Journey
              </p>
              <h1
                className="animate-fade-up font-serif text-[clamp(2.75rem,5.5vw,4.25rem)] leading-[1.08] tracking-[-0.02em] text-white"
                style={{ animationDelay: "0.2s" }}
              >
                How it <em className="text-gold">works</em>
              </h1>
              <p
                className="animate-fade-up text-[16px] text-white/65 leading-[1.7] mt-6 max-w-2xl mx-auto"
                style={{ animationDelay: "0.35s" }}
              >
                From your first consultation to lasting results — here&apos;s what to
                expect when you join Precision Weight + Wellness.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Journey — vertical timeline on cream ── */}
      <section className="bg-cream py-14 md:py-28">
        <div className="max-w-[1000px] mx-auto px-5 md:px-6">
          <ScrollReveal>
            <div className="text-center mb-16 md:mb-20">
              <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">The Process</p>
              <h2 className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-navy">
                Your path to{" "}<em className="text-gold">lasting results.</em>
              </h2>
              <p className="mt-4 text-[16px] text-body leading-[1.7] max-w-2xl mx-auto">
                A physician-guided journey from initial consultation through sustained
                transformation — every step calibrated to your body.
              </p>
            </div>
          </ScrollReveal>

          <VerticalTimeline steps={journey} />
        </div>
      </section>

      {/* ── What to Expect — white with Doppelrand cards ── */}
      <section className="py-14 md:py-28 bg-white">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">
                First Visit
              </p>
              <h2 className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-navy">
                What to expect at your{" "}<em className="text-gold">consultation</em>
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200} stagger={100}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {expectations.map((exp) => (
                <div key={exp.title} className="doppelrand doppelrand-light">
                  <div className="bg-white rounded-[18px] p-7 border border-[rgba(27,42,74,0.04)] card-hover h-full">
                    <h3 className="font-serif text-[20px] tracking-[-0.01em] text-navy mb-5">
                      {exp.title}
                    </h3>
                    <ul className="space-y-3">
                      {exp.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-[15px] text-body leading-[1.65]"
                        >
                          <span className="w-5 h-5 rounded-full bg-sage/12 flex items-center justify-center shrink-0 mt-0.5">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#7BAE8E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Ongoing Care — navy-deep with dashboard mockup ── */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, #163D3A 0%, #0F1D35 100%)" }}>
        <div className="max-w-[1200px] mx-auto px-5 md:px-6 py-14 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left — text + feature cards */}
            <ScrollReveal>
              <div>
                <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">
                  Ongoing Care
                </p>
                <h2 className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-white">
                  You&apos;re never on your{" "}<em className="text-gold">own.</em>
                </h2>
                <p className="text-[16px] text-white/60 leading-[1.7] mt-5 max-w-md">
                  Weight management is a marathon, not a sprint. Our program is
                  designed for long-term success, with regular physician check-ins,
                  dose optimization, and ongoing lifestyle support.
                </p>

                <div className="mt-10 space-y-4">
                  {[
                    {
                      icon: (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M3 3v18h18" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" />
                          <path d="M7 14l4-4 3 3 6-6" stroke="#7BAE8E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ),
                      title: "Continuous monitoring",
                      desc: "Our medical team monitors every patient\u2019s progress and adjusts treatment plans as needed.",
                    },
                    {
                      icon: (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="9" stroke="#C9A96E" strokeWidth="1.5" />
                          <path d="M9 12l2 2 4-4" stroke="#7BAE8E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ),
                      title: "Maintenance strategy",
                      desc: "Medication tapering protocols, sustainable nutrition habits, and exercise routines to keep the weight off for good.",
                    },
                    {
                      icon: (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#C9A96E" strokeWidth="1.5" strokeLinejoin="round" />
                        </svg>
                      ),
                      title: "Long-term partnership",
                      desc: "Your care doesn\u2019t stop at a goal weight. We optimize energy, mobility, longevity, and quality of life.",
                    },
                  ].map((card) => (
                    <div key={card.title} className="bg-white/8 rounded-[16px] p-5 border border-white/8 flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-full bg-white/8 flex items-center justify-center shrink-0">
                        {card.icon}
                      </div>
                      <div>
                        <h3 className="text-[15px] font-semibold text-white">{card.title}</h3>
                        <p className="text-[14px] text-white/50 leading-[1.6] mt-1">{card.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Right — patient dashboard mockup */}
            <ScrollReveal delay={300}>
              <div className="flex justify-end mb-3">
                <div className="bg-gold text-navy-deep text-[10px] font-semibold uppercase tracking-[0.12em] px-3 py-1.5 rounded-full shadow-[0_4px_12px_rgba(201,169,110,0.3)]">
                  Coming Soon
                </div>
              </div>
              <div className="relative bg-white rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.3)] overflow-hidden">
                {/* Dashboard header */}
                <div className="px-6 py-4 border-b border-[rgba(27,42,74,0.06)] flex items-center justify-between">
                  <p className="font-serif text-[15px] text-navy">
                    Precision <span className="text-gold">W+W</span>
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-cream flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 106 8c0 7-3 9-3 9h18s-3-2-3-9z" stroke="#8896AB" strokeWidth="1.5" /><path d="M13.73 21a2 2 0 01-3.46 0" stroke="#8896AB" strokeWidth="1.5" /></svg>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-navy text-white text-[11px] font-semibold flex items-center justify-center">S</div>
                  </div>
                </div>

                <div className="p-6">
                  {/* Welcome */}
                  <h3 className="font-serif text-[22px] text-navy">Welcome back, Sarah.</h3>
                  <p className="text-[12px] text-light italic mt-1">&ldquo;Health is not a destination, but a curated journey.&rdquo;</p>

                  {/* Current phase badge */}
                  <div className="flex justify-end mt-2">
                    <div className="text-right">
                      <p className="text-gold text-[9px] font-semibold uppercase tracking-[0.12em]">Current Phase</p>
                      <p className="text-navy text-[13px] font-semibold">Metabolic Optimization</p>
                    </div>
                  </div>

                  {/* Dashboard cards grid */}
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    {/* My Journey card */}
                    <div className="bg-cream rounded-[12px] p-4 border border-[rgba(27,42,74,0.04)]">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-[12px] font-semibold text-navy">My Journey</p>
                        <span className="text-[9px] font-semibold bg-sage/15 text-sage px-2 py-0.5 rounded-full">Log Today&apos;s Metrics</span>
                      </div>
                      {/* Mini chart */}
                      <svg viewBox="0 0 200 60" className="w-full h-10" fill="none">
                        <path d="M0 50 Q30 48 50 40 T100 25 T150 15 T200 8" stroke="#7BAE8E" strokeWidth="2" fill="none" />
                        <circle cx="200" cy="8" r="3" fill="#7BAE8E" />
                      </svg>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-[9px] text-light">Weight Progression</p>
                        <p className="text-[14px] font-serif font-semibold text-navy">-12.4 lbs</p>
                      </div>
                      {/* Metrics */}
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full bg-sage/15 flex items-center justify-center"><svg width="8" height="8" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="#7BAE8E" strokeWidth="1.5" /></svg></span>
                          <div>
                            <p className="text-[8px] text-light uppercase tracking-wider">Metabolic Rate</p>
                            <p className="text-[11px] text-navy font-medium">Optimal <span className="text-sage">+4%</span></p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full bg-gold/15 flex items-center justify-center"><svg width="8" height="8" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="4" stroke="#C9A96E" strokeWidth="1.5" /></svg></span>
                          <div>
                            <p className="text-[8px] text-light uppercase tracking-wider">Hydration Balance</p>
                            <p className="text-[11px] text-navy font-medium">Target Reached</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Medication Hub */}
                    <div className="bg-cream rounded-[12px] p-4 border border-[rgba(27,42,74,0.04)]">
                      <p className="text-[12px] font-semibold text-navy mb-3">Medication Hub</p>
                      <div className="bg-white rounded-[8px] p-3 border border-[rgba(27,42,74,0.04)]">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[12px] font-semibold text-navy">Tirzepatide</p>
                            <p className="text-[10px] text-light">5mg Weekly Injection</p>
                          </div>
                          <span className="text-[8px] font-semibold bg-sage/15 text-sage px-2 py-0.5 rounded-full uppercase tracking-wider">Active</span>
                        </div>
                        <p className="text-[10px] text-light mt-2">Next Dose: <span className="text-navy font-medium">Tomorrow, 8:00 AM</span></p>
                      </div>
                      <div className="mt-3 space-y-2 text-[11px]">
                        <p className="text-light">Refill Shipment #492 <span className="float-right text-navy">&rsaquo;</span></p>
                        <p className="text-light">Billing History <span className="float-right text-navy">&rsaquo;</span></p>
                      </div>
                      <button className="mt-3 w-full text-[11px] font-medium text-navy border border-[rgba(27,42,74,0.12)] rounded-full py-2 hover:bg-cream">
                        Request Refill
                      </button>
                    </div>

                    {/* Clinical Portal */}
                    <div className="bg-cream rounded-[12px] p-4 border border-[rgba(27,42,74,0.04)]">
                      <p className="text-[12px] font-semibold text-navy mb-2">Clinical Portal</p>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-7 h-7 rounded-full bg-teal flex items-center justify-center text-white text-[9px] font-bold">DR</div>
                        <div>
                          <p className="text-[8px] text-light uppercase tracking-wider">Primary Physician</p>
                          <p className="text-[11px] text-navy font-medium">Dr. Rhee</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white rounded-[8px] p-2 text-center border border-[rgba(27,42,74,0.04)]">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mx-auto mb-1"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="#8896AB" strokeWidth="1.5" /></svg>
                          <p className="text-[9px] text-light">Secure Message</p>
                        </div>
                        <div className="bg-white rounded-[8px] p-2 text-center border border-[rgba(27,42,74,0.04)]">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mx-auto mb-1"><rect x="2" y="3" width="20" height="14" rx="2" stroke="#8896AB" strokeWidth="1.5" /><path d="M8 21h8M12 17v4" stroke="#8896AB" strokeWidth="1.5" /></svg>
                          <p className="text-[9px] text-light">Video Consult</p>
                        </div>
                      </div>
                      <div className="mt-3 bg-white rounded-[8px] p-2 border border-[rgba(27,42,74,0.04)] flex items-center gap-2">
                        <div className="bg-navy rounded-[4px] px-1.5 py-1 text-center leading-none">
                          <p className="text-[7px] text-gold uppercase">Nov</p>
                          <p className="text-[12px] text-white font-semibold">12</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-navy font-medium">Monthly Progress Review</p>
                          <p className="text-[9px] text-light">10:30 AM via Portal Video</p>
                        </div>
                      </div>
                    </div>

                    {/* Resource Center */}
                    <div className="bg-cream rounded-[12px] p-4 border border-[rgba(27,42,74,0.04)]">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-[12px] font-semibold text-navy">Resource Center</p>
                        <span className="text-[9px] text-sage font-medium">View All</span>
                      </div>
                      <div className="space-y-2">
                        <div className="bg-white rounded-[8px] p-2 border border-[rgba(27,42,74,0.04)]">
                          <p className="text-[10px] text-navy font-medium">Micro-nutrients for Metabolic Stability</p>
                          <p className="text-[8px] text-light mt-0.5">6 min read</p>
                        </div>
                        <div className="bg-white rounded-[8px] p-2 border border-[rgba(27,42,74,0.04)]">
                          <p className="text-[10px] text-navy font-medium">Overcoming the Plateau: Psychology of Change</p>
                          <p className="text-[8px] text-light mt-0.5">12 min video</p>
                        </div>
                      </div>
                      <div className="mt-3 bg-gold/10 rounded-[8px] p-2 border border-gold/15">
                        <p className="text-[10px] text-navy font-semibold">Weekly Challenge</p>
                        <p className="text-[9px] text-body mt-0.5">Try 15 minutes of zone-2 cardio after lunch this week.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Final CTA — white bg after dark portal section ── */}
      <section className="relative py-14 md:py-28 bg-white text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <ScrollReveal>
          <div className="relative max-w-[680px] mx-auto px-5 md:px-6">
            <h2 className="font-serif text-[clamp(2.5rem,5.5vw,4rem)] leading-[1.08] tracking-[-0.02em] text-navy">
              Ready to get{" "}<em className="text-gold">started?</em>
            </h2>
            <p className="mt-4 text-[16px] text-body leading-[1.7]">
              Take the first step. Schedule your consultation with Dr. Rhee today.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/book" className="btn-primary w-full sm:w-auto justify-center group">
                Book Your Consultation
                <ArrowIcon className="text-white transition-transform duration-500 group-hover:translate-x-0.5" />
              </Link>
              <Link href="/eligibility" className="btn-secondary w-full sm:w-auto justify-center">
                Check Eligibility
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
