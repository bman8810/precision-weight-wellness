"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Why Us", href: "/why-us" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Eligibility Check", href: "/eligibility" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <div className="bg-white/90 backdrop-blur-md border-b border-neutral-100/80">
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
                className={`text-sm tracking-wide uppercase transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isActive(link.href)
                    ? "text-gold"
                    : "text-neutral-500 hover:text-soft-black"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Phone */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href="tel:+12124334569"
              className="text-sm text-neutral-500 hover:text-soft-black transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
              212.433.4569
            </a>
            <Link
              href="/book"
              className="bg-gold hover:bg-gold-dark text-white text-sm tracking-wide uppercase px-6 py-3 rounded-full transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-[0_4px_16px_-4px_rgba(201,169,110,0.4)]"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <div className="space-y-1.5">
              <span
                className={`block w-6 h-0.5 bg-neutral-800 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`block w-6 h-0.5 bg-neutral-800 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block w-6 h-0.5 bg-neutral-800 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu — animated slide */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            mobileOpen
              ? "max-h-[28rem] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white border-t border-neutral-100 px-6 py-8 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block text-sm py-1.5 transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isActive(link.href)
                    ? "text-gold"
                    : "text-neutral-600 hover:text-soft-black"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-neutral-100" />
            <a
              href="tel:+12124334569"
              className="block text-sm text-neutral-500 py-1.5"
            >
              212.433.4569
            </a>
            <Link
              href="/book"
              className="block text-center bg-gold hover:bg-gold-dark text-white text-sm tracking-wide uppercase px-6 py-3 rounded-full mt-4 transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
