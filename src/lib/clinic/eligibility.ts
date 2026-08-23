export const BOOKABLE_STATES = ["CT", "NY"] as const;
export const WAITLIST_HIGHLIGHT = ["MI"] as const;

export type UsState = string;
export type Glp1Exposure = "never" | "current" | "past";
export type EligibilityVerdict = "qualified" | "review" | "ineligible" | "waitlist";

export const CONTRAINDICATIONS = [
  {
    id: "pregnancy",
    label: "Pregnant, breastfeeding, or planning pregnancy",
  },
  {
    id: "mtc",
    label: "Personal or family history of medullary thyroid cancer or MEN2",
  },
  {
    id: "pancreatitis",
    label: "History of pancreatitis",
  },
  {
    id: "eating_disorder",
    label: "Current or past eating disorder",
  },
] as const;

export const COMORBIDITIES = [
  { id: "t2d", label: "Type 2 diabetes or prediabetes" },
  { id: "htn", label: "High blood pressure" },
  { id: "osa", label: "Sleep apnea" },
  { id: "lipid", label: "High cholesterol" },
  { id: "pcos", label: "PCOS" },
] as const;

export function normalizeState(raw: string): string {
  return raw.trim().toUpperCase();
}

export function isBookableState(state: string): boolean {
  return (BOOKABLE_STATES as readonly string[]).includes(normalizeState(state));
}

export function bmiFromImperial(heightIn: number, weightLb: number): number {
  if (heightIn <= 0 || weightLb <= 0) return NaN;
  return (weightLb / (heightIn * heightIn)) * 703;
}

export function insuranceQualifies(bmi: number, comorbidityIds: string[]): boolean {
  if (!Number.isFinite(bmi)) return false;
  if (bmi >= 30) return true;
  if (bmi >= 27 && comorbidityIds.length > 0) return true;
  return false;
}

export function evaluateEligibility(input: {
  state: string;
  heightIn: number;
  weightLb: number;
  comorbidityIds: string[];
  contraindicationIds: string[];
  glp1Exposure: Glp1Exposure;
}): {
  verdict: EligibilityVerdict;
  bmi: number;
  insuranceQualifies: boolean;
  reason: string;
} {
  const bmi = Math.round(bmiFromImperial(input.heightIn, input.weightLb) * 10) / 10;
  const state = normalizeState(input.state);
  if (!isBookableState(state)) {
    return {
      verdict: "waitlist",
      bmi,
      insuranceQualifies: insuranceQualifies(bmi, input.comorbidityIds),
      reason: "We are not licensed in your state yet.",
    };
  }
  if (input.contraindicationIds.length > 0) {
    return {
      verdict: "ineligible",
      bmi,
      insuranceQualifies: false,
      reason: "A safety question means this program is not the right fit.",
    };
  }
  // Cash-pay proceeds. BMI is an insurance flag only.
  return {
    verdict: "qualified",
    bmi,
    insuranceQualifies: insuranceQualifies(bmi, input.comorbidityIds),
    reason: "You're a candidate.",
  };
}

export const PHARMACY_COST_LINE =
  "Pharmacy bills separately, typically $199–399/mo depending on medication and dose.";
