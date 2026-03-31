"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Eligibility Check", href: "/eligibility" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-white/95 backdrop-blur-sm border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col">
            <span className="font-serif text-xl tracking-wide text-soft-black">
              LIORA
            </span>
            <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-400">
              Precision Weight + Wellness
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm tracking-wide uppercase text-neutral-600 hover:text-soft-black transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Phone */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href="tel:+12124334569"
              className="text-sm text-neutral-500 hover:text-soft-black transition-colors"
            >
              212.433.4569
            </a>
            <Link
              href="/contact"
              className="bg-gold hover:bg-gold-dark text-white text-sm tracking-wide uppercase px-6 py-3 rounded-full transition-colors"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <span
                className={`block w-6 h-0.5 bg-neutral-800 transition-transform ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`block w-6 h-0.5 bg-neutral-800 transition-opacity ${mobileOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block w-6 h-0.5 bg-neutral-800 transition-transform ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-neutral-100 px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm text-neutral-600 py-1"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-neutral-100" />
            <a
              href="tel:+12124334569"
              className="block text-sm text-neutral-500 py-1"
            >
              212.433.4569
            </a>
            <Link
              href="/contact"
              className="block text-center bg-gold text-white text-sm tracking-wide uppercase px-6 py-3 rounded-full mt-4"
              onClick={() => setMobileOpen(false)}
            >
              Book Now
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
