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
    // Placeholder — no backend yet
    setSubmitted(true);
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-cream">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">
            Get in Touch
          </p>
          <h1 className="font-serif text-5xl md:text-6xl leading-tight text-soft-black">
            Contact & <span className="text-gold">Book</span>
          </h1>
          <p className="mt-6 text-lg text-neutral-500 max-w-2xl mx-auto leading-relaxed">
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
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">
              Send a Message
            </p>
            <h2 className="font-serif text-3xl text-soft-black mb-8">
              We&apos;d Love to Hear From You
            </h2>

            {submitted ? (
              <div className="bg-cream p-8 rounded-xl text-center">
                <p className="font-serif text-2xl text-soft-black">
                  Thank You!
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
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-gold transition-colors text-sm"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm text-neutral-600 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-gold transition-colors text-sm"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm text-neutral-600 mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-gold transition-colors text-sm"
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
                    className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-gold transition-colors text-sm resize-none"
                    placeholder="Tell us about your goals or ask any questions..."
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gold hover:bg-gold-dark text-white text-sm tracking-wide uppercase px-8 py-4 rounded-full transition-colors w-full"
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
              <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">
                Schedule Online
              </p>
              <h2 className="font-serif text-3xl text-soft-black mb-4">
                Book Your Consultation
              </h2>
              <p className="text-neutral-500 leading-relaxed mb-6">
                Use our online scheduling portal to book your initial
                consultation at a time that works for you.
              </p>
              <a
                href="https://app.gethealthie.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gold hover:bg-gold-dark text-white text-sm tracking-wide uppercase px-8 py-4 rounded-full transition-colors"
              >
                Schedule Now
              </a>
            </div>

            {/* Contact Details */}
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">
                Contact Details
              </p>
              <div className="space-y-3 text-neutral-500">
                <p className="font-medium text-soft-black">
                  Precision Weight & Wellness
                </p>
                <p className="text-sm">at Liora</p>
                <p className="text-sm">110 E 60th Street, Suite 800</p>
                <p className="text-sm">New York, NY 10022</p>
                <a
                  href="tel:+12124334569"
                  className="block text-sm text-gold hover:text-gold-dark transition-colors"
                >
                  212.433.4569
                </a>
                <a
                  href="mailto:hello@lioradermatology.com"
                  className="block text-sm text-gold hover:text-gold-dark transition-colors"
                >
                  hello@lioradermatology.com
                </a>
              </div>
            </div>

            {/* Map Placeholder */}
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">
                Find Us
              </p>
              <div className="aspect-video rounded-xl overflow-hidden bg-warm flex items-center justify-center">
                <div className="text-center">
                  <p className="text-neutral-400 text-sm">Map placeholder</p>
                  <p className="text-xs text-neutral-300 mt-2">
                    110 E 60th St, Suite 800, New York, NY 10022
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
