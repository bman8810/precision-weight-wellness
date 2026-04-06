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
      {/* Hero */}
      <section className="pt-28 pb-14 md:pt-36 md:pb-20 bg-cream">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-6">
            Contact Us
          </p>
          <h1
            className="font-serif text-5xl md:text-6xl leading-[1.08] tracking-[-0.02em] text-navy"
            style={{ textWrap: "balance" }}
          >
            Get in <em className="text-gold">touch</em>
          </h1>
          <p className="mt-8 text-lg text-body max-w-2xl mx-auto leading-relaxed">
            Have a question or want to learn more? Send us a message and
            we&apos;ll get back to you shortly.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-14 md:py-24 bg-white">
        <div className="max-w-2xl mx-auto px-6">
          {submitted ? (
            <div className="bg-cream p-10 rounded-[18px] text-center">
              <p className="font-serif text-2xl text-navy">Thank you</p>
              <p className="mt-4 text-body">
                We&apos;ve received your message and will be in touch shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm text-body mb-2"
                >
                  Full name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className="w-full px-5 py-4 border border-[rgba(27,42,74,0.06)] rounded-xl focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] text-sm bg-white"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-body mb-2"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className="w-full px-5 py-4 border border-[rgba(27,42,74,0.06)] rounded-xl focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] text-sm bg-white"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm text-body mb-2"
                >
                  Phone number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                  className="w-full px-5 py-4 border border-[rgba(27,42,74,0.06)] rounded-xl focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] text-sm bg-white"
                  placeholder="(212) 555-0000"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm text-body mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="w-full px-5 py-4 border border-[rgba(27,42,74,0.06)] rounded-xl focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] text-sm bg-white resize-none"
                  placeholder="Tell us about your goals or ask any questions..."
                />
              </div>
              <button
                type="submit"
                className="btn-gold w-full"
              >
                Send Message
              </button>
            </form>
          )}

          <p className="mt-8 text-center text-sm text-light">
            Or email us directly at{" "}
            <a
              href="mailto:hello@precisionww.com"
              className="text-gold hover:text-gold-dark transition-colors duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
              hello@precisionww.com
            </a>
          </p>
        </div>
      </section>

      {/* Book CTA */}
      <section className="relative py-14 md:py-24 bg-navy-deep text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-2xl mx-auto px-6">
          <h2
            className="font-serif text-4xl md:text-5xl tracking-[-0.02em] text-white"
            style={{ textWrap: "balance" }}
          >
            Prefer to book directly?
          </h2>
          <p className="mt-6 text-light leading-relaxed">
            Schedule your consultation online.
          </p>
          <Link
            href="/book"
            className="btn-gold inline-block mt-10"
          >
            Schedule Your Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
