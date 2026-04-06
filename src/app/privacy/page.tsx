import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Precision Weight + Wellness at Liora.",
};

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-navy pt-20">
        <div className="max-w-[800px] mx-auto px-5 md:px-6 pt-14 pb-14 md:pt-28 md:pb-20">
          <ScrollReveal>
            <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-5">Legal</p>
            <h1 className="font-serif text-[clamp(2.5rem,5vw,3.75rem)] leading-[1.08] tracking-[-0.02em] text-white">
              Privacy <em className="text-gold">Policy</em>
            </h1>
            <p className="text-[14px] text-white/40 mt-4">Last updated: April 2026</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-14 md:py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-5 md:px-6 prose prose-navy prose-headings:font-serif prose-headings:tracking-[-0.02em] prose-p:text-body prose-p:leading-[1.7] prose-li:text-body">
          <ScrollReveal>
            <h2>Information We Collect</h2>
            <p>
              Precision Weight + Wellness at Liora collects personal information you provide directly to us, including your name, email address, phone number, health information, insurance details, and payment information when you schedule appointments, complete intake forms, or communicate with our office.
            </p>

            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our medical weight management services</li>
              <li>Process appointments and payments</li>
              <li>Communicate with you about your care, including appointment reminders</li>
              <li>Comply with legal obligations, including HIPAA requirements</li>
              <li>Send you information about our services with your consent</li>
            </ul>

            <h2>Protected Health Information (PHI)</h2>
            <p>
              Your health information is protected under the Health Insurance Portability and Accountability Act (HIPAA). We maintain strict safeguards to protect the confidentiality, integrity, and availability of your PHI. Please see our HIPAA Notice for complete details.
            </p>

            <h2>Information Sharing</h2>
            <p>
              We do not sell your personal information. We may share information with third-party service providers who assist in operating our practice (such as our electronic health records system, payment processor, and appointment scheduling platform), subject to confidentiality obligations.
            </p>

            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information, including encryption, access controls, and regular security assessments.
            </p>

            <h2>Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal information. You may also request a copy of your medical records. To exercise these rights, contact us at hello@precisionww.com.
            </p>

            <h2>Contact</h2>
            <p>
              For questions about this Privacy Policy, contact us at{" "}
              <a href="mailto:hello@precisionww.com" className="text-gold hover:text-gold-light">hello@precisionww.com</a>.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
