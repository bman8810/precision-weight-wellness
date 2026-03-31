"use client";

import Link from "next/link";
import { useState } from "react";

const insurers: Record<string, { covered: boolean; note: string }> = {
  Aetna: {
    covered: true,
    note: "Aetna typically covers GLP-1 medications with prior authorization for BMI ≥30 or BMI ≥27 with comorbidities.",
  },
  "Blue Cross Blue Shield": {
    covered: true,
    note: "Most BCBS plans cover GLP-1 medications with prior authorization for qualifying BMI and comorbidity criteria.",
  },
  "United Healthcare": {
    covered: true,
    note: "United Healthcare generally covers GLP-1 medications with prior authorization. Coverage varies by specific plan.",
  },
  Cigna: {
    covered: true,
    note: "Cigna covers GLP-1 medications for qualifying patients with prior authorization. Step therapy may be required.",
  },
  Humana: {
    covered: true,
    note: "Humana plans typically cover GLP-1 medications with prior authorization for patients meeting BMI criteria.",
  },
  Medicare: {
    covered: false,
    note: "Medicare currently does not cover GLP-1 medications for weight loss. Coverage may change — check with us for the latest updates.",
  },
  Medicaid: {
    covered: false,
    note: "Medicaid coverage for GLP-1 weight loss medications varies by state. New York Medicaid has limited coverage.",
  },
  Oscar: {
    covered: true,
    note: "Oscar Health plans may cover GLP-1 medications with prior authorization. Coverage depends on your specific plan.",
  },
  Other: {
    covered: false,
    note: "Coverage varies by plan. Contact us and we'll help you check your specific insurance benefits.",
  },
  "I don't have insurance": {
    covered: false,
    note: "Our cash-pay program makes GLP-1 therapy accessible without insurance. We'll discuss pricing options during your consultation.",
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
    // Based on clinical trial data: 15-22% body weight loss
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
      <section className="pt-32 pb-12 bg-cream">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">
            Eligibility & Insurance Check
          </p>
          <h1 className="font-serif text-5xl md:text-6xl leading-tight text-soft-black">
            Check Your <span className="text-gold">Eligibility</span>
          </h1>
          <p className="mt-6 text-lg text-neutral-500 max-w-2xl mx-auto leading-relaxed">
            Answer a few quick questions to see if you may be a candidate for
            GLP-1 weight management and check your insurance coverage.
          </p>
        </div>
      </section>

      {/* Progress Bar */}
      <section className="bg-cream pb-12">
        <div className="max-w-2xl mx-auto px-6">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  s <= step ? "bg-gold" : "bg-neutral-200"
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-neutral-400 mt-2 text-center">
            Step {step} of 5
          </p>
        </div>
      </section>

      {/* Form Steps */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-6">
          {/* Step 1: BMI Calculator */}
          {step === 1 && (
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">
                Step 1
              </p>
              <h2 className="font-serif text-3xl text-soft-black mb-2">
                Calculate Your BMI
              </h2>
              <p className="text-sm text-neutral-500 mb-8">
                Enter your height and weight to calculate your Body Mass Index.
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-neutral-600 mb-2">
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
                        className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-gold transition-colors text-sm"
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
                        className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-gold transition-colors text-sm"
                        placeholder="Inches"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-neutral-600 mb-2">
                    Weight (lbs)
                  </label>
                  <input
                    type="number"
                    min="80"
                    max="800"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-gold transition-colors text-sm"
                    placeholder="Weight in pounds"
                  />
                </div>

                {bmi > 0 && (
                  <div className="bg-cream p-6 rounded-xl text-center">
                    <p className="text-xs tracking-[0.2em] uppercase text-neutral-400 mb-1">
                      Your BMI
                    </p>
                    <p className="font-serif text-4xl text-gold">
                      {bmi.toFixed(1)}
                    </p>
                    <p className="text-sm text-neutral-500 mt-2">
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
                className="mt-8 w-full bg-gold hover:bg-gold-dark disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm tracking-wide uppercase px-8 py-4 rounded-full transition-colors"
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 2: Medical History */}
          {step === 2 && (
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">
                Step 2
              </p>
              <h2 className="font-serif text-3xl text-soft-black mb-2">
                Medical History
              </h2>
              <p className="text-sm text-neutral-500 mb-8">
                Select any conditions that apply to you. This helps determine
                your eligibility for GLP-1 medications.
              </p>

              <div className="space-y-3">
                {comorbidities.map((condition) => (
                  <button
                    key={condition}
                    onClick={() => toggleCondition(condition)}
                    className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors ${
                      selectedConditions.includes(condition)
                        ? "border-gold bg-gold/10 text-soft-black"
                        : "border-neutral-200 text-neutral-600 hover:border-gold"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`w-5 h-5 rounded border flex items-center justify-center text-xs ${
                          selectedConditions.includes(condition)
                            ? "bg-gold border-gold text-white"
                            : "border-neutral-300"
                        }`}
                      >
                        {selectedConditions.includes(condition) && "✓"}
                      </span>
                      {condition}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 border border-neutral-300 text-neutral-600 hover:border-gold hover:text-gold text-sm tracking-wide uppercase px-8 py-4 rounded-full transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!canProceedStep2}
                  className="flex-1 bg-gold hover:bg-gold-dark disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm tracking-wide uppercase px-8 py-4 rounded-full transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Insurance Check */}
          {step === 3 && (
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">
                Step 3
              </p>
              <h2 className="font-serif text-3xl text-soft-black mb-2">
                Insurance Check
              </h2>
              <p className="text-sm text-neutral-500 mb-8">
                Select your insurance provider to check typical GLP-1
                medication coverage.
              </p>

              <div className="space-y-3">
                {Object.keys(insurers).map((insurer) => (
                  <button
                    key={insurer}
                    onClick={() => setSelectedInsurer(insurer)}
                    className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors ${
                      selectedInsurer === insurer
                        ? "border-gold bg-gold/10 text-soft-black"
                        : "border-neutral-200 text-neutral-600 hover:border-gold"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
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
                  className={`mt-6 p-6 rounded-xl ${insurerInfo.covered ? "bg-green-50 border border-green-200" : "bg-amber-50 border border-amber-200"}`}
                >
                  <p
                    className={`text-sm font-medium ${insurerInfo.covered ? "text-green-800" : "text-amber-800"}`}
                  >
                    {insurerInfo.covered
                      ? "Coverage Likely Available"
                      : "Limited or No Coverage"}
                  </p>
                  <p
                    className={`text-sm mt-2 ${insurerInfo.covered ? "text-green-700" : "text-amber-700"}`}
                  >
                    {insurerInfo.note}
                  </p>
                </div>
              )}

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 border border-neutral-300 text-neutral-600 hover:border-gold hover:text-gold text-sm tracking-wide uppercase px-8 py-4 rounded-full transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  disabled={!canProceedStep3}
                  className="flex-1 bg-gold hover:bg-gold-dark disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm tracking-wide uppercase px-8 py-4 rounded-full transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Estimated Weight Loss */}
          {step === 4 && (
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">
                Step 4
              </p>
              <h2 className="font-serif text-3xl text-soft-black mb-2">
                Your Estimated Results
              </h2>
              <p className="text-sm text-neutral-500 mb-8">
                Based on your profile and clinical trial data, here&apos;s what
                you might expect with GLP-1 therapy.
              </p>

              <div className="bg-cream p-8 rounded-xl text-center space-y-6">
                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-neutral-400 mb-1">
                    Your Current BMI
                  </p>
                  <p className="font-serif text-3xl text-soft-black">
                    {bmi.toFixed(1)}
                  </p>
                </div>

                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-neutral-400 mb-1">
                    Estimated Weight Loss in 12 Months
                  </p>
                  <p className="font-serif text-5xl text-gold">
                    {estimatedLoss.low} – {estimatedLoss.high} lbs
                  </p>
                </div>

                <div>
                  <p className="text-xs tracking-[0.2em] uppercase text-neutral-400 mb-1">
                    Projected Weight
                  </p>
                  <p className="font-serif text-3xl text-soft-black">
                    {Math.round(parseFloat(weight) - estimatedLoss.low)} –{" "}
                    {Math.round(parseFloat(weight) - estimatedLoss.high)} lbs
                  </p>
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed">
                  Based on published clinical trial data for Semaglutide and
                  Tirzepatide. Individual results may vary. These projections
                  are for informational purposes only and are not a guarantee.
                </p>
              </div>

              {qualifiesByBMI && (
                <div className="mt-6 p-6 rounded-xl bg-green-50 border border-green-200">
                  <p className="text-sm font-medium text-green-800">
                    You may be a great candidate for GLP-1 therapy
                  </p>
                  <p className="text-sm mt-2 text-green-700">
                    Based on your BMI
                    {hasComorbidity ? " and health history" : ""}, you meet the
                    general criteria for GLP-1 medication therapy. A
                    consultation with Dr. Rhee will confirm your eligibility.
                  </p>
                </div>
              )}

              {!qualifiesByBMI && bmi > 0 && (
                <div className="mt-6 p-6 rounded-xl bg-amber-50 border border-amber-200">
                  <p className="text-sm font-medium text-amber-800">
                    Let&apos;s discuss your options
                  </p>
                  <p className="text-sm mt-2 text-amber-700">
                    Based on your current BMI, standard GLP-1 eligibility
                    criteria may not apply. However, Dr. Rhee can evaluate your
                    individual situation during a consultation.
                  </p>
                </div>
              )}

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 border border-neutral-300 text-neutral-600 hover:border-gold hover:text-gold text-sm tracking-wide uppercase px-8 py-4 rounded-full transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(5)}
                  className="flex-1 bg-gold hover:bg-gold-dark text-white text-sm tracking-wide uppercase px-8 py-4 rounded-full transition-colors"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 5: CTA */}
          {step === 5 && (
            <div className="text-center">
              <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">
                You&apos;re Ready
              </p>
              <h2 className="font-serif text-4xl text-soft-black mb-4">
                Take the Next Step
              </h2>
              <p className="text-neutral-500 leading-relaxed max-w-lg mx-auto">
                {qualifiesByBMI
                  ? "Based on your responses, you may be an excellent candidate for our GLP-1 weight management program. Book a consultation with Dr. Rhee to get started."
                  : "Schedule a consultation with Dr. Rhee to discuss your weight management goals and explore your options."}
              </p>

              <div className="mt-8 bg-cream p-8 rounded-xl space-y-4">
                <div className="grid grid-cols-2 gap-4 text-left text-sm">
                  <div>
                    <p className="text-neutral-400">BMI</p>
                    <p className="text-soft-black font-medium">
                      {bmi.toFixed(1)}
                    </p>
                  </div>
                  <div>
                    <p className="text-neutral-400">Current Weight</p>
                    <p className="text-soft-black font-medium">{weight} lbs</p>
                  </div>
                  <div>
                    <p className="text-neutral-400">Health Conditions</p>
                    <p className="text-soft-black font-medium">
                      {hasComorbidity
                        ? selectedConditions.join(", ")
                        : "None reported"}
                    </p>
                  </div>
                  <div>
                    <p className="text-neutral-400">Insurance</p>
                    <p className="text-soft-black font-medium">
                      {selectedInsurer}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-neutral-400 text-sm">
                    Estimated 12-Month Loss
                  </p>
                  <p className="font-serif text-2xl text-gold">
                    {estimatedLoss.low} – {estimatedLoss.high} lbs
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <Link
                  href="/contact"
                  className="block bg-gold hover:bg-gold-dark text-white text-sm tracking-wide uppercase px-8 py-4 rounded-full transition-colors"
                >
                  Book Your Consultation
                </Link>
                <button
                  onClick={() => setStep(1)}
                  className="block w-full text-sm text-neutral-400 hover:text-gold transition-colors"
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
