import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for Precision Weight + Wellness at Liora.",
};

export default function TermsPage() {
  return (
    <>
      <section className="bg-navy pt-20">
        <div className="max-w-[800px] mx-auto px-5 md:px-6 pt-14 pb-14 md:pt-28 md:pb-20">
          <ScrollReveal>
            <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-5">Legal</p>
            <h1 className="font-serif text-[clamp(2.5rem,5vw,3.75rem)] leading-[1.08] tracking-[-0.02em] text-white">
              Terms of <em className="text-gold">Service</em>
            </h1>
            <p className="text-[14px] text-white/40 mt-4">Last updated: April 2026</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-14 md:py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-5 md:px-6 prose prose-navy prose-headings:font-serif prose-headings:tracking-[-0.02em] prose-p:text-body prose-p:leading-[1.7] prose-li:text-body">
          <ScrollReveal>
            <h2>Acceptance of Terms</h2>
            <p>
              By accessing or using the Precision Weight + Wellness website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
            </p>

            <h2>Medical Services</h2>
            <p>
              Precision Weight + Wellness provides medically supervised weight management services under the direction of licensed physicians. Our services are not a substitute for emergency medical care. Always seek immediate medical attention for emergencies.
            </p>

            <h2>Eligibility</h2>
            <p>
              Our services are available to adults aged 18 and older who meet clinical criteria for medical weight management. Final eligibility is determined by your physician during consultation.
            </p>

            <h2>Appointments and Cancellations</h2>
            <p>
              Appointments can be scheduled through our patient portal. We require 24 hours notice for cancellations. Repeated no-shows may result in a cancellation fee or dismissal from the program.
            </p>

            <h2>Payment and Billing</h2>
            <p>
              Program fees are billed monthly. Medication costs are separate and may be covered by insurance. We will assist with prior authorization when applicable. All fees are subject to change with 30 days notice.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              Results vary by individual. Precision Weight + Wellness makes no guarantees regarding specific weight loss outcomes. All medical treatments carry inherent risks which will be discussed with you by your physician.
            </p>

            <h2>Intellectual Property</h2>
            <p>
              All content on this website, including text, images, and design, is the property of Precision Weight + Wellness at Liora and may not be reproduced without permission.
            </p>

            <h2>Contact</h2>
            <p>
              For questions about these Terms, contact us at{" "}
              <a href="mailto:hello@precisionww.com" className="text-gold hover:text-gold-light">hello@precisionww.com</a>.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
