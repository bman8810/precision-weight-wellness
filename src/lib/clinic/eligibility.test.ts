import { describe, expect, it } from "vitest";
import {
  bmiFromImperial,
  evaluateEligibility,
  insuranceQualifies,
  isBookableState,
} from "./eligibility";

describe("eligibility", () => {
  it("books only CT and NY", () => {
    expect(isBookableState("ct")).toBe(true);
    expect(isBookableState("NY")).toBe(true);
    expect(isBookableState("NJ")).toBe(false);
    expect(isBookableState("MI")).toBe(false);
    expect(isBookableState("TX")).toBe(false);
  });

  it("computes live BMI", () => {
    expect(bmiFromImperial(66, 180)).toBeCloseTo(29.05, 1);
  });

  it("waitlists unlicensed states even with high BMI", () => {
    const r = evaluateEligibility({
      state: "MI",
      heightIn: 66,
      weightLb: 220,
      comorbidityIds: ["htn"],
      contraindicationIds: [],
      glp1Exposure: "never",
    });
    expect(r.verdict).toBe("waitlist");
  });

  it("ineligible on hard contra; cash-pay otherwise proceeds", () => {
    const bad = evaluateEligibility({
      state: "NY",
      heightIn: 66,
      weightLb: 220,
      comorbidityIds: [],
      contraindicationIds: ["pregnancy"],
      glp1Exposure: "never",
    });
    expect(bad.verdict).toBe("ineligible");
    const cash = evaluateEligibility({
      state: "CT",
      heightIn: 66,
      weightLb: 140,
      comorbidityIds: [],
      contraindicationIds: [],
      glp1Exposure: "past",
    });
    expect(cash.verdict).toBe("qualified");
    expect(cash.insuranceQualifies).toBe(false);
  });

  it("marks insurance qualification from BMI/comorbidity without gating cash", () => {
    expect(insuranceQualifies(31, [])).toBe(true);
    expect(insuranceQualifies(27.5, ["htn"])).toBe(true);
    expect(insuranceQualifies(27.5, [])).toBe(false);
  });
});
