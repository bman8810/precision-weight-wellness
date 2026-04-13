import type { Metadata } from "next";
import SegmentLanding, { type SegmentProps } from "@/components/SegmentLanding";

export const metadata: Metadata = {
  title: "GLP-1 Weight Loss with a Real Doctor | Wegovy, Zepbound NYC",
  description:
    "Want Wegovy, Zepbound, or Semaglutide from a real physician? Precision Weight + Wellness offers board-certified, in-person GLP-1 programs in NYC with Dr. Libby Rhee.",
  openGraph: {
    title: "GLP-1 Medications with a Real Doctor \u2014 Not a Telehealth Mill",
    description:
      "Board-certified physician-led GLP-1 programs. In-person or telehealth in NY, CT, and MI.",
  },
};

const data: SegmentProps = {
  slug: "glp1",
  hero: {
    badge: "Physician-Led GLP-1 Programs",
    headline: "Get GLP-1 medications",
    headlineEmphasis: "the right way.",
    subheadline:
      "You\u2019ve heard about Ozempic, Wegovy, and Zepbound. You want access to these medications \u2014 but from a real doctor who monitors your health, not a subscription service that ships pills to your door.",
  },
  empathy: {
    badge: "You\u2019ve done your research",
    headline: "Not all GLP-1 programs are",
    headlineEmphasis: "created equal.",
    body: "The market is flooded with telehealth startups prescribing weight loss medications after a 5-minute questionnaire. No labs. No physical exam. No follow-up. That\u2019s not medicine \u2014 that\u2019s a vending machine. You deserve better.",
    painPoints: [
      "You want a proven medication but don\u2019t trust online-only providers",
      "You\u2019ve seen friends get results and want the same \u2014 safely",
      "You want proper labs, dosing, and monitoring",
      "You\u2019re skeptical of \u201Cget a prescription in 10 minutes\u201D services",
      "You want a doctor who actually knows you, not an algorithm",
    ],
  },
  differentiator: {
    badge: "The physician advantage",
    headline: "Real medicine requires",
    headlineEmphasis: "a real doctor.",
    body: "Dr. Libby Rhee is a board-certified physician who personally manages every patient\u2019s care. Proper labs, careful titration, and genuine medical oversight \u2014 the way GLP-1 therapy should work.",
    points: [
      {
        title: "Comprehensive assessment first",
        desc: "Full health evaluation, lab work, and medical history review before any prescription. We need to know your body before we treat it.",
      },
      {
        title: "Careful dose titration",
        desc: "Dr. Rhee starts low and adjusts gradually based on your response and tolerance. This minimizes side effects and optimizes results \u2014 something auto-prescribers can\u2019t do.",
      },
      {
        title: "Ongoing monitoring & access",
        desc: "Regular lab panels, body composition tracking, and direct access to your physician. Not a chatbot. Not a call center. Dr. Rhee.",
      },
    ],
  },
  stats: [
    { value: "Board-Certified", label: "Physician-led" },
    { value: "1:1", label: "Doctor relationship" },
    { value: "3 States", label: "NY \u00B7 CT \u00B7 MI" },
  ],
  testimonial: {
    quote:
      "I almost signed up for one of those online services, but something felt off about getting a prescription without even a blood test. Dr. Rhee did a full workup, found I had borderline thyroid issues, and built my plan around that. So glad I went the real route.",
    name: "David L.",
    location: "Manhattan, NY",
    detail: "Switched from an online provider to Precision W+W",
  },
  faqs: [
    {
      q: "Which GLP-1 medication will I get?",
      a: "Dr. Rhee recommends the medication best suited to your biology, health history, and goals. Options include Semaglutide (Wegovy), Tirzepatide (Zepbound), and oral alternatives (Rybelsus). This is a medical decision, not a one-size-fits-all prescription.",
    },
    {
      q: "How is this different from Hims, Ro, or Calibrate?",
      a: "Those services prioritize speed and scale. We prioritize safety and outcomes. You see a board-certified physician in person (or via telehealth), get comprehensive lab work, and receive ongoing medical monitoring. We don\u2019t prescribe without proper evaluation.",
    },
    {
      q: "Can you help me get insurance coverage for the medication?",
      a: "Yes. We handle prior authorization requests and help you navigate manufacturer savings programs, pharmacy alternatives, and coverage options. Many of our patients get significant insurance coverage for their medications.",
    },
    {
      q: "Do I need to come to NYC?",
      a: "In-person visits are available at our NYC office (110 E 60th St). Telehealth visits are available for patients in New York, Connecticut, and Michigan. Your initial consultation can be either.",
    },
  ],
  cta: {
    headline: "Get GLP-1 therapy",
    headlineEmphasis: "done right.",
    body: "A proper medical evaluation, the right medication for your body, and a physician who actually knows your name.",
    buttonText: "Book Your Consultation",
  },
};

export default function GLP1Page() {
  return <SegmentLanding data={data} />;
}
