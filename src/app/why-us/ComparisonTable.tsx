"use client";

import { useState } from "react";

interface Contrast {
  label: string;
  elsewhere: string;
  here: string;
  expanded: string[];
}

export function ComparisonTable({ contrasts }: { contrasts: Contrast[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-0 divide-y divide-neutral-100">
      {contrasts.map((c, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={c.label}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full text-left grid grid-cols-1 md:grid-cols-[200px_1fr_1fr] gap-6 md:gap-10 py-8 first:pt-0 last:pb-0 group cursor-pointer"
            >
              <div className="flex items-center gap-2 md:pt-1">
                <p className="font-serif text-lg text-soft-black">
                  {c.label}
                </p>
                <svg
                  className={`w-4 h-4 text-gold shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div>
                <p className="text-xs tracking-[0.15em] uppercase text-neutral-300 mb-2">
                  Elsewhere
                </p>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {c.elsewhere}
                </p>
              </div>
              <div>
                <p className="text-xs tracking-[0.15em] uppercase text-gold mb-2">
                  At Precision Weight + Wellness
                </p>
                <p className="text-sm text-soft-black leading-relaxed">
                  {c.here}
                </p>
              </div>
            </button>
            <div
              className={`overflow-hidden transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isOpen ? "max-h-96 opacity-100 pb-8" : "max-h-0 opacity-0"
              }`}
            >
              <div className="md:ml-[200px] md:pl-10 pl-0">
                <div className="bg-cream rounded-xl p-6">
                  <p className="text-xs tracking-[0.15em] uppercase text-gold mb-4">
                    What this looks like at Precision
                  </p>
                  <ul className="space-y-2.5">
                    {c.expanded.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm text-neutral-600 leading-relaxed"
                      >
                        <span className="text-gold mt-0.5 shrink-0">&#10003;</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
