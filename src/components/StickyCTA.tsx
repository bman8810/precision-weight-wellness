"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (dismissed || !visible) return null;

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 bg-void/80 backdrop-blur-xl border-t border-white/5"
      style={{ animation: "slide-up-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) both" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link
            href="/book"
            className="btn-gradient text-xs font-medium tracking-wide px-6 py-2.5 rounded-full"
          >
            Book a Consultation
          </Link>
          <a
            href="tel:+12124334569"
            className="hidden sm:inline text-sm text-neutral-500 hover:text-accent transition-colors duration-300"
          >
            212-433-4569
          </a>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-neutral-500 hover:text-white transition-colors duration-300 p-1"
          aria-label="Dismiss"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
