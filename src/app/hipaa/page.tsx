import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "HIPAA Notice",
  description: "Notice of privacy practices under HIPAA for Precision Weight + Wellness at Liora.",
};

export default function HipaaPage() {
  return (
    <>
      <section className="bg-navy pt-20">
        <div className="max-w-[800px] mx-auto px-5 md:px-6 pt-14 pb-14 md:pt-28 md:pb-20">
          <ScrollReveal>
            <p className="text-gold text-[10.5px] font-semibold uppercase tracking-[0.14em] mb-5">Legal</p>
            <h1 className="font-serif text-[clamp(2.5rem,5vw,3.75rem)] leading-[1.08] tracking-[-0.02em] text-white">
              HIPAA <em className="text-gold">Notice</em>
            </h1>
            <p className="text-[14px] text-white/40 mt-4">Notice of Privacy Practices &mdash; Last updated: April 2026</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-14 md:py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-5 md:px-6 prose prose-navy prose-headings:font-serif prose-headings:tracking-[-0.02em] prose-p:text-body prose-p:leading-[1.7] prose-li:text-body">
          <ScrollReveal>
            <h2>About This Notice</h2>
            <p>
              This Notice of Privacy Practices describes how medical information about you may be used and disclosed and how you can get access to this information. Precision Weight + Wellness at Liora is required by law to maintain the privacy of your protected health information (PHI) and to provide you with this notice.
            </p>

            <h2>How We May Use and Disclose Your PHI</h2>
            <p>We may use and disclose your PHI for the following purposes:</p>
            <ul>
              <li><strong>Treatment:</strong> To provide, coordinate, or manage your medical care, including consultations with other healthcare providers involved in your care.</li>
              <li><strong>Payment:</strong> To obtain payment for services, including billing your insurance company or processing prior authorizations for medications.</li>
              <li><strong>Healthcare Operations:</strong> For quality assessment, compliance activities, auditing, and other business activities necessary to run our practice.</li>
              <li><strong>As Required by Law:</strong> When required by federal, state, or local law, including reporting to public health authorities.</li>
            </ul>

            <h2>Your Rights Regarding Your PHI</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Request a copy of your medical records</li>
              <li>Request corrections to your health information</li>
              <li>Request restrictions on certain uses and disclosures</li>
              <li>Request confidential communications (e.g., contact at a specific phone number)</li>
              <li>Receive an accounting of disclosures of your PHI</li>
              <li>File a complaint if you believe your privacy rights have been violated</li>
            </ul>

            <h2>Our Responsibilities</h2>
            <p>
              We are required to maintain the privacy and security of your PHI, provide you with this notice, follow the terms of the notice currently in effect, and notify you if a breach of your unsecured PHI occurs.
            </p>

            <h2>Electronic Health Records</h2>
            <p>
              We use an electronic health records system (Healthie) to store and manage your health information. This system meets HIPAA security requirements including encryption, access controls, and audit logging.
            </p>

            <h2>Contact Information</h2>
            <p>
              For questions about this notice or to exercise your rights, contact our Privacy Officer at{" "}
              <a href="mailto:hello@precisionww.com" className="text-gold hover:text-gold-light">hello@precisionww.com</a>{" "}
              or by mail at: Precision Weight + Wellness at Liora, 110 E 60th Street, Suite 800, New York, NY 10022.
            </p>

            <h2>Complaints</h2>
            <p>
              If you believe your privacy rights have been violated, you may file a complaint with our office or with the Secretary of the U.S. Department of Health and Human Services. You will not be penalized for filing a complaint.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
