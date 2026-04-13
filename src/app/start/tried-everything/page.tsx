import type { Metadata } from "next";
import SegmentLanding, { type SegmentProps } from "@/components/SegmentLanding";

export const metadata: Metadata = {
  title: "Tried Every Diet? There\u2019s a Medical Solution | Precision W+W",
  description:
    "Keto, Whole30, calorie counting \u2014 if diets haven\u2019t worked, it\u2019s not your fault. Precision Weight + Wellness uses FDA-approved medications for lasting weight loss with Dr. Libby Rhee in NYC.",
  openGraph: {
    title: "Tried Every Diet? There\u2019s a Medical Solution.",
    description:
      "Physician-led weight management with FDA-approved medications. When willpower isn\u2019t enough, medicine can help.",
  },
};

const data: SegmentProps = {
  slug: "tried-everything",
  hero: {
    badge: "Beyond Diets",
    headline: "You\u2019ve tried everything.",
    headlineEmphasis: "This is different.",
    subheadline:
      "Keto. Whole30. Weight Watchers. Calorie counting. If diets worked long-term, you wouldn\u2019t be reading this. The problem was never your willpower \u2014 it\u2019s your biology.",
  },
  empathy: {
    badge: "It\u2019s not your fault",
    headline: "Why diets",
    headlineEmphasis: "always fail.",
    body: "Every diet follows the same script: restrict, lose, regain, repeat. That\u2019s not a personal failing \u2014 it\u2019s how human metabolism works. When you cut calories, your body fights back by increasing hunger hormones and slowing metabolism. It\u2019s a system designed to prevent starvation, not support weight loss.",
    painPoints: [
      "You\u2019ve lost the same 20 pounds three or four times",
      "Each diet works for a few months, then the weight comes roaring back",
      "You\u2019re exhausted by the cycle of restriction and guilt",
      "Friends suggest \u201Cjust eat less\u201D as if you haven\u2019t tried",
      "You\u2019re ready for something backed by actual science",
    ],
  },
  differentiator: {
    badge: "The medical approach",
    headline: "This time, science is",
    headlineEmphasis: "on your side.",
    body: "FDA-approved medications change the equation entirely. Instead of fighting your biology with willpower, these medications work with your body\u2019s own hormone systems to reduce hunger at the source.",
    points: [
      {
        title: "Break the yo-yo cycle",
        desc: "GLP-1 medications address the hormonal drivers of hunger that diets can\u2019t touch. Patients describe feeling satisfied \u2014 not deprived.",
      },
      {
        title: "No meal plans or calorie counting",
        desc: "We don\u2019t hand you a meal plan and wish you luck. The medication reduces appetite naturally while Dr. Rhee provides guidance that fits your actual life.",
      },
      {
        title: "Sustained, not temporary",
        desc: "Unlike diets that produce temporary results, our program is built for the long term \u2014 with maintenance protocols designed from day one.",
      },
    ],
  },
  stats: [
    { value: "95%", label: "Diet failure rate" },
    { value: "15\u201322%", label: "Medication-driven loss" },
    { value: "1:1", label: "Physician-led care" },
  ],
  testimonial: {
    quote:
      "I\u2019d done every diet imaginable. Lost 30 pounds on keto, gained back 40. With Dr. Rhee\u2019s program, I\u2019ve lost 45 pounds and it\u2019s been 8 months with zero yo-yo. For the first time, this feels permanent.",
    name: "Sarah M.",
    location: "Middletown, NY",
    detail: "Former yo-yo dieter, now 8 months on the program",
  },
  faqs: [
    {
      q: "How is this different from every other weight loss program?",
      a: "Most programs rely on willpower and calorie restriction \u2014 methods with a 95% long-term failure rate. Our program uses FDA-approved medications that change your body\u2019s hunger signaling at the hormonal level, supervised by a board-certified physician.",
    },
    {
      q: "I\u2019ve failed so many times. What if this doesn\u2019t work either?",
      a: "Those weren\u2019t failures \u2014 they were the wrong tools. Clinical trials show these medications produce 15\u201322% body weight loss. Dr. Rhee will assess whether you\u2019re a good candidate during your consultation and set realistic expectations.",
    },
    {
      q: "Do I still have to diet?",
      a: "No restrictive dieting. The medication naturally reduces your appetite, making it easier to eat less without the white-knuckle willpower. Dr. Rhee provides practical nutritional guidance \u2014 not a rigid meal plan.",
    },
    {
      q: "What happens when I stop the medication?",
      a: "Our program builds sustainable habits alongside medication. Many patients transition to lower maintenance doses. Dr. Rhee develops a personalized tapering and maintenance plan so your results stick.",
    },
  ],
  cta: {
    headline: "Done with diets?",
    headlineEmphasis: "Let\u2019s talk medicine.",
    body: "A 30-minute consultation with Dr. Rhee to discuss whether a medical approach is right for you. No commitment, no pressure.",
    buttonText: "Book Your Consultation",
  },
};

export default function TriedEverythingPage() {
  return <SegmentLanding data={data} />;
}
