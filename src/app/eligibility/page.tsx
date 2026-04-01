"use client";

import Link from "next/link";
import { useState } from "react";

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

export default function EligibilityPage() {
  const [step, setStep] = useState(1);
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [weight, setWeight] = useState("");
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedInsurer, setSelectedInsurer] = useState("");

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
      return;
    }
    setSelectedConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev.filter((c) => c !== "None of the above"), condition]
    );
  }

  const canProceedStep1 = heightFt && weight && bmi > 0;
  const canProceedStep2 = selectedConditions.length > 0;
  const canProceedStep3 = selectedInsurer !== "";

  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-16 bg-cream overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-wellness.png"
            alt=""
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-6">
            Eligibility & Insurance Check
          </p>
          <h1
            className="font-serif text-5xl md:text-6xl leading-[1.08] tracking-tight text-soft-black"
            style={{ textWrap: "balance" }}
          >
            Check your <span className="text-gold">eligibility</span>
          </h1>
          <p className="mt-8 text-lg text-neutral-500 max-w-2xl mx-auto leading-relaxed">
            Answer a few quick questions to see if you may be a candidate for
            medical weight management and check your insurance coverage.
          </p>
        </div>
      </section>

      {/* Progress Bar */}
      <section className="bg-cream pb-16">
        <div className="max-w-2xl mx-auto px-6">
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
      </section>

      {/* Form Steps */}
      <section className="py-24 bg-white">
        <div className="max-w-2xl mx-auto px-6">
          {/* Step 1: BMI Calculator */}
          {step === 1 && (
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
                Step 1
              </p>
              <h2 className="font-serif text-3xl tracking-tight text-soft-black mb-3">
                Calculate Your BMI
              </h2>
              <p className="text-sm text-neutral-500 mb-10">
                Enter your height and weight to calculate your Body Mass Index.
              </p>

              <div className="space-y-8">
                <div>
                  <label className="block text-sm text-neutral-600 mb-3">
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
                        className="w-full px-5 py-4 border border-neutral-200 rounded-xl focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] text-sm bg-white"
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
                        className="w-full px-5 py-4 border border-neutral-200 rounded-xl focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] text-sm bg-white"
                        placeholder="Inches"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-neutral-600 mb-3">
                    Weight (lbs)
                  </label>
                  <input
                    type="number"
                    min="80"
                    max="800"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-5 py-4 border border-neutral-200 rounded-xl focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] text-sm bg-white"
                    placeholder="Weight in pounds"
                  />
                </div>

                {bmi > 0 && (
                  <div className="bg-cream p-8 rounded-2xl text-center">
                    <p className="text-[11px] tracking-[0.2em] uppercase text-neutral-400 mb-2">
                      Your BMI
                    </p>
                    <p className="font-serif text-5xl text-gold tabular-nums">
                      {bmi.toFixed(1)}
                    </p>
                    <p className="text-sm text-neutral-500 mt-3">
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
                )}
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!canProceedStep1}
                className="mt-10 w-full bg-gold hover:bg-gold-dark disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm tracking-wide uppercase px-8 py-4 rounded-full transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-y-[-1px] hover:shadow-[0_8px_24px_-8px_rgba(201,169,110,0.4)]"
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 2: Medical History */}
          {step === 2 && (
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
                Step 2
              </p>
              <h2 className="font-serif text-3xl tracking-tight text-soft-black mb-3">
                Medical History
              </h2>
              <p className="text-sm text-neutral-500 mb-10">
                Select any conditions that apply to you. This helps determine
                your eligibility for weight loss medications.
              </p>

              <div className="space-y-3">
                {comorbidities.map((condition) => (
                  <button
                    key={condition}
                    onClick={() => toggleCondition(condition)}
                    className={`w-full text-left px-5 py-4 rounded-xl border text-sm transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      selectedConditions.includes(condition)
                        ? "border-gold bg-gold/8 text-soft-black"
                        : "border-neutral-200 text-neutral-600 hover:border-gold/50"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`w-5 h-5 rounded border flex items-center justify-center text-xs transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          selectedConditions.includes(condition)
                            ? "bg-gold border-gold text-white"
                            : "border-neutral-300"
                        }`}
                      >
                        {selectedConditions.includes(condition) && "\u2713"}
                      </span>
                      {condition}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex gap-4 mt-10">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 border border-neutral-300 text-neutral-600 hover:border-gold hover:text-gold text-sm tracking-wide uppercase px-8 py-4 rounded-full transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-y-[-1px]"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!canProceedStep2}
                  className="flex-1 bg-gold hover:bg-gold-dark disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm tracking-wide uppercase px-8 py-4 rounded-full transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-y-[-1px] hover:shadow-[0_8px_24px_-8px_rgba(201,169,110,0.4)]"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Insurance Check */}
          {step === 3 && (
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
                Step 3
              </p>
              <h2 className="font-serif text-3xl tracking-tight text-soft-black mb-3">
                Insurance Check
              </h2>
              <p className="text-sm text-neutral-500 mb-10">
                Select your insurance provider to check typical weight loss
                medication coverage.
              </p>

              <div className="space-y-3">
                {Object.keys(insurers).map((insurer) => (
                  <button
                    key={insurer}
                    onClick={() => setSelectedInsurer(insurer)}
                    className={`w-full text-left px-5 py-4 rounded-xl border text-sm transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      selectedInsurer === insurer
                        ? "border-gold bg-gold/8 text-soft-black"
                        : "border-neutral-200 text-neutral-600 hover:border-gold/50"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          selectedInsurer === insurer
                            ? "border-gold"
                            : "border-neutral-300"
                        }`}
                      >
                        {selectedInsurer === insurer && (
                          <span className="w-2 h-2 rounded-full bg-gold" />
                        )}
                      </span>
                      {insurer}
                    </span>
                  </button>
                ))}
              </div>

              {insurerInfo && (
                <div
                  className={`mt-8 p-8 rounded-2xl ${insurerInfo.covered ? "bg-green-50 border border-green-200" : "bg-amber-50 border border-amber-200"}`}
                >
                  <p
                    className={`text-sm font-medium ${insurerInfo.covered ? "text-green-800" : "text-amber-800"}`}
                  >
                    {insurerInfo.covered
                      ? "Coverage Likely Available"
                      : "Limited or No Coverage"}
                  </p>
                  <p
                    className={`text-sm mt-3 leading-relaxed ${insurerInfo.covered ? "text-green-700" : "text-amber-700"}`}
                  >
                    {insurerInfo.note}
                  </p>
                </div>
              )}

              <div className="flex gap-4 mt-10">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 border border-neutral-300 text-neutral-600 hover:border-gold hover:text-gold text-sm tracking-wide uppercase px-8 py-4 rounded-full transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-y-[-1px]"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  disabled={!canProceedStep3}
                  className="flex-1 bg-gold hover:bg-gold-dark disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm tracking-wide uppercase px-8 py-4 rounded-full transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-y-[-1px] hover:shadow-[0_8px_24px_-8px_rgba(201,169,110,0.4)]"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Estimated Weight Loss */}
          {step === 4 && (
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-4">
                Step 4
              </p>
              <h2 className="font-serif text-3xl tracking-tight text-soft-black mb-3">
                Your Estimated Results
              </h2>
              <p className="text-sm text-neutral-500 mb-10">
                Based on your profile and clinical trial data, here&apos;s what
                you might expect with our weight loss medication program.
              </p>

              <div className="bg-cream p-10 rounded-2xl text-center space-y-8">
                <div>
                  <p className="text-[11px] tracking-[0.2em] uppercase text-neutral-400 mb-2">
                    Your Current BMI
                  </p>
                  <p className="font-serif text-3xl text-soft-black tabular-nums">
                    {bmi.toFixed(1)}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] tracking-[0.2em] uppercase text-neutral-400 mb-2">
                    Estimated Weight Loss in 12 Months
                  </p>
                  <p className="font-serif text-5xl text-gold tabular-nums">
                    {estimatedLoss.low} – {estimatedLoss.high} lbs
                  </p>
                </div>

                <div>
                  <p className="text-[11px] tracking-[0.2em] uppercase text-neutral-400 mb-2">
                    Projected Weight
                  </p>
                  <p className="font-serif text-3xl text-soft-black tabular-nums">
                    {Math.round(parseFloat(weight) - estimatedLoss.low)} –{" "}
                    {Math.round(parseFloat(weight) - estimatedLoss.high)} lbs
                  </p>
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed pt-2">
                  Based on published clinical trial data for Semaglutide and
                  Tirzepatide. Individual results may vary. These projections
                  are for informational purposes only and are not a guarantee.
                </p>
              </div>

              {qualifiesByBMI && (
                <div className="mt-8 p-8 rounded-2xl bg-green-50 border border-green-200">
                  <p className="text-sm font-medium text-green-800">
                    You may be a great candidate for our weight loss medication program
                  </p>
                  <p className="text-sm mt-3 text-green-700 leading-relaxed">
                    Based on your BMI
                    {hasComorbidity ? " and health history" : ""}, you meet the
                    general criteria for weight loss medication therapy. A
                    consultation with Dr. Rhee will confirm your eligibility.
                  </p>
                </div>
              )}

              {!qualifiesByBMI && bmi > 0 && (
                <div className="mt-8 p-8 rounded-2xl bg-amber-50 border border-amber-200">
                  <p className="text-sm font-medium text-amber-800">
                    Let&apos;s discuss your options
                  </p>
                  <p className="text-sm mt-3 text-amber-700 leading-relaxed">
                    Based on your current BMI, standard medication eligibility
                    criteria may not apply. However, we can still work with you
                    to find affordable medication options and create a wellness
                    plan. Book a consultation with Dr. Rhee to explore your
                    options.
                  </p>
                </div>
              )}

              <div className="flex gap-4 mt-10">
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 border border-neutral-300 text-neutral-600 hover:border-gold hover:text-gold text-sm tracking-wide uppercase px-8 py-4 rounded-full transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-y-[-1px]"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(5)}
                  className="flex-1 bg-gold hover:bg-gold-dark text-white text-sm tracking-wide uppercase px-8 py-4 rounded-full transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-y-[-1px] hover:shadow-[0_8px_24px_-8px_rgba(201,169,110,0.4)]"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 5: CTA */}
          {step === 5 && (
            <div className="text-center">
              <p className="text-[11px] tracking-[0.3em] uppercase text-gold mb-6">
                You&apos;re Ready
              </p>
              <h2 className="font-serif text-4xl tracking-tight text-soft-black mb-5">
                Take the Next Step
              </h2>
              <p className="text-neutral-500 leading-relaxed max-w-lg mx-auto">
                {qualifiesByBMI
                  ? "Based on your responses, you may be an excellent candidate for our weight management program. Book a consultation with Dr. Rhee to get started."
                  : "Schedule a consultation with Dr. Rhee to discuss your weight management goals and explore your options."}
              </p>

              <div className="mt-10 bg-cream p-10 rounded-2xl space-y-6">
                <div className="grid grid-cols-2 gap-6 text-left text-sm">
                  <div>
                    <p className="text-neutral-400 text-[11px] tracking-wide uppercase mb-1">BMI</p>
                    <p className="text-soft-black font-medium tabular-nums">
                      {bmi.toFixed(1)}
                    </p>
                  </div>
                  <div>
                    <p className="text-neutral-400 text-[11px] tracking-wide uppercase mb-1">Current Weight</p>
                    <p className="text-soft-black font-medium tabular-nums">{weight} lbs</p>
                  </div>
                  <div>
                    <p className="text-neutral-400 text-[11px] tracking-wide uppercase mb-1">Health Conditions</p>
                    <p className="text-soft-black font-medium">
                      {hasComorbidity
                        ? selectedConditions.join(", ")
                        : "None reported"}
                    </p>
                  </div>
                  <div>
                    <p className="text-neutral-400 text-[11px] tracking-wide uppercase mb-1">Insurance</p>
                    <p className="text-soft-black font-medium">
                      {selectedInsurer}
                    </p>
                  </div>
                </div>
                <div className="pt-2">
                  <p className="text-neutral-400 text-[11px] tracking-wide uppercase mb-2">
                    Estimated 12-Month Loss
                  </p>
                  <p className="font-serif text-3xl text-gold tabular-nums">
                    {estimatedLoss.low} – {estimatedLoss.high} lbs
                  </p>
                </div>
              </div>

              <div className="mt-10 space-y-4">
                <Link
                  href="/book"
                  className="block bg-gold hover:bg-gold-dark text-white text-sm tracking-wide uppercase px-8 py-4 rounded-full transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-y-[-1px] hover:shadow-[0_8px_24px_-8px_rgba(201,169,110,0.4)]"
                >
                  Book Your Consultation
                </Link>
                <button
                  onClick={() => setStep(1)}
                  className="block w-full text-sm text-neutral-400 hover:text-gold transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]"
                >
                  Start Over
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
