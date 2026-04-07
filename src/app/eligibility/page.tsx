"use client";

import Link from "next/link";
import { useState, useEffect, useRef, Fragment } from "react";

const insurers: Record<string, { covered: boolean; note: string }> = {
  Aetna: {
    covered: true,
    note: "Aetna typically covers weight loss medications with prior authorization for BMI \u226530 or BMI \u226527 with comorbidities.",
  },
  "Blue Cross Blue Shield": {
    covered: true,
    note: "Most BCBS plans cover weight loss medications with prior authorization for qualifying BMI and comorbidity criteria.",
  },
  "United Healthcare": {
    covered: true,
    note: "United Healthcare generally covers weight loss medications with prior authorization. Coverage varies by specific plan.",
  },
  Cigna: {
    covered: true,
    note: "Cigna covers weight loss medications for qualifying patients with prior authorization. Step therapy may be required.",
  },
  Humana: {
    covered: true,
    note: "Humana plans typically cover weight loss medications with prior authorization for patients meeting BMI criteria.",
  },
  Medicare: {
    covered: false,
    note: "Medicare currently does not cover weight loss medications. Coverage may change \u2014 check with us for the latest updates.",
  },
  Medicaid: {
    covered: false,
    note: "Medicaid coverage for weight loss medications varies by state. New York Medicaid has limited coverage.",
  },
  Oscar: {
    covered: true,
    note: "Oscar Health plans may cover weight loss medications with prior authorization. Coverage depends on your specific plan.",
  },
  Other: {
    covered: false,
    note: "Coverage varies by plan. Contact us and we'll help you check your specific insurance benefits.",
  },
  "I don't have insurance": {
    covered: false,
    note: "Our cash-pay program makes weight loss therapy accessible without insurance. We'll discuss pricing options during your consultation.",
  },
};

const comorbidities = [
  "Type 2 Diabetes",
  "Hypertension (High Blood Pressure)",
  "Sleep Apnea",
  "High Cholesterol / Dyslipidemia",
  "Cardiovascular Disease",
  "PCOS (Polycystic Ovary Syndrome)",
  "Osteoarthritis",
  "None of the above",
];

const stepLabels = ["BMI", "Medical", "Insurance", "Results", "Summary"];

export default function EligibilityPage() {
  const [step, setStep] = useState(1);
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [weight, setWeight] = useState("");
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedInsurer, setSelectedInsurer] = useState("");

  const formCardRef = useRef<HTMLDivElement>(null);
  // Scroll the bottom of the form card into view after a selection
  function scrollToContinue() {
    setTimeout(() => {
      if (formCardRef.current) {
        const rect = formCardRef.current.getBoundingClientRect();
        const bottomOfCard = window.scrollY + rect.bottom;
        const targetScroll = bottomOfCard - window.innerHeight + 40;
        if (targetScroll > window.scrollY) {
          window.scrollTo({ top: targetScroll, behavior: "smooth" });
        }
      }
    }, 150);
  }

  // Auto-scroll to center of form card when step changes
  useEffect(() => {
    if (formCardRef.current) {
      const rect = formCardRef.current.getBoundingClientRect();
      const scrollTarget = window.scrollY + rect.top - window.innerHeight / 2 + rect.height / 2;
      window.scrollTo({ top: Math.max(0, scrollTarget), behavior: "smooth" });
    }
  }, [step]);

  const bmi = (() => {
    const ft = parseInt(heightFt);
    const inches = parseInt(heightIn) || 0;
    const lbs = parseFloat(weight);
    if (!ft || !lbs) return 0;
    const totalInches = ft * 12 + inches;
    return (lbs / (totalInches * totalInches)) * 703;
  })();

  const hasComorbidity =
    selectedConditions.length > 0 &&
    !selectedConditions.includes("None of the above");

  const qualifiesByBMI = bmi >= 30 || (bmi >= 27 && hasComorbidity);

  const estimatedLoss = (() => {
    if (bmi === 0) return { low: 0, high: 0 };
    const currentWeight = parseFloat(weight);
    const lowPercent = 0.15;
    const highPercent = hasComorbidity ? 0.2 : 0.22;
    return {
      low: Math.round(currentWeight * lowPercent),
      high: Math.round(currentWeight * highPercent),
    };
  })();

  const insurerInfo = selectedInsurer ? insurers[selectedInsurer] : null;

  function toggleCondition(condition: string) {
    if (condition === "None of the above") {
      setSelectedConditions(
        selectedConditions.includes(condition) ? [] : [condition]
      );
    } else {
      setSelectedConditions((prev) =>
        prev.includes(condition)
          ? prev.filter((c) => c !== condition)
          : [...prev.filter((c) => c !== "None of the above"), condition]
      );
    }
    scrollToContinue();
  }

  const canProceedStep1 = heightFt && weight && bmi > 0;
  const canProceedStep2 = selectedConditions.length > 0;
  const canProceedStep3 = selectedInsurer !== "";

  const inputClasses =
    "w-full px-5 py-4 bg-cream/50 border border-navy/[0.06] rounded-2xl focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 focus:bg-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] text-sm shadow-[inset_0_1px_2px_rgba(27,42,74,0.03)]";

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-40 pb-24 bg-navy-deep overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/headers/eligibility-header.jpg"
            alt=""
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
        </div>

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <div
            className="animate-fade-up inline-flex items-center rounded-full px-4 py-1.5 bg-white/[0.06] border border-white/10 mb-8"
          >
            <span className="text-[10px] tracking-[0.2em] uppercase font-medium text-gold-light">
              Eligibility &amp; Insurance Check
            </span>
          </div>

          <h1
            className="animate-fade-up font-serif text-5xl md:text-7xl leading-[1.05] tracking-tight text-white"
            style={{ animationDelay: "0.1s", textWrap: "balance" } as React.CSSProperties}
          >
            Check your <span className="text-gold">eligibility</span>
          </h1>

          <p
            className="animate-fade-up mt-8 text-lg text-white/60 max-w-xl mx-auto leading-relaxed"
            style={{ animationDelay: "0.2s" }}
          >
            Answer a few quick questions to see if you may qualify for medical
            weight management and check your insurance coverage.
          </p>
        </div>
      </section>

      {/* ── Progress + Form ── */}
      <section className="bg-cream pt-16 pb-32">
        <div className="max-w-2xl mx-auto px-4 md:px-6">
          {/* Progress — Desktop: circles + connecting lines */}
          <div className="hidden md:flex items-start mb-12">
            {stepLabels.map((label, i) => (
              <Fragment key={i}>
                <div
                  className="flex flex-col items-center"
                  style={{ minWidth: "52px" }}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                      i + 1 < step
                        ? "bg-gold text-white"
                        : i + 1 === step
                          ? "bg-white border-2 border-gold text-gold shadow-[0_0_0_4px_rgba(201,169,110,0.1)]"
                          : "bg-white border border-neutral-200 text-neutral-400"
                    }`}
                  >
                    {i + 1 < step ? "\u2713" : i + 1}
                  </div>
                  <span
                    className={`mt-2.5 text-[10px] tracking-[0.12em] uppercase transition-colors duration-500 ${
                      i + 1 === step
                        ? "text-gold font-medium"
                        : i + 1 < step
                          ? "text-gold/50"
                          : "text-neutral-400"
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {i < 4 && (
                  <div className="flex-1 mt-4 mx-1">
                    <div
                      className={`h-[1.5px] rounded-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                        i + 1 < step ? "bg-gold" : "bg-neutral-200"
                      }`}
                    />
                  </div>
                )}
              </Fragment>
            ))}
          </div>

          {/* Progress — Mobile: simple bar */}
          <div className="md:hidden mb-10">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <div
                  key={s}
                  className={`h-1 flex-1 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    s <= step ? "bg-gold" : "bg-neutral-200"
                  }`}
                />
              ))}
            </div>
            <p className="text-[11px] text-neutral-400 mt-3 text-center tracking-wide">
              Step {step} of 5
            </p>
          </div>

          {/* ── Doppelrand Form Card ── */}
          <div ref={formCardRef} className="p-2 rounded-[2rem] bg-navy/[0.02] shadow-[inset_0_0_0_1px_rgba(27,42,74,0.04)]">
            <div className="bg-white rounded-[calc(2rem-0.5rem)] p-8 md:p-12 shadow-[0_1px_3px_rgba(27,42,74,0.03),0_12px_40px_rgba(27,42,74,0.05)]">
              <div key={step} className="animate-step-enter">
                {/* ──────── Step 1: BMI Calculator ──────── */}
                {step === 1 && (
                  <div>
                    <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
                      Step 1
                    </p>
                    <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-soft-black mb-3">
                      Calculate Your BMI
                    </h2>
                    <p className="text-sm text-body mb-10">
                      Enter your height and weight to calculate your Body Mass
                      Index.
                    </p>

                    <div className="space-y-8">
                      <div>
                        <label className="block text-sm text-body/80 mb-3 font-medium">
                          Height
                        </label>
                        <div className="flex gap-4">
                          <div className="flex-1">
                            <input
                              type="number"
                              min="3"
                              max="8"
                              value={heightFt}
                              onChange={(e) => setHeightFt(e.target.value)}
                              className={inputClasses}
                              placeholder="Feet"
                            />
                          </div>
                          <div className="flex-1">
                            <input
                              type="number"
                              min="0"
                              max="11"
                              value={heightIn}
                              onChange={(e) => setHeightIn(e.target.value)}
                              className={inputClasses}
                              placeholder="Inches"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-body/80 mb-3 font-medium">
                          Weight (lbs)
                        </label>
                        <input
                          type="number"
                          min="80"
                          max="800"
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                          className={inputClasses}
                          placeholder="Weight in pounds"
                        />
                      </div>

                      {/* BMI Result — Gold Doppelrand */}
                      {bmi > 0 && (
                        <div className="p-1.5 rounded-[1.5rem] bg-gold/[0.06] shadow-[inset_0_0_0_1px_rgba(201,169,110,0.1)]">
                          <div className="bg-cream rounded-[calc(1.5rem-6px)] p-10 text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]">
                            <p className="text-[10px] tracking-[0.25em] uppercase text-body/50 mb-3">
                              Your BMI
                            </p>
                            <p className="font-serif text-6xl text-gold tabular-nums">
                              {bmi.toFixed(1)}
                            </p>
                            <p className="text-sm text-body mt-4">
                              {bmi < 18.5
                                ? "Underweight"
                                : bmi < 25
                                  ? "Normal weight"
                                  : bmi < 30
                                    ? "Overweight"
                                    : bmi < 35
                                      ? "Obese (Class I)"
                                      : bmi < 40
                                        ? "Obese (Class II)"
                                        : "Obese (Class III)"}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => setStep(2)}
                      disabled={!canProceedStep1}
                      className="group mt-12 w-full inline-flex items-center justify-center bg-gold hover:bg-gold-dark disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm tracking-wide uppercase px-6 py-3 rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] hover:shadow-[0_8px_24px_-8px_rgba(201,169,110,0.4)]"
                    >
                      <span>Continue</span>
                      <span className="ml-3 w-9 h-9 -mr-1.5 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:scale-105">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </button>
                  </div>
                )}

                {/* ──────── Step 2: Medical History ──────── */}
                {step === 2 && (
                  <div>
                    <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
                      Step 2
                    </p>
                    <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-soft-black mb-3">
                      Medical History
                    </h2>
                    <p className="text-sm text-body mb-10">
                      Select any conditions that apply to you. This helps
                      determine your eligibility for weight loss medications.
                    </p>

                    <div className="space-y-3">
                      {comorbidities.map((condition) => {
                        const selected =
                          selectedConditions.includes(condition);
                        return (
                          <button
                            key={condition}
                            onClick={() => toggleCondition(condition)}
                            className={`group w-full text-left px-6 py-5 rounded-2xl border text-sm transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                              selected
                                ? "border-gold/40 bg-gold/[0.06] shadow-[0_0_0_1px_rgba(201,169,110,0.15),0_4px_16px_rgba(201,169,110,0.08)] text-soft-black"
                                : "border-navy/[0.06] bg-cream/40 text-body hover:border-gold/30 hover:bg-gold/[0.03]"
                            }`}
                          >
                            <span className="flex items-center gap-3">
                              <span
                                className={`w-5 h-5 rounded-lg border-[1.5px] flex items-center justify-center text-[10px] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                                  selected
                                    ? "bg-gold border-gold text-white shadow-[0_2px_8px_rgba(201,169,110,0.3)]"
                                    : "border-navy/15 group-hover:border-gold/40"
                                }`}
                              >
                                {selected && "\u2713"}
                              </span>
                              {condition}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex gap-3 mt-12">
                      <button
                        onClick={() => setStep(1)}
                        className="flex-1 border border-navy/10 text-body hover:border-gold hover:text-gold text-sm tracking-wide uppercase px-6 py-4 rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setStep(3)}
                        disabled={!canProceedStep2}
                        className="group flex-[1.4] inline-flex items-center justify-center bg-gold hover:bg-gold-dark disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm tracking-wide uppercase px-6 py-3 rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] hover:shadow-[0_8px_24px_-8px_rgba(201,169,110,0.4)]"
                      >
                        <span>Continue</span>
                        <span className="ml-3 w-9 h-9 -mr-1.5 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:scale-105">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                )}

                {/* ──────── Step 3: Insurance Check ──────── */}
                {step === 3 && (
                  <div>
                    <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
                      Step 3
                    </p>
                    <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-soft-black mb-3">
                      Insurance Check
                    </h2>
                    <p className="text-sm text-body mb-10">
                      Select your insurance provider to check typical weight
                      loss medication coverage.
                    </p>

                    <div className="space-y-3">
                      {Object.keys(insurers).map((insurer) => {
                        const selected = selectedInsurer === insurer;
                        return (
                          <button
                            key={insurer}
                            onClick={() => { setSelectedInsurer(insurer); scrollToContinue(); }}
                            className={`group w-full text-left px-6 py-5 rounded-2xl border text-sm transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                              selected
                                ? "border-gold/40 bg-gold/[0.06] shadow-[0_0_0_1px_rgba(201,169,110,0.15),0_4px_16px_rgba(201,169,110,0.08)] text-soft-black"
                                : "border-navy/[0.06] bg-cream/40 text-body hover:border-gold/30 hover:bg-gold/[0.03]"
                            }`}
                          >
                            <span className="flex items-center gap-3">
                              <span
                                className={`w-[18px] h-[18px] rounded-full border-[1.5px] flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                                  selected
                                    ? "border-gold"
                                    : "border-navy/15 group-hover:border-gold/40"
                                }`}
                              >
                                {selected && (
                                  <span className="w-2.5 h-2.5 rounded-full bg-gold shadow-[0_1px_4px_rgba(201,169,110,0.4)]" />
                                )}
                              </span>
                              {insurer}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Insurance Coverage Info */}
                    {insurerInfo && (
                      <div
                        className={`mt-8 p-8 rounded-2xl border flex items-start gap-4 ${
                          insurerInfo.covered
                            ? "bg-emerald-50/60 border-emerald-200/50"
                            : "bg-amber-50/60 border-amber-200/50"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            insurerInfo.covered
                              ? "bg-emerald-100"
                              : "bg-amber-100"
                          }`}
                        >
                          {insurerInfo.covered ? (
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#059669"
                              strokeWidth="2"
                              strokeLinecap="round"
                            >
                              <path d="M20 6L9 17l-5-5" />
                            </svg>
                          ) : (
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#D97706"
                              strokeWidth="2"
                              strokeLinecap="round"
                            >
                              <path d="M12 8v4M12 16h.01" />
                              <circle cx="12" cy="12" r="10" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <p
                            className={`text-sm font-medium ${
                              insurerInfo.covered
                                ? "text-emerald-800"
                                : "text-amber-800"
                            }`}
                          >
                            {insurerInfo.covered
                              ? "Coverage Likely Available"
                              : "Limited or No Coverage"}
                          </p>
                          <p
                            className={`text-sm mt-2 leading-relaxed ${
                              insurerInfo.covered
                                ? "text-emerald-700"
                                : "text-amber-700"
                            }`}
                          >
                            {insurerInfo.note}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3 mt-12">
                      <button
                        onClick={() => setStep(2)}
                        className="flex-1 border border-navy/10 text-body hover:border-gold hover:text-gold text-sm tracking-wide uppercase px-6 py-4 rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setStep(4)}
                        disabled={!canProceedStep3}
                        className="group flex-[1.4] inline-flex items-center justify-center bg-gold hover:bg-gold-dark disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm tracking-wide uppercase px-6 py-3 rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] hover:shadow-[0_8px_24px_-8px_rgba(201,169,110,0.4)]"
                      >
                        <span>Continue</span>
                        <span className="ml-3 w-9 h-9 -mr-1.5 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:scale-105">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                )}

                {/* ──────── Step 4: Estimated Results ──────── */}
                {step === 4 && (
                  <div>
                    <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
                      Step 4
                    </p>
                    <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-soft-black mb-3">
                      Your Estimated Results
                    </h2>
                    <p className="text-sm text-body mb-10">
                      Based on your profile and clinical trial data, here&apos;s
                      what you might expect with our weight loss medication
                      program.
                    </p>

                    {/* Metric Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Current BMI */}
                      <div className="p-1 rounded-[1.25rem] bg-navy/[0.02] shadow-[inset_0_0_0_1px_rgba(27,42,74,0.04)]">
                        <div className="bg-cream rounded-[calc(1.25rem-4px)] p-6 text-center">
                          <p className="text-[10px] tracking-[0.2em] uppercase text-body/50 mb-2">
                            Current BMI
                          </p>
                          <p className="font-serif text-3xl text-soft-black tabular-nums">
                            {bmi.toFixed(1)}
                          </p>
                        </div>
                      </div>

                      {/* Estimated Loss — Hero metric */}
                      <div className="p-1 rounded-[1.25rem] bg-gold/[0.06] shadow-[inset_0_0_0_1px_rgba(201,169,110,0.1)]">
                        <div className="bg-cream rounded-[calc(1.25rem-4px)] p-6 text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]">
                          <p className="text-[10px] tracking-[0.2em] uppercase text-body/50 mb-2">
                            12-Month Loss
                          </p>
                          <p className="font-serif text-3xl text-gold tabular-nums">
                            {estimatedLoss.low}&ndash;{estimatedLoss.high} lbs
                          </p>
                        </div>
                      </div>

                      {/* Projected Weight */}
                      <div className="p-1 rounded-[1.25rem] bg-navy/[0.02] shadow-[inset_0_0_0_1px_rgba(27,42,74,0.04)]">
                        <div className="bg-cream rounded-[calc(1.25rem-4px)] p-6 text-center">
                          <p className="text-[10px] tracking-[0.2em] uppercase text-body/50 mb-2">
                            Projected Weight
                          </p>
                          <p className="font-serif text-3xl text-soft-black tabular-nums">
                            {Math.round(
                              parseFloat(weight) - estimatedLoss.high
                            )}
                            &ndash;
                            {Math.round(
                              parseFloat(weight) - estimatedLoss.low
                            )}{" "}
                            lbs
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-body/40 leading-relaxed mt-6 text-center">
                      Based on published clinical trial data for Semaglutide and
                      Tirzepatide. Individual results may vary. These
                      projections are for informational purposes only and are
                      not a guarantee.
                    </p>

                    {/* Eligibility Status */}
                    {qualifiesByBMI && (
                      <div className="mt-8 p-8 rounded-2xl border flex items-start gap-4 bg-emerald-50/60 border-emerald-200/50">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#059669"
                            strokeWidth="2"
                            strokeLinecap="round"
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-emerald-800">
                            You may be a great candidate for our weight loss
                            medication program
                          </p>
                          <p className="text-sm mt-2 text-emerald-700 leading-relaxed">
                            Based on your BMI
                            {hasComorbidity ? " and health history" : ""}, you
                            meet the general criteria for weight loss medication
                            therapy. A consultation with Dr. Rhee will confirm
                            your eligibility.
                          </p>
                        </div>
                      </div>
                    )}

                    {!qualifiesByBMI && bmi > 0 && (
                      <div className="mt-8 p-8 rounded-2xl border flex items-start gap-4 bg-amber-50/60 border-amber-200/50">
                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#D97706"
                            strokeWidth="2"
                            strokeLinecap="round"
                          >
                            <path d="M12 8v4M12 16h.01" />
                            <circle cx="12" cy="12" r="10" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-amber-800">
                            Let&apos;s discuss your options
                          </p>
                          <p className="text-sm mt-2 text-amber-700 leading-relaxed">
                            Based on your current BMI, standard medication
                            eligibility criteria may not apply. However, we can
                            still work with you to find affordable medication
                            options and create a wellness plan. Book a
                            consultation with Dr. Rhee to explore your options.
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3 mt-12">
                      <button
                        onClick={() => setStep(3)}
                        className="flex-1 border border-navy/10 text-body hover:border-gold hover:text-gold text-sm tracking-wide uppercase px-6 py-4 rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setStep(5)}
                        className="group flex-[1.4] inline-flex items-center justify-center bg-gold hover:bg-gold-dark text-white text-sm tracking-wide uppercase px-6 py-3 rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] hover:shadow-[0_8px_24px_-8px_rgba(201,169,110,0.4)]"
                      >
                        <span>Continue</span>
                        <span className="ml-3 w-9 h-9 -mr-1.5 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:scale-105">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                )}

                {/* ──────── Step 5: Summary + CTA ──────── */}
                {step === 5 && (
                  <div className="text-center">
                    <div className="inline-flex items-center rounded-full px-4 py-1.5 bg-gold/8 border border-gold/15 mb-6">
                      <span className="text-[10px] tracking-[0.2em] uppercase font-medium text-gold">
                        You&apos;re Ready
                      </span>
                    </div>
                    <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-soft-black mb-5">
                      Take the Next Step
                    </h2>
                    <p className="text-body leading-relaxed max-w-md mx-auto">
                      {qualifiesByBMI
                        ? "Based on your responses, you may be an excellent candidate for our weight management program. Book a consultation with Dr. Rhee to get started."
                        : "Schedule a consultation with Dr. Rhee to discuss your weight management goals and explore your options."}
                    </p>

                    {/* Summary Card — Doppelrand */}
                    <div className="mt-10 p-1.5 rounded-[1.5rem] bg-navy/[0.02] shadow-[inset_0_0_0_1px_rgba(27,42,74,0.04)]">
                      <div className="bg-cream rounded-[calc(1.5rem-6px)] p-8 space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { label: "BMI", value: bmi.toFixed(1) },
                            {
                              label: "Current Weight",
                              value: `${weight} lbs`,
                            },
                            {
                              label: "Health Conditions",
                              value: hasComorbidity
                                ? selectedConditions.join(", ")
                                : "None reported",
                            },
                            { label: "Insurance", value: selectedInsurer },
                          ].map((item) => (
                            <div
                              key={item.label}
                              className="bg-white/80 rounded-xl p-4 text-left"
                            >
                              <p className="text-[10px] tracking-[0.2em] uppercase text-body/50 mb-1.5">
                                {item.label}
                              </p>
                              <p className="text-soft-black text-sm font-medium tabular-nums">
                                {item.value}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Hero Metric */}
                        <div className="p-1 rounded-[1rem] bg-gold/[0.06] shadow-[inset_0_0_0_1px_rgba(201,169,110,0.1)]">
                          <div className="bg-white rounded-[calc(1rem-4px)] p-6 text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]">
                            <p className="text-[10px] tracking-[0.2em] uppercase text-body/50 mb-2">
                              Estimated 12-Month Loss
                            </p>
                            <p className="font-serif text-4xl text-gold tabular-nums">
                              {estimatedLoss.low}&ndash;{estimatedLoss.high} lbs
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Final CTAs */}
                    <div className="mt-10 space-y-4">
                      <Link
                        href="/book"
                        className="group w-full inline-flex items-center justify-center bg-navy hover:bg-navy-light text-white text-sm tracking-wide uppercase px-6 py-3 rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] hover:shadow-[0_12px_32px_-8px_rgba(27,42,74,0.3)]"
                      >
                        <span>Book Your Consultation</span>
                        <span className="ml-3 w-9 h-9 -mr-1.5 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:scale-105">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </span>
                      </Link>
                      <button
                        onClick={() => setStep(1)}
                        className="block w-full text-sm text-neutral-400 hover:text-gold transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                      >
                        Start Over
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
