import type { Metadata } from "next";
import SegmentLanding, { type SegmentProps } from "@/components/SegmentLanding";

export const metadata: Metadata = {
  title: "Take Back Control of Your Weight | Medical Weight Loss NYC",
  description:
    "Feeling overwhelmed by your weight? Precision Weight + Wellness offers physician-led, FDA-approved weight loss programs in NYC. Board-certified care with Dr. Libby Rhee.",
  openGraph: {
    title: "Take Back Control of Your Weight",
    description:
      "Physician-led weight management with FDA-approved medications. Real medicine, real results.",
  },
};

const data: SegmentProps = {
  slug: "weight-loss",
  hero: {
    badge: "Physician-Led Weight Management",
    headline: "Take back control",
    headlineEmphasis: "of your weight.",
    subheadline:
      "When your weight feels out of control, you need more than another diet. You need a physician-led program backed by the most effective medications available today.",
  },
  empathy: {
    badge: "We understand",
    headline: "You\u2019re not lacking",
    headlineEmphasis: "willpower.",
    body: "Weight gain isn\u2019t a character flaw \u2014 it\u2019s biology. Your body\u2019s hunger hormones, metabolism, and genetic predisposition create a system that actively resists weight loss. That\u2019s why diets alone fail 95% of the time.",
    painPoints: [
      "The scale keeps climbing despite your best efforts",
      "You\u2019ve tried restricting calories but the hunger is overwhelming",
      "Your weight is affecting your energy, mobility, or confidence",
      "You\u2019re worried about developing serious health complications",
      "You want a real medical solution, not another fad",
    ],
  },
  differentiator: {
    badge: "Why this works",
    headline: "Medicine that works with",
    headlineEmphasis: "your biology.",
    body: "FDA-approved GLP-1 and dual-agonist medications quiet the hunger signals your brain sends, while Dr. Rhee builds a complete protocol around your specific needs.",
    points: [
      {
        title: "Silence the food noise",
        desc: "Medications like Semaglutide and Tirzepatide target the receptors that drive cravings \u2014 patients report that the constant food thoughts simply quiet down.",
      },
      {
        title: "Real physician, real oversight",
        desc: "Dr. Rhee personally manages your dosing, monitors your labs, and adjusts your protocol. Not an algorithm. Not a chatbot.",
      },
      {
        title: "Clinically proven results",
        desc: "Patients on these medications lose 15\u201322% of their body weight on average. That\u2019s 30\u201350+ lbs for many people.",
      },
    ],
  },
  stats: [
    { value: "15\u201322%", label: "Avg. weight loss" },
    { value: "Board-Certified", label: "Physician-led" },
    { value: "1:1", label: "Personalized care" },
  ],
  testimonial: {
    quote:
      "I was embarrassed to talk to a doctor about my weight. Dr. Rhee made me feel seen, not judged. I\u2019ve lost 52 pounds and I finally feel like myself again.",
    name: "Maria T.",
    location: "New York, NY",
    detail: "Lost 52 lbs on the Premium plan",
  },
  faqs: [
    {
      q: "How much weight can I realistically lose?",
      a: "Clinical trials show 15\u201322% body weight loss over 12\u201318 months. For a 250 lb person, that\u2019s 37\u201355 lbs. Dr. Rhee will discuss realistic goals based on your specific profile during your consultation.",
    },
    {
      q: "Is this safe for someone with a lot of weight to lose?",
      a: "These medications were specifically developed and FDA-approved for patients with obesity. Dr. Rhee monitors your health closely throughout treatment with regular labs and check-ins.",
    },
    {
      q: "Will I just gain the weight back if I stop?",
      a: "Our program includes maintenance planning from day one. Dr. Rhee develops tapering protocols and sustainable habits so your results last. Many patients transition to lower maintenance doses long-term.",
    },
    {
      q: "What does the program cost?",
      a: "Plans start at $199/month for physician visits, monitoring, and ongoing care. Medication costs are separate and may be covered by your insurance \u2014 we help navigate that.",
    },
  ],
  cta: {
    headline: "Ready to take back",
    headlineEmphasis: "control?",
    body: "Schedule a consultation with Dr. Rhee. The first step toward lasting change starts with a conversation.",
    buttonText: "Book Your Consultation",
  },
};

export default function WeightLossPage() {
  return <SegmentLanding data={data} />;
}
