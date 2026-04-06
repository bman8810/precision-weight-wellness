"use client";

import { useEffect, useRef, useState } from "react";

interface TimelineStep {
  num: string;
  title: string;
  desc: string;
  details: string[];
}

export default function VerticalTimeline({ steps }: { steps: TimelineStep[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const start = rect.top + window.scrollY - windowHeight * 0.6;
      const end = rect.bottom + window.scrollY - windowHeight * 0.4;
      const scrollY = window.scrollY;
      const pct = Math.min(1, Math.max(0, (scrollY - start) / (end - start)));
      setProgress(pct);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Center vertical line (desktop) */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px] bg-[rgba(27,42,74,0.06)]">
        <div
          className="w-full bg-teal rounded-full"
          style={{
            height: `${progress * 100}%`,
            transition: "height 0.15s ease-out",
          }}
        />
      </div>

      {/* Mobile left line */}
      <div className="md:hidden absolute left-6 top-0 bottom-0 w-[2px] bg-[rgba(27,42,74,0.06)]">
        <div
          className="w-full bg-teal rounded-full"
          style={{
            height: `${progress * 100}%`,
            transition: "height 0.15s ease-out",
          }}
        />
      </div>

      <div className="space-y-12 md:space-y-20">
        {steps.map((step, i) => {
          const isLeft = i % 2 === 0;

          return (
            <div key={step.num} className="relative">
              {/* ── Desktop layout ── */}
              <div className="hidden md:grid md:grid-cols-[1fr_60px_1fr] md:gap-0 items-start">
                {/* Left column */}
                {isLeft ? (
                  <div className="pr-10">
                    <StepCard step={step} />
                  </div>
                ) : (
                  <div />
                )}

                {/* Center circle */}
                <div className="flex justify-center">
                  <div className="w-[52px] h-[52px] rounded-full bg-teal flex items-center justify-center text-white font-serif text-[18px] font-semibold shadow-[0_4px_20px_rgba(29,92,77,0.25)] ring-4 ring-cream z-10 relative">
                    {step.num}
                  </div>
                </div>

                {/* Right column */}
                {!isLeft ? (
                  <div className="pl-10">
                    <StepCard step={step} />
                  </div>
                ) : (
                  <div />
                )}
              </div>

              {/* ── Mobile layout ── */}
              <div className="md:hidden flex gap-5">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-[44px] h-[44px] rounded-full bg-teal flex items-center justify-center text-white font-serif text-[16px] font-semibold shadow-[0_4px_16px_rgba(29,92,77,0.2)] ring-4 ring-cream z-10 relative">
                    {step.num}
                  </div>
                </div>
                <div className="flex-1 min-w-0 pb-2">
                  <StepCard step={step} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StepCard({ step }: { step: TimelineStep }) {
  return (
    <div className="doppelrand doppelrand-light">
      <div className="bg-white rounded-[18px] p-7 border border-[rgba(27,42,74,0.04)] card-hover">
        <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-2">
          #{step.num}
        </p>
        <h3 className="font-serif text-[20px] tracking-[-0.01em] text-navy leading-tight">
          {step.title}
        </h3>
        <p className="text-[15px] text-body leading-[1.65] mt-3">
          {step.desc}
        </p>
        <ul className="mt-5 space-y-2.5">
          {step.details.map((detail) => (
            <li
              key={detail}
              className="flex items-start gap-2.5 text-[14px] text-body leading-[1.6]"
            >
              <span className="w-5 h-5 rounded-full bg-sage/12 flex items-center justify-center shrink-0 mt-0.5">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#7BAE8E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {detail}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
