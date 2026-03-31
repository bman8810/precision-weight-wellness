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
      <section className="pt-36 pb-24 bg-cream">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-6">
            Get in Touch
          </p>
          <h1
            className="font-serif text-5xl md:text-6xl leading-[1.08] tracking-tight text-soft-black"
            style={{ textWrap: "balance" }}
          >
            Contact & <span className="text-gold">book</span>
          </h1>
          <p className="mt-8 text-lg text-neutral-500 max-w-2xl mx-auto leading-relaxed">
            Ready to start your weight loss journey? Schedule a consultation or
            send us a message — we&apos;re here to help.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
              Send a Message
            </p>
            <h2 className="font-serif text-3xl text-soft-black mb-8">
              We&apos;d love to hear from you
            </h2>

            {submitted ? (
              <div className="bg-cream p-10 rounded-2xl text-center">
                <p className="font-serif text-2xl text-soft-black">
                  Thank you
                </p>
                <p className="mt-4 text-neutral-500">
                  We&apos;ve received your message and will be in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm text-neutral-600 mb-2"
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
                    className="w-full px-5 py-4 border border-neutral-200 rounded-xl focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] text-sm bg-white"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm text-neutral-600 mb-2"
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
                    className="w-full px-5 py-4 border border-neutral-200 rounded-xl focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] text-sm bg-white"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm text-neutral-600 mb-2"
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
                    className="w-full px-5 py-4 border border-neutral-200 rounded-xl focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] text-sm bg-white"
                    placeholder="(212) 555-0000"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm text-neutral-600 mb-2"
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
                    className="w-full px-5 py-4 border border-neutral-200 rounded-xl focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] text-sm bg-white resize-none"
                    placeholder="Tell us about your goals or ask any questions..."
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gold hover:bg-gold-dark text-white text-sm tracking-wide uppercase px-8 py-4 rounded-full transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] w-full hover:translate-y-[-1px] hover:shadow-[0_8px_24px_-8px_rgba(201,169,110,0.4)]"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="space-y-12">
            {/* Schedule */}
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
                Schedule Online
              </p>
              <h2 className="font-serif text-3xl text-soft-black mb-4">
                Book your consultation
              </h2>
              <p className="text-neutral-500 leading-relaxed mb-6">
                Use our online scheduling portal to book your initial
                consultation at a time that works for you.
              </p>
              <a
                href="https://app.gethealthie.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gold hover:bg-gold-dark text-white text-sm tracking-wide uppercase px-8 py-4 rounded-full transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-y-[-1px] hover:shadow-[0_8px_24px_-8px_rgba(201,169,110,0.4)]"
              >
                Schedule Now
              </a>
            </div>

            {/* Contact Details */}
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
                Contact Details
              </p>
              <address className="space-y-3 text-neutral-500 not-italic">
                <p className="font-medium text-soft-black">
                  Precision Weight & Wellness
                </p>
                <p className="text-sm">at Liora</p>
                <p className="text-sm">110 E 60th Street, Suite 800</p>
                <p className="text-sm">New York, NY 10022</p>
                <a
                  href="tel:+12124334569"
                  className="block text-sm text-gold hover:text-gold-dark transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]"
                >
                  212.433.4569
                </a>
                <a
                  href="mailto:hello@lioradermatology.com"
                  className="block text-sm text-gold hover:text-gold-dark transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]"
                >
                  hello@lioradermatology.com
                </a>
              </address>
            </div>

            {/* Map */}
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
                Find Us
              </p>
              <div className="aspect-video rounded-2xl overflow-hidden shadow-[0_16px_40px_-12px_rgba(0,0,0,0.06)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/about-office.png"
                  alt="Liora — 110 E 60th St, Suite 800, New York, NY 10022"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
