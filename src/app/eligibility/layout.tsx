import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eligibility Check",
  description:
    "Check if you qualify for medical weight management with FDA-approved medications. Use our BMI calculator and insurance coverage tool to find out.",
  openGraph: {
    title: "Eligibility Check | Precision Weight + Wellness",
    description:
      "Check if you qualify for medical weight management with FDA-approved medications. Use our BMI calculator and insurance coverage tool.",
  },
};

export default function EligibilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
