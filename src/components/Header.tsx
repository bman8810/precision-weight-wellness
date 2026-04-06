"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Science", href: "/science" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  const transparent = isHome && !scrolled && !mobileOpen;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 md:px-6">
      <div
        className={`mx-auto transition-all duration-700 ${
          transparent
            ? "bg-transparent max-w-[1200px] mt-0 rounded-none"
            : "bg-white/90 backdrop-blur-[20px] backdrop-saturate-[180%] shadow-[0_2px_20px_rgba(27,42,74,0.06)] max-w-[900px] mt-4 rounded-full ring-1 ring-[rgba(27,42,74,0.04)]"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}
      >
        <div className="px-5 md:px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex flex-col">
            <span
              className={`font-serif text-[18px] tracking-[-0.02em] transition-colors duration-500 ${
                transparent ? "text-white" : "text-navy"
              }`}
              style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}
            >
              Precision <span className={transparent ? "text-gold-light" : "text-gold"}>W+W</span>
            </span>
            <span
              className={`font-serif text-[10px] uppercase tracking-[0.1em] transition-all duration-500 overflow-hidden leading-none ${
                transparent
                  ? "text-white max-h-4 opacity-100 -mt-0.5"
                  : "max-h-0 opacity-0 -mt-1"
              }`}
              style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}
            >
              BY LIORA
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] tracking-[-0.01em] transition-colors duration-500 ${
                  transparent
                    ? isActive(link.href)
                      ? "text-gold font-medium"
                      : "text-white/70 hover:text-white"
                    : isActive(link.href)
                      ? "text-gold font-medium"
                      : "text-[#4A5568] hover:text-navy"
                }`}
                style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://secure.gethealthie.com/go/precisionww"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[13px] tracking-[-0.01em] transition-colors duration-500 ${
                transparent
                  ? "text-white/70 hover:text-white"
                  : "text-[#4A5568] hover:text-navy"
              }`}
              style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}
            >
              Patient Login
            </a>
            <Link
              href="/book"
              className={`!text-[13px] !py-2 !px-5 !min-h-0 inline-flex items-center justify-center font-medium rounded-full transition-all duration-500 active:scale-[0.98] ${
                transparent
                  ? "bg-gold text-navy-deep hover:bg-gold-light"
                  : "bg-navy text-white hover:bg-navy-light"
              }`}
              style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}
            >
              Book Now
            </Link>
          </nav>

          <button
            className="lg:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <div className="space-y-1">
              <span className={`block w-[18px] h-[1.5px] transition-all duration-500 ${transparent ? "bg-white" : "bg-navy"} ${mobileOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }} />
              <span className={`block w-[18px] h-[1.5px] transition-all duration-500 ${transparent ? "bg-white" : "bg-navy"} ${mobileOpen ? "opacity-0" : ""}`} style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }} />
              <span className={`block w-[18px] h-[1.5px] transition-all duration-500 ${transparent ? "bg-white" : "bg-navy"} ${mobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }} />
            </div>
          </button>
        </div>

        <div className={`lg:hidden overflow-hidden transition-all duration-500 ${mobileOpen ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"}`} style={{ transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)" }}>
          <div className="bg-white rounded-b-[24px] px-5 py-6 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block text-[15px] py-1 ${isActive(link.href) ? "text-gold font-medium" : "text-[#4A5568]"}`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://secure.gethealthie.com/go/precisionww"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[15px] py-1 text-gold font-medium"
            >
              Patient Login
            </a>
            <Link href="/book" className="block text-center btn-primary mt-4 w-full text-[15px]">
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
