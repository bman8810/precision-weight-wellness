"use client";

import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      {/* ── Hero — teal-to-navy gradient ── */}
      <section
        className="relative pt-28 pb-14 md:pt-40 md:pb-20 overflow-hidden"
        style={{ background: "linear-gradient(180deg, #1D5C4D 0%, #0F1D35 100%)" }}
      >
        <div className="absolute inset-0 opacity-[0.08]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/headers/contact-header.jpg" alt="" className="w-full h-full object-cover" aria-hidden="true" />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-5 md:px-6 text-center">
          <p className="flex items-center justify-center gap-2 text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            Get in Touch
          </p>
          <h1
            className="font-serif text-[clamp(2.75rem,5.5vw,4.25rem)] leading-[1.08] tracking-[-0.02em] text-white"
            style={{ textWrap: "balance" }}
          >
            We&apos;d love to <em className="text-gold">hear from you</em>
          </h1>
          <p className="mt-6 text-[16px] text-white/60 max-w-xl mx-auto leading-[1.7]">
            Have a question about our program, insurance, or anything else?
            Send us a message and we&apos;ll get back to you shortly.
          </p>
        </div>
      </section>

      {/* ── Split Layout: Info + Form — cream ── */}
      <section className="py-14 md:py-24 bg-cream">
        <div className="max-w-[1200px] mx-auto px-5 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-16">
            {/* Left — Contact Info */}
            <div>
              <div className="lg:sticky lg:top-28 space-y-8">
                <div>
                  <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-3">
                    Contact Information
                  </p>
                  <h2 className="font-serif text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.1] tracking-[-0.02em] text-navy">
                    Let&apos;s connect
                  </h2>
                </div>

                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-sage/12 flex items-center justify-center shrink-0 mt-0.5">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <rect x="2" y="4" width="20" height="16" rx="3" stroke="#7BAE8E" strokeWidth="1.5" />
                        <path d="M2 7l10 6 10-6" stroke="#7BAE8E" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-navy">Email</p>
                      <a
                        href="mailto:hello@precisionww.com"
                        className="text-[15px] text-gold hover:text-gold-light transition-colors duration-300"
                      >
                        hello@precisionww.com
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-sage/12 flex items-center justify-center shrink-0 mt-0.5">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" fill="#7BAE8E" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-navy">Locations</p>
                      <p className="text-[15px] text-body leading-[1.65]">
                        New York City &amp; Middletown, NY
                      </p>
                      <p className="text-[13px] text-light mt-1">
                        Telehealth: NY, CT, MI
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-sage/12 flex items-center justify-center shrink-0 mt-0.5">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="9" stroke="#7BAE8E" strokeWidth="1.5" />
                        <path d="M12 7v5l3 3" stroke="#7BAE8E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-navy">Office Hours</p>
                      <p className="text-[15px] text-body leading-[1.65]">
                        Mon–Fri: 9:00 AM – 5:00 PM
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="pt-6 border-t border-[rgba(27,42,74,0.08)]">
                  <p className="text-[12px] font-semibold text-light uppercase tracking-[0.12em] mb-4">Quick Links</p>
                  <div className="flex flex-col gap-2.5">
                    <Link href="/book" className="text-[15px] text-gold font-medium hover:text-gold-light transition-colors duration-300">
                      Book a consultation &rsaquo;
                    </Link>
                    <Link href="/eligibility" className="text-[15px] text-gold font-medium hover:text-gold-light transition-colors duration-300">
                      Check your eligibility &rsaquo;
                    </Link>
                    <a
                      href="https://secure.gethealthie.com/go/precisionww"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[15px] text-gold font-medium hover:text-gold-light transition-colors duration-300"
                    >
                      Patient portal &rsaquo;
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div className="doppelrand doppelrand-light">
              <div className="bg-white rounded-[18px] border border-[rgba(27,42,74,0.04)] p-8 md:p-12">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-14 h-14 rounded-full bg-sage/12 flex items-center justify-center mx-auto mb-5">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M5 13l4 4L19 7" stroke="#7BAE8E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h3 className="font-serif text-[28px] text-navy tracking-[-0.02em]">Thank you</h3>
                    <p className="mt-4 text-[15px] text-body leading-[1.65] max-w-sm mx-auto">
                      We&apos;ve received your message and will be in touch within
                      one business day.
                    </p>
                    <Link href="/book" className="btn-gold mt-8 inline-flex">
                      Book a Consultation
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <h3 className="font-serif text-[24px] text-navy tracking-[-0.02em]">
                        Send us a message
                      </h3>
                      <p className="text-[14px] text-light mt-1">
                        We&apos;ll respond within one business day.
                      </p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="name" className="block text-[13px] text-body font-medium mb-2">
                            Full name
                          </label>
                          <input
                            type="text"
                            id="name"
                            required
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full px-5 py-3.5 border border-[rgba(27,42,74,0.08)] rounded-xl focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all duration-300 text-[14px] bg-cream/30"
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-[13px] text-body font-medium mb-2">
                            Phone number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            className="w-full px-5 py-3.5 border border-[rgba(27,42,74,0.08)] rounded-xl focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all duration-300 text-[14px] bg-cream/30"
                            placeholder="(212) 555-0000"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-[13px] text-body font-medium mb-2">
                          Email address
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full px-5 py-3.5 border border-[rgba(27,42,74,0.08)] rounded-xl focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all duration-300 text-[14px] bg-cream/30"
                          placeholder="you@example.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-[13px] text-body font-medium mb-2">
                          Message
                        </label>
                        <textarea
                          id="message"
                          rows={5}
                          required
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          className="w-full px-5 py-3.5 border border-[rgba(27,42,74,0.08)] rounded-xl focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all duration-300 text-[14px] bg-cream/30 resize-none"
                          placeholder="Tell us about your goals or ask any questions..."
                        />
                      </div>
                      <button type="submit" className="btn-primary w-full">
                        Send Message
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA — navy-deep ── */}
      <section className="relative py-14 md:py-24 bg-navy-deep text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-[680px] mx-auto px-5 md:px-6">
          <h2
            className="font-serif text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] tracking-[-0.02em] text-white"
            style={{ textWrap: "balance" }}
          >
            Ready to get <em className="text-gold">started?</em>
          </h2>
          <p className="mt-4 text-[16px] text-white/60 leading-[1.7]">
            Schedule your consultation online — it takes less than two minutes.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <Link href="/book" className="btn-gold w-full sm:w-auto justify-center">
              Book Your Consultation
            </Link>
            <Link href="/pricing" className="inline-flex items-center justify-center text-[15px] font-medium text-white/60 border border-white/20 rounded-full px-8 py-[15px] min-h-[48px] hover:bg-white/8 hover:text-white active:scale-[0.98] w-full sm:w-auto">
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
