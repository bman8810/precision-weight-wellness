import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Precision Weight + Wellness. Contact Dr. Libby Rhee's team by phone, email, or our online form to start your weight management journey.",
  openGraph: {
    title: "Contact Us | Precision Weight + Wellness",
    description:
      "Get in touch with Precision Weight + Wellness. Contact Dr. Libby Rhee's team to start your weight management journey.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
