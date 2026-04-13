import type { Metadata } from "next";
import SegmentLanding, { type SegmentProps } from "@/components/SegmentLanding";

export const metadata: Metadata = {
  title: "Weight Loss for Better Health | Diabetes, Blood Pressure & More",
  description:
    "Medically supervised weight loss to improve diabetes, blood pressure, sleep apnea, and cholesterol. Physician-led GLP-1 programs with Dr. Libby Rhee in NYC.",
  openGraph: {
    title: "Weight Loss as Medicine \u2014 For Your Health, Not Just Your Scale",
    description:
      "Doctor-supervised weight management to address Type 2 diabetes, hypertension, sleep apnea, and metabolic conditions.",
  },
};

const data: SegmentProps = {
  slug: "health-first",
  hero: {
    badge: "Weight Loss as Medicine",
    headline: "Your doctor said",
    headlineEmphasis: "lose weight.",
    subheadline:
      "When weight loss isn\u2019t vanity but a medical necessity \u2014 for diabetes, blood pressure, sleep apnea, or cholesterol \u2014 you need a physician who specializes in it.",
  },
  empathy: {
    badge: "We hear you",
    headline: "A diagnosis changes",
    headlineEmphasis: "everything.",
    body: "Being told to \u201Close weight\u201D by your doctor is one thing. Actually doing it \u2014 while managing a chronic condition \u2014 is another. Standard advice (\u201Ceat less, move more\u201D) doesn\u2019t account for how conditions like insulin resistance, inflammation, and hormonal imbalance make weight loss dramatically harder.",
    painPoints: [
      "Your doctor says you need to lose weight for your health",
      "You\u2019re managing Type 2 diabetes, high blood pressure, or sleep apnea",
      "You know weight loss could reduce or eliminate medications",
      "Standard advice hasn\u2019t worked because your body works against you",
      "You want a physician who treats weight as a medical issue, not a lifestyle choice",
    ],
  },
  differentiator: {
    badge: "Medical-grade intervention",
    headline: "Treat the weight,",
    headlineEmphasis: "treat the condition.",
    body: "These medications don\u2019t just help you lose weight \u2014 clinical trials show they independently improve blood sugar, blood pressure, and cardiovascular risk markers.",
    points: [
      {
        title: "Beyond weight loss",
        desc: "Tirzepatide reduced A1C by up to 2.4% in trials. Semaglutide cut major cardiovascular events by 20%. These are medical interventions with medical outcomes.",
      },
      {
        title: "Coordinated with your care team",
        desc: "Dr. Rhee works alongside your primary care physician or endocrinologist to ensure your weight management complements your existing treatment plan.",
      },
      {
        title: "Lab-monitored safety",
        desc: "Regular comprehensive lab panels track not just weight, but blood sugar, lipids, kidney function, and inflammatory markers \u2014 the metrics that matter for your health.",
      },
    ],
  },
  stats: [
    { value: "2.4%", label: "A1C reduction (Tirzepatide)" },
    { value: "20%", label: "CV risk reduction (Semaglutide)" },
    { value: "15\u201322%", label: "Avg. weight loss" },
  ],
  testimonial: {
    quote:
      "My endocrinologist told me to lose weight or start insulin. Six months into Dr. Rhee\u2019s program, I\u2019ve lost 38 pounds, my A1C dropped from 8.2 to 6.1, and insulin is off the table.",
    name: "Robert K.",
    location: "Greenwich, CT",
    detail: "Type 2 diabetes \u2014 A1C from 8.2 to 6.1",
  },
  faqs: [
    {
      q: "Will these medications interact with my diabetes or blood pressure meds?",
      a: "Dr. Rhee is experienced in managing patients with multiple conditions. She\u2019ll review all your current medications during the consultation and coordinate with your other doctors as needed.",
    },
    {
      q: "Can this actually help me reduce my other medications?",
      a: "Many patients see improvements in blood sugar, blood pressure, and cholesterol that allow their doctors to reduce or discontinue other medications. Dr. Rhee monitors these markers closely throughout treatment.",
    },
    {
      q: "Does my insurance cover this if it\u2019s medically necessary?",
      a: "Many insurers cover GLP-1 medications with prior authorization, especially when there\u2019s a diagnosis of obesity with comorbidities. We handle the prior authorization process and help you navigate coverage.",
    },
    {
      q: "I\u2019m already seeing a specialist. How does this work?",
      a: "Dr. Rhee collaborates with your existing care team. She can share progress notes and coordinate treatment adjustments to ensure everything works together for your health.",
    },
  ],
  cta: {
    headline: "Your health can\u2019t",
    headlineEmphasis: "wait.",
    body: "Schedule a consultation with Dr. Rhee to discuss how medically supervised weight loss can improve your specific conditions.",
    buttonText: "Book Your Consultation",
  },
};

export default function HealthFirstPage() {
  return <SegmentLanding data={data} />;
}
